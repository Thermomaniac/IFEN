"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GeoJSONSource, Map as MlMap, Marker } from "maplibre-gl";
import { ArrowCornerIcon, CloseIcon, MapIcon, MinusIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { EASE } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { LEVELS, NEARBY, type Therapist } from "@/data/therapists";
import { circlePolygon, loadMaplibre, loadMapStyle, zoomForRadius } from "@/lib/mapStyle";
import { distanceKm, initials, matchesQuery } from "@/lib/therapists";
import styles from "./TherapistMap.module.css";

const MAX_ZOOM = 17;
const CLUSTER_MAX_ZOOM = 16;
/** Paper: the 150 km circle spans 232px in the preview and 424px in the expanded map. */
const CIRCLE_PX = { preview: 232, full: 424 };
const CARD_WIDTH = 368;
const HIDE_DELAY = 120;

type PinData =
  | { key: string; kind: "point"; lngLat: [number, number]; id: string }
  | {
      key: string;
      kind: "cluster";
      lngLat: [number, number];
      clusterId: number;
      count: number;
    };
type Pin = PinData & { el: HTMLDivElement };

type Preview = {
  key: string;
  side: "right" | "left";
  focus: boolean;
  list?: Therapist[];
};

const levelName = (t: Therapist) =>
  t.level ? `${LEVELS.find((l) => l.id === t.level)!.label} Certified` : "";

/**
 * Directory map, MapLibre on OpenFreeMap tiles. `preview` is the still card beside the
 * list (Paper's nearby view with a "View In Map" button); `full` is the expanded map:
 * pan, wheel and pinch zoom, numbered clusters that split as you zoom in, and a preview
 * card per practice. Pins and cards are HTML so they stay keyboard reachable.
 */
export function TherapistMap({
  therapists,
  mode,
  onExpand,
  onClose,
}: {
  therapists: Therapist[];
  mode: "preview" | "full";
  onExpand?: () => void;
  onClose?: () => void;
}) {
  const full = mode === "full";
  const uid = useId();
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef(new Map<string, Marker>());
  const hideTimer = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [pins, setPins] = useState<Pin[]>([]);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [query, setQuery] = useState("");

  const mapped = useMemo(() => therapists.filter((t) => t.location), [therapists]);
  const byId = useMemo(() => new Map(mapped.map((t) => [t.id, t])), [mapped]);
  const shown = useMemo(
    () => (full && query ? mapped.filter((t) => matchesQuery(t, query)) : mapped),
    [full, query, mapped],
  );
  const nearby = useMemo(
    () => mapped.filter((t) => distanceKm(NEARBY.center, t.location!) <= NEARBY.radiusKm).length,
    [mapped],
  );

  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  // The active marker sits above its neighbours so its card is never covered.
  const activeKey = preview?.key;
  useEffect(() => {
    const el = activeKey ? markersRef.current.get(activeKey)?.getElement() : undefined;
    if (!el) return;
    el.style.zIndex = "3";
    return () => {
      el.style.zIndex = "";
    };
  }, [activeKey, pins]);

  // ---------- Map set-up, once per mount ----------
  useEffect(() => {
    let cancelled = false;
    let map: MlMap | null = null;
    const markers = markersRef.current;

    Promise.all([loadMaplibre(), loadMapStyle()])
      .then(([ml, style]) => {
        if (cancelled || !containerRef.current) return;
        const [lat, lng] = NEARBY.center;
        map = new ml.Map({
          container: containerRef.current,
          style,
          center: [lng, lat],
          zoom: zoomForRadius(lat, NEARBY.radiusKm, CIRCLE_PX[mode]),
          maxZoom: MAX_ZOOM,
          minZoom: 1,
          interactive: full,
          attributionControl: { compact: true },
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          cooperativeGestures: false,
        });
        mapRef.current = map;
        map.touchZoomRotate?.disableRotation();

        map.on("error", (e) => {
          // Tile hiccups are not fatal; a style that never loads is.
          if (!map?.isStyleLoaded()) console.warn(e.error);
        });

        map.on("load", () => {
          if (!map) return;
          map.addSource("nearby", {
            type: "geojson",
            data: circlePolygon(NEARBY.center, NEARBY.radiusKm),
          });
          map.addLayer({
            id: "nearby-fill",
            type: "fill",
            source: "nearby",
            paint: { "fill-color": "#FFFFFF", "fill-opacity": 0.32 },
          });
          map.addLayer({
            id: "nearby-line",
            type: "line",
            source: "nearby",
            paint: {
              "line-color": "#DDD8D2",
              "line-width": 2,
              "line-dasharray": [2, 2],
            },
          });
          map.addSource("practices", {
            type: "geojson",
            data: toGeoJSON([]),
            cluster: true,
            clusterRadius: full ? 56 : 40,
            clusterMaxZoom: CLUSTER_MAX_ZOOM,
          });
          // Invisible, so the source tiles load; the pins themselves are HTML markers.
          map.addLayer({
            id: "practices-hit",
            type: "circle",
            source: "practices",
            paint: { "circle-radius": 1, "circle-opacity": 0 },
          });
          setStatus("ready");
        });

        // Keep one HTML marker per visible cluster or practice.
        let queued = false;
        map.on("render", () => {
          if (queued || !map?.getSource("practices")) return;
          queued = true;
          requestAnimationFrame(() => {
            queued = false;
            if (map) syncMarkers(ml, map, markers, setPins);
          });
        });

        map.on("click", (e) => {
          if (e.originalEvent.target === map?.getCanvas()) setPreview(null);
        });
        map.on("movestart", (e) => {
          // Panning by hand closes a card left open by touch.
          if ((e as { originalEvent?: Event }).originalEvent) setPreview((p) => (p && !p.focus ? null : p));
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(hideTimer.current);
      markers.forEach((m) => m.remove());
      markers.clear();
      map?.remove();
      mapRef.current = null;
    };
    // The mode never changes for a mounted map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Data ----------
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map) return;
    (map.getSource("practices") as GeoJSONSource | undefined)?.setData(toGeoJSON(shown));
    setPreview(null);
  }, [status, shown]);

  // Filters can leave nothing near Hamburg: frame the matching practices instead, and come
  // back to the nearby view once there are practices around it again.
  const framedNearby = useRef(true);
  useEffect(() => {
    const map = mapRef.current;
    if (status !== "ready" || !map || mapped.length === 0) return;
    const duration = reducedRef.current ? 0 : 600;
    if (nearby > 0) {
      if (framedNearby.current) return;
      framedNearby.current = true;
      const [lat, lng] = NEARBY.center;
      map.easeTo({
        center: [lng, lat],
        zoom: zoomForRadius(lat, NEARBY.radiusKm, CIRCLE_PX[mode]),
        duration,
      });
      return;
    }
    framedNearby.current = false;
    let cancelled = false;
    loadMaplibre().then((ml) => {
      if (cancelled) return;
      const bounds = new ml.LngLatBounds();
      mapped.forEach((p) => bounds.extend([p.location![1], p.location![0]]));
      map.fitBounds(bounds, { padding: full ? 96 : 56, maxZoom: 12, duration });
    });
    return () => {
      cancelled = true;
    };
  }, [status, mapped, nearby, full, mode]);

  // The map search frames what it finds, after a short pause in typing.
  useEffect(() => {
    const map = mapRef.current;
    if (!full || status !== "ready" || !map || !query.trim() || shown.length === 0) return;
    const t = window.setTimeout(async () => {
      const ml = await loadMaplibre();
      const bounds = new ml.LngLatBounds();
      shown.forEach((p) => bounds.extend([p.location![1], p.location![0]]));
      map.fitBounds(bounds, {
        padding: 96,
        maxZoom: 12,
        duration: reducedRef.current ? 0 : 600,
      });
    }, 350);
    return () => window.clearTimeout(t);
  }, [full, status, query, shown]);

  // ---------- Previews ----------
  const sideFor = (lngLat: [number, number]): Preview["side"] => {
    const map = mapRef.current;
    if (!map) return "right";
    // Card width cap from the CSS, plus the 16px pin gap, half a pin and a 16px margin.
    const card = Math.min(CARD_WIDTH, window.innerWidth - 112);
    const width = map.getContainer().clientWidth;
    const x = map.project(lngLat).x;
    const right = width - x - 48;
    const left = x - 48;
    if (right >= card) return "right";
    if (left >= card) return "left";
    // Narrow screens: no side fits, so pan just enough for the card to fit on the roomier one.
    const side = right >= left ? "right" : "left";
    const dx = side === "right" ? card - right : left - card;
    map.panBy([dx, 0], { duration: reducedRef.current ? 0 : 250 });
    return side;
  };

  const show = (pin: Pin, focus = false, list?: Therapist[]) => {
    window.clearTimeout(hideTimer.current);
    if (preview?.key === pin.key && !list) {
      setPreview((p) => (p ? { ...p, focus: p.focus || focus } : p));
      return;
    }
    // Outside the updater: sideFor may pan the map, which must happen once.
    setPreview({ key: pin.key, side: sideFor(pin.lngLat), focus, list });
  };
  const hideSoon = () => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setPreview(null), HIDE_DELAY);
  };

  const openCluster = async (pin: Extract<Pin, { kind: "cluster" }>) => {
    const map = mapRef.current;
    const source = map?.getSource("practices") as GeoJSONSource | undefined;
    if (!map || !source) return;
    const zoom = await source.getClusterExpansionZoom(pin.clusterId);
    if (zoom <= MAX_ZOOM && zoom <= CLUSTER_MAX_ZOOM && map.getZoom() < CLUSTER_MAX_ZOOM) {
      setPreview(null);
      const opts = {
        center: pin.lngLat,
        zoom: Math.min(zoom + 0.25, MAX_ZOOM),
      };
      if (reducedRef.current) map.jumpTo(opts);
      else map.easeTo({ ...opts, duration: 500 });
      return;
    }
    // Practices that share one address never split: list them instead.
    const leaves = await source.getClusterLeaves(pin.clusterId, 50, 0);
    const list = leaves.map((f) => byId.get(String(f.properties?.id))).filter(Boolean) as Therapist[];
    show(pin, true, list);
  };

  const zoom = (dir: 1 | -1) => {
    const map = mapRef.current;
    if (!map) return;
    const opts = reducedRef.current ? { animate: false } : { duration: 250 };
    if (dir > 0) map.zoomIn(opts);
    else map.zoomOut(opts);
  };

  const noMatches = full && query.trim() !== "" && shown.length === 0;

  return (
    <div className={styles.root} data-mode={mode} data-status={status}>
      {status === "loading" && <p className={styles.state}>Loading map…</p>}
      {status === "error" && (
        <p className={styles.state} role="status">
          The map could not be loaded. The list shows every practice.
        </p>
      )}

      {status === "ready" &&
        pins.map((pin) =>
          createPortal(
            <PinMarker
              key={pin.key}
              pin={pin}
              interactive={full}
              preview={preview?.key === pin.key ? preview : null}
              therapist={pin.kind === "point" ? byId.get(pin.id) : undefined}
              onEnter={(focus) => show(pin, focus)}
              onLeave={hideSoon}
              onActivate={() => (pin.kind === "cluster" ? openCluster(pin) : show(pin, true))}
              reduced={reduced}
            />,
            pin.el,
            pin.key,
          ),
        )}

      {full ? (
        <>
          <div className={styles.search} role="search">
            <label className="sr-only" htmlFor={`${uid}-q`}>
              Search the map
            </label>
            <input
              id={`${uid}-q`}
              className={styles.searchInput}
              type="search"
              autoComplete="off"
              placeholder="Institution, location or postal code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <button
                type="button"
                className={styles.searchClear}
                aria-label="Clear map search"
                onClick={() => setQuery("")}
              >
                <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                  <path d="M1 1l6 6M7 1 1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <SearchIcon className={styles.searchIcon} aria-hidden />
            )}
          </div>
          {noMatches && (
            <p className={styles.note} role="status">
              No mapped practice matches “{query.trim()}”.
            </p>
          )}
          <p className="sr-only" aria-live="polite">
            {query.trim() && shown.length > 0 ? `${shown.length} practices on the map` : ""}
          </p>

          {onClose && (
            <button
              type="button"
              className={`${styles.control} ${styles.close}`}
              aria-label="Close map"
              onClick={onClose}
            >
              <CloseIcon aria-hidden />
            </button>
          )}
          <div className={styles.zoom} role="group" aria-label="Zoom">
            <button type="button" className={styles.control} aria-label="Zoom in" onClick={() => zoom(1)}>
              <PlusIcon aria-hidden />
            </button>
            <button type="button" className={styles.control} aria-label="Zoom out" onClick={() => zoom(-1)}>
              <MinusIcon aria-hidden />
            </button>
          </div>
        </>
      ) : (
        <div className={styles.summary}>
          <p className={styles.summaryText}>
            {nearby > 0
              ? `${nearby} ${nearby === 1 ? "practice" : "practices"} around ${NEARBY.label}`
              : mapped.length > 0
                ? `${mapped.length} matching ${mapped.length === 1 ? "practice" : "practices"} on the map`
                : "No matching practice on the map"}
          </p>
          <span className={styles.summaryRule} aria-hidden="true" />
          <div className={styles.summaryFoot}>
            <button type="button" className={styles.expand} onClick={onExpand}>
              View In Map
              <MapIcon aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* After the controls in the DOM so Tab reaches search and zoom before the pins. */}
      <div ref={containerRef} className={styles.canvas} aria-hidden={!full || undefined} />
    </div>
  );
}

function PinMarker({
  pin,
  interactive,
  preview,
  therapist,
  onEnter,
  onLeave,
  onActivate,
  reduced,
}: {
  pin: Pin;
  interactive: boolean;
  preview: Preview | null;
  therapist?: Therapist;
  onEnter: (focus: boolean) => void;
  onLeave: () => void;
  onActivate: () => void;
  reduced: boolean;
}) {
  const open = !!preview;
  const focus = !!preview?.focus;

  if (!interactive) {
    return (
      <span className={styles.pin} data-size="small" data-kind={pin.kind}>
        {pin.kind === "cluster" ? pin.count : null}
      </span>
    );
  }

  const label =
    pin.kind === "cluster"
      ? `${pin.count} practices in this area, zoom in`
      : therapist
        ? [therapist.name, therapist.contact, levelName(therapist)].filter(Boolean).join(", ")
        : "Practice";

  const mouse = (e: React.PointerEvent) => e.pointerType === "mouse" || e.pointerType === "pen";

  return (
    <div
      className={styles.group}
      data-side={preview?.side}
      onPointerEnter={(e) => mouse(e) && pin.kind === "point" && onEnter(false)}
      onPointerLeave={(e) => mouse(e) && onLeave()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onLeave();
      }}
    >
      <button
        type="button"
        className={styles.pin}
        data-kind={pin.kind}
        data-focus={focus || undefined}
        aria-label={label}
        aria-expanded={pin.kind === "point" || preview?.list ? open : undefined}
        onFocus={() => pin.kind === "point" && onEnter(false)}
        onClick={onActivate}
      >
        {pin.kind === "cluster" ? pin.count : <span className={styles.dot} aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {preview && (therapist || preview.list) && (
          <motion.div
            key="card"
            className={styles.card}
            data-focus={focus || undefined}
            initial={{
              opacity: 0,
              x: reduced ? 0 : preview.side === "right" ? -6 : 6,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
            onPointerEnter={(e) => mouse(e) && onEnter(true)}
            onFocus={() => onEnter(true)}
          >
            {preview.list ? (
              <div className={styles.list}>
                <p className={styles.listHead}>{preview.list.length} practices at this address</p>
                <ul>
                  {preview.list.map((t) => (
                    <li key={t.id}>
                      <PracticeLink therapist={t} focus={focus} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <PracticeLink therapist={therapist!} focus={focus} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Paper map card: photo, the therapist (or the practice when no one is named), then the
 * practice and recorded level, as on the directory card. Only a record with a profile
 * page is a link with the arrow; the rest are plain rows.
 */
function PracticeLink({ therapist: t, focus }: { therapist: Therapist; focus: boolean }) {
  const level = levelName(t);
  const title = t.contact ?? t.name;
  const meta = [t.contact ? t.name : undefined, level].filter(Boolean) as string[];
  const Tag = t.profileHref ? "a" : "div";
  return (
    <Tag href={t.profileHref} className={styles.practice}>
      <span className={styles.photo} aria-hidden="true">
        {initials(title)}
      </span>
      <span className={styles.text}>
        <span className={styles.name} title={title}>
          {title}
        </span>
        {meta.length > 0 && (
          <span className={styles.meta}>
            {meta.map((m, i) => (
              <span key={m} className={styles.metaItem} title={m}>
                {i > 0 && <span className={styles.sep} aria-hidden="true" />}
                <span className={styles.metaText}>{m}</span>
              </span>
            ))}
          </span>
        )}
      </span>
      {t.profileHref && (
        <span className={styles.arrow} data-focus={focus || undefined} aria-hidden="true">
          <ArrowCornerIcon />
        </span>
      )}
    </Tag>
  );
}

function toGeoJSON(list: Therapist[]) {
  return {
    type: "FeatureCollection" as const,
    features: list.map((t) => ({
      type: "Feature" as const,
      properties: { id: t.id },
      geometry: {
        type: "Point" as const,
        coordinates: [t.location![1], t.location![0]],
      },
    })),
  };
}

function syncMarkers(
  ml: typeof import("maplibre-gl"),
  map: MlMap,
  markers: Map<string, Marker>,
  setPins: (fn: (prev: Pin[]) => Pin[]) => void,
) {
  const next = new Map<string, PinData>();
  for (const f of map.querySourceFeatures("practices")) {
    const p = f.properties ?? {};
    const lngLat = (f.geometry as GeoJSON.Point).coordinates as [number, number];
    if (p.cluster) {
      const key = `c${p.cluster_id}`;
      if (!next.has(key))
        next.set(key, {
          key,
          kind: "cluster",
          lngLat,
          clusterId: p.cluster_id,
          count: p.point_count,
        });
    } else {
      const key = `p${p.id}`;
      if (!next.has(key)) next.set(key, { key, kind: "point", lngLat, id: String(p.id) });
    }
  }

  let changed = false;
  for (const [key, marker] of markers) {
    if (!next.has(key)) {
      marker.remove();
      markers.delete(key);
      changed = true;
    }
  }
  for (const [key, pin] of next) {
    if (markers.has(key)) continue;
    const el = document.createElement("div");
    el.className = styles.marker;
    const marker = new ml.Marker({ element: el, anchor: "center" }).setLngLat(pin.lngLat).addTo(map);
    // MapLibre makes the marker itself a button; the pin inside is the real control.
    el.removeAttribute("role");
    el.removeAttribute("aria-label");
    el.removeAttribute("tabindex");
    markers.set(key, marker);
    changed = true;
  }
  if (!changed) return;
  setPins(() =>
    [...next.values()].map(
      (pin) =>
        ({
          ...pin,
          el: markers.get(pin.key)!.getElement() as HTMLDivElement,
        }) as Pin,
    ),
  );
}

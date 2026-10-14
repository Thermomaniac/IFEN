// The directory map: OpenFreeMap's Positron style, recoloured to the IFEN cream land,
// green parks and pale blue water of the Paper map. Loaded once per visit.

import type { StyleSpecification } from "maplibre-gl";

export const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const FILLS: Record<string, string> = {
  background: "#F8F4E3",
  park: "#ACD47C",
  landcover_wood: "#B6D78A",
  water: "#B6D9F7",
  building: "#EFE9D3",
  landuse_residential: "#F4EFDC",
};

function recolour(style: StyleSpecification): StyleSpecification {
  const layers = style.layers.map((layer) => {
    const l = { ...layer, paint: { ...(layer as { paint?: object }).paint } } as typeof layer & {
      paint: Record<string, unknown>;
    };
    const fill = FILLS[l.id];
    if (l.type === "background" && fill) l.paint["background-color"] = fill;
    else if (l.type === "fill" && fill) l.paint["fill-color"] = fill;
    else if (l.id === "waterway") l.paint["line-color"] = "#B6D9F7";
    else if (l.type === "line" && /^highway_.*(inner|minor|path|subtle)$/.test(l.id)) l.paint["line-color"] = "#FFFFFF";
    else if (l.type === "line" && /^(tunnel_|highway_).*casing$/.test(l.id)) l.paint["line-color"] = "#E8E1C8";
    return l;
  });
  return { ...style, layers };
}

let pending: Promise<StyleSpecification> | null = null;

export function loadMapStyle() {
  pending ??= fetch(MAP_STYLE_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`Map style ${r.status}`);
      return r.json() as Promise<StyleSpecification>;
    })
    .then(recolour)
    .catch((e) => {
      pending = null; // a later open may retry
      throw e;
    });
  return pending;
}

let lib: Promise<typeof import("maplibre-gl")> | null = null;
type Maplibre = typeof import("maplibre-gl");
export const loadMaplibre = () =>
  (lib ??= import("maplibre-gl").then((m) => (m as unknown as { default?: Maplibre }).default ?? (m as unknown as Maplibre)));

/** A circle of `radiusKm` around [lat, lng] as a GeoJSON polygon. */
export function circlePolygon([lat, lng]: [number, number], radiusKm: number, steps = 96) {
  const coords: [number, number][] = [];
  const dLat = radiusKm / 110.574;
  const dLng = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * 2 * Math.PI;
    coords.push([lng + dLng * Math.cos(a), lat + dLat * Math.sin(a)]);
  }
  return {
    type: "Feature" as const,
    properties: {},
    geometry: { type: "Polygon" as const, coordinates: [coords] },
  };
}

/** Zoom at which `radiusKm` spans `diameterPx` across, at latitude `lat` (512px tiles). */
export function zoomForRadius(lat: number, radiusKm: number, diameterPx: number) {
  const metresPerPx = (2 * radiusKm * 1000) / diameterPx;
  return Math.log2((40075016.686 * Math.cos((lat * Math.PI) / 180)) / (512 * metresPerPx));
}

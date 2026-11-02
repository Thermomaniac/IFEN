"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Prototype V1/V2 choice for the two areas the client compares (homepage Our
 * Location, therapist flow). Stored per area in localStorage so it survives
 * navigation; the server and first paint always use the area's default.
 */
export type Version = "v1" | "v2";

const EVENT = "ifen-version";
const storageKey = (area: string) => `ifen-version:${area}`;
// Fallback when storage is blocked, so the switch still works until reload.
const memory = new Map<string, Version>();

function read(area: string): Version | null {
  try {
    const value = localStorage.getItem(storageKey(area));
    return value === "v1" || value === "v2" ? value : (memory.get(area) ?? null);
  } catch {
    return memory.get(area) ?? null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useVersion(area: string, fallback: Version): [Version, (next: Version) => void] {
  const version = useSyncExternalStore(
    subscribe,
    () => read(area) ?? fallback,
    () => fallback,
  );

  const setVersion = useCallback(
    (next: Version) => {
      memory.set(area, next);
      try {
        localStorage.setItem(storageKey(area), next);
      } catch {
        // Storage blocked: the in-memory choice lasts until reload.
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [area],
  );

  return [version, setVersion];
}

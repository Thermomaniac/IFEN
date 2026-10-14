import { useSyncExternalStore } from "react";
import type { Fields } from "./registration";

/**
 * Mentor booking state, shared by the booking steps. Works like the course
 * registration store: sessionStorage, so a reload or a Back press keeps what was
 * typed, and cleared when the booking finishes. Values belong to one mentor; opening
 * another mentor's flow starts empty.
 */
type MentorBooking = { mentor: string; values: Fields };

const KEY = "ifen:mentor-booking";
const INITIAL: MentorBooking = { mentor: "", values: {} };
const EMPTY: Fields = {};

let cache: MentorBooking | null = null;
const listeners = new Set<() => void>();

function load(): MentorBooking {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return INITIAL;
    const data = JSON.parse(raw) as Partial<MentorBooking>;
    return { mentor: data.mentor ?? "", values: data.values ?? {} };
  } catch {
    return INITIAL;
  }
}

function getSnapshot() {
  cache ??= load();
  return cache;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function write(next: MentorBooking) {
  cache = next;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage full: state still lives in memory for this tab.
  }
  listeners.forEach((l) => l());
}

/** The stored values for this mentor, or none when they belong to another. */
export function useMentorBooking(mentor: string): Fields {
  const booking = useSyncExternalStore(subscribe, getSnapshot, () => INITIAL);
  return booking.mentor === mentor ? booking.values : EMPTY;
}

export function saveMentorBooking(mentor: string, values: Fields) {
  write({ mentor, values });
}

export function clearMentorBooking() {
  write(INITIAL);
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {}
}

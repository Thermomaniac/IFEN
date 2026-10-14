import { useSyncExternalStore } from "react";
/**
 * Booking state shared by the registration steps. Kept in
 * sessionStorage so a reload or a Back press never loses what was typed, and
 * cleared once payment completes. A tiny external store: components read it
 * with useRegistration() and write through the setters below.
 */
export type Fields = Record<string, string>;

// The package is a billing field ("plan"), so it is validated like any other.
export type Registration = {
  participant: Fields;
  billing: Fields;
};

const KEY = "ifen:registration";
const INITIAL: Registration = { participant: {}, billing: {} };

let cache: Registration | null = null;
const listeners = new Set<() => void>();

function load(): Registration {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return INITIAL;
    const data = JSON.parse(raw) as Partial<Registration>;
    return {
      participant: data.participant ?? {},
      billing: data.billing ?? {},
    };
  } catch {
    return INITIAL;
  }
}

function getSnapshot() {
  cache ??= load();
  return cache;
}

function getServerSnapshot() {
  return INITIAL;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function write(next: Registration) {
  cache = next;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage full: state still lives in memory for this tab.
  }
  listeners.forEach((l) => l());
}

export function useRegistration() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function saveStep(step: "participant" | "billing", fields: Fields) {
  write({ ...getSnapshot(), [step]: fields });
}

export function clearRegistration() {
  write(INITIAL);
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {}
}

const noop = () => () => {};

/**
 * False during the server render and hydration, true afterwards. Forms wait for
 * it so their initial values come from sessionStorage, not the empty server state.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * Outcome of a finished booking, kept apart from the form data above: the
 * registration can be complete while the payment is still pending (bank
 * transfer). Session-only until a booking backend exists; the Offers page reads
 * it to show the pending notice.
 */
export type BookingStatus = {
  course: string;
  registration: "complete";
  payment: "paid" | "pending";
  method: string;
  /** Set until the Offers page has cleared the finished form data once. */
  fresh?: boolean;
  /** The visitor closed the pending notice; the status itself stays. */
  dismissed?: boolean;
};

const STATUS_KEY = "ifen:booking-status";
let statusCache: BookingStatus | null | undefined;
const statusListeners = new Set<() => void>();

function loadStatus(): BookingStatus | null {
  try {
    const raw = window.sessionStorage.getItem(STATUS_KEY);
    return raw ? (JSON.parse(raw) as BookingStatus) : null;
  } catch {
    return null;
  }
}

export function saveBookingStatus(status: BookingStatus | null) {
  statusCache = status;
  try {
    if (status) window.sessionStorage.setItem(STATUS_KEY, JSON.stringify(status));
    else window.sessionStorage.removeItem(STATUS_KEY);
  } catch {}
  statusListeners.forEach((l) => l());
}

export function useBookingStatus() {
  return useSyncExternalStore(
    (onChange) => {
      statusListeners.add(onChange);
      return () => statusListeners.delete(onChange);
    },
    () => (statusCache === undefined ? (statusCache = loadStatus()) : statusCache),
    () => null,
  );
}

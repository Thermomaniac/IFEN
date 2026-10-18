"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import styles from "./FilterSelect.module.css";

export type FilterOption = { value: string; label: string; icon?: ReactNode };

/**
 * Paper dropdown for listing filters: a select-only combobox (WAI pattern). Focus
 * stays on the trigger while arrow keys move through the list; the page behind
 * dims while it is open. A chosen value turns the field sage with a clear button.
 * `compact` is the small page-size picker next to the results title.
 */
export function FilterSelect({
  label,
  value,
  all,
  placeholder,
  options,
  onChange,
  compact = false,
  className,
}: {
  /** Accessible name of the field. */
  label: string;
  value: string;
  /** Label of the empty choice ("All Types"); omitted when a value is always set. */
  all?: string;
  /** Trigger text while nothing is chosen, when it should differ from `all` ("Country"). */
  placeholder?: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  compact?: boolean;
  className?: string;
}) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const items: FilterOption[] = all === undefined ? options : [{ value: "", label: all }, ...options];
  const selectedIndex = Math.max(0, items.findIndex((o) => o.value === value));
  const selected = items[selectedIndex];
  const chosen = all !== undefined && value !== "";

  const show = () => {
    setActive(selectedIndex);
    setOpen(true);
  };
  const pick = (index: number) => {
    onChange(items[index].value);
    setOpen(false);
  };

  // Clicks outside close the list; the overlay catches most, this covers the rest.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option in view when the list scrolls.
  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
      PageDown: Math.min(active + 10, last),
      PageUp: Math.max(active - 10, 0),
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Type-ahead: jump to the next option starting with the typed letter.
      const key = e.key.toLowerCase();
      const order = [...items.keys()].map((i) => (active + 1 + i) % items.length);
      const hit = order.find((i) => items[i].label.toLowerCase().startsWith(key));
      if (hit !== undefined) setActive(hit);
    }
  };

  return (
    <div
      ref={rootRef}
      className={[styles.root, compact ? styles.compact : "", className].filter(Boolean).join(" ")}
      data-open={open || undefined}
      data-chosen={chosen || undefined}
    >
      {open && <div className={styles.overlay} aria-hidden="true" onPointerDown={() => setOpen(false)} />}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        className={styles.trigger}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        {chosen || placeholder === undefined ? (
          <>
            {selected.icon}
            <span className={styles.value}>{selected.label}</span>
          </>
        ) : (
          <span className={styles.value}>{placeholder}</span>
        )}
      </button>
      {chosen && (
        <button
          type="button"
          className={styles.clear}
          aria-label={`Clear ${label.toLowerCase()}`}
          onClick={() => {
            onChange("");
            setOpen(false);
            triggerRef.current?.focus();
          }}
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
            <path d="M1 1l6 6M7 1 1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <ChevronDownIcon className={styles.chevron} aria-hidden />
      <ul
        ref={listRef}
        id={`${uid}-list`}
        role="listbox"
        aria-label={label}
        className={styles.menu}
        hidden={!open}
      >
        {items.map((o, i) => (
          <li
            key={o.value || "all"}
            id={`${uid}-opt-${i}`}
            role="option"
            aria-selected={o.value === value}
            data-active={i === active || undefined}
            className={styles.option}
            onPointerEnter={() => setActive(i)}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => {
              pick(i);
              triggerRef.current?.focus();
            }}
          >
            {o.icon}
            <span>{o.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

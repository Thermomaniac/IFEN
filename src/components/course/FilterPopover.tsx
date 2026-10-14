"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { menuOverflows } from "./FilterMulti";
import base from "./FilterSelect.module.css";
import styles from "./FilterPopover.module.css";

/**
 * A FilterSelect-style field that opens a panel instead of a list: the price slider
 * and the date-range calendar. Same trigger, chosen state, clear dot and page overlay.
 * Esc or a click outside closes it and focus returns to the trigger.
 */
export function FilterPopover({
  label,
  summary,
  onClear,
  children,
  className,
}: {
  /** Field name, the trigger text while nothing is chosen. */
  label: string;
  /** Trigger text once a value is chosen ("28 - 124 EUR"); null when nothing is chosen. */
  summary: string | null;
  onClear: () => void;
  children: ReactNode;
  className?: string;
}) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [alignEnd, setAlignEnd] = useState(false);
  const chosen = summary !== null;

  const show = () => {
    setAlignEnd(menuOverflows(rootRef.current));
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={[base.root, styles.root, className].filter(Boolean).join(" ")}
      data-open={open || undefined}
      data-chosen={chosen || undefined}
      data-align={alignEnd ? "end" : undefined}
      onBlur={(e) => {
        // Tabbing out of the panel closes it, as Tab does in the select menus.
        if (open && !e.currentTarget.contains(e.relatedTarget as Node | null) && e.relatedTarget) close(false);
      }}
    >
      {open && <div className={base.overlay} aria-hidden="true" onPointerDown={() => setOpen(false)} />}
      <button
        ref={triggerRef}
        type="button"
        className={base.trigger}
        aria-label={chosen ? `${label}: ${summary}` : label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        onClick={() => (open ? setOpen(false) : show())}
      >
        <span className={base.value}>{summary ?? label}</span>
      </button>
      {chosen && (
        <button
          type="button"
          className={base.clear}
          aria-label={`Clear ${label.toLowerCase()}`}
          onClick={() => {
            onClear();
            close();
          }}
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
            <path d="M1 1l6 6M7 1 1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <ChevronDownIcon className={base.chevron} aria-hidden />
      <div id={`${uid}-panel`} role="dialog" aria-label={label} className={`${base.menu} ${styles.panel}`} hidden={!open}>
        {open && children}
      </div>
    </div>
  );
}

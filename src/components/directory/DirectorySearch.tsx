"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { EASE } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import styles from "./DirectorySearch.module.css";

/**
 * Paper directory search: a 42px square button that grows in the filter row to the
 * Training & Other Offers search width while the dropdowns beside it shrink, with the
 * same page overlay. Esc, the overlay or leaving the field folds it back; a query keeps
 * the button sage.
 */
export function DirectorySearch({
  value,
  onChange,
  placeholder = "Practice, city or postcode",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const uid = useId();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const expand = () => setOpen(true);
  const collapse = (refocus: boolean) => {
    setOpen(false);
    if (refocus) requestAnimationFrame(() => buttonRef.current?.focus());
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const transition = reduced ? { duration: 0 } : { duration: 0.3, ease: EASE };

  return (
    <div ref={rootRef} className={styles.root} data-open={open || undefined}>
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          className={styles.button}
          data-active={value ? "" : undefined}
          aria-label={value ? `Search: ${value}` : "Search"}
          aria-expanded={open}
          aria-controls={`${uid}-field`}
          onClick={expand}
        >
          <SearchIcon aria-hidden />
        </button>
      )}

      {/*
        Only the overlay fades out. The field leaves at once so it never shares the row
        with the returning button (they stacked for the length of the fade).
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className={styles.overlay}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onPointerDown={() => collapse(false)}
          />
        )}
      </AnimatePresence>

      {open && (
        <motion.div
          key="field"
          id={`${uid}-field`}
          className={styles.field}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <label className="sr-only" htmlFor={`${uid}-q`}>
            Search practices
          </label>
          <input
            ref={inputRef}
            id={`${uid}-q`}
            className={styles.input}
            type="search"
            autoComplete="off"
            enterKeyHint="search"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                e.preventDefault();
                collapse(true);
              }
            }}
            onBlur={(e) => {
              if (!rootRef.current?.contains(e.relatedTarget as Node | null)) collapse(false);
            }}
          />
          {value ? (
            <button
              type="button"
              className={styles.clear}
              aria-label="Clear search"
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                <path d="M1 1l6 6M7 1 1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            <SearchIcon className={styles.icon} aria-hidden />
          )}
        </motion.div>
      )}
    </div>
  );
}

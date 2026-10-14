"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import base from "./FilterSelect.module.css";
import styles from "./FilterMulti.module.css";

/** Menus are wider than narrow fields; near the right edge they open leftwards instead. */
export function menuOverflows(root: HTMLElement | null, width = 312) {
  if (!root) return false;
  const r = root.getBoundingClientRect();
  return r.left + width > document.documentElement.clientWidth - 16;
}

export type MultiOption = {
  value: string;
  label: string;
  icon?: ReactNode;
  /** Shown instead of a checkbox when the option cannot match anything yet. */
  disabledHint?: string;
};

/**
 * Multi-select sibling of FilterSelect: same field, menu, overlay and keyboard model,
 * but the list stays open while options toggle and every row carries a checkbox.
 * Chosen: the sage field with an ink count badge; values clear from the menu or
 * the listing's "Clear Filter".
 */
export function FilterMulti({
  label,
  values,
  options,
  onChange,
  className,
}: {
  /** Field name, also the trigger text. */
  label: string;
  values: string[];
  options: MultiOption[];
  onChange: (values: string[]) => void;
  className?: string;
}) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [alignEnd, setAlignEnd] = useState(false);
  const chosen = values.length > 0;

  const show = () => {
    setAlignEnd(menuOverflows(rootRef.current));
    setActive(0);
    setOpen(true);
  };

  const toggle = (index: number) => {
    const o = options[index];
    if (!o || o.disabledHint) return;
    onChange(values.includes(o.value) ? values.filter((v) => v !== o.value) : [...values, o.value]);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
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
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={[base.root, styles.root, className].filter(Boolean).join(" ")}
      data-open={open || undefined}
      data-chosen={chosen || undefined}
      data-align={alignEnd ? "end" : undefined}
    >
      {open && <div className={base.overlay} aria-hidden="true" onPointerDown={() => setOpen(false)} />}
      <button
        type="button"
        role="combobox"
        className={base.trigger}
        aria-label={chosen ? `${label}, ${values.length} selected` : label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${uid}-list`}
        aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span className={base.value}>{label}</span>
        {chosen && (
          <span className={styles.badge} aria-hidden="true">
            {values.length}
          </span>
        )}
      </button>
      <ChevronDownIcon className={base.chevron} aria-hidden />
      <ul
        ref={listRef}
        id={`${uid}-list`}
        role="listbox"
        aria-multiselectable="true"
        aria-label={label}
        className={`${base.menu} ${styles.menu}`}
        hidden={!open}
      >
        {options.map((o, i) => {
          const on = values.includes(o.value);
          return (
            <li
              key={o.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={on}
              aria-disabled={o.disabledHint ? true : undefined}
              data-active={i === active || undefined}
              className={`${base.option} ${styles.option}`}
              onPointerEnter={() => setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => toggle(i)}
            >
              <span className={styles.icon}>{o.icon}</span>
              <span className={styles.label}>{o.label}</span>
              {o.disabledHint ? (
                <span className={styles.hint}>{o.disabledHint}</span>
              ) : (
                <span className={styles.box} aria-hidden="true">
                  {on && <CheckIcon />}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { navLinks, type NavLink } from "@/data/site";
import styles from "./MainNav.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MainNav({ currentHref = "/" }: { currentHref?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/brand/logo-ifen.png" alt="IFEN home" width={92} height={42} preload />
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <Dropdown link={link} />
                ) : (
                  <a
                    href={link.href}
                    className={styles.link}
                    aria-current={link.href === currentHref ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#" className={styles.login}>
            Login
          </a>
          <a href="#" className={styles.register}>
            Register
          </a>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={drawerOpen}
          aria-controls="mobile-menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} currentHref={currentHref} />
    </header>
  );
}

function Dropdown({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
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
      ref={ref}
      className={styles.dropdown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={styles.link}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {link.label}
        <ChevronDownIcon className={styles.chevron} data-open={open || undefined} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            className={styles.menu}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {link.children!.map((child) => (
              <li key={child.label}>
                <a href={child.href} className={styles.menuLink} onClick={() => setOpen(false)}>
                  {child.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDrawer({ open, onClose, currentHref }: { open: boolean; onClose: () => void; currentHref: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = useCallback(() => {
    onClose();
    // Return focus to the trigger that opened the drawer.
    document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <div className={styles.drawerRoot}>
          <motion.div
            className={styles.backdrop}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className={styles.drawerTop}>
              <Image src="/brand/logo-ifen.png" alt="" width={92} height={42} />
              <button type="button" className={styles.menuButton} onClick={close}>
                <CloseIcon />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Main">
              <ul className={styles.drawerLinks}>
                {navLinks.map((link) => {
                  const isOpen = expanded === link.label;
                  const subId = `drawer-${link.label.replace(/\s+/g, "-").toLowerCase()}`;
                  return (
                    <li key={link.label}>
                      {link.children ? (
                        <>
                          <button
                            type="button"
                            className={styles.drawerLink}
                            aria-expanded={isOpen}
                            aria-controls={subId}
                            onClick={() => setExpanded(isOpen ? null : link.label)}
                          >
                            {link.label}
                            <ChevronDownIcon className={styles.chevron} data-open={isOpen || undefined} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.ul
                                id={subId}
                                className={styles.drawerSub}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                              >
                                {link.children.map((child) => (
                                  <li key={child.label}>
                                    <a href={child.href} className={styles.drawerSubLink} onClick={onClose}>
                                      {child.label}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={link.href}
                          className={styles.drawerLink}
                          aria-current={link.href === currentHref ? "page" : undefined}
                          onClick={onClose}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={styles.drawerActions}>
              <a href="#" className={styles.register}>
                Register
              </a>
              <a href="#" className={styles.login}>
                Login
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

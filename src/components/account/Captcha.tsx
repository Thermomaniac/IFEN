"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

/** Site key for reCAPTCHA v2 (checkbox), the check the live register, reset and remind forms use. */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/**
 * Renders the Google reCAPTCHA v2 checkbox explicitly once its script loads, and
 * reports the token (or "" when it expires). Rendered only when a site key is set;
 * the server verifies every token with the matching secret.
 */
export function Captcha({
  onToken,
  resetKey,
  error,
}: {
  onToken: (token: string, expired?: boolean) => void;
  /** Change it to clear the check, e.g. after a failed submission. */
  resetKey: number;
  error?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(() => typeof window !== "undefined" && !!window.grecaptcha?.render);
  const tokenRef = useRef(onToken);
  useEffect(() => {
    tokenRef.current = onToken;
  });

  const render = useCallback(() => {
    const g = window.grecaptcha;
    if (!g || !box.current || widget.current !== null) return;
    g.ready(() => {
      if (!box.current || widget.current !== null) return;
      widget.current = g.render(box.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token: string) => tokenRef.current(token),
        "expired-callback": () => tokenRef.current("", true),
        "error-callback": () => tokenRef.current(""),
      });
    });
  }, []);

  useEffect(() => {
    if (loaded) render();
  }, [loaded, render]);

  useEffect(() => {
    if (resetKey > 0 && widget.current !== null) window.grecaptcha?.reset(widget.current);
  }, [resetKey]);

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" onReady={() => setLoaded(true)} />
      <div ref={box} id="field-captcha" tabIndex={-1} aria-describedby={error ? "field-captcha-error" : undefined} />
    </>
  );
}

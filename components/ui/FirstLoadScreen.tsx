"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "triofy-loader-seen";

export default function FirstLoadScreen() {
  const [phase, setPhase] = useState<"show" | "hide" | "hidden">("show");
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      setPhase("hidden");
      return;
    }

    document.body.classList.add("loader-lock");

    const visibleMs = prefersReducedMotion ? 700 : 1800;
    const fadeMs = prefersReducedMotion ? 200 : 500;

    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("hide");
    }, visibleMs);

    const removeTimer = window.setTimeout(() => {
      setPhase("hidden");
    }, visibleMs + fadeMs);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("loader-lock");
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase === "hidden") {
      document.body.classList.remove("loader-lock");
    }
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`loader-overlay ${phase === "hide" ? "loader-fade-out" : ""}`}
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="loader-holo-grid" aria-hidden="true" />
      <div className="loader-holo-glow" aria-hidden="true" />
      <div className="loader-content">
        <div className="loader-holo-card" aria-hidden="true">
          <div className="loader-holo-lines" />
          <div className="loader-holo-beam" />
        </div>
        <div className="loader-mark">
          <span className="loader-mark-primary">Triofy</span>
          <span className="loader-mark-secondary">Agency</span>
        </div>
        <p className="loader-text">Scanning brand signature</p>
      </div>
    </div>
  );
}

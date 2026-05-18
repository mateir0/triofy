"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { Mesh } from "three";

const STORAGE_KEY = "triofy-loader-seen";

function CoreOrb({ reduceMotion }: { reduceMotion: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || reduceMotion) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.35;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.55;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#F4C542"
        metalness={0.85}
        roughness={0.2}
        emissive="#F4C542"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

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
      <div className="loader-aurora" aria-hidden="true" />
      <div className="loader-stars" aria-hidden="true" />
      <div className="loader-spotlight" aria-hidden="true" />
      <div className="loader-content">
        <div className="loader-mark">
          <span className="loader-mark-primary">Triofy</span>
          <span className="loader-mark-secondary">Agency</span>
        </div>
        <div className="loader-core-canvas" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 4, 4]} intensity={1.6} color="#F4C542" />
              <pointLight position={[-3, -3, 2]} intensity={0.7} color="#3B82F6" />
              <CoreOrb reduceMotion={prefersReducedMotion} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>
        <p className="loader-text">Rendering the Triofy core</p>
      </div>
    </div>
  );
}

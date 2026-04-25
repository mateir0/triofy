"use client";

import dynamic from "next/dynamic";
import { integrations } from "@/config/integrations";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#132331] to-[#0E1A24]" />
  ),
});

export default function SceneWrapper() {
  if (!integrations.featureFlags.show3D) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#F4C542]/5 to-[#3B82F6]/5" />
    );
  }

  return <HeroScene />;
}

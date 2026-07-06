"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <HeroScene />
    </div>
  );
}

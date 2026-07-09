"use client";

import { useT } from "@/lib/i18n/context";
import Marquee from "@/components/ui/Marquee";

export default function MarqueeBand() {
  const t = useT();
  return (
    <div className="border-y border-[var(--line)] bg-algodon/50 py-6">
      <Marquee items={t.home.marquee} speed={44} />
    </div>
  );
}

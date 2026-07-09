"use client";

import { useT } from "@/lib/i18n/context";
import type { Badge as BadgeType } from "@/lib/types";
import { cn } from "@/lib/utils";

const styleMap: Record<BadgeType, string> = {
  new: "bg-terracota text-algodon",
  capsule: "bg-nocturno text-lino",
  lastUnits: "bg-algodon/85 text-arcilla ring-1 ring-arcilla/30 backdrop-blur",
  soldOut: "bg-cacao/80 text-lino",
};

export default function Badge({
  type,
  className,
}: {
  type: BadgeType;
  className?: string;
}) {
  const t = useT();
  const label: Record<BadgeType, string> = {
    new: t.common.new,
    capsule: t.common.capsule,
    lastUnits: t.common.lastUnits,
    soldOut: t.common.soldOut,
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]",
        styleMap[type],
        className
      )}
    >
      {label[type]}
    </span>
  );
}

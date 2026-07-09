"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
};

export default function Marquee({
  items,
  speed = 40,
  className,
  itemClassName,
}: Props) {
  const reduced = useReducedMotion();

  const Row = ({ aria }: { aria?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={aria ? undefined : true}>
      {items.map((it, i) => (
        <span
          key={i}
          className={cn(
            "flex items-center whitespace-nowrap font-[family-name:var(--font-display)] text-2xl text-cacao/80 sm:text-3xl",
            itemClassName
          )}
        >
          <span className="italic">{it}</span>
          <span className="mx-7 text-lg text-terracota/60">✦</span>
        </span>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 px-6">
          <Row aria={false} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("marquee-wrap overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        <Row />
        <Row aria={false} />
      </div>
    </div>
  );
}

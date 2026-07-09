"use client";

import type { ColorOption } from "@/lib/types";
import { useLang } from "@/lib/i18n/context";
import { cn, pick } from "@/lib/utils";

export default function Swatches({
  colors,
  value,
  onChange,
}: {
  colors: ColorOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  const { locale, t } = useLang();
  const active = colors.find((c) => c.id === value) ?? colors[0];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">{t.product.selectColor}</span>
        <span className="text-sm text-taupe">{pick(active.name, locale)}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((c) => {
          const on = c.id === value;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              aria-label={pick(c.name, locale)}
              aria-pressed={on}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full ring-1 ring-inset ring-black/10 transition-all",
                on ? "outline outline-2 outline-offset-2 outline-terracota" : "hover:scale-105"
              )}
              style={{ backgroundColor: c.hex }}
            >
              <span className="sr-only">{pick(c.name, locale)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

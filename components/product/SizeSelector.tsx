"use client";

import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export default function SizeSelector({
  sizes,
  value,
  onChange,
  error,
  onOpenGuide,
}: {
  sizes: string[];
  value: string | null;
  onChange: (s: string) => void;
  error?: boolean;
  onOpenGuide: () => void;
}) {
  const { t } = useLang();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">{t.product.selectSize}</span>
        <button
          onClick={onOpenGuide}
          className="text-sm text-arcilla underline-offset-4 hover:underline"
        >
          {t.product.sizeGuide}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            aria-pressed={value === s}
            className={cn(
              "tabular min-w-11 rounded-full border px-4 py-2.5 text-sm font-medium transition-all",
              value === s
                ? "border-terracota bg-terracota text-algodon"
                : "border-[var(--line-strong)] text-cacao hover:border-cacao"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2.5 text-sm text-terracota" role="alert">
          {t.common.selectSizeFirst}
        </p>
      )}
    </div>
  );
}

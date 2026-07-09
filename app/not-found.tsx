"use client";

import { useT } from "@/lib/i18n/context";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const t = useT();
  return (
    <div className="page-top u-container flex min-h-[72vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display leading-none text-terracota/25 text-[clamp(6rem,22vw,13rem)]">
        {t.notFound.code}
      </p>
      <h1 className="mt-2 font-display text-[clamp(1.8rem,5vw,3rem)] text-cacao">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-taupe">{t.notFound.body}</p>
      <div className="mt-9">
        <Button href="/" size="lg" magnetic>
          {t.notFound.cta}
        </Button>
      </div>
    </div>
  );
}

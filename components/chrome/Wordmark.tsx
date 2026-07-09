import { cn } from "@/lib/utils";

export default function Wordmark({
  className,
  showComfy = false,
}: {
  className?: string;
  showComfy?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-medium leading-none tracking-tight text-cacao",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[0.82em] w-[0.82em] text-terracota"
        aria-hidden="true"
      >
        <path
          d="M20.5 15.2A8.2 8.2 0 0 1 9.1 4a8.2 8.2 0 1 0 11.4 11.2Z"
          fill="currentColor"
        />
      </svg>
      <span>
        Kunu&apos;u
        {showComfy && <span className="text-terracota"> Comfy</span>}
      </span>
    </span>
  );
}

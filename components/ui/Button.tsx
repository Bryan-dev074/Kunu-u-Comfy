"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
};

type AsButton = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type AsLink = BaseProps & {
  href: string;
  onClick?: () => void;
};

type Props = AsButton | AsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold uppercase tracking-[0.14em] transition-[color,box-shadow,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracota disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-[0.7rem]",
  lg: "px-9 py-4 text-xs",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-terracota text-algodon shadow-[0_14px_34px_-14px_rgba(192,103,74,0.7)] group-hover:text-arcilla hover:shadow-[0_0_0_1px_var(--color-terracota),0_18px_40px_-16px_rgba(192,103,74,0.55)]",
  dark:
    "bg-nocturno text-lino group-hover:text-nocturno",
  ghost:
    "border border-[color-mix(in_srgb,var(--color-terracota)_45%,transparent)] text-cacao group-hover:text-algodon",
};

const sweep: Record<Variant, string> = {
  primary: "bg-lino",
  dark: "bg-lino",
  ghost: "bg-terracota",
};

export default function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    magnetic = false,
    className,
  } = props;

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:origin-left group-hover:scale-x-100",
          sweep[variant]
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  const el =
    "href" in props && props.href !== undefined ? (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    ) : (
      <button
        type={(props as AsButton).type ?? "button"}
        onClick={props.onClick}
        disabled={(props as AsButton).disabled}
        className={classes}
      >
        {content}
      </button>
    );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

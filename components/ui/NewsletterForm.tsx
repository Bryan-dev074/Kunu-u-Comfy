"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterForm({
  placeholder,
  button,
  success,
  variant = "light",
  className,
}: {
  placeholder: string;
  button: string;
  success: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const dark = variant === "dark";

  if (sent) {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          dark ? "text-terracota-hi" : "text-arcilla",
          className
        )}
        role="status"
      >
        <Check size={18} /> {success}
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
      className={cn(
        "flex items-center gap-2 rounded-full border p-1.5 pl-5",
        dark
          ? "border-lino/20 bg-lino/5 focus-within:border-lino/40"
          : "border-[var(--line-strong)] bg-algodon focus-within:border-terracota",
        className
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          "h-10 flex-1 bg-transparent text-base outline-none",
          dark ? "text-lino placeholder:text-lino/45" : "text-cacao placeholder:text-taupe/70"
        )}
      />
      <button
        type="submit"
        aria-label={button}
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95",
          dark ? "bg-terracota text-lino" : "bg-terracota text-algodon"
        )}
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

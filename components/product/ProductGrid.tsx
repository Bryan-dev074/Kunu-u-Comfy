"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-7 xl:grid-cols-4",
        className
      )}
    >
      {products.map((p, i) =>
        reduced ? (
          <ProductCard key={p.slug} product={p} />
        ) : (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.06 }}
          >
            <ProductCard product={p} />
          </motion.div>
        )
      )}
    </div>
  );
}

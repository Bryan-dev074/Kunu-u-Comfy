import Image from "next/image";
import type { ColorOption, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import ProductArt from "@/components/art/ProductArt";

export default function ProductImage({
  product,
  color,
  view = "front",
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority,
}: {
  product: Product;
  color: ColorOption;
  view?: "front" | "detail";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = view === "detail" ? product.photoDetail ?? product.photo : product.photo;

  if (!src) {
    return (
      <ProductArt
        garment={product.garment}
        hex={color.hex}
        shade={color.shade}
        view={view}
        className={className}
      />
    );
  }

  return (
    <span className={cn("relative block overflow-hidden bg-arena/40", className)}>
      <Image
        src={src}
        alt={product.name.es}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}

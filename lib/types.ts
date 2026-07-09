export type Locale = "es" | "pt";

export type Bilingual = { es: string; pt: string };

export type Category = "adults" | "kids" | "family";

export type Badge = "new" | "capsule" | "lastUnits" | "soldOut";

/** Tipos de prenda → silueta ilustrada (components/art/ProductArt). */
export type Garment =
  | "robe"
  | "set-long"
  | "set-short"
  | "gown"
  | "kids-onesie"
  | "kids-set"
  | "family-set";

export type ColorOption = {
  id: string;
  name: Bilingual;
  /** Color base de la tela para la ilustración y el swatch. */
  hex: string;
  /** Tono profundo para sombras/detalle de la ilustración. */
  shade: string;
};

export type Product = {
  slug: string;
  name: Bilingual;
  tagline: Bilingual;
  category: Category;
  garment: Garment;
  price: number;
  compareAt?: number;
  sizes: string[];
  colors: ColorOption[];
  badges: Badge[];
  description: Bilingual;
  composition: Bilingual;
  featured: boolean;
  order: number;
  related: string[];
  /** Foto principal (en /public). Si falta, se usa la ilustración SVG. */
  photo?: string;
  /** Foto de detalle/tela para el hover-swap y la galería. */
  photoDetail?: string;
};

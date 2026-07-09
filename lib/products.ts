import type { ColorOption, Product } from "./types";

/* Paleta de colores de tela (variantes de producto) --------------------- */
const C = {
  arena: { id: "arena", name: { es: "Arena", pt: "Areia" }, hex: "#E4D5BE", shade: "#C4AC85" },
  marfil: { id: "marfil", name: { es: "Marfil", pt: "Marfim" }, hex: "#F0E7D6", shade: "#D5C6AD" },
  terracota: { id: "terracota", name: { es: "Terracota", pt: "Terracota" }, hex: "#C0674A", shade: "#97482F" },
  cacao: { id: "cacao", name: { es: "Cacao", pt: "Cacau" }, hex: "#6E5747", shade: "#4B3A2D" },
  rosa: { id: "rosa", name: { es: "Rosa Amanecer", pt: "Rosa Amanhecer" }, hex: "#E4B4A2", shade: "#C68974" },
  salvia: { id: "salvia", name: { es: "Salvia", pt: "Sálvia" }, hex: "#A6B199", shade: "#7C886C" },
  azul: { id: "azul", name: { es: "Azul Noche", pt: "Azul Noite" }, hex: "#8492A8", shade: "#5C6A80" },
  lavanda: { id: "lavanda", name: { es: "Lavanda", pt: "Lavanda" }, hex: "#B9AAC6", shade: "#8F7FA1" },
} satisfies Record<string, ColorOption>;

const ADULT_SIZES = ["XS", "S", "M", "L", "XL"];
const KIDS_SIZES = ["2", "4", "6", "8", "10"];

export const products: Product[] = [
  {
    slug: "bata-abrazo",
    name: { es: "Bata Abrazo", pt: "Robe Abraço" },
    tagline: { es: "El primer gesto de la noche", pt: "O primeiro gesto da noite" },
    category: "adults",
    garment: "robe",
    price: 129,
    sizes: ADULT_SIZES,
    colors: [C.arena, C.terracota, C.cacao],
    badges: ["capsule"],
    featured: true,
    order: 1,
    related: ["conjunto-amanecer", "bata-seda-noche", "camison-luna"],
    description: {
      es: "Una bata de rizo de algodón peinado que pesa lo justo para sentirse un abrazo. Cinturón envolvente, bolsillos hondos y un largo que cae con calma hasta media pierna.",
      pt: "Um robe de tecido atoalhado de algodão penteado que pesa o suficiente para parecer um abraço. Cinto envolvente, bolsos fundos e um comprimento que cai com calma até a metade da perna.",
    },
    composition: {
      es: "100% algodón orgánico peinado, 320 g/m². Lavado suave a 30°, secado a la sombra. Más suave con cada lavado.",
      pt: "100% algodão orgânico penteado, 320 g/m². Lavagem suave a 30°, secagem à sombra. Mais macio a cada lavagem.",
    },
  },
  {
    slug: "conjunto-amanecer",
    name: { es: "Conjunto Amanecer", pt: "Conjunto Amanhecer" },
    tagline: { es: "Los tonos de la primera luz", pt: "Os tons da primeira luz" },
    category: "adults",
    garment: "set-long",
    price: 119,
    sizes: ADULT_SIZES,
    colors: [C.rosa, C.marfil, C.azul],
    badges: ["new"],
    featured: true,
    order: 2,
    related: ["bata-abrazo", "conjunto-sereno", "pijama-clasico"],
    description: {
      es: "Camisa de manga larga con vivo en contraste y pantalón de caída fluida. El conjunto que inaugura la colección Amanecer, pensado para las mañanas sin apuro.",
      pt: "Camisa de manga longa com vivo em contraste e calça de caimento fluido. O conjunto que inaugura a coleção Amanhecer, pensado para as manhãs sem pressa.",
    },
    composition: {
      es: "100% algodón orgánico de fibra larga, 180 g/m². Tacto satinado. Lavado a máquina en frío, ciclo suave.",
      pt: "100% algodão orgânico de fibra longa, 180 g/m². Toque acetinado. Lavagem à máquina no frio, ciclo suave.",
    },
  },
  {
    slug: "camison-luna",
    name: { es: "Camisón Luna", pt: "Camisola Lua" },
    tagline: { es: "Ligero como respirar", pt: "Leve como respirar" },
    category: "adults",
    garment: "gown",
    price: 89,
    sizes: ADULT_SIZES,
    colors: [C.marfil, C.lavanda, C.rosa],
    badges: [],
    featured: false,
    order: 3,
    related: ["camison-brisa", "conjunto-amanecer", "bata-abrazo"],
    description: {
      es: "Camisón de tirantes ajustables y largo midi, con un frunce delicado bajo el pecho. Cae en cascada y no se siente sobre la piel.",
      pt: "Camisola de alças ajustáveis e comprimento midi, com um franzido delicado abaixo do busto. Cai em cascata e não se sente sobre a pele.",
    },
    composition: {
      es: "70% algodón orgánico, 30% modal de haya. Fluido y fresco. Lavado suave a 30°.",
      pt: "70% algodão orgânico, 30% modal de faia. Fluido e fresco. Lavagem suave a 30°.",
    },
  },
  {
    slug: "conjunto-sereno",
    name: { es: "Conjunto Sereno", pt: "Conjunto Sereno" },
    tagline: { es: "Para las noches tibias", pt: "Para as noites mornas" },
    category: "adults",
    garment: "set-short",
    price: 99,
    sizes: ADULT_SIZES,
    colors: [C.salvia, C.arena, C.azul],
    badges: ["new"],
    featured: false,
    order: 4,
    related: ["conjunto-amanecer", "camison-luna", "pijama-clasico"],
    description: {
      es: "Camisa de manga corta y short con cintura elástica cubierta. Liviano, fresco y con esa caída holgada que invita a no hacer nada.",
      pt: "Camisa de manga curta e short com cintura elástica coberta. Leve, fresco e com aquele caimento folgado que convida a não fazer nada.",
    },
    composition: {
      es: "100% algodón orgánico, gasa de doble capa. Aireado y suave. Lavado en frío.",
      pt: "100% algodão orgânico, gaze de dupla camada. Arejado e macio. Lavagem no frio.",
    },
  },
  {
    slug: "bata-seda-noche",
    name: { es: "Bata Seda Noche", pt: "Robe Seda Noite" },
    tagline: { es: "El lujo silencioso", pt: "O luxo silencioso" },
    category: "adults",
    garment: "robe",
    price: 149,
    sizes: ADULT_SIZES,
    colors: [C.cacao, C.terracota, C.azul],
    badges: ["capsule", "lastUnits"],
    featured: true,
    order: 5,
    related: ["bata-abrazo", "camison-luna", "conjunto-amanecer"],
    description: {
      es: "Bata corta de satén de algodón con solapa al tono y cinturón de lazo. Brilla apenas, se desliza sobre la piel y eleva cualquier noche.",
      pt: "Robe curto de cetim de algodão com lapela no tom e cinto de laço. Brilha de leve, desliza sobre a pele e eleva qualquer noite.",
    },
    composition: {
      es: "Satén de algodón orgánico 100%. Tacto sedoso y fresco. Lavado a mano o ciclo delicado.",
      pt: "Cetim de algodão orgânico 100%. Toque sedoso e fresco. Lavagem à mão ou ciclo delicado.",
    },
  },
  {
    slug: "pijama-clasico",
    name: { es: "Pijama Clásico", pt: "Pijama Clássico" },
    tagline: { es: "El que nunca falla", pt: "O que nunca falha" },
    category: "adults",
    garment: "set-long",
    price: 109,
    sizes: ADULT_SIZES,
    colors: [C.marfil, C.cacao, C.salvia],
    badges: [],
    featured: false,
    order: 6,
    related: ["conjunto-amanecer", "conjunto-sereno", "bata-abrazo"],
    description: {
      es: "El pijama de siempre, hecho bien. Camisa con botones de nácar, vivo en contraste y pantalón recto. Atemporal, prolijo, para toda la vida.",
      pt: "O pijama de sempre, feito direito. Camisa com botões de madrepérola, vivo em contraste e calça reta. Atemporal, caprichado, para a vida toda.",
    },
    composition: {
      es: "100% algodón orgánico peinado, popelina 140 g/m². Fresco y resistente. Lavado a máquina.",
      pt: "100% algodão orgânico penteado, popeline 140 g/m². Fresco e resistente. Lavagem à máquina.",
    },
  },
  {
    slug: "camison-brisa",
    name: { es: "Camisón Brisa", pt: "Camisola Brisa" },
    tagline: { es: "Verano hecho prenda", pt: "Verão feito peça" },
    category: "adults",
    garment: "gown",
    price: 84,
    sizes: ADULT_SIZES,
    colors: [C.arena, C.marfil, C.lavanda],
    badges: [],
    featured: false,
    order: 7,
    related: ["camison-luna", "conjunto-sereno", "conjunto-amanecer"],
    description: {
      es: "Camisón de lino y algodón con escote redondo y manga francesa. Textura de brisa, ideal para las noches en que sobra hasta la sábana.",
      pt: "Camisola de linho e algodão com decote redondo e manga francesa. Textura de brisa, ideal para as noites em que até o lençol sobra.",
    },
    composition: {
      es: "55% lino, 45% algodón orgánico. Ligero y transpirable. Lavado suave, se ablanda con el uso.",
      pt: "55% linho, 45% algodão orgânico. Leve e respirável. Lavagem suave, amacia com o uso.",
    },
  },
  {
    slug: "pijama-nube",
    name: { es: "Pijama Nube", pt: "Pijama Nuvem" },
    tagline: { es: "Para sueños tranquilos", pt: "Para sonhos tranquilos" },
    category: "kids",
    garment: "kids-set",
    price: 54,
    sizes: KIDS_SIZES,
    colors: [C.rosa, C.azul, C.salvia],
    badges: ["new"],
    featured: true,
    order: 8,
    related: ["enterito-estrella", "pijama-cometa", "camison-lunita"],
    description: {
      es: "Conjunto de dos piezas en algodón afelpado, con puños suaves y estampa discreta de estrellas. El pijama que no se van a querer sacar.",
      pt: "Conjunto de duas peças em algodão felpudo, com punhos macios e estampa discreta de estrelas. O pijama que eles não vão querer tirar.",
    },
    composition: {
      es: "100% algodón orgánico afelpado, sin costuras que molesten. Etiquetas impresas. Lavado a máquina, ciclo suave.",
      pt: "100% algodão orgânico felpudo, sem costuras que incomodem. Etiquetas impressas. Lavagem à máquina, ciclo suave.",
    },
  },
  {
    slug: "enterito-estrella",
    name: { es: "Enterito Estrella", pt: "Macacão Estrela" },
    tagline: { es: "Un abrazo de pies a cabeza", pt: "Um abraço da cabeça aos pés" },
    category: "kids",
    garment: "kids-onesie",
    price: 49,
    sizes: ["2", "4", "6", "8"],
    colors: [C.marfil, C.lavanda, C.arena],
    badges: [],
    featured: false,
    order: 9,
    related: ["pijama-nube", "enterito-cielo", "pijama-cometa"],
    description: {
      es: "Enterito con pies y cierre frontal cubierto, en algodón interlock que abriga sin dar calor. Para las noches más frías y los más pequeños.",
      pt: "Macacão com pés e zíper frontal coberto, em algodão interlock que aquece sem esquentar demais. Para as noites mais frias e os menores.",
    },
    composition: {
      es: "100% algodón orgánico interlock. Cierre con protector de mentón. Lavado a máquina en frío.",
      pt: "100% algodão orgânico interlock. Zíper com protetor de queixo. Lavagem à máquina no frio.",
    },
  },
  {
    slug: "pijama-cometa",
    name: { es: "Pijama Cometa", pt: "Pijama Cometa" },
    tagline: { es: "Listo para aventuras", pt: "Pronto para aventuras" },
    category: "kids",
    garment: "kids-set",
    price: 52,
    sizes: KIDS_SIZES,
    colors: [C.terracota, C.azul, C.salvia],
    badges: [],
    featured: false,
    order: 10,
    related: ["pijama-nube", "enterito-estrella", "enterito-cielo"],
    description: {
      es: "Remera de manga larga y pantalón con puños, en jersey de algodón que aguanta saltos, revolcones y mil lavados. Fresco de tacto, resistente de verdad.",
      pt: "Camiseta de manga longa e calça com punhos, em malha de algodão que aguenta pulos, rolês e mil lavagens. Fresco no toque, resistente de verdade.",
    },
    composition: {
      es: "100% algodón orgánico jersey, 200 g/m². Refuerzos en rodilla. Lavado a máquina.",
      pt: "100% algodão orgânico malha, 200 g/m². Reforços no joelho. Lavagem à máquina.",
    },
  },
  {
    slug: "camison-lunita",
    name: { es: "Camisón Lunita", pt: "Camisola Luazinha" },
    tagline: { es: "Para las princesas del sueño", pt: "Para as princesas do sono" },
    category: "kids",
    garment: "gown",
    price: 46,
    sizes: ["2", "4", "6", "8"],
    colors: [C.rosa, C.lavanda, C.marfil],
    badges: [],
    featured: false,
    order: 11,
    related: ["pijama-nube", "enterito-estrella", "pijama-cometa"],
    description: {
      es: "Camisón amplio con vuelo y manga corta abullonada, en algodón suavísimo. Gira, vuela y acompaña los mejores sueños.",
      pt: "Camisola ampla com rodado e manga curta bufante, em algodão super macio. Gira, voa e acompanha os melhores sonhos.",
    },
    composition: {
      es: "100% algodón orgánico. Sin apliques que molesten al dormir. Lavado a máquina, ciclo suave.",
      pt: "100% algodão orgânico. Sem apliques que incomodem ao dormir. Lavagem à máquina, ciclo suave.",
    },
  },
  {
    slug: "enterito-cielo",
    name: { es: "Enterito Cielo", pt: "Macacão Céu" },
    tagline: { es: "Suave como una nube", pt: "Macio como uma nuvem" },
    category: "kids",
    garment: "kids-onesie",
    price: 49,
    sizes: ["2", "4", "6", "8"],
    colors: [C.azul, C.salvia],
    badges: ["lastUnits"],
    featured: false,
    order: 12,
    related: ["enterito-estrella", "pijama-nube", "pijama-cometa"],
    description: {
      es: "Enterito liviano de media estación, sin pies, con puños al tobillo. La transición perfecta entre el frío y el calor.",
      pt: "Macacão leve de meia-estação, sem pés, com punhos no tornozelo. A transição perfeita entre o frio e o calor.",
    },
    composition: {
      es: "100% algodón orgánico french terry. Cierre cubierto. Lavado a máquina en frío.",
      pt: "100% algodão orgânico french terry. Zíper coberto. Lavagem à máquina no frio.",
    },
  },
  {
    slug: "set-familia-amanecer",
    name: { es: "Set Familia Amanecer", pt: "Kit Família Amanhecer" },
    tagline: { es: "La misma tela, para todos", pt: "O mesmo tecido, para todos" },
    category: "family",
    garment: "family-set",
    price: 189,
    sizes: ADULT_SIZES,
    colors: [C.terracota, C.azul, C.salvia],
    badges: ["capsule"],
    featured: true,
    order: 13,
    related: ["set-noche-estrellada", "set-familia-nube", "conjunto-amanecer"],
    description: {
      es: "Pijamas a juego para grande y chico, en el mismo algodón y la misma paleta. Elegís el talle de cada uno y llegan listos para la foto de la mañana. (Incluye 1 conjunto adulto + 1 infantil.)",
      pt: "Pijamas combinando para grande e pequeno, no mesmo algodão e na mesma paleta. Você escolhe o tamanho de cada um e eles chegam prontos para a foto da manhã. (Inclui 1 conjunto adulto + 1 infantil.)",
    },
    composition: {
      es: "100% algodón orgánico peinado. Cortes iguales en versión adulto e infantil. Lavado a máquina.",
      pt: "100% algodão orgânico penteado. Cortes iguais em versão adulto e infantil. Lavagem à máquina.",
    },
  },
  {
    slug: "set-noche-estrellada",
    name: { es: "Set Noche Estrellada", pt: "Kit Noite Estrelada" },
    tagline: { es: "Dormir juntos, soñar igual", pt: "Dormir juntos, sonhar igual" },
    category: "family",
    garment: "family-set",
    price: 199,
    sizes: ADULT_SIZES,
    colors: [C.cacao, C.azul],
    badges: ["new", "lastUnits"],
    featured: false,
    order: 14,
    related: ["set-familia-amanecer", "set-familia-nube", "pijama-nube"],
    description: {
      es: "Conjunto familiar en tono profundo con estampa de estrellas apenas visible. El ritual de la noche, en tela, para toda la familia. (Incluye 1 conjunto adulto + 1 infantil.)",
      pt: "Conjunto familiar em tom profundo com estampa de estrelas quase invisível. O ritual da noite, em tecido, para a família toda. (Inclui 1 conjunto adulto + 1 infantil.)",
    },
    composition: {
      es: "100% algodón orgánico jersey. Estampa serigrafiada al agua. Lavado a máquina, ciclo suave.",
      pt: "100% algodão orgânico malha. Estampa serigrafada à base d'água. Lavagem à máquina, ciclo suave.",
    },
  },
  {
    slug: "set-familia-nube",
    name: { es: "Set Familia Nube", pt: "Kit Família Nuvem" },
    tagline: { es: "Suavidad compartida", pt: "Maciez compartilhada" },
    category: "family",
    garment: "family-set",
    price: 179,
    sizes: ADULT_SIZES,
    colors: [C.rosa, C.marfil, C.arena],
    badges: [],
    featured: false,
    order: 15,
    related: ["set-familia-amanecer", "set-noche-estrellada", "pijama-nube"],
    description: {
      es: "Versión más liviana del pijama familiar, en gasa de algodón para las noches templadas. Mismo tacto de nube, del más grande al más chico. (Incluye 1 conjunto adulto + 1 infantil.)",
      pt: "Versão mais leve do pijama familiar, em gaze de algodão para as noites amenas. Mesmo toque de nuvem, do maior ao menor. (Inclui 1 conjunto adulto + 1 infantil.)",
    },
    composition: {
      es: "100% algodón orgánico, gasa de doble capa. Aireado y suave. Lavado en frío.",
      pt: "100% algodão orgânico, gaze de dupla camada. Arejado e macio. Lavagem no frio.",
    },
  },
];

/* Fotos por producto (Unsplash, en /public/products). Reemplazables por fotos propias. */
const PHOTOS: Record<string, [string, string]> = {
  "bata-abrazo": ["/products/bata-abrazo.jpg", "/products/tex-linen.jpg"],
  "conjunto-amanecer": ["/products/conjunto-amanecer.jpg", "/products/tex-cream.jpg"],
  "camison-luna": ["/products/camison-luna.jpg", "/products/tex-cream.jpg"],
  "conjunto-sereno": ["/products/conjunto-sereno.jpg", "/products/tex-sage.jpg"],
  "bata-seda-noche": ["/products/bata-seda-noche.jpg", "/products/tex-linen.jpg"],
  "pijama-clasico": ["/products/pijama-clasico.jpg", "/products/tex-fold.jpg"],
  "camison-brisa": ["/products/camison-brisa.jpg", "/products/tex-linen.jpg"],
  "pijama-nube": ["/products/pijama-nube.jpg", "/products/tex-fold.jpg"],
  "enterito-estrella": ["/products/enterito-estrella.jpg", "/products/tex-sage.jpg"],
  "pijama-cometa": ["/products/pijama-cometa.jpg", "/products/tex-stack.jpg"],
  "camison-lunita": ["/products/camison-lunita.jpg", "/products/tex-cream.jpg"],
  "enterito-cielo": ["/products/enterito-cielo.jpg", "/products/tex-sage.jpg"],
  "set-familia-amanecer": ["/products/set-familia-amanecer.jpg", "/products/tex-stack.jpg"],
  "set-noche-estrellada": ["/products/set-noche-estrellada.jpg", "/products/tex-linen.jpg"],
  "set-familia-nube": ["/products/set-familia-nube.jpg", "/products/tex-stack.jpg"],
};
for (const p of products) {
  const ph = PHOTOS[p.slug];
  if (ph) {
    p.photo = ph[0];
    p.photoDetail = ph[1];
  }
}

/* Selectores -------------------------------------------------------------- */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getByCategory(cat: Product["category"]): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelated(slug: string): Product[] {
  const p = getProduct(slug);
  if (!p) return [];
  return p.related
    .map((s) => getProduct(s))
    .filter((x): x is Product => Boolean(x));
}

export function allSizes(): string[] {
  return ["XS", "S", "M", "L", "XL", "2", "4", "6", "8", "10"];
}

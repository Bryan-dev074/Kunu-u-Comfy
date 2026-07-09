import type { Garment } from "@/lib/types";

type Props = {
  garment: Garment;
  hex: string;
  shade: string;
  view?: "front" | "detail";
  className?: string;
};

/**
 * Ilustración SVG de la prenda. Reemplaza a la fotografía con una
 * dirección de arte cálida, consistente y 100% confiable (nunca se rompe).
 * `view="detail"` muestra un primer plano de la tela para el hover-swap.
 */
export default function ProductArt({
  garment,
  hex,
  shade,
  view = "front",
  className,
}: Props) {
  const id = `${garment}-${hex.replace("#", "")}-${view}`;
  const gBg = `bg-${id}`;
  const gBack = `back-${id}`;
  const gGlow = `glow-${id}`;
  const gCloth = `cloth-${id}`;
  const gVig = `vig-${id}`;

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gBg} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FBF6EE" />
          <stop offset="100%" stopColor={hex} stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id={gGlow} cx="0.5" cy="0.36" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gCloth} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={hex} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
        <radialGradient id={gBack} cx="0.5" cy="0.4" r="0.78">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="62%" stopColor={hex} stopOpacity="0.14" />
          <stop offset="100%" stopColor={shade} stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id={gVig} cx="0.5" cy="0.42" r="0.72">
          <stop offset="60%" stopColor={shade} stopOpacity="0" />
          <stop offset="100%" stopColor={shade} stopOpacity="0.22" />
        </radialGradient>
      </defs>

      {/* Fondo tipo estudio */}
      <rect width="400" height="500" fill={`url(#${gBack})`} />
      <rect width="400" height="500" fill={`url(#${gGlow})`} />

      {/* Motivo luna / amanecer */}
      <circle cx="312" cy="94" r="40" fill="#FFFFFF" opacity="0.3" />
      <circle cx="325" cy="88" r="40" fill={`url(#${gBack})`} opacity="0.92" />

      {/* Sombra de apoyo suave */}
      <ellipse cx="200" cy="452" rx="132" ry="20" fill={shade} opacity="0.2" />
      <ellipse cx="200" cy="450" rx="90" ry="10" fill={shade} opacity="0.16" />

      {view === "detail" ? (
        <FabricDetail hex={hex} shade={shade} cloth={gCloth} />
      ) : (
        <GarmentFront garment={garment} hex={hex} shade={shade} cloth={gCloth} />
      )}

      {/* Viñeta de encuadre */}
      <rect width="400" height="500" fill={`url(#${gVig})`} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

function GarmentFront({
  garment,
  hex,
  shade,
  cloth,
}: {
  garment: Garment;
  hex: string;
  shade: string;
  cloth: string;
}) {
  const fill = `url(#${cloth})`;
  const stroke = shade;
  const commonStroke = {
    stroke,
    strokeOpacity: 0.5,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
  };

  switch (garment) {
    case "robe":
      return (
        <g>
          {/* Cuerpo de la bata */}
          <path
            d="M142 150 Q136 162 139 190 L150 402 Q152 418 170 418 L230 418 Q248 418 250 402 L261 190 Q264 162 258 150 Q228 172 200 172 Q172 172 142 150 Z"
            fill={fill}
          />
          {/* Mangas */}
          <path d="M142 150 Q108 178 110 250 Q112 268 130 262 L150 200 Z" fill={fill} />
          <path d="M258 150 Q292 178 290 250 Q288 268 270 262 L250 200 Z" fill={fill} />
          {/* Solapa cruzada */}
          <path d="M200 172 L168 150 Q186 200 200 300" {...commonStroke} />
          <path d="M200 172 L232 150 Q214 200 200 300" {...commonStroke} />
          {/* Cinturón */}
          <rect x="146" y="266" width="108" height="20" rx="4" fill={shade} opacity="0.85" />
          <rect x="146" y="266" width="108" height="6" rx="3" fill="#FFFFFF" opacity="0.14" />
        </g>
      );

    case "gown":
      return (
        <g>
          {/* Tirantes */}
          <path d="M182 136 L179 178" {...commonStroke} strokeWidth={4} />
          <path d="M218 136 L221 178" {...commonStroke} strokeWidth={4} />
          {/* Cuerpo del camisón */}
          <path
            d="M179 176 Q175 210 168 236 Q150 320 150 388 Q150 410 168 410 L232 410 Q250 410 250 388 Q250 320 232 236 Q225 210 221 176 Q200 168 179 176 Z"
            fill={fill}
          />
          {/* Frunce bajo el pecho */}
          <path d="M170 232 Q200 244 230 232" {...commonStroke} />
          <path d="M186 210 Q200 218 214 210" {...commonStroke} />
        </g>
      );

    case "set-long":
    case "kids-set":
      return <FlatSet hex={hex} shade={shade} cloth={cloth} sleeves="long" scale={garment === "kids-set" ? 0.82 : 1} />;

    case "set-short":
      return <FlatSet hex={hex} shade={shade} cloth={cloth} sleeves="short" scale={1} />;

    case "kids-onesie":
      return (
        <g>
          {/* Enterito con pies */}
          <path
            d="M162 150 Q158 162 160 182 L156 372 Q156 392 176 392 L192 392 L196 300 L204 300 L208 392 L224 392 Q244 392 244 372 L240 182 Q242 162 238 150 Q220 168 200 168 Q180 168 162 150 Z"
            fill={fill}
          />
          {/* Piecitos */}
          <ellipse cx="182" cy="398" rx="18" ry="12" fill={shade} opacity="0.9" />
          <ellipse cx="218" cy="398" rx="18" ry="12" fill={shade} opacity="0.9" />
          {/* Mangas */}
          <path d="M160 150 Q134 176 138 232 Q140 248 156 242 L166 196 Z" fill={fill} />
          <path d="M240 150 Q266 176 262 232 Q260 248 244 242 L234 196 Z" fill={fill} />
          {/* Cierre + broche */}
          <path d="M200 172 L200 372" {...commonStroke} strokeDasharray="2 9" />
          <circle cx="200" cy="196" r="4" fill={shade} />
        </g>
      );

    case "family-set":
      return (
        <g>
          {/* Adulto */}
          <g transform="translate(-58 26) scale(0.86)">
            <FlatSet hex={hex} shade={shade} cloth={cloth} sleeves="long" scale={1} />
          </g>
          {/* Niño */}
          <g transform="translate(150 150) scale(0.5)">
            <FlatSet hex={hex} shade={shade} cloth={cloth} sleeves="long" scale={1} />
          </g>
        </g>
      );

    default:
      return null;
  }
}

/* Conjunto en plano: top + pantalón/short --------------------------------- */
function FlatSet({
  hex,
  shade,
  cloth,
  sleeves,
  scale,
}: {
  hex: string;
  shade: string;
  cloth: string;
  sleeves: "long" | "short";
  scale: number;
}) {
  const fill = `url(#${cloth})`;
  const detail = { stroke: shade, strokeOpacity: 0.45, strokeWidth: 2, fill: "none", strokeLinecap: "round" as const };
  return (
    <g transform={`translate(200 250) scale(${scale}) translate(-200 -250)`}>
      {/* Top */}
      <g>
        {/* Mangas */}
        {sleeves === "long" ? (
          <>
            <path d="M150 138 Q112 150 108 210 Q108 224 124 220 L158 168 Z" fill={fill} />
            <path d="M250 138 Q288 150 292 210 Q292 224 276 220 L242 168 Z" fill={fill} />
          </>
        ) : (
          <>
            <path d="M150 138 Q120 148 116 182 Q116 196 132 192 L160 162 Z" fill={fill} />
            <path d="M250 138 Q280 148 284 182 Q284 196 268 192 L240 162 Z" fill={fill} />
          </>
        )}
        {/* Torso */}
        <path
          d="M152 140 Q170 132 200 132 Q230 132 248 140 L246 236 Q246 248 232 248 L168 248 Q154 248 154 236 Z"
          fill={fill}
        />
        {/* Cuello */}
        <path d="M184 134 Q200 148 216 134" {...detail} />
        {/* Botonera */}
        <path d="M200 148 L200 244" {...detail} strokeDasharray="2 10" />
        {/* Bolsillo */}
        <path d="M214 210 h20 v20 h-20 Z" {...detail} />
      </g>
      {/* Pantalón / short */}
      {sleeves === "long" ? (
        <g>
          <path
            d="M162 262 L238 262 L234 300 L214 300 L208 404 Q208 414 197 414 Q191 414 190 404 L196 300 L204 300 L200 262 Z"
            fill={fill}
            opacity="0.96"
          />
          <path
            d="M162 262 L238 262 L232 320 L214 320 L208 404 Q206 414 216 414 L224 414 Q234 414 234 404 L246 320 Z"
            fill={fill}
            opacity="0.9"
          />
          <rect x="160" y="258" width="82" height="14" rx="6" fill={shade} opacity="0.5" />
        </g>
      ) : (
        <g>
          <path d="M164 262 L236 262 L230 332 L206 332 L204 262 Z" fill={fill} opacity="0.96" />
          <path d="M164 262 L236 262 L236 332 L212 332 L196 262 Z" fill={fill} opacity="0.9" />
          <rect x="162" y="258" width="76" height="14" rx="6" fill={shade} opacity="0.5" />
        </g>
      )}
    </g>
  );
}

/* Primer plano de la tela (hover-swap) ------------------------------------ */
function FabricDetail({
  hex,
  shade,
  cloth,
}: {
  hex: string;
  shade: string;
  cloth: string;
}) {
  const lines = [];
  for (let i = -1; i < 14; i++) {
    lines.push(
      <path
        key={i}
        d={`M${-40 + i * 34} 520 L${120 + i * 34} -40`}
        stroke={shade}
        strokeOpacity={i % 2 === 0 ? 0.16 : 0.09}
        strokeWidth={i % 2 === 0 ? 10 : 6}
        fill="none"
      />
    );
  }
  return (
    <g>
      <rect x="70" y="120" width="260" height="300" rx="18" fill={`url(#${cloth})`} />
      <clipPath id={`clip-${cloth}`}>
        <rect x="70" y="120" width="260" height="300" rx="18" />
      </clipPath>
      <g clipPath={`url(#clip-${cloth})`}>{lines}</g>
      {/* Puntada / dobladillo */}
      <path
        d="M92 380 L308 380"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeDasharray="7 7"
        fill="none"
      />
      {/* Esquina doblada */}
      <path d="M308 120 L308 172 L256 120 Z" fill="#FFFFFF" opacity="0.18" />
      <path d="M308 172 L256 120" stroke={shade} strokeOpacity="0.4" strokeWidth="2" fill="none" />
    </g>
  );
}

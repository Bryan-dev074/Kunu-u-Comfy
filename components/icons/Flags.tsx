type P = { className?: string };

export function PYFlag({ className }: P) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <clipPath id="fpy">
        <rect width="24" height="16" rx="2.5" />
      </clipPath>
      <g clipPath="url(#fpy)">
        <rect width="24" height="16" fill="#ffffff" />
        <rect width="24" height="5.33" fill="#D52B1E" />
        <rect y="10.67" width="24" height="5.33" fill="#0038A8" />
        <circle cx="12" cy="8" r="1.4" fill="#F9D616" stroke="#0038A8" strokeWidth="0.4" />
      </g>
    </svg>
  );
}

export function BRFlag({ className }: P) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <clipPath id="fbr">
        <rect width="24" height="16" rx="2.5" />
      </clipPath>
      <g clipPath="url(#fbr)">
        <rect width="24" height="16" fill="#009C3B" />
        <path d="M12 2.2 L21.6 8 L12 13.8 L2.4 8 Z" fill="#FFDF00" />
        <circle cx="12" cy="8" r="3" fill="#002776" />
      </g>
    </svg>
  );
}

export function USFlag({ className }: P) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <clipPath id="fus">
        <rect width="24" height="16" rx="2.5" />
      </clipPath>
      <g clipPath="url(#fus)">
        <rect width="24" height="16" fill="#ffffff" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} y={i * 2.46} width="24" height="1.23" fill="#B22234" />
        ))}
        <rect width="10.5" height="8.6" fill="#3C3B6E" />
      </g>
    </svg>
  );
}

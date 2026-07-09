type IconProps = { size?: number; className?: string };

export function WhatsappIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 3.5 17.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.15l-.3-.18-3.1 1 1-3-.2-.31A8.2 8.2 0 1 1 12 20.2Z" />
      <path d="M17.5 14.4c-.28-.15-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.13-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.48h-.55c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.39 0 1.41 1.02 2.77 1.16 2.96.14.19 2.02 3.08 4.9 4.32.68.3 1.21.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.68-.68 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.11-.26-.18-.54-.32Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.6l.4-3h-3V8.1c0-.87.3-1.46 1.55-1.46H16.6V4.06C16.3 4.02 15.4 3.94 14.36 3.94c-2.17 0-3.66 1.32-3.66 3.75V10H8.1v3h2.6v8h2.8Z" />
    </svg>
  );
}

export function TiktokIcon({ size = 24, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3c.28 2.03 1.42 3.24 3.4 3.37v2.4c-1.15.11-2.15-.26-3.32-.97v5.9c0 5.3-5.78 6.96-8.1 3.16-1.49-2.45-.57-6.75 4.24-6.92v2.53c-.37.06-.76.15-1.12.28-1.08.4-1.69 1.08-1.52 2.28.32 2.3 4.54 2.98 4.19-1.53V3h2.23Z" />
    </svg>
  );
}

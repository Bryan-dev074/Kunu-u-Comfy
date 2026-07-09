/** Número de WhatsApp del demo (Paraguay). Cambialo por el real. */
export const WHATSAPP_NUMBER = "595971123456";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

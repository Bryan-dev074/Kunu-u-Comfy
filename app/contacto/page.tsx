import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos del buen descanso. Dudas de talla, envíos, devoluciones y preguntas frecuentes de Kunu'u Comfy.",
};

export default function ContactPage() {
  return <ContactView />;
}

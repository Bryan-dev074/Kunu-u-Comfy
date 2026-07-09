import type { Metadata } from "next";
import CheckoutView from "@/components/pages/CheckoutView";

export const metadata: Metadata = {
  title: "Finalizar compra",
  description: "Checkout de demostración de Kunu'u Comfy.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}

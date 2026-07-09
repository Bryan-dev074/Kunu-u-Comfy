import type { Metadata } from "next";
import LookbookView from "@/components/pages/LookbookView";

export const metadata: Metadata = {
  title: "El Ritual de Dormir",
  description:
    "Un editorial sobre el arte de bajar el ritmo. La noche, con otra calma — por Kunu'u Comfy.",
};

export default function LookbookPage() {
  return <LookbookView />;
}

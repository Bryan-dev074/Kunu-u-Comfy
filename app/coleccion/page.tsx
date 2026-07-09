import { Suspense } from "react";
import type { Metadata } from "next";
import CollectionView from "@/components/pages/CollectionView";

export const metadata: Metadata = {
  title: "Colección",
  description:
    "Explorá la colección de ropa de dormir Kunu'u Comfy: adultos, niños y pijamas a juego para toda la familia.",
};

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionView />
    </Suspense>
  );
}

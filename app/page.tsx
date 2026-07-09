import Hero from "@/components/sections/Hero";
import MarqueeBand from "@/components/sections/MarqueeBand";
import CategoryTiles from "@/components/sections/CategoryTiles";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import RitualTeaser from "@/components/sections/RitualTeaser";
import Testimonials from "@/components/sections/Testimonials";
import Benefits from "@/components/sections/Benefits";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <CategoryTiles />
      <FeaturedCollection />
      <RitualTeaser />
      <Testimonials />
      <Benefits />
      <NewsletterSection />
    </>
  );
}

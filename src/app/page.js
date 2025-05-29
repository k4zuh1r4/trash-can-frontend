import { HeroSection } from "@/components/heroSection";
import { IntroductionCard } from "@/components/IntroductionCard";
import { MenuNavbar } from "@/components/menuNavbar";
import { LocationCard } from "@/components/LocationCard";
import { TypeCard } from "@/components/TypeCard";

export default function Home() {
  return (
    <div>
      <MenuNavbar />
      <HeroSection />
      <IntroductionCard />
      <LocationCard />
      <TypeCard />
    </div>
  );
}

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import TeamSection from "@/components/sections/TeamSection";
import ContributorsSection from "@/components/sections/ContributorsSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="w-full bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <ActivitiesSection />
        <TeamSection />
        <ContributorsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import GDSection from "@/components/sections/GDSection";
import TeamSection from "@/components/sections/TeamSection";
import ContributorsSection from "@/components/sections/ContributorsSection";
import FooterSection from "@/components/sections/FooterSection";
import LenisProvider from "@/components/providers/LenisProvider";

const Index = () => {
    return (
        <LenisProvider>
            <div className="w-full bg-background text-foreground overflow-x-hidden">
                <Navbar />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <EventsSection />
                    <GDSection />
                    <TeamSection />
                    <ContributorsSection />
                </main>
                <FooterSection />
            </div>
        </LenisProvider>
    );
};

export default Index;

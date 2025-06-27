
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SportsCategories from "@/components/SportsCategories";
import EventsSection from "@/components/EventsSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SportsCategories />
      <EventsSection />
      <ProcessSection />
      <Footer />
    </div>
  );
};

export default Index;

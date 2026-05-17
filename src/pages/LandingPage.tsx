import { useRef } from "react";
import Topbar from "../components/layout/TopBar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import TrendingSection from "../components/home/TrendingSection";
import CTASection from "../components/home/CTASection";

const LandingPage: React.FC = () => {
  const trendingRef = useRef<HTMLDivElement>(null);

  const scrollToTrending = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Topbar />
      <Hero onExploreClick={scrollToTrending} />

      <div ref={trendingRef}>
        <TrendingSection />
      </div>
      
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;
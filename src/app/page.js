import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VideoShowcase from "@/components/VideoShowcase";
import ServicesSection from "@/components/ServicesSection";
import DiseaseSearch from "@/components/DiseaseSearch";
import DoctorsSection from "@/components/DoctorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <VideoShowcase />
      <ServicesSection />
      <DiseaseSearch />
      <DoctorsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

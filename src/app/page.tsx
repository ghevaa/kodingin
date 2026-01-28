import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Automation from "@/components/Automation";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Automation />
      <TechStack />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

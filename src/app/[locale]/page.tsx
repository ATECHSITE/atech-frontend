import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}

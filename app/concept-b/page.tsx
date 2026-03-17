import Nav from "@/components/Nav";
import Hero from "@/components/HeroConceptB";
import TrustedBy from "@/components/TrustedBy";
import Stats from "@/components/Stats";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = { title: "Concept B — The Arrival | Diele Consulting" };

export default function ConceptB() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <TrustedBy />
      <Stats />
      <WhoThisIsFor />
      <Framework />
      <Services />
      <Book />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

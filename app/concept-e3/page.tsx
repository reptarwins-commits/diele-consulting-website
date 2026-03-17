import Nav from "@/components/Nav";
import Hero from "@/components/HeroConceptE3";
import CredibilityBlock from "@/components/CredibilityBlock";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = { title: "Diele Consulting | Executive Leadership Coaching" };

export default function ConceptE3() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <CredibilityBlock />
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

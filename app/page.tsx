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

export const metadata = { title: "Executive Coaching for Technical Leaders | Diele Consulting" };

export default function Home() {
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

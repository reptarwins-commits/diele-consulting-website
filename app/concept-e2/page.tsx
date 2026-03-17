import Nav from "@/components/Nav";
import Hero from "@/components/HeroConceptE2";
import JoeIntroStrip from "@/components/JoeIntroStrip";
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

export const metadata = { title: "Option 2 — Hero + Joe Intro Strip | Diele Consulting" };

export default function ConceptE2() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <JoeIntroStrip />
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

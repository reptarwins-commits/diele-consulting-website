import Nav from "@/components/Nav";
import Hero from "@/components/HeroV2";
import Stats from "@/components/Stats";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import AboutBio from "@/components/AboutBio";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Stats />
      <WhoThisIsFor />
      <Framework />
      <Services />
      <AboutBio />
      <Book />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

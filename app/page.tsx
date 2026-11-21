import Nav from "@/components/Nav";
import Hero from "@/components/HeroV2";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Services from "@/components/Services";
import AboutBio from "@/components/AboutBio";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import ResultsTeaser from "@/components/ResultsTeaser";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <WhoThisIsFor />
      <Services />
      <AboutBio />
      <Book />
      <Testimonials />
      <ResultsTeaser />
      <Footer />
    </main>
  );
}

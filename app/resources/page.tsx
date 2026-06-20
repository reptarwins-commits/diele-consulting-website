import ResourcesHero from "@/components/ResourcesHero";
import ResourcesList from "@/components/ResourcesList";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Resources | Free Downloads | Diele Consulting",
  description:
    "Free resources for business owners and leadership teams. Download the People Excellence Workshop overview.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <ResourcesHero />
      <ResourcesList />
      <Footer />
    </main>
  );
}

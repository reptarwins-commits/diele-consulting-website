import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "About | Joseph Diele — Founder, Diele Consulting",
  description: "35+ years leading teams in startups and Fortune 500 companies. Author of Sustainable Quality.",
};

// Approved P5 replacement body — use verbatim.
const LEAD =
  "I've made the very same journey your managers are making, from technical to leader.";

const PARAGRAPHS = [
  "For 35+ years I worked inside nine technology companies: StorageTek, Sun, Tristate, Fusion-io, SanDisk, ScaleFlux, Liqid, Dell and Priest-Zimmerman. Three of them, Fusion-io, ScaleFlux and Liqid, were startups. I went from technical lead to manager to leader, and along the way other leaders started sending me their people.",
  "That's the work now. I bring out the best in you, by helping you bring out the best in the people you lead. Most of the time that's a manager or leader at a hardware or software company who is great at the technical work and wants to be just as good with people.",
  "I care about the people I work with, and I stay calm when things get hard. People tell me I was the best manager they ever had. I have a fire inside me that was always meant to light the way for others.",
  "I also wrote Sustainable Quality (Business Expert Press, 2021). I hold an M.S. in Management, and I'm a Certified Executive Coach and a Lean Six Sigma Black Belt.",
];

const SIGN_OFF = "Diele Consulting LLC · Westminster, CO";

const TILES: { value: string; label: string }[] = [
  { value: "35+", label: "Years" },
  { value: "9", label: "Technology Companies" },
  { value: "M.S.", label: "Management" },
  { value: "Author:", label: "Sustainable Quality" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      <ScrollProgress />
      <Nav />

      <section className="pt-32 pb-16 bg-[#0d1929]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <h1 className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">About</h1>
          </div>

          <div data-testid="about-copy">
            <p className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] leading-tight mb-10">
              {LEAD}
            </p>
            {PARAGRAPHS.map((para) => (
              <p key={para} className="text-lg text-[#C8C8C8] leading-relaxed mb-6">
                {para}
              </p>
            ))}
            <p className="text-sm text-[#909090] tracking-wide mt-10">{SIGN_OFF}</p>
          </div>

          <div data-testid="about-ctas" className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="https://calendly.com/josephdiele"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-[#B22222] text-white px-8 py-4 font-semibold hover:bg-[#8B0000] transition-colors duration-200"
            >
              Book a Free 20-Minute Call →
            </a>
            <a
              href="/results"
              className="inline-block text-center border border-white/20 text-[#C8C8C8] px-8 py-4 font-semibold hover:border-[#B22222] hover:text-white transition-colors duration-200"
            >
              See the results →
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <h2 className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Background</h2>
          </div>
          <div data-testid="about-tiles" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TILES.map((tile) => (
              <div key={tile.label} className="p-6 border border-white/10 bg-[#1a1a1a]">
                <span className="block text-2xl font-serif text-[#B22222] font-bold mb-2">{tile.value}</span>{" "}
                <span className="block text-[#C8C8C8]">{tile.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

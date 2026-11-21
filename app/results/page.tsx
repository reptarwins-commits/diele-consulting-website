import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import { BRIEFS, RESULTS_INTRO, type Block } from "@/lib/results";

export const metadata = {
  title: "Results and Case Studies | Diele Consulting LLC",
};

function BriefBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "kicker":
      return <p className="text-[#B22222] text-xs tracking-[0.2em] uppercase font-semibold mb-8">{block.text}</p>;
    case "h3":
      return <h3 className="text-[#E8E8E8] font-semibold text-lg mt-8 mb-3">{block.text}</h3>;
    case "p":
      return <p className="text-[#C8C8C8] leading-relaxed mb-4">{block.text}</p>;
    case "note":
      return <p className="text-sm text-[#909090] leading-relaxed mt-6 mb-4 italic">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 text-[#C8C8C8] leading-relaxed mb-4">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

export default function ResultsPage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      <ScrollProgress />
      <Nav />

      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6" data-testid="results-copy">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <h1 className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Results</h1>
          </div>
          <p className="text-xl md:text-2xl text-[#E8E8E8] leading-relaxed mb-16">{RESULTS_INTRO}</p>

          {BRIEFS.map((brief) => (
            <article key={brief.title} className="mb-20 border-l-2 border-[#B22222] pl-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] mb-3 leading-tight">
                {brief.title}
              </h2>
              {brief.blocks.map((block, i) => (
                <BriefBlock key={i} block={block} />
              ))}
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

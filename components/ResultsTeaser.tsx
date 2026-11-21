import { RESULTS_TEASER } from "@/lib/results";

export default function ResultsTeaser() {
  return (
    <section className="py-16 bg-[#0d1929] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-lg md:text-xl text-[#E8E8E8] leading-relaxed mb-6">{RESULTS_TEASER}</p>
        <a
          href="/results"
          className="inline-flex items-center gap-2 text-[#E8E8E8] font-semibold text-sm border-b border-[#B22222] pb-1 hover:text-[#B22222] transition-colors duration-200"
        >
          See the results →
        </a>
      </div>
    </section>
  );
}

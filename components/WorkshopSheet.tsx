"use client";

import { useEffect, useState } from "react";

export default function WorkshopSheet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-[850px] mx-auto bg-white text-[#1a1a1a]">
      {/* Header Bar */}
      <div className="bg-[#0d1929] text-white py-8 px-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              Diele Consulting
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">
              People Excellence Workshop
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm text-[#C8C8C8]">3-Day Intensive</p>
            <p className="text-sm text-[#C8C8C8]">Leadership Teams</p>
          </div>
        </div>
      </div>

      {/* Subhead */}
      <div className="bg-[#B22222] text-white py-4 px-12">
        <p className="text-lg font-serif">
          Bring Out the Best in Your People
        </p>
      </div>

      {/* Main Content */}
      <div className="px-12 py-12">
        {/* Opening */}
        <div className={`transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <p className="text-lg text-[#444] leading-relaxed mb-8">
            A practical workshop built for real small-business environments — especially technology companies 
            and growing operational teams — where managers often have strong technical experience but little 
            formal people leadership training.
          </p>
        </div>

        {/* What It Is */}
        <Section title="What This Workshop Is" mounted={mounted} delay="100ms">
          <p className="text-[#444] leading-relaxed mb-4">
            The People Excellence Workshop is a <strong>3-day consecutive workshop</strong> designed for 
            small business leadership teams who want to improve performance by bringing out the best in their people.
          </p>
          <p className="text-[#444] leading-relaxed">
            This is not generic management training. It helps leaders reduce organizational drag, strengthen trust, 
            improve alignment, develop managers, and create the conditions where employees can perform closer to 
            their full potential.
          </p>
        </Section>

        {/* Who It's For */}
        <Section title="Who It Is For" mounted={mounted} delay="200ms">
          <ul className="space-y-2 text-[#444]">
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">→</span>
              <span>Business owners and executives</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">→</span>
              <span>Existing management teams</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">→</span>
              <span>Small businesses that want stronger people performance without becoming overly bureaucratic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">→</span>
              <span>Primarily tech companies, with relevance for manufacturing and other operationally intensive businesses</span>
            </li>
          </ul>
          <div className="mt-4 bg-[#f8f8f8] p-4 border-l-4 border-[#B22222]">
            <p className="text-sm font-semibold text-[#1a1a1a]">Ideal group size: 5-10 participants</p>
          </div>
        </Section>

        {/* The Core Promise */}
        <Section title="The Core Promise" mounted={mounted} delay="300ms">
          <p className="text-[#444] leading-relaxed">
            This workshop helps leadership teams learn how to bring out the best in their people by improving 
            culture, <strong>reducing interference</strong>, strengthening motivation, clarifying expectations, 
            and building better day-to-day management habits.
          </p>
        </Section>

        {/* Why This Matters */}
        <Section title="Why This Matters" mounted={mounted} delay="400ms">
          <p className="text-[#444] leading-relaxed mb-4">
            Most employees want to do good work. But in many organizations, performance is reduced by the 
            environment around them:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-[#444] mb-4">
            <p>• unclear expectations</p>
            <p>• weak communication</p>
            <p>• inconsistent management</p>
            <p>• low trust</p>
            <p>• poor onboarding</p>
            <p>• lack of follow-through</p>
          </div>
          <p className="text-[#444] leading-relaxed">
            When those barriers are reduced, <strong>performance, engagement, accountability, and retention all improve.</strong>
          </p>
        </Section>

        {/* Two Signature Ideas */}
        <Section title="The Two Signature Ideas" mounted={mounted} delay="500ms">
          <div className="space-y-6">
            {/* Idea 1 */}
            <div className="bg-[#f8f8f8] p-6">
              <p className="text-sm text-[#B22222] font-semibold uppercase tracking-wider mb-2">Idea 1</p>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Performance = Capacity − Interference
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                People often perform below their true capability not because they don't care, but because 
                something is getting in their way.
              </p>
              <p className="text-sm text-[#666] font-semibold mb-2">Examples of interference:</p>
              <div className="grid grid-cols-2 gap-1 text-sm text-[#444]">
                <p>• unclear roles</p>
                <p>• poor handoffs</p>
                <p>• low trust</p>
                <p>• micromanagement</p>
                <p>• weak onboarding</p>
                <p>• inconsistent expectations</p>
                <p>• lack of resources</p>
                <p>• emotional fatigue</p>
              </div>
            </div>

            {/* Idea 2 */}
            <div className="bg-[#f8f8f8] p-6">
              <p className="text-sm text-[#B22222] font-semibold uppercase tracking-wider mb-2">Idea 2</p>
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Purpose Creates Engagement
              </h3>
              <p className="text-[#444] leading-relaxed">
                Engagement grows when people understand how their work connects to something meaningful. 
                This workshop helps leaders create that connection by aligning:
              </p>
              <ul className="mt-3 space-y-1 text-[#444]">
                <li>→ company purpose</li>
                <li>→ team direction</li>
                <li>→ individual role clarity</li>
                <li>→ individual goals</li>
                <li>→ individual performance</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* What Participants Learn */}
        <Section title="What Participants Learn" mounted={mounted} delay="600ms">
          <p className="text-[#444] leading-relaxed mb-4">
            Over 3 consecutive days, participants learn how to:
          </p>
          <ul className="space-y-2 text-[#444]">
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Understand the real management challenge in small business</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Identify the cultural and structural barriers that reduce performance</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Strengthen trust and engagement</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Improve hiring and onboarding thinking</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Develop employees more effectively</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Use GQM (Goal-Question-Metric) instead of generic goal-setting</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Improve accountability without micromanaging</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>Lead change with greater confidence and clarity</span>
            </li>
          </ul>
        </Section>

        {/* Workshop Format */}
        <Section title="Workshop Format" mounted={mounted} delay="700ms">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f8f8f8] p-4">
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Format</p>
              <p className="font-semibold text-[#1a1a1a]">3 consecutive days</p>
            </div>
            <div className="bg-[#f8f8f8] p-4">
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Audience</p>
              <p className="font-semibold text-[#1a1a1a]">Owners, executives, management teams</p>
            </div>
            <div className="bg-[#f8f8f8] p-4">
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Group Size</p>
              <p className="font-semibold text-[#1a1a1a]">5-10 participants</p>
            </div>
            <div className="bg-[#f8f8f8] p-4">
              <p className="text-xs text-[#888] uppercase tracking-wider mb-1">Materials</p>
              <p className="font-semibold text-[#1a1a1a]">Light handouts included</p>
            </div>
          </div>
        </Section>

        {/* What Makes It Different */}
        <Section title="What Makes It Different" mounted={mounted} delay="800ms">
          <p className="text-[#444] leading-relaxed mb-4">
            This workshop is different from typical management training in four ways:
          </p>
          <ol className="space-y-3 text-[#444]">
            <li className="flex gap-3">
              <span className="font-bold text-[#B22222]">1.</span>
              <span><strong>Built for small business reality,</strong> not large-company HR systems.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#B22222]">2.</span>
              <span><strong>Focuses on the conditions that shape employee performance,</strong> not just manager techniques.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#B22222]">3.</span>
              <span><strong>Organized around two practical leadership frameworks</strong> that are easy to apply after the workshop.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#B22222]">4.</span>
              <span><strong>Gives leadership teams a shared language</strong> they can use immediately across culture, motivation, development, and accountability.</span>
            </li>
          </ol>
        </Section>

        {/* Best Fit */}
        <Section title="Best Fit Situations" mounted={mounted} delay="900ms">
          <p className="text-[#444] leading-relaxed mb-4">
            This workshop is especially valuable when a business is experiencing one or more of the following:
          </p>
          <ul className="space-y-2 text-[#444]">
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Managers who have strong technical ability but uneven people leadership skills</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Inconsistent accountability across teams</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Turnover or disengagement that feels difficult to explain</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Weak alignment between company goals and day-to-day work</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Founder or executive frustration that people are not taking enough ownership</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222]">→</span>
              <span>Growth that is exposing weaknesses in culture and management capability</span>
            </li>
          </ul>
        </Section>

        {/* What They Leave With */}
        <Section title="What Participants Leave With" mounted={mounted} delay="1000ms">
          <ul className="space-y-2 text-[#444]">
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>A stronger understanding of what drives employee excellence</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>A practical way to identify and reduce interference</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>A clearer approach to creating engagement through purpose and alignment</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span>A more useful method for employee development using GQM</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#B22222] font-bold">✓</span>
              <span><strong>A 90-day action plan they can apply immediately</strong></span>
            </li>
          </ul>
        </Section>

        {/* Investment */}
        <div className={`mt-12 bg-[#0d1929] text-white p-8 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1100ms" }}>
          <h2 className="font-serif text-2xl mb-4">Investment</h2>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div>
              <p className="text-4xl font-serif text-[#B22222]">$1,250</p>
              <p className="text-[#C8C8C8]">per person</p>
            </div>
            <div className="md:border-l md:border-white/20 md:pl-8">
              <p className="text-lg text-[#C8C8C8]">Groups of 5-10 participants</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-[#C8C8C8]">
              <strong>Email for more information</strong> or to discuss scheduling for your team.
            </p>
          </div>
        </div>

        {/* Next Step / CTA */}
        <div className={`mt-8 text-center transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1200ms" }}>
          <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">Next Step</h2>
          <p className="text-[#444] mb-6 max-w-xl mx-auto">
            If this workshop seems like a fit for your team, the next step is a conversation about your 
            current management challenges, team size, and goals for the session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:joe@dieleconsulting.com"
              className="inline-block bg-[#B22222] text-white px-8 py-4 font-semibold hover:bg-[#8B0000] transition-colors duration-200"
            >
              Email for More Info
            </a>
            <a
              href="https://calendly.com/josephdiele"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#0d1929] text-[#0d1929] px-8 py-4 font-semibold hover:bg-[#0d1929] hover:text-white transition-colors duration-200"
            >
              Schedule a Conversation
            </a>
          </div>
          <p className="text-sm text-[#888] mt-6">
            No pitch. Just a conversation about what's slowing you down.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-serif text-lg font-bold text-[#0d1929]">Diele Consulting</p>
              <p className="text-sm text-[#666]">Practical leadership and people performance</p>
            </div>
            <div className="text-right text-sm text-[#666]">
              <p>www.dieleconsulting.com</p>
              <p>joe@dieleconsulting.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button (hidden when printing) */}
      <div className="fixed bottom-6 right-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-[#0d1929] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#B22222] transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  mounted,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  mounted: boolean;
  delay: string;
}) {
  return (
    <div
      className={`mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: delay }}
    >
      <h2 className="font-serif text-2xl text-[#0d1929] mb-4 pb-2 border-b-2 border-[#B22222]">
        {title}
      </h2>
      {children}
    </div>
  );
}

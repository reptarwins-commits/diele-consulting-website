export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-[#B22222]" />
              <div>
                <div className="font-serif text-base font-bold text-[#E8E8E8] leading-none">Diele Consulting</div>
                <div className="text-[#909090] text-[10px] tracking-widest uppercase">Executive Coaching & Leadership Development</div>
              </div>
            </div>
            <p className="text-[#909090] text-sm leading-relaxed">
              Executive coaching and leadership development for technical founders, executives, and government agencies.
            </p>
          </div>

          <div>
            <h3 className="text-[#E8E8E8] text-sm font-semibold mb-4 tracking-wide">Navigation</h3>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Services", href: "#services" },
                { label: "Blog", href: "/blog" },
                { label: "Book a Call", href: "https://calendly.com/josephdiele" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href}
                    className="text-[#909090] hover:text-[#B22222] text-sm transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#E8E8E8] text-sm font-semibold mb-4 tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:joe@dieleconsulting.com" className="text-[#909090] hover:text-[#B22222] transition-colors">joe@dieleconsulting.com</a></li>
              <li><a href="tel:7203987701" className="text-[#909090] hover:text-[#B22222] transition-colors">720-398-7701</a></li>
              <li className="text-[#777777]">Westminster, CO</li>
              <li className="pt-2">
                <a href="https://www.linkedin.com/in/jdiele" target="_blank" rel="noopener noreferrer"
                  className="text-[#909090] hover:text-[#B22222] transition-colors">LinkedIn →</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#777777] text-xs">© 2026 Diele Consulting LLC. All rights reserved.</p>
          <p className="text-[#777777] text-xs">Westminster, CO · Available nationwide</p>
        </div>
      </div>
    </footer>
  );
}

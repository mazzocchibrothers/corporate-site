// @ts-nocheck
import React, { useState, useMemo } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { whitepapers, filterLabels } from '@/data/whitepapers';

export default function WhitepapersPage() {
  const router = useRouter();
  const labels = filterLabels.en;

  const [selIndustry, setSelIndustry] = useState(null);
  const [selTopic, setSelTopic] = useState(null);
  const [selProcess, setSelProcess] = useState(null);

  const published = whitepapers
    .filter(w => w.published && w.languageAvailability.includes('en'))
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // Dynamic filter options from published papers
  const industries = [...new Set(published.flatMap(w => w.industry))];
  const topics = [...new Set(published.flatMap(w => w.topic))];
  const processes = [...new Set(published.flatMap(w => w.hrProcess))];

  const filtered = useMemo(() => {
    return published.filter(w => {
      if (selIndustry && !w.industry.includes(selIndustry)) return false;
      if (selTopic && !w.topic.includes(selTopic)) return false;
      if (selProcess && !w.hrProcess.includes(selProcess)) return false;
      return true;
    });
  }, [published, selIndustry, selTopic, selProcess]);

  const content = (w) => w.en;

  const FilterPill = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${
        active
          ? 'bg-[#4B4DF7] text-white border-[#4B4DF7]'
          : 'text-[#1A1A2E]/60 border-[#1A1A2E]/10 hover:border-[#4B4DF7]/30 hover:text-[#4B4DF7]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/60 tracking-[0.25em] uppercase mb-8 block">Resources</span>
              <h1 className="font-bold text-white/95 mb-8" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                White Papers<br />
                & <span className="italic gradient-text">Reports</span>
              </h1>
              <p className="text-[20px] text-white/[0.5] leading-[1.75] max-w-xl mb-12" style={{ fontWeight: 300 }}>
                Research-backed insights to help you rethink how you hire, develop, and manage talent. Browse our library and download the resources that matter to you.
              </p>
              <a
                href="#wp-grid"
                onClick={(e) => { e.preventDefault(); document.getElementById('wp-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-3 text-[14px] text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.25] transition-all duration-300">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </span>
                Explore the library
              </a>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section id="wp-grid" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-24">
            {/* Card Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {published.map((w, i) => {
                  const c = content(w);
                  return (
                    <motion.div
                      key={w.slug}
                      className="group cursor-pointer flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      onClick={() => { router.push(`/resources/whitepapers/${w.slug}`); window.scrollTo(0, 0); }}
                    >
                      {/* Cover image in a rounded container */}
                      <div className="rounded-2xl overflow-hidden mb-5">                        {w.coverBg ? (
                          <div className="aspect-[4/5] relative overflow-hidden">
                            <img src={w.coverBg} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                            <div className="relative z-10 flex flex-col justify-between h-full p-8">
                              <div>
                                <div className="flex items-center gap-2.5 mb-8">
                                  <img src="/logos/skillvue-logomark.svg" alt="Skillvue" className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} />
                                  <span className="text-white/90 text-[15px] font-semibold">Skillvue</span>
                                </div>
                                <h3 className="text-[clamp(2rem,3vw,2.8rem)] font-bold text-white leading-[1.1] mb-5">{c.title}</h3>
                              </div>
                              <span className="text-[11px] text-white/35 font-semibold tracking-[0.15em] uppercase">White Paper</span>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-[4/5] overflow-hidden">
                            <img src={w.coverImage} alt={c.title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3 content-start">
                        {w.industry.map(tag => (
                          <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide h-fit">{tag}</span>
                        ))}
                        {w.topic.map(tag => (
                          <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#1A1A2E]/50 border border-[#1A1A2E]/[0.08] tracking-wide h-fit">{tag}</span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.7] line-clamp-3 mb-4">{c.shortDesc}</p>

                      {/* CTA */}
                      <span className="text-[14px] font-semibold text-[#4B4DF7] flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto">
                        {labels.read} <ArrowRight className="h-4 w-4" />
                      </span>
                    </motion.div>
                  );
                })}
              </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white/90 mb-4 leading-[1.2] max-w-2xl mx-auto">
                Want to see the science in action?
              </h2>
              <p className="text-[16px] text-white/[0.45] mb-8 max-w-xl mx-auto">
                Book a meeting with our team and discover how Skillvue turns talent decisions into a competitive advantage.
              </p>
              <button
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500"
              >
                <span>Book a Meeting</span>
                <ArrowRight className="h-4 w-4 ml-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

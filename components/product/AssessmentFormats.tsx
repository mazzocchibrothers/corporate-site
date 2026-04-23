import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, MonitorSmartphone, ListChecks, UserCheck, Target, BookOpen, Wrench, GitBranch, Mic, Video, PenLine, CheckSquare } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const layers = [
  {
    title: 'INTERACTION FORMAT',
    subtitle: 'How is the assessment delivered',
    items: [
      { icon: MessageSquare, name: 'Structured interviews', desc: 'Standardized question set for fair comparable evaluation' },
      { icon: MonitorSmartphone, name: 'Conversation flows', desc: 'AI-driven dialogues that adapt in real time' },
      { icon: ListChecks, name: 'Close-ended surveys', desc: 'Targeted items for scalable objective measurement' },
    ],
  },
  {
    title: 'ASSESSMENT METHOD',
    subtitle: 'What is being measured',
    items: [
      { icon: UserCheck, name: 'Behavioral event interview', desc: 'Past behavior as predictor of future performance' },
      { icon: Target, name: 'Situational Judgment', desc: 'Real-world scenarios: testing decision making' },
      { icon: BookOpen, name: 'Declarative knowledge', desc: 'What candidates know: facts, concepts, principles' },
      { icon: Wrench, name: 'Procedural knowledge', desc: 'Our candidates do it: methods and processes' },
      { icon: GitBranch, name: 'Conditional knowledge', desc: 'When and why: contextual application of knowledge' },
    ],
  },
  {
    title: 'RESPONSE FORMAT',
    subtitle: 'How is the assessment delivered',
    items: [
      { icon: Mic, name: 'Audio', desc: 'Spoken responses for delivering a quick and effective interview experience' },
      { icon: Video, name: 'Video', desc: "Multimodal input for viewing participants' performance" },
      { icon: PenLine, name: 'Written', desc: 'Free-text responses for handling writing-heavy skills or allowing in-room assessments' },
      { icon: CheckSquare, name: 'SCQs / MCQs', desc: 'Structured choice for scalable objective scoring' },
    ],
  },
];

export default function AssessmentFormats() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollRef1 = useRef<HTMLDivElement | null>(null);
  const scrollRef2 = useRef<HTMLDivElement | null>(null);
  const scrollRef3 = useRef<HTMLDivElement | null>(null);
  const [scrollProgress1, setScrollProgress1] = useState(0);
  const [scrollProgress2, setScrollProgress2] = useState(0);
  const [scrollProgress3, setScrollProgress3] = useState(0);

  useEffect(() => {
    const refs = [
      { el: scrollRef1.current, setter: setScrollProgress1 },
      { el: scrollRef2.current, setter: setScrollProgress2 },
      { el: scrollRef3.current, setter: setScrollProgress3 },
    ];
    const cleanups: Array<() => void> = [];
    refs.forEach(({ el, setter }) => {
      if (!el) return;
      const onScroll = () => {
        const max = el.scrollWidth - el.clientWidth;
        const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
        setter(pct);
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => el.removeEventListener('scroll', onScroll));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const scrollRefs = [scrollRef1, scrollRef2, scrollRef3];
  const scrollProgresses = [scrollProgress1, scrollProgress2, scrollProgress3];

  return (
    <section id="assessment-formats" data-testid="assessment-formats" className="relative py-16 md:py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white/90">
            {t('Assessment designed to surface')}{' '}
            <span className="font-bold gradient-text">{t('verified capabilities')}</span>
          </h2>
        </motion.div>

        <div>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              data-testid={`format-${layer.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={i > 0 ? 'pt-12 md:pt-24' : ''}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-2.5 md:gap-4 mb-5 md:mb-8">
                <div className="w-1 h-6 md:w-1.5 md:h-8 rounded-full bg-gradient-to-b from-[#FF5F24] to-[#FF5F24]/30" />
                <span className="text-[12px] md:text-[15px] font-bold text-[#FF5F24] tracking-[0.1em] uppercase">{t(layer.title)}</span>
                <span className="text-[12px] md:text-[15px] text-white/35 font-light hidden md:inline">{t(layer.subtitle)}</span>
              </div>

              {/* Mobile: horizontal scroll */}
              <div ref={scrollRefs[i]} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
                {layer.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="shrink-0 w-[80vw] snap-center rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-400"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center mb-2.5">
                        <Icon className="h-5 w-5 text-white/50" />
                      </div>
                      <h4 className="text-[15px] font-bold text-white/90 mb-1 leading-tight" style={{ whiteSpace: 'pre-line' }}>{t(item.name)}</h4>
                      <p className="text-[12px] text-white/[0.4] leading-[1.4]">{t(item.desc)}</p>
                    </div>
                  );
                })}
              </div>
              {/* Progress bar */}
              <div className="md:hidden mx-auto mt-4 w-36 h-1 rounded-full bg-white/10 relative">
                <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgresses[i] * 0.65}%`, transition: "left 200ms ease-out" }} />
              </div>

              {/* Desktop: existing grid */}
              <div className={`hidden md:grid gap-3 ${layer.items.length === 5 ? 'grid-cols-2 lg:grid-cols-5' : layer.items.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                {layer.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="rounded-lg md:rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 md:p-5 hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-400"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-2.5 md:mb-4">
                        <Icon className="h-5 w-5 md:h-5 md:w-5 text-white/50" />
                      </div>
                      <h4 className="text-[15px] md:text-[15px] font-bold text-white/90 mb-1 md:mb-1.5 leading-tight" style={{ whiteSpace: 'pre-line' }}>{t(item.name)}</h4>
                      <p className="text-[12px] md:text-[13px] text-white/[0.4] leading-[1.4] md:leading-[1.55]">{t(item.desc)}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

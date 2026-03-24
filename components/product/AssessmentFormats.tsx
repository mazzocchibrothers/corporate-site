import React, { useRef } from 'react';
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

  return (
    <section id="assessment-formats" data-testid="assessment-formats" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white/90">
            {t('Assessment designed to surface')}{' '}
            <span className="italic font-bold gradient-text">{t('verified capabilities')}</span>
          </h2>
        </motion.div>

        <div>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              data-testid={`format-${layer.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={i > 0 ? 'pt-24' : ''}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#FF5F24] to-[#FF5F24]/30" />
                <span className="text-[15px] font-bold text-[#FF5F24] tracking-[0.1em] uppercase">{t(layer.title)}</span>
                <span className="text-[15px] text-white/35 font-light">{t(layer.subtitle)}</span>
              </div>

              <div className={`grid gap-3 ${layer.items.length === 5 ? 'grid-cols-2 lg:grid-cols-5' : layer.items.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                {layer.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-400"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-white/50" />
                      </div>
                      <h4 className="text-[15px] font-bold text-white/90 mb-1.5 leading-tight">{t(item.name)}</h4>
                      <p className="text-[13px] text-white/[0.4] leading-[1.55]">{t(item.desc)}</p>
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

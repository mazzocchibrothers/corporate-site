'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { MessageSquare, MonitorSmartphone, ListChecks, UserCheck, Target, BookOpen, Wrench, GitBranch, Mic, Video, PenLine, CheckSquare } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const layers = [
  {
    id: 'interactionFormat',
    items: [
      { icon: MessageSquare, id: 'structuredInterviews' },
      { icon: MonitorSmartphone, id: 'conversationFlows' },
      { icon: ListChecks, id: 'closeEndedSurveys' }
    ],
  },
  {
    id: 'assessmentMethod',
    items: [
      { icon: UserCheck, id: 'behavioralEventInterview' },
      { icon: Target, id: 'situationalJudgment' },
      { icon: BookOpen, id: 'declarativeKnowledge' },
      { icon: Wrench, id: 'proceduralKnowledge' },
      { icon: GitBranch, id: 'conditionalKnowledge' }
    ],
  },
  {
    id: 'responseFormat',
    items: [
      { icon: Mic, id: 'audio' },
      { icon: Video, id: 'video' },
      { icon: PenLine, id: 'written' },
      { icon: CheckSquare, id: 'scqsMcqs' }
    ],
  },
];

export default function AssessmentFormats() {
  const t = useTranslations('product-overview');

  return (
    <section id="verification-formats" data-testid="verification-formats" className="relative py-16 md:py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-14">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white/90">{t.rich('assessmentFormats.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </Reveal>

        <div>
          {layers.map((layer, i) => (
            <Reveal
              y={20}
              delay={0.15 + i * 0.1}
              key={layer.id}
              data-testid={`format-${layer.id}`}
              className={i > 0 ? 'pt-12 md:pt-24' : ''}
            >
              {/* Section label */}
              <div className="flex items-center gap-2.5 md:gap-4 mb-5 md:mb-8">
                <span className="text-[12px] md:text-[15px] font-bold text-white tracking-[0.1em] uppercase">{t(`assessmentFormats.layers.${layer.id}.title`)}</span>
                <span className="text-[12px] md:text-[15px] text-white/35 font-light hidden md:inline">{t(`assessmentFormats.layers.${layer.id}.subtitle`)}</span>
              </div>

              <div className={`grid gap-3 ${layer.items.length === 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5' : layer.items.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                {layer.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg md:rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 md:p-5 hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-400"
                    >
                      <IconTile icon={Icon} mode="dark" className="mb-2.5 md:mb-4" />
                      <h4 className="text-[15px] md:text-[15px] font-semibold text-white/90 mb-1 md:mb-1.5 leading-tight" style={{ whiteSpace: 'pre-line' }}>{t(`assessmentFormats.layers.${layer.id}.items.${item.id}.name`)}</h4>
                      <p className="text-[12px] md:text-[13px] text-white/[0.4] leading-[1.4] md:leading-[1.55]">{t(`assessmentFormats.layers.${layer.id}.items.${item.id}.desc`)}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

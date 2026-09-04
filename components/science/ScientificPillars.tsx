// @ts-nocheck
import { getTranslations } from 'next-intl/server';
import { Brain, Ruler } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';
import { Reveal } from '@/components/ui/reveal';

const pillars = [
  {
    id: 'iOPsychology',
    icon: Brain,
  },
  {
    id: 'psychometrics',
    icon: Ruler,
  },
];

export default async function ScientificPillars() {
  const t = await getTranslations('science');

  const renderCard = (p, i) => {
    const Icon = p.icon;
    return (
      <Reveal key={p.id} className="group rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-5 md:p-10 transition-all duration-500 h-full" delay={0.15 + i * 0.1}>
        <IconTile icon={Icon} mode="light" className="mb-3 md:mb-5" />
        <h3 className="text-[17px] md:text-[22px] font-semibold text-[#1A1A2E] mb-1 md:mb-2">{t(`scientificPillars.pillars.${p.id}.title`)}</h3>
        <p className="text-[13px] md:text-[15px] text-[#4B4DF7]/[0.65] font-medium mb-3 md:mb-5">{t(`scientificPillars.pillars.${p.id}.subtitle`)}</p>
        <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.75]">{t(`scientificPillars.pillars.${p.id}.desc`)}</p>
      </Reveal>
    );
  };

  return (
    <section id="pillars" data-testid="scientific-pillars" className="section-breathe relative py-16 md:py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal className="mb-8 md:mb-16" duration={0.7}>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">{t.rich('scientificPillars.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-3 md:gap-5">
          {pillars.map((p, i) => renderCard(p, i))}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Reveal } from '@/components/ui/reveal';
import { href } from '@/i18n/routes';

type RelatedStory = {
  id: string;
  tag: string;
  company: string;
  headline: string;
};

export function CustomerStorySection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Reveal y={25} duration={0.6} className={className}>{children}</Reveal>;
}

export function CustomerStoryFooter({
  title,
  cta,
  stories,
  lang,
  finalHeading,
  finalAccent,
  containerClassName = 'px-5 md:px-8 lg:px-12',
}: {
  title: string;
  cta: string;
  stories: RelatedStory[];
  lang: string;
  finalHeading: string;
  finalAccent: string;
  containerClassName?: string;
}) {
  return (
    <>
      <div className="fade-into-dark" />
      <section className="section-light relative pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className={`max-w-[1400px] mx-auto ${containerClassName}`}>
          <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-12">{title}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {stories.map((story) => (
              <a key={story.id} href={href(`customers/${story.id}`, lang)} className="group block text-left rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] focus-visible:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] p-10 transition-all duration-500">
                <span className="type-body-sm text-[#4B4B4B] mb-4 block">{story.tag}</span>
                <h4 className="text-[24px] font-semibold text-[#121212] mb-4">{story.company}</h4>
                <p className="type-body text-[#4B4B4B] mb-8">{story.headline}</p>
                <span className="type-body-bold inline-flex items-center gap-2 text-[#4B4DF7] group-hover:text-[#3133E7] group-focus-visible:text-[#3133E7] transition-colors duration-300">
                  {cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <SolutionFinalCTA headline={finalHeading} accentWord={finalAccent} tone="light" rule />
      <Footer />
    </>
  );
}

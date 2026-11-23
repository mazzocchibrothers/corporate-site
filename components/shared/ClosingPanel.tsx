import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';

/** The closing panel's gradient: peach → grey → lilac. */
export const CLOSING_PANEL_GRADIENT = 'linear-gradient(100deg, #fdf3ec 0%, #f7f7f7 50%, #efeefb 100%)';

/**
 * The final CTA of a light page (interim standard, pending the redesign): the
 * Assess closing, and only that — a white section, the gradient panel, one
 * heading, one paragraph, one button. /product/skillvue-assess renders it too,
 * so every light page closes on exactly the same markup.
 *
 * `action` replaces the default button (Assess passes its tracked
 * BookDemoButton); otherwise `href` and `cta` make the house primary button.
 * `rule` draws a #e5e7eb top line, for a closing that follows another white
 * section. `body` is optional only because the solutions and customer-story
 * closings have no sentence of their own.
 */
export function ClosingPanel({
  heading,
  body,
  cta,
  href,
  action,
  rule = false,
  id,
  testId,
}: {
  heading: ReactNode;
  body?: ReactNode;
  cta?: string;
  href?: string;
  action?: ReactNode;
  rule?: boolean;
  id?: string;
  testId?: string;
}) {
  return (
    <section
      id={id}
      data-testid={testId}
      className={`section-light py-16 md:py-[88px] lg:py-[112px]${rule ? ' border-t border-[#e5e7eb]' : ''}`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal
          y={16}
          className="mx-auto flex max-w-[1144px] flex-col items-center gap-6 rounded-[20px] px-6 py-14 text-center md:rounded-3xl md:px-10 md:py-20"
          style={{ backgroundImage: CLOSING_PANEL_GRADIENT }}
        >
          <h2 className="max-w-[880px] font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212]">{heading}</h2>
          {body && <p className="max-w-[720px] type-body-lg text-[#4B4B4B]">{body}</p>}
          {action ?? (
            <Button asChild variant="primary" mode="light">
              <a href={href}>
                {cta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}

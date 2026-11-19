'use client';

import { useTranslations } from 'next-intl';
import { Illustration, Voice, Window } from '@/components/assess/visuals/frame';
import { Sequence, useAutoCycle, useInView } from '@/components/assess/visuals/motion';
import { CHANNELS, WAVE_LONG, WAVE_SHORT } from '@/components/assess/visuals/data';

// Step 2 · Deliver: a conversational assessment in a chat. The assessor asks,
// the participant answers by voice note, the assessor follows up on a short
// answer and builds the next question on what they said.
//
// The design's channel tabs are drawn, not clickable: the conversation moves
// from WhatsApp to Teams to the web on its own, through the channels twice,
// then rests on WhatsApp. It waits while it is off screen, and with reduced
// motion it stays on WhatsApp.

const CYCLE_MS = 4500;
const BUBBLE = 'max-w-[86%] rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 type-caption text-[#121212] sm:type-body-sm';

export function DeliverChat() {
  const t = useTranslations('product.skillvue-assess.visuals.deliver');
  const [ref, seen, visible] = useInView<HTMLDivElement>();
  const index = useAutoCycle({ count: CHANNELS.length, start: 0, seen, visible, intervalMs: CYCLE_MS });
  const channel = CHANNELS[index];

  return (
    <div ref={ref}>
      <Illustration label={t('label')}>
        <Window fade={64}>
          <div className="p-3 sm:p-4">
            <div className="inline-flex rounded-full bg-[#f5f5f7] p-1">
              {CHANNELS.map((id) => (
                <span
                  key={id}
                  className={`rounded-full px-3 py-1.5 type-body-sm transition-colors duration-300 motion-reduce:transition-none ${
                    id === channel ? 'bg-white text-[#121212] shadow-sm' : 'text-[#4B4B4B]'
                  }`}
                >
                  {t(`channels.${id}.tab`)}
                </span>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.06]">
              <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-4 py-3">
                <span className="h-9 w-9 shrink-0 rounded-full bg-[#ebebeb]" />
                <span className="min-w-0">
                  <span className="block type-body-sm font-medium text-[#121212]">{t('title')}</span>
                  <span className="block truncate type-caption text-[#7A7A7A]">{t('subtitle', { channel: t(`channels.${channel}.name`) })}</span>
                </span>
              </div>

              <Sequence run={seen} replay={channel} step={420} className="flex flex-col gap-3 bg-[#fafafa] px-3 py-4 sm:px-5">
                <p className={BUBBLE}>{t('q1')}</p>
                <div className="flex justify-end">
                  <Voice bars={WAVE_SHORT} duration={t('d1')} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="type-caption text-[#7A7A7A]">{t('note1')}</span>
                  <p className={BUBBLE}>{t('q2')}</p>
                </div>
                <div className="flex justify-end">
                  <Voice bars={WAVE_LONG} duration={t('d2')} className="max-w-full overflow-hidden" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="type-caption text-[#4b4df7]">{t('note2')}</span>
                  <p className={BUBBLE}>{t('q3')}</p>
                </div>
              </Sequence>
            </div>
          </div>
        </Window>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {(['scored', 'never', 'languages'] as const).map((id) => (
            <span key={id} className="rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B]">
              {t(`chips.${id}`)}
            </span>
          ))}
        </div>
      </Illustration>
    </div>
  );
}

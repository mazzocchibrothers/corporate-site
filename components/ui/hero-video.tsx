'use client';

import { useEffect, useRef } from 'react';
import { Reveal } from '@/components/ui/reveal';

type Props = {
  poster: string;
  webmSrc: string;
  mp4Src: string;
  /** Reveal wrapper — column span, justify-center, etc. */
  className?: string;
  /** The <video> element itself — max-width, rounded corners. */
  videoClassName?: string;
  delay?: number;
};

/** A muted, looping hero video with a webm source and an mp4 fallback for
 * Safari, used by the Insights and Press page heroes. */
export function HeroVideo({ poster, webmSrc, mp4Src, className, videoClassName, delay = 0.2 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect the OS setting, the same way <Reveal> does: a visitor who has
    // asked for reduced motion gets the poster frame, not an autoplaying
    // loop — the one thing that setting exists to suppress.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      ref.current?.pause();
    }
  }, []);

  return (
    <Reveal y={0} duration={0.8} delay={delay} className={className}>
      <video
        ref={ref}
        className={videoClassName}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </Reveal>
  );
}

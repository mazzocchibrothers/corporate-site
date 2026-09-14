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
 * Safari. Shared by every page whose hero pairs a headline with a looping
 * product/brand clip instead of a static image. */
export function HeroVideo({ poster, webmSrc, mp4Src, className, videoClassName, delay = 0.2 }: Props) {
  return (
    <Reveal y={0} duration={0.8} delay={delay} className={className}>
      <video
        className={videoClassName}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </Reveal>
  );
}

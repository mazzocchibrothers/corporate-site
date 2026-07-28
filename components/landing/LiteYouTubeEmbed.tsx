import React, { useEffect, useRef, useState } from 'react';

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

// YouTube embeds ship a heavy chunk of third-party JS that competes with the
// page's own scripts for main-thread time. Rendering just a poster image
// until the player scrolls near the viewport keeps that cost off the
// critical load path without changing the autoplay-on-view behavior.
export default function LiteYouTubeEmbed({ videoId, title, className }: LiteYouTubeEmbedProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&vq=hd2160&hd=1&playsinline=1&enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={(e) => {
            const iframe = e.currentTarget;
            const setQuality = () => {
              iframe.contentWindow?.postMessage(
                '{"event":"command","func":"setPlaybackQuality","args":["hd2160"]}',
                '*'
              );
            };
            setTimeout(setQuality, 800);
            setTimeout(setQuality, 2000);
            setTimeout(setQuality, 4000);
          }}
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          width={480}
          height={360}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

// YouTube embeds ship a heavy chunk of third-party JS that competes with the
// page's own scripts for main-thread time. Rendering a poster image first and
// swapping in the iframe from an effect keeps that JS out of the server-sent
// HTML, so it doesn't compete with the page's own JS during initial load.
export default function LiteYouTubeEmbed({ videoId, title, className }: LiteYouTubeEmbedProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => setShouldLoad(true), []);

  return (
    <div className={className}>
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
          src={`https://i.ytimg.com/vi/${videoId}/${posterFailed ? 'hqdefault' : 'maxresdefault'}.jpg`}
          alt={title}
          width={1280}
          height={720}
          loading="eager"
          onError={() => setPosterFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}

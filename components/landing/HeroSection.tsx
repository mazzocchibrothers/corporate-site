import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/i18n/LanguageContext';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import scrollArrowsData from '../../public/animations/scroll-arrows.json';

const trustLogos = ['Unicredit', 'Carrefour', 'Fidia', 'Generali', 'Capgemini', 'Coop', 'Douglas'];

const logoImages: Record<string, string> = {
  'Unicredit': '/logos/unicredit.png',
  'Carrefour': '/logos/carrefour_fixed.png',
  'Fidia': '/logos/fidia_fixed.png',
  'Generali': '/logos/generali.png',
  'Capgemini': '/logos/capgemini_fixed.png',
  'Coop': '/logos/coop.png',
  'Douglas': '/logos/douglas.png',
};

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const [videoPlaying, setVideoPlaying] = React.useState(true);
  const [videoMuted, setVideoMuted] = React.useState(true);
  const [videoScale, setVideoScale] = React.useState(1);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoWrapperRef = React.useRef<HTMLDivElement>(null);

  // Render iframe at native 1920x1080 then scale down to fit container.
  // This tricks YouTube into thinking the player is large → serves 1080p+ quality.
  React.useEffect(() => {
    const updateScale = () => {
      const wrapper = videoWrapperRef.current;
      if (!wrapper) return;
      const w = wrapper.offsetWidth;
      setVideoScale(w / 1920);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (videoWrapperRef.current) ro.observe(videoWrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const toggleVideoMute = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const cmd = videoMuted ? 'unMute' : 'mute';
    iframe.contentWindow.postMessage(`{"event":"command","func":"${cmd}","args":""}`, '*');
    setVideoMuted(!videoMuted);
  };

  const forceHighQuality = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    // Force highest available quality via YouTube IFrame API
    const trySetQuality = () => {
      iframe.contentWindow?.postMessage(
        '{"event":"command","func":"setPlaybackQuality","args":["hd2160"]}',
        '*'
      );
    };
    // Try multiple times because the player needs to be ready
    setTimeout(trySetQuality, 800);
    setTimeout(trySetQuality, 2000);
    setTimeout(trySetQuality, 4000);
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative overflow-hidden flex flex-col justify-between pt-[80px]"
      style={{ width: '100%', minHeight: '100vh', background: '#0d0d1f' }}
    >
      {/* Hero content. layered above */}
      <div className="relative z-10 flex-1 flex items-start md:items-center pt-6 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-12 items-center">
            {/* LEFT. Big headline */}
            <div className="lg:col-span-6">
              <motion.h1
                className="text-[clamp(2.5rem,10vw,3.75rem)] md:text-[clamp(2.75rem,4.8vw,4.5rem)] font-bold tracking-[-0.025em] text-white"
                style={{ lineHeight: 1.08, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('Every talent')}<br />
                {t('decision,')} <span className="italic font-bold gradient-text">{t('finally')}</span><br />
                {t('backed by science.')}
              </motion.h1>
              <motion.p
                className="text-[15px] md:text-[17px] text-white/75 leading-[1.65] md:leading-[1.65] mt-6 md:mt-8 max-w-lg font-normal md:font-light"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t('Skillvue combines psychometric rigour with modern AI to assess skills, predict performance, and guide every talent decision, from hiring to promotion to transformation readiness.')}
              </motion.p>
            </div>

            {/* RIGHT. Product video — slightly larger */}
            <motion.div
              className="lg:col-span-6 lg:-mr-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div
                ref={videoWrapperRef}
                className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black"
                style={{ boxShadow: '0 20px 60px -15px rgba(75, 77, 247, 0.45), 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                {videoPlaying ? (
                  <>
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube-nocookie.com/embed/Y8Oo5HBVl-Q?autoplay=1&mute=1&loop=1&playlist=Y8Oo5HBVl-Q&controls=0&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&playsinline=1&vq=hd2160&hd=1&enablejsapi=1"
                      title="Skillvue product video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={forceHighQuality}
                      width={1920}
                      height={1080}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1920px',
                        height: '1080px',
                        transformOrigin: 'top left',
                        transform: `scale(${videoScale})`,
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Click overlay — toggles audio mute/unmute */}
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      aria-label={videoMuted ? 'Activate sound' : 'Mute video'}
                      className="absolute inset-0 z-10 group cursor-pointer"
                    >
                      {/* Audio indicator — bottom right */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 group-hover:bg-black/70 transition-all duration-300">
                        {videoMuted ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <line x1="22" y1="9" x2="16" y2="15" />
                              <line x1="16" y1="9" x2="22" y2="15" />
                            </svg>
                            <span className="text-[11px] font-medium text-white/90 tracking-wide">{t('Tap for sound')}</span>
                          </>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoPlaying(true)}
                    aria-label="Play Skillvue product video"
                    className="absolute inset-0 w-full h-full group cursor-pointer"
                  >
                    <img
                      src="https://img.youtube.com/vi/Y8Oo5HBVl-Q/maxresdefault.jpg"
                      alt="Skillvue product video"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Subtle dark overlay for readability of play button */}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0d0d1f" className="ml-1 md:w-7 md:h-7">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated scroll-down arrows — mobile only */}
      <motion.div
        className="relative z-10 flex md:hidden justify-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Lottie
          animationData={scrollArrowsData}
          loop
          autoplay
          style={{ width: 40, height: 40 }}
        />
      </motion.div>

      {/* Trust bar. infinite marquee with glassmorphic blur */}
      <motion.div
        className="relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div
          className="flex items-center h-[60px] md:h-[80px]"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Fixed label. hidden on mobile, visible from md up */}
          <div className="hidden md:flex shrink-0 pl-8 lg:pl-12 pr-12 z-10 relative items-center h-full">
            <span
              className="inline-flex items-center px-6 py-2.5 rounded-lg border border-white/[0.3] text-[15px] text-white/70 whitespace-nowrap hover:text-white/90 hover:border-white/[0.5] transition-all duration-500"
              style={{ fontWeight: 300, letterSpacing: '0.02em' }}
            >
              {t('Our Customers')}
            </span>
          </div>

          {/* Scrolling marquee with mask fade on both edges */}
          <div
            className="flex-1 overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="marquee-track flex items-center">
              {/* First set */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16">
                {trustLogos.map((logo) => (
                  <div
                    key={logo}
                    data-testid={`trust-logo-${logo.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 opacity-[0.55]"
                  >
                    <img
                      src={logoImages[logo]}
                      alt={logo}
                      className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16" aria-hidden="true">
                {trustLogos.map((logo) => (
                  <div key={`dup-${logo}`} className="shrink-0 opacity-[0.45]">
                    <img
                      src={logoImages[logo]}
                      alt=""
                      className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

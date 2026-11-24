/**
 * The Insights hero visual, drawn in code on a transparent background so it
 * sits directly on the light hero (it replaces /videos/insights-hero.*, whose
 * black backdrop is baked in).
 *
 * The motion is the video's: a deck of cover cards. The front card holds, then
 * lifts out past the top with a slight tilt while the next card rises from
 * behind into its place — 1.2 s per card, five cards, a 6 s loop. It is one
 * CSS keyframe loop (`insights-deck` in styles/globals.css) on transform and
 * opacity only, so it runs on the compositor and ships no JavaScript; each
 * card enters the loop at its own offset. Under prefers-reduced-motion the
 * deck is a still stack. It is decorative, so it is hidden from screen
 * readers; the front card's image is preloaded, as the hero's largest paint.
 *
 * The box is square and as wide as the video it replaces (max 560px), so
 * nothing moves when the images arrive. The titles are the cards' existing
 * copy, passed in already translated.
 */
export type DeckCard = { src: string; title: string };

// Where each card enters the 6 s loop, so the deck starts in order: card 0 in
// front, card 1 just behind it, card 2 behind that, the rest out of sight.
const LOOP_S = 6;
const SLOT_S = LOOP_S / 5;

export function InsightsDeck({ cards, className }: { cards: DeckCard[]; className?: string }) {
  return (
    <>
    {/* The front card is the hero's largest paint: fetch it with the document.
        React hoists this <link> into <head>. */}
    {cards[0] && <link rel="preload" as="image" href={cards[0].src} fetchPriority="high" />}
    <div
      className={`relative mx-auto aspect-square w-full max-w-[560px] ${className ?? ''}`}
      aria-hidden="true"
    >
      {cards.map((card, i) => (
        <div
          key={card.src}
          data-depth={Math.min(i, 3)}
          className="insights-deck-card absolute left-[11%] top-[9%] aspect-square w-[78%] overflow-hidden rounded-[22px] shadow-[0_24px_48px_-24px_rgba(18,18,18,0.35)]"
          style={{ animationDelay: `${i === 0 ? 0 : -(LOOP_S - SLOT_S * i)}s` }}
        >
          <img
            src={card.src}
            alt=""
            width={824}
            height={464}
            decoding="async"
            // The three cards in view at the first frame load with the page (the
            // front one first); the two still out of sight are lazy.
            loading={i <= 2 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/80" />
          <div className="absolute inset-x-[7%] bottom-[7%] flex flex-col gap-2">
            <img src="/logos/skillvue-wordmark.svg" alt="" width={742} height={158} className="h-3 w-auto self-start md:h-3.5" />
            <p className="font-display text-[15px] font-semibold leading-[1.2] text-white md:text-[20px]">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

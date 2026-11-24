/**
 * The blog index hero visual, drawn in code on a transparent background so it
 * sits directly on the light hero (it replaces /videos/blog-hero-showcase.*,
 * whose black backdrop is baked in).
 *
 * The motion is the video's: a stack of article cards that moves upward. Every
 * 2 s a new card rises from the bottom edge into the front place while the
 * cards behind it step up one level — a little smaller, a little darker — and
 * the top one fades out. Five cards, a 10 s loop. One CSS keyframe loop
 * (`blog-stack` in styles/globals.css) on transform, opacity and brightness,
 * no JavaScript; each card enters the loop at its own offset. Under
 * prefers-reduced-motion it is a still stack. It is decorative, so it is
 * hidden from screen readers, and the front card's image is preloaded.
 *
 * The box has the video's size and aspect ratio (662:830, at most 360px wide),
 * so nothing moves when the images arrive. It clips its bottom edge, where the
 * new cards rise in. The tags are the articles' existing copy, passed in
 * already translated.
 */
export type StackCard = { src: string; tag: string };

// Five 2 s slots in a 10 s loop. A card's offset is how many slots of its
// cycle have already run at t = 0.
const LOOP_S = 10;
const SLOT_S = LOOP_S / 5;

export function BlogStack({ cards, className }: { cards: StackCard[]; className?: string }) {
  return (
    <>
      {/* The front card is the hero's largest paint: fetch it with the document.
          React hoists this <link> into <head>. */}
      {cards[0] && <link rel="preload" as="image" href={cards[0].src} fetchPriority="high" />}
      <div
        className={`relative mx-auto aspect-[662/830] w-full max-w-[360px] overflow-hidden ${className ?? ''}`}
        aria-hidden="true"
      >
        {cards.map((card, i) => (
          <div
            key={card.src}
            // Card 0 starts in front; the others start where the loop puts
            // them: card 1 next to rise in, cards 2-4 already in the stack.
            data-depth={i === 0 ? 0 : i === 1 ? 4 : 5 - i}
            className="blog-stack-card absolute inset-x-0 top-[40%] h-[58%] overflow-hidden rounded-[22px]"
            style={{ animationDelay: `${i === 0 ? 0 : -(SLOT_S * (5 - i))}s` }}
          >
            <img
              src={card.src}
              alt=""
              width={824}
              height={464}
              decoding="async"
              // Every card in view at the first frame loads with the page (any of
              // them can be the largest paint); only the one waiting below is lazy.
              loading={i === 1 ? 'lazy' : 'eager'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-55% to-black/45" />
            <span className="type-caption absolute bottom-[6%] left-[5%] rounded-full border border-white/80 px-3 py-1 font-medium uppercase text-white">
              {card.tag}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

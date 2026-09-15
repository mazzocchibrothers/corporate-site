import { getLocale, getTranslations } from 'next-intl/server';
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Play,
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import { href } from '@/i18n/routes';
import TalentPioneersCarousel from '@/components/customers/TalentPioneersCarousel';
import TalentPioneersContactForm from '@/components/customers/TalentPioneersContactForm';

const EYEBROW = 'text-[12px] font-medium uppercase tracking-[1.2px]';

type DayToDayItem =
  | { id: string; kind: 'story'; storyRoute: string; bgImage: string }
  | { id: string; kind: 'quote'; storyRoute: string };

type Translate = ((key: string) => string) & {
  has: (key: string) => boolean;
  raw: (key: string) => unknown;
};

// The design alternates real customer stories with quotes from Talent
// Pioneers members who are themselves customers — both link to that
// customer's full case study. Order, kind and routing are layout, not copy,
// so they live in code and only the strings come from the catalogue.
const DAY_TO_DAY_ITEMS: DayToDayItem[] = [
  { id: 'credem', kind: 'story', storyRoute: 'customers/credem', bgImage: '/logos/credem_customer_story_cover.avif' },
  { id: 'carrefour', kind: 'quote', storyRoute: 'customers/carrefour' },
  { id: 'europAssistance', kind: 'story', storyRoute: 'customers/europ-assistance', bgImage: '/logos/europ-assistance-background-explore-stories.avif' },
  { id: 'subdued', kind: 'quote', storyRoute: 'customers/subdued' },
  { id: 'fidiaFarmaceutici', kind: 'story', storyRoute: 'customers/fidia-farmaceutici', bgImage: '/logos/fidia-farmaceutici explore stories.avif' },
  { id: 'luca', kind: 'quote', storyRoute: 'customers/mediaset' },
  { id: 'unicomm', kind: 'story', storyRoute: 'customers/unicomm', bgImage: '/logos/unicomm-background-explore-stories.avif' },
  { id: 'alberto', kind: 'quote', storyRoute: 'customers/adr' },
];

const CHAPTERS = [
  { id: 'chapter01', bgImage: '/logos/talent-pioneers-chapter-01.avif' },
  { id: 'chapter02', bgImage: '/logos/talent-pioneers-chapter-02.avif' },
];

const PAST_STAGES = [
  { id: 'hrTechEurope', bgImage: '/logos/talent-pioneers-stage-hrtech-europe.avif' },
  { id: 'hrTechnologiesUk', bgImage: '/logos/talent-pioneers-stage-hrtech-uk.avif' },
  { id: 'retailSummit', bgImage: '/logos/talent-pioneers-stage-retail-summit.avif' },
  { id: 'hrCoreBarcelona', bgImage: '/logos/talent-pioneers-stage-hrcore-barcelona.avif' },
  { id: 'hrCoreNordics', bgImage: '/logos/talent-pioneers-stage-hrcore-nordics.avif' },
];

const UPCOMING_EVENTS = [
  { id: 'fairCultures', url: 'https://www.faircultures.com/' },
  { id: 'retailExecutiveSummit', url: 'https://www.retailexecutivesummit.it/' },
  { id: 'lavoroSostenibile', url: 'https://www.lavorosostenibile.com/' },
  { id: 'forumHr', url: 'https://comunicazioneitaliana.it/eventi/forum-hr-26' },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
      <span className="text-[12px] leading-[1.4] text-white">{children}</span>
    </div>
  );
}

function CardFooter({
  name,
  company,
  linkLabel,
}: {
  name?: string;
  company: string;
  linkLabel: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col">
        {name && <p className="text-[14px] leading-[1.45] text-white/80">{name}</p>}
        <p className="text-[24px] font-semibold leading-[1.25] tracking-[-0.48px] text-white/90">{company}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[16px] font-medium leading-[1.25] text-[#6b7dff]">{linkLabel}</span>
        <ArrowUpRight className="h-4 w-4 text-[#6b7dff]" aria-hidden="true" />
      </div>
    </div>
  );
}

function DayToDayCard({
  item,
  t,
  lang,
}: {
  item: DayToDayItem;
  t: Translate;
  lang: string;
}) {
  const badgesKey = `dayToDay.items.${item.id}.titleBadges`;
  const badges = t.has(badgesKey) ? (t.raw(badgesKey) as string[]) : [t(`dayToDay.items.${item.id}.title`)];
  const nameKey = `dayToDay.items.${item.id}.name`;
  const name = t.has(nameKey) ? t(nameKey) : undefined;
  const company = t(`dayToDay.items.${item.id}.company`);

  if (item.kind === 'quote') {
    return (
      <a
        href={href(item.storyRoute, lang)}
        className="group flex h-[420px] w-[300px] shrink-0 flex-col gap-6 rounded-2xl border border-white/[0.13] bg-white/[0.05] p-6 transition-colors duration-300 hover:border-white/20 md:h-[453px] md:w-[340px]"
      >
        <div className="flex w-full items-start gap-2">
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <div className="flex w-full flex-1 flex-col gap-2">
          <img src="/logos/talent-pioneers-quote-icon.svg" alt="" loading="lazy" decoding="async" className="h-6 w-6" />
          <p className="text-[17px] font-medium italic leading-[1.4] tracking-[-0.17px] text-white/85">
            &ldquo;{t(`dayToDay.items.${item.id}.quote`)}&rdquo;
          </p>
        </div>
        <CardFooter name={name} company={company} linkLabel={t('dayToDay.readStory')} />
      </a>
    );
  }

  return (
    <a
      href={href(item.storyRoute, lang)}
      className="group relative flex h-[420px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] md:h-[453px] md:w-[340px]"
    >
      <img
        src={item.bgImage}
        alt=""
        draggable={false}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
      <div className="absolute left-6 top-6 flex items-start gap-2">
        {badges.map((badge) => (
          <Badge key={badge}>{badge}</Badge>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="h-5 w-5 pl-0.5 text-[#121212]" fill="currentColor" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-6">
        <CardFooter name={name} company={company} linkLabel={t('dayToDay.watchClip')} />
      </div>
    </a>
  );
}

function DayToDayCarousel({
  items,
  t,
  lang,
}: {
  items: DayToDayItem[];
  t: Translate;
  lang: string;
}) {
  const cards = () => items.map((item) => <DayToDayCard key={item.id} item={item} t={t} lang={lang} />);

  return (
    <TalentPioneersCarousel>
      <div className="flex items-stretch gap-5 shrink-0 pr-5">{cards()}</div>
      <div className="flex items-stretch gap-5 shrink-0 pr-5" aria-hidden inert>{cards()}</div>
    </TalentPioneersCarousel>
  );
}

export default async function TalentPioneersPage() {
  const [t, lang] = await Promise.all([
    getTranslations('customers.talent-pioneers'),
    getLocale(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center px-5 md:px-8 lg:px-12 pt-24 pb-16">
          <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal y={24}>
              <p className={`${EYEBROW} text-[#6b7dff]`}>{t('hero.eyebrow')}</p>
              <h1 className="pt-6 text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-[-1.6px] text-white/95">
                {t.rich('hero.headline', {
                  hl: (chunks) => (
                    <span className="gradient-text whitespace-nowrap">{chunks}</span>
                  ),
                })}
              </h1>
              <p className="pt-6 max-w-[576px] text-[18px] leading-[1.4] text-white/65">{t('hero.subtitle')}</p>
            </Reveal>
            <Reveal y={24} delay={0.1}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="aspect-square w-full rounded-[40px] object-cover"
              >
                <source src="/logos/talent-pioneers-hero.webm" type="video/webm" />
                <source src="/logos/talent-pioneers-hero.mp4" type="video/mp4" />
              </video>
            </Reveal>
          </div>
        </section>

        {/* Why Talent Pioneers */}
        <section className="section-breathe min-h-screen flex flex-col justify-center bg-[#F7F7F7] px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal y={24}>
              <p className={`${EYEBROW} text-[#4b4df7]`}>{t('why.eyebrow')}</p>
              <div className="pt-8 flex flex-col gap-6 text-[22px] md:text-[24px] font-semibold leading-[1.25] tracking-[-0.48px]">
                <p className="text-[#1e1e1e]">
                  {t.rich('why.paragraph1', {
                    dim: (chunks) => <span className="font-medium text-[#4b4b4b]">{chunks}</span>,
                  })}
                </p>
                <p className="text-[#1e1e1e]">
                  {t.rich('why.paragraph2', {
                    dim: (chunks) => <span className="font-medium text-[#4b4b4b]">{chunks}</span>,
                  })}
                </p>
              </div>
            </Reveal>
            <Reveal y={24} delay={0.1}>
              <img
                src="/logos/talent-pioneers-why.avif"
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[1304/870] w-full rounded-3xl object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* The day-to-day */}
        <section className="min-h-screen flex flex-col justify-center px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Reveal y={24} className="w-full">
              <p className={`${EYEBROW} text-[#6b7dff]`}>{t('dayToDay.eyebrow')}</p>
              <h2 className="pt-6 text-balance text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white/95">
                {t.rich('dayToDay.heading', {
                  accent: (chunks) => (
                    <span className="gradient-text">{chunks}</span>
                  ),
                })}
              </h2>
            </Reveal>
            <Reveal y={24} delay={0.1} className="pt-12">
              <DayToDayCarousel items={DAY_TO_DAY_ITEMS} t={t} lang={lang} />
            </Reveal>
          </div>
        </section>

        {/* The Chapters */}
        <section className="section-breathe bg-[#F7F7F7] px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Reveal y={24} className="w-full">
              <p className={`${EYEBROW} text-[#4b4df7]`}>{t('chapters.eyebrow')}</p>
              <h2 className="pt-6 text-balance text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                <span className="text-[#121212]">{t('chapters.heading')}</span>{' '}
                <span className="gradient-text">{t('chapters.headingAccent')}</span>
              </h2>
              <p className="pt-5 max-w-[768px] text-[18px] font-medium leading-[1.7] text-[#121212]/80">{t('chapters.paragraph')}</p>
            </Reveal>
            <div className="pt-12 grid md:grid-cols-2 gap-8">
              {CHAPTERS.map((chapter, i) => (
                <Reveal key={chapter.id} y={24} delay={i * 0.1}>
                  <div
                    className="relative flex aspect-[636/397] w-full items-end justify-between overflow-hidden rounded-2xl p-8"
                    style={{ backgroundImage: 'linear-gradient(148deg, #4B4DF7 0%, #7B4DFF 52%, #FF5656 100%)' }}
                  >
                    {chapter.bgImage && (
                      <img src={chapter.bgImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/85" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 43%, rgba(0,0,0,0.85))' }} />
                    <div className="relative flex flex-col items-start gap-2">
                      <img src="/logos/skillvue-wordmark.svg" alt="Skillvue" className="h-4 w-auto shrink-0" />
                      <p className="text-[24px] md:text-[32px] font-bold uppercase text-white">{t(`chapters.items.${chapter.id}.label`)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pt-5">
                    <span className="flex items-center gap-1.5 text-[13px] text-[#121212]/55">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(`chapters.items.${chapter.id}.date`)}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] text-[#121212]/55">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {t(`chapters.items.${chapter.id}.location`)}
                    </span>
                  </div>
                  <p className="max-w-[448px] pt-3 text-[17px] leading-[1.55] text-[#121212]/80">
                    {t(`chapters.items.${chapter.id}.description`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* On the biggest stages */}
        <section className="px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Reveal y={24} className="w-full">
              <p className={`${EYEBROW} text-[#9b9dfb]`}>{t('stages.eyebrow')}</p>
              <h2 className="pt-6 text-balance text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                <span className="text-white/90">{t('stages.heading')}</span>{' '}
                <span className="gradient-text">{t('stages.headingAccent')}</span>
              </h2>
            </Reveal>

            <Reveal y={24} delay={0.1} className="pt-16">
              <p className="text-[11px] font-bold uppercase tracking-[1.54px] text-[#9b9dfb]">{t('stages.pastLabel')}</p>
              <div className="pt-5 grid grid-cols-2 md:grid-cols-5 gap-4">
                {PAST_STAGES.map((stage) => (
                  <div
                    key={stage.id}
                    className="relative flex aspect-[248/310] items-end overflow-hidden rounded-2xl border border-white/[0.08] p-5"
                  >
                    <img src={stage.bgImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50" />
                    <p className="relative text-[15px] font-bold text-white">{t(`stages.past.${stage.id}`)}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal y={24} delay={0.15} className="pt-16">
              <p className="text-[11px] font-bold uppercase tracking-[1.54px] text-[#9b9dfb]">{t('stages.upcomingLabel')}</p>
              <div className="pt-4 border-t border-white/[0.07]">
                {UPCOMING_EVENTS.map((event) => (
                  <a
                    key={event.id}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 border-b border-white/[0.07] py-5 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <span className="w-32 shrink-0 font-mono text-[13px] tracking-[0.65px] text-white/45">
                      {t(`stages.upcoming.${event.id}.date`)}
                    </span>
                    <span className="flex-1 text-[16px] font-semibold text-white/85">
                      {t(`stages.upcoming.${event.id}.title`)}{' '}
                      <span className="font-normal text-white/45">— {t(`stages.upcoming.${event.id}.location`)}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-[#9b9dfb]">
                      {t('stages.visitWebsite')}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Get in touch */}
        <section className="px-5 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto w-full">
            <Reveal
              y={24}
              className="rounded-[32px] border border-white/[0.08] bg-white/[0.05] p-8 md:p-20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                    <span className="text-white/95">{t('contact.heading')}</span>{' '}
                    <span className="gradient-text">{t('contact.headingAccent')}</span>
                  </h2>
                  <p className="pt-5 max-w-[539px] text-[18px] font-light leading-[1.7] text-white/70">{t('contact.paragraph')}</p>
                </div>
                <TalentPioneersContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// @ts-nocheck
'use client';

import React, { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, FileText, Download, BookOpen, Users, Brain, Zap, TrendingUp } from 'lucide-react';
import { whitepapers } from '@/data/whitepapers';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// The one dynamic route on the site. Its paths come from the same array the
// sitemap expands, so a whitepaper cannot exist in one and not the other.
const CHAPTERS: Record<string, { num: string; icon: any }[]> = {
  'beyond-skills': [
    { num: '01', icon: Zap },
    { num: '02', icon: Brain },
    { num: '03', icon: Users },
    { num: '04', icon: TrendingUp },
    { num: '05', icon: BookOpen },
  ],
  'future-leaders': [
    { num: '01', icon: Zap },
    { num: '02', icon: Brain },
    { num: '03', icon: Users },
    { num: '04', icon: TrendingUp },
    { num: '05', icon: BookOpen },
  ],
  'sales-network-turnover': [
    { num: '01', icon: Zap },
    { num: '02', icon: Brain },
    { num: '03', icon: Users },
    { num: '04', icon: TrendingUp },
  ],
};

const STAT_COUNT: Record<string, number> = {
  'beyond-skills': 3,
  'future-leaders': 3,
  'sales-network-turnover': 3,
};



// The slug arrives as a prop, not from the router: in the App Router the
// dynamic segment belongs to the server component that owns the route, and
// reading it here would mean a second source of truth for the same value.
export default function WhitepaperDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const lang = useLocale();
  const t = useTranslations('resources.whitepapers');
  const formRef = useRef(null);

  const wp = whitepapers.find(w => w.slug === slug);
  // A form GUID identifies a HubSpot form, not a translation of one, so it
  // stays data. It is per-language because the two forms ask different
  // questions, not because the words differ.
  const formId = wp ? (lang === 'it' ? wp.hubspotFormIT : wp.hubspotFormEN) : null;
  const related = wp ? wp.relatedSlugs
    .map(s => whitepapers.find(w => w.slug === s))
    .filter(Boolean)
    .slice(0, 3) : [];

  useEffect(() => {
    if (!formId) return;
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({ portalId: '48438018', formId, region: 'na1', target: '#wp-hubspot-form' });
      }
    };
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, [formId]);

  if (!wp) {
    return (<><Navbar /><div className="min-h-screen flex items-center justify-center"><p className="text-white/50 text-[18px]">{t('detail.body')}</p></div></>);
  }

  // Chapter data — English
  // Chapter numbering and icons are structure; the titles and the stats are
  // copy and live in the catalogue, keyed on the slug.
  const chapters = CHAPTERS[slug] ?? [];
  const stats = STAT_COUNT[slug] ?? 0;

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-end">
          {wp.coverBg && (
            <>
              <img src={wp.coverBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </>
          )}
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full pb-20 lg:pb-28 pt-32">
            <Button
              onClick={() => { router.push('/resources/whitepapers'); window.scrollTo(0, 0); }}
              variant="tertiary"
              mode="dark"
              icon={<ArrowLeft aria-hidden />}
              iconPosition="left"
              className="mb-12"
            >{t('detail.cta')}</Button>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {wp.topic.map(tag => (
                      <span key={tag} className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{tag}</span>
                    ))}
                    <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-white/40 border border-white/[0.08] tracking-wide">{t('badge')}</span>
                  </div>
                  <h1 className="font-semibold text-white/95 mb-6 text-[48px] md:text-[64px]" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                    {t(`items.${slug}.title`)}
                  </h1>
                  <p className="text-[20px] text-white/[0.5] leading-[1.75] max-w-2xl" style={{ fontWeight: 300 }}>
                    {t(`items.${slug}.heroDesc`)}
                  </p>
                </motion.div>
              </div>
              <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                <Button
                  asChild
                  variant="secondary"
                  mode="dark"
                  icon={null}
                  className="justify-start gap-4 px-7 py-5 rounded-2xl border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] hover:bg-[#4B4DF7]/[0.15]"
                >
                  <a
                    href="#download-form"
                    onClick={(e) => { e.preventDefault(); document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group"
                  >
                    <Download className="h-6 w-6 text-[#4B4DF7] shrink-0" />
                    <div>
                      <span className="text-[15px] font-semibold text-white/90 block">{t('detail.cta2')}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-[#4B4DF7] group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Key Stats */}
        <section className="relative py-20 lg:py-24 border-t border-white/[0.04]">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: stats }, (_, i) => i + 1).map((n, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                  <span className="block text-[#4B4DF7] font-semibold md:font-bold mb-3 text-[32px] md:text-[clamp(2.5rem,5vw,3.5rem)]" style={{ letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {t(`items.${slug}.stats.s${n}.value`)}<span className="text-[0.6em] text-white/30 ml-1">{t.has(`items.${slug}.stats.s${n}.unit`) ? t(`items.${slug}.stats.s${n}.unit`) : ''}</span>
                  </span>
                  <p className="text-[14px] text-white/35 leading-[1.6] max-w-[280px] mx-auto">{t(`items.${slug}.stats.s${n}.label`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What's Inside */}
        <section className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold text-[#121212] mb-4 tracking-[-0.02em]">
                {t.rich('detail.insideHeading', { span: (chunks) => <span className="gradient-text-on-light">{chunks}</span> })}
              </h2>
              <p className="text-[16px] text-[#121212]/[0.45] max-w-xl">{t(`items.${slug}.fullDesc`)}</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chapters.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div key={ch.num} className="group rounded-2xl border border-[#4B4DF7]/[0.06] hover:border-[#4B4DF7]/[0.15] bg-white p-8 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.1] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] transition-all duration-500">
                        <Icon className="h-5 w-5 text-[#4B4DF7]/60" />
                      </div>
                      <span className="text-[12px] font-bold text-[#4B4DF7]/40 tracking-[0.15em]">{ch.num}</span>
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#121212] mb-3 leading-tight">{t(`items.${slug}.chapters.c${i + 1}.title`)}</h3>
                    <p className="text-[14px] text-[#121212]/[0.5] leading-[1.7]">{t(`items.${slug}.chapters.c${i + 1}.desc`)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Download Form */}
        <section id="download-form" className="relative py-16 lg:py-20">
          <div className="max-w-[700px] mx-auto px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#4B4DF7]/[0.12] border border-[#4B4DF7]/[0.15] flex items-center justify-center mx-auto mb-6">
                <FileText className="h-7 w-7 text-[#4B4DF7]" />
              </div>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white/90 mb-3">{t('detail.heading')}</h2>
              <p className="text-[15px] text-white/40">{t('detail.body2')}</p>
            </motion.div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 lg:p-10">
              <div id="wp-hubspot-form" ref={formRef} style={{ minHeight: '300px' }} />
            </div>
          </div>
        </section>

        {/* 6. Related */}
        {related.length > 0 && (
          <section className="relative pt-8 pb-2 lg:pt-10 lg:pb-2">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-white/90 mb-10">{t('detail.heading2')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rw, i) => {
                  return (
                    <motion.div key={rw.slug} className="group flex gap-6 items-center p-5 rounded-2xl border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      onClick={() => { router.push(`/resources/whitepapers/${rw.slug}`); window.scrollTo(0, 0); }}>
                      {rw.coverBg && (
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                          <img loading="lazy" decoding="async" src={rw.coverBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-[16px] font-semibold text-white/80 group-hover:text-white transition-colors duration-300 mb-1">{t(`items.${rw.slug}.title`)}</h3>
                        <p className="text-[13px] text-white/35 line-clamp-1">{t(`items.${rw.slug}.shortDesc`)}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-[#4B4DF7] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 7. Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">{t('detail.heading3')}</h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">{t('detail.body3')}</p>
              <Button
                onClick={() => { router.push(href('book-meeting', lang)); window.scrollTo(0, 0); }}
                variant="primary"
                mode="dark"
              >{t('detail.cta3')}</Button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

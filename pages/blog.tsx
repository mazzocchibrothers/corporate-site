// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const articles = [
  { id: 1, title: 'Attitude vs. Competence: How to Evaluate a Candidate', date: 'March 13, 2026', tag: 'Talent Acquisition', image: 'https://images.unsplash.com/photo-1713865469900-d12502a39875?w=600&h=400&fit=crop', href: '/blog/attitude-vs-competence' },
  { id: 2, title: 'The 8 Most Common Recruitment Biases (and How to Avoid Them)', date: 'March 10, 2026', tag: 'Hiring', image: 'https://images.unsplash.com/photo-1758519288480-1489c17b1519?w=600&h=400&fit=crop', href: '/blog/recruitment-biases' },
  { id: 3, title: 'The 7 Most Effective Negotiation Techniques at Work', date: 'March 4, 2026', tag: 'Performance', image: 'https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=600&h=400&fit=crop', href: '/blog/negotiation-techniques' },
  { id: 4, title: 'What Is Accountability and Why It Improves Work Performance', date: 'February 27, 2026', tag: 'Culture', image: 'https://images.unsplash.com/photo-1545005785-a4a5554b8efe?w=600&h=400&fit=crop', href: '/blog/accountability' },
  { id: 5, title: 'What Is Critical Thinking and How to Assess This Skill', date: 'February 25, 2026', tag: 'Science', image: 'https://images.unsplash.com/photo-1685541088069-66baf0b2d753?w=600&h=400&fit=crop', href: '/blog/critical-thinking' },
  { id: 6, title: 'Corporate Onboarding: A Complete Process Guide', date: 'February 23, 2026', tag: 'Onboarding', image: 'https://images.unsplash.com/photo-1758519288548-046187014c85?w=600&h=400&fit=crop', href: '/blog/corporate-onboarding' },
  { id: 7, title: 'Managerial Skills: What They Are and How to Identify Them', date: 'February 23, 2026', tag: 'Leadership', image: 'https://images.unsplash.com/photo-1752650735509-58f11eaa2e10?w=600&h=400&fit=crop', href: '/blog/managerial-skills' },
  { id: 8, title: 'Social Skills: What They Are and Why They Matter at Work', date: 'February 18, 2026', tag: 'Soft Skills', image: 'https://images.unsplash.com/photo-1544477989-b64060e53f36?w=600&h=400&fit=crop', href: '/blog/social-skills' },
  { id: 9, title: 'Talent Acquisition: What It Is, How It Works, Why It Matters', date: 'February 12, 2026', tag: 'Talent Acquisition', image: 'https://images.unsplash.com/photo-1726842172813-55c6e284f8b5?w=600&h=400&fit=crop', href: '/blog/talent-acquisition' },
];

// Featured article = first one
const featured = articles[0];
const rest = articles.slice(1);

export default function BlogPage() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero. Full viewport, clean like White Papers */}
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-[14px] font-semibold text-[#4B4DF7]/60 tracking-[0.2em] uppercase mb-8 block">{t('Resources')}</span>
              <h1
                className="font-bold text-white/95 mb-8"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
              >
                {t('Blog &')}<br />
                <span className="italic gradient-text">{t('Insights')}</span>
              </h1>
              <p className="text-[20px] text-white/[0.45] leading-[1.75] max-w-xl mb-12" style={{ fontWeight: 300 }}>
                {t('Insights, research, and perspectives on talent intelligence, AI in HR, and the future of people decisions.')}
              </p>
              <a
                href="#articles"
                onClick={(e) => { e.preventDefault(); document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-3 text-[14px] text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.25] transition-all duration-300">
                  <ChevronDown className="h-4 w-4" />
                </span>
                {t('Explore articles')}
              </a>
            </motion.div>
          </div>
        </section>

        {/* 2. Article Grid */}
        <section id="articles" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#1A1A2E] tracking-[-0.02em]">{t('All Articles')}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.article
                  key={article.id}
                  className="group rounded-2xl border border-[#4B4DF7]/[0.06] hover:border-[#4B4DF7]/[0.15] bg-white overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  data-testid={`blog-article-${article.id}`}
                  onClick={() => { if (article.href) { router.push(article.href); window.scrollTo(0, 0); } }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide">
                        {article.tag}
                      </span>
                      <span className="text-[12px] text-[#1A1A2E]/30">{article.date}</span>
                    </div>
                    <h2 className="text-[18px] font-bold text-[#1A1A2E] leading-snug mb-4 group-hover:text-[#4B4DF7] transition-colors duration-300">
                      {t(article.title)}
                    </h2>
                    <span className="text-[13px] font-semibold text-[#4B4DF7] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t('Read more')} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">
                {t('Want to go deeper? Talk to our team.')}
              </h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">
                {t('Book a meeting and discover how Skillvue turns talent decisions into a competitive advantage.')}
              </p>
              <button
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
                className="group inline-flex items-center justify-between px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-500"
              >
                <span>{t('Book a Meeting')}</span>
                <ArrowRight className="h-4 w-4 ml-6 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}

// @ts-nocheck
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TAHero from '@/components/solutions/ta/TAHero';
import TAProblem from '@/components/solutions/ta/TAProblem';
import TAShift from '@/components/solutions/ta/TAShift';
import TAImpact from '@/components/solutions/ta/TAImpact';
import TAFunnel from '@/components/solutions/ta/TAFunnel';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';



export default function TalentAcquisitionPage() {
  const t = useTranslations('solutions.talent-acquisition');

  return (
    <>
      <Navbar />
      <main>
        <TAHero />
        <div className="fade-into-light" />
        <TAProblem />
        <div className="fade-into-dark" />
        <TAShift />
        <div className="fade-into-light" />
        <TAFunnel />
        <TAImpact />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentId="solutions/talent-acquisition" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}

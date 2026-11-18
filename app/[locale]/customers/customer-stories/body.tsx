import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import CustomersHero from '@/components/customers/CustomersHero';
import CustomerTestimonials from '@/components/customers/CustomerTestimonials';
import ExploreStories from '@/components/customers/ExploreStories';
import ROISection from '@/components/landing/ROISection';
import CustomersFinalCTA from '@/components/customers/CustomersFinalCTA';



export default function CustomersPage() {

  return (
    <>
      <Navbar />
      <main>
        <CustomersHero />
        <div className="fade-into-light" />
        <CustomerTestimonials />
        <div className="fade-into-dark" />
        <ExploreStories />
        <div className="fade-into-light" />
        <ROISection />
        <div className="fade-into-dark" />
        <CustomersFinalCTA />
      <Footer />
      </main>
    </>
  );
}

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TourGrid from '@/components/TourGrid';
import FAQ from '@/components/FAQ';
import DayTrips from '@/components/DayTrips';
import Destinations from '@/components/Destinations';
import ZahriToursSection from '@/components/ZahriToursSection';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <TourGrid />
        <FAQ />
        <DayTrips />
        <Destinations />
        <ZahriToursSection />
      </main>
      <Footer />
      <FloatingElements />
    </>
  );
}

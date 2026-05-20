import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Below-the-fold: lazy-load to reduce initial JS bundle
const Services = dynamic(() => import('@/components/Services'));
const TourGrid = dynamic(() => import('@/components/TourGrid'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const DayTrips = dynamic(() => import('@/components/DayTrips'));
const Destinations = dynamic(() => import('@/components/Destinations'));
const ZahriToursSection = dynamic(() => import('@/components/ZahriToursSection'));
const Footer = dynamic(() => import('@/components/Footer'));
// FloatingElements is scroll-driven (client-only via useEffect)
const FloatingElements = dynamic(() => import('@/components/FloatingElements'));

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


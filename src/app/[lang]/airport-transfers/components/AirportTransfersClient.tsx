"use client";

import { Locale } from '@/lib/airportTransfersData';
import AirportHero from './AirportHero';
import FleetSection from './FleetSection';
import PopularRoutesSection from './PopularRoutesSection';
import StepsSection from './StepsSection';
import WhyUsSection from './WhyUsSection';
import ReviewsSection from './ReviewsSection';
import AirportCoverageSection from './AirportCoverageSection';
import FAQSection from './FAQSection';
import FinalCTASection from './FinalCTASection';
import TransferServicesSection from './TransferServicesSection';
import StickyMobileBar from './StickyMobileBar';
import styles from '../AirportTransfers.module.css';

interface AirportTransfersClientProps {
    lang: Locale;
}

export default function AirportTransfersClient({ lang }: AirportTransfersClientProps) {
    const isAr = lang === 'ar';

    return (
        <div className={styles.pageWrapper} dir={isAr ? 'rtl' : 'ltr'}>
            {/* 1. Hero with integrated instant booking widget & 3 trust chips */}
            <AirportHero lang={lang} />

            {/* 2. Popular airport routes (Pricing first: guaranteed flat rates, instant prefill) */}
            <PopularRoutesSection lang={lang} />

            {/* 3. Fleet showcase (Vehicles, luggage capacity & luxury comfort) */}
            <FleetSection lang={lang} />

            {/* 4. How it works (3 effortless steps, zero advance deposit) */}
            <StepsSection lang={lang} />

            {/* 5. Why Choose Us (Flight delay tracking, terminal meet & greet, vetted drivers) */}
            <WhyUsSection lang={lang} />

            {/* 6. Client reviews (Social proof: 4.9/5 TrustScore summary & verified quotes) */}
            <ReviewsSection lang={lang} />

            {/* 7. Morocco Airport Network: Select Your Airport (7 hub cards with guaranteed rates & dedicated spoke guides) */}
            <AirportCoverageSection lang={lang} />

            {/* 8. Beyond Airport Transfers: Our Morocco Transfer Services (City-to-city, chauffeur at disposal, tours) */}
            <TransferServicesSection lang={lang} />

            {/* 9. Frequently Asked Questions (Compact 2-column grid answering flight delays, riad access, payment) */}
            <FAQSection lang={lang} />

            {/* 10. Final conversion CTA */}
            <FinalCTASection lang={lang} />

            {/* Mobile Sticky Quick Action Bar */}
            <StickyMobileBar lang={lang} />
        </div>
    );
}

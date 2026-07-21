import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import VideoPlayer from '@/components/VideoPlayer';
import { Metadata } from 'next';
import { Language, translations } from '@/lib/translations';
import Link from 'next/link';

import faqStyles from '@/components/FAQ.module.css';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import PrivateDriverHeroGallery from '@/components/PrivateDriverHeroGallery';
import PrivateDriverMetaSection from '@/components/PrivateDriverMetaSection';
import ModernCTA from '@/components/ModernCTA';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import PrivateDriverInclusions from '@/components/PrivateDriverInclusions';
import ChauffeurDestinations from '@/components/ChauffeurDestinations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn 
        ? 'Private Driver Chefchaouen – Chauffeur Service to Blue City | Mdina Tours' 
        : 'Chauffeur Privé Chefchaouen – Voiture avec Chauffeur au Maroc | Mdina Tours';
    const description = isEn
        ? 'Book a professional private driver in Chefchaouen. Premium vehicles with English-speaking local chauffeurs (Dispo Chauffeur) for tours of the Rif Mountains and the Blue City.'
        : 'Louez un véhicule avec chauffeur privé à Chefchaouen. Chauffeurs professionnels bilingues (Disposition Chauffeur) pour vos excursions de la Ville Bleue.';
    const url = `https://mdinatours.com/${lang}/private-driver-chefchaouen`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/private-driver-chefchaouen',
                'fr': 'https://mdinatours.com/fr/private-driver-chefchaouen',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-chefchaouen.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Private Driver Chefchaouen Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-chefchaouen.webp'],
        },
    };
}

export default async function PrivateDriverChefchaouenPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    const getWhatsAppUrl = (msg: string) => {
        return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
    };

    const textChefchaouen = {
        h1: isEn ? "Private Driver in Chefchaouen – Chauffeur Service to the Blue City" : "Chauffeur Privé à Chefchaouen – Service de Chauffeur de Disposition",
        subtitle: isEn 
            ? "Explore the iconic blue-washed streets of Chefchaouen and the beautiful Rif region with a dedicated, English-speaking driver. Clear, flat rates."
            : "Explorez les célèbres ruelles bleues de Chefchaouen et la région du Rif avec un chauffeur privé bilingue à disposition. Tarifs fixes tout compris.",
        bannerLabel: isEn ? "Chefchaouen Driver" : "Chauffeur Chefchaouen",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver service in Chefchaouen."
            : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé à Chefchaouen.",
        introTitle: isEn ? "Premium Chefchaouen Chauffeur & Dispo Service" : "Service de Chauffeur Privé & Disposition Premium à Chefchaouen",
        introP1: isEn
            ? "For travelers visiting Chefchaouen, the beautiful Blue Pearl of Morocco, navigating the mountainous Rif roads or arranging transport to other cities can be challenging. Our professional private driver dispo service (locally called \"Dispo Chauffeur\") offers the perfect solution. Sit back and enjoy the scenery while your dedicated local chauffeur navigates the winding roads, coordinates stops at the Akchour waterfalls, and remains on standby for your local explorations."
            : "Pour les voyageurs de passage à Chefchaouen, la Perle Bleue du Maroc, naviguer sur les routes montagneuses du Rif peut s'avérer complexe. Notre service de chauffeur privé à disposition (« Dispo Chauffeur ») est la solution idéale. Installez-vous confortablement et profitez du paysage pendant que votre chauffeur local bilingue prend en charge la route, planifie une pause aux cascades d'Akchour et reste disponible.",
        faqTitle: isEn ? "Chefchaouen Chauffeur Dispo FAQs" : "Questions Fréquentes - Chauffeur Dispo à Chefchaouen",
        useCasesTitle: isEn ? "Popular Chefchaouen Chauffeur Use Cases" : "Exemples d'excursions avec chauffeur à Chefchaouen"
    };

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions." : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes.",
            price: "€35",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const itineraries = [
        {
            title: isEn ? "Tangier to Chefchaouen Private Transfer" : "Transfert Privé Tanger - Chefchaouen",
            desc: isEn 
                ? "Reliable door-to-door transfer between Tangier (Port or Airport) and your hotel in Chefchaouen."
                : "Transfert fiable porte-à-porte entre Tanger (Port ou Aéroport) et votre hôtel à Chefchaouen.",
            price: isEn ? "From €90" : "À partir de 90 €",
            cta: isEn ? "View Transfers" : "Voir les transferts",
            image: "/img2/vito-aeroport.jpg",
            href: "/transfers",
        },
        {
            title: isEn ? "Akchour Waterfalls Day Trip" : "Excursion aux Cascades d'Akchour",
            desc: isEn 
                ? "Drive deep into the Rif Mountains to hike to the beautiful Akchour waterfalls and God's Bridge."
                : "Trajet au cœur du Rif pour faire de la randonnée aux superbes cascades d'Akchour et au Pont de Dieu.",
            price: isEn ? "From €80" : "À partir de 80 €",
            cta: isEn ? "View Tours" : "Voir les circuits",
            image: "/hero-chefchaouen.webp",
            href: "/tours",
        },
        {
            title: isEn ? "Fes to Chefchaouen Transfer / Day Trip" : "Transfert / Excursion de Fès à Chefchaouen",
            desc: isEn 
                ? "Travel comfortably from the spiritual capital Fes to the beautiful Blue City."
                : "Voyagez confortablement depuis la capitale spirituelle Fès vers la superbe Ville Bleue.",
            price: isEn ? "Custom quote" : "Devis personnalisé",
            cta: isEn ? "Get a quote" : "Demander un devis",
            image: "/img2/fes_gate.jpg",
            msg: "Hello Mdina Tours, I would like to get a quote for a private driver service from Chefchaouen to Fes."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our driver took us from Fes to Chefchaouen and spent the day guiding us through Akchour. The drive through the Rif Mountains was beautiful and we felt very safe. <strong style={{ fontWeight: 800 }}>Incredible experience!</strong></>
            ) : (
                <>Notre chauffeur nous a conduits de Fès à Chefchaouen et a passé la journée à nous guider à Akchour. Le trajet était superbe et très sûr. <strong style={{ fontWeight: 800 }}>Une expérience incroyable !</strong></>
            ),
            author: "Charlotte R.",
            flag: "🇨🇦"
        },
        {
            quote: isEn ? (
                <>Having a driver standby in Chefchaouen was so helpful. He handled the mountainous terrain easily, drove very safely, and took us to great local viewpoints. <strong style={{ fontWeight: 800 }}>Excellent service.</strong></>
            ) : (
                <>Avoir un chauffeur en attente à Chefchaouen a été très utile. Il a géré le relief montagneux avec aisance, a conduit de manière très sûre et nous a fait découvrir de superbes points de vue. <strong style={{ fontWeight: 800 }}>Excellent service.</strong></>
            ),
            author: "David L.",
            flag: "🇬🇧"
        }
    ];

    const faqs = [
        {
            q: isEn ? "What is a private driver (\"dispo chauffeur\") in Chefchaouen?" : "Qu'est-ce qu'un service de chauffeur privé (« dispo chauffeur ») à Chefchaouen ?",
            a: isEn 
                ? "A dispo chauffeur is a private vehicle with a professional driver at your full disposal. Perfect for navigating the Rif mountain roads, visiting the Akchour waterfalls, or making day excursions safely."
                : "La formule « dispo chauffeur » désigne la location d'un véhicule avec chauffeur à votre entière disposition. Idéal pour circuler dans le Rif, visiter les cascades d'Akchour ou faire des excursions en toute sécurité."
        },
        {
            q: isEn ? "How do we reach Chefchaouen?" : "Comment se rendre à Chefchaouen ?",
            a: isEn
                ? "Chefchaouen does not have its own airport. The most common and comfortable way to reach it is by booking a private driver/transfer from Tangier (approx. 2 hours) or Fes (approx. 3.5 hours)."
                : "Chefchaouen ne dispose pas de son propre aéroport. Le moyen le plus confortable est de réserver un chauffeur privé depuis Tanger (environ 2h) ou Fès (environ 3h30)."
        },
        {
            q: isEn ? "Can we book a driver for day trips to Akchour Waterfalls?" : "Puis-je louer un chauffeur pour une excursion aux Cascades d'Akchour ?",
            a: isEn
                ? "Yes, Akchour is located about 45 minutes from Chefchaouen. Your dispo driver will drive you to the start of the hiking trail, wait for you while you explore, and drive you back."
                : "Oui, Akchour se trouve à environ 45 minutes de Chefchaouen. Votre chauffeur vous déposera au départ du sentier, vous attendra et vous ramènera."
        },
        {
            q: isEn ? "Are fuel and highway tolls included in the price?" : "Le carburant et les péages sont-ils inclus ?",
            a: isEn
                ? "Yes. Fuel, highway tolls, parking costs, and the driver's fees are fully covered under our flat daily rate. No hidden or extra fees."
                : "Oui. Le carburant, les péages autoroutiers, les frais de stationnement et le chauffeur sont entièrement inclus dans notre tarif journalier."
        },
        {
            q: isEn ? "Do Chefchaouen drivers speak English?" : "Les chauffeurs à Chefchaouen parlent-ils anglais ?",
            a: isEn
                ? "Yes, our drivers speak fluent English and French. They are professional, local experts who will ensure you travel through the Rif region safely."
                : "Oui, nos chauffeurs parlent couramment anglais et français. Ce sont des experts locaux professionnels qui vous conduiront en toute sécurité dans le Rif."
        }
    ];

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "Professional Private Driver & Chauffeur Service Chefchaouen" : "Service de Chauffeur Privé et Disposition Chefchaouen",
        "description": textChefchaouen.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/hero-chefchaouen.webp",
            "telephone": "+212766816992",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chefchaouen",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Chefchaouen"
        },
        "offers": vehicles.map(v => ({
            "@type": "Offer",
            "name": v.name,
            "priceCurrency": "EUR",
            "price": v.price.replace('€', '')
        }))
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Header lightBg={true} />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
                <div className="breadcrumbs-title-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 20px 20px' }}>
                    <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                        <Link href={getPath('/')} style={{ color: '#666', transition: 'color 0.2s' }}>{t('home')}</Link>
                        <span style={{ color: '#ccc' }}>›</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textChefchaouen.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textChefchaouen.h1}
                    </h1>

                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700 }}>5.0</span>
                            <span style={{ color: '#717171', fontWeight: 500 }}>(24 {isEn ? "reviews" : "avis"})</span>
                        </div>
                        <div className="recommended-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            <span>{isEn ? "Recommended by 98% of travelers" : "Recommandé par 98% des voyageurs"}</span>
                        </div>
                        <div className="excellence-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>🏆</span>
                            <span>{isEn ? "Badge of Excellence" : "Badge d'Excellence"}</span>
                        </div>
                        <div className="guarantee-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#64748b', fontWeight: 'bold' }}>🏷️</span>
                            <span>{isEn ? "Lowest Price Guarantee" : "Meilleur prix garanti"}</span>
                        </div>
                    </div>
                </div>

                <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="grid-responsive-layout">
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Chefchaouen" title={textChefchaouen.h1} />
                            <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Chefchaouen" defaultDays={1} />
                            </div>
                            <PrivateDriverMetaSection language={language} />
                        </div>

                        <div style={{ 
                            position: 'sticky', 
                            top: '100px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '16px',
                            maxWidth: '480px',
                            width: '100%',
                            height: 'fit-content',
                            zIndex: 10
                        }} className="booking-widget-sticky-wrapper">
                            <div className="desktop-booking-widget">
                                <PrivateDriverBookingWidget language={language} defaultCity="Chefchaouen" defaultDays={1} />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <TransferWebRatings isEn={isEn} />
                    </div>
                </section>

                <PrivateDriverWhyChooseUs lang={language} />

                <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ 
                            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                            fontWeight: 700, 
                            color: 'var(--secondary)', 
                            marginBottom: '30px',
                            fontFamily: 'var(--font-poppins), sans-serif'
                        }}>
                            {isEn ? "What riding with us feels like" : "L'expérience à bord avec nous"}
                        </h2>
                        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                            <VideoPlayer 
                                src="/img/mercedes-benz-vito-mdinatours.mp4#t=0,54" 
                                style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                            />
                        </div>
                        <p style={{ 
                            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', 
                            fontWeight: 500, 
                            color: '#555',
                            margin: '15px 0 0 0',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontStyle: 'italic'
                        }}>
                            {isEn ? "Every transfer. Every time. No surprises." : "Chaque transfert. À chaque fois. Sans surprise."}
                        </p>
                    </div>
                </section>

                <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div className="testimonials-section-header">
                            <h2 className="testimonials-section-title" style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px', fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {isEn ? "What travelers say" : "Ce que disent nos voyageurs"}
                            </h2>
                            <p className="testimonials-section-rating-text" style={{ color: '#666', fontSize: '1rem', marginTop: '5px' }}>
                                {isEn ? "4.9★ average across 120+ bookings" : "Moyenne de 4,9★ sur plus de 120 réservations"}
                            </p>
                        </div>

                        <div className="testimonials-carousel-container">
                            <div className="testimonials-marquee-track">
                                {reviews.map((rev, idx) => (
                                    <div key={`rev-1-${idx}`} className="testimonial-high-contrast-card testimonial-marquee-card">
                                        <div>
                                            <div className="testimonial-stars-container">
                                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                            </div>
                                            <p className="testimonial-quote-text">
                                                &ldquo;{rev.quote}&rdquo;
                                            </p>
                                        </div>
                                        <div className="testimonial-author-container">
                                            <span className="testimonial-author-name">{rev.author}</span>
                                            <span className="testimonial-author-country">
                                                {rev.flag}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {reviews.map((rev, idx) => (
                                    <div key={`rev-2-${idx}`} className="testimonial-high-contrast-card testimonial-marquee-card" aria-hidden="true">
                                        <div>
                                            <div className="testimonial-stars-container">
                                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                            </div>
                                            <p className="testimonial-quote-text">
                                                &ldquo;{rev.quote}&rdquo;
                                            </p>
                                        </div>
                                        <div className="testimonial-author-container">
                                            <span className="testimonial-author-name">{rev.author}</span>
                                            <span className="testimonial-author-country">
                                                {rev.flag}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap', opacity: 0.8 }}>
                            <img src="/img2/trustpilot-logo.webp" alt="Trustpilot" style={{ height: '35px', objectFit: 'contain' }} />
                            <img src="/img2/TripAdvisor_Logo.svg" alt="TripAdvisor" style={{ height: '35px', objectFit: 'contain' }} />
                        </div>
                    </div>
                </section>

                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                <PrivateDriverInclusions lang={language} />

                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Popular Itineraries" : "Itinéraires Fréquents"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textChefchaouen.useCasesTitle}
                            </h2>
                        </div>
                        <div className="private-driver-routes-grid">
                            {itineraries.map((card, idx) => (
                                <div key={idx} className="private-driver-route-card">
                                    {card.href ? (
                                        <Link href={getPath(card.href)} className="private-driver-route-img-link">
                                            <div className="private-driver-route-img-container">
                                                <img 
                                                    src={card.image} 
                                                    alt={card.title} 
                                                    className="private-driver-route-img"
                                                />
                                                <div className="private-driver-route-price-badge">
                                                    {card.price}
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="private-driver-route-img-container">
                                            <img 
                                                src={card.image} 
                                                alt={card.title} 
                                                className="private-driver-route-img"
                                            />
                                            <div className="private-driver-route-price-badge">
                                                {card.price}
                                            </div>
                                        </div>
                                    )}
                                    <div className="private-driver-route-content">
                                        <h3 className="private-driver-route-title">
                                            {card.href ? (
                                                <Link href={getPath(card.href)} style={{ color: 'inherit' }}>
                                                    {card.title}
                                                </Link>
                                            ) : (
                                                card.title
                                            )}
                                        </h3>
                                        <p className="private-driver-route-desc">
                                            {card.desc}
                                        </p>
                                        {card.href ? (
                                            <Link 
                                                href={getPath(card.href)}
                                                className="private-driver-route-cta private-driver-route-cta-link"
                                            >
                                                {card.cta}
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                                </svg>
                                            </Link>
                                        ) : (
                                            <a 
                                                href={getWhatsAppUrl(card.msg!)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="private-driver-route-cta"
                                            >
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                    <path d="M12.012 2.25c-5.378 0-9.755 4.378-9.755 9.756 0 2.102.665 4.05 1.794 5.656L2.836 21.8c-.144.425.263.832.688.688l4.137-1.215c1.554.981 3.4 1.545 5.351 1.545 5.378 0 9.756-4.379 9.756-9.756S17.39 2.25 12.012 2.25zm5.176 13.9c-.22.617-1.272 1.134-1.748 1.18-.466.046-.902.213-2.923-.59-2.583-1.026-4.237-3.666-4.364-3.836-.129-.17-.932-1.243-.932-2.375 0-1.132.582-1.688.815-1.921.233-.233.51-.292.68-.292.17 0 .34.004.488.01.15.008.353-.06.554.423.204.492.698 1.706.759 1.83.06.124.1.267.017.433-.083.167-.124.267-.25.413-.125.146-.263.325-.375.437-.125.125-.254.26-.109.51.146.25.648 1.07 1.39 1.733.957.854 1.76 1.117 2.01.124.25-.25.146-.51.25-.678.104-.167.208-.125.353-.083.146.042.921.433 1.079.512.158.08.263.117.304.188.042.07.042.413-.178 1.03z"/>
                                                </svg>
                                                {card.cta}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={faqStyles.faqSection} id="faq">
                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Got Questions?" : "Des Questions ?"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textChefchaouen.faqTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid rgba(0, 0, 0, 0.05)',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }} className="faq-details">
                                    <summary style={{
                                        padding: '20px 25px',
                                        fontWeight: 700,
                                        fontSize: '1.05rem',
                                        color: 'var(--secondary)',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{faq.q}</span>
                                        <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>+</span>
                                    </summary>
                                    <div style={{ padding: '0 25px 20px 25px', color: '#555', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <ChauffeurDestinations lang={language} pageType="chefchaouen" />

                <section style={{ padding: '40px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ fontSize: '0.9rem', color: '#555', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', backgroundColor: '#fff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <span>👉 {isEn ? "Chauffeur Services:" : "Services de Chauffeur :"}</span>
                            <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                {isEn ? "Morocco (National)" : "Maroc (National)"}
                            </Link>
                            <span>|</span>
                            <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                {isEn ? "Marrakech dispo" : "Marrakech dispo"}
                            </Link>
                            <span>|</span>
                            <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                {isEn ? "Casablanca dispo" : "Casablanca dispo"}
                            </Link>
                            <span>|</span>
                            <Link href={getPath('/car-with-driver-morocco-8-days')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                {isEn ? "8-Day Chauffeur Package" : "Forfait Chauffeur 8 Jours"}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

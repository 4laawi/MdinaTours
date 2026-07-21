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
        ? 'Private Driver Tangier – Professional Chauffeur Service | Mdina Tours' 
        : 'Chauffeur Privé Tanger – Voiture avec Chauffeur au Maroc | Mdina Tours';
    const description = isEn
        ? 'Book a professional private driver in Tangier. Premium sedans, minivans, and SUVs with English-speaking local chauffeurs (Dispo Chauffeur) for city tours and port transfers.'
        : 'Louez un véhicule avec chauffeur privé à Tanger. Chauffeurs professionnels bilingues (Disposition Chauffeur) pour vos excursions et transferts depuis le port.';
    const url = `https://mdinatours.com/${lang}/private-driver-tangier`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/private-driver-tangier',
                'fr': 'https://mdinatours.com/fr/private-driver-tangier',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/img2/tangier_hero.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Private Driver Tangier Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/img2/tangier_hero.webp'],
        },
    };
}

export default async function PrivateDriverTangierPage({ params }: { params: Promise<{ lang: string }> }) {
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

    const textTangier = {
        h1: isEn ? "Private Driver in Tangier – Professional Chauffeur Service" : "Chauffeur Privé à Tanger – Service de Chauffeur de Disposition",
        subtitle: isEn 
            ? "Explore the northern gateway of Morocco, Cape Spartel, or the Rif Mountains with a dedicated, English-speaking driver. Fixed flat rates, comfort assured."
            : "Explorez la porte du Nord, le Cap Spartel ou le Rif avec un chauffeur privé bilingue à votre entière disposition. Tarifs fixes tout compris, confort garanti.",
        bannerLabel: isEn ? "Tangier Driver" : "Chauffeur Tanger",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver service in Tangier."
            : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé à Tanger.",
        introTitle: isEn ? "Premium Tangier Chauffeur & Dispo Service" : "Service de Chauffeur Privé & Disposition Premium à Tanger",
        introP1: isEn
            ? "For travelers arriving in Tangier by ferry or plane, navigating the gateway to Africa can be daunting. Our professional private driver dispo service (locally called \"Dispo Chauffeur\") provides a comfortable, stress-free alternative. Whether you are visiting the Kasbah, exploring Cape Spartel and the Caves of Hercules, or planning day trips to Asilah and Chefchaouen, you get a premium vehicle and a dedicated chauffeur on standby for as long as you need."
            : "Pour les voyageurs arrivant à Tanger par ferry ou par avion, se déplacer dans cette grande porte de l'Afrique peut s'avérer intimidant. Notre service de chauffeur privé à disposition (« Dispo Chauffeur ») est la solution idéale de confort. Que vous souhaitiez visiter la Kasbah, explorer le Cap Spartel et les Grottes d'Hercule, ou planifier des excursions vers Asilah et Chefchaouen, vous disposez d'un véhicule récent et d'un chauffeur en attente.",
        faqTitle: isEn ? "Tangier Chauffeur Dispo FAQs" : "Questions Fréquentes - Chauffeur Dispo à Tanger",
        useCasesTitle: isEn ? "Popular Tangier Chauffeur Use Cases" : "Exemples d'excursions avec chauffeur à Tanger"
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
            title: isEn ? "Tangier Ville Port & Airport Transfers" : "Transferts Port de Tanger Ville & Aéroport",
            desc: isEn 
                ? "Fast and secure transfers from Tangier Ville Port, Tanger Med, or Tangier Ibn Battouta Airport."
                : "Transferts rapides et sécurisés depuis le Port de Tanger Ville, Tanger Med ou l'Aéroport de Tanger Ibn Battouta.",
            price: isEn ? "From €40" : "À partir de 40 €",
            cta: isEn ? "View Transfers" : "Voir les transferts",
            image: "/img2/vito-aeroport.jpg",
            href: "/transfers",
        },
        {
            title: isEn ? "Asilah Coastal Day Excursion" : "Excursion Côtière à Asilah",
            desc: isEn 
                ? "Visit the charming white-washed fishing village and artistic murals of Asilah."
                : "Visitez le charmant village de pêcheurs blanchi à la chaux et les peintures murales d'Asilah.",
            price: isEn ? "From €120" : "À partir de 120 €",
            cta: isEn ? "View Tours" : "Voir les circuits",
            image: "/Asilah.webp",
            href: "/tours",
        },
        {
            title: isEn ? "Tangier to Chefchaouen Day Trip" : "Excursion de Tanger à Chefchaouen",
            desc: isEn 
                ? "A scenic drive into the Rif Mountains to spend the day in the stunning Blue City."
                : "Un trajet pittoresque dans le Rif pour passer la journée dans la superbe Ville Bleue.",
            price: isEn ? "Custom quote" : "Devis personnalisé",
            cta: isEn ? "Get a quote" : "Demander un devis",
            image: "/hero-chefchaouen.webp",
            msg: "Hello Mdina Tours, I would like to get a quote for a private driver service from Tangier to Chefchaouen."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our ferry from Tarifa was delayed, but the driver was waiting at Tangier port with a big smile. The trip to Chefchaouen was smooth and comfortable. <strong style={{ fontWeight: 800 }}>Amazing service!</strong></>
            ) : (
                <>Notre ferry depuis Tarifa a été retardé, mais le chauffeur nous attendait au port de Tanger avec un grand sourire. Le trajet vers Chefchaouen a été très agréable. <strong style={{ fontWeight: 800 }}>Excellent service !</strong></>
            ),
            author: "Liam H.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>We hired a driver for a day to tour Cape Spartel and Hercules Caves, followed by lunch. The driver was extremely professional and knew the best scenic routes. <strong style={{ fontWeight: 800 }}>Highly recommended.</strong></>
            ) : (
                <>Nous avons loué un chauffeur pour visiter le Cap Spartel et les Grottes d'Hercule, puis déjeuner. Chauffeur très professionnel, connaissant d'excellentes routes panoramiques. <strong style={{ fontWeight: 800 }}>Recommandé !</strong></>
            ),
            author: "Nathalie B.",
            flag: "🇫🇷"
        }
    ];

    const faqs = [
        {
            q: isEn ? "What is a private driver (\"dispo chauffeur\") in Tangier?" : "Qu'est-ce qu'un service de chauffeur privé (« dispo chauffeur ») à Tanger ?",
            a: isEn 
                ? "A dispo chauffeur is a vehicle hired with a professional driver at your complete disposal. It is ideal for exploring Tangier's historical sites, driving to Cape Spartel, or making trips to nearby towns."
                : "La formule « dispo chauffeur » désigne la location d'un véhicule avec chauffeur à votre entière disposition. Idéal pour explorer la ville, aller au Cap Spartel ou visiter les villes voisines."
        },
        {
            q: isEn ? "Can I book a driver from Tangier Ville Port or Tangier Airport (TNG)?" : "Comment réserver depuis le Port de Tanger Ville ou l'Aéroport de Tanger (TNG) ?",
            a: isEn
                ? "Yes, you can easily arrange a pickup. Your driver will meet you directly outside the ferry terminal arrivals gate or airport terminal hall holding a sign with your name."
                : "Oui, la réservation est simple. Votre chauffeur vous accueillera directement à la sortie de la gare maritime ou dans le hall de l'aéroport avec une pancarte à votre nom."
        },
        {
            q: isEn ? "Can we travel from Tangier to Chefchaouen or Asilah?" : "Puis-je voyager de Tanger vers Chefchaouen ou Asilah ?",
            a: isEn
                ? "Yes, Chefchaouen and Asilah are highly popular day trip destinations from Tangier. Our dispo rates cover intercity travel and your driver will handle all navigation and timing."
                : "Oui, Chefchaouen et Asilah sont des excursions très populaires au départ de Tanger. Nos forfaits couvrent ces trajets et votre chauffeur gère les itinéraires."
        },
        {
            q: isEn ? "Are fuel and highway tolls included in the price?" : "Le carburant et les péages sont-ils inclus ?",
            a: isEn
                ? "Yes, fuel, highway toll charges, parking fees, and the driver's fees are completely included in the flat daily rate. No extra charges."
                : "Oui, le carburant, les péages autoroutiers, les frais de stationnement et les frais du chauffeur sont entièrement inclus dans le tarif."
        },
        {
            q: isEn ? "Do Tangier drivers speak English?" : "Les chauffeurs à Tanger parlent-ils anglais ?",
            a: isEn
                ? "Yes, our drivers speak fluent English, French, and Spanish. They are local experts who will make your journey smooth and informative."
                : "Oui, nos chauffeurs parlent couramment anglais, français et espagnol. Ils connaissent parfaitement la région et sauront vous guider."
        }
    ];

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "Professional Private Driver & Chauffeur Service Tangier" : "Service de Chauffeur Privé et Disposition Tanger",
        "description": textTangier.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/img2/tangier_hero.webp",
            "telephone": "+212766816992",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tangier",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Tangier"
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
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textTangier.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textTangier.h1}
                    </h1>

                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700 }}>5.0</span>
                            <span style={{ color: '#717171', fontWeight: 500 }}>(38 {isEn ? "reviews" : "avis"})</span>
                        </div>
                        <div className="recommended-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            <span>{isEn ? "Recommended by 97% of travelers" : "Recommandé par 97% des voyageurs"}</span>
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
                            <PrivateDriverHeroGallery language={language} city="Tangier" title={textTangier.h1} />
                            <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Tangier" defaultDays={1} />
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
                                <PrivateDriverBookingWidget language={language} defaultCity="Tangier" defaultDays={1} />
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
                                {textTangier.useCasesTitle}
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
                                {textTangier.faqTitle}
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

                <ChauffeurDestinations lang={language} pageType="tangier" />

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

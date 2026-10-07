import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { translations, Language } from '@/lib/translations';

import faqStyles from '@/components/FAQ.module.css';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import PrivateDriverHeroGallery from '@/components/PrivateDriverHeroGallery';
import PrivateDriverMetaSection from '@/components/PrivateDriverMetaSection';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import PrivateDriverInclusions from '@/components/PrivateDriverInclusions';
import ProfessionalDriverSection from '@/components/ProfessionalDriverSection';
import ModernCTA from '@/components/ModernCTA';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (lang === 'es') {
        return {
            title: 'Conductor Privado en Marruecos – Coche con Chófer | Mdina Tours',
            description: 'Alquiler de vehículo con conductor privado en Marruecos para traslados, excursiones y rutas personalizadas. Precios transparentes y conductores profesionales.',
            alternates: getAlternates(lang, '/private-driver-morocco'),
        };
    }
    const isEn = lang === 'en';

    const title = isEn ? 'Private Driver Morocco - Professional Chauffeur | Mdina Tours' : 'Chauffeur Privé Maroc - Service de Transport | Mdina Tours';
    const description = isEn
        ? 'Book a professional private driver in Morocco. Premium sedans and minivans with English-speaking local chauffeurs for day trips, weekly tours, and business travel.'
        : 'Louez un véhicule avec chauffeur privé au Maroc. Berlines et minivans confortables pour vos réunions, excursions et voyages interurbains.';
    const url = `https://mdinatours.com/${lang}/private-driver`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/private-driver'),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-landscape-1.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Private Driver Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-landscape-1.webp'],
        },
    };
}

export default async function PrivateDriverPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang === 'es') {
        permanentRedirect('/es/private-driver-morocco');
    }
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    const getWhatsAppUrl = (msg?: string) => {
        const defaultMsg = `Hello Mdina Tours,\nI would like to inquire about booking a private driver/chauffeur service in Morocco.`;
        const text = msg ? msg : defaultMsg;
        return `https://wa.me/212724114775?text=${encodeURIComponent(text)}`;
    };

    const textPrivate = {
        h1: isEn ? "Private Driver in Morocco – Flexible Transportation" : "Chauffeur Privé au Maroc – Service de Transport Dédié",
        subtitle: isEn 
            ? "Rent a vehicle with a professional driver across Morocco. Transparent daily rates, flexible itinerary stops, and experienced local drivers."
            : "Louez un véhicule avec chauffeur professionnel au Maroc. Tarifs clairs, liberté d'itinéraire et chauffeurs expérimentés.",
        bannerLabel: isEn ? "Private Driver" : "Chauffeur Privé",
        introTitle: isEn ? "Private Driver Service in Morocco" : "Service de Chauffeur Privé au Maroc",
        introP1: isEn
            ? "A private driver service provides a vehicle and licensed local driver exclusively for your schedule. Unlike fixed group tours, you travel at your own pace with flexibility for photo stops, meals, and comfort breaks."
            : "Le service de chauffeur privé met à votre disposition un véhicule et un chauffeur professionnel dédié à votre planning. Contrairement aux excursions fixes, vous voyagez à votre propre rythme avec des arrêts libres.",
        introP2: isEn
            ? "Our service covers all major Moroccan cities. You get a clean, air-conditioned vehicle along with a bilingual driver who assists with luggage and navigates regional roads safely."
            : "Notre réseau couvre toutes les grandes villes du Maroc. Vous bénéficiez d'un véhicule récent et climatisé avec un chauffeur bilingue qui vous aide avec vos bagages et assure une conduite sereine.",
        vehiclesTitle: isEn ? "Our Vehicle Fleet" : "Notre flotte de véhicules",
        vehiclesSubtitle: isEn ? "Clean, air-conditioned passenger transport vehicles" : "Des véhicules récents, climatisés et parfaitement entretenus",
        finalCtaTitle: isEn ? "Book Your Private Driver in Morocco" : "Réservez votre Chauffeur Privé au Maroc",
        finalCtaSubtitle: isEn ? "Ready to travel with a dedicated driver for your business trip or custom tour? Chat with us on WhatsApp for a quick quote!" : "Prêt à réserver un véhicule avec chauffeur pour vos réunions ou votre circuit ? Écrivez-nous sur WhatsApp pour un devis rapide !",
        faqTitle: isEn ? "Private Driver Morocco FAQs" : "Questions Fréquentes - Chauffeur Privé au Maroc",
        inclusionTitle: isEn ? "Service Inclusions & Transparency" : "Ce qui est inclus dans votre formule",
        inclusionDesc: isEn 
            ? "To ensure complete transparency, here is a detailed breakdown of what is included in our agreed rates:"
            : "Afin de garantir une transparence totale, voici le détail précis de ce qui est inclus dans nos tarifs convenus :"
    };

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "Comfortable sedan for 1–2 passengers with luggage, ideal for city travel and business trips." : "Berline confortable pour 1 à 2 passagers avec bagages, idéale pour les déplacements urbains et professionnels.",
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "Spacious SUV with higher clearance, well suited for 1–3 passengers on regional routes." : "SUV spacieux avec garde au sol surélevée, adapté pour 1 à 3 passagers sur les routes régionales.",
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "Spacious van for families and small groups with generous luggage capacity." : "Van spacieux pour familles et petits groupes avec une grande capacité de bagages.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "Spacious cabin with extra luggage capacity, recommended for groups and longer multi-day journeys." : "Cabine spacieuse avec grand coffre à bagages, recommandée pour les groupes et les circuits sur plusieurs jours.",
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "Executive minibus configured for large tour groups, corporate delegations, and extended family travel." : "Minibus de prestige configuré pour les grands groupes, délégations d'affaires et voyages en famille.",
            price: "€35",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const faqs = [
        {
            q: isEn ? "What is a private driver service in Morocco?" : "Qu'est-ce qu'un service de chauffeur privé au Maroc ?",
            a: isEn 
                ? "A private driver service provides a dedicated vehicle and professional driver exclusively for your schedule. You travel at your own pace with flexibility for photo stops, coffee, meals, and comfort breaks. Our drivers focus on safe transportation and practical local advice. If you need a licensed historical guide for medina or monument visits, this can be arranged separately for an affordable fee."
                : "La formule chauffeur privé met à votre disposition un véhicule avec chauffeur dédié à votre programme. Vous voyagez à votre rythme avec des arrêts libres pour photos, pauses et repas. Nos chauffeurs assurent une conduite sûre et des conseils pratiques. Si vous souhaitez un guide officiel agréé pour les visites de monuments et médinas, il peut être réservé séparément."
        },
        {
            q: isEn ? "How do medina riad pickups and drop-offs work?" : "Comment se passent les prises en charge aux riads dans les médinas ?",
            a: isEn
                ? "Many riads inside Moroccan medinas cannot be reached directly by car due to pedestrian lanes. In these cases, your driver will get as close as reasonably possible using the nearest vehicle-accessible point and assist you with your luggage."
                : "Certains riads au cœur des médinas ne sont pas accessibles directement en voiture. Dans ce cas, votre chauffeur vous dépose au point carrossable le plus proche et vous aide avec vos bagages."
        },
        {
            q: isEn ? "Is fuel, highway tolls, and parking included in the price?" : "Le carburant, les péages et les frais de route sont-ils inclus ?",
            a: isEn
                ? "Yes. For your agreed itinerary, all standard operating expenses—including fuel, highway tolls, normal parking fees, and the driver's required travel expenses—are fully included in your quotation with no hidden costs."
                : "Oui. Pour l'itinéraire convenu, tous les frais opérationnels — carburant, péages d'autoroute, parkings et frais de route du chauffeur — sont intégralement inclus dans le tarif sans frais cachés."
        },
        {
            q: isEn ? "Can I make stops or adjust the route during the journey?" : "Puis-je faire des arrêts ou ajustements d'itinéraire en cours de route ?",
            a: isEn
                ? "Yes. For city travel and day trips, you can freely request stops for photos, coffee, lunch, or comfort breaks. For significant route modifications involving additional cities or longer driving distances, we will clearly communicate any adjusted rate in advance."
                : "Oui. Pour les trajets locaux et excursions, vous pouvez demander des arrêts photos, café, déjeuner ou repos. Si vous demandez des changements majeurs impliquant des villes supplémentaires ou une distance accrue, un ajustement tarifaire sera communiqué en amont."
        },
        {
            q: isEn ? "How and when do I pay for the service?" : "Comment et quand s'effectue le paiement ?",
            a: isEn
                ? "Payment is made after each travel day. We accept cash or card in EUR, USD, or Moroccan Dirhams (MAD). You will know your exact agreed rate before the service begins."
                : "Le paiement s'effectue à la fin de chaque journée de voyage. Nous acceptons les espèces ou la carte en EUR, USD ou Dirhams marocains (MAD). Le tarif convenu est connu avant le début de la prestation."
        },
        {
            q: isEn ? "Are the driver's hotel and meals included on multi-day tours?" : "Le logement et les repas du chauffeur sont-ils inclus pour les circuits multi-jours ?",
            a: isEn
                ? "Yes. On multi-day journeys outside their home base, the driver's lodging and meals are fully covered by Mdina Tours in your agreed rate. You are never asked to pay for the driver's accommodation separately."
                : "Oui. Pour les circuits de plusieurs jours hors de la ville de départ, l'hébergement et les repas du chauffeur sont entièrement pris en charge par Mdina Tours dans le tarif convenu. Vous n'avez aucun frais d'hôtel à régler pour le chauffeur."
        }
    ];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : "Accueil",
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Private Driver" : "Chauffeur Privé",
                "item": `https://mdinatours.com/${language}/private-driver`
            }
        ]
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": isEn ? "Mdina Tours - Private Driver Morocco" : "Mdina Tours - Chauffeur Privé Maroc",
        "description": isEn
            ? "Book a professional private driver in Morocco with Mdina Tours. Comfort, safety, and reliability."
            : "Louez un véhicule avec chauffeur privé au Maroc avec Mdina Tours. Confort, sécurité, et fiabilité.",
        "image": "https://mdinatours.com/hero-landscape-1.webp",
        "telephone": "+212724114775",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rabat",
            "addressRegion": "Rabat-Salé-Kénitra",
            "addressCountry": "MA"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <Header lightBg={true} />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
                {/* Top Breadcrumb & Title */}
                <div className="breadcrumbs-title-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 20px 20px' }}>
                    <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '6px', fontSize: '0.65rem', color: '#666', marginBottom: '8px' }}>
                        <Link href={getPath('/')} style={{ color: '#666', transition: 'color 0.2s' }}>{t('home')}</Link>
                        <span style={{ color: '#ccc' }}>›</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textPrivate.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textPrivate.h1}
                    </h1>

                    {/* Ratings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '1.1rem' }}>
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500, textDecoration: 'underline' }}>
                            120 {isEn ? "reviews" : "avis"}
                        </span>
                    </div>

                    {/* Excellence Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ backgroundColor: '#fef3c7', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#d97706', fontSize: '0.8rem' }}>🏆</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>
                            {isEn ? "Badge of Excellence" : "Badge d'Excellence"}
                        </span>
                    </div>

                    {/* Operational Trust Badges Row */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.8rem', marginBottom: '14px' }}>
                        <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#EDF3EC', border: '1px solid #CDE1CC', padding: '5px 10px', borderRadius: '6px', color: '#255D28', fontWeight: 600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{isEn ? "Pay after each travel day · Cash or Card" : "Paiement en fin de journée · Espèces ou carte"}</span>
                        </div>
                        <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '5px 10px', borderRadius: '6px', color: '#334155', fontWeight: 500 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>{isEn ? "Professional licensed drivers" : "Chauffeurs professionnels agréés"}</span>
                        </div>
                    </div>
                </div>

                {/* Main Visual and Booking Section */}
                <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="grid-responsive-layout">
                        {/* Left Column: Gallery */}
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Morocco" title={textPrivate.h1} />
                            
                            <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Casablanca" defaultDays={1} />
                            </div>

                            <PrivateDriverMetaSection language={language} />
                        </div>

                        {/* Right Column: Sticky Booking Selector Box */}
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
                                <PrivateDriverBookingWidget language={language} defaultCity="Casablanca" defaultDays={1} />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <TransferWebRatings isEn={isEn} />
                    </div>
                </section>

                {/* 2. Trust Bar (500+ transfers, 4.9 rating, 0€ hidden fees) */}
                <PrivateDriverWhyChooseUs lang={language} topFill="var(--bg-color)" bottomFill="var(--bg-color)" />

                {/* 3. Our Private Driver Fleet */}
                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                {/* 4. What's Included in your Private Driver */}
                <PrivateDriverInclusions lang={language} />

                {/* 5. The Professional Driver Section */}
                <ProfessionalDriverSection lang={language} backgroundColor="var(--bg-color)" />

                {/* 6. FAQ Accordion */}
                <section className={faqStyles.faqSection} id="faq" style={{ backgroundColor: '#ffffff', padding: '70px 20px 80px 20px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Got Questions?" : "Des Questions ?"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px', fontFamily: "var(--font-poppins), sans-serif" }}>
                                {textPrivate.faqTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid rgba(0, 0, 0, 0.07)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                                }} className="faq-details">
                                    <summary style={{
                                        padding: '18px 22px',
                                        fontWeight: 700,
                                        fontSize: '1.02rem',
                                        color: 'var(--secondary)',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{faq.q}</span>
                                        <span style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 400 }}>+</span>
                                    </summary>
                                    <div style={{ padding: '0 22px 18px 22px', color: '#555', fontSize: '0.92rem', lineHeight: 1.65 }}>
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Final Bottom CTA */}
                <section style={{ padding: '60px 20px 70px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <ModernCTA 
                            text={textPrivate.finalCtaTitle}
                            subtext={textPrivate.finalCtaSubtitle}
                            buttonText={isEn ? "Inquire on WhatsApp" : "Réserver sur WhatsApp"}
                            actionType="whatsapp"
                            whatsappUrl={getWhatsAppUrl()}
                        />

                        {/* Discreet SEO Hub Links */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', backgroundColor: '#ffffff', padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontWeight: 600 }}>{isEn ? "Chauffeur Hubs:" : "Centres de Chauffeurs :"}</span>
                                <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'underline' }}>
                                    {isEn ? "Morocco (National)" : "Maroc (National)"}
                                </Link>
                                <span>·</span>
                                <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'underline' }}>
                                    {isEn ? "Marrakech" : "Marrakech"}
                                </Link>
                                <span>·</span>
                                <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'underline' }}>
                                    {isEn ? "Casablanca" : "Casablanca"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

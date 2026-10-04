import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { translations, Language } from '@/lib/translations';

import faqStyles from '@/components/FAQ.module.css';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import PrivateDriverHeroGallery from '@/components/PrivateDriverHeroGallery';
import PrivateDriverMetaSection from '@/components/PrivateDriverMetaSection';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import PrivateDriverInclusions from '@/components/PrivateDriverInclusions';
import ChauffeurDestinations from '@/components/ChauffeurDestinations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (lang === 'es') {
        return { title: 'Not Found - Mdina Tours' };
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
        notFound();
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
        howItWorksTitle: isEn ? "How the Private Driver Service Works" : "Comment fonctionne le service",
        step1Title: isEn ? "1. Select Vehicle & Start Point" : "1. Choisissez le véhicule et le point de départ",
        step1Desc: isEn ? "Choose your starting city (Casablanca, Marrakech, Rabat, Tangier, Fes) and pick a vehicle matching your group and luggage." : "Indiquez votre ville de départ (Casablanca, Marrakech, Rabat, Tanger, Fès) et sélectionnez le véhicule adapté à votre groupe.",
        step2Title: isEn ? "2. Define Duration & Route" : "2. Définissez la durée et l'itinéraire",
        step2Desc: isEn ? "Share your planned stops for a day trip or multi-day road trip so we can provide a complete, transparent quote upfront." : "Indiquez vos étapes pour une journée ou un circuit afin d'obtenir un devis clair et complet.",
        step3Title: isEn ? "3. Professional Driver Assigned" : "3. Votre chauffeur est affecté",
        step3Desc: isEn ? "We assign a licensed, English or French-speaking driver briefed on your planned schedule and route." : "Nous affectons un chauffeur agréé bilingue, briefé sur votre itinéraire et vos horaires.",
        step4Title: isEn ? "4. Travel with Complete Peace of Mind" : "4. Voyagez en toute sérénité",
        step4Desc: isEn ? "Enjoy your journey. Pay conveniently after each travel day in cash or card (EUR, USD, MAD)." : "Profitez de votre séjour. Réglez en fin de journée en espèces ou carte (EUR, USD, MAD).",
        vehiclesTitle: isEn ? "Our Vehicle Fleet" : "Notre flotte de véhicules",
        vehiclesSubtitle: isEn ? "Clean, air-conditioned passenger transport vehicles" : "Des véhicules récents, climatisés et parfaitement entretenus",
        useCasesTitle: isEn ? "Popular Itineraries & Day Trips" : "Exemples d'itinéraires et excursions",
        pricingTitle: isEn ? "Private Driver Pricing Guide" : "Grille tarifaire - Chauffeur Privé",
        pricingSubtitle: isEn ? "Transparent flat pricing with fuel, tolls, and operating expenses included. Pay after each travel day." : "Des tarifs transparents tout compris (carburant, péages et frais inclus). Paiement en fin de journée.",
        reviewsTitle: isEn ? "What Travelers Say About Our Service" : "Avis de nos voyageurs sur notre service",
        reviewsSubtitle: isEn ? "Verified reviews highlighting punctuality, safe driving, and local route expertise." : "Découvrez les avis de clients sur le professionnalisme et la ponctualité de nos chauffeurs.",
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

    const itineraries = [
        {
            title: isEn ? "Airport & Intercity Transfers" : "Transferts Aéroport & Interurbains",
            desc: isEn 
                ? "Rabat, Casablanca, Marrakech, Tangier, Fes — direct, comfortable journeys."
                : "Rabat, Casablanca, Marrakech, Tanger, Fès — liaisons directes et confortables.",
            price: isEn ? "From €45" : "À partir de 45 €",
            cta: isEn ? "View Transfers" : "Voir les transferts",
            image: "/img2/vito-aeroport.jpg",
            href: "/transfers",
        },
        {
            title: isEn ? "Imperial Cities Day Tour" : "Excursion Villes Impériales",
            desc: isEn 
                ? "Fes, Meknes, Volubilis — one private car, your own pace, flexible stops."
                : "Fès, Meknès, Volubilis — voiture privée, à votre rythme, arrêts libres.",
            price: isEn ? "From €180" : "À partir de 180 €",
            cta: isEn ? "View Tours" : "Voir les circuits",
            image: "/img2/fes_gate.jpg",
            href: "/tours",
        },
        {
            title: isEn ? "VIP & Corporate Travel" : "Voyages VIP & Affaires",
            desc: isEn 
                ? "Executive pickups, meetings, roadshows — well-presented driver, on time."
                : "Accueil VIP, réunions, roadshows — chauffeur ponctuel et discret.",
            price: isEn ? "Custom quote" : "Devis personnalisé",
            cta: isEn ? "Get a quote" : "Demander un devis",
            image: "/img2/premium-chauffeur.jpg",
            msg: "Hello Mdina Tours, I would like to get a quote for VIP & Corporate Travel."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our driver was waiting at arrivals with a clear name sign. Clean car, cold water, and smooth driving through Casablanca. <strong style={{ fontWeight: 800 }}>Punctual and professional.</strong></>
            ) : (
                <>Notre chauffeur nous attendait aux arrivées avec une pancarte claire. Voiture impeccable, eau fraîche et conduite fluide à Casablanca. <strong style={{ fontWeight: 800 }}>Ponctuel et professionnel.</strong></>
            ),
            author: "Sophie R.",
            flag: "🇫🇷"
        },
        {
            quote: isEn ? (
                <>Flight was delayed by 2 hours. I messaged on WhatsApp and they confirmed they were tracking the flight at no extra charge. <strong style={{ fontWeight: 800 }}>Excellent communication.</strong></>
            ) : (
                <>Vol retardé de 2 heures. J&apos;ai prévenu sur WhatsApp et ils ont suivi le vol sans aucun supplément. <strong style={{ fontWeight: 800 }}>Excellente communication.</strong></>
            ),
            author: "James K.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>Booked a full-day trip to Chefchaouen for 4 people. The driver drove carefully through the mountain roads and gave us great lunch recommendations. <strong style={{ fontWeight: 800 }}>A wonderful day.</strong></>
            ) : (
                <>Excursion d&apos;une journée à Chefchaouen pour 4 personnes. Conduite très sûre dans la montagne et excellents conseils de restaurants. <strong style={{ fontWeight: 800 }}>Très belle journée.</strong></>
            ),
            author: "Laila M.",
            flag: "🇩🇪"
        },
        {
            quote: isEn ? (
                <>Used the private driver for 3 days in Marrakech and Rabat for corporate meetings. <strong style={{ fontWeight: 800 }}>Punctual at every stop</strong>, pristine Mercedes Vito, and very polite driver.</>
            ) : (
                <>Chauffeur privé pendant 3 jours à Marrakech et Rabat pour des rendez-vous pro. <strong style={{ fontWeight: 800 }}>Ponctualité irréprochable</strong>, van Mercedes Vito propre et chauffeur discret.</>
            ),
            author: "David W.",
            flag: "🇺🇸"
        },
        {
            quote: isEn ? (
                <>Our driver took us through the Atlas Mountains. He was courteous, attentive, and <strong style={{ fontWeight: 800 }}>drove very safely on mountain passes</strong>. Clean and comfortable SUV.</>
            ) : (
                <>Trajet dans les montagnes de l&apos;Atlas. Chauffeur courtois, attentionné et <strong style={{ fontWeight: 800 }}>conduite très prudente sur les cols</strong>. SUV propre et confortable.</>
            ),
            author: "Elena P.",
            flag: "🇪🇸"
        },
        {
            quote: isEn ? (
                <>Having a driver on standby made our family vacation relaxing. The driver helped with luggage at each stop and accommodated our children&apos;s schedule. <strong style={{ fontWeight: 800 }}>Stress-free travel.</strong></>
            ) : (
                <>Voyage en famille très reposant. Le chauffeur nous a aidés avec les bagages et s&apos;est adapté à notre rythme. <strong style={{ fontWeight: 800 }}>Voyage sans stress.</strong></>
            ),
            author: "Marc-Antoine L.",
            flag: "🇨🇦"
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

                    {/* Compact Badges Row */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.825rem', marginBottom: '14px' }}>
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '5px 10px', borderRadius: '6px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700, color: '#1E293B' }}>4.9</span>
                            <span style={{ color: '#64748B', fontWeight: 500 }}>
                                {isEn ? "(120+ verified bookings)" : "(120+ réservations vérifiées)"}
                            </span>
                        </div>
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

                <PrivateDriverWhyChooseUs lang={language} />

                {/* Experience Video Section */}
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

                {/* Trust / Reviews Section */}
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
                                {/* First set */}
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
                                {/* Duplicate set for loop */}
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

                        {/* Badges / Accreditations */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap', opacity: 0.8 }}>
                            <img src="/img2/trustpilot-logo.webp" alt="Trustpilot" width={140} height={35} loading="lazy" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
                            <img src="/img2/TripAdvisor_Logo.svg" alt="TripAdvisor" width={150} height={35} loading="lazy" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>
                </section>

                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                <PrivateDriverInclusions lang={language} />

                {/* Use Cases / Itineraries (SEO Gold Section) */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Chauffeur dispo Routes" : "Trajets Chauffeur Dispo"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textPrivate.useCasesTitle}
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
                                                    width={380}
                                                    height={220}
                                                    loading="lazy"
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
                                                width={380}
                                                height={220}
                                                loading="lazy"
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

                {/* Features & FAQ Section */}
                <section className={faqStyles.faqSection} id="faq">

                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Got Questions?" : "Des Questions ?"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textPrivate.faqTitle}
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

                <ChauffeurDestinations lang={language} pageType="morocco" />

                {/* Bottom Internal Linking / Navigation Bar */}
                <section style={{ padding: '40px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: '#555', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', backgroundColor: '#fff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #eee' }}>
                                <span>👉 {isEn ? "Chauffeur Hubs:" : "Centres de Chauffeurs :"}</span>
                                <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Morocco (National)" : "Maroc (National)"}
                                </Link>
                                <span>|</span>
                                <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Marrakech Chauffeur" : "Chauffeur Marrakech"}
                                </Link>
                                <span>|</span>
                                <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Casablanca Chauffeur" : "Chauffeur Casablanca"}
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

import { getAlternates } from '@/lib/seo';
import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';
import { getImageProps } from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import TransferOtherRoutes from '@/components/transfers/TransferOtherRoutes';
import PrivateChauffeurManifesto from '@/components/PrivateChauffeurManifesto';
import TailoredTransportGallery from '@/components/TailoredTransportGallery';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import FAQ from '@/components/FAQ';
import DayTrips from '@/components/DayTrips';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Language } from '@/lib/translations';
import WhatTravelersSay from '@/components/WhatTravelersSay';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import VideoPlayer from '@/components/VideoPlayer';

// Below-the-fold & client components dynamically loaded to avoid critical render-blocking CSS/JS
const Destinations = dynamic(() => import('@/components/Destinations'));
const MdinaToursSection = dynamic(() => import('@/components/MdinaToursSection'));
const TourGrid = dynamic(() => import('@/components/TourGrid'));
const FloatingElements = dynamic(() => import('@/components/FloatingElements'));

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    let title = 'Mdina Tours | Morocco Private Driver, Airport Transfers & Chauffeur Services';
    let description = 'Reserve private driver services, reliable airport transfers, and custom multi-day private transportation across Morocco. Tailored around your itinerary with pay-after-each-day transparency.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Mdina Tours | Chauffeur Privé Maroc, Transferts Aéroport & Transport sur Mesure';
        description = 'Réservez votre chauffeur privé, transferts aéroport et transport sur plusieurs jours au Maroc. Organisé selon votre propre itinéraire avec paiement à la fin de chaque journée.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Mdina Tours | Conductor Privado en Marruecos, Traslados y Chófer Ejecutivo';
        description = 'Reserve conductor privado, traslados de aeropuerto y transporte personalizado de varios días en Marruecos. Adaptado a su propio itinerario con pago al final de cada jornada.';
        ogLocale = 'es_ES';
    }

    const url = lang === 'en' ? 'https://mdinatours.com/' : `https://mdinatours.com/${lang}`;

    return {
        title,
        description,
        alternates: getAlternates(lang),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-marrakech.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Mdina Tours Morocco Private Transportation',
                },
            ],
            locale: ogLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-marrakech.webp'],
        },
    };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const isEs = language === 'es';

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : (isEs ? "Berlina Premium" : "Berline Premium"),
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn
                ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings."
                : (isEs ? "Una berlina silenciosa y muy cómoda, ideal para traslados ejecutivos, parejas o viajes de trabajo." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples."),
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : (isEs ? "SUV Gran Confort" : "SUV Grand Confort"),
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn
                ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort."
                : (isEs ? "Un SUV espacioso con gran estabilidad en carretera y confort para rutas de montaña y familias." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas."),
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : (isEs ? "Van VIP" : "Van VIP"),
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn
                ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions."
                : (isEs ? "Monovolumen versátil y amplio. Excelente relación calidad-precio para viajes familiares y grupos reducidos." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille."),
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : (isEs ? "Minivan VIP" : "Minivan VIP"),
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn
                ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room."
                : (isEs ? "El estándar de referencia para viajar por Marruecos. Climatización individual y amplio maletero para equipaje." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages."),
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : (isEs ? "Minibús Prestige" : "Minibus Prestige"),
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn
                ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions."
                : (isEs ? "Minibús ejecutivo de gran capacidad, diseñado para grupos numerosos, delegaciones y familias grandes." : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes."),
            price: "€35",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const faqList = [
        {
            q: isEn 
                ? "Are all transportation services 100% private?" 
                : (isEs ? "¿Todos los traslados y servicios son 100% privados?" : "Les trajets et transferts sont-ils 100% privés ?"),
            a: isEn 
                ? "Yes, all our services are 100% private. Your vehicle and dedicated driver are reserved exclusively for your party with complete schedule flexibility."
                : (isEs ? "Sí, todos nuestros servicios son 100% privados. El vehículo y su conductor exclusivo están asignados únicamente a su grupo con total libertad de horarios." : "Oui, tous nos trajets sont 100% privés. Votre véhicule et votre chauffeur dédié sont réservés exclusivement pour votre groupe, avec une totale liberté d'horaires.")
        },
        {
            q: isEn 
                ? "Is my driver also a tour guide?" 
                : (isEs ? "¿El conductor es también guía turístico oficial?" : "Mon chauffeur est-il également guide touristique ?"),
            a: isEn 
                ? "Your driver's primary role is private transportation, safe driving, and road logistics. Drivers are happy to share practical local recommendations and suggest scenic stops along the way. If you wish to have a licensed official guide for historical monuments or medina walking tours, we can arrange one separately upon request."
                : (isEs ? "La función principal de su conductor es el transporte privado seguro y la logística en carretera. Su chófer le orientará con gusto con consejos locales prácticos y paradas recomendadas. Si desea un guía oficial autorizado para visitar monumentos históricos o médinas a pie, podemos coordinarlo por separado bajo petición." : "Le rôle premier de votre chauffeur est d'assurer un transport privé sûr et fluide. Les chauffeurs partagent volontiers leurs recommandations pratiques et conseils locaux. Si vous souhaitez un guide officiel agréé pour les visites historiques de monuments ou de médinas, nous pouvons le réserver séparément sur simple demande.")
        },
        {
            q: isEn 
                ? "How do airport, hotel, and medina riad pickups work?" 
                : (isEs ? "¿Cómo funcionan las recogidas en aeropuerto, hoteles y riads de la medina?" : "Comment se passent les prises en charge à l'aéroport, à l'hôtel ou dans les riads en médina ?"),
            a: isEn 
                ? "For airport arrivals, your driver greets you at the terminal exit with a name sign and live flight tracking. For hotels, pickup is directly at the entrance. For medina riads located in pedestrian zones, your driver coordinates the nearest vehicle-accessible point and assists you with your luggage."
                : (isEs ? "En el aeropuerto, su conductor le espera en la salida con un cartel con su nombre y seguimiento de vuelo en tiempo real. En hoteles, la recogida es en la puerta principal. En riads de la medina con calles peatonales, el conductor le deja en el punto accesible más cercano y le ayuda con el equipaje." : "À l'aéroport, votre chauffeur vous attend à la sortie avec une pancarte à votre nom et suit votre vol en direct. À l'hôtel, la prise en charge se fait au pied de l'établissement. Pour les riads situés dans des ruelles piétonnes, votre chauffeur vous dépose au point carrossable le plus proche et vous aide avec vos bagages.")
        },
        {
            q: isEn 
                ? "What is included in quoted transportation pricing?" 
                : (isEs ? "¿Qué incluye el precio acordado de transporte?" : "Qu'est-ce qui est inclus dans le tarif de transport convenu ?"),
            a: isEn 
                ? "All quoted rates include the dedicated vehicle, professional driver, fuel, highway tolls, parking fees, and driver expenses on multi-day journeys. There are zero hidden fees. Major route or itinerary changes requested during travel may adjust the quote."
                : (isEs ? "Todas nuestras tarifas acordadas incluyen el vehículo dedicado, conductor profesional, combustible, peajes de autopista, aparcamientos y gastos del conductor en rutas de varios días. Sin costes ocultos. Modificaciones importantes de ruta solicitadas sobre la marcha pueden ajustar el presupuesto." : "Tous nos tarifs incluent le véhicule dédié, le chauffeur professionnel, le carburant, les péages d'autoroute, les frais de parking et les frais de route du chauffeur pour les trajets multi-jours. Aucun frais caché. Des modifications majeures d'itinéraire en cours de voyage peuvent faire l'objet d'un ajustement.")
        },
        {
            q: isEn 
                ? "When and how do we pay for our journey?" 
                : (isEs ? "¿Cuándo y cómo se realiza el pago?" : "Quand et comment s'effectue le paiement ?"),
            a: isEn 
                ? "Payment is made after each travel day in cash or by card (EUR, USD, or MAD). No upfront deposit is required for standard private transfers and daily transportation."
                : (isEs ? "El pago se realiza al final de cada jornada de viaje en efectivo o con tarjeta (EUR, USD o MAD). No se requiere ningún depósito por adelantado para traslados estándar y servicios de transporte diario." : "Le paiement s'effectue après chaque journée de voyage, en espèces ou par carte (EUR, USD ou MAD). Aucun acompte n'est exigé à l'avance pour les transferts et journées de transport standards.")
        },
        {
            q: isEn 
                ? "Can we customize our route or make spontaneous stops?" 
                : (isEs ? "¿Podemos hacer paradas espontáneas o adaptar el ritmo durante el día?" : "Pouvons-nous faire des arrêts spontanés ou ajuster notre rythme en cours de route ?"),
            a: isEn 
                ? "Yes. Complete schedule flexibility is a core benefit of private transportation. You are free to ask your driver for coffee, lunch, comfort breaks, or scenic photo stops along the way at your own pace."
                : (isEs ? "Sí. La flexibilidad total es la gran ventaja del transporte privado. Puede solicitar a su conductor paradas para café, almuerzo, descanso o fotos en cualquier momento a su propio ritmo." : "Oui. La flexibilité est l'un des plus grands avantages du transport privé. Vous pouvez demander à votre chauffeur des pauses café, déjeuner, repos ou arrêts photos à tout moment selon vos envies.")
        }
    ];

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : (isEs ? "Inicio" : "Accueil"),
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            }
        ]
    };

    // Server-side preload for LCP Hero image (avoids waiting for Client Component hydration)
    const commonProps = { alt: 'Mdina Tours Morocco', fill: true, sizes: '100vw', priority: true };
    const { props: { srcSet: desktopSrcSet, ...restDesktop } } = getImageProps({ ...commonProps, src: "/img/Morocco-trip-tour-hero01.webp" });
    const { props: { srcSet: mobileSrcSet, ...restMobile } } = getImageProps({ ...commonProps, src: "/img/private-driver-morocco-hero01.webp" });

    ReactDOM.preload(restDesktop.src as string, {
        as: 'image',
        imageSrcSet: desktopSrcSet,
        imageSizes: commonProps.sizes,
        fetchPriority: 'high',
        media: '(min-width: 769px)',
    });
    ReactDOM.preload(restMobile.src as string, {
        as: 'image',
        imageSrcSet: mobileSrcSet,
        imageSizes: commonProps.sizes,
        fetchPriority: 'high',
        media: '(max-width: 768px)',
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main>
                {/* 1. Hero with instant search/quote */}
                <Hero />

                {/* 2. Morocco's Benchmark for Private Travel (Trust & Reassurance) */}
                <Features lang={language} />

                {/* 3. Why Choose MdinaTours? (Reassurance Stats) */}
                <PrivateDriverWhyChooseUs lang={language} topFill="#ffffff" bottomFill="#ffffff" />

                {/* 4. What Riding With Us Feels Like (Real Transport Experience Video) */}
                <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ 
                            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                            fontWeight: 700, 
                            color: 'var(--secondary)', 
                            marginBottom: '30px',
                            fontFamily: 'var(--font-poppins), sans-serif'
                        }}>
                            {isEn ? "What riding with us feels like" : (isEs ? "La experiencia a bordo" : "L'expérience à bord avec nous")}
                        </h2>
                        
                        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                            <VideoPlayer 
                                src="/img/tours-mdina-tours-morocco.mp4" 
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
                            {isEn ? "Real roads, well-maintained vehicles, and experienced local drivers." : (isEs ? "Vehículos cuidados y conductores locales con experiencia." : "Véhicules soignés et chauffeurs locaux expérimentés.")}
                        </p>
                    </div>
                </section>

                {/* 5. Private Chauffeur Editorial Philosophy (Luxury Statement & Hallmarks) */}
                <PrivateChauffeurManifesto lang={language} />

                {/* 6. Tailored Transport (Bespoke Photographic Chauffeur Modes Grid) */}
                <TailoredTransportGallery lang={language} />

                {/* 7. How MdinaTours Works (4-Step Process & Clarity Block) */}
                <HowItWorks lang={language} />

                {/* 8. Private Transportation Services Across Morocco (4 Core Services) */}
                <Services lang={language} />

                {/* 9. Our Private Driver Fleet */}
                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                {/* 10. Popular Private Transfer Routes */}
                <TransferOtherRoutes language={language} />

                {/* 11. Popular Tours & Experiences */}
                <TourGrid />
                <DayTrips lang={language} />

                {/* 12. Social Proof & Reviews */}
                <WhatTravelersSay lang={language} />

                {/* 13. FAQ */}
                <FAQ lang={language} />

                {/* 14. Destination Inspiration & Brand Narrative */}
                <Destinations lang={language} />
                <MdinaToursSection lang={language} />
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

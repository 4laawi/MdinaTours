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
        ? 'Chauffeur Dispo Morocco – Premium Chauffeur Disposition | Mdina Tours' 
        : 'Chauffeur Dispo Maroc – Service Chauffeur à la Disposition | Mdina Tours';
    const description = isEn
        ? 'Hire a private dispo chauffeur in Morocco. Premium vans, SUVs, and sedans with English-speaking local drivers at your full disposition for custom travel and business.'
        : 'Louez un véhicule avec chauffeur dispo au Maroc. Chauffeurs bilingues professionnels à votre disposition pour vos rendez-vous d\'affaires, circuits et excursions sur mesure.';
    const url = `https://mdinatours.com/${lang}/chauffeur-dispo-morocco`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/chauffeur-dispo-morocco',
                'fr': 'https://mdinatours.com/fr/chauffeur-dispo-morocco',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/img/Morocco-trip-tour-hero04.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Chauffeur Dispo Morocco Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/img/Morocco-trip-tour-hero04.webp'],
        },
    };
}

export default async function ChauffeurDispoMoroccoPage({ params }: { params: Promise<{ lang: string }> }) {
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

    const textDispo = {
        h1: isEn ? "Chauffeur Dispo in Morocco – Premium Chauffeur Disposition" : "Chauffeur Dispo au Maroc – Service Chauffeur à la Disposition",
        subtitle: isEn 
            ? "Rent a vehicle with a professional driver at your complete disposition (dispo) across Morocco. Ultimate itinerary freedom, executive standards, clear daily rates."
            : "Louez un véhicule avec chauffeur professionnel bilingue à votre disposition (« dispo chauffeur ») au Maroc. Liberté d'itinéraire, standards VIP, tarifs fixes.",
        bannerLabel: isEn ? "Chauffeur Dispo" : "Chauffeur Dispo Maroc",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a Chauffeur Dispo service in Morocco."
            : "Bonjour Mdina Tours, je souhaite réserver un service Chauffeur Dispo au Maroc.",
        introTitle: isEn ? "What is a Chauffeur Dispo Service in Morocco?" : "Qu'est-ce que le service de Chauffeur Dispo au Maroc ?",
        introP1: isEn
            ? "In Morocco, the term \"Dispo Chauffeur\" (or Chauffeur Disposition) refers to a premium private mobility service where a vehicle and licensed local driver are hired by the hour or day, remaining on standby exclusively for you. Unlike standard airport transfers or fixed point-to-point tours, there are no rigid routes. The driver is at your disposal, waiting at your hotel, business meeting, or restaurant to take you to your next stop instantly."
            : "Au Maroc, l'expression « Dispo Chauffeur » (ou Chauffeur à la disposition) désigne une formule de location de véhicule avec chauffeur à l'heure ou à la journée. Contrairement aux transferts classiques ou aux circuits guidés figés, il n'y a pas d'itinéraire prédéterminé. Le chauffeur reste à votre disposition, vous attend lors de vos réunions, repas ou visites et vous emmène là où vous le souhaitez sur simple demande.",
        introP2: isEn
            ? "This service is highly favored by business executives, international corporate delegations, families traveling with children, and independent tourists seeking ultimate itinerary flexibility. With Mdina Tours, our dispo network covers all major Moroccan cities. You get a clean, air-conditioned executive sedan, SUV, or minivan along with a bilingual, professional driver who knows how to navigate local traffic."
            : "Ce service est très apprécié par les hommes d'affaires, les délégations professionnelles, les familles voyageant avec des enfants et les touristes indépendants recherchant une flexibilité absolue. Chez Mdina Tours, notre réseau dispo couvre toutes les grandes villes : Casablanca, Rabat, Marrakech, Tanger et Fès. Nous mettons à votre disposition des berlines de prestige, des SUV et des vans récents, conduits par des chauffeurs bilingues.",
        howItWorksTitle: isEn ? "How Chauffeur Disposition Works" : "Comment fonctionne la disposition de chauffeur",
        step1Title: isEn ? "1. Select Vehicle & Start Point" : "1. Choisissez le véhicule et le point de départ",
        step1Desc: isEn ? "Choose your starting city (Casablanca, Marrakech, Rabat, Tangier) and pick a vehicle matching your group and luggage." : "Indiquez votre ville de départ (Casablanca, Marrakech, Rabat, Tanger) et sélectionnez le véhicule adapté à votre groupe.",
        step2Title: isEn ? "2. Define Duration & Schedule" : "2. Définissez la durée et le planning",
        step2Desc: isEn ? "Determine if you need the dispo chauffeur for a few hours, a full day, or a multi-day road trip across different regions." : "Déterminez si vous avez besoin d'un chauffeur dispo pour quelques heures, une journée entière ou un circuit sur plusieurs jours.",
        step3Title: isEn ? "3. Professional Chauffeur Briefed" : "3. Votre chauffeur est briefé",
        step3Desc: isEn ? "We assign a licensed, English-speaking driver who is fully briefed on your scheduled meetings or tourist route." : "Nous affectons un chauffeur agréé bilingue, briefé en détail sur vos lieux de réunion ou votre itinéraire touristique.",
        step4Title: isEn ? "4. Travel with Complete Peace of Mind" : "4. Voyagez en toute sérénité",
        step4Desc: isEn ? "Enjoy your travel. Your driver remains nearby and coordinates with your schedule via WhatsApp or phone call." : "Profitez de votre séjour. Votre chauffeur reste à proximité immédiate et se coordonne avec vous via WhatsApp ou téléphone.",
        vehiclesTitle: isEn ? "Our Premium Dispo Fleet" : "Notre flotte de véhicules dispo",
        vehiclesSubtitle: isEn ? "Clean, executive vehicles for business and premium tourism dispo" : "Des véhicules récents de standing pour les voyages d'affaires et le tourisme VIP",
        useCasesTitle: isEn ? "Popular Chauffeur Dispo Use Cases & Itineraries" : "Exemples d'itinéraires et cas d'usage dispo",
        pricingTitle: isEn ? "Chauffeur Dispo Pricing Guide" : "Grille tarifaire - Chauffeur Dispo",
        pricingSubtitle: isEn ? "Transparent flat-rate dispo pricing with no hidden charges. Book now, pay cash directly to the driver." : "Des tarifs transparents tout compris. Réservez aujourd'hui et payez en espèces directement au chauffeur.",
        reviewsTitle: isEn ? "What Travelers Say About Our Dispo Chauffeurs" : "Avis de nos voyageurs sur notre service dispo",
        reviewsSubtitle: isEn ? "Verified reviews highlighting flexibility, reliability, and local driver expertise." : "Découvrez les avis de clients sur le professionnalisme et la flexibilité de nos chauffeurs.",
        finalCtaTitle: isEn ? "Book Your Dispo Chauffeur in Morocco" : "Réservez votre Chauffeur Dispo au Maroc",
        finalCtaSubtitle: isEn ? "Ready to hire a vehicle with a standby driver for your business meeting or custom tour? Chat with us on WhatsApp for a quick booking!" : "Prêt à réserver un véhicule avec chauffeur en attente pour vos réunions ou votre circuit ? Écrivez-nous sur WhatsApp pour réserver !",
        faqTitle: isEn ? "Chauffeur Dispo Morocco FAQs" : "Questions Fréquentes - Chauffeur Dispo au Maroc",
        inclusionTitle: isEn ? "Dispo Inclusions & Exclusions" : "Ce qui est inclus et exclu dans la formule Dispo",
        inclusionDesc: isEn 
            ? "To ensure complete transparency, here is a detailed breakdown of exactly what is included in our daily flat dispo rates and what is excluded:"
            : "Afin de garantir une transparence totale, voici le détail précis de ce qui est inclus et exclu dans nos tarifs de disposition journalière :"
    };

    const vehicles = [
        {
            name: isEn ? "Skoda Superb" : "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€80",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: isEn ? "Skoda Kodiaq" : "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€100",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: isEn ? "Fiat Scudo" : "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€120",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: isEn ? "Mercedes Vito" : "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€140",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: isEn ? "Mercedes Sprinter" : "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions." : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes.",
            price: "€200",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const itineraries = [
        {
            title: isEn ? "Airport & City Transfers" : "Transferts Aéroport & Ville",
            desc: isEn 
                ? "Rabat, Casablanca, Marrakech — we get you there without the stress."
                : "Rabat, Casablanca, Marrakech — voyagez l'esprit tranquille.",
            price: isEn ? "From €65" : "À partir de 65 €",
            cta: isEn ? "View Transfers" : "Voir les transferts",
            image: "/img2/vito-aeroport.jpg",
            href: "/transfers",
        },
        {
            title: isEn ? "Imperial Cities Day Tour" : "Excursion Villes Impériales",
            desc: isEn 
                ? "Fes, Meknes, Volubilis — one private car, your own pace, no group rush."
                : "Fès, Meknès, Volubilis — voiture privée, à votre rythme, sans la cohue.",
            price: isEn ? "From €180" : "À partir de 180 €",
            cta: isEn ? "View Tours" : "Voir les circuits",
            image: "/img2/fes_gate.jpg",
            href: "/tours",
        },
        {
            title: isEn ? "VIP & Corporate Travel" : "Voyages VIP & Affaires",
            desc: isEn 
                ? "Executive pickups, event transfers, roadshows — suited chauffeur, on time."
                : "Accueil VIP, transferts d'événements, roadshows — chauffeur en costume, à l'heure.",
            price: isEn ? "Custom quote" : "Devis personnalisé",
            cta: isEn ? "Get a quote" : "Demander un devis",
            image: "/img2/premium-chauffeur.jpg",
            msg: "Hello Mdina Tours, I would like to get a quote for VIP & Corporate Travel."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our driver was waiting at arrivals with a sign before we even cleared customs. Spotless car, cold water, and he knew every shortcut in Casablanca. <strong style={{ fontWeight: 800 }}>Absolutely seamless.</strong></>
            ) : (
                <>Notre chauffeur nous attendait aux arrivées avec une pancarte avant même notre passage en douane. Voiture impeccable, eau fraîche et il connaissait tous les raccourcis à Casablanca. <strong style={{ fontWeight: 800 }}>Absolument parfait.</strong></>
            ),
            author: "Sophie R.",
            flag: "🇫🇷"
        },
        {
            quote: isEn ? (
                <>Flight was delayed by 2 hours. I messaged on WhatsApp and they just said &apos;no problem, we&apos;re tracking your flight.&apos; No extra charge. <strong style={{ fontWeight: 800 }}>That kind of service is rare anywhere.</strong></>
            ) : (
                <>Vol retardé de 2 heures. J&apos;ai envoyé un message sur WhatsApp et ils ont simplement répondu &apos;pas de problème, nous suivons votre vol.&apos; Sans frais supplémentaires. <strong style={{ fontWeight: 800 }}>Ce genre de service est rare.</strong></>
            ),
            author: "James K.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>Booked a full-day tour to Chefchaouen for 4 people. The driver was a <strong style={{ fontWeight: 800 }}>genuine local expert</strong> — not just a driver. Best day of our trip.</>
            ) : (
                <>Réservation d&apos;une excursion d&apos;une journée à Chefchaouen pour 4 personnes. Le chauffeur était un <strong style={{ fontWeight: 800 }}>véritable expert local</strong> — pas seulement un conducteur. Le meilleur jour de notre voyage.</>
            ),
            author: "Laila M.",
            flag: "🇩🇪"
        },
        {
            quote: isEn ? (
                <>We used the dispo service for 3 days in Marrakech and Rabat for our business meetings. <strong style={{ fontWeight: 800 }}>Impeccable timing</strong>, extremely professional driver who helped us coordinate schedules, and a pristine Mercedes Vito.</>
            ) : (
                <>Nous avons utilisé le service dispo pendant 3 jours à Marrakech et Rabat pour nos réunions d&apos;affaires. <strong style={{ fontWeight: 800 }}>Timing impeccable</strong>, chauffeur extrêmement professionnel et van Mercedes Vito impeccable.</>
            ),
            author: "David W.",
            flag: "🇺🇸"
        },
        {
            quote: isEn ? (
                <>Perfect service from start to finish! Our driver took us to the Atlas Mountains and back. He was polite, attentive, and <strong style={{ fontWeight: 800 }}>drove very safely</strong>. The luxury SUV was clean and spacious.</>
            ) : (
                <>Service parfait de bout en bout ! Notre chauffeur nous a conduits dans les montagnes de l&apos;Atlas. Poli, attentionné et <strong style={{ fontWeight: 800 }}>conduite très sûre</strong>. Le SUV de luxe était propre et spacieux.</>
            ),
            author: "Elena P.",
            flag: "🇪🇸"
        },
        {
            quote: isEn ? (
                <>Having a driver on standby made our family vacation <strong style={{ fontWeight: 800 }}>so relaxing</strong>. No waiting for taxis, no getting lost. Our driver was incredibly patient with the kids.</>
            ) : (
                <>Avoir un chauffeur à disposition a rendu nos vacances en famille <strong style={{ fontWeight: 800 }}>tellement reposantes</strong>. Pas d&apos;attente pour les taxis, pas de risque de se perdre. Chauffeur très patient.</>
            ),
            author: "Marc-Antoine L.",
            flag: "🇨🇦"
        }
    ];

    const faqs = [
        {
            q: isEn ? "What does \"dispo chauffeur\" mean?" : "Que signifie l'expression « dispo chauffeur » ?",
            a: isEn 
                ? "It means the vehicle and professional driver are placed at your complete disposal (dispo) for a designated duration (hours or days). There is no fixed itinerary; the driver stays standby nearby, ready to drive you wherever you request."
                : "Cela signifie que le véhicule et le chauffeur professionnel sont mis à votre entière disposition (« dispo ») pour une durée convenue. Il n'y a pas d'itinéraire fixe : le chauffeur vous attend et vous emmène là où vous le demandez."
        },
        {
            q: isEn ? "How does billing work for dispo chauffeur service?" : "Comment fonctionne la facturation du service dispo ?",
            a: isEn
                ? "We bill based on a transparent flat daily rate (covering up to 8-10 hours of service and standard mileage). Fuel, highway tolls, and parking costs are fully included. There are no hidden fees or extra surcharges."
                : "Nous appliquons un tarif journalier fixe et transparent (couvrant 8 à 10 heures de service et un kilométrage standard). Le carburant, les péages et les parkings sont entièrement inclus. Pas de mauvaise surprise."
        },
        {
            q: isEn ? "Can I book a dispo chauffeur for intercity travel?" : "Puis-je louer un chauffeur dispo pour voyager entre plusieurs villes ?",
            a: isEn
                ? "Yes. Our dispo chauffeur service covers travel between all major Moroccan cities. The driver stays with you throughout the journey, including overnight stops."
                : "Oui, tout à fait. Notre service de chauffeur dispo couvre les déplacements entre toutes les grandes villes du Maroc. Le chauffeur reste à vos côtés tout au long du trajet, y compris pour les étapes avec nuitée."
        },
        {
            q: isEn ? "Do drivers speak English and French?" : "Les chauffeurs parlent-ils français et anglais ?",
            a: isEn
                ? "Yes. All our designated dispo drivers speak fluent English and French. They are bilingually trained and highly experienced in corporate and tourist transport."
                : "Oui, tous nos chauffeurs affectés à la disposition parlent couramment français et anglais. Ils ont une solide expérience avec la clientèle corporate et touristique internationale."
        },
        {
            q: isEn ? "Is the driver's accommodation included in multi-day dispo bookings?" : "Le logement du chauffeur est-il inclus dans les réservations dispo sur plusieurs jours ?",
            a: isEn
                ? "Yes. For multi-day bookings where the driver must stay overnight outside their home base, the driver's accommodation and meal fees are fully covered in our flat rate."
                : "Oui. Pour les prestations sur plusieurs jours hors de la ville de départ, les frais de repas et d'hébergement du chauffeur sont entièrement pris en charge dans notre forfait."
        },
        {
            q: isEn ? "What is the daily mileage limit for dispo bookings?" : "Quelle est la limite de kilométrage journalière pour une disposition ?",
            a: isEn
                ? "A standard daily dispo includes up to 200-250 km of driving, which is perfect for city tours and local meetings. For long-distance road trips, we adjust the daily rate slightly to cover the extra fuel and tolls."
                : "Une disposition journalière classique comprend jusqu'à 200-250 km, ce qui est amplement suffisant pour les rendez-vous ou visites locales. Pour les longs trajets, nous ajustons le tarif pour couvrir le carburant supplémentaire."
        }
    ];

    // JSON-LD Schemas
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "Premium Chauffeur Dispo Morocco" : "Service Chauffeur Dispo Premium Maroc",
        "description": textDispo.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/img/Morocco-trip-tour-hero04.webp",
            "telephone": "+212766816992",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Morocco"
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
                {/* Top Breadcrumb & Title */}
                <div className="breadcrumbs-title-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 20px 20px' }}>
                    <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                        <Link href={getPath('/')} style={{ color: '#666', transition: 'color 0.2s' }}>{t('home')}</Link>
                        <span style={{ color: '#ccc' }}>›</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textDispo.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textDispo.h1}
                    </h1>

                    {/* Ratings, Badge & Guarantee row */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                        {/* Rating Pill */}
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700 }}>5.0</span>
                            <span style={{ color: '#717171', fontWeight: 500 }}>(45 {isEn ? "reviews" : "avis"})</span>
                        </div>

                        {/* Recommended Pill */}
                        <div className="recommended-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            <span>{isEn ? "Recommended by 98% of travelers" : "Recommandé par 98% des voyageurs"}</span>
                        </div>

                        {/* Excellence Pill */}
                        <div className="excellence-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>🏆</span>
                            <span>{isEn ? "Badge of Excellence" : "Badge d'Excellence"}</span>
                        </div>

                        {/* Guarantee Pill */}
                        <div className="guarantee-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#64748b', fontWeight: 'bold' }}>🏷️</span>
                            <span>{isEn ? "Lowest Price Guarantee" : "Meilleur prix garanti"}</span>
                        </div>
                    </div>

                </div>

                {/* Main Visual and Booking Section */}
                <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                    <div style={{ display: 'grid', gap: '30px' }} className="grid-responsive-layout">
                        {/* Left Column: Gallery */}
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Dispo" title={textDispo.h1} />
                            
                            <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Morocco" defaultDays={1} />
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
                            maxWidth: '100%',
                            width: '100%',
                            height: 'fit-content',
                            zIndex: 10
                        }} className="booking-widget-sticky-wrapper">
                            <div className="desktop-booking-widget">
                                <PrivateDriverBookingWidget language={language} defaultCity="Morocco" defaultDays={1} />
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
                            <img src="/img2/trustpilot-logo.webp" alt="Trustpilot" style={{ height: '35px', objectFit: 'contain' }} />
                            <img src="/img2/TripAdvisor_Logo.svg" alt="TripAdvisor" style={{ height: '35px', objectFit: 'contain' }} />
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
                                {textDispo.useCasesTitle}
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

                {/* Features & FAQ Section */}
                <section className={faqStyles.faqSection} id="faq">

                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Got Questions?" : "Des Questions ?"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textDispo.faqTitle}
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
                                <span>👉 {isEn ? "Chauffeur Services:" : "Services de Chauffeur :"}</span>
                                <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Morocco (National Pillar)" : "Maroc (Piler National)"}
                                </Link>
                                <span>|</span>
                                <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Marrakech dispo" : "Marrakech dispo"}
                                </Link>
                                <span>|</span>
                                <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Casablanca dispo" : "Casablanca dispo"}
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

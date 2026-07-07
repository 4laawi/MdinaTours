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
        ? 'Private Driver Casablanca – Professional Chauffeur Service | Mdina Tours' 
        : 'Chauffeur Privé Casablanca – Voiture avec Chauffeur au Maroc | Mdina Tours';
    const description = isEn
        ? 'Book a professional private driver in Casablanca. Premium sedans, minivans, and SUVs with English-speaking local chauffeurs (Dispo Chauffeur) for business, airport, and custom tours.'
        : 'Louez un véhicule avec chauffeur privé à Casablanca. Chauffeurs professionnels bilingues (Disposition Chauffeur) pour vos réunions d\'affaires, transferts aéroport et excursions.';
    const url = `https://mdinatours.com/${lang}/private-driver-casablanca`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/private-driver-casablanca',
                'fr': 'https://mdinatours.com/fr/private-driver-casablanca',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/img2/casablanca_MOSQUE.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Private Driver Casablanca Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/img2/casablanca_MOSQUE.webp'],
        },
    };
}

export default async function PrivateDriverCasablancaPage({ params }: { params: Promise<{ lang: string }> }) {
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

    const textCasablanca = {
        h1: isEn ? "Private Driver in Casablanca – Professional Chauffeur Service" : "Chauffeur Privé à Casablanca – Service de Chauffeur de Disposition",
        subtitle: isEn 
            ? "Explore Morocco's economic hub, travel to Rabat, or embark on a multi-day tour with a professional English-speaking driver at your dispo. Comfortable luxury, clear pricing."
            : "Explorez le centre économique du Maroc, rendez-vous à Rabat ou entamez un circuit multi-jours avec un chauffeur privé bilingue à disposition. Confort premium et tarifs clairs.",
        bannerLabel: isEn ? "Casablanca Driver" : "Chauffeur Casablanca",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver service in Casablanca."
            : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé à Casablanca.",
        introTitle: isEn ? "Premium Casablanca Chauffeur & Dispo Service" : "Service de Chauffeur Privé & Disposition Premium à Casablanca",
        introP1: isEn
            ? "For travelers visiting Casablanca, navigating Morocco's largest city for business or leisure can be challenging. Our professional private driver dispo service (locally called \"Dispo Chauffeur\") offers a stress-free alternative. Instead of negotiating with unreliable local taxis or navigating busy traffic, you get a premium vehicle and a dedicated chauffeur on standby for as long as you need."
            : "Pour les voyageurs de passage à Casablanca, se déplacer dans la plus grande métropole du Maroc pour les affaires ou les loisirs peut s'avérer complexe. Notre service de chauffeur privé à disposition (« Dispo Chauffeur ») est la solution idéale. Oubliez le stress des négociations de taxis ou de la conduite dans les embouteillages : vous disposez d'un véhicule récent et d'un chauffeur dédié en attente.",
        introP2: isEn
            ? "Your driver will meet you directly at Casablanca Mohammed V Airport (CMN), your hotel, or office, and remain at your disposal. This is perfect for business meetings across different corporate zones (like Sidi Maarouf or Marina), shopping trips, or custom tours linking Casablanca with Rabat, Fes, Marrakech, and the northern city of Chefchaouen."
            : "Votre chauffeur vous accueille à l'aéroport Mohammed V (CMN), à votre hôtel ou à vos bureaux, et reste à votre entière disposition. Cette formule est parfaite pour enchaîner des rendez-vous professionnels (Sidi Maarouf, Marina), faire du shopping ou réaliser un circuit touristique sur mesure reliant Casablanca à Rabat, Fès, Marrakech ou Chefchaouen.",
        howItWorksTitle: isEn ? "How Chauffeur Disposition Works" : "Comment fonctionne la disposition de chauffeur",
        step1Title: isEn ? "1. Select Vehicle & Start Point" : "1. Choisissez le véhicule et le point de départ",
        step1Desc: isEn ? "Select your pickup location in Casablanca (CMN airport, hotel, or office) and choose the appropriate vehicle tier." : "Indiquez votre lieu de prise en charge à Casablanca (aéroport CMN, hôtel, bureaux) et choisissez la catégorie de véhicule.",
        step2Title: isEn ? "2. Plan Your Flexible Route" : "2. Planifiez votre itinéraire flexible",
        step2Desc: isEn ? "Tell us your schedule, meeting locations, or custom travel plans between Casablanca and other imperial cities." : "Partagez votre planning, vos lieux de réunion ou votre itinéraire sur mesure entre Casablanca et les autres villes impériales.",
        step3Title: isEn ? "3. Professional Driver Assigned" : "3. Votre chauffeur vous est attribué",
        step3Desc: isEn ? "A highly professional, licensed local chauffeur is assigned to your trip, ensuring fluent communication and punctual arrival." : "Un chauffeur local professionnel agréé vous est attribué, vous garantissant une excellente communication et une ponctualité parfaite.",
        step4Title: isEn ? "4. Travel with Complete Freedom" : "4. Voyagez en toute liberté",
        step4Desc: isEn ? "Your vehicle and driver are fully dedicated to your schedule, waiting for you at each stop with zero delay." : "Votre véhicule et votre chauffeur sont totalement dédiés à votre planning, vous attendant à chaque arrêt pour repartir sans attendre.",
        vehiclesTitle: isEn ? "Our Casablanca Fleet" : "Notre flotte de véhicules à Casablanca",
        vehiclesSubtitle: isEn ? "Executive sedans, spacious minivans, and robust SUVs" : "Berlines exécutives, minivans spacieux et SUV robustes",
        useCasesTitle: isEn ? "Popular Casablanca Driver Use Cases & Itineraries" : "Exemples d'itinéraires et cas d'usage à Casablanca",
        pricingTitle: isEn ? "Casablanca Chauffeur Pricing Guide" : "Grille tarifaire - Chauffeur à Casablanca",
        pricingSubtitle: isEn ? "Transparent flat-rate dispo pricing with no hidden charges. Book now, pay cash directly to the driver." : "Des tarifs transparents tout compris. Réservez aujourd'hui et payez en espèces directement au chauffeur.",
        reviewsTitle: isEn ? "What Travelers Say About Our Casablanca Chauffeurs" : "Avis de nos voyageurs sur notre service à Casablanca",
        reviewsSubtitle: isEn ? "Verified feedback from leisure and corporate travelers who booked our Casablanca driver dispo." : "Découvrez les avis clients ayant fait appel à notre service dispo chauffeur à Casablanca.",
        finalCtaTitle: isEn ? "Secure Your Casablanca Private Driver" : "Réservez votre Chauffeur Privé à Casablanca",
        finalCtaSubtitle: isEn ? "Need a professional chauffeur for business meetings, airport pickups, or a custom road trip? Message us on WhatsApp for an instant quote!" : "Besoin d'un chauffeur professionnel pour vos réunions, transferts aéroport ou un circuit sur mesure ? Écrivez-nous sur WhatsApp pour un devis instantané !",
        faqTitle: isEn ? "Casablanca Private Driver FAQs" : "Questions Fréquentes - Chauffeur à Casablanca"
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
            q: isEn ? "What is a private driver (\"dispo chauffeur\") in Casablanca?" : "Qu'est-ce qu'un service de chauffeur privé (« dispo chauffeur ») à Casablanca ?",
            a: isEn 
                ? "A dispo chauffeur is a vehicle hired with a professional driver at your full disposal. There is no fixed route. The driver remains standby at your location, ready to take you to meetings, tourist sights, or transfer you to other cities."
                : "La formule « dispo chauffeur » désigne la location d'un véhicule avec chauffeur à votre entière disposition. Il n'y a pas d'itinéraire fixe : le chauffeur vous attend et vous emmène là où vous le souhaitez pour vos réunions, visites ou déplacements."
        },
        {
            q: isEn ? "How can I book a driver for meetings starting from Casablanca Airport (CMN)?" : "Comment réserver un chauffeur pour des rendez-vous au départ de l'Aéroport de Casablanca (CMN) ?",
            a: isEn
                ? "You can easily book online or via WhatsApp. Provide your flight details, and your driver will monitor the flight, greet you inside the arrivals hall with a sign, and immediately start your dispo schedule."
                : "Vous pouvez réserver facilement en ligne ou via WhatsApp. Indiquez vos coordonnées de vol : votre chauffeur suivra l'atterrissage en temps réel, vous accueillera dans le hall avec une pancarte et débutera la mise à disposition."
        },
        {
            q: isEn ? "Can I travel from Casablanca to other cities like Rabat or Marrakech?" : "Puis-je voyager de Casablanca vers d'autres villes comme Rabat ou Marrakech ?",
            a: isEn
                ? "Yes, you can easily travel between cities. Our dispo rates cover intercity travel. Your driver will drive you along the modern expressways, handle tolls, and wait for you in the destination city."
                : "Oui, tout à fait. Nos tarifs de disposition couvrent les trajets interurbains. Votre chauffeur vous conduit par l'autoroute, prend en charge les péages et reste disponible sur votre lieu de destination."
        },
        {
            q: isEn ? "Are fuel and highway tolls included in the price?" : "Le carburant et les péages autoroutiers sont-ils inclus dans le prix ?",
            a: isEn
                ? "Yes. All daily rates include fuel, highway tolls, parking costs, and the driver's fees. There are no hidden or surprise surcharges."
                : "Oui. Tous nos tarifs journaliers incluent le carburant, les péages d'autoroute, les frais de parking et la rémunération du chauffeur. Aucun frais caché."
        },
        {
            q: isEn ? "Do your Casablanca drivers speak English?" : "Les chauffeurs à Casablanca parlent-ils anglais ?",
            a: isEn
                ? "Yes, our drivers speak fluent English and French. They are professional, discreet, and experienced in hosting international tourists and corporate clients."
                : "Oui, nos chauffeurs parlent couramment anglais et français. Ils sont professionnels, discrets et habitués à accompagner une clientèle d'affaires et touristique internationale."
        },
        {
            q: isEn ? "Can I book a driver for multiple days?" : "Puis-je louer un chauffeur pour plusieurs jours ?",
            a: isEn
                ? "Absolutely. We offer competitive multi-day packages. For multi-day trips outside Casablanca, the price includes the driver's accommodation and meals."
                : "Absolument. Nous proposons des forfaits dégressifs pour plusieurs jours. Pour les déplacements hors de Casablanca sur plusieurs jours, les frais de repas et de logement du chauffeur sont inclus."
        },
        {
            q: isEn ? "Do you offer child safety seats?" : "Proposez-vous des sièges auto pour enfants ?",
            a: isEn
                ? "Yes, clean baby or booster safety seats are available free of charge. Please mention your request and child's age during the booking process."
                : "Oui, des sièges bébé et rehausseurs propres sont fournis gratuitement sur simple demande lors de votre réservation."
        },
        {
            q: isEn ? "What is the cancellation policy for dispo chauffeur bookings?" : "Quelle est la politique d'annulation pour les réservations de chauffeur à disposition ?",
            a: isEn
                ? "You can cancel your booking free of charge up to 48 hours before the scheduled pickup. No upfront deposit is required for standard bookings."
                : "L'annulation est gratuite jusqu'à 48 heures avant la prise en charge. Aucun acompte n'est requis pour la plupart des réservations standard."
        }
    ];

    // JSON-LD Schemas
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "Professional Private Driver & Chauffeur Service Casablanca" : "Service de Chauffeur Privé et Disposition Casablanca",
        "description": textCasablanca.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/img2/casablanca_MOSQUE.webp",
            "telephone": "+212766816992",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Casablanca",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Casablanca"
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
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textCasablanca.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textCasablanca.h1}
                    </h1>

                    {/* Ratings, Badge & Guarantee row */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                        {/* Rating Pill */}
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700 }}>5.0</span>
                            <span style={{ color: '#717171', fontWeight: 500 }}>(55 {isEn ? "reviews" : "avis"})</span>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="grid-responsive-layout">
                        {/* Left Column: Gallery */}
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Casablanca" title={textCasablanca.h1} />
                            
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
                                {isEn ? "Popular Itineraries" : "Itinéraires Fréquents"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textCasablanca.useCasesTitle}
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
                                {textCasablanca.faqTitle}
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

                <ChauffeurDestinations lang={language} pageType="casablanca" />

                {/* Bottom Internal Linking / Navigation Bar */}
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

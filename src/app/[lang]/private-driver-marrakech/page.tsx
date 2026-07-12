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
        ? 'Private Driver Marrakech – Flexible Car with Driver Service | Mdina Tours' 
        : 'Chauffeur Privé Marrakech – Location de Voiture avec Chauffeur | Mdina Tours';
    const description = isEn
        ? 'Book a professional private driver in Marrakech. Premium sedans, SUVs, and minivans with English-speaking local chauffeurs (Dispo Chauffeur) for day trips and custom tours.'
        : 'Louez un véhicule avec chauffeur privé à Marrakech. Berlines, SUV et minivans avec chauffeurs professionnels bilingues (Disposition Chauffeur) pour vos excursions et circuits.';
    const url = `https://mdinatours.com/${lang}/private-driver-marrakech`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/private-driver-marrakech',
                'fr': 'https://mdinatours.com/fr/private-driver-marrakech',
            },
        },
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
                    alt: 'Private Driver Marrakech Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
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

export default async function PrivateDriverMarrakechPage({ params }: { params: Promise<{ lang: string }> }) {
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

    const textMarrakech = {
        h1: isEn ? "Private Driver in Marrakech – Flexible Chauffeur Service" : "Chauffeur Privé à Marrakech – Service Flexible de Disposition",
        subtitle: isEn 
            ? "Explore Marrakech, the Atlas Mountains, and Moroccan desert at your own pace with a dedicated, English-speaking local driver. Fixed daily rates, absolute freedom."
            : "Explorez Marrakech, l'Atlas et le désert à votre rythme avec un chauffeur local bilingue à votre entière disposition. Tarifs fixes à la journée, liberté totale.",
        bannerLabel: isEn ? "Marrakech Driver" : "Chauffeur Marrakech",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver service in Marrakech."
            : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé à Marrakech.",
        introTitle: isEn ? "What is a Private Driver (Dispo Chauffeur) in Marrakech?" : "Qu'est-ce qu'un service de Chauffeur Privé (Dispo Chauffeur) à Marrakech ?",
        introP1: isEn
            ? "Unlike standard point-to-point transfers or rigid tour packages, our private driver service in Marrakech—known locally as \"Dispo Chauffeur\"—offers you complete control over your itinerary. When you book a driver for the day, the vehicle and professional chauffeur are dedicated exclusively to you. You decide where to go, when to stop, and how long to stay at each location."
            : "Contrairement aux transferts classiques ou aux circuits rigides, notre service de chauffeur privé à Marrakech — connu localement sous le nom de « Dispo Chauffeur » — vous offre le contrôle total de votre itinéraire. Lorsque vous louez un véhicule avec chauffeur pour la journée, ils vous sont exclusivement dédiés. Vous décidez où aller, quand vous arrêter et combien de temps rester.",
        introP2: isEn
            ? "Whether you want to navigate the historic medina, take a scenic drive to the Ourika Valley, explore the Agafay desert, or run business errands, this service is the ultimate upgrade from local taxis and trains. Travel stress-free in air-conditioned comfort with a driver who knows the local routes, entry gates, and best view points."
            : "Que vous souhaitiez vous déplacer dans la médina, partir en excursion dans la vallée de l'Ourika, explorer le désert d'Agafay ou enchaîner des rendez-vous professionnels, ce service est l'alternative premium idéale. Voyagez sereinement avec un chauffeur local bilingue qui maîtrise parfaitement les routes de l'Atlas et les accès de la ville.",
        howItWorksTitle: isEn ? "How Chauffeur Disposition Works" : "Comment fonctionne la disposition de chauffeur",
        step1Title: isEn ? "1. Select Vehicle & Start Point" : "1. Choisissez le véhicule et le point de départ",
        step1Desc: isEn ? "Select your pickup location in Marrakech (airport, hotel, or riad) and pick a vehicle (Sedan, SUV, or Minivan) that fits your group." : "Indiquez votre lieu de prise en charge à Marrakech (aéroport, hôtel, riad) et sélectionnez le véhicule adapté (Berline, SUV ou Minivan).",
        step2Title: isEn ? "2. Plan Your Flexible Route" : "2. Planifiez votre itinéraire flexible",
        step2Desc: isEn ? "Let us know your planned route or ask our local driver to suggest the best sights in Marrakech and the High Atlas Mountains." : "Partagez votre itinéraire ou laissez notre chauffeur local vous suggérer les plus beaux sites de Marrakech et du Haut Atlas.",
        step3Title: isEn ? "3. Professional Driver Assigned" : "3. Votre chauffeur vous est attribué",
        step3Desc: isEn ? "We assign a licensed, friendly, English-speaking driver who is fully briefed on your trip requirements and schedule." : "Nous vous affectons un chauffeur agréé, courtois et bilingue, briefé en détail sur vos besoins de voyage et votre planning.",
        step4Title: isEn ? "4. Travel Freely with Standby Driver" : "4. Voyagez librement avec chauffeur en attente",
        step4Desc: isEn ? "Your driver remains at your disposal, waiting at each stop while you explore monuments, dine, or take photos. Complete freedom!" : "Votre chauffeur reste à votre disposition à chaque étape, vous attendant pendant vos visites, repas ou photos. La liberté absolue !",
        vehiclesTitle: isEn ? "Our Marrakech Chauffeur Fleet" : "Notre flotte de véhicules à Marrakech",
        vehiclesSubtitle: isEn ? "Clean, modern, air-conditioned passenger transport vehicles" : "Des véhicules récents, climatisés et parfaitement entretenus",
        useCasesTitle: isEn ? "Popular Marrakech Driver Use Cases & Itineraries" : "Exemples d'itinéraires et cas d'usage à Marrakech",
        pricingTitle: isEn ? "Marrakech Chauffeur Pricing Guide" : "Grille tarifaire - Chauffeur à Marrakech",
        pricingSubtitle: isEn ? "Transparent flat-rate dispo pricing with no hidden charges. Book now, pay cash directly to the driver." : "Des tarifs transparents tout compris. Réservez aujourd'hui et payez en espèces directement au chauffeur.",
        reviewsTitle: isEn ? "What Travelers Say About Our Marrakech Chauffeurs" : "Avis de nos voyageurs sur notre service à Marrakech",
        reviewsSubtitle: isEn ? "Read experiences from verified clients who toured Marrakech and the Atlas Mountains with us." : "Découvrez les avis de clients ayant exploré Marrakech et ses environs avec nos chauffeurs.",
        finalCtaTitle: isEn ? "Secure Your Private Driver in Marrakech" : "Réservez votre Chauffeur Privé à Marrakech",
        finalCtaSubtitle: isEn ? "Need a driver within Marrakech or for a day trip to the mountains? Contact us on WhatsApp and get your driver confirmed in 10 minutes!" : "Besoin d'un chauffeur à Marrakech ou pour une excursion dans l'Atlas ? Contactez-nous sur WhatsApp et recevez votre confirmation en 10 minutes !",
        faqTitle: isEn ? "Marrakech Private Driver FAQs" : "Questions Fréquentes - Chauffeur à Marrakech"
    };

    const vehicles = [
        {
            name: isEn ? "Skoda Superb" : "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: isEn ? "Skoda Kodiaq" : "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: isEn ? "Fiat Scudo" : "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: isEn ? "Mercedes Vito" : "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: isEn ? "Mercedes Sprinter" : "Mercedes Sprinter",
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
            q: isEn ? "What is a private driver (\"dispo chauffeur\") in Marrakech?" : "Qu'est-ce qu'un service de chauffeur privé (« dispo chauffeur ») à Marrakech ?",
            a: isEn 
                ? "A dispo chauffeur is a vehicle hired with a professional driver at your full disposal. Unlike a point-to-point transfer, there is no fixed route. The driver remains standby at your location, ready to take you to any destination within the agreed hours and area."
                : "La formule « dispo chauffeur » désigne la location d'un véhicule avec chauffeur à votre entière disposition. Il n'y a pas d'itinéraire fixe : le chauffeur vous attend à chaque arrêt et vous emmène là où vous le souhaitez durant les heures réservées."
        },
        {
            q: isEn ? "Is the driver available for multi-day trips outside Marrakech?" : "Le chauffeur est-il disponible pour des trajets de plusieurs jours en dehors de Marrakech ?",
            a: isEn
                ? "Yes, you can book our driver dispo service for multiple days to explore other cities (Casablanca, Fes, Essaouira) or embark on a multi-day desert tour to Merzouga. Multi-day bookings include driver accommodation and meals in the price."
                : "Oui, vous pouvez louer nos services pour plusieurs jours consécutifs afin de voyager vers d'autres villes (Fès, Chefchaouen, Essaouira) ou de faire un circuit dans le désert. Le prix inclut alors l'hébergement et les repas du chauffeur."
        },
        {
            q: isEn ? "Can I change the itinerary during the day?" : "Puis-je modifier mon itinéraire au cours de la journée ?",
            a: isEn
                ? "Absolutely. Full flexibility is the core benefit of this service. You can add extra stops, change your destination, or cut your sightseeing short. Simply communicate your wishes to your driver."
                : "Tout à fait. La flexibilité est l'atout majeur de notre formule. Vous pouvez modifier votre programme, ajouter des visites ou écourter une excursion selon vos envies en le signalant directement à votre chauffeur."
        },
        {
            q: isEn ? "Is fuel, highway tolls, and parking included?" : "Le carburant, les péages et les frais de parking sont-ils inclus ?",
            a: isEn
                ? "Yes. All our daily rates include fuel, highway toll charges, parking fees, and the driver's professional fees. There are no hidden or surprise surcharges."
                : "Oui. Tous nos tarifs à la journée incluent le carburant, les frais de péage autoroutier, les parkings ainsi que la rémunération du chauffeur. Pas de mauvaise surprise à la fin."
        },
        {
            q: isEn ? "Do drivers speak English and French?" : "Les chauffeurs parlent-ils anglais et français ?",
            a: isEn
                ? "Yes. All our designated dispo drivers speak fluent English and French. Many also speak basic Spanish. They are highly experienced in tourist transport and local guiding tips."
                : "Oui. Tous nos chauffeurs affectés au service touristique parlent couramment français et anglais. Ils ont une grande expérience du guidage et de l'accueil international."
        },
        {
            q: isEn ? "How many hours and kilometers are included in a standard daily rate?" : "Combien d'heures et de kilomètres sont inclus dans le tarif journalier standard ?",
            a: isEn
                ? "A standard daily dispo includes 8 to 10 hours of service and up to 200-250 km of travel (depending on destination). Longer distances or extended hours can be easily arranged with a custom quote."
                : "Une journée standard comprend 8 à 10 heures de service et environ 200 à 250 km de trajet. Les heures supplémentaires ou longues distances peuvent être planifiées avec un tarif adapté."
        },
        {
            q: isEn ? "What is the difference between a transfer and a private driver dispo?" : "Quelle est la différence entre un transfert simple et un chauffeur privé à disposition ?",
            a: isEn
                ? "A transfer is a direct, point-to-point trip (e.g., Marrakech Airport to a Gueliz hotel) with no additional stops. A private driver dispo is an hourly or daily booking where the driver stays with you, facilitating multiple stops and flexible waits."
                : "Un transfert est un trajet direct d'un point A à un point B (ex: Aéroport de Marrakech vers un hôtel au Guéliz). La formule dispo chauffeur est une location à la journée où le véhicule reste avec vous pour enchaîner plusieurs visites et escales."
        },
        {
            q: isEn ? "Do you supply baby or booster seats?" : "Fournissez-vous des sièges bébé ou rehausseurs ?",
            a: isEn
                ? "Yes, we can provide clean baby or booster safety seats free of charge. Please specify your child's age in your WhatsApp or contact form request so we can prepare the vehicle."
                : "Oui, nous mettons gratuitement à votre disposition des sièges bébé et rehausseurs de sécurité. Veuillez préciser l'âge de l'enfant lors de votre réservation."
        }
    ];

    // JSON-LD Schemas
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "Private Chauffeur & Dispo Driver Service Marrakech" : "Service de Chauffeur Privé et Disposition Marrakech",
        "description": textMarrakech.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/hero-marrakech.webp",
            "telephone": "+212766816992",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Marrakech",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Marrakech"
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
                    <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '6px', fontSize: '0.65rem', color: '#666', marginBottom: '8px' }}>
                        <Link href={getPath('/')} style={{ color: '#666', transition: 'color 0.2s' }}>{t('home')}</Link>
                        <span style={{ color: '#ccc' }}>›</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textMarrakech.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textMarrakech.h1}
                    </h1>

                    {/* Ratings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '1.1rem' }}>
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500, textDecoration: 'underline' }}>
                            144 {isEn ? "Reviews" : "Avis"}
                        </span>
                    </div>

                    {/* Excellence Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ backgroundColor: '#fef3c7', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#d97706', fontSize: '0.8rem' }}>🏆</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>
                            {isEn ? "Badge of Excellence" : "Badge d'Excellence"}
                        </span>
                    </div>

                    {/* Reserve Now & Lowest Price Row */}
                    <div className="guarantees-row" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', fontSize: '0.75rem', marginBottom: '20px', width: '100%', overflowX: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '6px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            <span style={{ fontWeight: 500 }}>{isEn ? "Reserve Now Pay later" : "Réservez maintenant, payez plus tard"}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '6px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                            <span style={{ color: '#64748b', fontWeight: 'bold' }}>🏷️</span>
                            <span style={{ fontWeight: 500 }}>{isEn ? "Lowest price guaranteed" : "Meilleur prix garanti"}</span>
                        </div>
                    </div>

                </div>

                {/* Main Visual and Booking Section */}
                <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="grid-responsive-layout">
                        {/* Left Column: Gallery */}
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Marrakech" title={textMarrakech.h1} />
                            
                            <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Marrakech" defaultDays={1} />
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
                                <PrivateDriverBookingWidget language={language} defaultCity="Marrakech" defaultDays={1} />
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
                                {textMarrakech.useCasesTitle}
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
                                                    <path d="M12.012 2.25c-5.378 0-9.755 4.378-9.755 9.756 0 2.102.665 4.05 1.794 5.656L2.836 21.8c-.144.425.263.832.688.688l4.137-1.215c1.554.981 3.4 1.545 5.351 1.545 5.378 0 9.756-4.379 9.756-9.756S17.39 2.25 12.012 2.25zm5.176 13.9c-.22.617-1.272 1.134-1.748 1.18-.466.046-.902.213-2.923-.59-2.583-1.026-4.237-3.666-4.364-3.836-.129-.17-.932-1.243-.932-2.375 0-1.132.582-1.688.815-1.921.233-.233.51-.292.68-.292.17 0 .34.004.488.01.15.008.353-.06.554.423.204.492.698 1.706.759 1.83.06.124.1.267.017.433-.083.167-.124.267-.25.413-.125.146-.25.648 1.07 1.39 1.733.957.854 1.76 1.117 2.01.124.25-.25.146-.51.25-.678.104-.167.208-.125.353-.083.146.042.921.433 1.079.512.158.08.263.117.304.188.042.07.042.413-.178 1.03z"/>
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
                                {textMarrakech.faqTitle}
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

                <ChauffeurDestinations lang={language} pageType="marrakech" />

                {/* Bottom Internal Linking / Navigation Bar */}
                <section style={{ padding: '40px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: '#555', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', backgroundColor: '#fff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #eee' }}>
                                <span>👉 {isEn ? "Chauffeur Services:" : "Services de Chauffeur :"}</span>
                                <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                                    {isEn ? "Morocco (National)" : "Maroc (National)"}
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

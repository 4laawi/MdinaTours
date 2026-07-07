import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import { Metadata } from 'next';
import { Language, translations } from '@/lib/translations';
import Link from 'next/link';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
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
        ? 'Car with Driver Morocco 8 Days – Custom 8-Day Chauffeur | Mdina Tours' 
        : 'Voiture avec Chauffeur Maroc 8 Jours – Circuit Personnalisé | Mdina Tours';
    const description = isEn
        ? 'Book a private car with driver in Morocco for 8 days. Fully customizable itinerary covering Marrakech, Fes, Chefchaouen, and the Sahara Desert. Driver board included.'
        : 'Louez une voiture avec chauffeur au Maroc pour 8 jours. Itinéraire sur mesure : Marrakech, Fès, Chefchaouen et désert du Sahara. Hébergement du chauffeur inclus.';
    const url = `https://mdinatours.com/${lang}/car-with-driver-morocco-8-days`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/car-with-driver-morocco-8-days',
                'fr': 'https://mdinatours.com/fr/car-with-driver-morocco-8-days',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/img/Morocco-trip-tour-hero01.webp',
                    width: 1200,
                    height: 630,
                    alt: '8 Day Morocco Car with Driver Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/img/Morocco-trip-tour-hero01.webp'],
        },
    };
}

export default async function CarWithDriver8DaysPage({ params }: { params: Promise<{ lang: string }> }) {
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

    const text8Days = {
        h1: isEn ? "8-Day Morocco Tour with Driver – Custom Car & Chauffeur" : "Circuit 8 Jours au Maroc avec Chauffeur – Voiture et Chauffeur Privé",
        subtitle: isEn 
            ? "Explore Marrakech, Fes, Chefchaouen, and the Sahara Desert on a customizable 8-day road trip with a dedicated private driver. Fuel, tolls, and driver lodging included."
            : "Explorez Marrakech, Fès, Chefchaouen et le désert sur un circuit personnalisé de 8 jours avec chauffeur privé dédié. Carburant, péages et frais de chauffeur inclus.",
        bannerLabel: isEn ? "Morocco 8-Day Driver" : "Chauffeur Maroc 8 Jours",
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private car with driver in Morocco for 8 days."
            : "Bonjour Mdina Tours, je souhaite réserver une voiture avec chauffeur au Maroc pour 8 jours.",
        introTitle: isEn ? "Why Hire a Car with Driver in Morocco for 8 Days?" : "Pourquoi louer une voiture avec chauffeur pour 8 jours au Maroc ?",
        introP1: isEn
            ? "An 8-day road trip is the gold standard for experiencing Morocco's diverse landscapes. In just over a week, you can travel from the coastal metropolises to medieval imperial medinas, cross the High Atlas mountain passes, ride camels in the Sahara dunes, and relax in the blue city of Chefchaouen. However, driving this vast route yourself is exhausting and public transport is highly restrictive. Our 8-day car with driver dispo package offers you absolute safety, local driver expertise, and the freedom to modify your daily stops in real time."
            : "Un road trip de 8 jours est la durée idéale pour découvrir la diversité des paysages marocains. En un peu plus d'une semaine, vous pouvez voyager des métropoles côtières aux médinas impériales, traverser le Haut Atlas, faire une randonnée à dos de chameau dans le Sahara et flâner à Chefchaouen. Cependant, faire cette route soi-même est épuisant et les transports publics sont trop rigides. Notre formule 8 jours avec chauffeur vous offre sécurité, expertise locale et flexibilité totale.",
        introP2: isEn
            ? "Unlike standard group tours with rigid itineraries, our package puts you in complete control. Your driver is at your disposal, picking you up directly from your arrival airport (Casablanca CMN, Marrakech RAK, or Tangier), staying with your travel group throughout the 8 days, and dropping you off for flight departures. The package price includes the vehicle, chauffeur boarding and meals, highway tolls, fuel, and municipal parking fees. Travel with peace of mind in a modern, air-conditioned vehicle."
            : "Contrairement aux circuits de groupe rigides, notre formule vous donne le contrôle. Votre chauffeur est à votre disposition, vous accueille à votre aéroport d'arrivée (Casablanca CMN, Marrakech RAK ou Tanger), vous accompagne tout au long des 8 jours et vous dépose pour votre vol retour. Le prix du forfait comprend le véhicule, les frais de vie et de logement du chauffeur, les péages autoroutiers, le carburant et les parkings.",
        howItWorksTitle: isEn ? "How the 8-Day Chauffeur Package Works" : "Comment fonctionne le forfait chauffeur 8 jours",
        step1Title: isEn ? "1. Pick Starting Point & Vehicle" : "1. Choisissez le départ et le véhicule",
        step1Desc: isEn ? "Select your arrival airport or hotel in Morocco (Casablanca, Marrakech, Tangier) and pick a vehicle size." : "Sélectionnez votre lieu d'arrivée au Maroc (Casablanca, Marrakech, Tanger) et choisissez la taille du véhicule.",
        step2Title: isEn ? "2. Customise Your 8-Day Route" : "2. Personnalisez votre parcours de 8 jours",
        step2Desc: isEn ? "Choose one of our popular routes below or work with our local planning team to design a bespoke itinerary." : "Sélectionnez l'un de nos itinéraires suggérés ou concevez un parcours sur mesure avec notre équipe.",
        step3Title: isEn ? "3. Professional Chauffeur Assigned" : "3. Votre chauffeur est affecté",
        step3Desc: isEn ? "A certified, bilingual local driver is assigned to you, acting as your standby navigator and assistant." : "Un chauffeur local bilingue agréé vous est attribué, faisant office de navigateur et d'assistant en attente.",
        step4Title: isEn ? "4. Travel Worry-Free for 8 Days" : "4. Voyagez sans souci pendant 8 jours",
        step4Desc: isEn ? "Enjoy the road. Your driver handles all luggage, coordinates drop-offs at hotel gates, and drives you safely." : "Profitez du voyage. Votre chauffeur s'occupe des bagages, gère les accès riad/hôtel et assure votre sécurité sur la route.",
        vehiclesTitle: isEn ? "8-Day Package Fleet Rates" : "Tarifs Forfait Fleet 8 Jours",
        vehiclesSubtitle: isEn ? "Fixed package pricing for 8 days. Includes fuel, tolls, and driver lodging fees." : "Forfait fixe de 8 jours. Inclut carburant, péages et frais d'hébergement du chauffeur.",
        useCasesTitle: isEn ? "Popular 8-Day Morocco Itineraries with Driver" : "Itinéraires suggérés de 8 jours avec chauffeur",
        pricingTitle: isEn ? " Morocoo 8-Day Package Pricing" : "Tarifs Forfait Maroc 8 Jours",
        pricingSubtitle: isEn ? "Transparent flat-rate dispo pricing with no hidden charges. Book now, pay cash directly to the driver." : "Des tarifs transparents tout compris. Réservez aujourd'hui et payez en espèces directement au chauffeur.",
        reviewsTitle: isEn ? "Testimonials from 8-Day Tour Clients" : "Avis de clients sur nos circuits de 8 jours",
        reviewsSubtitle: isEn ? "Verified reviews from families and couples who booked our 8-day Morocco car and driver packages." : "Découvrez les avis de familles et de couples ayant loué nos véhicules pour 8 jours.",
        finalCtaTitle: isEn ? "Secure Your 8-Day Private Driver" : "Réservez votre Chauffeur pour 8 Jours",
        finalCtaSubtitle: isEn ? "Ready to book your custom 8-day road trip across Morocco? Contact us on WhatsApp and receive your custom quote within 10 minutes!" : "Prêt à réserver votre road trip sur mesure de 8 jours au Maroc ? Écrivez-nous sur WhatsApp et recevez votre devis en 10 minutes !",
        faqTitle: isEn ? "8-Day Morocco Chauffeur FAQs" : "Questions Fréquentes - Chauffeur 8 Jours au Maroc"
    };

    const vehicles = [
        {
            name: isEn ? "Skoda Superb" : "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€580",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: isEn ? "Skoda Kodiaq" : "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€780",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: isEn ? "Fiat Scudo" : "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€800",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: isEn ? "Mercedes Vito" : "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€850",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: isEn ? "Mercedes Sprinter" : "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions." : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes.",
            price: "€1,280",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const itineraries = [
        {
            title: isEn ? "Option A: Classic Sahara Desert & Imperial Cities (8 Days)" : "Option A : Le Grand Sud, Désert et Villes Impériales (8 Jours)",
            desc: isEn 
                ? "Day 1: Casablanca arrival & transfer to Rabat. Day 2: Rabat historic tour, drive to Fes. Day 3: Full day Fes Medina guided tour. Day 4: Fes to Merzouga Desert via Cedar Forest. Day 5: Desert Dunes, sunset camel ride. Day 6: Merzouga to Dades Gorges & Ouarzazate. Day 7: Ait Benhaddou to Marrakech via Tizi n'Tichka. Day 8: Marrakech departure."
                : "J1 : Arrivée Casablanca et transfert Rabat. J2 : Visite Rabat, route vers Fès. J3 : Visite guidée Médina de Fès. J4 : Fès vers désert de Merzouga via la forêt de cèdres. J5 : Dunes du Sahara, coucher de soleil à dos de chameau. J6 : Merzouga vers Gorges du Dadès et Ouarzazate. J7 : Aït Benhaddou vers Marrakech via l'Atlas. J8 : Départ Marrakech.",
            meta: isEn ? "Sahara Classic | 8 Days dispo" : "Sud & Impériales | 8 Jours dispo"
        },
        {
            title: isEn ? "Option B: Northern Wonders & Blue City Explorer (8 Days)" : "Option B : Splendeurs du Nord et Ville Bleue (8 Jours)",
            desc: isEn 
                ? "Day 1: Tangier pickup & city tour. Day 2: Tangier to Chefchaouen blue alleys dispo. Day 3: Chefchaouen to Fes via Volubilis Roman ruins. Day 4: Full day Fes Medina tour. Day 5: Fes to Meknes & Rabat. Day 6: Rabat to Casablanca coast. Day 7: Casablanca city dispo, drive to Assilah. Day 8: Assilah to Tangier departure."
                : "J1 : Prise en charge Tanger et visite. J2 : Tanger vers Chefchaouen. J3 : Chefchaouen vers Fès via Volubilis. J4 : Visite guidée Fès. J5 : Fès vers Meknès et Rabat. J6 : Rabat vers Casablanca. J7 : Casablanca et route vers la cité balnéaire d'Assilah. J8 : Assilah vers départ Tanger.",
            meta: isEn ? "Northern Loop | 8 Days dispo" : "Boucle du Nord | 8 Jours dispo"
        }
    ];

    const reviews = [
        {
            quote: isEn 
                ? "We booked the 8-day Sahara package for our family of 5 starting in Casablanca. The Mercedes Vito was very comfortable and our driver Hassan was incredible. He made sure our kids were always comfortable, drove very safely, and guided us through local spots. Outstanding!"
                : "Nous avons loué un van Mercedes Vito pour le circuit désert de 8 jours en famille. Hassan, notre chauffeur, était génial. Prudent, attentionné avec les enfants et plein de bons conseils. Une merveilleuse expérience !",
            author: "Rebecca S.",
            country: isEn ? "United States" : "États-Unis",
            flag: "🇺🇸",
            date: "June 20, 2026"
        },
        {
            quote: isEn
                ? "Traveling Morocco with a private driver for 8 days was the best decision. Complete flexibility, comfortable SUV, and a very knowledgeable chauffeur. We customized our route every day. Excellent value!"
                : "Voyager 8 jours avec un chauffeur privé était la meilleure décision possible. Flexibilité totale, SUV confortable et chauffeur très instruit. Nous avons modifié le programme chaque jour. Super rapport qualité-prix.",
            author: "Thomas L.",
            country: isEn ? "United Kingdom" : "Royaume-Uni",
            flag: "🇬🇧",
            date: "May 14, 2026"
        },
        {
            quote: isEn
                ? "Mdina Tours provided an excellent 8-day dispo service starting from Tangier. The car was spotless, tolls and fuel were fully covered as promised, and Karim drove very safely. Highly recommended!"
                : "Superbe prestation de 8 jours au départ de Tanger. Voiture impeccable, péages et carburant inclus comme promis, et Karim a conduit prudemment tout au long du voyage. À recommander !",
            author: "Valérie M.",
            country: "France",
            flag: "🇫🇷",
            date: "April 29, 2026"
        }
    ];

    const faqs = [
        {
            q: isEn ? "Is the driver's accommodation and meals included in the 8-day package price?" : "L'hébergement et les repas du chauffeur sont-ils inclus dans le prix du forfait 8 jours ?",
            a: isEn 
                ? "Yes. The driver's accommodation, meals, and professional boarding fees are fully included in our flat-rate package price. There are no additional expenses or allowances you need to pay the driver."
                : "Oui. L'hébergement, les repas et les frais de vie du chauffeur sont entièrement inclus dans le tarif forfaitaire. Vous n'avez aucun supplément ni indemnité à régler au chauffeur."
        },
        {
            q: isEn ? "Can we customize the 8-day itinerary or are we locked into a route?" : "Pouvons-je personnaliser le circuit de 8 jours ou l'itinéraire est-il figé ?",
            a: isEn
                ? "The itinerary is 100% customizable. You can choose one of our suggested routes or map out your own path. You can also adjust stops, departure times, and schedule changes on the go with your driver."
                : "L'itinéraire est 100% personnalisable. Vous pouvez choisir l'une de nos suggestions ou concevoir votre propre parcours. Vous pouvez également ajuster vos visites et horaires en cours de route avec votre chauffeur."
        },
        {
            q: isEn ? "Are fuel, highway tolls, and parking costs included?" : "Le carburant, les péages d'autoroute et les parkings sont-ils inclus ?",
            a: isEn
                ? "Yes. Our flat-rate 8-day packages include all fuel costs, highway toll fees, and municipal parking costs throughout the journey. There are no hidden surcharges."
                : "Oui. Nos forfaits fixes de 8 jours incluent la totalité des frais de carburant, les péages autoroutiers et les parkings publics tout au long du voyage. Pas de frais surprise."
        },
        {
            q: isEn ? "Do the drivers speak English and French?" : "Les chauffeurs parlent-ils français et anglais ?",
            a: isEn
                ? "Yes. All our designated multi-day chauffeurs speak fluent English and French. They are highly experienced in tourist transport and acts as local navigators."
                : "Oui. Tous nos chauffeurs affectés aux circuits multi-jours parlent couramment français et anglais. Ils ont une longue expérience de l'accompagnement touristique au Maroc."
        },
        {
            q: isEn ? "What is the daily driving limit for the 8-day package?" : "Quelle est la limite de conduite journalière pour le forfait 8 jours ?",
            a: isEn
                ? "The package covers up to 1,600 km total over the 8 days (averaging 200 km per day). This is more than enough to cover the classic Sahara desert loop or the Northern imperial cities route."
                : "Le forfait couvre jusqu'à 1600 km au total sur les 8 jours (soit une moyenne de 200 km par jour). C'est amplement suffisant pour réaliser la boucle du désert ou le circuit du Nord."
        },
        {
            q: isEn ? "Is a local tour guide included in the price?" : "Un guide touristique local est-il inclus dans le prix ?",
            a: isEn
                ? "Our drivers are professional chauffeurs and local experts who provide road guidance. However, they are legally barred from guiding inside historic monuments. If you require licensed city guides for Fes or Marrakech Medina, we can easily arrange them for a small additional fee."
                : "Nos chauffeurs sont des professionnels de la route et connaissent le pays sur le bout des doigts, mais la loi leur interdit de guider au sein des monuments. Nous pouvons vous réserver des guides officiels locaux agréés à Fès ou Marrakech en supplément."
        },
        {
            q: isEn ? "Do we need to pay for the 8-day booking in advance?" : "Devons-nous payer la réservation de 8 jours à l'avance ?",
            a: isEn
                ? "No upfront deposit is required for most bookings. You can pay your driver in cash (Euros or Moroccan Dirhams) at the end of the journey, or coordinate online credit card payment before arrival."
                : "Aucun acompte n'est requis à la réservation dans la plupart des cas. Vous pouvez régler votre chauffeur en espèces (Euros ou Dirhams) à la fin du séjour, ou payer par carte bancaire en ligne avant votre arrivée."
        },
        {
            q: isEn ? "Can we start the tour in Casablanca and end it in Marrakech?" : "Pouvons-nous commencer le circuit à Casablanca et le terminer à Marrakech ?",
            a: isEn
                ? "Yes. Multi-city start and end points (e.g., pickup in Casablanca, drop-off in Marrakech or Tangier) are fully supported and can be arranged with no extra drop-off fees."
                : "Oui, tout à fait. Les villes de départ et d'arrivée peuvent être différentes (ex: prise en charge à Casablanca et retour à Marrakech ou Tanger) sans aucun frais de retour supplémentaire."
        }
    ];

    // JSON-LD Schemas
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": isEn ? "8-Day Morocco Car with Driver Package" : "Forfait 8 Jours Voiture avec Chauffeur au Maroc",
        "description": text8Days.subtitle,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
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
            "price": v.price.replace('€', '').replace(',', '')
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
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <PageBanner 
                    title={text8Days.h1}
                    subtitle={text8Days.subtitle}
                    bgImage="/img/Morocco-trip-tour-hero01.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={text8Days.bannerLabel}
                />
                
                <div style={{ maxWidth: '1150px', margin: '40px auto 0 auto', padding: '0 20px' }}>
                    <TransferWebRatings isEn={isEn} />
                </div>

                {/* Service Explanation Section */}
                <section id="booking" style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'flex-start' }}>
                            {/* Left Column: Title, Intro text, Stats */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                        {isEn ? "8-Day Road Trip Freedom" : "8 Jours de Liberté sur la Route"}
                                    </span>
                                    <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                        {text8Days.introTitle}
                                    </h2>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#555', lineHeight: 1.7, fontSize: '1rem' }}>
                                    <p>{text8Days.introP1}</p>
                                    <p>
                                        {text8Days.introP2}
                                        <br /><br />
                                        <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>
                                            {isEn ? "Prefer an all-inclusive guided tour instead of a flexible driver package?" : "Vous préférez un circuit accompagné organisé ?"}{" "}
                                            <Link href={getPath('/tours')} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                                                {isEn ? "View Morocco Guided Tours" : "Voir nos Circuits Organisés Maroc"}
                                            </Link>.
                                        </span>
                                    </p>
                                </div>

                                <div style={{ 
                                    padding: '25px', 
                                    backgroundColor: 'var(--bg-color)', 
                                    borderRadius: '12px', 
                                    border: '1px dashed var(--primary)', 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: '20px',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>8 Days</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Standby dispo Chauffeur" : "Disposition Chauffeur Non-Stop"}</span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>Included</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Driver Boarding & Lodging" : "Hébergement & Repas Chauffeur"}</span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>1,600 km</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Mileage Limit Included" : "Kilométrage Forfaitaire Inclus"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Booking Widget */}
                            <div style={{ position: 'sticky', top: '100px', zIndex: 10 }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Casablanca" defaultDays={8} is8DaysPackage={true} />
                            </div>
                        </div>
                    </div>
                </section>

                <PrivateDriverWhyChooseUs lang={language} />
                <PrivateDriverInclusions lang={language} />

                {/* How It Works Section */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Step-By-Step Process" : "Étape Par Étape"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.howItWorksTitle}
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
                            {[
                                { title: text8Days.step1Title, desc: text8Days.step1Desc },
                                { title: text8Days.step2Title, desc: text8Days.step2Desc },
                                { title: text8Days.step3Title, desc: text8Days.step3Desc },
                                { title: text8Days.step4Title, desc: text8Days.step4Desc }
                            ].map((step, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '30px 25px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                                    border: '1px solid rgba(0,0,0,0.03)',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(220, 131, 78, 0.1)',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                        marginBottom: '20px'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>{step.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                {/* Use Cases / Itineraries (SEO Gold Section) */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Suggested 8-Day Options" : "Options de Circuits Suggérées"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.useCasesTitle}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {itineraries.map((it, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: '15px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{it.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, backgroundColor: 'rgba(220, 131, 78, 0.08)', padding: '5px 12px', borderRadius: '30px' }}>
                                            {it.meta}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6, margin: 0 }}>{it.desc}</p>
                                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                        <a href={getWhatsAppUrl(`Hello, I want to inquire about: "${it.title}" private driver package for 8 days.`)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'underline' }}>
                                            {isEn ? "Get itinerary suggestion →" : "Demander une suggestion →"}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Block */}
                <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            {isEn ? "Package Rates" : "Tarifs Forfaitaires"}
                        </span>
                        <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px', marginBottom: '15px' }}>
                            {text8Days.pricingTitle}
                        </h2>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '35px' }}>{text8Days.pricingSubtitle}</p>
                        
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            padding: '30px',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{isEn ? "8-Day Economy Sedan Package" : "Forfait 8 Jours Berline Économique"}</span>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>€580 {isEn ? "total" : "total"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{isEn ? "8-Day Comfort SUV Package" : "Forfait 8 Jours SUV Confort"}</span>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>€780 {isEn ? "total" : "total"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--secondary)' }}>{isEn ? "8-Day Chauffeur Minivan Package" : "Forfait 8 Jours Van Mercedes Vito"}</span>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>€850 {isEn ? "total" : "total"}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px', lineHeight: 1.4 }}>
                                * {isEn ? "Rates include vehicle, driver dispo, fuel, highway tolls, parking fees, and driver boarding costs. Lodging, breakfasts, and entrance fees for passengers are NOT included." : "* Les tarifs incluent le véhicule, la disposition du chauffeur, le carburant, les péages, les parkings et l'hébergement/repas du chauffeur. L'hébergement et les repas des passagers ne sont pas inclus."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Got Questions?" : "Des Questions ?"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.faqTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid rgba(0,0,0,0.05)',
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

                {/* Trust / Reviews Section */}
                <section style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Testimonials" : "Témoignages"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.reviewsTitle}
                            </h2>
                            <p style={{ color: '#666', marginTop: '10px' }}>{text8Days.reviewsSubtitle}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                            {reviews.map((rev, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    border: '1px solid #eee',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ color: '#f39c12', fontSize: '1.2rem', marginBottom: '15px' }}>★★★★★</div>
                                        <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 20px 0' }}>
                                            "{rev.quote}"
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #eee', paddingTop: '15px', fontSize: '0.8rem', color: '#777' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{rev.author}</span>
                                        <span>•</span>
                                        <span>{rev.flag} {rev.country}</span>
                                        <span style={{ marginLeft: 'auto', color: '#bbb' }}>{rev.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <ChauffeurDestinations lang={language} pageType="8-days" upperBgColor="#fff" />

                {/* Internal Linking / Navigation Bar */}
                <section style={{ backgroundColor: '#fff', padding: '20px', borderBottom: '1px solid #eee' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', fontSize: '0.9rem', color: '#555', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
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
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

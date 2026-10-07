import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Language, translations } from '@/lib/translations';
import Link from 'next/link';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import ChauffeurDestinations from '@/components/ChauffeurDestinations';
import Morocco8DaysItinerarySelector from '@/components/Morocco8DaysItinerarySelector';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import { 
    ShieldCheck, 
    Compass, 
    CarProfile,
    CheckCircle,
    XCircle
} from '@phosphor-icons/react/dist/ssr';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const title = isEn 
        ? 'Morocco 8 Days Itinerary with Driver | 8-Day Private Car & Chauffeur | Mdina Tours' 
        : isEs
        ? 'Circuito 8 Días en Marruecos con Chófer Privado | Coche con Conductor | Mdina Tours'
        : 'Circuit 8 Jours Maroc avec Chauffeur – Voiture Privée & Itinéraire sur Mesure | Mdina Tours';
        
    const description = isEn
        ? 'Explore Marrakech, Sahara Desert luxury dunes, Fes medina & Chefchaouen on a customizable 8-day Morocco tour with private car and driver. Fuel, tolls & driver lodging included.'
        : isEs
        ? 'Explore Marrakech, las dunas del Sahara, la medina de Fez y Chefchaouen con nuestro paquete de coche con chófer en Marruecos 8 días. Itinerario a medida, combustible y peajes incluidos.'
        : 'Découvrez Marrakech, les dunes du Sahara, Fès et Chefchaouen avec notre forfait 8 jours voiture avec chauffeur au Maroc. Itinéraire 100% sur mesure, carburant et péages inclus.';
        
    const url = `https://mdinatours.com/${lang}/car-with-driver-morocco-8-days`;

    return {
        title,
        description,
        keywords: [
            'morocco 8 days itinerary',
            'car with driver morocco 8 days',
            '8 day morocco tour with driver',
            'morocco 8 day private driver',
            'marrakech 8 days private driver',
            'circuito 8 dias marruecos con chofer',
            'coche con conductor marruecos 8 dias',
            'ruta 8 dias marruecos chofer privado',
            'circuit 8 jours maroc avec chauffeur',
            'voiture avec chauffeur maroc 8 jours'
        ],
        alternates: getAlternates(lang, '/car-with-driver-morocco-8-days'),
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
            locale: lang === 'fr' ? 'fr_FR' : (lang === 'es' ? 'es_ES' : 'en_US'),
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
    if (!['en', 'fr', 'es'].includes(lang)) {
        notFound();
    }
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const isEs = language === 'es';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    const getWhatsAppUrl = (msg: string) => {
        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    const text8Days = {
        h1: isEn 
            ? "8-Day Morocco Tour with Private Driver – Custom Car & Chauffeur" 
            : isEs
            ? "Circuito de 8 Días en Marruecos con Chófer Privado – Coche y Ruta a Medida"
            : "Circuit 8 Jours au Maroc avec Chauffeur Privé – Voiture & Itinéraire sur Mesure",
        subtitle: isEn 
            ? "Explore Marrakech, Fes, Chefchaouen, and the Sahara Desert on a customizable 8-day road trip with your dedicated private driver. Fuel, highway tolls, and driver lodging fully included."
            : isEs
            ? "Explore Marrakech, Fez, Chefchaouen y el Desierto del Sahara en un viaje a medida de 8 días con chófer privado dedicado. Combustible, peajes y alojamiento del conductor incluidos."
            : "Explorez Marrakech, Fès, Chefchaouen et les dunes du Sahara sur un circuit sur mesure de 8 jours avec votre chauffeur privé dédié. Carburant, péages et hébergement chauffeur inclus.",
        bannerLabel: isEn ? "Morocco 8-Day Driver" : isEs ? "Chófer Marruecos 8 Días" : "Chauffeur Maroc 8 Jours",
        introTitle: isEn 
            ? "The Freedom of Morocco in 8 Days" 
            : isEs
            ? "La Libertad de Marruecos en 8 Días"
            : "8 Jours de Liberté sur les Routes du Maroc",
        introP1: isEn
            ? "An 8-day itinerary is Morocco's undisputed sweet spot: long enough to connect coastal metropolises, UNESCO imperial medinas, High Atlas mountain passes, and golden Sahara dunes without feeling rushed."
            : isEs
            ? "Un itinerario de 8 días es la duración perfecta para descubrir Marruecos: suficiente para conectar metrópolis costeras, medinas imperiales UNESCO, puertos del Alto Atlas y las dunas doradas del Sahara sin prisas."
            : "Un séjour de 8 jours est la durée idéale au Maroc : le temps parfait pour relier les cités impériales UNESCO, les cols du Haut Atlas et les dunes dorées du Sahara à un rythme équilibré.",
        introP2: isEn
            ? "With your dedicated private chauffeur, you bypass the exhaustion of navigating hazardous mountain curves and the rigid timetables of bus tours. Choose your own riads, stop for coffee or photography whenever you wish, and travel with total peace of mind."
            : isEs
            ? "Con su chófer privado, evitará el estrés de conducir por carreteras de montaña y las limitaciones de los autobuses de grupo. Elija sus propios riads, pare a tomar fotos cuando desee y viaje con total serenidad."
            : "Avec votre chauffeur privé dédié, vous évitez la fatigue de la conduite en montagne et les contraintes des grands circuits en bus. Choisissez librement vos riads, arrêtez-vous quand vous le souhaitez et voyagez en toute sérénité.",
        howItWorksTitle: isEn 
            ? "How Your 8-Day Chauffeur Package Works" 
            : isEs
            ? "Cómo Funciona su Paquete de Chófer de 8 Días"
            : "Comment Fonctionne votre Forfait Chauffeur 8 Jours",
        step1Title: isEn ? "1. Select Route & Vehicle" : isEs ? "1. Elija Ruta y Vehículo" : "1. Choisissez votre Route & Véhicule",
        step1Desc: isEn 
            ? "Pick your arrival airport (Casablanca, Marrakech, Tangier, or Fes) and select the vehicle size fitting your group." 
            : isEs
            ? "Indique su aeropuerto de llegada y seleccione el modelo de vehículo más cómodo para su grupo."
            : "Indiquez votre aéroport d'arrivée et choisissez le modèle de véhicule adapté à votre groupe.",
        step2Title: isEn ? "2. Customize Your Itinerary" : isEs ? "2. Personalice su Itinerario" : "2. Personnalisez votre Itinéraire",
        step2Desc: isEn 
            ? "Choose one of our 3 curated 8-day loops or share your custom wishlist with our local route planners." 
            : isEs
            ? "Seleccione una de nuestras 3 rutas sugeridas o diseñe un circuito a medida con nuestro equipo."
            : "Sélectionnez l'un de nos 3 circuits phares ou créez votre itinéraire sur mesure avec nos conseillers.",
        step3Title: isEn ? "3. Dedicated Driver Assigned" : isEs ? "3. Chófer Dedicado Asignado" : "3. Votre Chauffeur Dédié Attribué",
        step3Desc: isEn 
            ? "A licensed, bilingual local chauffeur greets you directly at the airport with a personalized nameboard." 
            : isEs
            ? "Un conductor profesional bilingüe le recibirá puntualmente en el aeropuerto con un cartel con su nombre."
            : "Un chauffeur professionnel bilingue vous accueille à l'aéroport avec une pancarte à votre nom.",
        step4Title: isEn ? "4. Travel with Absolute Comfort" : isEs ? "4. Viaje con Total Tranquilidad" : "4. Voyagez en Toute Sérénité",
        step4Desc: isEn 
            ? "Enjoy every scenic mile. Your driver handles fuel, tolls, parking, luggage, and coordinates medina riad drop-offs." 
            : isEs
            ? "Disfrute cada kilómetro. Su conductor se encarga del combustible, peajes, equipaje y accesos a riads."
            : "Profitez de chaque étape. Votre chauffeur gère le carburant, les péages, les bagages et l'accès aux riads.",
        pricingTitle: isEn ? "8-Day Fleet & Guaranteed Flat Rates" : isEs ? "Flota y Tarifas Fijas para 8 Días" : "Flotte & Tarifs Forfaitaires 8 Jours",
        pricingSubtitle: isEn 
            ? "All-inclusive flat rate for the full 8 days. Vehicle, personal chauffeur, fuel, highway tolls, parking, and driver lodging all included." 
            : isEs
            ? "Tarifa plana todo incluido para los 8 días completos: vehículo, chófer a disposición, combustible, peajes, aparcamientos y alojamiento del conductor."
            : "Tarifs tout compris pour l'ensemble des 8 jours : véhicule, chauffeur dédié, carburant, péages, parkings et hébergement chauffeur inclus.",
        reviewsTitle: isEn ? "Verified Traveler Reviews" : isEs ? "Opiniones de Clientes sobre Rutas de 8 Días" : "Témoignages de Clients – Séjours 8 Jours",
        reviewsSubtitle: isEn 
            ? "Real feedback from couples and families who explored Morocco on our 8-day private car & driver package." 
            : isEs
            ? "Experiencias reales de parejas y familias que recorrieron Marruecos con nuestro servicio de chófer privado por 8 días."
            : "Avis vérifiés de voyageurs ayant exploré le Maroc avec notre forfait voiture avec chauffeur 8 jours.",
        faqTitle: isEn ? "Frequently Asked Questions" : isEs ? "Preguntas Frecuentes (8 Días con Chófer)" : "Questions Fréquentes (Forfait 8 Jours)"
    };

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : isEs ? "Berlina Premium" : "Berline Premium",
            capacity: "1–3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "Smooth, quiet luxury sedan perfect for couples, solo travelers, and business road trips." : isEs ? "Berlina silenciosa y confortable para parejas o viajes ejecutivos." : "Berline silencieuse et très confortable, idéale pour les couples et voyages d'affaires.",
            price: "€580",
            image: "/cars/flotte-superb.webp",
            tag: isEn ? "Best for Couples" : isEs ? "Ideal Parejas" : "Idéal Couples"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV 4x4" : isEs ? "SUV Confort 4x4" : "SUV Grand Confort",
            capacity: "1–5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "Elevated seating, higher clearance, and superior road stability on High Atlas mountain curves." : isEs ? "SUV espacioso con gran estabilidad en carretera para las curvas del Atlas." : "SUV spacieux avec garde au sol surélevée pour les routes de montagne du Haut Atlas.",
            price: "€780",
            image: "/cars/flotte-skoda-kodiaq.webp",
            tag: isEn ? "Mountain Comfort" : isEs ? "Gran Confort" : "Confort Montagne"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "Comfort Family Van" : isEs ? "Van Familiar Confort" : "Van Familial Confort",
            capacity: "1–6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "Generous interior cabin and huge luggage volume for family holidays and multi-luggage trips." : isEs ? "Monovolumen espacioso con gran maletero para vacaciones familiares." : "Monospace spacieux avec grand volume de bagages pour les vacances en famille.",
            price: "€800",
            image: "/cars/flotte-fiat-scudo.webp",
            tag: isEn ? "Family Value" : isEs ? "Ideal Familias" : "Idéal Familles"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Luxury Minivan" : isEs ? "Miniván VIP Mercedes" : "Minivan VIP Mercedes",
            capacity: "1–7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "Morocco's #1 gold standard for multi-day touring. Dual climate control, executive leather seats, and deep luggage hold." : isEs ? "La referencia absoluta para viajar por Marruecos con climatización multizona y máximo confort." : "La référence absolue pour voyager au Maroc. Climatisation multizone, sellerie grand confort et vaste coffre.",
            price: "€850",
            image: "/cars/flotte-vito.webp",
            tag: isEn ? "⭐ Most Popular" : isEs ? "⭐ Top Ventas" : "⭐ Plus Populaire",
            isPopular: true
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "Executive VIP Minibus" : isEs ? "Minibús Ejecutivo VIP" : "Minibus Prestige",
            capacity: "8–16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "Prestige long-wheelbase minibus configured for large families, friend groups, and corporate delegations." : isEs ? "Minibús de gran confort para grupos numerosos, familias ampliadas o delegaciones." : "Minibus de prestige configuré sur mesure pour les grands groupes d'amis, familles ou délégations.",
            price: "€1,280",
            image: "/cars/flotte-sprinter.webp",
            tag: isEn ? "Large Groups" : isEs ? "Grupos Grandes" : "Grands Groupes"
        }
    ];

    const reviews = [
        {
            quote: isEn 
                ? "Booking the 8-day private car with driver from Casablanca through Fes, Merzouga, and Marrakech was hands-down our best decision in Morocco. The Mercedes Vito was immaculate, our driver Hassan drove with extreme care through the Atlas passes, and gave us total freedom."
                : isEs
                ? "Contratar un coche con chófer para nuestra ruta de 8 días desde Casablanca pasando por Fez, Merzouga y Marrakech fue la mejor decisión. La furgoneta Mercedes Vito estaba impecable y el conductor Hassan conducía con total precaución."
                : "Réserver une voiture avec chauffeur pour notre boucle de 8 jours (Casablanca, Fès, Merzouga, Marrakech) a été la meilleure décision de notre séjour. Van Mercedes Vito impeccable, chauffeur Hassan très prudent et liberté totale.",
            author: "Rebecca & David S.",
            country: isEn ? "United States" : isEs ? "Estados Unidos" : "États-Unis",
            flag: "🇺🇸",
            date: "May 2026"
        },
        {
            quote: isEn
                ? "Unlike big tour buses where you are rushed through stops, having our own chauffeur for 8 days meant we could linger in Chefchaouen and arrive in the Sahara dunes right on time for sunset. Transparent flat pricing with zero surprise fees."
                : isEs
                ? "A diferencia de los autobuses turísticos donde todo va con prisas, tener nuestro chófer privado durante 8 días nos permitió disfrutar de Chefchaouen y llegar al desierto justo a tiempo para la puesta de sol. Precio 100% transparente."
                : "Contrairement aux circuits en grand bus où tout est chronométré, avoir notre chauffeur privé pendant 8 jours nous a permis de profiter de Chefchaouen et d'arriver au Sahara pile pour le coucher de soleil. Aucun frais caché.",
            author: "Thomas & Claire L.",
            country: isEn ? "United Kingdom" : isEs ? "Reino Unido" : "Royaume-Uni",
            flag: "🇬🇧",
            date: "April 2026"
        },
        {
            quote: isEn
                ? "Flawless service from start to finish. We took the 8-day northern Morocco route. Extremely comfortable car, punctual driver, polite and full of authentic local restaurant recommendations."
                : isEs
                ? "Servicio impecable de principio a fin en nuestra ruta de 8 días por el norte. Coche comodísimo, conductor puntual, muy amable y con excelentes recomendaciones locales."
                : "Service irréprochable de bout en bout sur notre circuit Nord 8 jours. Voiture très confortable, chauffeur ponctuel, courtois et plein de recommandations authentiques.",
            author: "Valérie & Marc M.",
            country: isEn ? "France" : isEs ? "Francia" : "France",
            flag: "🇫🇷",
            date: "March 2026"
        }
    ];

    const faqs = [
        {
            q: isEn 
                ? "Is the driver's accommodation and daily meals included in the flat rate?" 
                : isEs
                ? "¿Están incluidos el alojamiento y las comidas del conductor en el precio de 8 días?"
                : "L'hébergement et les repas du chauffeur sont-ils inclus dans le forfait 8 jours ?",
            a: isEn 
                ? "Yes, 100%! The driver's hotel accommodation, meals, and overnight allowances are fully covered in our flat-rate price. You never pay any extra lodging surcharge for your driver."
                : isEs
                ? "¡Sí, al 100%! El alojamiento del conductor, sus dietas y comidas están totalmente cubiertos en la tarifa plana. No tendrá que abonar ningún suplemento para el chófer."
                : "Oui, à 100% ! L'hébergement, les repas et les indemnités de vie du chauffeur sont intégralement inclus dans notre tarif forfaitaire fixe. Vous n'avez aucun supplément à régler pour le chauffeur."
        },
        {
            q: isEn 
                ? "Can we start in Casablanca and finish in Marrakech (or vice versa)?" 
                : isEs
                ? "¿Podemos empezar en Casablanca y terminar en Marrakech sin recargo?"
                : "Pouvons-nous commencer à Casablanca et terminer à Marrakech sans frais ?",
            a: isEn 
                ? "Yes! Multi-city pickups and drop-offs (e.g. pickup at Casablanca CMN and final drop-off at Marrakech RAK Airport or Tangier) are fully supported with zero intercity return fees."
                : isEs
                ? "¡Sí! Las salidas y llegadas en distintas ciudades (por ejemplo recogida en Casablanca y fin en Marrakech o Tánger) están incluidas sin ningún suplemento de retorno."
                : "Oui ! Les arrivées et départs dans des villes différentes (par exemple prise en charge à Casablanca CMN et départ à Marrakech RAK ou Tanger) sont inclus sans aucun frais de retour."
        },
        {
            q: isEn 
                ? "What mileage is included for the 8-day package?" 
                : isEs
                ? "¿Cuál es el kilometraje incluido en el paquete de 8 días?"
                : "Quel est le kilométrage inclus dans le forfait 8 jours ?",
            a: isEn
                ? "Our flat-rate 8-day package includes up to 1,600 kilometers total, which comfortably covers any classic Morocco touring loop (such as Casablanca → Chefchaouen → Fes → Merzouga Sahara → Dades → Marrakech). Detours within reasonable distance are seamlessly accommodated."
                : isEs
                ? "El paquete de 8 días incluye hasta 1.600 kilómetros en total, cubriendo con holgura cualquier gran circuito clásico por Marruecos sin costes adicionales."
                : "Notre forfait 8 jours inclut jusqu'à 1 600 kilomètres au total, ce qui couvre largement tous les grands circuits classiques marocains sans surcoût imprévu."
        },
        {
            q: isEn 
                ? "Do we book our own hotels and riads, or do you provide them?" 
                : isEs
                ? "¿Reservamos nuestros propios hoteles y riads o los gestionan ustedes?"
                : "Devons-nous réserver nos propres hôtels/riads ou les proposez-vous ?",
            a: isEn 
                ? "You maintain complete freedom to book your preferred hotels, Riads, and desert camps according to your budget and taste. We provide the dedicated car, driver, fuel, and tolls. If desired, we can gladly recommend our top vetted partner accommodations across Morocco."
                : isEs
                ? "Usted mantiene la libertad absoluta de elegir y reservar sus hoteles, riads y campamentos según sus preferencias y presupuesto. Si lo desea, podemos recomendarle nuestros alojamientos colaboradores favoritos."
                : "Vous gardez la liberté totale de réserver vos hébergements (hôtels, riads, bivouacs) selon vos envies et votre budget. Nous assurons le transport complet et pouvons vous recommander nos meilleures adresses partenaires."
        },
        {
            q: isEn 
                ? "What languages do your private drivers speak?" 
                : isEs
                ? "¿Qué idiomas hablan sus conductores privados?"
                : "Quelles langues parlent vos chauffeurs privés ?",
            a: isEn
                ? "All designated multi-day chauffeurs speak fluent English and French (and Spanish upon request). They are certified tourist transport professionals with deep knowledge of Morocco's roads, scenic viewpoints, and local culture."
                : isEs
                ? "Todos nuestros conductores profesionales dominan español, inglés y francés. Conocen en profundidad las carreteras, puertos de montaña y mejores paradas del país."
                : "Tous nos chauffeurs affectés aux circuits multi-jours parlent couramment français et anglais (et espagnol sur demande). Ce sont des professionnels certifiés du transport touristique."
        },
        {
            q: isEn 
                ? "How do we book and what are the payment terms?" 
                : isEs
                ? "¿Cómo reservamos y cuáles son las condiciones de pago?"
                : "Comment réserver et quelles sont les modalités de paiement ?",
            a: isEn
                ? "You can reserve directly through our online widget or contact our route coordinators on WhatsApp. No full upfront prepayment is required for standard bookings. You can pay your driver in cash (Euros or Dirhams) or request a credit card payment link."
                : isEs
                ? "Puede reservar en línea o contactarnos por WhatsApp. No se exige pago completo por adelantado. Puede abonar el importe a su conductor en efectivo (EUR o MAD) o pagar con tarjeta de crédito."
                : "Vous pouvez réserver directement via notre formulaire ou par WhatsApp. Aucun prépaiement intégral n'est exigé. Vous pouvez régler votre chauffeur en espèces (EUR ou MAD) ou par carte bancaire sécurisée."
        }
    ];

    // Structured SEO JSON-LD Schemas (Google Rich Snippets & TouristTrip Graph)
    const touristTripJsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": isEn ? "Morocco 8 Days Itinerary with Private Driver" : isEs ? "Circuito 8 Días en Marruecos con Chófer Privado" : "Circuit 8 Jours Maroc avec Chauffeur Privé",
        "description": text8Days.subtitle,
        "touristType": ["Families", "Couples", "Small Groups"],
        "offers": vehicles.map(v => ({
            "@type": "Offer",
            "name": v.name,
            "price": v.price.replace('€', '').replace(',', ''),
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": `https://mdinatours.com/${language}/car-with-driver-morocco-8-days`
        }))
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": ["Product", "TaxiService"],
        "name": isEn ? "8-Day Morocco Car with Driver Package" : isEs ? "Paquete 8 Días Coche con Chófer en Marruecos" : "Forfait 8 Jours Voiture avec Chauffeur au Maroc",
        "description": text8Days.subtitle,
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "url": `https://mdinatours.com/${language}/car-with-driver-morocco-8-days`,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
            "telephone": "+212724114775",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : isEs ? "Inicio" : "Accueil",
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Private Driver" : isEs ? "Chófer Privado" : "Chauffeur Privé",
                "item": `https://mdinatours.com/${language}/private-driver`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": isEn ? "Morocco 8 Days Itinerary with Driver" : isEs ? "Circuito 8 Días con Chófer Marruecos" : "Circuit 8 Jours Maroc avec Chauffeur",
                "item": `https://mdinatours.com/${language}/car-with-driver-morocco-8-days`
            }
        ]
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Header lightBg={true} />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                
                {/* Hero Banner */}
                <PageBanner 
                    title={text8Days.h1}
                    subtitle={text8Days.subtitle}
                    bgImage="/img/Morocco-trip-tour-hero01.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={text8Days.bannerLabel}
                />
                
                {/* Compact Social Proof Ratings Bar */}
                <div style={{ maxWidth: '1150px', margin: '35px auto 0 auto', padding: '0 20px' }}>
                    <TransferWebRatings isEn={isEn} isEs={isEs} />
                </div>

                {/* Selling Stage: 2-Column Hero Overview + Sticky Calculator */}
                <section id="booking" style={{ padding: '60px 20px 70px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '45px', alignItems: 'flex-start' }}>
                            
                            {/* Left Column: Clear Selling Narrative & Key Inclusions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                                <div>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                        {isEn ? "Tailored 8-Day Chauffeur" : isEs ? "Chófer Privado de 8 Días" : "Chauffeur Privé 8 Jours"}
                                    </span>
                                    <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px', textWrap: 'balance' }}>
                                        {text8Days.introTitle}
                                    </h2>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#475569', lineHeight: 1.65, fontSize: '0.98rem' }}>
                                    <p>{text8Days.introP1}</p>
                                    <p>{text8Days.introP2}</p>
                                </div>

                                {/* 4 Value Highlight Metrics */}
                                <div style={{ 
                                    padding: '22px', 
                                    backgroundColor: '#ffffff', 
                                    borderRadius: '16px', 
                                    border: '1px solid rgba(0, 0, 0, 0.06)', 
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '16px',
                                    textAlign: 'left'
                                }}>
                                    <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '12px' }}>
                                        <span style={{ display: 'block', fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>8 {isEn ? "Days" : isEs ? "Días" : "Jours"}</span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Full Standby Chauffeur" : isEs ? "Chófer a Disposición" : "Disposition Totale"}</span>
                                    </div>
                                    <div style={{ paddingLeft: '8px' }}>
                                        <span style={{ display: 'block', fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>100%</span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Driver Hotel & Meals Included" : isEs ? "Alojamiento Chófer Incluido" : "Hébergement Chauffeur Inclus"}</span>
                                    </div>
                                    <div style={{ borderRight: '1px solid #f1f5f9', borderTop: '1px solid #f1f5f9', paddingTop: '12px', paddingRight: '12px' }}>
                                        <span style={{ display: 'block', fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>1,600 km</span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Mileage Allowance Included" : isEs ? "Kilometraje Incluido" : "Kilométrage Inclus"}</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', paddingLeft: '8px' }}>
                                        <span style={{ display: 'block', fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>0€</span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 600 }}>{isEn ? "Zero Intercity Return Fees" : isEs ? "Sin Gastos de Retorno" : "Sans Frais de Retour"}</span>
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.88rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: 'var(--primary)' }}>💡</span>
                                    <span>
                                        {isEn ? "Prefer an all-inclusive guided tour?" : isEs ? "¿Prefiere un tour organizado?" : "Vous cherchez un circuit accompagné ?"}{" "}
                                        <Link href={getPath('/tours')} style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>
                                            {isEn ? "View Guided Tours" : isEs ? "Ver Tours Organizados" : "Voir nos Circuits Organisés"}
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            {/* Right Column: Instant Booking & Quote Calculator Widget */}
                            <div style={{ position: 'sticky', top: '90px', zIndex: 10 }}>
                                <PrivateDriverBookingWidget language={language} defaultCity="Casablanca" defaultDays={8} is8DaysPackage={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE 3 VALUE PILLARS (Minimalist Editorial Bento) */}
                <section style={{ padding: '70px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                {isEn ? "The Mdina Tours Difference" : isEs ? "Ventajas Mdina Tours" : "La Différence Mdina Tours"}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                                {isEn ? "Why an 8-Day Private Chauffeur is the Smartest Way to Experience Morocco" : isEs ? "¿Por Qué Recorrer Marruecos con Chófer Privado?" : "Pourquoi Choisir un Chauffeur Privé pour 8 Jours au Maroc"}
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                            {/* Card 1 */}
                            <div style={{
                                backgroundColor: 'var(--bg-color)',
                                borderRadius: '16px',
                                padding: '32px 28px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(220, 131, 78, 0.12)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Compass size={24} weight="bold" />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                    {isEn ? "Total Roadtrip Freedom" : isEs ? "Libertad Absoluta de Horarios" : "Liberté Totale d'Horaires"}
                                </h3>
                                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                                    {isEn 
                                        ? "No rushed schedules. Stop spontaneously for roadside mint tea, breathtaking Atlas valley viewpoints, or artisan pottery workshops whenever you want."
                                        : isEs
                                        ? "Sin prisas ni horarios impuestos. Haga paradas para tomar fotos del Atlas, tomar té en aldeas bereberes o visitar cooperativas artesanales a su ritmo."
                                        : "Aucun horaire imposé. Arrêtez-vous librement pour des panoramas grandioses dans l'Atlas, des dégustations de thé ou des visites artisanales selon vos envies."}
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div style={{
                                backgroundColor: 'var(--bg-color)',
                                borderRadius: '16px',
                                padding: '32px 28px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(220, 131, 78, 0.12)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ShieldCheck size={24} weight="bold" />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                    {isEn ? "Zero Surprise Surcharges" : isEs ? "Tarifa Plana Sin Sorpresas" : "Tarif Forfaitaire Garanti"}
                                </h3>
                                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                                    {isEn 
                                        ? "All fuel, highway tolls, city parking, and the chauffeur's hotel lodging & daily meals are 100% included in the upfront flat rate. No hidden expenses."
                                        : isEs
                                        ? "Combustible, peajes de autopista, parkings y el alojamiento/comidas del conductor están 100% cubiertos en el precio acordado."
                                        : "Carburant, péages d'autoroute, parkings et hébergement/repas du chauffeur sont 100% inclus dans le tarif fixé à l'avance. Zéro mauvaise surprise."}
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div style={{
                                backgroundColor: 'var(--bg-color)',
                                borderRadius: '16px',
                                padding: '32px 28px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                <div style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(220, 131, 78, 0.12)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <CarProfile size={24} weight="bold" />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                    {isEn ? "Mountain Safety & Medina Access" : isEs ? "Seguridad en Montaña y Acceso a Riads" : "Sécurité Montagne & Accès Riads"}
                                </h3>
                                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                                    {isEn 
                                        ? "Licensed professional drivers who know every mountain switchback, coordinate pedestrian medina riad drop-offs, and handle heavy luggage with care."
                                        : isEs
                                        ? "Conductores profesionales con licencia que dominan las carreteras del Atlas, coordinan la llegada a los riads peatonales y le ayudan con el equipaje."
                                        : "Chauffeurs agréés expérimentés maîtrisant parfaitement les cols du Haut Atlas, l'accès aux riads en médina piétonne et la prise en charge des bagages."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* INTERACTIVE 8-DAY ITINERARY SELECTOR (Remodeled Visual & Editorial Layout) */}
                <Morocco8DaysItinerarySelector lang={language} />

                {/* OUR FLEET */}
                <PrivateDriverFleet vehicles={vehicles} lang={language} />

                {/* INCLUSIONS VS PERSONALIZATION (High Clarity 2-Column Grid) */}
                <section style={{ padding: '80px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                {isEn ? "Complete Transparency" : isEs ? "Total Transparencia" : "Transparence Totale"}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                                {isEn ? "What's Covered in Your 8-Day Package" : isEs ? "¿Qué Incluye su Paquete de 8 Días?" : "Ce qui est Inclus dans votre Forfait 8 Jours"}
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            {/* Column 1: Included */}
                            <div style={{
                                backgroundColor: 'var(--bg-color)',
                                borderRadius: '16px',
                                padding: '30px',
                                border: '1px solid rgba(220, 131, 78, 0.25)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                        color: '#10b981',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800
                                    }}>
                                        ✓
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)', margin: 0 }}>
                                        {isEn ? "100% Included in Flat Rate" : isEs ? "100% Incluido en la Tarifa Plana" : "100% Inclus dans le Forfait"}
                                    </h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        isEn ? "Private air-conditioned vehicle assigned exclusively to your group" : isEs ? "Vehículo privado con A/C exclusivo para su grupo" : "Véhicule privé climatisé exclusif pour votre groupe",
                                        isEn ? "Licensed, English & French-speaking local chauffeur for all 8 days" : isEs ? "Chófer profesional con idiomas a su disposición los 8 días" : "Chauffeur professionnel bilingue à disposition 8 jours",
                                        isEn ? "All vehicle fuel, highway tolls, and municipal parking fees" : isEs ? "Todo el combustible, peajes de autopista y parkings" : "Tout le carburant, péages d'autoroute et parkings",
                                        isEn ? "Driver lodging, daily meals, and overnight boarding allowances" : isEs ? "Alojamiento, dietas y comidas del conductor" : "Hébergement, repas et frais de vie du chauffeur",
                                        isEn ? "Up to 1,600 km total mileage allowance" : isEs ? "Hasta 1.600 km de kilometraje total incluido" : "Jusqu'à 1 600 km de trajet inclus",
                                        isEn ? "Door-to-door luggage assistance and riad pickup coordination" : isEs ? "Ayuda con el equipaje y acceso directo a riads" : "Assistance bagages et coordination accès riads",
                                        isEn ? "Free cancellation with 24h notice" : isEs ? "Cancelación gratuita con 24h de aviso" : "Annulation gratuite avec préavis de 24h"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                                            <span style={{ color: '#10b981', fontWeight: 800, flexShrink: 0 }}>✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Column 2: Customized by You */}
                            <div style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                padding: '30px',
                                border: '1px solid rgba(0,0,0,0.08)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(220, 131, 78, 0.12)',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800
                                    }}>
                                        ✍️
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)', margin: 0 }}>
                                        {isEn ? "Customized Freely by You" : isEs ? "Personalizado Libremente por Usted" : "Personnalisé Librement par Vous"}
                                    </h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        isEn ? "Your choice of Hotels & Riads (Boutique, authentic riad, or 5★ luxury)" : isEs ? "Sus hoteles y riads elegidos (económicos, con encanto o de lujo)" : "Vos hébergements au choix (riads authentiques ou hôtels 5★)",
                                        isEn ? "Sahara Desert Camp category (Standard or VIP luxury glamping)" : isEs ? "Tipo de campamento en el desierto (Estándar o Glamping de Lujo)" : "Type de bivouac au désert (Authentique ou Glamping VIP)",
                                        isEn ? "Personal meals, drinks, and restaurant dining choices" : isEs ? "Comidas, bebidas y restaurantes según sus gustos" : "Vos repas personnels et restaurants au fil des étapes",
                                        isEn ? "Monuments & historical museum entry tickets" : isEs ? "Entradas a museos y monumentos históricos" : "Billets d'entrée aux monuments et musées",
                                        isEn ? "Official local city guides (available on request in Fes/Marrakech)" : isEs ? "Guías oficiales de medina (opcionales bajo petición en Fez/Marrakech)" : "Guides officiels de médina (en option sur demande)"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: 800, flexShrink: 0 }}>•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SIMPLE 4-STEP PROCESS (HOW IT WORKS) */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                {isEn ? "Simple Process" : isEs ? "Proceso Sencillo" : "Processus Simple"}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.howItWorksTitle}
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px' }}>
                            {[
                                { title: text8Days.step1Title, desc: text8Days.step1Desc },
                                { title: text8Days.step2Title, desc: text8Days.step2Desc },
                                { title: text8Days.step3Title, desc: text8Days.step3Desc },
                                { title: text8Days.step4Title, desc: text8Days.step4Desc }
                            ].map((step, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    padding: '28px 24px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(220, 131, 78, 0.1)',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        marginBottom: '18px'
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{step.title}</h3>
                                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* VERIFIED TRAVELER REVIEWS (Editorial Luxury Cards) */}
                <section style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
                    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                {isEn ? "Traveler Feedback" : isEs ? "Testimonios Reales" : "Avis Voyageurs"}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.reviewsTitle}
                            </h2>
                            <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.98rem' }}>{text8Days.reviewsSubtitle}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                            {reviews.map((rev, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: 'var(--bg-color)',
                                    borderRadius: '16px',
                                    padding: '28px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <div style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '12px' }}>★★★★★</div>
                                        <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 18px 0' }}>
                                            "{rev.quote}"
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '14px', fontSize: '0.82rem', color: '#64748b' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{rev.author}</span>
                                        <span>•</span>
                                        <span>{rev.flag} {rev.country}</span>
                                        <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>{rev.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION (Clean & Crisp Accordion) */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)' }}>
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                {isEn ? "Common Inquiries" : isEs ? "Dudas Habituales" : "Questions Fréquentes"}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                                {text8Days.faqTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    borderRadius: '14px',
                                    overflow: 'hidden'
                                }}>
                                    <summary style={{
                                        padding: '18px 22px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        color: 'var(--secondary)',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '14px'
                                    }}>
                                        <span>{faq.q}</span>
                                        <span style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 800 }}>+</span>
                                    </summary>
                                    <div style={{ padding: '0 22px 18px 22px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CHAUFFEUR DESTINATIONS GRID */}
                <ChauffeurDestinations lang={language} pageType="8-days" upperBgColor="#fcf9f6" />

                {/* INTERNAL LINKING FOOTER BAR */}
                <section style={{ backgroundColor: '#ffffff', padding: '22px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', fontSize: '0.88rem', color: '#64748b', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>👉 {isEn ? "Related Services:" : isEs ? "Servicios Relacionados:" : "Services Connexes :"}</span>
                        <Link href={getPath('/private-driver-morocco')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                            {isEn ? "Morocco Private Chauffeur" : isEs ? "Chófer Privado Marruecos" : "Chauffeur Privé Maroc"}
                        </Link>
                        <span>|</span>
                        <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                            {isEn ? "Casablanca Chauffeur" : isEs ? "Chófer en Casablanca" : "Chauffeur Casablanca"}
                        </Link>
                        <span>|</span>
                        <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                            {isEn ? "Marrakech Chauffeur" : isEs ? "Chófer en Marrakech" : "Chauffeur Marrakech"}
                        </Link>
                        <span>|</span>
                        <Link href={getPath('/private-driver-tangier')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                            {isEn ? "Tangier Chauffeur" : isEs ? "Chófer en Tánger" : "Chauffeur Tanger"}
                        </Link>
                        <span>|</span>
                        <Link href={getPath('/tours')} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                            {isEn ? "All Morocco Tours" : isEs ? "Todos los Tours en Marruecos" : "Tous les Circuits Maroc"}
                        </Link>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

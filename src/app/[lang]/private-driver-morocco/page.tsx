import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import VideoPlayer from '@/components/VideoPlayer';
import { Metadata } from 'next';
import { Language, translations } from '@/lib/translations';
import Link from 'next/link';
import faqStyles from '@/components/FAQ.module.css';
import PrivateDriverBookingWidget from '@/components/PrivateDriverBookingWidget';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import PrivateDriverHeroGallery from '@/components/PrivateDriverHeroGallery';
import PrivateDriverMetaSection from '@/components/PrivateDriverMetaSection';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import PrivateDriverInclusions from '@/components/PrivateDriverInclusions';
import ChauffeurDestinations from '@/components/ChauffeurDestinations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    
    let title = 'Private Driver Morocco – Professional Chauffeur Service | Mdina Tours';
    let description = 'Hire a professional private driver in Morocco for flexible city travel, day trips, and custom multi-day tours. Transparent daily rates and experienced local drivers.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Chauffeur Privé Maroc – Service de Transport Professionnel | Mdina Tours';
        description = 'Louez un véhicule avec chauffeur privé au Maroc pour vos déplacements urbains, excursions et circuits sur mesure. Tarifs clairs et chauffeurs expérimentés.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Conductor Privado en Marruecos – Coche con Chófer | Mdina Tours';
        description = 'Alquiler de vehículo con conductor privado en Marruecos para traslados, excursiones y rutas personalizadas. Precios transparentes y conductores profesionales.';
        ogLocale = 'es_ES';
    }

    const url = `https://mdinatours.com/${lang}/private-driver-morocco`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/private-driver-morocco'),
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
                    alt: 'Private Driver Morocco Mdina Tours',
                },
            ],
            locale: ogLocale,
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

export default async function PrivateDriverMoroccoPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
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

    const textMorocco = {
        h1: isEn 
            ? "Private Driver in Morocco" 
            : (isEs ? "Conductor Privado en Marruecos" : "Chauffeur Privé au Maroc"),
        subtitle: isEn 
            ? "Hourly, full-day, and multi-day private transportation with a professional driver across Morocco. Transparent pricing with flexible stops."
            : (isEs 
                ? "Transporte privado por horas, día completo o varios días con conductor profesional en Marruecos. Tarifas claras y paradas flexibles." 
                : "Transport privé à l'heure, à la journée ou sur plusieurs jours avec chauffeur professionnel au Maroc. Tarifs transparents et arrêts libres."),
        bannerLabel: isEn ? "Private Driver Morocco" : (isEs ? "Conductor Privado Marruecos" : "Chauffeur Privé Maroc"),
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver service in Morocco."
            : (isEs ? "Hola Mdina Tours, deseo reservar un conductor privado en Marruecos." : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé au Maroc."),
        introTitle: isEn 
            ? "Morocco Private Driver Network" 
            : (isEs ? "Servicio de Conductor Privado en Marruecos" : "Réseau de Chauffeurs Privés au Maroc"),
        introP1: isEn
            ? "Exploring Morocco's imperial cities, Atlas mountains, coastal towns, and desert regions is best enjoyed at your own pace. Our private driver service provides a modern vehicle with a professional local driver dedicated to your schedule."
            : (isEs 
                ? "Recorrer las ciudades imperiales, las montañas del Atlas, la costa y el desierto se disfruta mejor a su propio ritmo. Nuestro servicio le ofrece un vehículo moderno con conductor profesional dedicado a su itinerario."
                : "Découvrir les médinas impériales, les routes de l'Atlas, les villes côtières et le désert se fait au mieux à votre rythme. Notre service met à votre disposition un véhicule récent avec un chauffeur professionnel dédié."),
        introP2: isEn
            ? "Unlike rigid group tours, you set the departure times, request photo stops, and enjoy flexible meals along the way. Your driver assists with luggage, navigates regional roads safely, and provides practical local recommendations."
            : (isEs 
                ? "A diferencia de las excursiones rígidas en grupo, usted elige las horas de salida, paradas fotográficas y almuerzos en el camino. Su conductor le ayuda con el equipaje y cuida de su seguridad en carretera."
                : "Contrairement aux circuits figés, vous fixez les horaires, profitez d'arrêts photos et déjeunez selon vos envies. Votre chauffeur vous aide avec les bagages et assure une conduite sereine sur toutes les routes."),
        regionalHubsTitle: isEn ? "Our Regional Service Hubs" : (isEs ? "Nuestras Bases Principales" : "Nos Centres de Service Régionaux"),
        regionalHubsDesc: isEn 
            ? "We provide experienced local drivers and comfortable vehicles across Morocco's primary destinations:"
            : (isEs ? "Disponemos de conductores profesionales y vehículos cómodos en los principales destinos de Marruecos:" : "Nous mettons à disposition des chauffeurs professionnels et des véhicules récents dans les principales villes du Maroc :"),
        howItWorksTitle: isEn ? "How the Private Driver Service Works" : (isEs ? "Cómo Funciona el Servicio de Conductor Privado" : "Comment fonctionne le service chauffeur privé"),
        step1Title: isEn ? "1. Select Vehicle & Start Point" : (isEs ? "1. Elija Vehículo y Punto de Salida" : "1. Choisissez le véhicule et le départ"),
        step1Desc: isEn 
            ? "Choose your starting city (Casablanca, Marrakech, Tangier, Rabat, Fes) and select a vehicle suited to your group size and luggage."
            : (isEs ? "Seleccione su ciudad de inicio (Casablanca, Marrakech, Tánger, Rabat, Fez) y el vehículo adecuado para su grupo y equipaje." : "Sélectionnez votre ville de départ (Casablanca, Marrakech, Tanger, Rabat, Fès) et choisissez le véhicule adapté à votre groupe et bagages."),
        step2Title: isEn ? "2. Share Your Planned Route" : (isEs ? "2. Indique su Itinerario Previsto" : "2. Indiquez votre itinéraire prévu"),
        step2Desc: isEn 
            ? "Share your desired stops for a day trip or full multi-day itinerary so we can provide a complete, transparent quotation upfront."
            : (isEs ? "Indique sus paradas deseadas para una excursión o ruta de varios días para recibir un presupuesto cerrado sin sorpresas." : "Indiquez vos étapes pour une journée ou un circuit complet afin de recevoir un tarif clair et convenu à l'avance."),
        step3Title: isEn ? "3. Professional Driver Briefed" : (isEs ? "3. Conductor Profesional Asignado" : "3. Votre chauffeur est briefé"),
        step3Desc: isEn 
            ? "A licensed, English or French-speaking driver is assigned to your journey, coordinating pickup and luggage assistance."
            : (isEs ? "Se le asigna un conductor profesional con idiomas que coordinará su recogida y asistencia con el equipaje." : "Un chauffeur agréé bilingue vous est attribué, assurant votre prise en charge et l'aide aux bagages."),
        step4Title: isEn ? "4. Travel with Complete Flexibility" : (isEs ? "4. Viaje con Total Flexibilidad" : "4. Voyagez en toute flexibilité"),
        step4Desc: isEn 
            ? "Enjoy your journey with flexible stops for coffee, photos, and meals. Pay conveniently after each travel day."
            : (isEs ? "Disfrute de su viaje con paradas para café, fotos y comida. Abone cómodamente al final de cada día." : "Profitez de votre trajet avec des arrêts libres pour photos et repas. Réglez simplement en fin de journée."),
        useCasesTitle: isEn ? "Popular Morocco Private Driver Itineraries" : (isEs ? "Rutas Populares con Conductor en Marruecos" : "Exemples d'itinéraires populaires au Maroc"),
        pricingTitle: isEn ? "Morocco Private Driver Pricing Guide" : (isEs ? "Orientación de Tarifas de Conductor Privado" : "Grille tarifaire - Chauffeur au Maroc"),
        pricingSubtitle: isEn 
            ? "Transparent rates with fuel, tolls, and operating expenses included for agreed routes. Pay after each travel day in cash or card."
            : (isEs ? "Precios transparentes con combustible, peajes y gastos incluidos para la ruta acordada. Pago al final de cada día en efectivo o tarjeta." : "Tarifs clairs incluant carburant, péages et frais pour l'itinéraire convenu. Paiement en fin de journée en espèces ou carte."),
        reviewsTitle: isEn ? "What Travelers Say About Our Service" : (isEs ? "Opiniones de Viajeros sobre Nuestro Servicio" : "Avis de nos voyageurs sur notre service"),
        reviewsSubtitle: isEn 
            ? "Verified feedback from travelers who explored Morocco with our private drivers."
            : (isEs ? "Comentarios verificados de viajeros que han recorrido Marruecos con nuestros conductores." : "Retours d'expérience de voyageurs ayant visité le Maroc avec nos chauffeurs privés."),
        finalCtaTitle: isEn ? "Book Your Private Driver in Morocco" : (isEs ? "Reserve su Conductor Privado en Marruecos" : "Réservez votre Chauffeur Privé au Maroc"),
        finalCtaSubtitle: isEn 
            ? "Ready to travel Morocco comfortably with a dedicated driver? Contact us on WhatsApp for a quick, transparent quote!"
            : (isEs ? "¿Desea recorrer Marruecos con conductor privado? Escríbanos por WhatsApp para recibir un presupuesto rápido y transparente." : "Prêt à voyager au Maroc avec un chauffeur dédié ? Écrivez-nous sur WhatsApp pour un devis rapide et clair !"),
        faqTitle: isEn ? "Frequently Asked Questions" : (isEs ? "Preguntas Frecuentes" : "Questions Fréquentes")
    };

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn 
                ? "Comfortable sedan for 1–2 passengers with luggage, ideal for city travel and business trips."
                : "Berline confortable pour 1 à 2 passagers avec bagages, idéale pour les déplacements urbains et professionnels.",
            price: "€25",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn 
                ? "Spacious SUV with higher clearance, well suited for 1–3 passengers on regional routes."
                : "SUV spacieux avec garde au sol surélevée, adapté pour 1 à 3 passagers sur les routes régionales.",
            price: "€25",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn 
                ? "Spacious van for families and small groups with generous luggage capacity."
                : "Van spacieux pour familles et petits groupes avec une grande capacité de bagages.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn 
                ? "Spacious cabin with extra luggage capacity, recommended for groups and longer multi-day journeys."
                : "Cabine spacieuse avec grand coffre à bagages, recommandée pour les groupes et les circuits sur plusieurs jours.",
            price: "€35",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn 
                ? "Executive minibus configured for large tour groups, corporate delegations, and extended family travel."
                : "Minibus de prestige configuré pour les grands groupes, délégations d'affaires et voyages en famille.",
            price: "€50",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const itineraries = [
        {
            title: isEn ? "Airport & Intercity Transfers" : (isEs ? "Traslados de Aeropuerto e Interurbanos" : "Transferts Aéroport & Interurbains"),
            desc: isEn 
                ? "Direct, comfortable transportation between Casablanca, Rabat, Marrakech, Tangier, and Fes."
                : (isEs ? "Transporte directo y cómodo entre Casablanca, Rabat, Marrakech, Tánger y Fez." : "Liaisons confortables entre Casablanca, Rabat, Marrakech, Tanger et Fès."),
            price: isEn ? "From €45" : (isEs ? "Desde 45 €" : "À partir de 45 €"),
            cta: isEn ? "View Transfers" : (isEs ? "Ver Traslados" : "Voir les transferts"),
            image: "/img2/vito-aeroport.jpg",
            href: language === 'es' ? "/airport-transfers" : "/transfers",
        },
        {
            title: isEn ? "Excursion to Chefchaouen" : (isEs ? "Excursión a Chefchaouen" : "Excursion à Chefchaouen"),
            desc: isEn 
                ? "Explore Chefchaouen and the Rif Mountains at your own pace with a dedicated private vehicle."
                : (isEs ? "Visite Chefchaouen y el Rif a su propio ritmo con un vehículo privado dedicado." : "Visite de Chefchaouen et du Rif à votre rythme avec un véhicule dédié."),
            price: isEn ? "From €249" : (isEs ? "Desde 249 €" : "À partir de 249 €"),
            cta: isEn ? "View Tour" : (isEs ? "Ver Excursión" : "Voir l'excursion"),
            image: "/hero-chefchaouen.webp",
            href: "/tours/chefchaouen-day-trip",
        },
        {
            title: isEn ? "VIP & Corporate Travel" : (isEs ? "Viajes VIP y Corporativos" : "Voyages VIP & Affaires"),
            desc: isEn 
                ? "Executive pickups, business meetings, and roadshows with punctual, well-presented drivers."
                : (isEs ? "Traslados ejecutivos, congresos y reuniones de negocios con conductores puntuales y profesionales." : "Déplacements d'affaires, réunions et événements avec des chauffeurs ponctuels et discrets."),
            price: isEn ? "Custom quote" : (isEs ? "Solicitar presupuesto" : "Devis personnalisé"),
            cta: isEn ? "Get a quote" : (isEs ? "Solicitar presupuesto" : "Demander un devis"),
            image: "/img2/premium-chauffeur.jpg",
            msg: isEs ? "Hola Mdina Tours, deseo solicitar presupuesto para un viaje corporativo o VIP." : "Hello Mdina Tours, I would like to get a quote for VIP & Corporate Travel."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our driver was waiting at arrivals with a clear name sign. Clean car, cold water, and smooth navigation through Casablanca. <strong style={{ fontWeight: 800 }}>Punctual and professional.</strong></>
            ) : (isEs ? (
                <>El conductor nos esperaba en llegadas con un cartel claro. Coche limpio, agua fresca y conducción impecable por Casablanca. <strong style={{ fontWeight: 800 }}>Puntual y muy profesional.</strong></>
            ) : (
                <>Notre chauffeur nous attendait aux arrivées avec une pancarte claire. Voiture impeccable, eau fraîche et trajet fluide à Casablanca. <strong style={{ fontWeight: 800 }}>Punctuel et professionnel.</strong></>
            )),
            author: "Sophie R.",
            flag: "🇫🇷"
        },
        {
            quote: isEn ? (
                <>Flight was delayed by 2 hours. I messaged on WhatsApp and they confirmed they were tracking the flight at no extra charge. <strong style={{ fontWeight: 800 }}>Excellent communication.</strong></>
            ) : (isEs ? (
                <>El vuelo se retrasó 2 horas. Avisé por WhatsApp y confirmaron el seguimiento sin coste adicional. <strong style={{ fontWeight: 800 }}>Comunicación excelente.</strong></>
            ) : (
                <>Vol retardé de 2 heures. J&apos;ai prévenu sur WhatsApp et ils ont suivi le vol sans aucun supplément. <strong style={{ fontWeight: 800 }}>Excellente communication.</strong></>
            )),
            author: "James K.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>Booked a full-day trip to Chefchaouen for 4 people. The driver drove carefully through the mountain roads and gave us great lunch recommendations. <strong style={{ fontWeight: 800 }}>A wonderful day.</strong></>
            ) : (isEs ? (
                <>Reservamos una excursión de un día a Chefchaouen para 4 personas. Conducción muy segura en montaña y buenas recomendaciones para comer. <strong style={{ fontWeight: 800 }}>Un gran día.</strong></>
            ) : (
                <>Excursion d&apos;une journée à Chefchaouen pour 4 personnes. Conduite très sûre dans la montagne et excellents conseils de restaurants. <strong style={{ fontWeight: 800 }}>Très belle journée.</strong></>
            )),
            author: "Laila M.",
            flag: "🇩🇪"
        },
        {
            quote: isEn ? (
                <>Used the private driver for 3 days in Marrakech and Rabat for corporate meetings. <strong style={{ fontWeight: 800 }}>Punctual at every stop</strong>, pristine Mercedes Vito, and very polite driver.</>
            ) : (isEs ? (
                <>Contratamos conductor 3 días en Marrakech y Rabat para reuniones de trabajo. <strong style={{ fontWeight: 800 }}>Puntualidad total</strong>, vehículo impecable y trato educado.</>
            ) : (
                <>Chauffeur privé pendant 3 jours à Marrakech et Rabat pour des rendez-vous pro. <strong style={{ fontWeight: 800 }}>Ponctualité irréprochable</strong>, van Mercedes Vito propre et chauffeur discret.</>
            )),
            author: "David W.",
            flag: "🇺🇸"
        },
        {
            quote: isEn ? (
                <>Our driver took us through the Atlas Mountains. He was courteous, attentive, and <strong style={{ fontWeight: 800 }}>drove very safely on mountain passes</strong>. Clean and comfortable SUV.</>
            ) : (isEs ? (
                <>El conductor nos llevó por el Atlas. Muy atento, educado y con una <strong style={{ fontWeight: 800 }}>conducción muy segura en curvas</strong>. SUV limpio y confortable.</>
            ) : (
                <>Trajet dans les montagnes de l&apos;Atlas. Chauffeur courtois, attentionné et <strong style={{ fontWeight: 800 }}>conduite très prudente sur les cols</strong>. SUV propre et confortable.</>
            )),
            author: "Elena P.",
            flag: "🇪🇸"
        },
        {
            quote: isEn ? (
                <>Having a driver on standby made our family vacation relaxing. The driver helped with luggage at each stop and accommodated our children&apos;s schedule. <strong style={{ fontWeight: 800 }}>Stress-free travel.</strong></>
            ) : (isEs ? (
                <>Tener un conductor a disposición hizo el viaje familiar muy tranquilo. Nos ayudó con el equipaje y se adaptó a los niños. <strong style={{ fontWeight: 800 }}>Total tranquilidad.</strong></>
            ) : (
                <>Voyage en famille très reposant. Le chauffeur nous a aidés avec les bagages et s&apos;est adapté à notre rythme. <strong style={{ fontWeight: 800 }}>Voyage sans stress.</strong></>
            )),
            author: "Marc-Antoine L.",
            flag: "🇨🇦"
        }
    ];

    const faqs = [
        {
            q: isEn 
                ? "What is a private driver service in Morocco?" 
                : (isEs ? "¿En qué consiste el servicio de conductor privado en Marruecos?" : "Qu'est-ce qu'un service de chauffeur privé au Maroc ?"),
            a: isEn 
                ? "A private driver service provides a modern vehicle and dedicated professional driver exclusively for your schedule. You travel at your own pace with flexibility for photo stops, coffee, meals, and comfort breaks. Your driver manages all road travel, route navigation, and luggage assistance."
                : (isEs 
                    ? "Es el alquiler de un vehículo con conductor profesional dedicado exclusivamente a su itinerario. Viaja a su propio ritmo con libertad para paradas de fotos, café y comidas. Su chófer se encarga de la conducción segura y la asistencia de equipaje."
                    : "La formule chauffeur privé met à votre disposition un véhicule récent avec chauffeur professionnel dédié à votre programme. Vous voyagez à votre rythme avec des arrêts libres pour photos et repas. Votre chauffeur assure une conduite sereine et l'aide aux bagages.")
        },
        {
            q: isEn 
                ? "Is my driver also a tour guide?" 
                : (isEs ? "¿El conductor es también un guía turístico oficial?" : "Mon chauffeur est-il également guide touristique ?"),
            a: isEn 
                ? "Your driver's primary role is private transportation, road safety, and travel logistics. Drivers are happy to share practical local recommendations and suggest scenic stops along the way. If you would like a licensed historical guide for monument or medina walking tours, we can arrange one separately upon request."
                : (isEs 
                    ? "La función principal del conductor es el transporte privado seguro y la logística en carretera. Su chófer le orientará con gusto con consejos prácticos y paradas escénicas. Si desea un guía oficial autorizado para visitas a monumentos o paseos por la medina, podemos gestionarlo por separado bajo petición."
                    : "Le rôle principal de votre chauffeur est d'assurer un transport privé sécurisé et ponctuel. Il partage volontiers ses recommandations pratiques et arrêts panoramiques. Si vous désirez un guide officiel agréé pour les visites de monuments ou de médinas, nous pouvons le réserver séparément sur demande.")
        },
        {
            q: isEn 
                ? "What factors affect a custom multi-day quote?" 
                : (isEs ? "¿Qué factores influyen en el presupuesto de varios días?" : "Quels facteurs influencent le tarif d'un circuit multi-jours ?"),
            a: isEn 
                ? "Custom pricing depends on your travel dates, total driving distance/route, vehicle category (sedan, SUV, VIP van, or minibus), number of travel days, group size, and luggage volume. All agreed quotes include fuel, tolls, and driver operating expenses with zero hidden fees."
                : (isEs 
                    ? "El precio personalizado depende de las fechas de viaje, distancia y ruta total, categoría del vehículo (berlina, SUV, van VIP o minibús), días de viaje, tamaño del grupo y volumen de equipaje. Todos los presupuestos acordados incluyen combustible, peajes y gastos del conductor."
                    : "Le tarif sur mesure dépend de vos dates, de l'itinéraire et kilométrage, de la catégorie du véhicule (berline, SUV, van VIP ou minibus), du nombre de jours de voyage et du volume de bagages. Le tarif convenu inclut carburant, péages et frais de route du chauffeur sans frais cachés.")
        },
        {
            q: isEn 
                ? "How do medina riad pickups and drop-offs work?" 
                : (isEs ? "¿Cómo se realizan las recogidas en riads dentro de la medina?" : "Comment se passent les prises en charge aux riads dans les médinas ?"),
            a: isEn 
                ? "Many riads inside Moroccan medinas cannot be reached directly by car due to pedestrian-only alleys. In these situations, your driver will get as close as reasonably possible using the nearest vehicle-accessible point and assist you with your luggage."
                : (isEs 
                    ? "Muchos riads en las medinas marroquíes están en callejones peatonales no accesibles en coche. En estos casos, su conductor le acercará al punto accesible más próximo y le ayudará con el equipaje."
                    : "Certains riads au cœur des médinas ne sont pas accessibles directement en voiture. Dans ce cas, votre chauffeur vous dépose au point carrossable le plus proche et vous aide avec vos bagages.")
        },
        {
            q: isEn 
                ? "What is included in quoted transportation pricing?" 
                : (isEs ? "¿Están incluidos el combustible, peajes y gastos de viaje?" : "Le carburant, les péages et les frais de route sont-ils inclus ?"),
            a: isEn 
                ? "Yes. For your agreed itinerary, all standard operating expenses—including vehicle, dedicated driver, fuel, highway tolls, normal parking fees, and driver lodging/meals on multi-day journeys—are fully included in your quotation. Major route changes may affect the quote."
                : (isEs 
                    ? "Sí. Para la ruta acordada, todos los costes operativos habituales —vehículo, chófer, combustible, peajes de autopista, aparcamientos y alojamiento/dietas del conductor en rutas de varios días— están incluidos en el presupuesto acordado. Modificaciones importantes de ruta pueden ajustar la tarifa."
                    : "Oui. Pour l'itinéraire convenu, tous les frais opérationnels — véhicule, chauffeur dédié, carburant, péages d'autoroute, parkings et hébergement/repas du chauffeur sur plusieurs jours — sont intégralement inclus dans le tarif sans frais cachés. Des modifications majeures d'itinéraire peuvent ajuster le tarif.")
        },
        {
            q: isEn 
                ? "Can I make stops or adjust the route during the journey?" 
                : (isEs ? "¿Puedo hacer paradas o modificar el recorrido durante el día?" : "Puis-je faire des arrêts ou ajustements d'itinéraire en cours de route ?"),
            a: isEn 
                ? "Yes. For city travel and day trips, you can freely request stops for photos, coffee, lunch, or comfort breaks. For significant route modifications involving additional cities or longer driving distances, we will clearly communicate any adjusted rate in advance."
                : (isEs 
                    ? "Sí. En excursiones y servicios locales puede solicitar paradas para fotos, café, comidas o descanso. Si solicita cambios importantes de ruta o ciudades adicionales que aumenten el kilometraje, se le informará previamente de cualquier ajuste de tarifa."
                    : "Oui. Pour les trajets locaux et excursions, vous pouvez demander des arrêts photos, café, déjeuner ou repos. Si vous demandez des changements majeurs impliquant des villes supplémentaires ou une distance accrue, un ajustement tarifaire sera communiqué en amont.")
        },
        {
            q: isEn 
                ? "How and when do I pay for the service?" 
                : (isEs ? "¿Cómo y cuándo se realiza el pago del servicio?" : "Comment et quand s'effectue le paiement ?"),
            a: isEn 
                ? "Payment is made after each travel day in cash or card in EUR, USD, or Moroccan Dirhams (MAD). You will know your exact agreed rate before the service begins with zero advance deposit."
                : (isEs 
                    ? "El pago se realiza al final de cada jornada de viaje. Aceptamos efectivo o tarjeta en EUR, USD o Dirhams marroquíes (MAD). Conocerá su tarifa acordada antes de comenzar el servicio sin necesidad de prepago."
                    : "Le paiement s'effectue à la fin de chaque journée de voyage. Nous acceptons les espèces ou la carte en EUR, USD ou Dirhams marocains (MAD). Le tarif convenu est connu avant le début de la prestation, sans acompte préalable.")
        }
    ];

    const taxiServiceJsonLd = {
        "@context": "https://schema.org",
        "@type": ["Product", "TaxiService"],
        "name": isEn ? "Private Chauffeur & Dispo Driver Service Morocco" : (isEs ? "Servicio de Conductor Privado y Chófer en Marruecos" : "Service de Chauffeur Privé et Disposition Maroc"),
        "description": textMorocco.subtitle,
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "url": `https://mdinatours.com/${language}/private-driver-morocco`,
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
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Morocco"
        },
        "offers": vehicles.map(v => ({
            "@type": "Offer",
            "name": v.name,
            "priceCurrency": "EUR",
            "price": v.price.replace("€", ""),
            "availability": "https://schema.org/InStock"
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
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Private Driver in Morocco" : (isEs ? "Conductor Privado en Marruecos" : "Chauffeur Privé au Maroc"),
                "item": `https://mdinatours.com/${language}/private-driver-morocco`
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceJsonLd) }}
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
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
                {/* Top Breadcrumb & Title */}
                <div className="breadcrumbs-title-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 20px 20px' }}>
                    <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                        <Link href={getPath('/')} style={{ color: '#666', transition: 'color 0.2s' }}>{t('home')}</Link>
                        <span style={{ color: '#ccc' }}>›</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{textMorocco.bannerLabel}</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2',
                        fontFamily: "var(--font-poppins), sans-serif",
                    }}>
                        {textMorocco.h1}
                    </h1>

                    {/* Concise Subheadline */}
                    <p style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.075rem)',
                        color: '#475569',
                        margin: '0 0 16px 0',
                        lineHeight: '1.55',
                        maxWidth: '850px'
                    }}>
                        {textMorocco.subtitle}
                    </p>

                    {/* Ratings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '1.1rem' }}>
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500, textDecoration: 'underline' }}>
                            120 {isEn ? "reviews" : (isEs ? "opiniones" : "avis")}
                        </span>
                    </div>

                    {/* Excellence Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ backgroundColor: '#fef3c7', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#d97706', fontSize: '0.8rem' }}>🏆</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>
                            {isEn ? "Badge of Excellence" : (isEs ? "Distintivo de Excelencia" : "Badge d'Excellence")}
                        </span>
                    </div>

                    {/* Operational Trust Badges Row */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.8rem', marginBottom: '14px' }}>
                        <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#EDF3EC', border: '1px solid #CDE1CC', padding: '5px 10px', borderRadius: '6px', color: '#255D28', fontWeight: 600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{isEn ? "Pay after each travel day · Cash or Card" : (isEs ? "Pago al final del día · Efectivo o tarjeta" : "Paiement en fin de journée · Espèces ou carte")}</span>
                        </div>
                        <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '5px 10px', borderRadius: '6px', color: '#334155', fontWeight: 500 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>{isEn ? "Professional licensed drivers" : (isEs ? "Conductores profesionales autorizados" : "Chauffeurs professionnels agréés")}</span>
                        </div>
                    </div>
                </div>

                {/* Main Visual and Booking Section */}
                <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                    <div style={{ display: 'grid', gap: '30px' }} className="grid-responsive-layout">
                        {/* Left Column: Gallery */}
                        <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                            <PrivateDriverHeroGallery language={language} city="Morocco" title={textMorocco.h1} />
                            
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
                            {isEn ? "What riding with us feels like" : (isEs ? "La experiencia a bordo" : "L'expérience à bord avec nous")}
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
                            {isEn ? "Real roads, well-maintained vehicles, and experienced local drivers." : (isEs ? "Vehículos cuidados y conductores locales con experiencia." : "Véhicules soignés et chauffeurs locaux expérimentés.")}
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

                {/* What Affects Your Custom Quote Section */}
                <section style={{ padding: '70px 20px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Pricing Transparency" : (isEs ? "Precios Transparentes" : "Transparence Tarifaire")}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px', fontFamily: 'var(--font-poppins), sans-serif' }}>
                                {isEn ? "What Affects Your Custom Quote" : (isEs ? "Factores que Influyen en su Presupuesto" : "Ce qui Détermine Votre Devis Sur Mesure")}
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '0.98rem', maxWidth: '680px', margin: '10px auto 0 auto', lineHeight: 1.55 }}>
                                {isEn 
                                    ? "Because every road trip is organized around your personal itinerary, we calculate an exact fixed price based on your trip details:"
                                    : (isEs 
                                        ? "Dado que organizamos el transporte en torno a su ruta específica, calculamos un precio cerrado basado en sus detalles de viaje:" 
                                        : "Chaque voyage étant organisé sur mesure autour de votre itinéraire, nous établissons un tarif clair et convenu selon vos paramètres :")}
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                            <div style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>📅</div>
                                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>
                                    {isEn ? "Dates & Season" : (isEs ? "Fechas y Temporada" : "Dates & Période")}
                                </h3>
                                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                                    {isEn 
                                        ? "Travel dates and seasonal vehicle availability across regional hubs." 
                                        : (isEs ? "Fechas de viaje y disponibilidad según temporada en cada ciudad base." : "Dates de séjour et disponibilité selon la saison dans chaque ville.")}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>🗺️</div>
                                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>
                                    {isEn ? "Route & Distance" : (isEs ? "Ruta y Distancia" : "Itinéraire & Distance")}
                                </h3>
                                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                                    {isEn 
                                        ? "Total driving mileage, highway tolls, and regional mountain or desert stages." 
                                        : (isEs ? "Kilometraje total, peajes de autopista y etapas por montaña o desierto." : "Kilométrage total, péages d'autoroute et étapes de montagne ou désert.")}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>🚐</div>
                                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>
                                    {isEn ? "Vehicle Category" : (isEs ? "Categoría del Vehículo" : "Modèle de Véhicule")}
                                </h3>
                                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                                    {isEn 
                                        ? "Sedan, comfort SUV, VIP van, or minibus selected for your party and luggage." 
                                        : (isEs ? "Berlina, SUV, van VIP o minibús elegido para su grupo y equipaje." : "Berline, SUV, van VIP ou minibus adapté à votre groupe et bagages.")}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>⏱️</div>
                                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>
                                    {isEn ? "Duration & Scope" : (isEs ? "Duración y Servicios" : "Durée & Disponibilité")}
                                </h3>
                                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                                    {isEn 
                                        ? "Number of travel days, standby hours, and overnight stops outside home base." 
                                        : (isEs ? "Días de viaje, horas a disposición y pernoctaciones fuera de la base." : "Nombre de jours, heures à disposition et nuitées hors de la ville de départ.")}
                                </p>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '14px 20px',
                            textAlign: 'center',
                            fontSize: '0.88rem',
                            color: '#475569',
                            fontWeight: 500
                        }}>
                            🔒 {isEn 
                                ? "No hidden charges: fuel, tolls, and driver operating expenses are included in your agreed rate. Pay after each travel day."
                                : (isEs 
                                    ? "Sin suplementos sorpresa: combustible, peajes y gastos del conductor están incluidos en su tarifa. Pago al final de cada jornada."
                                    : "Sans frais cachés : carburant, péages et frais du chauffeur sont inclus dans votre devis. Paiement à la fin de chaque journée.")}
                        </div>
                    </div>
                </section>

                {/* Regional Hubs Section (Contextual Internal Links) */}
                <section style={{ padding: '60px 20px', backgroundColor: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Chauffeur Hubs" : "Agences Locales"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {isEn ? "Our Private Driver Services by Destination" : "Nos Services Chauffeur par Ville"}
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {/* Marrakech Hub */}
                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '16px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>
                                        {isEn ? "Marrakech Chauffeur Service" : "Service Chauffeur Marrakech"}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                                        {isEn ? "Visiting Marrakech Medina, the High Atlas Mountains, or taking a coastal day trip to Essaouira? Hire a dedicated standby driver."
                                             : "Visitez la médina de Marrakech, les sommets de l'Atlas ou évadez-vous pour la journée à Essaouira. Chauffeurs locaux disponibles rapidement."}
                                    </p>
                                </div>
                                <Link href={getPath('/private-driver-marrakech')} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
                                    {isEn ? "Explore Marrakech Service →" : "Découvrir l'agence Marrakech →"}
                                </Link>
                            </div>

                            {/* Casablanca Hub */}
                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '16px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>
                                        {isEn ? "Casablanca Chauffeur Service" : "Service Chauffeur Casablanca"}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                                        {isEn ? "Arriving at Casablanca CMN Airport? Book corporate dispo chauffeur for business meetings, Rabat visits, or north-bound loops."
                                             : "Prise en charge à l'aéroport CMN de Casablanca. Idéal pour vos déplacements d'affaires, réunions, ou départs vers Rabat."}
                                    </p>
                                </div>
                                <Link href={getPath('/private-driver-casablanca')} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
                                    {isEn ? "Explore Casablanca Service →" : "Découvrir l'agence Casablanca →"}
                                </Link>
                            </div>

                            {/* 8-Day Package & Terminology Explainer */}
                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '16px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>
                                        {isEn ? "Itineraries & Dispo Guides" : "Forfaits & Guide Pratique"}
                                    </h3>
                                    <ul style={{ padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                                        <li>
                                             👉 <Link href={getPath('/car-with-driver-morocco-8-days')} style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'underline' }}>
                                                {isEn ? "8-Day Morocco Tour Package" : "Forfait Chauffeur 8 Jours"}
                                            </Link>
                                        </li>
                                        <li>
                                             👉 <Link href={getPath('/chauffeur-dispo-morocco')} style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'underline' }}>
                                                {isEn ? "Understanding 'Chauffeur Dispo'" : "Guide Pratique : Chauffeur Dispo"}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: '#999' }}>
                                    {isEn ? "Select custom packages for best rates" : "Forfaits sur-mesure aux meilleurs tarifs"}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases / Itineraries (SEO Gold Section) */}
                <section style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                {isEn ? "Chauffeur dispo Routes" : "Trajets Chauffeur Dispo"}
                            </span>
                            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginTop: '8px' }}>
                                {textMorocco.useCasesTitle}
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
                                            <TrackedWhatsAppLink 
                                                href={getWhatsAppUrl(card.msg!)}
                                                source="private_driver_route_card"
                                                className="private-driver-route-cta"
                                            >
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                    <path d="M12.012 2.25c-5.378 0-9.755 4.378-9.755 9.756 0 2.102.665 4.05 1.794 5.656L2.836 21.8c-.144.425.263.832.688.688l4.137-1.215c1.554.981 3.4 1.545 5.351 1.545 5.378 0 9.756-4.379 9.756-9.756S17.39 2.25 12.012 2.25zm5.176 13.9c-.22.617-1.272 1.134-1.748 1.18-.466.046-.902.213-2.923-.59-2.583-1.026-4.237-3.666-4.364-3.836-.129-.17-.932-1.243-.932-2.375 0-1.132.582-1.688.815-1.921.233-.233.51-.292.68-.292.17 0 .34.004.488.01.15.008.353-.06.554.423.204.492.698 1.706.759 1.83.06.124.1.267.017.433-.083.167-.124.267-.25.413-.125.146-.263.325-.375.437-.125.125-.254.26-.109.51.146.25.648 1.07 1.39 1.733.957.854 1.76 1.117 2.01.124.25-.25.146-.51.25-.678.104-.167.208-.125.353-.083.146.042.921.433 1.079.512.158.08.263.117.304.188.042.07.042.413-.178 1.03z"/>
                                                </svg>
                                                {card.cta}
                                            </TrackedWhatsAppLink>
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
                                {textMorocco.faqTitle}
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
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

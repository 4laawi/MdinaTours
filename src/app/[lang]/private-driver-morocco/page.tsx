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
    
    let title = 'Private Driver Morocco – Flexible Car with Driver Service | Mdina Tours';
    let description = 'Rent a car with a private driver in Morocco. Premium sedans, SUVs, and minivans with English-speaking local chauffeurs (Dispo Chauffeur) for customizable multi-day trips and airport transfers.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Chauffeur Privé Maroc – Location de Voiture avec Chauffeur | Mdina Tours';
        description = 'Louez un véhicule avec chauffeur privé au Maroc. Berlines, SUV et vans confortables avec chauffeurs locaux bilingues (Disposition Chauffeur) pour vos circuits touristiques sur mesure.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Conductor Privado en Marruecos – Coche con Chófer | Mdina Tours';
        description = 'Alquiler de coche con conductor privado en Marruecos. Berlinas, SUV y minivans con chófer profesional para traslados y rutas a medida por todo el país.';
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

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    const getWhatsAppUrl = (msg: string) => {
        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    const textMorocco = {
        h1: isEn 
            ? "Private Driver in Morocco – National Chauffeur Service" 
            : (isEs ? "Conductor Privado en Marruecos – Servicio de Chófer Nacional" : "Chauffeur Privé au Maroc – Location de Voiture avec Chauffeur"),
        subtitle: isEn 
            ? "Discover the magic of Morocco with a certified, English-speaking driver at your full disposal. Flexible itineraries, fixed daily dispo rates, and zero travel stress."
            : (isEs ? "Descubra Marruecos con un conductor profesional a su entera disposición. Itinerarios flexibles, tarifas claras y máxima tranquilidad durante todo su viaje." : "Découvrez la magie du Maroc avec un chauffeur privé bilingue agréé à votre entière disposition. Itinéraires 100% libres, tarifs clairs et aucun stress de voyage."),
        bannerLabel: isEn ? "Morocco Chauffeur" : (isEs ? "Chófer Marruecos" : "Chauffeur Maroc"),
        whatsappHeroMsg: isEn 
            ? "Hello Mdina Tours, I would like to book a private driver dispo service in Morocco."
            : (isEs ? "Hola Mdina Tours, deseo reservar un conductor privado a disposición en Marruecos." : "Bonjour Mdina Tours, je souhaite réserver un chauffeur privé à disposition au Maroc."),
        introTitle: isEn 
            ? "Morocco Chauffeur Network: Ultimate Travel Freedom" 
            : (isEs ? "Conductor Privado en Marruecos: Total Libertad para Viajar" : "Chauffeur Privé au Maroc : La Liberté de Voyage Absolue"),
        introP1: isEn
            ? "Exploring Morocco's imperial cities, ancient clay kasbahs, high mountain passes, and desert dunes is a lifetime adventure. However, navigating the local highway traffic, narrow medina gates, and public train schedules can be demanding. Our national private driver network—known locally as \"Dispo Chauffeur\"—offers a premium, flexible alternative. Rent a modern, air-conditioned vehicle with a certified, English-speaking local chauffeur on standby exclusively for your schedule."
            : (isEs 
                ? "Recorrer las ciudades imperiales, las kasbahs del sur, las montañas del Atlas y las dunas del Sáhara es una experiencia inolvidable. Para evitar el estrés del tráfico local, accesos a medinas y horarios de transporte público, nuestro servicio de conductor privado le ofrece la alternativa perfecta: un vehículo moderno con chófer profesional a su entera disposición."
                : "Découvrir les médinas médiévales, les kasbahs du Sud, les cols de l'Atlas et le désert du Sahara est une aventure unique. Cependant, conduire sur les routes locales ou dépendre des horaires de trains peut s'avérer contraignant. Notre réseau national de chauffeurs privés — connu sous le nom de « Dispo Chauffeur » — vous propose la formule idéale : la location d'un véhicule récent avec chauffeur bilingue dédié."),
        introP2: isEn
            ? "Unlike fixed-route transfers or rigid group excursions, our dispo service places you in complete control. You set the departure times, decide where to stop for lunch or photography, and customize stops in real time. Our professional drivers act as expert local navigators, ensuring safe driving on mountain roads, smooth hotel drop-offs, and knowledgeable cultural tips."
            : (isEs 
                ? "A diferencia de las excursiones cerradas en grupo, nuestro servicio le da control total sobre su tiempo: elija la hora de salida, decida dónde parar a comer o tomar fotos y adapte el recorrido en tiempo real. Nuestros chóferes conocen las carreteras, parkings y accesos para que viaje cómodo y seguro."
                : "Contrairement aux trajets directs ou aux excursions en groupe figées, notre service de disposition vous offre une autonomie totale. Vous fixez l'heure de départ, choisissez vos arrêts restos ou photos, et adaptez le programme au jour le jour. Nos chauffeurs professionnels chevronnés gèrent les routes sinueuses et les parkings de médinas en toute sécurité."),
        regionalHubsTitle: isEn ? "Our Regional Disposition Hubs" : (isEs ? "Nuestras Bases Principales" : "Nos Centres de Disposition Régionaux"),
        regionalHubsDesc: isEn 
            ? "We offer specialized local chauffeurs and specialized vehicle dispo in Morocco's key destinations. Select a hub below for local day trips or start a grand multi-day tour:"
            : (isEs ? "Disponemos de conductores y vehículos en los principales puntos de Marruecos para excursiones o rutas de varios días:" : "Nous proposons des chauffeurs locaux spécialisés et des flottes dispo dans les destinations clés du Maroc. Sélectionnez une agence locale pour vos excursions ou grands circuits :"),
        howItWorksTitle: isEn ? "How Chauffeur Disposition Works" : (isEs ? "Cómo Funciona el Servicio de Chófer a Disposición" : "Comment fonctionne la disposition de chauffeur"),
        step1Title: isEn ? "1. Select Vehicle & Start Point" : (isEs ? "1. Elija Vehículo y Punto de Salida" : "1. Choisissez le véhicule et le départ"),
        step1Desc: isEn 
            ? "Choose your starting city (Casablanca, Marrakech, Tangier, Rabat) and pick a vehicle matching your group and luggage."
            : (isEs ? "Seleccione su ciudad de partida (Casablanca, Marrakech, Tánger, Rabat) y el vehículo adecuado para su grupo." : "Sélectionnez votre ville de départ (Casablanca, Marrakech, Tanger, Rabat) et choisissez le véhicule adapté à votre groupe."),
        step2Title: isEn ? "2. Design Your Custom Route" : (isEs ? "2. Diseñe su Itinerario a Medida" : "2. Dessinez votre itinéraire"),
        step2Desc: isEn 
            ? "Map out your desired stops or consult with our travel specialists to plan a seamless multi-city road trip."
            : (isEs ? "Defina sus paradas deseadas o solicite ayuda a nuestro equipo para organizar una ruta fluida." : "Déterminez vos étapes ou concevez un itinéraire fluide d'une ville à l'autre avec l'aide de nos spécialistes."),
        step3Title: isEn ? "3. Professional Chauffeur Assigned" : (isEs ? "3. Asignación de Conductor Profesional" : "3. Votre chauffeur est affecté"),
        step3Desc: isEn 
            ? "A licensed, English-speaking driver is assigned to your trip, serving as your standby assistant throughout."
            : (isEs ? "Le asignamos un conductor cualificado que estará pendiente de sus traslados durante todo el recorrido." : "Un chauffeur agréé bilingue vous est attribué, vous accompagnant en attente tout au long de votre parcours."),
        step4Title: isEn ? "4. Travel with Full Flexibility" : (isEs ? "4. Viaje con Máxima Flexibilidad" : "4. Voyagez en toute flexibilité"),
        step4Desc: isEn 
            ? "Explore monuments, dine, or shop without stress. Your standby driver coordinates all pickups on WhatsApp."
            : (isEs ? "Visite monumentos, almuerce y disfrute a su ritmo mientras su chófer coordina cada recogida por WhatsApp." : "Visitez, mangez et flânez sans stress. Votre chauffeur reste à proximité et se coordonne avec vous via WhatsApp."),
        useCasesTitle: isEn ? "Popular Morocco Private Driver Itineraries" : (isEs ? "Ejemplos de Rutas con Conductor en Marruecos" : "Exemples d'itinéraires et cas d'usage au Maroc"),
        pricingTitle: isEn ? "Morocco Chauffeur Pricing Guide" : (isEs ? "Orientación de Tarifas de Chófer" : "Grille tarifaire - Chauffeur au Maroc"),
        pricingSubtitle: isEn 
            ? "Transparent flat-rate dispo pricing with no hidden charges. Book now, pay cash directly to the driver."
            : (isEs ? "Tarifas transparentes por vehículo y día. Reserve con facilidad y abone al conductor en efectivo." : "Des tarifs transparents tout compris. Réservez aujourd'hui et payez en espèces directement au chauffeur."),
        reviewsTitle: isEn ? "What Travelers Say About Our Morocco Chauffeurs" : (isEs ? "Opiniones de Viajeros sobre Nuestros Conductores" : "Avis de nos voyageurs sur notre service au Maroc"),
        reviewsSubtitle: isEn 
            ? "Verified reviews from clients who toured Morocco's imperial cities and deserts with our network."
            : (isEs ? "Comentarios de clientes que han recorrido ciudades imperiales y rutas en Marruecos con nosotros." : "Découvrez les avis de voyageurs ayant fait confiance à notre réseau de chauffeurs au Maroc."),
        finalCtaTitle: isEn ? "Book Your Private Driver in Morocco" : (isEs ? "Reserve su Conductor Privado en Marruecos" : "Réservez votre Chauffeur Privé au Maroc"),
        finalCtaSubtitle: isEn 
            ? "Ready to travel Morocco with complete peace of mind? Contact us on WhatsApp and get your driver dispo confirmed today!"
            : (isEs ? "¿Listo para recorrer Marruecos con total confort? Contáctenos por WhatsApp y confirme su conductor privado." : "Prêt à explorer le Maroc l'esprit tranquille ? Contactez-nous sur WhatsApp et confirmez votre chauffeur dès aujourd'hui !"),
        faqTitle: isEn ? "Morocco Private Driver FAQs" : (isEs ? "Preguntas Frecuentes sobre el Servicio de Chófer" : "Questions Fréquentes - Chauffeur au Maroc")
    };

    const vehicles = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn 
                ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings."
                : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn 
                ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort."
                : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn 
                ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions."
                : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn 
                ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room."
                : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn 
                ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions."
                : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes.",
            price: "€35",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const itineraries = [
        {
            title: isEn ? "Airport & City Transfers" : (isEs ? "Traslados de Aeropuerto y Ciudad" : "Transferts Aéroport & Ville"),
            desc: isEn 
                ? "Rabat, Casablanca, Marrakech — we get you there without the stress."
                : (isEs ? "Casablanca, Marrakech, Rabat — traslados directos y puntuales sin estrés." : "Rabat, Casablanca, Marrakech — voyagez l'esprit tranquille."),
            price: isEn ? "From €45" : (isEs ? "Desde 45 €" : "À partir de 45 €"),
            cta: isEn ? "View Transfers" : (isEs ? "Ver Traslados" : "Voir les transferts"),
            image: "/img2/vito-aeroport.jpg",
            href: language === 'es' ? "/airport-transfers" : "/transfers",
        },
        {
            title: isEn ? "Excursion to Chefchaouen" : (isEs ? "Excursión a Chefchaouen" : "Excursion à Chefchaouen"),
            desc: isEn 
                ? "Chefchaouen, Rif Mountains — one private car, your own pace, no group rush."
                : (isEs ? "Chefchaouen y montañas del Rif en vehículo privado a su propio ritmo." : "Chefchaouen et les montagnes du Rif — voiture privée, à votre rythme, sans la cohue."),
            price: isEn ? "From €249" : (isEs ? "Desde 249 €" : "À partir de 249 €"),
            cta: isEn ? "View Tour" : (isEs ? "Ver Excursión" : "Voir l'excursion"),
            image: "/hero-chefchaouen.webp",
            href: "/tours/chefchaouen-day-trip",
        },
        {
            title: isEn ? "VIP & Corporate Travel" : (isEs ? "Viajes VIP y Corporativos" : "Voyages VIP & Affaires"),
            desc: isEn 
                ? "Executive pickups, event transfers, roadshows — suited chauffeur, on time."
                : (isEs ? "Recogidas ejecutivas, congresos y eventos con chófer formal y puntual." : "Accueil VIP, transferts d'événements, roadshows — chauffeur en costume, à l'heure."),
            price: isEn ? "Custom quote" : (isEs ? "Solicitar presupuesto" : "Devis personnalisé"),
            cta: isEn ? "Get a quote" : (isEs ? "Solicitar presupuesto" : "Demander un devis"),
            image: "/img2/premium-chauffeur.jpg",
            msg: isEs ? "Hola Mdina Tours, deseo solicitar presupuesto para un viaje corporativo o VIP." : "Hello Mdina Tours, I would like to get a quote for VIP & Corporate Travel."
        }
    ];

    const reviews = [
        {
            quote: isEn ? (
                <>Our driver was waiting at arrivals with a sign before we even cleared customs. Spotless car, cold water, and he knew every shortcut in Casablanca. <strong style={{ fontWeight: 800 }}>Absolutely seamless.</strong></>
            ) : (isEs ? (
                <>El conductor nos esperaba en llegadas con un cartel. Coche impecable, agua fresca y conocía perfectamente cada acceso en Casablanca. <strong style={{ fontWeight: 800 }}>Servicio impecable.</strong></>
            ) : (
                <>Notre chauffeur nous attendait aux arrivées avec une pancarte avant même notre passage en douane. Voiture impeccable, eau fraîche et il connaissait tous les raccourcis à Casablanca. <strong style={{ fontWeight: 800 }}>Absolument parfait.</strong></>
            )),
            author: "Sophie R.",
            flag: "🇫🇷"
        },
        {
            quote: isEn ? (
                <>Flight was delayed by 2 hours. I messaged on WhatsApp and they just said &apos;no problem, we&apos;re tracking your flight.&apos; No extra charge. <strong style={{ fontWeight: 800 }}>That kind of service is rare anywhere.</strong></>
            ) : (isEs ? (
                <>El vuelo se retrasó 2 horas. Avisé por WhatsApp y respondieron de inmediato que estaban siguiendo el vuelo. Sin cargos extra. <strong style={{ fontWeight: 800 }}>Atención excelente y muy profesional.</strong></>
            ) : (
                <>Vol retardé de 2 heures. J&apos;ai envoyé un message sur WhatsApp et ils ont simplement répondu &apos;pas de problème, nous suivons votre vol.&apos; Sans frais supplémentaires. <strong style={{ fontWeight: 800 }}>Ce genre de service est rare.</strong></>
            )),
            author: "James K.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>Booked a full-day tour to Chefchaouen for 4 people. The driver was a <strong style={{ fontWeight: 800 }}>genuine local expert</strong> — not just a driver. Best day of our trip.</>
            ) : (isEs ? (
                <>Reservamos una excursión a Chefchaouen para 4 personas. El conductor fue un <strong style={{ fontWeight: 800 }}>auténtico experto local</strong> y muy atento en todo momento. El mejor día de nuestro viaje.</>
            ) : (
                <>Réservation d&apos;une excursion d&apos;une journée à Chefchaouen pour 4 personnes. Le chauffeur était un <strong style={{ fontWeight: 800 }}>véritable expert local</strong> — pas seulement un conducteur. Le meilleur jour de notre voyage.</>
            )),
            author: "Laila M.",
            flag: "🇩🇪"
        },
        {
            quote: isEn ? (
                <>We used the dispo service for 3 days in Marrakech and Rabat for our business meetings. <strong style={{ fontWeight: 800 }}>Impeccable timing</strong>, extremely professional driver who helped us coordinate schedules, and a pristine Mercedes Vito.</>
            ) : (isEs ? (
                <>Contratamos el servicio de chófer durante 3 días para visitas en Marrakech y Rabat. <strong style={{ fontWeight: 800 }}>Puntualidad absoluta</strong>, vehículo Mercedes Vito impecable y trato excelente.</>
            ) : (
                <>Nous avons utilisé le service dispo pendant 3 jours à Marrakech et Rabat pour nos réunions d&apos;affaires. <strong style={{ fontWeight: 800 }}>Timing impeccable</strong>, chauffeur extrêmement professionnel et van Mercedes Vito impeccable.</>
            )),
            author: "David W.",
            flag: "🇺🇸"
        },
        {
            quote: isEn ? (
                <>Perfect service from start to finish! Our driver took us to the Atlas Mountains and back. He was polite, attentive, and <strong style={{ fontWeight: 800 }}>drove very safely</strong>. The luxury SUV was clean and spacious.</>
            ) : (isEs ? (
                <>¡Servicio de diez! Nuestro conductor nos llevó por el Atlas con una <strong style={{ fontWeight: 800 }}>conducción muy segura</strong>. Muy educado, atento y el vehículo amplio y limpio.</>
            ) : (
                <>Service parfait de bout en bout ! Notre chauffeur nous a conduits dans les montagnes de l&apos;Atlas. Poli, attentionné et <strong style={{ fontWeight: 800 }}>conduite très sûre</strong>. Le SUV de luxe était propre et spacieux.</>
            )),
            author: "Elena P.",
            flag: "🇪🇸"
        },
        {
            quote: isEn ? (
                <>Having a driver on standby made our family vacation <strong style={{ fontWeight: 800 }}>so relaxing</strong>. No waiting for taxis, no getting lost. Our driver was incredibly patient with the kids.</>
            ) : (isEs ? (
                <>Tener un conductor a disposición hizo que nuestro viaje en familia fuera <strong style={{ fontWeight: 800 }}>súper relajado</strong>. Sin regateos ni prisas, con paciencia infinita con los niños.</>
            ) : (
                <>Avoir un chauffeur à disposition a rendu nos vacances en famille <strong style={{ fontWeight: 800 }}>tellement reposantes</strong>. Pas d&apos;attente pour les taxis, pas de risque de se perdre. Chauffeur très patient.</>
            )),
            author: "Marc-Antoine L.",
            flag: "🇨🇦"
        }
    ];

    const faqs = [
        {
            q: isEn 
                ? "What is a private driver (\"dispo chauffeur\") in Morocco?" 
                : (isEs ? "¿Qué es el servicio de conductor privado o chófer a disposición?" : "Qu'est-ce qu'un service de chauffeur privé (« dispo chauffeur ») au Maroc ?"),
            a: isEn 
                ? "A dispo chauffeur is a vehicle hired with a professional driver at your full disposal. Unlike a point-to-point transfer, there is no fixed route. The driver remains standby at your location, ready to take you to any destination within the agreed hours and area."
                : (isEs 
                    ? "Es el alquiler de un vehículo con conductor profesional a su entera disposición. No hay una ruta fija: el chófer le espera en cada parada y le traslada según sus horarios y preferencias dentro del tiempo contratado."
                    : "La formule « dispo chauffeur » désigne la location d'un véhicule avec chauffeur à votre entière disposition. Il n'y a pas d'itinéraire fixe : le chauffeur vous attend à chaque arrêt et vous emmène là où vous le souhaitez durant les heures réservées.")
        },
        {
            q: isEn 
                ? "Do drivers speak English and French?" 
                : (isEs ? "¿Los conductores hablan español?" : "Les chauffeurs parlent-ils anglais et français ?"),
            a: isEn 
                ? "Yes. All our designated dispo drivers speak fluent English and French. Many also speak basic Spanish. They are highly experienced in tourist transport and local guiding tips."
                : (isEs 
                    ? "Nuestros conductores hablan español, francés e inglés. Tienen amplia experiencia en turismo y conocen a la perfección las rutas y consejos locales."
                    : "Oui. Tous nos chauffeurs affectés au service touristique parlent couramment français et anglais. Ils ont une grande expérience du guidage et de l'accueil international.")
        },
        {
            q: isEn 
                ? "Is fuel, highway tolls, and parking included?" 
                : (isEs ? "¿Están incluidos el combustible, peajes y aparcamientos?" : "Le carburant, les péages et les frais de parking sont-ils inclus ?"),
            a: isEn 
                ? "Yes. All our daily rates include fuel, highway toll charges, parking fees, and the driver's professional fees. There are no hidden or surprise surcharges."
                : (isEs 
                    ? "Sí. Todas nuestras tarifas cerradas incluyen combustible, peajes de autopista y gastos del conductor. Sin costes sorpresa."
                    : "Oui. Tous nos tarifs à la journée incluent le carburant, les frais de péage autoroutier, les parkings ainsi que la rémunération du chauffeur. Pas de mauvaise surprise à la fin.")
        },
        {
            q: isEn 
                ? "Can I change the itinerary during the day?" 
                : (isEs ? "¿Puedo modificar la ruta durante la jornada?" : "Puis-je modifier mon itinéraire au cours de la journée ?"),
            a: isEn 
                ? "Absolutely. Full flexibility is the core benefit of this service. You can add extra stops, change your destination, or cut your sightseeing short. Simply communicate your wishes to your driver."
                : (isEs 
                    ? "Totalmente. La flexibilidad es la gran ventaja de este servicio. Puede añadir paradas, detenerse a comer donde prefiera o adelantar salidas según sus deseos."
                    : "Tout à fait. La flexibilité est l'atout majeur de notre formule. Vous pouvez modifier votre programme, ajouter des visites ou écourter une excursion selon vos envies en le signalant directement à votre chauffeur.")
        },
        {
            q: isEn 
                ? "Is the driver's accommodation included in multi-day dispo bookings?" 
                : (isEs ? "¿Está incluido el alojamiento del conductor en rutas de varios días?" : "Le logement du chauffeur est-il inclus dans les réservations dispo sur plusieurs jours ?"),
            a: isEn 
                ? "Yes. For multi-day bookings where the driver must stay overnight outside their home base, the driver's accommodation and meal fees are fully covered in our flat rate."
                : (isEs 
                    ? "Sí. En los circuitos de varios días fuera de la ciudad base, los gastos de manutención y alojamiento del conductor están incluidos en el presupuesto."
                    : "Oui. Pour les prestations sur plusieurs jours hors de la ville de départ, les frais de repas et d'hébergement du chauffeur sont entièrement pris en charge dans notre forfait.")
        },
        {
            q: isEn 
                ? "What is the difference between a transfer and a private driver dispo?" 
                : (isEs ? "¿Qué diferencia hay entre un traslado y un chófer a disposición?" : "Quelle est la différence entre un transfert simple et un chauffeur privé à disposition ?"),
            a: isEn 
                ? "A transfer is a direct, point-to-point trip (e.g., Marrakech Airport to a Gueliz hotel) with no additional stops. A private driver dispo is an hourly or daily booking where the driver stays with you, facilitating multiple stops and flexible waits."
                : (isEs 
                    ? "Un traslado es un viaje directo de un punto A a un punto B (ej. Aeropuerto a su hotel). El chófer a disposición es una reserva por día completo donde el vehículo le acompaña en todas sus visitas y esperas."
                    : "Un transfert est un trajet direct d'un point A à un point B (ex: Aéroport de Marrakech vers un hôtel au Guéliz). La formule dispo chauffeur est une location à la journée où le véhicule reste avec vous pour enchaîner plusieurs visites et escales.")
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
                "item": `https://mdinatours.com/${language}`
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

                    {/* Ratings & Badges */}
                    <div className="ratings-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', marginBottom: '20px' }}>
                        <div className="rating-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span className="star-icon" style={{ color: '#f59e0b' }}>★</span>
                            <span style={{ fontWeight: 700 }}>5.0</span>
                            <span style={{ color: '#717171', fontWeight: 500 }}>({isEn ? "110 reviews" : "110 avis"})</span>
                        </div>
                        <div className="recommended-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                            <span>{isEn ? "Recommended by 98% of travelers" : "Recommandé par 98% des voyageurs"}</span>
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

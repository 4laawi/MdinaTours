"use client";

import React, { useState } from 'react';
import { 
    MapPin, 
    Clock, 
    Car, 
    Sparkle, 
    CheckCircle, 
    CaretDown, 
    CaretUp, 
    WhatsappLogo, 
    Compass, 
    ShieldCheck, 
    Users, 
    Buildings, 
    SunHorizon,
    ArrowRight,
    Camera,
    Bed,
    ForkKnife,
    Mountains
} from '@phosphor-icons/react';
import { Language } from '@/lib/translations';

interface ItineraryDay {
    day: number;
    title: string;
    route: string;
    drivingTime: string;
    distance: string;
    highlights: string[];
    description: string;
    image: string;
    imageAlt: string;
    imagePlaceholderNote?: string;
    lunchStop?: string;
    overnight: string;
}

interface TourRoute {
    id: string;
    badge: string;
    name: string;
    tagline: string;
    description: string;
    totalDistance: string;
    bestFor: string;
    startEnd: string;
    cities: string[];
    days: ItineraryDay[];
}

interface Morocco8DaysItinerarySelectorProps {
    lang: Language;
}

export default function Morocco8DaysItinerarySelector({ lang }: Morocco8DaysItinerarySelectorProps) {
    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const [selectedRouteId, setSelectedRouteId] = useState<string>('sahara-classic');
    const [expandedDays, setExpandedDays] = useState<{ [key: string]: boolean }>({
        'sahara-classic-1': true,
        'sahara-classic-2': false,
        'sahara-classic-3': false,
        'sahara-classic-4': true,
        'sahara-classic-5': false,
        'sahara-classic-6': false,
        'sahara-classic-7': false,
        'sahara-classic-8': false,
    });

    const toggleDay = (key: string) => {
        setExpandedDays(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const expandAll = (routeId: string) => {
        const updated: { [key: string]: boolean } = {};
        for (let i = 1; i <= 8; i++) {
            updated[`${routeId}-${i}`] = true;
        }
        setExpandedDays(prev => ({ ...prev, ...updated }));
    };

    const collapseAll = (routeId: string) => {
        const updated: { [key: string]: boolean } = {};
        for (let i = 1; i <= 8; i++) {
            updated[`${routeId}-${i}`] = false;
        }
        setExpandedDays(prev => ({ ...prev, ...updated }));
    };

    const getWhatsAppUrl = (message: string) => {
        return `https://wa.me/212724114775?text=${encodeURIComponent(message)}`;
    };

    const routes: TourRoute[] = [
        {
            id: 'sahara-classic',
            badge: isEn ? "Most Popular Loop" : isEs ? "Ruta Más Solicitada" : "Circuit le Plus Demandé",
            name: isEn ? "Imperial Cities & Sahara Desert (8 Days)" : isEs ? "Ciudades Imperiales y Desierto del Sahara (8 Días)" : "Villes Impériales & Grand Sud (8 Jours)",
            tagline: isEn 
                ? "Casablanca, Chefchaouen, Fes, Erg Chebbi Sahara dunes, Todra & Dades Gorges, Ait Benhaddou, and Marrakech."
                : isEs
                ? "Casablanca, Chefchaouen, Fez, dunas del Sahara, Gargantas del Todra, Ait Ben Haddou y Marrakech."
                : "Casablanca, Chefchaouen, Fès, dunes de Merzouga, Gorges du Todra, Aït Benhaddou et Marrakech.",
            description: isEn
                ? "Morocco's quintessential 8-day private chauffeur journey combining imperial UNESCO medinas, High Atlas mountain passes, and a night under the stars in the Sahara dunes."
                : isEs
                ? "El gran viaje clásico de 8 días con chófer privado combinando medinas imperiales, el paso del Alto Atlas y una noche mágica en las dunas del Sahara."
                : "Le circuit signature de 8 jours alliant médinas impériales, col du Haut Atlas et nuit magique sous les étoiles au cœur des dunes de Merzouga.",
            totalDistance: "~1,650 km",
            bestFor: isEn ? "First-time visitors, Couples & Families" : isEs ? "Primer viaje a Marruecos, Parejas y Familias" : "Premier voyage, Couples & Familles",
            startEnd: isEn ? "Start: Casablanca / End: Marrakech (or vice versa)" : isEs ? "Inicio: Casablanca / Fin: Marrakech (o viceversa)" : "Départ : Casablanca / Fin : Marrakech (ou inverse)",
            cities: ["Casablanca", "Chefchaouen", "Fes", "Ifrane", "Merzouga Sahara", "Dades Gorges", "Ait Benhaddou", "Marrakech"],
            days: [
                {
                    day: 1,
                    title: isEn ? "Casablanca Arrival & Scenic Drive to Chefchaouen" : isEs ? "Llegada a Casablanca y viaje a Chefchaouen" : "Arrivée Casablanca & Route vers Chefchaouen",
                    route: "Casablanca → Rabat → Chefchaouen",
                    drivingTime: "~4.5 hrs",
                    distance: "340 km",
                    image: "/hero-chefchaouen.webp",
                    imageAlt: "Chefchaouen Blue Medina Morocco",
                    highlights: isEn 
                        ? ["Hassan II Mosque ocean viewpoint", "Rabat Kasbah des Oudayas", "Scenic Rif Mountain drive"]
                        : isEs
                        ? ["Mezquita Hassan II frente al mar", "Kasbah de los Oudayas en Rabat", "Paisajes del Rif"]
                        : ["Mosquée Hassan II", "Kasbah des Oudayas à Rabat", "Traversée panoramique du Rif"],
                    lunchStop: isEn ? "Seaside seafood in Rabat or local cafe in Ouazzane" : isEs ? "Pescado fresco en Rabat o restaurante local en Ouazzane" : "Poissons à Rabat ou halte gourmande à Ouazzane",
                    overnight: isEn ? "Authentic Riad in Chefchaouen" : isEs ? "Riad con encanto en Chefchaouen" : "Riad authentique à Chefchaouen",
                    description: isEn
                        ? "Your private chauffeur welcomes you directly at Casablanca Airport (CMN). Visit the majestic Hassan II Mosque by the Atlantic coast, stop in Rabat at the historic Kasbah of the Udayas, and wind through the Rif mountains to arrive in Chefchaouen by golden hour."
                        : isEs
                        ? "Su chófer privado le recibirá en el aeropuerto de Casablanca (CMN). Visitarán la Mezquita Hassan II frente al mar, la Kasbah de los Oudayas en Rabat y cruzarán las montañas del Rif hasta llegar a Chefchaouen al atardecer."
                        : "Votre chauffeur privé vous accueille à l'aéroport de Casablanca (CMN). Visite de la majestueuse Mosquée Hassan II, arrêt à la Kasbah des Oudayas à Rabat, puis traversée du Rif jusqu'à Chefchaouen au coucher du soleil."
                },
                {
                    day: 2,
                    title: isEn ? "Chefchaouen Blue Alleys & Volubilis Roman Ruins to Fes" : isEs ? "Chefchaouen y Ruinas Romanas de Volubilis a Fez" : "Chefchaouen & Ruines Romaines de Volubilis vers Fès",
                    route: "Chefchaouen → Volubilis → Moulay Idriss → Fes",
                    drivingTime: "~3.5 hrs",
                    distance: "210 km",
                    image: "/img/Morocco-trip-tour-hero03.webp",
                    imageAlt: "Volubilis Roman ruins and Moroccan countryside",
                    imagePlaceholderNote: "Photo recommended: Volubilis Roman archaeological ruins or Chefchaouen morning doorways",
                    highlights: isEn 
                        ? ["Morning stroll in blue medina", "Volubilis UNESCO Roman mosaics", "Holy town of Moulay Idriss"]
                        : isEs
                        ? ["Mañana tranquila en la medina azul", "Mosaicos romanos de Volubilis", "Ciudad santa de Moulay Idriss"]
                        : ["Flânerie matinale ville bleue", "Mosaïques romaines de Volubilis", "Cité sainte de Moulay Idriss"],
                    lunchStop: isEn ? "Traditional Moroccan lunch overlooking the olive hills of Volubilis" : isEs ? "Almuerzo tradicional frente a las colinas de Volubilis" : "Déjeuner traditionnel face aux oliveraies de Volubilis",
                    overnight: isEn ? "Historic Palace Riad in Fes Medina" : isEs ? "Palacio Riad en la Medina de Fez" : "Palais Riad d'époque dans la Médina de Fès",
                    description: isEn
                        ? "Enjoy peaceful morning photos in Chefchaouen before driving south to Volubilis, Morocco's best-preserved Roman archaeological site. Pass the sacred hilltop town of Moulay Idriss Zerhoun and arrive in the imperial medina of Fes."
                        : isEs
                        ? "Paseo matinal por las calles azules de Chefchaouen y viaje hacia el sur hasta las ruinas romanas de Volubilis (UNESCO) antes de llegar a la histórica medina de Fez."
                        : "Matinée à Chefchaouen puis route vers le site antique de Volubilis (UNESCO) et ses remarquables mosaïques avant de rejoindre la médina millénaire de Fès."
                },
                {
                    day: 3,
                    title: isEn ? "Full Day Fes Medina Cultural Exploration" : isEs ? "Descubrimiento de la Medina Medieval de Fez" : "Journée Découverte de la Médina de Fès",
                    route: "Fes Medina & City Panoramas",
                    drivingTime: isEn ? "Driver on call in city" : isEs ? "Chófer a disposición" : "Chauffeur à disposition",
                    distance: "25 km",
                    image: "/img/Morocco-trip-tour-hero04.webp",
                    imageAlt: "Fes Medina Chouara Tanneries and artisan quarter",
                    imagePlaceholderNote: "Photo recommended: Fes Chouara Tanneries or Bab Bou Jeloud blue gate",
                    highlights: isEn 
                        ? ["Chouara Tanneries terrace view", "Al-Qarawiyyin & Bou Inania Madrasa", "Borj Nord golden hour panorama"]
                        : isEs
                        ? ["Curtidurías Chouara", "Universidad Al-Qarawiyyin y Madraza", "Mirador panorámico de Borj Nord"]
                        : ["Tanneries Chouara", "Université Al Quaraouiyine", "Coucher de soleil au Borj Nord"],
                    lunchStop: isEn ? "Courtyard riad restaurant inside the medina (Fassi pastilla)" : isEs ? "Restaurante en riad tradicional en la medina (Pastela de Fez)" : "Restaurant en riad dans la médina (Pastilla artisanale)",
                    overnight: isEn ? "Riad in Fes Medina" : isEs ? "Riad en la Medina de Fez" : "Riad dans la Médina de Fès",
                    description: isEn
                        ? "Discover the world's largest car-free medieval medina. Explore the artisan copper smiths, aromatic 11th-century leather tanneries, and Islamic architecture. In the late afternoon, your chauffeur drives you to the Marinid Tombs for a panoramic sunset view over Fes."
                        : isEs
                        ? "Jornada para recorrer la medina peatonal de Fez el-Bali: zocos artesanales, curtidurías Chouara y mirador del Borj Nord al atardecer."
                        : "Immersion dans la médina piétonne de Fès El-Bali : tanneries Chouara, médersas ouvragées et vue panoramique depuis les tombeaux mérinides."
                },
                {
                    day: 4,
                    title: isEn ? "Fes to Sahara Desert (Merzouga) via Cedar Forest & Ziz Valley" : isEs ? "Fez al Desierto de Merzouga por bosque de cedros y Valle del Ziz" : "Fès vers le Désert de Merzouga via le Moyen Atlas & Vallée du Ziz",
                    route: "Fes → Ifrane → Midelt → Erfoud → Merzouga (Erg Chebbi)",
                    drivingTime: "~7.5 hrs",
                    distance: "460 km",
                    image: "/Sahara.webp",
                    imageAlt: "Sahara Desert Erg Chebbi dunes camel ride sunset",
                    highlights: isEn 
                        ? ["Ifrane alpine architecture", "Azrou cedar forest Barbary macaques", "Sunset camel trek into Erg Chebbi dunes"]
                        : isEs
                        ? ["Ifrane y bosque de cedros de Azrou", "Cañón y palmerales del Valle del Ziz", "Paseo en dromedario al atardecer en las dunas"]
                        : ["Forêt de cèdres d'Azrou", "Gorges et palmeraies du Ziz", "Randonnée chamelière au coucher de soleil à Erg Chebbi"],
                    lunchStop: isEn ? "Midelt mountain restaurant with slow-cooked Atlas lamb tagine" : isEs ? "Restaurante de montaña en Midelt con tagine de cordero" : "Halte à Midelt avec tajine d'agneau mijoté",
                    overnight: isEn ? "Luxury Sahara Desert Camp with private bathroom & hot shower" : isEs ? "Campamento de Lujo en el Sahara con baño privado" : "Bivouac de Luxe dans les dunes avec sanitaires privés",
                    description: isEn
                        ? "A scenic crossing through Middle Atlas cedar forests with Barbary macaques, across the dramatic limestone palm oasis of Ziz Valley. Arriving in Merzouga, mount camels for a sunset ride into the golden Erg Chebbi dunes, followed by Berber campfire drumming under the stars."
                        : isEs
                        ? "Espectacular travesía por el Medio Atlas y el Valle del Ziz. Llegada a Merzouga: paseo en dromedario entre las dunas de Erg Chebbi, cena bereber junto al fuego y noche en campamento de lujo."
                        : "Traversée grandiose du Moyen Atlas et des canyons du Ziz. Arrivée aux dunes d'Erg Chebbi : départ à dos de dromadaire pour le coucher de soleil et nuit magique sous les étoiles."
                },
                {
                    day: 5,
                    title: isEn ? "Sahara Sunrise, Gnawa Village & Todra Gorges to Dades" : isEs ? "Amanecer en el Sahara, pueblo Gnawa y Gargantas del Todra al Dadès" : "Lever de Soleil au Sahara, Musique Gnawa & Gorges du Todra",
                    route: "Merzouga → Rissani → Todra Gorges → Dades Valley",
                    drivingTime: "~4.5 hrs",
                    distance: "260 km",
                    image: "/img/Morocco-trip-tour-hero05.webp",
                    imageAlt: "Todra Gorge 300m limestone cliffs Morocco",
                    imagePlaceholderNote: "Photo recommended: Todra Gorges 300m vertical cliffs or Dades Valley hairpin road",
                    highlights: isEn 
                        ? ["Desert dunes sunrise", "Khamlia village spiritual Gnawa music", "Todra Gorge 300m vertical canyon walk"]
                        : isEs
                        ? ["Amanecer en las dunas", "Música Gnawa en Khamlia", "Paseo en las paredes verticales del Todra"]
                        : ["Lever de soleil sur les dunes", "Musique Gnawa à Khamlia", "Falaises de 300m des Gorges du Todra"],
                    lunchStop: isEn ? "Traditional Berber 'Medfouna' (stuffed desert bread) in Rissani" : isEs ? "Medfouna tradicional (pizza bereber) en Rissani" : "Dégustation de la fameuse Medfouna à Rissani",
                    overnight: isEn ? "Panoramic Kasbah Hotel in Dades Valley" : isEs ? "Hotel Kasbah panorámico en el Valle del Dadès" : "Hôtel Kasbah panoramique dans la Vallée du Dadès",
                    description: isEn
                        ? "Watch the sunrise over 150m sand dunes. Visit the indigenous Gnawa musicians in Khamlia and explore the ancient market town of Rissani before walking through the towering 300-meter cliffs of Todra Gorges to reach Dades Valley."
                        : isEs
                        ? "Amanecer en las dunas, música Gnawa en Khamlia y recorrido a pie por el impresionante desfiladero de las Gargantas del Todra antes de llegar al Valle del Dadès."
                        : "Lever de soleil sur le désert, étape musicale Gnawa à Khamlia, puis marche au cœur des spectaculaires falaises du Todra avant de rejoindre le Dadès."
                },
                {
                    day: 6,
                    title: isEn ? "Dades Valley, Valley of Roses & UNESCO Ait Benhaddou" : isEs ? "Valle del Dadès, Valle de las Rosas y Kasbah de Ait Ben Haddou" : "Vallée des Roses, Palmeraie de Skoura & Aït Benhaddou",
                    route: "Dades → Kelaat M'gouna → Skoura → Ait Benhaddou",
                    drivingTime: "~3 hrs",
                    distance: "160 km",
                    image: "/img/Ait Benhaddou.jpg",
                    imageAlt: "UNESCO fortified Kasbah Ait Benhaddou Morocco",
                    highlights: isEn 
                        ? ["Road of a Thousand Kasbahs", "Skoura palm oasis & Amridil fortress", "UNESCO Ait Benhaddou adobe sunset"]
                        : isEs
                        ? ["Ruta de las Mil Kasbahs", "Palmeral de Skoura y Kasbah Amridil", "Puesta de sol en Ait Ben Haddou (UNESCO)"]
                        : ["Route des Mille Kasbahs", "Palmeraie de Skoura", "Coucher de soleil sur la Kasbah d'Aït Benhaddou"],
                    lunchStop: isEn ? "Rooftop terrace overlooking the earthen towers of Ait Benhaddou" : isEs ? "Terraza panorámica frente a la Kasbah de Ait Ben Haddou" : "Terrasse panoramique face aux remparts d'Aït Benhaddou",
                    overnight: isEn ? "Charming Adobe Kasbah in Ait Benhaddou or Ouarzazate" : isEs ? "Kasbah tradicional en Ait Ben Haddou u Ouarzazate" : "Kasbah de charme à Aït Benhaddou ou Ouarzazate",
                    description: isEn
                        ? "Drive along the Road of a Thousand Kasbahs through rose distilleries and the Skoura palm grove. Tour Ouarzazate film studios (Gladiator, Game of Thrones) and climb the iconic fortified UNESCO village of Ait Benhaddou."
                        : isEs
                        ? "Recorrido por la Ruta de las Mil Kasbahs, los palmerales de Skoura y visita al ksar fortificado de adobe de Ait Ben Haddou (Patrimonio UNESCO)."
                        : "Parcours le long de la Route des Mille Kasbahs via Skoura et visite de la célèbre Kasbah d'Aït Benhaddou, décor mythique de nombreux films cultes."
                },
                {
                    day: 7,
                    title: isEn ? "Ait Benhaddou across High Atlas (Tizi n'Tichka 2,260m) to Marrakech" : isEs ? "Ait Ben Haddou cruzando el Alto Atlas (Tizi n'Tichka) a Marrakech" : "Aït Benhaddou via le Col du Tizi n'Tichka (2 260m) vers Marrakech",
                    route: "Ait Benhaddou → Tizi n'Tichka Pass → Marrakech",
                    drivingTime: "~4 hrs",
                    distance: "190 km",
                    image: "/img/marrakech.jpg",
                    imageAlt: "Marrakech Jemaa El Fna and High Atlas Mountains",
                    highlights: isEn 
                        ? ["Tizi n'Tichka 2,260m mountain summit", "Berber Argan oil cooperative", "Jemaa El-Fnaa evening market atmosphere"]
                        : isEs
                        ? ["Puerto de montaña Tizi n'Tichka a 2.260 m", "Cooperativa de aceite de argán", "Ambiente nocturno en la plaza Jemaa El-Fna"]
                        : ["Col du Tizi n'Tichka à 2 260 m", "Coopérative d'huile d'argan", "Effervescence nocturne sur la place Jemaa El-Fna"],
                    lunchStop: isEn ? "High Atlas mountain grill with Berber skewers & mint tea" : isEs ? "Mirador de montaña en el Atlas con brochetas bereberes" : "Grillades d'altitude et thé à la menthe dans l'Atlas",
                    overnight: isEn ? "Luxury Riad in Marrakech Medina" : isEs ? "Riad con encanto en la Medina de Marrakech" : "Riad de prestige dans la Médina de Marrakech",
                    description: isEn
                        ? "Traverse the High Atlas mountains over the breathtaking Tizi n'Tichka pass (2,260m). Arrive in Marrakech by mid-afternoon and experience the vibrant storytelling, musicians, and food stalls of Jemaa El-Fnaa square."
                        : isEs
                        ? "Cruce panorámico del Alto Atlas por el paso de Tizi n'Tichka. Llegada a Marrakech por la tarde para sumergirse en la mágica plaza Jemaa El-Fna."
                        : "Franchissement du Haut Atlas par le Tizi n'Tichka. Arrivée à Marrakech l'après-midi et découverte de l'ambiance unique de Jemaa El-Fna à la tombée de la nuit."
                },
                {
                    day: 8,
                    title: isEn ? "Marrakech Highlights & Punctual Airport Departure" : isEs ? "Monumentos de Marrakech y traslado puntual al aeropuerto" : "Visite de Marrakech & Transfert Aéroport Retour",
                    route: "Marrakech Sightseeing → Airport (RAK or CMN)",
                    drivingTime: isEn ? "Chauffeur on call according to flight" : isEs ? "Chófer según horario de vuelo" : "Chauffeur selon vos horaires de vol",
                    distance: "20 km",
                    image: "/img/marrakech-tour.webp",
                    imageAlt: "Marrakech Bahia Palace Majorelle Garden",
                    highlights: isEn 
                        ? ["Jardin Majorelle & Bahia Palace", "Artisan souk treasures", "Door-to-terminal airport drop-off"]
                        : isEs
                        ? ["Jardín Majorelle y Palacio Bahía", "Compras en los zocos", "Traslado directo a la terminal de salida"]
                        : ["Jardin Majorelle & Palais Bahia", "Souks artisanaux", "Transfert ponctuel terminal aéroport"],
                    lunchStop: isEn ? "Garden cafe in Gueliz or terrace overlooking the Koutoubia gardens" : isEs ? "Café en Guéliz o terraza frente a la Koutoubia" : "Déjeuner à Guéliz ou terrasse face à la Koutoubia",
                    overnight: isEn ? "Departure flight or stay extension" : isEs ? "Vuelo de regreso" : "Vol retour ou prolongation de séjour",
                    description: isEn
                        ? "Spend your final morning visiting Jardin Majorelle, Bahia Palace, or artisan souks. Your private chauffeur handles all luggage and ensures seamless, punctual transfer to Marrakech (RAK) or Casablanca (CMN) Airport."
                        : isEs
                        ? "Últimas visitas en Marrakech (Jardín Majorelle, Palacio Bahía o zocos) y traslado puntual con equipaje al aeropuerto de Marrakech o Casablanca."
                        : "Dernière matinée au Jardin Majorelle ou dans les souks, puis transfert aéroport ponctuel et serein assuré par votre chauffeur."
                }
            ]
        },
        {
            id: 'northern-explorer',
            badge: isEn ? "Coastal & Imperial Loop" : isEs ? "Norte y Ciudades Reales" : "Nord & Cités Royales",
            name: isEn ? "Northern Morocco & Blue Pearl Loop (8 Days)" : isEs ? "Norte de Marruecos, Chefchaouen y Ciudades Imperiales (8 Días)" : "Nord Maroc, Chefchaouen & Cités Royales (8 Jours)",
            tagline: isEn 
                ? "Tangier, Chefchaouen, Volubilis, Meknes, Fes, Rabat, Casablanca, and coastal Assilah."
                : isEs
                ? "Tánger, Chefchaouen, Volubilis, Meknes, Fez, Rabat, Casablanca y Assilah."
                : "Tanger, Chefchaouen, Volubilis, Meknès, Fès, Rabat, Casablanca et Assilah.",
            description: isEn
                ? "A relaxed, heritage-rich 8-day route ideal for travelers landing in Tangier or Casablanca who want moderate driving times and deep immersion in Roman, Andalusian, and medieval Moroccan culture."
                : isEs
                ? "Un circuito relajado de 8 días para quienes aterrizan en Tánger o Casablanca, enfocado en el patrimonio andalusí, romano y medinas históricas sin largos tramos desérticos."
                : "Un itinéraire équilibré de 8 jours privilégiant le patrimoine andalou, les cités impériales et les côtes méditerranéennes et atlantiques sans longs trajets de désert.",
            totalDistance: "~1,100 km",
            bestFor: isEn ? "Culture & History lovers, Families with children" : isEs ? "Cultura, Familias y Fotografía" : "Amateurs d'histoire & Familles",
            startEnd: isEn ? "Start: Tangier or Casablanca / End: Tangier or Casablanca" : isEs ? "Inicio: Tánger o Casablanca / Fin: Tánger o Casablanca" : "Départ : Tanger ou Casablanca / Fin : Tanger ou Casablanca",
            cities: ["Tangier", "Chefchaouen", "Volubilis", "Meknes", "Fes", "Rabat", "Casablanca", "Assilah"],
            days: [
                {
                    day: 1,
                    title: isEn ? "Tangier Arrival, Cap Spartel & Hercules Caves" : isEs ? "Llegada a Tánger, Cabo Espartel y Grutas de Hércules" : "Arrivée Tanger, Cap Spartel & Grottes d'Hercule",
                    route: "Tangier Airport / Port → City Tour",
                    drivingTime: "~2 hrs",
                    distance: "40 km",
                    image: "/Tangier-Morocco-Photo.webp",
                    imageAlt: "Tangier Cap Spartel and Kasbah Morocco",
                    highlights: isEn ? ["Cap Spartel (Atlantic meets Mediterranean)", "Hercules Caves", "Tangier Kasbah & Grand Socco"] : isEs ? ["Cabo Espartel", "Grutas de Hércules", "Kasbah de Tánger"] : ["Cap Spartel", "Grottes d'Hercule", "Kasbah de Tanger"],
                    overnight: isEn ? "Boutique Riad in Tangier Medina" : isEs ? "Riad boutique en Tánger" : "Riad de charme à Tanger",
                    description: isEn 
                        ? "Meet your chauffeur in Tangier. Visit Cap Spartel where the Atlantic Ocean meets the Mediterranean Sea and explore the historic Tangier Kasbah."
                        : isEs 
                        ? "Recepción en Tánger por su chófer. Visita al Cabo Espartel, Grutas de Hércules y la histórica Kasbah de Tánger."
                        : "Accueil par votre chauffeur à Tanger. Visite du Cap Spartel, des Grottes d'Hercule et de la Kasbah de Tanger."
                },
                {
                    day: 2,
                    title: isEn ? "Tangier across Rif Mountains to Chefchaouen" : isEs ? "Tánger a Chefchaouen por las montañas del Rif" : "Tanger vers Chefchaouen via le Rif",
                    route: "Tangier → Tetouan → Chefchaouen",
                    drivingTime: "~2.5 hrs",
                    distance: "120 km",
                    image: "/hero-chefchaouen.webp",
                    imageAlt: "Chefchaouen Blue city",
                    highlights: isEn ? ["Tetouan UNESCO medina overview", "Rif green valleys", "Chefchaouen sunset at Spanish Mosque"] : isEs ? ["Medina de Tetuán", "Valles del Rif", "Puesta de sol en la Mezquita Española"] : ["Médina de Tétouan", "Montagnes du Rif", "Coucher de soleil à Chefchaouen"],
                    overnight: isEn ? "Riad in Chefchaouen" : isEs ? "Riad en Chefchaouen" : "Riad à Chefchaouen",
                    description: isEn 
                        ? "Drive along the Mediterranean coast via Tetouan to Chefchaouen. Wander through the blue alleys and watch the sunset from the Spanish Mosque."
                        : isEs 
                        ? "Viaje panorámico hacia Chefchaouen pasando por Tetuán y tarde libre en sus mágicas calles azules."
                        : "Route panoramique vers Chefchaouen via Tétouan et soirée dans les ruelles bleues."
                },
                {
                    day: 3,
                    title: isEn ? "Chefchaouen to Fes via Volubilis & Imperial Meknes" : isEs ? "Chefchaouen a Fez por Volubilis y Meknes" : "Chefchaouen vers Fès via Volubilis et Meknès",
                    route: "Chefchaouen → Volubilis → Meknes → Fes",
                    drivingTime: "~4 hrs",
                    distance: "220 km",
                    image: "/img/Morocco-trip-tour-hero03.webp",
                    imageAlt: "Volubilis ruins Meknes",
                    highlights: isEn ? ["Volubilis Roman Mosaics", "Bab El Mansour in Meknes", "Royal Stables of Moulay Ismail"] : isEs ? ["Mosaicos de Volubilis", "Puerta Bab Mansour", "Caballerizas reales"] : ["Mosaïques de Volubilis", "Porte Bab Mansour à Meknès", "Écuries royales"],
                    overnight: isEn ? "Historic Riad in Fes" : isEs ? "Riad histórico en Fez" : "Riad historique à Fès",
                    description: isEn 
                        ? "Explore the Roman mosaics of Volubilis and the imperial gates of Meknes before checking into your Riad in Fes."
                        : isEs 
                        ? "Visita a las ruinas romanas de Volubilis y a la ciudad imperial de Meknes antes de llegar a Fez."
                        : "Visite des ruines romaines de Volubilis et de la cité royale de Meknès avant d'arriver à Fès."
                },
                {
                    day: 4,
                    title: isEn ? "Full Day Guided Tour of Medieval Fes Medina" : isEs ? "Visita guiada de la Medina de Fez" : "Journée Guidée dans la Médina de Fès",
                    route: "Fes Medina & Artisan Quarters",
                    drivingTime: isEn ? "Driver on call" : isEs ? "Chófer a disposición" : "Chauffeur à disposition",
                    distance: "20 km",
                    image: "/img/Morocco-trip-tour-hero04.webp",
                    imageAlt: "Fes Tanneries and Souks",
                    highlights: isEn ? ["Chouara Tanneries", "Al-Attarine Madrasa", "Pottery & Zellige quarter"] : isEs ? ["Curtidurías Chouara", "Madraza Attarine", "Barrio de alfareros"] : ["Tanneries Chouara", "Médersa Attarine", "Quartier des potiers"],
                    overnight: isEn ? "Riad in Fes" : isEs ? "Riad en Fez" : "Riad à Fès",
                    description: isEn 
                        ? "Full immersion in Fes El-Bali: artisan leather dyers, ancient madrasas, and panoramic valley views."
                        : isEs 
                        ? "Día completo en la medina de Fez con sus famosos curtidores y palacios históricos."
                        : "Exploration complète de Fès El-Bali, de ses ateliers d'artisans et de ses monuments historiques."
                },
                {
                    day: 5,
                    title: isEn ? "Fes to Rabat Imperial Capital via Olive Country" : isEs ? "Fez a Rabat la capital imperial" : "Fès vers Rabat la Capitale",
                    route: "Fes → Khemisset → Rabat",
                    drivingTime: "~2.5 hrs",
                    distance: "200 km",
                    image: "/img/Morocco-trip-tour-hero01.webp",
                    imageAlt: "Rabat Hassan Tower and Kasbah",
                    highlights: isEn ? ["Hassan Tower & Mohammed V Mausoleum", "Kasbah of the Udayas gardens", "Rabat oceanfront promenade"] : isEs ? ["Torre Hassan y Mausoleo Mohammed V", "Jardines de los Oudayas", "Paseo marítimo de Rabat"] : ["Tour Hassan & Mausolée Mohammed V", "Jardins des Oudayas", "Corniche de Rabat"],
                    overnight: isEn ? "Boutique Hotel or Riad in Rabat" : isEs ? "Hotel con encanto en Rabat" : "Hôtel de charme à Rabat",
                    description: isEn 
                        ? "Comfortable highway transfer to Rabat. Tour the 12th-century Hassan Tower and the Kasbah of the Udayas."
                        : isEs 
                        ? "Viaje cómodo a Rabat: visita a la Torre Hassan del siglo XII y la Kasbah de los Oudayas frente al océano."
                        : "Trajet vers Rabat : découverte de la Tour Hassan et de la splendide Kasbah des Oudayas."
                },
                {
                    day: 6,
                    title: isEn ? "Rabat to Casablanca Coastal Drive & Hassan II Mosque" : isEs ? "Rabat a Casablanca y Gran Mezquita Hassan II" : "Rabat vers Casablanca & Mosquée Hassan II",
                    route: "Rabat → Mohammedia → Casablanca",
                    drivingTime: "~1.5 hrs",
                    distance: "90 km",
                    image: "/hero-landscape-1.webp",
                    imageAlt: "Casablanca Hassan II Mosque ocean view",
                    imagePlaceholderNote: "Photo recommended: Casablanca Hassan II Mosque or Ain Diab coastline",
                    highlights: isEn ? ["Hassan II Mosque ocean tour", "Ain Diab Corniche boulevard", "Art Deco city architecture"] : isEs ? ["Mezquita Hassan II", "Corniche Ain Diab", "Arquitectura Art Déco"] : ["Mosquée Hassan II", "Corniche d'Aïn Diab", "Centre Art Déco"],
                    overnight: isEn ? "Luxury Hotel in Casablanca" : isEs ? "Hotel de lujo en Casablanca" : "Hôtel à Casablanca",
                    description: isEn 
                        ? "Short coastal drive to Casablanca. Tour the breathtaking Hassan II Mosque and stroll the Atlantic corniche."
                        : isEs 
                        ? "Corto trayecto por la costa hasta Casablanca para visitar la Mezquita Hassan II sobre el océano."
                        : "Court trajet vers Casablanca et visite de la somptueuse Mosquée Hassan II face à l'océan."
                },
                {
                    day: 7,
                    title: isEn ? "Casablanca to Coastal Assilah Art Town" : isEs ? "Casablanca a la villa costera de Assilah" : "Casablanca vers la Cité d'Art d'Assilah",
                    route: "Casablanca → Larache → Assilah",
                    drivingTime: "~3.5 hrs",
                    distance: "300 km",
                    image: "/Asilah.webp",
                    imageAlt: "Assilah sea ramparts and painted murals Morocco",
                    highlights: isEn ? ["Assilah ocean ramparts & murals", "Lixus ancient Phoenician ruins", "Fresh grilled seafood lunch"] : isEs ? ["Murallas marinas y murales de Assilah", "Ruinas de Lixus", "Pescado fresco del puerto"] : ["Remparts océaniques et fresques d'Assilah", "Ruines de Lixus", "Poissons frais du port"],
                    overnight: isEn ? "Riad in Assilah Medina" : isEs ? "Riad en Assilah" : "Riad à Assilah",
                    description: isEn 
                        ? "Travel north along the Atlantic coast to Assilah, famed for its sea-facing fortifications, whitewashed houses, and vibrant street murals."
                        : isEs 
                        ? "Viaje hacia el norte hasta la encantadora villa de Assilah, famosa por sus murallas y murales artísticos."
                        : "Remontée vers Assilah, superbe cité blanche réputée pour ses fresques artistiques et ses remparts sur l'Atlantique."
                },
                {
                    day: 8,
                    title: isEn ? "Assilah to Tangier (or Casablanca) Airport Departure" : isEs ? "Assilah a Tánger (o Casablanca) y salida" : "Assilah vers Tanger (ou Casablanca) - Départ",
                    route: "Assilah → Tangier Airport/Port (or CMN)",
                    drivingTime: "~45 mins to Tangier",
                    distance: "45 km",
                    image: "/Tangier-Morocco-Photo.webp",
                    imageAlt: "Tangier airport departure",
                    highlights: isEn ? ["Seaside breakfast", "Punctual airport/ferry transfer"] : isEs ? ["Desayuno frente al mar", "Traslado puntual al aeropuerto o puerto"] : ["Dernier café face à l'océan", "Transfert ponctuel aéroport/port"],
                    overnight: isEn ? "Departure flight" : isEs ? "Vuelo de regreso" : "Vol retour",
                    description: isEn 
                        ? "Relax with seaside coffee before your chauffeur transfers you punctually to Tangier Airport/Ferry Port (or returns you to Casablanca)."
                        : isEs 
                        ? "Últimos momentos de relax antes del traslado puntual por su chófer al aeropuerto o puerto de salida."
                        : "Derniers moments de détente avant votre transfert ponctuel vers l'aéroport ou port de départ."
                }
            ]
        },
        {
            id: 'marrakech-deep-south',
            badge: isEn ? "Sahara & Coastal Loop" : isEs ? "Desierto y Costa Essaouira" : "Grand Sud & Océan",
            name: isEn ? "Marrakech, Sahara Desert & Essaouira (8 Days)" : isEs ? "Circuito Marrakech, Desierto y Essaouira (8 Días)" : "Boucle Marrakech, Sahara & Essaouira (8 Jours)",
            tagline: isEn 
                ? "Marrakech, High Atlas, Merzouga Desert dunes, Draa Valley, and Essaouira's bohemian Atlantic coast."
                : isEs
                ? "Marrakech, Alto Atlas, Desierto de Merzouga, Valle del Draa y la costa de Essaouira."
                : "Marrakech, Haut Atlas, Dunes de Merzouga, Vallée du Draa et Essaouira.",
            description: isEn
                ? "A circular 8-day route beginning and ending in Marrakech pairing the raw majesty of the Sahara desert with the refreshing ocean breeze of Essaouira."
                : isEs
                ? "Un itinerario circular con salida y llegada en Marrakech uniendo la aventura del desierto con el encanto costero de Essaouira."
                : "Un itinéraire circulaire complet au départ et retour de Marrakech mariant les dunes du désert et la douceur côtière d'Essaouira.",
            totalDistance: "~1,400 km",
            bestFor: isEn ? "Couples, Adventure seekers, Balanced pacing" : isEs ? "Parejas, Grandes espacios y Ritmo equilibrado" : "Couples, Amateurs de nature & Rythme serein",
            startEnd: isEn ? "Start: Marrakech / End: Marrakech" : isEs ? "Inicio: Marrakech / Fin: Marrakech" : "Départ : Marrakech / Fin : Marrakech",
            cities: ["Marrakech", "Ait Benhaddou", "Dades Gorges", "Merzouga Sahara", "Draa Valley", "Ouarzazate", "Essaouira", "Marrakech"],
            days: [
                {
                    day: 1,
                    title: isEn ? "Marrakech Arrival & Jemaa El-Fnaa Welcome" : isEs ? "Llegada a Marrakech y plaza Jemaa El-Fna" : "Arrivée Marrakech & Ambiance Jemaa El-Fna",
                    route: "Marrakech Airport → Riad",
                    drivingTime: "~30 mins",
                    distance: "15 km",
                    image: "/img/marrakech.jpg",
                    imageAlt: "Marrakech Jemaa El Fna",
                    highlights: isEn ? ["Airport VIP pickup", "Riad terrace sunset", "Jemaa El-Fna evening spectacle"] : isEs ? ["Recogida VIP en el aeropuerto", "Atardecer en terraza", "Noche en Jemaa El-Fna"] : ["Accueil personnalisé", "Terrasse de riad", "Place Jemaa El-Fna"],
                    overnight: isEn ? "Riad in Marrakech" : isEs ? "Riad en Marrakech" : "Riad à Marrakech",
                    description: isEn 
                        ? "Warm welcome at Marrakech Airport. Relax in your riad and dive into the energy of Jemaa El-Fnaa."
                        : isEs 
                        ? "Recepción en el aeropuerto de Marrakech, traslado al riad y primera noche en Jemaa El-Fna."
                        : "Accueil à l'aéroport de Marrakech, installation en riad et soirée sur la place Jemaa El-Fna."
                },
                {
                    day: 2,
                    title: isEn ? "Marrakech across Tizi n'Tichka Pass to Dades Valley" : isEs ? "Marrakech cruzando el Alto Atlas al Valle del Dadès" : "Marrakech vers les Gorges du Dadès",
                    route: "Marrakech → Tizi n'Tichka → Ait Benhaddou → Dades",
                    drivingTime: "~6 hrs",
                    distance: "310 km",
                    image: "/img/Ait Benhaddou.jpg",
                    imageAlt: "Ait Benhaddou Kasbah Atlas",
                    highlights: isEn ? ["Tizi n'Tichka 2,260m summit", "Ait Benhaddou UNESCO Kasbah", "Dades Gorge rock formations"] : isEs ? ["Paso Tizi n'Tichka", "Kasbah Ait Ben Haddou", "Curvas del Dadès"] : ["Col du Tizi n'Tichka", "Kasbah d'Aït Benhaddou", "Gorges du Dadès"],
                    overnight: isEn ? "Kasbah Hotel in Dades" : isEs ? "Hotel Kasbah en el Dadès" : "Hôtel Kasbah dans le Dadès",
                    description: isEn 
                        ? "Cross the High Atlas mountains, visit Ait Benhaddou, and sleep in the dramatic Dades canyon."
                        : isEs 
                        ? "Cruce del Alto Atlas, visita a Ait Ben Haddou y noche en el cañón del Dadès."
                        : "Traversée du Haut Atlas, visite d'Aït Benhaddou et nuit dans les gorges du Dadès."
                },
                {
                    day: 3,
                    title: isEn ? "Dades to Merzouga Sahara & Sunset Camel Ride" : isEs ? "Dadès al Desierto de Merzouga y dunas" : "Dadès vers le Désert de Merzouga & Dromadaire",
                    route: "Dades → Todra Gorges → Merzouga Camp",
                    drivingTime: "~4.5 hrs",
                    distance: "250 km",
                    image: "/Sahara.webp",
                    imageAlt: "Merzouga Sahara luxury camp",
                    highlights: isEn ? ["Todra Gorge canyon walk", "Erfoud fossil workshop", "Sunset camel trek into luxury dunes camp"] : isEs ? ["Paseo en Todra", "Taller de fósiles", "Campamento de lujo en las dunas"] : ["Falaises du Todra", "Coucher de soleil à dromadaire", "Bivouac de luxe"],
                    overnight: isEn ? "Luxury Sahara Desert Camp" : isEs ? "Campamento de Lujo en el Sahara" : "Bivouac de Luxe au Sahara",
                    description: isEn 
                        ? "Walk beneath Todra's vertical cliffs, then ride camels into the golden Erg Chebbi dunes for a Berber campfire night."
                        : isEs 
                        ? "Paseo por las Gargantas del Todra y excursión en dromedario en las dunas de Merzouga con noche en campamento de lujo."
                        : "Marche dans les gorges du Todra et départ à dos de dromadaire pour une nuit inoubliable dans les dunes."
                },
                {
                    day: 4,
                    title: isEn ? "Sahara Sunrise, Draa Valley Palm Oasis to Ouarzazate" : isEs ? "Amanecer en el Sahara y palmeral del Draa a Ouarzazate" : "Lever de Soleil au Sahara & Vallée du Draa vers Ouarzazate",
                    route: "Merzouga → Alnif → Agdz (Draa Valley) → Ouarzazate",
                    drivingTime: "~5.5 hrs",
                    distance: "360 km",
                    image: "/img/Morocco-trip-tour-hero08.webp",
                    imageAlt: "Draa Valley Palm Oasis Morocco",
                    imagePlaceholderNote: "Photo recommended: Draa Valley endless palm date oasis or Agdz ancient Kasbah",
                    highlights: isEn ? ["Sahara sunrise", "Draa Valley million-palm oasis", "Ancient Agdz mud-brick Kasbahs"] : isEs ? ["Amanecer en el desierto", "Palmeral del Valle del Draa", "Kasbahs de adobe en Agdz"] : ["Lever de soleil sur les dunes", "Palmeraie géante du Draa", "Kasbahs traditionnelles d'Agdz"],
                    overnight: isEn ? "Kasbah Hotel in Ouarzazate" : isEs ? "Hotel Kasbah en Ouarzazate" : "Hôtel Kasbah à Ouarzazate",
                    description: isEn 
                        ? "Experience dawn on the dunes, traverse volcanic landscapes, and follow the Draa Valley's endless palm grove to Ouarzazate."
                        : isEs 
                        ? "Amanecer en el desierto y ruta por el fascinante palmeral del Valle del Draa hasta Ouarzazate."
                        : "Lever de soleil sur les dunes et traversée de la somptueuse palmeraie du Draa jusqu'à Ouarzazate."
                },
                {
                    day: 5,
                    title: isEn ? "Ouarzazate to Coastal Essaouira via High Atlas Foothills" : isEs ? "Ouarzazate a Essaouira junto al Atlántico" : "Ouarzazate vers Essaouira sur l'Atlantique",
                    route: "Ouarzazate → Taroudant foothills → Essaouira",
                    drivingTime: "~5.5 hrs",
                    distance: "380 km",
                    image: "/img/Essaouira.webp",
                    imageAlt: "Essaouira coastal ramparts and blue fishing boats Morocco",
                    highlights: isEn ? ["Scenic southern Atlas drive", "Argan forest viewpoints", "Essaouira sea ramparts at sunset"] : isEs ? ["Paisajes del sur", "Bosques de argán", "Murallas de Essaouira al atardecer"] : ["Paysages du sud de l'Atlas", "Forêts d'arganiers", "Remparts d'Essaouira au coucher du soleil"],
                    overnight: isEn ? "Boutique Riad in Essaouira Medina" : isEs ? "Riad en la Medina de Essaouira" : "Riad de charme à Essaouira",
                    description: isEn 
                        ? "Travel from the desert gate to the Atlantic coast. Arrive in the bohemian, UNESCO-listed port of Essaouira."
                        : isEs 
                        ? "Viaje desde las puertas del desierto hasta la costa atlántica de Essaouira, villa marinera y artística."
                        : "Route des portes du désert jusqu'à la côte atlantique pour s'installer dans la magnifique médina d'Essaouira."
                },
                {
                    day: 6,
                    title: isEn ? "Full Day Relaxing in Bohemian Essaouira" : isEs ? "Día libre y relajante en Essaouira" : "Journée Détente dans la Cité d'Essaouira",
                    route: "Essaouira Port & Medina",
                    drivingTime: isEn ? "Driver on call" : isEs ? "Chófer a disposición" : "Chauffeur à disposition",
                    distance: "10 km",
                    image: "/img/Essaouira.webp",
                    imageAlt: "Essaouira harbour and ramparts",
                    highlights: isEn ? ["Historic Skala de la Ville ramparts", "Fresh grilled harbor seafood", "Artisan cedar woodwork souks"] : isEs ? ["Murallas de la Skala", "Pescado fresco en el puerto", "Artesanía en madera de tuya"] : ["Remparts de la Skala", "Poissons grillés sur le port", "Artisans du bois de thuya"],
                    overnight: isEn ? "Riad in Essaouira" : isEs ? "Riad en Essaouira" : "Riad à Essaouira",
                    description: isEn 
                        ? "Enjoy fresh Atlantic seafood, walk the ocean ramparts, and browse relaxed artisan art galleries and silver jewelry souks."
                        : isEs 
                        ? "Día para saborear marisco fresco, pasear por las murallas y disfrutar de la tranquilidad de Essaouira."
                        : "Journée de détente entre les remparts marins, les dégustations de poissons grillés et les ateliers d'art."
                },
                {
                    day: 7,
                    title: isEn ? "Essaouira to Marrakech via Argan Tree Groves" : isEs ? "Essaouira a Marrakech y tarde en los zocos" : "Essaouira vers Marrakech & Arganiers",
                    route: "Essaouira → Chichaoua → Marrakech",
                    drivingTime: "~2.5 hrs",
                    distance: "180 km",
                    image: "/img/marrakech-tour.webp",
                    imageAlt: "Marrakech souks and riad",
                    highlights: isEn ? ["Tree-climbing goats photo stop", "Women's organic argan cooperative", "Marrakech rooftop dinner"] : isEs ? ["Cabras en los árboles de argán", "Cooperativa de argán", "Cena en terraza en Marrakech"] : ["Arrêt insolite chèvres sur arganiers", "Coopérative d'argan", "Dîner en terrasse à Marrakech"],
                    overnight: isEn ? "Luxury Riad in Marrakech" : isEs ? "Riad de lujo en Marrakech" : "Riad de luxe à Marrakech",
                    description: isEn 
                        ? "Drive back to Marrakech, visiting a local argan oil cooperative on the way. Spend a magical final evening in the red city."
                        : isEs 
                        ? "Regreso a Marrakech con parada en una cooperativa de argán y última velada inolvidable en la ciudad roja."
                        : "Retour vers Marrakech avec halte dans une coopérative d'argan et dernière soirée magique dans la ville ocre."
                },
                {
                    day: 8,
                    title: isEn ? "Marrakech City Highlights & Airport Departure" : isEs ? "Últimas visitas en Marrakech y traslado al aeropuerto" : "Visite de Marrakech & Transfert Aéroport Retour",
                    route: "Marrakech City → Airport (RAK)",
                    drivingTime: "~30 mins",
                    distance: "15 km",
                    image: "/img/marrakech.jpg",
                    imageAlt: "Marrakech Airport departure",
                    highlights: isEn ? ["Majorelle Garden & Koutoubia", "Souk shopping", "Stress-free airport drop-off"] : isEs ? ["Jardín Majorelle y Koutoubia", "Compras finales", "Traslado puntual al aeropuerto"] : ["Jardin Majorelle", "Derniers achats", "Transfert ponctuel aéroport"],
                    overnight: isEn ? "Departure flight" : isEs ? "Vuelo de regreso" : "Vol retour",
                    description: isEn 
                        ? "Final sightseeing in Marrakech before your private driver transfers you punctually to Marrakech Menara Airport for your flight home."
                        : isEs 
                        ? "Últimas compras de recuerdos antes de que su conductor le traslade puntualmente al aeropuerto de Marrakech."
                        : "Derniers souvenirs dans les souks avant votre transfert aéroport assuré avec soin par votre chauffeur."
                }
            ]
        }
    ];

    const currentRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

    return (
        <section id="itinerary-selector" style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
            <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(220, 131, 78, 0.08)',
                        color: 'var(--primary)',
                        padding: '6px 16px',
                        borderRadius: '30px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1.2px',
                        marginBottom: '12px'
                    }}>
                        <Compass size={18} weight="bold" />
                        <span>{isEn ? "Curated 8-Day Private Driver Circuits" : isEs ? "Rutas de 8 Días con Chófer Privado" : "Circuits 8 Jours avec Chauffeur Privé"}</span>
                    </div>
                    <h2 style={{ 
                        fontSize: 'clamp(1.9rem, 4vw, 2.4rem)', 
                        fontWeight: 800, 
                        color: 'var(--secondary)', 
                        marginBottom: '14px',
                        textWrap: 'balance'
                    }}>
                        {isEn ? "Choose Your 8-Day Route or Customize 100% On-Demand" : isEs ? "Elija su Ruta de 8 Días o Personalice a Medida" : "Choisissez votre Circuit 8 Jours ou Créez le Vôtre"}
                    </h2>
                    <p style={{ maxWidth: '780px', margin: '0 auto', color: '#64748b', fontSize: '1.02rem', lineHeight: 1.7 }}>
                        {isEn 
                            ? "Select one of our 3 masterfully paced 8-day itineraries or start from scratch. Every stop, departure time, and hotel is completely flexible with your dedicated private chauffeur."
                            : isEs
                            ? "Elija entre nuestras 3 rutas de 8 días mejor valoradas o diseñe un circuito a medida. Cada parada, horario y hotel es 100% flexible con su chófer privado."
                            : "Sélectionnez l'un de nos 3 circuits phares de 8 jours ou créez votre itinéraire personnalisé. Chaque étape et chaque horaire s'adaptent à vos envies."}
                    </p>
                </div>

                {/* Route Selector Tabs */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px',
                    marginBottom: '35px',
                    backgroundColor: 'var(--bg-color)',
                    padding: '8px',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.06)'
                }}>
                    {routes.map(r => {
                        const isSelected = selectedRouteId === r.id;
                        return (
                            <button
                                key={r.id}
                                onClick={() => setSelectedRouteId(r.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    border: isSelected ? '2px solid var(--primary)' : '1px solid transparent',
                                    backgroundColor: isSelected ? '#ffffff' : 'transparent',
                                    boxShadow: isSelected ? '0 6px 20px rgba(220, 131, 78, 0.12)' : 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    color: isSelected ? 'var(--primary)' : '#94a3b8',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.6px',
                                    marginBottom: '4px'
                                }}>
                                    {r.badge}
                                </span>
                                <span style={{
                                    fontSize: '0.98rem',
                                    fontWeight: 700,
                                    color: isSelected ? 'var(--secondary)' : '#475569'
                                }}>
                                    {r.name}
                                </span>
                            </button>
                        );
                    })}

                    {/* Custom Route Tab Button */}
                    <button
                        onClick={() => setSelectedRouteId('custom-route')}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: selectedRouteId === 'custom-route' ? '2px solid var(--primary)' : '1px dashed #cbd5e1',
                            backgroundColor: selectedRouteId === 'custom-route' ? '#ffffff' : 'transparent',
                            boxShadow: selectedRouteId === 'custom-route' ? '0 6px 20px rgba(220, 131, 78, 0.12)' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: selectedRouteId === 'custom-route' ? 'var(--primary)' : '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.6px',
                            marginBottom: '4px'
                        }}>
                            {isEn ? "Custom Itinerary" : isEs ? "A Medida" : "Sur Mesure"}
                        </span>
                        <span style={{
                            fontSize: '0.98rem',
                            fontWeight: 700,
                            color: selectedRouteId === 'custom-route' ? 'var(--secondary)' : '#475569'
                        }}>
                            {isEn ? "Design Your Own 8-Day Circuit" : isEs ? "Diseñar su Propio Circuito" : "Créer Votre Circuit 100% Sur Mesure"}
                        </span>
                    </button>
                </div>

                {/* TAB CONTENT: IF CUSTOM ROUTE SELECTED */}
                {selectedRouteId === 'custom-route' ? (
                    <div style={{
                        backgroundColor: 'var(--bg-color)',
                        borderRadius: '20px',
                        padding: '45px 35px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(220, 131, 78, 0.15)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px auto'
                            }}>
                                <Sparkle size={30} weight="fill" />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '14px' }}>
                                {isEn ? "Have Specific Stops or Custom Flights in Mind?" : isEs ? "¿Tiene paradas o vuelos específicos en mente?" : "Vous avez un itinéraire précis ou des vols particuliers ?"}
                            </h3>
                            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.7, marginBottom: '30px' }}>
                                {isEn
                                    ? "Whether you're landing in Casablanca, Marrakech, Tangier, Fes, or Agadir, our 8-day private car with chauffeur package is completely at your disposal. Share your dates, preferred cities, or must-see landmarks, and we'll confirm your flat rate with zero return fees."
                                    : isEs
                                    ? "Tanto si aterriza en Casablanca, Marrakech, Tánger, Fez o Agadir, su coche con chófer privado estará a su total disposición durante 8 días. Indíquenos sus ciudades deseadas y le facilitaremos un presupuesto cerrado sin sorpresas."
                                    : "Que vous arriviez à Casablanca, Marrakech, Tanger, Fès ou Agadir, votre forfait chauffeur privé 8 jours s'adapte à 100% à votre feuille de route. Indiquez-nous vos étapes souhaitées pour un tarif forfaitaire sans aucun frais de retour."}
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '20px',
                                textAlign: 'left',
                                marginBottom: '35px'
                            }}>
                                <div style={{ backgroundColor: '#fff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>📍 {isEn ? "Multi-City Drop-Off" : isEs ? "Múltiples Ciudades" : "Villes Multiples"}</div>
                                    <p style={{ fontSize: '0.88rem', color: '#666', margin: 0, lineHeight: 1.5 }}>{isEn ? "Start in Casablanca and finish in Marrakech or Tangier with zero intercity return surcharges." : isEs ? "Comience en Casablanca y termine en Marrakech o Tánger sin suplementos." : "Départ de Casablanca et fin de parcours à Marrakech ou Tanger sans frais de retour."}</p>
                                </div>
                                <div style={{ backgroundColor: '#fff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>⏱️ {isEn ? "Roadtrip Flexibility" : isEs ? "Libertad de Horarios" : "Liberté d'horaires"}</div>
                                    <p style={{ fontSize: '0.88rem', color: '#666', margin: 0, lineHeight: 1.5 }}>{isEn ? "Spontaneous photo stops, tea breaks in Berber villages, and unhurried exploration." : isEs ? "Paradas fotográficas y pausas cuando le apetezca con su conductor." : "Arrêts photos et pauses thé au gré de vos envies sans contrainte horaire."}</p>
                                </div>
                                <div style={{ backgroundColor: '#fff', padding: '22px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>💰 {isEn ? "All-Inclusive Transport" : isEs ? "Transporte Todo Incluido" : "Transport Tout Compris"}</div>
                                    <p style={{ fontSize: '0.88rem', color: '#666', margin: 0, lineHeight: 1.5 }}>{isEn ? "Vehicle, fuel, highway tolls, parking, and driver lodging all covered up to 1,600 km." : isEs ? "Vehículo, combustible, peajes, parking y alojamiento del chófer incluidos hasta 1.600 km." : "Véhicule, carburant, péages et hébergement chauffeur inclus jusqu'à 1 600 km."}</p>
                                </div>
                            </div>

                            <a
                                href={getWhatsAppUrl(isEn ? "Hello Mdina Tours, I want to plan a custom 8-day private car and driver itinerary across Morocco." : isEs ? "Hola Mdina Tours, deseo planificar una ruta personalizada de 8 días con chófer privado en Marruecos." : "Bonjour Mdina Tours, je souhaite planifier un itinéraire sur mesure de 8 jours avec chauffeur au Maroc.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backgroundColor: '#25D366',
                                    color: '#fff',
                                    padding: '16px 32px',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.25)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <WhatsappLogo size={22} weight="fill" />
                                <span>{isEn ? "WhatsApp Us for a Free Custom 8-Day Quote" : isEs ? "Consultar Presupuesto Personalizado por WhatsApp" : "Obtenir un Devis WhatsApp en 10 min"}</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    /* TAB CONTENT: CURATED ROUTE BREAKDOWN */
                    <div>
                        {/* Route Overview Card */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '20px',
                            padding: '30px',
                            border: '1px solid rgba(0,0,0,0.06)',
                            marginBottom: '30px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)', margin: '0 0 6px 0' }}>
                                        {currentRoute.name}
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, maxWidth: '700px', lineHeight: 1.5 }}>
                                        {currentRoute.tagline}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ backgroundColor: '#fff', padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{isEn ? "Total Distance" : isEs ? "Distancia Total" : "Distance"}</div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>{currentRoute.totalDistance}</div>
                                    </div>
                                    <div style={{ backgroundColor: '#fff', padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{isEn ? "Ideal For" : isEs ? "Ideal Para" : "Idéal Pour"}</div>
                                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--secondary)' }}>{currentRoute.bestFor}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Route City Badges Flow */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 18px',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                border: '1px solid rgba(0,0,0,0.04)'
                            }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--secondary)', marginRight: '4px' }}>
                                    {isEn ? "Route Stops:" : isEs ? "Paradas:" : "Parcours :"}
                                </span>
                                {currentRoute.cities.map((city, idx) => (
                                    <React.Fragment key={idx}>
                                        <span style={{
                                            backgroundColor: 'rgba(220, 131, 78, 0.08)',
                                            color: 'var(--secondary)',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.82rem',
                                            fontWeight: 600
                                        }}>
                                            {city}
                                        </span>
                                        {idx < currentRoute.cities.length - 1 && (
                                            <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem' }}>→</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Expand / Collapse All Controls */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '18px' }}>
                                <button
                                    onClick={() => expandAll(currentRoute.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--primary)',
                                        fontWeight: 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {isEn ? "+ Expand All Days" : isEs ? "+ Desplegar Todos los Días" : "+ Tout Déplier"}
                                </button>
                                <span style={{ color: '#cbd5e1' }}>|</span>
                                <button
                                    onClick={() => collapseAll(currentRoute.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#64748b',
                                        fontWeight: 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isEn ? "- Collapse All" : isEs ? "- Plegar Todos" : "- Tout Replier"}
                                </button>
                            </div>
                        </div>

                        {/* Day-By-Day Visual Cards Breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                            {currentRoute.days.map(d => {
                                const dayKey = `${currentRoute.id}-${d.day}`;
                                const isExpanded = !!expandedDays[dayKey];

                                return (
                                    <div
                                        key={d.day}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '16px',
                                            border: isExpanded ? '1px solid rgba(220, 131, 78, 0.35)' : '1px solid rgba(0,0,0,0.06)',
                                            boxShadow: isExpanded ? '0 8px 25px rgba(0,0,0,0.03)' : '0 2px 6px rgba(0,0,0,0.01)',
                                            overflow: 'hidden',
                                            transition: 'all 0.25s ease'
                                        }}
                                    >
                                        {/* Day Header Accordion Toggle */}
                                        <button
                                            onClick={() => toggleDay(dayKey)}
                                            style={{
                                                width: '100%',
                                                padding: '20px 24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: isExpanded ? 'rgba(220, 131, 78, 0.02)' : '#ffffff',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                gap: '16px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                                <div style={{
                                                    backgroundColor: isExpanded ? 'var(--primary)' : 'rgba(220, 131, 78, 0.1)',
                                                    color: isExpanded ? '#ffffff' : 'var(--primary)',
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 800,
                                                    fontSize: '0.85rem',
                                                    flexShrink: 0
                                                }}>
                                                    <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', lineHeight: 1 }}>{isEn ? "Day" : isEs ? "Día" : "Jour"}</span>
                                                    <span>{d.day}</span>
                                                </div>

                                                <div>
                                                    <h4 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'var(--secondary)', margin: '0 0 4px 0' }}>
                                                        {d.title}
                                                    </h4>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#64748b', flexWrap: 'wrap' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>📍 {d.route}</span>
                                                        <span>•</span>
                                                        <span>⏱️ {d.drivingTime}</span>
                                                        <span>•</span>
                                                        <span>🛣️ {d.distance}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{
                                                color: isExpanded ? 'var(--primary)' : '#94a3b8',
                                                fontSize: '1.1rem',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {isExpanded ? <CaretUp size={20} weight="bold" /> : <CaretDown size={20} weight="bold" />}
                                            </div>
                                        </button>

                                        {/* Day Body Details */}
                                        {isExpanded && (
                                            <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                                    gap: '24px',
                                                    alignItems: 'start',
                                                    marginTop: '20px'
                                                }}>
                                                    {/* Left Column: Image Photo Asset Slot */}
                                                    <div style={{
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        backgroundColor: '#f1f5f9',
                                                        border: '1px solid rgba(0,0,0,0.06)',
                                                        position: 'relative'
                                                    }}>
                                                        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                                                            <img
                                                                src={d.image}
                                                                alt={d.imageAlt}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                loading="lazy"
                                                            />
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '8px',
                                                                left: '8px',
                                                                backgroundColor: 'rgba(0,0,0,0.65)',
                                                                color: '#ffffff',
                                                                padding: '4px 10px',
                                                                borderRadius: '6px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                backdropFilter: 'blur(4px)'
                                                            }}>
                                                                📸 Day {d.day} Landmark
                                                            </div>
                                                        </div>
                                                        {d.imagePlaceholderNote && (
                                                            <div style={{
                                                                padding: '8px 12px',
                                                                fontSize: '0.75rem',
                                                                color: '#64748b',
                                                                backgroundColor: '#f8fafc',
                                                                borderTop: '1px solid #f1f5f9'
                                                            }}>
                                                                💡 <em>{d.imagePlaceholderNote}</em>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Right Column: Highlights & Narrative */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                        {/* Highlights Chips */}
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {d.highlights.map((h, hIdx) => (
                                                                <span
                                                                    key={hIdx}
                                                                    style={{
                                                                        backgroundColor: 'rgba(220, 131, 78, 0.08)',
                                                                        color: 'var(--secondary)',
                                                                        padding: '4px 10px',
                                                                        borderRadius: '6px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 600
                                                                    }}
                                                                >
                                                                    ✓ {h}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Narrative text */}
                                                        <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                                                            {d.description}
                                                        </p>

                                                        {/* Lunch and Overnight Meta */}
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                            gap: '10px',
                                                            backgroundColor: 'var(--bg-color)',
                                                            padding: '12px 14px',
                                                            borderRadius: '10px',
                                                            fontSize: '0.82rem'
                                                        }}>
                                                            {d.lunchStop && (
                                                                <div>
                                                                    <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>🍽️ {isEn ? "Lunch Stop:" : isEs ? "Almuerzo:" : "Déjeuner :"} </span>
                                                                    <span style={{ color: '#64748b' }}>{d.lunchStop}</span>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>🏨 {isEn ? "Overnight:" : isEs ? "Noche:" : "Nuit :"} </span>
                                                                <span style={{ color: '#64748b' }}>{d.overnight}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Footer for Selected Route */}
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '16px',
                            padding: '24px 28px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '18px',
                            border: '1px solid rgba(220, 131, 78, 0.25)'
                        }}>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>
                                    {isEn ? `Ready to Book "${currentRoute.name}"?` : isEs ? `¿Listo para reservar "${currentRoute.name}"?` : `Prêt à réserver "${currentRoute.name}" ?`}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                                    {isEn ? "All-inclusive flat rate starting at €580 total for the 8 days with dedicated driver, vehicle, fuel & tolls." : isEs ? "Tarifa plana desde 580€ total para los 8 días con vehículo, chófer, combustible y peajes." : "Forfait dès 580€ tout compris pour les 8 jours avec véhicule, chauffeur, carburant et péages."}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <a
                                    href={getWhatsAppUrl(`Hello Mdina Tours, I would like to book the "${currentRoute.name}" 8-day tour with a private driver. Could you provide vehicle availability and quote?`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#25D366',
                                        color: '#fff',
                                        padding: '12px 24px',
                                        borderRadius: '30px',
                                        fontSize: '0.92rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)'
                                    }}
                                >
                                    <WhatsappLogo size={20} weight="fill" />
                                    <span>{isEn ? "Inquire on WhatsApp" : isEs ? "Consultar por WhatsApp" : "Réserver sur WhatsApp"}</span>
                                </a>
                                <a
                                    href="#booking"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: 'var(--primary)',
                                        color: '#fff',
                                        padding: '12px 24px',
                                        borderRadius: '30px',
                                        fontSize: '0.92rem',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span>{isEn ? "Calculate Quote Online" : isEs ? "Calcular Precio Online" : "Calculer mon devis"}</span>
                                    <ArrowRight size={16} weight="bold" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* SMART COMPARISON MATRIX */}
                <div style={{ marginTop: '70px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                            {isEn ? "Transparent Comparison" : isEs ? "Comparativa Transparente" : "Comparatif Transparent"}
                        </span>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '8px' }}>
                            {isEn ? "Private Chauffeur vs Generic Bus Tour vs Self-Drive" : isEs ? "Chófer Privado vs Autobús en Grupo vs Conducir por su Cuenta" : "Chauffeur Privé vs Circuit en Bus vs Location Sans Chauffeur"}
                        </h3>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            minWidth: '600px'
                        }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--secondary)', color: '#ffffff' }}>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '0.9rem' }}>{isEn ? "Feature" : isEs ? "Criterio" : "Critère"}</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--primary)', color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>
                                        ⭐ {isEn ? "Mdina Tours Chauffeur" : isEs ? "Chófer Mdina Tours" : "Chauffeur Mdina Tours"}
                                    </th>
                                    <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.88rem', color: '#cbd5e1' }}>
                                        {isEn ? "Big Group Tour Bus" : isEs ? "Tour en Autobús" : "Circuit en Bus"}
                                    </th>
                                    <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '0.88rem', color: '#cbd5e1' }}>
                                        {isEn ? "Self-Drive Rental" : isEs ? "Coche Alquiler Solo" : "Location Sans Chauffeur"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        feature: isEn ? "Flexible Daily Stops & Timing" : isEs ? "Horarios y paradas flexibles" : "Liberté des arrêts & horaires",
                                        mdina: isEn ? "100% Freedom — Stop anywhere anytime" : isEs ? "Libertad absoluta en todo momento" : "Liberté totale à tout moment",
                                        bus: isEn ? "Rigid — Fixed group timetable" : isEs ? "Horarios rígidos de grupo" : "Horaires de groupe stricts",
                                        self: isEn ? "Yes, but stressful navigation" : isEs ? "Sí, pero estresante al navegar" : "Oui, mais stress de navigation"
                                    },
                                    {
                                        feature: isEn ? "Mountain & Desert Road Safety" : isEs ? "Seguridad en carreteras de montaña" : "Sécurité routes de montagne",
                                        mdina: isEn ? "Licensed, expert mountain chauffeur" : isEs ? "Conductor local profesional" : "Chauffeur expert de montagne",
                                        bus: isEn ? "Slow, crowded bus coach" : isEs ? "Conducción lenta en autobús" : "Conduite lente en autocar",
                                        self: isEn ? "Risky on Atlas switchbacks & police checkpoints" : isEs ? "Arriesgado y agotador en el Atlas" : "Fatigant et risqué dans l'Atlas"
                                    },
                                    {
                                        feature: isEn ? "Fuel, Tolls & Parking Costs" : isEs ? "Combustible, peajes y parkings" : "Carburant, péages et parkings",
                                        mdina: isEn ? "100% Included in flat package rate" : isEs ? "100% Incluido en la tarifa plana" : "100% Inclus dans le forfait",
                                        bus: isEn ? "Included (rigid route only)" : isEs ? "Incluido (ruta prefijada)" : "Inclus (mais trajet figé)",
                                        self: isEn ? "Extra expenses everywhere + parking hassles" : isEs ? "Gastos imprevistos continuos" : "Frais imprévus et galère de parking"
                                    },
                                    {
                                        feature: isEn ? "Luggage & Medina Access" : isEs ? "Gestión de equipaje y acceso a riads" : "Gestion bagages & accès riads",
                                        mdina: isEn ? "Door-to-door assistance & riad coordination" : isEs ? "Asistencia con maletas hasta el riad" : "Prise en charge bagages jusqu'au riad",
                                        bus: isEn ? "Long walk from outer bus parking" : isEs ? "Larga caminata desde el parking" : "Longue marche depuis le parking bus",
                                        self: isEn ? "Dragging bags through pedestrian medinas" : isEs ? "Cargar maletas por las callejuelas" : "Traîner ses valises dans les ruelles"
                                    },
                                    {
                                        feature: isEn ? "Hotel & Riad Freedom" : isEs ? "Elección de hoteles y riads" : "Choix des hôtels & riads",
                                        mdina: isEn ? "Stay anywhere you want (Boutique to 5★ Luxury)" : isEs ? "Elija libremente donde alojarse" : "Liberté totale de vos hébergements",
                                        bus: isEn ? "Imposed generic group hotels" : isEs ? "Hoteles masivos impuestos" : "Hôtels de groupe imposés",
                                        self: isEn ? "Free choice" : isEs ? "Elección libre" : "Libre choix"
                                    }
                                ].map((row, rIdx) => (
                                    <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: rIdx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                        <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--secondary)', fontSize: '0.88rem' }}>
                                            {row.feature}
                                        </td>
                                        <td style={{ padding: '14px 20px', textAlign: 'center', backgroundColor: 'rgba(220, 131, 78, 0.05)', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                                            ✓ {row.mdina}
                                        </td>
                                        <td style={{ padding: '14px 20px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                                            {row.bus}
                                        </td>
                                        <td style={{ padding: '14px 20px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                                            {row.self}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
}

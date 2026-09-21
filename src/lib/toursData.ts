export interface TourItineraryItem {
    title: string;
    desc: string;
}

export interface TourFAQ {
    q: string;
    a: string;
}

export interface LocalizedTourData {
    title: string;
    tagline: string;
    description: string;
    excerpt: string;
    duration: string;
    priceText: string;
    departureCity?: string;
    finishCity?: string;
    highlights: string[];
    itinerary: TourItineraryItem[];
    whatsIncluded: string[];
    whatsExcluded: string[];
    faqs: TourFAQ[];
    seoTitle: string;
    seoDesc: string;
}

export interface TourData {
    slug: string;
    image: string;
    price: number;
    en: LocalizedTourData;
    fr: LocalizedTourData;
    es?: LocalizedTourData;
}

export const toursData: TourData[] = [
    {
        slug: "marrakech-day-trip",
        image: "/hero-marrakech.webp",
        price: 249,
        en: {
            title: "Marrakech Day Trip",
            tagline: "Vibrant Souks, Historic Palaces, and Majestic Monuments",
            excerpt: "Immerse yourself in the bustling energy of the Red City. Discover historic palaces, botanical gardens, and the legendary Jemaa el-Fnaa square.",
            description: "Journey from Rabat or Casablanca to Marrakech, the ultimate cultural jewel of Morocco. Led by our certified local guides, this private excursion takes you through centuries of history. Experience the perfect blend of Moorish architecture, lively street performances, and artisanal shopping in the labyrinthine medina. Customize your itinerary to match your interests, whether you want to focus on historical palaces or peaceful garden retreats.",
            duration: "10-12 hours",
            priceText: "From €249 per person",
            departureCity: "Casablanca",
            finishCity: "Casablanca",
            highlights: [
                "Private transport with a professional chauffeur from Rabat/Casablanca",
                "Guided walking tour of the historic Marrakech Medina",
                "Visit the iconic Koutoubia Mosque and the Bahia Palace",
                "Explore the enchanting Majorelle Gardens and Yves Saint Laurent Museum",
                "Experience the sensory overload of Jemaa el-Fnaa square at sunset"
            ],
            itinerary: [
                { title: "07:30 AM - Departure", desc: "Enjoy a comfortable pickup from your hotel or residence in Rabat/Casablanca in a premium air-conditioned vehicle." },
                { title: "10:30 AM - Arrival & Medina Guided Tour", desc: "Meet your expert local guide and begin your exploration at the Bahia Palace, showing intricate stucco work and Zellij tiles, followed by the towering Koutoubia minaret." },
                { title: "01:00 PM - Traditional Riad Lunch", desc: "Savor an authentic Moroccan lunch (Tajine or Couscous) inside a peaceful, hidden courtyard riad in the heart of the old city." },
                { title: "02:30 PM - Botanical Wonders", desc: "Visit the world-famous Majorelle Gardens, discovering its vibrant cobalt blue villa and exotic desert cacti collection." },
                { title: "04:30 PM - Jemaa el-Fnaa & Souks", desc: "Wander through colorful artisanal souks and watch the Jemaa el-Fnaa square come alive with snake charmers, storytellers, and musicians." },
                { title: "06:30 PM - Return Journey", desc: "Relax as your private driver transports you safely back to Rabat, arriving in the evening." }
            ],
            whatsIncluded: [
                "Round-trip private transportation in a modern, air-conditioned vehicle",
                "All fuel, highway tolls, and parking fees",
                "Certified multilingual local guide in Marrakech (3 hours)",
                "Bottled mineral water during the trip"
            ],
            whatsExcluded: [
                "Entrance fees to monuments (Bahia Palace: ~70 MAD; Majorelle: ~150 MAD)",
                "Lunch and personal drinks",
                "Tips/gratuities for driver and guide"
            ],
            faqs: [
                { q: "What should I wear for this day trip?", a: "We recommend comfortable walking shoes and modest clothing that covers shoulders and knees, which is respectful when visiting historical sights." },
                { q: "Can we customize the starting time?", a: "Yes, this is a 100% private trip. You can adjust the departure time to suit your schedule, though we recommend an early start to maximize daylight." },
                { q: "Is this tour suitable for children?", a: "Yes, our private tours are family-friendly and the pace can be adjusted. Child car seats are provided upon request." },
                { q: "Are there any hidden costs?", a: "No, all transportation, guide fees, and listed inclusions are covered. You only pay for personal purchases, meals, and optional entrance fees." }
            ],
            seoTitle: "Private Marrakech Day Trip - Expert Guided Tours | Mdina Tours",
            seoDesc: "Discover the magic of Marrakech on a private day trip from Rabat. Enjoy round-trip transfers, an expert local guide, Bahia Palace, and Jemaa el-Fnaa."
        },
        fr: {
            title: "Excursion d'une Journée à Marrakech",
            tagline: "Souks Vibrants, Palais Historiques et Monuments Majestueux",
            excerpt: "Immergez-vous dans l'énergie débordante de la Ville Rouge. Découvrez des palais historiques, des jardins botaniques et la légendaire place Jemaa el-Fna.",
            description: "Voyagez depuis Rabat ou Casablanca vers Marrakech, le joyau culturel ultime du Maroc. Accompagné par nos guides locaux certifiés, cette excursion privée vous fait traverser des siècles d'histoire. Découvrez le mélange parfait d'architecture mauresque, de spectacles de rue animés et de shopping artisanal dans la médina labyrinthique. Personnalisez votre itinéraire selon vos envies.",
            duration: "10-12 heures",
            priceText: "À partir de 249 € par personne",
            departureCity: "Casablanca",
            finishCity: "Casablanca",
            highlights: [
                "Transport privé avec chauffeur professionnel depuis Rabat/Casablanca",
                "Visite guidée à pied de la médina historique de Marrakech",
                "Visite du célèbre palais de la Bahia et de la mosquée Koutoubia",
                "Exploration des magnifiques jardins Majorelle",
                "Immersion dans l'animation unique de la place Jemaa el-Fna en fin de journée"
            ],
            itinerary: [
                { title: "07h30 - Départ", desc: "Prise en charge à votre hôtel à Rabat/Casablanca à bord d'un véhicule climatisé haut de gamme." },
                { title: "10h30 - Arrivée & Visite Guidée de la Médina", desc: "Rencontre avec votre guide local officiel et début de la visite par le Palais de la Bahia et la mosquée Koutoubia." },
                { title: "13h00 - Déjeuner Traditionnel", desc: "Dégustez un déjeuner marocain authentique dans le patio calme d'un riad secret au cœur de la médina." },
                { title: "14h30 - Merveilles Botaniques", desc: "Visite du Jardin Majorelle, célèbre pour sa villa bleu cobalt et sa collection de cactus exotiques." },
                { title: "16h30 - Jemaa el-Fna & Les Souks", desc: "Promenez-vous dans les souks animés et observez l'effervescence de la place Jemaa el-Fna au coucher du soleil." },
                { title: "18h30 - Retour", desc: "Détendez-vous pendant que votre chauffeur vous ramène en toute sécurité à votre point de départ." }
            ],
            whatsIncluded: [
                "Transport privé aller-retour en véhicule récent et climatisé",
                "Carburant, péages d'autoroute et frais de parking",
                "Guide local certifié et multilingue à Marrakech (3 heures)",
                "Eau minérale en bouteille durant le trajet"
            ],
            whatsExcluded: [
                "Frais d'entrée dans les monuments (Palais Bahia : ~70 MAD ; Majorelle : ~150 MAD)",
                "Déjeuner et boissons personnelles",
                "Pourboires pour le chauffeur et le guide"
            ],
            faqs: [
                { q: "Quelle tenue est recommandée ?", a: "Nous recommandons des chaussures de marche confortables et des vêtements respectueux couvrant les épaules et les genoux." },
                { q: "Peut-on modifier l'heure de départ ?", a: "Oui, c'est une excursion 100% privée. Vous pouvez ajuster l'heure de départ selon vos préférences." },
                { q: "Ce circuit est-il adapté aux enfants ?", a: "Oui, l'allure de nos visites privées s'adapte à toute la famille. Des sièges enfants sont fournis sur demande." },
                { q: "Y a-t-il des coûts cachés ?", a: "Non, tous les frais de transport et de guide sont inclus. Vous ne payez que les repas, achats personnels et entrées aux monuments." }
            ],
            seoTitle: "Excursion Privée à Marrakech depuis Rabat | Mdina Tours",
            seoDesc: "Explorez Marrakech lors d'une excursion privée exclusive depuis Rabat. Transport haut de gamme, guide officiel, Palais Bahia et Jardin Majorelle inclus."
        },
        es: {
            title: "Excursión privada a Marrakech desde Casablanca",
            tagline: "Palacios Históricos, Zocos Vibrantes y la Legendaria Plaza Jemaa el-Fna",
            excerpt: "Sumérjase en la energía de la Ciudad Roja. Descubra palacios históricos, jardines botánicos y el ambiente único de la plaza Jemaa el-Fna.",
            description: "Viaje desde Casablanca hasta Marrakech, la joya cultural más fascinante de Marruecos. Acompañado por un guía local oficial de habla hispana, esta excursión privada le llevará a través de siglos de historia andalusí y bereber. Disfrute de la arquitectura morisca del Palacio Bahía, el encanto del Jardín Majorelle y la vida artesanal de la medina. Itinerario 100% privado y flexible adaptado a su ritmo.",
            duration: "10-12 horas",
            priceText: "Desde 249 € por persona",
            departureCity: "Casablanca",
            finishCity: "Casablanca",
            highlights: [
                "Transporte privado de ida y vuelta en vehículo climatizado desde Casablanca",
                "Visita guiada a pie por la medina histórica con guía oficial",
                "Entrada y visita al emblemático Palacio Bahía y la mezquita Koutoubia",
                "Exploración del Jardín Majorelle y el entorno del Museo Yves Saint Laurent",
                "Inmersión en el ambiente nocturno de la plaza Jemaa el-Fna al atardecer"
            ],
            itinerary: [
                { title: "07:30 - Recogida en Casablanca", desc: "Recogida privada en su hotel o riad en Casablanca en vehículo premium con conductor profesional." },
                { title: "10:30 - Llegada y Visita Guiada de la Medina", desc: "Encuentro con su guía oficial local y recorrido por el Palacio Bahía, los zocos artesanales y el exterior de la mezquita Koutoubia." },
                { title: "13:00 - Almuerzo Tradicional en Riad", desc: "Tiempo libre para disfrutar de un auténtico tajine o cuscús marroquí en el patio interior de un riad tradicional." },
                { title: "14:30 - Jardín Majorelle", desc: "Paseo entre plantas exóticas, cactus y la célebre villa azul cobalto que enamoró a Yves Saint Laurent." },
                { title: "16:30 - Plaza Jemaa el-Fna y Zocos", desc: "Tiempo para recorrer los puestos de especias, babuchas, faroles y vivir la magia de la plaza al caer la tarde." },
                { title: "18:30 - Regreso a Casablanca", desc: "Regreso cómodo por autopista directa hacia su hotel en Casablanca." }
            ],
            whatsIncluded: [
                "Transporte privado de ida y vuelta en vehículo moderno con chófer profesional",
                "Combustible, peajes de autopista y aparcamientos",
                "Guía local oficial en Marrakech (3 horas)",
                "Agua mineral embotellada durante el trayecto"
            ],
            whatsExcluded: [
                "Entradas a monumentos (Palacio Bahía ~70 MAD, Jardín Majorelle ~150 MAD)",
                "Almuerzo y bebidas personales",
                "Propinas para el chófer y el guía"
            ],
            faqs: [
                { q: "¿Es posible salir desde Rabat?", a: "Sí, podemos organizar la salida desde Rabat mediante cotización personalizada con un pequeño ajuste de tiempo de trayecto." },
                { q: "¿El guía habla español?", a: "Sí, asignamos guías oficiales locales acreditados con perfecto dominio del español para que disfrute de la historia sin barreras de idioma." },
                { q: "¿Qué ropa se recomienda llevar?", a: "Calzado cómodo para caminar por la medina y ropa respetuosa que cubra hombros y rodillas al visitar monumentos históricos." },
                { q: "¿Se puede personalizar el horario de salida?", a: "Por supuesto. Al tratarse de una excursión 100% privada, puede ajustar la hora de recogida según su preferencia." }
            ],
            seoTitle: "Excursión Privada a Marrakech desde Casablanca | Mdina Tours",
            seoDesc: "Descubra Marrakech en una excursión privada de un día desde Casablanca. Chófer privado, guía oficial en español, Palacio Bahía y Jardín Majorelle."
        }
    },
    {
        slug: "chefchaouen-day-trip",
        image: "/hero-chefchaouen.webp",
        price: 249,
        en: {
            title: "Chefchaouen Blue City Tour",
            tagline: "Explore the Hidden Blue Pearl of the Rif Mountains",
            excerpt: "Wander through the photogenic, blue-washed streets of Chefchaouen, hike to the Spanish Mosque, and enjoy spectacular mountain scenery.",
            description: "Escape to the tranquil Rif Mountains and explore Chefchaouen, Morocco's famous 'Blue Pearl'. Founded in 1471, this beautiful mountain fortress is celebrated for its soothing blue-washed alleys, artistic vibe, and laid-back atmosphere. Walk up to the Spanish Mosque for a panoramic view of the entire valley and learn about the city's unique Andalusian history from a local perspective.",
            duration: "12-14 hours",
            priceText: "From €249 per person",
            departureCity: "Rabat / Casablanca / Tangier",
            finishCity: "Rabat / Casablanca / Tangier",
            highlights: [
                "Comfortable private drive through the scenic Rif Mountain range",
                "Stroll along the iconic blue-painted streets of the old Medina",
                "Visit the historic Kasbah museum and Outa el-Hammam square",
                "Hike up to the Spanish Mosque for an unforgettable sunset panorama",
                "Shop for unique hand-woven textiles and local goat cheese"
            ],
            itinerary: [
                { title: "07:00 AM - Departure from Rabat", desc: "Your private chauffeur picks you up early to head north towards the Rif Mountains." },
                { title: "11:00 AM - Arrival & Guided Exploration", desc: "Begin your walk at the Bab el-Ain gateway and explore the blue alleyways, discovering hidden photographic corners." },
                { title: "01:00 PM - Lunch at Outa el-Hammam", desc: "Enjoy a delicious local tagine seasoned with mountain herbs at a rooftop restaurant overlooking the main square." },
                { title: "02:30 PM - Ras el-Maa Waterfall & Spanish Mosque Hike", desc: "Walk past the fresh mountain spring waters of Ras el-Maa and take a gentle 15-minute hike up to the Spanish Mosque for panoramic views." },
                { title: "05:00 PM - Free Time to Shop", desc: "Browse artisanal shops offering handmade rugs, woolen blankets, and unique cedarwood crafts." },
                { title: "06:30 PM - Return Drive", desc: "Depart Chefchaouen and relax in your private vehicle, arriving back in Rabat by late evening." }
            ],
            whatsIncluded: [
                "Full-day private vehicle and dedicated chauffeur",
                "Fuel, toll charges, and local taxes",
                "English/French speaking local assistant/guide",
                "Hotel pickup and drop-off"
            ],
            whatsExcluded: [
                "Entrance fees to the Kasbah Museum (~60 MAD)",
                "Lunch and beverages",
                "Personal shopping and gratuities"
            ],
            faqs: [
                { q: "Is the hike to the Spanish Mosque difficult?", a: "No, it is a gradual, paved path that takes about 15 to 20 minutes from the spring. It is suitable for all fitness levels, but good sneakers are recommended." },
                { q: "Why are the walls painted blue?", a: "There are multiple theories: some say it was introduced by Jewish refugees in the 1930s to symbolize heaven, while others believe it repels mosquitoes and keeps houses cool." },
                { q: "What should I pack for this tour?", a: "Bring a camera, comfortable walking shoes, sunglasses, and a light jacket as the mountain air can be cooler than the coast." },
                { q: "Is a day trip to Chefchaouen possible from my location?", a: "Yes, our private transport makes it a comfortable day trip from Fes, Rabat, or Tangier, though it involves several hours of driving." }
            ],
            seoTitle: "Chefchaouen Private Day Trip from Rabat | Mdina Tours",
            seoDesc: "Book a private day excursion to the Blue City of Chefchaouen from Rabat. Relax in a premium vehicle with a local driver and explore the Blue Pearl."
        },
        fr: {
            title: "Excursion à Chefchaouen, la Ville Bleue",
            tagline: "Explorez la Perle Bleue Cachée dans les Montagnes du Rif",
            excerpt: "Flânez dans les ruelles peintes en bleu de Chefchaouen, grimpez jusqu'à la mosquée espagnole et profitez de panoramas montagneux grandioses.",
            description: "Évadez-vous dans le calme des montagnes du Rif pour visiter Chefchaouen, la célèbre 'Perle Bleue' du Maroc. Fondée en 1471, cette forteresse montagnarde est réputée pour ses ruelles blanchies à la chaux bleue, son ambiance artistique et sa tranquillité. Montez jusqu'à la mosquée espagnole pour une vue à couper le souffle sur toute la vallée.",
            duration: "12-14 heures",
            priceText: "À partir de 249 € par personne",
            departureCity: "Rabat / Casablanca / Tanger",
            finishCity: "Rabat / Casablanca / Tanger",
            highlights: [
                "Trajet privé confortable à travers les paysages du Rif",
                "Balade dans les ruelles bleues emblématiques de la médina",
                "Visite de la Kasbah historique et de la place Outa el-Hammam",
                "Randonnée accessible vers la mosquée espagnole pour le coucher du soleil",
                "Découverte de l'artisanat local (tissage, cuir, fromage de chèvre)"
            ],
            itinerary: [
                { title: "07h00 - Départ de Rabat", desc: "Prise en charge à votre hôtel par votre chauffeur privé pour prendre la direction du nord." },
                { title: "11h00 - Arrivée & Visite Libre", desc: "Entrez par la porte Bab el-Ain et laissez-vous charmer par les dégradés de bleu des façades." },
                { title: "13h00 - Déjeuner Place Outa el-Hammam", desc: "Dégustez un tajine traditionnel préparé avec les herbes de la montagne sur une terrasse panoramique." },
                { title: "14h30 - Source de Ras el-Maa & Mosquée Espagnole", desc: "Découvrez les lavoirs de Ras el-Maa, puis entamez la marche de 15 minutes vers la mosquée espagnole." },
                { title: "17h00 - Temps Libre & Shopping", desc: "Flânez dans les boutiques de tapis berbères, de couvertures en laine et d'objets artisanaux." },
                { title: "18h30 - Retour", desc: "Départ de Chefchaouen et trajet retour confortable vers Rabat." }
            ],
            whatsIncluded: [
                "Chauffeur privé dédié et véhicule moderne toute la journée",
                "Carburant, frais de péage et stationnement",
                "Accompagnateur local multilingue",
                "Prise en charge et retour à l'hôtel"
            ],
            whatsExcluded: [
                "Entrée au musée de la Kasbah (~60 MAD)",
                "Déjeuner et boissons",
                "Dépenses personnelles et pourboires"
            ],
            faqs: [
                { q: "La marche vers la mosquée espagnole est-elle difficile ?", a: "Non, c'est un chemin pavé très accessible d'environ 15 minutes. Prévoyez de bonnes chaussures de marche." },
                { q: "Pourquoi les murs sont-ils bleus ?", a: "Plusieurs théories existent : certains l'attribuent aux réfugiés juifs des années 1930 pour rappeler le ciel, d me disent que cela repousse les moustiques." },
                { q: "Que dois-je emporter pour cette excursion ?", a: "Prévoyez un appareil photo, de bonnes chaussures de marche, et une veste légère car l'air de la montagne peut être frais." },
                { q: "L'excursion d'une journée est-elle faisable ?", a: "Oui, notre transport privé permet de visiter Chefchaouen confortablement depuis Fès, Rabat ou Tanger sur la journée." }
            ],
            seoTitle: "Excursion Privée Chefchaouen depuis Rabat | Mdina Tours",
            seoDesc: "Découvrez la ville bleue de Chefchaouen lors d'une excursion d'une journée au départ de Rabat. Transport VIP et accompagnement local inclus."
        },
        es: {
            title: "Excursión a Chefchaouen, la Ciudad Azul",
            tagline: "Descubra la Perla Azul oculta en las Montañas del Rif",
            excerpt: "Pasee por las icónicas callejuelas azules de Chefchaouen, camine hasta la Mezquita Española y disfrute de paisajes montañosos únicos.",
            description: "Escápese a la serenidad de las montañas del Rif para visitar Chefchaouen, la famosa 'Perla Azul' de Marruecos. Fundada en 1471 como fortaleza, esta ciudad cautiva por sus casas encaladas en azul, su ambiente tranquilo y su influencia andalusí. Suba a la Mezquita Española para admirar la panorámica del valle y conozca su historia local.",
            duration: "12-14 horas",
            priceText: "Desde 249 € por persona",
            departureCity: "Rabat / Casablanca / Tánger",
            finishCity: "Rabat / Casablanca / Tánger",
            highlights: [
                "Viaje cómodo en vehículo privado a través del paisaje del Rif",
                "Paseo por las calles y rincones azules de la medina histórica",
                "Visita a la Kasbah y a la animada plaza Outa el-Hammam",
                "Caminata suave hacia la Mezquita Española para ver el atardecer",
                "Tiempo libre para descubrir artesanía local en lana, cuero y madera"
            ],
            itinerary: [
                { title: "07:00 - Salida", desc: "Recogida privada en su hotel o riad en un vehículo climatizado para poner rumbo al norte." },
                { title: "11:00 - Llegada y Exploración de la Medina", desc: "Entrada por la puerta Bab el-Ain y recorrido por las callejuelas azules y plazas tradicionales." },
                { title: "13:00 - Almuerzo en la Plaza Outa el-Hammam", desc: "Tiempo para saborear un tajine tradicional en una terraza con vistas a la cordillera del Rif." },
                { title: "14:30 - Manantial de Ras el-Maa y Mezquita Española", desc: "Paseo por los lavaderos de Ras el-Maa y subida panorámica de 15 minutos hasta la Mezquita Española." },
                { title: "17:00 - Tiempo Libre y Compras", desc: "Tiempo para recorrer tiendas de artesanía, telares tradicionales y productos locales." },
                { title: "18:30 - Regreso", desc: "Salida de Chefchaouen y trayecto de vuelta relajado en su vehículo privado." }
            ],
            whatsIncluded: [
                "Vehículo privado y conductor profesional durante toda la jornada",
                "Combustible, peajes de autopista y aparcamientos",
                "Asistente local con conocimientos de idiomas",
                "Recogida y regreso en su hotel"
            ],
            whatsExcluded: [
                "Entrada al Museo de la Kasbah (~60 MAD)",
                "Almuerzo y bebidas",
                "Gastos personales y propinas"
            ],
            faqs: [
                { q: "¿Es difícil la caminata hasta la Mezquita Española?", a: "No, es un sendero empedrado accesible que toma entre 15 y 20 minutos. Se recomienda llevar calzado cómodo." },
                { q: "¿Por qué las paredes están pintadas de azul?", a: "Existen varias explicaciones: una tradición introducida por refugiados en los años 30 para evocar el cielo, y la creencia popular de que ahuyenta a los mosquitos y mantiene frescas las casas." },
                { q: "¿Qué debo llevar para esta excursión?", a: "Cámara de fotos, calzado cómodo para caminar, gafas de sol y una chaqueta ligera, ya que el clima de montaña suele ser más fresco." },
                { q: "¿Se puede realizar como excursión de un día?", a: "Sí, gracias al transporte privado directo es una excursión cómoda de día completo desde Rabat, Fez o Tánger." }
            ],
            seoTitle: "Excursión Privada a Chefchaouen desde Rabat | Mdina Tours",
            seoDesc: "Reserve su excursión privada a la Ciudad Azul de Chefchaouen. Conductor privado en vehículo moderno, recogida en su hotel y ruta personalizada en Marruecos."
        }
    },
    {
        slug: "atlas-mountains-tour",
        image: "/hero-landscape-3.webp",
        price: 210,
        en: {
            title: "Atlas Mountains & Ourika Valley Tour",
            tagline: "Scenic Waterfalls, Berber Villages, and Majestic Peaks",
            excerpt: "Escape the city heat. Travel to the high High Atlas peaks, hike past rushing mountain waterfalls, and share traditional mint tea with a Berber family.",
            description: "Immerse yourself in the traditional mountain culture of Morocco's High Atlas. Rushing mountain rivers, terraced agricultural plots, and red-clay villages carved into canyon walls define the Ourika Valley and Imlil region. This tour takes you off the beaten path to explore authentic Berber heritage, hike past mountain streams, and witness how locals have lived in harmony with the mountains for thousands of years.",
            duration: "8-10 hours",
            priceText: "From €210 per person",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Breathtaking mountain drives through the foothills of Mount Toubkal",
                "Guided trek to the seven cooling waterfalls of Setti Fatma",
                "Cross traditional wooden suspension bridges over the Ourika river",
                "Visit a local Berber family home for freshly baked bread and mint tea",
                "Stop at an authentic women's Argan oil co-operative"
            ],
            itinerary: [
                { title: "08:30 AM - Hotel Pick-up", desc: "Depart Casablanca or Marrakech towards the dramatic backdrop of the snow-capped High Atlas Mountains." },
                { title: "10:00 AM - Argan Oil Co-operative", desc: "Learn how local Berber women extract culinary and cosmetic oils from native Argan seeds using ancient hand methods." },
                { title: "11:30 AM - Berber Village Encounter", desc: "Visit a traditional mud-brick Berber village, tour a family home, and enjoy authentic hospitality over tea." },
                { title: "01:00 PM - Riverside Tagine Lunch", desc: "Enjoy lunch in Ourika, eating tagines slow-cooked over open charcoal fires directly on the riverbed." },
                { title: "02:30 PM - Setti Fatma Waterfall Trek", desc: "Embark on a guided hike through rocky terrain to visit the rushing cascades of Setti Fatma." },
                { title: "05:00 PM - Return Drive", desc: "Descend the valley road and enjoy a peaceful sunset drive back to your destination." }
            ],
            whatsIncluded: [
                "Private transportation with a professional driver",
                "Local mountain guide for the waterfall trek",
                "Berber family home visit with tea and snacks",
                "Bottled mineral water"
            ],
            whatsExcluded: [
                "Lunch and beverages",
                "Tips for the mountain guide and driver",
                "Camel ride options (~100 MAD)"
            ],
            faqs: [
                { q: "Is the trail to Setti Fatma slippery?", a: "Yes, some sections involve scrambling over large rocks near the river. Running shoes or hiking boots with good grip are required." },
                { q: "Can we skip the trekking portion?", a: "Absolutely. If you prefer to relax, you can sit by the riverside cafes, enjoy the mountain air, and skip the hike completely." },
                { q: "Can dietary requirements be accommodated?", a: "Yes, our partner restaurants and Berber host families can accommodate vegetarian and vegan diets easily. Just let us know in advance." },
                { q: "Are there any hidden costs?", a: "No, your private transport, mountain guide, and village visit are fully included. You only pay for your lunch and optional camel rides." }
            ],
            seoTitle: "Atlas Mountains & Ourika Private Tour | Mdina Tours",
            seoDesc: "Experience the majestic Atlas Mountains and Ourika Valley from Rabat/Marrakech. See traditional Berber villages and hike the cascades of Setti Fatma."
        },
        fr: {
            title: "Excursion dans le Moyen Atlas & Vallée de l'Ourika",
            tagline: "Cascades Rafraîchissantes, Villages Berbères et Sommets Enneigés",
            excerpt: "Fuyez la chaleur des villes. Explorez les montagnes du Haut Atlas, longez les cascades sauvages et partagez un thé traditionnel dans un village berbère.",
            description: "Immergez-vous dans la vie rurale des montagnes de l'Atlas. Rivières tumultueuses, cultures en terrasses et villages de terre rouge caractérisent la vallée de l'Ourika. Cette excursion vous emmène hors des sentiers battus à la rencontre du patrimoine berbère authentique et de paysages préservés.",
            duration: "8-10 heures",
            priceText: "À partir de 210 € par personne",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Routes de montagne panoramiques au pied du Mont Toubkal",
                "Randonnée guidée vers les sept cascades de Setti Fatma",
                "Traversée des ponts suspendus traditionnels au-dessus de l'oued",
                "Accueil chaleureux chez l'habitant pour le pain chaud et le thé",
                "Visite d'une coopérative féminine d'huile d'argan"
            ],
            itinerary: [
                { title: "08h30 - Départ de l'Hôtel", desc: "Départ vers le sud-est en direction des sommets impressionnants du Haut Atlas." },
                { title: "10h00 - Coopérative d'Huile d'Argan", desc: "Découvrez les secrets de fabrication de l'or liquide du Maroc par les femmes berbères." },
                { title: "11h30 - Rencontre dans un Village", desc: "Entrez dans une maison traditionnelle berbère en pisé pour partager un thé à la menthe." },
                { title: "13h00 - Déjeuner au bord de l'eau", desc: "Dégustez des tajines mijotés au charbon de bois, les pieds presque dans l'eau de la rivière Ourika." },
                { title: "14h30 - Randonnée des Cascades", desc: "Suivez votre guide local pour grimper le long des cascades de Setti Fatma." },
                { title: "17h00 - Retour", desc: "Descente de la vallée et retour à votre hôtel en fin d'après-midi." }
            ],
            whatsIncluded: [
                "Transport privé avec chauffeur professionnel",
                "Guide de montagne local à Setti Fatma",
                "Visite chez l'habitant avec thé et pain traditionnel",
                "Eau minérale en bouteille"
            ],
            whatsExcluded: [
                "Déjeuner et boissons",
                "Pourboires pour le chauffeur et le guide",
                "Balade à dos de chameau facultative (~100 MAD)"
            ],
            faqs: [
                { q: "La randonnée est-elle glissante ?", a: "Oui, le terrain rocheux nécessite de bonnes chaussures de sport ou de randonnée." },
                { q: "Puis-je annuler la marche si je fatigue ?", a: "Bien sûr, vous pouvez simplement rester vous détendre dans les cafés au bord de la rivière pendant que les autres font la marche." },
                { q: "Proposez-vous des repas végétariens ?", a: "Oui, nos restaurants partenaires et familles hôtes préparent d'excellents tajines végétariens. Merci de nous prévenir à l'avance." },
                { q: "Y a-t-il des coûts supplémentaires ?", a: "Non, le transport, le guide local et la visite de la coopérative sont inclus. Le déjeuner reste à votre charge." }
            ],
            seoTitle: "Excursion Privée dans l'Atlas et l'Ourika | Mdina Tours",
            seoDesc: "Visitez le Haut Atlas et la vallée de l'Ourika. Découvrez l'authenticité des villages berbères et les magnifiques cascades de Setti Fatma."
        },
        es: {
            title: "Excursión al Valle de Ourika y al Alto Atlas desde Marrakech",
            tagline: "Cascadas de Setti Fatma, Pueblos Bereberes y Cumbres del Atlas",
            excerpt: "Escape del bullicio de Marrakech. Explore los valles verdes del Alto Atlas, camine junto a cascadas y comparta un té con una familia bereber.",
            description: "Descubra la autenticidad y los paisajes del Alto Atlas marroquí en una excursión privada desde Marrakech. Recorra el pintoresco Valle de Ourika con sus ríos de montaña, huertos en terrazas y aldeas de adobe rojizo construidas en la roca. Conozca el proceso artesanal del aceite de argán en una cooperativa femenina, comparta pan recién horneado y té a la menta con una familia local y disfrute de una caminata guiada hacia las cascadas de Setti Fatma.",
            duration: "8-10 horas",
            priceText: "Desde 210 € por persona",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Trayecto panorámico en vehículo privado por las estribaciones del monte Toubkal",
                "Caminata guiada con guía de montaña local hasta las cascadas de Setti Fatma",
                "Cruce de puentes colgantes tradicionales de madera sobre el río Ourika",
                "Visita a una casa bereber tradicional para degustar té a la menta y pan casero",
                "Parada en una cooperativa femenina certificada de aceite de argán"
            ],
            itinerary: [
                { title: "08:30 - Recogida en Marrakech", desc: "Recogida privada en su hotel o riad en Marrakech rumbo al sur hacia la cordillera del Alto Atlas." },
                { title: "10:00 - Cooperativa de Aceite de Argán", desc: "Demostración en directo de la extracción tradicional de argán culinario y cosmético por mujeres bereberes." },
                { title: "11:30 - Encuentro en Pueblo Bereber", desc: "Visita a una aldea de montaña tradicional y bienvenida hospitalaria con té marroquí." },
                { title: "13:00 - Almuerzo junto al Río", desc: "Almuerzo típico con tajines cocinados al carbón servidos en terrazas al borde del río Ourika." },
                { title: "14:30 - Ruta a las Cascadas de Setti Fatma", desc: "Caminata guiada a pie por senderos de roca para explorar los saltos de agua y pozas de montaña." },
                { title: "17:00 - Regreso a Marrakech", desc: "Descenso del valle y traslado cómodo de vuelta a su alojamiento en Marrakech." }
            ],
            whatsIncluded: [
                "Vehículo moderno climatizado con conductor profesional privado",
                "Guía de montaña local oficial en Setti Fatma",
                "Visita a casa bereber con té y degustación",
                "Agua mineral embotellada"
            ],
            whatsExcluded: [
                "Almuerzo y bebidas personales",
                "Propinas para el guía y el chófer",
                "Paseo opcional en dromedario (~100 MAD)"
            ],
            faqs: [
                { q: "¿Es exigente la caminata por las cascadas?", a: "El primer tramo es accesible para la mayoría de viajeros con calzado deportivo adecuado. Si prefiere no caminar, puede relajarse plácidamente en las cafeterías junto al río." },
                { q: "¿Hay opciones de comida vegetariana?", a: "Sí, los restaurantes del valle preparan excelentes tajines de verduras frescas de la huerta local." },
                { q: "¿Se puede realizar con niños?", a: "Sí, es una excursión muy recomendada para familias por el contacto con la naturaleza y la cultura local." }
            ],
            seoTitle: "Excursión al Valle de Ourika y Alto Atlas desde Marrakech | Mdina Tours",
            seoDesc: "Descubra el Alto Atlas y el Valle de Ourika desde Marrakech. Cascadas de Setti Fatma, pueblos bereberes, guía local y transporte privado."
        }
    },
    {
        slug: "agafay-desert-experience",
        image: "/b-roll/agafay.webp",
        price: 120,
        en: {
            title: "Agafay Desert Dinner & Camel Experience",
            tagline: "Stunning Stone Dunes, Camel Rides, and Dinner Under the Stars",
            excerpt: "Discover the rocky desert of Agafay just outside Marrakech. Ride a camel at sunset and enjoy a gourmet dinner in a luxury nomadic camp.",
            description: "If you don't have time to travel all the way to the Sahara, the Agafay Desert offers the perfect stone-dune alternative. Located just 40 minutes south of Marrakech, this dry plateau features vast landscapes, white mud villages, and panoramic views of the Atlas Mountains. Enjoy a scenic camel ride at sunset and dine under a starry sky inside a luxurious desert camp with live Gnaoua music and fire shows.",
            duration: "5-6 hours",
            priceText: "From €120 per person",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Private round-trip transfer to the rocky Agafay Desert",
                "Sunset camel ride wearing traditional Berber nomadic blue robes",
                "Traditional Moroccan welcome tea in a luxury desert camp",
                "Three-course gourmet dinner featuring fresh regional tagines",
                "Live entertainment around the campfire (Gnaoua drums and fire dancers)"
            ],
            itinerary: [
                { title: "04:00 PM - Departure", desc: "Pickup from your hotel/riad in a private, modern vehicle." },
                { title: "04:50 PM - Arrival & Camel Trek", desc: "Mount your camel and enjoy a guided trek across the arid stone hills during the golden hour." },
                { title: "06:15 PM - Sunset & Welcome Tea", desc: "Watch the sun sink behind the high peaks of the Atlas Mountains from a panoramic desert ridge." },
                { title: "07:30 PM - Nomadic Camp Dinner", desc: "Step inside a beautifully lit luxury tent for a dinner of Moroccan salads, slow-roasted lamb, and couscous." },
                { title: "09:00 PM - Campfire Performance", desc: "Gather around the central campfire for stargazing and live traditional Berber and Gnaoua music." },
                { title: "10:00 PM - Return Transfer", desc: "Your driver takes you back to your hotel, arriving in comfort." }
            ],
            whatsIncluded: [
                "Private round-trip vehicle and driver",
                "1-hour camel ride at sunset",
                "Gourmet three-course dinner at a premium camp",
                "Live campfire show and musical performances"
            ],
            whatsExcluded: [
                "Alcoholic beverages (available for purchase at the camp)",
                "Personal tips for camp staff and camel handlers",
                "Optional quad/buggy rental upgrades"
            ],
            faqs: [
                { q: "Is Agafay a sand desert?", a: "No, Agafay is a stone desert (reg). It has the same majestic, rolling dune-like hills as the Sahara, but the terrain is composed of rocky earth rather than sand." },
                { q: "Are vegetarian/vegan meals available?", a: "Yes, the camp accommodates all dietary requirements, including vegetarian, vegan, and gluten-free diets. Please notify us during booking." },
                { q: "What should I pack for this tour?", a: "Comfortable clothes, sunglasses, and a warm sweater or jacket for the evening, as desert temperatures drop after sunset." },
                { q: "Is the tour suitable for children?", a: "Yes! Children love the camel ride and the fire show. We provide safe, comfortable transport to and from the camp." }
            ],
            seoTitle: "Agafay Desert Dinner & Camel Experience | Mdina Tours",
            seoDesc: "Experience the Agafay Desert on a private tour from Marrakech. Enjoy a sunset camel ride, live Gnaoua music, and a premium dinner under the stars."
        },
        fr: {
            title: "Dîner & Balade dans le Désert d'Agafay",
            tagline: "Dunes de Pierre, Coucher de Soleil et Dîner sous les Étoiles",
            excerpt: "Découvrez le désert de pierre d'Agafay aux portes de Marrakech. Montez à dos de chameau et savourez un dîner spectacle dans un camp de luxe.",
            description: "Si vous manquez de temps pour aller jusqu'au Sahara, le désert d'Agafay en est l'alternative parfaite. Situé à seulement 40 minutes de Marrakech, ce plateau de pierre aride offre des reliefs lunaires face à l'Atlas. Vivez une balade à dos de chameau au coucher du soleil et partagez un dîner traditionnel sous les étoiles.",
            duration: "5-6 heures",
            priceText: "À partir de 120 € par personne",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Transfert privé aller-retour vers les collines d'Agafay",
                "Balade à dos de chameau habillé en habits nomades bleus",
                "Thé d'accueil sous les tentes berbères traditionnelles",
                "Dîner gastronomique marocain avec salades et tajines d'exception",
                "Spectacle de feu et musique Gnaoua autour du grand feu de camp"
            ],
            itinerary: [
                { title: "16h00 - Départ", desc: "Prise en charge à votre hôtel par votre chauffeur privé." },
                { title: "16h50 - Arrivée & Méharée", desc: "Installez-vous sur votre chameau pour une promenade guidée d'une heure au coucher du soleil." },
                { title: "18h15 - Coucher de Soleil & Thé d'Accueil", desc: "Admirez le soleil disparaître derrière les montagnes de l'Atlas depuis les crêtes d'Agafay." },
                { title: "19h30 - Dîner sous la Tente Nomade", desc: "Installez-vous sous les lumières douces des tentes caïdales pour déguster votre repas." },
                { title: "21h00 - Spectacle autour du Feu", desc: "Rassemblez-vous autour du feu de camp pour profiter des rythmes des tambours Gnaoua et des danseurs de feu." },
                { title: "22h00 - Retour", desc: "Votre chauffeur vous ramène à votre hôtel dans les meilleures conditions." }
            ],
            whatsIncluded: [
                "Transport privé aller-retour",
                "Balade à dos de chameau d'une heure",
                "Dîner complet dans un campement haut de gamme",
                "Spectacles et animations autour du feu"
            ],
            whatsExcluded: [
                "Boissons alcoolisées",
                "Pourboires pour les chameliers et l'équipe du camp",
                "Options quad ou buggy (disponibles en supplément)"
            ],
            faqs: [
                { q: "Agafay est-il un désert de sable ?", a: "Non, Agafay est un désert de pierre (reg). Il offre des collines plissées spectaculaires mais le sol est argileux et rocailleux." },
                { q: "Proposez-vous des repas végétariens ?", a: "Oui, le chef du camp prépare des options végétariennes, végétaliennes et sans gluten sur simple demande préalable." },
                { q: "Que dois-je emporter ?", a: "Des vêtements confortables, des lunettes de soleil et un pull chaud pour la soirée, car les températures baissent après le coucher du soleil." },
                { q: "L'excursion est-elle adaptée aux enfants ?", a: "Oui, les enfants adorent la balade à dos de chameau et le spectacle de feu. L'accès en voiture est très facile." }
            ],
            seoTitle: "Dîner Spectacle au Désert d'Agafay depuis Marrakech | Mdina Tours",
            seoDesc: "Réservez une soirée magique dans le désert d'Agafay. Balade à dos de chameau, dîner traditionnel de luxe et animations Gnaoua."
        },
        es: {
            title: "Cena y paseo en camello por el desierto de Agafay",
            tagline: "Colinas de Piedra, Paseo en Dromedario al Atardecer y Cena bajo las Estrellas",
            excerpt: "Descubra el desierto rocoso de Agafay a las afueras de Marrakech. Paseo en dromedario al atardecer y cena tradicional en un campamento nómada de lujo.",
            description: "A solo 40 minutos de Marrakech, el desierto de piedra de Agafay es el escenario ideal para vivir la magia del desierto sin largos trayectos. Sus colinas áridas ofrecen vistas panorámicas frente a las cumbres del Atlas. Disfrute de un paseo en dromedario ataviado con túnicas nómadas tradicionales al atardecer y deguste una cena marroquí de tres platos bajo las estrellas con música gnawa y espectáculo de fuego.",
            duration: "5-6 horas",
            priceText: "Desde 120 € por persona",
            departureCity: "Marrakech",
            finishCity: "Marrakech",
            highlights: [
                "Traslado privado de ida y vuelta en vehículo climatizado desde su hotel en Marrakech",
                "Paseo en dromedario de 1 hora al atardecer con indumentaria nómada tradicional",
                "Té de bienvenida con pastas marroquíes en campamento bereber de lujo",
                "Cena gourmet marroquí completa con ensaladas frescas, tajine de cordero o ternera y postre",
                "Música gnawa en directo y espectáculo de bailarines con fuego junto a la hoguera"
            ],
            itinerary: [
                { title: "16:00 - Recogida en Marrakech", desc: "Recogida privada en su hotel o riad en vehículo moderno con conductor profesional." },
                { title: "16:50 - Llegada y Paseo en Dromedario", desc: "Subida al dromedario y recorrido guiado por las colinas áridas durante la hora dorada." },
                { title: "18:15 - Puesta de Sol y Té de Bienvenida", desc: "Observación de la puesta de sol tras las montañas del Atlas desde una cresta panorámica." },
                { title: "19:30 - Cena en Carpa Nómada", desc: "Cena tradicional marroquí servida bajo la iluminación tenue de faroles en carpas de lujo." },
                { title: "21:00 - Espectáculo y Música junto al Fuego", desc: "Música tradicional bereber y espectáculo de fuego alrededor de la hoguera central bajo las estrellas." },
                { title: "22:00 - Regreso a Marrakech", desc: "Traslado privado de vuelta a su hotel o riad en Marrakech." }
            ],
            whatsIncluded: [
                "Transporte privado de ida y vuelta con conductor dedicado",
                "Paseo en dromedario de 1 hora al atardecer",
                "Cena completa de 3 platos en campamento de categoría superior",
                "Espectáculo de fuego y actuaciones musicales"
            ],
            whatsExcluded: [
                "Bebidas alcohólicas (disponibles en el campamento)",
                "Propinas para el personal y los guías",
                "Alquiler opcional de quads o buggies"
            ],
            faqs: [
                { q: "¿Agafay es un desierto de arena?", a: "No, Agafay es un desierto de piedra y colinas arcillosas (reg). Presenta el mismo paisaje ondulado y desértico que las dunas, pero sobre suelo firme y rocoso frente al Atlas." },
                { q: "¿Tienen menú vegetariano o sin gluten?", a: "Sí, el campamento elabora opciones vegetarianas, veganas y sin gluten con aviso previo al reservar." },
                { q: "¿Qué ropa conviene llevar?", a: "Ropa cómoda, calzado cerrado, gafas de sol y una chaqueta o jersey para la noche, ya que en el desierto la temperatura desciende notablemente tras la puesta de sol." },
                { q: "¿Es una actividad adecuada para niños?", a: "¡Totalmente! A los niños les encanta el paseo en dromedario y el espectáculo de fuego junto a la hoguera." }
            ],
            seoTitle: "Cena y Paseo en Camello en el Desierto de Agafay | Mdina Tours",
            seoDesc: "Excursión privada al desierto de Agafay desde Marrakech. Paseo en dromedario al atardecer, cena tradicional en campamento de lujo y espectáculo de fuego."
        }
    },
    {
        slug: "merzouga-desert-tour",
        image: "/b-roll/merzouga.webp",
        price: 620,
        en: {
            title: "3-Day Merzouga Desert Expedition",
            tagline: "Sahara Dunes, Canyons, Kasbahs, and Nomadic Nights",
            excerpt: "Embark on the ultimate Moroccan adventure. Traverse the Atlas Mountains, explore Ait Benhaddou, and spend a night in the Erg Chebbi Sahara dunes.",
            description: "Cross the High Atlas Mountains, explore ancient mud-brick fortresses, and experience the golden sand dunes of Erg Chebbi in Merzouga. This 3-day private desert tour is designed for travelers who want to experience the deep Sahara. Sleep in a luxury desert camp, ride camels over wind-swept sand ridges, and witness the stunning starry sky of the desert night. Customize the stops along the way, including scenic lookouts in the Dades and Todra gorges.",
            duration: "3 Days / 2 Nights",
            priceText: "From €620 per person",
            departureCity: "Marrakech",
            finishCity: "Marrakech or Fes",
            highlights: [
                "Drive through the high Tizi n'Tichka pass (2,260m) with panoramic views",
                "Guided tour of the UNESCO World Heritage site of Ait Benhaddou",
                "Walk through the sheer, towering limestone cliffs of Todra Gorge",
                "Trek into the golden Erg Chebbi dunes on camelback for sunset",
                "Spend a magical night under the stars in a luxury Sahara tent"
            ],
            itinerary: [
                { title: "Day 1 - Marrakech to Dades Valley", desc: "Depart Marrakech and wind through the High Atlas Mountains. Explore the historic Kasbah Ait Benhaddou, pass Ouarzazate, and travel through the Valley of the Roses to spend the night in a traditional Dades Valley hotel." },
                { title: "Day 2 - Dades Valley to Erg Chebbi (Merzouga)", desc: "Walk through the spectacular Todra Gorge cliffs. Drive towards Erfoud and reach the golden sands of Merzouga. Mount your camel, trek into the dunes, and watch the sunset before dining and sleeping in a luxury desert camp." },
                { title: "Day 3 - Merzouga to Marrakech/Fes", desc: "Wake early for a stunning Sahara sunrise. After breakfast, ride camels back to the base and enjoy a comfortable private drive back across the mountains to Marrakech or Fes." }
            ],
            whatsIncluded: [
                "Private air-conditioned vehicle with professional chauffeur for 3 days",
                "All fuel, highway tolls, and driver accommodation/meals",
                "1 night in a Dades Valley hotel (private half-board: dinner & breakfast)",
                "1 night in a luxury Sahara Desert camp (private tent, dinner & breakfast)",
                "Camel trek at sunset and sunrise in Merzouga",
                "Local guide at Kasbah Ait Benhaddou"
            ],
            whatsExcluded: [
                "Lunches and drinks",
                "Entrance fees to historic museums or cinema studios",
                "Tips for drivers, guides, and camp staff"
            ],
            faqs: [
                { q: "Is this a private or group tour?", a: "This is a 100% private tour. The vehicle and driver are dedicated exclusively to your party, allowing you to stop whenever you want to take photos or rest." },
                { q: "Can we end the tour in Fes instead of Marrakech?", a: "Yes. We can customize the itinerary so that you start in Marrakech and end in Fes on Day 3, which is a popular route to avoid backtracking." },
                { q: "Are Sahara Desert camps comfortable?", a: "Absolutely. We book luxury desert camps equipped with real beds, private en-suite bathrooms, and hot showers." },
                { q: "How cold does the Sahara Desert get at night?", a: "Temperatures vary by season. In winter, nights can drop near freezing (0°C), while summer nights are pleasantly warm. Your luxury tent includes heavy blankets and heating." },
                { q: "Can I skip the camel ride and take a 4x4 instead?", a: "Yes! If you prefer not to ride a camel, we can arrange a comfortable 4x4 transfer directly to your luxury camp." }
            ],
            seoTitle: "3-Day Private Sahara Desert Tour to Merzouga | Mdina Tours",
            seoDesc: "Experience the Sahara Dunes of Erg Chebbi on a private 3-day desert tour from Marrakech. Includes Ait Benhaddou, camel treks, and a luxury camp."
        },
        fr: {
            title: "Circuit 3 Jours au Désert de Merzouga",
            tagline: "Dunes du Sahara, Canyons de Todra et Kasbahs Historiques",
            excerpt: "Partez pour l'aventure marocaine ultime. Traversez l'Atlas, explorez Aït Benhaddou et dormez au cœur des dunes dorées de l'Erg Chebbi.",
            description: "Traversez le Haut Atlas, explorez d'anciennes forteresses et découvrez les vagues de sable doré de l'Erg Chebbi à Merzouga. Ce circuit de 3 jours est le choix idéal pour vivre la magie du Sahara. Nuit en camp de luxe, balade à dos de chameau et contemplation des étoiles.",
            duration: "3 Jours / 2 Nuits",
            priceText: "À partir de 620 € par personne",
            departureCity: "Marrakech",
            finishCity: "Marrakech ou Fès",
            highlights: [
                "Passage par le col du Tizi n'Tichka (2 260 m) avec ses panoramas grandioses",
                "Visite guidée du Ksar d'Aït Benhaddou, classé à l'UNESCO",
                "Randonnée à pied dans les impressionnantes Gorges du Todra",
                "Coucher de soleil inoubliable sur les dunes de l'Erg Chebbi à dos de chameau",
                "Nuit insolite et magique sous une tente nomade de luxe"
            ],
            itinerary: [
                { title: "Jour 1 - Marrakech à la Vallée du Dadès", desc: "Départ de Marrakech à travers l'Atlas. Visite d'Aït Benhaddou, passage par Ouarzazate et la route des mille kasbahs. Nuit en hôtel de charme dans le Dadès." },
                { title: "Jour 2 - Gorges du Dadès à l'Erg Chebbi", desc: "Visite des impressionnantes falaises du Todra. Continuation vers Erfoud et arrivée à Merzouga. Début de la méharée pour rejoindre le camp de luxe au milieu des dunes." },
                { title: "Jour 3 - Merzouga à Marrakech ou Fès", desc: "Lever de soleil sur les dunes. Après le petit-déjeuner, retour à dos de chameau et trajet retour privé vers Marrakech ou Fès." }
            ],
            whatsIncluded: [
                "Véhicule climatisé privé avec chauffeur professionnel durant 3 jours",
                "Carburant, péages et frais de chauffeur",
                "1 nuit en hôtel de charme dans le Dadès (demi-pension)",
                "1 nuit en campement saharien de luxe (demi-pension)",
                "Méharée à dos de chameau pour le coucher et lever de soleil",
                "Guide local à la Kasbah d'Aït Benhaddou"
            ],
            whatsExcluded: [
                "Déjeuners et boissons",
                "Droits d'entrée dans les monuments ou studios de cinéma",
                "Pourboires pour le chauffeur, guide et chameliers"
            ],
            faqs: [
                { q: "S'agit-il d'un circuit privé ?", a: "Oui, le véhicule et le chauffeur sont entièrement réservés pour votre groupe, ce qui vous offre une liberté totale de pauses." },
                { q: "Peut-on terminer le circuit à Fès ?", a: "Tout à fait. C'est une option très demandée qui permet d'optimiser votre itinéraire sans revenir sur vos pas." },
                { q: "Les camps dans le désert sont-ils confortables ?", a: "Oui, nous réservons des camps de luxe avec de vrais lits, une salle de bain privée intégrée à la tente, et des douches chaudes." },
                { q: "Fait-il froid la nuit dans le Sahara ?", a: "Cela dépend de la saison. En hiver, les nuits peuvent approcher 0°C, tandis qu'en été elles sont douces. Nos tentes sont équipées de couvertures épaisses et souvent de chauffage." },
                { q: "Peut-on éviter le chameau et prendre un 4x4 ?", a: "Oui ! Si vous préférez ne pas monter à dos de chameau, nous pouvons organiser un transfert en 4x4 jusqu'au campement." }
            ],
            seoTitle: "Circuit Privé 3 Jours Désert Merzouga | Mdina Tours",
            seoDesc: "Vivez l'expérience unique du Sahara à l'Erg Chebbi. Circuit privé de 3 jours avec guide, hébergements de charme et randonnée d'une nuit en bivouac."
        },
        es: {
            title: "Circuito Privado de 3 Días al Desierto de Merzouga desde Marrakech",
            tagline: "Dunas de Erg Chebbi, Gargantas del Todra, Kasbahs y Noche en Campamento de Lujo",
            excerpt: "Descubre la gran aventura del Sáhara marroquí. Cruza el Alto Atlas, visita la Kasbah Ait Ben Hadu y duerme en un campamento de lujo bajo las estrellas en Merzouga.",
            description: "Cruza el puerto de Tizi n'Tichka en el Alto Atlas, explora fortalezas históricas de adobe y admira las doradas dunas de Erg Chebbi en Merzouga. Este circuito privado de 3 días y 2 noches está diseñado para viajeros que buscan vivir la auténtica magia del desierto del Sáhara con la máxima comodidad. Disfruta de un paseo en dromedario al atardecer, cena tradicional bereber junto a la hoguera y duerme en una jaima de lujo con baño privado. El itinerario es 100% personalizable y ofrece la opción de finalizar en Fez o regresar a Marrakech.",
            duration: "3 Días / 2 Noches",
            priceText: "Desde 620 € por persona",
            departureCity: "Marrakech",
            finishCity: "Marrakech o Fez",
            highlights: [
                "Cruce del puerto de montaña Tizi n'Tichka (2.260 m) con vistas panorámicas",
                "Visita guiada del Ksar de Ait Ben Hadu, Patrimonio de la Humanidad por la UNESCO",
                "Paseo por las imponentes paredes rocosas de las Gargantas del Todra",
                "Paseo en dromedario entre las dunas doradas de Erg Chebbi al atardecer y amanecer",
                "Noche inolvidable bajo las estrellas en un campamento de jaimas de lujo"
            ],
            itinerary: [
                { title: "Día 1 – Marrakech a Gargantas del Dades", desc: "Salida desde Marrakech cruzando el Alto Atlas. Visita guiada a la Kasbah Ait Ben Hadu, paso por Ouarzazate y el Valle de las Rosas. Noche y cena en un hotel con encanto en el Valle del Dades." },
                { title: "Día 2 – Valle del Dades a Erg Chebbi (Merzouga)", desc: "Paseo por los desfiladeros del Todra. Continuación por Erfoud hasta las dunas de Merzouga. Paseo en dromedario para contemplar el atardecer, cena bereber y noche en campamento de lujo." },
                { title: "Día 3 – Merzouga a Marrakech o Fez", desc: "Amanecer sobre las dunas y desayuno. Regreso en dromedario o 4x4 y traslado privado de vuelta a Marrakech o continuación directa hacia Fez según su preferencia." }
            ],
            whatsIncluded: [
                "Vehículo privado con aire acondicionado y chófer profesional durante los 3 días",
                "Combustible, peajes y dietas del conductor",
                "1 noche en hotel del Valle del Dades (media pensión: cena y desayuno)",
                "1 noche en campamento de lujo en Merzouga (jaima privada con baño, cena y desayuno)",
                "Paseo en dromedario al atardecer y amanecer en Merzouga",
                "Guía local en la Kasbah de Ait Ben Hadu"
            ],
            whatsExcluded: [
                "Almuerzos y bebidas",
                "Entradas a monumentos o estudios de cine de Ouarzazate",
                "Propinas para chófer, guías y personal del campamento"
            ],
            faqs: [
                { q: "¿Es un tour privado?", a: "Sí, el vehículo y el chófer están reservados en exclusiva para su grupo, permitiéndoles detenerse cuando lo deseen para tomar fotos o descansar." },
                { q: "¿Se puede terminar el tour en Fez en lugar de Marrakech?", a: "Sí. Podemos adaptar el itinerario para comenzar en Marrakech y finalizar en Fez el Día 3, una opción muy recomendada para no repetir trayecto." },
                { q: "¿Los campamentos del desierto son cómodos?", a: "Totalmente. Seleccionamos campamentos de lujo equipados con camas reales, baño privado dentro de la jaima y duchas con agua caliente." },
                { q: "¿Hace frío por la noche en el Sáhara?", a: "Depende de la temporada. En invierno las temperaturas nocturnas pueden rondar los 0 °C, mientras que en verano son templadas. Las jaimas disponen de mantas gruesas y calefacción." },
                { q: "¿Se puede ir al campamento en 4x4 en lugar de dromedario?", a: "Sí. Si prefiere no montar en dromedario, organizamos el traslado directo en vehículo 4x4 hasta su campamento de lujo." }
            ],
            seoTitle: "Circuito Privado 3 Días Desierto Merzouga desde Marrakech | Mdina Tours",
            seoDesc: "Circuito privado de 3 días al desierto de Merzouga (Erg Chebbi) desde Marrakech. Incluye Ait Ben Hadu, paseo en dromedario y campamento de lujo. Final en Marrakech o Fez."
        }
    },
    {
        slug: "fes-guided-tour",
        image: "/b-roll/fes.jpg",
        price: 75,
        en: {
            title: "Fes Medina Walking Tour",
            tagline: "Step Back in Time in the World's Largest Car-Free Urban Area",
            excerpt: "Explore Fes el-Bali, the oldest cultural capital of Morocco. Walk past medieval tanneries, ancient madrassas, and historic palaces.",
            description: "With over 9,000 narrow alleys, the medieval city of Fes el-Bali is the beating heart of Moroccan craft and academic history. Led by our licensed historical guide, this walking tour brings the ancient city to life. Walk past colorful spice shops, visit the oldest working university in the world, and look out over the famous Chouara leather tanneries from a panoramic terrace.",
            duration: "5-6 hours",
            priceText: "From €75 per group",
            departureCity: "Fes",
            finishCity: "Fes",
            highlights: [
                "Private walking tour with a licensed academic historian guide",
                "Explore the Chouara Tanneries and watch ancient leather dyeing techniques",
                "Visit the historic Al-Qarawiyyin University, founded in 859 AD",
                "View the beautiful blue tilework of the Bab Boujloud gate",
                "Discover hidden caravanserais and ancient hand-weaving workshops"
            ],
            itinerary: [
                { title: "09:00 AM - Meet at Bab Boujloud", desc: "Meet your guide at the famous Blue Gate and learn about the city's architectural foundations." },
                { title: "10:00 AM - Historic Madrassas & Quranic Schools", desc: "Visit the Bou Inania Madrassa, known for its carved cedarwood panels and bronze doors." },
                { title: "11:30 AM - Chouara Tanneries Lookout", desc: "Climb up to a panoramic terrace overlooking the stone vats of Chouara, watching artisans cure leather using centuries-old methods." },
                { title: "01:00 PM - Medina Palace Lunch", desc: "Stop at a beautifully restored 14th-century palace for a traditional Fassi lunch." },
                { title: "02:30 PM - Artisans & Guilds Walk", desc: "Weave through the copper-smiths, woodcarvers, and weavers' quarters to see master craftspeople at work." },
                { title: "04:00 PM - Jewish Quarter (Mellah) & Royal Palace Gates", desc: "End your tour outside the gold-plated doors of the Royal Palace and stroll through the Mellah." }
            ],
            whatsIncluded: [
                "Licensed local historical guide for 5 hours",
                "Hotel pickup inside the Medina",
                "Customized shopping advice without commercial pressure",
                "Bottled mineral water"
            ],
            whatsExcluded: [
                "Entrance fees to historical sights (~20-40 MAD per site)",
                "Lunch and personal drinks",
                "Tips/gratuities for your guide"
            ],
            faqs: [
                { q: "Is this tour done by car or walking?", a: "This is entirely a walking tour. The Medina of Fes is completely car-free, containing steep, narrow alleys that are only accessible on foot or by donkey." },
                { q: "How do we handle persistent sellers in the souks?", a: "Having a licensed official guide with you ensures a smooth experience. Our guides prevent aggressive street sellers from bothering you and help negotiate fair local prices." },
                { q: "Can I customize this itinerary?", a: "Yes! Since it's a private tour, you can ask your guide to spend more time at certain sights or focus on specific artisan workshops." },
                { q: "What should tourists wear in Morocco?", a: "For walking through the Medina, comfortable shoes are essential. Modest clothing covering shoulders and knees is recommended out of respect for local customs." }
            ],
            seoTitle: "Private Fes Medina Guided Walking Tour | Mdina Tours",
            seoDesc: "Unlock the secrets of Fes el-Bali with a certified private tour guide. Visit Chouara Tanneries, Bab Boujloud, and Al-Qarawiyyin University."
        },
        fr: {
            title: "Visite Guidée de la Médina de Fès",
            tagline: "Voyagez dans le Temps au Cœur de la Plus Grande Zone Piétonne du Monde",
            excerpt: "Explorez Fès el-Bali, la capitale spirituelle du Maroc. Découvrez les tanneries médiévales, les anciennes madrasas et les palais cachés.",
            description: "Avec plus de 9 000 ruelles, la cité médiévale de Fès el-Bali est le cœur battant de l'artisanat marocain. Accompagné par notre guide conférencier officiel, cette visite privée redonne vie à l'histoire. Visitez la plus ancienne université en activité au monde et admirez les célèbres tanneries Chouara.",
            duration: "5-6 heures",
            priceText: "À partir de 75 € par groupe",
            departureCity: "Fès",
            finishCity: "Fès",
            highlights: [
                "Visite guidée privée avec un guide historien officiel",
                "Découverte des tanneries Chouara et des techniques de teinture artisanales",
                "Visite de l'université Al-Qarawiyyin, fondée en 859 de notre ère",
                "Admiration de la porte monumentale Bab Boujloud",
                "Immersion dans les quartiers des artisans (dinandiers, tisserands, potiers)"
            ],
            itinerary: [
                { title: "09h00 - Rendez-vous à Bab Boujloud", desc: "Rencontre avec votre guide devant la célèbre Porte Bleue pour comprendre la fondation de la ville." },
                { title: "10h00 - Madrasas Historiques", desc: "Visite de la madrasa Bou Inania, chef-d'œuvre de l'architecture mérinide." },
                { title: "11h30 - Tanneries Chouara", desc: "Accès à une terrasse panoramique pour observer le travail des tanneurs dans les cuves colorées." },
                { title: "13h00 - Déjeuner Fassi", desc: "Pause dans un palais du XIVe siècle transformé en restaurant pour un déjeuner typique de Fès." },
                { title: "14h30 - Souks des Artisans", desc: "Parcours dans les ruelles où s'activent encore les maîtres artisans du cuivre, du cèdre et de la soie." },
                { title: "16h00 - Quartier Juif (Mellah) & Palais Royal", desc: "Fin de la visite devant les portes dorées du Palais Royal." }
            ],
            whatsIncluded: [
                "Guide local officiel agréé par l'État (5 heures)",
                "Prise en charge à votre riad dans la médina",
                "Conseils d'achat impartiaux sans pression commerciale",
                "Eau minérale en bouteille"
            ],
            whatsExcluded: [
                "Tickets d'entrée dans les monuments (~20-40 MAD par site)",
                "Déjeuner et boissons",
                "Pourboires pour le guide"
            ],
            faqs: [
                { q: "La visite se fait-elle en voiture ?", a: "Non, la médina de Fès est entièrement piétonne et interdite aux voitures. La visite se fait uniquement à pied." },
                { q: "Comment se passe le shopping ?", a: "Votre guide officiel vous protège du harcèlement des marchands et vous aide à négocier les vrais prix auprès des artisans locaux." },
                { q: "Peut-on personnaliser la visite ?", a: "Oui, comme c'est une visite privée, vous pouvez demander à votre guide de passer plus de temps dans certains lieux ou ateliers d'artisanat." },
                { q: "Que dois-je porter pour cette visite ?", a: "Des chaussures confortables sont indispensables. Des vêtements couvrant les épaules et les genoux sont recommandés par respect des coutumes locales." }
            ],
            seoTitle: "Visite Guidée Privée Médina de Fès | Mdina Tours",
            seoDesc: "Explorez Fès el-Bali en compagnie d'un guide officiel agréé. Découvrez Chouara, Al-Qarawiyyin et les trésors de l'architecture mérinide."
        }
    },
    {
        slug: "casablanca-city-tour",
        image: "/Traditional-low.webp",
        price: 90,
        en: {
            title: "Casablanca Highlights Tour",
            tagline: "Art Deco Architecture, Modern Coastlines, and the Hassan II Mosque",
            excerpt: "Explore Morocco's economic powerhouse. Visit the architectural masterpiece of the Hassan II Mosque and stroll along the scenic Corniche.",
            description: "Casablanca is the modern, beating heart of Morocco's economic progress. Blending mid-century French Art Deco architecture with historic Moorish elements, this city features grand avenues, coastal walks, and religious landmarks. This private tour takes you inside the Hassan II Mosque—the largest functioning mosque in Africa—and showcases the iconic neighborhoods of Habous and the beachfront Corniche.",
            duration: "4-5 hours",
            priceText: "From €90 per person",
            departureCity: "Casablanca",
            finishCity: "Casablanca",
            highlights: [
                "Guided tour inside the Hassan II Mosque, showing unique hand-crafted details",
                "Stroll through the clean alleys of the Habous (the 'New Medina')",
                "Walk along the beachfront promenade of the Boulevard de la Corniche",
                "Visit the grand Place Mohammed V and see its Art Deco buildings",
                "Stop outside the historic Church of the Sacred Heart"
            ],
            itinerary: [
                { title: "09:00 AM - Private Pickup", desc: "Meet your driver at your hotel or Casablanca Port cruise terminal." },
                { title: "09:30 AM - Hassan II Mosque", desc: "Take a guided group tour inside this oceanfront landmark, looking at wood carving and marble floors." },
                { title: "11:30 AM - La Corniche Walk", desc: "Enjoy a scenic drive along the coast, with views of luxury beach clubs and cafes." },
                { title: "12:30 PM - Habous Quarter Exploration", desc: "Discover the Habous neighborhood, visiting historic bakeries and olive markets." },
                { title: "01:30 PM - Traditional Seafood Lunch", desc: "Savor fresh grilled seafood at a local restaurant near the old port before returning." }
            ],
            whatsIncluded: [
                "Private transportation with a professional driver",
                "Fuel, parking fees, and road tolls",
                "Hotel or cruise terminal pickup and drop-off",
                "Bottled water"
            ],
            whatsExcluded: [
                "Entrance ticket to Hassan II Mosque (~140 MAD)",
                "Lunch and personal expenses",
                "Tips for driver and mosque guide"
            ],
            faqs: [
                { q: "Is the Hassan II Mosque open to non-Muslims?", a: "Yes. It is one of the very few mosques in Morocco open to non-Muslims. Guided tours are conducted daily at designated times." },
                { q: "Can we start this tour from the cruise port?", a: "Yes, we offer direct pickups from Casablanca Cruise Terminal and adjust the start time based on your ship's docking schedule." }
            ],
            seoTitle: "Private Casablanca City Tour & Highlights | Mdina Tours",
            seoDesc: "Book a private half-day Casablanca tour with a professional chauffeur. See the Hassan II Mosque, Habous, and the beautiful oceanfront Corniche."
        },
        fr: {
            title: "Visite Guidée de Casablanca",
            tagline: "Architecture Art Déco, Grande Corniche et Mosquée Hassan II",
            excerpt: "Explorez le poumon économique du Maroc. Visitez le chef-d'œuvre architectural de la mosquée Hassan II et la Corniche de Aïn Diab.",
            description: "Casablanca est le symbole de la modernité et du dynamisme marocain. Entre édifices Art Déco français et monuments mauresques, la métropole offre un contraste saisissant. Cette visite privée vous fait découvrir la mosquée Hassan II, le quartier des Habous et la Corniche.",
            duration: "4-5 heures",
            priceText: "À partir de 90 € par personne",
            departureCity: "Casablanca",
            finishCity: "Casablanca",
            highlights: [
                "Visite guidée intérieure de la grandiose Mosquée Hassan II",
                "Balade dans le quartier pittoresque des Habous (la nouvelle médina)",
                "Promenade le long de la Corniche de Aïn Diab",
                "Découverte de la place Mohammed V et de ses façades Art Déco",
                "Pause photo devant l'église du Sacré-Cœur"
            ],
            itinerary: [
                { title: "09h00 - Prise en Charge Privée", desc: "Votre chauffeur vous récupère à votre hôtel ou au terminal des croisières du port." },
                { title: "09h30 - Mosquée Hassan II", desc: "Visite guidée à l'intérieur de ce monument partiellement construit sur l'océan." },
                { title: "11h30 - Balade sur la Corniche", desc: "Parcours végétalisé en admirant les plages et les clubs de surf." },
                { title: "12h30 - Quartier des Habous", desc: "Exploration du quartier des Habous, célèbre pour ses librairies d'art et son marché aux olives." },
                { title: "13h30 - Déjeuner de fruits de mer", desc: "Dégustez un poisson grillé dans le port de pêche avant le retour à l'hôtel." }
            ],
            whatsIncluded: [
                "Transport privé avec chauffeur professionnel",
                "Carburant, péages et frais de parking",
                "Prise en charge au port ou à l'hôtel",
                "Eau minérale en bouteille"
            ],
            whatsExcluded: [
                "Billet d'entrée à la mosquée Hassan II (~140 MAD)",
                "Déjeuner et dépenses personnelles",
                "Pourboires pour le chauffeur"
            ],
            faqs: [
                { q: "La mosquée Hassan II est-elle ouverte aux non-musulmans ?", a: "Oui, elle fait partie des rares mosquées au Maroc accessibles aux visiteurs de toutes confessions via des visites organisées." },
                { q: "Le départ du port est-il possible ?", a: "Oui, nous organisons les transferts directement depuis le quai des bateaux de croisière." }
            ],
            seoTitle: "Visite Privée Casablanca Mosquée Hassan II | Mdina Tours",
            seoDesc: "Découvrez les incontournables de Casablanca avec un chauffeur privé dédié. Visitez la mosquée Hassan II et le quartier historique des Habous."
        }
    },
    {
        slug: "rabat-city-tour",
        image: "/Asilah.webp",
        price: 105,
        en: {
            title: "Rabat Imperial Capital Tour",
            tagline: "Medieval Kasbahs, Royal Mausoleums, and Peaceful Coastal Walks",
            excerpt: "Explore Morocco's elegant capital city. Discover the blue-walled Kasbah of the Udayas, the ancient Hassan Tower, and historic ruins.",
            description: "As the capital city of Morocco and our official base, Rabat offers a tranquil blend of imperial history and clean, modern coastal streets. Unlike other tourist hubs, Rabat features quiet monuments, green spaces, and a peaceful coastline. On this private tour, explore the historic Kasbah of the Udayas, see the ancient Roman ruins of Chellah, and stand before the majestic Mausoleum of Mohammed V.",
            duration: "4-5 hours",
            priceText: "From €105 per person",
            departureCity: "Rabat",
            finishCity: "Rabat",
            highlights: [
                "Stroll through the narrow, blue-painted alleys of the Kasbah of the Udayas",
                "Visit the iconic Hassan Tower, the minaret of an unfinished 12th-century mosque",
                "Pay respects at the marble Mausoleum of Mohammed V, guarded by Royal Horsemen",
                "Explore the Roman and medieval ruins of the Chellah necropolis",
                "Walk along the scenic Bouregreg river marina"
            ],
            itinerary: [
                { title: "09:00 AM - Departure", desc: "Pickup from your hotel in Rabat by your private chauffeur." },
                { title: "09:30 AM - Kasbah of the Udayas & Andalusian Gardens", desc: "Walk through the historic fortress, taking photos of blue-painted walls and enjoying mint tea at Café Maure." },
                { title: "11:00 AM - Hassan Tower & Mausoleum", desc: "Stand before the 44-meter minaret and tour the tomb decorated with traditional wood and plaster carvings." },
                { title: "12:30 PM - Chellah Necropolis", desc: "Discover Roman ruins, ancient medieval walls, and watch nesting storks in this peaceful archaeological garden." },
                { title: "01:30 PM - Medina Seafood Lunch", desc: "Savor fresh seafood at a local restaurant overlooking the Bouregreg marina before returning." }
            ],
            whatsIncluded: [
                "Private vehicle and chauffeur in Rabat",
                "All fuel, highway tolls, and parking costs",
                "Local licensed guide (3 hours)",
                "Bottled mineral water"
            ],
            whatsExcluded: [
                "Entrance fees to monuments (Chellah: ~70 MAD)",
                "Lunch and beverages",
                "Tips for your guide and driver"
            ],
            faqs: [
                { q: "Is Rabat very touristy?", a: "No, Rabat is a peaceful administrative capital. It is less crowded than Marrakech or Fes, offering a very authentic, relaxed experience." },
                { q: "Can we book this tour from Casablanca?", a: "Yes. We can customize the tour to include round-trip private transport from Casablanca for an additional fee." }
            ],
            seoTitle: "Private Rabat Imperial City Tour - Certified Guides | Mdina Tours",
            seoDesc: "Discover the capital city of Rabat on a private half-day guided tour. Explore the Kasbah of the Udayas, Hassan Tower, and Chellah ruins."
        },
        fr: {
            title: "Visite de Rabat, la Capitale Impériale",
            tagline: "Kasbahs Médiévales, Mausolées Royaux et Rives Paisibles",
            excerpt: "Explorez l'élégante capitale du Maroc. Découvrez la Kasbah des Oudayas aux murs bleus, la tour Hassan et la nécropole du Chellah.",
            description: "En tant que capitale du Maroc et siège officiel de notre agence, Rabat offre un cadre de visite aéré entre océan et monuments historiques. Explorez la kasbah fortifiée des Oudayas, les ruines antiques du Chellah et le somptueux mausolée Mohammed V.",
            duration: "4-5 heures",
            priceText: "À partir de 105 € par personne",
            departureCity: "Rabat",
            finishCity: "Rabat",
            highlights: [
                "Balade dans les ruelles peintes en bleu et blanc de la Kasbah des Oudayas",
                "Visite de la Tour Hassan, vestige d'une mosquée inachevée du XIIe siècle",
                "Recueillement au Mausolée Mohammed V, chef-d'œuvre de l'art traditionnel",
                "Exploration des vestiges romains et mérinides du Chellah",
                "Promenade le long de la marina du Bouregreg"
            ],
            itinerary: [
                { title: "09h00 - Prise en Charge", desc: "Votre chauffeur privé vous récupère à votre riad à Rabat." },
                { title: "09h30 - Kasbah des Oudayas & Jardin Andalou", desc: "Visitez la forteresse et dégustez des cornes de gazelle au célèbre Café Maure face au fleuve." },
                { title: "11h00 - Tour Hassan & Mausolée", desc: "Découvrez le minaret de grès rouge et le tombeau gardé par la garde royale." },
                { title: "12h30 - Nécropole du Chellah", desc: "Découvrez ce site magique habité par les cigognes et les ruines romaines." },
                { title: "13h30 - Déjeuner Marina", desc: "Dégustez un bon poisson grillé face aux bateaux de la marina avant le retour." }
            ],
            whatsIncluded: [
                "Transport privé avec chauffeur à Rabat",
                "Frais de stationnement et carburant",
                "Guide local certifié (3 heures)",
                "Eau minérale en bouteille"
            ],
            whatsExcluded: [
                "Entrée aux monuments (Chellah : ~70 MAD)",
                "Déjeuner et boissons",
                "Pourboires pour le chauffeur et le guide"
            ],
            faqs: [
                { q: "Rabat est-elle une ville très fréquentée ?", a: "Non, Rabat est une capitale calme et agréable, idéale pour se promener sans la foule des autres villes touristiques." },
                { q: "Peut-on réserver cette excursion depuis Casablanca ?", a: "Oui, nous organisons régulièrement ce tour avec une prise en charge et retour depuis Casablanca." }
            ],
            seoTitle: "Visite Guidée Privée Rabat Impériale | Mdina Tours",
            seoDesc: "Explorez les richesses historiques de Rabat avec notre guide agréé. Kasbah des Oudayas, Tour Hassan et Chellah au programme."
        }
    }
];

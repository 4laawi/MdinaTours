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
}

export const toursData: TourData[] = [
    {
        slug: "marrakech-day-trip",
        image: "/hero-marrakech.webp",
        price: 114,
        en: {
            title: "Marrakech Day Trip",
            tagline: "Vibrant Souks, Historic Palaces, and Majestic Monuments",
            excerpt: "Immerse yourself in the bustling energy of the Red City. Discover historic palaces, botanical gardens, and the legendary Jemaa el-Fnaa square.",
            description: "Journey from Rabat or Casablanca to Marrakech, the ultimate cultural jewel of Morocco. Led by our certified local guides, this private excursion takes you through centuries of history. Experience the perfect blend of Moorish architecture, lively street performances, and artisanal shopping in the labyrinthine medina. Customize your itinerary to match your interests, whether you want to focus on historical palaces or peaceful garden retreats.",
            duration: "10-12 hours",
            priceText: "From €114 per person",
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
            priceText: "À partir de 114 € par personne",
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
        }
    },
    {
        slug: "chefchaouen-day-trip",
        image: "/hero-chefchaouen.webp",
        price: 132,
        en: {
            title: "Chefchaouen Blue City Tour",
            tagline: "Explore the Hidden Blue Pearl of the Rif Mountains",
            excerpt: "Wander through the photogenic, blue-washed streets of Chefchaouen, hike to the Spanish Mosque, and enjoy spectacular mountain scenery.",
            description: "Escape to the tranquil Rif Mountains and explore Chefchaouen, Morocco's famous 'Blue Pearl'. Founded in 1471, this beautiful mountain fortress is celebrated for its soothing blue-washed alleys, artistic vibe, and laid-back atmosphere. Walk up to the Spanish Mosque for a panoramic view of the entire valley and learn about the city's unique Andalusian history from a local perspective.",
            duration: "12-14 hours",
            priceText: "From €132 per person",
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
            priceText: "À partir de 132 € par personne",
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
                { q: "Pourquoi les murs sont-ils bleus ?", a: "Plusieurs théories existent : certains l'attribuent aux réfugiés juifs des années 1930 pour rappeler le ciel, d'autres disent que cela repousse les moustiques." },
                { q: "Que dois-je emporter pour cette excursion ?", a: "Prévoyez un appareil photo, de bonnes chaussures de marche, et une veste légère car l'air de la montagne peut être frais." },
                { q: "L'excursion d'une journée est-elle faisable ?", a: "Oui, notre transport privé permet de visiter Chefchaouen confortablement depuis Fès, Rabat ou Tanger sur la journée." }
            ],
            seoTitle: "Excursion Privée Chefchaouen depuis Rabat | Mdina Tours",
            seoDesc: "Découvrez la ville bleue de Chefchaouen lors d'une excursion d'une journée au départ de Rabat. Transport VIP et accompagnement local inclus."
        }
    },
    {
        slug: "atlas-mountains-tour",
        image: "/hero-landscape-3.webp",
        price: 156,
        en: {
            title: "Atlas Mountains & Ourika Valley Tour",
            tagline: "Scenic Waterfalls, Berber Villages, and Majestic Peaks",
            excerpt: "Escape the city heat. Travel to the high High Atlas peaks, hike past rushing mountain waterfalls, and share traditional mint tea with a Berber family.",
            description: "Immerse yourself in the traditional mountain culture of Morocco's High Atlas. Rushing mountain rivers, terraced agricultural plots, and red-clay villages carved into canyon walls define the Ourika Valley and Imlil region. This tour takes you off the beaten path to explore authentic Berber heritage, hike past mountain streams, and witness how locals have lived in harmony with the mountains for thousands of years.",
            duration: "8-10 hours",
            priceText: "From €156 per person",
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
            priceText: "À partir de 156 € par personne",
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
        }
    },
    {
        slug: "agafay-desert-experience",
        image: "/b-roll/agafay.webp",
        price: 96,
        en: {
            title: "Agafay Desert Dinner & Camel Experience",
            tagline: "Stunning Stone Dunes, Camel Rides, and Dinner Under the Stars",
            excerpt: "Discover the rocky desert of Agafay just outside Marrakech. Ride a camel at sunset and enjoy a gourmet dinner in a luxury nomadic camp.",
            description: "If you don't have time to travel all the way to the Sahara, the Agafay Desert offers the perfect stone-dune alternative. Located just 40 minutes south of Marrakech, this dry plateau features vast landscapes, white mud villages, and panoramic views of the Atlas Mountains. Enjoy a scenic camel ride at sunset and dine under a starry sky inside a luxurious desert camp with live Gnaoua music and fire shows.",
            duration: "5-6 hours",
            priceText: "From €96 per person",
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
            priceText: "À partir de 96 € par personne",
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
        }
    },
    {
        slug: "merzouga-desert-tour",
        image: "/b-roll/merzouga.webp",
        price: 348,
        en: {
            title: "3-Day Merzouga Desert Expedition",
            tagline: "Sahara Dunes, Canyons, Kasbahs, and Nomadic Nights",
            excerpt: "Embark on the ultimate Moroccan adventure. Traverse the Atlas Mountains, explore Ait Benhaddou, and spend a night in the Erg Chebbi Sahara dunes.",
            description: "Cross the High Atlas Mountains, explore ancient mud-brick fortresses, and experience the golden sand dunes of Erg Chebbi in Merzouga. This 3-day private desert tour is designed for travelers who want to experience the deep Sahara. Sleep in a luxury desert camp, ride camels over wind-swept sand ridges, and witness the stunning starry sky of the desert night. Customize the stops along the way, including scenic lookouts in the Dades and Todra gorges.",
            duration: "3 Days / 2 Nights",
            priceText: "From €348 per person",
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
            priceText: "À partir de 348 € par personne",
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
        }
    },
    {
        slug: "fes-guided-tour",
        image: "/b-roll/fes.jpg",
        price: 66,
        en: {
            title: "Fes Medina Walking Tour",
            tagline: "Step Back in Time in the World's Largest Car-Free Urban Area",
            excerpt: "Explore Fes el-Bali, the oldest cultural capital of Morocco. Walk past medieval tanneries, ancient madrassas, and historic palaces.",
            description: "With over 9,000 narrow alleys, the medieval city of Fes el-Bali is the beating heart of Moroccan craft and academic history. Led by our licensed historical guide, this walking tour brings the ancient city to life. Walk past colorful spice shops, visit the oldest working university in the world, and look out over the famous Chouara leather tanneries from a panoramic terrace.",
            duration: "5-6 hours",
            priceText: "From €66 per group",
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
            priceText: "À partir de 66 € par groupe",
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
        price: 72,
        en: {
            title: "Casablanca Highlights Tour",
            tagline: "Art Deco Architecture, Modern Coastlines, and the Hassan II Mosque",
            excerpt: "Explore Morocco's economic powerhouse. Visit the architectural masterpiece of the Hassan II Mosque and stroll along the scenic Corniche.",
            description: "Casablanca is the modern, beating heart of Morocco's economic progress. Blending mid-century French Art Deco architecture with historic Moorish elements, this city features grand avenues, coastal walks, and religious landmarks. This private tour takes you inside the Hassan II Mosque—the largest functioning mosque in Africa—and showcases the iconic neighborhoods of Habous and the beachfront Corniche.",
            duration: "4-5 hours",
            priceText: "From €72 per person",
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
            priceText: "À partir de 72 € par personne",
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
                { title: "11h30 - Balade sur la Corniche", desc: "Parcours côtier en admirant les plages et les clubs de surf." },
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
        price: 60,
        en: {
            title: "Rabat Imperial Capital Tour",
            tagline: "Medieval Kasbahs, Royal Mausoleums, and Peaceful Coastal Walks",
            excerpt: "Explore Morocco's elegant capital city. Discover the blue-walled Kasbah of the Udayas, the ancient Hassan Tower, and historic ruins.",
            description: "As the capital city of Morocco and our official base, Rabat offers a tranquil blend of imperial history and clean, modern coastal streets. Unlike other tourist hubs, Rabat features quiet monuments, green spaces, and a peaceful coastline. On this private tour, explore the historic Kasbah of the Udayas, see the ancient Roman ruins of Chellah, and stand before the majestic Mausoleum of Mohammed V.",
            duration: "4-5 hours",
            priceText: "From €60 per person",
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
            priceText: "À partir de 60 € par personne",
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

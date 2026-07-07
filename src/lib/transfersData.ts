export interface TransferFAQ {
    q: string;
    a: string;
}

export interface SightseeingStop {
    name: string;
    image: string;
}

export interface LocalizedTransferData {
    title: string;
    tagline: string;
    pickup: string;
    dropoff: string;
    distance: string;
    duration: string;
    capacityText: string;
    highlights: string[];
    aboutRoute: string;
    faqs: TransferFAQ[];
    seoTitle: string;
    seoDesc: string;
    seoIntro?: string;
    aboutDestination?: { title: string; content: string };
    popularDropOffs?: string[];
    travelTips?: { title: string; content: string }[];
    amenities?: string[];
    sightseeingStops?: SightseeingStop[];
}

export interface TransferData {
    slug: string;
    image: string;
    prices: { [passengers: number]: number };
    en: LocalizedTransferData;
    fr: LocalizedTransferData;
}

export const transfersData: TransferData[] = [
    {
        slug: "casablanca-airport-transfer",
        image: "/Traditional.webp",
        prices: { 3: 102, 4: 120, 5: 144, 7: 180 },
        en: {
            title: "Private Transfer from Casablanca Airport to Rabat",
            tagline: "Seamless, Premium Chauffeur Service Direct to Your Hotel or Riad",
            pickup: "Casablanca Mohammed V International Airport (CMN)",
            dropoff: "Rabat or Salé City Center",
            distance: "120 km (75 miles)",
            duration: "1 hour 30 mins",
            capacityText: "Executive Sedans (1-3 pax), Spacious Vans (up to 7 pax)",
            highlights: [
                "Live Flight Tracking: We actively monitor your flight status so that your driver is waiting for you precisely when you land, with zero stress or waiting fees.",
                "Transparent Fixed Rates: Enjoy peace of mind with a single upfront price that covers toll roads, fuel, and night arrivals—absolutely no negotiations required.",
                "Qualified Local Chauffeurs: Travel with courteous, professional drivers fluent in English and French who know the safest routes and medina entry points.",
                "Elite Fleet Comfort: Relax in our modern, immaculate, fully air-conditioned sedans or spacious minivans tailored to your group size.",
                "True Door-to-Door Service: Avoid the hassle of train stations and local taxis; we take you directly from the CMN arrivals terminal to your doorstep in Rabat."
            ],
            aboutRoute: "The route linking Casablanca Airport (CMN) to Rabat winds along the A1 coastal expressway. This modern, multi-lane highway offers a swift and safe transit through Morocco’s western corridor. Over the course of the 90-minute journey, you can connect to our onboard options, unwind in quiet comfort, and watch the changing Moroccan landscape transform from bustling industrial hubs to coastal vistas.",
            faqs: [
                { q: "What is the cost of a private taxi from Casablanca Airport to Rabat?", a: "Our private transfer starts at a flat rate of €102 for a comfort vehicle seating up to 3 guests. The price is per vehicle, not per passenger, and includes all highway tolls, luggage handling, and taxes." },
                { q: "Is ride-sharing like Uber available at CMN Airport?", a: "Ride-sharing apps such as Uber do not operate in Morocco. While local alternatives exist, they face strict regulations and are barred from picking up passengers directly at airport terminals. Pre-booking a private chauffeur is the most reliable way to secure an immediate, authorized ride." },
                { q: "How does flight tracking work for delays?", a: "We request your flight number during booking to track your arrival in real time. If your plane lands early or gets delayed, your driver adjusts their schedule automatically to be there right as you walk out. No waiting charges apply." },
                { q: "Where will my driver be waiting?", a: "Once you pass through customs and collect your baggage, walk into the main arrivals hall. Your chauffeur will be standing clearly visible, holding a greeting sign with your name and our company logo." },
                { q: "Do you supply child safety seats?", a: "Yes, we can provide clean, age-appropriate baby or booster seats free of charge. Simply mention your request and your child's age in the booking details so we can configure the vehicle before pickup." },
                { q: "Can I book a return transfer from Rabat to Casablanca Airport?", a: "Absolutely. We offer round-trip transfers. Your driver can pick you up from your Rabat hotel and ensure you reach CMN airport with plenty of time before your departure flight." },
                { q: "Do your drivers speak English?", a: "Yes, our professional drivers are bilingual. They speak English and French, making communication easy and stress-free." },
                { q: "Are highway tolls included in the price?", a: "Yes, our flat-rate pricing includes all fuel, vehicle costs, and highway toll fees. There are no hidden surprises." },
                { q: "Can I pay in euros?", a: "Yes, you can pay your driver in cash using either Euros or Moroccan Dirhams (MAD) at the end of your journey." },
                { q: "How long does it take to get from Casablanca Airport to Rabat?", a: "The drive typically takes about 1 hour and 30 minutes, depending on traffic conditions upon entering Rabat." }
            ],
            seoTitle: "Premium Casablanca Airport (CMN) to Rabat Private Transfer",
            seoDesc: "Pre-book a first-class private transfer from Casablanca Mohammed V Airport to Rabat. Fixed luxury rates, real-time flight tracking, and pristine modern vehicles.",
            seoIntro: "Embark on your Moroccan journey with the ultimate comfort of a dedicated private transfer from Casablanca Mohammed V International Airport (CMN) directly to Rabat. Skip the crowded train terminals and the uncertainty of airport taxi lines. Our bespoke service coordinates a professional local chauffeur to meet you inside the arrivals hall, assist with your luggage, and escort you to a premium, climate-controlled vehicle. Whether you are traveling for a business summit in Hay Riad or heading to a boutique riad in the heart of the historic Medina, our door-to-door transit promises a peaceful, reliable, and scenic ride along the Atlantic coast.",
            aboutDestination: {
                title: "Discovering Rabat",
                content: "As Morocco's coastal capital, Rabat presents a captivating blend of deep historical heritage and sophisticated contemporary life. Known for its wide tree-lined boulevards and quiet coastal charm, the city stands in serene contrast to the high-energy pace of Marrakech or Casablanca. Important destinations include the monumental Hassan Tower, the blue-and-white clifftop Kasbah of the Udayas, the ancient Roman ruins of Chellah, and the modern corporate districts of Agdal and Hay Riad."
            },
            popularDropOffs: [
                "Luxury Hotels & Resorts (e.g., La Tour Hassan Palace, Sofitel Rabat Jardin des Roses, Marriott)",
                "Traditional Riads in the Rabat Medina and Kasbah of the Udayas",
                "Business Districts: Agdal, Hay Riad, and the Technopolis",
                "Embassies & Consulates in the diplomatic quarter",
                "Rabat-Salé Airport (RBA)",
                "Train Stations: Rabat Ville and Rabat Agdal"
            ],
            travelTips: [
                { title: "Currency", content: "While many places in Rabat accept credit cards, it's wise to have some Moroccan Dirhams (MAD) for small purchases in the Medina. You can withdraw cash from ATMs at Casablanca Airport before meeting your driver." },
                { title: "SIM Cards", content: "Free or cheap local SIM cards are often distributed in the airport arrivals hall. Grab one so you have mobile data on the road." },
                { title: "Medina Access", content: "If you are staying in the Rabat Medina, cars cannot enter the narrow streets. Your driver will drop you at the nearest accessible gate and can call your riad to send a porter for your bags." },
                { title: "Best Arrival Times", content: "The highway is safe at all hours, but arriving during the day allows you to enjoy the coastal views." }
            ]
        },
        fr: {
            title: "Transfert Privé de l'Aéroport de Casablanca vers Rabat",
            tagline: "Chauffeur Privé et Service Premium Direct jusqu'à votre Hôtel ou Riad",
            pickup: "Aéroport International Mohammed V de Casablanca (CMN)",
            dropoff: "Centre-ville de Rabat ou Salé",
            distance: "120 km (vers Rabat)",
            duration: "1 heure 30 mins",
            capacityText: "1 à 7 passagers avec bagages dans des vans ou berlines de prestige",
            highlights: [
                "Suivi de Vol en Temps Réel : Nous surveillons l'état de votre vol afin que votre chauffeur vous attende à votre atterrissage, sans frais de retard.",
                "Tarifs Fixes et Transparents : Voyagez l'esprit tranquille avec un prix fixe tout compris (péages, carburant, suppléments de nuit) sans aucune négociation.",
                "Chauffeurs Professionnels : Des chauffeurs locaux expérimentés, courtois et bilingues (français et anglais) pour vous guider en toute sécurité.",
                "Flotte Moderne et Confortable : Des berlines et minivans récents, climatisés et nettoyés avec soin avant chaque course.",
                "Service Porte-à-Porte Intégral : Nous vous prenons en charge au terminal des arrivées et vous déposons directement devant votre hébergement à Rabat."
            ],
            aboutRoute: "La liaison rapide par l'autoroute A1 côtière relie l'aéroport CMN de Casablanca à Rabat. C'est l'axe le plus direct pour rejoindre la capitale. Votre chauffeur privé vous prend en charge dès la sortie des bagages pour vous assurer un trajet confortable sans les tracas des transports publics.",
            faqs: [
                { q: "Que se passe-t-il si mon vol a du retard ?", a: "Nous suivons l'état de votre vol en temps réel. Le chauffeur s'adaptera sans aucun surcoût." },
                { q: "Comment repérer mon chauffeur à l'aéroport ?", a: "Dès votre sortie du hall des bagages, votre chauffeur se tiendra visible avec une pancarte arborant votre nom et le logo de Mdina Tours." }
            ],
            seoTitle: "Chauffeur Privé Aéroport Casablanca CMN vers Rabat | Mdina Tours",
            seoDesc: "Service de transfert privé haut de gamme depuis l'Aéroport de Casablanca (CMN) vers Rabat. Tarif fixe garanti, accueil personnalisé et berlines/vans climatisés."
        }
    },
    {
        slug: "rabat-airport-transfer",
        image: "/hero-landscape-1.webp",
        prices: { 3: 36, 4: 42, 5: 54, 7: 72 },
        en: {
            title: "Rabat-Salé Airport (RBA) Private Chauffeur",
            tagline: "Quick, Stress-Free Airport Taxi to Hotels & Riads in Rabat or Salé",
            pickup: "Rabat-Salé International Airport (RBA)",
            dropoff: "Any Hotel or Riad in Rabat or Salé",
            distance: "15 km",
            duration: "25-30 minutes",
            capacityText: "Up to 7 passengers with comfortable seating and cargo storage",
            highlights: [
                "Fixed Flat Rates: Enjoy transparent pricing covering the entire Rabat-Salé metropolitan area with zero hidden surprises.",
                "Meet & Greet Service: Your private driver will be waiting directly at the terminal exit, holding a sign for quick greeting.",
                "Air-Conditioned Comfort: Travel in clean, climate-controlled executive vehicles configured for ultimate relaxation.",
                "No Prepayment Required: Lock in your booking instantly and pay cash (Dirhams or Euros) directly to your chauffeur upon arrival.",
                "Medina Gate Drop-Offs: Seamless coordination with riad hosts for smooth porter hand-off at pedestrian-only medina entry gates."
            ],
            aboutRoute: "Situated just north of the Bouregreg River, Rabat-Salé Airport (RBA) is the closest entry point to the capital. While RBA is close to city hotels, locating a standard public taxi that is willing to coordinate with medina riads can be challenging. Our professional airport transfer ensures your driver knows the exact drop-off gates and connects directly with your host to make your check-in effortless.",
            faqs: [
                { q: "Will the vehicle take me directly to my riad doors?", a: "The ancient medina of Rabat is completely pedestrian-only. Your private driver will transport you to the closest secure drop-off gate and coordinate with your riad staff to greet you and transport your bags." },
                { q: "Is the listed fare per passenger or per group?", a: "All private transfer rates are fixed per vehicle rather than per passenger, offering great value for families, couples, and small travel groups." }
            ],
            seoTitle: "Rabat-Salé Airport (RBA) Private Transfers | Mdina Tours",
            seoDesc: "Pre-book a fast, reliable private transfer from Rabat-Salé Airport (RBA) straight to your hotel or riad. Professional drivers, fixed prices, pay on arrival."
        },
        fr: {
            title: "Transfert Privé Aéroport Rabat-Salé",
            tagline: "Navette Rapide et Fiable de l'Aéroport RBA vers votre Hôtel",
            pickup: "Aéroport International Rabat-Salé (RBA)",
            dropoff: "Tout Riad ou Hôtel à Rabat ou Salé",
            distance: "15 km",
            duration: "25-30 minutes",
            capacityText: "Jusqu'à 7 passagers avec bagages volumineux",
            highlights: [
                "Tarifs forfaitaires englobant toute la zone urbaine de Rabat-Salé",
                "Chauffeurs ponctuels présents devant les portes de sortie",
                "Véhicules propres, désinfectés et climatisés",
                "Paiement sur place en espèces à la fin de votre trajet",
                "Service porte-à-porte coordonné avec les riads de la médina"
            ],
            aboutRoute: "L'aéroport de Rabat-Salé (RBA) dessert la capitale administrative. Notre service privé vous garantit un accueil sans file d'attente. Si vous logez dans la médina piétonne, nous déposons au point d'accès le plus proche et prévenons le personnel de votre riad.",
            faqs: [
                { q: "Le chauffeur peut-il me déposer devant mon Riad ?", a: "La médina étant piétonne, le chauffeur vous déposera à la porte d'accès la plus proche (ex: Bab Chellah ou Bab el Had) et contactera votre Riad." },
                { q: "Le tarif est-il par personne ou par véhicule ?", a: "Nos prix sont calculés par véhicule. Le tarif affiché est le prix total pour l'ensemble de votre groupe." }
            ],
            seoTitle: "Transfert Privé Aéroport Rabat-Salé RBA | Mdina Tours",
            seoDesc: "Réservez votre navette privée de l'aéroport Rabat-Salé (RBA) vers votre hôtel. Service fiable, chauffeurs bilingues, réservation rapide."
        }
    },
    {
        slug: "tangier-to-rabat-transfer",
        image: "/Tangier-Morocco-Photo.webp",
        prices: { 3: 180, 4: 210, 5: 240, 7: 336 },
        en: {
            title: "Tangier to Rabat Private Expressway Transfer",
            tagline: "Comfortable City-to-City Chauffeur Travel via the Atlantic Highway",
            pickup: "Tangier (Airport, Port, or Hotel)",
            dropoff: "Rabat (Hotel, Riad, or Airport)",
            distance: "250 km",
            duration: "2 hours 45 minutes",
            capacityText: "1 to 7 passengers in premium multi-purpose vehicles",
            highlights: [
                "Scenic Coastal Routing: Travel safely along the multi-lane Atlantic highway linking the north to the capital.",
                "Bespoke Scheduling: Select your exact departure time to fit your itinerary, cruise arrival, or hotel checkout.",
                "On-Demand Comfort Stops: Request breaks at clean highway rest areas for coffee, fresh snacks, or stretching.",
                "Spacious Group Vehicles: Stretch out in modern, high-clearance minivans with ample space for large suitcases.",
                "Safe Driving Standards: Professional drivers committed to strict speed limits and passenger safety."
            ],
            aboutRoute: "The city-to-city transit between Tangier and Rabat runs along the beautiful Atlantic highway. While high-speed trains exist, navigating train stations with heavy bags and arranging taxis on both ends can be exhausting. Our private transfer provides a door-to-door option, taking you directly from your cruise port or hotel in Tangier and dropping you off at your destination in Rabat in total peace.",
            faqs: [
                { q: "Are we allowed to stop in Asilah or Larache along the way?", a: "Yes! If you would like to stretch your legs or have lunch in the historic coastal town of Asilah or Larache, please let us know when booking so we can block out extra time for your driver." },
                { q: "Is the Atlantic highway route safe?", a: "Yes, the A1 coastal expressway is a modern, high-speed toll road built to international safety standards, ensuring a smooth and secure trip." }
            ],
            seoTitle: "Private Transfer Tangier to Rabat | Mdina Tours",
            seoDesc: "Travel in comfort with a private city-to-city transfer from Tangier to Rabat. Pristine air-conditioned vehicles, professional bilingual drivers, and door-to-door convenience."
        },
        fr: {
            title: "Transfert de Tanger à Rabat",
            tagline: "Liaison Intervilles Confortable via l'Autoroute de l'Atlantique",
            pickup: "Tanger (Hôtel, Port ou Aéroport)",
            dropoff: "Rabat (Hôtel, Riad ou Aéroport)",
            distance: "250 km",
            duration: "2 heures 45 minutes",
            capacityText: "1 à 7 passagers dans des monospaces ou vans haut de gamme",
            highlights: [
                "Trajet agréable le long de la côte atlantique",
                "Heures de départ flexibles selon vos envies",
                "Arrêts à votre demande dans les aires de repos",
                "Vans spacieux avec grand coffre pour bagages",
                "Respect strict des règles de sécurité routière"
            ],
            aboutRoute: "Le trajet Tanger-Rabat se fait par l'autoroute côtière. Idéal si vous voyagez avec des bagages lourds ou en famille, notre service vous évite les contraintes des gares et vous dépose directement devant votre adresse finale.",
            faqs: [
                { q: "Peut-on s'arrêter à Asilah en chemin ?", a: "Oui, un arrêt découverte à Asilah est tout à fait possible. Signalez-le lors de votre réservation pour adapter le planning du chauffeur." },
                { q: "Comment se déroule le paiement ?", a: "Vous réglez directement le chauffeur en espèces (Euros ou Dirhams) à la fin de la prestation." }
            ],
            seoTitle: "Chauffeur Privé Tanger vers Rabat | Mdina Tours",
            seoDesc: "Navette privée de Tanger à Rabat. Voyagez confortablement à bord de nos véhicules récents conduits par des chauffeurs expérimentés."
        }
    },
    {
        slug: "rabat-to-casablanca-transfer",
        image: "/hero-landscape-1.webp",
        prices: { 3: 96, 4: 108, 5: 132, 7: 168 },
        en: {
            title: "Rabat to Casablanca Private Transfer",
            tagline: "Quick and Premium Business & Leisure Transfers between Morocco's Two Major Hubs",
            pickup: "Rabat (Hotel, Office, or Airport)",
            dropoff: "Casablanca (Hotel, Office, Port, or Airport)",
            distance: "90 km",
            duration: "1 hour 10 minutes",
            capacityText: "Sedans and vans suitable for corporate executives or families",
            highlights: [
                "Ideal for business travelers needing punctuality",
                "Door-to-door transfer skipping crowded train stations",
                "On-board Wi-Fi and phone chargers on request",
                "Experienced highway drivers with local road expertise",
                "Professional invoicing for companies"
            ],
            aboutRoute: "The corridor between Rabat and Casablanca is the busiest economic route in Morocco. Whether you are traveling for a business meeting, returning from a holiday, or catching a flight, our private transfers provide a quiet, productive space. Avoid carrying heavy bags through train stations and enjoy the comfort of a private vehicle.",
            faqs: [
                { q: "Do you offer corporate accounts?", a: "Yes, we work with several national and international companies to provide daily or weekly executive transport between Rabat and Casablanca." },
                { q: "Can we book a return transfer on the same day?", a: "Yes, we can arrange same-day round trips. Your driver can wait for you at your meeting venue or city location." }
            ],
            seoTitle: "Private Driver Rabat to Casablanca Transfer | Mdina Tours",
            seoDesc: "Fast and professional private transfers between Rabat and Casablanca. Perfect for corporate travel, families, and airport connections."
        },
        fr: {
            title: "Transfert de Rabat à Casablanca",
            tagline: "Liaison Premium pour Affaires et Loisirs entre Rabat et Casablanca",
            pickup: "Rabat (Hôtel, Bureau ou Aéroport)",
            dropoff: "Casablanca (Hôtel, Bureau ou Aéroport)",
            distance: "90 km",
            duration: "1 heure 10 minutes",
            capacityText: "Berlines et vans adaptés aux professionnels et familles",
            highlights: [
                "Idéal pour les déplacements professionnels exigeant de la ponctualité",
                "Navette porte-à-porte évitant l'affluence des gares",
                "Chargeurs de téléphones et climatisation à bord",
                "Chauffeurs courtois et habitués aux trajets interurbains",
                "Possibilité de facturation professionnelle"
            ],
            aboutRoute: "La liaison Rabat-Casablanca est l'axe le plus fréquenté du pays. Notre service offre aux professionnels un espace calme et connecté pour travailler ou se détendre durant le trajet, sans les aléas des transports publics.",
            faqs: [
                { q: "Proposez-vous des tarifs pour les entreprises ?", a: "Oui, nous pouvons mettre en place des contrats réguliers pour les déplacements de vos collaborateurs ou clients." },
                { q: "Peut-on réserver un aller-retour dans la journée ?", a: "Absolument. Le chauffeur peut vous attendre sur votre lieu de rendez-vous ou vous récupérer à une heure convenue." }
            ],
            seoTitle: "Transfert Privé Rabat Casablanca | Mdina Tours",
            seoDesc: "Chauffeur privé entre Rabat et Casablanca. Trajets rapides, confort garanti et ponctualité pour vos rendez-vous d'affaires ou loisirs."
        }
    },
    {
        slug: "marrakech-to-essaouira-transfer",
        image: "/img2/Essaouira-maroc.jpg",
        prices: { 3: 108, 4: 132, 5: 156, 7: 216 },
        en: {
            title: "Marrakech to Essaouira Coastal Transfer",
            tagline: "Relaxing Private Drive from the Red City to the Atlantic Wind Capital",
            pickup: "Marrakech (Hotel or Airport)",
            dropoff: "Essaouira (Hotel, Riad, or Port)",
            distance: "180 km",
            duration: "2 hours 45 minutes",
            capacityText: "1 to 7 passengers with generous room for surfboards or golf clubs",
            highlights: [
                "Stop along the road to see the famous tree-climbing goats",
                "See the changing landscapes from arid plains to argan forests",
                "Direct door-to-door transfer directly to Essaouira's medina gates",
                "Clean, non-smoking, air-conditioned vehicles",
                "Stop at an authentic Argan cooperative on request"
            ],
            aboutRoute: "The road from Marrakech to the coastal city of Essaouira is a scenic drive through the dry Chichaoua plains and green argan forests. Known for its steady trade winds, historical ramparts, and relaxed beach vibe, Essaouira is a popular destination. Our private transfer ensures a scenic, comfortable drive, stopping along the way to observe goats feeding in Argan branches.",
            faqs: [
                { q: "Will we see the famous tree-climbing goats?", a: "Yes! The road between Marrakech and Essaouira is the natural habitat of Argan trees. If they are active, your driver will point them out and stop for photos." },
                { q: "Is the price inclusive of highway tolls?", a: "The road to Essaouira is a national highway without tolls. The price is fully inclusive of fuel, driver fees, and local taxes." }
            ],
            seoTitle: "Marrakech to Essaouira Private Transfer | Mdina Tours",
            seoDesc: "Travel from Marrakech to Essaouira in comfort. Private vans and sedans with certified drivers. See the tree-climbing goats along the way."
        },
        fr: {
            title: "Transfert de Marrakech à Essaouira",
            tagline: "Liaison Privée de la Ville Rouge vers la Cité des Alizés de l'Atlantique",
            pickup: "Marrakech (Hôtel ou Aéroport)",
            dropoff: "Essaouira (Hôtel, Riad ou Port)",
            distance: "180 km",
            duration: "2 heures 45 minutes",
            capacityText: "1 à 7 passagers avec de l'espace pour vos planches de surf",
            highlights: [
                "Arrêt photo pour observer les fameuses chèvres sur les arganiers",
                "Traversée des plaines arides et des forêts d'arganiers sauvages",
                "Service porte-à-porte jusqu'aux portes de la médina d'Essaouira",
                "Véhicules climatisés, non-fumeurs et confortables",
                "Visite facultative d'une coopérative d'huile d'argan certifiée"
            ],
            aboutRoute: "Rejoindre Essaouira depuis Marrakech se fait via la route nationale. Notre transfert privé vous permet de voyager à votre rythme, en évitant les trajets fatigants en autocar et en profitant d'arrêts photos pittoresques.",
            faqs: [
                { q: "Verra-t-on les chèvres sur les arbres ?", a: "Oui, c'est sur cette route que se trouvent les arganiers. Votre chauffeur s'arrêtera volontiers pour vous laisser prendre des photos." },
                { q: "Les bagages volumineux sont-ils acceptés ?", a: "Nos vans disposent de coffres spacieux pouvant accueillir des planches de surf ou sacs de golf. Signalez-le à la réservation." }
            ],
            seoTitle: "Navette Privée Marrakech Essaouira | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Marrakech à Essaouira. Voyage sécurisé, chèvres sur les arganiers et dépôt direct à votre hôtel."
        }
    },
    {
        slug: "fes-to-chefchaouen-transfer",
        image: "/hero-chefchaouen.webp",
        prices: { 3: 144, 4: 168, 5: 192, 7: 264 },
        en: {
            title: "Fes to Chefchaouen Scenic Mountain Transfer",
            tagline: "Beautiful Private Ride from Morocco's Intellectual Capital to the Blue Pearl",
            pickup: "Fes (Riad, Hotel, or Airport)",
            dropoff: "Chefchaouen (Hotel or Riad)",
            distance: "200 km",
            duration: "3 hours 30 minutes",
            capacityText: "1 to 7 passengers with experienced mountain drivers",
            highlights: [
                "Drive through the scenic Rif mountain valleys",
                "Paved mountain-road expertise prioritizing passenger comfort",
                "Stop for panoramic photographs overlooking the Sidi Chahed dam",
                "Air-conditioned vans designed for steep ascents",
                "Smooth hotel-to-hotel coordination"
            ],
            aboutRoute: "The drive from the ancient imperial city of Fes to the blue-painted mountain town of Chefchaouen winds through farming plains and the rugged Rif Mountains. Because there are no train routes, public buses are slow and crowded. Our private transfer offers a direct, beautiful journey, driven by chauffeurs experienced in winding mountain routes.",
            faqs: [
                { q: "How are the road conditions?", a: "The route involves winding mountain roads. Our vehicles are equipped with good suspension and driven at moderate speeds to prevent motion sickness." },
                { q: "Can we visit the Roman ruins of Volubilis on the way?", a: "Yes! We can arrange a custom detour to visit the historic ruins of Volubilis and the holy town of Moulay Idriss Zerhoun. Contact us for a quote." }
            ],
            seoTitle: "Fes to Chefchaouen Private Transfer & Taxi | Mdina Tours",
            seoDesc: "Book a private transfer from Fes to Chefchaouen. Enjoy scenic mountain views, comfortable vans, and professional local drivers."
        },
        fr: {
            title: "Transfert de Fès à Chefchaouen",
            tagline: "Route Panoramique de la Capitale Intellectuelle vers la Perle Bleue",
            pickup: "Fès (Hôtel, Riad ou Aéroport)",
            dropoff: "Chefchaouen (Hôtel ou Riad)",
            distance: "200 km",
            duration: "3 heures 30 minutes",
            capacityText: "1 à 7 passagers avec des chauffeurs experts de la montagne",
            highlights: [
                "Voyage à travers les paysages spectaculaires du Rif",
                "Conduite souple et sécurisée sur les routes sinueuses",
                "Arrêt photo au-dessus du magnifique barrage de Sidi Chahed",
                "Véhicules récents équipés d'une climatisation performante",
                "Coordination directe pour la dépose dans votre riad"
            ],
            aboutRoute: "Faute de liaison ferroviaire entre Fès et Chefchaouen, le transfert privé est le moyen le plus rapide et confortable. Nos chauffeurs connaissent parfaitement les routes du Rif pour vous assurer un voyage en toute sérénité.",
            faqs: [
                { q: "La route de montagne est-elle difficile ?", a: "Elle comporte des virages mais nos chauffeurs adaptent leur vitesse pour éviter tout inconfort. Nos véhicules sont très confortables." },
                { q: "Peut-on s'arrêter à Volubilis en chemin ?", a: "Oui, nous pouvons intégrer une halte aux ruines romaines de Volubilis moyennant un léger supplément." }
            ],
            seoTitle: "Chauffeur Privé Fès vers Chefchaouen | Mdina Tours",
            seoDesc: "Réservez votre taxi privé de Fès à Chefchaouen. Voyagez en toute sécurité à travers les montagnes du Rif dans nos vans spacieux."
        }
    },
    {
        slug: "casablanca-to-marrakech-transfer",
        image: "/hero-marrakech.webp",
        prices: { 3: 192, 4: 216, 5: 252, 7: 336 },
        en: {
            title: "Casablanca to Marrakech Expressway Transfer",
            tagline: "Fast and Premium Highway Transfer between the Economic Capital and the Ochre City",
            pickup: "Casablanca (Hotel, Port, or Airport)",
            dropoff: "Marrakech (Hotel, Riad, or Airport)",
            distance: "240 km",
            duration: "2 hours 30 minutes",
            capacityText: "Executive sedans and spacious family vans",
            highlights: [
                "Fast, direct expressway routing with zero stops unless requested",
                "Ideal for airport arrivals at CMN heading straight to Marrakech",
                "Comfortable seating with individual air conditioning controls",
                "Drivers who understand Marrakech riad gate drops",
                "Available 24/7 for night flights"
            ],
            aboutRoute: "Connecting Casablanca and Marrakech is easiest via the modern southern expressway (A3). This is the preferred route for travelers landing at Casablanca Airport (CMN) who want to proceed directly to their hotel or riad in Marrakech. Our private transfer saves hours of train connections and taxi queues, offering a direct door-to-door transfer.",
            faqs: [
                { q: "Can we be picked up from the Casablanca Cruise Port?", a: "Yes! We coordinate with cruise ship arrival schedules to pick you up directly from the port gate and drive you to Marrakech." },
                { q: "Is there Wi-Fi in the car?", a: "Most of our long-distance vehicles have active Wi-Fi routers. Please request this when booking to confirm availability." }
            ],
            seoTitle: "Casablanca to Marrakech Private Transfer & Taxi | Mdina Tours",
            seoDesc: "Private highway transfers from Casablanca (CMN Airport or hotels) to Marrakech. Luxury vehicles, flat rates, and professional chauffeurs."
        },
        fr: {
            title: "Transfert de Casablanca à Marrakech",
            tagline: "Liaison Rapide par Autoroute entre la Métropole et la Ville Ocre",
            pickup: "Casablanca (Hôtel, Port ou Aéroport)",
            dropoff: "Marrakech (Hôtel, Riad ou Aéroport)",
            distance: "240 km",
            duration: "2 heures 30 minutes",
            capacityText: "Berlines exécutives et vans familiaux spacieux",
            highlights: [
                "Liaison autoroutière directe sans arrêts superflus",
                "Parfait pour les arrivées à l'aéroport CMN en direction directe de Marrakech",
                "Climatisation individuelle et sièges ergonomiques réglables",
                "Chauffeurs connaissant les accès aux parkings de la médina de Marrakech",
                "Service disponible 24h/24 pour les vols de nuit"
            ],
            aboutRoute: "La liaison rapide par l'autoroute A3 est le moyen le plus simple de relier Casablanca et Marrakech. Idéal pour les voyageurs pressés ou chargés, ce service évite les correspondances ferroviaires fastidieuses.",
            faqs: [
                { q: "Proposez-vous le départ depuis le port de Casablanca ?", a: "Oui, nous accueillons régulièrement des croisiéristes directement au terminal du port pour les conduire à Marrakech." },
                { q: "Le tarif inclut-il le péage ?", a: "Oui, le prix est forfaitaire et comprend le carburant, les péages d'autoroute et tous les frais annexes." }
            ],
            seoTitle: "Navette Casablanca vers Marrakech Autoroute | Mdina Tours",
            seoDesc: "Transfert privé rapide entre Casablanca et Marrakech. Véhicules récents et chauffeurs fiables pour vos déplacements personnels ou professionnels."
        }
    },
    {
        slug: "tangier-airport-transfer",
        image: "/img2/tangier-airport.avif",
        prices: { 3: 30, 4: 36, 5: 42, 7: 60 },
        en: {
            title: "Tangier Ibn Battouta Airport Private Transfer",
            tagline: "Direct and Comfortable Taxi from Tangier TNG Airport to your Hotel",
            pickup: "Tangier Ibn Battouta International Airport (TNG)",
            dropoff: "Tangier (City Center, Hilton Houara, Port, or Medina)",
            distance: "15 km",
            duration: "20-25 minutes",
            capacityText: "1 to 7 passengers with standard luggage allowances",
            highlights: [
                "Flight-tracked pickup – no waiting times at the terminal exit",
                "Meet & Greet with a personalized sign in the arrivals hall",
                "Fixed rates with no night-time premiums or extra fees",
                "Comfortable air-conditioned vehicles skipping local taxi queues",
                "Coordination with hotels inside the historic Kasbah"
            ],
            aboutRoute: "Tangier Ibn Battouta Airport (TNG) is the primary gateway to northern Morocco. Taxis at the terminal can be hard to negotiate, especially late at night or during peak summer months. Our private airport transfer guarantees a flat rate, a clean vehicle, and a professional driver waiting for you the moment you step outside customs.",
            faqs: [
                { q: "Can we book a transfer from Tangier Airport to Chefchaouen?", a: "Yes. In addition to local city transfers, we offer direct airport transfers from Tangier RBA to Chefchaouen, Tetouan, and Rabat." },
                { q: "Is there a surcharge for late-night pickups?", a: "No. Unlike public taxis, our private transfers have fixed rates regardless of whether your flight lands during the day or at midnight." }
            ],
            seoTitle: "Tangier Airport Transfer & Private Taxi TNG | Mdina Tours",
            seoDesc: "Book a private airport transfer from Tangier Airport (TNG) to your hotel, Medina, or Port. Fixed prices, free child seats, 24/7 flight tracking."
        },
        fr: {
            title: "Transfert Aéroport de Tanger Ibn Battouta",
            tagline: "Navette Directe et Confortable de l'Aéroport de Tanger TNG vers votre Destination",
            pickup: "Aéroport International Tanger Ibn Battouta (TNG)",
            dropoff: "Tanger (Centre-ville, Hilton Houara, Port ou Médina)",
            distance: "15 km",
            duration: "20-25 minutes",
            capacityText: "1 à 7 passagers avec bagages inclus",
            highlights: [
                "Suivi des vols – chauffeur présent dès votre passage de la douane",
                "Accueil avec panneau personnalisé dans le hall des arrivées",
                "Tarifs fixes sans supplément de nuit ou frais cachés",
                "Évitez les files d'attente interminables des grands taxis",
                "Dépose coordonnée avec les riads de la Kasbah"
            ],
            aboutRoute: "L'aéroport Ibn Battouta (TNG) dessert la ville de Tanger et sa région. Pour un début de séjour serein, notre chauffeur vous accueille à votre arrivée pour vous conduire à votre destination dans un véhicule climatisé.",
            faqs: [
                { q: "Peut-on aller directement de l'aéroport de Tanger à Chefchaouen ?", a: "Tout à fait. Nous proposons des navettes directes de l'aéroport de Tanger vers Chefchaouen, Tétouan ou Rabat." },
                { q: "Y a-t-il des frais supplémentaires de nuit ?", a: "Non, nos tarifs sont fixes et garantis 24h/24, sans aucune majoration de nuit." }
            ],
            seoTitle: "Transfert Aéroport Tanger TNG Privé | Mdina Tours",
            seoDesc: "Réservez votre taxi privé depuis l'Aéroport de Tanger (TNG) vers le centre-ville, le port ou l'hôtel Hilton Houara. Prix fixes garantis."
        }
    },
    {
        slug: "tangier-to-casablanca-transfer",
        image: "/Traditional.webp",
        prices: { 3: 240, 4: 276, 5: 312, 7: 420 },
        en: {
            title: "Tangier to Casablanca Private Transfer",
            tagline: "Comfortable City-to-City Private Highway Transfer",
            pickup: "Tangier (Hotel, Port, or Airport)",
            dropoff: "Casablanca (Hotel, Port, or CMN Airport)",
            distance: "340 km",
            duration: "3 hours 30 minutes",
            capacityText: "1 to 7 passengers with luggage in premium air-conditioned vans or sedans",
            highlights: [
                "Direct door-to-door transit between Tangier and Casablanca",
                "Travel via the modern A1 Atlantic highway safely",
                "Complimentary bottled water and stops on request",
                "Professional drivers speaking English, French, and Spanish",
                "Flight tracking included if dropoff is Casablanca CMN airport"
            ],
            aboutRoute: "Traveling between Tangier and Casablanca is quickest and most comfortable via the A1 Atlantic highway. Avoid the crowds at train stations and enjoy a private vehicle that departs exactly when you want, transporting you directly from your hotel or cruise terminal in Tangier to Casablanca.",
            faqs: [
                { q: "Can we stop in Rabat along the way?", a: "Yes, we can arrange a short stop in Rabat. Please mention this request during booking so we can schedule the trip accordingly." },
                { q: "Is the price fixed?", a: "Yes, our prices are completely fixed and include all tolls, fuel, and driver fees." }
            ],
            seoTitle: "Tangier to Casablanca Private Transfer | Mdina Tours",
            seoDesc: "Book a premium private transfer from Tangier to Casablanca. Fixed pricing, modern air-conditioned vans, and certified drivers."
        },
        fr: {
            title: "Transfert de Tanger à Casablanca",
            tagline: "Liaison Intervilles Privée Rapide par l'Autoroute",
            pickup: "Tanger (Hôtel, Port ou Aéroport)",
            dropoff: "Casablanca (Hôtel, Port ou Aéroport CMN)",
            distance: "340 km",
            duration: "3 heures 30 minutes",
            capacityText: "1 à 7 passagers avec bagages dans des berlines ou vans récents",
            highlights: [
                "Transport direct porte-à-porte entre Tanger et Casablanca",
                "Voyage sécurisé via l'autoroute de l'Atlantique A1",
                "Bouteilles d'eau offertes et arrêts à la demande",
                "Chauffeurs bilingues professionnels expérimentés",
                "Suivi de vol inclus pour les déposes à l'aéroport CMN"
            ],
            aboutRoute: "Le transfert privé par l'autoroute A1 est le moyen le plus confortable pour relier Tanger et Casablanca. Voyagez à l'heure de votre choix dans un véhicule climatisé avec chauffeur privé.",
            faqs: [
                { q: "Est-il possible de s'arrêter à Rabat ?", a: "Oui, un arrêt à Rabat est possible sur demande lors de la réservation." },
                { q: "Le tarif inclut-il les péages d'autoroute ?", a: "Oui, tous les frais d'autoroute, de carburant et de chauffeur sont inclus dans le prix." }
            ],
            seoTitle: "Transfert Privé Tanger vers Casablanca | Mdina Tours",
            seoDesc: "Service de chauffeur privé de Tanger à Casablanca. Tarif fixe garanti, véhicules confortables et accueil personnalisé."
        }
    },
    {
        slug: "tangier-to-chefchaouen-transfer",
        image: "/hero-chefchaouen.webp",
        prices: { 3: 108, 4: 132, 5: 156, 7: 216 },
        en: {
            title: "Tangier to Chefchaouen Private Transfer",
            tagline: "Direct Private Taxi to the Blue Pearl of the Rif Mountains",
            pickup: "Tangier (Hotel, Port, or Airport)",
            dropoff: "Chefchaouen (Hotel or Riad)",
            distance: "120 km",
            duration: "2 hours 15 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Fastest connection to Chefchaouen from Tangier port or airport",
                "Experienced mountain road drivers",
                "Panoramic photo stops in the Rif region",
                "Fixed rates with no hidden baggage surcharges",
                "Coordination with riads in Chefchaouen medina"
            ],
            aboutRoute: "Chefchaouen is nestled deep in the Rif Mountains. A private transfer from Tangier is the easiest way to travel, avoiding complex public bus schedules and saving hours of travel time.",
            faqs: [
                { q: "Where will the driver drop me off in Chefchaouen?", a: "Chefchaouen's medina is pedestrian-only. Your driver will drop you at the closest accessible gate (like Bab el Ain or Place Mohammed V) and coordinate with your riad staff." },
                { q: "Can we visit Tetouan on the way?", a: "Yes, we can arrange a stop to visit the UNESCO-listed medina of Tetouan. Contact us in advance for details." }
            ],
            seoTitle: "Tangier to Chefchaouen Private Transfer | Mdina Tours",
            seoDesc: "Book a private transfer from Tangier to Chefchaouen. Safe mountain drive, fixed rates, and experienced local drivers."
        },
        fr: {
            title: "Transfert de Tanger à Chefchaouen",
            tagline: "Navette Privée Directe vers la Ville Bleue du Rif",
            pickup: "Tanger (Hôtel, Port ou Aéroport)",
            dropoff: "Chefchaouen (Hôtel ou Riad)",
            distance: "120 km",
            duration: "2 heures 15 minutes",
            capacityText: "1 à 7 passagers avec bagages dans des vans récents",
            highlights: [
                "Liaison la plus rapide depuis le port ou l'aéroport de Tanger",
                "Chauffeurs habitués aux routes sinueuses du Rif",
                "Arrêts photos panoramiques en cours de route",
                "Prix fixe garanti sans frais de bagages",
                "Prise de contact directe avec votre riad à Chefchaouen"
            ],
            aboutRoute: "Chefchaouen est située dans les montagnes du Rif. Le transfert privé depuis Tanger vous évite les contraintes des transports locaux et vous assure un trajet agréable et direct.",
            faqs: [
                { q: "Où se fait la dépose à Chefchaouen ?", a: "La médina étant piétonne, votre chauffeur vous déposera à la porte d'accès la plus proche et préviendra votre riad." },
                { q: "Peut-on s'arrêter à Tétouan en chemin ?", a: "Oui, un arrêt à Tétouan est tout à fait envisageable. Veuillez l'indiquer lors de la réservation." }
            ],
            seoTitle: "Chauffeur Privé Tanger vers Chefchaouen | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Tanger à Chefchaouen. Voyage confortable et sécurisé à travers les montagnes du Rif."
        }
    },
    {
        slug: "casablanca-to-fes-transfer",
        image: "/hero-landscape-3.webp",
        prices: { 3: 216, 4: 252, 5: 288, 7: 384 },
        en: {
            title: "Casablanca to Fes Private Transfer",
            tagline: "Comfortable Expressway Transfer Between the Economic Capital and the Imperial Heritage",
            pickup: "Casablanca (Hotel, Port, or CMN Airport)",
            dropoff: "Fes (Hotel, Riad, or Airport)",
            distance: "300 km",
            duration: "3 hours 15 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Direct expressway transit connecting Casablanca to Fes",
                "Avoid busy train stations and luggage carrying",
                "Comfortable climate-controlled vans and sedans",
                "Stop at rest areas along the highway on request",
                "Door-to-door service directly to Fes Medina gates"
            ],
            aboutRoute: "A private transfer between Casablanca and Fes is the most convenient way to travel, particularly for families or groups with heavy bags. Enjoy a direct highway drive and let your driver navigate the busy city traffic.",
            faqs: [
                { q: "Can we stop in Meknes on the way?", a: "Yes, we can arrange a stop in the imperial city of Meknes or the ruins of Volubilis. Contact us to customize your route." },
                { q: "What happens if we land at Casablanca CMN airport?", a: "Your driver will meet you directly at the arrivals terminal with a name sign, monitoring your flight in real-time." }
            ],
            seoTitle: "Casablanca to Fes Private Transfer & Taxi | Mdina Tours",
            seoDesc: "Book a private transfer from Casablanca to Fes. Enjoy a reliable, door-to-door drive with flat-rate pricing and professional drivers."
        },
        fr: {
            title: "Transfert de Casablanca à Fès",
            tagline: "Navette Privée Directe entre la Métropole et la Cité Impériale",
            pickup: "Casablanca (Hôtel, Port ou Aéroport CMN)",
            dropoff: "Fès (Hôtel, Riad ou Aéroport)",
            distance: "300 km",
            duration: "3 heures 15 minutes",
            capacityText: "1 à 7 passagers avec bagages dans des vans climatisés",
            highlights: [
                "Trajet direct par l'autoroute reliant Casablanca à Fès",
                "Évitez les gares bondées et le transport des bagages",
                "Berlines et vans confortables avec climatisation",
                "Arrêts sur les aires de repos d'autoroute sur demande",
                "Service porte-à-porte jusqu'aux portes de la médina de Fès"
            ],
            aboutRoute: "Relier Casablanca et Fès en transfert privé offre un confort optimal. Voyagez sereinement par l'autoroute et laissez votre chauffeur s'occuper de votre dépose.",
            faqs: [
                { q: "Peut-on s'arrêter à Meknès en chemin ?", a: "Oui, un détour pour visiter Meknès ou Volubilis est possible sur demande." },
                { q: "Que se passe-t-il en cas d'arrivée à l'aéroport de Casablanca ?", a: "Votre chauffeur vous attendra au terminal des arrivées avec une pancarte à votre nom." }
            ],
            seoTitle: "Transfert Privé Casablanca vers Fès | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Casablanca à Fès. Voyage confortable, tarifs forfaitaires fixes et chauffeurs expérimentés."
        }
    },
    {
        slug: "rabat-to-marrakech-transfer",
        image: "/hero-landscape-1.webp",
        prices: { 3: 204, 4: 228, 5: 264, 7: 360 },
        en: {
            title: "Rabat to Marrakech Private Transfer",
            tagline: "Premium Intercity Transfer from the Capital to the Red City",
            pickup: "Rabat (Hotel, Riad, or Office)",
            dropoff: "Marrakech (Hotel, Riad, or Airport)",
            distance: "325 km",
            duration: "3 hours 15 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Direct highway drive bypassing transit stations",
                "Flexible pickup time matching your schedule",
                "Experienced drivers with highway safety certification",
                "Dropoff at Marrakech medina gates with riad coordination",
                "Modern air-conditioned vans with phone chargers"
            ],
            aboutRoute: "Connecting Rabat and Marrakech is comfortable and fast via the highway. Our private service is ideal for families, groups, or business travelers seeking convenience and reliability.",
            faqs: [
                { q: "Are highway tolls included in the price?", a: "Yes, all expressway toll fees, fuel, and driver costs are fully included." },
                { q: "Can the driver drop us directly in Marrakech medina?", a: "Your driver will drop you at the nearest accessible point and coordinate with your riad host to ensure a smooth check-in." }
            ],
            seoTitle: "Rabat to Marrakech Private Transfer | Mdina Tours",
            seoDesc: "Book a private transfer from Rabat to Marrakech. Professional drivers, modern vehicles, fixed prices, and direct door-to-door service."
        },
        fr: {
            title: "Transfert de Rabat à Marrakech",
            tagline: "Liaison Privée Premium de la Capitale à la Ville Rouge",
            pickup: "Rabat (Hôtel, Riad ou Bureau)",
            dropoff: "Marrakech (Hôtel, Riad ou Aéroport)",
            distance: "325 km",
            duration: "3 heures 15 minutes",
            capacityText: "1 à 7 passagers avec bagages dans des vans récents",
            highlights: [
                "Liaison autoroutière directe sans correspondances",
                "Heures de prise en charge flexibles selon votre planning",
                "Chauffeurs professionnels expérimentés sur autoroute",
                "Dépose aux portes de la médina coordonnée avec votre riad",
                "Vans confortables équipés de ports USB et climatisation"
            ],
            aboutRoute: "Rejoindre Marrakech depuis Rabat en transfert privé garantit un voyage fluide. Idéal pour les familles, les groupes et les voyageurs d'affaires.",
            faqs: [
                { q: "Les frais d'autoroute sont-ils inclus ?", a: "Oui, le tarif indiqué inclut tous les frais d'autoroute, de carburant et de chauffeur." },
                { q: "Le chauffeur dépose-t-il devant le riad à Marrakech ?", a: "Nous vous déposons à la porte d'accès la plus proche de la médina et contactons votre riad pour organiser l'accueil." }
            ],
            seoTitle: "Chauffeur Privé Rabat vers Marrakech | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Rabat à Marrakech. Service fiable de porte à porte, véhicules confortables et tarifs clairs."
        }
    },
    {
        slug: "rabat-to-fes-transfer",
        image: "/hero-landscape-3.webp",
        prices: { 3: 132, 4: 156, 5: 180, 7: 240 },
        en: {
            title: "Rabat to Fes Private Transfer",
            tagline: "Fast and Convenient Transfer Between Morocco's Historic Capital Cities",
            pickup: "Rabat (Hotel, Riad, or Office)",
            dropoff: "Fes (Hotel, Riad, or Airport)",
            distance: "200 km",
            duration: "2 hours 10 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Fast expressway connection between Rabat and Fes",
                "Direct hotel-to-hotel pickup and drop-off",
                "Polite local drivers who speak English and French",
                "Comfortable clean vehicles with spacious seating",
                "Free baby seats available on request"
            ],
            aboutRoute: "The highway between Rabat and Fes is a smooth drive through farming areas and olive groves. Our private transfer ensures a reliable and direct trip, avoiding busy train stations.",
            faqs: [
                { q: "Can we visit Meknes or Volubilis?", a: "Yes, we can arrange a custom itinerary including stops at Meknes or Volubilis. Please ask when booking." },
                { q: "Is the price per vehicle?", a: "Yes, all prices are per vehicle for your private group." }
            ],
            seoTitle: "Rabat to Fes Private Transfer | Mdina Tours",
            seoDesc: "Private transfer between Rabat and Fes. Fixed prices, professional drivers, and clean air-conditioned vehicles."
        },
        fr: {
            title: "Transfert de Rabat à Fès",
            tagline: "Liaison Express Confortable entre les Deux Cités Impériales",
            pickup: "Rabat (Hôtel, Riad ou Bureau)",
            dropoff: "Fès (Hôtel, Riad ou Aéroport)",
            distance: "200 km",
            duration: "2 heures 10 minutes",
            capacityText: "1 à 7 passagers avec bagages dans des vans climatisés",
            highlights: [
                "Liaison rapide par autoroute entre Rabat et Fès",
                "Prise en charge et dépose directement à votre hôtel/riad",
                "Chauffeurs bilingues courtois et discrets",
                "Véhicules propres et bien entretenus",
                "Sièges bébés disponibles gratuitement sur demande"
            ],
            aboutRoute: "Rejoindre Fès depuis Rabat par l'autoroute est un trajet agréable. Notre transfert privé vous évite la manutention de bagages dans les gares et garantit un trajet direct.",
            faqs: [
                { q: "Est-il possible de faire une halte à Meknès ?", a: "Oui, nous pouvons intégrer une visite de Meknès ou des ruines romaines de Volubilis avec un supplément." },
                { q: "Le tarif est-il par groupe ou par personne ?", a: "Tous nos prix sont calculés par véhicule pour l'ensemble de votre groupe." }
            ],
            seoTitle: "Transfert Privé Rabat vers Fès | Mdina Tours",
            seoDesc: "Réservez votre navette privée de Rabat à Fès. Chauffeurs professionnels, confort garanti et tarifs forfaitaires fixes."
        }
    },
    {
        slug: "rabat-to-chefchaouen-transfer",
        image: "/hero-chefchaouen.webp",
        prices: { 3: 180, 4: 210, 5: 240, 7: 336 },
        en: {
            title: "Rabat to Chefchaouen Private Transfer",
            tagline: "Direct Private Taxi to the Blue City in the Rif Mountains",
            pickup: "Rabat (Hotel, Riad, or Office)",
            dropoff: "Chefchaouen (Hotel or Riad)",
            distance: "250 km",
            duration: "4 hours",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Direct transfer from Rabat to the heart of Chefchaouen",
                "Comfortable mountain drive with experienced chauffeurs",
                "Stops for photographs in scenic rural regions",
                "Fixed, transparent rates with zero hidden fees",
                "Coordination with riads in Chefchaouen medina"
            ],
            aboutRoute: "A private transfer from Rabat to Chefchaouen is the easiest way to travel, avoiding long public bus rides and multiple connections.",
            faqs: [
                { q: "What is the best route?", a: "The drive passes through Kenitra and Ouazzane before ascending into the Rif Mountains. Your driver will stop for coffee or restrooms on request." },
                { q: "Where does the driver drop us off?", a: "As the medina is pedestrian-only, your driver will drop you at the nearest gate and contact your riad manager." }
            ],
            seoTitle: "Rabat to Chefchaouen Private Transfer | Mdina Tours",
            seoDesc: "Private transfer from Rabat to Chefchaouen. Safe drive, fixed pricing, and professional drivers."
        },
        fr: {
            title: "Transfert de Rabat à Chefchaouen",
            tagline: "Navette Privée Directe vers la Cité Bleue du Nord",
            pickup: "Rabat (Hôtel, Riad ou Bureau)",
            dropoff: "Chefchaouen (Hôtel ou Riad)",
            distance: "250 km",
            duration: "4 heures",
            capacityText: "1 à 7 passagers avec bagages dans des vans récents",
            highlights: [
                "Liaison directe depuis Rabat vers le centre de Chefchaouen",
                "Conduite souple sur les routes de montagne par nos chauffeurs",
                "Arrêts photos au cœur des paysages du Nord",
                "Tarifs clairs et fixes sans mauvaise surprise",
                "Contact direct avec les riads de la médina"
            ],
            aboutRoute: "Voyagez en toute simplicité de Rabat à Chefchaouen. Notre service vous évite les trajets fatigants en bus locaux et assure votre confort.",
            faqs: [
                { q: "Quel est l'itinéraire emprunté ?", a: "Le trajet traverse Kénitra et Ouazzane avant de monter dans les montagnes. Des pauses sont prévues en chemin." },
                { q: "Où se fait l'arrivée à Chefchaouen ?", a: "Le chauffeur vous dépose à l'entrée de la médina piétonne et prévient votre riad." }
            ],
            seoTitle: "Chauffeur Privé Rabat vers Chefchaouen | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Rabat à Chefchaouen. Véhicules récents et confortables avec chauffeurs expérimentés."
        }
    },
    {
        slug: "marrakech-to-agadir-transfer",
        image: "/img2/agadir-marina.webp",
        prices: { 3: 156, 4: 180, 5: 210, 7: 288 },
        en: {
            title: "Marrakech to Agadir Highway Transfer",
            tagline: "Premium Private Highway Transfer from the Imperial City to the Beach Resort",
            pickup: "Marrakech (Hotel or Airport)",
            dropoff: "Agadir (Hotel, Marina, or Airport)",
            distance: "250 km",
            duration: "3 hours",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Fast expressway transfer connecting Marrakech to Agadir",
                "Travel via the High Atlas highway safely",
                "Experienced drivers with local highway certification",
                "Dropoff directly at your Agadir hotel, resort, or beach club",
                "Modern air-conditioned vans with phone chargers"
            ],
            aboutRoute: "Connecting Marrakech and the coastal resort city of Agadir is quickest via the modern A7 highway. Enjoy a direct, stress-free transfer.",
            faqs: [
                { q: "Do you offer pickups from Marrakech RAK airport?", a: "Yes, we monitor your flight and pick you up directly from RAK airport to Agadir." },
                { q: "Is the price inclusive of highway tolls?", a: "Yes, all toll fees, fuel, and driver costs are fully included." }
            ],
            seoTitle: "Marrakech to Agadir Private Transfer | Mdina Tours",
            seoDesc: "Book a private transfer from Marrakech to Agadir. Modern air-conditioned vans, fixed pricing, and professional drivers."
        },
        fr: {
            title: "Transfert de Marrakech à Agadir",
            tagline: "Liaison Autoroutière Rapide entre la Cité Ocre et la Station Balnéaire",
            pickup: "Marrakech (Hôtel ou Aéroport)",
            dropoff: "Agadir (Hôtel, Marina ou Aéroport)",
            distance: "250 km",
            duration: "3 heures",
            capacityText: "1 à 7 passagers avec bagages dans des vans récents",
            highlights: [
                "Liaison rapide par l'autoroute A7 reliant Marrakech à Agadir",
                "Traversée confortable du Haut Atlas en toute sécurité",
                "Chauffeurs professionnels qualifiés sur autoroute",
                "Dépose directement à votre hôtel, plage ou port d'Agadir",
                "Vans climatisés avec prises USB et grand coffre"
            ],
            aboutRoute: "Le transfert privé par l'autoroute A7 est le moyen le plus simple et rapide de relier Marrakech et Agadir. Profitez d'un trajet sans stress.",
            faqs: [
                { q: "Proposez-vous le départ de l'aéroport de Marrakech ?", a: "Oui, nous organisons les transferts directs depuis l'aéroport RAK vers Agadir." },
                { q: "Le tarif comprend-il le péage ?", a: "Oui, le tarif est fixe et comprend les péages, le carburant et les bagages." }
            ],
            seoTitle: "Transfert Privé Marrakech vers Agadir | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Marrakech à Agadir. Service de chauffeur fiable, vans confortables et tarifs fixes transparents."
        }
    },
    {
        slug: "fes-to-merzouga-transfer",
        image: "/hero-sahara.webp",
        prices: { 3: 312, 4: 360, 5: 420, 7: 540 },
        en: {
            title: "Fes to Merzouga Private Transfer",
            tagline: "Scenic Sahara Desert Long-Distance Transfer Crossing the Middle Atlas Mountains",
            pickup: "Fes (Hotel, Riad, or Airport)",
            dropoff: "Merzouga (Hotel, Desert Camp, or Dunes Gate)",
            distance: "460 km",
            duration: "7 hours 30 minutes",
            capacityText: "1 to 7 passengers with experienced long-distance drivers",
            highlights: [
                "Drive through the Middle Atlas cedar forests and Ifrane",
                "Scenic views of the Ziz Valley palm groves and gorges",
                "Experienced drivers trained for long-distance mountain driving",
                "Drop-off directly at your Merzouga hotel or desert camp meeting point",
                "Clean air-conditioned 4x4 or spacious van"
            ],
            aboutRoute: "The route from Fes to the desert dunes of Merzouga is one of Morocco's most beautiful drives. A private transfer is the best way to travel, offering flexibility to stop for photos, food, and views.",
            faqs: [
                { q: "Where does the driver drop us in Merzouga?", a: "Your driver will drop you at your hotel in Merzouga or coordinate directly with your desert camp hosts at the edge of the dunes." },
                { q: "Can we see the monkeys in the cedar forest?", a: "Yes! The route passes through the cedar forest near Azrou. If you wish, the driver will stop to let you see the wild Barbary macaques." }
            ],
            seoTitle: "Fes to Merzouga Private Transfer | Mdina Tours",
            seoDesc: "Private transfer from Fes to Merzouga desert. Travel comfortably in a 4x4 or van with photo stops in Ziz Valley and cedar forest."
        },
        fr: {
            title: "Transfert de Fès à Merzouga",
            tagline: "Liaison Longue Distance vers le Désert du Sahara via le Moyen Atlas",
            pickup: "Fès (Hôtel, Riad ou Aéroport)",
            dropoff: "Merzouga (Hôtel, Campement ou Portes du Désert)",
            distance: "460 km",
            duration: "7 heures 30 minutes",
            capacityText: "1 à 7 passagers dans des véhicules 4x4 ou vans spacieux",
            highlights: [
                "Traversée des forêts de cèdres d'Ifrane et d'Azrou",
                "Vues panoramiques sur la vallée du Ziz et ses palmeraies",
                "Chauffeurs expérimentés formés aux longs trajets",
                "Dépose à votre hôtel à Merzouga ou au point de rendez-vous de votre camp",
                "Véhicule 4x4 climatisé ou grand van confortable"
            ],
            aboutRoute: "La route Fès-Merzouga est spectaculaire. Le transfert privé vous offre la flexibilité nécessaire pour faire des pauses déjeuner et photos à votre rythme.",
            faqs: [
                { q: "Où se fait l'arrivée à Merzouga ?", a: "Le chauffeur vous dépose à votre hôtel ou au point de rencontre de vos guides du désert." },
                { q: "Peut-on s'arrêter voir les singes dans la forêt ?", a: "Oui, la route passe par la forêt d'Azrou où vous pourrez observer les macaques de Barbarie." }
            ],
            seoTitle: "Chauffeur Privé Fès vers Merzouga Désert | Mdina Tours",
            seoDesc: "Réservez votre transfert de Fès à Merzouga. Voyage sécurisé en 4x4 ou van, avec arrêts photos et repas."
        }
    },
    {
        slug: "marrakech-airport-transfer",
        image: "/hero-marrakech.webp",
        prices: { 3: 30, 4: 36, 5: 42, 7: 60 },
        en: {
            title: "Marrakech Menara Airport Private Transfer",
            tagline: "Direct and Comfortable Taxi from Marrakech RAK Airport to your Medina Riad",
            pickup: "Marrakech Menara International Airport (RAK)",
            dropoff: "Any Hotel or Riad in Marrakech City",
            distance: "10 km",
            duration: "20 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "24/7 flight monitoring – driver waits even if your flight is delayed",
                "Meet & Greet with a name sign at the arrivals terminal",
                "Fixed prices with no night-time premiums or extra fees",
                "Drop-off at the closest medina gate with riad staff coordination",
                "Clean, non-smoking, air-conditioned vans"
            ],
            aboutRoute: "Marrakech Menara Airport (RAK) is close to the city center, but local airport taxi drivers are known for difficult price negotiations. Our private transfer ensures a stress-free transition at a flat rate.",
            faqs: [
                { q: "Can the driver drop me at my Medina Riad?", a: "Marrakech's historic medina has narrow pedestrian streets. Your driver will drop you at the closest accessible gate and coordinate with your riad host to meet you." },
                { q: "Is the price per person or per vehicle?", a: "All prices are flat rates per vehicle for your private group." }
            ],
            seoTitle: "Marrakech Airport Transfer & Private Taxi RAK | Mdina Tours",
            seoDesc: "Book a private airport transfer from Marrakech Menara Airport (RAK) to your hotel or Riad. Fixed rates, free child seats, 24/7 flight tracking."
        },
        fr: {
            title: "Transfert Aéroport de Marrakech-Ménara",
            tagline: "Navette Aéroport RAK Rapide et Fiable vers votre Hôtel ou Riad",
            pickup: "Aéroport International Marrakech Ménara (RAK)",
            dropoff: "Tout Riad ou Hôtel à Marrakech",
            distance: "10 km",
            duration: "20 minutes",
            capacityText: "1 à 7 passagers avec bagages inclus",
            highlights: [
                "Suivi des vols en direct – le chauffeur s'adapte à tout retard",
                "Accueil personnalisé avec pancarte nominative à la sortie",
                "Tarif fixe garanti sans frais de bagages ou supplément nuit",
                "Dépose à la porte de la médina coordonnée avec votre riad",
                "Vans climatisés propres et confortables"
            ],
            aboutRoute: "L'aéroport de Marrakech (RAK) est proche mais négocier un taxi local peut s'avérer stressant. Notre navette privée vous garantit un accueil sans attente et un tarif fixe transparent.",
            faqs: [
                { q: "Le chauffeur peut-il me déposer devant mon riad ?", a: "La médina étant interdite aux voitures, nous vous déposons au point d'accès le plus proche et prévenons le personnel de votre riad." },
                { q: "Le prix comprend-il le suivi des vols ?", a: "Oui, notre équipe vérifie l'heure de votre vol pour assurer la présence du chauffeur sans frais supplémentaires." }
            ],
            seoTitle: "Transfert Aéroport Marrakech RAK Privé | Mdina Tours",
            seoDesc: "Réservez votre transfert privé depuis l'Aéroport de Marrakech (RAK) vers votre riad ou hôtel. Chauffeurs professionnels et tarifs fixes."
        }
    },
    {
        slug: "fes-airport-transfer",
        image: "/img2/fes-airport.jpeg",
        prices: { 3: 30, 4: 36, 5: 42, 7: 60 },
        en: {
            title: "Fes-Saïss Airport Private Transfer",
            tagline: "Stress-Free Private Transfer from FEZ Airport to your Fes Medina Riad",
            pickup: "Fes-Saïss International Airport (FEZ)",
            dropoff: "Any Hotel or Riad in Fes City",
            distance: "15 km",
            duration: "25 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Meet & Greet service with a name sign at the arrivals hall",
                "Flight-tracked arrival – no waiting times or delay fees",
                "Fixed rates with no hidden baggage charges",
                "Drop-off at the closest medina gate with riad staff coordination",
                "Comfortable clean vans with professional bilingual drivers"
            ],
            aboutRoute: "Fes-Saïss Airport (FEZ) is located south of the city. Negotiating local taxis can be challenging, especially for riads deep in the medina. Our private transfer ensures a reliable and direct trip.",
            faqs: [
                { q: "Where will the driver meet me?", a: "Your driver will be waiting in the main arrivals hall, holding a sign with your name and our company logo." },
                { q: "What if my Riad is inside the medina?", a: "Fes el-Bali is the world's largest car-free urban area. Your driver will drop you at the nearest gate and coordinate with your riad staff to guide you." }
            ],
            seoTitle: "Fes Airport Transfer & Private Taxi FEZ | Mdina Tours",
            seoDesc: "Book a private airport transfer from Fes-Saïss Airport (FEZ) to your hotel or Riad. Fixed rates, 24/7 flight tracking, professional drivers."
        },
        fr: {
            title: "Transfert Aéroport de Fès-Saïss",
            tagline: "Navette Privée Directe de l'Aéroport FEZ vers votre Riad",
            pickup: "Aéroport International Fès-Saïss (FEZ)",
            dropoff: "Tout Riad ou Hôtel à Fès",
            distance: "15 km",
            duration: "25 minutes",
            capacityText: "1 à 7 passagers avec bagages inclus",
            highlights: [
                "Accueil avec panneau nominatif dans le hall d'arrivée",
                "Suivi des vols – chauffeur s'adaptant à l'heure d'atterrissage",
                "Tarifs clairs et fixes sans mauvaise surprise de bagages",
                "Dépose à la porte de la médina coordonnée avec votre riad",
                "Vans climatisés spacieux conduits par des professionnels"
            ],
            aboutRoute: "L'aéroport de Fès-Saïss (FEZ) est situé à 15 km de la médina. Évitez les négociations avec les grands taxis et commencez votre séjour sereinement grâce à notre navette privée.",
            faqs: [
                { q: "Comment se fait l'arrivée dans la médina piétonne ?", a: "Le chauffeur vous dépose à la porte la plus proche (ex: Bab Boujloud, Bab R'cif) et prévient votre riad." },
                { q: "Le tarif est-il plus cher la nuit ?", a: "Non, nos tarifs sont fixes 24h/24 et ne changent pas pour les arrivées tardives." }
            ],
            seoTitle: "Transfert Aéroport Fès Saïss FEZ Privé | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de l'Aéroport de Fès-Saïss (FEZ) vers votre hôtel ou Riad. Accueil VIP, tarif fixe garanti et chauffeur bilingue."
        }
    },
    {
        slug: "agadir-airport-transfer",
        image: "/img2/agadir-airport.webp",
        prices: { 3: 36, 4: 42, 5: 54, 7: 72 },
        en: {
            title: "Agadir Al Massira Airport Private Transfer",
            tagline: "Reliable and Comfortable Taxi from Agadir AGA Airport to your Beach Resort",
            pickup: "Agadir Al Massira International Airport (AGA)",
            dropoff: "Agadir City, Marina, Taghazout, or Hotels",
            distance: "25 km",
            duration: "35 minutes",
            capacityText: "1 to 7 passengers with luggage in modern, air-conditioned vehicles",
            highlights: [
                "Flight tracking included – driver stands by when you land",
                "Meet & Greet with a nameboard at the terminal exit",
                "Fixed rates with no night-time premiums or extra fees",
                "Direct door-to-door transit to Taghazout surf camps or hotels",
                "Spacious vans with room for surfboards"
            ],
            aboutRoute: "Agadir Al Massira Airport (AGA) is located east of the city. A private transfer is the most comfortable way to reach your hotel or Taghazout beach resort directly.",
            faqs: [
                { q: "Do you transfer from Agadir Airport to Taghazout?", a: "Yes, we offer direct airport transfers to Taghazout, Imsouane, and Mirleft. Select your destination in our checkout." },
                { q: "Can we carry surfboards?", a: "Yes, our vans have spacious luggage compartments and roof racks on request. Please let us know." }
            ],
            seoTitle: "Agadir Airport Transfer & Private Taxi AGA | Mdina Tours",
            seoDesc: "Book a private airport transfer from Agadir Airport (AGA) to your hotel, Marina, or Taghazout. Fixed rates, free child seats, 24/7 flight tracking."
        },
        fr: {
            title: "Transfert Aéroport d'Agadir Al Massira",
            tagline: "Navette Aéroport Directe vers votre Hôtel ou Taghazout",
            pickup: "Aéroport International Agadir Al Massira (AGA)",
            dropoff: "Agadir Centre, Marina, Hôtels ou Taghazout",
            distance: "25 km",
            duration: "35 minutes",
            capacityText: "1 à 7 passagers avec bagages et surfs",
            highlights: [
                "Suivi des vols en direct – chauffeur présent dès votre atterrissage",
                "Accueil personnalisé avec panneau nominatif dans le hall",
                "Tarifs forfaitaires sans frais de bagages supplémentaires",
                "Navette directe vers votre hôtel d'Agadir ou surf camp de Taghazout",
                "Vans spacieux avec galeries sur demande pour les planches de surf"
            ],
            aboutRoute: "L'aéroport d'Agadir (AGA) est éloigné de la zone hôtelière. Notre transfert privé vous garantit un trajet direct, rapide et sans surprises tarifaires.",
            faqs: [
                { q: "Proposez-vous le trajet de l'aéroport vers Taghazout ?", a: "Oui, nous desservons Taghazout, Imsouane et tous les spots de surf environnants." },
                { q: "Les planches de surf sont-elles autorisées ?", a: "Oui, nos vans peuvent accueillir vos équipements de surf. Mentionnez-le à la réservation." }
            ],
            seoTitle: "Transfert Aéroport Agadir AGA Privé | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de l'Aéroport d'Agadir (AGA) vers votre hôtel ou Taghazout. Prix fixes clairs, véhicules spacieux."
        }
    }
];


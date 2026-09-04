// Programmatic SEO Content Engine for Mdina Tours
// Generates search-optimized, rich travel guides (1500+ words) dynamically.

export interface ProgrammaticFAQ {
    q: string;
    a: string;
}

export interface ProgrammaticPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    seoTitle: string;
    seoDesc: string;
    tableOfContents: { id: string; text: string }[];
    sections: {
        id: string;
        title: string;
        content: string;
        table?: { headers: string[]; rows: string[][] };
        list?: string[];
        isCallToAction?: boolean;
        ctaType?: 'driver' | 'transfer' | 'general' | 'internal';
        ctaLink?: string;
        ctaText?: string;
    }[];
    faqs: ProgrammaticFAQ[];
    relatedSlugs: string[];
}

export type ProgrammaticSection = ProgrammaticPost['sections'][number];

export const programmaticSlugs = [
    // 12 Route Travel Guides
    "how-to-get-from-tangier-to-rabat", "how-to-get-from-tangier-to-casablanca", "how-to-get-from-tangier-to-chefchaouen",
    "how-to-get-from-casablanca-to-marrakech", "how-to-get-from-casablanca-to-fes", "how-to-get-from-rabat-to-marrakech",
    "how-to-get-from-rabat-to-fes", "how-to-get-from-rabat-to-chefchaouen", "how-to-get-from-marrakech-to-essaouira",
    "how-to-get-from-marrakech-to-agadir", "how-to-get-from-fes-to-chefchaouen", "how-to-get-from-fes-to-merzouga",

    // 12 Route Comparisons
    "train-vs-private-transfer-tangier-to-rabat", "train-vs-private-transfer-tangier-to-casablanca", "train-vs-private-transfer-tangier-to-chefchaouen",
    "train-vs-private-transfer-casablanca-to-marrakech", "train-vs-private-transfer-casablanca-to-fes", "train-vs-private-transfer-rabat-to-marrakech",
    "train-vs-private-transfer-rabat-to-fes", "train-vs-private-transfer-rabat-to-chefchaouen", "train-vs-private-transfer-marrakech-to-essaouira",
    "train-vs-private-transfer-marrakech-to-agadir", "train-vs-private-transfer-fes-to-chefchaouen", "train-vs-private-transfer-fes-to-merzouga",

    // 6 Airport Guides
    "casablanca-airport-transfer-guide", "rabat-airport-transfer-guide", "tangier-airport-transfer-guide",
    "marrakech-airport-transfer-guide", "fes-airport-transfer-guide", "agadir-airport-transfer-guide",

    // 7 Private Driver Pages
    "hire-a-driver-in-morocco", "private-chauffeur-morocco", "luxury-driver-morocco",
    "english-speaking-driver-morocco", "driver-guide-morocco", "driver-for-morocco-itinerary", "driver-for-sahara-desert-tour",

    // 5 Itineraries
    "morocco-itinerary-3-days", "morocco-itinerary-5-days", "morocco-itinerary-7-days", "morocco-itinerary-10-days", "morocco-itinerary-14-days",

    // 8 City Guides
    "rabat-travel-guide", "casablanca-travel-guide", "tangier-travel-guide", "chefchaouen-travel-guide",
    "marrakech-travel-guide", "fes-travel-guide", "merzouga-travel-guide", "agadir-travel-guide",

    // 4 Cruise Excursion Pages
    "tangier-shore-excursions", "casablanca-shore-excursions",
    "best-day-trips-from-tangier-port", "best-day-trips-from-casablanca-port",

    // 8 Day Trips Guides
    "best-day-trips-from-marrakech"
];

const citiesData: Record<string, { en: string; fr: string; attractionsEn: string[]; attractionsFr: string[] }> = {
    tangier: { en: "Tangier", fr: "Tanger", attractionsEn: ["Caves of Hercules", "The old Kasbah", "Cap Spartel"], attractionsFr: ["Grottes d'Hercule", "Kasbah", "Cap Spartel"] },
    rabat: { en: "Rabat", fr: "Rabat", attractionsEn: ["Hassan Tower", "Kasbah of the Udayas", "Chellah"], attractionsFr: ["Tour Hassan", "Oudayas", "Chellah"] },
    casablanca: { en: "Casablanca", fr: "Casablanca", attractionsEn: ["Hassan II Mosque", "Habous", "The Corniche"], attractionsFr: ["Mosquée Hassan II", "Habous", "La Corniche"] },
    chefchaouen: { en: "Chefchaouen", fr: "Chefchaouen", attractionsEn: ["Outa el-Hammam", "Spanish Mosque", "Blue Alleys"], attractionsFr: ["Outa el-Hammam", "Mosquée Espagnole", "Ruelles Bleues"] },
    marrakech: { en: "Marrakech", fr: "Marrakech", attractionsEn: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace"], attractionsFr: ["Place Jemaa el-Fna", "Jardin Majorelle", "Palais Bahia"] },
    fes: { en: "Fes", fr: "Fès", attractionsEn: ["Chouara Tannery", "Al-Qarawiyyin", "Bab Boujloud"], attractionsFr: ["Tannerie Chouara", "Al-Qarawiyyin", "Bab Boujloud"] },
    merzouga: { en: "Merzouga", fr: "Merzouga", attractionsEn: ["Erg Chebbi Dunes", "Khamlia Village", "Desert Camps"], attractionsFr: ["Dunes Erg Chebbi", "Khamlia", "Bivouacs"] },
    agadir: { en: "Agadir", fr: "Agadir", attractionsEn: ["Agadir Ouefla", "Agadir Marina", "Taghazout beach"], attractionsFr: ["Kasbah Ouefla", "Marina", "Plage Taghazout"] }
};

const routesData: Record<string, { distance: string; duration: string; privatePrice: number; train: boolean }> = {
    "tangier-to-rabat": { distance: "250 km", duration: "2h 45m", privatePrice: 150, train: true },
    "tangier-to-casablanca": { distance: "340 km", duration: "3h 30m", privatePrice: 200, train: true },
    "tangier-to-chefchaouen": { distance: "120 km", duration: "2h 15m", privatePrice: 90, train: false },
    "casablanca-to-marrakech": { distance: "240 km", duration: "2h 30m", privatePrice: 160, train: true },
    "casablanca-to-fes": { distance: "300 km", duration: "3h 15m", privatePrice: 180, train: true },
    "rabat-to-marrakech": { distance: "325 km", duration: "3h 15m", privatePrice: 170, train: true },
    "rabat-to-fes": { distance: "200 km", duration: "2h 10m", privatePrice: 110, train: true },
    "rabat-to-chefchaouen": { distance: "250 km", duration: "4h 00m", privatePrice: 150, train: false },
    "marrakech-to-essaouira": { distance: "180 km", duration: "2h 45m", privatePrice: 90, train: false },
    "marrakech-to-agadir": { distance: "250 km", duration: "3h 00m", privatePrice: 130, train: false },
    "fes-to-chefchaouen": { distance: "200 km", duration: "3h 30m", privatePrice: 120, train: false },
    "fes-to-merzouga": { distance: "460 km", duration: "7h 30m", privatePrice: 260, train: false }
};

export function getProgrammaticPost(slug: string, lang: string): ProgrammaticPost | null {
    const isEn = lang === 'en';
    
    // 1. ROUTE GUIDES: "how-to-get-from-[c1]-to-[c2]"
    if (slug.startsWith("how-to-get-from-")) {
        const key = slug.replace("how-to-get-from-", "");
        const route = routesData[key];
        if (!route) return null;
        const [c1k, c2k] = key.split("-to-");
        const c1 = citiesData[c1k];
        const c2 = citiesData[c2k];
        if (!c1 || !c2) return null;

        const name1 = isEn ? c1.en : c1.fr;
        const name2 = isEn ? c2.en : c2.fr;

        const title = isEn 
            ? `How to Get From ${name1} to ${name2}: Private Transfer, Train & Bus`
            : `Comment se rendre de ${name1} à ${name2} : Transfert, Train et Bus`;
        
        const excerpt = isEn
            ? `The ultimate travel guide on traveling between ${name1} and ${name2}. Compare private drivers, high-speed rail, highway buses, and sightseeing stops.`
            : `Le guide de voyage complet pour relier ${name1} à ${name2}. Comparez chauffeurs privés, train ONCF, autocars CTM et haltes touristiques.`;

        const sections: ProgrammaticSection[] = [
            {
                id: "overview",
                title: isEn ? "Route Overview & Distance" : "Aperçu de la route et distance",
                content: isEn 
                    ? `<p>Traveling from <strong>${name1}</strong> to <strong>${name2}</strong> is a highly popular route in Morocco. The physical highway distance is approximately <strong>${route.distance}</strong>, and driving takes around <strong>${route.duration}</strong> under normal traffic. Below is a comprehensive comparison of transport options including private transfers, public trains, and highway buses to help you choose the best option for your itinerary.</p>`
                    : `<p>Le trajet entre <strong>${name1}</strong> et <strong>${name2}</strong> est un axe important du transport marocain. La distance est d'environ <strong>${route.distance}</strong>, pour un temps de trajet estimé à <strong>${route.duration}</strong> par l'autoroute. Découvrez notre comparatif complet pour voyager dans les meilleures conditions.</p>`
            },
            {
                id: "comparison",
                title: isEn ? "Quick Transport Comparison" : "Comparatif rapide des modes de transport",
                content: isEn 
                    ? `<p>Here is a breakdown of speed, cost, and comfort for different travel options from ${name1} to ${name2}:</p>`
                    : `<p>Voici un résumé des tarifs, de la durée et du confort pour vous déplacer de ${name1} à ${name2} :</p>`,
                table: {
                    headers: isEn 
                        ? ["Option", "Duration", "Cost Estimate", "Flexibility", "Best For"]
                        : ["Option", "Durée", "Estimation Tarif", "Flexibilité", "Idéal pour"],
                    rows: [
                        [
                            isEn ? "Private Transfer" : "Transfert Privé",
                            route.duration,
                            `€${route.privatePrice} - €${Math.round(route.privatePrice * 1.5)}`,
                            isEn ? "Maximum (Door-to-door, any time)" : "Maximale (Porte-à-porte, horaire libre)",
                            isEn ? "Groups, families, business, stopovers" : "Groupes, familles, valises, confort"
                        ],
                        [
                            isEn ? "ONCF Train" : "Train ONCF",
                            route.train ? (isEn ? "Fast (TGV / Express)" : "Rapide (TGV / Ligne)") : "N/A",
                            route.train ? "€12 - €35" : "N/A",
                            isEn ? "Medium (Fixed timetables)" : "Moyenne (Horaires fixes)",
                            isEn ? "Solo travelers, light luggage" : "Voyageurs solos, petits bagages"
                        ],
                        [
                            isEn ? "Highway Bus (CTM)" : "Autocar (CTM)",
                            isEn ? "Slower (+1-2 hours)" : "Plus long (+1-2h)",
                            "€10 - €20",
                            isEn ? "Low (Fixed terminals)" : "Faible (Gares routières)",
                            isEn ? "Budget-conscious travelers" : "Voyageurs à budget limité"
                        ]
                    ]
                }
            },
            {
                id: "private-transfer",
                title: isEn ? "Option 1: Private Transfer (Recommended for Comfort & Groups)" : "Option 1 : Le Transfert Privé (Recommandé pour le confort)",
                content: isEn
                    ? `<p>Booking a private transfer with <strong>Mdina Tours</strong> is the most comfortable and flexible way to get from ${name1} to ${name2}. Instead of carrying luggage through busy train stations or waiting in taxi queues, a professional chauffeur picks you up directly from your hotel, riad, or airport terminal in ${name1} and drives you door-to-door to your destination in ${name2}.</p>
                       <p>Our flat-rate pricing covers the entire vehicle, fuel, highway tolls, and baggage support, making it highly cost-effective for families and travel groups. Standard rates start from €${route.privatePrice}.</p>`
                    : `<p>Réserver un chauffeur privé avec <strong>Mdina Tours</strong> est la solution la plus simple et sereine pour relier ${name1} et ${name2}. Un chauffeur professionnel vous accueille devant votre hôtel ou à la sortie de votre terminal à ${name1} et vous conduit directement devant votre riad à ${name2}.</p>
                       <p>Nos prix sont fixés à l'avance par véhicule et comprennent le carburant, les péages et les bagages. Tarifs à partir de ${route.privatePrice}€.</p>`,
                list: isEn
                    ? [
                        "Complete door-to-door service without city taxi changes",
                        "24/7 flexibility: depart at whatever hour fits your plan",
                        "Modern air-conditioned vans and executive sedans",
                        "English and French speaking drivers offering local context",
                        "Free baby seats and child booster seats on demand"
                      ]
                    : [
                        "Service complet porte-à-porte évitant les correspondances",
                        "Flexibilité totale : vous déterminez l'heure de départ",
                        "Véhicules récents et climatisés (berlines et monospaces)",
                        "Chauffeurs professionnels bilingues accueillants",
                        "Sièges enfants et bébés fournis gratuitement sur demande"
                      ]
            },
            {
                id: "train-alternative",
                title: isEn ? "Option 2: Travelling by Train" : "Option 2 : Voyager en train",
                content: route.train
                    ? (isEn 
                        ? `<p>ONCF trains represent a highly popular transport option for this route. High-speed TGV rail services ('Al Boraq') offer fast transit between Tangier, Rabat, and Casablanca. Tickets can be booked online or at the station, though they require local taxis to transport you between the train stations and your accommodation.</p>`
                        : `<p>Les trains de l'ONCF constituent une option prisée sur cet axe. Le TGV 'Al Boraq' relie rapidement Tanger, Rabat et Casablanca. Les réservations peuvent être effectuées en ligne ou en gare, mais nécessitent de prendre des petits taxis locaux pour rejoindre vos hôtels.</p>`)
                    : (isEn
                        ? `<p>Please note that there is no train route connecting ${name1} and ${name2} directly. The mountainous geography or regional rail limits require tourists to choose highway buses, collective grand taxis, or private chauffeur services.</p>`
                        : `<p>Notez qu'il n'existe pas de liaison ferroviaire directe reliant ${name1} et ${name2}. Les contraintes géographiques ou le réseau ferroviaire imposent de choisir entre les bus, les grands taxis ou un service de chauffeur privé.</p>`)
            },
            {
                id: "cta",
                title: isEn ? "Book Your Private Transfer Today" : "Réservez votre transfert privé",
                content: isEn
                    ? `<p>Ready to secure your ride from ${name1} to ${name2}? Skip the hassle and reserve a modern vehicle with a professional driver. No deposit is required – book on WhatsApp and pay your driver directly upon completion.</p>`
                    : `<p>Prêt à réserver votre trajet de ${name1} à ${name2} ? Évitez le stress et réservez un van ou une berline avec chauffeur privé. Aucun prépaiement n'est requis – payez directement à l'arrivée.</p>`,
                isCallToAction: true,
                ctaType: 'transfer',
                ctaLink: `/transfers/${key}-transfer`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Travel Guides" : "Guides de Voyage",
            date: "June 14, 2026",
            image: key.includes("merzouga") ? "/b-roll/activity-sahara-camel-riding-broll.webp" : key.includes("chefchaouen") ? "/hero-chefchaouen.webp" : key.includes("essaouira") ? "/img/Essaouira.webp" : key.includes("agadir") ? "/img2/agadir-marina.jpg" : key.includes("rabat") ? "/img2/rabat-hassan-tour.jpg" : key.includes("casablanca") ? "/img2/casablanca_MOSQUE.webp" : key.includes("fes") ? "/img2/fes_gate.jpg" : "/img/Morocco-trip-tour-hero08.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? `How long does it take to drive from ${name1} to ${name2}?` : `Combien de temps faut-il pour aller de ${name1} à ${name2} en voiture ?`,
                    a: isEn 
                        ? `The driving duration is approximately ${route.duration} via the highway, depending on your pickup location and traffic entering the cities.`
                        : `Le trajet par la route prend environ ${route.duration} via l'autoroute, selon votre lieu de départ exact et le trafic.`
                },
                {
                    q: isEn ? `Is there a direct train from ${name1} to ${name2}?` : `Y a-t-il un train direct reliant ${name1} et ${name2} ?`,
                    a: route.train 
                        ? (isEn ? `Yes, direct train connections are available. You can purchase tickets at the station or via the ONCF portal.` : `Oui, il existe une ligne directe de train. Vous pouvez acheter vos billets en gare ou sur le site de l'ONCF.`)
                        : (isEn ? `No, there are no direct train routes between these cities. You must rely on highway buses, collective grand taxis, or book a private transfer.` : `Non, il n'y a pas de liaison ferroviaire directe. Il faut utiliser la route, le bus, ou un chauffeur privé.`)
                }
            ],
            relatedSlugs: [`train-vs-private-transfer-${key}`, `${c1k}-travel-guide`, `${c2k}-travel-guide`]
        };
    }

    // 2. ROUTE COMPARISONS: "train-vs-private-transfer-[c1]-to-[c2]"
    if (slug.startsWith("train-vs-private-transfer-")) {
        const key = slug.replace("train-vs-private-transfer-", "");
        const route = routesData[key];
        if (!route) return null;
        const [c1k, c2k] = key.split("-to-");
        const c1 = citiesData[c1k];
        const c2 = citiesData[c2k];
        if (!c1 || !c2) return null;

        const name1 = isEn ? c1.en : c1.fr;
        const name2 = isEn ? c2.en : c2.fr;

        const title = isEn 
            ? `Train vs Private Transfer from ${name1} to ${name2}: The Honest Verdict`
            : `Train ou Chauffeur Privé de ${name1} à ${name2} : Le Comparatif`;
        
        const excerpt = isEn
            ? `An in-depth comparison of the train and private car transfers between ${name1} and ${name2}. We compare cost, comfort, and schedules.`
            : `Comparatif détaillé entre le train de l'ONCF et un chauffeur privé entre ${name1} et ${name2}. Confort, tarifs, horaires et bagages.`;

        const sections: ProgrammaticSection[] = [
            {
                id: "introduction",
                title: isEn ? "Overview: Train vs Private Driver" : "Présentation : Train ou Chauffeur Privé",
                content: isEn
                    ? `<p>Choosing how to travel between <strong>${name1}</strong> and <strong>${name2}</strong> depends on your budget, travel group size, and preferred schedule flexibility. While Morocco's rail network is efficient, it operates on fixed timetables and terminates at central stations, which requires additional urban transit. Our private transfers provide a door-to-door option, starting from €${route.privatePrice}.</p>`
                    : `<p>Pour voyager confortablement de <strong>${name1}</strong> à <strong>${name2}</strong>, deux options principales s'offrent à vous : le train et le transfert privé avec chauffeur. Cet article détaille les avantages de chaque moyen de transport pour votre itinéraire.</p>`
            },
            {
                id: "ratings",
                title: isEn ? "Factor Rating Comparison" : "Comparatif par critères",
                content: isEn
                    ? `<p>Here is an honest score out of 5 stars comparing both options for the ${name1} to ${name2} route:</p>`
                    : `<p>Voici notre notation sur 5 étoiles pour les deux modes de transport sur cet axe :</p>`,
                table: {
                    headers: ["Criteria / Critère", isEn ? "ONCF Train" : "Train ONCF", isEn ? "Private Transfer" : "Transfert Privé"],
                    rows: [
                        [isEn ? "Cost (Solo Traveler)" : "Coût (Voyageur Solo)", "★★★★★", "★★★☆☆"],
                        [isEn ? "Cost (Families/Groups)" : "Coût (Familles/Groupes)", "★★★☆☆", "★★★★★"],
                        [isEn ? "Comfort & Convenience" : "Confort & Commodité", "★★★☆☆", "★★★★★"],
                        [isEn ? "Luggage Ease" : "Facilité Bagages", "★★☆☆•", "★★★★★"],
                        [isEn ? "Flexibility & Stops" : "Flexibilité & Halte", "★☆☆☆☆", "★★★★★"],
                        [isEn ? "Door-to-Door Speed" : "Vitesse Porte-à-Porte", "★★★☆☆", "★★★★★"]
                    ]
                }
            },
            {
                id: "cost-breakdown",
                title: isEn ? "The Cost Comparison: When is a Driver Cheaper?" : "Le budget : Dans quels cas le chauffeur est-il plus économique ?",
                content: isEn
                    ? `<p>At first glance, a train ticket costing €10-€25 per person is cheaper than a private vehicle starting from €${route.privatePrice}. However, if you are traveling as a family of 4 or a group of 5, the math changes. Four train tickets plus the cost of local petits taxis on both sides (e.g. from airport to station, then station to riad) can quickly equal or exceed the cost of a private transfer van. With Mdina Tours, you pay one flat rate for the entire vehicle, regardless of passenger count.</p>`
                    : `<p>Le budget de transport individuel en train est modéré, mais pour les groupes de 3 à 7 personnes, le transfert privé est vite amorti. En additionnant les billets de train et les taxis indispensables aux transferts gares-hôtels pour chaque membre, le coût du chauffeur privé Mdina Tours est très similaire, le stress en moins.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Book Your Private Driver" : "Réservez Votre Chauffeur Privé",
                content: isEn
                    ? `<p>Skip the train queues and heavy bags. Book a private transfer between ${name1} and ${name2} with Mdina Tours today.</p>`
                    : `<p>Évitez l'attente en gare et les valises à porter. Réservez votre navette privée entre ${name1} et ${name2} avec Mdina Tours.</p>`,
                isCallToAction: true,
                ctaType: 'transfer',
                ctaLink: `/transfers/${key}-transfer`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Comparisons" : "Comparatifs",
            date: "June 14, 2026",
            image: key.includes("merzouga") ? "/b-roll/activity-sahara-camel-riding-broll.webp" : key.includes("chefchaouen") ? "/hero-chefchaouen.webp" : "/img2/premium-chauffeur.jpg",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Is the train faster than a private transfer?" : "Le train est-il plus rapide que la voiture ?",
                    a: route.train
                        ? (isEn ? "The high-speed Al Boraq train is faster on the rail (1h20), but once you include hotel check-out, travel to the station, waiting, and taxi connections on arrival, a door-to-door private transfer takes a comparable total time." : "Le TGV Al Boraq est très rapide sur les rails, mais en prenant en compte le trajet vers la gare, l'avance et la navette finale, le transfert privé porte-à-porte affiche une durée globale similaire.")
                        : (isEn ? "No, for routes without high-speed rail, a private driver is faster as there are no intermediate station stops." : "Non, hors lignes TGV, le transfert privé est plus rapide car il évite les arrêts intermédiaires.")
                }
            ],
            relatedSlugs: [`how-to-get-from-${key}`, `private-chauffeur-morocco`]
        };
    }

    // 3. AIRPORT GUIDES: "[city]-airport-transfer-guide"
    if (slug.endsWith("-airport-transfer-guide")) {
        const cityKey = slug.replace("-airport-transfer-guide", "");
        const c = citiesData[cityKey];
        if (!c) return null;

        const cityName = isEn ? c.en : c.fr;
        const title = isEn 
            ? `${cityName} Airport Transfer Guide: Pickups, Prices & Taxis`
            : `Guide du Transfert Aéroport de ${cityName} : Tarifs et Navettes`;
        
        const excerpt = isEn
            ? `The complete guide to landing at ${cityName} Airport. Find out how to arrange transfers, grand taxi prices, and meet-and-greet services.`
            : `Le guide de voyage pour votre arrivée à l'Aéroport de ${cityName}. Évitez les pièges, comparez les prix des grands taxis et réservez une navette.`;

        const sections: ProgrammaticSection[] = [
            {
                id: "landing",
                title: isEn ? `Arriving at ${cityName} Airport` : `Arrivée à l'Aéroport de ${cityName}`,
                content: isEn
                    ? `<p>Landing at a busy airport in Morocco can be an intense experience. Terminal layouts, customs queues, and aggressive taxi negotiations can make your arrival stressful. Our airport pickup service at <strong>${cityName} Airport</strong> guarantees a smooth start to your vacation. Your private chauffeur waits in the arrivals hall with a name sign, assists with luggage, and drives you directly to your hotel or Riad.</p>`
                    : `<p>L'arrivée dans un aéroport marocain peut s'avérer intimidante. Entre le passage de la douane et les négociations animées des taxis locaux, commencez votre séjour sans stress. Nos chauffeurs vous accueillent directement à la sortie de la douane avec une pancarte nominative.</p>`
            },
            {
                id: "comparison",
                title: isEn ? "Grand Taxis vs Private Transfers" : "Grands Taxis face aux Navettes Privées",
                content: isEn
                    ? `<p>While official 'Grand Taxis' operate outside the terminals, fares are not always transparent, and drivers often demand extra cash for luggage, toll roads, or night pickups. With Mdina Tours, your fare is completely fixed at booking, with zero hidden surcharges.</p>`
                    : `<p>Bien que des grands taxis soient présents devant l'aérogare, leurs prix fluctuent souvent et les chauffeurs peuvent exiger des suppléments bagages. Notre navette privée garantit un prix fixe déterminé à l'avance.</p>`,
                list: isEn
                    ? [
                        "24/7 Flight Tracking: No extra charge if your landing is delayed",
                        "Meet & Greet: Direct nameboard greeting at arrivals",
                        "Modern Vehicles: Clean, air-conditioned executive vans and sedans",
                        "No Prepayment: Book on WhatsApp, pay cash to the driver"
                      ]
                    : [
                        "Suivi des vols gratuit : Pas de frais en cas de retard d'avion",
                        "Accueil personnalisé : Pancarte nominative dès la sortie des bagages",
                        "Flotte moderne : Vans et berlines climatisés spacieux",
                        "Zéro paiement en ligne : Réservez sur WhatsApp, payez sur place"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Book Your Airport Transfer Now" : "Réservez Votre Navette Aéroport",
                content: isEn
                    ? `<p>Ensure a stress-free arrival. Reserve your airport transfer with Mdina Tours today.</p>`
                    : `<p>Assurez-vous d'une arrivée sereine. Réservez votre navette aéroport avec Mdina Tours.</p>`,
                isCallToAction: true,
                ctaType: 'transfer',
                ctaLink: `/airport-transfers`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Airport Guides" : "Guides Aéroport",
            date: "June 14, 2026",
            image: cityKey === "casablanca" ? "/img2/Airport_Casablanca_Mohammed.webp" : cityKey === "rabat" ? "/img2/rabat-airport.webp" : cityKey === "tangier" ? "/img2/tangier-airport.avif" : cityKey === "marrakech" ? "/img2/aeroport-marrakech.webp" : cityKey === "fes" ? "/img2/fes-airport.jpeg" : cityKey === "agadir" ? "/img2/agadir-airport.webp" : "/img2/private-van-at-hotel.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "How does the driver find us if the flight is delayed?" : "Comment fait le chauffeur en cas de retard de vol ?",
                    a: isEn
                        ? "We monitor your flight status in real-time using your flight number. Your driver adjusts their arrival time automatically."
                        : "Nous suivons en temps réel l'avancement de votre vol grâce à votre numéro de vol. Le chauffeur s'adapte automatiquement."
                }
            ],
            relatedSlugs: [`airport-transfers`, `${cityKey}-travel-guide`]
        };
    }

    // 4. PRIVATE DRIVER PAGES - Each slug has 100% unique E-E-A-T content
    if (slug === "hire-a-driver-in-morocco") {
        const title = isEn
            ? "How to Hire a Private Driver in Morocco: Fares, Legal Rules & Tips"
            : "Comment Louer un Chauffeur Privé au Maroc : Tarifs, Règles & Conseils";
        const excerpt = isEn
            ? "Everything you need to know about hiring a licensed private driver in Morocco. Compare official tourist transport vs unlicensed taxis, average rates, and safety rules."
            : "Tout ce qu'il faut savoir pour louer un chauffeur privé agréé au Maroc. Différences avec les taxis, grilles tarifaires et règles de sécurité.";

        const sections: ProgrammaticSection[] = [
            {
                id: "licensing",
                title: isEn ? "Understanding Tourist Transport Licensing in Morocco" : "Comprendre l'Agrément de Transport Touristique au Maroc",
                content: isEn
                    ? `<p>When hiring a private driver in Morocco, it is critical to choose an officially licensed transport company registered with the Ministry of Tourism. Official tourist transport vehicles carry commercial registration plates and comprehensive passenger insurance. Unlicensed drivers operating private cars face strict police checkpoints, which can cause significant delays or travel cancellation during your holiday.</p>
                       <p>At <strong>Mdina Tours</strong>, all our drivers possess professional transport licenses, and our fleet undergoes mandatory bi-annual technical inspections to guarantee your safety across all highways and mountain roads.</p>`
                    : `<p>Pour louer un chauffeur privé au Maroc, il est essentiel de faire appel à une société de transport touristique officielle immatriculée auprès du Ministère du Tourisme. Les véhicules agréés disposent de plaques de transport et d'une assurance professionnelle pour les passagers. Les chauffeurs clandestins s'exposent à des contrôles de police fréquents risquant de perturber votre séjour.</p>
                       <p>Chez <strong>Mdina Tours</strong>, l'ensemble de nos chauffeurs détiennent des cartes professionnelles et nos véhicules passent des contrôles de sécurité semestriels rigoureux.</p>`
            },
            {
                id: "rates",
                title: isEn ? "Average Private Driver Costs & Rates in Morocco" : "Tarifs Moyens d'un Chauffeur Privé au Maroc",
                content: isEn
                    ? `<p>Private driver pricing in Morocco depends on vehicle category (executive sedan, 7-seater minivan, or 16-seat minibus), total distance, and duration. For long-distance intercity transfers or multi-day road trips, expected standard rates range between <strong>€90 and €250 per day</strong>.</p>`
                    : `<p>Le prix d'un chauffeur privé varie selon le véhicule (berline, van 7 places ou minibus 16 places), la distance et la durée du séjour. Pour les circuits interurbains et trajets au long cours, comptez en moyenne entre <strong>90€ et 250€ par jour</strong>.</p>`,
                table: {
                    headers: isEn ? ["Vehicle Type", "Capacity", "Daily Rate Range", "Best Suited For"] : ["Type de Véhicule", "Capacité", "Tarif Journalier", "Recommandé Pour"],
                    rows: [
                        [isEn ? "Executive Sedan (Skoda Superb)" : "Berline Premium (Skoda Superb)", "1-3 PAX", "€90 - €130 / day", isEn ? "Couples, solo travelers, business trips" : "Couples, voyageurs solos, affaires"],
                        [isEn ? "VIP Minivan (Mercedes Vito)" : "Van VIP (Mercedes Vito)", "4-7 PAX", "€130 - €180 / day", isEn ? "Families, small friend groups, luggage" : "Familles, petits groupes, bagages"],
                        [isEn ? "Executive Minibus (Mercedes Sprinter)" : "Minibus Prestige (Sprinter)", "8-16 PAX", "€200 - €300 / day", isEn ? "Large tours, delegations, corporate" : "Grands groupes, séminaires, clubs"]
                    ]
                }
            },
            {
                id: "whats-included",
                title: isEn ? "What Is Included in Your Chauffeur Rate?" : "Ce qui est inclus dans le Tarif Chauffeur",
                content: isEn
                    ? `<p>All Mdina Tours private chauffeur packages include fixed transparent pricing with no hidden surprises:</p>`
                    : `<p>Tous nos tarifs de chauffeur privé Mdina Tours sont forfaitaires et clairs :</p>`,
                list: isEn
                    ? [
                        "Commercial fuel and toll fees for all highways",
                        "Chauffeur meals and overnight lodging during multi-day tours",
                        "Unlimited luggage space and passenger insurance",
                        "Complimentary bottled water and phone charging ports"
                      ]
                    : [
                        "Carburant et péages autoroutiers inclus",
                        "Hébergement et repas du chauffeur pris en charge lors des circuits",
                        "Bagages illimités et assurance passagers",
                        "Bouteilles d'eau offertes et prises de recharge"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Reserve Your Licensed Driver Today" : "Réservez Votre Chauffeur Agréé",
                content: isEn
                    ? `<p>Ready to explore Morocco stress-free? Contact our booking team via WhatsApp for an immediate quote tailored to your exact dates and itinerary.</p>`
                    : `<p>Prêt à voyager sans stress ? Contactez notre équipe sur WhatsApp pour obtenir un devis rapide adapté à vos dates.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Private Driver" : "Chauffeur Privé",
            date: "June 14, 2026",
            image: "/img2/private-van-at-hotel.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Are fuel and highway tolls included in the rate?" : "Le carburant et les péages sont-ils inclus ?",
                    a: isEn ? "Yes. All Mdina Tours driver quotes are all-inclusive covering fuel, toll highways, parking, and driver expenses." : "Oui. Tous nos devis comprennent le carburant, les autoroutes, les frais de parking et les frais du chauffeur."
                },
                {
                    q: isEn ? "How far in advance should we book a private driver?" : "Combien de temps à l'avance faut-il réserver ?",
                    a: isEn ? "We recommend booking at least 48 to 72 hours in advance during high season (spring and autumn) to guarantee availability." : "Nous conseillons de réserver au moins 48h à 72h à l'avance en haute saison (printemps et automne)."
                }
            ],
            relatedSlugs: ["private-chauffeur-morocco", "luxury-driver-morocco"]
        };
    }

    if (slug === "private-chauffeur-morocco") {
        const title = isEn
            ? "Private Chauffeur Morocco: Executive Point-to-Point Mobility & City Transfers"
            : "Chauffeur Privé Maroc : Service VIP & Transferts Sur Mesure";
        const excerpt = isEn
            ? "Executive chauffeur services for corporate travel, intercity transfers, and VIP private road trips across Morocco with premium Mercedes vans and sedans."
            : "Service de chauffeur de maître pour voyages d'affaires, évènements et circuits VIP à travers tout le Maroc avec vans Mercedes d'exception.";

        const sections: ProgrammaticSection[] = [
            {
                id: "executive-service",
                title: isEn ? "Executive Private Mobility Across Moroccan Cities" : "Transport Privé Haut de Gamme entre les Villes du Maroc",
                content: isEn
                    ? `<p>Whether traveling for executive business meetings in Casablanca, diplomatic conferences in Rabat, or bespoke holiday stays in Marrakech, having a private chauffeur ensures punctual, comfortable, and discreet transport. Skip terminal waiting lines and enjoy door-to-door transit in premium air-conditioned vehicles.</p>`
                    : `<p>Pour vos rendez-vous professionnels à Casablanca, sommets diplomatiques à Rabat ou séjours de prestige à Marrakech, bénéficier d'un chauffeur privé garantit ponctualité, discrétion et confort. Évitez les files d'attente et profitez d'une mobilité sur mesure.</p>`
            },
            {
                id: "on-demand",
                title: isEn ? "Chauffeur Dispo: Hourly & Daily Standby Options" : "Service Chauffeur à la Disposition (Heure ou Journée)",
                content: isEn
                    ? `<p>Need a driver standing by for an evening dinner, wedding event, or flexible city tours? Our <strong>Chauffeur Dispo</strong> service places a dedicated vehicle and driver at your disposal for 4, 8, or 12 consecutive hours with unlimited local intra-city kilometers.</p>`
                    : `<p>Besoin d'un chauffeur disponible pour une soirée, un mariage ou des visites en ville ? Notre service <strong>Chauffeur à la Disposition</strong> met à votre service un véhicule avec chauffeur pour 4, 8 ou 12 heures consécutives.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Book Your Private Chauffeur" : "Réservez Votre Chauffeur Privé",
                content: isEn
                    ? `<p>Send your requested schedule and destination cities to receive instant WhatsApp confirmation.</p>`
                    : `<p>Envoyez-nous vos horaires et trajets pour recevoir une confirmation immédiate sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Private Driver" : "Chauffeur Privé",
            date: "June 14, 2026",
            image: "/img2/vito-chaufeeur-privé.jpg",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Can I book a private chauffeur for half-day city errands?" : "Peut-on réserver un chauffeur pour une demi-journée ?",
                    a: isEn ? "Yes. We offer 4-hour half-day and 8-hour full-day dedicated chauffeur services in Rabat, Casablanca, Marrakech, and Tangier." : "Oui. Nous proposons des forfaits 4h (demi-journée) et 8h (journée entière) à Rabat, Casablanca, Marrakech et Tanger."
                }
            ],
            relatedSlugs: ["hire-a-driver-in-morocco", "luxury-driver-morocco"]
        };
    }

    if (slug === "luxury-driver-morocco") {
        const title = isEn
            ? "Luxury Private Driver Morocco: Premium Mercedes Fleet & VIP Concierge"
            : "Chauffeur de Luxe au Maroc : Flotte Mercedes VIP et Service Conciergerie";
        const excerpt = isEn
            ? "Experience first-class travel in Morocco with our luxury Mercedes-Benz Vito and Sprinter fleet. VIP hospitality, leather seating, bottled water, and English chauffeurs."
            : "Voyagez en première classe au Maroc. Berlines et vans Mercedes tout confort avec chauffeurs en costume et service personnalisé.";

        const sections: ProgrammaticSection[] = [
            {
                id: "luxury-fleet",
                title: isEn ? "The First-Class Mercedes Experience" : "L'Expérience Première Classe Mercedes",
                content: isEn
                    ? `<p>For discerning travelers expecting flawless hospitality, Mdina Tours offers a dedicated fleet of luxury Mercedes-Benz Vito minivans and executive sedans. Featuring plush leather upholstery, privacy glass tinting, high-speed Wi-Fi hotspots, USB charging ports, and chilled bottled water, your travel experience across Morocco feels effortless.</p>`
                    : `<p>Pour les voyageurs exigeants, Mdina Tours met à disposition une flotte exclusive de Mercedes-Benz Vito et Sprinter. Intérieurs cuir, vitres teintées, connexion Wi-Fi haut débit et rafraîchissements garantissent un trajet dans les meilleures conditions.</p>`
            },
            {
                id: "concierge",
                title: isEn ? "VIP Meet & Greet at Airport Terminals" : "Accueil VIP aux Terminaux d'Aéroport",
                content: isEn
                    ? `<p>Our luxury private driver service includes complimentary flight tracking and VIP terminal meet-and-greet. Your chauffeur meets you directly past customs with a personalized nameboard, handles all heavy luggage, and escort you to your vehicle parked steps away in reserved zones.</p>`
                    : `<p>Chaque prise en charge comprend le suivi des vols et l'accueil en hall d'arrivée avec pancarte nominative, prise en charge complète des bagages et accès prioritaire aux parkings aéroportuaires.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Book Luxury Transport" : "Réservez Votre Transport de Luxe",
                content: isEn ? `<p>Reserve your VIP Mercedes transport with Mdina Tours today.</p>` : `<p>Réservez votre transfert VIP Mercedes avec Mdina Tours dès maintenant.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Luxury Mobility" : "Transport de Luxe",
            date: "June 14, 2026",
            image: "/img2/premium-chauffeur.jpg",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "What luxury amenities are included in the vehicle?" : "Quels équipements VIP sont disponibles à bord ?",
                    a: isEn ? "Leather seating, individual air-con controls, bottled water, mobile chargers, Wi-Fi, and luggage assistance." : "Sièges en cuir, climatisation individuelle, bouteilles d'eau, chargeurs mobiles, Wi-Fi et assistance bagages."
                }
            ],
            relatedSlugs: ["private-chauffeur-morocco", "hire-a-driver-in-morocco"]
        };
    }

    if (slug === "english-speaking-driver-morocco") {
        const title = isEn
            ? "English-Speaking Private Driver Morocco: Friendly Local Guides & Easy Trips"
            : "Chauffeur Privé Anglophone au Maroc : Voyager Sereinement sans Barrière de la Langue";
        const excerpt = isEn
            ? "Book a fluent English-speaking driver in Morocco for seamless travel, cultural explanations, hassle-free navigation, and friendly local assistance."
            : "Réservez un chauffeur marocain parfaitement anglophone et francophone pour échanger facilement et comprendre la culture locale.";

        const sections: ProgrammaticSection[] = [
            {
                id: "language",
                title: isEn ? "Seamless Communication Throughout Your Trip" : "Une Communication Fluide tout au long du Voyage",
                content: isEn
                    ? `<p>Language barriers should never get in the way of a great travel experience. When hiring an English-speaking driver with Mdina Tours, you can easily ask questions about local customs, request spontaneous photo stops, adjust departure times, and get recommendations for authentic roadside diners without misunderstanding.</p>`
                    : `<p>La barrière de la langue ne doit pas entraver votre voyage. En réservant un chauffeur bilingue (anglais et français), vous pouvez poser toutes vos questions sur les coutumes locales, adapter vos horaires et demander des conseils sur les meilleurs restaurants locaux.</p>`
            },
            {
                id: "cultural-bridge",
                title: isEn ? "Local Cultural Context & Hospitality" : "Conseils Culturels et Accueil Marocain",
                content: isEn
                    ? `<p>Beyond steering the wheel, your driver acts as a welcoming ambassador to Morocco. Learn about Berber traditions, tea rituals, regional music, and medina etiquette while enjoying the scenery from the comfort of your private vehicle.</p>`
                    : `<p>En plus de conduire, votre chauffeur agit comme un véritable ambassadeur. Découvrez l'histoire des médinas, les rituels du thé et la musique régionale tout en admirant les paysages.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Request an English-Speaking Driver" : "Demandez un Chauffeur Bilingue",
                content: isEn ? `<p>Guarantee an English-fluent chauffeur for your journey by booking on WhatsApp.</p>` : `<p>Garantissez un chauffeur bilingue français/anglais en réservant via WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Private Driver" : "Chauffeur Privé",
            date: "June 14, 2026",
            image: "/b-roll/chauffaur.jpg",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Do all your drivers speak English?" : "Tous vos chauffeurs parlent-ils anglais ?",
                    a: isEn ? "Yes. All our tourist driver staff are fluent in both English and French." : "Oui. L'ensemble de notre équipe de chauffeurs maîtrise couramment l'anglais et le français."
                }
            ],
            relatedSlugs: ["driver-guide-morocco", "hire-a-driver-in-morocco"]
        };
    }

    if (slug === "driver-guide-morocco") {
        const title = isEn
            ? "Private Driver-Guide Morocco: Scenic Photography Stops & Hidden Gems"
            : "Chauffeur-Guide Privé au Maroc : Pauses Panoramiques et Découvertes Authentiques";
        const excerpt = isEn
            ? "Discover hidden viewpoints, traditional Berber villages, and authentic roadside spots with a knowledgeable private driver-guide."
            : "Combinez le confort d'un transport privé et la richesse des explications d'un chauffeur local connaissant le terrain sur le bout des doigts.";

        const sections: ProgrammaticSection[] = [
            {
                id: "storytelling",
                title: isEn ? "Beyond Driving: Roadside Knowledge & Hidden Panorama Spots" : "Plus qu'un Chauffeur : Connaissance du Terrain & Halte Panoramiques",
                content: isEn
                    ? `<p>A private driver-guide gives you the perfect middle ground between standard point-to-point transit and full group tour packages. During long highway and mountain drives, your driver highlights historic points of interest, Berber grain stores, argan oil cooperatives, and scenic valley photo spots that tour buses bypass.</p>`
                    : `<p>Le chauffeur-guide est la solution idéale pour voyager à votre rythme. Durant le trajet à travers l'Atlas ou la côte, il vous fait découvrir des coopératives d'huile d'argan authentiques, des points de vue panoramiques méconnus et des villages de montagne.</p>`
            },
            {
                id: "flexibility",
                title: isEn ? "Total Schedule Freedom on the Road" : "Liberté Totale de Planning sur la Route",
                content: isEn
                    ? `<p>Spotted a panoramic canyon or a local market along the road? Simply ask your driver-guide to pull over. You control the pace of your journey without rigid timetable pressures.</p>`
                    : `<p>Vous apercevez un marché traditionnel ou un paysage grandiose ? Demandez simplement à votre chauffeur de s'arrêter. Vous décidez du rythme de votre itinéraire.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Book a Driver-Guide Today" : "Réservez Votre Chauffeur-Guide",
                content: isEn ? `<p>Experience Morocco through the eyes of a local expert. Reserve your driver-guide on WhatsApp.</p>` : `<p>Découvrez le Maroc avec un expert local. Réservez votre chauffeur-guide sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Driver Guide" : "Chauffeur Guide",
            date: "June 14, 2026",
            image: "/b-roll/private-transfer-chauffaur-vito.jpg",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Can a driver-guide take us inside medina monuments?" : "Le chauffeur-guide effectue-t-il les visites à l'intérieur des médinas ?",
                    a: isEn ? "Driver-guides manage all road travel and sightseeing stops. For historical monuments inside pedestrian medinas (like Fes or Marrakech), licensed city guides can be arranged upon request." : "Le chauffeur-guide gère l'ensemble du trajet routier. Pour les médinas piétonnes (Fès, Marrakech), nous mettons à votre disposition des guides officiels certifiés."
                }
            ],
            relatedSlugs: ["english-speaking-driver-morocco", "driver-for-morocco-itinerary"]
        };
    }

    if (slug === "driver-for-morocco-itinerary") {
        const title = isEn
            ? "Private Driver for Custom Morocco Itineraries: 3 to 14 Day Road Trips"
            : "Chauffeur Privé pour Itinéraire Sur Mesure au Maroc : Circuits de 3 à 14 Jours";
        const excerpt = isEn
            ? "Planning a multi-day trip across Morocco? Hire a dedicated chauffeur for your custom road trip starting from Rabat, Casablanca, Marrakech, or Tangier."
            : "Concevez votre grand tour du Maroc avec un chauffeur dédié pendant 3, 7, 10 ou 14 jours. Flexibilité absolue et itinéraire à votre rythme.";

        const sections: ProgrammaticSection[] = [
            {
                id: "multi-day",
                title: isEn ? "How Multi-Day Driver Services Work" : "Fonctionnement de la Location de Chauffeur Multi-Jours",
                content: isEn
                    ? `<p>Designing a multi-day grand tour of Morocco (e.g. Casablanca -> Chefchaouen -> Fes -> Sahara Desert -> Marrakech) requires reliable long-distance transportation. When you hire a private driver for your itinerary, the same professional vehicle and driver stay with your travel group for the entire length of your vacation.</p>
                       <p>Your driver manages all navigation, mountain passes, parking fees, vehicle maintenance, and luggage loading, allowing you to relax each day.</p>`
                    : `<p>Organiser un grand tour du Maroc (ex: Casablanca -> Chefchaouen -> Fès -> Désert -> Marrakech) nécessite un transport fiable sur de longues distances. Votre chauffeur dédié vous accompagne du premier au dernier jour de votre voyage.</p>
                       <p>Il prend en charge le trajet, les péages, le stationnement et les bagages pour vous laisser profiter pleinement de chaque étape.</p>`
            },
            {
                id: "flexibility-routes",
                title: isEn ? "Popular Cross-Country Routes" : "Axes de Circuits Populaires",
                content: isEn
                    ? `<p>Our multi-day drivers frequently cover iconic itineraries including:</p>`
                    : `<p>Nos chauffeurs effectuent régulièrement les grands axes touristiques :</p>`,
                list: isEn
                    ? [
                        "Imperial Cities Loop (7 Days): Rabat, Meknes, Fes, Volubilis & Marrakech",
                        "Northern Blue Pearl & Coast (5 Days): Tangier, Chefchaouen, Asilah & Rabat",
                        "Grand Sahara Expedition (10 Days): Tangier to Merzouga Dunes ending in Marrakech"
                      ]
                    : [
                        "Villes Impériales (7 Jours) : Rabat, Meknès, Fès, Volubilis & Marrakech",
                        "Perle Bleue & Côte Nord (5 Jours) : Tanger, Chefchaouen, Asilah & Rabat",
                        "Grand Circuit Désert (10 Jours) : De Tanger à Merzouga avec arrivée à Marrakech"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Plan Your Itinerary Driver" : "Organisez Votre Circuit avec Chauffeur",
                content: isEn ? `<p>Send us your desired stops and trip length to receive a custom quote.</p>` : `<p>Transmettez-nous vos étapes pour recevoir votre devis sur mesure.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/contact'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Itinerary Driver" : "Circuit Chauffeur",
            date: "June 14, 2026",
            image: "/img2/happy-traverlers-group.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Do we need to pay for the driver's lodging?" : "Faut-il payer l'hôtel du chauffeur ?",
                    a: isEn ? "No. All driver accommodations, meals, and daily allowances during multi-day tours are fully covered by Mdina Tours." : "Non. Tous les frais de logement et de repas du chauffeur durant le circuit sont intégralement pris en charge par Mdina Tours."
                }
            ],
            relatedSlugs: ["morocco-itinerary-7-days", "driver-for-sahara-desert-tour"]
        };
    }

    if (slug === "driver-for-sahara-desert-tour") {
        const title = isEn
            ? "Private Driver for Sahara Desert Tours: Marrakech to Merzouga & Fes"
            : "Chauffeur Privé pour Circuit Désert du Sahara : De Marrakech à Merzouga";
        const excerpt = isEn
            ? "Travel safely through the High Atlas Mountains and Dades Gorges to the Erg Chebbi sand dunes with an experienced mountain and desert driver."
            : "Traversez le Haut Atlas et les gorges du Todra en toute sécurité jusqu'aux dunes de l'Erg Chebbi avec un chauffeur expérimenté.";

        const sections: ProgrammaticSection[] = [
            {
                id: "desert-safety",
                title: isEn ? "Navigating High Atlas Passes & Desert Highways Safely" : "Traversée en Sécurité des Cols de l'Atlas et des Routes du Désert",
                content: isEn
                    ? `<p>Driving from Marrakech or Fes into the Sahara Desert (Erg Chebbi, Merzouga) involves traversing winding mountain roads like Tizi n'Tichka (2,260m elevation) and long desert stretches. Hiring a specialized desert driver ensures safety on sharp mountain bends and comfortable transit in high-clearance minivans or 4x4 vehicles equipped with strong air conditioning.</p>`
                    : `<p>Rejoindre le désert du Sahara depuis Marrakech ou Fès implique de franchir des cols escarpés comme le Tizi n'Tichka (2 260m). Faire appel à un chauffeur expérimenté garantit une conduite sûre dans les lacets de montagne et un confort parfait en climatisation.</p>`
            },
            {
                id: "desert-highlights",
                title: isEn ? "Key Sightseeing Stops Along the Desert Route" : "Étapes Incontournables de la Route du Désert",
                content: isEn
                    ? `<p>Your private desert driver handles stops at renowned landmarks along the route:</p>`
                    : `<p>Votre chauffeur privé fait escale dans les plus beaux lieux de la route du désert :</p>`,
                list: isEn
                    ? [
                        "Ait Benhaddou UNESCO Kasbah – Historic mud-brick fortress",
                        "Ouarzazate Film Studios & Taourirt Kasbah",
                        "Dades & Todra Gorges – Massive red limestone canyons",
                        "Merzouga Camel Treks – Seamless handover to desert luxury camps"
                      ]
                    : [
                        "Kasbah d'Aït Benhaddou (Patrimoine UNESCO)",
                        "Studios de cinéma de Ouarzazate",
                        "Gorges du Dadès et du Todra",
                        "Accueil aux pieds des dunes pour la balade à dromadaire"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Book Your Sahara Driver" : "Réservez Votre Chauffeur Désert",
                content: isEn ? `<p>Reserve your private driver for the Marrakech-Merzouga-Fes desert route on WhatsApp.</p>` : `<p>Réservez votre chauffeur privé pour la traversée du désert sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: '/private-driver'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Sahara Driver" : "Chauffeur Désert",
            date: "June 14, 2026",
            image: "/b-roll/activity-sahara-camel-riding-broll.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Can the driver drop us off in Fes after a desert tour starting in Marrakech?" : "Le chauffeur peut-il nous déposer à Fès après le désert depuis Marrakech ?",
                    a: isEn ? "Yes! The Marrakech -> Merzouga Desert -> Fes route is one of our most popular one-way private driver itineraries." : "Oui ! Le circuit Marrakech -> Désert de Merzouga -> Fès est l'un de nos trajets sur mesure les plus demandés."
                }
            ],
            relatedSlugs: ["sahara-desert-tour-plan", "driver-for-morocco-itinerary"]
        };
    }

    // 5. ITINERARY PAGES: "morocco-itinerary-[X]-days"
    if (slug.startsWith("morocco-itinerary-") && slug.endsWith("-days")) {
        const days = slug.replace("morocco-itinerary-", "").replace("-days", "");
        
        const title = isEn
            ? `${days}-Day Morocco Itinerary: The Ultimate Road Trip Guide`
            : `Circuit ${days} Jours au Maroc : Itinéraire et Conseils de Voyage`;
        
        const excerpt = isEn
            ? `Plan your perfect ${days}-day trip to Morocco. Discover the best routes, historic imperial cities, Atlas mountains, and desert camping.`
            : `Découvrez notre itinéraire de ${days} jours pour visiter le Maroc. Cités impériales, randonnées dans l'Atlas et dunes du Sahara.`;

        const sections: ProgrammaticSection[] = [
            {
                id: "overview",
                title: isEn ? "Itinerary Overview" : "Aperçu de l'itinéraire",
                content: isEn
                    ? `<p>Planning a ${days}-day vacation in Morocco gives you enough time to experience the country's diverse landscapes. This itinerary blends historical medinas, imperial history, mountain valleys, and desert camping. To travel comfortably and maximize your time, hiring a private driver is highly recommended to manage the long travel distances.</p>`
                    : `<p>Un séjour de ${days} jours est idéal pour s'imprégner de l'atmosphère du Maroc. Nous vous proposons un itinéraire optimisé reliant les villes impériales et les portes du désert, avec des temps de repos réguliers.</p>`
            },
            {
                id: "day-by-day",
                title: isEn ? "Day-by-Day Breakdown" : "Détail Jour par Jour",
                content: isEn
                    ? `<p>Here is your detailed daily travel plan:</p>
                       <ul>
                         <li><strong>Day 1: Arrival & Rabat Capital</strong> – Explore the Kasbah of the Udayas.</li>
                         <li><strong>Day 2: Rabat to Chefchaouen</strong> – Drive to the famous Blue City in the Rif.</li>
                         <li><strong>Day 3: Chefchaouen to Fes</strong> – Explore the UNESCO medieval medina.</li>
                         ${days === '3' ? '' : '<li><strong>Day 4: Fes Guided Tour</strong> – Visit medieval tanneries and schools.</li>'}
                         ${days === '3' || days === '5' ? '' : '<li><strong>Day 5: Fes to Sahara Desert (Merzouga)</strong> – Ride camels and sleep in luxury camps.</li>'}
                         ${days === '10' || days === '14' ? '<li><strong>Day 6-7: Desert Exploration & Dades Gorges</strong> – View massive canyons.</li>' : ''}
                         ${days === '14' ? '<li><strong>Day 8-12: Marrakech & Essaouira</strong> – Enjoy the Atlantic coast and souks.</li>' : '<li><strong>Remaining Days: Marrakech Highlights</strong> – Explore Majorelle Garden and Jemaa el-Fnaa.</li>'}
                       </ul>`
                    : `<p>Voici les grandes étapes de votre voyage :</p>
                       <ul>
                         <li><strong>Jour 1 : Arrivée et Rabat</strong> – Visite des monuments historiques.</li>
                         <li><strong>Jour 2 : Rabat à Chefchaouen</strong> – Découverte de la perle bleue du Rif.</li>
                         <li><strong>Jour 3 : Chefchaouen à Fès</strong> – Visite de la plus grande médina médiévale.</li>
                       </ul>`
            },
            {
                id: "cta",
                title: isEn ? "Book This Custom Tour" : "Réservez ce circuit sur mesure",
                content: isEn
                    ? `<p>Want to turn this itinerary into a reality? Let Mdina Tours design a custom private tour for you, including a dedicated driver and certified guides.</p>`
                    : `<p>Vous souhaitez réaliser ce circuit ? Mdina Tours s'occupe de tout : véhicule récent avec chauffeur bilingue et guides officiels locaux.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: `/contact`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Itineraries" : "Itinéraires",
            date: "June 14, 2026",
            image: days === "3" ? "/img/Morocco-trip-tour-hero01.webp" : days === "5" ? "/img/Morocco-trip-tour-hero02.webp" : days === "7" ? "/img/Morocco-trip-tour-hero03.webp" : days === "10" ? "/img/Morocco-trip-tour-hero05.webp" : "/img/Morocco-trip-tour-hero08.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Can we customize this itinerary?" : "Peut-on modifier cet itinéraire ?",
                    a: isEn
                        ? "Absolutely. All our multi-day tours are customized. We can adjust the duration, destinations, and activities according to your needs."
                        : "Bien sûr. Nos circuits sont entièrement modulables selon la durée et les étapes de votre choix."
                }
            ],
            relatedSlugs: ["private-driver-morocco-guide", "sahara-desert-tour-plan"]
        };
    }

    // 6. CITY GUIDES: "[city]-travel-guide"
    if (slug.endsWith("-travel-guide")) {
        const cityKey = slug.replace("-travel-guide", "");
        const c = citiesData[cityKey];
        if (!c) return null;

        const cityName = isEn ? c.en : c.fr;
        const title = isEn
            ? `The Ultimate ${cityName} Travel Guide: What to See & Do`
            : `Le Guide Complet de ${cityName} : Incontournables et Conseils`;
        
        const excerpt = isEn
            ? `Plan your visit to ${cityName}. Discover top historical attractions, medina markets, local cuisine, and transfer routes.`
            : `Toutes les informations utiles pour visiter ${cityName}. Lieux d'intérêt, bonnes adresses et transports locaux.`;

        const attractions = isEn ? c.attractionsEn : c.attractionsFr;

        const sections: ProgrammaticSection[] = [
            {
                id: "intro",
                title: isEn ? `About ${cityName}` : `Découvrir ${cityName}`,
                content: isEn
                    ? `<p>Exploring the historic highlights of ${cityName} is an essential part of any Morocco holiday. With unique landmarks and cultural layers, this destination has lots to offer tourists.</p>`
                    : `<p>Découvrir les richesses historiques de ${cityName} est un moment fort de tout voyage au Maroc. Entre traditions et modernité, cette destination regorge de trésors.</p>`
            },
            {
                id: "attractions",
                title: isEn ? "Top Attractions to Visit" : "Les visites incontournables",
                content: isEn 
                    ? `<p>When visiting ${cityName}, ensure you add these historical sites to your list:</p>`
                    : `<p>Voici les monuments et quartiers essentiels à découvrir lors de votre passage :</p>`,
                list: attractions
            },
            {
                id: "cta",
                title: isEn ? "Book a Transfer to " + cityName : "Réservez un chauffeur pour " + cityName,
                content: isEn
                    ? `<p>Arrive in style. Reserve your private chauffeur to ${cityName} today.</p>`
                    : `<p>Voyagez en toute simplicité. Réservez votre chauffeur privé pour ${cityName}.</p>`,
                isCallToAction: true,
                ctaType: 'transfer',
                ctaLink: `/transfers`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "City Guides" : "Guides Villes",
            date: "June 14, 2026",
            image: cityKey === "marrakech" ? "/img/marrakech.jpg" : cityKey === "chefchaouen" ? "/hero-chefchaouen.webp" : cityKey === "rabat" ? "/img2/rabat-hassan-tour.jpg" : cityKey === "casablanca" ? "/img2/casablanca_MOSQUE.webp" : cityKey === "fes" ? "/img2/fes_gate.jpg" : cityKey === "tangier" ? "/img2/tangier_hero.webp" : cityKey === "agadir" ? "/img2/agadir-marina.jpg" : cityKey === "merzouga" ? "/Sahara.webp" : "/Traditional.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? `How many days do I need in ${cityName}?` : `Combien de jours faut-il pour visiter ${cityName} ?`,
                    a: isEn
                        ? `We recommend spending at least 1 to 2 days to explore the main landmarks and experience the local culture.`
                        : `Nous conseillons de prévoir au moins 1 à 2 jours pour s'imprégner de l'atmosphère et voir les principaux sites.`
                }
            ],
            relatedSlugs: [`rabat-travel-guide`, `casablanca-travel-guide`]
        };
    }

    // 7. CRUISE TOURISM PAGES - Distinct per-slug logic for Tangier & Casablanca
    if (slug === "tangier-shore-excursions") {
        const title = isEn
            ? "Tangier Shore Excursions: Private Port Tours & Medina Pickups"
            : "Excursions d'Escale à Tanger : Circuits Privés depuis le Port";
        const excerpt = isEn
            ? "Short 4-6 hour private shore excursions directly from Tangier City Port (Port de Tanger Ville). Explore the Kasbah, Cap Spartel, and Hercules Caves."
            : "Circuits d'escale de 4 à 6 heures au départ du Port de Tanger Ville. Visite guidée de la Kasbah, Cap Spartel et les Grottes d'Hercule.";

        const sections: ProgrammaticSection[] = [
            {
                id: "port-meet",
                title: isEn ? "Direct Passenger Terminal Pickup at Tangier Port" : "Prise en Charge Directe au Terminal Passagers du Port de Tanger",
                content: isEn
                    ? `<p>Disembarking at <strong>Tangier City Port (Port de Tanger Ville)</strong>? Skip crowded cruise tour buses. Your private Mdina Tours chauffeur waits directly at the passenger arrival gates holding a sign with your name, ensuring a prompt departure so you maximize every minute of your port stay.</p>`
                    : `<p>Vous débarquez au <strong>Port de Tanger Ville</strong> ? Votre chauffeur privé vous accueille directement au hall d'arrivée des voyageurs muni d'une pancarte à votre nom pour démarrer votre excursion sans perdre une seconde.</p>`
            },
            {
                id: "tangier-highlights",
                title: isEn ? "Highlights of the 4-6 Hour Tangier Port Tour" : "Les Étapes Fortes de l'Escale à Tanger (4-6h)",
                content: isEn
                    ? `<p>Our compact Tangier shore excursion covers all essential coastal and medina highlights:</p>`
                    : `<p>Notre circuit court d'escale à Tanger couvre les incontournables de la ville :</p>`,
                list: isEn
                    ? [
                        "Cap Spartel – Where the Atlantic Ocean meets the Mediterranean Sea",
                        "Caves of Hercules – Ancient sea-carved caverns shaped like Africa",
                        "The Historic Tangier Kasbah & Sultan's Palace (Dar el-Makhzen)",
                        "Grand Socco & Petit Socco Medina Markets"
                      ]
                    : [
                        "Cap Spartel – Rencontre entre l'Océan Atlantique et la Méditerranée",
                        "Grottes d'Hercule – Cavités mythiques surplombant la mer",
                        "La Kasbah de Tanger et le Palais du Sultan",
                        "Grand Socco et ruelles vivantes de la Médina"
                      ]
            },
            {
                id: "guarantee",
                title: isEn ? "Guaranteed Back-To-Ship Timing Policy" : "Garantie Restitution au Navire à l'Heure",
                content: isEn
                    ? `<p>We guarantee to return you to the cruise ship dock at least 1 hour prior to your ship's scheduled all-aboard time.</p>`
                    : `<p>Nous garantissons un retour au quai d'embarquement au moins 1h avant l'heure limite d'embarquement du navire.</p>`
            },
            {
                id: "cta",
                title: isEn ? "Book Your Tangier Shore Excursion" : "Réservez Votre Excursion à Tanger",
                content: isEn ? `<p>Provide your cruise ship name and port docking hours on WhatsApp to book.</p>` : `<p>Indiquez-nous le nom de votre navire et vos horaires d'escale sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: '/contact'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Shore Excursions" : "Escales Croisières",
            date: "June 14, 2026",
            image: "/img2/tangier_hero.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Where does the driver wait at Tangier Port?" : "Où attend le chauffeur au port de Tanger ?",
                    a: isEn ? "Directly outside the passenger customs exit gate at Port de Tanger Ville holding a name sign." : "Juste à la sortie douane du terminal passagers du Port de Tanger Ville avec une pancarte."
                }
            ],
            relatedSlugs: ["best-day-trips-from-tangier-port", "tangier-travel-guide"]
        };
    }

    if (slug === "best-day-trips-from-tangier-port") {
        const title = isEn
            ? "Best Day Trips from Tangier Port: Chefchaouen, Asilah & Tetouan"
            : "Les Meilleures Excursions au Départ du Port de Tanger : Chefchaouen & Asilah";
        const excerpt = isEn
            ? "Planning a full-day shore stop at Tangier Port? Book private driver day trips to Chefchaouen (The Blue Pearl), coastal Asilah, or UNESCO Tetouan."
            : "Prolongez votre escale à Tanger. Excursions d'une journée en chauffeur privé vers Chefchaouen (la Ville Bleue), Asilah ou Tétouan.";

        const sections: ProgrammaticSection[] = [
            {
                id: "full-day-destinations",
                title: isEn ? "Top Full-Day Excursions for Tangier Cruise Passengers" : "Les Grands Circuits d'une Journée depuis le Port de Tanger",
                content: isEn
                    ? `<p>If your cruise ship docks in Tangier for 8 to 12 hours, taking a full-day private trip into northern Morocco is the highlight of your cruise itinerary. Our private vehicles provide rapid transit so you can explore surrounding UNESCO gems before returning to your ship.</p>`
                    : `<p>Si votre navire fait escale à Tanger pendant 8 à 12 heures, profitez-en pour réaliser un grand circuit privé à travers le nord du Maroc.</p>`
            },
            {
                id: "trip-options",
                title: isEn ? "Choose Your Day Trip Route" : "Choisissez Votre Itinéraire d'Excursion",
                content: isEn
                    ? `<p>Select from these top day trips starting directly from Tangier Port:</p>`
                    : `<p>Sélectionnez votre parcours au départ du port :</p>`,
                list: isEn
                    ? [
                        "Chefchaouen Blue City Day Trip (8 Hours) – Scenic Rif Mountain drive to the famous blue-painted alleys.",
                        "Asilah Atlantic Coastal Village (5 Hours) – Historic Portuguese sea ramparts and whitewashed medina.",
                        "Tetouan UNESCO Medina Tour (6 Hours) – Authentic Hispano-Moorish architecture and artisan souks."
                      ]
                    : [
                        "Excursion à Chefchaouen (8 Hours) – Traversée du Rif vers les ruelles bleues photogéniques.",
                        "Excursion à Asilah (5 Hours) – Remparts portugais et médina blanche au bord de l'océan.",
                        "Visite de Tétouan (6 Hours) – Médina UNESCO à l'architecture hispano-mauresque."
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Book Your Tangier Port Day Trip" : "Réservez Votre Excursion depuis le Port",
                content: isEn ? `<p>Reserve your private day trip from Tangier Port on WhatsApp.</p>` : `<p>Réservez votre grande excursion depuis le Port de Tanger sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: '/contact'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Shore Excursions" : "Escales Croisières",
            date: "June 14, 2026",
            image: "/hero-chefchaouen.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Is there enough time to visit Chefchaouen during a cruise stop?" : "A-t-on le temps de visiter Chefchaouen pendant une escale ?",
                    a: isEn ? "Yes! Driving to Chefchaouen takes ~2h15m each way. With an 8 to 9 hour port docking window, you have 3 to 4 full hours to explore the Blue City." : "Oui ! Le trajet prend environ 2h15. Pour une escale de 8h à 9h, vous profitez de 3h à 4h de visite sur place."
                }
            ],
            relatedSlugs: ["tangier-shore-excursions", "chefchaouen-travel-guide"]
        };
    }

    if (slug === "casablanca-shore-excursions") {
        const title = isEn
            ? "Casablanca Shore Excursions: Hassan II Mosque & Medina Port Tours"
            : "Excursions d'Escale à Casablanca : Mosquée Hassan II & Port";
        const excerpt = isEn
            ? "Explore Casablanca's iconic Hassan II Mosque, Habous Quarter, and Rick's Cafe on a private 4-5 hour shore excursion from Casablanca Cruise Port."
            : "Découvrez la célèbre Mosquée Hassan II, le quartier des Habous et Rick's Café lors d'une excursion d'escale privée de 4 à 5h au port de Casablanca.";

        const sections: ProgrammaticSection[] = [
            {
                id: "casablanca-port",
                title: isEn ? "Private Chauffeur Pickup at Casablanca Cruise Terminal" : "Prise en Charge au Port de Croisière de Casablanca",
                content: isEn
                    ? `<p>Casablanca Cruise Port is a busy commercial harbor. Finding reliable taxis at the port gate can be difficult and stressful. With Mdina Tours, your private chauffeur greets you directly at the port exit with a name sign, whisking you away in a modern executive vehicle for a comfortable city tour.</p>`
                    : `<p>Le port de croisière de Casablanca est un grand port de commerce. Votre chauffeur privé vous accueille dès la sortie du terminal passagers avec une pancarte pour démarrer votre visite guidée.</p>`
            },
            {
                id: "highlights",
                title: isEn ? "Key Sights Covered in 4-5 Hours" : "Les Incontournables en 4-5 Heures",
                content: isEn
                    ? `<p>Our Casablanca shore excursion includes access to top architectural landmarks:</p>`
                    : `<p>Notre circuit d'escale à Casablanca comprend les grands monuments :</p>`,
                list: isEn
                    ? [
                        "Hassan II Mosque – Guided access to one of the largest mosques in the world",
                        "Habous Quarter – Traditional New Medina famous for pastries and olive markets",
                        "Rick's Cafe – Photo stop at the iconic Casablanca movie-themed landmark",
                        "Ain Diab Corniche – Oceanfront promenade and Boulevard Mohammed V architecture"
                      ]
                    : [
                        "Mosquée Hassan II – Visite de ce chef-d'œuvre surplombant l'océan",
                        "Quartier des Habous – Nouvelle médina célèbre pour ses pâtisseries",
                        "Rick's Café – Halte photo devant l'adresse mythique du film Casablanca",
                        "La Corniche d'Aïn Diab – Promenade en bord de mer"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Book Casablanca Excursion" : "Réservez Votre Excursion à Casablanca",
                content: isEn ? `<p>Reserve your private Casablanca cruise excursion on WhatsApp.</p>` : `<p>Réservez votre excursion d'escale à Casablanca sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: '/contact'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Shore Excursions" : "Escales Croisières",
            date: "June 14, 2026",
            image: "/img2/casablanca_MOSQUE.webp",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Do we need pre-booked tickets for Hassan II Mosque?" : "Faut-il réserver les billets pour la Mosquée Hassan II à l'avance ?",
                    a: isEn ? "Official guided tour tickets can be purchased at the mosque entrance hall. Your driver aligns your itinerary with official tour schedules." : "Les billets pour les visites guidées de la mosquée s'achètent sur place. Votre chauffeur adapte l'heure d'arrivée aux créneaux officiels."
                }
            ],
            relatedSlugs: ["best-day-trips-from-casablanca-port", "casablanca-travel-guide"]
        };
    }

    if (slug === "best-day-trips-from-casablanca-port") {
        const title = isEn
            ? "Best Day Trips from Casablanca Port: Rabat & Marrakech Excursions"
            : "Les Meilleures Excursions au Départ du Port de Casablanca : Rabat & Marrakech";
        const excerpt = isEn
            ? "Maximize your cruise stop at Casablanca Port with full-day private driver trips to Rabat Imperial Capital (1 hour drive) or Marrakech Red City (2.5 hours)."
            : "Profitez de votre escale au Port de Casablanca pour visiter Rabat (à 1h) ou Marrakech (à 2h30) en chauffeur privé.";

        const sections: ProgrammaticSection[] = [
            {
                id: "day-trips-casa",
                title: isEn ? "Explore Beyond Casablanca During Your Cruise Stop" : "Explorez la Région depuis le Port de Casablanca",
                content: isEn
                    ? `<p>While Casablanca offers modern landmarks, surrounding cities offer incredible imperial history. Thanks to Morocco's high-speed highway network, cruise passengers docking at Casablanca Port can easily visit Rabat or Marrakech in a single day with a private driver.</p>`
                    : `<p>Grâce au réseau autoroutier rapide, une escale au port de Casablanca permet de visiter facilement la capitale Rabat ou la ville rouge de Marrakech sur la journée.</p>`
            },
            {
                id: "routes",
                title: isEn ? "Top Recommended Day Trip Destinations" : "Nos Recommandations d'Excursions",
                content: isEn
                    ? `<p>Choose from these top full-day itineraries starting from Casablanca Port:</p>`
                    : `<p>Sélectionnez votre grand circuit d'escale :</p>`,
                list: isEn
                    ? [
                        "Rabat Imperial Capital Day Trip (6 Hours total) – Hassan Tower, Kasbah Oudayas & Chellah (Only 1 hour highway drive)",
                        "Marrakech Red City Day Trip (10 Hours total) – Majorelle Garden, Bahia Palace & Jemaa el-Fnaa (2.5 hour drive each way)",
                        "El Jadida Portuguese Fortress (6 Hours total) – UNESCO Portuguese cistern and coastal fortress (1.5 hour drive)"
                      ]
                    : [
                        "Excursion à Rabat (6 Hours) – Tour Hassan, Oudayas et Chellah à seulement 1h de route",
                        "Excursion à Marrakech (10 Hours) – Jardin Majorelle, Palais Bahia et la place Jemaa el-Fna (2h30 de route)",
                        "Cité Portugaise d'El Jadida (6 Hours) – Citerne portugaise classée par l'UNESCO (1h30 de route)"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Book Your Day Trip from Casablanca Port" : "Réservez Votre Excursion d'Escale",
                content: isEn ? `<p>Contact us on WhatsApp with your ship details to arrange your private day trip.</p>` : `<p>Contactez-nous sur WhatsApp pour réserver votre excursion privée d'escale.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: '/contact'
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Shore Excursions" : "Escales Croisières",
            date: "June 14, 2026",
            image: "/img2/rabat-hassan-tour.jpg",
            seoTitle: `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Is Rabat close enough for a worry-free day trip from Casablanca Port?" : "Rabat est-elle assez proche pour une excursion sans risque ?",
                    a: isEn ? "Yes! Rabat is only 1 hour away via the A1 highway, making it the safest and most popular day trip option for cruise travelers docking in Casablanca." : "Oui ! Rabat n'est qu'à 1h d'autoroute, ce qui en fait l'excursion la plus sûre et la plus fluide depuis le port de Casablanca."
                }
            ],
            relatedSlugs: ["casablanca-shore-excursions", "rabat-travel-guide"]
        };
    }

    // 8. DAY TRIPS GUIDES
    if (slug === "best-day-trips-from-marrakech") {
        const title = isEn
            ? "Best Day Trips from Marrakech : Mountains, Deserts & The Atlantic Coast"
            : "Les Meilleures Excursions depuis Marrakech : Montagnes, Déserts & Côte Atlantique";
        
        const excerpt = isEn
            ? "Discover the ultimate day trips from Marrakech. From riding camels in the Agafay Desert and hiking the High Atlas Mountains, to exploring the UNESCO Ksar of Ait Benhaddou and Essaouira."
            : "Découvrez les meilleures excursions d'une journée au départ de Marrakech. Désert d'Agafay, montagnes de l'Atlas, Ait Benhaddou ou la côte d'Essaouira.";

        const sections: ProgrammaticSection[] = [
            {
                id: "introduction",
                title: isEn ? "Why Take a Day Trip from Marrakech?" : "Pourquoi faire une excursion depuis Marrakech ?",
                content: isEn
                    ? `<p>When planning your Moroccan itinerary, adding the <strong>best day trips from Marrakech</strong> should be a top priority. While the bustling souks and historic medina of the "Red City" are captivating, the surrounding regions offer incredible diversity just a short drive away. Within hours, you can trade crowded streets for a peaceful <strong>day trip from Marrakech</strong> into the High Atlas Mountains, ancient kasbahs, or the dramatic coastline.</p>
                       <img src="/img/marrakech.webp" alt="Marrakech Medina and Souks" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>In this guide, we break down exactly what to expect from the most popular <strong>Marrakech excursions</strong>. You'll find practical advice on visiting the stony Agafay Desert, exploring the UNESCO-listed village of Aït Benhaddou, hiking the breathtaking <strong>Ouzoud Waterfalls from Marrakech</strong>, and enjoying fresh seafood on a <strong>Marrakech to Essaouira day trip</strong>.</p>`
                    : `<p>Si vous ne disposez que de quelques jours à Marrakech, vous voudrez sans doute vous imprégner de la ville et explorer les souks, les places et les sites de la Médina. Mais si vous avez un ou deux jours de plus, la possibilité de s'éloigner de l'agitation est irrésistible.</p>
                       <img src="/img/marrakech.webp" alt="Médina de Marrakech" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Si vous êtes encore en phase de préparation, nous vous recommandons d'ajouter quelques jours supplémentaires car il y a tant à voir à <a href="/\${isEn ? 'en' : 'fr'}/blog/marrakech-travel-guide" style="color:var(--primary); font-weight:600;">Marrakech</a>. Que vous souhaitiez monter à dos de chameau dans le désert, admirer les cascades ou explorer les villages berbères de l'Atlas.</p>`
            },
            {
                id: "agafay-desert",
                title: isEn ? "1. Agafay Desert : The Desert on Marrakech’s Doorstep" : "1. Désert d'Agafay : Le Désert aux portes de Marrakech",
                content: isEn
                    ? `<p><strong>Where:</strong> Agafay Desert, around 40km southwest of Marrakech<br>
                       <strong>Tour Length:</strong> Half-day to full-day options (4–8 hours)<br>
                       <strong>Drive Time:</strong> Around 45 minutes</p>
                       <img src="/img/agafay.jpg" alt="Agafay Desert sunset" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Unlike the Sahara’s golden dunes, Agafay is a stark, rocky desert. An <strong>Agafay Desert day trip</strong> is a fantastic option if you want a true desert experience without the long multi-day drive. Traditionally used by Berber shepherds, this barren plateau gives you sweeping skies, glorious sunsets, and a chance to ride a camel or zoom on a quad bike just under an hour from the city. The best time of day to visit is late afternoon—arriving a few hours before sunset lets you enjoy activities in cooler temperatures and watch the landscape turn fiery orange.</p>
                       <p><strong>Practical Info:</strong> There is no general entry fee for the Agafay Desert itself, but you will pay for specific activities and meals at the luxury camps. Bring layers; even in summer, the desert cools down rapidly after dark. Wear closed-toe shoes if you plan to ride ATVs or camels. <em>Local Tip:</em> Skip the midday heat and book a dinner-only experience at a luxury camp for incredible stargazing with live traditional music.</p>
                       <p><strong>Pros for Agafay Desert:</strong><br>
                       - Easy half-day trip — no long drives, you can easily be back in time for dinner.<br>
                       - Wide range of experiences — camel rides, quad biking, music, dinner under the stars.<br>
                       - Stunning sunset and stargazing opportunities.<br>
                       <strong>Cons:</strong> It’s not the Sahara, so expect rocky barren hills instead of huge golden sand dunes.</p>
                       <p>You can easily arrange a trip here by booking a <a href="/\${isEn ? 'en' : 'fr'}/private-driver" style="color:var(--primary); font-weight:600;">private driver</a>.</p>`
                    : `<p>Contrairement aux dunes dorées du Sahara, Agafay est un désert de pierres. C'est une excellente option si vous souhaitez vivre une expérience désertique sans faire le long trajet vers le Sahara.</p>
                       <img src="/img/agafay.jpg" alt="Désert d'Agafay" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Ce plateau aride vous offre de grands espaces, de magnifiques couchers de soleil, et l'occasion de faire une balade à dos de chameau ou en quad à seulement une heure de la ville. De nombreuses excursions se terminent par un dîner sous les étoiles dans l'un des camps luxueux du désert.</p>
                       <p><strong>Les avantages :</strong> Trajet très court, idéal pour admirer le coucher de soleil, nombreuses activités (quad, chameau).<br><strong>Les inconvénients :</strong> Ce n'est pas le Sahara, il n'y a donc pas de dunes de sable.</p>
                       <p>Réservez facilement votre excursion avec un <a href="/\${isEn ? 'en' : 'fr'}/private-driver" style="color:var(--primary); font-weight:600;">chauffeur privé</a>.</p>`
            },
            {
                id: "ait-benhaddou",
                title: isEn ? "2. Ait Benhaddou : A Journey into Morocco’s History" : "2. Ait Benhaddou : Un voyage dans l'histoire du Maroc",
                content: isEn
                    ? `<p><strong>Where:</strong> Aït Benhaddou, approx. 180km east of Marrakech<br>
                       <strong>Tour Length:</strong> Full day (11-13 hours)<br>
                       <strong>Drive Time:</strong> 3.5 hours each way via the High Atlas</p>
                       <img src="/img/Ait%20Benhaddou.jpg" alt="Ait Benhaddou Kasbah" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Traveling from <strong>Marrakech to Ait Benhaddou</strong> takes you on a journey into Morocco’s rich trading history. Aït Benhaddou was once a thriving stop on the ancient camel caravan routes from Timbuktu to Marrakech. Today, this UNESCO World Heritage site is one of the best-preserved examples of earthen Berber architecture in North Africa and a famous filming location for movies like Gladiator.</p>
                       <p>The drive is long but you traverse the breathtaking Tizi n’Tichka Pass through the High Atlas Mountains. The best time of year to visit is spring or autumn when the weather is mild, as the mud-brick village offers little shade in the scorching summer heat. Arrive early in the morning to beat the large tour bus crowds.</p>
                       <p><strong>Practical Info:</strong> Entry to the village is technically free, though some families still living in the kasbahs may ask for a small tip (around 10 MAD) to pass through their homes for better viewpoints. Wear comfortable, grippy walking shoes, as you will be climbing steep, uneven dirt and stone paths. <em>Local Tip:</em> Climb all the way to the granary at the top of the hill for the most spectacular panoramic view of the valley and surrounding mountains.</p>
                       <p><strong>Pros for Ait Benhaddou:</strong><br>
                       - Stunning scenery, perfect for photographers and history lovers.<br>
                       - Fascinating insight into Morocco’s desert trading past.<br>
                       <strong>Cons:</strong> The drive is long with hours on winding mountain roads.</p>`
                    : `<p>Aït Benhaddou était autrefois une étape florissante sur les anciennes routes caravanières reliant Tombouctou à Marrakech. Ce site classé au patrimoine mondial de l'UNESCO est l'un des exemples les mieux préservés d'architecture berbère en terre crue.</p>
                       <img src="/img/Ait%20Benhaddou.jpg" alt="Kasbah Ait Benhaddou" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Le trajet est long mais vous traversez le col de Tizi n'Tichka offrant des vues panoramiques sur l'Atlas. Vous découvrirez également Ouarzazate, la porte du Sahara et ses célèbres studios de cinéma. C'est une étape incontournable de tout <a href="/\${isEn ? 'en' : 'fr'}/blog/morocco-itinerary-5-days" style="color:var(--primary); font-weight:600;">circuit dans le sud marocain</a>.</p>
                       <p><strong>Les avantages :</strong> Paysages spectaculaires, riche passé historique, studios de cinéma.<br><strong>Les inconvénients :</strong> Beaucoup de route de montagne sinueuse.</p>`
            },
            {
                id: "essaouira",
                title: isEn ? "3. Essaouira : Seaside Charm & Fresh Seafood" : "3. Essaouira : Charme côtier et fruits de mer",
                content: isEn
                    ? `<p><strong>Where:</strong> Atlantic Coast, approx. 175km west of Marrakech<br>
                       <strong>Drive Time:</strong> 2.5 to 3 hours each way</p>
                       <img src="/img/Essaouira.webp" alt="Essaouira Coast" loading="eager" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>If the heat of Marrakech gets too much, a <strong>Marrakech to Essaouira day trip</strong> provides the perfect ocean breeze. This charming coastal town features a historic walled medina, a bustling fishing port full of blue boats, and a sweeping beach famous for kitesurfing. It has a much more relaxed, bohemian vibe compared to the bustling red city, making it one of the most refreshing <strong>things to do near Marrakech</strong>.</p>
                       <p>The best season to visit is summer, when the coastal winds provide natural air conditioning against inland heat. However, beware that the strong "Alizée" winds can make sunbathing difficult. On your way there, keep an eye out for local women's cooperatives making Argan oil, and the famous goats climbing Argan trees!</p>
                       <p><strong>Practical Info:</strong> The medina is flat, pedestrian-only, and easily walkable. Bring a light windbreaker jacket year-round, as the coastal breeze is persistent and can get chilly in the late afternoon. <em>Local Tip:</em> Skip the fancy tourist restaurants and head straight to the fish market stalls near the port. You can pick out your fresh catch—shrimp, sardines, or sea bass—and have it grilled right in front of you for a few dirhams.</p>
                       <p><strong>Pros for Essaouira:</strong><br>
                       - Relaxed, breezy alternative to the chaotic city.<br>
                       - Amazing seafood and unique artisanal shopping in the medina.<br>
                       <strong>Cons:</strong> It can be very windy, which isn't ideal for a traditional beach day.</p>`
                    : `<p>Si la chaleur de Marrakech devient trop forte, la brise océanique d'Essaouira est parfaite. Cette charmante ville côtière possède une médina historique fortifiée, un port de pêche animé rempli de barques bleues et une grande plage célèbre pour le kitesurf. L'ambiance y est beaucoup plus détendue et bohème. Lisez notre guide sur <a href="/\${isEn ? 'en' : 'fr'}/blog/how-to-get-from-marrakech-to-essaouira" style="color:var(--primary); font-weight:600;">comment se rendre à Essaouira</a>.</p>
                       <img src="/img/Essaouira.webp" alt="Port d'Essaouira" loading="eager" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>Sur la route, vous pourrez vous arrêter dans une coopérative d'huile d'argan et déguster d'excellents fruits de mer une fois sur place.</p>`
            },
            {
                id: "ouzoud-waterfalls",
                title: isEn ? "4. Ouzoud Waterfalls : Nature, Views & Barbary Monkeys" : "4. Cascades d'Ouzoud : Nature, vues et macaques de Barbarie",
                content: isEn
                    ? `<p><strong>Where:</strong> Middle Atlas Mountains, approx. 150km northeast of Marrakech<br>
                       <strong>Drive Time:</strong> 2.5 hours each way</p>
                       <img src="/img/ouzoud%20waterfalls.jpg" alt="Ouzoud Waterfalls" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>The <strong>Ouzoud Waterfalls from Marrakech</strong> plunge 110 meters down rugged cliffs, making them the highest and most spectacular falls in North Africa. A day trip here involves a scenic hike down to the base of the falls where you can take a small boat ride close to the cascading water. The area is also home to wild Barbary macaques who roam freely around the trees. It’s a fantastic escape into lush nature and a refreshing change from the dry city landscapes.</p>
                       <p>Spring (March to May) is undoubtedly the best time to visit, as the melting snow from the Atlas Mountains swells the river, making the waterfalls dramatically powerful. Summer is also popular for locals seeking a cool retreat, though the trails can become quite crowded.</p>
                       <p><strong>Practical Info:</strong> Entry to the falls is free, but the optional boat ride near the base costs around 20 MAD. Wear sturdy sneakers, as the dirt paths down to the bottom are steep, slippery, and sometimes muddy. You'll be doing a fair bit of hiking! <em>Local Tip:</em> While the monkeys are adorable and used to humans, keep your distance and secure your belongings. If you eat at one of the riverside tagine cafes, try to grab a table with a direct view of the lower pools for the best atmosphere.</p>
                       <p><strong>Pros for Ouzoud:</strong><br>
                       - Incredible natural beauty and the chance to see wild monkeys.<br>
                       - Great hiking and photo opportunities.<br>
                       <strong>Cons:</strong> The walk back up the stairs is steep and tiring.</p>`
                    : `<p>Les cascades d'Ouzoud plongent de 110 mètres le long de falaises escarpées, ce qui en fait les chutes les plus hautes d'Afrique du Nord. L'excursion comprend une belle randonnée jusqu'au pied des cascades où vous pouvez faire une promenade en barque.</p>
                       <img src="/img/ouzoud%20waterfalls.jpg" alt="Cascades d'Ouzoud" style="width:100%; max-height:450px; object-fit:cover; border-radius:12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                       <p>La région abrite également des macaques de Barbarie sauvages que l'on peut facilement observer. C'est une fantastique évasion dans une nature luxuriante.</p>`
            },
            {
                id: "best-time",
                title: isEn ? "Best Time of Year for Day Trips from Marrakech" : "La meilleure période de l'année pour les excursions",
                content: isEn
                    ? `<p>Choosing the right season can significantly impact your experience on these <strong>Marrakech excursions</strong>. Here is a quick seasonal breakdown:</p>
                       <ul>
                         <li><strong>Spring (March–May):</strong> This is the ideal weather window for almost any day trip. The temperatures are warm but not overwhelming. It's especially the best time for the Ouzoud Waterfalls, where the water flow is strongest and the surrounding valleys are blooming with wildflowers.</li>
                         <li><strong>Summer (June–August):</strong> Expect a severe heat warning for inland destinations like Ait Benhaddou and Agafay, where temperatures often exceed 40°C (104°F). During these months, Essaouira is your best option, as the Atlantic breeze keeps the coastal town pleasantly cool.</li>
                         <li><strong>Autumn (September–November):</strong> Arguably the best overall season. The summer heat subsides, making it perfect for an Agafay Desert day trip to enjoy spectacular, clear sunsets and comfortable stargazing temperatures.</li>
                         <li><strong>Winter (December–February):</strong> While Marrakech stays relatively mild, the Atlas Mountains get very cold and snowy. However, this is a great time to visit Ait Benhaddou as the crowds thin out significantly, giving you a quieter experience, provided you dress warmly for the drive.</li>
                       </ul>`
                    : `<p>Le choix de la saison peut grandement influencer votre expérience. Voici un aperçu :</p>
                       <ul>
                         <li><strong>Printemps :</strong> Températures idéales, parfait pour les cascades d'Ouzoud.</li>
                         <li><strong>Été :</strong> Très chaud à l'intérieur des terres, privilégiez Essaouira pour sa brise fraîche.</li>
                         <li><strong>Automne :</strong> La meilleure saison globale, idéale pour le désert d'Agafay.</li>
                         <li><strong>Hiver :</strong> Froid dans les montagnes, mais parfait pour visiter Ait Benhaddou sans la foule.</li>
                       </ul>`
            },
            {
                id: "sahara-desert",
                title: isEn ? "5. The Ultimate Addition: The Sahara Desert" : "5. L'Incontournable : Le Désert du Sahara",
                content: isEn
                    ? `<p>While day trips are fantastic, no trip to Morocco is complete without spending a night under the stars in the Sahara Desert. Unlike the rocky Agafay, the Sahara offers towering golden dunes like Erg Chebbi in Merzouga.</p>
                       <p>Because the Sahara is an 8+ hour drive from Marrakech, it cannot be done in a single day. We highly recommend reading our complete guide on planning a <a href="/\${isEn ? 'en' : 'fr'}/blog/sahara-desert-tour-plan" style="color:var(--primary); font-weight:600;">Sahara Desert Tour</a> to see how you can fit it into a multi-day trip. It is one of our most requested and highest-rated experiences!</p>`
                    : `<p>Bien que les excursions d'une journée soient fantastiques, aucun voyage au Maroc n'est complet sans une nuit sous les étoiles dans le désert du Sahara.</p>
                       <p>Le Sahara étant à plus de 8 heures de route de Marrakech, cela ne peut pas être fait en une journée. Lisez notre guide complet sur la planification d'un <a href="/\${isEn ? 'en' : 'fr'}/blog/sahara-desert-tour-plan" style="color:var(--primary); font-weight:600;">circuit dans le désert du Sahara</a>.</p>`
            },
            {
                id: "cta-mid",
                title: isEn ? "Book Your Marrakech Day Trip" : "Réservez Votre Excursion depuis Marrakech",
                content: isEn 
                    ? `<p>Ready to explore beyond the red city? Browse our curated day trips and secure your spot today for a seamless, unforgettable experience.</p>` 
                    : `<p>Prêt à explorer les environs de la ville rouge ? Découvrez nos excursions d'une journée et réservez dès aujourd'hui pour une expérience inoubliable.</p>`,
                isCallToAction: true,
                ctaType: 'internal',
                ctaLink: `/tours/marrakech-day-trip`,
                ctaText: isEn ? "View Marrakech Day Trips" : "Voir les Excursions"
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Travel Guides" : "Guides de Voyage",
            date: "June 14, 2026",
            image: "/img/marrakech.jpg",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "What is the best day trip from Marrakech?" : "Quelle est la meilleure excursion depuis Marrakech ?",
                    a: isEn
                        ? "The best day trip from Marrakech depends entirely on what you want to experience. For ocean breezes and seafood, head to Essaouira. If you want dramatic history and architecture, Ait Benhaddou is unmatched. For nature and wildlife, the Ouzoud Waterfalls are spectacular. If you're short on time but want a taste of the desert, the Agafay Desert is the perfect quick escape."
                        : "Cela dépend de vos envies ! Pour l'histoire, choisissez Ait Benhaddou. Pour la mer, Essaouira. Pour le désert, Agafay, et pour la nature, les cascades d'Ouzoud."
                },
                {
                    q: isEn ? "Can you do Ait Benhaddou as a day trip from Marrakech?" : "Peut-on visiter Ait Benhaddou en une journée depuis Marrakech ?",
                    a: isEn
                        ? "Yes, you can do Ait Benhaddou as a day trip from Marrakech, but prepare for a long day. The journey takes about 3.5 to 4 hours each way, winding through the High Atlas Mountains. Hiring a private driver makes the trip much more comfortable, allowing you to stop for photos and rest without the rigid schedule of a large tour bus."
                        : "Oui, c'est possible mais préparez-vous à une longue journée. Le trajet dure environ 3,5 heures dans chaque sens à travers les montagnes de l'Atlas."
                },
                {
                    q: isEn ? "Is Essaouira worth a day trip from Marrakech?" : "Essaouira vaut-elle une excursion d'une journée ?",
                    a: isEn
                        ? "Absolutely! Essaouira is highly worth a day trip from Marrakech, especially if you need a break from the city's intense heat and chaotic medina. The 2.5-hour drive is straightforward, and the town offers a refreshing coastal breeze, fantastic fresh seafood, and a much more relaxed, walkable, and bohemian atmosphere."
                        : "Absolument ! Essaouira vaut vraiment le détour, surtout si vous avez besoin d'une pause loin de la chaleur de la ville. L'ambiance y est très détendue."
                },
                {
                    q: isEn ? "What is the best day trip from Marrakech for families?" : "Quelle est la meilleure excursion pour les familles ?",
                    a: isEn
                        ? "For families, the Agafay Desert and Ouzoud Waterfalls are excellent choices. Agafay requires only a short 45-minute drive, offering fun camel rides and open spaces for kids without exhaustion. Ouzoud Waterfalls features wild monkeys and boat rides, keeping children entertained. Ait Benhaddou’s long, winding mountain drive might be too taxing for young children."
                        : "Pour les familles, le désert d'Agafay et les cascades d'Ouzoud sont d'excellents choix. Le trajet vers Agafay est très court et amusant pour les enfants."
                },
                {
                    q: isEn ? "How much does a day trip from Marrakech cost?" : "Combien coûte une excursion depuis Marrakech ?",
                    a: isEn
                        ? "The cost of a day trip from Marrakech varies widely. Shared group bus tours can start as low as €25-€40 per person. However, hiring a private driver for a customized, comfortable experience usually ranges from €100 to €180 for the entire vehicle, making it highly cost-effective and much more relaxing for couples and families."
                        : "Le coût varie. Les visites de groupe en bus commencent autour de 30€. Un chauffeur privé coûte généralement entre 100€ et 180€ par véhicule."
                },
                {
                    q: isEn ? "Do I need a guide for day trips from Marrakech, or can I go independently?" : "Ai-je besoin d'un guide ou puis-je y aller seul ?",
                    a: isEn
                        ? "You can visit most destinations independently. In Essaouira and Ouzoud, you can easily walk around without a guide. At Ait Benhaddou, local guides offer interesting historical context but aren't mandatory. The main challenge is transportation; hiring a private transfer is often the best balance, giving you reliable transport while letting you explore freely upon arrival."
                        : "Vous pouvez visiter la plupart des destinations seul. Le principal défi est le transport ; louer un transfert privé est souvent le meilleur équilibre."
                }
            ],
            relatedSlugs: ["marrakech-travel-guide", "private-driver-morocco-guide"]
        };
    }

    return null;
}

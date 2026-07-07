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

    // 4. PRIVATE DRIVER PAGES
    const driverSlugs = [
        "hire-a-driver-in-morocco", "private-chauffeur-morocco", "luxury-driver-morocco",
        "english-speaking-driver-morocco", "driver-guide-morocco", "driver-for-morocco-itinerary", "driver-for-sahara-desert-tour"
    ];
    if (driverSlugs.includes(slug)) {
        const title = isEn
            ? `Private Driver in Morocco: Hire a Licensed Chauffeur & Guide`
            : `Chauffeur Privé au Maroc : Louer une Voiture avec Chauffeur`;
        
        const excerpt = isEn
            ? "Discover how to hire a private driver in Morocco for custom road trips, imperial cities, and Sahara desert expeditions. Licensed drivers, vehicles, and costs."
            : "Guide complet pour louer un véhicule avec chauffeur privé au Maroc. Idéal pour vos circuits sur mesure, voyages d'affaires ou vacances en famille.";

        const sections: ProgrammaticSection[] = [
            {
                id: "intro",
                title: isEn ? "Why Hire a Private Driver in Morocco?" : "Pourquoi faire appel à un Chauffeur Privé au Maroc ?",
                content: isEn
                    ? `<p>Morocco is a beautiful country with diverse landscapes ranging from the Rif mountains to the Sahara dunes. However, driving yourself can be difficult due to aggressive local driving habits, narrow medina gates, and mountain roads. Hiring a private driver with <strong>Mdina Tours</strong> gives you the freedom of a road trip without the stress of navigating, allowing you to enjoy the scenery in comfort.</p>`
                    : `<p>Conduire au Maroc peut être fatiguant en raison de la circulation dense et des routes sinueuses du Haut Atlas. Louer une voiture avec chauffeur privé vous permet de vous détendre et de profiter pleinement des paysages magnifiques en toute sécurité.</p>`
            },
            {
                id: "fleet",
                title: isEn ? "Our Fleet of Vehicles" : "Notre flotte de véhicules",
                content: isEn
                    ? `<p>We offer premium, modern vehicles matching your group size and budget. All cars are licensed, air-conditioned, and fully insured:</p>`
                    : `<p>Nous proposons une gamme de véhicules récents adaptés à la taille de votre groupe :</p>`,
                list: isEn
                    ? [
                        "Premium Sedans (Mercedes E-Class, Peugeot 508) – Perfect for 1-3 passengers",
                        "Spacious Minivans (Mercedes Vito, Hyundai H1) – Perfect for 4-7 passengers",
                        "Comfortable 4x4 Off-Roaders (Toyota Prado) – Recommended for desert routes"
                      ]
                    : [
                        "Berlines confortables – Idéal pour 1 à 3 passagers",
                        "Monospaces et Vans spacieux (Mercedes Vito) – Idéal pour 4 à 7 passagers",
                        "Véhicules 4x4 tout-terrain (Toyota Prado) – Parfaits pour le désert"
                      ]
            },
            {
                id: "cta",
                title: isEn ? "Hire Your Private Driver Today" : "Réservez Votre Chauffeur Privé",
                content: isEn
                    ? `<p>Plan your custom Moroccan itinerary. Contact our Rabat office on WhatsApp to receive a personalized chauffeur quote.</p>`
                    : `<p>Concevez votre itinéraire personnalisé. Contactez notre équipe sur WhatsApp pour obtenir un devis de chauffeur privé.</p>`,
                isCallToAction: true,
                ctaType: 'driver',
                ctaLink: `/private-driver`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Private Driver" : "Chauffeur Privé",
            date: "June 14, 2026",
            image: slug === "luxury-driver-morocco" ? "/img2/premium-chauffeur.jpg" : slug === "driver-for-sahara-desert-tour" ? "/b-roll/activity-sahara-camel-riding-broll.webp" : "/img2/private-vito-vans-3.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Are drivers licensed and insured?" : "Les chauffeurs sont-ils déclarés et assurés ?",
                    a: isEn
                        ? "Yes. All our drivers hold professional transport licenses and all vehicles are fully commercial insured."
                        : "Oui, absolument. Tous nos chauffeurs disposent de cartes professionnelles de transport touristique et nos véhicules possèdent des assurances complètes."
                }
            ],
            relatedSlugs: ["private-driver", "morocco-itinerary-7-days"]
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

    // 7. CRUISE TOURISM PAGES
    const cruiseSlugs = [
        "tangier-shore-excursions", "casablanca-shore-excursions",
        "best-day-trips-from-tangier-port", "best-day-trips-from-casablanca-port"
    ];
    if (cruiseSlugs.includes(slug)) {
        const portCity = slug.includes("tangier") ? (isEn ? "Tangier" : "Tanger") : "Casablanca";
        
        const title = isEn
            ? `${portCity} Shore Excursions: Private Port Day Trips`
            : `Excursions d'Escale à ${portCity} : Circuits Privés depuis le Port`;
        
        const excerpt = isEn
            ? `Premium private shore excursions from ${portCity} Port. We offer dedicated English-speaking drivers, and a guaranteed back-to-ship policy.`
            : `Circuits privés d'une journée pour les croisiéristes au port de ${portCity}. Chauffeurs bilingues et garantie de retour au navire à l'heure.`;

        const sections: ProgrammaticSection[] = [
            {
                id: "safety-guarantee",
                title: isEn ? "Our Back-To-Ship Timing Guarantee" : "Garantie de retour à l'heure au navire",
                content: isEn
                    ? `<p>As a cruise traveler, your primary concern is returning to the dock before your ship departs. We understand this constraint. Mdina Tours offers a <strong>Strict Back-To-Ship Guarantee</strong>: we plan all itineraries to return you to the port terminal gates at least 1 hour before all boarding times, ensuring a worry-free day of exploration.</p>`
                    : `<p>Pour les croisiéristes, la ponctualité est indispensable. Nous garantissons un retour au port d'embarquement au moins 1 heure avant le départ du navire, pour une excursion en toute tranquillité d'esprit.</p>`
            },
            {
                id: "excursion-options",
                title: isEn ? "Popular Shore Excursion Itineraries" : "Nos itinéraires d'excursion populaires",
                content: isEn
                    ? `<p>Depending on your port duration, you can choose from these private excursions:</p>
                       <ul>
                         <li><strong>${portCity} Medina & Kasbah Tour</strong> (4-5 hours) – Perfect for short port stops.</li>
                         <li><strong>Day Trip to Chefchaouen (The Blue City)</strong> (8-9 hours) – Available from Tangier Port.</li>
                         <li><strong>Day Trip to Rabat Capital</strong> (7-8 hours) – Available from Casablanca Port.</li>
                       </ul>`
                    : `<p>Selon la durée de votre escale, plusieurs choix s'offrent à vous :</p>
                       <ul>
                         <li><strong>Visite de la ville et de la médina</strong> (4-5 heures) – Idéal pour les escales courtes.</li>
                         <li><strong>Excursion à Chefchaouen</strong> (8-9 heures) – Au départ du port de Tanger.</li>
                         <li><strong>Excursion à Rabat</strong> (7-8 heures) – Au départ du port de Casablanca.</li>
                       </ul>`
            },
            {
                id: "cta",
                title: isEn ? "Reserve Your Shore Excursion" : "Réservez Votre Excursion d'Escale",
                content: isEn
                    ? `<p>Provide your ship name, arrival time, and boarding time. Contact us on WhatsApp to reserve your private chauffeur.</p>`
                    : `<p>Indiquez-nous le nom de votre navire et vos horaires. Réservez votre chauffeur privé d'escale sur WhatsApp.</p>`,
                isCallToAction: true,
                ctaType: 'general',
                ctaLink: `/contact`
            }
        ];

        return {
            slug, title, excerpt,
            category: isEn ? "Shore Excursions" : "Escales Croisières",
            date: "June 14, 2026",
            image: portCity === "Tangier" ? "/img2/tangier_hero.webp" : "/img2/casablanca_MOSQUE.webp",
            seoTitle: isEn ? `${title} | Mdina Tours` : `${title} | Mdina Tours`,
            seoDesc: excerpt,
            tableOfContents: sections.map(s => ({ id: s.id, text: s.title })),
            sections,
            faqs: [
                {
                    q: isEn ? "Where does the driver pick us up?" : "Où se fait la prise en charge au port ?",
                    a: isEn
                        ? "Your driver will meet you directly at the cruise passenger exit terminal, holding a sign displaying your name."
                        : "Votre chauffeur vous attendra directement à la sortie voyageurs du port, muni d'une pancarte à votre nom."
                }
            ],
            relatedSlugs: [`tangier-travel-guide`, `casablanca-travel-guide`]
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

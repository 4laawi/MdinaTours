export interface TransferFAQ {
    q: string;
    a: string;
}

export interface SightseeingStop {
    name: string;
    image: string;
}

export interface TaxiComparisonPoint {
    feature: string;
    privateTransfer: string;
    streetTaxi: string;
}

export interface TaxiComparisonData {
    badge?: string;
    heading: string;
    subheading: string;
    summary?: string;
    points: TaxiComparisonPoint[];
}

export interface FixedPriceRow {
    destination: string;
    distance: string;
    duration: string;
    sedanPrice: string;
    vanPrice: string;
    popular?: boolean;
}

export interface FixedPriceTableData {
    badge?: string;
    heading: string;
    subheading: string;
    note?: string;
    rows: FixedPriceRow[];
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
    taxiComparison?: TaxiComparisonData;
    fixedPriceTable?: FixedPriceTableData;
}

export interface TransferData {
    slug: string;
    image: string;
    prices: { [passengers: number]: number };
    en: LocalizedTransferData;
    fr: LocalizedTransferData;
    es?: LocalizedTransferData;
}

export const transfersData: TransferData[] = [
    {
        slug: "casablanca-airport-transfer",
        image: "/img3/tourists-happy-private-driver-casablanca.webp",
        prices: { 3: 35, 4: 50, 5: 65, 7: 85 },
        en: {
            title: "Casablanca Airport Transfer & Private Taxi Service (CMN)",
            tagline: "Fixed-Rate Chauffeur Service from Mohammed V Airport to Casablanca, Rabat & Marrakech",
            pickup: "Casablanca Mohammed V International Airport (CMN)",
            dropoff: "Casablanca City Center, Rabat, Marrakech, or Mohammedia",
            distance: "32 km (Casablanca) / 120 km (Rabat) / 240 km (Marrakech)",
            duration: "40 mins (Casablanca) / 1h 30m (Rabat) / 2h 45m (Marrakech)",
            capacityText: "Executive Sedans (1-3 pax), Spacious Luxury Vans (up to 7 pax)",
            highlights: [
                "Terminal 1 & 2 Meet & Greet: Chauffeur waits inside the terminal holding a personalized sign with your name.",
                "Live CMN Flight Tracking: Automatic schedule synchronization with 60 minutes free wait time if your flight is delayed.",
                "Guaranteed Fixed Fares: Transparent pricing per vehicle with zero night surcharges, baggage fees, or highway toll extras.",
                "Direct Highway Transit: Travel comfortably to Rabat or Marrakech without changing trains or negotiating street taxis.",
                "Pristine Executive Fleet: Climate-controlled Mercedes-Benz Vitos & executive sedans with complimentary child seats."
            ],
            aboutRoute: "Casablanca Mohammed V International Airport (CMN) is Morocco's busiest air transport hub, situated 32 kilometers south of Casablanca and 120 kilometers from Rabat. After international flights, facing crowded grand taxi ranks with unmetered fare disputes or navigating train schedules can be exhausting. Our private transfer provides a seamless, pre-arranged chauffeur greeting you inside the terminal with immediate highway departure.",
            taxiComparison: {
                badge: "Taxi vs Private Chauffeur",
                heading: "Casablanca Airport Taxi vs. Mdina Tours Private Transfer: Why Pre-Booking Wins",
                subheading: "Navigating Mohammed V Airport (CMN) street taxis can be daunting. See why thousands of international travelers pre-book our private chauffeur service instead.",
                summary: "Pre-booking your Casablanca airport transfer gives you guaranteed flat rates, automated flight delay tracking, and direct door-to-door transit to Casablanca, Rabat, or Marrakech.",
                points: [
                    {
                        feature: "Transparent Flat Rates",
                        privateTransfer: "Pre-confirmed flat rates from €35 (~380 MAD) to Casablanca and €75 (~820 MAD) to Rabat. Highway tolls and luggage included. Zero surprise surcharges.",
                        streetTaxi: "Frequent refusal of meters. Drivers routinely demand 350–500 MAD into downtown Casablanca, with 50% night surcharges and luggage extras."
                    },
                    {
                        feature: "Terminal Arrivals Pickup",
                        privateTransfer: "Professional chauffeur waiting inside Terminal 1 or 2 arrivals hall immediately past customs with your name sign. Includes 60 min free waiting time.",
                        streetTaxi: "Exiting into crowded outdoor curbside lines with aggressive solicitation from unofficial taxi hustlers."
                    },
                    {
                        feature: "Direct Intercity Connections",
                        privateTransfer: "Seamless highway express transit directly to Rabat, Marrakech, or Fes without train station transfers or schedule restrictions.",
                        streetTaxi: "City grand taxis are legally restricted from leaving Casablanca province without special permits, making intercity trips problematic."
                    },
                    {
                        feature: "Vehicle Standard & Luggage",
                        privateTransfer: "Immaculate Mercedes-Benz Vitos and executive sedans with spacious, secure enclosed trunks and dual climate control.",
                        streetTaxi: "Older standard sedans with luggage strapped to roof racks, exposed to exhaust fumes, weather, and traffic."
                    },
                    {
                        feature: "Payment Convenience",
                        privateTransfer: "Pay upon arrival in EUR or MAD cash, or pay securely online in advance. Exact change is never an issue.",
                        streetTaxi: "Cash only in exact Moroccan Dirhams. Drivers frequently claim they do not have change for 100 or 200 MAD banknotes."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Featured Snippet Fixed Rates",
                heading: "Casablanca Airport Taxi Rates & Fixed Price Directory (CMN)",
                subheading: "Official fixed fares per vehicle (not per passenger). Valid 24/7 with zero nighttime surcharges.",
                note: "All fares include terminal meet & greet, 60 minutes free wait time, flight delay tracking, and highway toll charges.",
                rows: [
                    { destination: "Casablanca Downtown (Maarif, Hassan II Mosque, Habous)", distance: "32 km", duration: "40 min", sedanPrice: "€35 (~380 MAD)", vanPrice: "€50 (~550 MAD)", popular: true },
                    { destination: "Ain Diab & Corniche (Beachfront Resorts & Hotels)", distance: "38 km", duration: "45 min", sedanPrice: "€40 (~440 MAD)", vanPrice: "€55 (~600 MAD)", popular: true },
                    { destination: "Rabat City & Salé (Agdal, Hassan Tower, Medina)", distance: "120 km", duration: "1h 30m", sedanPrice: "€75 (~820 MAD)", vanPrice: "€110 (~1,200 MAD)", popular: true },
                    { destination: "Mohammedia (Coastal City & Marina)", distance: "55 km", duration: "50 min", sedanPrice: "€45 (~490 MAD)", vanPrice: "€65 (~710 MAD)" },
                    { destination: "Marrakech City (Direct Highway Transfer)", distance: "240 km", duration: "2h 45m", sedanPrice: "€140 (~1,500 MAD)", vanPrice: "€180 (~1,950 MAD)", popular: true },
                    { destination: "Fes Medina (Imperial City Express)", distance: "320 km", duration: "3h 30m", sedanPrice: "€160 (~1,750 MAD)", vanPrice: "€210 (~2,300 MAD)" }
                ]
            },
            faqs: [
                { q: "Where do I meet my driver at Casablanca Mohammed V Airport (CMN)?", a: "Once you collect your baggage and clear customs, walk into the main arrivals hall of Terminal 1 or Terminal 2. Your chauffeur will be waiting inside the terminal holding a personalized greeting board with your name clearly displayed. We monitor live flight radar, so even if your flight is delayed, your driver will be waiting." },
                { q: "What is the cost of a private taxi from Casablanca Airport to Casablanca city center?", a: "A private transfer from Casablanca Airport (CMN) to downtown Casablanca is a guaranteed flat rate of €35 (~380 MAD) for an executive sedan (1–3 passengers) or €50 (~550 MAD) for a luxury minivan (up to 7 passengers), with all taxes and tolls included." },
                { q: "How much is a private transfer from Casablanca Airport to Rabat?", a: "Our private transfer from Casablanca Airport to Rabat starts at a locked flat rate of €75 (~820 MAD) for an executive sedan or €110 (~1,200 MAD) for a luxury minivan. The journey takes approximately 1 hour and 30 minutes via the A1 coastal expressway." },
                { q: "Is ride-sharing like Uber available at Casablanca Airport?", a: "Uber does not operate in Morocco. While local transport apps exist within urban Casablanca, they face strict licensing regulations and are legally prohibited from picking up passengers inside airport terminal grounds. Pre-booking a licensed private chauffeur is the safest and most reliable way to secure an authorized ride." },
                { q: "How does flight delay tracking work?", a: "We ask for your flight number during reservation to track your aircraft in real time. If your arrival is delayed or lands early, your driver's schedule updates automatically, with 60 minutes of complimentary wait time after landing." },
                { q: "Can I book a transfer from Casablanca Airport directly to Marrakech?", a: "Yes. Many international travelers prefer our direct highway transfer from CMN Airport to Marrakech (€140 flat rate), saving hours compared to traveling into downtown Casablanca to catch a train." },
                { q: "Do your drivers speak English?", a: "Yes, all our drivers are experienced, professional chauffeurs fluent in English, French, and Arabic." }
            ],
            seoTitle: "Casablanca Airport Transfer & Private Taxi (CMN) | Fixed Rates",
            seoDesc: "Pre-book your private Casablanca Airport transfer (CMN) from €35. Fixed rates to Casablanca hotels, Rabat & Marrakech. Terminal meet & greet with 60-min free wait."
        },
        fr: {
            title: "Transfert Aéroport Casablanca Mohammed V (CMN) & Taxi Privé",
            tagline: "Tarifs Fixes Garantis et Chauffeur Dédié vers Casablanca, Rabat et Marrakech",
            pickup: "Aéroport International Mohammed V de Casablanca (CMN)",
            dropoff: "Centre-ville de Casablanca, Rabat, Marrakech ou Mohammedia",
            distance: "32 km (Casablanca) / 120 km (Rabat) / 240 km (Marrakech)",
            duration: "40 min (Casablanca) / 1h 30m (Rabat) / 2h 45m (Marrakech)",
            capacityText: "Berlines Exécutives (1-3 passagers) et Vans VIP (jusqu'à 7 passagers)",
            highlights: [
                "Accueil dans le terminal : Chauffeur privé avec pancarte nominative à la sortie des douanes des Terminaux 1 et 2.",
                "Suivi des vols CMN en temps réel : Réajustement automatique de l'heure avec 60 minutes d'attente gratuite offerte.",
                "Tarifs forfaitaires garantis : Prix ferme par véhicule sans surcoût de nuit, frais de péage ni supplément bagages.",
                "Liaison autoroutière directe : Trajet sans escale vers Rabat ou Marrakech sans passer par la gare ferroviaire.",
                "Flotte Mercedes et berlines d'exception : Véhicules soignés et climatisés avec sièges bébé offerts sur demande."
            ],
            aboutRoute: "L'Aéroport Mohammed V (CMN) est la principale porte d'entrée aérienne du Maroc, situé à 32 km au sud de Casablanca et à 120 km de Rabat. À votre arrivée, éviter les files de taxis collectifs et les prix non régulés est essentiel pour débuter votre séjour sereinement. Notre service de chauffeur privé vous prend en charge directement dans le terminal.",
            taxiComparison: {
                badge: "Taxi vs Transfert Privé",
                heading: "Taxi Aéroport Casablanca vs Transfert Privé Mdina Tours : Le Comparatif",
                subheading: "Prendre un taxi à l'Aéroport Mohammed V peut être déroutant. Découvrez pourquoi des milliers de voyageurs préfèrent réserver leur chauffeur privé à l'avance.",
                summary: "Pré-réserver votre transfert CMN vous assure un tarif fixe sans négociation, un accueil chaleureux dès la sortie des douanes et un trajet direct vers votre hôtel.",
                points: [
                    {
                        feature: "Tarifs Fixes & Clairs",
                        privateTransfer: "Tarif forfaitaire dès 35€ (~380 MAD) pour Casablanca et 75€ (~820 MAD) pour Rabat. Péages, bagages et taxes inclus sans supplément de nuit.",
                        streetTaxi: "Compteurs rarement allumés. Les chauffeurs réclament souvent 350 à 500 MAD pour Casablanca, avec majoration nocturne de 50%."
                    },
                    {
                        feature: "Accueil au Terminal",
                        privateTransfer: "Chauffeur professionnel vous attendant dans le hall des arrivées avec pancarte nominative. 60 minutes d'attente offerte et suivi de vol.",
                        streetTaxi: "File d'attente extérieure sur le trottoir sous la sollicitation d'intermédiaires non officiels."
                    },
                    {
                        feature: "Liaisons Intervilles Directes",
                        privateTransfer: "Départ immédiat sur autoroute vers Rabat, Marrakech ou Fès sans changement de véhicule ni correspondance de train.",
                        streetTaxi: "Les grands taxis locaux sont soumis à des restrictions préfectorales strictes hors de leur zone et refusent souvent les longs trajets."
                    },
                    {
                        feature: "Confort & Bagages",
                        privateTransfer: "Vans Mercedes-Benz Vito et berlines récentes avec coffres spacieux et fermés. Climatisation garantie.",
                        streetTaxi: "Véhicules plus anciens avec bagages attachés sur le toit, exposés à la poussière et aux intempéries."
                    },
                    {
                        feature: "Paiement Simplifié",
                        privateTransfer: "Paiement à l'arrivée en Euros ou Dirhams, ou paiement sécurisé en ligne. Aucun souci de rendu de monnaie.",
                        streetTaxi: "Uniquement en espèces en Dirhams exacts. Les chauffeurs manquent fréquemment de petite monnaie."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Tarifs Forfaitaires CMN",
                heading: "Grille Tarifaire des Taxis & Transferts Aéroport Casablanca (CMN)",
                subheading: "Tarifs fixes par véhicule (et non par passager). Valables 24h/24 sans supplément nuit.",
                note: "Tous nos tarifs incluent l'accueil personnalisé dans le terminal, 60 min d'attente offerte, suivi de vol et péages.",
                rows: [
                    { destination: "Centre-ville Casablanca (Maarif, Mosquée Hassan II, Gauthier)", distance: "32 km", duration: "40 min", sedanPrice: "35€ (~380 MAD)", vanPrice: "50€ (~550 MAD)", popular: true },
                    { destination: "Aïn Diab & La Corniche (Hôtels balnéaires)", distance: "38 km", duration: "45 min", sedanPrice: "40€ (~440 MAD)", vanPrice: "55€ (~600 MAD)", popular: true },
                    { destination: "Rabat Ville & Salé (Agdal, Tour Hassan, Médina)", distance: "120 km", duration: "1h 30m", sedanPrice: "75€ (~820 MAD)", vanPrice: "110€ (~1 200 MAD)", popular: true },
                    { destination: "Mohammedia (Marina & Ville côtière)", distance: "55 km", duration: "50 min", sedanPrice: "45€ (~490 MAD)", vanPrice: "65€ (~710 MAD)" },
                    { destination: "Marrakech Ville (Liaison directe par autoroute)", distance: "240 km", duration: "2h 45m", sedanPrice: "140€ (~1 500 MAD)", vanPrice: "180€ (~1 950 MAD)", popular: true },
                    { destination: "Fès Médina (Liaison express)", distance: "320 km", duration: "3h 30m", sedanPrice: "160€ (~1 750 MAD)", vanPrice: "210€ (~2 300 MAD)" }
                ]
            },
            faqs: [
                { q: "Où m'attend mon chauffeur à l'aéroport de Casablanca (CMN) ?", a: "Après avoir récupéré vos bagages et franchi les douanes, entrez dans le hall principal des arrivées du Terminal 1 ou 2. Votre chauffeur privé s'y tiendra avec une pancarte à votre nom. Grâce au suivi en direct des arrivées, il s'adapte sans surcoût à tout retard éventuel de votre avion." },
                { q: "Combien coûte un taxi entre l'aéroport de Casablanca et le centre-ville ?", a: "Le transfert privé depuis l'aéroport CMN jusqu'au centre de Casablanca est proposé au tarif fixe garanti de 35€ (~380 MAD) pour une berline (1-3 personnes) et 50€ (~550 MAD) pour un van spacieux (jusqu'à 7 personnes), péages et bagages inclus." },
                { q: "Quel est le tarif d'un transfert de l'aéroport de Casablanca à Rabat ?", a: "Notre transfert aéroport Casablanca vers Rabat est à tarif fixe de 75€ (~820 MAD) en berline et 110€ (~1 200 MAD) en van Mercedes. Le trajet dure environ 1h30 via l'autoroute côtière." },
                { q: "Existe-t-il des services comme Uber à l'aéroport de Casablanca ?", a: "Non, Uber n'opère pas au Maroc. Bien que des applications locales existent en ville, elles sont interdites de prise en charge dans l'enceinte de l'aéroport. Pré-réserver un chauffeur VTC professionnel reste la solution la plus sûre et rapide." },
                { q: "Peut-on réserver un transfert direct de l'aéroport de Casablanca vers Marrakech ?", a: "Oui, de nombreux voyageurs internationaux optent pour notre liaison directe aéroport CMN - Marrakech (forfait 140€), ce qui évite les correspondances fastidieuses en train ou taxi urbain." }
            ],
            seoTitle: "Transfert Aéroport Casablanca CMN Privé & Taxi Rabat | Tarifs Fixes",
            seoDesc: "Réservez votre transfert privé de l'aéroport de Casablanca CMN dès 35€. Tarifs fixes vers Casablanca, Rabat et Marrakech. Accueil en terminal et suivi de vol."
        },
        es: {
            title: "Traslado Aeropuerto Casablanca Mohammed V (CMN) y Taxi Privado",
            tagline: "Tarifas Fijas Garantizadas con Chófer Privado a Casablanca, Rabat y Marrakech",
            pickup: "Aeropuerto Internacional Mohammed V de Casablanca (CMN)",
            dropoff: "Centro de Casablanca, Rabat, Marrakech o Mohammedia",
            distance: "32 km (Casablanca) / 120 km (Rabat) / 240 km (Marrakech)",
            duration: "40 min (Casablanca) / 1h 30m (Rabat) / 2h 45m (Marrakech)",
            capacityText: "Berlinas Ejecutivas (1-3 pax) y Furgonetas VIP (hasta 7 pax)",
            highlights: [
                "Recepción en Terminal 1 y 2: Su chófer le esperará con un cartel a su nombre en el hall de llegadas tras salir de aduanas.",
                "Seguimiento de vuelos CMN en directo: Reajuste automático con 60 minutos de cortesía si su vuelo sufre retraso.",
                "Tarifas fijas todo incluido: Precio cerrado por vehículo sin suplementos nocturnos, costes por maleta ni peajes extra.",
                "Conexión directa por autopista: Viaje directo a Rabat o Marrakech sin pasar por estaciones de tren ni regateos.",
                "Flota moderna Mercedes-Benz: Furgonetas Vito y berlinas impecables con sillas para niños gratis bajo petición."
            ],
            aboutRoute: "El Aeropuerto Mohammed V (CMN) es el principal centro de conexiones de Marruecos, situado a 32 km de Casablanca y a 120 km de Rabat. Evitar las colas exteriores y los regateos con taxis es fundamental para iniciar su estancia cómodamente. Nuestro chófer privado le recibirá puntualmente dentro de la terminal con salida directa por autopista.",
            taxiComparison: {
                badge: "Taxi vs Traslado Privado",
                heading: "Taxi de Aeropuerto en Casablanca vs Traslado Privado Mdina Tours",
                subheading: "Conseguir un taxi en el Aeropuerto Mohammed V puede resultar abrumador. Conozca por qué reservar con antelación su chófer privado es la mejor opción.",
                summary: "Reservar su traslado en Casablanca le asegura precio cerrado sin sorpresas, seguimiento de vuelo y viaje directo a Casablanca, Rabat o Marrakech.",
                points: [
                    {
                        feature: "Precio Fijo y Sin Sorpresas",
                        privateTransfer: "Tarifa cerrada desde 35€ (~380 MAD) a Casablanca y 75€ (~820 MAD) a Rabat con peajes y maletas incluidos. Sin recargos nocturnos.",
                        streetTaxi: "Uso infrecuente de taxímetro. Los taxistas suelen pedir entre 350 y 500 MAD, con un recargo nocturno del 50%."
                    },
                    {
                        feature: "Punto de Encuentro en Terminal",
                        privateTransfer: "Chófer con cartel a su nombre dentro de la terminal de llegadas. 60 minutos de espera de cortesía y seguimiento de vuelo.",
                        streetTaxi: "Largas colas en el exterior de la acera bajo la insistencia de intermediarios."
                    },
                    {
                        feature: "Traslados a Otras Ciudades",
                        privateTransfer: "Viaje directo por autopista hacia Rabat, Marrakech o Fez sin tener que cambiar de transporte ni hacer transbordos.",
                        streetTaxi: "Los taxis locales tienen limitaciones administrativas para salir de la provincia de Casablanca y suelen rechazar trayectos interurbanos."
                    },
                    {
                        feature: "Espacio y Confort",
                        privateTransfer: "Vehículos Mercedes Vito y berlinas ejecutivas con aire acondicionado y maletero cerrado espacioso.",
                        streetTaxi: "Taxis más antiguos con el equipaje atado a la baca en el techo, expuesto a la intemperie."
                    },
                    {
                        feature: "Pago Flexible",
                        privateTransfer: "Pago a la llegada en Euros o Dirhams en efectivo, o pago seguro online por adelantado. Sin problemas de cambio.",
                        streetTaxi: "Solo en efectivo y en Dirhams justos. Habitualmente aducen no tener cambio para billetes grandes."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Tarifas Fijas CMN",
                heading: "Tabla de Precios Fijos Taxi y Traslado Aeropuerto Casablanca (CMN)",
                subheading: "Tarifas cerradas por vehículo completo (no por persona). Válidas 24/7 sin recargos nocturnos.",
                note: "Incluye bienvenida con cartel en la terminal, 60 min de espera gratuita, seguimiento de vuelo y peajes.",
                rows: [
                    { destination: "Centro de Casablanca (Maarif, Mezquita Hassan II, Gauthier)", distance: "32 km", duration: "40 min", sedanPrice: "35€ (~380 MAD)", vanPrice: "50€ (~550 MAD)", popular: true },
                    { destination: "Aïn Diab y La Corniche (Paseo marítimo)", distance: "38 km", duration: "45 min", sedanPrice: "40€ (~440 MAD)", vanPrice: "55€ (~600 MAD)", popular: true },
                    { destination: "Rabat y Salé (Agdal, Torre Hassan, Medina)", distance: "120 km", duration: "1h 30m", sedanPrice: "75€ (~820 MAD)", vanPrice: "110€ (~1.200 MAD)", popular: true },
                    { destination: "Mohammedia (Puerto y Costa)", distance: "55 km", duration: "50 min", sedanPrice: "45€ (~490 MAD)", vanPrice: "65€ (~710 MAD)" },
                    { destination: "Marrakech Ciudad (Traslado directo por autopista)", distance: "240 km", duration: "2h 45m", sedanPrice: "140€ (~1.500 MAD)", vanPrice: "180€ (~1.950 MAD)", popular: true },
                    { destination: "Fez Medina (Liaison exprés)", distance: "320 km", duration: "3h 30m", sedanPrice: "160€ (~1.750 MAD)", vanPrice: "210€ (~2.300 MAD)" }
                ]
            },
            faqs: [
                { q: "¿Dónde me esperará el conductor en el Aeropuerto de Casablanca (CMN)?", a: "Tras recoger el equipaje y pasar el control aduanero, acceda al vestíbulo principal de llegadas de la Terminal 1 o 2. Su chófer le esperará sosteniendo un cartel con su nombre. Gracias al seguimiento de vuelos por radar, se adapta automáticamente a cualquier retraso sin recargos." },
                { q: "¿Cuánto cuesta un taxi desde el aeropuerto de Casablanca al centro de la ciudad?", a: "El traslado privado desde el aeropuerto CMN hasta el centro de Casablanca tiene un precio cerrado garantizado de 35€ (~380 MAD) para berlina (1-3 personas) o 50€ (~550 MAD) para furgoneta espaciosa (hasta 7 personas), con peajes y maletas incluidos." },
                { q: "¿Cuánto cuesta el traslado desde el aeropuerto de Casablanca a Rabat?", a: "Nuestro traslado privado desde el aeropuerto de Casablanca a Rabat tiene una tarifa fija de 75€ (~820 MAD) en berlina y 110€ (~1.200 MAD) en furgoneta. El trayecto dura aproximadamente 1 hora y 30 minutos por autopista." },
                { q: "¿Existe servicio de Uber en el aeropuerto de Casablanca?", a: "No, Uber no opera en Marruecos. Aunque existen aplicaciones locales en la ciudad, tienen prohibido recoger pasajeros dentro del aeropuerto. Reservar un chófer privado oficial con antelación es la opción más segura y eficiente." },
                { q: "¿Se puede reservar un traslado directo desde el aeropuerto de Casablanca a Marrakech?", a: "Sí, es una opción muy solicitada por viajeros internacionales (tarifa fija 140€) para evitar tener que desplazarse a la estación de tren de Casablanca con maletas." }
            ],
            seoTitle: "Traslado Aeropuerto Casablanca CMN Privado | Tarifas Fijas Rabat",
            seoDesc: "Reserve su traslado privado en el Aeropuerto de Casablanca CMN desde 35€. Precios cerrados a Casablanca, Rabat y Marrakech. Chófer con cartel en llegadas."
        }
    },
    {
        slug: "rabat-airport-transfer",
        image: "/img3/aeroport-rabat-sale-mdinatours.webp",
        prices: { 3: 45, 4: 55, 5: 70, 7: 95 },
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
        },
        es: {
            title: "Traslado Privado desde el Aeropuerto de Rabat-Salé (RBA)",
            tagline: "Servicio Rápido y Cómodo de Chófer Privado a su Hotel o Riad en Rabat o Salé",
            pickup: "Aeropuerto Internacional de Rabat-Salé (RBA)",
            dropoff: "Cualquier Hotel o Riad en Rabat o Salé",
            distance: "15 km",
            duration: "25-30 minutos",
            capacityText: "Hasta 7 pasajeros con maletas en berlinas o minivans confortables",
            highlights: [
                "Tarifas Fijas sin Sorpresas: Precio transparente que cubre toda el área urbana de Rabat y Salé.",
                "Recepción Personalizada: Su conductor le esperará en la salida de la terminal con un cartel con su nombre.",
                "Vehículos Climatizados: Flota cuidada, limpia y con aire acondicionado para su total descanso.",
                "Pago a la Llegada: Reserve fácilmente y abone el importe directamente al conductor en efectivo.",
                "Acceso a Riads en la Medina: Coordinación con el riad para facilitarle la llegada en las puertas de acceso a la medina."
            ],
            aboutRoute: "El Aeropuerto de Rabat-Salé (RBA) es el acceso más directo a la capital marroquí. Con nuestro servicio de traslado privado evitará colas y complicaciones con taxis locales. Si se hospeda en la medina histórica, su conductor le dejará en la puerta más cercana y avisará a su riad.",
            faqs: [
                { q: "¿Puede el vehículo dejarme en la puerta de mi riad?", a: "La medina de Rabat es peatonal. Su chófer le dejará en la puerta de acceso más cercana y coordinará con su riad para asistirle con el equipaje." },
                { q: "¿El precio es por persona o por trayecto?", a: "El precio es por vehículo completo para su grupo, no por persona." }
            ],
            seoTitle: "Traslado Aeropuerto Rabat-Salé (RBA) Privado | Mdina Tours",
            seoDesc: "Reserve su traslado privado desde el Aeropuerto de Rabat-Salé (RBA) a su hotel o riad. Chófer profesional, tarifas fijas y sin esperas."
        }
    },
    {
        slug: "tangier-port-transfer",
        image: "/Tangier-Morocco-Photo.webp",
        prices: { 3: 45, 4: 55, 5: 65, 7: 90 },
        en: {
            title: "Tangier Ferry Port Private Transfer (Tanger Ville & Tanger Med)",
            tagline: "Dedicated Private Chauffeur Service Direct from the Ferry Terminal to your Hotel",
            pickup: "Tangier Ferry Port (Tanger Ville Port or Tanger Med)",
            dropoff: "Tangier (City Center, Hotels, Medina)",
            distance: "5 - 45 km",
            duration: "15 - 45 minutes",
            capacityText: "1 to 7 passengers with generous luggage capacity",
            highlights: [
                "Direct meet & greet outside passenger customs at both Tanger Ville and Tanger Med terminals",
                "Ferry arrival tracking across all operators (FRS, Balearia, AML, Trasmediterranea, GNV)",
                "Fixed all-inclusive pricing with zero negotiation and no luggage surcharges (starting from €45 for Tanger Ville)",
                "Modern air-conditioned sedans and spacious minivans for families and small groups",
                "Direct coordination with riad hosts inside the historic Tangier Kasbah and Medina"
            ],
            aboutRoute: "Arriving by ferry from Spain into Tangier is one of the most classic entryways into Morocco. Tanger Ville Port welcomes passenger foot traffic directly into the city from Tarifa (starting from €45), while Tanger Med receives car ferries from Algeciras, Motril, and Barcelona located 45 km east (starting from €75). Onward private transfers to Chefchaouen, Tetouan, and Asilah are also available upon request. Our private transfer ensures a reliable chauffeur is waiting as you disembark, whisking you directly to your accommodation without the hassle of port taxi touts.",
            faqs: [
                { q: "What is the difference between Tanger Ville and Tanger Med?", a: "Tanger Ville is located in downtown Tangier and serves passenger catamarans from Tarifa (Spain). Tanger Med is a deepwater port located 45 km east of Tangier serving large car ferries from Algeciras and Barcelona. We provide private transfers from both ports (from €45 for Tanger Ville, from €75 for Tanger Med)." },
                { q: "Where will my driver meet me at the port?", a: "Your driver will be waiting immediately outside the passenger terminal exit doors after passport control and customs, holding a sign with your name." },
                { q: "What happens if our ferry is delayed?", a: "We monitor ferry timetables and maritime traffic in the Strait of Gibraltar. Your driver automatically adjusts pickup time with no extra waiting charge." },
                { q: "Can we transfer directly from Tangier port to Chefchaouen, Tetouan, or Asilah?", a: "Yes. Direct private transfers from Tanger Ville or Tanger Med to Chefchaouen, Tetouan, Asilah, or Fes are available as separately quoted onward routes. Please request a custom quote during booking." }
            ],
            seoTitle: "Tangier Ferry Port Private Transfer (Tanger Ville & Med) | Mdina Tours",
            seoDesc: "Book a private transfer from Tangier Ferry Ports (Tanger Ville & Tanger Med) to Tangier city. Meet & greet at arrivals, fixed rates from €45, and riad drop-off."
        },
        fr: {
            title: "Transfert Privé Port de Tanger (Tanger Ville et Tanger Med)",
            tagline: "Service de Chauffeur Privé Direct dès la Sortie du Ferry vers votre Hôtel ou Riad",
            pickup: "Port de Tanger (Port de Tanger Ville ou Port Tanger Med)",
            dropoff: "Tanger (Centre-ville, Hôtels, Médina)",
            distance: "5 - 45 km",
            duration: "15 - 45 minutes",
            capacityText: "1 à 7 passagers avec grand coffre pour bagages",
            highlights: [
                "Accueil personnalisé à la sortie des passagers à Tanger Ville et Tanger Med",
                "Suivi en direct des arrivées de ferries (FRS, Balearia, AML, GNV, Trasmediterranea)",
                "Tarifs fixes transparents sans négociation ni supplément bagages (à partir de 45 € pour Tanger Ville)",
                "Véhicules récents et climatisés adaptés aux familles et petits groupes",
                "Coordination avec votre riad dans la Kasbah ou la médina de Tanger"
            ],
            aboutRoute: "L'arrivée en ferry depuis l'Espagne est une traversée emblématique. Que vous arriviez à Tanger Ville (ferry rapide depuis Tarifa, à partir de 45 €) ou à Tanger Med (ferries depuis Algésiras à 45 km, à partir de 75 €), notre chauffeur privé vous accueille dès le débarquement. Des liaisons directes vers Chefchaouen, Tétouan et Asilah sont également disponibles sur devis personnalisé.",
            faqs: [
                { q: "Quelle est la différence entre Tanger Ville et Tanger Med ?", a: "Le port de Tanger Ville se situe au centre-ville de Tanger (liaison Tarifa). Tanger Med est situé à 45 km à l'est (liaisons Algésiras/Barcelone). Nous assurons les transferts depuis ces deux ports (dès 45 € pour Tanger Ville, dès 75 € pour Tanger Med)." },
                { q: "Où m'attend le chauffeur au port ?", a: "Votre chauffeur vous attend dès la sortie du terminal passagers après la douane, muni d'une pancarte à votre nom." },
                { q: "Que se passe-t-il en cas de retard du bateau ?", a: "Nous suivons les horaires maritimes en temps réel. Le chauffeur s'adapte sans aucun frais d'attente supplémentaire." },
                { q: "Peut-on réserver un transfert direct du port vers Chefchaouen, Tétouan ou Asilah ?", a: "Oui, nous proposons des transferts privés directs depuis Tanger Ville ou Tanger Med vers Chefchaouen, Tétouan, Asilah ou Fès sur devis personnalisé." }
            ],
            seoTitle: "Transfert Port de Tanger Ville & Tanger Med Privé | Mdina Tours",
            seoDesc: "Réservez votre navette privée depuis les ports de Tanger Ville et Tanger Med vers Tanger. Accueil personnalisé au débarquement et tarifs fixes dès 45 €."
        },
        es: {
            title: "Traslado Privado Puerto de Tánger Ville y Tánger Med",
            tagline: "Servicio de Chófer Privado desde las Terminales de Ferry de Tánger hacia su Hotel o Riad",
            pickup: "Puerto de Tánger Ville o Puerto Tánger Med (Terminal de Ferries)",
            dropoff: "Tánger (Centro, Hoteles, Médina)",
            distance: "5 - 45 km",
            duration: "15 - 45 minutos",
            capacityText: "De 1 a 7 pasajeros con amplio espacio para equipaje",
            highlights: [
                "Punto de encuentro directo en la salida de pasajeros de Tanger Ville (ferry desde Tarifa) y Tanger Med (ferry desde Algeciras)",
                "Seguimiento en tiempo real de la llegada de su ferry (FRS, Balearia, Africa Morocco Link, Trasmediterranea, GNV)",
                "Precios fijos garantizados sin regateos ni cargos sorpresa (tarifa desde 45 € para Tanger Ville a Tánger ciudad)",
                "Vehículos modernos con aire acondicionado y espacio para equipaje familiar",
                "Coordinación directa y asistencia para el acceso a riads en la medina o Kasbah de Tánger"
            ],
            aboutRoute: "Llegar en ferry desde España es una de las entradas más populares a Marruecos. El Puerto de Tanger Ville recibe los catamaranes rápidos de pasajeros directos desde Tarifa al centro de la ciudad (a partir de 45 €), mientras que Tanger Med recibe los ferries desde Algeciras a 45 km al este (a partir de 75 €). Los traslados directos hacia Chefchaouen, Tetuán y Asilah están disponibles bajo presupuesto personalizado. Nuestro servicio de traslado privado le asegura que un chófer profesional le esté esperando a la salida del barco para llevarle cómodamente a su destino sin esperas ni regateos.",
            faqs: [
                { q: "¿Cuál es la diferencia entre el Puerto de Tanger Ville y Tanger Med?", a: "Tanger Ville se ubica en el centro de Tánger y recibe ferries rápidos de pasajeros desde Tarifa (traslado local desde 45 €). Tanger Med se encuentra a unos 45 km al este y recibe ferries de pasajeros y vehículos procedentes de Algeciras y Barcelona (traslado a Tánger desde 75 €). Ofrecemos traslados privados desde ambos puertos." },
                { q: "¿Dónde me esperará el conductor en el puerto?", a: "A la salida de la terminal de pasajeros, tras pasar aduanas y pasaportes, su chófer le estará esperando con un cartel con su nombre." },
                { q: "¿Qué ocurre si el ferry sufre un retraso por el estado del mar?", a: "Monitoreamos las llegadas de los barcos en el Estrecho de Gibraltar. Su conductor se adaptará a la hora real de desembarque sin ningún coste adicional." },
                { q: "¿Puedo reservar un traslado directo desde el puerto de Tánger a Chefchaouen, Tetuán o Asilah?", a: "Sí, realizamos traslados privados directos desde Tanger Ville o Tanger Med hacia Chefchaouen, Tetuán, Asilah o Fez como rutas adicionales con presupuesto personalizado." }
            ],
            seoTitle: "Traslado Privado Puerto de Tánger Ville y Tánger Med | Mdina Tours",
            seoDesc: "Reserve su traslado privado desde los puertos de Tánger Ville y Tánger Med a Tánger centro. Conductor profesional esperándole al desembarcar. Tarifas fijas desde 45 €."
        }
    },
    {
        slug: "tangier-to-rabat-transfer",
        image: "/Tangier-Morocco-Photo.webp",
        prices: { 3: 210, 4: 245, 5: 280, 7: 390 },
        en: {
            title: "Tangier to Rabat or Salé Private Expressway Transfer",
            tagline: "Comfortable City-to-City Chauffeur Travel via the Atlantic Highway",
            pickup: "Tangier (Airport, Port, or Hotel)",
            dropoff: "Rabat or Salé (Hotel, Riad, or Airport)",
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
            seoTitle: "Private Transfer Tangier to Rabat & Salé | Mdina Tours",
            seoDesc: "Travel in comfort with a private city-to-city transfer from Tangier to Rabat. Pristine air-conditioned vehicles, professional bilingual drivers, and door-to-door convenience."
        },
        fr: {
            title: "Transfert de Tanger à Rabat ou Salé",
            tagline: "Liaison Intervilles Confortable via l'Autoroute de l'Atlantique",
            pickup: "Tanger (Hôtel, Port ou Aéroport)",
            dropoff: "Rabat ou Salé (Hôtel, Riad ou Aéroport)",
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
            seoTitle: "Chauffeur Privé Tanger vers Rabat / Salé | Mdina Tours",
            seoDesc: "Navette privée de Tanger à Rabat. Voyagez confortablement à bord de nos véhicules récents conduits par des chauffeurs expérimentés."
        }
    },
    {
        slug: "rabat-to-casablanca-transfer",
        image: "/img3/aeroport-rabat-sale-mdinatours.webp",
        prices: { 3: 110, 4: 130, 5: 155, 7: 195 },
        en: {
            title: "Rabat or Salé to Casablanca Private Transfer",
            tagline: "Quick and Premium Business & Leisure Transfers between Morocco's Two Major Hubs",
            pickup: "Rabat or Salé (Hotel, Office, or Airport)",
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
            seoTitle: "Private Driver Rabat & Salé to Casablanca Transfer | Mdina Tours",
            seoDesc: "Fast and professional private transfers between Rabat and Casablanca. Perfect for corporate travel, families, and airport connections."
        },
        fr: {
            title: "Transfert de Rabat ou Salé à Casablanca",
            tagline: "Liaison Premium pour Affaires et Loisirs entre Rabat/Salé et Casablanca",
            pickup: "Rabat ou Salé (Hôtel, Bureau ou Aéroport)",
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
            seoTitle: "Transfert Privé Rabat / Salé vers Casablanca | Mdina Tours",
            seoDesc: "Chauffeur privé entre Rabat et Casablanca. Trajets rapides, confort garanti et ponctualité pour vos rendez-vous d'affaires ou loisirs."
        },
        es: {
            title: "Traslado Privado entre Rabat y Casablanca",
            tagline: "Servicio de Transporte Privado Puerta a Puerta entre las Dos Principales Ciudades de Marruecos",
            pickup: "Rabat o Salé (Hotel, Riad u Oficina)",
            dropoff: "Casablanca (Hotel, Oficina, Puerto o Aeropuerto)",
            distance: "90 km",
            duration: "1 hora 10 minutos",
            capacityText: "Berlinas ejecutivas y minivans para viajeros de negocios o familias",
            highlights: [
                "Puntualidad y Comodidad: Conexión directa por autopista entre Rabat y Casablanca.",
                "Servicio Puerta a Puerta: Evite aglomeraciones y traslados con maletas en estaciones de tren.",
                "Vehículos Modernos y Climatizados: Espacio tranquilo para descansar o trabajar durante el trayecto.",
                "Conductores Profesionales: Chóferes experimentados en rutas interurbanas y accesos urbanos.",
                "Flexibilidad de Horarios: Salida adaptada a sus necesidades o reuniones."
            ],
            aboutRoute: "El trayecto entre Rabat y Casablanca conecta las dos grandes urbes del país en aproximadamente una hora y diez minutos por autopista. Nuestro servicio privado le recoge directamente en su dirección de salida y le traslada a su destino sin estrés ni esperas.",
            faqs: [
                { q: "¿Se puede reservar ida y vuelta en el mismo día?", a: "Sí, podemos coordinar un viaje de ida y vuelta el mismo día con espera del conductor si lo necesita." },
                { q: "¿El servicio incluye paradas en el camino?", a: "Por supuesto, puede solicitar paradas breves para descansar o tomar un café en las áreas de servicio de la autopista." }
            ],
            seoTitle: "Traslado Privado Casablanca a Rabat / Rabat a Casablanca | Mdina Tours",
            seoDesc: "Reserve su transporte privado entre Rabat y Casablanca. Conductor profesional, vehículos climatizados, tarifas fijas y máxima puntualidad."
        }
    },
    {
        slug: "marrakech-to-essaouira-transfer",
        image: "/img2/Essaouira-maroc.jpg",
        prices: { 3: 140, 4: 165, 5: 195, 7: 260 },
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
        },
        es: {
            title: "Traslado Privado de Marrakech a Essaouira",
            tagline: "Viaje Cómodo y Directo desde la Ciudad Roja hasta la Costa Atlántica",
            pickup: "Marrakech (Hotel, Riad o Aeropuerto RAK)",
            dropoff: "Essaouira (Hotel, Riad o Puerto)",
            distance: "180 km",
            duration: "2 horas 45 minutos",
            capacityText: "De 1 a 7 pasajeros con amplio espacio para equipaje y tablas de surf",
            highlights: [
                "Parada fotográfica en ruta para ver las famosas cabras subidas a los árboles de argán",
                "Transición paisajística desde las llanuras secas de Chichaoua hasta los bosques de argán",
                "Servicio puerta a puerta directo hasta las puertas de la medina de Essaouira",
                "Vehículos modernos, limpios, no fumadores y con aire acondicionado",
                "Visita opcional a una cooperativa tradicional de aceite de argán certificado"
            ],
            aboutRoute: "El trayecto que conecta Marrakech con Essaouira transcurre por una cómoda carretera nacional a través de las llanuras y bosques de argán. Nuestro servicio de traslado privado le ofrece viajar a su propio ritmo sin el estrés de los autobuses públicos, con paradas panorámicas a su elección y asistencia con el equipaje en su llegada a Essaouira.",
            faqs: [
                { q: "¿Veremos las famosas cabras trepadoras en los árboles de argán?", a: "Sí, esta ruta atraviesa el hábitat natural del argán. Si están activas, su conductor se detendrá para que puedan tomar fotos." },
                { q: "¿El precio incluye todos los gastos?", a: "Sí, la tarifa es fija e incluye combustible, conductor profesional e impuestos locales, sin cargos sorpresa." },
                { q: "¿Se pueden transportar tablas de surf o equipaje voluminoso?", a: "Nuestras furgonetas disponen de maleteros amplios para tablas de surf o palos de golf. Indíquelo al hacer la reserva." }
            ],
            seoTitle: "Traslado Privado Marrakech a Essaouira en Taxi y Van | Mdina Tours",
            seoDesc: "Reserve su traslado privado de Marrakech a Essaouira. Viaje cómodo en coche o van con chófer profesional, parada para ver las cabras en los arganes y tarifa fija."
        }
    },
    {
        slug: "fes-to-chefchaouen-transfer",
        image: "/img2/fes_gate.jpg",
        prices: { 3: 170, 4: 195, 5: 230, 7: 310 },
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
        },
        es: {
            title: "Traslado Privado de Fez a Chefchaouen",
            tagline: "Ruta Panorámica de Montaña desde la Capital Cultural a la Perla Azul",
            pickup: "Fez (Hotel, Riad o Aeropuerto FEZ)",
            dropoff: "Chefchaouen (Hotel o Riad)",
            distance: "200 km",
            duration: "3 horas 30 minutos",
            capacityText: "De 1 a 7 pasajeros con conductores expertos en rutas de montaña",
            highlights: [
                "Ruta panorámica a través de los valles y paisajes del Rif",
                "Conducción suave y segura en carreteras de montaña para el máximo confort",
                "Parada fotográfica con vistas panorámicas al embalse de Sidi Chahed",
                "Vehículos modernos con aire acondicionado diseñados para desniveles",
                "Coordinación directa para la llegada a su riad en Chefchaouen"
            ],
            aboutRoute: "Al no existir conexión de tren entre Fez y Chefchaouen, el transporte privado es la opción más rápida, cómoda y segura. Nuestros chóferes conocen a la perfección las carreteras del Rif para garantizar un trayecto relajante y agradable.",
            faqs: [
                { q: "¿Cómo es la carretera de Fez a Chefchaouen?", a: "Es una carretera de montaña con curvas y hermosos paisajes. Nuestros conductores conducen con prudencia y a velocidad moderada para evitar cualquier mareo." },
                { q: "¿Podemos hacer una parada en las ruinas romanas de Volubilis?", a: "Sí, podemos organizar un desvío personalizado para visitar las ruinas de Volubilis y la ciudad santa de Moulay Idriss. Consúltenos para añadir esta parada." }
            ],
            seoTitle: "Traslado Privado Fez a Chefchaouen en Taxi y Minivan | Mdina Tours",
            seoDesc: "Reserve su traslado privado de Fez a Chefchaouen. Conducción segura por las montañas del Rif, vehículos confortables climatizados y tarifa fija garantizada."
        }
    },
    {
        slug: "casablanca-to-marrakech-transfer",
        image: "/img3/casablanca-mosque-tour-private-driver-trasnportation.webp",
        prices: { 3: 220, 4: 250, 5: 290, 7: 390 },
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
        },
        es: {
            title: "Traslado Privado de Casablanca a Marrakech",
            tagline: "Conexión Rápida por Autopista entre la Capital Económica y la Ciudad Roja",
            pickup: "Casablanca (Hotel, Puerto o Aeropuerto CMN)",
            dropoff: "Marrakech (Hotel, Riad o Aeropuerto RAK)",
            distance: "240 km",
            duration: "2 horas 30 minutos",
            capacityText: "Berlinas ejecutivas y minivans espaciosas para familias o grupos",
            highlights: [
                "Trayecto Directo por Autopista: Conexión rápida sin paradas innecesarias salvo a petición del cliente.",
                "Ideal para Llegadas a CMN: Conexión directa desde el aeropuerto de Casablanca directo a su riad en Marrakech.",
                "Vehículos Modernos y Climatizados: Asientos amplios y cómodos para un viaje descansado.",
                "Conductores Conocedores de Marrakech: Llegada y asistencia en los accesos peatonales de la medina.",
                "Disponibilidad 24/7: Servicio adaptado a cualquier horario de vuelo diurno o nocturno."
            ],
            aboutRoute: "El viaje entre Casablanca y Marrakech se realiza por la autopista A3 en unas dos horas y media. Es la opción preferida por viajeros que aterrizan en el Aeropuerto Mohammed V (CMN) y quieren llegar a su hotel o riad en Marrakech sin complicaciones de trenes ni transbordos.",
            faqs: [
                { q: "¿Se puede solicitar recogida en el Puerto de Casablanca?", a: "Sí, coordinamos recogidas directas en la terminal del puerto para cruceristas con destino a Marrakech." },
                { q: "¿El precio incluye los peajes de autopista?", a: "Sí, el precio cerrado por vehículo incluye combustible, peajes de autopista y maletas." }
            ],
            seoTitle: "Traslado Privado Casablanca a Marrakech en Coche con Conductor | Mdina Tours",
            seoDesc: "Reserve su traslado privado de Casablanca a Marrakech por autopista. Conductor profesional, vehículos confortables y tarifas fijas garantizadas."
        }
    },
    {
        slug: "tangier-airport-transfer",
        image: "/img2/tangier-airport.avif",
        prices: { 3: 45, 4: 55, 5: 65, 7: 90 },
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
        },
        es: {
            title: "Traslado Privado Aeropuerto de Tánger Ibn Battouta",
            tagline: "Taxi Privado Cómodo y Directo desde el Aeropuerto TNG a su Hotel o Riad",
            pickup: "Aeropuerto Internacional de Tánger Ibn Battouta (TNG)",
            dropoff: "Tánger (Centro, Medina, Puerto o Hoteles de la Bahía)",
            distance: "15 km",
            duration: "20-25 minutos",
            capacityText: "De 1 a 7 pasajeros con equipaje incluido",
            highlights: [
                "Seguimiento en tiempo real de su vuelo: chófer puntual a la salida del terminal",
                "Servicio de bienvenida Meet & Greet con cartel personalizado en llegadas",
                "Tarifas fijas transparentes sin suplementos nocturnos ni cargos ocultos",
                "Vehículos confortables con aire acondicionado evitando colas de taxis locales",
                "Coordinación directa con riads dentro de la histórica Kasbah de Tánger"
            ],
            aboutRoute: "El aeropuerto Ibn Battouta (TNG) es la principal puerta de entrada al norte de Marruecos. Evite regateos y largas esperas de taxi reservando su traslado privado con un chófer profesional esperándole a su llegada.",
            faqs: [
                { q: "¿Se puede reservar un traslado directo del aeropuerto de Tánger a Chefchaouen?", a: "Sí, ofrecemos traslados directos desde el aeropuerto TNG hacia Chefchaouen, Tetuán, Asilah o Rabat." },
                { q: "¿Hay suplemento por llegadas nocturnas?", a: "No, nuestras tarifas son fijas las 24 horas del día sin ningún recargo por horario nocturno." }
            ],
            seoTitle: "Traslado Aeropuerto de Tánger Ibn Battouta TNG Privado | Mdina Tours",
            seoDesc: "Reserve su traslado privado desde el Aeropuerto de Tánger (TNG) al centro, puerto o medina. Chófer esperándole con cartel, seguimiento de vuelo y precio fijo."
        }
    },
    {
        slug: "tangier-to-casablanca-transfer",
        image: "/Traditional.webp",
        prices: { 3: 280, 4: 320, 5: 365, 7: 490 },
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
        image: "/img2/tangier-mdina.jpg",
        prices: { 3: 140, 4: 165, 5: 195, 7: 260 },
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
        },
        es: {
            title: "Traslado Privado de Tánger a Chefchaouen",
            tagline: "Conexión Directa y Cómoda hacia la Perla Azul de las Montañas del Rif",
            pickup: "Tánger (Hotel, Puerto de Ferry o Aeropuerto TNG)",
            dropoff: "Chefchaouen (Hotel o Riad)",
            distance: "120 km",
            duration: "2 horas 15 minutos",
            capacityText: "De 1 a 7 pasajeros con equipaje en vehículos modernos climatizados",
            highlights: [
                "La conexión más rápida y cómoda a Chefchaouen desde el puerto o aeropuerto de Tánger",
                "Chóferes expertos en las carreteras del Rif con conducción suave",
                "Paradas fotográficas panorámicas en miradores naturales de montaña",
                "Tarifas fijas garantizadas sin cargos sorpresa por maletas",
                "Contacto directo con el personal de su riad en la medina de Chefchaouen"
            ],
            aboutRoute: "Chefchaouen se encuentra en el corazón de las montañas del Rif. Un traslado privado desde Tánger es la mejor forma de llegar, ahorrándole horas respecto al transporte público y adaptándose al horario exacto de su llegada en ferry o avión.",
            faqs: [
                { q: "¿Dónde me dejará el conductor en Chefchaouen?", a: "La medina de Chefchaouen es peatonal. Su chófer le dejará en la puerta de acceso más cercana (como Bab el Ain o Plaza Mohammed V) y avisará a su riad para asistirle con las maletas." },
                { q: "¿Se puede hacer una parada en Tetuán?", a: "Sí, podemos hacer una parada para visitar la medina de Tetuán, Patrimonio de la Humanidad. Indíquelo al reservar." }
            ],
            seoTitle: "Traslado Privado Tánger a Chefchaouen en Taxi y Van | Mdina Tours",
            seoDesc: "Reserve su traslado privado de Tánger a Chefchaouen desde el puerto, aeropuerto o su hotel. Ruta segura por el Rif, vehículos climatizados y precio cerrado."
        }
    },
    {
        slug: "casablanca-to-fes-transfer",
        image: "/img2/casablanca_MOSQUE.webp",
        prices: { 3: 250, 4: 290, 5: 335, 7: 445 },
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
        image: "/img2/rabat-hassan-tour.jpg",
        prices: { 3: 245, 4: 275, 5: 315, 7: 425 },
        en: {
            title: "Rabat or Salé to Marrakech Private Transfer",
            tagline: "Premium Intercity Transfer from the Capital to the Red City",
            pickup: "Rabat or Salé (Hotel, Riad, or Office)",
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
            seoTitle: "Rabat & Salé to Marrakech Private Transfer | Mdina Tours",
            seoDesc: "Book a private transfer from Rabat to Marrakech. Professional drivers, modern vehicles, fixed prices, and direct door-to-door service."
        },
        fr: {
            title: "Transfert de Rabat ou Salé à Marrakech",
            tagline: "Liaison Privée Premium de la Capitale à la Ville Rouge",
            pickup: "Rabat ou Salé (Hôtel, Riad ou Bureau)",
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
            seoTitle: "Chauffeur Privé Rabat / Salé vers Marrakech | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Rabat à Marrakech. Service fiable de porte à porte, véhicules confortables et tarifs clairs."
        }
    },
    {
        slug: "rabat-to-fes-transfer",
        image: "/img2/rabat-hassan-tour.jpg",
        prices: { 3: 165, 4: 190, 5: 220, 7: 295 },
        en: {
            title: "Rabat or Salé to Fes Private Transfer",
            tagline: "Fast and Convenient Transfer Between Morocco's Historic Capital Cities",
            pickup: "Rabat or Salé (Hotel, Riad, or Office)",
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
            seoTitle: "Rabat & Salé to Fes Private Transfer | Mdina Tours",
            seoDesc: "Private transfer between Rabat and Fes. Fixed prices, professional drivers, and clean air-conditioned vehicles."
        },
        fr: {
            title: "Transfert de Rabat ou Salé à Fès",
            tagline: "Liaison Express Confortable entre les Deux Cités Impériales",
            pickup: "Rabat ou Salé (Hôtel, Riad ou Bureau)",
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
            seoTitle: "Transfert Privé Rabat / Salé vers Fès | Mdina Tours",
            seoDesc: "Réservez votre navette privée de Rabat à Fès. Chauffeurs professionnels, confort garanti et tarifs forfaitaires fixes."
        }
    },
    {
        slug: "rabat-to-chefchaouen-transfer",
        image: "/img2/rabat-hassan-tour.jpg",
        prices: { 3: 249, 4: 289, 5: 329, 7: 429 },
        en: {
            title: "Rabat or Salé to Chefchaouen Private Transfer",
            tagline: "Direct Private Taxi to the Blue City in the Rif Mountains",
            pickup: "Rabat or Salé (Hotel, Riad, or Office)",
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
            seoTitle: "Rabat & Salé to Chefchaouen Private Transfer | Mdina Tours",
            seoDesc: "Private transfer from Rabat to Chefchaouen. Safe drive, fixed pricing, and professional drivers."
        },
        fr: {
            title: "Transfert de Rabat ou Salé à Chefchaouen",
            tagline: "Navette Privée Directe vers la Cité Bleue du Nord",
            pickup: "Rabat ou Salé (Hôtel, Riad ou Bureau)",
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
            seoTitle: "Chauffeur Privé Rabat / Salé vers Chefchaouen | Mdina Tours",
            seoDesc: "Réservez votre transfert privé de Rabat à Chefchaouen. Véhicules récents et confortables avec chauffeurs expérimentés."
        }
    },
    {
        slug: "marrakech-to-agadir-transfer",
        image: "/a-mdiinatours/selman-marrakech-mdinatours.webp",
        prices: { 3: 185, 4: 215, 5: 250, 7: 345 },
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
        image: "/b-roll/activity-sahara-camel-riding-broll.webp",
        prices: { 3: 370, 4: 425, 5: 495, 7: 640 },
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
                "Dépose à votre hôtel à Merzouga ou au point de rencontre de votre camp",
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
        image: "/img3/aeroport-marrakech-menara.webp",
        prices: { 3: 25, 4: 35, 5: 45, 7: 60 },
        en: {
            title: "Marrakech Airport Transfer & Private Taxi Service (RAK)",
            tagline: "Guaranteed Flat-Rate Chauffeur Service Direct to Your Medina Riad or Hotel",
            pickup: "Marrakech Menara International Airport (RAK)",
            dropoff: "Medina Riads, Gueliz, Palmeraie, or Agafay Desert",
            distance: "10 km (Medina) / 18 km (Palmeraie)",
            duration: "20–35 minutes",
            capacityText: "Executive Sedans (1-3 pax), Luxury Minivans (up to 7 pax)",
            highlights: [
                "Terminal Meet & Greet: Chauffeur waits inside the arrivals hall holding a sign with your name.",
                "Live Flight Radar Tracking: Automatic schedule adjustment with 60 minutes free wait time if your flight is delayed.",
                "Guaranteed Fixed Pricing: Flat rate per vehicle with zero night surcharges, baggage fees, or stressful negotiations.",
                "Medina Doorstep Escort: Direct drop-off at the closest accessible medina gate with riad staff coordination.",
                "Pristine Air-Conditioned Fleet: Mercedes-Benz Vitos & executive sedans with free child seats on request."
            ],
            aboutRoute: "Marrakech Menara Airport (RAK) is located just 10 kilometers from Jemaa el-Fna and the historic Medina. However, navigating local airport street taxis is famously stressful, with unmetered fare demands and confusion finding hidden riads. Our pre-booked private transfer eliminates the haggling, delivering you safely from the terminal arrivals hall directly to your riad door.",
            taxiComparison: {
                badge: "Taxi vs Private Transfer",
                heading: "Marrakech Airport Taxi vs. Mdina Tours Private Transfer: Why Pre-Booking Wins",
                subheading: "Skip stressful arrivals negotiations, unmetered fares, and medina drop-off confusion. Here is why pre-booking with Mdina Tours is the smart traveler's choice.",
                summary: "Pre-booking your Marrakech airport transfer gives you a guaranteed fixed price, a personal meet-and-greet in the terminal, and direct coordination with your riad host.",
                points: [
                    {
                        feature: "Transparent Pricing",
                        privateTransfer: "Guaranteed flat rate from €20–€25 (~220–270 MAD) per vehicle. All taxes, tolls, and luggage included. No night-time premiums.",
                        streetTaxi: "Unregulated haggling. Drivers frequently demand 200–350 MAD, plus aggressive night markups and luggage fees."
                    },
                    {
                        feature: "Terminal Meet & Greet",
                        privateTransfer: "Personalized greeting inside the arrivals hall holding a sign with your name. Includes 60 min free waiting time & flight tracking.",
                        streetTaxi: "Long outdoor queues at curbside taxi ranks, amidst chaotic crowds and persistent touts."
                    },
                    {
                        feature: "Medina Riad Delivery",
                        privateTransfer: "Driver escorts you to the closest pedestrian gate and coordinates directly with riad staff to greet you and carry luggage.",
                        streetTaxi: "Drops you at distant outer avenues or roundabouts, leaving you to wander confusing alleys alone with heavy bags."
                    },
                    {
                        feature: "Vehicle Standard & Safety",
                        privateTransfer: "Modern, immaculate Mercedes-Benz Vitos & executive sedans with dual A/C. Complimentary child safety seats on request.",
                        streetTaxi: "Older standard Grand Taxis, often lacking functioning air conditioning, seatbelts, or adequate trunk capacity."
                    },
                    {
                        feature: "Payment Flexibility",
                        privateTransfer: "Pay upon arrival in EUR or MAD cash, or pay securely online in advance. Exact change is never an issue.",
                        streetTaxi: "Cash-only in exact Moroccan Dirhams. Drivers frequently claim they have no change for larger banknotes."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Featured Snippet Fixed Rates",
                heading: "Marrakech Airport Taxi Rates & Fixed Price Directory (RAK)",
                subheading: "Official fixed fares per vehicle (not per passenger). Valid 24/7 with zero nighttime surcharges.",
                note: "All fares include meet & greet inside RAK arrivals, flight delay tracking, highway tolls, and medina riad coordination.",
                rows: [
                    { destination: "Marrakech Medina (Jemaa el-Fna, Kasbah, Bab Doukkala)", distance: "10 km", duration: "20–25 min", sedanPrice: "€25 (~270 MAD)", vanPrice: "€35 (~380 MAD)", popular: true },
                    { destination: "Gueliz & Hivernage (Modern City Center)", distance: "8 km", duration: "15–20 min", sedanPrice: "€20 (~220 MAD)", vanPrice: "€30 (~330 MAD)", popular: true },
                    { destination: "Palmeraie (Luxury Resorts, Golf & Private Villas)", distance: "18 km", duration: "30–35 min", sedanPrice: "€30 (~330 MAD)", vanPrice: "€45 (~490 MAD)", popular: true },
                    { destination: "Agdal District (Hotel Zone)", distance: "7 km", duration: "15 min", sedanPrice: "€20 (~220 MAD)", vanPrice: "€30 (~330 MAD)" },
                    { destination: "Agafay Desert (Luxury Camps & Glamping)", distance: "35 km", duration: "45 min", sedanPrice: "€55 (~600 MAD)", vanPrice: "€75 (~820 MAD)", popular: true },
                    { destination: "Ourika Valley (Atlas Mountain Foothills)", distance: "45 km", duration: "55 min", sedanPrice: "€50 (~550 MAD)", vanPrice: "€70 (~770 MAD)" },
                    { destination: "Essaouira Coast (Medina & Beach Hotels)", distance: "185 km", duration: "2h 45m", sedanPrice: "€100 (~1,100 MAD)", vanPrice: "€130 (~1,400 MAD)" }
                ]
            },
            faqs: [
                { q: "Where do I meet my driver at Marrakech Menara Airport (RAK)?", a: "Immediately after collecting your luggage and clearing customs, walk into the main arrivals hall. Your chauffeur will be waiting inside the terminal holding an official Mdina Tours greeting board with your name clearly displayed. Because we track flights via live radar, your driver will be waiting even if your flight lands early or is delayed." },
                { q: "What is the official taxi price from Marrakech airport to the Medina?", a: "While official airport signs cite baseline rates around 100 to 150 MAD, street cab drivers commonly demand 200–300+ MAD, especially after dark. Pre-booking with Mdina Tours guarantees a locked flat rate of €20–€25 (~220–270 MAD) per vehicle with door-to-door escort to your Medina riad." },
                { q: "How much is a private transfer from Marrakech Airport to Agafay Desert?", a: "A private transfer from Marrakech Airport (RAK) to luxury camps in the Agafay Desert is a flat rate of €55 (~600 MAD) for an executive sedan (1–3 passengers) or €75 (~820 MAD) for a luxury minivan (up to 7 passengers)." },
                { q: "Can the driver drop me directly at my Medina Riad?", a: "Marrakech's historic medina features pedestrian-only alleys. Your chauffeur will drive to the closest vehicle-accessible gate (e.g. Bab Doukkala, Bab Aylen, Riad Laarous) and coordinate directly with your riad staff to greet you and assist with baggage." },
                { q: "What happens if my flight to Marrakech is delayed?", a: "All Mdina Tours airport bookings include automated 24/7 flight tracking. When you provide your flight number, our dispatch team monitors your real-time status. Your chauffeur adjusts their pickup time automatically, with 60 minutes of free waiting time included." },
                { q: "Is the price per person or per vehicle?", a: "All prices are flat rates per vehicle for your private party. There are no per-passenger charges or hidden luggage fees." },
                { q: "Do your drivers speak English?", a: "Yes, our drivers are courteous local professionals fluent in English, French, and Arabic." }
            ],
            seoTitle: "Marrakech Airport Transfer & Private Taxi (RAK) | Fixed Rates",
            seoDesc: "Pre-book a private Marrakech Airport transfer (RAK) from €20. Fixed rates to Medina riads, Gueliz & Palmeraie. Terminal meet & greet with 60-min free wait time."
        },
        fr: {
            title: "Transfert Aéroport Marrakech-Ménara & Taxi Privé (RAK)",
            tagline: "Navette Privée et Tarifs Fixes Garantis vers la Médina, Guéliz et Palmeraie",
            pickup: "Aéroport International Marrakech Ménara (RAK)",
            dropoff: "Riads de la Médina, Guéliz, Palmeraie ou Désert d'Agafay",
            distance: "10 km (Médina) / 18 km (Palmeraie)",
            duration: "20–35 minutes",
            capacityText: "Berlines Exécutives (1-3 passagers) et Vans VIP (jusqu'à 7 passagers)",
            highlights: [
                "Accueil dans le terminal : Chauffeur privé vous attendant avec une pancarte à votre nom dès la sortie des douanes.",
                "Suivi des vols en direct : Réajustement automatique de l'heure d'arrivée avec 60 min d'attente gratuite en cas de retard.",
                "Tarifs fixes transparents : Prix forfaitaire par véhicule sans aucun supplément bagages ni majoration nocturne.",
                "Accompagnement jusqu'au riad : Dépose à la porte accessible la plus proche et coordination téléphonique avec votre hébergement.",
                "Flotte récente climatisée : Mercedes-Benz Vito et berlines soignées avec sièges enfant gratuits sur demande."
            ],
            aboutRoute: "L'Aéroport Marrakech Ménara (RAK) est situé à seulement 10 km de la célèbre place Jemaa el-Fna. Toutefois, trouver un taxi à la sortie s'avère souvent source de stress et de surfacturation. Notre service de navette et transfert privé vous assure une prise en charge immédiate et sereine dès l'atterrissage, à tarif fixe garanti.",
            taxiComparison: {
                badge: "Taxi vs Navette Privée",
                heading: "Taxi Aéroport Marrakech vs Navette Privée Mdina Tours : Pourquoi Réserver à l'Avance ?",
                subheading: "Évitez les négociations houleuses, les compteurs éteints et les arrivées compliquées en médina. Découvrez pourquoi pré-réserver votre chauffeur est le choix idéal.",
                summary: "Pré-réserver votre navette aéroport vous garantit un tarif fixe sans surprise, un accueil personnalisé dans le terminal et une dépose coordonnée avec votre riad.",
                points: [
                    {
                        feature: "Tarifs & Transparence",
                        privateTransfer: "Tarif forfaitaire dès 20€–25€ (~220–270 MAD) par véhicule tout compris (péages, bagages, taxes). Zéro surprise.",
                        streetTaxi: "Négociation obligatoire. Les chauffeurs réclament souvent 200 à 350 MAD, avec majorations la nuit et pour les bagages."
                    },
                    {
                        feature: "Prise en charge au Terminal",
                        privateTransfer: "Accueil personnalisé dans le hall des arrivées avec pancarte nominative. 60 minutes d'attente offerte et suivi de vol.",
                        streetTaxi: "File d'attente extérieure dans la cohue et sollicitations insistantes sur le parvis."
                    },
                    {
                        feature: "Arrivée aux Riads Médina",
                        privateTransfer: "Dépose à la porte piétonne la plus proche avec contact direct du riad pour vous assister avec les valises.",
                        streetTaxi: "Dépose souvent aléatoire sur les grands boulevards extérieurs, vous laissant chercher votre riad seul dans les ruelles."
                    },
                    {
                        feature: "Confort & Sécurité",
                        privateTransfer: "Mercedes-Benz Vito et berlines récentes et impeccables avec climatisation active. Sièges bébé gratuits.",
                        streetTaxi: "Véhicules plus anciens, climatisation rarement fonctionnelle et coffre parfois encombré."
                    },
                    {
                        feature: "Modalités de Paiement",
                        privateTransfer: "Paiement à l'arrivée en Euros ou Dirhams, ou paiement sécurisé en ligne à l'avance. Pas de problème d'appoint.",
                        streetTaxi: "Uniquement en espèces et en Dirhams exacts. Les chauffeurs affirment souvent ne pas avoir de monnaie."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Tarifs Forfaitaires RAK",
                heading: "Prix et Tarifs Fixes : Aéroport Marrakech Menara vers Centre-Ville & Médina",
                subheading: "Tarifs fixes par véhicule (et non par passager). Valables 24h/24 sans supplément nuit.",
                note: "Tous nos tarifs comprennent l'accueil dans le terminal, le suivi de vol et l'accompagnement bagages vers votre riad.",
                rows: [
                    { destination: "Médina & Place Jemaa el-Fna (Kasbah, Bab Doukkala)", distance: "10 km", duration: "20–25 min", sedanPrice: "25€ (~270 MAD)", vanPrice: "35€ (~380 MAD)", popular: true },
                    { destination: "Guéliz & Hivernage (Centre-ville moderne)", distance: "8 km", duration: "15–20 min", sedanPrice: "20€ (~220 MAD)", vanPrice: "30€ (~330 MAD)", popular: true },
                    { destination: "La Palmeraie (Palaces, Hôtels clubs & Villas privées)", distance: "18 km", duration: "30–35 min", sedanPrice: "30€ (~330 MAD)", vanPrice: "45€ (~490 MAD)", popular: true },
                    { destination: "Zone Hôtelière de l'Agdal", distance: "7 km", duration: "15 min", sedanPrice: "20€ (~220 MAD)", vanPrice: "30€ (~330 MAD)" },
                    { destination: "Désert d'Agafay (Camps de luxe & Bivouacs)", distance: "35 km", duration: "45 min", sedanPrice: "55€ (~600 MAD)", vanPrice: "75€ (~820 MAD)", popular: true },
                    { destination: "Vallée de l'Ourika (Pied de l'Atlas)", distance: "45 km", duration: "55 min", sedanPrice: "50€ (~550 MAD)", vanPrice: "70€ (~770 MAD)" },
                    { destination: "Essaouira (Médina & Front de mer)", distance: "185 km", duration: "2h 45m", sedanPrice: "100€ (~1 100 MAD)", vanPrice: "130€ (~1 400 MAD)" }
                ]
            },
            faqs: [
                { q: "Quel est le prix officiel d'un taxi ou d'une navette de l'aéroport de Marrakech à la Médina / Guéliz ?", a: "Alors que les panneaux d'affichage indiquent 100 à 150 MAD, les chauffeurs de taxi locaux réclament couramment 200 à 350 MAD à la sortie. En réservant avec Mdina Tours, vous bénéficiez d'un tarif fixe garanti dès 20€–25€ (~220–270 MAD) par véhicule pour l'ensemble de votre groupe, sans frais de bagages ni supplément de nuit." },
                { q: "Où se trouve le point de rencontre avec le chauffeur à l'aéroport Marrakech Ménara (RAK) ?", a: "Dès que vous franchissez les douanes et récupérez vos bagages, entrez dans le hall principal des arrivées. Votre chauffeur privé vous y attendra directement avec une pancarte affichant lisiblement votre nom. Grâce au suivi des vols en direct, il sera présent même si votre vol a du retard." },
                { q: "Comment se passe la dépose dans un riad piéton de la médina de Marrakech ?", a: "Les ruelles de la médina étant interdites aux voitures, notre chauffeur vous dépose à la porte d'accès carrossable la plus proche (Bab Doukkala, Riad Laarous, Bab Aylen...) et contacte directement votre riad pour qu'un porteur vous assiste avec vos valises." },
                { q: "Combien coûte un taxi de l'aéroport de Marrakech au désert d'Agafay ?", a: "Le transfert privé direct de l'aéroport RAK vers les camps du désert d'Agafay est proposé au tarif fixe de 55€ pour une berline confortable (1-3 personnes) et 75€ pour un van spacieux (jusqu'à 7 personnes)." },
                { q: "Que se passe-t-il si mon vol vers Marrakech est retardé ?", a: "Tous nos transferts incluent le suivi de vol en direct 24h/24. Dès que vous nous transmettez votre numéro de vol, notre équipe ajuste automatiquement l'heure d'arrivée du chauffeur, avec 60 minutes d'attente gratuite offerte." }
            ],
            seoTitle: "Transfert Aéroport Marrakech (RAK) & Navette Privée | Prix Fixe & Taxi",
            seoDesc: "Réservez votre transfert aéroport marrakech médina et navette aéroport marrakech dès 20€. Meilleur prix taxi marrakech aéroport garanti, accueil en terminal et chauffeur privé."
        },
        es: {
            title: "Traslado Aeropuerto Marrakech Menara (RAK) y Taxi Privado",
            tagline: "Tarifas Fijas Garantizadas con Chófer Privado a la Medina, Gueliz y Palmeral",
            pickup: "Aeropuerto Internacional Marrakech Menara (RAK)",
            dropoff: "Riads de la Medina, Gueliz, Palmeral o Desierto de Agafay",
            distance: "10 km (Medina) / 18 km (Palmeral)",
            duration: "20–35 minutos",
            capacityText: "Berlinas Ejecutivas (1-3 pax) y Furgonetas VIP (hasta 7 pax)",
            highlights: [
                "Recepción en la terminal: Su chófer le esperará con un cartel a su nombre nada más salir de aduanas.",
                "Seguimiento de vuelo en directo: Reajuste automático con 60 minutos de espera gratuita si su vuelo se retrasa.",
                "Tarifas fijas y transparentes: Precio cerrado por vehículo sin suplementos nocturnos ni costes por maletas.",
                "Llegada asistida al riad: Parada en la puerta más cercana de la medina y coordinación con su alojamiento.",
                "Flota moderna climatizada: Mercedes-Benz Vito y berlinas impecables con sillas infantiles gratuitas bajo petición."
            ],
            aboutRoute: "El Aeropuerto de Marrakech Menara (RAK) se encuentra a solo 10 kilómetros de la plaza Jemaa el-Fna. Sin embargo, conseguir un taxi a la llegada suele implicar intensos regateos y cobros abusivos. Nuestro servicio de traslado privado elimina las complicaciones y le lleva directamente hasta su alojamiento con un precio fijo cerrado.",
            taxiComparison: {
                badge: "Taxi vs Traslado Privado",
                heading: "Taxi en el Aeropuerto de Marrakech vs Traslado Privado Mdina Tours: Evita Regateos y Sorpresas",
                subheading: "Evite regateos estresantes a la llegada, tarifas sin taxímetro y dudas para encontrar su riad. Descubra por qué reservar con antelación es la opción más inteligente.",
                summary: "Reservar su traslado con Mdina Tours le garantiza precio cerrado sin sorpresas, bienvenida personalizada dentro de la terminal y asistencia directa con su riad.",
                points: [
                    {
                        feature: "Precio y Transparencia",
                        privateTransfer: "Precio fijo garantizado desde 20€–25€ (~220–270 MAD) por vehículo todo incluido (peajes, maletas, tasas). Sin sorpresas.",
                        streetTaxi: "Regateo obligatorio. Los taxistas suelen pedir entre 200 y 350 MAD, con recargos nocturnos y por equipaje."
                    },
                    {
                        feature: "Punto de Encuentro",
                        privateTransfer: "Recepción personalizada en la terminal de llegadas con cartel a su nombre. 60 minutos de espera gratuita y seguimiento de vuelo.",
                        streetTaxi: "Largas colas en el exterior bajo el calor y trato con intermediarios insistentes en la parada."
                    },
                    {
                        feature: "Llegada al Riad en Medina",
                        privateTransfer: "Le dejamos en la puerta más cercana y avisamos al personal del riad para que le ayude con el equipaje.",
                        streetTaxi: "Le deja en avenidas exteriores lejanas, dejándole solo para buscar el riad en callejones laberínticos."
                    },
                    {
                        feature: "Vehículo y Confort",
                        privateTransfer: "Vehículos Mercedes-Benz Vito y berlinas modernas con aire acondicionado y sillas de bebé gratuitas.",
                        streetTaxi: "Vehículos antiguos, a menudo sin aire acondicionado en funcionamiento o con maletero limitado."
                    },
                    {
                        feature: "Formas de Pago",
                        privateTransfer: "Pago a la llegada en Euros o Dirhams en efectivo, o pago seguro online por adelantado. Sin problemas de cambio.",
                        streetTaxi: "Únicamente en efectivo y en Dirhams justos. Habitualmente afirman no tener cambio para billetes grandes."
                    }
                ]
            },
            fixedPriceTable: {
                badge: "Tarifas Fijas RAK",
                heading: "Precios y Tarifas Fijas: Traslados desde el Aeropuerto de Marrakech al Centro y Riad",
                subheading: "Tarifas cerradas por vehículo completo (no por persona). Válidas 24/7 sin recargos nocturnos.",
                note: "Incluye bienvenida en la terminal, seguimiento de vuelo y asistencia con el equipaje hasta el riad.",
                rows: [
                    { destination: "Medina de Marrakech (Plaza Jemaa el-Fna, Kasbah, Bab Doukkala)", distance: "10 km", duration: "20–25 min", sedanPrice: "25€ (~270 MAD)", vanPrice: "35€ (~380 MAD)", popular: true },
                    { destination: "Gueliz e Hivernage (Centro moderno de la ciudad)", distance: "8 km", duration: "15–20 min", sedanPrice: "20€ (~220 MAD)", vanPrice: "30€ (~330 MAD)", popular: true },
                    { destination: "Palmeraie (Hoteles y Villas de lujo)", distance: "18 km", duration: "30–35 min", sedanPrice: "30€ (~330 MAD)", vanPrice: "45€ (~490 MAD)", popular: true },
                    { destination: "Zona Hotelera de Agdal", distance: "7 km", duration: "15 min", sedanPrice: "20€ (~220 MAD)", vanPrice: "30€ (~330 MAD)" },
                    { destination: "Desierto de Agafay (Campamentos y Glamping)", distance: "35 km", duration: "45 min", sedanPrice: "55€ (~600 MAD)", vanPrice: "75€ (~820 MAD)", popular: true },
                    { destination: "Valle de Ourika (Atlas)", distance: "45 km", duration: "55 min", sedanPrice: "50€ (~550 MAD)", vanPrice: "70€ (~770 MAD)" },
                    { destination: "Esauira Costa (Medina y Playa)", distance: "185 km", duration: "2h 45m", sedanPrice: "100€ (~1.100 MAD)", vanPrice: "130€ (~1.400 MAD)" }
                ]
            },
            faqs: [
                { q: "¿Cómo ir del aeropuerto de Marrakech a la Medina o al centro de la ciudad?", a: "La opción más cómoda y segura para llegar a la Medina o a Guéliz es reservar un traslado privado con antelación. A diferencia de los taxis de la terminal que exigen negociar el precio o el autobús L19 con horarios limitados, su chófer privado le recogerá dentro de la terminal y le llevará directo hasta la puerta más cercana de su riad por un precio cerrado desde 20€." },
                { q: "¿Cuánto cuesta un taxi o traslado privado desde el aeropuerto de Marrakech?", a: "Aunque las tarifas de referencia marcan entre 100 y 150 MAD, los taxistas de la terminal suelen pedir entre 200 y 300 MAD (o más de noche). Con Mdina Tours tienes una tarifa fija garantizada de 20€ a 25€ (~220–270 MAD) por vehículo completo, sin suplementos por maletas ni horario nocturno." },
                { q: "¿Dónde me esperará mi chofer en el Aeropuerto Menara (RAK)?", a: "Justo después de recoger el equipaje y cruzar el control de aduanas, acceda al vestíbulo principal de llegadas. Su chófer le estará esperando dentro de la terminal sosteniendo un cartel con su nombre. Gracias al seguimiento de vuelo en directo, estará allí puntual aunque su vuelo sufra retraso." },
                { q: "¿Cuánto cuesta el traslado desde el aeropuerto de Marrakech al desierto de Agafay?", a: "El traslado privado directo desde el aeropuerto RAK a los campamentos de Agafay tiene un precio fijo de 55€ para berlina (1-3 personas) o 75€ para furgoneta espaciosa (hasta 7 personas)." },
                { q: "¿Qué sucede si mi vuelo a Marrakech sufre un retraso?", a: "Monitorizamos los vuelos las 24 horas. Su chófer adapta la hora de recogida automáticamente sin ningún recargo adicional e incluye 60 minutos de espera de cortesía." }
            ],
            seoTitle: "Traslado Aeropuerto Marrakech (RAK) al Centro y Medina | Taxi Privado con Precio Fijo",
            seoDesc: "Reserve su traslado aeropuerto marrakech y taxi privado al centro y riad desde 20€. Descubra como ir del aeropuerto de marrakech a la medina con el mejor precio taxi aeropuerto marrakech fijo y sin regateos."
        }
    },
    {
        slug: "fes-airport-transfer",
        image: "/a-mdiinatours/fes-airport-transfer.webp",
        prices: { 3: 45, 4: 55, 5: 65, 7: 90 },
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
        },
        es: {
            title: "Traslado Privado Aeropuerto de Fez Saïss",
            tagline: "Servicio de Taxi Privado Directo desde el Aeropuerto FEZ hasta su Riad en la Medina",
            pickup: "Aeropuerto Internacional de Fez-Saïss (FEZ)",
            dropoff: "Cualquier Hotel o Riad en Fez",
            distance: "15 km",
            duration: "25 minutos",
            capacityText: "De 1 a 7 pasajeros con equipaje en vehículos climatizados",
            highlights: [
                "Servicio Meet & Greet con cartel nominativo en el hall de llegadas",
                "Seguimiento de vuelo: el chófer se adapta automáticamente a retrasos",
                "Tarifas claras y fijas sin suplementos por equipaje o nocturnidad",
                "Llegada coordinada a la puerta peatonal más cercana a su riad",
                "Vans y coches confortables con chóferes bilingües profesionales"
            ],
            aboutRoute: "El Aeropuerto de Fez-Saïss (FEZ) se encuentra a 15 km de la medina. La medina de Fez el-Bali es completamente peatonal, por lo que nuestro servicio coordina el punto de llegada exacto con su riad para una bienvenida impecable.",
            faqs: [
                { q: "¿Cómo se realiza la llegada a un riad dentro de la medina peatonal?", a: "El conductor le dejará en la puerta accesible más próxima (por ejemplo Bab Boujloud o Bab Rcif) y coordinará con el personal de su riad para que salgan a recibirle." },
                { q: "¿El precio cambia por la noche?", a: "No, nuestras tarifas son fijas las 24 horas del día, independientemente de la hora de aterrizaje." }
            ],
            seoTitle: "Traslado Aeropuerto Fez Saïss FEZ Privado | Mdina Tours",
            seoDesc: "Reserve su traslado privado desde el Aeropuerto de Fez-Saïss (FEZ) hasta su riad u hotel. Conductor con cartel de bienvenida, seguimiento de vuelo y precio fijo."
        }
    },
    {
        slug: "agadir-airport-transfer",
        image: "/img2/agadir-airport.webp",
        prices: { 3: 50, 4: 60, 5: 75, 7: 100 },
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


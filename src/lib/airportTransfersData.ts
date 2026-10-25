export type Locale = 'en' | 'fr' | 'es' | 'ar';

export interface Vehicle {
    id: string;
    name: string;
    category: Record<Locale, string>;
    capacityPax: string;
    capacityBags: string;
    fromPrice: number;
    image: string;
    features: Record<Locale, string[]>;
    highlight?: Record<Locale, string>;
}

export interface RouteItem {
    id: string;
    airportCode: 'CMN' | 'RAK' | 'RBA' | 'TNG' | 'FEZ' | 'AGA' | 'ESU';
    title: Record<Locale, string>;
    pickup: string;
    dropoff: string;
    price: number;
    duration: string;
    distance: string;
    badge: string;
    slug: string;
}

export interface AirportHub {
    code: 'CMN' | 'RAK' | 'RBA' | 'TNG' | 'FEZ' | 'AGA' | 'ESU';
    slug: string;
    name: Record<Locale, string>;
    city: Record<Locale, string>;
    meetingPoint: Record<Locale, string>;
    customsTime: string;
    description: Record<Locale, string>;
    localTip: Record<Locale, string>;
}

export interface ReviewItem {
    name: string;
    country: string;
    route: string;
    date: string;
    rating: number;
    quote: Record<Locale, string>;
}

export interface FAQItem {
    q: Record<Locale, string>;
    a: Record<Locale, string>;
}

export const AIRPORT_HUBS: AirportHub[] = [
    {
        code: 'CMN',
        slug: 'casablanca-airport-transfer',
        name: {
            en: 'Casablanca Mohammed V Airport',
            fr: 'Aéroport Mohammed V de Casablanca',
            es: 'Aeropuerto Mohammed V de Casablanca',
            ar: 'مطار محمد الخامس الدولي بالدار البيضاء'
        },
        city: {
            en: 'Casablanca · Gateway to Morocco',
            fr: 'Casablanca · Porte Principale du Maroc',
            es: 'Casablanca · Principal Puerta de Entrada',
            ar: 'الدار البيضاء · بوابة المغرب'
        },
        meetingPoint: {
            en: 'Terminal 1 & 2 Arrivals Hall, immediately past customs exit with your name board.',
            fr: 'Hall des arrivées Terminaux 1 et 2, dès la sortie des douanes avec pancarte nominative.',
            es: 'Hall de llegadas Terminales 1 y 2, justo después de aduanas con cartel a su nombre.',
            ar: 'صالة الوصول في المحطة 1 و2، مباشرة بعد مخرج الجمارك مع لافتة باسمك.'
        },
        customsTime: '35–55 min',
        description: {
            en: "Morocco's primary international hub. Direct express transfers to Rabat, Marrakech, and Casablanca hotels.",
            fr: "Le principal hub international marocain. Liaisons directes vers Rabat, Marrakech et les hôtels de Casablanca.",
            es: "El aeropuerto internacional más transitado. Conexiones directas a Rabat, Marrakech y Casablanca.",
            ar: "المطار الدولي الرئيسي بالمغرب. خدمات توصيل مباشرة نحو فنادق الدار البيضاء والرباط ومراكش."
        },
        localTip: {
            en: "ATMs and official Moroccan telecom SIM desks (Maroc Telecom, Orange) are located right after baggage claim.",
            fr: "Des distributeurs de billets et des kiosques SIM officiels se trouvent dès la sortie des bagages.",
            es: "Los cajeros y puestos oficiales de tarjetas SIM se ubican justo al salir de recogida de equipajes.",
            ar: "توجد أجهزة الصراف الآلي وأكشاك شرائح الهاتف الرسمية مباشرة بعد مخرج الأمتعة."
        }
    },
    {
        code: 'RAK',
        slug: 'marrakech-airport-transfer',
        name: {
            en: 'Marrakech Menara Airport',
            fr: 'Aéroport Marrakech Menara',
            es: 'Aeropuerto Marrakech Menara',
            ar: 'مطار مراكش المنارة الدولي'
        },
        city: {
            en: 'Marrakech · Red City & Medina',
            fr: 'Marrakech · Ville Ocre & Médina',
            es: 'Marrakech · Ciudad Roja y Palmeral',
            ar: 'مراكش · المدينة الحمراء'
        },
        meetingPoint: {
            en: 'Main arrivals exit hall. Chauffeur holds a personalized name board.',
            fr: 'Hall principal de sortie des arrivées avec pancarte nominative.',
            es: 'Salida principal de llegadas con cartel personalizado.',
            ar: 'صالة الوصول الرئيسية مباشرة بعد مخرج الركاب مع لافتة باسمك.'
        },
        customsTime: '25–45 min',
        description: {
            en: 'Only 15 minutes from the historic Medina and Gueliz. We coordinate with your riad for seamless doorstep arrival.',
            fr: 'À seulement 15 minutes de la médina et de Guéliz. Nous coordonnons votre arrivée avec votre riad.',
            es: 'A solo 15 minutos de la medina y Gueliz. Coordinamos la llegada directa hasta la puerta de su riad.',
            ar: 'يبعد 15 دقيقة فقط عن المدينة العتيقة وجليز. ننسق مسبقاً مع رياضك لتأمين وصول سلس.'
        },
        localTip: {
            en: "Medina streets are car-free. We drop you at the closest accessible gate and escort you to your riad door.",
            fr: "La médina est piétonne : nous vous déposons à la porte carrossable la plus proche et vous guidons jusqu'au riad.",
            es: "Las calles de la medina son peatonales: le acompañamos a pie desde el punto de parada hasta su riad.",
            ar: "أزقة المدينة العتيقة مخصصة للمشاة: نوصلك إلى أقرب باب ونرافقك مع حقائبك حتى باب الرياض."
        }
    },
    {
        code: 'RBA',
        slug: 'rabat-airport-transfer',
        name: {
            en: 'Rabat-Salé Airport',
            fr: 'Aéroport de Rabat-Salé',
            es: 'Aeropuerto de Rabat-Salé',
            ar: 'مطار الرباط سلا الدولي'
        },
        city: {
            en: 'Rabat · The Capital',
            fr: 'Rabat · La Capitale',
            es: 'Rabat · Capital de Marruecos',
            ar: 'الرباط · عاصمة المملكة'
        },
        meetingPoint: {
            en: 'Direct terminal exit concourse. Smooth, uncrowded meeting area.',
            fr: 'Sortie directe de la zone passagers. Accueil rapide et fluide.',
            es: 'Salida directa de la terminal de llegadas. Encuentro ágil.',
            ar: 'مخرج صالة الركاب مباشرة. استقبال فوري بدون أي انتظار.'
        },
        customsTime: '20–30 min',
        description: {
            en: 'Modern airport connecting European capitals. Swift 25-minute transfers to ministerial and diplomatic quarters.',
            fr: 'Aéroport fluide et moderne reliant l\'Europe. Trajet rapide de 25 min vers le centre diplomatique.',
            es: 'Aeropuerto moderno y cómodo. Traslados rápidos de 25 min hacia el centro y hoteles de negocios.',
            ar: 'مطار عصري يربط العواصم الأوروبية. وصول سريع خلال 25 دقيقة إلى الأحياء الدبلوماسية والمراكز الحيوية.'
        },
        localTip: {
            en: 'Fast passport control makes this one of the most efficient international arrival points in Morocco.',
            fr: 'Le passage rapide en douane en fait l\'un des aéroports les plus fluides du pays.',
            es: 'El control aduanero ágil lo convierte en uno de los accesos más cómodos al país.',
            ar: 'تتميز إجراءات الجوازات بالسرعة والسهولة مما يجعله من أكثر المطارات سلاسة.'
        }
    },
    {
        code: 'TNG',
        slug: 'tangier-airport-transfer',
        name: {
            en: 'Tangier Ibn Battouta Airport',
            fr: 'Aéroport Tanger Ibn Battouta',
            es: 'Aeropuerto Ibn Battouta de Tánger',
            ar: 'مطار طنجة ابن بطوطة الدولي'
        },
        city: {
            en: 'Tangier · Gateway to the North',
            fr: 'Tanger · Porte du Détroit',
            es: 'Tánger · Puerta del Norte',
            ar: 'طنجة · عروس الشمال'
        },
        meetingPoint: {
            en: 'Arrivals terminal exit concourse with personalized sign.',
            fr: 'Sortie du terminal des arrivées avec pancarte nominative.',
            es: 'Salida de la terminal de llegadas con cartel.',
            ar: 'مخرج صالة الوصول مع لوحة استقبال باسمك.'
        },
        customsTime: '20–35 min',
        description: {
            en: 'Fast private connection to Tangier City, Chefchaouen (The Blue Pearl), and coastal Asilah.',
            fr: 'Liaisons privées directes vers Tanger Centre, Chefchaouen (la perle bleue) et Asilah.',
            es: 'Conexión privada y directa hacia Tánger centro, Chefchaouen y la costa de Asilah.',
            ar: 'خدمات نقل خاصة مباشرة إلى وسط طنجة، شفشاون والساحل في أصيلة.'
        },
        localTip: {
            en: 'Heading to Chefchaouen? Our mountain-certified drivers take the smoothest scenic roads through the Rif.',
            fr: 'Pour Chefchaouen, nos chauffeurs empruntent les routes panoramiques les plus confortables du Rif.',
            es: 'Si viaja a Chefchaouen, nuestros chóferes toman la ruta más cómoda y panorámica por el Rif.',
            ar: 'عند السفر إلى شفشاون، يتبع سائقونا المعتمدون الطرق الأكثر أماناً وانسيابية عبر جبال الريف.'
        }
    },
    {
        code: 'FEZ',
        slug: 'fes-airport-transfer',
        name: {
            en: 'Fes-Saïss Airport',
            fr: 'Aéroport Fès-Saïss',
            es: 'Aeropuerto Fez-Saïss',
            ar: 'مطار فاس سايس الدولي'
        },
        city: {
            en: 'Fes · Spiritual & Historic Heart',
            fr: 'Fès · Capitale Spirituelle',
            es: 'Fez · Corazón Espiritual',
            ar: 'فاس · العاصمة الروحية'
        },
        meetingPoint: {
            en: 'Arrivals hall immediately outside baggage customs.',
            fr: 'Hall des arrivées à la sortie du contrôle douanier.',
            es: 'Hall de llegadas tras el control de aduanas.',
            ar: 'صالة الوصول عند الخروج من التفتيش الجمركي مباشرة.'
        },
        customsTime: '25–40 min',
        description: {
            en: 'Direct access to UNESCO World Heritage Medina of Fes, Meknes, and the Middle Atlas cedar forests.',
            fr: 'Accès direct à la médina millénaire de Fès, Meknès et les forêts d\'Ifrane.',
            es: 'Acceso directo a la legendaria medina de Fez, Meknes y las montañas de Ifrane.',
            ar: 'وصول مباشر إلى المدينة العتيقة بفاس المدرجة باليونسكو، ومكناس وإفران.'
        },
        localTip: {
            en: 'Our drivers contact your Fes riad manager in advance so luggage porters are ready at Bab Boujloud or Rcif.',
            fr: 'Nos chauffeurs contactent votre riad à l\'avance pour qu\'un porteur vous attende à Bab Boujloud ou Rcif.',
            es: 'Avisamos a su riad con antelación para que un asistente de equipaje espere en la puerta de la medina.',
            ar: 'يتواصل سائقنا مسبقاً مع إدارة رياضك لتأمين المساعدة في حمل الأمتعة عند أقرب باب.'
        }
    },
    {
        code: 'AGA',
        slug: 'agadir-airport-transfer',
        name: {
            en: 'Agadir Al Massira Airport',
            fr: 'Aéroport Agadir Al Massira',
            es: 'Aeropuerto Al Massira de Agadir',
            ar: 'مطار أكادير المسيرة الدولي'
        },
        city: {
            en: 'Agadir · Surf Coast & Taghazout',
            fr: 'Agadir · Côte Atlantique & Surf',
            es: 'Agadir · Costa Atlántica y Taghazout',
            ar: 'أكادير · ساحل المحيط وتغازوت'
        },
        meetingPoint: {
            en: 'Main arrivals exit hall past baggage collection.',
            fr: 'Sortie principale des arrivées après retrait des bagages.',
            es: 'Salida principal de llegadas tras recoger equipaje.',
            ar: 'المخرج الرئيسي لصالة الوصول بعد استلام الأمتعة.'
        },
        customsTime: '25–40 min',
        description: {
            en: 'Serving the sunny Atlantic coast, Taghazout Bay surf lodges, and Agadir beach resorts.',
            fr: 'Liaisons vers Taghazout Bay, les spots de surf et les grands hôtels du front de mer.',
            es: 'Conexión con Taghazout Bay, los resorts costeros y playas del sur marroquí.',
            ar: 'خدمات نقل إلى خليج تغازوت ومنتجعات ركوب الأمواج وشواطئ أكادير.'
        },
        localTip: {
            en: 'Traveling with surfboards or golf bags? Our Mercedes Vito vans accommodate bulky sports equipment easily.',
            fr: 'Vous voyagez avec planches de surf ou sacs de golf ? Nos vans Mercedes Vito accueillent tout votre matériel.',
            es: '¿Viaja con tablas de surf o bolsas de golf? Nuestras furgonetas Vito tienen espacio de sobra.',
            ar: 'هل تسافر مع ألواح ركوب الأمواج أو حقائب الجولف؟ شاحنات مرسيدس فيتو تتسع لجميع معداتك بسهولة.'
        }
    },
    {
        code: 'ESU',
        slug: 'marrakech-to-essaouira-transfer',
        name: {
            en: 'Essaouira-Mogador Airport',
            fr: 'Aéroport Essaouira-Mogador',
            es: 'Aeropuerto Essaouira-Mogador',
            ar: 'مطار الصويرة موكادور الدولي'
        },
        city: {
            en: 'Essaouira · Atlantic Wind & Art Coast',
            fr: 'Essaouira · Cité des Alizés & Médina Côtière',
            es: 'Esauira · Ciudad del Viento y Costa Atlántica',
            ar: 'الصويرة · مدينة الرياح والمحيط والفنون'
        },
        meetingPoint: {
            en: 'Main arrivals exit hall. Chauffeur holds a personalized name board.',
            fr: 'Hall de sortie des arrivées avec pancarte nominative personnalisée.',
            es: 'Salida de la terminal con cartel a su nombre.',
            ar: 'مخرج صالة الوصول مع لافتة استقبال باسمك الشخصي.'
        },
        customsTime: '15–30 min',
        description: {
            en: 'Intimate coastal airport just 15 km from Essaouira Medina. Fast private transfers to city hotels, Sidi Kaouki, and Marrakech.',
            fr: 'Aéroport à échelle humaine à 15 km de la médina. Liaisons confortables vers les riads, Sidi Kaouki et Marrakech.',
            es: 'Aeropuerto costero tranquilo a 15 km de la medina. Conexiones privadas hacia riads, playas de surf y Marrakech.',
            ar: 'مطار ساحلي هادئ يبعد 15 كم عن المدينة العتيقة. تنقلات خاصة وسريعة إلى الرياضات، سيدي كاوكي ومراكش.'
        },
        localTip: {
            en: 'The medina is pedestrian-only. We drop you at the closest historic gate (Bab Doukkala or Bab Marrakech) with luggage assistance.',
            fr: 'La médina est piétonne. Nous vous déposons à la porte la plus proche (Bab Doukkala ou Bab Marrakech) avec aide bagages.',
            es: 'La medina es peatonal. Le dejamos en la puerta más cercana (Bab Doukkala o Bab Marrakech) con ayuda de equipaje.',
            ar: 'أزقة المدينة العتيقة مخصصة للمشاة. نوصلك إلى أقرب باب (باب دكالة أو باب مراكش) مع المساعدة بحمل الحقائب.'
        }
    }
];

export const FLEET_VEHICLES: Vehicle[] = [
    {
        id: 'skoda-superb',
        name: 'Skoda Superb',
        category: {
            en: 'Executive Sedan',
            fr: 'Berline Exécutive',
            es: 'Berlina Premium',
            ar: 'سيارة صالون تنفيذية'
        },
        capacityPax: '1–3',
        capacityBags: '3',
        fromPrice: 35,
        image: '/cars/flotte-superb.webp',
        features: {
            en: ['Quiet acoustic glass', 'Dual-zone climate control', 'Chilled bottled water', 'USB phone charging'],
            fr: ['Vitrage acoustique', 'Climatisation bi-zone', 'Bouteilles d\'eau fraîches', 'Ports de charge USB'],
            es: ['Aislamiento acústico', 'Climatizador bizona', 'Agua mineral fría', 'Puertos de carga USB'],
            ar: ['عزل صوتي هادئ', 'تكييف هوائي مزدوج', 'مياه معدنية مبردة', 'منافذ شحن الهواتف']
        }
    },
    {
        id: 'skoda-kodiaq',
        name: 'Skoda Kodiaq',
        category: {
            en: 'Comfort Family SUV',
            fr: 'SUV Grand Confort',
            es: 'SUV Familiar Confort',
            ar: 'سيارة دفع رباعي عائلية'
        },
        capacityPax: '1–4',
        capacityBags: '4',
        fromPrice: 40,
        image: '/cars/flotte-skoda-kodiaq.webp',
        features: {
            en: ['Elevated ride height', 'Extra rear legroom', 'Generous cargo volume', 'Child seats on request'],
            fr: ['Position surélevée', 'Grand espace aux jambes', 'Grand coffre', 'Sièges enfant offerts'],
            es: ['Conducción elevada', 'Amplio espacio para piernas', 'Maletero espacioso', 'Sillas infantiles gratis'],
            ar: ['رؤية بانورامية مرتفعة', 'مساحة واسعة للأرجل', 'صندوق أمتعة فسيح', 'مقاعد أطفال مجانية']
        }
    },
    {
        id: 'mercedes-vito',
        name: 'Mercedes-Benz Vito',
        category: {
            en: 'VIP Luxury Minivan',
            fr: 'Minivan VIP Prestige',
            es: 'Minivan VIP de Lujo',
            ar: 'ميني فان مرسيدس VIP'
        },
        capacityPax: '1–7',
        capacityBags: '6',
        fromPrice: 45,
        image: '/cars/flotte-vito.webp',
        highlight: {
            en: 'Most Popular',
            fr: 'Plus Demandé',
            es: 'Más Popular',
            ar: 'الأكثر طلباً'
        },
        features: {
            en: ['Plush leather seating', 'Rear privacy glass', 'High-speed Wi-Fi', 'Spacious multi-bag cargo'],
            fr: ['Sièges en cuir haut de gamme', 'Vitres teintées intimité', 'Connexion Wi-Fi rapide', 'Grand coffre multi-valises'],
            es: ['Tapicería de cuero prémium', 'Cristales tintados', 'Wi-Fi de alta velocidad', 'Gran volumen para maletas'],
            ar: ['مقاعد جلدية فاخرة', 'زجاج معتم للخصوصية', 'إنترنت واي فاي سريع', 'مساحة تتسع لعدة حقائب']
        }
    },
    {
        id: 'mercedes-sprinter',
        name: 'Mercedes-Benz Sprinter',
        category: {
            en: 'Prestige Executive Minibus',
            fr: 'Minibus Exécutif Prestige',
            es: 'Minibús Ejecutivo Gran Grupo',
            ar: 'حافلة صغيرة تنفيذية للمجموعات'
        },
        capacityPax: '8–16',
        capacityBags: '14',
        fromPrice: 85,
        image: '/cars/flotte-sprinter.webp',
        features: {
            en: ['High roof walk-in cabin', 'Individual reclining seats', 'Dedicated luggage compartment', 'Microphone audio system'],
            fr: ['Pavillon surélevé', 'Sièges individuels inclinables', 'Grande soute à bagages', 'Microphone de bord'],
            es: ['Techo alto para caminar', 'Asientos individuales reclinables', 'Compartimento de equipajes', 'Sistema de audio'],
            ar: ['سقف مرتفع لسهولة الحركة', 'مقاعد فردية مريحة قابلة للإمالة', 'مقصورة مخصصة للأمتعة الكبيرة', 'نظام صوتي متكامل']
        }
    }
];

export const POPULAR_ROUTES: RouteItem[] = [
    // Casablanca Airport (CMN)
    {
        id: 'cmn-rba',
        airportCode: 'CMN',
        title: {
            en: 'Casablanca Airport (CMN) ⇄ Rabat or Salé',
            fr: 'Aéroport Casablanca (CMN) ⇄ Rabat ou Salé',
            es: 'Aeropuerto Casablanca (CMN) ⇄ Rabat o Salé',
            ar: 'مطار الدار البيضاء (CMN) ⇄ الرباط أو سلا'
        },
        pickup: 'Casablanca Airport',
        dropoff: 'Rabat',
        price: 120,
        duration: '1h 30m',
        distance: '120 km',
        badge: 'CMN ⇄ RBA',
        slug: 'casablanca-airport-transfer'
    },
    {
        id: 'cmn-cas',
        airportCode: 'CMN',
        title: {
            en: 'Casablanca Airport (CMN) ⇄ Casablanca City Center',
            fr: 'Aéroport Casablanca (CMN) ⇄ Centre-ville Casablanca',
            es: 'Aeropuerto Casablanca (CMN) ⇄ Casablanca Centro',
            ar: 'مطار الدار البيضاء (CMN) ⇄ وسط مدينة الدار البيضاء'
        },
        pickup: 'Casablanca Airport',
        dropoff: 'Casablanca',
        price: 50,
        duration: '40 min',
        distance: '32 km',
        badge: 'CMN ⇄ Downtown',
        slug: 'casablanca-airport-transfer'
    },
    {
        id: 'cmn-rak',
        airportCode: 'CMN',
        title: {
            en: 'Casablanca Airport (CMN) ⇄ Marrakech City',
            fr: 'Aéroport Casablanca (CMN) ⇄ Marrakech',
            es: 'Aeropuerto Casablanca (CMN) ⇄ Marrakech Ciudad',
            ar: 'مطار الدار البيضاء (CMN) ⇄ مدينة مراكش'
        },
        pickup: 'Casablanca Airport',
        dropoff: 'Marrakech',
        price: 220,
        duration: '2h 45m',
        distance: '240 km',
        badge: 'CMN ⇄ RAK',
        slug: 'casablanca-to-marrakech-transfer'
    },

    // Marrakech Airport (RAK)
    {
        id: 'rak-medina',
        airportCode: 'RAK',
        title: {
            en: 'Marrakech Airport (RAK) ⇄ Medina / Palmeraie',
            fr: 'Aéroport Marrakech (RAK) ⇄ Médina / Palmeraie',
            es: 'Aeropuerto Marrakech (RAK) ⇄ Medina / Palmeral',
            ar: 'مطار مراكش (RAK) ⇄ المدينة العتيقة / النخيل'
        },
        pickup: 'Marrakech Airport',
        dropoff: 'Marrakech',
        price: 45,
        duration: '25 min',
        distance: '8 km',
        badge: 'RAK ⇄ Medina',
        slug: 'marrakech-airport-transfer'
    },
    {
        id: 'rak-essaouira',
        airportCode: 'RAK',
        title: {
            en: 'Marrakech Airport (RAK) ⇄ Essaouira Coast',
            fr: 'Aéroport Marrakech (RAK) ⇄ Essaouira',
            es: 'Aeropuerto Marrakech (RAK) ⇄ Esauira Costa',
            ar: 'مطار مراكش (RAK) ⇄ الصويرة الساحلية'
        },
        pickup: 'Marrakech Airport',
        dropoff: 'Essaouira',
        price: 140,
        duration: '2h 40m',
        distance: '185 km',
        badge: 'RAK ⇄ Coast',
        slug: 'marrakech-airport-transfer'
    },
    {
        id: 'rak-agadir',
        airportCode: 'RAK',
        title: {
            en: 'Marrakech Airport (RAK) ⇄ Agadir / Taghazout',
            fr: 'Aéroport Marrakech (RAK) ⇄ Agadir / Taghazout',
            es: 'Aeropuerto Marrakech (RAK) ⇄ Agadir / Taghazout',
            ar: 'مطار مراكش (RAK) ⇄ أكادير / تغازوت'
        },
        pickup: 'Marrakech Airport',
        dropoff: 'Agadir',
        price: 185,
        duration: '3h 15m',
        distance: '250 km',
        badge: 'RAK ⇄ Atlantic',
        slug: 'marrakech-airport-transfer'
    },

    // Rabat Airport (RBA)
    {
        id: 'rba-rabat',
        airportCode: 'RBA',
        title: {
            en: 'Rabat-Salé Airport (RBA) ⇄ Rabat City Center & Medina',
            fr: 'Aéroport Rabat-Salé (RBA) ⇄ Centre-ville & Médina de Rabat',
            es: 'Aeropuerto Rabat-Salé (RBA) ⇄ Rabat Centro y Medina',
            ar: 'مطار الرباط سلا (RBA) ⇄ وسط الرباط والمدينة العتيقة'
        },
        pickup: 'Rabat Airport',
        dropoff: 'Rabat',
        price: 45,
        duration: '25 min',
        distance: '12 km',
        badge: 'RBA ⇄ Downtown',
        slug: 'rabat-airport-transfer'
    },
    {
        id: 'rba-cmn-city',
        airportCode: 'RBA',
        title: {
            en: 'Rabat-Salé Airport (RBA) ⇄ Casablanca City',
            fr: 'Aéroport Rabat-Salé (RBA) ⇄ Casablanca Centre',
            es: 'Aeropuerto Rabat-Salé (RBA) ⇄ Casablanca Ciudad',
            ar: 'مطار الرباط سلا (RBA) ⇄ مدينة الدار البيضاء'
        },
        pickup: 'Rabat Airport',
        dropoff: 'Casablanca',
        price: 120,
        duration: '1h 20m',
        distance: '105 km',
        badge: 'RBA ⇄ Casablanca',
        slug: 'rabat-airport-transfer'
    },

    // Tangier Airport (TNG)
    {
        id: 'tng-city',
        airportCode: 'TNG',
        title: {
            en: 'Tangier Airport (TNG) ⇄ Tangier City & Kasbah',
            fr: 'Aéroport Tanger (TNG) ⇄ Tanger Ville & Kasbah',
            es: 'Aeropuerto Tánger (TNG) ⇄ Tánger Ciudad y Kasbah',
            ar: 'مطار طنجة (TNG) ⇄ وسط طنجة والقصبة'
        },
        pickup: 'Tangier Airport',
        dropoff: 'Tangier',
        price: 45,
        duration: '25 min',
        distance: '14 km',
        badge: 'TNG ⇄ Downtown',
        slug: 'tangier-airport-transfer'
    },
    {
        id: 'tng-chefchaouen',
        airportCode: 'TNG',
        title: {
            en: 'Tangier Airport (TNG) ⇄ Chefchaouen (Blue City)',
            fr: 'Aéroport Tanger (TNG) ⇄ Chefchaouen (Ville Bleue)',
            es: 'Aeropuerto Tánger (TNG) ⇄ Chefchaouen (Pueblo Azul)',
            ar: 'مطار طنجة (TNG) ⇄ شفشاون (المدينة الزرقاء)'
        },
        pickup: 'Tangier Airport',
        dropoff: 'Chefchaouen',
        price: 140,
        duration: '2h 15m',
        distance: '125 km',
        badge: 'TNG ⇄ Blue Pearl',
        slug: 'tangier-to-chefchaouen-transfer'
    },

    // Fes Airport (FEZ)
    {
        id: 'fez-medina',
        airportCode: 'FEZ',
        title: {
            en: 'Fes-Saïss Airport (FEZ) ⇄ Fes Medina / Riad Escort',
            fr: 'Aéroport Fès-Saïss (FEZ) ⇄ Fès Médina & Riads',
            es: 'Aeropuerto Fez-Saïss (FEZ) ⇄ Fez Medina / Riad',
            ar: 'مطار فاس سايس (FEZ) ⇄ مدينة فاس العتيقة والرياض'
        },
        pickup: 'Fes Airport',
        dropoff: 'Fes',
        price: 45,
        duration: '30 min',
        distance: '15 km',
        badge: 'FEZ ⇄ Old Medina',
        slug: 'fes-airport-transfer'
    },
    {
        id: 'fez-chefchaouen',
        airportCode: 'FEZ',
        title: {
            en: 'Fes-Saïss Airport (FEZ) ⇄ Chefchaouen',
            fr: 'Aéroport Fès-Saïss (FEZ) ⇄ Chefchaouen',
            es: 'Aeropuerto Fez-Saïss (FEZ) ⇄ Chefchaouen',
            ar: 'مطار فاس سايس (FEZ) ⇄ شفشاون'
        },
        pickup: 'Fes Airport',
        dropoff: 'Chefchaouen',
        price: 170,
        duration: '3h 30m',
        distance: '200 km',
        badge: 'FEZ ⇄ Rif',
        slug: 'fes-airport-transfer'
    },

    // Agadir Airport (AGA)
    {
        id: 'aga-taghazout',
        airportCode: 'AGA',
        title: {
            en: 'Agadir Airport (AGA) ⇄ Taghazout Bay / Surf Lodges',
            fr: 'Aéroport Agadir (AGA) ⇄ Taghazout Bay / Surf Hôtels',
            es: 'Aeropuerto Agadir (AGA) ⇄ Taghazout Bay / Alojamientos de Surf',
            ar: 'مطار أكادير (AGA) ⇄ خليج تغازوت ومنتجعات ركوب الأمواج'
        },
        pickup: 'Agadir Airport',
        dropoff: 'Taghazout',
        price: 65,
        duration: '50 min',
        distance: '48 km',
        badge: 'AGA ⇄ Taghazout',
        slug: 'agadir-airport-transfer'
    },
    {
        id: 'aga-city',
        airportCode: 'AGA',
        title: {
            en: 'Agadir Airport (AGA) ⇄ Agadir Beachfront Hotels',
            fr: 'Aéroport Agadir (AGA) ⇄ Hôtels front de mer Agadir',
            es: 'Aeropuerto Agadir (AGA) ⇄ Hoteles de la Playa de Agadir',
            ar: 'مطار أكادير (AGA) ⇄ فنادق كورنيش أكادير'
        },
        pickup: 'Agadir Airport',
        dropoff: 'Agadir',
        price: 50,
        duration: '35 min',
        distance: '28 km',
        badge: 'AGA ⇄ Beach',
        slug: 'agadir-airport-transfer'
    },

    // Essaouira Airport (ESU)
    {
        id: 'esu-medina',
        airportCode: 'ESU',
        title: {
            en: 'Essaouira-Mogador Airport (ESU) ⇄ Essaouira Medina / Coast',
            fr: 'Aéroport Essaouira (ESU) ⇄ Médina d\'Essaouira & Plage',
            es: 'Aeropuerto Esauira (ESU) ⇄ Medina de Esauira y Costa',
            ar: 'مطار الصويرة موكادور (ESU) ⇄ مدينة الصويرة العتيقة والشاطئ'
        },
        pickup: 'Essaouira Airport',
        dropoff: 'Essaouira',
        price: 35,
        duration: '20 min',
        distance: '16 km',
        badge: 'ESU ⇄ Medina',
        slug: 'essaouira-airport-transfer'
    },
    {
        id: 'esu-marrakech',
        airportCode: 'ESU',
        title: {
            en: 'Essaouira-Mogador Airport (ESU) ⇄ Marrakech City / Riad',
            fr: 'Aéroport Essaouira (ESU) ⇄ Marrakech Ville & Riads',
            es: 'Aeropuerto Esauira (ESU) ⇄ Marrakech Ciudad y Riads',
            ar: 'مطار الصويرة موكادور (ESU) ⇄ مدينة مراكش ورياضاتها'
        },
        pickup: 'Essaouira Airport',
        dropoff: 'Marrakech',
        price: 140,
        duration: '2h 40m',
        distance: '185 km',
        badge: 'ESU ⇄ RAK',
        slug: 'marrakech-airport-transfer'
    },
    {
        id: 'esu-taghazout',
        airportCode: 'ESU',
        title: {
            en: 'Essaouira Airport / City (ESU) ⇄ Taghazout Bay & Agadir',
            fr: 'Essaouira (ESU) ⇄ Taghazout Bay & Agadir',
            es: 'Esauira (ESU) ⇄ Taghazout Bay y Agadir',
            ar: 'الصويرة (ESU) ⇄ خليج تغازوت وأكادير'
        },
        pickup: 'Essaouira',
        dropoff: 'Taghazout',
        price: 130,
        duration: '2h 30m',
        distance: '155 km',
        badge: 'ESU ⇄ Taghazout',
        slug: 'agadir-airport-transfer'
    }
];

export const REVIEWS: ReviewItem[] = [
    {
        name: 'Sarah Jenkins',
        country: 'United Kingdom',
        route: 'Casablanca (CMN) → Rabat',
        date: 'October 2026',
        rating: 5,
        quote: {
            en: 'Our flight was delayed by over two hours from London. When we finally landed at 1 AM, our driver Karim was right there with a warm smile and cold bottled water. Outstanding professionalism!',
            fr: 'Notre vol de Londres avait plus de 2 heures de retard. À 1h du matin, notre chauffeur Karim était bien là avec le sourire et des bouteilles d\'eau fraîches. Service irréprochable !',
            es: 'Nuestro vuelo desde Londres sufrió más de dos horas de retraso. Al aterrizar a la 1 de la madrugada, nuestro chófer Karim nos esperaba con una sonrisa y agua fría. ¡Impecable!',
            ar: 'تأخرت رحلتنا من لندن لأكثر من ساعتين. وعند وصولنا في الواحدة ليلاً، كان سائقنا كريم بانتظارنا بابتسامة ترحيبية ومياه مبردة. احترافية عالية جداً!'
        }
    },
    {
        name: 'David & Laura Meyer',
        country: 'Germany',
        route: 'Marrakech (RAK) → Medina Riad',
        date: 'September 2026',
        rating: 5,
        quote: {
            en: 'Navigating Marrakech airport and finding our hidden riad seemed daunting. Mdina Tours met us at arrivals and escorted us straight to the riad reception. Clean Vito van and flat pricing.',
            fr: 'Trouver notre riad dans la médina de Marrakech semblait complexe. Mdina Tours nous a accueillis aux arrivées et guidés jusqu\'à la réception. Minivan Vito impeccable et tarif fixe sans surprise.',
            es: 'Encontrar el riad dentro de la medina nos preocupaba. Mdina Tours nos recibió en llegadas y nos acompañó a pie hasta la misma recepción. Furgoneta impecable y precio cerrado.',
            ar: 'كان الوصول إلى رياضنا داخل أزقة مراكش يبدو مقلقاً. استقبلنا فريق مدينة تورز ورافقونا مباشرة حتى باب الرياض. سيارة فيتو ممتازة وسعر ثابت.'
        }
    },
    {
        name: 'Alejandro Gómez',
        country: 'Spain',
        route: 'Tangier (TNG) → Chefchaouen',
        date: 'August 2026',
        rating: 5,
        quote: {
            en: 'Booked the transfer online with zero deposit. Chauffeur spoke great Spanish and drove very smoothly through the Rif mountains. Very transparent and trustworthy company.',
            fr: 'Réservé en ligne sans aucun acompte. Le chauffeur parlait un espagnol parfait et a conduit avec une grande douceur dans le Rif. Entreprise d\'une confiance absolue.',
            es: 'Reservamos online sin fianza. El conductor hablaba español con fluidez y condujo con muchísima seguridad por las montañas del Rif. Empresa seria y recomendable al 100%.',
            ar: 'حجزنا التوصيل بدون أي دفعة مسبقة. كان السائق يتحدث الإسبانية بطلاقة وقاد بكل هدوء وأمان عبر جبال الريف. شركة موثوقة تستحق كل التقدير.'
        }
    }
];

export const FAQS: FAQItem[] = [
    {
        q: {
            en: 'What happens if my flight to Morocco is delayed?',
            fr: 'Que se passe-t-il si mon vol a du retard ?',
            es: '¿Qué ocurre si mi vuelo sufre un retraso?',
            ar: 'ماذا يحدث إذا تأخرت رحلتي الجوية إلى المغرب؟'
        },
        a: {
            en: "We actively track your flight number in real time. If your arrival is delayed or lands early, your chauffeur automatically adjusts pickup timing. You will never be charged extra waiting fees.",
            fr: "Nous suivons votre vol en temps réel. En cas de retard ou d'avance, l'horaire de votre chauffeur s'ajuste automatiquement sans aucun supplément ni frais d'attente.",
            es: "Monitorizamos su vuelo en tiempo real. Si aterriza con retraso o se adelanta, su conductor ajusta la recogida automáticamente sin ningún recargo por espera.",
            ar: "نتتبع رقم رحلتك الجوية مباشرة لحظة بلحظة. في حال حدوث أي تأخير أو وصول مبكر، يتكيف السائق تلقائياً مع الموعد الجديد دون أي رسوم انتظار إضافية."
        }
    },
    {
        q: {
            en: 'Where will I meet my driver at the airport?',
            fr: 'Où retrouverai-je mon chauffeur à l\'aéroport ?',
            es: '¿Dónde me reuniré con mi conductor en el aeropuerto?',
            ar: 'أين سألتقي بسائقي في المطار؟'
        },
        a: {
            en: "Your driver waits inside the arrivals hall immediately past customs and baggage claim, holding a clear board with your name. We also share your driver's direct WhatsApp contact before landing.",
            fr: "Votre chauffeur vous attend dans le hall des arrivées immédiatement après la douane, avec une pancarte à votre nom. Vous recevez aussi son contact WhatsApp avant l'atterrissage.",
            es: "Su chófer le espera dentro del hall de llegadas justo tras la aduana, con un cartel visible con su nombre. También le enviamos su contacto directo de WhatsApp.",
            ar: "ينتظرك السائق داخل صالة الوصول بعد مخرج الجمارك واستلام الأمتعة مباشرة، حاملاً لافتة واضحة باسمك. كما نرسل لك رقم الواتساب الخاص به مسبقاً."
        }
    },
    {
        q: {
            en: 'Do I need to pay in advance, or can I pay upon arrival?',
            fr: 'Dois-je payer à l\'avance ou à l\'arrivée ?',
            es: '¿Debo pagar por adelantado o a la llegada?',
            ar: 'هل يتوجب علي الدفع مسبقاً أم عند الوصول؟'
        },
        a: {
            en: "Zero upfront deposit is required for standard airport transfers. You pay your driver safely at destination via cash or credit card (EUR, USD, or MAD).",
            fr: "Aucun acompte n'est exigé pour les transferts standard. Vous réglez directement à votre arrivée en espèces ou carte bancaire (EUR, USD ou MAD).",
            es: "No se requiere fianza por adelantado para traslados estándar. Paga cómodamente al llegar en efectivo o con tarjeta de crédito (EUR, USD o MAD).",
            ar: "لا نطلب أي تسبيق مالي مسبق للرحلات الاعتيادية. تدفع لسائقك بكل أمان عند وصولك نقداً أو بالبطاقة البنكية (باليورو، الدولار أو الدرهم المغربي)."
        }
    },
    {
        q: {
            en: 'Can your driver take me directly to my Riad inside the Medina?',
            fr: 'Le chauffeur peut-il me déposer à mon riad dans la médina ?',
            es: '¿Puede el conductor dejarme directamente en mi Riad en la Medina?',
            ar: 'هل يمكن للسائق إيصالي مباشرة إلى الرياض داخل أزقة المدينة؟'
        },
        a: {
            en: "Historic Moroccan medinas are pedestrian-only. We park at the closest vehicle gate and escort you and your bags directly to your riad reception so you never get lost in the alleys.",
            fr: "Les ruelles des médinas étant piétonnes, nous stationnons au point carrossable le plus proche et vous accompagnons à pied avec vos bagages jusqu'au riad.",
            es: "Las medinas históricas son peatonales: aparcamos en el punto más cercano y le acompañamos con las maletas hasta la puerta de su riad.",
            ar: "أزقة المدن العتيقة مخصصة للمشاة فقط. نركن السيارة عند أقرب بوابة يمكن للسيارات الوصول إليها ونرافقك شخصياً مع حقائبك حتى باب الرياض."
        }
    },
    {
        q: {
            en: 'Are highway tolls, parking fees, and luggage included in the fare?',
            fr: 'Les péages, parkings et bagages sont-ils inclus ?',
            es: '¿Están incluidos los peajes, parkings y maletas?',
            ar: 'هل تشمل التسعيرة رسوم الطرق السريعة ومواقف المطار والحقائب؟'
        },
        a: {
            en: "Yes, 100%. Our fares are completely all-inclusive: vehicle fuel, motorway tolls, airport parking, and luggage handling are all covered with zero night surcharges.",
            fr: "Oui, à 100%. Nos tarifs sont fermes et tout inclus : carburant, péages d'autoroute, frais de parking et port des bagages, sans supplément de nuit.",
            es: "Sí, al 100%. Tarifas fijas todo incluido: combustible, peajes de autopista, tarifas de parking y maletas, sin suplementos nocturnos.",
            ar: "نعم بنسبة 100%. أسعارنا ثابتة وتشمل كل شيء: الوقود، رسوم الطريق السيار، مواقف المطار، ومناولة الأمتعة دون أي رسوم ليلية مفاجئة."
        }
    },
    {
        q: {
            en: 'Can I request baby or child car seats?',
            fr: 'Puis-je demander des sièges bébé ou enfant ?',
            es: '¿Puedo solicitar sillitas de bebé o elevadores?',
            ar: 'هل يمكنني طلب مقاعد خاصة بالرضع والأطفال؟'
        },
        a: {
            en: "Yes. Certified child safety seats and booster cushions are provided free of charge. Simply mention the age of your children when requesting your transfer.",
            fr: "Oui. Des sièges bébé et rehausseurs homologués sont mis à votre disposition gratuitement. Précisez simplement l'âge de vos enfants lors de la réservation.",
            es: "Sí. Proporcionamos sillas de seguridad infantil y elevadores homologados gratis. Indique la edad de sus hijos al solicitar el servicio.",
            ar: "نعم، نوفر مقاعد أمان معتمدة للرضع والأطفال مجاناً تماماً. يكفي ذكر أعمار أطفالك عند تأكيد الحجز."
        }
    }
];

export const STATS = [
    { value: '5,000+', label: { en: 'Transfers Completed', fr: 'Transferts Réalisés', es: 'Traslados Realizados', ar: 'رحلة منجزة' }, icon: 'ph:airplane-takeoff-bold' },
    { value: '4.9 / 5', label: { en: 'Verified TrustScore', fr: 'Avis Vérifiés', es: 'Puntuación Verificada', ar: 'تقييم العملاء' }, icon: 'solar:star-bold' },
    { value: '100%', label: { en: 'Fixed Fares (No Extras)', fr: 'Tarifs Fixes Garantis', es: 'Precios Fijos Garantizados', ar: 'أسعار ثابتة ومضمونة' }, icon: 'solar:tag-price-bold' },
    { value: '24 / 7', label: { en: 'Flight Delay Monitoring', fr: 'Suivi des Vols en Continu', es: 'Seguimiento de Retrasos 24/7', ar: 'متابعة مباشرة للرحلات' }, icon: 'solar:clock-circle-bold' }
];

export interface TrustChipItem {
    icon: string;
    iconColor?: string;
    label: Record<Locale, string>;
}

export const TRUST_CHIPS: TrustChipItem[] = [
    { 
        icon: 'solar:shield-check-bold', 
        iconColor: '#34D399', 
        label: { 
            en: 'Free cancellation up to 24h', 
            fr: 'Annulation gratuite jusqu\'à 24h', 
            es: 'Cancelación gratuita hasta 24h', 
            ar: 'إلغاء مجاني حتى 24 ساعة' 
        } 
    },
    { 
        icon: 'solar:star-bold', 
        iconColor: '#FBBF24', 
        label: { 
            en: '4.9 Rating · 340+ Reviews', 
            fr: 'Note 4.9 · 340+ Avis', 
            es: 'Nota 4.9 · 340+ Reseñas', 
            ar: 'تقييم 4.9 · أكثر من 340 تقييماً' 
        } 
    },
    { 
        icon: 'solar:tag-price-bold', 
        iconColor: '#FB923C', 
        label: { 
            en: '100% Fixed price · Zero surprises', 
            fr: 'Prix fixe 100% garanti · Sans surprise', 
            es: 'Precio cerrado · Sin costes ocultos', 
            ar: 'سعر ثابت 100% · بدون مفاجآت' 
        } 
    }
];

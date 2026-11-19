export const APPROVED_ES_PATHS = new Set([
    '',
    '/',
    '/private-driver-morocco',
    '/airport-transfers',
    '/transfers',
    '/tours',
    // Phase 1 Transfers
    '/transfers/casablanca-airport-transfer',
    '/transfers/marrakech-airport-transfer',
    '/transfers/rabat-airport-transfer',
    '/transfers/rabat-to-casablanca-transfer',
    '/transfers/casablanca-to-marrakech-transfer',
    // Phase 2 Transfers
    '/transfers/tangier-port-transfer',
    '/transfers/tangier-to-chefchaouen-transfer',
    '/transfers/tangier-airport-transfer',
    '/transfers/marrakech-to-essaouira-transfer',
    '/transfers/fes-to-chefchaouen-transfer',
    '/transfers/fes-airport-transfer',
    // Phase 1 Tours
    '/tours/chefchaouen-day-trip',
    // Phase 2 Tours
    '/tours/marrakech-day-trip',
    '/tours/atlas-mountains-tour',
    '/tours/agafay-desert-experience',
    '/tours/merzouga-desert-tour',
    '/tours/fes-guided-tour',
    '/tours/casablanca-city-tour',
    '/tours/rabat-city-tour',
    // Static Pages
    '/contact',
    '/faq',
    '/about',
    '/car-with-driver-morocco-8-days',
    '/privacy',
    '/terms',
]);

export const APPROVED_PHASE1_ES_PATHS = APPROVED_ES_PATHS;

export function isSpanishSupported(pathWithoutLang: string = ''): boolean {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    if (APPROVED_ES_PATHS.has(cleanPath)) return true;
    if (cleanPath.startsWith('/transfers/')) {
        const withTransfer = cleanPath.endsWith('-transfer') ? cleanPath : `${cleanPath}-transfer`;
        return APPROVED_ES_PATHS.has(withTransfer);
    }
    return false;
}

export function getAlternates(lang: string, pathWithoutLang: string = '') {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    const baseUrl = 'https://mdinatours.com';
    const isHome = cleanPath === '' || cleanPath === '/';

    const languages: Record<string, string> = {
        'en': isHome ? `${baseUrl}/` : `${baseUrl}/en${cleanPath}`,
        'fr': isHome ? `${baseUrl}/fr` : `${baseUrl}/fr${cleanPath}`,
        'x-default': isHome ? `${baseUrl}/` : `${baseUrl}/en${cleanPath}`,
    };

    if (isSpanishSupported(cleanPath)) {
        languages['es'] = isHome ? `${baseUrl}/es` : `${baseUrl}/es${cleanPath}`;
    }

    const canonical = isHome
        ? (lang === 'en' ? `${baseUrl}/` : `${baseUrl}/${lang}`)
        : `${baseUrl}/${lang}${cleanPath}`;

    return {
        canonical,
        languages,
    };
}

export const SCHEMA_BRAND = {
    "@type": "Brand",
    "name": "Mdina Tours"
};

export const SCHEMA_RETURN_POLICY = {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "MA",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 1,
    "returnMethod": "https://schema.org/ReturnByMail",
    "returnFees": "https://schema.org/FreeReturn"
};

export const SCHEMA_SHIPPING_DETAILS = {
    "@type": "OfferShippingDetails",
    "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0.00",
        "currency": "EUR"
    },
    "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "MA"
    },
    "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
        },
        "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
        }
    }
};

export const MDINA_SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/mdinatours/',
    tiktok: 'https://www.tiktok.com/@mdinatours',
    linkedin: 'https://www.linkedin.com/company/mdina-tours',
    facebook: 'https://www.facebook.com/p/Mdina-tours-61594608887112/',
    twitter: 'https://x.com/Haifadev',
};

export const SCHEMA_SAME_AS = [
    'https://www.instagram.com/mdinatours/',
    'https://www.tiktok.com/@mdinatours',
    'https://www.linkedin.com/company/mdina-tours',
    'https://www.facebook.com/p/Mdina-tours-61594608887112/',
    'https://x.com/Haifadev',
];

export const SCHEMA_ORGANIZATION_ID = 'https://mdinatours.com/#organization';

export const SCHEMA_KNOWS_LANGUAGE = ['en', 'fr', 'es', 'ar'];

export const SCHEMA_AREA_SERVED = [
    {
        "@type": "Country",
        "name": "Morocco"
    },
    {
        "@type": "City",
        "name": "Casablanca"
    },
    {
        "@type": "City",
        "name": "Marrakech"
    },
    {
        "@type": "City",
        "name": "Rabat"
    },
    {
        "@type": "City",
        "name": "Tangier"
    },
    {
        "@type": "City",
        "name": "Fes"
    },
    {
        "@type": "City",
        "name": "Agadir"
    },
    {
        "@type": "City",
        "name": "Chefchaouen"
    },
    {
        "@type": "City",
        "name": "Essaouira"
    },
    {
        "@type": "City",
        "name": "Merzouga"
    },
    {
        "@type": "City",
        "name": "Ouarzazate"
    },
    {
        "@type": "Airport",
        "name": "Casablanca Mohammed V International Airport",
        "iataCode": "CMN"
    },
    {
        "@type": "Airport",
        "name": "Marrakech Menara Airport",
        "iataCode": "RAK"
    },
    {
        "@type": "Airport",
        "name": "Rabat-Salé Airport",
        "iataCode": "RBA"
    },
    {
        "@type": "Airport",
        "name": "Tangier Ibn Battouta Airport",
        "iataCode": "TNG"
    },
    {
        "@type": "Airport",
        "name": "Fes-Saïss Airport",
        "iataCode": "FEZ"
    },
    {
        "@type": "Airport",
        "name": "Agadir Al Massira Airport",
        "iataCode": "AGA"
    }
];

export const SCHEMA_PROVIDER = {
    "@type": "TravelAgency",
    "@id": SCHEMA_ORGANIZATION_ID,
    "name": "Mdina Tours",
    "telephone": "+212724114775",
    "url": "https://mdinatours.com/",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rabat",
        "addressRegion": "Rabat-Salé-Kénitra",
        "addressCountry": "MA"
    }
};

export const SCHEMA_OFFER_CATALOG = {
    "@type": "OfferCatalog",
    "name": "Mdina Tours Transport Services",
    "itemListElement": [
        {
            "@type": "OfferCatalog",
            "name": "Airport Transfers Morocco",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Casablanca Mohammed V Airport (CMN) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/casablanca-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Marrakech Menara Airport (RAK) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/marrakech-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Rabat-Salé Airport (RBA) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/rabat-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tangier Ibn Battouta Airport (TNG) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/tangier-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Fes-Saïss Airport (FEZ) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/fes-airport-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Agadir Al Massira Airport (AGA) Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/agadir-airport-transfer"
                    }
                }
            ]
        },
        {
            "@type": "OfferCatalog",
            "name": "Private Chauffeur & Driver at Disposal",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Hourly Chauffeur Hire in Morocco (from €25/hour)",
                        "url": "https://mdinatours.com/en/private-driver-morocco"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Full-Day Private Driver at Disposal (~8 hours, from €140/day)",
                        "url": "https://mdinatours.com/en/private-driver-morocco"
                    }
                }
            ]
        },
        {
            "@type": "OfferCatalog",
            "name": "Intercity Private Transfers",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Casablanca to Marrakech Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/casablanca-to-marrakech-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tangier to Chefchaouen Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/tangier-to-chefchaouen-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Fes to Chefchaouen Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/fes-to-chefchaouen-transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Marrakech to Essaouira Private Transfer",
                        "url": "https://mdinatours.com/en/transfers/marrakech-to-essaouira-transfer"
                    }
                }
            ]
        }
    ]
};

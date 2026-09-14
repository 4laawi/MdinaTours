import { getAlternates } from '@/lib/seo';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import ReactDOM from 'react-dom';

const outfit = Outfit({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});

import { Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    
    let title = 'Mdina Tours | Bespoke Morocco Chauffeur & Private Tours';
    let description = 'Mdina Tours provides executive private driver services, intercity airport transfers, and tailor-made Morocco tours across Rabat, Casablanca, Marrakech, and Tangier.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Mdina Tours | Chauffeur Privé & Circuits d\'Exception au Maroc';
        description = 'Mdina Tours propose des services de chauffeur privé haut de gamme, des navettes aéroport et des circuits sur mesure à Rabat, Casablanca, Marrakech et Tanger.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Mdina Tours | Chófer Privado y Rutas a Medida en Marruecos';
        description = 'Servicios de conductor privado, traslados desde el aeropuerto y rutas personalizadas en Marruecos (Casablanca, Marrakech, Rabat, Tánger y Fez).';
        ogLocale = 'es_ES';
    }

    const url = `https://mdinatours.com/${lang}`;

    return {
        title,
        description,
        alternates: getAlternates(lang),
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
                    alt: 'Mdina Tours Morocco',
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

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    let agencyDescription = "Mdina Tours is a premium Morocco travel agency offering airport transfers, intercity driver services, and customizable private tours from Rabat.";
    if (lang === 'fr') {
        agencyDescription = "Mdina Tours est une agence de voyage de premier plan au Maroc proposant des transferts aéroports, des chauffeurs privés et des circuits sur mesure depuis Rabat.";
    } else if (lang === 'es') {
        agencyDescription = "Mdina Tours ofrece servicios de transporte privado, traslados de aeropuerto y excursiones a medida en Marruecos con conductores profesionales.";
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Mdina Tours",
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "logo": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "description": agencyDescription,
        "url": `https://mdinatours.com/${lang}`,
        "telephone": "+212724114775",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rabat",
            "addressRegion": "Rabat-Salé-Kénitra",
            "addressCountry": "MA"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "184",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    // Preconnect to Google Fonts origin to reduce font load latency
    ReactDOM.preconnect('https://fonts.googleapis.com');
    ReactDOM.preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' });
    // Preload the hero image (LCP candidate) for both locales
    ReactDOM.preload('/img/Morocco-trip-tour-hero01.webp', { as: 'image', fetchPriority: 'high' });

    return (
        <html lang={lang} className={`${outfit.variable}`}>
            <body>
                <LanguageProvider initialLanguage={lang as Language}>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}

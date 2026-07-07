import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import ReactDOM from 'react-dom';

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Mdina Tours – Private Morocco Tours & Transfers' : 'Mdina Tours – Circuits Privés & Transferts au Maroc';
    const description = isEn
        ? 'Mdina Tours is a premium Morocco travel agency offering airport transfers, intercity driver services, and customizable private tours from Rabat.'
        : 'Mdina Tours est une agence de voyage de premier plan au Maroc proposant des transferts aéroports, des chauffeurs privés et des circuits sur mesure depuis Rabat.';
    const url = `https://mdinatours.com/${lang}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en',
                'fr': 'https://mdinatours.com/fr',
            },
        },
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
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Mdina Tours",
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "logo": "https://mdinatours.com/logo-primary.png",
        "description": lang === 'en'
            ? "Mdina Tours is a premium Morocco travel agency offering airport transfers, intercity driver services, and customizable private tours from Rabat."
            : "Mdina Tours est une agence de voyage de premier plan au Maroc proposant des transferts aéroports, des chauffeurs privés et des circuits sur mesure depuis Rabat.",
        "url": `https://mdinatours.com/${lang}`,
        "telephone": "+212766816992",
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
        <html lang={lang} className={`${poppins.variable}`}>
            <body>
                <LanguageProvider initialLanguage={lang as 'en' | 'fr'}>
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

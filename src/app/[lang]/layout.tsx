import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import SEOMetadata from '@/components/SEOMetadata';

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

    const title = isEn ? 'ZahriTours – Best Morocco Tours & Trips' : 'ZahriTours – Meilleures Visites et Voyages au Maroc';
    const description = isEn
        ? 'ZahriTours is a top Morocco travel agency offering desert tours, city trips, and tailor-made adventures. Explore Morocco with our trusted guides.'
        : 'ZahriTours est une agence de voyage de premier plan au Maroc proposant des circuits dans le désert, des excursions en ville et des aventures sur mesure.';
    const url = `https://zahritours.com/${lang}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://zahritours.com/en',
                'fr': 'https://zahritours.com/fr',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'ZahriTours',
            images: [
                {
                    url: 'https://zahritours.com/hero-marrakech.webp',
                    width: 1200,
                    height: 630,
                    alt: 'ZahriTours Morocco',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://zahritours.com/hero-marrakech.webp'],
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
        "name": "ZahriTours",
        "image": "https://zahritours.com/ZahriTours-Logo.png",
        "description": lang === 'en'
            ? "ZahriTours is a top Morocco travel agency offering desert tours, city trips, and tailor-made adventures. Explore Morocco with our trusted guides."
            : "ZahriTours est une agence de voyage de premier plan au Maroc proposant des circuits dans le désert, des excursions en ville et des aventures sur mesure.",
        "url": `https://zahritours.com/${lang}`,
        "telephone": "+212766816992",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tangier",
            "addressCountry": "MA"
        }
    };

    return (
        <html lang={lang} className={`${poppins.variable}`}>
            <body>
                <LanguageProvider initialLanguage={lang as 'en' | 'fr'}>
                    <SEOMetadata />
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

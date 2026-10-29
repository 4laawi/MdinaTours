import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import AirportTransfersClient from './components/AirportTransfersClient';
import { Locale, FAQS } from '@/lib/airportTransfersData';
import { Metadata } from 'next';
import { Language } from '@/lib/translations';
import TransferHubRoutesGrid from '@/components/transfers/TransferHubRoutesGrid';

export const revalidate = 86400;

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    
    let title = 'Morocco Airport Transfers & Private Shuttles | Mdina Tours';
    let description = 'Private Morocco airport transfers across Casablanca (CMN), Marrakech (RAK), Rabat (RBA) & Tangier (TNG). Flat rates, flight tracking, terminal meet & greet, and pay on arrival.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Transferts Aéroport Maroc & Navettes Privées | Mdina Tours';
        description = 'Transferts aéroport privés à Casablanca (CMN), Marrakech (RAK), Rabat et Tanger. Tarifs fixes, 60 min d\'attente offerte, suivi de vol et accueil avec pancarte nominative.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Traslados Aeropuerto en Marruecos y Shuttles Privados | Mdina Tours';
        description = 'Traslados privados de aeropuerto en Casablanca (CMN), Marrakech (RAK), Rabat y Tánger. Tarifas fijas garantizadas, 60 min de espera gratuita y pago seguro a la llegada.';
        ogLocale = 'es_ES';
    } else if (lang === 'ar') {
        title = 'خدمات توصيل مطارات المغرب وحافلات مكوكية خاصة | مدينة تورز';
        description = 'خدمة نقل وتوصيل خاصة من مطارات الدار البيضاء، مراكش، الرباط وطنجة. أسعار ثابتة، 60 دقيقة انتظار مجاناً، تتبع مباشر للرحلات واستقبال بالاسم.';
        ogLocale = 'ar_MA';
    }

    const url = `https://mdinatours.com/${lang}/airport-transfers`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/airport-transfers'),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/b-roll/private-transfer-chauffeur-vito.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Morocco Airport Transfers Chauffeur Service - Mdina Tours',
                },
            ],
            locale: ogLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/b-roll/private-transfer-chauffeur-vito.jpg'],
        },
    };
}

export default async function AirportTransfersPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const currentLang = (['en', 'fr', 'es', 'ar'].includes(lang) ? lang : 'en') as Locale;
    const isAr = currentLang === 'ar';
    const isFr = currentLang === 'fr';
    const isEs = currentLang === 'es';

    // Breadcrumb translations
    const breadcrumbHome = isAr ? 'الرئيسية' : isFr ? 'Accueil' : isEs ? 'Inicio' : 'Home';
    const breadcrumbCurrent = isAr ? 'توصيل المطارات' : isFr ? 'Transferts Aéroport' : isEs ? 'Traslados de Aeropuerto' : 'Airport Transfers';

    // Structured JSON-LD Schemas for SEO and GEO
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": ["Product", "TaxiService"],
        "name": isAr ? "خدمة توصيل مطارات المغرب" : isFr ? "Transferts Aéroport au Maroc" : isEs ? "Traslados de Aeropuerto en Marruecos" : "Morocco Airport Transfers",
        "description": "Premium private airport transfer and chauffeur service connecting Casablanca (CMN), Marrakech (RAK), Rabat (RBA), Tangier (TNG), Fes (FEZ), and Agadir (AGA) to city centers, hotels, and medina riads.",
        "image": "https://mdinatours.com/b-roll/private-transfer-chauffeur-vito.jpg",
        "url": `https://mdinatours.com/${currentLang}/airport-transfers`,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "telephone": "+212724114775",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            }
        },
        "areaServed": [
            { "@type": "AdministrativeArea", "name": "Casablanca" },
            { "@type": "AdministrativeArea", "name": "Marrakech" },
            { "@type": "AdministrativeArea", "name": "Rabat" },
            { "@type": "AdministrativeArea", "name": "Tangier" },
            { "@type": "AdministrativeArea", "name": "Fes" },
            { "@type": "AdministrativeArea", "name": "Agadir" }
        ],
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "35",
            "highPrice": "220",
            "priceCurrency": "EUR",
            "priceValidUntil": `${new Date().getFullYear() + 1}-12-31`,
            "availability": "https://schema.org/InStock"
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": breadcrumbHome,
                "item": currentLang === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${currentLang}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": breadcrumbCurrent,
                "item": `https://mdinatours.com/${currentLang}/airport-transfers`
            }
        ]
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(item => ({
            "@type": "Question",
            "name": item.q[currentLang] || item.q.en,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a[currentLang] || item.a.en
            }
        }))
    };

    return (
        <>
            {/* Structured Schema Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <Header />

            <main>
                <AirportTransfersClient lang={currentLang} />
                <TransferHubRoutesGrid language={currentLang === 'ar' ? 'en' : (currentLang as Language)} showTours={true} />
            </main>

            <Footer lang={currentLang === 'ar' ? 'en' : (currentLang as Language)} />
            <FloatingElements />
        </>
    );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { transfersData } from '@/lib/transfersData';
import { translations, Language } from '@/lib/translations';
import TransferBookingFlow from '@/components/TransferBookingFlow';
import Script from 'next/script';

// Generate static routes for static HTML generation
export async function generateStaticParams() {
    const paths: { lang: string; slug: string }[] = [];
    const locales = ['en', 'fr'];
    transfersData.forEach(trans => {
        locales.forEach(lang => {
            paths.push({ lang, slug: trans.slug });
        });
    });
    return paths;
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const trans = transfersData.find(t => t.slug === slug);
    if (!trans) return { title: 'Transfer Route Not Found - Mdina Tours' };

    const local = trans[lang as Language] || trans.en;
    const url = `https://mdinatours.com/${lang}/transfers/${slug}`;

    return {
        title: local.seoTitle,
        description: local.seoDesc,
        alternates: {
            canonical: url,
            languages: {
                'en': `https://mdinatours.com/en/transfers/${slug}`,
                'fr': `https://mdinatours.com/fr/transfers/${slug}`,
            }
        },
        openGraph: {
            title: local.seoTitle,
            description: local.seoDesc,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: `https://mdinatours.com${trans.image}`,
                    width: 1200,
                    height: 630,
                    alt: local.title,
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: local.seoTitle,
            description: local.seoDesc,
            images: [`https://mdinatours.com${trans.image}`],
        },
    };
}

export default async function TransferLandingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const trans = transfersData.find(t => t.slug === slug);
    if (!trans) notFound();

    const local = trans[language];
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // WhatsApp Booking Link Builder
    const getWhatsAppUrl = (pCount: number, price: number) => {
        const msg = `Hello Mdina Tours,\nI would like to book a private transfer: "${local.title}".\n\n• Route: ${local.pickup} ⇄ ${local.dropoff}\n• Travelers: ${pCount}\n• Price: €${price}\n\nPlease let me know availability.`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
    };

    // JSON-LD Structured Data
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": local.title,
        "description": local.tagline,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/hero-marrakech.webp",
            "telephone": "+212766816992",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            }
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Morocco"
        },
        "offers": Object.entries(trans.prices).map(([pCount, price]) => ({
            "@type": "Offer",
            "name": `${pCount} Passenger Tier`,
            "priceCurrency": "EUR",
            "price": price
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": isEn ? "David K." : "Jean P."
                },
                "datePublished": "2026-05-01",
                "reviewBody": isEn 
                    ? "Very smooth transfer. Punctual chauffeur, very professional driver, clean minivan. Recommended!"
                    : "Transfert parfait. Chauffeur ponctuel, très professionnel, minivan propre. Recommandé !",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                }
            }
        ]
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : "Accueil",
                "item": `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Private Transfers" : "Transferts Privés",
                "item": `https://mdinatours.com/${language}/transfers`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": local.title,
                "item": `https://mdinatours.com/${language}/transfers/${slug}`
            }
        ]
    };

    const faqJsonLd = local.faqs && local.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": local.faqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    } : null;

    return (
        <>
            <Header lightBg={true} />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingTop: '100px' }}>
                <TransferBookingFlow trans={trans} language={language} />
            </main>
            <Footer lang={language} />
            <FloatingElements />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
        </>
    );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { transfersData } from '@/lib/transfersData';
import { translations, Language } from '@/lib/translations';
import { isSpanishSupported, SCHEMA_BRAND, SCHEMA_RETURN_POLICY, SCHEMA_SHIPPING_DETAILS } from '@/lib/seo';
import TransferBookingFlow from '@/components/TransferBookingFlow';
import TransferWebRatings from '@/components/transfers/TransferWebRatings';
import TransferWhatsIncluded from '@/components/transfers/TransferWhatsIncluded';
import TransferDestinationInfo from '@/components/transfers/TransferDestinationInfo';
import TransferFAQ from '@/components/transfers/TransferFAQ';
import faqStyles from '@/components/FAQ.module.css';

// Direct imports guarantee full server-side HTML rendering without client-bundle delay
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import VideoPlayer from '@/components/VideoPlayer';
import TransferReviews from '@/components/transfers/TransferReviews';
import TransferFleet from '@/components/transfers/TransferFleet';
import TransferOtherRoutes from '@/components/transfers/TransferOtherRoutes';
import TransferTaxiComparison from '@/components/transfers/TransferTaxiComparison';
import TransferFixedPriceTable from '@/components/transfers/TransferFixedPriceTable';

// Enable SSG with ISR revalidation every 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

// Helper to look up transfer by canonical slug or core route slug (with or without -transfer)
function getTransferBySlug(slug: string) {
    if (!slug) return undefined;
    const clean = slug.trim().toLowerCase();
    return transfersData.find(t => {
        const tSlug = t.slug.toLowerCase();
        return (
            tSlug === clean ||
            tSlug === `${clean}-transfer` ||
            tSlug.replace(/-transfer$/, '') === clean
        );
    });
}

// Generate static routes for all core Moroccan transfer slugs and variants
export async function generateStaticParams() {
    const paths: { lang: string; slug: string }[] = [];
    const locales = ['en', 'fr'];
    
    transfersData.forEach(trans => {
        const baseSlug = trans.slug.replace(/-transfer$/, '');
        // Statically pre-render both the canonical slug and core slug (e.g. casablanca-to-marrakech)
        const slugsToGenerate = [trans.slug];
        if (baseSlug !== trans.slug) {
            slugsToGenerate.push(baseSlug);
        }

        locales.forEach(lang => {
            slugsToGenerate.forEach(slug => {
                paths.push({ lang, slug });
            });
        });

        // Include 'es' for strictly approved Spanish transfer routes
        if (isSpanishSupported(`/transfers/${trans.slug}`) || isSpanishSupported(`/transfers/${baseSlug}`)) {
            slugsToGenerate.forEach(slug => {
                paths.push({ lang: 'es', slug });
            });
        }
    });

    return paths;
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const trans = getTransferBySlug(slug);
    if (!trans) return { title: 'Transfer Route Not Found - Mdina Tours' };

    // Strict boundary check for Spanish
    if (lang === 'es' && (!trans.es || !isSpanishSupported(`/transfers/${trans.slug}`))) {
        return { title: 'Not Found - Mdina Tours' };
    }

    const local = trans[lang as Language] || trans.en;
    // Keep canonical URL consolidated to the primary canonical slug
    const url = `https://mdinatours.com/${lang}/transfers/${trans.slug}`;

    const alternatesLanguages: Record<string, string> = {
        'en': `https://mdinatours.com/en/transfers/${trans.slug}`,
        'fr': `https://mdinatours.com/fr/transfers/${trans.slug}`,
        'x-default': `https://mdinatours.com/en/transfers/${trans.slug}`,
    };
    if (isSpanishSupported(`/transfers/${trans.slug}`)) {
        alternatesLanguages['es'] = `https://mdinatours.com/es/transfers/${trans.slug}`;
    }

    return {
        title: local.seoTitle,
        description: local.seoDesc,
        alternates: {
            canonical: url,
            languages: alternatesLanguages
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
            locale: lang === 'fr' ? 'fr_FR' : (lang === 'es' ? 'es_ES' : 'en_US'),
            type: 'website',
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
    const isEs = language === 'es';

    const trans = getTransferBySlug(slug);
    if (!trans) notFound();

    // Strict boundary check: unsupported Spanish transfers return 404
    if (language === 'es' && (!trans.es || !isSpanishSupported(`/transfers/${trans.slug}`))) {
        notFound();
    }

    const local = trans[language] || trans.en;
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    // WhatsApp Booking Link Builder
    const getWhatsAppUrl = (pCount: number, price: number) => {
        const msg = `Hello Mdina Tours,\nI would like to book a private transfer: "${local.title}".\n\n• Route: ${local.pickup} ⇄ ${local.dropoff}\n• Travelers: ${pCount}\n• Price: €${price}\n\nPlease let me know availability.`;
        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    // JSON-LD Structured Data
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": ["Product", "TaxiService"],
        "name": local.title,
        "description": local.tagline,
        "image": `https://mdinatours.com${trans.image}`,
        "url": `https://mdinatours.com/${language}/transfers/${trans.slug}`,
        "brand": SCHEMA_BRAND,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "image": "https://mdinatours.com/hero-marrakech.webp",
            "telephone": "+212724114775",
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
            "price": price,
            "availability": "https://schema.org/InStock",
            "validFrom": `${new Date().getFullYear()}-01-01`,
            "priceValidUntil": `${new Date().getFullYear() + 1}-12-31`,
            "url": `https://mdinatours.com/${language}/transfers/${trans.slug}`,
            "hasMerchantReturnPolicy": SCHEMA_RETURN_POLICY,
            "shippingDetails": SCHEMA_SHIPPING_DETAILS
        }))
    };

    const isAirportRoute = trans.slug.toLowerCase().includes('airport');
    const parentBreadcrumbName = isAirportRoute
        ? (isEn ? "Airport Transfers" : isEs ? "Traslados al Aeropuerto" : "Transferts Aéroport")
        : (isEn ? "Intercity Transfers" : isEs ? "Traslados Interurbanos" : "Transferts Intervilles");
    const parentBreadcrumbUrl = isAirportRoute
        ? `https://mdinatours.com/${language}/airport-transfers`
        : `https://mdinatours.com/${language}/transfers`;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : isEs ? "Inicio" : "Accueil",
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": parentBreadcrumbName,
                "item": parentBreadcrumbUrl
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": local.title,
                "item": `https://mdinatours.com/${language}/transfers/${trans.slug}`
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

                {/* Why Choose Us Section */}
                <PrivateDriverWhyChooseUs lang={language} />

                {/* Taxi vs Private Transfer Comparison Section (Targets "taxi" keyword intent & objections) */}
                {local.taxiComparison && (
                    <TransferTaxiComparison data={local.taxiComparison} isEn={isEn} isEs={isEs} />
                )}

                {/* Fixed Fares Directory Section (Targets "airport taxi price & cost" featured snippets) */}
                {local.fixedPriceTable && (
                    <TransferFixedPriceTable data={local.fixedPriceTable} isEn={isEn} isEs={isEs} />
                )}

                {/* Video Experience Section */}
                <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ 
                            fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                            fontWeight: 700, 
                            color: 'var(--secondary)', 
                            marginBottom: '30px',
                            fontFamily: 'var(--font-poppins), sans-serif'
                        }}>
                            {isEn ? "What riding with us feels like" : "L'expérience à bord avec nous"}
                        </h2>
                        
                        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                            <VideoPlayer 
                                src="/img/tours-mdina-tours-morocco.mp4" 
                                style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                            />
                        </div>

                        <p style={{ 
                            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', 
                            fontWeight: 500, 
                            color: '#555',
                            margin: '15px 0 0 0',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontStyle: 'italic'
                        }}>
                            {isEn ? "Every transfer. Every time. No surprises." : "Chaque transfert. À chaque fois. Sans surprise."}
                        </p>
                    </div>
                </section>

                {/* Independent Ratings Across the Web */}
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px 0 20px' }}>
                    <TransferWebRatings isEn={isEn} isEs={isEs} />
                </div>

                {/* Testimonials (Marquee Reviews) Section */}
                <TransferReviews language={language} />

                {/* Dynamic Fleet Slider Section */}
                <TransferFleet prices={trans.prices} lang={language} local={local} />

                {/* Whats Included / What's Covered Section */}
                <TransferWhatsIncluded language={language} local={local} />

                {/* Other Top Transfer Routes Section */}
                <TransferOtherRoutes language={language} currentSlug={trans.slug} />

                {/* FAQ Accordion Section */}
                <section className={faqStyles.faqSection} id="faq">
                    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <TransferFAQ faqs={local.faqs} slug={trans.slug} isEn={isEn} />
                    </div>
                </section>

                {/* About Destination Section */}
                {local.aboutDestination && (
                    <section style={{ 
                        padding: '100px 20px', 
                        backgroundColor: '#ffffff', 
                        borderTop: '1px solid rgba(0,0,0,0.05)' 
                    }} id="about-destination">
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>
                            <TransferDestinationInfo local={local} isEn={isEn} />
                        </div>
                    </section>
                )}
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

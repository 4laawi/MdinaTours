import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { toursData } from '@/lib/toursData';
import { translations, Language } from '@/lib/translations';
import TourBookingWidget from '@/components/TourBookingWidget';

// Generate static routes for static HTML generation
export async function generateStaticParams() {
    const paths: { lang: string; slug: string }[] = [];
    const locales = ['en', 'fr'];
    toursData.forEach(tour => {
        locales.forEach(lang => {
            paths.push({ lang, slug: tour.slug });
        });
    });
    return paths;
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const tour = toursData.find(t => t.slug === slug);
    if (!tour) return { title: 'Tour Not Found - Mdina Tours' };

    const local = tour[lang as Language] || tour.en;
    const url = `https://mdinatours.com/${lang}/tours/${slug}`;

    return {
        title: local.seoTitle,
        description: local.seoDesc,
        alternates: {
            canonical: url,
            languages: {
                'en': `https://mdinatours.com/en/tours/${slug}`,
                'fr': `https://mdinatours.com/fr/tours/${slug}`,
            }
        },
        openGraph: {
            title: local.seoTitle,
            description: local.seoDesc,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: `https://mdinatours.com${tour.image}`,
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
            images: [`https://mdinatours.com${tour.image}`],
        },
    };
}

export default async function TourLandingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const tour = toursData.find(t => t.slug === slug);
    if (!tour) notFound();

    const local = tour[language];
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;



    // JSON-LD Structured Data for TouristTrip
    const tripJsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": local.title,
        "description": local.description,
        "image": `https://mdinatours.com${tour.image}`,
        "touristType": "International Tourists",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": tour.price,
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01"
        },
        "itinerary": local.itinerary.map((item, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": item.title,
            "text": item.desc
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "98",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": isEn ? "Sarah L." : "Sophie D."
                },
                "datePublished": "2026-04-12",
                "reviewBody": isEn 
                    ? "An absolutely unforgettable experience! Our driver was professional, punctual, and very knowledgeable."
                    : "Une expérience absolument inoubliable ! Notre chauffeur était professionnel, ponctuel et très sympathique.",
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
                "name": isEn ? "Private Tours" : "Circuits Privés",
                "item": `https://mdinatours.com/${language}/tours`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": local.title,
                "item": `https://mdinatours.com/${language}/tours/${slug}`
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
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                {/* Hero Header */}
                <section style={{
                    position: 'relative',
                    height: '500px',
                    width: '100%'
                }}>
                    <Image
                        src={tour.image}
                        alt={local.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes="100vw"
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(11,22,44,0.4), rgba(11,22,44,0.85))'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: 0,
                        right: 0
                    }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', color: '#fff' }}>
                            <nav style={{ fontSize: '0.85rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                <Link href={getPath('/')} style={{ color: '#ccc', textDecoration: 'none' }}>{t('home')}</Link>
                                <span style={{ margin: '0 10px', color: 'var(--primary)' }}>/</span>
                                <Link href={getPath('/tours')} style={{ color: '#ccc', textDecoration: 'none' }}>{isEn ? 'Tours' : 'Circuits'}</Link>
                                <span style={{ margin: '0 10px', color: 'var(--primary)' }}>/</span>
                                <span style={{ color: '#fff' }}>{local.title}</span>
                            </nav>
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                                fontWeight: 300,
                                margin: '0 0 10px 0',
                                lineHeight: 1.1,
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                color: '#fff'
                            }}>
                                {local.title}
                            </h1>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                                color: '#e5e5e5',
                                fontStyle: 'italic',
                                fontFamily: "'Cormorant Garamond', serif",
                                margin: 0,
                                maxWidth: '750px'
                            }}>
                                {local.tagline}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content Layout */}
                <section style={{ padding: '60px 20px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="grid-layout">
                        {/* Adjust column sizes via styling or layout logic */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            
                            {/* Two-column layout grid for desktop */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '40px',
                                alignItems: 'start'
                            }}>
                                {/* Left: Narrative details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                                            {isEn ? 'Tour Overview' : 'Aperçu du Circuit'}
                                        </h2>
                                        <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                                            {local.description}
                                        </p>
                                    </div>

                                    {/* Highlights */}
                                    <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '20px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                                            {isEn ? 'Tour Highlights' : 'Points Forts'}
                                        </h2>
                                        <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {local.highlights.map((h, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '12px', fontSize: '1rem', color: '#444', lineHeight: '1.5' }}>
                                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right: Sticky Booking Widget */}
                                <TourBookingWidget tour={tour} />
                            </div>

                            {/* Itinerary Section */}
                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '35px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                                    {isEn ? 'Detailed Itinerary' : 'Itinéraire Détaillé'}
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '30px', borderLeft: '2px solid #eee' }}>
                                    {local.itinerary.map((step, idx) => (
                                        <div key={idx} style={{ position: 'relative' }}>
                                            {/* Bullet icon */}
                                            <div style={{
                                                position: 'absolute',
                                                left: '-41px',
                                                top: '4px',
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: '#fff',
                                                border: '4px solid var(--primary)',
                                                zIndex: 2
                                            }} />
                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent)', margin: '0 0 8px 0' }}>
                                                {step.title}
                                            </h3>
                                            <p style={{ fontSize: '0.98rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Included / Excluded list */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '30px'
                            }}>
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2ecc71', marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                                        {isEn ? 'What\'s Included' : 'Inclus dans le Prix'}
                                    </h3>
                                    <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {local.whatsIncluded.map((inc, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#555' }}>
                                                <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>✓</span> {inc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#e74c3c', marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                                        {isEn ? 'What\'s Excluded' : 'Non Inclus'}
                                    </h3>
                                    <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {local.whatsExcluded.map((exc, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#555' }}>
                                                <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>✗</span> {exc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tour Specific FAQs */}
                            {local.faqs && local.faqs.length > 0 && (
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '35px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                                        {isEn ? 'Tour FAQ' : 'Questions Fréquentes'}
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {local.faqs.map((faq, i) => (
                                            <div key={i} style={{ borderBottom: i < local.faqs.length - 1 ? '1px solid #f0f0f0' : 'none', paddingBottom: '15px' }}>
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>{faq.q}</h4>
                                                <p style={{ fontSize: '0.98rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
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

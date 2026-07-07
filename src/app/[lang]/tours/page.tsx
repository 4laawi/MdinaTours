import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { toursData } from '@/lib/toursData';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Private Morocco Tours & Custom Day Trips | Mdina Tours' : 'Circuits Privés et Excursions Sur Mesure au Maroc | Mdina Tours';
    const description = isEn
        ? 'Book private Morocco tours from Rabat and Casablanca. Experience desert tours, imperial city walks, and custom multi-day holiday packages with expert drivers.'
        : 'Réservez vos circuits privés au Maroc depuis Rabat ou Casablanca. Découvrez le désert, les villes impériales et concevez des séjours sur mesure.';
    const url = `https://mdinatours.com/${lang}/tours`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/tours',
                'fr': 'https://mdinatours.com/fr/tours',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-marrakech.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Morocco Private Tours Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-marrakech.webp'],
        },
    };
}

export default async function ToursCatalogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // JSON-LD ItemList Schema
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "numberOfItems": toursData.length,
        "itemListElement": toursData.map((tour, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://mdinatours.com/${language}/tours/${tour.slug}`,
            "name": tour[language].title,
            "description": tour[language].excerpt,
            "image": `https://mdinatours.com${tour.image}`
        }))
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
            }
        ]
    };

    return (
        <>
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <PageBanner 
                    title={isEn ? 'Authentic Morocco Tours' : 'Circuits Authentiques au Maroc'}
                    subtitle={isEn ? 'Discover Sahara dunes, historic medinas, and beautiful coastal ports with our Rabat-based planning experts.' : 'Découvrez les dunes du Sahara, les médinas impériales et les côtes marocaines avec nos chauffeurs privés professionnels.'}
                    bgImage="/img/Morocco-trip-tour-hero07.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEn ? 'Private Tours' : 'Circuits Privés'}
                />

                {/* Catalog Listing */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                            gap: '30px'
                        }}>
                            {toursData.map((tour) => {
                                const local = tour[language];
                                return (
                                    <article key={tour.slug} style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                    }}>
                                        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                                            <Image
                                                src={tour.image}
                                                alt={local.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            {tour.price > 120 && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '20px',
                                                    left: '20px',
                                                    backgroundColor: 'var(--primary)',
                                                    color: '#fff',
                                                    padding: '6px 12px',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    letterSpacing: '1px',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {t('best_seller')}
                                                </span>
                                            )}
                                        </div>

                                        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--primary)',
                                                    fontWeight: 600,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    ⏱ {local.duration}
                                                </span>
                                                <span style={{ fontSize: '0.9rem', color: '#777' }}>★ 5.0 (98 reviews)</span>
                                            </div>

                                            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: '0 0 10px 0', color: 'var(--accent)' }}>
                                                {local.title}
                                            </h2>

                                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, marginBottom: '25px', flex: 1 }}>
                                                {local.excerpt}
                                            </p>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderTop: '1px solid #eee',
                                                paddingTop: '20px'
                                            }}>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: '#999', display: 'block' }}>{t('from')}</span>
                                                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)' }}>€{tour.price}</span>
                                                </div>
                                                <Link
                                                    href={getPath(`/tours/${tour.slug}`)}
                                                    style={{
                                                        backgroundColor: 'var(--primary)',
                                                        color: '#fff',
                                                        padding: '10px 20px',
                                                        borderRadius: '8px',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem',
                                                        textDecoration: 'none',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                >
                                                    {isEn ? 'View Details →' : 'Voir Détails →'}
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
        </>
    );
}

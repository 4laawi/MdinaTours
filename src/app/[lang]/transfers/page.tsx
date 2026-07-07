import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransfersHero from '@/components/TransfersHero';
import FloatingElements from '@/components/FloatingElements';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { transfersData } from '@/lib/transfersData';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Private Driver & Airport Transfers Morocco | Mdina Tours' : 'Chauffeur Privé et Transfert Aéroport Maroc | Mdina Tours';
    const description = isEn
        ? 'Book reliable private transfers and driver services in Morocco. Fixed fares, modern air-conditioned vans, and professional drivers between Rabat, Casablanca, and Marrakech.'
        : 'Réservez des transferts privés fiables au Maroc. Prix fixes, chauffeurs professionnels bilingues entre Rabat, Casablanca, Marrakech et Tanger.';
    const url = `https://mdinatours.com/${lang}/transfers`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/transfers',
                'fr': 'https://mdinatours.com/fr/transfers',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-landscape-1.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Morocco Private Transfers Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-landscape-1.webp'],
        },
    };
}

const getTransferThumbnail = (slug: string, transImage: string) => {
    const normalizedSlug = slug.toLowerCase();
    const isAirport = normalizedSlug.includes('airport') || normalizedSlug.includes('aeroport');
    
    const hasCasablanca = normalizedSlug.includes('casablanca');
    const hasFes = normalizedSlug.includes('fes');
    const hasMarrakech = normalizedSlug.includes('marrakech');
    const hasAgadir = normalizedSlug.includes('agadir');
    const hasRabat = normalizedSlug.includes('rabat');
    const hasTangier = normalizedSlug.includes('tangier') || normalizedSlug.includes('tanger');
    const hasEssaouira = normalizedSlug.includes('essaouira');

    if (isAirport) {
        if (hasCasablanca) return '/img2/Airport_Casablanca_Mohammed.webp';
        if (hasRabat) return '/img2/rabat-airport.webp';
        if (hasTangier) return '/img2/tangier_hero.webp'; // Avoid AVIF build issue
        if (hasFes) return '/img2/fes-airport.jpeg';
        if (hasAgadir) return '/img2/agadir-airport.webp';
        if (hasMarrakech) return '/b-roll/3-Mercedes-vito-airoport.jpg';
    } else {
        if (hasTangier) return '/img2/tangier_hero.webp';
        if (hasRabat) return '/img2/rabat-hassan-tour.jpg';
        if (hasCasablanca) return '/img2/casablanca_MOSQUE.webp';
        if (hasFes) return '/img2/fes_gate.jpg';
        if (hasMarrakech) return '/hero-marrakech.webp'; // Avoid Tourists-in-marrakech.avif issue
        if (hasEssaouira) return '/img2/Essaouira-maroc.jpg';
    }
    return transImage;
};

export default async function TransfersCatalogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // ItemList Schema
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "numberOfItems": transfersData.length,
        "itemListElement": transfersData.map((trans, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://mdinatours.com/${language}/transfers/${trans.slug}`,
            "name": trans[language].title,
            "description": trans[language].tagline,
            "image": `https://mdinatours.com${getTransferThumbnail(trans.slug, trans.image)}`
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
                "name": isEn ? "Private Transfers" : "Transferts Privés",
                "item": `https://mdinatours.com/${language}/transfers`
            }
        ]
    };

    return (
        <>
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <TransfersHero 
                    title={isEn ? 'Morocco Private Transfers' : 'Transferts Privés au Maroc'}
                    subtitle={isEn ? 'Punctual meet & greet service, fixed rates, and clean air-conditioned vehicles between all major airports and medinas.' : 'Service d\'accueil ponctuel, prix fermes sans surprise, berlines et monospaces climatisés reliant tous les aéroports.'}
                    bgImage="/img/Morocco-trip-tour-hero04.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEn ? 'Private Transfers' : 'Transferts Privés'}
                />

                {/* Catalog Listing */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px'
                        }}>
                            {transfersData.map((trans) => {
                                const local = trans[language];
                                const startingPrice = trans.prices[3] || trans.prices[4];
                                const thumbnailUrl = getTransferThumbnail(trans.slug, trans.image);

                                return (
                                    <div key={trans.slug} style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '16px',
                                        boxShadow: '0 5px 25px rgba(0,0,0,0.03)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        padding: '25px',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                        gap: '25px',
                                        alignItems: 'center',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }} className="transfer-card">
                                        
                                        {/* Image and basic info */}
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                            <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                                                <Image
                                                    src={thumbnailUrl}
                                                    alt={local.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="100px"
                                                />
                                            </div>
                                            <div>
                                                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 5px 0', color: 'var(--accent)' }}>
                                                    {local.title}
                                                </h2>
                                                <p style={{ fontSize: '0.85rem', color: '#777', margin: 0 }}>
                                                    {isEn ? 'Route: ' : 'Trajet: '} {local.pickup} ⇄ {local.dropoff}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Metas (Distance / Duration) */}
                                        <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-around', padding: '10px 0' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', textTransform: 'uppercase' }}>{isEn ? 'Distance' : 'Distance'}</span>
                                                <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--secondary)' }}>{local.distance}</span>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', textTransform: 'uppercase' }}>{isEn ? 'Duration' : 'Durée'}</span>
                                                <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--secondary)' }}>{local.duration}</span>
                                            </div>
                                        </div>

                                        {/* Pricing and Actions */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', color: '#999', display: 'block' }}>{t('from')}</span>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>€{startingPrice}</span>
                                            </div>
                                            <Link
                                                href={getPath(`/transfers/${trans.slug}`)}
                                                style={{
                                                    backgroundColor: 'var(--secondary)',
                                                    color: '#fff',
                                                    padding: '12px 24px',
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                    transition: 'all 0.2s',
                                                    textAlign: 'center',
                                                    flex: 1
                                                }}
                                            >
                                                {isEn ? 'View Route →' : 'Voir Trajet →'}
                                            </Link>
                                        </div>

                                    </div>
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

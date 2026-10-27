import { APPROVED_ES_PATHS, getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransfersHero from '@/components/TransfersHero';
import FloatingElements from '@/components/FloatingElements';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { transfersData } from '@/lib/transfersData';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEs = lang === 'es';
    const isEn = lang === 'en';

    const title = isEs
        ? 'Traslados Interurbanos y Viajes Entre Ciudades en Marruecos | Mdina Tours'
        : isEn
        ? 'Morocco Intercity Private Transfers & City-to-City Rides | Mdina Tours'
        : 'Transferts Privés Intervilles au Maroc & Trajets Longue Distance | Mdina Tours';

    const description = isEs
        ? 'Reserve traslados privados entre ciudades en Marruecos. Tarifas fijas garantizadas, vehículos con aire acondicionado y recogida puerta a puerta entre Casablanca, Marrakech, Tánger y Fez.'
        : isEn
        ? 'Book reliable intercity private transfers across Morocco. Guaranteed fixed fares, modern air-conditioned vans, and door-to-door comfort between Casablanca, Marrakech, Tangier, Fes, and Chefchaouen.'
        : 'Réservez vos transferts privés intervilles au Maroc. Prix fixes tout compris, berlines et minivans climatisés de porte-à-porte entre Casablanca, Marrakech, Tanger, Fès et Chefchaouen.';

    const url = `https://mdinatours.com/${lang}/transfers`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/transfers'),
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
            locale: lang === 'es' ? 'es_ES' : lang === 'fr' ? 'fr_FR' : 'en_US',
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
    const hasRabat = normalizedSlug.includes('rabat');
    const hasTangier = normalizedSlug.includes('tangier') || normalizedSlug.includes('tanger');
    const hasAgadir = normalizedSlug.includes('agadir');
    const hasEssaouira = normalizedSlug.includes('essaouira');
    const hasMarrakech = normalizedSlug.includes('marrakech');

    if (isAirport) {
        if (hasCasablanca) return '/img2/Airport_Casablanca_Mohammed.webp';
        if (hasRabat) return '/img2/rabat-airport.webp';
        if (hasTangier) return '/img2/tangier_hero.webp';
        if (hasFes) return '/a-mdiinatours/fes-airport-transfer.webp';
        if (hasAgadir) return '/img2/agadir-airport.webp';
        return '/b-roll/3-Mercedes-vito-airoport.jpg';
    } else {
        if (hasTangier) return '/img2/tangier_hero.webp';
        if (hasRabat) return '/img2/rabat-hassan-tour.jpg';
        if (hasCasablanca) return '/img2/casablanca_MOSQUE.webp';
        if (hasFes) return '/img2/fes_gate.jpg';
        if (hasMarrakech) return '/a-mdiinatours/selman-marrakech-mdinatours.webp';
        if (hasEssaouira) return '/img2/Essaouira-maroc.jpg';
    }
    return transImage;
};

export default async function TransfersCatalogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEs = language === 'es';
    const isEn = language === 'en';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    // Filter transfers strictly using approved paths for Spanish
    const displayedTransfers = isEs
        ? transfersData.filter(trans => APPROVED_ES_PATHS.has(`/transfers/${trans.slug}`))
        : transfersData;

    // ItemList Schema
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "numberOfItems": displayedTransfers.length,
        "itemListElement": displayedTransfers.map((trans, index) => {
            const loc = trans[language] || trans.en;
            return {
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://mdinatours.com/${language}/transfers/${trans.slug}`,
                "name": loc.title,
                "description": loc.tagline,
                "image": `https://mdinatours.com${getTransferThumbnail(trans.slug, trans.image)}`
            };
        })
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEs ? "Inicio" : isEn ? "Home" : "Accueil",
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEs ? "Traslados" : isEn ? "Transfers" : "Transferts",
                "item": `https://mdinatours.com/${language}/transfers`
            }
        ]
    };

    return (
        <>
            <Header />

            {/* Breadcrumbs List Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* ItemList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />

            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <TransfersHero 
                    title={isEs ? 'Traslados Privados en Marruecos' : isEn ? 'Morocco Private Transfers' : 'Transferts Privés au Maroc'}
                    subtitle={isEs ? 'Servicio de chófer puntual con cartel de bienvenida, tarifas fijas y vehículos modernos climatizados en aeropuertos, puertos y medinas.' : isEn ? 'Punctual meet & greet service, fixed rates, and clean air-conditioned vehicles between all major airports and medinas.' : 'Service d\'accueil ponctuel, prix fermes sans surprise, berlines et monospaces climatisés reliant tous les aéroports.'}
                    bgImage="/img/Morocco-trip-tour-hero04.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEs ? 'Traslados Privados' : isEn ? 'Private Transfers' : 'Transferts Privés'}
                />

                {/* Catalog Listing */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Airport Transfers Callout */}
                        <div style={{
                            marginBottom: '30px',
                            padding: '16px 22px',
                            backgroundColor: '#fff',
                            borderRadius: '14px',
                            border: '1px solid rgba(220, 131, 78, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                        }}>
                            <span style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}>
                                {isEn
                                    ? "Arriving by plane in Casablanca, Marrakech, Rabat or Tangier?"
                                    : isEs
                                    ? "¿Llega en avión a Casablanca, Marrakech, Rabat o Tánger?"
                                    : "Vous atterrissez à Casablanca, Marrakech, Rabat ou Tanger ?"}
                            </span>
                            <Link
                                href={getPath('/airport-transfers')}
                                prefetch={false}
                                style={{
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {isEn
                                    ? "Morocco Airport Transfers & Private Shuttles →"
                                    : isEs
                                    ? "Ver traslados de aeropuerto con bienvenida →"
                                    : "Voir les transferts aéroport avec accueil personnalisé →"}
                            </Link>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px'
                        }}>
                            {displayedTransfers.map((trans) => {
                                const local = trans[language] || trans.en;
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
                                                    {isEs ? 'Ruta: ' : isEn ? 'Route: ' : 'Trajet: '} {local.pickup} ⇄ {local.dropoff}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Metas (Distance / Duration) */}
                                        <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-around', padding: '10px 0' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', textTransform: 'uppercase' }}>{isEs ? 'Distancia' : isEn ? 'Distance' : 'Distance'}</span>
                                                <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--secondary)' }}>{local.distance}</span>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#999', display: 'block', textTransform: 'uppercase' }}>{isEs ? 'Duración' : isEn ? 'Duration' : 'Durée'}</span>
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
                                                prefetch={false}
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
                                                {isEs ? 'Ver Trayecto →' : isEn ? 'View Route →' : 'Voir Trajet →'}
                                            </Link>
                                        </div>

                                    </div>
                                );
                            })}

                            {/* Fallback Custom Quote Banner for Spanish / all users */}
                            {isEs && (
                                <div style={{
                                    marginTop: '20px',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    backgroundColor: '#fff',
                                    border: '2px dashed var(--primary)',
                                    textAlign: 'center'
                                }}>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--accent)', margin: '0 0 8px 0', fontWeight: 700 }}>
                                        ¿No encuentras tu ruta o destino deseado?
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', margin: '0 auto 20px auto', maxWidth: '600px', lineHeight: 1.5 }}>
                                        Organizamos traslados privados a cualquier punto de Marruecos con vehículos climatizados, tarifas fijas y chófer profesional.
                                    </p>
                                    <TrackedWhatsAppLink
                                        href="https://wa.me/212724114775?text=Hola%20Mdina%20Tours,%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20para%20una%20ruta%20personalizada."
                                        source="catalog_footer_whatsapp"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            backgroundColor: '#25D366',
                                            color: '#fff',
                                            padding: '12px 28px',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Solicitar presupuesto por WhatsApp →
                                    </TrackedWhatsAppLink>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

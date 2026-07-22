import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Airport Transfers Morocco - Fixed Price Pickups | Mdina Tours' : 'Transferts Aéroport Maroc - Prix Fixes | Mdina Tours';
    const description = isEn
        ? 'Book secure airport transfers in Casablanca (CMN), Rabat (RBA), and Tangier (TNG). Flat rates, meet & greet arrivals, and 24/7 flight monitoring.'
        : 'Navettes privées et transferts depuis les aéroports de Casablanca, Rabat, Marrakech et Tanger. Suivi des vols gratuit, accueil VIP.';
    const url = `https://mdinatours.com/${lang}/airport-transfers`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/airport-transfers',
                'fr': 'https://mdinatours.com/fr/airport-transfers',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/Traditional.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Morocco Airport Transfers',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/Traditional.webp'],
        },
    };
}

export default async function AirportTransfersPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

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
                "name": isEn ? "Airport Transfers" : "Transferts Aéroport",
                "item": `https://mdinatours.com/${language}/airport-transfers`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <PageBanner 
                    title={isEn ? 'Morocco Airport Transfers' : 'Transferts Aéroport au Maroc'}
                    subtitle={isEn ? 'Stress-free pickups from Casablanca, Rabat, Marrakech, and Tangier airports.' : 'Navettes privées fiables à prix fixes depuis les aéroports de Casablanca, Rabat, Marrakech et Tanger.'}
                    bgImage="/img/Morocco-trip-tour-hero09.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEn ? 'Airport Transfers' : 'Transferts Aéroport'}
                />

                {/* Details Section */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '30px'
                        }}>
                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px' }}>
                                    {isEn ? 'Meet & Greet Service' : 'Accueil Personnalisé VIP'}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn ? "Your driver will monitor your flight schedule and wait at the arrivals hall with a name sign. No waiting, no queues, and no stress after landing."
                                         : "Votre chauffeur suit l'état de votre vol en temps réel et vous attend dans le hall des arrivées avec une pancarte nominative dès votre passage de la douane."}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px' }}>
                                    {isEn ? 'Flight Tracking' : 'Suivi des Vols en Direct'}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn ? "We monitor flight arrival coordinates to guarantee your chauffeur is on time, even if your flight is delayed or arrives early."
                                         : "Nous suivons les arrivées d'avions en direct pour garantir la présence de votre chauffeur à l'heure exacte, même en cas de retard."}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px' }}>
                                    {isEn ? 'Fixed Pricing' : 'Tarifs Forfaitaires Fixes'}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn ? "Our prices are calculated per vehicle and include highway toll charges, fuel, and luggage. No hidden fees or night surcharges."
                                         : "Nos tarifs sont fixés à l'avance par véhicule et comprennent les péages d'autoroute et la prise en charge des bagages, sans supplément."}
                                </p>
                            </div>
                        </div>

                        {/* Route Links */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 5px 25px rgba(0,0,0,0.02)' }}>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '25px', textAlign: 'center' }}>
                                {isEn ? 'Top Airport Transfer Routes' : 'Principaux Transferts Aéroports'}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                <Link href={getPath('/transfers/casablanca-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>Casablanca Airport (CMN) ⇄ Rabat or Salé</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>{isEn ? 'From €85 • Private Sedan or Van' : 'À partir de 85 € • Berline ou Van'}</span>
                                </Link>
                                <Link href={getPath('/transfers/rabat-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>Rabat-Salé Airport (RBA) ⇄ Rabat or Salé</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>{isEn ? 'From €30 • Fast City Shuttle' : 'À partir de 30 € • Navette Ville Rapide'}</span>
                                </Link>
                                <Link href={getPath('/transfers/tangier-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>Tangier Airport (TNG) ⇄ Tangier City</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>{isEn ? 'From €25 • Flat Rate Transfers' : 'À partir de 25 € • Navette Tarif Fixe'}</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    
    let title = 'Airport Transfers Morocco - Fixed Price Pickups | Mdina Tours';
    let description = 'Book secure airport transfers in Casablanca (CMN), Rabat (RBA), and Tangier (TNG). Flat rates, meet & greet arrivals, and 24/7 flight monitoring.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Transferts Aéroport Maroc - Prix Fixes | Mdina Tours';
        description = 'Navettes privées et transferts depuis les aéroports de Casablanca, Rabat, Marrakech et Tanger. Suivi des vols gratuit, accueil VIP.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Traslados Aeropuerto en Marruecos – Tarifas Fijas | Mdina Tours';
        description = 'Reserve traslados privados desde los aeropuertos de Casablanca (CMN), Marrakech (RAK) y Rabat (RBA). Recepción con cartel, seguimiento de vuelos y vehículos climatizados.';
        ogLocale = 'es_ES';
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
                    url: 'https://mdinatours.com/Traditional.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Morocco Airport Transfers',
                },
            ],
            locale: ogLocale,
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
    const isEs = language === 'es';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    let serviceDescription = "Stress-free pickups from Casablanca, Rabat, Marrakech, and Tangier airports.";
    if (lang === 'fr') {
        serviceDescription = "Navettes privées fiables à prix fixes depuis les aéroports de Casablanca, Rabat, Marrakech et Tanger.";
    } else if (lang === 'es') {
        serviceDescription = "Traslados privados y puntuales desde los aeropuertos de Casablanca, Marrakech y Rabat.";
    }

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": ["Product", "TaxiService"],
        "name": isEn ? "Morocco Airport Transfers" : (isEs ? "Traslados de Aeropuerto en Marruecos" : "Transferts Aéroport au Maroc"),
        "description": serviceDescription,
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero09.webp",
        "url": `https://mdinatours.com/${language}/airport-transfers`,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Mdina Tours",
            "telephone": "+212724114775",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            }
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : (isEs ? "Inicio" : "Accueil"),
                "item": `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Airport Transfers" : (isEs ? "Traslados de Aeropuerto" : "Transferts Aéroport"),
                "item": `https://mdinatours.com/${language}/airport-transfers`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <PageBanner 
                    title={isEn ? 'Morocco Airport Transfers' : (isEs ? 'Traslados de Aeropuerto en Marruecos' : 'Transferts Aéroport au Maroc')}
                    subtitle={isEn 
                        ? 'Stress-free pickups from Casablanca, Rabat, Marrakech, and Tangier airports.' 
                        : (isEs ? 'Recogidas puntuales y sin esperas en los aeropuertos de Casablanca, Marrakech y Rabat.' : 'Navettes privées fiables à prix fixes depuis les aéroports de Casablanca, Rabat, Marrakech et Tanger.')}
                    bgImage="/img/Morocco-trip-tour-hero09.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEn ? 'Airport Transfers' : (isEs ? 'Traslados de Aeropuerto' : 'Transferts Aéroport')}
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
                                    {isEn ? 'Meet & Greet Service' : (isEs ? 'Recepción Personalizada' : 'Accueil Personnalisé VIP')}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn 
                                        ? "Your driver will monitor your flight schedule and wait at the arrivals hall with a name sign. No waiting, no queues, and no stress after landing."
                                        : (isEs 
                                            ? "Su conductor monitoriza la llegada del vuelo y le espera en el hall de llegadas con un cartel con su nombre. Sin colas ni esperas."
                                            : "Votre chauffeur suit l'état de votre vol en temps réel et vous attend dans le hall des arrivées avec une pancarte nominative dès votre passage de la douane.")}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px' }}>
                                    {isEn ? 'Flight Tracking' : (isEs ? 'Seguimiento de Vuelos en Directo' : 'Suivi des Vols en Direct')}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn 
                                        ? "We monitor flight arrival coordinates to guarantee your chauffeur is on time, even if your flight is delayed or arrives early."
                                        : (isEs 
                                            ? "Hacemos seguimiento continuo de la hora de aterrizaje para que su chófer esté presente en el momento exacto, incluso si hay retraso."
                                            : "Nous suivons les arrivées d'avions en direct pour garantir la présence de votre chauffeur à l'heure exacte, même en cas de retard.")}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '12px' }}>
                                    {isEn ? 'Fixed Pricing' : (isEs ? 'Tarifas Fijas y Claras' : 'Tarifs Forfaitaires Fixes')}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn 
                                        ? "Our prices are calculated per vehicle and include highway toll charges, fuel, and luggage. No hidden fees or night surcharges."
                                        : (isEs 
                                            ? "Precios cerrados por vehículo que incluyen peajes de autopista, combustible y maletas. Sin suplementos imprevistos ni sorpresas."
                                            : "Nos tarifs sont fixés à l'avance par véhicule et comprennent les péages d'autoroute et la prise en charge des bagages, sans supplément.")}
                                </p>
                            </div>
                        </div>

                        {/* Route Links */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 5px 25px rgba(0,0,0,0.02)' }}>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--secondary)', marginBottom: '25px', textAlign: 'center' }}>
                                {isEn ? 'Top Airport Transfer Routes' : (isEs ? 'Rutas Principales de Traslado de Aeropuerto' : 'Principaux Transferts Aéroports')}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                <Link href={getPath('/transfers/casablanca-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>
                                        {isEs ? 'Aeropuerto Casablanca (CMN) ⇄ Rabat o Salé' : 'Casablanca Airport (CMN) ⇄ Rabat or Salé'}
                                    </h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>
                                        {isEn ? 'From €120 • Private Sedan or Van' : (isEs ? 'Desde 120 € • Berlina o Minivan Privada' : 'À partir de 120 € • Berline ou Van')}
                                    </span>
                                </Link>
                                <Link href={getPath('/transfers/marrakech-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>
                                        {isEs ? 'Aeropuerto Marrakech Menara (RAK) ⇄ Riad o Hotel' : 'Marrakech Airport (RAK) ⇄ Marrakech Medina / Hotel'}
                                    </h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>
                                        {isEn ? 'From €45 • Direct Medina Transfer' : (isEs ? 'Desde 45 € • Traslado Directo a su Riad' : 'À partir de 45 € • Navette Directe Riad')}
                                    </span>
                                </Link>
                                <Link href={getPath('/transfers/rabat-airport-transfer')} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s', display: 'block' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>
                                        {isEs ? 'Aeropuerto Rabat-Salé (RBA) ⇄ Rabat o Salé' : 'Rabat-Salé Airport (RBA) ⇄ Rabat or Salé'}
                                    </h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>
                                        {isEn ? 'From €45 • Fast City Shuttle' : (isEs ? 'Desde 45 € • Traslado Rápido a Ciudad' : 'À partir de 45 € • Navette Rapide')}
                                    </span>
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

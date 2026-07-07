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

    const title = isEn ? 'About Mdina Tours | Leading Morocco Travel Partner' : 'À Propos de Mdina Tours | Votre Partenaire Voyage au Maroc';
    const description = isEn
        ? 'Learn about Mdina Tours, a premier digital travel agency based in Rabat. We provide comfortable private transfers, day trips, and custom travel experiences through our partner network.'
        : 'Découvrez l\'histoire de Mdina Tours, agence réceptive basée à Rabat. Nous offrons des transferts privés et des circuits sur mesure dans tout le Maroc.';
    const url = `https://mdinatours.com/${lang}/about`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/about',
                'fr': 'https://mdinatours.com/fr/about',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-landscape-2.webp',
                    width: 1200,
                    height: 630,
                    alt: 'About Mdina Tours Morocco',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-landscape-2.webp'],
        },
    };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
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
                "name": isEn ? "About Us" : "À Propos",
                "item": `https://mdinatours.com/${language}/about`
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
                    title={isEn ? 'About Mdina Tours' : 'À Propos de Mdina Tours'}
                    bgImage="/img/Morocco-trip-tour-hero03.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={isEn ? 'About Us' : 'À Propos'}
                />

                {/* Narrative Description Section */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 5px 25px rgba(0,0,0,0.02)' }}>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: '2rem',
                                color: 'var(--secondary)',
                                marginBottom: '20px'
                            }}>
                                {isEn ? 'Who We Are' : 'Qui Sommes-Nous'}
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
                                {isEn ? "Mdina Tours is a premium digital travel agency based in Rabat, Morocco. As a lead generation and custom travel provider, we operate on a modern network-driven business model. We do not own a fleet of vehicles; instead, we have cultivated a trusted, rigorously vetted partner network of professional drivers, local official guides, and boutique riad operators across all major Moroccan provinces."
                                     : "Mdina Tours est une agence de voyage numérique haut de gamme basée à Rabat, au Maroc. En tant que prestataire de voyages sur mesure, nous fonctionnons selon un modèle moderne de réseau. Nous ne possédons pas de flotte de véhicules ; à la place, nous collaborons avec un réseau de chauffeurs partenaires professionnels certifiés, de guides locaux officiels et de riads de charme sélectionnés."}
                            </p>
                            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.8 }}>
                                {isEn ? "This approach allows us to deliver competitive local rates while guaranteeing the highest safety, comfort, and service standards. Our primary objective is to make planning and booking trips in Morocco simple, fast, and stress-free for international visitors from Europe and North America."
                                     : "Cette approche nous permet de proposer des tarifs locaux compétitifs tout en garantissant des normes élevées de sécurité, de confort et de service. Notre objectif principal est de rendre la planification et la réservation de transferts et circuits au Maroc simples et fluides."}
                            </p>
                        </div>

                        {/* Rabat Base Detail */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '30px'
                        }}>
                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '15px' }}>
                                    {isEn ? 'Rabat Base Office' : 'Siège Principal à Rabat'}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn ? "Located in Rabat, Morocco's imperial administrative capital, we coordinate airport pick-ups and long-distance transfers connecting Casablanca, Tangier, Marrakech, Fes, and Chefchaouen."
                                         : "Situés à Rabat, la capitale administrative et impériale du Maroc, nous coordonnons des transferts routiers reliant l'aéroport Mohammed V de Casablanca, Tanger, Marrakech, Fès et Chefchaouen."}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '15px' }}>
                                    {isEn ? 'Seamless Booking' : 'Réservation en Ligne'}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                                    {isEn ? "We believe in direct relationships. All our bookings are arranged via interactive website forms and direct WhatsApp chat support, ensuring you are never more than one click away from booking."
                                         : "Nous privilégions le contact direct. Toutes nos réservations s'effectuent par formulaires interactifs et discussion en direct sur WhatsApp, sans frais administratifs."}
                                </p>
                            </div>
                        </div>

                        {/* CTA Banner */}
                        <div style={{
                            backgroundColor: 'var(--secondary)',
                            borderRadius: '16px',
                            padding: '40px',
                            color: '#fff',
                            textAlign: 'center',
                            boxShadow: '0 15px 35px rgba(32,47,89,0.1)'
                        }}>
                            <h3 style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: '2rem',
                                color: '#fff',
                                marginBottom: '15px',
                                fontWeight: 300
                            }}>
                                {isEn ? 'Ready to Experience Morocco?' : 'Prêt à Découvrir le Maroc ?'}
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#ccc', maxWidth: '600px', margin: '0 auto 25px auto', lineHeight: 1.5 }}>
                                {isEn ? "Let our travel specialists plan the perfect private transfer or guided tour. Send us a message on WhatsApp for an instant response."
                                     : "Laissez nos spécialistes planifier votre trajet ou excursion idéale. Écrivez-nous sur WhatsApp pour une réponse rapide."}
                            </p>
                            <a
                                href="https://wa.me/212766816992"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: '#fff',
                                    padding: '14px 30px',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                {t('get_in_touch_whatsapp')}
                            </a>
                        </div>

                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

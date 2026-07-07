import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';
import Header from '@/components/Header';
import styles from './Partners.module.css';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';

// Lazy-load heavy below-fold client components
const PartnersForm = dynamic(() => import('./PartnersForm'));
const Footer = dynamic(() => import('@/components/Footer'));
const FloatingElements = dynamic(() => import('@/components/FloatingElements'));

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn 
        ? 'Morocco Local Travel Partner for Hotels & Agencies – Mdina Tours' 
        : 'Partenaire Voyage & Transport local au Maroc – Mdina Tours';
    const description = isEn
        ? 'Offer your guests reliable private transfers, custom day trips, expert guides, and premium transport across Morocco. Join our local partner program.'
        : 'Offrez à vos clients des transferts privés fiables, des excursions sur mesure, des guides locaux et un transport haut de gamme au Maroc. Rejoignez notre programme.';
    const url = `https://mdinatours.com/${lang}/partners`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/partners',
                'fr': 'https://mdinatours.com/fr/partners',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/Traditional-low.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Partners Mdina Tours',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/Traditional-low.webp'],
        },
    };
}

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    // Preload critical mobile background image via React DOM resource hint
    // (works correctly with Next.js streaming SSR unlike raw <link>)
    ReactDOM.preload('/Traditional-low.webp', { as: 'image', media: '(max-width: 768px)' });

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
                "name": isEn ? "Partners" : "Partenaires",
                "item": `https://mdinatours.com/${language}/partners`
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
            <main>
                {/* B2B Partnerships Hero Banner */}
                <section className="section-29r section-7qd">
                    <div className="overlay-6rk"></div>
                    <div className="purple-kd4">
                        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none">
                            <path d="M0 350 Q360 280 720 320 T1440 290" stroke="rgba(232,126,4,0.55)" strokeWidth="1.8" fill="none" />
                            <path d="M0 320 Q360 250 720 290 T1440 260" stroke="rgba(232,126,4,0.45)" strokeWidth="1.8" fill="none" />
                            <path d="M0 290 Q360 220 720 260 T1440 230" stroke="rgba(232,126,4,0.38)" strokeWidth="1.6" fill="none" />
                            <path d="M0 260 Q360 190 720 230 T1440 200" stroke="rgba(232,126,4,0.3)" strokeWidth="1.6" fill="none" />
                            <path d="M0 230 Q360 160 720 200 T1440 170" stroke="rgba(232,126,4,0.22)" strokeWidth="1.4" fill="none" />
                            <path d="M0 200 Q360 130 720 170 T1440 140" stroke="rgba(232,126,4,0.15)" strokeWidth="1.4" fill="none" />
                            <path d="M0 170 Q360 100 720 140 T1440 110" stroke="rgba(232,126,4,0.1)" strokeWidth="1.2" fill="none" />
                        </svg>
                    </div>
                    <div className="content-ebw">
                        <div className="icon-vfo">
                            <svg viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="30" stroke="#e87e04" strokeWidth="1.5" />
                                <circle cx="40" cy="40" r="18" stroke="#e87e04" strokeWidth="1" />
                                <path d="M40 15v10M40 55v10M15 40h10M55 40h10" stroke="#e87e04" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M40 30l6 10-6 10-6-10 6-10z" fill="#e87e04" fillOpacity="0.2" stroke="#e87e04" strokeWidth="1" />
                                <circle cx="40" cy="40" r="5" fill="#e87e04" />
                            </svg>
                        </div>
                        <p className="row-qwy">{t('b2b_partnerships')}</p>
                        <h1 className="title-gla">
                            {t('b2b_hero_title_1')} <em>{t('b2b_hero_title_italic')}</em><br />{t('b2b_hero_title_2')}
                        </h1>
                        <p className="subtitle-ktg">{t('b2b_hero_subtitle')}</p>
                        <div className="hero-cta-ixn">
                            <a href="#partnership" className="cta-ovi gen-lwi-tz6">
                                {t('b2b_cta_start')}{' '}
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a href="#services" className="cta-qoz">
                                {t('b2b_cta_services')}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section 1: The Problem Section */}
                <section className={styles.problemSection}>
                    <div className={styles.problemContainer}>
                        <div 
                            className={styles.problemImageCol} 
                        >
                            <div className={styles.imageFadeOverlay}></div>
                        </div>
                        <div className={styles.problemTextCol}>
                            <div className={styles.iconTagWrapper}>
                                <div className={styles.orangeClockIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.clockIconSvg}>
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <span className={styles.tagText}>{t('partners_problem_tag')}</span>
                            </div>
                            <h2 className={styles.problemHeadline}>
                                {t('partners_problem_title_1')}
                                <span className={styles.italicSerif}>{t('partners_problem_title_italic')}</span>
                                {t('partners_problem_title_2')}
                            </h2>
                            <p className={styles.problemSubtitleText}>{t('partners_problem_subtitle')}</p>
                            <div className={styles.smallDivider}></div>
                        </div>
                    </div>
                </section>

                {/* Section 2: What We Do Section */}
                <section id="services" className={styles.whatweDoSection}>
                    <div className={styles.container}>
                        <div className={styles.whatweDoContent}>
                            <div className={styles.dmcIconWrapper}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.houseIconSvg}>
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    <circle cx="12" cy="7" r="1"></circle>
                                </svg>
                            </div>
                            <span className={styles.tagTextCenter}>{t('partners_whatwedo_tag')}</span>
                            <h2 className={styles.whatweDoHeadline}>
                                {t('partners_whatwedo_title_1')}
                                <span className={styles.italicSerif}>{t('partners_whatwedo_title_italic')}</span>
                            </h2>
                            <p className={styles.whatweDoDescText}>{t('partners_whatwedo_desc')}</p>
                            <a href="#partnership" className={styles.sectionCta}>
                                {t('partners_cta_whatwedo')}{' '}
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section 3: Accommodations Pillar */}
                <section className={styles.pillarSection}>
                    <div className={styles.pillarContainer}>
                        <div className={styles.pillarIconCol}>
                            <div className={styles.riadOutlineIcon}>
                                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.riadSvg}>
                                    <path d="M50 15L15 45H85L50 15Z" />
                                    <rect x="25" y="45" width="50" height="40" />
                                    <rect x="32" y="55" width="10" height="10" />
                                    <rect x="58" y="55" width="10" height="10" />
                                    <circle cx="50" cy="52" r="2.5" fill="currentColor" />
                                    <path d="M45 85V72H55V85" />
                                    <line x1="50" y1="15" x2="50" y2="8" />
                                    <circle cx="50" cy="7" r="1" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.pillarTextCol}>
                            <span className={styles.tagText}>{t('partners_accommodations_tag')}</span>
                            <h2 className={styles.pillarTitle}>{t('partners_accommodations_title')}</h2>
                            <p className={styles.pillarSubtitle}>{t('partners_accommodations_subtitle')}</p>
                            <div className={styles.smallDivider}></div>
                            <p className={styles.pillarDesc}>{t('partners_accommodations_desc')}</p>
                            <ul className={styles.pillarList}>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_accommodations_point_1')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_accommodations_point_2')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_accommodations_point_3')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_accommodations_point_4')}
                                </li>
                            </ul>
                            <a href="#partnership" className={styles.sectionCta}>
                                {t('partners_cta_accommodations')}{' '}
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section 4: Expert Guides Pillar (Dark Slate Navy Background) */}
                <section className={`${styles.pillarSection} ${styles.darkPillar}`}>
                    <div className={styles.pillarContainer}>
                        <div className={styles.pillarTextCol}>
                            <span className={styles.tagTextOrange}>{t('partners_guides_tag')}</span>
                            <h2 className={`${styles.pillarTitle} ${styles.whiteText}`}>{t('partners_guides_title')}</h2>
                            <p className={styles.pillarSubtitle}>{t('partners_guides_subtitle')}</p>
                            <div className={styles.smallDivider}></div>
                            <p className={`${styles.pillarDesc} ${styles.lighterText}`}>{t('partners_guides_desc')}</p>
                            <ul className={`${styles.pillarList} ${styles.whiteText}`}>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_guides_point_1')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_guides_point_2')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_guides_point_3')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_guides_point_4')}
                                </li>
                            </ul>
                            <a href="#partnership" className={styles.sectionCta}>
                                {t('partners_cta_guides')}{' '}
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                        <div className={styles.pillarIconCol}>
                            <div className={styles.guideOutlineIcon}>
                                <svg viewBox="0 0 180 180" fill="none" className={`${styles.guideSvg} gen-tCU-split-illu`}>
                                    <circle cx="90" cy="45" r="25" stroke="currentColor" strokeWidth="2" />
                                    <path d="M90 70v45" stroke="currentColor" strokeWidth="2" />
                                    <path d="M90 90L60 120M90 90L120 120" stroke="currentColor" strokeWidth="2" />
                                    <path d="M90 115L68 155M90 115L112 155" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="140" cy="65" r="20" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M140 50v30M125 65h30" stroke="currentColor" strokeWidth="1" />
                                    <circle cx="140" cy="65" r="6" fill="#e87e04" fillOpacity={0.3} />
                                    <rect x="25" y="105" width="28" height="24" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M39 105v24" stroke="currentColor" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Transportation Pillar */}
                <section className={styles.pillarSection}>
                    <div className={styles.pillarContainer}>
                        <div className={styles.pillarIconCol}>
                            <div className={styles.carOutlineIcon}>
                                <svg viewBox="0 0 180 180" fill="none" className={`${styles.carSvg} gen-3of-split-illu`}>
                                    <rect x="20" y="70" width="140" height="50" rx="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M45 70V55c0-7 7-12 18-12h54c11 0 18 5 18 12v15" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="50" cy="120" r="16" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="130" cy="120" r="16" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="50" cy="120" r="6" fill="#e87e04" fillOpacity={0.3} />
                                    <circle cx="130" cy="120" r="6" fill="#e87e04" fillOpacity={0.3} />
                                    <path d="M10 145h160" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
                                    <rect x="60" y="82" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <rect x="100" y="82" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.pillarTextCol}>
                            <span className={styles.tagText}>{t('partners_transport_tag')}</span>
                            <h2 className={styles.pillarTitle}>{t('partners_transport_title')}</h2>
                            <p className={styles.pillarSubtitle}>{t('partners_transport_subtitle')}</p>
                            <div className={styles.smallDivider}></div>
                            <p className={styles.pillarDesc}>{t('partners_transport_desc')}</p>
                            <ul className={styles.pillarList}>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_transport_point_1')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_transport_point_2')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_transport_point_3')}
                                </li>
                                <li>
                                    <span className={styles.orangeDash}>—</span> {t('partners_transport_point_4')}
                                </li>
                            </ul>
                            <a href="#partnership" className={styles.sectionCta}>
                                {t('partners_cta_transport')}{' '}
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section id="partnership" className={styles.formSectionWrapper}>
                    {/* Decorative vector background elements */}
                    <div className={styles.decorWaveTop} aria-hidden="true" />
                    <div className={styles.decorWaveBottom} aria-hidden="true" />
                    <div className={styles.decorMap} aria-hidden="true" />
                    
                    <div className={styles.container}>
                        <div className={styles.formContainerInner}>
                            <PartnersForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements hideWhatsappUntilScroll={true} />
        </>
    );
}

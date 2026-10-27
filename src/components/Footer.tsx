import Image from "next/image";
import Link from "next/link";
import { translations, Language } from "@/lib/translations";
import styles from "./Footer.module.css";
import { MDINA_SOCIAL_LINKS } from "@/lib/seo";
import TrackedWhatsAppLink from "./TrackedWhatsAppLink";
import CookieConsentRevokeLink from "./CookieConsentRevokeLink";

export default function Footer({ lang = 'en' }: { lang?: Language }) {
    const language = lang;
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };
    const isEn = language === 'en';
    const currentYear = new Date().getFullYear();

    // Helper to get localized path
    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    return (
        <footer className={styles.footer}>
            {/* Premium Wave Shape Decorator */}
            <div className={styles.shapeContainer}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2600 131.1"
                    preserveAspectRatio="none"
                >
                    <path d="M0 0L2600 0 2600 69.1 0 0z" />
                    <path
                        d="M0 0L2600 0 2600 69.1 0 69.1z"
                        style={{ opacity: 0.3 }}
                    />
                    <path
                        d="M2600 0L0 0 0 130.1 2600 69.1z"
                        style={{ opacity: 0.1 }}
                    />
                </svg>
            </div>

            <div className={styles.footerContent}>
                {/* Brand Column: The Logo and Core Story */}
                <div className={styles.column}>
                    <div className={styles.logoWrapper}>
                        <Link href={getPath('/')} prefetch={false} aria-label="Mdina Tours Homepage">
                            <svg viewBox="0 0 280 80" width="180" height="50" className={styles.logoSvg}>
                                <g transform="translate(10, 15)">
                                    <path d="M25 5 C15 5 10 15 10 25 L10 45 L40 45 L40 25 C40 15 35 5 25 5 Z" fill="none" stroke="#dc834e" strokeWidth="2.5" />
                                    <path d="M25 10 C18 10 15 18 15 25 L15 40 L35 40 L35 25 C35 18 32 10 25 10 Z" fill="#dc834e" opacity="0.15" />
                                    <polygon points="25,20 28,26 34,26 29,30 31,36 25,32 19,36 21,30 16,26 22,26" fill="#dc834e" />
                                </g>
                                <text x="65" y="38" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="bold" fill="#ffffff" letterSpacing="1">Mdina</text>
                                <text x="65" y="58" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="600" fill="#dc834e" letterSpacing="4.5">TOURS</text>
                            </svg>
                        </Link>
                    </div>
                    <p className={styles.description}>
                        {t('footer_desc')}
                    </p>
                </div>

                {/* Explore Links Column */}
                <div className={styles.column}>
                    <h2 className={styles.title}>{t('footer_explore')}</h2>
                    <ul className={styles.linksList}>
                        <li>
                            <Link href={getPath('/')} prefetch={false}>{t('home')}</Link>
                        </li>
                        <li>
                            <Link href={getPath('/airport-transfers')} prefetch={false}>
                                {isEn ? 'Morocco Airport Transfers' : (language === 'es' ? 'Traslados de Aeropuerto' : 'Transferts Aéroport Maroc')}
                            </Link>
                        </li>
                        <li>
                            <Link href={getPath('/transfers')} prefetch={false}>
                                {isEn ? 'Intercity Transfers' : (language === 'es' ? 'Traslados Interurbanos' : 'Transferts Intervilles')}
                            </Link>
                        </li>
                        <li>
                            <Link href={getPath('/private-driver-morocco')} prefetch={false}>
                                {isEn ? 'Private Driver Morocco' : (language === 'es' ? 'Chófer Privado Marruecos' : 'Chauffeur Privé Maroc')}
                            </Link>
                        </li>
                        {language !== 'es' ? (
                            <>
                                <li>
                                    <Link href={getPath('/private-driver-marrakech')} prefetch={false}>
                                        {isEn ? 'Private Driver Marrakech' : 'Chauffeur Privé Marrakech'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getPath('/private-driver-casablanca')} prefetch={false}>
                                        {isEn ? 'Private Driver Casablanca' : 'Chauffeur Privé Casablanca'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getPath('/private-driver-fes')} prefetch={false}>
                                        {isEn ? 'Private Driver Fes' : 'Chauffeur Privé Fès'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getPath('/private-driver-tangier')} prefetch={false}>
                                        {isEn ? 'Private Driver Tangier' : 'Chauffeur Privé Tanger'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getPath('/tours')} prefetch={false}>
                                        {isEn ? 'Morocco Guided Tours' : 'Circuits Guidés Maroc'}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={getPath('/blog')} prefetch={false}>{t('footer_blog')}</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/es/car-with-driver-morocco-8-days" prefetch={false}>
                                        Ruta 8 Días con Conductor
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/es/tours" prefetch={false}>
                                        Excursiones en Marruecos
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/es/tours/chefchaouen-day-trip" prefetch={false}>
                                        Excursión a Chefchaouen
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/es/contact" prefetch={false}>{t('contact_us')}</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Global Contact Column */}
                <div className={styles.column}>
                    <h2 className={styles.title}>{t('footer_contact')}</h2>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Avenue Mohammed V, Rabat, Morocco 10000</span>
                        </div>
                        <div className={styles.contactItem}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <TrackedWhatsAppLink href="https://wa.me/212724114775" source="catalog_footer_whatsapp" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <span>+212 724-114775</span>
                            </TrackedWhatsAppLink>
                        </div>
                        <div className={styles.contactItem}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>booking@mdinatours.com</span>
                        </div>
                    </div>
                </div>

                {/* Global Social & Experience Column */}
                <div className={styles.column}>
                    <h2 className={styles.title}>{t('footer_follow')}</h2>
                    <div className={styles.socialGrid}>
                        <a 
                            href={MDINA_SOCIAL_LINKS.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.socialIcon} 
                            aria-label="Facebook"
                        >
                            <svg viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
                        </a>
                        <a 
                            href={MDINA_SOCIAL_LINKS.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.socialIcon} 
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                        </a>
                        <a 
                            href={MDINA_SOCIAL_LINKS.tiktok} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.socialIcon} 
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z" /></svg>
                        </a>
                        <a 
                            href={MDINA_SOCIAL_LINKS.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.socialIcon} 
                            aria-label="LinkedIn"
                        >
                            <svg viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                        </a>
                    </div>
                    <div className={styles.paymentWrapper}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.85, fontSize: '0.85rem', color: '#e2e8f0', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', width: '100%' }}>{language === 'es' ? 'Métodos de pago' : language === 'fr' ? 'Paiement sécurisé' : 'Payment & Security'}</span>
                            <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>VISA</span>
                            <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Mastercard</span>
                            <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{language === 'es' ? 'Efectivo en mano' : language === 'fr' ? 'Espèces à l\'arrivée' : 'Cash on Arrival'}</span>
                            <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{language === 'es' ? 'Transferencia' : language === 'fr' ? 'Virement' : 'Bank Transfer'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.bottomContainer}>
                    <div className={styles.copyright}>
                        &copy; {currentYear} Mdina Tours Company.
                    </div>
                    <div className={styles.legalLinks}>
                        <Link href={getPath('/about')} prefetch={false} rel="nofollow">{language === 'es' ? 'Sobre Nosotros' : (isEn ? 'About Us' : 'À Propos')}</Link>
                        <Link href={getPath('/faq')} prefetch={false} rel="nofollow">FAQ</Link>
                        {language !== 'es' && (
                            <Link href={getPath('/partners')} prefetch={false} rel="nofollow">{isEn ? 'B2B Partner Hub' : 'Espace B2B Partenaires'}</Link>
                        )}
                        <Link href={getPath('/privacy')} prefetch={false} rel="nofollow">{t('footer_privacy')}</Link>
                        <Link href={getPath('/terms')} prefetch={false} rel="nofollow">{t('footer_terms')}</Link>
                        <CookieConsentRevokeLink lang={lang} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

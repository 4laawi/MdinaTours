"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
    const { language, t } = useLanguage();
    const currentYear = new Date().getFullYear();

    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

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
                        <Link href={getPath('/')}>
                            <Image
                                src="/ZahriTours-Logo.png"
                                alt="ZahriTours Logo"
                                width={200}
                                height={60}
                                className={styles.logo}
                                priority
                            />
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
                            <Link href={getPath('/')}>{t('home')}</Link>
                        </li>
                        <li>
                            <Link href={`${getPath('/')}#about`}>{t('footer_our_story')}</Link>
                        </li>
                        <li>
                            <Link href={`${getPath('/')}#tours`}>{t('footer_private_tours')}</Link>
                        </li>
                        <li>
                            <Link href={`${getPath('/')}#faq`}>{t('footer_faq')}</Link>
                        </li>
                        <li>
                            <Link href={getPath('/contact')}>{t('footer_custom_trip')}</Link>
                        </li>
                        <li>
                            <Link href={getPath('/blog')}>{t('footer_blog')}</Link>
                        </li>
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
                            <span>Lot Jamila 33, Tangier, Morocco 90000</span>
                        </div>
                        <div className={styles.contactItem}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+212 766 816 992</span>
                        </div>
                        <div className={styles.contactItem}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>booking@tiqalgs.com</span>
                        </div>
                    </div>
                </div>

                {/* Global Social & Experience Column */}
                <div className={styles.column}>
                    <h2 className={styles.title}>{t('footer_follow')}</h2>
                    <div className={styles.socialGrid}>
                        <a href="https://facebook.com" target="_blank" className={styles.socialIcon} aria-label="Facebook">
                            <svg viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
                        </a>
                        <a href="https://instagram.com/zahritours" target="_blank" className={styles.socialIcon} aria-label="Instagram">
                            <svg viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                        </a>
                        <a href="https://tripadvisor.com" target="_blank" className={styles.socialIcon} aria-label="Tripadvisor">
                            <svg viewBox="0 0 576 512"><path d="M528.91,178.82,576,127.58H471.66a326.11,326.11,0,0,0-367,0H0l47.09,51.24A143.911,143.911,0,0,0,241.86,390.73L288,440.93l46.11-50.17A143.94,143.94,0,0,0,575.88,285.18h-.03A143.56,143.56,0,0,0,528.91,178.82ZM144.06,382.57a97.39,97.39,0,1,1,97.39-97.39A97.39,97.39,0,0,1,144.06,382.57ZM288,282.37c0-64.09-46.62-119.08-108.09-142.59a281,281,0,0,1,216.17,0C334.61,163.3,288,218.29,288,282.37Zm143.88,100.2h-.01a97.405,97.405,0,1,1,.01,0ZM144.06,234.12h-.01a51.06,51.06,0,1,0,51.06,51.06v-.11A51,51,0,0,0,144.06,234.12Zm287.82,0a51.06,51.06,0,1,0,51.06,51.06A51.06,51.06,0,0,0,431.88,234.12Z" /></svg>
                        </a>
                    </div>
                    <div className={styles.paymentWrapper}>
                        <Image
                            src="https://marrakechcitytravel.com/wp-content/uploads/2025/08/payment.png"
                            alt="Secured Payments"
                            width={200}
                            height={34}
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <div className={styles.bottomContainer}>
                    <div className={styles.copyright}>
                        &copy; {currentYear} ZahriTours Company. {t('footer_built_by')} <a href="https://sitepro.ma" target="_blank" rel="noopener noreferrer" className={styles.agencyLink}>SitePro.ma - Web Agency Morocco</a>
                    </div>
                    <div className={styles.legalLinks}>
                        <Link href={getPath('/privacy')}>{t('footer_privacy')}</Link>
                        <Link href={getPath('/terms')}>{t('footer_terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

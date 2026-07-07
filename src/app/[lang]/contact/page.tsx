import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import styles from './Contact.module.css';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import { Metadata } from 'next';
import ContactForm from './ContactForm';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Contact Us – Mdina Tours | Private Transfers & Custom Tours Morocco' : 'Contactez-nous – Mdina Tours | Transferts Privés & Circuits sur Mesure au Maroc';
    const description = isEn
        ? 'Get in touch with Mdina Tours for private transfers, custom tours, and personal travel arrangements in Morocco. We are here to help you plan your perfect trip.'
        : 'Contactez Mdina Tours pour des transferts privés, des circuits sur mesure et des arrangements de voyage au Maroc. Nous sommes là pour vous aider à planifier votre voyage parfait.';
    const url = `https://mdinatours.com/${lang}/contact`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/contact',
                'fr': 'https://mdinatours.com/fr/contact',
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
                    alt: 'Contact Mdina Tours',
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

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    // Helper to get localized path
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
                "name": isEn ? "Contact" : "Contact",
                "item": `https://mdinatours.com/${language}/contact`
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
                {/* Contact semi-hero banner */}
                <PageBanner 
                    title={t('contact_banner_title')}
                    bgImage="/img/Morocco-trip-tour-hero08.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={t('contact')}
                />

                {/* Contact content section */}
                <section className={styles.contactContent}>
                    <div className={styles.container}>
                        <div className={styles.contactLayout}>
                            {/* Left Side: Contact Information */}
                            <div className={styles.infoSection}>
                                <h2>{t('contact_help_title')}</h2>
                                <p>{t('contact_help_desc')}</p>

                                <div className={styles.contactInfoList}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.iconWrapper}>
                                            <svg viewBox="0 0 512 512" fill="currentColor">
                                                <path d="M256 32c-88.4 0-160 71.6-160 160c0 110.4 160 288 160 288s160-177.6 160-288c0-88.4-71.6-160-160-160zm0 216c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoText}>
                                            <h4>{t('contact_info_location')}</h4>
                                            <p>Avenue Mohammed V, Rabat, Morocco 10000</p>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.iconWrapper}>
                                            <svg viewBox="0 0 512 512" fill="currentColor">
                                                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A178.66 178.66 0 0 1 130.4 203.1l60.6-49.6a24 24 0 0 0 6.9-28l-48-112a24.16 24.16 0 0 0 122.6 0H24 A24 24 0 0 0 0 24c0 269.56 218.44 488 488 488a24 24 0 0 0 24-24v-98.6a24.16 24.16 0 0 0-14.61-22.6z" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoText}>
                                            <h4>{t('contact_info_phone')}</h4>
                                            <p>+212 766 816 992</p>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.iconWrapper}>
                                            <svg viewBox="0 0 512 512" fill="currentColor">
                                                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.2-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                                            </svg>
                                        </div>
                                        <div className={styles.infoText}>
                                            <h4>{t('contact_info_email')}</h4>
                                            <p>booking@mdinatours.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Contact Form */}
                            <div className={styles.formSection}>
                                <ContactForm />
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

import Link from 'next/link';
import { translations, Language } from '@/lib/translations';
import styles from './Destinations.module.css';

export default function Destinations({ lang = 'en' }: { lang?: Language }) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    return (
        <section className={styles.destinationsSection}>
            {/* Top Wave Divider */}
            <div className={styles.waveDividerTop}>
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>

            <div className="container">
                <div className={styles.content}>
                    <div className="section-subtitle">{t('dest_subtitle')}</div>
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('dest_title').replace('\n', '<br />') }}></h2>
                    <p className={styles.description} dangerouslySetInnerHTML={{ __html: t('dest_desc').replace('\n', '<br />') }}></p>
                    <div className={styles.action}>
                        <Link href={`/${lang}/blog`} className="btn-primary">
                            {t('explore_blog')} <span className={styles.arrow}>→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className={styles.waveDivider}>
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,120 Q600,0 1200,120 L1200,120 L0,120 Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>
        </section>
    );
}

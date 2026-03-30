"use client";

import Image from 'next/image';

import { useLanguage } from '@/context/LanguageContext';
import styles from './ZahriToursSection.module.css';

const ZahriToursSection = () => {
    const { t } = useLanguage();



    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.topContent}>
                    <div className={styles.leftCol}>
                        <h2 className={styles.title}>{t('zt_title')}</h2>
                    </div>
                    <div className={styles.rightCol}>
                        <p className={styles.quote}>
                            {t('zt_quote')}
                        </p>
                        <div className={styles.buttonGroup}>
                            <a
                                href="#hero"
                                className={styles.btnPrimary}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {t('book_now').toUpperCase()}
                            </a>
                            <a
                                href="#tours"
                                className={styles.btnSecondary}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {t('explore_trips').toUpperCase()}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.gridContainer}>
                    <div className={styles.mainImageCol}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/hero-marrakech.webp"
                                alt="Moroccan Landscape"
                                fill
                                className={styles.gridImage}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    <div className={styles.sideImagesCol}>
                        <div className={styles.topSideImage}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/Tangier-Morocco-Photo.webp"
                                    alt="Travelers in Morocco"
                                    fill
                                    className={styles.gridImage}
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                        </div>

                        <div className={styles.bottomRow}>
                            <div className={styles.bottomSideImage}>
                                <div className={styles.imageWrapperWide}>
                                    <Image
                                        src="/Sahara.webp"
                                        alt="Sahara Desert"
                                        fill
                                        className={styles.gridImage}
                                        sizes="(max-width: 768px) 100vw, 15vw"
                                    />
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <Image
                                    src="/Traditional.webp"
                                    alt="Sahara Desert Trek"
                                    fill
                                    className={styles.cardBgImage}
                                    sizes="(max-width: 768px) 100vw, 15vw"
                                />
                                <div className={styles.cardOverlay} />
                                <div className={styles.cardContent}>
                                    <div className={styles.iconCircle}>
                                        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M507.31 84.69L464 41.37c-6-6-14.14-9.37-22.63-9.37H288V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v16H56c-13.25 0-24 10.75-24 24v80c0 13.25 10.75 24 24 24h385.37c8.49 0 16.62-3.37 22.63-9.37l43.31-43.31c6.25-6.26 6.25-16.38 0-22.63zM224 496c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V384h-64v112zm232-272H288v-32h-64v32H70.63c-8.49 0-16.62 3.37-22.63 9.37L4.69 276.69c-6.25 6.25-6.25 16.38 0 22.63L48 342.63c6 6 14.14 9.37 22.63 9.37H456c13.25 0 24-10.75 24-24v-80c0-13.25-10.75-24-24-24z" />
                                        </svg>
                                    </div>
                                    <h3 className={styles.cardTitle}>{t('zt_card_title')}</h3>
                                    <p className={styles.cardSubtitle}>{t('zt_card_subtitle')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZahriToursSection;

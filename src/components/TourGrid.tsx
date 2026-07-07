"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { toursData, TourData } from '@/lib/toursData';
import styles from './TourGrid.module.css';

const PASSENGER_OPTIONS = ['1–3', '4–5', '6–7'];

export default function TourGrid() {
    const { language, t } = useLanguage();
    const isEn = language === 'en';
    const today = new Date().toISOString().split('T')[0];
    const [selectedTour, setSelectedTour] = useState<TourData | null>(null);



    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;



    return (
        <section id="tours" className={styles.tourGridSection}>
            <div className="container">
                <div className={styles.intro}>
                    <div className={styles.subtitle}>{t('tour_subtitle')}</div>
                    <h2 className="section-title">{t('tour_title')}</h2>
                    <p className={styles.description}>
                        {t('tour_desc')}
                    </p>
                </div>

                <div className={styles.grid}>
                    {toursData.slice(0, 6).map(tour => {
                        const local = tour[language];

                        return (
                            <div key={tour.slug} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={tour.image}
                                        alt={local.title}
                                        fill
                                        className={styles.tourImage}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {tour.price > 120 && <span className={styles.bestSellerBadge}>{t('best_seller')}</span>}
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.infoBar}>
                                        <span className={styles.duration}>
                                            <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {local.duration}
                                        </span>
                                        <div className={styles.ratingStars}>
                                            <span className={styles.star}>★</span>
                                            <span className={styles.ratingValue}>5.0 (98)</span>
                                        </div>
                                    </div>

                                    <h3 className={styles.title}>{local.title}</h3>

                                    <p className={styles.tourDescription}>{local.excerpt}</p>

                                    <div className={styles.includesRow}>
                                        <div className={styles.includeItem}>
                                            <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><circle cx="7" cy="18" r="2" /><path d="M9 18h4" /><circle cx="17" cy="18" r="2" /><path d="M19 18h2a1 1 0 0 0 1-1v-4.2a2 2 0 0 0-.25-1.1s-1.07-2-1.5-2.75A2 2 0 0 0 18.5 8H14" /><path d="M14 14h8" />
                                            </svg>
                                            <span className={styles.itemLabel}>{t('inc_transport')}</span>
                                        </div>
                                        <div className={styles.includeItem}>
                                            <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            <span className={styles.itemLabel}>{t('inc_guide')}</span>
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <div className={styles.priceBlock}>
                                            <span className={styles.priceLabel}>{t('from')}</span>
                                            <span className={styles.priceValue}>
                                                €{tour.price}
                                            </span>
                                        </div>
                                        <div className={styles.actionsBlock}>
                                            <Link href={getPath(`/tours/${tour.slug}`)} className={styles.bookBtn}>
                                                {isEn ? 'View Tour' : 'Voir le Circuit'}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


        </section>
    );
}

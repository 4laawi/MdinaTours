"use client";

import { useState, useRef } from 'react';
import { Locale, REVIEWS } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface ReviewsSectionProps {
    lang: Locale;
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        eyebrow: isAr ? 'آراء وتجارب المسافرين' : isFr ? 'AVIS CLIENTS VÉRIFIÉS' : isEs ? 'OPINIONES DE VIAJEROS' : 'VERIFIED CLIENT REVIEWS',
        title: isAr ? 'تقييمات موثقة لتوصيل المطارات في المغرب' : isFr ? 'Avis vérifiés sur nos transferts aéroport au Maroc' : isEs ? 'Opiniones verificadas de traslados en aeropuertos de Marruecos' : 'Verified Morocco Airport Transfer Reviews',
        subtitle: isAr 
            ? 'تقييمات حقيقية وموثقة من سياح ورجال أعمال اختاروا مدينة تورز لتنقلاتهم في المغرب.'
            : isFr 
            ? 'Témoignages authentiques de voyageurs internationaux ayant confié leur accueil à Mdina Tours.'
            : isEs 
            ? 'Reseñas reales y contrastadas de viajeros de todo el mundo que confiaron en Mdina Tours.'
            : 'Genuine feedback from international travelers and business executives who booked their Morocco arrivals with us.',
        trustSummary: isAr 
            ? 'تقييم 4.9 من 5 على منصة Trustpilot و Google استناداً إلى أكثر من 340 مراجعة' 
            : isFr 
            ? 'Note moyenne de 4.9 / 5 sur Trustpilot & Google basée sur plus de 340 avis vérifiés' 
            : isEs 
            ? 'Puntuación media de 4.9 / 5 en Trustpilot y Google basada en más de 340 reseñas' 
            : 'Rated 4.9 / 5 on Trustpilot & Google across 340+ verified passenger reviews'
    };

    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const reviewsRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.sectionAlt} id="reviews">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle} style={{ marginBottom: '14px' }}>
                        {text.subtitle}
                    </p>
                    {/* Trustpilot & Google summary line */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid var(--sand-200, #E2E8F0)', borderRadius: '100px', padding: '6px 18px', fontSize: '0.84rem', color: 'var(--ink-900, #202F59)', fontWeight: 600 }}>
                        <Icon icon="simple-icons:trustpilot" width="16" height="16" style={{ color: '#00B67A' }} />
                        <span>{text.trustSummary}</span>
                    </div>
                </div>

                <div 
                    className={styles.reviewsGrid}
                    ref={reviewsRef}
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        if (el.scrollWidth > el.clientWidth) {
                            const step = el.scrollWidth / REVIEWS.length;
                            const idx = Math.round(el.scrollLeft / step);
                            setActiveReviewIndex(Math.max(0, Math.min(REVIEWS.length - 1, idx)));
                        }
                    }}
                >
                    {REVIEWS.map((rev, idx) => (
                        <div key={idx} className={styles.reviewCardShell}>
                            <div className={styles.reviewCardCore}>
                                <div>
                                    <div className={styles.reviewStarsRow} aria-label={`${rev.rating} out of 5 stars`}>
                                        {Array.from({ length: rev.rating }).map((_, sIdx) => (
                                            <Icon key={sIdx} icon="solar:star-bold" width="18" height="18" />
                                        ))}
                                    </div>
                                    <blockquote className={styles.reviewQuote}>
                                        “{rev.quote[lang] || rev.quote.en}”
                                    </blockquote>
                                </div>

                                <div className={styles.reviewAuthorWrap}>
                                    <div className={styles.reviewAvatar}>
                                        {rev.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className={styles.reviewAuthorName}>{rev.name}</div>
                                        <div className={styles.reviewRouteTag}>
                                            {rev.country} · {rev.route}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel Indicators */}
                <div className={styles.mobileCarouselDots} aria-hidden="true">
                    {REVIEWS.map((_, dIdx) => (
                        <button
                            key={dIdx}
                            type="button"
                            className={`${styles.mobileCarouselDot} ${activeReviewIndex === dIdx ? styles.mobileCarouselDotActive : ''}`}
                            onClick={() => {
                                if (reviewsRef.current) {
                                    const card = reviewsRef.current.children[dIdx] as HTMLElement;
                                    if (card) {
                                        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                        setActiveReviewIndex(dIdx);
                                    }
                                }
                            }}
                            aria-label={`Go to review ${dIdx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

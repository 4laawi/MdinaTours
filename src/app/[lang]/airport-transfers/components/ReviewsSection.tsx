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
        eyebrow: isAr ? 'آراء وتجارب المسافرين' : isFr ? 'AVIS CLIENTS' : isEs ? 'OPINIONES DE VIAJEROS' : 'TRAVELER REVIEWS',
        title: isAr ? 'تجارب المسافرين لتوصيل المطارات في المغرب' : isFr ? 'Avis sur nos transferts aéroport au Maroc' : isEs ? 'Opiniones sobre nuestros traslados en Marruecos' : 'Morocco Airport Transfer Traveler Reviews',
        subtitle: isAr 
            ? 'تجارب وانطباعات حقيقية من سياح ورجال أعمال اختاروا مدينة تورز لتنقلاتهم في المغرب.'
            : isFr 
            ? 'Témoignages de voyageurs internationaux ayant confié leur accueil à Mdina Tours.'
            : isEs 
            ? 'Comentarios de viajeros de todo el mundo que confiaron en Mdina Tours para sus traslados.'
            : 'Feedback and impressions from international travelers and guests who booked their Morocco airport transfers with us.'
    };

    const [activeReviewIndex, setActiveReviewIndex] = useState(0);
    const reviewsRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.sectionAlt} id="reviews">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>
                        {text.subtitle}
                    </p>
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

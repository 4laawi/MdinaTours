"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './PrivateDriverWhyChooseUs.module.css';

interface AnimatedNumberProps {
    start: number;
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
}

function AnimatedNumber({
    start,
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
    decimals = 0
}: AnimatedNumberProps) {
    const [count, setCount] = useState(end);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const currentRef = elementRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing: easeOutQuad
            const easedProgress = progress * (2 - progress);
            
            const currentVal = start + easedProgress * (end - start);
            setCount(currentVal);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [hasAnimated, start, end, duration]);

    const formattedFinal = `${prefix}${decimals === 0 ? end : end.toFixed(decimals)}${suffix}`;

    return (
        <span ref={elementRef} aria-label={formattedFinal}>
            {prefix}
            {decimals === 0 ? Math.round(count) : count.toFixed(decimals)}
            {suffix}
        </span>
    );
}

interface PrivateDriverWhyChooseUsProps {
    lang: string;
    topFill?: string;
    bottomFill?: string;
}

export default function PrivateDriverWhyChooseUs({ 
    lang, 
    topFill = "#ffffff", 
    bottomFill = "#ffffff" 
}: PrivateDriverWhyChooseUsProps) {
    const isEn = lang === 'en';
    const isEs = lang === 'es';
    const title = isEn ? "Why Choose Mdina Tours?" : (isEs ? "¿Por qué elegir Mdina Tours?" : "Pourquoi Choisir Mdina Tours ?");

    return (
        <section className={styles.section}>
            {/* Top Curved Divider */}
            <div className={styles.topDivider}>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className={styles.dividerSvg}
                >
                    <path
                        d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"
                        fill={topFill}
                        suppressHydrationWarning
                    ></path>
                </svg>
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                </div>

                <div className={styles.statsGrid}>
                    {/* Stat 1: Transfers Completed (0 to 500+) */}
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedNumber start={0} end={500} suffix="+" />
                        </span>
                        <span className={styles.statLabel}>
                            {isEn ? "Private transfers completed" : (isEs ? "Traslados privados completados" : "Transferts privés effectués")}
                        </span>
                    </div>

                    {/* Stat 2: Average Rating (0.0 to 4.9★) */}
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedNumber start={0.0} end={4.9} decimals={1} suffix="★" />
                        </span>
                        <span className={styles.statLabel}>
                            {isEn ? "Average rating across all bookings" : (isEs ? "Puntuación media en todas las reservas" : "Note moyenne sur toutes les réservations")}
                        </span>
                    </div>

                    {/* Stat 3: Hidden Fees (10€ to 0€) */}
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>
                            <AnimatedNumber start={10} end={0} suffix="€" />
                        </span>
                        <span className={styles.statLabel}>
                            {isEn ? "Hidden fees, ever" : (isEs ? "Sin cargos ocultos, nunca" : "Aucun frais caché, jamais")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Curved Divider */}
            <div className={styles.bottomDivider}>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className={styles.dividerSvg}
                >
                    <path
                        d="M0,120 Q600,0 1200,120 L1200,120 L0,120 Z"
                        fill={bottomFill}
                        suppressHydrationWarning
                    ></path>
                </svg>
            </div>
        </section>
    );
}

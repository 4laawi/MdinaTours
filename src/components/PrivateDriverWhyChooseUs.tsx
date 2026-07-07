"use client";

import React, { useState, useEffect, useRef } from 'react';

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
    const [count, setCount] = useState(start);
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
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing: easeOutQuad
            const easedProgress = progress * (2 - progress);
            
            const currentVal = start + easedProgress * (end - start);
            setCount(currentVal);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [hasAnimated, start, end, duration]);

    return (
        <span ref={elementRef}>
            {prefix}
            {decimals === 0 ? Math.round(count) : count.toFixed(decimals)}
            {suffix}
        </span>
    );
}

interface PrivateDriverWhyChooseUsProps {
    lang: string;
}

export default function PrivateDriverWhyChooseUs({ lang }: PrivateDriverWhyChooseUsProps) {
    const isEn = lang === 'en';
    const title = isEn ? "Why Choose Mdina Tours?" : "Pourquoi Choisir Mdina Tours ?";

    return (
        <section style={{ 
            padding: '120px 20px', 
            background: 'linear-gradient(135deg, var(--secondary) 0%, #121d39 100%)', 
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top Curved Divider */}
            <div style={{
                position: 'absolute',
                top: '-1px',
                left: 0,
                width: '100%',
                overflow: 'hidden',
                lineHeight: 0,
                zIndex: 2
            }}>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{
                        position: 'relative',
                        display: 'block',
                        width: 'calc(100% + 1.3px)',
                        height: 'clamp(40px, 6vw, 80px)'
                    }}
                >
                    <path
                        d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"
                        fill="var(--bg-color)"
                    ></path>
                </svg>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ 
                        fontSize: '2rem', 
                        fontWeight: 700, 
                        color: '#ffffff', 
                        margin: 0,
                        fontFamily: 'var(--font-poppins), sans-serif',
                        textWrap: 'balance'
                    }}>
                        {title}
                    </h2>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                    gap: '40px',
                    textAlign: 'center'
                }}>
                    {/* Stat 1: Transfers Completed (0 to 500+) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 0'
                    }}>
                        <span style={{ 
                            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
                            fontWeight: 800, 
                            color: 'var(--primary)',
                            lineHeight: '1.1',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            letterSpacing: '-0.02em'
                        }}>
                            <AnimatedNumber start={0} end={500} suffix="+" />
                        </span>
                        <span style={{ 
                            fontSize: '1rem', 
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.85)',
                            lineHeight: '1.4',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            textWrap: 'balance'
                        }}>
                            {isEn ? "Private transfers completed" : "Transferts privés effectués"}
                        </span>
                    </div>

                    {/* Stat 2: Average Rating (0.0 to 4.9★) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 0'
                    }}>
                        <span style={{ 
                            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
                            fontWeight: 800, 
                            color: 'var(--primary)',
                            lineHeight: '1.1',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            letterSpacing: '-0.02em'
                        }}>
                            <AnimatedNumber start={0.0} end={4.9} decimals={1} suffix="★" />
                        </span>
                        <span style={{ 
                            fontSize: '1rem', 
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.85)',
                            lineHeight: '1.4',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            textWrap: 'balance'
                        }}>
                            {isEn ? "Average rating across all bookings" : "Note moyenne sur toutes les réservations"}
                        </span>
                    </div>

                    {/* Stat 3: Hidden Fees (10€ to 0€) */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 0'
                    }}>
                        <span style={{ 
                            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', 
                            fontWeight: 800, 
                            color: 'var(--primary)',
                            lineHeight: '1.1',
                            marginBottom: '10px',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            letterSpacing: '-0.02em'
                        }}>
                            <AnimatedNumber start={10} end={0} suffix="€" />
                        </span>
                        <span style={{ 
                            fontSize: '1rem', 
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.85)',
                            lineHeight: '1.4',
                            fontFamily: 'var(--font-poppins), sans-serif',
                            textWrap: 'balance'
                        }}>
                            {isEn ? "Hidden fees, ever" : "Aucun frais caché, jamais"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Curved Divider */}
            <div style={{
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                width: '100%',
                overflow: 'hidden',
                lineHeight: 0,
                zIndex: 2
            }}>
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{
                        position: 'relative',
                        display: 'block',
                        width: 'calc(100% + 1.3px)',
                        height: 'clamp(40px, 6vw, 80px)'
                    }}
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

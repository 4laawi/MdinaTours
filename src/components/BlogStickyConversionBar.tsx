"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';

interface BlogStickyConversionBarProps {
    language: Language;
    routeTitle: string;
    priceFrom?: number;
    transferLink: string;
    whatsAppUrl: string;
}

export default function BlogStickyConversionBar({
    language,
    routeTitle,
    priceFrom,
    transferLink,
    whatsAppUrl
}: BlogStickyConversionBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const isEn = language === 'en';

    useEffect(() => {
        const handleScroll = () => {
            // Appears after scrolling 300px down and stays visible until footer
            const scrollY = window.scrollY;
            const threshold = 300;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const nearBottom = scrollY + winHeight > docHeight - 350;

            if (scrollY > threshold && !nearBottom) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <aside
            aria-label="Quick Transfer Booking Bar"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.96)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(220, 131, 78, 0.4)',
                padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px)) 16px',
                boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.35)',
                zIndex: 998,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxSizing: 'border-box',
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                visibility: isVisible ? 'visible' : 'hidden',
                transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.28s',
                maxWidth: '100vw'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '1 1 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#48bb78',
                        flexShrink: 0
                    }} />
                    <span style={{
                        fontSize: '11px',
                        color: '#fbd38d',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {isEn ? "Direct Transfer" : "Transfert Direct"}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '1px' }}>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {routeTitle}
                    </span>
                    {priceFrom && (
                        <span style={{
                            fontSize: '13px',
                            fontWeight: 800,
                            color: '#e2e8f0',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            flexShrink: 0
                        }}>
                            {isEn ? `From €${priceFrom}` : `Dès ${priceFrom}€`}
                        </span>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <Link
                    href={transferLink}
                    style={{
                        backgroundColor: '#dc834e',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 700,
                        padding: '9px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(220, 131, 78, 0.35)',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <span>{isEn ? "Book Online" : "Réserver"}</span>
                    <span>→</span>
                </Link>

                <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    style={{
                        backgroundColor: '#25d366',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)',
                        flexShrink: 0
                    }}
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
            </div>
        </aside>
    );
}

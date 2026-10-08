"use client";

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

interface PrivateDriverStickyBarProps {
    language: Language;
}

export default function PrivateDriverStickyBar({ language }: PrivateDriverStickyBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const isEn = language === 'en';
    const isEs = language === 'es';

    useEffect(() => {
        const checkVisibility = () => {
            if (window.innerWidth > 768) {
                setIsVisible(false);
                document.body.classList.remove('sticky-bar-active');
                return;
            }
            const bookingEl = document.querySelector('.mobile-booking-widget') || document.getElementById('booking');
            if (!bookingEl) return;
            const rect = bookingEl.getBoundingClientRect();
            // Appears only once the booking widget has scrolled out of view above the screen
            const outOfView = rect.bottom < 50;
            setIsVisible(outOfView);

            if (outOfView) {
                document.body.classList.add('sticky-bar-active');
            } else {
                document.body.classList.remove('sticky-bar-active');
            }
        };

        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });
        checkVisibility();

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
            document.body.classList.remove('sticky-bar-active');
        };
    }, []);

    const scrollToBooking = () => {
        const bookingEl = document.querySelector('.mobile-booking-widget') || document.getElementById('booking');
        if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <aside
            aria-label="Booking Bar"
            className="mobile-driver-sticky-bar"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderTop: '1px solid #E2E8F0',
                padding: '10px 16px calc(10px + env(safe-area-inset-bottom, 0px)) 16px',
                boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                visibility: isVisible ? 'visible' : 'hidden',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.25s'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isEn ? "From" : (isEs ? "Desde" : "À partir de")}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                    <span style={{ fontSize: '19px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                        {isEn || isEs ? "€25" : "25€"}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        {isEn ? "/ hour" : (isEs ? "/ hora" : "/ h")}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={scrollToBooking}
                style={{
                    backgroundColor: '#00805A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0, 128, 90, 0.25)'
                }}
            >
                <span>{isEn ? "Check availability" : (isEs ? "Consultar disponibilidad" : "Vérifier la disponibilité")}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </aside>
    );
}

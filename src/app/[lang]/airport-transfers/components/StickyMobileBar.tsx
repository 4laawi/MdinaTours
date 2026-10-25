"use client";

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface StickyMobileBarProps {
    lang: Locale;
}

export default function StickyMobileBar({ lang }: StickyMobileBarProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 420px (hero)
            if (window.scrollY > 420) {
                setVisible(true);
                document.body.classList.add('sticky-bar-active');
            } else {
                setVisible(false);
                document.body.classList.remove('sticky-bar-active');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('sticky-bar-active');
        };
    }, []);

    if (!visible) return null;

    const text = {
        checkPrice: isAr ? 'احسب السعر الثابت' : isFr ? 'Voir le prix fixe' : isEs ? 'Ver precio fijo' : 'Check fixed price',
    };

    const handleScrollToBooking = () => {
        const widget = document.getElementById('hero-booking-widget');
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <aside className={styles.stickyMobileBar} aria-label="Quick Actions">
            <button
                type="button"
                className={styles.stickyMobilePriceBtn}
                onClick={handleScrollToBooking}
            >
                <span>{text.checkPrice}</span>
                <Icon icon="solar:tag-price-bold" width="18" height="18" />
            </button>
        </aside>
    );
}

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
            // Show after scrolling past 400px (hero)
            if (window.scrollY > 420) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!visible) return null;

    const text = {
        checkPrice: isAr ? 'احسب السعر الثابت' : isFr ? 'Voir le prix fixe' : isEs ? 'Ver precio fijo' : 'Check fixed price',
        whatsAppAria: isAr ? 'محادثة عبر الواتساب' : isFr ? 'Contacter sur WhatsApp' : isEs ? 'Contactar por WhatsApp' : 'Chat on WhatsApp'
    };

    const handleScrollToBooking = () => {
        const widget = document.getElementById('hero-booking-widget');
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const whatsAppUrl = `https://wa.me/212724114775?text=${encodeURIComponent(
        isAr ? "السلام عليكم، أود حجز خدمة توصيل من المطار." : isFr ? "Bonjour, je souhaite réserver un transfert aéroport." : isEs ? "Hola, me gustaría reservar un traslado de aeropuerto." : "Hello, I would like to book an airport transfer."
    )}`;

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

            <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stickyMobileWhatsAppBtn}
                aria-label={text.whatsAppAria}
            >
                <Icon icon="ri:whatsapp-fill" width="24" height="24" />
            </a>
        </aside>
    );
}

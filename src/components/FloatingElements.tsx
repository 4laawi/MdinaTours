"use client";

import { useState, useEffect } from 'react';
import styles from './FloatingElements.module.css';

interface FloatingElementsProps {
    hideWhatsappUntilScroll?: boolean;
}

export default function FloatingElements({ hideWhatsappUntilScroll = false }: FloatingElementsProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <a 
                href="https://wa.me/212766816992" 
                className={`${styles.whatsappFloat} ${hideWhatsappUntilScroll && !isVisible ? styles.hide : ''}`} 
                title="Chat on WhatsApp" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                </svg>
            </a>

            <div onClick={scrollToTop} className={`${styles.scrollToTop} ${isVisible ? styles.show : ''}`} title="Scroll to Top">
                ↑
            </div>
        </>
    );
}

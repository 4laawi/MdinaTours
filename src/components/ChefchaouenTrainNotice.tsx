import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import styles from './ChefchaouenTrainNotice.module.css';

export interface ChefchaouenTrainNoticeProps {
    language: Language;
    originCity?: string;
    transferLink?: string;
    price?: number;
    whatsAppUrl?: string;
}

export default function ChefchaouenTrainNotice({
    language,
    originCity
}: ChefchaouenTrainNoticeProps) {
    const isEn = language === 'en';

    return (
        <aside 
            aria-label={isEn ? "Note on Chefchaouen train connections" : "Note sur les liaisons ferroviaires vers Chefchaouen"} 
            className={styles.callout}
        >
            <p className={styles.calloutText}>
                <strong className={styles.calloutLabel}>
                    {isEn ? "Note on Chefchaouen trains:" : "Note sur le train pour Chefchaouen :"}
                </strong>{' '}
                {isEn ? (
                    <>
                        Chefchaouen has no railway station due to the steep Rif mountain geography. The nearest ONCF train stops terminate hours away in Souk El Arbaa and Tangier (2+ hours away), meaning you must either book a direct{' '}
                        <Link href={`/${language}/private-driver`} className={styles.inlineLink}>
                            private driver in Morocco
                        </Link>
                        , take a regional CTM bus, or combine the train with a local grand taxi.
                    </>
                ) : (
                    <>
                        Chefchaouen ne dispose d&apos;aucune gare ferroviaire en raison du relief montagneux du Rif. Les arrêts ONCF les plus proches s&apos;arrêtent à Souk El Arbaa et Tanger (à plus de 2 heures), ce qui implique de réserver un{' '}
                        <Link href={`/${language}/private-driver`} className={styles.inlineLink}>
                            chauffeur privé au Maroc
                        </Link>
                        , de prendre un autocar CTM ou de combiner le train avec un grand taxi régional.
                    </>
                )}
            </p>
        </aside>
    );
}

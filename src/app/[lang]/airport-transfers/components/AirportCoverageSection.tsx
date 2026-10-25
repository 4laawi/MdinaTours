"use client";

import Link from 'next/link';
import { Locale, AIRPORT_HUBS } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface AirportCoverageSectionProps {
    lang: Locale;
}

export default function AirportCoverageSection({ lang }: AirportCoverageSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        eyebrow: isAr ? 'شبكة المطارات المغربية' : isFr ? 'RÉSEAU DES AÉROPORTS' : isEs ? 'RED DE AEROPUERTOS' : 'MOROCCO AIRPORT NETWORK',
        title: isAr ? 'اختر مطارك واستكشف الأسعار ودليل الوصول' : isFr ? 'Sélectionnez votre aéroport : guides & tarifs fixes' : isEs ? 'Seleccione su aeropuerto: guías y tarifas fijas' : 'Select Your Airport: Guides & Guaranteed Rates',
        subtitle: isAr 
            ? 'اضغط على أي مطار أدناه للانتقال إلى الدليل المخصص والأسعار الثابتة الشاملة بدون تفاوض.'
            : isFr 
            ? 'Cliquez sur l\'aéroport de votre choix pour accéder à sa page dédiée, ses tarifs forfaitaires et instructions de prise en charge.'
            : isEs 
            ? 'Haga clic en el aeropuerto de destino para ver su guía detallada, tarifas fijas y punto de encuentro en la terminal.'
            : 'Click on any airport below to view dedicated landing pages, transparent fixed pricing tables, and terminal meeting points.',
        viewGuide: isAr ? 'عرض الدليل والأسعار الثابتة' : isFr ? 'Voir le guide & tarifs fixes' : isEs ? 'Ver guía y tarifas fijas' : 'View Transfer Guide & Rates',
        fromPrice: isAr ? 'ابتداءً من' : isFr ? 'Dès' : isEs ? 'Desde' : 'From',
    };

    const airportStartPrices: Record<string, number> = {
        RAK: 20,
        CMN: 35,
        TNG: 30,
        AGA: 25,
        FEZ: 25,
        RBA: 25,
        ESU: 25,
    };

    return (
        <section className={styles.sectionLight} id="coverage">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                {/* Airport Hubs Quick-Link Grid (Vital SEO Hub Links) */}
                <div className={styles.airportHubsGrid}>
                    {AIRPORT_HUBS.map((hub) => (
                        <Link
                            key={hub.code}
                            href={`/${lang}/transfers/${hub.slug}`}
                            className={styles.hubCard}
                            title={`${hub.name[lang] || hub.name.en} Transfers`}
                        >
                            <div className={styles.hubCardTop}>
                                <span className={styles.hubCardIata}>{hub.code}</span>
                                <span className={styles.hubCardPrice}>
                                    <span className={styles.hubCardPriceLabel}>{text.fromPrice}</span>
                                    <span className={styles.hubCardPriceVal}>€{airportStartPrices[hub.code] || 25}</span>
                                </span>
                            </div>
                            <h3 className={styles.hubCardTitle}>
                                {hub.name[lang] || hub.name.en}
                            </h3>
                            <p className={styles.hubCardCity}>
                                {hub.city[lang] || hub.city.en}
                            </p>
                            <div className={styles.hubCardAction}>
                                <span>{text.viewGuide}</span>
                                <Icon icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width="16" height="16" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

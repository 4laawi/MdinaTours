"use client";

import Link from 'next/link';
import { Locale, AIRPORT_HUBS, AirportHub } from '@/lib/airportTransfersData';
import styles from './AirportCoverageSection.module.css';

interface AirportCoverageSectionProps {
    lang: Locale;
}

export default function AirportCoverageSection({ lang }: AirportCoverageSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        eyebrow: isAr
            ? 'شبكة المطارات المغربية'
            : isFr
            ? 'RÉSEAU DES AÉROPORTS'
            : isEs
            ? 'RED DE AEROPUERTOS'
            : 'MOROCCO AIRPORT NETWORK',
        title: isAr
            ? 'اختر مطارك في المغرب'
            : isFr
            ? 'Choisissez votre aéroport'
            : isEs
            ? 'Elija su aeropuerto'
            : 'Choose your airport',
        subtitle: isAr
            ? 'أدلة الوصول، أسعار ثابتة ومضمونة ونقاط لقاء محددة.'
            : isFr
            ? 'Guides d’arrivée, tarifs garantis et points de rencontre.'
            : isEs
            ? 'Guías de llegada, tarifas garantizadas y puntos de encuentro.'
            : 'Guides, guaranteed rates and meeting points.',
        from: isAr ? 'ابتداءً من' : isFr ? 'dès' : isEs ? 'desde' : 'from'
    };

    const airportStartPrices: Record<string, number> = {
        CMN: 35,
        RAK: 20,
        RBA: 25,
        TNG: 30,
        FEZ: 25,
        AGA: 25,
        ESU: 25,
    };

    const getAirportDisplay = (hub: AirportHub) => {
        const rawCity = hub.city[lang] || hub.city.en;
        const city = rawCity.includes('·') ? rawCity.split('·')[0].trim() : rawCity;
        const rawName = hub.name[lang] || hub.name.en;

        let airport = rawName;
        // Strip city prefix from airport name if redundant
        const cityRegex = new RegExp(`^${city}\\s*`, 'i');
        if (cityRegex.test(airport)) {
            airport = airport.replace(cityRegex, '').trim();
        }

        return { city, airport };
    };

    return (
        <section className={styles.section} id="coverage">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.hd}>{text.title}</h2>
                    <p className={styles.subtitle}>{text.subtitle}</p>
                </div>

                <div className={styles.grid}>
                    {AIRPORT_HUBS.map((hub) => {
                        const { city, airport } = getAirportDisplay(hub);
                        const price = airportStartPrices[hub.code] || 25;
                        const ariaLabel = isAr
                            ? `مطار ${city} ${airport}، التوصيل ابتداءً من ${price} يورو`
                            : `${city} ${airport}, transfers from ${price} euros`;

                        return (
                            <Link
                                key={hub.code}
                                href={`/${lang}/transfers/${hub.slug}`}
                                className={styles.ap}
                                aria-label={ariaLabel}
                            >
                                <span className={styles.code}>{hub.code}</span>
                                <span className={styles.nm}>
                                    <span className={styles.city}>{city}</span>
                                    <span className={styles.air}>{airport}</span>
                                </span>
                                <span className={styles.pr}>
                                    <span className={styles.fr}>{text.from}</span>
                                    <span className={styles.amt}>€{price}</span>
                                </span>
                                <span className={styles.arr} aria-hidden="true">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

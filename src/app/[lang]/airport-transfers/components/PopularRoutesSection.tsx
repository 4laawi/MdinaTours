"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Locale, POPULAR_ROUTES, RouteItem } from '@/lib/airportTransfersData';
import styles from './PopularRoutesSection.module.css';

interface PopularRoutesSectionProps {
    lang: Locale;
}

type AirportFilter = 'RAK' | 'CMN' | 'RBA' | 'TNG' | 'FEZ' | 'AGA' | 'ESU';

export default function PopularRoutesSection({ lang }: PopularRoutesSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const [activeTab, setActiveTab] = useState<AirportFilter>('RAK');

    const text = {
        eyebrow: isAr
            ? 'أسعار ثابتة ومضمونة'
            : isFr
            ? 'TARIFS FIXES GARANTIS'
            : isEs
            ? 'TARIFAS FIJAS GARANTIZADAS'
            : 'GUARANTEED FLAT RATES',
        title: isAr
            ? 'توصيل مطارات المغرب، أسعار ثابتة'
            : isFr
            ? 'Transferts aéroports au Maroc, tarifs fixes'
            : isEs
            ? 'Traslados de aeropuerto en Marruecos, tarifas fijas'
            : 'Morocco airport transfers, fixed fares',
        subtitle: isAr
            ? 'بدون أسعار متغيرة، رسوم الطرق السيار أو رسوم الأمتعة.'
            : isFr
            ? 'Pas de tarification dynamique, péages ni frais de bagages.'
            : isEs
            ? 'Sin tarifas dinámicas, peajes ni suplementos de equipaje.'
            : 'No surge pricing, tolls or luggage fees.',
        from: isAr ? 'ابتداءً من' : isFr ? 'dès' : isEs ? 'desde' : 'from',
        arrivalGuide: (city: string) =>
            isAr
                ? `دليل الوصول وكافة أسعار ${city}`
                : isFr
                ? `Guide d'arrivée & tous les tarifs pour ${city}`
                : isEs
                ? `Guía de llegada y tarifas completas de ${city}`
                : `${city} arrival guide & full rates`
    };

    const tabs: { id: AirportFilter; label: string; slug: string }[] = [
        { id: 'RAK', label: isAr ? 'مراكش' : 'Marrakech', slug: 'marrakech-airport-transfer' },
        { id: 'CMN', label: isAr ? 'الدار البيضاء' : 'Casablanca', slug: 'casablanca-airport-transfer' },
        { id: 'RBA', label: isAr ? 'الرباط' : 'Rabat', slug: 'rabat-airport-transfer' },
        { id: 'TNG', label: isAr ? 'طنجة' : isEs ? 'Tánger' : 'Tangier', slug: 'tangier-airport-transfer' },
        { id: 'FEZ', label: isAr ? 'فاس' : isEs ? 'Fez' : isFr ? 'Fès' : 'Fes', slug: 'fes-airport-transfer' },
        { id: 'AGA', label: isAr ? 'أكادير' : 'Agadir', slug: 'agadir-airport-transfer' },
        { id: 'ESU', label: isAr ? 'الصويرة' : isEs ? 'Esauira' : 'Essaouira', slug: 'marrakech-to-essaouira-transfer' }
    ];

    const activeTabInfo = tabs.find(t => t.id === activeTab) || tabs[0];
    const filteredRoutes = POPULAR_ROUTES.filter(r => r.airportCode === activeTab);

    const getCleanDestination = (route: RouteItem): string => {
        const raw = route.title[lang] || route.title.en;
        if (!raw) return '';
        let dest = raw.includes('⇄') ? raw.split('⇄')[1].trim() : raw;
        if (isAr) {
            dest = dest.replace(/\s*\/\s*/g, ' و ');
        } else if (isEs) {
            dest = dest.replace(/\s*\/\s*/g, ' y ');
        } else {
            dest = dest.replace(/\s*\/\s*/g, ' & ');
        }
        return dest;
    };

    const handleSelectRoute = (route: RouteItem) => {
        const event = new CustomEvent('prefill-transfer-route', {
            detail: {
                pickup: route.pickup,
                dropoff: route.dropoff
            }
        });
        window.dispatchEvent(event);

        const widget = document.getElementById('hero-booking-widget');
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <section className={styles.section} id="routes">
            <div className={styles.container}>
                <span className={styles.eyebrow}>{text.eyebrow}</span>
                <h2 className={styles.hd}>{text.title}</h2>
                <p className={styles.subtitle}>{text.subtitle}</p>

                {/* Filter Tabs */}
                <div className={styles.tabs} role="tablist" aria-label="Airport Transfer Cities">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`${styles.tab} ${isActive ? styles.tabOn : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Route Rows */}
                <div>
                    {filteredRoutes.map((route) => {
                        const dest = getCleanDestination(route);
                        const ariaLabel = isAr
                            ? `حجز مسار مطار ${activeTabInfo.label} إلى ${dest}، ابتداءً من ${route.price} يورو`
                            : `Book ${activeTabInfo.label} Airport to ${dest}, from ${route.price} euros`;

                        return (
                            <a
                                key={route.id}
                                href="#hero-booking-widget"
                                className={styles.row}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelectRoute(route);
                                }}
                                aria-label={ariaLabel}
                            >
                                <div>
                                    <div className={styles.destination}>{dest}</div>
                                    <div className={styles.meta}>
                                        {route.duration} · {route.distance}
                                    </div>
                                </div>
                                <div className={styles.priceCol}>
                                    <div className={styles.from}>{text.from}</div>
                                    <div className={styles.price}>€{route.price}</div>
                                </div>
                                <span className={styles.go} aria-hidden="true">
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
                            </a>
                        );
                    })}
                </div>

                {/* Spoke page guide & full rates link */}
                <Link
                    href={`/${lang}/transfers/${activeTabInfo.slug}`}
                    className={styles.more}
                >
                    <span>{text.arrivalGuide(activeTabInfo.label)}</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

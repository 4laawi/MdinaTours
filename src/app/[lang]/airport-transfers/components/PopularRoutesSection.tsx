"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Locale, POPULAR_ROUTES, RouteItem } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

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
        eyebrow: isAr ? 'أسعار ثابتة ومضمونة' : isFr ? 'TARIFS FIXES GARANTIS' : isEs ? 'TARIFAS FIJAS GARANTIZADAS' : 'GUARANTEED FLAT RATES',
        title: isAr ? 'أشهر مسارات توصيل المطارات في المغرب بأسعار ثابتة' : isFr ? 'Trajets majeurs & tarifs fixes des aéroports du Maroc' : isEs ? 'Rutas principales y tarifas fijas de aeropuertos de Marruecos' : 'Popular Morocco Airport Transfer Routes & Fixed Fares',
        subtitle: isAr 
            ? 'أسعار نهائية وشاملة لكل شيء: الوقود، رسوم الطريق السيار، مواقف المطار وحمل الأمتعة دون أي رسوم إضافية.'
            : isFr 
            ? 'Tarifs forfaitaires fermes incluant péages, carburant, frais d\'aéroport et bagages. Zéro supplément imprévu.'
            : isEs 
            ? 'Tarifas cerradas todo incluido con peajes, combustible, parkings y asistencia de equipaje. Sin sorpresas.'
            : 'Transparent upfront pricing with zero surge rates, highway toll charges, parking fees, or baggage extras.',
        from: isAr ? 'ابتداءً من' : isFr ? 'Dès' : isEs ? 'Desde' : 'From',
        bookRoute: isAr ? 'حجز هذا المسار' : isFr ? 'Réserver ce trajet' : isEs ? 'Reservar ruta' : 'Book this route'
    };

    const tabs: { id: AirportFilter; label: string; code: string; slug: string }[] = [
        { id: 'RAK', label: isAr ? 'مراكش' : 'Marrakech', code: 'RAK', slug: 'marrakech-airport-transfer' },
        { id: 'CMN', label: isAr ? 'الدار البيضاء' : 'Casablanca', code: 'CMN', slug: 'casablanca-airport-transfer' },
        { id: 'RBA', label: isAr ? 'الرباط' : 'Rabat', code: 'RBA', slug: 'rabat-airport-transfer' },
        { id: 'TNG', label: isAr ? 'طنجة' : isEs ? 'Tánger' : 'Tangier', code: 'TNG', slug: 'tangier-airport-transfer' },
        { id: 'FEZ', label: isAr ? 'فاس' : isEs ? 'Fez' : isFr ? 'Fès' : 'Fes', code: 'FEZ', slug: 'fes-airport-transfer' },
        { id: 'AGA', label: isAr ? 'أكادير' : 'Agadir', code: 'AGA', slug: 'agadir-airport-transfer' },
        { id: 'ESU', label: isAr ? 'الصويرة' : isEs ? 'Esauira' : 'Essaouira', code: 'ESU', slug: 'marrakech-to-essaouira-transfer' }
    ];

    const activeTabInfo = tabs.find(t => t.id === activeTab) || tabs[0];
    const filteredRoutes = POPULAR_ROUTES.filter(r => r.airportCode === activeTab);

    const handleSelectRoute = (route: RouteItem) => {
        const event = new CustomEvent('prefill-transfer-route', {
            detail: {
                pickup: route.pickup,
                dropoff: route.dropoff
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <section className={`${styles.sectionAlt} ${styles.firstSectionAfterHero}`} id="routes">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                {/* Airport Segmented Filter Tabs */}
                <div className={styles.airportTabs} role="tablist" aria-label="Airport Filter">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`${styles.airportTabBtn} ${isActive ? styles.airportTabBtnActive : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.label}</span>
                                <span className={styles.airportTabBadge}>{tab.code}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Dedicated Spoke Page Link Banner for Active Hub */}
                <div className={styles.activeHubBanner}>
                    <div className={styles.activeHubBannerLeft}>
                        <Icon icon="solar:info-circle-bold" width="18" height="18" className={styles.activeHubBannerIcon} />
                        <span>
                            {isAr 
                                ? `هل تبحث عن دليل الوصول الشامل وتفاصيل أسعار تاكسي مطار ${activeTabInfo.label} (${activeTabInfo.code})؟` 
                                : isFr 
                                ? `Besoin d'instructions de prise en charge et tarifs taxi pour ${activeTabInfo.label} (${activeTabInfo.code}) ?`
                                : isEs
                                ? `¿Busca punto de encuentro en la terminal y precios de taxi en ${activeTabInfo.label} (${activeTabInfo.code})?`
                                : `Looking for terminal arrival instructions and complete taxi rates for ${activeTabInfo.label} (${activeTabInfo.code})?`}
                        </span>
                    </div>
                    <Link
                        href={`/${lang}/transfers/${activeTabInfo.slug}`}
                        className={styles.activeHubBannerLink}
                        title={`Dedicated ${activeTabInfo.label} Airport Guide`}
                    >
                        <span>
                            {isAr 
                                ? `دليل وأسعار مطار ${activeTabInfo.label}` 
                                : isFr 
                                ? `Guide dédié & tarifs ${activeTabInfo.label}` 
                                : isEs 
                                ? `Guía dedicada y tarifas de ${activeTabInfo.label}` 
                                : `View ${activeTabInfo.label} Transfer Guide`}
                        </span>
                        <Icon icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width="15" height="15" />
                    </Link>
                </div>

                {/* Clean List / Table Layout */}
                <div className={styles.routesList}>
                    {filteredRoutes.map((route) => (
                        <div
                            key={route.id}
                            className={styles.routeRowShell}
                            onClick={() => handleSelectRoute(route)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelectRoute(route);
                                }
                            }}
                            aria-label={`${route.title[lang] || route.title.en} - €${route.price}`}
                        >
                            <div className={styles.routeRowCore}>
                                {/* Airport IATA badge */}
                                <div className={styles.routeAirportBadge}>
                                    {route.badge}
                                </div>

                                {/* Title & quiet metadata */}
                                <div className={styles.routeDetails}>
                                    <h3 className={styles.routeTitle}>
                                        {route.title[lang] || route.title.en}
                                    </h3>
                                    <div className={styles.routeMetas}>
                                        <div className={styles.routeMetaItem}>
                                            <Icon icon="solar:clock-circle-bold" width="14" height="14" />
                                            <span>{route.duration}</span>
                                        </div>
                                        <div className={styles.routeMetaItem}>
                                            <Icon icon="solar:map-point-bold" width="14" height="14" />
                                            <span>{route.distance}</span>
                                        </div>
                                        <div className={styles.routeMetaItem}>
                                            <Icon icon="solar:tag-price-bold" width="14" height="14" />
                                            <span>{isAr ? 'سعر ثابت شامل' : isFr ? 'Tarif Fixe' : isEs ? 'Tarifa Fija' : 'Flat Fare'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Price Display */}
                                <div className={styles.routePriceSection}>
                                    <span className={styles.routePriceLabel}>{text.from}</span>
                                    <span className={styles.routePriceNumber}>€{route.price}</span>
                                </div>

                                {/* Action Button Group */}
                                <div className={styles.routeActionGroup}>
                                    <Link
                                        href={`/${lang}/transfers/${route.slug}`}
                                        className={styles.routeDetailsPageBtn}
                                        onClick={(e) => e.stopPropagation()}
                                        title={`${route.title[lang] || route.title.en} Details`}
                                    >
                                        <span>{isAr ? 'الدليل' : isFr ? 'Guide' : isEs ? 'Guía' : 'Guide'}</span>
                                        <Icon icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width="13" height="13" />
                                    </Link>
                                    <button
                                        type="button"
                                        className={styles.routeActionBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectRoute(route);
                                        }}
                                    >
                                        <span>{text.bookRoute}</span>
                                        <Icon icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width="15" height="15" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

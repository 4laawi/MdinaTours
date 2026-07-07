"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './TransfersHero.module.css';
import { Clock, Calendar, PencilSimple } from '@phosphor-icons/react';

const LOCATIONS = [
    "Rabat Airport",
    "Rabat City Center",
    "Casablanca Airport",
    "Casablanca City Center",
    "Tangier Airport",
    "Tangier City Center",
    "Marrakech Airport",
    "Marrakech City Center",
    "Chefchaouen",
    "Fes",
    "Essaouira"
];

type Prices = { [key: number]: number };

const buildRouteKey = (l1: string, l2: string) => [l1, l2].sort().join('-');

const routePrices: Record<string, Prices> = {};

const setPricing = (loc1: string, loc2: string, prices: Prices) => {
    routePrices[buildRouteKey(loc1, loc2)] = prices;
};

// Configure fixed pricing database (exact copy from Hero.tsx)
// Local transfers
setPricing("Rabat Airport", "Rabat City Center", { 3: 36, 4: 42, 5: 54, 7: 72 });
setPricing("Casablanca Airport", "Casablanca City Center", { 3: 48, 4: 54, 5: 66, 7: 84 });
setPricing("Tangier Airport", "Tangier City Center", { 3: 30, 4: 36, 5: 42, 7: 60 });
setPricing("Marrakech Airport", "Marrakech City Center", { 3: 24, 4: 30, 5: 36, 7: 54 });

// Intercity transfers
setPricing("Rabat City Center", "Casablanca City Center", { 3: 96, 4: 108, 5: 132, 7: 168 });
setPricing("Rabat City Center", "Casablanca Airport", { 3: 102, 4: 120, 5: 144, 7: 180 });
setPricing("Rabat Airport", "Casablanca City Center", { 3: 102, 4: 120, 5: 144, 7: 180 });
setPricing("Tangier City Center", "Rabat City Center", { 3: 180, 4: 210, 5: 240, 7: 336 });
setPricing("Tangier Airport", "Rabat City Center", { 3: 192, 4: 216, 5: 252, 7: 348 });
setPricing("Marrakech City Center", "Essaouira", { 3: 108, 4: 132, 5: 156, 7: 216 });
setPricing("Fes", "Chefchaouen", { 3: 144, 4: 168, 5: 192, 7: 264 });
setPricing("Casablanca City Center", "Marrakech City Center", { 3: 192, 4: 216, 5: 252, 7: 336 });

// Add connections to airports
setPricing("Casablanca Airport", "Marrakech City Center", { 3: 192, 4: 216, 5: 252, 7: 336 });
setPricing("Rabat City Center", "Chefchaouen", { 3: 168, 4: 192, 5: 216, 7: 300 });
setPricing("Casablanca City Center", "Fes", { 3: 216, 4: 240, 5: 276, 7: 360 });

interface TransfersHeroProps {
    title: string;
    subtitle?: string;
    bgImage: string;
    homeLabel?: string;
    homeLink?: string;
    currentLabel: string;
}

export default function TransfersHero({
    title,
    subtitle,
    bgImage,
    homeLabel = 'Home',
    homeLink = '/',
    currentLabel,
}: TransfersHeroProps) {
    const { t, language } = useLanguage();
    const today = new Date().toISOString().split('T')[0];
    const [pickup, setPickup] = useState(LOCATIONS[1]); // Rabat City Center
    const [dropoff, setDropoff] = useState(LOCATIONS[3]); // Casablanca City Center
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("12:00");
    const [passengers, setPassengers] = useState(4);
    const [searchResult, setSearchResult] = useState<{ price?: string, error?: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [preciseLocation, setPreciseLocation] = useState("");
    const [isEditingDateTime, setIsEditingDateTime] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            setIsEditingDateTime(false);
        }
        return () => document.body.classList.remove('modal-open');
    }, [isModalOpen]);

    const isAirport = (loc: string) => loc.toLowerCase().includes('airport');
    const showFlightField = isAirport(pickup) || isAirport(dropoff);

    const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const pickupRef = useRef<HTMLSelectElement>(null);
    const dropoffRef = useRef<HTMLSelectElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const handleFieldClick = (e: React.MouseEvent, ref: React.RefObject<HTMLSelectElement | HTMLInputElement | null>) => {
        const el = ref.current;
        if (!el) return;

        if (e.target === el && el.tagName === 'SELECT') {
            return;
        }

        const targetEl = el as HTMLElement & { showPicker?: () => void };
        if (targetEl.showPicker) {
            try {
                targetEl.showPicker();
            } catch {
                targetEl.focus();
            }
        } else {
            targetEl.focus();
        }
    };

    const handleSwap = () => {
        setPickup(dropoff);
        setDropoff(pickup);
        setSearchResult(null);
    };

    const handleSearch = () => {
        if (!pickup || !dropoff) {
            setSearchResult({ error: language === 'en' ? "Please select both locations." : "Veuillez sélectionner les deux lieux." });
            return;
        }
        if (pickup === dropoff) {
            setSearchResult({ error: language === 'en' ? "Pickup and Drop-off locations cannot be the same." : "Les lieux de départ et d'arrivée doivent être différents." });
            return;
        }
        
        setIsModalOpen(true);
        setSearchResult(null);
    };

    const currentPrice = (() => {
        const routeKey = buildRouteKey(pickup, dropoff);
        const route = routePrices[routeKey];
        if (route && route[passengers]) return route[passengers];
        const isLocal = pickup.includes("Airport") && dropoff.replace(" City Center", "") === pickup.replace(" Airport", "");
        const base = isLocal ? 42 : 144;
        const prices: { [key: number]: number } = { 3: base - 6, 4: base, 5: base + 24, 7: base + 60 };
        return prices[passengers];
    })();

    const getWhatsAppUrl = () => {
        let message = `Hello Mdina Tours,\nI would like to book a private transfer.\n\n`;
        message += `• ${t('contact_form_full_name')}: ${name}\n`;
        message += `• ${t('contact_form_phone')}: ${phone}\n`;
        message += `• ${t('precise_location')}: ${preciseLocation}\n`;
        if (showFlightField && flightNumber) {
            message += `• ${t('flight_number')}: ${flightNumber}\n`;
        }
        const combinedDate = date ? `${date} ${hour}` : 'Flexible';
        message += `\nDetails:\n• ${t('pickup')}: ${pickup}\n• ${t('dropoff')}: ${dropoff}\n• ${t('date')}: ${combinedDate}\n• ${t('num_passengers')}: ${passengers}\n• ${t('trip_price')}: ${currentPrice ? `${currentPrice}€` : 'Custom Quote Request'}`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(message)}`;
    };

    const getEmailUrl = () => {
        const subject = `Private Transfer Inquiry - ${name}`;
        let body = `Hello Mdina Tours,\n\nI would like to book the following private transfer:\n\n`;
        body += `${t('contact_form_full_name')}: ${name}\n`;
        body += `${t('contact_form_phone')}: ${phone}\n`;
        body += `${t('precise_location')}: ${preciseLocation}\n`;
        if (showFlightField && flightNumber) {
            body += `${t('flight_number')}: ${flightNumber}\n`;
        }
        const combinedDate = date ? `${date} ${hour}` : 'Flexible';
        body += `\nDetails:\n${t('pickup')}: ${pickup}\n${t('dropoff')}: ${dropoff}\n${t('date')}: ${combinedDate}\n${t('num_passengers')}: ${passengers}\n${t('trip_price')}: ${currentPrice ? `${currentPrice}€` : 'Custom Quote Request'}`;
        return `mailto:booking@mdinatours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section
            className={styles.banner}
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.contentWrapper}>
                        {/* Breadcrumbs */}
                        <div className={styles.breadcrumbWrapper}>
                            <ul className={styles.breadcrumbList}>
                                <li className={styles.breadcrumbItem}>
                                    <Link href={homeLink} className={styles.breadcrumbLink}>{homeLabel}</Link>
                                </li>
                                <li className={styles.breadcrumbItem}>
                                    <span className={styles.breadcrumbIcon}>
                                        <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
                                        </svg>
                                    </span>
                                    <span>{currentLabel}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Title & Subtitle */}
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                        {/* Search Widget */}
                        <div className={styles.searchWrapper}>
                            <div className={styles.searchWidget}>
                                <div className={styles.searchField} onClick={(e) => handleFieldClick(e, pickupRef)}>
                                    <div className={styles.iconWrapper}>📍</div>
                                    <div className={styles.fieldText}>
                                        <span className={styles.fieldLabel}>{t('pickup')}</span>
                                        <select
                                            ref={pickupRef}
                                            className={styles.nativeSelect}
                                            value={pickup}
                                            onChange={e => { setPickup(e.target.value); setSearchResult(null); }}
                                        >
                                            {LOCATIONS.map(loc => (
                                                <option key={`pickup-${loc}`} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button className={styles.swapBtn} onClick={handleSwap} type="button" aria-label="Swap locations" title="Swap locations">
                                    ⇄
                                </button>

                                <div className={styles.searchField} onClick={(e) => handleFieldClick(e, dropoffRef)}>
                                    <div className={styles.iconWrapper}>🏁</div>
                                    <div className={styles.fieldText}>
                                        <span className={styles.fieldLabel}>{t('dropoff')}</span>
                                        <select
                                            ref={dropoffRef}
                                            className={styles.nativeSelect}
                                            value={dropoff}
                                            onChange={e => { setDropoff(e.target.value); setSearchResult(null); }}
                                        >
                                            {LOCATIONS.map(loc => (
                                                <option key={`dropoff-${loc}`} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.searchField} onClick={(e) => handleFieldClick(e, dateRef)}>
                                    <div className={styles.iconWrapper}>📅</div>
                                    <div className={styles.fieldText}>
                                        <span className={styles.fieldLabel}>{t('date')}</span>
                                        <div className={styles.dateTimeInputGroup}>
                                            <input
                                                ref={dateRef}
                                                type="date"
                                                className={`${styles.nativeInput} ${!date ? styles.emptyDate : ''}`}
                                                value={date}
                                                min={today}
                                                onChange={e => setDate(e.target.value)}
                                                placeholder="dd/mm/yyyy"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.searchBtn} onClick={handleSearch}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="M21 21l-4.35-4.35"></path>
                                    </svg>
                                    {t('search')}
                                </button>
                            </div>

                            {searchResult && (
                                <div className={styles.resultContainer}>
                                    <p className={styles.errorText}>{searchResult.error}</p>
                                </div>
                            )}
                        </div>

                        {/* Minimalist Trustpilot rating */}
                        <a 
                            href="https://www.trustpilot.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.trustpilotMinimalist}
                        >
                            <div className={styles.trustpilotLogoRow}>
                                <svg viewBox="0 0 24 24" className={styles.trustpilotStarIcon} style={{ width: '22px', height: '22px' }}>
                                    <g>
                                        <path d="M12 17.964l5.214-1.321 2.179 6.714L12 17.964z" fill="#00e57a" />
                                        <path d="M24 9.286h-9.179L12 0.643 9.179 9.286H0l7.429 5.357-2.821 8.643 7.429-5.357 4.571-3.286L24 9.286z" fill="#00b67a" />
                                    </g>
                                </svg>
                                <span className={styles.trustpilotBrandText}>
                                    Trustpilot
                                </span>
                            </div>
                            <div className={styles.trustpilotStarsRow}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 96" className={styles.trustpilotFiveSquareStars} aria-label="5 out of 5 stars">
                                    <g>
                                        <path d="M0 0h96v96H0zm104 0h96v96h-96zm104 0h96v96h-96zm104 0h96v96h-96zm104 0h96v96h-96z" fill="#00b67a" />
                                        <path d="M48 64.7 62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z" fill="#fff" />
                                    </g>
                                </svg>
                            </div>
                            <span className={styles.trustpilotScoreText}>
                                {language === 'en' ? "TrustScore 4.8 | 347 reviews" : "TrustScore 4.8 | 347 avis"}
                            </span>
                        </a>

                    </div>
                </div>
            </div>

            {/* Steps Booking Modal (exact duplicate from Hero.tsx layout) */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => { setIsModalOpen(false); setModalStep(1); }}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={() => { setIsModalOpen(false); setModalStep(1); }}>×</button>

                        <div className={styles.modalHeader}>
                            <div className={styles.modalBadge}>
                                {t('step_of').replace('%current%', modalStep.toString())}
                            </div>
                            <h2 className={styles.modalTitle}>
                                {modalStep === 1 ? t('trip_summary') : t('contact_details')}
                            </h2>
                        </div>

                        {modalStep === 1 ? (
                            <>
                                <div className={styles.selectionSummary}>
                                    <div className={styles.summaryItem}>
                                        <span className={styles.summaryLabel}>{t('pickup')}</span>
                                        <span className={styles.summaryValue}>{pickup}</span>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <span className={styles.summaryLabel}>{t('dropoff')}</span>
                                        <span className={styles.summaryValue}>{dropoff}</span>
                                    </div>
                                    <div className={styles.summaryItem}>
                                        <span className={styles.summaryLabel}>{t('date')}</span>
                                        {isEditingDateTime ? (
                                            <div className={styles.modalDateTimeInline}>
                                                <input
                                                    type="date"
                                                    className={styles.modalDateInputInline}
                                                    value={date}
                                                    min={today}
                                                    onChange={e => setDate(e.target.value)}
                                                />
                                                <div className={styles.modalHourSelectContainerInline}>
                                                    <Clock size={16} className={styles.clockIcon} />
                                                    <select
                                                        className={styles.modalHourSelectInline}
                                                        value={hour}
                                                        onChange={e => setHour(e.target.value)}
                                                    >
                                                        {HOURS.map(h => (
                                                            <option key={h} value={h}>{h}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className={styles.inlineSaveBtn}
                                                    onClick={() => setIsEditingDateTime(false)}
                                                >
                                                    ✓
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                className={styles.summaryValueClickable}
                                                onClick={() => setIsEditingDateTime(true)}
                                            >
                                                <Calendar size={18} className={styles.summaryIcon} />
                                                <span className={styles.dateTimeText}>
                                                    {date ? `${date} at ${hour}` : t('not_selected')}
                                                </span>
                                                <PencilSimple size={14} className={styles.editIcon} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.passengerSection}>
                                    <label className={styles.sectionLabel}>{t('select_passengers')}</label>
                                    <div className={styles.passengerGrid}>
                                        {[3, 4, 5, 7].map(num => (
                                            <button
                                                key={num}
                                                className={`${styles.passengerBtn} ${passengers === num ? styles.activePassenger : ''}`}
                                                onClick={() => setPassengers(num)}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalFooter}>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>{t('trip_price')}</span>
                                        <span className={styles.priceValue}>{currentPrice ? `${currentPrice}€` : 'Custom Quote'}</span>
                                    </div>
                                    <button className={styles.continueBtn} onClick={() => setModalStep(2)}>
                                        {t('continue')} →
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.contactForm}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>{t('contact_form_full_name')}</label>
                                        <input
                                            type="text"
                                            className={styles.modalInput}
                                            placeholder={t('enter_name')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>{t('contact_form_phone')}</label>
                                        <input
                                            type="tel"
                                            className={styles.modalInput}
                                            placeholder={t('enter_phone')}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>{t('precise_location')}</label>
                                        <input
                                            type="text"
                                            className={styles.modalInput}
                                            placeholder={t('enter_address')}
                                            value={preciseLocation}
                                            onChange={(e) => setPreciseLocation(e.target.value)}
                                        />
                                    </div>
                                    {showFlightField && (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>{t('flight_number')}</label>
                                            <input
                                                type="text"
                                                className={styles.modalInput}
                                                placeholder={t('enter_flight')}
                                                value={flightNumber}
                                                onChange={(e) => setFlightNumber(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.modalFooter}>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>{t('trip_price')}</span>
                                        <span className={styles.priceValue}>{currentPrice ? `${currentPrice}€` : 'Custom Quote'}</span>
                                    </div>

                                    <div className={styles.ctaGroup}>
                                        <div className={styles.whatsappContainer}>
                                            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>
                                                <span>{t('book_now')} via WhatsApp</span>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                                                </svg>
                                            </a>
                                            <span className={styles.whatsappSubtext}>{t('instant_confirmation')}</span>
                                        </div>

                                        <div className={styles.secondaryCtas}>
                                            <a href={getEmailUrl()} className={`${styles.secondaryCta} ${styles.emailCta}`}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                                Email
                                            </a>
                                            <a href="tel:+212766816992" className={`${styles.secondaryCta} ${styles.callCta}`}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                                Call
                                            </a>
                                        </div>
                                        <button className={styles.backBtn} onClick={() => setModalStep(1)}>
                                            ← {t('back')}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Bottom Shape Divider */}
            <div className={styles['custom-shape-divider-bottom-1782769203']}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                        d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z" 
                        className={styles['shape-fill']}
                    ></path>
                </svg>
            </div>
        </section>
    );
}

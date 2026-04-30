"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

const LOCATIONS = [
    "Tangier Airport",
    "Tangier City Center",
    "Hilton Houara",
    "Mnar Zone",
    "Tangier Med",
    "Tetouan",
    "Chefchaouen",
    "Rabat",
    "Casablanca",
    "Fes",
    "Marrakech"
];

type Prices = { [key: number]: number };

const BACKGROUND_IMAGES = [
    "/hero-marrakech.webp",
    "/hero-landscape-1.webp",
    "/hero-landscape-2.webp",
    "/hero-landscape-3.webp",
    "/hero-sahara.webp",
    "/hero-chefchaouen.webp"
];

const buildRouteKey = (l1: string, l2: string) => [l1, l2].sort().join('-');

const routePrices: Record<string, Prices> = {};

const setPricing = (loc1: string, loc2: string, prices: Prices) => {
    routePrices[buildRouteKey(loc1, loc2)] = prices;
};

// Local Tangier transfers
setPricing("Tangier Airport", "Tangier City Center", { 3: 27.5, 4: 28.75, 5: 32.5, 7: 81.25 });
setPricing("Tangier Airport", "Hilton Houara", { 3: 35, 4: 40, 5: 43.75, 7: 87.5 });
setPricing("Tangier Airport", "Mnar Zone", { 3: 33.75, 4: 41.25, 5: 50, 7: 100 });
setPricing("Tangier Med", "Tangier City Center", { 3: 93.75, 4: 100, 5: 150, 7: 225 });

// Intercity transfers (from Tangier to other destinations)
const longDistanceDestinations = [
    { dest: "Tetouan", prices: { 3: 100, 4: 125, 5: 150, 7: 250 } },
    { dest: "Chefchaouen", prices: { 3: 125, 4: 150, 5: 187.5, 7: 312.5 } },
    { dest: "Rabat", prices: { 3: 275, 4: 300, 5: 325, 7: 437.5 } },
    { dest: "Casablanca", prices: { 3: 375, 4: 400, 5: 425, 7: 500 } },
    { dest: "Fes", prices: { 3: 425, 4: 450, 5: 475, 7: 600 } },
    { dest: "Marrakech", prices: { 3: 625, 4: 650, 5: 725, 7: 775 } }
];

// Treat "Tangier" base prices identically for Airport and City Center
longDistanceDestinations.forEach(({ dest, prices }) => {
    setPricing("Tangier Airport", dest, prices);
    setPricing("Tangier City Center", dest, prices);
});

export default function Hero(props: { imageUrl?: string }) {
    const { t } = useLanguage();
    const today = new Date().toISOString().split('T')[0];
    const [pickup, setPickup] = useState(LOCATIONS[0]);
    const [dropoff, setDropoff] = useState(LOCATIONS[1]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("12:00");
    const [passengers, setPassengers] = useState(4);
    const [searchResult, setSearchResult] = useState<{ price?: number, error?: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [preciseLocation, setPreciseLocation] = useState("");

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isModalOpen]);

    const isAirport = (loc: string) => loc.toLowerCase().includes('airport') || loc.toLowerCase().includes('med');
    const showFlightField = isAirport(pickup) || isAirport(dropoff);

    // Use props.imageUrl as the first image if provided
    const displayImages = props.imageUrl
        ? [props.imageUrl, ...BACKGROUND_IMAGES.filter(img => img !== props.imageUrl)]
        : BACKGROUND_IMAGES;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 8500);
        return () => clearInterval(interval);
    }, [displayImages.length]);

    const prevImageIndex = (currentImageIndex - 1 + displayImages.length) % displayImages.length;
    const nextImageIndex = (currentImageIndex + 1) % displayImages.length;

    const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const pickupRef = useRef<HTMLSelectElement>(null);
    const dropoffRef = useRef<HTMLSelectElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const handleFieldClick = (e: React.MouseEvent, ref: React.RefObject<HTMLElement | null>) => {
        if (e.target === ref.current && ref.current?.tagName === 'SELECT') {
            return;
        }

        if (ref.current && 'showPicker' in ref.current) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref.current as any).showPicker();
            } catch {
                ref.current.focus();
            }
        } else if (ref.current) {
            ref.current.focus();
        }
    };

    const handleSwap = () => {
        setPickup(dropoff);
        setDropoff(pickup);
        setSearchResult(null);
    };

    const handleSearch = () => {
        if (!pickup || !dropoff) {
            setSearchResult({ error: "Please select both pickup and drop-off locations." });
            return;
        }
        if (pickup === dropoff) {
            setSearchResult({ error: "Pickup and Drop-off locations cannot be the same." });
            return;
        }
        const routeKey = buildRouteKey(pickup, dropoff);
        const route = routePrices[routeKey];

        if (route) {
            setIsModalOpen(true);
            setSearchResult(null);
        } else {
            setSearchResult({ error: "No transfer option available for this route." });
        }
    };

    const currentPrice = (() => {
        const routeKey = buildRouteKey(pickup, dropoff);
        const route = routePrices[routeKey];
        return route ? route[passengers] : null;
    })();

    const getWhatsAppUrl = () => {
        let message = `${t('book_whatsapp')}\n\n`;
        message += `• ${t('contact_form_full_name')}: ${name}\n`;
        message += `• ${t('contact_form_phone')}: ${phone}\n`;
        message += `• ${t('precise_location')}: ${preciseLocation}\n`;
        if (showFlightField && flightNumber) {
            message += `• ${t('flight_number')}: ${flightNumber}\n`;
        }
        const combinedDate = date ? `${date} ${hour}` : date;
        message += `\nDetails:\n• ${t('pickup')}: ${pickup}\n• ${t('dropoff')}: ${dropoff}\n• ${t('date')}: ${combinedDate}\n• ${t('num_passengers')}: ${passengers}\n• ${t('trip_price')}: ${currentPrice}€`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(message)}`;
    };

    const getEmailUrl = () => {
        const subject = `${t('booking_request')}: Private Transfer - ${name}`;
        let body = `${t('book_whatsapp')}\n\n`;
        body += `${t('contact_form_full_name')}: ${name}\n`;
        body += `${t('contact_form_phone')}: ${phone}\n`;
        body += `${t('precise_location')}: ${preciseLocation}\n`;
        if (showFlightField && flightNumber) {
            body += `${t('flight_number')}: ${flightNumber}\n`;
        }
        const combinedDate = date ? `${date} ${hour}` : date;
        body += `\nDetails:\n${t('pickup')}: ${pickup}\n${t('dropoff')}: ${dropoff}\n${t('date')}: ${combinedDate}\n${t('num_passengers')}: ${passengers}\n${t('trip_price')}: ${currentPrice}€`;
        return `mailto:booking@tiqalgs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="hero" className={styles.heroSection}>
            {displayImages.map((src, index) => {
                let statusClass = '';
                if (index === currentImageIndex) statusClass = styles.active;
                else if (index === prevImageIndex) statusClass = styles.prev;

                return (
                    <div key={src} className={`${styles.bgImageContainer} ${statusClass}`}>
                        <Image
                            src={src}
                            alt="ZahriTours Background"
                            fill
                            className={styles.heroBg}
                            priority={index === currentImageIndex || index === nextImageIndex}
                            sizes="100vw"
                        />
                    </div>
                );
            })}

            <div className={styles.overlay} />

            <div className={styles.contentContainer}>
                <div className={styles.mainContent}>
                    <div className={styles.textColumn}>
                        <div className={styles.badge}>{t('plan_trip')}</div>
                        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: t('hero_title').replace('Today', '<br />Today') }}>
                        </h1>
                        <p className={styles.subtitle}>
                            {t('hero_subtitle')}
                        </p>
                        <div className={styles.bookNowText}>
                            {t('book_driver')} <span className={styles.arrowIcon}>↓</span>
                        </div>
                    </div>
                </div>

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
                                        placeholder="dd/mm/yy"
                                    />
                                    <select
                                        className={styles.hourSelect}
                                        value={hour}
                                        onChange={e => setHour(e.target.value)}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {HOURS.map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
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

                <div className={styles.socialColumn}>
                    <a href="https://www.instagram.com/zahritours/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/zahritours/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/zahritours/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </a>
                    <div className={styles.scrollIndicator}>
                        <div className={styles.scrollLine}></div>
                        <span className={styles.scrollText}>{t('scroll')}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Curve */}
            <div className={styles.bottomCurve}>
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
                        fill="#fcf9f6"
                    ></path>
                </svg>
            </div>

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
                                        <span className={styles.summaryValue}>{date ? `${date} ${hour}` : t('not_selected')}</span>
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
                                        <span className={styles.priceValue}>{currentPrice}€</span>
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
                                        <span className={styles.priceValue}>{currentPrice}€</span>
                                    </div>

                                    <div className={styles.ctaGroup}>
                                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>
                                            <span>{t('book_now')} via WhatsApp</span>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                                            </svg>
                                        </a>

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
        </section>
    );
}

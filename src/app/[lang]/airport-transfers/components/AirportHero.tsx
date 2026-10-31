"use client";

import { useState, useRef, useEffect } from 'react';
import Image, { getImageProps } from 'next/image';
import ReactDOM from 'react-dom';
import { Locale } from '@/lib/airportTransfersData';
import { getRoutePrice } from '@/lib/transferLocations';
import LocationCombobox from '@/components/LocationCombobox';
import { useLanguage } from '@/context/LanguageContext';
import { trackLeadConversion } from '@/lib/tracking';
import { Clock, Calendar, PencilSimple } from '@phosphor-icons/react';
import { HERO_BACKGROUND_IMAGES } from '@/lib/heroImages';
import styles from '../AirportTransfers.module.css';
import heroStyles from '@/components/Hero.module.css';

export interface BookingState {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
    flightNumber: string;
    price: number | null;
}

interface AirportHeroProps {
    lang: Locale;
}

export default function AirportHero({ lang }: AirportHeroProps) {
    const { t, language } = useLanguage();
    const isAr = lang === 'ar';
    const isFr = lang === 'fr' || language === 'fr';
    const isEs = lang === 'es' || language === 'es';

    const today = new Date().toISOString().split('T')[0];

    // Background image rotation system matching homepage hero
    const [activeSlide, setActiveSlide] = useState(0);
    const [outgoingSlide, setOutgoingSlide] = useState<number | null>(null);
    const [nextSlide, setNextSlide] = useState(1);
    const [nextReady, setNextReady] = useState(false);

    const activeSlideRef = useRef(activeSlide);
    const nextSlideRef = useRef(nextSlide);
    const nextReadyRef = useRef(nextReady);

    useEffect(() => {
        activeSlideRef.current = activeSlide;
        nextSlideRef.current = nextSlide;
        nextReadyRef.current = nextReady;
    }, [activeSlide, nextSlide, nextReady]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let pollTimer: NodeJS.Timeout;
        let unmountTimer: NodeJS.Timeout;
        let isMounted = true;

        const triggerTransition = () => {
            const currentActive = activeSlideRef.current;
            const incoming = nextSlideRef.current;

            // 1. Move current active to outgoing (starts crossfade fade-out)
            setOutgoingSlide(currentActive);
            // 2. Set incoming as new active (fades in)
            setActiveSlide(incoming);
            // 3. Prepare next slide for eager background loading
            const following = (incoming + 1) % HERO_BACKGROUND_IMAGES.length;
            setNextSlide(following);
            setNextReady(false);

            // 4. After crossfade transition (1500ms), unmount outgoing slide
            unmountTimer = setTimeout(() => {
                if (!isMounted) return;
                setOutgoingSlide(null);
            }, 1500);
        };

        const scheduleNextCycle = () => {
            timer = setTimeout(() => {
                if (!isMounted) return;
                if (nextReadyRef.current) {
                    triggerTransition();
                    scheduleNextCycle();
                } else {
                    // Delay transition if next image is not ready yet
                    const waitForLoad = () => {
                        pollTimer = setTimeout(() => {
                            if (!isMounted) return;
                            if (nextReadyRef.current) {
                                triggerTransition();
                                scheduleNextCycle();
                            } else {
                                waitForLoad();
                            }
                        }, 300);
                    };
                    waitForLoad();
                }
            }, 8500);
        };

        scheduleNextCycle();

        return () => {
            isMounted = false;
            clearTimeout(timer);
            clearTimeout(pollTimer);
            clearTimeout(unmountTimer);
        };
    }, []);

    // State matching Homepage's proven booking system
    const [pickup, setPickup] = useState<string>("Casablanca Airport");
    const [dropoff, setDropoff] = useState<string>("Rabat");
    const [isCustomPickup, setIsCustomPickup] = useState(false);
    const [isCustomDropoff, setIsCustomDropoff] = useState(false);
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("12:00");
    const [passengers, setPassengers] = useState(3);
    const [searchResult, setSearchResult] = useState<{ price?: string; error?: string } | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [preciseLocation, setPreciseLocation] = useState("");
    const [isEditingDateTime, setIsEditingDateTime] = useState(false);

    const isAirport = (loc: string) => loc.toLowerCase().includes('airport');
    const showFlightField = isAirport(pickup) || isAirport(dropoff);
    const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    const dateRef = useRef<HTMLInputElement>(null);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalStep(1);
        setIsEditingDateTime(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isModalOpen]);

    const handleFieldClick = (e: React.MouseEvent, ref: React.RefObject<HTMLInputElement | null>) => {
        const el = ref.current;
        if (!el) return;

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
        const tempP = pickup;
        const tempCustomP = isCustomPickup;
        setPickup(dropoff);
        setIsCustomPickup(isCustomDropoff);
        setDropoff(tempP);
        setIsCustomDropoff(tempCustomP);
        setSearchResult(null);
    };

    // Listen to external prefill events from Popular Routes or Fleet sections
    useEffect(() => {
        const handlePrefillRoute = (e: CustomEvent<{ pickup: string; dropoff: string; passengers?: number }>) => {
            if (e.detail.pickup) {
                setPickup(e.detail.pickup);
                setIsCustomPickup(false);
            }
            if (e.detail.dropoff) {
                setDropoff(e.detail.dropoff);
                setIsCustomDropoff(false);
            }
            if (e.detail.passengers) setPassengers(e.detail.passengers);

            // Smooth scroll up to booking widget
            const widget = document.getElementById('hero-booking-widget');
            if (widget) {
                widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        window.addEventListener('prefill-transfer-route', handlePrefillRoute as EventListener);
        return () => window.removeEventListener('prefill-transfer-route', handlePrefillRoute as EventListener);
    }, []);

    const handleSearch = () => {
        if (!pickup.trim() || !dropoff.trim()) {
            setSearchResult({
                error: isEs
                    ? "Por favor, indique los lugares de recogida y destino."
                    : isFr
                    ? "Veuillez préciser les lieux de départ et d'arrivée."
                    : "Please enter both pickup and drop-off locations."
            });
            return;
        }
        if (pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
            setSearchResult({
                error: isEs
                    ? "El lugar de recogida y de destino no pueden ser iguales."
                    : isFr
                    ? "Les lieux de départ et d'arrivée doivent être différents."
                    : "Pickup and Drop-off locations cannot be the same."
            });
            return;
        }

        setIsModalOpen(true);
        setSearchResult(null);
    };

    const isCustomRoute = isCustomPickup || isCustomDropoff;
    const currentPrice = isCustomRoute ? null : getRoutePrice(pickup, dropoff, passengers);

    const getWhatsAppUrl = () => {
        const greeting = isEs
            ? `Hola Mdina Tours,\nMe gustaría solicitar un traslado de aeropuerto.\n\n`
            : isFr
            ? `Bonjour Mdina Tours,\nJe souhaite réserver un transfert aéroport privé.\n\n`
            : `Hello Mdina Tours,\nI would like to book a private airport transfer.\n\n`;
        let message = greeting;
        if (name.trim()) message += `• ${t('contact_form_full_name')}: ${name.trim()}\n`;
        if (phone.trim()) message += `• ${t('contact_form_phone')}: ${phone.trim()}\n`;
        if (preciseLocation.trim()) message += `• ${t('precise_location')}: ${preciseLocation.trim()}\n`;
        if (showFlightField && flightNumber.trim()) {
            message += `• ${t('flight_number')}: ${flightNumber.trim()}\n`;
        }
        const timeFormatted = isEs ? `a las ${hour}` : isFr ? `à ${hour}` : `at ${hour}`;
        const combinedDate = date ? `${date} ${timeFormatted}` : 'Flexible';
        const quoteLabel = isEs ? 'Solicitud de presupuesto a medida' : isFr ? 'Demande de devis sur-mesure' : 'Custom Quote Request';
        const detailsHeader = isEs ? 'Detalles' : isFr ? 'Détails' : 'Details';
        message += `\n${detailsHeader}:\n• ${t('pickup')}: ${pickup}\n• ${t('dropoff')}: ${dropoff}\n• ${t('date')}: ${combinedDate}\n• ${t('num_passengers')}: ${passengers}\n• ${t('trip_price')}: ${currentPrice ? `${currentPrice}€` : quoteLabel}`;
        return `https://wa.me/212724114775?text=${encodeURIComponent(message)}`;
    };

    const getEmailUrl = () => {
        const subject = isEs ? `Solicitud de Traslado de Aeropuerto - ${name || 'Cliente'}` : isFr ? `Demande de Transfert Aéroport - ${name || 'Client'}` : `Airport Transfer Inquiry - ${name || 'Customer'}`;
        const greeting = isEs
            ? `Hola Mdina Tours,\n\nMe gustaría solicitar el siguiente traslado de aeropuerto:\n\n`
            : isFr
            ? `Bonjour Mdina Tours,\n\nJe souhaite réserver le transfert aéroport suivant :\n\n`
            : `Hello Mdina Tours,\n\nI would like to book the following airport transfer:\n\n`;
        let body = greeting;
        if (name.trim()) body += `${t('contact_form_full_name')}: ${name.trim()}\n`;
        if (phone.trim()) body += `${t('contact_form_phone')}: ${phone.trim()}\n`;
        if (preciseLocation.trim()) body += `${t('precise_location')}: ${preciseLocation.trim()}\n`;
        if (showFlightField && flightNumber.trim()) {
            body += `${t('flight_number')}: ${flightNumber.trim()}\n`;
        }
        const timeFormatted = isEs ? `a las ${hour}` : isFr ? `à ${hour}` : `at ${hour}`;
        const combinedDate = date ? `${date} ${timeFormatted}` : 'Flexible';
        const quoteLabel = isEs ? 'Solicitud de presupuesto a medida' : isFr ? 'Demande de devis sur-mesure' : 'Custom Quote Request';
        const detailsHeader = isEs ? 'Detalles' : isFr ? 'Détails' : 'Details';
        body += `\n${detailsHeader}:\n${t('pickup')}: ${pickup}\n${t('dropoff')}: ${dropoff}\n${t('date')}: ${combinedDate}\n${t('num_passengers')}: ${passengers}\n${t('trip_price')}: ${currentPrice ? `${currentPrice}€` : quoteLabel}`;
        return `mailto:booking@mdinatours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    // Localized text tokens
    const text = {
        title: isAr 
            ? 'خدمات التوصيل من مطارات المغرب وسائق خاص معتمد' 
            : isFr 
            ? 'Transferts Aéroport au Maroc & Chauffeur Privé VIP' 
            : isEs 
            ? 'Traslados de Aeropuerto en Marruecos y Chófer Privado' 
            : 'Morocco Airport Transfers & Private Chauffeur Service',
        subtitle: isAr 
            ? 'توصيل خاص وموثوق من مطارات الدار البيضاء، مراكش، الرباط، طنجة وفاس. استقبال شخصي بالاسم، تتبع مباشر للرحلات وأسعار ثابتة مع الدفع عند الوصول.'
            : isFr 
            ? 'Transferts privés confortables à Casablanca, Marrakech, Rabat et Tanger. Accueil en terminal avec pancarte nominative, suivi des vols et paiement à l\'arrivée.'
            : isEs 
            ? 'Traslados privados en Casablanca, Marrakech, Rabat y Tánger. Recepción en terminal con cartel a su nombre, seguimiento de vuelos y pago directo a la llegada.'
            : 'Reliable private transfers across Casablanca, Marrakech, Rabat, Tangier, and Fes. Meet & greet inside arrivals, flight delay tracking, and fixed rates with payment on arrival.',
        trustMicrocopy: isAr
            ? 'بدون دفع مسبق · الدفع عند الوصول · بدون رسوم مخفية · بدون مفاجآت'
            : isFr
            ? "Aucun prépaiement · Paiement à l'arrivée · Aucun frais caché · Zéro surprise"
            : isEs
            ? 'Sin prepago · Pago a la llegada · Sin costes ocultos · Cero sorpresas'
            : 'No prepayment · Pay upon arrival · No hidden fees · Zero surprises'
    };

    const renderHeroImage = (desktopSrc: string, mobileSrc: string, isActive: boolean, isPriority: boolean) => {
        const commonProps = { alt: 'Mdina Tours Morocco Airport Transfers', fill: true, sizes: '100vw', priority: isPriority };
        const { props: { srcSet: desktopSrcSet, ...restDesktop } } = getImageProps({ ...commonProps, src: desktopSrc });
        const { props: { srcSet: mobileSrcSet, ...restMobile } } = getImageProps({ ...commonProps, src: mobileSrc });

        if (isPriority) {
            ReactDOM.preload(restDesktop.src as string, {
                as: 'image',
                imageSrcSet: desktopSrcSet,
                imageSizes: commonProps.sizes,
                fetchPriority: 'high',
                media: '(min-width: 769px)',
            });

            ReactDOM.preload(restMobile.src as string, {
                as: 'image',
                imageSrcSet: mobileSrcSet,
                imageSizes: commonProps.sizes,
                fetchPriority: 'high',
                media: '(max-width: 768px)',
            });
        }

        return (
            <picture>
                <source media="(min-width: 769px)" srcSet={desktopSrcSet} />
                <source media="(max-width: 768px)" srcSet={mobileSrcSet} />
                <img
                    {...restMobile}
                    className={heroStyles.heroBg}
                    fetchPriority={isPriority ? "high" : "auto"}
                    loading={isPriority ? "eager" : "lazy"}
                />
            </picture>
        );
    };

    return (
        <section className={styles.heroSection} id="hero-booking-widget">
            {/* 1. Active Slide */}
            <div key={`active-${activeSlide}-${HERO_BACKGROUND_IMAGES[activeSlide].desktop}`} className={`${heroStyles.bgImageContainer} ${heroStyles.active}`}>
                {renderHeroImage(HERO_BACKGROUND_IMAGES[activeSlide].desktop, HERO_BACKGROUND_IMAGES[activeSlide].mobile, true, activeSlide === 0)}
            </div>

            {/* 2. Outgoing Slide (during 1.5s crossfade) */}
            {outgoingSlide !== null && (
                <div key={`outgoing-${outgoingSlide}-${HERO_BACKGROUND_IMAGES[outgoingSlide].desktop}`} className={`${heroStyles.bgImageContainer} ${heroStyles.outgoing}`}>
                    {renderHeroImage(HERO_BACKGROUND_IMAGES[outgoingSlide].desktop, HERO_BACKGROUND_IMAGES[outgoingSlide].mobile, false, false)}
                </div>
            )}

            {/* 3. Next Slide (preloaded in background with opacity: 0) */}
            {nextSlide !== activeSlide && nextSlide !== outgoingSlide && (() => {
                const preloadDesktop = getImageProps({ src: HERO_BACKGROUND_IMAGES[nextSlide].desktop, alt: '', fill: true, sizes: '100vw' });
                const preloadMobile = getImageProps({ src: HERO_BACKGROUND_IMAGES[nextSlide].mobile, alt: '', fill: true, sizes: '100vw' });
                return (
                    <div key={`preload-${nextSlide}-${HERO_BACKGROUND_IMAGES[nextSlide].desktop}`} className={`${heroStyles.bgImageContainer} ${heroStyles.preload}`}>
                        <picture>
                            <source media="(min-width: 769px)" srcSet={preloadDesktop.props.srcSet} />
                            <source media="(max-width: 768px)" srcSet={preloadMobile.props.srcSet} />
                            <img
                                {...preloadMobile.props}
                                className={heroStyles.heroBg}
                                loading="lazy"
                                aria-hidden="true"
                                onLoad={() => setNextReady(true)}
                            />
                        </picture>
                    </div>
                );
            })()}

            <div className={heroStyles.overlay} />

            <div className={`${styles.container} ${styles.heroContent}`}>
                {/* Strong Promise H1 - Top badge removed as requested */}
                <h1 className={styles.heroTitle}>
                    {text.title}
                </h1>
                <p className={styles.heroSubtitle}>
                    {text.subtitle}
                </p>

                {/* Proven Homepage Search Widget */}
                <div className={heroStyles.searchWrapper} style={{ marginTop: '4px' }}>
                    <div className={heroStyles.searchWidget}>
                        <div className={heroStyles.searchField}>
                            <div className={heroStyles.iconWrapper}>📍</div>
                            <div className={heroStyles.fieldText}>
                                <span className={heroStyles.fieldLabel}>{t('pickup')}</span>
                                <LocationCombobox
                                    value={pickup}
                                    onChange={(val, isCustom) => {
                                        setPickup(val);
                                        setIsCustomPickup(!!isCustom);
                                        setSearchResult(null);
                                    }}
                                    language={language as 'en' | 'fr' | 'es'}
                                    placeholder={t('pickup')}
                                />
                            </div>
                        </div>

                        <button className={heroStyles.swapBtn} onClick={handleSwap} type="button" aria-label="Swap locations" title="Swap locations">
                            ⇄
                        </button>

                        <div className={heroStyles.searchField}>
                            <div className={heroStyles.iconWrapper}>🏁</div>
                            <div className={heroStyles.fieldText}>
                                <span className={heroStyles.fieldLabel}>{t('dropoff')}</span>
                                <LocationCombobox
                                    value={dropoff}
                                    onChange={(val, isCustom) => {
                                        setDropoff(val);
                                        setIsCustomDropoff(!!isCustom);
                                        setSearchResult(null);
                                    }}
                                    language={language as 'en' | 'fr' | 'es'}
                                    placeholder={t('dropoff')}
                                />
                            </div>
                        </div>

                        <div className={heroStyles.searchField} onClick={(e) => handleFieldClick(e, dateRef)}>
                            <div className={heroStyles.iconWrapper}>📅</div>
                            <div className={heroStyles.fieldText}>
                                <span className={heroStyles.fieldLabel}>{t('date')}</span>
                                <div className={heroStyles.dateTimeInputGroup}>
                                    <input
                                        ref={dateRef}
                                        type="date"
                                        className={`${heroStyles.nativeInput} ${!date ? heroStyles.emptyDate : ''}`}
                                        value={date}
                                        min={today}
                                        onChange={e => setDate(e.target.value)}
                                        placeholder="dd/mm/yyyy"
                                    />
                                </div>
                            </div>
                        </div>

                        <button className={heroStyles.searchBtn} onClick={handleSearch} type="button">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                            </svg>
                            {t('search')}
                        </button>
                    </div>

                    {searchResult && (
                        <div className={heroStyles.resultContainer}>
                            <p className={heroStyles.errorText}>{searchResult.error}</p>
                        </div>
                    )}

                    {/* Trust Microcopy - No emojis or icons */}
                    <p className={styles.heroTrustText}>
                        {text.trustMicrocopy}
                    </p>
                </div>
            </div>

            {/* SVG Bottom Curve Transition into White Section */}
            <div className={styles.heroBottomCurve} aria-hidden="true">
                <svg
                    viewBox="0 0 1440 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className={styles.curveSvg}
                >
                    <path
                        d="M0,64 C480,14 960,14 1440,64"
                        fill="none"
                        stroke="rgba(220, 131, 78, 0.35)"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M0,64 C480,14 960,14 1440,64 L1440,66 L0,66 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>

            {/* Proven 2-Step Booking Modal */}
            {isModalOpen && (
                <div className={heroStyles.modalOverlay} onClick={handleCloseModal}>
                    <div className={heroStyles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={heroStyles.closeModal} onClick={handleCloseModal} aria-label="Close modal">×</button>

                        <div className={heroStyles.modalHeader}>
                            <div className={heroStyles.modalBadge}>
                                {t('step_of').replace('%current%', modalStep.toString())}
                            </div>
                            <h2 className={heroStyles.modalTitle}>
                                {modalStep === 1 ? t('trip_summary') : t('contact_details')}
                            </h2>
                        </div>

                        {modalStep === 1 ? (
                            <>
                                <div className={heroStyles.selectionSummary}>
                                    <div className={heroStyles.summaryItem}>
                                        <span className={heroStyles.summaryLabel}>{t('pickup')}</span>
                                        <span className={heroStyles.summaryValue}>{pickup}</span>
                                    </div>
                                    <div className={heroStyles.summaryItem}>
                                        <span className={heroStyles.summaryLabel}>{t('dropoff')}</span>
                                        <span className={heroStyles.summaryValue}>{dropoff}</span>
                                    </div>
                                    <div className={heroStyles.summaryItem}>
                                        <span className={heroStyles.summaryLabel}>{t('date')}</span>
                                        {isEditingDateTime ? (
                                            <div className={heroStyles.modalDateTimeInline}>
                                                <input
                                                    type="date"
                                                    className={heroStyles.modalDateInputInline}
                                                    value={date}
                                                    min={today}
                                                    onChange={e => setDate(e.target.value)}
                                                />
                                                <div className={heroStyles.modalHourSelectContainerInline}>
                                                    <Clock size={16} className={heroStyles.clockIcon} />
                                                    <select
                                                        className={heroStyles.modalHourSelectInline}
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
                                                    className={heroStyles.inlineSaveBtn}
                                                    onClick={() => setIsEditingDateTime(false)}
                                                >
                                                    ✓
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                className={heroStyles.summaryValueClickable}
                                                onClick={() => setIsEditingDateTime(true)}
                                            >
                                                <Calendar size={18} className={heroStyles.summaryIcon} />
                                                <span className={heroStyles.dateTimeText}>
                                                    {date 
                                                        ? `${date} ${isEs ? `a las ${hour}` : isFr ? `à ${hour}` : `at ${hour}`}` 
                                                        : t('not_selected')}
                                                </span>
                                                <PencilSimple size={14} className={heroStyles.editIcon} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={heroStyles.passengerSection}>
                                    <label className={heroStyles.sectionLabel}>{t('select_passengers')}</label>
                                    <div className={heroStyles.passengerGrid}>
                                        {[3, 4, 5, 7].map(num => (
                                            <button
                                                key={num}
                                                type="button"
                                                className={`${heroStyles.passengerBtn} ${passengers === num ? heroStyles.activePassenger : ''}`}
                                                onClick={() => setPassengers(num)}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={heroStyles.modalFooter}>
                                    <div className={heroStyles.priceContainer}>
                                        <span className={heroStyles.priceLabel}>{t('trip_price')}</span>
                                        <span className={heroStyles.priceValue}>{currentPrice ? `${currentPrice}€` : (isEs ? 'Presupuesto a medida' : isFr ? 'Devis sur-mesure' : 'Custom Quote')}</span>
                                    </div>
                                    <button className={heroStyles.continueBtn} onClick={() => setModalStep(2)} type="button">
                                        {t('continue')} →
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={heroStyles.contactForm}>
                                    <div className={heroStyles.inputGroup}>
                                        <label className={heroStyles.inputLabel}>{t('contact_form_full_name')}</label>
                                        <input
                                            type="text"
                                            className={heroStyles.modalInput}
                                            placeholder={t('enter_name')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={heroStyles.inputGroup}>
                                        <label className={heroStyles.inputLabel}>{t('contact_form_phone')}</label>
                                        <input
                                            type="tel"
                                            className={heroStyles.modalInput}
                                            placeholder={t('enter_phone')}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className={heroStyles.inputGroup}>
                                        <label className={heroStyles.inputLabel}>{t('precise_location')}</label>
                                        <input
                                            type="text"
                                            className={heroStyles.modalInput}
                                            placeholder={t('enter_address')}
                                            value={preciseLocation}
                                            onChange={(e) => setPreciseLocation(e.target.value)}
                                        />
                                    </div>
                                    {showFlightField && (
                                        <div className={heroStyles.inputGroup}>
                                            <label className={heroStyles.inputLabel}>{t('flight_number')}</label>
                                            <input
                                                type="text"
                                                className={heroStyles.modalInput}
                                                placeholder={t('enter_flight')}
                                                value={flightNumber}
                                                onChange={(e) => setFlightNumber(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={heroStyles.modalFooter}>
                                    <div className={heroStyles.priceContainer}>
                                        <span className={heroStyles.priceLabel}>{t('trip_price')}</span>
                                        <span className={heroStyles.priceValue}>{currentPrice ? `${currentPrice}€` : (isEs ? 'Presupuesto a medida' : isFr ? 'Devis sur-mesure' : 'Custom Quote')}</span>
                                    </div>

                                    <div className={heroStyles.ctaGroup}>
                                        <div className={heroStyles.whatsappContainer}>
                                            <a 
                                                href={getWhatsAppUrl()} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className={heroStyles.primaryCta}
                                                onClick={() => trackLeadConversion('airport_transfers_hero_whatsapp', {
                                                    pickup,
                                                    dropoff,
                                                    passengers,
                                                    price: currentPrice
                                                })}
                                            >
                                                <span>{t('book_now')} via WhatsApp</span>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                                                </svg>
                                            </a>
                                            <span className={heroStyles.whatsappSubtext}>{t('instant_confirmation')}</span>
                                        </div>

                                        <div className={heroStyles.secondaryCtas}>
                                            <a 
                                                href={getEmailUrl()} 
                                                className={`${heroStyles.secondaryCta} ${heroStyles.emailCta}`}
                                                onClick={() => trackLeadConversion('airport_transfers_hero_modal_email', {
                                                    pickup,
                                                    dropoff,
                                                    passengers,
                                                    price: currentPrice
                                                })}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                                Email
                                            </a>
                                            <a 
                                                href="tel:+212724114775" 
                                                className={`${heroStyles.secondaryCta} ${heroStyles.callCta}`}
                                                onClick={() => trackLeadConversion('airport_transfers_hero_modal_call', {
                                                    pickup,
                                                    dropoff
                                                })}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                                {isEs ? 'Llamar' : isFr ? 'Appeler' : 'Call'}
                                            </a>
                                        </div>
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

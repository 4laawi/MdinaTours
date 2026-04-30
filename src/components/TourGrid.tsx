"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './TourGrid.module.css';

const TOUR_PRICING: Record<string, Record<string, number>> = {
    'Tangier City Tour (2h)': { '1–3': 72, '4–5': 102, '6–7': 132 },
    'Tangier City Tour (4h)': { '1–3': 108, '4–5': 132, '6–7': 156 },
    'Asilah Tour': { '1–3': 120, '4–5': 144, '6–7': 168 },
    'Tetouan Tour': { '1–3': 144, '4–5': 168, '6–7': 192 },
    'Chefchaouen Tour': { '1–3': 216, '4–5': 264, '6–7': 300 }
};

const PASSENGER_OPTIONS = ['1–3', '4–5', '6–7'];

export default function TourGrid() {
    const { language, t } = useLanguage();
    const today = new Date().toISOString().split('T')[0];
    const [isModalOpen, setIsModalOpen] = useState(false);
    interface Tour {
        id: number;
        title: string;
        originalTitle: string;
        duration: string;
        startingPrice: string;
        rating: number;
        reviews: number;
        description: string;
        image: string;
        includes: string[];
        isBestSeller?: boolean;
        isSecondary?: boolean;
    }

    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [bookingDate, setBookingDate] = useState("");
    const [passengerCount, setPassengerCount] = useState(PASSENGER_OPTIONS[0]);
    const [modalStep, setModalStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [tourLanguage, setTourLanguage] = useState("English");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isModalOpen]);

    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    const tours = [
        {
            id: 1,
            title: t('tour_1_title'),
            originalTitle: 'Tangier City Tour (2h)',
            duration: t('tour_1_duration'),
            startingPrice: '72',
            rating: 5.0,
            reviews: 124,
            description: t('tour_1_desc'),
            image: '/aerial-view-of-cityscape-tangier-surrounded-by-bui-2025-02-08-23-21-56-utc_5YO7dZ.webp',
            includes: ['Transport', 'Guide']
        },
        {
            id: 2,
            title: t('tour_2_title'),
            originalTitle: 'Tangier City Tour (4h)',
            duration: t('tour_2_duration'),
            startingPrice: '108',
            rating: 4.8,
            reviews: 92,
            description: t('tour_2_desc'),
            image: '/tangier-4h.webp',
            includes: ['Transport', 'Guide']
        },
        {
            id: 3,
            title: t('tour_3_title'),
            originalTitle: 'Asilah Tour',
            duration: t('tour_3_duration'),
            startingPrice: '120',
            rating: 5.0,
            reviews: 78,
            description: t('tour_3_desc'),
            image: '/Asilah.webp',
            includes: ['Transport', 'Guide']
        },
        {
            id: 4,
            title: t('tour_4_title'),
            originalTitle: 'Tetouan Tour',
            duration: t('tour_4_duration'),
            startingPrice: '144',
            rating: 4.7,
            reviews: 64,
            description: t('tour_4_desc'),
            image: '/tetouan.webp',
            includes: ['Transport', 'Guide']
        },
        {
            id: 5,
            title: t('tour_5_title'),
            originalTitle: 'Chefchaouen Tour',
            duration: t('tour_5_duration'),
            startingPrice: '216',
            rating: 5.0,
            reviews: 156,
            description: t('tour_5_desc'),
            image: '/clipboard-image-1774780537.png',
            isBestSeller: true,
            includes: ['Transport', 'Guide']
        },
        {
            id: 6,
            title: t('tour_6_title'),
            originalTitle: 'Custom Tour Reservation',
            duration: t('tour_6_duration'),
            startingPrice: t('contact_us_btn'),
            rating: 5.0,
            reviews: 42,
            description: t('tour_6_desc'),
            image: '/Travel-maroc.webp',
            isSecondary: true,
            includes: ['Transport', 'Guide', 'Custom']
        }
    ];

    const handleBookClick = (tour: typeof tours[0]) => {
        setSelectedTour(tour);
        setIsModalOpen(true);
        setPassengerCount(PASSENGER_OPTIONS[0]);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTour(null);
        setModalStep(1);
    };

    const currentPrice = selectedTour ? TOUR_PRICING[selectedTour.originalTitle]?.[passengerCount] : 0;

    const getWhatsAppUrl = () => {
        if (!selectedTour) return "";
        let message = `Hello ZahriTours,\nI would like to book the "${selectedTour.title}" tour.\n\n`;
        message += `• ${t('contact_form_full_name')}: ${name}\n`;
        message += `• ${t('contact_form_phone')}: ${phone}\n`;
        message += `• ${t('precise_location')}: ${address}\n`;
        message += `• ${t('tour_language')}: ${tourLanguage}\n`;
        if (notes) message += `• ${t('special_requirements')}: ${notes}\n`;
        message += `\nDetails:\n• ${t('date')}: ${bookingDate || t('not_selected')}\n• ${t('num_passengers')}: ${passengerCount}\n• ${t('trip_price')}: €${currentPrice}\n\nCan we confirm availability?`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(message)}`;
    };

    const getEmailUrl = () => {
        if (!selectedTour) return "";
        const subject = `${t('booking_request')}: ${selectedTour.title} - ${name}`;
        let body = `Hello ZahriTours,\n\nI would like to book the following tour:\n\n`;
        body += `Tour: ${selectedTour.title}\n`;
        body += `${t('contact_form_full_name')}: ${name}\n`;
        body += `${t('contact_form_phone')}: ${phone}\n`;
        body += `${t('precise_location')}: ${address}\n`;
        body += `${t('tour_language')}: ${tourLanguage}\n`;
        if (notes) body += `${t('special_requirements')}: ${notes}\n`;
        body += `\nDetails:\n${t('date')}: ${bookingDate || t('not_selected')}\n${t('num_passengers')}: ${passengerCount}\n${t('trip_price')}: €${currentPrice}\n\nCan you please confirm if this is available?`;
        return `mailto:booking@tiqalgs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="tours" className={styles.tourGridSection}>
            <div className="container">
                <div className={styles.intro}>
                    <div className={styles.subtitle}>{t('tour_subtitle')}</div>
                    <h2 className="section-title">{t('tour_title')}</h2>
                    <p className={styles.description}>
                        {t('tour_desc')}
                    </p>
                </div>

                <div className={styles.grid}>
                    {tours.map(tour => (
                        <div key={tour.id} className={`${styles.card} ${tour.isSecondary ? styles.secondaryCard : ''}`}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={tour.image}
                                    alt={tour.title}
                                    fill
                                    className={styles.tourImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {tour.isBestSeller && <span className={styles.bestSellerBadge}>{t('best_seller')}</span>}
                            </div>

                            <div className={styles.content}>
                                <div className={styles.infoBar}>
                                    <span className={styles.duration}>
                                        <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {tour.duration}
                                    </span>
                                    <div className={styles.ratingStars}>
                                        <span className={styles.star}>★</span>
                                        <span className={styles.ratingValue}>{tour.rating.toFixed(1)} ({tour.reviews})</span>
                                    </div>
                                </div>

                                <h3 className={styles.title}>{tour.title}</h3>

                                <p className={styles.tourDescription}>{tour.description}</p>

                                <div className={styles.includesRow}>
                                    {tour.includes.map((item, idx) => (
                                        <div key={idx} className={styles.includeItem}>
                                            {item === 'Transport' && (
                                                <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><circle cx="7" cy="18" r="2" /><path d="M9 18h4" /><circle cx="17" cy="18" r="2" /><path d="M19 18h2a1 1 0 0 0 1-1v-4.2a2 2 0 0 0-.25-1.1s-1.07-2-1.5-2.75A2 2 0 0 0 18.5 8H14" /><path d="M14 14h8" />
                                                </svg>
                                            )}
                                            {item === 'Guide' && (
                                                <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            )}

                                            {item === 'Custom' && (
                                                <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 3l1.91 5.89h6.19l-5.01 3.64 1.91 5.89-5.01-3.64-5.01 3.64 1.91-5.89-5.01-3.64h6.19z" />
                                                </svg>
                                            )}
                                            <span className={styles.itemLabel}>{t(`inc_${item.toLowerCase()}`)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.cardFooter}>
                                    <div className={styles.priceBlock}>
                                        <span className={styles.priceLabel}>{t('from')}</span>
                                        <span className={styles.priceValue}>
                                            {tour.startingPrice === t('contact_us_btn') ? t('contact_us_btn') : `€${tour.startingPrice}`}
                                        </span>
                                    </div>
                                    {tour.isSecondary ? (
                                        <Link href={getPath('/contact')} className={styles.contactIconBtn}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <button className={styles.bookBtn} onClick={() => handleBookClick(tour)}>
                                            {t('book_tour_btn')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedTour && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={closeModal}>×</button>

                        <div className={styles.modalHeader}>
                            <div className={styles.modalBadge}>
                                {t('step_of').replace('%current%', modalStep.toString())}
                            </div>
                            <h2 className={styles.modalTitle}>
                                {modalStep === 1 ? selectedTour.title : t('contact_details')}
                            </h2>
                            {modalStep === 1 && (
                                <p className={styles.tourShortDesc}>
                                    {selectedTour.description}
                                </p>
                            )}
                        </div>

                        {modalStep === 1 ? (
                            <>
                                <div className={styles.selectionSummary}>
                                    <div className={styles.summaryItem}>
                                        <span className={styles.summaryLabel}>{t('tour_1_duration').replace('2 hours', '').trim()}</span>
                                        <span className={styles.summaryValue}>{selectedTour.duration}</span>
                                    </div>
                                </div>

                                <div className={styles.bookingInputSection}>
                                    <label className={styles.sectionLabel}>{t('plan_tour_date')}</label>
                                    <input
                                        type="date"
                                        className={`${styles.dateInput} ${!bookingDate ? styles.emptyDate : ''}`}
                                        value={bookingDate}
                                        min={today}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        placeholder="dd/mm/yy"
                                    />
                                </div>

                                <div className={styles.passengerSection}>
                                    <label className={styles.sectionLabel}>{t('num_passengers')}</label>
                                    <div className={styles.passengerGrid}>
                                        {PASSENGER_OPTIONS.map(opt => (
                                            <button
                                                key={opt}
                                                className={`${styles.passengerBtn} ${passengerCount === opt ? styles.activePassenger : ''}`}
                                                onClick={() => setPassengerCount(opt)}
                                            >
                                                {opt} {t('passengers_label')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalFooter}>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>{t('estimated_price')}</span>
                                        <span className={styles.priceValue}>€{currentPrice}</span>
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
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>{t('tour_language')}</label>
                                        <select
                                            className={styles.modalSelect}
                                            value={tourLanguage}
                                            onChange={(e) => setTourLanguage(e.target.value)}
                                        >
                                            <option value="English">{t('lang_en')}</option>
                                            <option value="French">{t('lang_fr')}</option>
                                            <option value="Spanish">{t('lang_es')}</option>
                                            <option value="Arabic">{t('lang_ar')}</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>{t('special_requirements')}</label>
                                        <textarea
                                            className={styles.modalTextarea}
                                            placeholder={t('enter_requirements')}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalFooter}>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>{t('estimated_price')}</span>
                                        <span className={styles.priceValue}>€{currentPrice}</span>
                                    </div>

                                    <div className={styles.ctaGroup}>
                                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                                            </svg>
                                            {t('book_whatsapp')}
                                        </a>

                                        <div className={styles.secondaryCtas}>
                                            <a href={getEmailUrl()} className={styles.secondaryCta}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                                {t('email_us')}
                                            </a>
                                            <a href="tel:+212766816992" className={styles.secondaryCta}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                                {t('call_us')}
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

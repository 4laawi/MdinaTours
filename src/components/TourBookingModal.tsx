"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { TourData } from '@/lib/toursData';
import styles from './TourGrid.module.css';

const PASSENGER_OPTIONS = ['1–3', '4–5', '6–7'];

interface TourBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTour: TourData;
}

export default function TourBookingModal({ isOpen, onClose, selectedTour }: TourBookingModalProps) {
    const { language, t } = useLanguage();
    const isEn = language === 'en';
    const today = new Date().toISOString().split('T')[0];

    const [bookingDate, setBookingDate] = useState("");
    const [passengerCount, setPassengerCount] = useState(PASSENGER_OPTIONS[0]);
    const [modalStep, setModalStep] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [tourLanguage, setTourLanguage] = useState(isEn ? "English" : "French");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            // reset step when closing
            setModalStep(1);
        }
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen || !selectedTour) return null;

    const currentPrice = (() => {
        const base = selectedTour.price;
        if (passengerCount === '1–3') return base;
        if (passengerCount === '4–5') return Math.round(base * 1.25);
        if (passengerCount === '6–7') return Math.round(base * 1.5);
        return base;
    })();

    const getWhatsAppUrl = () => {
        const tourTitle = selectedTour[language].title;
        let message = `Hello Mdina Tours,\nI would like to book the "${tourTitle}" tour.\n\n`;
        message += `• ${t('contact_form_full_name')}: ${name}\n`;
        message += `• ${t('contact_form_phone')}: ${phone}\n`;
        message += `• ${t('precise_location')}: ${address}\n`;
        message += `• ${t('tour_language')}: ${tourLanguage}\n`;
        if (notes) message += `• ${t('special_requirements')}: ${notes}\n`;
        message += `\nDetails:\n• ${t('date')}: ${bookingDate || t('not_selected')}\n• ${t('num_passengers')}: ${passengerCount}\n• ${t('trip_price')}: €${currentPrice}\n\nCan we confirm availability?`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(message)}`;
    };

    const getEmailUrl = () => {
        const tourTitle = selectedTour[language].title;
        const subject = `Private Tour Booking Request: ${tourTitle} - ${name}`;
        let body = `Hello Mdina Tours,\n\nI would like to book the following private tour:\n\n`;
        body += `Tour: ${tourTitle}\n`;
        body += `${t('contact_form_full_name')}: ${name}\n`;
        body += `${t('contact_form_phone')}: ${phone}\n`;
        body += `${t('precise_location')}: ${address}\n`;
        body += `${t('tour_language')}: ${tourLanguage}\n`;
        if (notes) body += `${t('special_requirements')}: ${notes}\n`;
        body += `\nDetails:\n${t('date')}: ${bookingDate || t('not_selected')}\n${t('num_passengers')}: ${passengerCount}\n${t('trip_price')}: €${currentPrice}\n\nCan you please confirm if this is available?`;
        return `mailto:booking@mdinatours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={onClose}>×</button>

                <div className={styles.modalHeader}>
                    <div className={styles.modalBadge}>
                        {t('step_of').replace('%current%', modalStep.toString())}
                    </div>
                    <h2 className={styles.modalTitle}>
                        {modalStep === 1 ? selectedTour[language].title : t('contact_details')}
                    </h2>
                    {modalStep === 1 && (
                        <p className={styles.tourShortDesc}>
                            {selectedTour[language].excerpt}
                        </p>
                    )}
                </div>

                {modalStep === 1 ? (
                    <>
                        <div className={styles.selectionSummary}>
                            <div className={styles.summaryItem}>
                                <span className={styles.summaryLabel}>{isEn ? 'Duration' : 'Durée'}</span>
                                <span className={styles.summaryValue}>{selectedTour[language].duration}</span>
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
                                placeholder="dd/mm/yyyy"
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
    );
}

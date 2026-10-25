"use client";

import { useState } from 'react';
import { Locale } from '@/lib/airportTransfersData';
import { BookingState } from './AirportHero';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface BookingModalProps {
    lang: Locale;
    booking: BookingState;
    onClose: () => void;
}

export default function BookingModal({ lang, booking, onClose }: BookingModalProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [flightNo, setFlightNo] = useState(booking.flightNumber || '');
    const [address, setAddress] = useState('');

    const text = {
        title: isAr ? 'تأكيد حجز التوصيل' : isFr ? 'Confirmer votre transfert' : isEs ? 'Confirmar su traslado' : 'Confirm your transfer',
        subtitle: isAr ? 'دفع آمن عند الوصول · بدون تسبيق' : isFr ? 'Paiement sécurisé à l\'arrivée · Zéro acompte' : isEs ? 'Pago seguro a la llegada · Sin fianza' : 'Pay safely upon arrival · Zero advance deposit',
        routeLabel: isAr ? 'المسار:' : isFr ? 'Trajet :' : isEs ? 'Ruta:' : 'Route:',
        dateLabel: isAr ? 'الموعد:' : isFr ? 'Date & heure :' : isEs ? 'Fecha y hora:' : 'Date & time:',
        paxLabel: isAr ? 'المسافرون:' : isFr ? 'Passagers :' : isEs ? 'Pasajeros:' : 'Passengers:',
        priceLabel: isAr ? 'السعر الثابت الصافي:' : isFr ? 'Tarif ferme garanti :' : isEs ? 'Precio cerrado garantizado:' : 'Guaranteed fixed fare:',
        nameLabel: isAr ? 'الاسم الكامل' : isFr ? 'Nom complet' : isEs ? 'Nombre completo' : 'Full Name',
        phoneLabel: isAr ? 'رقم الهاتف / الواتساب' : isFr ? 'N° Téléphone / WhatsApp' : isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp',
        flightLabel: isAr ? 'رقم رحلة الطيران (لتتبع الموعد)' : isFr ? 'N° de vol (pour le suivi automatique)' : isEs ? 'Nº de vuelo (para seguimiento)' : 'Flight number (for live arrival tracking)',
        addressLabel: isAr ? 'اسم الفندق أو الرياض أو العنوان' : isFr ? 'Nom de l\'hôtel ou riad' : isEs ? 'Hotel, riad o dirección' : 'Hotel, riad name or address',
        whatsAppCta: isAr ? 'تأكيد الحجز فوراً عبر الواتساب' : isFr ? 'Confirmer directement sur WhatsApp' : isEs ? 'Confirmar al instante por WhatsApp' : 'Confirm instantly on WhatsApp',
        emailCta: isAr ? 'إرسال عبر الإيميل' : isFr ? 'Envoyer par Email' : isEs ? 'Enviar por Email' : 'Send via Email',
        closeAria: isAr ? 'إغلاق' : isFr ? 'Fermer' : isEs ? 'Cerrar' : 'Close'
    };

    const getWhatsAppUrl = () => {
        let msg = isAr 
            ? `السلام عليكم مدينة تورز، أود تأكيد حجز خدمة التوصيل:\n` 
            : isFr 
            ? `Bonjour Mdina Tours, je souhaite confirmer mon transfert aéroport :\n` 
            : isEs 
            ? `Hola Mdina Tours, deseo confirmar mi traslado de aeropuerto:\n` 
            : `Hello Mdina Tours, I would like to confirm my airport transfer:\n`;

        msg += `\n📍 ${booking.pickup} ➔ ${booking.dropoff}`;
        msg += `\n📅 ${booking.date} at ${booking.time}`;
        msg += `\n👥 ${booking.passengers} ${isAr ? 'ركاب' : 'PAX'}`;
        if (booking.price) msg += `\n💶 ${isAr ? 'السعر الثابت' : 'Fixed Price'}: €${booking.price}`;
        if (name.trim()) msg += `\n👤 ${isAr ? 'الاسم' : 'Name'}: ${name.trim()}`;
        if (phone.trim()) msg += `\n📱 ${isAr ? 'الهاتف' : 'Phone'}: ${phone.trim()}`;
        if (flightNo.trim()) msg += `\n✈️ ${isAr ? 'رحلة الطيران' : 'Flight'}: ${flightNo.trim()}`;
        if (address.trim()) msg += `\n🏨 ${isAr ? 'الوجهة/الرياض' : 'Drop-off address'}: ${address.trim()}`;

        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    const getEmailUrl = () => {
        const subject = `Airport Transfer Booking - ${name || 'Customer'}`;
        let body = `Hello Mdina Tours,\n\nI would like to confirm the following airport transfer:\n\n`;
        body += `Route: ${booking.pickup} to ${booking.dropoff}\n`;
        body += `Date: ${booking.date} at ${booking.time}\n`;
        body += `Passengers: ${booking.passengers}\n`;
        if (booking.price) body += `Price: €${booking.price}\n`;
        if (name.trim()) body += `Full Name: ${name.trim()}\n`;
        if (phone.trim()) body += `Phone / WhatsApp: ${phone.trim()}\n`;
        if (flightNo.trim()) body += `Flight Number: ${flightNo.trim()}\n`;
        if (address.trim()) body += `Hotel / Riad: ${address.trim()}\n`;

        return `mailto:booking@mdinatours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modalShell} onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className={styles.modalCloseBtn}
                    onClick={onClose}
                    aria-label={text.closeAria}
                >
                    <Icon icon="solar:close-circle-bold" width="22" height="22" />
                </button>

                <div className={styles.modalHeader}>
                    <h2 style={{ fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--ink-900)' }}>
                        {text.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
                        {text.subtitle}
                    </p>
                </div>

                {/* Summary Card */}
                <div className={styles.modalSummaryCard}>
                    <div className={styles.modalSummaryRow}>
                        <span style={{ color: '#64748B', fontWeight: 600 }}>{text.routeLabel}</span>
                        <strong style={{ color: 'var(--ink-900)' }}>{booking.pickup} ➔ {booking.dropoff}</strong>
                    </div>
                    <div className={styles.modalSummaryRow}>
                        <span style={{ color: '#64748B', fontWeight: 600 }}>{text.dateLabel}</span>
                        <span>{booking.date} · {booking.time}</span>
                    </div>
                    <div className={styles.modalSummaryRow}>
                        <span style={{ color: '#64748B', fontWeight: 600 }}>{text.paxLabel}</span>
                        <span>{booking.passengers} {isAr ? 'ركاب' : 'PAX'}</span>
                    </div>
                    <div className={styles.modalSummaryRow} style={{ paddingTop: '8px', borderTop: '1px solid var(--sand-200, #E2E8F0)' }}>
                        <span style={{ color: 'var(--ink-900)', fontWeight: 700 }}>{text.priceLabel}</span>
                        <span className={styles.modalPriceHero}>
                            {booking.price ? `€${booking.price}` : 'Quote on request'}
                        </span>
                    </div>
                </div>

                {/* Input Fields */}
                <div className={styles.modalInputGroup}>
                    <label className={styles.modalInputLabel}>{text.nameLabel}</label>
                    <input
                        type="text"
                        className={styles.modalInput}
                        placeholder={isAr ? "مثلاً: سارة محمد" : "e.g. Sarah Jenkins"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.modalInputGroup}>
                    <label className={styles.modalInputLabel}>{text.phoneLabel}</label>
                    <input
                        type="tel"
                        className={styles.modalInput}
                        placeholder="+33 6 ... / +44 7 ... / +212 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.modalInputGroup}>
                    <label className={styles.modalInputLabel}>{text.flightLabel}</label>
                    <input
                        type="text"
                        className={styles.modalInput}
                        placeholder="e.g. AT 801, RAM 204, FR 1234"
                        value={flightNo}
                        onChange={(e) => setFlightNo(e.target.value.toUpperCase())}
                    />
                </div>

                <div className={styles.modalInputGroup} style={{ marginBottom: '22px' }}>
                    <label className={styles.modalInputLabel}>{text.addressLabel}</label>
                    <input
                        type="text"
                        className={styles.modalInput}
                        placeholder={isAr ? "مثلاً: فندق أو رياض بالمدينة" : "e.g. Riad Kniza, Marrakech or Sofitel Rabat"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsAppBtn}
                        style={{ justifyContent: 'center', width: '100%', minHeight: '50px' }}
                    >
                        <Icon icon="ri:whatsapp-fill" width="22" height="22" />
                        <span>{text.whatsAppCta}</span>
                    </a>

                    <a
                        href={getEmailUrl()}
                        className={styles.secondaryCtaBtn}
                        style={{ justifyContent: 'center', width: '100%', color: 'var(--ink-900)', borderColor: '#CBD5E1', minHeight: '44px' }}
                    >
                        <Icon icon="solar:letter-bold" width="18" height="18" />
                        <span>{text.emailCta}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Locale } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface FinalCTASectionProps {
    lang: Locale;
}

export default function FinalCTASection({ lang }: FinalCTASectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        title: isAr ? 'جاهز لرحلة وصول مريحة وبلا أي عناء؟' : isFr ? 'Prêt pour une arrivée sereine au Maroc ?' : isEs ? '¿Listo para una llegada cómoda y sin estrés?' : 'Ready for a completely stress-free Morocco arrival?',
        subtitle: isAr 
            ? 'احجز وسيلة نقلك الخاصة الآن خلال ثوانٍ. بدون أي تسبيق مالي — والدفع بأمان عند الوصول نقداً أو بالبطاقة.'
            : isFr 
            ? 'Réservez votre chauffeur privé en quelques secondes. Sans acompte : paiement sécurisé à l\'arrivée.'
            : isEs 
            ? 'Reserve su chófer privado en segundos. Sin pago por adelantado: pague con total tranquilidad a su llegada.'
            : 'Book your private chauffeur transfer in seconds. Zero upfront deposit — pay safely upon arrival in cash or card.',
        checkFareBtn: isAr ? 'احسب السعر الثابت لرحلتك' : isFr ? 'Calculer mon tarif fixe' : isEs ? 'Calcular precio cerrado' : 'Check your fixed price',
        whatsAppBtn: isAr ? 'محادثة مباشرة عبر الواتساب' : isFr ? 'Échanger sur WhatsApp' : isEs ? 'Hablar por WhatsApp' : 'Chat on WhatsApp'
    };

    const getWhatsAppUrl = () => {
        const msg = isAr 
            ? "السلام عليكم مدينة تورز، أود الاستفسار عن حجز خدمة نقل من المطار." 
            : isFr 
            ? "Bonjour Mdina Tours, je souhaite réserver un transfert aéroport au Maroc." 
            : isEs 
            ? "Hola Mdina Tours, me gustaría solicitar un traslado privado desde el aeropuerto." 
            : "Hello Mdina Tours, I would like to book a private Morocco airport transfer.";
        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    const handleScrollToTop = () => {
        const widget = document.getElementById('hero-booking-widget');
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.finalCtaShell}>
                <h2 className={styles.finalCtaTitle}>{text.title}</h2>
                <p className={styles.finalCtaSubtitle}>{text.subtitle}</p>

                <div className={styles.finalCtaActions}>
                    <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={handleScrollToTop}
                    >
                        <span>{text.checkFareBtn}</span>
                        <span className={styles.buttonIconInner} aria-hidden="true">
                            <Icon icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"} width="18" height="18" />
                        </span>
                    </button>

                    <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsAppBtn}
                    >
                        <Icon icon="ri:whatsapp-fill" width="22" height="22" />
                        <span>{text.whatsAppBtn}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

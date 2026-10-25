"use client";

import { useState } from 'react';
import { Locale, FAQS } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface FAQSectionProps {
    lang: Locale;
}

export default function FAQSection({ lang }: FAQSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const [openIndices, setOpenIndices] = useState<number[]>([0]);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggle = (idx: number) => {
        setOpenIndices(prev => 
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const text = {
        eyebrow: isAr ? 'الأسئلة الشائعة' : isFr ? 'QUESTIONS FRÉQUENTES' : isEs ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED QUESTIONS',
        title: isAr ? 'الأسئلة الشائعة حول خدمات الاستقبال في مطارات المغرب' : isFr ? 'Questions fréquentes sur les transferts aéroport au Maroc' : isEs ? 'Preguntas frecuentes sobre traslados de aeropuerto en Marruecos' : 'Frequently Asked Questions: Morocco Airport Transfers',
        subtitle: isAr 
            ? 'إجابات واضحة ودقيقة عن أكثر الاستفسارات شيوعاً حول المواعيد، الدفع والوصول إلى الرياض.'
            : isFr 
            ? 'Réponses claires et concises sur le suivi des vols, les paiements et l\'accès aux riads.'
            : isEs 
            ? 'Respuestas claras sobre cancelaciones, seguimiento de vuelos y accesos a la medina.'
            : 'Direct, clear answers regarding flight tracking, riad luggage escort, and payment on arrival.',
        showAll: (count: number) => isAr ? `عرض جميع الأسئلة (${count})` : isFr ? `Voir toutes les questions (${count})` : isEs ? `Ver todas las preguntas (${count})` : `View all ${count} questions`,
        showLess: isAr ? 'عرض أقل' : isFr ? 'Réduire' : isEs ? 'Ver menos' : 'Show fewer'
    };

    return (
        <section className={styles.sectionLight} id="faq">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                <div className={styles.faqGrid}>
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndices.includes(idx);
                        const isHiddenOnMobile = !showAllFaqs && idx >= 4;

                        return (
                            <div
                                key={idx}
                                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''} ${isHiddenOnMobile ? styles.faqHiddenMobile : ''}`}
                            >
                                <button
                                    type="button"
                                    className={styles.faqQuestionBtn}
                                    onClick={() => toggle(idx)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.q[lang] || faq.q.en}</span>
                                    <span
                                        className={`${styles.hubToggleIcon} ${isOpen ? styles.hubToggleIconOpen : ''}`}
                                        aria-hidden="true"
                                    >
                                        <Icon icon="solar:alt-arrow-down-linear" width="18" height="18" />
                                    </span>
                                </button>

                                {isOpen && (
                                    <p className={styles.faqAnswerText}>
                                        {faq.a[lang] || faq.a.en}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile FAQ Toggle */}
                {FAQS.length > 4 && (
                    <div className={styles.faqToggleWrapper}>
                        <button
                            type="button"
                            className={styles.faqToggleBtn}
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                        >
                            <span>{showAllFaqs ? text.showLess : text.showAll(FAQS.length)}</span>
                            <Icon
                                icon={showAllFaqs ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
                                width="16"
                                height="16"
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

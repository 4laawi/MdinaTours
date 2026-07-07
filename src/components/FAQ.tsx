import { translations, Language } from '@/lib/translations';
import styles from './FAQ.module.css';
import Features from './Features';

export default function FAQ({ lang = 'en' }: { lang?: Language }) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const faqs = [
        {
            question: t('faq_1_q') || "How far in advance should I book a tour in Morocco?",
            answer: t('faq_1_a') || "We recommend booking at least 2-4 weeks in advance, especially during peak seasons (Spring and Autumn), to ensure the availability of our best drivers and guides."
        },
        {
            question: t('faq_2_q') || "What payment methods do you accept?",
            answer: t('faq_2_a') || "You can pay securely via credit card online, or pay your driver directly in cash (Euros or Dirhams) upon arrival. No upfront deposit is required for most day trips."
        },
        {
            question: t('faq_3_q') || "What is your cancellation policy?",
            answer: t('faq_3_a') || "We offer a flexible cancellation policy. You can cancel free of charge up to 48 hours before your scheduled tour or transfer."
        },
        {
            question: t('faq_4_q') || "Is Morocco safe for tourists?",
            answer: t('faq_4_a') || "Yes, Morocco is very safe for tourists, including solo and female travelers. Our private drivers and official guides ensure you have a secure, hassle-free experience."
        },
        {
            question: t('faq_5_q') || "What is the best time to visit Morocco?",
            answer: t('faq_5_a') || "The best times to visit are during Spring (March to May) and Autumn (September to November) when the weather is warm and pleasant across the country."
        },
        {
            question: t('faq_6_q') || "Do people speak English in Morocco?",
            answer: t('faq_6_a') || "While Arabic and French are the main languages, English is widely spoken in tourist areas. All our private drivers and guides speak fluent English."
        }
    ];

    return (
        <section className={styles.faqSection} id="faq">
            <Features lang={lang} />
            <div className="container">
                <div className={styles.intro}>
                    <div className="section-subtitle">{t('faq_subtitle')}</div>
                    <h2 className="section-title">{t('faq_title')}</h2>
                    <p className={styles.description}>
                        {t('faq_desc')}
                    </p>
                </div>

                <div className={styles.accordionGrid}>
                    <div className={styles.accordionColumn}>
                        {faqs.slice(0, 3).map((faq, index) => (
                            <details key={index} className={styles.accordionItem} name="homepage-faq">
                                <summary className={styles.accordionHeader}>
                                    <span className={styles.question}>{faq.question}</span>
                                    <div className={styles.iconWrapper}>
                                        <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </summary>
                                <div className={styles.accordionContent}>
                                    <div className={styles.answerInner}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className={styles.accordionColumn}>
                        {faqs.slice(3, 6).map((faq, index) => (
                            <details key={index + 3} className={styles.accordionItem} name="homepage-faq">
                                <summary className={styles.accordionHeader}>
                                    <span className={styles.question}>{faq.question}</span>
                                    <div className={styles.iconWrapper}>
                                        <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </summary>
                                <div className={styles.accordionContent}>
                                    <div className={styles.answerInner}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                <div className={styles.footerCta}>
                    <div className={styles.contactText}>
                        <h3 className={styles.footerCtaTitle}>{t('still_questions')}</h3>
                        <p>{t('still_questions_desc')}</p>
                    </div>
                    <a href="https://wa.me/212766816992" target="_blank" rel="noopener noreferrer" className="btn-primary">
                        <span>{t('get_in_touch_whatsapp')}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.925L0 24l6.103-1.594a11.832 11.832 0 005.94 1.592h.005c6.637 0 12.05-5.408 12.054-12.045a11.8 11.8 0 00-3.536-8.509" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './AirportTransfers.module.css';

export interface FAQItem {
    q: string;
    a: string;
}

interface AirportFAQAccordionProps {
    faqs: FAQItem[];
}

export default function AirportFAQAccordion({ faqs }: AirportFAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

    const toggle = (idx: number) => {
        setOpenIndex(prev => prev === idx ? null : idx);
    };

    return (
        <div className={styles.faqContainer}>
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div 
                        key={idx} 
                        className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                    >
                        <button 
                            type="button" 
                            className={styles.faqQuestionBtn} 
                            onClick={() => toggle(idx)}
                            aria-expanded={isOpen}
                        >
                            <span>{faq.q}</span>
                            <span 
                                className={`${styles.faqToggleIcon} ${isOpen ? styles.faqToggleIconOpen : ''}`} 
                                aria-hidden="true"
                            >
                                <Icon icon="solar:alt-arrow-down-linear" width="18" height="18" />
                            </span>
                        </button>
                        {isOpen && (
                            <p className={styles.faqAnswer}>
                                {faq.a}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

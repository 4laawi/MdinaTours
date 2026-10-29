import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '@/components/FAQ.module.css';

interface FAQItem {
    q: string;
    a: string;
}

interface TransferFAQProps {
    faqs?: FAQItem[];
    slug: string;
    isEn: boolean;
}

const getCleanCities = (slug: string) => {
    const cleanSlug = slug.replace(/-transfer$/, '');
    const mapping: { [key: string]: { from: string; to: string; fromFr: string; toFr: string } } = {
        "casablanca-airport": { from: "Casablanca CMN Airport", to: "Rabat", fromFr: "l'Aéroport de Casablanca (CMN)", toFr: "Rabat" },
        "rabat-airport": { from: "Rabat RBA Airport", to: "Rabat City Center", fromFr: "l'Aéroport de Rabat (RBA)", toFr: "Rabat Centre" },
        "tangier-to-rabat": { from: "Tangier", to: "Rabat", fromFr: "Tanger", toFr: "Rabat" },
        "rabat-to-casablanca": { from: "Rabat", to: "Casablanca", fromFr: "Rabat", toFr: "Casablanca" },
        "marrakech-to-essaouira": { from: "Marrakech", to: "Essaouira", fromFr: "Marrakech", toFr: "Essaouira" },
        "fes-to-chefchaouen": { from: "Fes", to: "Chefchaouen", fromFr: "Fès", toFr: "Chefchaouen" },
        "casablanca-to-marrakech": { from: "Casablanca", to: "Marrakech", fromFr: "Casablanca", toFr: "Marrakech" },
        "tangier-airport": { from: "Tangier TNG Airport", to: "Tangier City Center", fromFr: "l'Aéroport de Tanger (TNG)", toFr: "Tanger Centre" },
        "tangier-to-casablanca": { from: "Tangier", to: "Casablanca", fromFr: "Tanger", toFr: "Casablanca" },
        "tangier-to-chefchaouen": { from: "Tangier", to: "Chefchaouen", fromFr: "Tanger", toFr: "Chefchaouen" },
        "casablanca-to-fes": { from: "Casablanca", to: "Fes", fromFr: "Casablanca", toFr: "Fès" },
        "rabat-to-marrakech": { from: "Rabat", to: "Marrakech", fromFr: "Rabat", toFr: "Marrakech" },
        "rabat-to-fes": { from: "Rabat", to: "Fes", fromFr: "Rabat", toFr: "Fès" },
        "rabat-to-chefchaouen": { from: "Rabat", to: "Chefchaouen", fromFr: "Rabat", toFr: "Chefchaouen" },
        "marrakech-to-agadir": { from: "Marrakech", to: "Agadir", fromFr: "Marrakech", toFr: "Agadir" },
        "fes-to-merzouga": { from: "Fes", to: "Merzouga", fromFr: "Fès", toFr: "Merzouga" },
        "marrakech-airport": { from: "Marrakech RAK Airport", to: "Marrakech City Center", fromFr: "l'Aéroport de Marrakech (RAK)", toFr: "Marrakech Centre" },
        "fes-airport": { from: "Fes FEZ Airport", to: "Fes City Center", fromFr: "l'Aéroport de Fès (FEZ)", toFr: "Fès Centre" },
        "agadir-airport": { from: "Agadir AGA Airport", to: "Agadir City Center", fromFr: "l'Aéroport d'Agadir (AGA)", toFr: "Agadir Centre" },
        "tangier-port": { from: "Tangier Port", to: "Tangier City Center", fromFr: "le Port de Tanger", toFr: "Tanger Centre" },
    };
    return mapping[cleanSlug] || { from: "Origin", to: "Destination", fromFr: "Origine", toFr: "Destination" };
};

export default function TransferFAQ({ faqs, slug, isEn }: TransferFAQProps) {
    if (!faqs || faqs.length === 0) return null;

    const cities = getCleanCities(slug);
    
    const categoryLabel = isEn ? "Got Questions?" : "Des Questions ?";
    const sectionTitleText = isEn 
        ? `Questions & Answers about Traveling to ${cities.to}` 
        : `Questions & Réponses sur votre trajet vers ${cities.toFr}`;

    return (
        <div style={{
            fontFamily: "var(--font-poppins), sans-serif",
            color: 'var(--accent)',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto'
        }} className="transfer-faq-section">
            
            {/* FAQ Header Block */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {categoryLabel}
                </span>
                <h2 style={{ 
                    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                    fontWeight: 700, 
                    color: 'var(--secondary)', 
                    marginTop: '10px',
                    fontFamily: 'var(--font-poppins), sans-serif',
                }}>
                    {sectionTitleText}
                </h2>
            </div>
            
            {/* Native Accordion FAQ Items (Zero-JS for Googlebot & SEO) */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {faqs.map((faq, index) => (
                    <details 
                        key={index} 
                        className={styles.accordionItem}
                        open={index === 0}
                    >
                        <summary className={styles.accordionHeader}>
                            <span className={styles.question} style={{ color: 'var(--secondary)' }}>
                                {faq.q}
                            </span>
                            <div className={styles.iconWrapper}>
                                <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
                            </div>
                        </summary>
                        <div className={styles.accordionContent}>
                            <div className={styles.answerInner} style={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                <p style={{ margin: 0 }}>{faq.a}</p>
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}

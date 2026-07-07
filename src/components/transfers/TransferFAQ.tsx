"use client";

import { useState } from 'react';

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
    const mapping: { [key: string]: { from: string; to: string; fromFr: string; toFr: string } } = {
        "casablanca-airport-transfer": { from: "Casablanca CMN Airport", to: "Rabat", fromFr: "l'Aéroport de Casablanca (CMN)", toFr: "Rabat" },
        "rabat-airport-transfer": { from: "Rabat RBA Airport", to: "Rabat City Center", fromFr: "l'Aéroport de Rabat (RBA)", toFr: "Rabat Centre" },
        "tangier-to-rabat-transfer": { from: "Tangier", to: "Rabat", fromFr: "Tanger", toFr: "Rabat" },
        "rabat-to-casablanca-transfer": { from: "Rabat", to: "Casablanca", fromFr: "Rabat", toFr: "Casablanca" },
        "marrakech-to-essaouira-transfer": { from: "Marrakech", to: "Essaouira", fromFr: "Marrakech", toFr: "Essaouira" },
        "fes-to-chefchaouen-transfer": { from: "Fes", to: "Chefchaouen", fromFr: "Fès", toFr: "Chefchaouen" },
        "casablanca-to-marrakech-transfer": { from: "Casablanca", to: "Marrakech", fromFr: "Casablanca", toFr: "Marrakech" },
        "tangier-airport-transfer": { from: "Tangier TNG Airport", to: "Tangier City Center", fromFr: "l'Aéroport de Tanger (TNG)", toFr: "Tanger Centre" },
        "tangier-to-casablanca-transfer": { from: "Tangier", to: "Casablanca", fromFr: "Tanger", toFr: "Casablanca" },
        "tangier-to-chefchaouen-transfer": { from: "Tangier", to: "Chefchaouen", fromFr: "Tanger", toFr: "Chefchaouen" },
        "casablanca-to-fes-transfer": { from: "Casablanca", to: "Fes", fromFr: "Casablanca", toFr: "Fès" },
    };
    return mapping[slug] || { from: "Origin", to: "Destination", fromFr: "Origine", toFr: "Destination" };
};

export default function TransferFAQ({ faqs, slug, isEn }: TransferFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
            
            {/* FAQ Cards Accordion Grid */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index} style={{
                            backgroundColor: '#fff',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                            transition: 'all 0.2s ease'
                        }} className="faq-card-item">
                            <button
                                onClick={() => toggleFaq(index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    padding: '20px 25px',
                                    margin: 0,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    color: 'var(--secondary)',
                                    gap: '20px'
                                }}
                            >
                                <span style={{
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    lineHeight: 1.4,
                                    fontFamily: "var(--font-poppins), sans-serif",
                                    color: 'var(--secondary)'
                                }}>
                                    {faq.q}
                                </span>
                                <span style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 600,
                                    lineHeight: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    userSelect: 'none',
                                    transition: 'transform 0.2s ease',
                                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                                }}>
                                    +
                                </span>
                            </button>
                            
                            <div style={{
                                display: 'grid',
                                gridTemplateRows: isOpen ? '1fr' : '0fr',
                                transition: 'grid-template-rows 0.3s ease-out, opacity 0.3s ease',
                                opacity: isOpen ? 1 : 0
                            }}>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{
                                        padding: '0 25px 20px 25px',
                                        fontSize: '0.92rem',
                                        lineHeight: 1.6,
                                        color: '#555',
                                        fontWeight: 400,
                                        fontFamily: "'Inter', sans-serif"
                                    }}>
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

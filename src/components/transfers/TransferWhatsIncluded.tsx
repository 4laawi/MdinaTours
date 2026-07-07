"use client";

import React from 'react';
import { Signpost, Clock, Coffee, Armchair, ShieldCheck, ChatsCircle } from '@phosphor-icons/react';

interface TransferWhatsIncludedProps {
    language: 'en' | 'fr';
    local: any;
}

export default function TransferWhatsIncluded({ language, local }: TransferWhatsIncludedProps) {
    const isEn = language === 'en';

    const features = [
        {
            icon: <Signpost size={22} weight="duotone" />,
            title: isEn ? "Optimized Express Routes" : "Trajets Express Optimisés",
            desc: isEn ? "Travel via the safest, fastest toll-highways linking major hubs." : "Déplacement par autoroutes à péage, rapides et sécurisées."
        },
        {
            icon: <Clock size={22} weight="duotone" />,
            title: isEn ? "Flexible Departure Times" : "Horaires Flexibles",
            desc: isEn ? "Departs strictly at your checkout time or flight/cruise arrival." : "Départ calé sur l'arrivée de votre vol, train ou check-out."
        },
        {
            icon: <Coffee size={22} weight="duotone" />,
            title: isEn ? "On-Demand Refresh Stops" : "Arrêts Refresh à la Demande",
            desc: isEn ? "Request breaks at clean highway service stations for coffee." : "Faites une halte dans des aires de repos propres pour un café."
        },
        {
            icon: <Armchair size={22} weight="duotone" />,
            title: isEn ? "Premium Fleet Comfort" : "Grand Confort de Flotte",
            desc: isEn ? "Pristine, non-smoking, high-clearance minivans and sedans." : "Véhicules récents, non-fumeurs et parfaitement climatisés."
        },
        {
            icon: <ShieldCheck size={22} weight="duotone" />,
            title: isEn ? "Bilingual Local Drivers" : "Chauffeurs Bilingues",
            desc: isEn ? "Licensed, polite professionals speaking fluent English and French." : "Chauffeurs agréés bilingues (français/anglais) courtois."
        },
        {
            icon: <ChatsCircle size={22} weight="duotone" />,
            title: isEn ? "No Hidden Fees, Ever" : "Aucun Frais Caché",
            desc: isEn ? "All tolls, parking fees, and luggage handling are included." : "Les péages, parkings et bagages sont inclus dans le prix."
        }
    ];

    const includedItems = [
        isEn ? "Private, clean air-conditioned vehicle exclusively for your group" : "Véhicule privé propre et climatisé exclusivement pour votre groupe",
        isEn ? "All highway toll charges and fuel costs" : "Tous les frais de péage d'autoroute et de carburant",
        isEn ? "Live flight monitoring & free waiting time for delays" : "Suivi en direct des vols & temps d'attente gratuit en cas de retard",
        isEn ? "Professional English & French-speaking chauffeur" : "Chauffeur professionnel bilingue (français/anglais)",
        isEn ? "Door-to-door dropoff (directly to hotel lobby or nearest Medina gate)" : "Dépose porte-à-porte (devant votre hôtel ou à la porte de la Médina)",
        isEn ? "Complimentary luggage assistance" : "Assistance gratuite pour le chargement et déchargement des bagages",
        isEn ? "One baby seat or booster seat (available upon request)" : "Un siège bébé ou rehausseur (disponible gratuitement sur demande)"
    ];

    const excludedItems = [
        isEn ? "Grants or entrance tickets to tourist sights & monuments" : "Billets d'entrée dans les monuments et sites touristiques",
        isEn ? "Food, drinks, or main meals during rest stops" : "Repas, boissons ou collations lors des arrêts sur la route",
        isEn ? "Baggage porter service inside pedestrian-only Medina lanes" : "Porteurs de bagages dans les ruelles piétonnes de la Médina",
        isEn ? "Optional gratuities/tips for your driver" : "Pourboires facultatifs pour le chauffeur"
    ];

    return (
        <section style={{ 
            padding: '100px 20px', 
            backgroundColor: '#ffffff', 
            borderTop: 'none',
            borderBottom: '1px solid #f1f5f9'
        }} id="whats-included">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* Overview Text */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "Overview" : "Aperçu"}
                    </span>
                    <h2 style={{ 
                        fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontFamily: 'var(--font-poppins), sans-serif',
                    }}>
                        {isEn ? "What's Included in Your Private Transfer" : "Ce qui est inclus dans votre transfert privé"}
                    </h2>
                    <p style={{ 
                        fontSize: '1.1rem', 
                        color: '#555', 
                        lineHeight: 1.8, 
                        maxWidth: '850px',
                        margin: '0 auto',
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        {local.seoIntro || local.aboutRoute}
                    </p>
                </div>

                {/* Minimal Icon Feature Cards */}
                <div className="features-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '30px',
                    marginBottom: '80px'
                }}>
                    {features.map((feat, index) => (
                        <div key={index} className="feature-card" style={{
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            border: '1px solid #f1f5f9',
                            padding: '24px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <div className="feature-icon-container" style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                backgroundColor: 'var(--bg-color)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {feat.icon}
                            </div>
                            <h4 className="feature-title" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                {feat.title}
                            </h4>
                            <p className="feature-desc" style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Included vs Excluded side-by-side cards */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '30px' 
                }} className="included-excluded-grid-cards">
                    
                    {/* What's Covered */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #eef2f3',
                        borderTop: '4px solid #10b981',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 700, 
                            color: 'var(--secondary)', 
                            margin: 0, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#e6f7ed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            {isEn ? "What's Covered" : "Ce qui est inclus"}
                        </h3>
                        
                        <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem', color: '#334155' }}>
                            {includedItems.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '4px' }}>
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Not Included */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #eef2f3',
                        borderTop: '4px solid #ef4444',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 700, 
                            color: 'var(--secondary)', 
                            margin: 0, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#fdeded',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                            {isEn ? "Not Included" : "Non inclus"}
                        </h3>
                        
                        <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem', color: '#334155' }}>
                            {excludedItems.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '5px' }}>
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

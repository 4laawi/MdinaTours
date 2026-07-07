import React from 'react';

interface PrivateDriverInclusionsProps {
    lang: string;
}

export default function PrivateDriverInclusions({ lang }: PrivateDriverInclusionsProps) {
    const isEn = lang === 'en';

    const items = [
        isEn ? "Fixed price agreed upfront — no meter, no surprises" : "Tarif fixe convenu à l'avance — pas de compteur, pas de surprise",
        isEn ? "Flight tracking on all airport pickups" : "Suivi des vols sur toutes les prises en charge à l'aéroport",
        isEn ? "Driver contacts you 30 min before arrival" : "Le chauffeur vous contacte 30 min avant son arrivée",
        isEn ? "Bottled water and phone charger in every vehicle" : "Bouteille d'eau et chargeur de téléphone dans chaque véhicule",
        isEn ? "Free waiting time: 60 min for flights, 15 min for other pickups" : "Temps d'attente gratuit : 60 min pour les vols, 15 min pour les autres trajets",
        isEn ? "English and French-speaking drivers" : "Chauffeurs parlant français et anglais",
        isEn ? "Free cancellation up to 24 hours before your trip" : "Annulation gratuite jusqu'à 24 heures avant votre trajet"
    ];

    return (
        <section style={{ 
            padding: '80px 20px', 
            backgroundColor: '#ffffff', 
            borderTop: 'none',
            borderBottom: '1px solid #f1f5f9'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ 
                        fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        margin: 0,
                        fontFamily: 'var(--font-poppins), sans-serif',
                    }}>
                        {isEn ? "Every booking includes" : "Chaque réservation comprend"}
                    </h2>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '20px 40px',
                    marginBottom: '40px'
                }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            fontSize: '1rem', 
                            color: '#334155', 
                            lineHeight: 1.5,
                            alignItems: 'flex-start',
                            padding: '12px 16px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            border: '1px solid #f1f5f9'
                        }}>
                            <span style={{ 
                                color: '#10b981', 
                                fontWeight: 'bold', 
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}>✓</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ 
                        fontSize: '0.95rem', 
                        color: '#64748b', 
                        margin: 0,
                        fontWeight: 500,
                        fontStyle: 'italic'
                    }}>
                        {isEn 
                            ? "We never charge extra for luggage, tolls, or delayed flights." 
                            : "Nous ne facturons jamais de supplément pour les bagages, les péages ou les retards de vol."}
                    </p>
                </div>
            </div>
        </section>
    );
}


import React from 'react';

interface PrivateDriverInclusionsProps {
    lang: string;
}

export default function PrivateDriverInclusions({ lang }: PrivateDriverInclusionsProps) {
    const isEn = lang === 'en';

    const isEs = lang === 'es';

    const items = [
        isEn 
            ? "Fixed price agreed upfront — fuel, tolls, and operating expenses included" 
            : (isEs 
                ? "Precio cerrado por adelantado — combustible, peajes y gastos incluidos" 
                : "Tarif fixe convenu à l'avance — carburant, péages et frais inclus"),
        isEn 
            ? "Pay after each travel day (EUR, USD, MAD via cash or card)" 
            : (isEs 
                ? "Pago al final de cada jornada (EUR, USD, MAD en efectivo o tarjeta)" 
                : "Paiement en fin de journée (EUR, USD, MAD en espèces ou carte)"),
        isEn 
            ? "Flexible stops for photos, coffee, lunch, and comfort breaks" 
            : (isEs 
                ? "Paradas flexibles para fotos, café, almuerzo y descansos" 
                : "Arrêts libres pour photos, café, déjeuner et pauses confort"),
        isEn 
            ? "Nearest vehicle-accessible pickup & drop-off for medina riads" 
            : (isEs 
                ? "Acceso al punto más cercano para riads y alojamientos en medina" 
                : "Prise en charge au point le plus proche pour les riads en médina"),
        isEn 
            ? "Driver assistance with luggage at every stop" 
            : (isEs 
                ? "Asistencia del conductor con el equipaje en cada parada" 
                : "Aide du chauffeur avec vos bagages à chaque étape"),
        isEn 
            ? "Professional English and French-speaking drivers" 
            : (isEs 
                ? "Conductores profesionales con idiomas (inglés y francés)" 
                : "Chauffeurs professionnels parlant français et anglais"),
        isEn 
            ? "Licensed tour guides available on request for city monument visits" 
            : (isEs 
                ? "Guías oficiales disponibles bajo petición para visitas a monumentos" 
                : "Guides officiels disponibles sur demande pour les visites de monuments"),
        isEn 
            ? "Free cancellation up to 24 hours before your trip" 
            : (isEs 
                ? "Cancelación gratuita hasta 24 horas antes del viaje" 
                : "Annulation gratuite jusqu'à 24 heures avant le départ")
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
                        {isEn ? "What's included in your booking" : (isEs ? "Qué incluye su reserva" : "Ce qui est inclus dans votre réservation")}
                    </h2>
                </div>

                <div className="inclusions-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                    gap: '16px 30px',
                    marginBottom: '40px'
                }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            fontSize: '0.95rem', 
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
                            ? "Multi-day journeys include all driver accommodation and operating expenses in the agreed quote." 
                            : (isEs 
                                ? "Las rutas de varios días incluyen los gastos y alojamiento del conductor en el presupuesto acordado." 
                                : "Les circuits sur plusieurs jours incluent tous les frais et l'hébergement du chauffeur dans le tarif convenu.")}
                    </p>
                </div>
            </div>
        </section>
    );
}


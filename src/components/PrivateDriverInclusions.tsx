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
            ? "Free cancellation · 24+ hours' notice appreciated" 
            : (isEs 
                ? "Cancelación gratuita · Se agradece aviso con 24h+" 
                : "Annulation gratuite · Préavis de 24h+ apprécié")
    ];

    return (
        <section className="inclusions-section">
            <style>{`
                .inclusions-section {
                    padding: 70px 20px;
                    background-color: #ffffff;
                    border-top: none;
                    border-bottom: 1px solid #f1f5f9;
                }
                .inclusions-header {
                    text-align: center;
                    margin-bottom: 36px;
                }
                .inclusions-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 16px 24px;
                    margin-bottom: 36px;
                }
                .inclusion-card {
                    display: flex;
                    gap: 12px;
                    font-size: 0.95rem;
                    color: #334155;
                    line-height: 1.5;
                    align-items: flex-start;
                    padding: 12px 16px;
                    background-color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
                    border: 1px solid #f1f5f9;
                }
                .inclusion-check {
                    color: #10b981;
                    font-weight: bold;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                .inclusions-footnote {
                    text-align: center;
                    max-width: 720px;
                    margin: 0 auto;
                }
                .inclusions-footnote p {
                    font-size: 0.92rem;
                    color: #64748b;
                    margin: 0;
                    font-weight: 500;
                    line-height: 1.6;
                }
                @media (max-width: 768px) {
                    .inclusions-section {
                        padding: 36px 14px 30px 14px !important;
                    }
                    .inclusions-header {
                        margin-bottom: 18px !important;
                    }
                    .inclusions-grid {
                        grid-template-columns: 1fr !important;
                        gap: 8px !important;
                        margin-bottom: 18px !important;
                    }
                    .inclusion-card {
                        padding: 9px 12px !important;
                        font-size: 0.85rem !important;
                        gap: 8px !important;
                        border-radius: 10px !important;
                        line-height: 1.4 !important;
                    }
                    .inclusion-check {
                        font-size: 1rem !important;
                    }
                    .inclusions-footnote p {
                        font-size: 0.8rem !important;
                        line-height: 1.45 !important;
                    }
                }
            `}</style>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="inclusions-header">
                    <h2 style={{ 
                        fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        margin: 0,
                        fontFamily: 'var(--font-poppins), sans-serif',
                    }}>
                        {isEn ? "What's included in your booking" : (isEs ? "Qué incluye su reserva" : "Ce qui est inclus dans votre réservation")}
                    </h2>
                </div>

                <div className="inclusions-grid">
                    {items.map((item, idx) => (
                        <div key={idx} className="inclusion-card">
                            <span className="inclusion-check">✓</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="inclusions-footnote">
                    <p>
                        {isEn 
                            ? "Quoted transportation pricing includes fuel, highway tolls, parking, and driver operating/lodging expenses on multi-day journeys. Major route or itinerary changes requested during travel may affect the quote." 
                            : (isEs 
                                ? "Las tarifas acordadas incluyen combustible, peajes de autopista, aparcamientos y gastos de viaje/alojamiento del conductor en rutas de varios días. Modificaciones importantes de ruta solicitadas en destino pueden ajustar el presupuesto." 
                                : "Les tarifs convenus incluent le carburant, les péages, les parkings et les frais de route/hébergement du chauffeur sur plusieurs jours. Des modifications majeures d'itinéraire en cours de voyage peuvent faire l'objet d'un ajustement.")}
                    </p>
                </div>
            </div>
        </section>
    );
}


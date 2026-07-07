"use client";

import React from 'react';

interface TransferReviewsProps {
    language: 'en' | 'fr';
}

export default function TransferReviews({ language }: TransferReviewsProps) {
    const isEn = language === 'en';

    const reviews = [
        {
            quote: isEn 
                ? "Our transfer from Casablanca Airport to Rabat was outstanding. The driver was waiting with a sign, helped with luggage, and the Mercedes Vito was pristine. Worth every euro."
                : "Notre transfert depuis l'aéroport s'est déroulé à la perfection. Le chauffeur nous attendait avec un panneau, nous a aidés pour les bagages, et le van était impeccable. Service au top.",
            author: "Joan K.",
            flag: "🇺🇸",
            country: isEn ? "United States" : "États-Unis"
        },
        {
            quote: isEn
                ? "Excellent service. My flight was delayed by 2 hours, but they monitored it and the chauffeur was there waiting. Safe driving on the highway and very polite. A++"
                : "Excellent service. Mon vol avait plus de 2 heures de retard, mais ils ont suivi le vol en temps réel et le chauffeur était là à m'attendre. Conduite sereine.",
            author: "Marc P.",
            flag: "🇨🇦",
            country: isEn ? "Canada" : "Canada"
        },
        {
            quote: isEn
                ? "Mdina Tours is the only service we use in Morocco now. Clean cars, professional English speaking drivers, and easy booking via WhatsApp. Very high quality."
                : "Mdina Tours est désormais le seul service que nous utilisons au Maroc. Voitures très propres, chauffeurs professionnels polis et réservation très rapide par WhatsApp.",
            author: "Elizabeth B.",
            flag: "🇬🇧",
            country: isEn ? "United Kingdom" : "Royaume-Uni"
        },
        {
            quote: isEn
                ? "Smooth transfer from Tangier to Chefchaouen. The driver was highly experienced on the winding mountain roads and drove very safely. Highly recommended!"
                : "Transfert impeccable de Tanger à Chefchaouen. Chauffeur très expérimenté sur les routes sinueuses du Rif et conduite très prudente. Je recommande vivement !",
            author: "David L.",
            flag: "🇫🇷",
            country: isEn ? "France" : "France"
        },
        {
            quote: isEn
                ? "We booked a transfer from Marrakech to Essaouira. Our driver was extremely friendly, letting us stop along the road to see the famous tree-climbing goats."
                : "Superbe trajet entre Marrakech et Essaouira. Notre chauffeur était adorable et nous a proposé de s'arrêter pour prendre en photo les chèvres sur les arganiers.",
            author: "Sarah M.",
            flag: "🇩🇪",
            country: isEn ? "Germany" : "Allemagne"
        },
        {
            quote: isEn
                ? "Stress-free airport pickup. Fixed price as quoted online, no extra baggage charges. Driver was professional and vehicle was spacious."
                : "Prise en charge à l'aéroport sans aucun stress. Prix fixe convenu à l'avance, pas de frais de bagages. Chauffeur courtois et van confortable.",
            author: "Pierre G.",
            flag: "🇧🇪",
            country: isEn ? "Belgium" : "Belgique"
        }
    ];

    return (
        <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }} id="testimonials">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="testimonials-section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "Testimonials" : "Témoignages"}
                    </span>
                    <h2 className="testimonials-section-title" style={{ 
                        fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '10px', 
                        marginBottom: '8px', 
                        fontFamily: 'var(--font-poppins), sans-serif' 
                    }}>
                        {isEn ? "What travelers say" : "Ce que disent nos voyageurs"}
                    </h2>
                    <p className="testimonials-section-rating-text" style={{ color: '#666', fontSize: '1rem', marginTop: '5px' }}>
                        {isEn ? "4.9★ average across 120+ route bookings" : "Moyenne de 4,9★ sur plus de 120 réservations de transferts"}
                    </p>
                </div>

                <div className="testimonials-carousel-container">
                    <div className="testimonials-marquee-track">
                        {/* First set */}
                        {reviews.map((rev, idx) => (
                            <div key={`rev-1-${idx}`} className="testimonial-high-contrast-card testimonial-marquee-card">
                                <div>
                                    <div className="testimonial-stars-container">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                    <p className="testimonial-quote-text">
                                        &ldquo;{rev.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="testimonial-author-container">
                                    <span className="testimonial-author-name">{rev.author}</span>
                                    <span className="testimonial-author-country" title={rev.country}>
                                        {rev.flag}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate set for loop */}
                        {reviews.map((rev, idx) => (
                            <div key={`rev-2-${idx}`} className="testimonial-high-contrast-card testimonial-marquee-card" aria-hidden="true">
                                <div>
                                    <div className="testimonial-stars-container">
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                    <p className="testimonial-quote-text">
                                        &ldquo;{rev.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="testimonial-author-container">
                                    <span className="testimonial-author-name">{rev.author}</span>
                                    <span className="testimonial-author-country" title={rev.country}>
                                        {rev.flag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Badges / Accreditations */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginTop: '60px', flexWrap: 'wrap', opacity: 0.8 }}>
                    <img src="/img2/trustpilot-logo.webp" alt="Trustpilot" style={{ height: '35px', objectFit: 'contain' }} />
                    <img src="/img2/TripAdvisor_Logo.svg" alt="TripAdvisor" style={{ height: '35px', objectFit: 'contain' }} />
                </div>
            </div>
        </section>
    );
}

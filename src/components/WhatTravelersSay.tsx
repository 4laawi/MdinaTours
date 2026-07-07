import React from 'react';

interface Review {
    quote: React.ReactNode;
    author: string;
    flag: string;
}

interface WhatTravelersSayProps {
    lang: string;
    backgroundColor?: string;
}

export default function WhatTravelersSay({ lang, backgroundColor = '#fff' }: WhatTravelersSayProps) {
    const isEn = lang === 'en';

    const reviews: Review[] = [
        {
            quote: isEn ? (
                <>Our driver was waiting at arrivals with a sign before we even cleared customs. Spotless car, cold water, and he knew every shortcut in Casablanca. <strong style={{ fontWeight: 800 }}>Absolutely seamless.</strong></>
            ) : (
                <>Notre chauffeur nous attendait aux arrivées avec une pancarte avant même notre passage en douane. Voiture impeccable, eau fraîche et il connaissait tous les raccourcis à Casablanca. <strong style={{ fontWeight: 800 }}>Absolument parfait.</strong></>
            ),
            author: "Sophie R.",
            flag: "🇫🇷"
        },
        {
            quote: isEn ? (
                <>Flight was delayed by 2 hours. I messaged on WhatsApp and they just said &apos;no problem, we&apos;re tracking your flight.&apos; No extra charge. <strong style={{ fontWeight: 800 }}>That kind of service is rare anywhere.</strong></>
            ) : (
                <>Vol retardé de 2 heures. J&apos;ai envoyé un message sur WhatsApp et ils ont simplement répondu &apos;pas de problème, nous suivons votre vol.&apos; Sans frais supplémentaires. <strong style={{ fontWeight: 800 }}>Ce genre de service est rare.</strong></>
            ),
            author: "James K.",
            flag: "🇬🇧"
        },
        {
            quote: isEn ? (
                <>Booked a full-day tour to Chefchaouen for 4 people. The driver was a <strong style={{ fontWeight: 800 }}>genuine local expert</strong> — not just a driver. Best day of our trip.</>
            ) : (
                <>Réservation d&apos;une excursion d&apos;une journée à Chefchaouen pour 4 personnes. Le chauffeur était un <strong style={{ fontWeight: 800 }}>véritable expert local</strong> — pas seulement un conducteur. Le meilleur jour de notre voyage.</>
            ),
            author: "Laila M.",
            flag: "🇩🇪"
        },
        {
            quote: isEn ? (
                <>We used the dispo service for 3 days in Marrakech and Rabat for our business meetings. <strong style={{ fontWeight: 800 }}>Impeccable timing</strong>, extremely professional driver who helped us coordinate schedules, and a pristine Mercedes Vito.</>
            ) : (
                <>Nous avons utilisé le service dispo pendant 3 jours à Marrakech et Rabat pour nos réunions d&apos;affaires. <strong style={{ fontWeight: 800 }}>Timing impeccable</strong>, chauffeur extrêmement professionnel et van Mercedes Vito impeccable.</>
            ),
            author: "David W.",
            flag: "🇺🇸"
        },
        {
            quote: isEn ? (
                <>Perfect service from start to finish! Our driver took us to the Atlas Mountains and back. He was polite, attentive, and <strong style={{ fontWeight: 800 }}>drove very safely</strong>. The luxury SUV was clean and spacious.</>
            ) : (
                <>Service parfait de bout en bout ! Notre chauffeur nous a conduits dans les montagnes de l&apos;Atlas. Poli, attentionné et <strong style={{ fontWeight: 800 }}>conduite très sûre</strong>. Le SUV de luxe était propre et spacieux.</>
            ),
            author: "Elena P.",
            flag: "🇪🇸"
        },
        {
            quote: isEn ? (
                <>Having a driver on standby made our family vacation <strong style={{ fontWeight: 800 }}>so relaxing</strong>. No waiting for taxis, no getting lost. Our driver was incredibly patient with the kids.</>
            ) : (
                <>Avoir un chauffeur à disposition a rendu nos vacances en famille <strong style={{ fontWeight: 800 }}>tellement reposantes</strong>. Pas d&apos;attente pour les taxis, pas de risque de se perdre. Chauffeur très patient.</>
            ),
            author: "Marc-Antoine L.",
            flag: "🇨🇦"
        }
    ];

    return (
        <section style={{ 
            padding: '80px 20px', 
            backgroundColor, 
            borderTop: 'none',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="testimonials-section-header">
                    <h2 className="testimonials-section-title" style={{ fontSize: '2.1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px', fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {isEn ? "What travelers say" : "Ce que disent nos voyageurs"}
                    </h2>
                    <p className="testimonials-section-rating-text" style={{ color: '#666', fontSize: '1rem', marginTop: '5px' }}>
                        {isEn ? "4.9★ average across 120+ bookings" : "Moyenne de 4,9★ sur plus de 120 réservations"}
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
                                    <span className="testimonial-author-country">
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
                                    <span className="testimonial-author-country">
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

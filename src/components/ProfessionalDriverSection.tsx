'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, ChatCircleText, Suitcase, NavigationArrow } from '@phosphor-icons/react';

interface ProfessionalDriverSectionProps {
    lang: string;
    backgroundColor?: string;
}

export default function ProfessionalDriverSection({
    lang,
    backgroundColor = 'var(--bg-color)'
}: ProfessionalDriverSectionProps) {
    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const content = {
        eyebrow: isEn
            ? "Dedicated Local Chauffeurs"
            : (isEs ? "Chóferes Locales Dedicados" : "Chauffeurs Locaux Dédiés"),
        title: isEn
            ? "Your Dedicated Professional Driver in Morocco"
            : (isEs ? "Su Conductor Privado Profesional en Marruecos" : "Votre Chauffeur Privé Professionnel au Maroc"),
        p1: isEn
            ? "Unlike fixed-itinerary bus tours or unpredictable street taxis, our private driver service puts you in complete control. You travel in a clean, air-conditioned vehicle with a licensed local driver exclusively dedicated to your party and schedule."
            : (isEs
                ? "A diferencia de las excursiones rígidas en autobús o los taxis convencionales, nuestro servicio con conductor privado le da control total. Viaje en un vehículo limpio y climatizado con un conductor profesional local dedicado exclusivamente a su grupo."
                : "Loin des circuits collectifs rigides ou des taxis imprévisibles, notre formule chauffeur privé vous offre une maîtrise totale de votre temps. Vous voyagez à bord d'un véhicule récent, climatisé et parfaitement entretenu avec un chauffeur professionnel dédié à votre planning."),
        p2: isEn
            ? "From punctuality at airport terminals and corporate appointments to safe navigation across High Atlas mountain passes and pedestrian medina riads, your driver handles all logistics so you can relax and travel in peace."
            : (isEs
                ? "Desde la máxima puntualidad en aeropuertos y reuniones hasta una conducción segura en los puertos de montaña del Atlas y acceso a riads en medinas peatonales, su chófer gestiona toda la logística para que viaje con total tranquilidad."
                : "De la ponctualité aux arrivées d'aéroports et rendez-vous d'affaires jusqu'à la conduite sécurisée sur les cols du Haut Atlas et la coordination pour vos riads en médina, votre chauffeur veille sur chaque détail pour un voyage serein."),
        badgeText: isEn
            ? "Licensed & Bilingual Chauffeur"
            : (isEs ? "Conductor Acreditado y Bilingüe" : "Chauffeur Agréé & Bilingue"),
        features: [
            {
                icon: <ShieldCheck size={22} weight="fill" color="var(--primary)" />,
                title: isEn ? "Licensed & Safe Driving" : (isEs ? "Licencia y Conducción Segura" : "Chauffeur Agréé & Sécurisé"),
                desc: isEn
                    ? "Officially registered passenger transport with strict speed compliance and regional route mastery."
                    : (isEs
                        ? "Transporte turístico oficial con estricto respeto de las normas y conocimiento de las carreteras."
                        : "Transport touristique agréé avec respect strict des règles de sécurité et maîtrise des routes régionales.")
            },
            {
                icon: <ChatCircleText size={22} weight="fill" color="var(--primary)" />,
                title: isEn ? "Bilingual Communication" : (isEs ? "Atención Bilingüe" : "Communication Bilingue"),
                desc: isEn
                    ? "Fluent in English and French for smooth WhatsApp coordination and effortless travel planning."
                    : (isEs
                        ? "Fluidez en inglés y francés para una coordinación fluida por WhatsApp y llamadas."
                        : "Maîtrise du français et de l'anglais pour des échanges fluides par WhatsApp et tout au long du trajet.")
            },
            {
                icon: <Suitcase size={22} weight="fill" color="var(--primary)" />,
                title: isEn ? "Luggage & Medina Care" : (isEs ? "Asistencia con Equipaje" : "Aide aux Bagages & Médinas"),
                desc: isEn
                    ? "Hands-on luggage handling and coordination to the nearest car-accessible drop-off for medina riads."
                    : (isEs
                        ? "Ayuda con las maletas en cada parada y recogida en el punto más cercano para riads peatonales."
                        : "Prise en charge de vos bagages à chaque étape et accompagnement au point le plus proche de votre riad.")
            },
            {
                icon: <NavigationArrow size={22} weight="fill" color="var(--primary)" />,
                title: isEn ? "Flexible Stops On Request" : (isEs ? "Paradas Libres en Ruta" : "Arrêts Libres à Votre Rythme"),
                desc: isEn
                    ? "Travel at your own pace with spontaneous stops for photos, fresh coffee, and scenic view breaks."
                    : (isEs
                        ? "Viaje a su propio ritmo con paradas para fotos, café o almuerzo cuando usted lo desee."
                        : "Voyagez à votre propre rythme avec des pauses libres pour photos, pauses-café et repas selon vos envies.")
            }
        ]
    };

    return (
        <section
            className="pro-driver-section"
            style={{
                backgroundColor,
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                position: 'relative'
            }}
            id="professional-driver"
        >
            <style>{`
                .pro-driver-section {
                    padding: 70px 20px;
                }
                .pro-driver-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 40px;
                    align-items: center;
                }
                .pro-driver-img-box {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 360px;
                    aspect-ratio: 4/3;
                }
                .pro-driver-features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 14px;
                    margin-top: 8px;
                }
                .pro-driver-feature-card {
                    background-color: #ffffff;
                    border-radius: 12px;
                    padding: 14px 16px;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                @media (max-width: 768px) {
                    .pro-driver-section {
                        padding: 34px 14px 30px 14px !important;
                    }
                    .pro-driver-grid {
                        gap: 20px !important;
                    }
                    .pro-driver-img-box {
                        min-height: 220px !important;
                        max-height: 250px !important;
                        aspect-ratio: 16/9 !important;
                    }
                    .pro-driver-badge {
                        padding: 8px 12px !important;
                        bottom: 10px !important;
                        left: 10px !important;
                        right: 10px !important;
                    }
                    .pro-driver-features-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 8px !important;
                        margin-top: 4px !important;
                    }
                    .pro-driver-feature-card {
                        padding: 10px 10px !important;
                        gap: 4px !important;
                        border-radius: 10px !important;
                    }
                    .pro-driver-feature-card h3 {
                        font-size: 0.82rem !important;
                    }
                    .pro-driver-feature-card p {
                        font-size: 0.74rem !important;
                        line-height: 1.35 !important;
                    }
                    .pro-driver-narrative p {
                        font-size: 0.86rem !important;
                        line-height: 1.48 !important;
                    }
                }
            `}</style>
            <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                <div className="pro-driver-grid">
                    {/* Left Column: Chauffeur Image with Floating Trust Badge */}
                    <div style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 16px 36px rgba(32, 47, 89, 0.12)',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        maxHeight: '520px'
                    }}>
                        <div className="pro-driver-img-box">
                            <Image
                                src="/a-mdiinatours/chauffeur-costume-mercedes-noires.webp"
                                alt={content.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 550px"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                            {/* Subtle dark gradient at bottom for badge contrast */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(18, 29, 57, 0.45) 0%, transparent 40%)'
                            }} />

                            {/* Trust Badge Pill Overlay */}
                            <div className="pro-driver-badge" style={{
                                position: 'absolute',
                                bottom: '18px',
                                left: '18px',
                                right: '18px',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(8px)',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                border: '1px solid rgba(255, 255, 255, 0.8)'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                    color: '#16a34a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '0.9rem',
                                    flexShrink: 0
                                }}>
                                    ✓
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--secondary)' }}>
                                        {content.badgeText}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                                        {isEn ? "Punctual · Discreet · Local Route Mastery" : (isEs ? "Puntual · Discreto · Experto en Rutas" : "Ponctuel · Discret · Maîtrise des Itinéraires")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Editorial Value Narrative & 4 Highlights */}
                    <div className="pro-driver-narrative" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <span style={{
                                fontSize: '0.82rem',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '4px'
                            }}>
                                {content.eyebrow}
                            </span>
                            <h2 style={{
                                fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)',
                                fontWeight: 700,
                                color: 'var(--secondary)',
                                margin: 0,
                                lineHeight: '1.25',
                                fontFamily: 'var(--font-poppins), sans-serif'
                            }}>
                                {content.title}
                            </h2>
                        </div>

                        <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                            {content.p1}
                        </p>

                        <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                            {content.p2}
                        </p>

                        {/* 4 Feature Badges Grid */}
                        <div className="pro-driver-features-grid">
                            {content.features.map((feat, idx) => (
                                <div
                                    key={idx}
                                    className="pro-driver-feature-card"
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {feat.icon}
                                        <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                            {feat.title}
                                        </h3>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                                        {feat.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

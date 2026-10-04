"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, Wind, Check } from "@phosphor-icons/react";

interface Vehicle {
    name: string;
    spec?: string;
    capacity?: string;
    luggage?: string;
    suitability?: string;
    price?: string;
    image: string;
}

interface PrivateDriverFleetProps {
    vehicles: Vehicle[];
    lang: string;
    showBottomDivider?: boolean;
}

export default function PrivateDriverFleet({ vehicles, lang, showBottomDivider = false }: PrivateDriverFleetProps) {
    const isEn = lang === 'en';
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const hasInitialScrolledRef = useRef(false);
    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeIndex, setActiveIndex] = useState(vehicles && vehicles.length > 1 ? 1 : 0);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !vehicles || vehicles.length === 0) return;

        const observerOptions = {
            root: container,
            rootMargin: '0px -40% 0px -40%', // Observe when the card occupies the middle area
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isProgrammaticScrollRef.current) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cardIndex = Array.from(container.children).indexOf(entry.target);
                    if (cardIndex !== -1) {
                        setActiveIndex(cardIndex);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe each card in the scroll container
        Array.from(container.children).forEach(child => {
            observer.observe(child);
        });

        return () => {
            observer.disconnect();
        };
    }, [vehicles?.length]);

    const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardElement = container.children[index] as HTMLElement;
        if (cardElement) {
            const containerWidth = container.clientWidth;
            const cardWidth = cardElement.clientWidth;
            const targetLeft = cardElement.offsetLeft - (containerWidth - cardWidth) / 2;
            
            isProgrammaticScrollRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isProgrammaticScrollRef.current = false;
            }, 600);

            container.scrollTo({
                left: targetLeft,
                behavior
            });
            setActiveIndex(index);
        }
    };

    // Scroll to the next index (1) ONLY ONCE on initial mount so it starts scrolled once
    useEffect(() => {
        if (hasInitialScrolledRef.current || !vehicles || vehicles.length === 0) return;
        hasInitialScrolledRef.current = true;
        const defaultIndex = vehicles.length > 1 ? 1 : 0;
        const timer = setTimeout(() => {
            scrollToIndex(defaultIndex, 'auto');
        }, 150); // slight delay to ensure layout has completed rendering
        return () => clearTimeout(timer);
    }, [vehicles?.length]);

    const scrollPrev = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    };

    const scrollNext = () => {
        if (activeIndex < vehicles.length - 1) {
            scrollToIndex(activeIndex + 1);
        }
    };

    const canScrollLeft = activeIndex > 0;
    const canScrollRight = activeIndex < vehicles.length - 1;

    const getVehicleMetadata = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("superb")) {
            return {
                tierBadge: isEn ? "Premium Sedan" : "Berline Premium",
                bg: "#f3e8ff",
                color: "#6b21a8",
                pax: "1–3",
                bags: "3",
                isVito: false
            };
        } else if (n.includes("kodiaq")) {
            return {
                tierBadge: isEn ? "Comfort SUV" : "SUV Grand Confort",
                bg: "#e0f2fe",
                color: "#0369a1",
                pax: "1–5",
                bags: "4",
                isVito: false
            };
        } else if (n.includes("scudo")) {
            return {
                tierBadge: isEn ? "Spacious Van" : "Van Spacieux",
                bg: "#ecfdf5",
                color: "#065f46",
                pax: "1–6",
                bags: "5",
                isVito: false
            };
        } else if (n.includes("vito")) {
            return {
                tierBadge: isEn ? "VIP Minivan" : "Minivan VIP",
                bg: "#fff7ed",
                color: "#c2410c",
                pax: "1–7",
                bags: "6",
                isVito: true
            };
        } else if (n.includes("sprinter")) {
            return {
                tierBadge: isEn ? "VIP Minibus" : "Minibus VIP",
                bg: "#fee2e2",
                color: "#991b1b",
                pax: "8–16",
                bags: "12",
                isVito: false
            };
        }
        return {
            tierBadge: isEn ? "Premium Fleet" : "Flotte Premium",
            bg: "#f3f4f6",
            color: "#374151",
            pax: "1–4",
            bags: "4",
            isVito: false
        };
    };

    const getVehicleDesc = (name: string, fallbackDesc?: string) => {
        const n = name.toLowerCase();
        if (n.includes("superb")) {
            return isEn 
                ? "Comfortable sedan for 1–2 passengers with luggage, ideal for city travel and business trips."
                : "Berline confortable pour 1 à 2 passagers avec bagages, idéale pour les déplacements urbains et professionnels.";
        }
        if (n.includes("kodiaq")) {
            return isEn 
                ? "Spacious SUV with higher clearance, well suited for 1–3 passengers on regional routes."
                : "SUV spacieux avec garde au sol surélevée, adapté pour 1 à 3 passagers sur les routes régionales.";
        }
        if (n.includes("scudo")) {
            return isEn 
                ? "Spacious van for families and small groups with generous luggage capacity."
                : "Van spacieux pour familles et petits groupes avec une grande capacité de bagages.";
        }
        if (n.includes("vito")) {
            return isEn 
                ? "Spacious cabin with extra luggage capacity, recommended for groups and longer multi-day journeys."
                : "Cabine spacieuse avec grand coffre à bagages, recommandée pour les groupes et les circuits sur plusieurs jours.";
        }
        if (n.includes("sprinter")) {
            return isEn 
                ? "Executive minibus configured for large tour groups, corporate delegations, and extended family travel."
                : "Minibus de prestige configuré pour les grands groupes, délégations d'affaires et voyages en famille.";
        }
        return fallbackDesc || "";
    };

    const getOnboardFeatures = () => {
        return [
            isEn ? "Air conditioning" : "Climatisation",
            isEn ? "Professional chauffeur" : "Chauffeur professionnel",
            isEn ? "Luggage assistance" : "Aide aux bagages"
        ];
    };

    return (
        <section style={{ 
            padding: showBottomDivider ? '140px 20px 140px 20px' : '140px 20px 80px 20px', 
            backgroundColor: 'var(--bg-color)', 
            borderTop: 'none',
            position: 'relative',
            overflow: 'hidden'
        }} id="fleet">
            {/* Top Shape Divider */}
            <div style={{
                position: 'absolute',
                top: '-1px',
                left: 0,
                width: '100%',
                overflow: 'hidden',
                lineHeight: 0,
                zIndex: 1,
                pointerEvents: 'none'
            }}>
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{
                    position: 'relative',
                    display: 'block',
                    width: 'calc(100% + 1.3px)',
                    height: '80px'
                }}>
                    <path 
                        d="M0,0 C480,100 960,20 1440,90 L1440,0 L0,0 Z" 
                        fill="#ffffff"
                        opacity="0.5"
                    />
                    <path 
                        d="M0,0 C320,90 960,30 1440,70 L1440,0 L0,0 Z" 
                        fill="#ffffff"
                    />
                </svg>
            </div>

            <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <style>{`
                    .fleet-grid {
                        display: flex;
                        gap: 24px;
                        width: 100%;
                        overflow-x: auto;
                        scroll-snap-type: x mandatory;
                        scroll-behavior: smooth;
                        -webkit-overflow-scrolling: touch;
                        padding: 24px 4px 32px 4px;
                        margin: 0;
                        scrollbar-width: none;
                    }
                    .fleet-grid::-webkit-scrollbar {
                        display: none;
                    }
                    @media (min-width: 769px) {
                        .fleet-grid {
                            padding-left: calc(50% - 175px);
                            padding-right: calc(50% - 175px);
                        }
                    }
                    @media (max-width: 768px) {
                        .fleet-grid {
                            padding-left: calc(50% - 145px); /* since mobile card is 290px wide */
                            padding-right: calc(50% - 145px);
                        }
                    }
                    .fleet-card {
                        background-color: #fff;
                        border-radius: 20px;
                        border: 1px solid #f3f4f6;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        height: auto;
                        flex: 0 0 350px;
                        scroll-snap-align: center;
                        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                    opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                    border-color 0.4s ease;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
                        opacity: 0.8;
                        transform: scale(0.96);
                    }
                    @media (max-width: 768px) {
                        .fleet-card {
                            flex: 0 0 290px;
                        }
                    }
                    .fleet-card.active-card {
                        opacity: 1;
                        transform: scale(1.03);
                        box-shadow: 0 20px 25px -5px rgba(27, 45, 79, 0.08), 0 10px 10px -5px rgba(27, 45, 79, 0.03);
                        border-color: #e5e7eb;
                    }
                    .fleet-card.active-card:hover {
                        transform: translateY(-4px) scale(1.03);
                        box-shadow: 0 25px 30px -5px rgba(27, 45, 79, 0.12), 0 12px 15px -5px rgba(27, 45, 79, 0.05);
                    }
                    .vito-card {
                        border: 1.5px solid var(--primary) !important;
                    }
                    .vito-card.active-card {
                        box-shadow: 0 20px 25px -5px rgba(220, 131, 78, 0.12), 0 10px 10px -5px rgba(220, 131, 78, 0.06) !important;
                    }
                    .vito-card.active-card:hover {
                        box-shadow: 0 25px 30px -5px rgba(220, 131, 78, 0.18), 0 12px 15px -5px rgba(220, 131, 78, 0.09) !important;
                    }
                    
                    @media (prefers-reduced-motion: reduce) {
                        .fleet-card {
                            transition: none !important;
                            transform: none !important;
                            opacity: 1 !important;
                        }
                        .fleet-card.active-card {
                            transform: none !important;
                        }
                        .fleet-card.active-card:hover {
                            transform: none !important;
                        }
                    }
                    
                    /* Carousel controls */
                    .carousel-btn {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        background-color: #fff;
                        border: 1px solid #e5e5e5;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        z-index: 10;
                        transition: all 0.2s ease;
                        color: var(--secondary);
                        padding: 0;
                    }
                    .carousel-btn:hover:not(:disabled) {
                        background-color: #f9fafb;
                        border-color: #d1d5db;
                        transform: translateY(-50%) scale(1.05);
                    }
                    .carousel-btn:disabled {
                        opacity: 0.3;
                        cursor: not-allowed;
                    }
                    .carousel-btn-left {
                        left: -22px;
                    }
                    .carousel-btn-right {
                        right: -22px;
                    }
                    @media (max-width: 1200px) {
                        .carousel-btn-left {
                            left: -10px;
                        }
                        .carousel-btn-right {
                            right: -10px;
                        }
                    }
                    @media (max-width: 1024px) {
                        .carousel-btn {
                            display: none;
                        }
                    }
                    .carousel-dots {
                        display: flex;
                        justify-content: center;
                        gap: 8px;
                        margin-top: 24px;
                    }
                    .carousel-dot {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #e5e7eb;
                        border: none;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                        padding: 0;
                    }
                    .carousel-dot.active {
                        background-color: var(--primary);
                        width: 28px;
                        border-radius: 5px;
                    }
                    .fleet-img-area {
                        height: 180px;
                        background-color: #fff;
                        border-bottom: 1px solid #f3f4f6;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 32px;
                        overflow: hidden;
                    }
                    .fleet-img {
                        max-height: 100%;
                        max-width: 100%;
                        object-fit: contain;
                        transition: transform 0.3s ease;
                    }
                    .fleet-card:hover .fleet-img {
                        transform: scale(1.05);
                    }
                    .fleet-pill {
                        position: absolute;
                        font-size: 0.72rem;
                        font-weight: 500;
                        padding: 4px 10px;
                        border-radius: 9999px;
                        letter-spacing: 0.02em;
                    }
                    .fleet-pill-left {
                        top: 12px;
                        left: 12px;
                    }
                    .fleet-pill-right {
                        top: 12px;
                        right: 12px;
                        background-color: var(--primary);
                        color: #fff;
                    }
                    .fleet-body {
                        padding: 22px 20px;
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                    }
                    .fleet-name {
                        font-size: 1.45rem;
                        font-weight: 600;
                        color: #1B2D4F;
                        margin: 0 0 4px 0;
                        font-family: var(--font-poppins), sans-serif;
                    }
                    .fleet-subtitle {
                        font-size: 0.8rem;
                        color: #6b7280;
                        margin: 0 0 12px 0;
                    }
                    .fleet-specs {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                        margin-bottom: 14px;
                    }
                    .fleet-spec-pill {
                        background-color: #f9fafb;
                        border: 1px solid #f3f4f6;
                        border-radius: 6px;
                        padding: 4px 10px;
                        font-size: 0.75rem;
                        color: #4b5563;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        font-weight: 500;
                    }
                    .fleet-desc {
                        font-size: 0.82rem;
                        color: #4b5563;
                        line-height: 1.45;
                        margin: 0 0 14px 0;
                    }
                    .fleet-features {
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                        margin-top: auto;
                    }
                    .fleet-feature-item {
                        font-size: 0.78rem;
                        color: #4b5563;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .fleet-feature-check {
                        color: var(--primary);
                        font-weight: bold;
                    }
                    .fleet-shared-cta-btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background-color: var(--primary);
                        color: #fff;
                        border: 1.5px solid var(--primary);
                        padding: 13px 32px;
                        border-radius: 9999px;
                        font-weight: 600;
                        font-size: 0.95rem;
                        text-align: center;
                        text-decoration: none;
                        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: pointer;
                        box-shadow: 0 4px 14px rgba(220, 131, 78, 0.25);
                    }
                    .fleet-shared-cta-btn:hover {
                        background-color: #c96f3c;
                        border-color: #c96f3c;
                        color: #fff;
                        box-shadow: 0 6px 20px rgba(220, 131, 78, 0.35);
                        transform: translateY(-2px);
                    }
                `}</style>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "OUR FLEET" : "NOTRE FLOTTE"}
                    </span>
                    <h2 style={{ 
                        fontSize: '2.1rem', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '8px',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        textWrap: 'balance'
                    }}>
                        {isEn ? "Our Private Driver Fleet" : "Notre Flotte de Chauffeurs Privés"}
                    </h2>
                    <p style={{ color: '#666', marginTop: '10px', fontSize: '1.02rem', maxWidth: '650px', margin: '10px auto 0 auto' }}>
                        {isEn 
                            ? "Comfortable vehicles for couples, families and groups across Morocco."
                            : "Des véhicules confortables pour les couples, les familles et les groupes à travers le Maroc."}
                    </p>
                </div>

                {/* Fleet Cards Grid */}
                <div className="fleet-carousel-wrapper" style={{ position: 'relative' }}>
                    {/* Previous Button */}
                    <button 
                        onClick={scrollPrev} 
                        disabled={!canScrollLeft}
                        className="carousel-btn carousel-btn-left"
                        aria-label={isEn ? "Previous vehicles" : "Véhicules précédents"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="fleet-grid" ref={scrollContainerRef}>
                        {vehicles.map((v, idx) => {
                            const meta = getVehicleMetadata(v.name);
                            const isVito = meta.isVito;
                            const description = getVehicleDesc(v.name, v.suitability);

                            return (
                                <div key={idx} className={`fleet-card ${isVito ? 'vito-card' : ''} ${activeIndex === idx ? 'active-card' : ''}`}>
                                    {/* Image Area */}
                                    <div className="fleet-img-area">
                                        <img 
                                            src={v.image} 
                                            alt={v.name} 
                                            className="fleet-img"
                                            width={400}
                                            height={240}
                                            loading="lazy"
                                        />
                                        <span 
                                            className="fleet-pill fleet-pill-left"
                                            style={{ backgroundColor: meta.bg, color: meta.color }}
                                        >
                                            {meta.tierBadge}
                                        </span>
                                        {isVito && (
                                            <span className="fleet-pill fleet-pill-right">
                                                {isEn ? "Most Popular" : "Plus Populaire"}
                                            </span>
                                        )}
                                    </div>

                                    {/* Card Body */}
                                    <div className="fleet-body">
                                        <h3 className="fleet-name">{v.name}</h3>
                                        <div className="fleet-subtitle">{meta.tierBadge}</div>

                                        {/* Specs Pills */}
                                        <div className="fleet-specs">
                                            <div className="fleet-spec-pill">
                                                <Users size={14} /> <strong>{meta.pax} {isEn ? "passengers" : "passagers"}</strong>
                                            </div>
                                            <div className="fleet-spec-pill">
                                                <Briefcase size={14} /> <strong>{meta.bags} {isEn ? (parseInt(meta.bags) > 1 ? "bags" : "bag") : (parseInt(meta.bags) > 1 ? "bagages" : "bagage")}</strong>
                                            </div>
                                            <div className="fleet-spec-pill">
                                                <Wind size={14} /> <strong>A/C</strong>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="fleet-desc">{description}</p>

                                        {/* Benefits / Checklist */}
                                        <div className="fleet-features">
                                            {getOnboardFeatures().map((feat, fidx) => (
                                                <div key={fidx} className="fleet-feature-item">
                                                    <Check size={14} weight="bold" className="fleet-feature-check" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={scrollNext} 
                        disabled={!canScrollRight}
                        className="carousel-btn carousel-btn-right"
                        aria-label={isEn ? "Next vehicles" : "Véhicules suivants"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="carousel-dots">
                    {vehicles.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            className={`carousel-dot ${activeIndex === idx ? 'active' : ''}`}
                            aria-label={isEn ? `Go to vehicle ${idx + 1}` : `Aller au véhicule ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Shared CTA & Subtle Disclaimer */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <a
                        href="#booking"
                        onClick={(e) => {
                            const el = document.getElementById('booking');
                            if (el) {
                                e.preventDefault();
                                el.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="fleet-shared-cta-btn"
                    >
                        {isEn ? "Check availability" : "Vérifier la disponibilité"}
                    </a>
                    <p style={{
                        fontSize: '0.82rem',
                        color: '#6b7280',
                        marginTop: '14px',
                        lineHeight: 1.5,
                        maxWidth: '560px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0 16px'
                    }}>
                        {isEn 
                            ? "Vehicle models may vary based on availability. An equivalent or higher-category vehicle may be provided."
                            : "Les modèles de véhicules peuvent varier selon la disponibilité. Un véhicule équivalent ou de catégorie supérieure sera fourni."}
                    </p>
                </div>
            </div>

            {showBottomDivider && (
                <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    width: '100%',
                    overflow: 'hidden',
                    lineHeight: 0,
                    zIndex: 1,
                    pointerEvents: 'none'
                }}>
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{
                        position: 'relative',
                        display: 'block',
                        width: 'calc(100% + 1.3px)',
                        height: '80px',
                        transform: 'rotate(180deg)'
                    }}>
                        <path 
                            d="M0,0 C480,100 960,20 1440,90 L1440,0 L0,0 Z" 
                            fill="#ffffff"
                            opacity="0.5"
                        />
                        <path 
                            d="M0,0 C320,90 960,30 1440,70 L1440,0 L0,0 Z" 
                            fill="#ffffff"
                        />
                    </svg>
                </div>
            )}
        </section>
    );
}

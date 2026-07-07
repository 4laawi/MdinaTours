"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, Wind, Check } from "@phosphor-icons/react";

interface Vehicle {
    name: string;
    spec: string;
    capacity: string;
    luggage: string;
    suitability: string;
    price: string;
    image: string;
}

interface TransferFleetProps {
    prices: { [passengers: number]: number };
    lang: 'en' | 'fr';
    local: any;
}

export default function TransferFleet({ prices, lang, local }: TransferFleetProps) {
    const isEn = lang === 'en';
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const vehiclesList = [
        {
            name: "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn 
                ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or solo travelers." 
                : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: prices[3] ? `€${prices[3]}` : null,
            image: "/cars/flotte-superb.webp"
        },
        ...(prices[4] ? [{
            name: "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn 
                ? "A premium mid-size SUV offering high ground clearance, excellent stability, and spacious comfort." 
                : "Un SUV familial haut de gamme offrant une excellente garde au sol et une stabilité parfaite.",
            price: `€${prices[4]}`,
            image: "/cars/flotte-skoda-kodiaq.webp"
        }] : []),
        ...(prices[5] ? [{
            name: "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn 
                ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." 
                : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: `€${prices[5]}`,
            image: "/cars/flotte-fiat-scudo.webp"
        }] : []),
        {
            name: "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn 
                ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." 
                : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: prices[7] ? `€${prices[7]}` : null,
            image: "/cars/flotte-vito.webp"
        },
        {
            name: "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn 
                ? "A custom-configured executive minibus designed for large tour groups or multi-family excursions." 
                : "Un minibus de prestige configuré sur mesure, conçu pour les grands groupes et familles.",
            price: isEn ? "Custom quote" : "Devis personnalisé",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const vehicles = vehiclesList.filter(v => v.price !== null) as Vehicle[];

    const [activeIndex, setActiveIndex] = useState(vehicles && vehicles.length > 1 ? 1 : 0);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || vehicles.length === 0) return;

        const observerOptions = {
            root: container,
            rootMargin: '0px -40% 0px -40%', // Observe when the card occupies the middle area
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
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
    }, [vehicles]);

    const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardElement = container.children[index] as HTMLElement;
        if (cardElement) {
            const containerWidth = container.clientWidth;
            const cardWidth = cardElement.clientWidth;
            const targetLeft = cardElement.offsetLeft - (containerWidth - cardWidth) / 2;
            
            container.scrollTo({
                left: targetLeft,
                behavior
            });
            setActiveIndex(index);
        }
    };

    // Scroll to the next index (1) on mount/load so it starts scrolled once
    useEffect(() => {
        if (vehicles.length === 0) return;
        const timer = setTimeout(() => {
            scrollToIndex(vehicles.length > 1 ? 1 : 0, 'auto');
        }, 150); // slight delay to ensure layout has completed rendering
        return () => clearTimeout(timer);
    }, [vehicles]);

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

    const getWhatsAppUrl = (vName: string, priceStr: string) => {
        const baseMsg = isEn 
            ? `Hello Mdina Tours,\nI would like to book a private transfer: "${local.title}".\n\n• Route: ${local.pickup} ⇄ ${local.dropoff}\n• Vehicle: ${vName}\n• Price: ${priceStr}\n\nPlease let me know availability.`
            : `Bonjour Mdina Tours,\nJe souhaite réserver un transfert privé : "${local.title}".\n\n• Trajet : ${local.pickup} ⇄ ${local.dropoff}\n• Véhicule : ${vName}\n• Tarif : ${priceStr}\n\nMerci de me confirmer la disponibilité.`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(baseMsg)}`;
    };

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
                tierBadge: isEn ? "VIP Van" : "Van VIP",
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
        } else {
            return {
                tierBadge: isEn ? "VIP Minibus" : "Minibus Prestige",
                bg: "#fee2e2",
                color: "#991b1b",
                pax: "8–16",
                bags: "12",
                isVito: false
            };
        }
    };

    const getOnboardFeatures = (vName: string) => {
        const nameLower = vName.toLowerCase();
        const common = [
            isEn ? "Dual-zone Air Conditioning" : "Climatisation Bizone",
            isEn ? "Professional Multilingual Driver" : "Chauffeur Professionnel Bilingue",
            isEn ? "Complimentary Luggage Assistance" : "Aide aux Bagages Offerte",
            isEn ? "Bottled Mineral Water Included" : "Bouteilles d'Eau Minérale Incluses"
        ];
        if (nameLower.includes("superb") || nameLower.includes("kodiaq")) {
            return [...common, isEn ? "USB Chargers & Premium Comfort" : "Chargeurs USB & Grand Confort"];
        }
        if (nameLower.includes("vito") || nameLower.includes("sprinter")) {
            return [...common, isEn ? "Extra Legroom & High Capacity Charging" : "Espace Jambes & Prises de Recharge Rapide"];
        }
        return common;
    };

    if (vehicles.length === 0) return null;

    return (
        <section style={{ 
            padding: '140px 20px 140px 20px', 
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
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                    }
                    .fleet-name {
                        font-size: 1.5rem;
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
                        margin-bottom: 12px;
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
                        font-size: 0.8rem;
                        color: #4b5563;
                        line-height: 1.4;
                        margin: 0 0 12px 0;
                    }
                    .fleet-features {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        margin-bottom: 16px;
                    }
                    .fleet-feature-item {
                        font-size: 0.75rem;
                        color: #4b5563;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .fleet-feature-check {
                        color: var(--primary);
                        font-weight: bold;
                    }
                    .fleet-bottom {
                        margin-top: auto;
                    }
                    .fleet-price-row {
                        display: flex;
                        align-items: baseline;
                        gap: 4px;
                        margin-bottom: 12px;
                    }
                    .fleet-price {
                        font-size: 1.875rem;
                        font-weight: 700;
                        color: #1B2D4F;
                    }
                    .fleet-price-suffix {
                        font-size: 0.72rem;
                        color: #8892b0;
                        font-weight: 500;
                        margin-left: 2px;
                    }
                    .btn-outline {
                        display: block;
                        width: 100%;
                        background-color: transparent;
                        color: var(--primary);
                        border: 1.5px solid var(--primary);
                        padding: 11px 16px;
                        border-radius: 9999px;
                        font-weight: 600;
                        font-size: 0.875rem;
                        text-align: center;
                        text-decoration: none;
                        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: pointer;
                        box-sizing: border-box;
                    }
                    .btn-outline:hover {
                        background-color: var(--primary);
                        color: #fff;
                        box-shadow: 0 4px 12px rgba(220, 131, 78, 0.2);
                    }
                    .btn-vito {
                        display: block;
                        width: 100%;
                        background-color: var(--primary);
                        color: #fff;
                        border: 1.5px solid var(--primary);
                        padding: 11px 16px;
                        border-radius: 9999px;
                        font-weight: 600;
                        font-size: 0.875rem;
                        text-align: center;
                        text-decoration: none;
                        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: pointer;
                        box-sizing: border-box;
                        box-shadow: 0 4px 12px rgba(220, 131, 78, 0.15);
                    }
                    .btn-vito:hover {
                        background-color: #c96f3c;
                        border-color: #c96f3c;
                        color: #fff;
                        box-shadow: 0 6px 16px rgba(220, 131, 78, 0.3);
                        transform: translateY(-1px);
                    }
                `}</style>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "OUR PREMIUM FLEET" : "NOTRE FLOTTE PREMIUM"}
                    </span>
                    <h2 style={{ 
                        fontSize: '2.1rem', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '8px',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        textWrap: 'balance'
                    }}>
                        {isEn ? "Select Your Transfer Vehicle" : "Choisissez Votre Véhicule de Transfert"}
                    </h2>
                    <p style={{ color: '#666', marginTop: '10px', fontSize: '1.02rem' }}>
                        {isEn 
                            ? "Meticulously maintained, fully licensed vehicles to match your group size and travel style."
                            : "Des véhicules parfaitement entretenus et agréés pour répondre à la taille de votre groupe."}
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

                            return (
                                <div key={idx} className={`fleet-card ${isVito ? 'vito-card' : ''} ${activeIndex === idx ? 'active-card' : ''}`}>
                                    {/* Image Area */}
                                    <div className="fleet-img-area">
                                        <img 
                                            src={v.image} 
                                            alt={v.name} 
                                            className="fleet-img"
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
                                        <div className="fleet-subtitle">{v.spec}</div>

                                        {/* Specs Pills */}
                                        <div className="fleet-specs">
                                            <div className="fleet-spec-pill">
                                                <Users size={14} /> <strong>{meta.pax} PAX</strong>
                                            </div>
                                            <div className="fleet-spec-pill">
                                                <Briefcase size={14} /> <strong>{meta.bags} {isEn ? (parseInt(meta.bags) > 1 ? "Bags" : "Bag") : (parseInt(meta.bags) > 1 ? "Bagages" : "Bagage")}</strong>
                                            </div>
                                            <div className="fleet-spec-pill">
                                                <Wind size={14} /> <strong>A/C</strong>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="fleet-desc">{v.suitability}</p>

                                        {/* Checklist (only top 3 to keep height reasonable) */}
                                        <div className="fleet-features">
                                            {getOnboardFeatures(v.name).slice(0, 3).map((feat, fidx) => (
                                                <div key={fidx} className="fleet-feature-item">
                                                    <Check size={14} weight="bold" className="fleet-feature-check" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom Info and Button */}
                                        <div className="fleet-bottom">
                                            <div className="fleet-price-row">
                                                <span className="fleet-price">{v.price}</span>
                                                <span className="fleet-price-suffix">
                                                    {isEn ? " · Fixed Price" : " · Tarif Fixe"}
                                                </span>
                                            </div>

                                            <a
                                                href={getWhatsAppUrl(v.name, v.price)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={isVito ? "btn-vito" : "btn-outline"}
                                            >
                                                {isEn ? "Book on WhatsApp" : "Réserver sur WhatsApp"}
                                            </a>
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
            </div>

            {/* Bottom Shape Divider */}
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
        </section>
    );
}

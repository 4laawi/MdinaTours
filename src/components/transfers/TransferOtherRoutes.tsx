"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface TransferOtherRoutesProps {
    language: 'en' | 'fr';
}

export default function TransferOtherRoutes({ language }: TransferOtherRoutesProps) {
    const isEn = language === 'en';
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const routes = [
        {
            title: "Casablanca Airport ⇄ Rabat",
            desc: isEn 
                ? "Direct highway transfer from CMN airport to your Rabat hotel or embassy."
                : "Transfert direct par autoroute de l'aéroport CMN à votre hôtel ou ambassade à Rabat.",
            price: "€102",
            image: "/img2/Airport_Casablanca_Mohammed.webp",
            slug: "casablanca-airport-transfer"
        },
        {
            title: "Marrakech ⇄ Essaouira",
            desc: isEn 
                ? "Travel from the Red City to the Atlantic coast with photo stops to see tree-climbing goats."
                : "Voyagez de la Ville Rouge à la côte atlantique avec arrêt photo pour voir les chèvres.",
            price: "€108",
            image: "/img2/Essaouira-maroc.jpg",
            slug: "marrakech-to-essaouira-transfer"
        },
        {
            title: "Fes ⇄ Chefchaouen",
            desc: isEn 
                ? "Scenic private transport through the Rif Mountains to the beautiful Blue Pearl."
                : "Transport privé panoramique à travers le Rif jusqu'à la magnifique Perle Bleue.",
            price: "€144",
            image: "/hero-chefchaouen.webp",
            slug: "fes-to-chefchaouen-transfer"
        },
        {
            title: "Casablanca ⇄ Marrakech",
            desc: isEn 
                ? "Fast southern expressway transfer between Casablanca CMN and Marrakech medina."
                : "Transfert rapide par l'autoroute du Sud entre Casablanca CMN et la médina de Marrakech.",
            price: "€192",
            image: "/hero-marrakech.webp",
            slug: "casablanca-to-marrakech-transfer"
        },
        {
            title: "Tangier ⇄ Chefchaouen",
            desc: isEn 
                ? "Scenic mountain transfer from Tangier port or airport to the Blue City."
                : "Transfert de montagne panoramique du port ou de l'aéroport de Tanger à la Ville Bleue.",
            price: "€108",
            image: "/hero-chefchaouen.webp",
            slug: "tangier-to-chefchaouen-transfer"
        },
        {
            title: "Rabat ⇄ Casablanca",
            desc: isEn 
                ? "Convenient intercity transfer between the administrative capital and Casablanca."
                : "Transfert interville pratique entre la capitale administrative et Casablanca.",
            price: "€96",
            image: "/hero-landscape-1.webp",
            slug: "rabat-to-casablanca-transfer"
        },
        {
            title: "Marrakech ⇄ Agadir",
            desc: isEn 
                ? "Relaxing highway transfer to the premier seaside resort town of Agadir."
                : "Transfert relaxant par l'autoroute vers la célèbre station balnéaire d'Agadir.",
            price: "€156",
            image: "/img2/agadir-marina.webp",
            slug: "marrakech-to-agadir-transfer"
        },
        {
            title: "Tangier ⇄ Rabat",
            desc: isEn 
                ? "Comfortable expressway transfer connecting the northern port city of Tangier to Rabat."
                : "Transfert confortable par l'autoroute reliant la ville portuaire de Tanger à Rabat.",
            price: "€180",
            image: "/Tangier-Morocco-Photo.webp",
            slug: "tangier-to-rabat-transfer"
        }
    ];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || routes.length === 0) return;

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
        
        Array.from(container.children).forEach(child => {
            observer.observe(child);
        });

        return () => {
            observer.disconnect();
        };
    }, [routes.length]);

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

    // Scroll to the second card (index 1) on mount so it's centered initially
    useEffect(() => {
        if (routes.length === 0) return;
        const timer = setTimeout(() => {
            scrollToIndex(routes.length > 1 ? 1 : 0, 'auto');
        }, 150);
        return () => clearTimeout(timer);
    }, [routes.length]);

    // Autoplay timer: triggers once every 5 seconds, pauses when hovered
    useEffect(() => {
        if (routes.length <= 1 || isHovered) return;

        const timer = setTimeout(() => {
            const nextIndex = activeIndex < routes.length - 1 ? activeIndex + 1 : 0;
            scrollToIndex(nextIndex);
        }, 5000);

        return () => clearTimeout(timer);
    }, [activeIndex, isHovered, routes.length]);

    const scrollPrev = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    };

    const scrollNext = () => {
        if (activeIndex < routes.length - 1) {
            scrollToIndex(activeIndex + 1);
        } else {
            scrollToIndex(0); // Loop back to the start
        }
    };

    const canScrollLeft = activeIndex > 0;
    const canScrollRight = activeIndex < routes.length - 1;
    const getPath = (slug: string) => `/${language}/transfers/${slug}`;

    return (
        <section style={{ 
            padding: '140px 20px 140px 20px', 
            backgroundColor: 'var(--bg-color)', 
            borderTop: 'none',
            position: 'relative',
            overflow: 'hidden'
        }} id="popular-routes">
            
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

            <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
            >
                <style>{`
                    .routes-carousel-grid {
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
                    .routes-carousel-grid::-webkit-scrollbar {
                        display: none;
                    }
                    @media (min-width: 769px) {
                        .routes-carousel-grid {
                            padding-left: calc(50% - 175px);
                            padding-right: calc(50% - 175px);
                        }
                    }
                    @media (max-width: 768px) {
                        .routes-carousel-grid {
                            padding-left: calc(50% - 145px); /* mobile card is 290px wide */
                            padding-right: calc(50% - 145px);
                        }
                    }
                    .route-card {
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
                        .route-card {
                            flex: 0 0 290px;
                        }
                    }
                    .route-card.active-card {
                        opacity: 1;
                        transform: scale(1.03);
                        box-shadow: 0 20px 25px -5px rgba(27, 45, 79, 0.08), 0 10px 10px -5px rgba(27, 45, 79, 0.03);
                        border-color: #e5e7eb;
                    }
                    .route-card.active-card:hover {
                        transform: translateY(-4px) scale(1.03);
                        box-shadow: 0 25px 30px -5px rgba(27, 45, 79, 0.12), 0 12px 15px -5px rgba(27, 45, 79, 0.05);
                    }
                    
                    @media (prefers-reduced-motion: reduce) {
                        .route-card {
                            transition: none !important;
                            transform: none !important;
                            opacity: 1 !important;
                        }
                        .route-card.active-card {
                            transform: none !important;
                        }
                        .route-card.active-card:hover {
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
                    .route-img-container {
                        position: relative;
                        width: 100%;
                        height: 180px;
                        overflow: hidden;
                    }
                    .route-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.3s ease;
                    }
                    .route-card:hover .route-img {
                        transform: scale(1.05);
                    }
                `}</style>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "Explore Other Routes" : "Explorer d'Autres Trajets"}
                    </span>
                    <h2 style={{ 
                        fontSize: '2.1rem', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '8px',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        textWrap: 'balance'
                    }}>
                        {isEn ? "Popular Private Transfer Routes" : "Trajets de Transfert Privé Populaires"}
                    </h2>
                    <p style={{ color: '#666', marginTop: '10px', fontSize: '1.02rem' }}>
                        {isEn 
                            ? "Fixed-rate intercity routes with meet & greet and 24/7 support."
                            : "Trajets intervilles à tarif fixe avec accueil personnalisé et assistance 24/7."}
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="routes-carousel-wrapper" style={{ position: 'relative' }}>
                    {/* Previous Button */}
                    <button 
                        onClick={scrollPrev} 
                        disabled={!canScrollLeft}
                        className="carousel-btn carousel-btn-left"
                        aria-label={isEn ? "Previous routes" : "Trajets précédents"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="routes-carousel-grid" ref={scrollContainerRef}>
                        {routes.map((route, idx) => (
                            <div key={idx} className={`route-card ${activeIndex === idx ? 'active-card' : ''}`}>
                                <Link href={getPath(route.slug)} className="private-driver-route-img-link" style={{ display: 'block', position: 'relative' }}>
                                    <div className="route-img-container">
                                        <img 
                                            src={route.image} 
                                            alt={route.title} 
                                            className="route-img"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '15px',
                                            right: '15px',
                                            backgroundColor: 'var(--secondary)',
                                            color: '#fff',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            zIndex: 2
                                        }}>
                                            {isEn ? "From" : "Dès"} {route.price}
                                        </div>
                                    </div>
                                </Link>
                                
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                        <Link href={getPath(route.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {route.title}
                                        </Link>
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                                        {route.desc}
                                    </p>
                                    <Link 
                                        href={getPath(route.slug)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: 'var(--primary)',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {isEn ? "View Route" : "Voir le trajet"}
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={scrollNext} 
                        disabled={!canScrollRight}
                        className="carousel-btn carousel-btn-right"
                        aria-label={isEn ? "Next routes" : "Trajets suivants"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="carousel-dots">
                    {routes.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            className={`carousel-dot ${activeIndex === idx ? 'active' : ''}`}
                            aria-label={isEn ? `Go to route ${idx + 1}` : `Aller au trajet ${idx + 1}`}
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

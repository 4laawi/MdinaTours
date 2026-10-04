"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Language } from '@/lib/translations';

interface PrivateDriverHeroGalleryProps {
    language: Language;
    city: string;
    title: string;
}

export default function PrivateDriverHeroGallery({ language, city, title }: PrivateDriverHeroGalleryProps) {
    const isEn = language === 'en';
    const isEs = language === 'es';
    
    const galleryImages = [
        '/b-roll/vitooo.webp',
        '/a-mdiinatours/Fourgon Mercedes devant une entrée marocaine ornée.webp',
        '/a-mdiinatours/luxury-private-driver-mrocco-private-jet.webp',
        '/a-mdiinatours/Chauffeur en costume devant des Mercedes noires.webp',
        '/img3/vito-mercedes-closeup.webp',
        '/img3/tourists-happy-private-driver-casablanca.webp',
        '/a-mdiinatours/Selfie joyeuse en voiture en famille.webp',
        '/a-mdiinatours/private-driver-vito-morocco.webp',
        '/a-mdiinatours/happy-mdinatours-client.webp',
        '/a-mdiinatours/Sourire devant le van Mercedes.webp',
        '/a-mdiinatours/fiat-scudo-9-places-mdinatours.webp'
    ];

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    // Touch gesture disambiguation refs
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchDirection = useRef<'horizontal' | 'vertical' | null>(null);
    const isTouchActive = useRef(false);

    // Mouse drag refs
    const isMouseDown = useRef(false);
    const mouseStartX = useRef(0);

    // Auto-scroll loop (slow, non-distracting)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging && !isTouchActive.current) {
                setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [galleryImages.length, isDragging]);

    // Touch Handlers with Intent Disambiguation
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;
        isTouchActive.current = true;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchDirection.current = null;
        setIsDragging(false);
        setDragOffset(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isTouchActive.current || e.touches.length !== 1) return;

        // If locked to vertical, don't interfere with page scrolling
        if (touchDirection.current === 'vertical') {
            return;
        }

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - touchStartX.current;
        const deltaY = currentY - touchStartY.current;

        // Disambiguate scroll intent once user moves > 6px
        if (touchDirection.current === null) {
            if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
                if (Math.abs(deltaX) >= Math.abs(deltaY)) {
                    // User is swiping the carousel horizontally!
                    touchDirection.current = 'horizontal';
                    setIsDragging(true);
                } else {
                    // User is scrolling the page vertically!
                    touchDirection.current = 'vertical';
                    setIsDragging(false);
                    return;
                }
            }
        }

        if (touchDirection.current === 'horizontal') {
            // Apply slight resistance at ends if desired, or smooth 1:1 drag
            setDragOffset(deltaX);
        }
    };

    const handleTouchEnd = () => {
        if (!isTouchActive.current) return;
        isTouchActive.current = false;

        if (touchDirection.current === 'horizontal') {
            const threshold = 40;
            if (dragOffset < -threshold) {
                setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            } else if (dragOffset > threshold) {
                setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
            }
        }

        setIsDragging(false);
        setDragOffset(0);
        touchDirection.current = null;
    };

    // Desktop Mouse Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isMouseDown.current = true;
        mouseStartX.current = e.clientX;
        setIsDragging(true);
        setDragOffset(0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current) return;
        const currentOffset = e.clientX - mouseStartX.current;
        setDragOffset(currentOffset);
    };

    const handleMouseUp = () => {
        if (!isMouseDown.current) return;
        isMouseDown.current = false;
        setIsDragging(false);

        const threshold = 40;
        if (dragOffset < -threshold) {
            setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
        } else if (dragOffset > threshold) {
            setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
        }
        setDragOffset(0);
    };

    const trackStyle: React.CSSProperties = {
        display: 'flex',
        width: '100%',
        height: '100%',
        transform: `translateX(calc(-${activeImageIndex * 100}% + ${dragOffset}px))`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const t = {
        driverBenefit: isEn ? "Professional private driver" : (isEs ? "Conductor privado profesional" : "Chauffeur privé professionnel"),
        pickupBenefit: isEn ? "Flexible pickup & stops" : (isEs ? "Recogida y paradas flexibles" : "Prise en charge & arrêts libres"),
        payBenefit: isEn ? "Pay after each travel day (Cash/Card)" : (isEs ? "Pago al final de cada día (Efectivo/Tarjeta)" : "Paiement en fin de journée (Espèces/Carte)"),
    };

    return (
        <div className="hero-gallery-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
            <div className="gallery-layout" style={{ margin: 0 }}>
                {/* Main Large Dominant Image */}
                <div 
                    className="gallery-main-image"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={() => { if (isMouseDown.current) handleMouseUp(); }}
                    style={{ borderRadius: '14px', overflow: 'hidden', touchAction: 'pan-y' }}
                >
                    <div className="gallery-slider-viewport" style={{ touchAction: 'pan-y' }}>
                        <div className="gallery-slider-track" style={trackStyle}>
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="gallery-slide-item">
                                    <Image
                                        src={img}
                                        alt={`${title} view ${idx + 1}`}
                                        fill
                                        priority={idx === 0}
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, 750px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        type="button"
                        onClick={() => setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                        className="gallery-arrow-btn"
                        style={{ left: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', color: '#111', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                        className="gallery-arrow-btn"
                        style={{ right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', color: '#111', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                    >
                        ›
                    </button>

                    {/* Image Counter Badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        color: '#FFFFFF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: '12px',
                        backdropFilter: 'blur(4px)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}>
                        {activeImageIndex + 1} / {galleryImages.length}
                    </div>
                </div>

                {/* Clean Fixed 5-Column Thumbnails Grid */}
                <div className="gallery-thumbnails-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '8px',
                    marginTop: '10px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    {galleryImages.slice(0, 5).map((img, idx) => {
                        const isSelected = idx === 4 ? activeImageIndex >= 4 : activeImageIndex === idx;
                        const displayImg = idx === 4 && activeImageIndex >= 4 ? galleryImages[activeImageIndex] : img;
                        const remainingCount = galleryImages.length - 4;

                        return (
                            <div 
                                key={idx}
                                className="gallery-thumb-item"
                                onClick={() => {
                                    if (idx === 4) {
                                        if (activeImageIndex < 4) {
                                            setActiveImageIndex(4);
                                        } else {
                                            setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 4 : prev + 1));
                                        }
                                    } else {
                                        setActiveImageIndex(idx);
                                    }
                                }}
                                style={{
                                    position: 'relative',
                                    height: '70px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: isSelected ? '2px solid #00805A' : '1px solid #E2E8F0',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.15s ease, transform 0.1s ease'
                                }}
                            >
                                <Image
                                    src={displayImg}
                                    alt={`${title} thumbnail ${idx + 1}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="120px"
                                />
                                {idx === 4 && remainingCount > 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.45)' : 'rgba(15, 23, 42, 0.65)',
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12.5px',
                                        fontWeight: 700,
                                        backdropFilter: 'blur(1px)',
                                        transition: 'background-color 0.15s ease'
                                    }}>
                                        <span>+{remainingCount}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Travel-Product Benefits Row directly underneath gallery */}
            <div className="driver-benefit-chips" style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '12px 14px',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #EAEAEA',
                fontSize: '12.5px',
                color: '#334155',
                fontWeight: 500
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00805A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>{t.driverBenefit}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00805A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    </svg>
                    <span>{t.pickupBenefit}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00805A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <span>{t.payBenefit}</span>
                </div>
            </div>
        </div>
    );
}

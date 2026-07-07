"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface PrivateDriverHeroGalleryProps {
    language: 'en' | 'fr';
    city: string;
    title: string;
}

export default function PrivateDriverHeroGallery({ language, city, title }: PrivateDriverHeroGalleryProps) {
    const isEn = language === 'en';
    
    const getGalleryImages = () => {
        return [
            '/b-roll/vito-airoport-parking.jpg',
            '/img2/vito-chaufeeur-privé.jpg',
            '/img/agafay.jpg',
            '/img2/private-vito-vans-3.webp',
            '/img2/happy-traverlers-group.webp',
            '/b-roll/chauffaur.jpg',
            '/img2/private-chauffeur-maroc.webp',
            '/img2/private-van-at-hotel.webp'
        ];
    };

    const galleryImages = getGalleryImages();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);

    // Auto-scroll loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [galleryImages.length, isDragging]);

    const handleDragStart = (clientX: number) => {
        setIsDragging(true);
        dragStartX.current = clientX;
        setDragOffset(0);
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        const currentOffset = clientX - dragStartX.current;
        setDragOffset(currentOffset);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 50; // Swipe threshold in pixels
        if (dragOffset < -threshold) {
            setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? prev : prev + 1));
        } else if (dragOffset > threshold) {
            setActiveImageIndex((prev) => (prev === 0 ? prev : prev - 1));
        }
        setDragOffset(0);
    };

    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
        if (isDragging) handleDragEnd();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert(isEn ? "Link copied to clipboard!" : "Lien copié dans le presse-papiers !");
        }
    };

    const trackStyle: React.CSSProperties = {
        display: 'flex',
        width: '100%',
        height: '100%',
        transform: `translateX(calc(-${activeImageIndex * 100}% + ${dragOffset}px))`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
        <>
        <div className="gallery-layout">
            {/* Main Active Image Display */}
            <div 
                className="gallery-main-image"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                <div className="gallery-slider-viewport">
                    <div className="gallery-slider-track" style={trackStyle}>
                        {galleryImages.map((img, idx) => (
                            <div key={idx} className="gallery-slide-item">
                                <Image
                                    src={img}
                                    alt={`${title} view ${idx + 1}`}
                                    fill
                                    priority={idx === 0}
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                    className="gallery-arrow-btn"
                    style={{ left: '15px' }}
                >
                    ‹
                </button>
                <button
                    onClick={() => setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                    className="gallery-arrow-btn"
                    style={{ right: '15px' }}
                >
                    ›
                </button>

                {/* Dot Indicators */}
                <div className="gallery-dots-container">
                    {galleryImages.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            className={`gallery-dot ${activeImageIndex === idx ? 'active' : ''}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleShare}
                        style={{
                            backgroundColor: '#fff',
                            color: '#333',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186.008-.004a2.25 2.25 0 0 1 2.24-.026l7.85 4.186a2.25 2.25 0 1 1-.356 1.17l-7.85-4.186a2.25 2.25 0 0 1-2.092-1.172Zm0-2.186.008.004a2.25 2.25 0 0 0 2.24.026l7.85-4.186a2.25 2.25 0 1 0-.356-1.17l-7.85 4.186a2.25 2.25 0 0 0-2.092 1.172Z" />
                        </svg>
                        {isEn ? "Share" : "Partager"}
                    </button>
                </div>
            </div>

            {/* Thumbnails List at the bottom */}
            <div className="gallery-thumbnails">
                {galleryImages.map((img, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`gallery-thumbnail-item ${activeImageIndex === idx ? 'active' : ''}`}
                    >
                        <Image
                            src={img}
                            alt={`${title} view ${idx + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="100px"
                        />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

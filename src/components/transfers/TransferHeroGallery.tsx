import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferHeroGallery(props: any) {
  const { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, handleShare, trans, language } = props;
  const isEs = language === 'es';

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
        setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length, isDragging, setActiveImageIndex]);

  // Touch Handlers with Intent Disambiguation
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    isTouchActive.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDirection.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isTouchActive.current || e.touches.length !== 1) return;
    if (touchDirection.current === 'vertical') return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    if (touchDirection.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          touchDirection.current = 'horizontal';
          setIsDragging(true);
        } else {
          touchDirection.current = 'vertical';
          setIsDragging(false);
          return;
        }
      }
    }

    if (touchDirection.current === 'horizontal') {
      setDragOffset(deltaX);
    }
  };

  const onTouchEnd = () => {
    if (!isTouchActive.current) return;
    isTouchActive.current = false;

    if (touchDirection.current === 'horizontal') {
      const threshold = 40;
      if (dragOffset < -threshold) {
        setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
      } else if (dragOffset > threshold) {
        setActiveImageIndex((prev: number) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    touchDirection.current = null;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const currentOffset = e.clientX - mouseStartX.current;
    setDragOffset(currentOffset);
  };

  const onMouseUp = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    setIsDragging(false);

    const threshold = 40;
    if (dragOffset < -threshold) {
      setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    } else if (dragOffset > threshold) {
      setActiveImageIndex((prev: number) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
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

  return (
    <div className="hero-gallery-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      <div className="gallery-layout" style={{ margin: 0 }}>
        {/* Main Active Image Display */}
        <div 
          className="gallery-main-image"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { if (isMouseDown.current) onMouseUp(); }}
          style={{ borderRadius: '14px', overflow: 'hidden', touchAction: 'pan-y' }}
        >
          <div className="gallery-slider-viewport" style={{ touchAction: 'pan-y' }}>
            <div className="gallery-slider-track" style={trackStyle}>
              {galleryImages.map((img: string, idx: number) => (
                <div key={idx} className="gallery-slide-item">
                  <Image
                    src={img}
                    alt={`${local.title} view ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 750px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation overlay buttons */}
          <button
            type="button"
            onClick={() => setActiveImageIndex((prev: number) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
            className="gallery-arrow-btn"
            style={{ left: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', color: '#111', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
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

          {/* Action Buttons overlay */}
          <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px', zIndex: 3 }}>
            <button 
              type="button"
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
              {transText.share}
            </button>
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
          {galleryImages.slice(0, 5).map((img: string, idx: number) => {
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
                      setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 4 : prev + 1));
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
                  alt={`${local.title} thumbnail ${idx + 1}`}
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
    </div>
  );
}


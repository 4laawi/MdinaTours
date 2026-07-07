import React, { useRef, useState } from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferHeroGallery(props: any) {
  const { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, travelers, setTravelers, travelDate, setTravelDate, pickupTime, setPickupTime, isModalOpen, setIsModalOpen, custName, setCustName, custEmail, setCustEmail, custPhone, setCustPhone, custMessage, setCustMessage, isSubmitting, setIsSubmitting, successMessage, setSuccessMessage, errorMessage, setErrorMessage, searchState, setSearchState, showBookingCTAs, setShowBookingCTAs, optionsRef, handleSearchClick, isCalendarOpen, setIsCalendarOpen, isTravelersOpen, setIsTravelersOpen, calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, getDaysInMonth, getFirstDayOfMonth, handlePrevMonth, handleNextMonth, handleDateSelect, formatReadableDate, monthNamesEn, monthNamesFr, weekdayNamesEn, weekdayNamesFr, renderMonth, handleOpenModal, handleSubmit, selectedTier, setSelectedTier, isTimePickerOpen, setIsTimePickerOpen, timePickerRef, getTierLabel, getTierVehicleInfo, getUrgencyDetails, getCancellationDeadline, getWhatsAppUrlForTier, handleShare, timeSlots, currentPrice, urgency, isPast, trans, language } = props;

  const minCapacity = trans?.prices ? Math.min(...Object.keys(trans.prices).map(Number)) : 3;
  const startingPrice = trans?.prices ? trans.prices[minCapacity] : 49;

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

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
      // Swipe left -> next image
      setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? prev : prev + 1));
    } else if (dragOffset > threshold) {
      // Swipe right -> prev image
      setActiveImageIndex((prev: number) => (prev === 0 ? prev : prev - 1));
    }
    setDragOffset(0);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
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
      {/* Premium Gallery Layout */}
      <div className="gallery-layout">
        {/* Vertical Thumbnails List - hidden or horizontal on mobile */}
        <div className="gallery-thumbnails">
          {galleryImages.map((img: any, idx: number) => (
            <div 
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`gallery-thumbnail-item ${activeImageIndex === idx ? 'active' : ''}`}
            >
              <Image
                src={img}
                alt={`${local.title} view ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100px"
              />
            </div>
          ))}
        </div>

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
          <div 
            className="gallery-slider-viewport"
          >
            <div className="gallery-slider-track" style={trackStyle}>
              {galleryImages.map((img: any, idx: number) => (
                <div key={idx} className="gallery-slide-item">
                  <Image
                    src={img}
                    alt={`${local.title} view ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation overlay buttons */}
          <button
            onClick={() => setActiveImageIndex((prev: number) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
            className="gallery-arrow-btn"
            style={{ left: '15px' }}
          >
            ‹
          </button>
          <button
            onClick={() => setActiveImageIndex((prev: number) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
            className="gallery-arrow-btn"
            style={{ right: '15px' }}
          >
            ›
          </button>

          {/* Dot Indicators for Carousel */}
          <div className="gallery-dots-container">
            {galleryImages.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`gallery-dot ${activeImageIndex === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons overlay */}
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
              {transText.share}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

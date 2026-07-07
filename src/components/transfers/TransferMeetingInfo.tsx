import React from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferMeetingInfo(props: any) {
  const { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, travelers, setTravelers, travelDate, setTravelDate, pickupTime, setPickupTime, isModalOpen, setIsModalOpen, custName, setCustName, custEmail, setCustEmail, custPhone, setCustPhone, custMessage, setCustMessage, isSubmitting, setIsSubmitting, successMessage, setSuccessMessage, errorMessage, setErrorMessage, searchState, setSearchState, showBookingCTAs, setShowBookingCTAs, optionsRef, handleSearchClick, isCalendarOpen, setIsCalendarOpen, isTravelersOpen, setIsTravelersOpen, calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, getDaysInMonth, getFirstDayOfMonth, handlePrevMonth, handleNextMonth, handleDateSelect, formatReadableDate, monthNamesEn, monthNamesFr, weekdayNamesEn, weekdayNamesFr, renderMonth, handleOpenModal, handleSubmit, selectedTier, setSelectedTier, isTimePickerOpen, setIsTimePickerOpen, timePickerRef, getTierLabel, getTierVehicleInfo, getUrgencyDetails, getCancellationDeadline, getWhatsAppUrlForTier, handleShare, timeSlots, currentPrice, urgency, isPast, trans, language } = props;

  return (
    <>
      {/* Meeting & Pickup Info Box */}
      <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
      }} className="meeting-info-card">
          <h3 style={{ 
              fontSize: '1.65rem', 
              fontWeight: 700, 
              margin: '0 0 25px 0', 
              fontFamily: "var(--font-poppins), sans-serif", 
              minHeight: '1.2em',
              color: 'var(--secondary)'
          }}>
              {isEn ? "Meeting, Pickup & Arrival Details" : "Détails de prise en charge et d'arrivée"}
          </h3>
          
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative',
              paddingLeft: '32px',
              marginLeft: '12px',
              gap: '36px',
              marginTop: '15px'
          }} className="route-timeline-connector">
              {/* Step 1: Pickup */}
              <div style={{ position: 'relative' }}>
                  {/* Timeline indicator node */}
                  <div style={{
                      position: 'absolute',
                      left: '-43px',
                      top: '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      border: '4px solid var(--primary)', // primary orange color
                      boxShadow: '0 0 0 4px rgba(220, 131, 78, 0.15)',
                      zIndex: 2
                  }} />
                  
                  {/* Timeline connector line to next step */}
                  <div style={{
                      position: 'absolute',
                      left: '-33px', // Aligns with the center of the circle node (left: -43px, width: 20px)
                      top: '22px',   // Starts from the bottom edge of the circle node (top: 2px, height: 20px)
                      bottom: '-38px', // Reaches the top edge of the next circle node. Gap is 36px. The next circle is at top: 2px of the next item. So the distance from bottom of this item to next circle is gap (36px) + top (2px) = 38px.
                      borderLeft: '2px dashed var(--primary)',
                      zIndex: 1
                  }} />
                  
                  <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 700, 
                      color: 'var(--secondary)', 
                      marginBottom: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginTop: '-2px',
                      fontFamily: "'Inter', sans-serif"
                  }}>
                      {transText.pickupLocation}
                  </h4>
                  <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#666', 
                      lineHeight: '1.6', 
                      margin: '0 0 12px 0', 
                      maxWidth: '650px',
                      fontFamily: "'Inter', sans-serif"
                  }}>
                      {transText.pickupDetails}
                  </p>
                  
                  <div style={{ 
                      backgroundColor: 'var(--bg-color)', // cream background
                      padding: '14px 18px', 
                      borderRadius: '12px', 
                      border: '1px solid #f1ece6',
                      display: 'inline-flex',
                      flexDirection: 'column',
                      minWidth: '240px'
                  }} className="pickup-highlight-card">
                      <span style={{ 
                          fontSize: '0.7rem', 
                          color: '#999', 
                          display: 'block', 
                          textTransform: 'uppercase', 
                          fontWeight: 700, 
                          marginBottom: '4px', 
                          letterSpacing: '0.5px',
                          fontFamily: "'Inter', sans-serif"
                      }}>
                          {isEn ? "Departure / Pickup Point" : "Point de départ / Prise en charge"}
                      </span>
                      <span style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 700, 
                          color: 'var(--accent)',
                          fontFamily: "'Inter', sans-serif"
                      }}>
                          {local.pickup}
                      </span>
                  </div>
              </div>

              {/* Step 2: Drop-off */}
              <div style={{ position: 'relative' }}>
                  {/* Timeline indicator node */}
                  <div style={{
                      position: 'absolute',
                      left: '-43px',
                      top: '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      border: '4px solid var(--secondary)', // secondary blue color
                      boxShadow: '0 0 0 4px rgba(32, 47, 89, 0.15)',
                      zIndex: 2
                  }} />
                  
                  <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 700, 
                      color: 'var(--secondary)', 
                      marginBottom: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginTop: '-2px',
                      fontFamily: "'Inter', sans-serif"
                  }}>
                      {transText.dropoffLocation}
                  </h4>
                  <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#666', 
                      lineHeight: '1.6', 
                      margin: '0 0 12px 0', 
                      maxWidth: '650px',
                      fontFamily: "'Inter', sans-serif"
                  }}>
                      {local.capacityText}
                  </p>
                  
                  <div style={{ 
                      backgroundColor: '#f1f5f9', // light slate grey background
                      padding: '14px 18px', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0',
                      display: 'inline-flex',
                      flexDirection: 'column',
                      minWidth: '240px',
                      position: 'relative'
                  }} className="dropoff-highlight-card">
                      <span style={{ 
                          fontSize: '0.7rem', 
                          color: '#94a3b8', 
                          display: 'block', 
                          textTransform: 'uppercase', 
                          fontWeight: 700, 
                          marginBottom: '4px', 
                          letterSpacing: '0.5px',
                          fontFamily: "'Inter', sans-serif"
                      }}>
                          {isEn ? "Destination / Drop-off Point" : "Destination / Point d'arrivée"}
                      </span>
                      <span style={{ 
                          fontSize: '0.95rem', 
                          fontWeight: 700, 
                          color: 'var(--accent)', 
                          marginBottom: '10px',
                          fontFamily: "'Inter', sans-serif"
                      }}>
                          {local.dropoff}
                      </span>
                      <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.dropoff)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                              fontSize: '0.8rem',
                              color: 'var(--primary)',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'color 0.2s',
                              width: 'fit-content'
                          }}
                          className="maps-link-hover"
                      >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                              <line x1="9" y1="3" x2="9" y2="18" />
                              <line x1="15" y1="6" x2="15" y2="21" />
                          </svg>
                          {transText.openMaps}
                      </a>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

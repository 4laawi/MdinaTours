import React from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferDestinationInfo(props: any) {
  const { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, travelers, setTravelers, travelDate, setTravelDate, pickupTime, setPickupTime, isModalOpen, setIsModalOpen, custName, setCustName, custEmail, setCustEmail, custPhone, setCustPhone, custMessage, setCustMessage, isSubmitting, setIsSubmitting, successMessage, setSuccessMessage, errorMessage, setErrorMessage, searchState, setSearchState, showBookingCTAs, setShowBookingCTAs, optionsRef, handleSearchClick, isCalendarOpen, setIsCalendarOpen, isTravelersOpen, setIsTravelersOpen, calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, getDaysInMonth, getFirstDayOfMonth, handlePrevMonth, handleNextMonth, handleDateSelect, formatReadableDate, monthNamesEn, monthNamesFr, weekdayNamesEn, weekdayNamesFr, renderMonth, handleOpenModal, handleSubmit, selectedTier, setSelectedTier, isTimePickerOpen, setIsTimePickerOpen, timePickerRef, getTierLabel, getTierVehicleInfo, getUrgencyDetails, getCancellationDeadline, getWhatsAppUrlForTier, handleShare, timeSlots, currentPrice, urgency, isPast, trans, language } = props;

  return (
    <>
      {/* About the Destination Section */}
      {local.aboutDestination && (
          <div style={{ padding: '0px' }} className="about-destination-section">
              <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: 'var(--secondary)', 
                  marginBottom: '16px', 
                  fontFamily: "var(--font-poppins), sans-serif", 
                  letterSpacing: '0.3px', 
                  minHeight: '1.2em' 
              }}>
                  {transText.aboutDest}: {local.aboutDestination.title}
              </h2>
              <p style={{ 
                  fontSize: '1.02rem', 
                  fontWeight: 400, 
                  color: '#555', 
                  lineHeight: 1.8, 
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif"
              }}>
                  {local.aboutDestination.content}
              </p>
              
              {local.popularDropOffs && local.popularDropOffs.length > 0 && (
                   <div style={{ marginTop: '20px' }}>
                       <h4 style={{ 
                           fontSize: '0.95rem', 
                           fontWeight: 700, 
                           color: 'var(--secondary)', 
                           marginBottom: '14px',
                           fontFamily: "'Inter', sans-serif",
                           letterSpacing: '0.2px'
                       }}>
                           {transText.popularDropoffs}
                       </h4>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="dropoffs-tags-container">
                           {local.popularDropOffs.map((loc: string, idx: number) => {
                               // Choose icon dynamically based on name matches
                               let icon = "📍";
                               const lowerLoc = loc.toLowerCase();
                               if (lowerLoc.includes("airport") || lowerLoc.includes("aéroport")) icon = "✈️";
                               else if (lowerLoc.includes("station") || lowerLoc.includes("gare")) icon = "🚉";
                               else if (lowerLoc.includes("hotel") || lowerLoc.includes("riad")) icon = "🏨";
                               else if (lowerLoc.includes("center") || lowerLoc.includes("centre")) icon = "🏢";

                               return (
                                   <div key={idx} style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: '8px',
                                       padding: '8px 14px',
                                       borderRadius: '20px',
                                       backgroundColor: '#ffffff',
                                       border: '1px solid #eef2f6',
                                       fontSize: '0.85rem',
                                       color: 'var(--accent)',
                                       fontWeight: 500,
                                       boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                                       fontFamily: "'Inter', sans-serif"
                                   }} className="dropoff-tag">
                                       <span>{icon}</span>
                                       <span>{loc}</span>
                                   </div>
                               );
                           })}
                       </div>
                   </div>
              )}
          </div>
      )}

      {/* Travel Tips */}
      {local.travelTips && local.travelTips.length > 0 && (
          <div style={{ padding: '0px' }} className="travel-tips-section">
              <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: 'var(--secondary)', 
                  marginBottom: '20px', 
                  fontFamily: "var(--font-poppins), sans-serif", 
                  letterSpacing: '0.3px', 
                  minHeight: '1.2em' 
              }}>
                  {transText.travelTips}
              </h2>
              <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '20px' 
              }} className="tips-grid">
                  {local.travelTips.map((tip: any, idx: number) => (
                      <div key={idx} style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                      }} className="tip-card-item">
                          <h4 style={{ 
                              margin: 0, 
                              fontSize: '1.02rem', 
                              color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', 
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontFamily: "var(--font-poppins), sans-serif"
                          }}>
                              <span>💡</span>
                              <span>{tip.title}</span>
                          </h4>
                          <p style={{ 
                              margin: 0, 
                              fontSize: '0.88rem', 
                              color: 'var(--text)', 
                              lineHeight: 1.6,
                              fontWeight: 400,
                              fontFamily: "var(--font-poppins), sans-serif"
                          }}>
                              {tip.content}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </>
  );
}

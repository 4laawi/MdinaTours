import React from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferVehicleTiers(props: any) {
  const { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, travelers, setTravelers, travelDate, setTravelDate, pickupTime, setPickupTime, isModalOpen, setIsModalOpen, custName, setCustName, custEmail, setCustEmail, custPhone, setCustPhone, custMessage, setCustMessage, isSubmitting, setIsSubmitting, successMessage, setSuccessMessage, errorMessage, setErrorMessage, searchState, setSearchState, showBookingCTAs, setShowBookingCTAs, optionsRef, handleSearchClick, isCalendarOpen, setIsCalendarOpen, isTravelersOpen, setIsTravelersOpen, calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, getDaysInMonth, getFirstDayOfMonth, handlePrevMonth, handleNextMonth, handleDateSelect, formatReadableDate, monthNamesEn, monthNamesFr, weekdayNamesEn, weekdayNamesFr, renderMonth, handleOpenModal, handleSubmit, selectedTier, setSelectedTier, isTimePickerOpen, setIsTimePickerOpen, timePickerRef, getTierLabel, getTierVehicleInfo, getUrgencyDetails, getCancellationDeadline, getWhatsAppUrlForTier, handleShare, timeSlots, currentPrice, urgency, isPast, trans, language } = props;

  return (
    <>
{/* Interactive Tiers Option Accordions / Skeleton Loader */}
                            <div 
                                ref={optionsRef}
                                style={{
                                    animation: 'fadeIn 0.5s ease-out forwards',
                                    scrollMarginTop: '120px'
                                }}
                            >
                                <h2 style={{ 
                                    fontSize: '22px', 
                                    fontWeight: 600, 
                                    color: 'var(--secondary)', 
                                    marginBottom: '20px', 
                                    fontFamily: "var(--font-poppins), sans-serif", 
                                    letterSpacing: '0.2px',
                                    lineHeight: '1.2',
                                    minHeight: '1.2em' 
                                }}>
                                    {searchState === 'searching' 
                                        ? (isEn ? "Checking Availability..." : "Vérification de la disponibilité...") 
                                        : searchState === 'initial'
                                            ? (isEn ? "Pricing Tiers" : "Grille tarifaire")
                                            : transText.selectOptions
                                    }
                                </h2>
                            
                            {searchState === 'searching' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[1, 2, 3].map((i) => (
                                        <div 
                                            key={i} 
                                            style={{
                                                border: '1px solid #dddddd',
                                                borderRadius: '14px',
                                                backgroundColor: '#ffffff',
                                                boxShadow: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '15px'
                                            }}
                                            className="skeleton-pulse vehicle-tier-card"
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: '15px' }}>
                                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
                                                    {/* Radio indicator skeleton */}
                                                    <div style={{
                                                        width: '22px',
                                                        height: '22px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#e2e8f0',
                                                        flexShrink: 0,
                                                        marginTop: '3px'
                                                    }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                                        <div style={{
                                                            width: '40%',
                                                            height: '18px',
                                                            backgroundColor: '#e2e8f0',
                                                            borderRadius: '4px'
                                                        }} />
                                                        <div style={{
                                                            width: '70%',
                                                            height: '14px',
                                                            backgroundColor: '#e2e8f0',
                                                            borderRadius: '4px'
                                                        }} />
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', width: '80px', flexShrink: 0 }}>
                                                    <div style={{
                                                        width: '100%',
                                                        height: '24px',
                                                        backgroundColor: '#e2e8f0',
                                                        borderRadius: '4px'
                                                    }} />
                                                    <div style={{
                                                        width: '60%',
                                                        height: '12px',
                                                        backgroundColor: '#e2e8f0',
                                                        borderRadius: '4px'
                                                    }} />
                                                </div>
                                            </div>

                                            {/* Expanded skeleton area for the first card to prevent CLS when search state resolves */}
                                            {i === 1 && (
                                                <div style={{
                                                    borderTop: '1px solid #e2e8f0',
                                                    paddingTop: '20px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '16px',
                                                    width: '100%'
                                                }}>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                                        <div style={{ width: '140px', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
                                                        <div style={{ width: '60px', height: '28px', backgroundColor: '#e2e8f0', borderRadius: '14px' }} />
                                                    </div>
                                                    <div style={{ width: '160px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginTop: '4px' }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : searchState === 'initial' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {Object.entries(trans.prices)
                                      .filter(([tierLimitStr]) => Number(tierLimitStr) !== 4)
                                      .map(([tierLimitStr, price]) => {
                                        const tierLimit = Number(tierLimitStr);
                                        const displayLimit = tierLimit === 7 ? 8 : tierLimit;
                                        
                                        return (
                                            <div 
                                                key={tierLimit} 
                                                style={{
                                                    border: '1px solid #cbd5e1',
                                                    borderRadius: '14px',
                                                    backgroundColor: '#ffffff',
                                                    boxShadow: 'none'
                                                }}
                                                className="vehicle-tier-card"
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                                        {/* Checkmark icon for static display */}
                                                        <div style={{
                                                            width: '22px',
                                                            height: '22px',
                                                            borderRadius: '50%',
                                                            border: '2px solid var(--primary)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0,
                                                            marginTop: '3px',
                                                            backgroundColor: 'var(--primary)'
                                                        }}>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0', color: '#222222', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                {getTierLabel(tierLimit)}
                                                            </h3>
                                                            <p style={{ fontSize: '14px', color: '#6a6a6a', margin: 0, lineHeight: 1.4, fontFamily: "var(--font-poppins), sans-serif", fontWeight: 400 }}>
                                                                {getTierVehicleInfo(tierLimit)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <span style={{ fontSize: '20px', fontWeight: 600, color: '#222222', fontFamily: "var(--font-poppins), sans-serif" }}>€{String(price)}</span>
                                                        <span style={{ fontSize: '12px', color: '#6a6a6a', display: 'block', marginTop: '2px', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                            {isEn ? `per group (up to ${displayLimit})` : `par groupe (jusqu'à ${displayLimit})`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                      })}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {Object.entries(trans.prices)
                                      .filter(([tierLimitStr]) => Number(tierLimitStr) !== 4)
                                      .map(([tierLimitStr, price]) => {
                                        const tierLimit = Number(tierLimitStr);
                                        const isSelected = selectedTier === tierLimit;
                                        const displayLimit = tierLimit === 7 ? 8 : tierLimit;
                                        
                                        return (
                                            <div 
                                                key={tierLimit} 
                                                style={{
                                                    border: isSelected ? '2px solid var(--secondary)' : '1px solid #dddddd',
                                                    borderRadius: '14px',
                                                    backgroundColor: '#ffffff',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: isSelected ? 'rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px, rgba(0, 0, 0, 0.1) 0px 4px 8px' : 'none'
                                                }}
                                                className="vehicle-tier-card"
                                                onClick={() => setSelectedTier(tierLimit)}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                                        {/* Radio Button Indicator */}
                                                        <div style={{
                                                            width: '22px',
                                                            height: '22px',
                                                            borderRadius: '50%',
                                                            border: isSelected ? '2px solid var(--secondary)' : '2px solid #cbd5e1',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0,
                                                            marginTop: '3px',
                                                            backgroundColor: '#fff',
                                                            transition: 'all 0.15s'
                                                        }}>
                                                            {isSelected && (
                                                                <div style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'var(--secondary)'
                                                                }} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0', color: '#222222', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                {getTierLabel(tierLimit)}
                                                            </h3>
                                                            <p style={{ fontSize: '14px', color: '#6a6a6a', margin: 0, lineHeight: 1.4, fontFamily: "var(--font-poppins), sans-serif", fontWeight: 400 }}>
                                                                {getTierVehicleInfo(tierLimit)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <span style={{ fontSize: '20px', fontWeight: 600, color: '#222222', fontFamily: "var(--font-poppins), sans-serif" }}>€{String(price)}</span>
                                                        <span style={{ fontSize: '12px', color: '#6a6a6a', display: 'block', marginTop: '2px', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                            {isEn ? `per group (up to ${displayLimit})` : `par groupe (jusqu'à ${displayLimit})`}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Expanded Detailed Area when selected */}
                                                {isSelected && (
                                                    <div 
                                                        style={{ 
                                                            marginTop: '20px', 
                                                            borderTop: '1px solid #ebebeb', 
                                                            paddingTop: '20px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            animation: 'fadeIn 0.25s' 
                                                        }}
                                                        onClick={(e) => e.stopPropagation()} // Prevent card deselecting
                                                    >
                                                        {/* Urgency Alert Message */}
                                                        {urgency && urgency.urgencyText && (
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                backgroundColor: '#ffffff',
                                                                border: urgency.isClosed 
                                                                    ? '1px solid #ffccd3' 
                                                                    : (urgency.isUrgent && !urgency.isPlentyOfTime ? '1px solid #fde68a' : '1px solid #ebebeb'),
                                                                borderRadius: '12px',
                                                                padding: '12px 16px',
                                                                marginBottom: '16px',
                                                                width: '100%',
                                                                boxSizing: 'border-box'
                                                            }}>
                                                                <span style={{ fontSize: '16px', flexShrink: 0 }}>
                                                                    {urgency.isClosed ? '⚠️' : '🔥'}
                                                                </span>
                                                                <span style={{ 
                                                                    fontSize: '13.5px', 
                                                                    fontWeight: 500, 
                                                                    color: urgency.isClosed ? '#c13515' : '#222222',
                                                                    lineHeight: '1.45',
                                                                    fontFamily: "var(--font-poppins), sans-serif"
                                                                }}>
                                                                    {urgency.urgencyText}
                                                                </span>
                                                            </div>
                                                        )}
 
                                                        {/* Free Cancellation and Reserve Now & Pay Later Perks Box */}
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '12px',
                                                            backgroundColor: '#ffffff',
                                                            border: '1px solid #ebebeb',
                                                            borderRadius: '12px',
                                                            padding: '16px 20px',
                                                            marginBottom: '20px',
                                                            width: '100%',
                                                            boxSizing: 'border-box'
                                                        }}>
                                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                <span style={{ fontSize: '13.5px', color: '#222222', fontWeight: 500, lineHeight: '1.4', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                    {isEn ? "Free cancellation — reserve now, pay nothing" : "Annulation gratuite — réservez maintenant, ne payez rien"}
                                                                </span>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                <span style={{ fontSize: '13.5px', color: '#222222', fontWeight: 500, lineHeight: '1.4', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                    {isEn ? "Reserve Now & Pay Later to secure your spot" : "Réservez maintenant & payez plus tard pour garantir votre place"}
                                                                </span>
                                                            </div>
                                                        </div>
 
                                                        {/* Time selection popover */}
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                                            <span style={{ fontSize: '14px', color: '#6a6a6a', fontWeight: 500, fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                {transText.timeSlot}
                                                            </span>
                                                            <div style={{ position: 'relative' }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        border: isTimePickerOpen ? '2px solid #222222' : '1px solid #cbd5e1',
                                                                        borderRadius: '8px',
                                                                        padding: '8px 14px',
                                                                        fontSize: '0.88rem',
                                                                        fontWeight: 600,
                                                                        backgroundColor: '#ffffff',
                                                                        color: '#222222',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s',
                                                                        fontFamily: "var(--font-poppins), sans-serif"
                                                                    }}
                                                                >
                                                                    <span>
                                                                        {pickupTime}
                                                                    </span>
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px', transition: 'transform 0.2s', transform: isTimePickerOpen ? 'rotate(180deg)' : 'rotate(0)', color: '#222222' }}>
                                                                        <polyline points="6 9 12 15 18 9" />
                                                                    </svg>
                                                                </button>

                                                                {isTimePickerOpen && (() => {
                                                                    const [hourPart, minutePart] = pickupTime.includes(':') ? pickupTime.split(':') : ["10", "00"];
                                                                    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
                                                                    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
                                                                    
                                                                    return (
                                                                        <div className="option-time-picker-dropdown">
                                                                            <div>
                                                                                <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#222222', marginBottom: '8px', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                                    {isEn ? "Popular Times" : "Heures populaires"}
                                                                                </h5>
                                                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                                                                    {timeSlots.map((time: string) => (
                                                                                        <button
                                                                                            key={time}
                                                                                            onClick={() => {
                                                                                                setPickupTime(time);
                                                                                                setIsTimePickerOpen(false);
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '8px 10px',
                                                                                                borderRadius: '8px',
                                                                                                border: pickupTime === time ? '2px solid #222222' : '1px solid #dddddd',
                                                                                                backgroundColor: '#ffffff',
                                                                                                color: '#222222',
                                                                                                fontSize: '0.82rem',
                                                                                                fontWeight: pickupTime === time ? 700 : 500,
                                                                                                cursor: 'pointer',
                                                                                                textAlign: 'center',
                                                                                                fontFamily: "var(--font-poppins), sans-serif",
                                                                                                transition: 'all 0.15s'
                                                                                            }}
                                                                                        >
                                                                                            {time}
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                                                                                <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#222222', marginBottom: '8px', fontFamily: "var(--font-poppins), sans-serif" }}>
                                                                                    {isEn ? "Custom Time" : "Heure personnalisée"}
                                                                                </h5>
                                                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                                                        <label style={{ fontSize: '10px', fontWeight: 600, color: '#6a6a6a', fontFamily: "var(--font-poppins), sans-serif", marginBottom: '3px' }}>Hours</label>
                                                                                        <select
                                                                                            value={hourPart}
                                                                                            onChange={(e) => {
                                                                                                  setPickupTime(`${e.target.value}:${minutePart}`);
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '8px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid #cbd5e1',
                                                                                                fontSize: '0.86rem',
                                                                                                backgroundColor: '#fff',
                                                                                                color: '#222',
                                                                                                fontFamily: "var(--font-poppins), sans-serif"
                                                                                            }}
                                                                                        >
                                                                                            {hours.map(h => (
                                                                                                <option key={h} value={h}>{h}</option>
                                                                                            ))}
                                                                                        </select>
                                                                                    </div>
                                                                                    <span style={{ fontWeight: 700, color: '#666', marginTop: '12px' }}>:</span>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                                                        <label style={{ fontSize: '10px', fontWeight: 600, color: '#6a6a6a', fontFamily: "var(--font-poppins), sans-serif", marginBottom: '3px' }}>Mins</label>
                                                                                        <select
                                                                                            value={minutePart}
                                                                                            onChange={(e) => {
                                                                                                setPickupTime(`${hourPart}:${e.target.value}`);
                                                                                            }}
                                                                                            style={{
                                                                                                padding: '8px',
                                                                                                borderRadius: '8px',
                                                                                                border: '1px solid #cbd5e1',
                                                                                                fontSize: '0.86rem',
                                                                                                backgroundColor: '#fff',
                                                                                                color: '#222',
                                                                                                fontFamily: "var(--font-poppins), sans-serif"
                                                                                            }}
                                                                                        >
                                                                                            {minutes.map(m => (
                                                                                                <option key={m} value={m}>{m}</option>
                                                                                            ))}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </div>

                                                        {/* WhatsApp and Email quick book in card */}
                                                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                                            <a 
                                                                href={getWhatsAppUrlForTier(tierLimit)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    backgroundColor: '#25D366',
                                                                    color: '#fff',
                                                                    padding: '14px 24px',
                                                                    borderRadius: '8px',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    textDecoration: 'none',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '10px',
                                                                    transition: 'all 0.2s ease',
                                                                    textAlign: 'center',
                                                                    fontFamily: "var(--font-poppins), sans-serif"
                                                                }}
                                                                className="whatsapp-tier-btn"
                                                            >
                                                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.927-3.561 7.928-7.928a7.89 7.89 0 0 0-2.325-5.695M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-4.934c-.198-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.448.099-.133.197-.513.646-.629.775-.115.13-.232.146-.43.047-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.09-.088.198-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.448-1.078-.613-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                                                </svg>
                                                                {transText.reserveWhatsApp}
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={handleOpenModal}
                                                                style={{
                                                                    border: '1px solid var(--secondary)',
                                                                    color: 'var(--secondary)',
                                                                    backgroundColor: '#ffffff',
                                                                    padding: '14px 24px',
                                                                    borderRadius: '8px',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '10px',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease',
                                                                    width: '100%',
                                                                    fontFamily: "var(--font-poppins), sans-serif"
                                                                }}
                                                                className="airbnb-outline-btn"
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                                </svg>
                                                                {isEn ? "Book via Email" : "Réserver par Email"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
    </>
  );
}

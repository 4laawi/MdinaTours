import React, { useState } from 'react';
import Image from 'next/image';
import { LOCATIONS, getRoutePrice } from '@/lib/transferLocations';
import LocationCombobox from '@/components/LocationCombobox';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferBookingWidget(props: any) {
  const { 
    isEn, 
    local, 
    transText, 
    travelers, 
    setTravelers, 
    travelDate, 
    pickupTime, 
    setPickupTime, 
    searchState, 
    showBookingCTAs, 
    setShowBookingCTAs, 
    handleSearchClick, 
    isCalendarOpen, 
    setIsCalendarOpen, 
    isTravelersOpen, 
    setIsTravelersOpen, 
    calendarMonth, 
    calendarYear, 
    handlePrevMonth, 
    handleNextMonth, 
    formatReadableDate, 
    renderMonth, 
    handleOpenModal, 
    selectedTier, 
    setSelectedTier, 
    getWhatsAppUrlForTier, 
    currentPrice, 
    urgency, 
    isPast, 
    language,
    hasPendingChanges,
    searchedTravelers,
    searchedTravelDate,
    searchedPickupTime,
    getTierLabel
  } = props;

  const [isEditingRoute, setIsEditingRoute] = useState(false);
  const [activePickup, setActivePickup] = useState<string>(local?.pickup || "Rabat");
  const [activeDropoff, setActiveDropoff] = useState<string>(local?.dropoff || "Casablanca");
  const [isCustomPickup, setIsCustomPickup] = useState(false);
  const [isCustomDropoff, setIsCustomDropoff] = useState(false);

  const isRouteChanged = activePickup !== local?.pickup || activeDropoff !== local?.dropoff || isCustomPickup || isCustomDropoff;
  const calculatedPrice = (isCustomPickup || isCustomDropoff) ? null : getRoutePrice(activePickup, activeDropoff, selectedTier || 3);
  const displayPrice = isRouteChanged ? calculatedPrice : currentPrice;

  const getCustomizedWhatsAppUrl = () => {
    if (!isRouteChanged) return getWhatsAppUrlForTier(selectedTier);
    const tierLabel = getTierLabel ? getTierLabel(selectedTier) : `${travelers} Passengers`;
    const priceText = displayPrice ? `€${displayPrice}` : 'Custom Quote Request';
    const msg = isEn
        ? `Hello Mdina Tours,\nI would like to book a private transfer.\n\n• Route: ${activePickup} ⇄ ${activeDropoff}\n• Date: ${searchedTravelDate || travelDate}\n• Time: ${searchedPickupTime || pickupTime}\n• Travelers: ${searchedTravelers || travelers} (${tierLabel})\n• Price: ${priceText}\n\nPlease let me know availability.`
        : `Bonjour Mdina Tours,\nJe souhaite réserver un transfert privé.\n\n• Trajet : ${activePickup} ⇄ ${activeDropoff}\n• Date : ${searchedTravelDate || travelDate}\n• Heure : ${searchedPickupTime || pickupTime}\n• Voyageurs : ${searchedTravelers || travelers} (${tierLabel})\n• Tarif : ${priceText}\n\nMerci de me confirmer la disponibilité.`;
    return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
          width: '100%',
          boxSizing: 'border-box',
          padding: '20px',
          position: 'relative',
          zIndex: 10,
          overflow: 'visible'
      }} className="booking-widget-sidebar">
          
          {/* Route Header with Change Route Link */}
          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f1f5f9'
          }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  <span>📍</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {activePickup} ⇄ {activeDropoff}
                  </span>
              </div>
              <button
                  type="button"
                  onClick={() => setIsEditingRoute(!isEditingRoute)}
                  style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary, #dc834e)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                  }}
              >
                  ✏️ {isEn ? "Change route" : "Modifier"}
              </button>
          </div>

          {/* Expandable Route Editor with Comboboxes */}
          {isEditingRoute && (
              <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '16px',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  zIndex: 20,
                  overflow: 'visible'
              }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                          {isEn ? "Pickup Location" : "Lieu de départ"}
                      </label>
                      <LocationCombobox
                          value={activePickup}
                          onChange={(val, isCustom) => {
                              setActivePickup(val);
                              setIsCustomPickup(!!isCustom);
                          }}
                          language={language as 'en' | 'fr'}
                          placeholder={isEn ? "Pickup location" : "Lieu de départ"}
                      />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                          {isEn ? "Drop-off Location" : "Lieu d'arrivée"}
                      </label>
                      <LocationCombobox
                          value={activeDropoff}
                          onChange={(val, isCustom) => {
                              setActiveDropoff(val);
                              setIsCustomDropoff(!!isCustom);
                          }}
                          language={language as 'en' | 'fr'}
                          placeholder={isEn ? "Drop-off location" : "Lieu d'arrivée"}
                      />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                          type="button"
                          onClick={() => setIsEditingRoute(false)}
                          style={{
                              flex: 1,
                              backgroundColor: 'var(--secondary, #063c33)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '10px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                          }}
                      >
                          {isEn ? "Done" : "Valider"}
                      </button>
                  </div>
              </div>
          )}

          {/* Top trust bar */}
          <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '10px', 
              backgroundColor: '#EAF3DE', 
              borderRadius: '8px', 
              padding: '12px 14px', 
              marginBottom: '20px' 
          }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 11 2 2 4-4" />
              </svg>
              <span style={{ fontSize: '12.5px', color: '#3B6D11', fontWeight: 500, lineHeight: '1.4' }}>
                  {isEn ? "No payment now — you pay on the day, cash, card, or transfer." : "Aucun paiement requis maintenant — vous payez le jour même en espèces, carte ou virement."}
              </span>
          </div>
          
          {/* Price */}
          <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '36px', fontWeight: 500, color: 'var(--accent)', lineHeight: '1.2' }}>
                  {displayPrice !== null ? `€${displayPrice}` : (isEn ? "Custom Quote" : "Devis Sur-Mesure")}
              </div>
              <div style={{ color: '#717171', fontSize: '13px', marginTop: '4px' }}>
                  {displayPrice !== null 
                    ? (isEn ? "Fixed price — no surprises, no hidden fees." : "Tarif fixe — pas de surprise, pas de frais cachés.")
                    : (isEn ? "Tailored route estimate — fast response via WhatsApp." : "Devis sur-mesure — réponse rapide par WhatsApp.")}
              </div>
          </div>

          {/* Combined Date & Travelers Input (Airbnb Style) */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
              {/* Backdrop for Calendar click-outside */}
              {isCalendarOpen && (
                  <div 
                      className="popover-backdrop"
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998 }} 
                      onClick={() => setIsCalendarOpen(false)} 
                  />
              )}
              {/* Backdrop for Travelers click-outside */}
              {isTravelersOpen && (
                  <div 
                      className="popover-backdrop"
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998 }} 
                      onClick={() => setIsTravelersOpen(false)} 
                  />
              )}

              <div style={{
                  display: 'flex',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
              }} className="combined-selectors-box">
                  {/* Date Selector Half */}
                  <div 
                      onClick={() => {
                          setIsCalendarOpen(!isCalendarOpen);
                          setIsTravelersOpen(false);
                      }}
                      style={{
                          flex: 1.1,
                          padding: '12px 14px',
                          borderRight: '1px solid #cbd5e1',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          userSelect: 'none'
                      }}
                  >
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', letterSpacing: '0.05em', marginBottom: '2px' }}>
                          {isEn ? "Date" : "Date"}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>
                              {formatReadableDate(travelDate, language)}
                          </span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5" style={{ marginLeft: '4px', flexShrink: 0 }}>
                              <path d="m6 9 6 6 6-6"/>
                          </svg>
                      </div>
                  </div>

                  {/* Travelers Selector Half */}
                  <div 
                      onClick={() => {
                          setIsTravelersOpen(!isTravelersOpen);
                          setIsCalendarOpen(false);
                      }}
                      style={{
                          flex: 0.9,
                          padding: '12px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          userSelect: 'none'
                      }}
                  >
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', letterSpacing: '0.05em', marginBottom: '2px' }}>
                          {isEn ? "Traveler" : "Voyageurs"}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                  <circle cx="12" cy="7" r="4"/>
                              </svg>
                              <span style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>
                                  {travelers}
                              </span>
                          </div>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2.5" style={{ marginLeft: '4px', flexShrink: 0 }}>
                              <path d="m6 9 6 6 6-6"/>
                          </svg>
                      </div>
                  </div>
              </div>

              {/* Calendar Popover */}
              {isCalendarOpen && (
                  <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                      border: '1px solid #cbd5e1',
                      padding: '28px 32px',
                      zIndex: 9999,
                      width: '640px',
                      boxSizing: 'border-box',
                      marginTop: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                  }} className="calendar-popover">
                      <div className="mobile-sheet-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{isEn ? "Select date" : "Sélectionner la date"}</h3>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(false); }} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                      </div>
                      <div style={{ display: 'flex', gap: '36px' }} className="calendar-months-container">
                          {/* Left Month Calendar */}
                          {renderMonth(calendarYear, calendarMonth, true)}
                          
                          {/* Right Month Calendar */}
                          {renderMonth(
                              calendarMonth === 11 ? calendarYear + 1 : calendarYear,
                              (calendarMonth + 1) % 12,
                              false
                          )}
                      </div>
                  </div>
              )}

              {/* Travelers Popover */}
              {isTravelersOpen && (
                  <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      border: '1px solid #cbd5e1',
                      padding: '8px',
                      zIndex: 9999,
                      width: '220px',
                      boxSizing: 'border-box',
                      marginTop: '8px',
                      maxHeight: 'none',
                      overflowY: 'auto'
                  }} className="travelers-popover">
                      <div className="mobile-sheet-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{isEn ? "Select travelers" : "Sélectionner les voyageurs"}</h3>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setIsTravelersOpen(false); }} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                      </div>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <div 
                              key={num}
                              onClick={() => {
                                  setTravelers(num);
                                  setIsTravelersOpen(false);
                              }}
                              style={{
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: travelers === num ? 700 : 500,
                                  backgroundColor: travelers === num ? '#f1f5f9' : 'transparent',
                                  color: travelers === num ? 'var(--secondary)' : '#222',
                                  transition: 'background-color 0.2s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                              }}
                              className="traveler-option"
                          >
                              <span>
                                  {num} {num === 1 ? (isEn ? 'traveler' : 'voyageur') : (isEn ? 'travelers' : 'voyageurs')}
                              </span>
                              {travelers === num && (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: 'var(--primary)' }}>
                                      <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                              )}
                          </div>
                      ))}
                  </div>
              )}
          </div>


          {/* Availability Booking Flow Buttons (Airbnb Style) */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
              {searchState === 'initial' && (
                  <button
                      type="button"
                      onClick={handleSearchClick}
                      style={{
                          border: '2px solid #222',
                          color: '#222',
                          backgroundColor: '#fff',
                          padding: '14px 20px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          fontWeight: 700,
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          width: '100%',
                          boxSizing: 'border-box'
                      }}
                      className="search-sidebar-btn"
                  >
                      {isEn ? "Search" : "Rechercher"}
                  </button>
              )}

              {searchState === 'searching' && (
                  <button
                      type="button"
                      disabled
                      style={{
                          border: '2px solid #666',
                          color: '#666',
                          backgroundColor: '#f1f5f9',
                          padding: '14px 20px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          fontWeight: 700,
                          fontSize: '16px',
                          width: '100%',
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'not-allowed'
                      }}
                  >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-spin">
                          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
                      </svg>
                      {isEn ? "Searching..." : "Recherche en cours..."}
                  </button>
              )}

              {searchState === 'searched' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', animation: 'fadeIn 0.3s ease-out' }}>
                      {/* "Check Availability" button or CTAs */}
                      {!showBookingCTAs ? (
                          <button
                              type="button"
                              onClick={() => setShowBookingCTAs(true)}
                              style={{
                                  backgroundColor: 'var(--primary)',
                                  color: '#fff',
                                  padding: '14px 20px',
                                  borderRadius: '8px',
                                  textAlign: 'center',
                                  fontWeight: 700,
                                  fontSize: '16px',
                                  cursor: 'pointer',
                                  border: 'none',
                                  transition: 'all 0.2s',
                                  width: '100%',
                                  boxSizing: 'border-box',
                                  boxShadow: '0 4px 12px rgba(220, 131, 78, 0.25)'
                              }}
                              className="check-availability-btn"
                          >
                              {isEn ? "Check Availability" : "Vérifier la disponibilité"}
                          </button>
                      ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', animation: 'fadeIn 0.3s ease-out' }}>
                              {/* If inputs changed, show 'Update Search' button here */}
                              {hasPendingChanges && (
                                  <button
                                      type="button"
                                      onClick={handleSearchClick}
                                      style={{
                                          backgroundColor: 'var(--secondary)',
                                          color: '#fff',
                                          padding: '14px 20px',
                                          borderRadius: '8px',
                                          textAlign: 'center',
                                          fontWeight: 700,
                                          fontSize: '16px',
                                          cursor: 'pointer',
                                          border: 'none',
                                          transition: 'all 0.2s',
                                          width: '100%',
                                          boxSizing: 'border-box',
                                          marginBottom: '6px'
                                      }}
                                      className="update-search-btn"
                                  >
                                      {isEn ? "Update search" : "Mettre à jour la recherche"}
                                  </button>
                              )}
                              {/* Primary CTA (WhatsApp) */}
                              <a 
                                  href={getCustomizedWhatsAppUrl()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                      backgroundColor: '#25D366',
                                      color: '#fff',
                                      padding: '14px 20px',
                                      borderRadius: '8px',
                                      textAlign: 'center',
                                      fontWeight: 600,
                                      fontSize: '15px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '10px',
                                      textDecoration: 'none',
                                      width: '100%',
                                      boxSizing: 'border-box',
                                      transition: 'background-color 0.2s, transform 0.2s'
                                  }}
                                  className="whatsapp-sidebar-btn"
                              >
                                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.927-3.561 7.928-7.928a7.89 7.89 0 0 0-2.325-5.695M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-4.934c-.198-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.448.099-.133.197-.513.646-.629.775-.115.13-.232.146-.43.047-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.09-.088.198-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.448-1.078-.613-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                  </svg>
                                  {transText.reserveWhatsApp}
                              </a>

                              {/* Secondary CTA (Email) */}
                              <button
                                  onClick={handleOpenModal}
                                  style={{
                                      border: '1.5px solid #222222',
                                      color: '#222222',
                                      backgroundColor: 'transparent',
                                      padding: '14px 20px',
                                      borderRadius: '8px',
                                      textAlign: 'center',
                                      fontWeight: 600,
                                      fontSize: '15px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '8px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s',
                                      width: '100%',
                                      boxSizing: 'border-box'
                                  }}
                                  className="booking-request-btn"
                              >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <rect width="20" height="16" x="2" y="4" rx="2" />
                                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                  </svg>
                                  {isEn ? "Book via Email" : "Réserver par Email"}
                              </button>
                          </div>
                      )}
                      {/* Perks Box (Viator / Airbnb Style) */}
                      <div style={{
                          backgroundColor: 'var(--cream)',
                          borderRadius: '12px',
                          padding: '16px',
                          marginTop: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          border: '1px solid var(--border)'
                      }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <div style={{
                                  backgroundColor: 'var(--primary)',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '2px'
                              }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                                      <polyline points="20 6 9 17 4 12" />
                                  </svg>
                              </div>
                              <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, lineHeight: '1.4' }}>
                                  {urgency.isNonRefundable ? (
                                      <>
                                          <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{isEn ? "No prepayment needed" : "Aucun prépaiement"}</span> {isEn ? "— Pay cash or card to your driver. Free cancellation or changes anytime before departure." : "— Payez en espèces ou par carte au chauffeur. Annulation ou modification gratuite à tout moment avant le départ."}
                                      </>
                                  ) : (
                                      <>
                                          <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{isEn ? "Free cancellation" : "Annulation gratuite"}</span> {isEn ? "up to 24 hours before the experience starts (local time)" : "jusqu'à 24 heures avant le début de l'expérience (heure locale)"}
                                      </>
                                  )}
                              </span>
                          </div>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <div style={{
                                  backgroundColor: 'var(--primary)',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '2px'
                              }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                                      <polyline points="20 6 9 17 4 12" />
                                  </svg>
                              </div>
                              <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500, lineHeight: '1.4' }}>
                                  <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{isEn ? "Reserve Now and Pay Later" : "Réservez maintenant et payez plus tard"}</span> – {isEn ? "Secure your spot while staying flexible" : "Garantissez votre place tout en restant flexible"}
                              </span>
                          </div>
                      </div>
                  </div>
              )}
          </div>

      </div>

      {/* Book Ahead Info Card */}
      <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          width: '100%',
          boxSizing: 'border-box'
      }} className="book-ahead-card">
          <div style={{
              backgroundColor: '#FFF3EC',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
          }}>
              <img
                  src="/img/fire.webp"
                  alt=""
                  aria-hidden="true"
                  width="32"
                  height="32"
              />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#222' }}>
                  {isEn ? "Book ahead!" : "Réservez à l'avance !"}
              </span>
              <span style={{ fontSize: '13px', color: '#666', fontWeight: 500, lineHeight: '1.4' }}>
                  {isEn ? "On average, this is booked 30 days in advance." : "En moyenne, ce trajet est réservé 30 jours à l'avance."}
              </span>
          </div>
      </div>
    </div>
  );
}

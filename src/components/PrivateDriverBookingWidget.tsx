"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TbBus, TbCarSuvFilled } from "react-icons/tb";
import { FaCarSide, FaVanShuttle } from "react-icons/fa6";

interface VehicleOption {
    nameEn: string;
    nameFr: string;
    spec: string;
    capacityEn: string;
    capacityFr: string;
    luggage: string;
    pricePerDay: number;
    price8Days?: number;
    pricePerHour: number;
    image: string;
}

interface PrivateDriverBookingWidgetProps {
    language: 'en' | 'fr';
    defaultCity: string;
    defaultDays?: number;
    is8DaysPackage?: boolean;
}

const VEHICLES: VehicleOption[] = [
    {
        nameEn: "Comfort SUV",
        nameFr: "SUV Grand Confort",
        spec: "Toyota Prado / Volkswagen Touareg",
        capacityEn: "1-4 passengers",
        capacityFr: "1-4 passagers",
        luggage: "4 Bags",
        pricePerDay: 132,
        price8Days: 936,
        pricePerHour: 15,
        image: "/img/Morocco-trip-tour-hero08.webp"
    },
    {
        nameEn: "VIP Minivan",
        nameFr: "Minivan VIP",
        spec: "Mercedes-Benz Vito / V-Class",
        capacityEn: "1-8 passengers",
        capacityFr: "1-8 passagers",
        luggage: "8 Bags",
        pricePerDay: 144,
        price8Days: 1020,
        pricePerHour: 18,
        image: "/img2/private-vito-vans-3.webp"
    },
    {
        nameEn: "VIP Minibus",
        nameFr: "Minibus Executive Sprinter",
        spec: "Mercedes-Benz Sprinter",
        capacityEn: "8-16 passengers",
        capacityFr: "8-16 passagers",
        luggage: "16 Bags",
        pricePerDay: 216,
        price8Days: 1536,
        pricePerHour: 25,
        image: "/b-roll/3-Mercedes-vito-airoport.jpg"
    }
];


export default function PrivateDriverBookingWidget({
    language,
    defaultCity,
    defaultDays = 1,
    is8DaysPackage = false
}: PrivateDriverBookingWidgetProps) {
    const isEn = language === 'en';

    // State inputs
    const [startCity, setStartCity] = useState("");
    const [hireType, setHireType] = useState<'hourly' | 'daily'>('daily');
    const [travelPlan, setTravelPlan] = useState("");
    const [duration, setDuration] = useState(defaultDays);
    const [travelDate, setTravelDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(1); // default VIP Minivan
    
    // Progressive modal state variables
    const [activeModalType, setActiveModalType] = useState<'whatsapp' | 'email' | null>(null);
    const [progressiveStep, setProgressiveStep] = useState<'route-selection' | 'travel-plan' | 'contact-details' | 'success' | null>(null);
    const [routeLocationType, setRouteLocationType] = useState<'same' | 'multi' | null>(null);

    // Modal states
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Hydrate from localStorage on client-side mount
        const storedCity = localStorage.getItem('mdina_tours_private_driver_start_city');
        if (storedCity) {
            setStartCity(storedCity);
        }
    }, []);

    useEffect(() => {
        const handleSetCity = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            if (customEvent.detail) {
                setStartCity(customEvent.detail);
                localStorage.setItem('mdina_tours_private_driver_start_city', customEvent.detail);
                const bookingElement = document.getElementById('booking');
                if (bookingElement) {
                    bookingElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        window.addEventListener('set-starting-city', handleSetCity as EventListener);
        return () => {
            window.removeEventListener('set-starting-city', handleSetCity as EventListener);
        };
    }, []);

    const vehicle = VEHICLES[selectedVehicleIdx];
    const vehicleName = isEn ? vehicle.nameEn : vehicle.nameFr;
    const capacityText = isEn ? vehicle.capacityEn : vehicle.capacityFr;

    // Calculate Price dynamically
    const calculatePrice = () => {
        if (hireType === 'hourly') {
            return vehicle.pricePerHour * duration;
        }
        if (is8DaysPackage && duration === 8) {
            return vehicle.price8Days || (vehicle.pricePerDay * 8);
        }
        // Apply slight discount for longer durations (> 4 days)
        let rate = vehicle.pricePerDay;
        if (duration >= 5) {
            rate = Math.round(rate * 0.95); // 5% discount
        }
        return rate * duration;
    };

    const currentPrice = calculatePrice();

    const getVehicleIcon = (idx: number) => {
        switch (idx) {
            case 0: return <TbCarSuvFilled style={{ fontSize: '20px' }} />;
            case 1: return <FaVanShuttle style={{ fontSize: '18px' }} />;
            case 2: return <TbBus style={{ fontSize: '20px' }} />;
            default: return null;
        }
    };

    // WhatsApp Message Builder
    const getWhatsAppUrlFor = (
        hType: 'hourly' | 'daily', 
        rType: 'same' | 'multi' | null, 
        tPlan: string
    ) => {
        let msg = '';
        if (hType === 'hourly') {
            msg = isEn
                ? `Hello Mdina Tours,\nI would like to book a private driver service (Hourly Hire).\n\n• Start City: ${startCity}\n• Date: ${travelDate}\n• Duration: ${duration} Hour(s)\n• Vehicle: ${vehicleName} (${capacityText})`
                : `Bonjour Mdina Tours,\nJe souhaite réserver un service de chauffeur privé (Location Horaire).\n\n• Ville de départ: ${startCity}\n• Date: ${travelDate}\n• Durée: ${duration} Heure(s)\n• Véhicule: ${vehicleName} (${capacityText})`;
            msg += isEn ? `\n• Est. Price: €${currentPrice}` : `\n• Tarif Est.: €${currentPrice}`;
        } else {
            // Daily hire
            msg = isEn
                ? `Hello Mdina Tours,\nI would like to book a private driver service (Daily Hire).\n\n• Start City: ${startCity}\n• Date: ${travelDate}\n• Duration: ${duration} Day(s)\n• Vehicle: ${vehicleName} (${capacityText})\n• Travel Type: ${rType === 'same' ? 'Same city & nearby areas' : 'Multiple cities'}`
                : `Bonjour Mdina Tours,\nJe souhaite réserver un service de chauffeur privé (Location Journalière).\n\n• Ville de départ: ${startCity}\n• Date: ${travelDate}\n• Durée: ${duration} Jour(s)\n• Véhicule: ${vehicleName} (${capacityText})\n• Type de voyage: ${rType === 'same' ? 'Même ville & environs' : 'Plusieurs villes'}`;
            
            if (rType === 'multi' && tPlan) {
                msg += isEn ? `\n• Travel Plan: ${tPlan}` : `\n• Itinéraire: ${tPlan}`;
                msg += isEn ? `\n• Est. Price: To be confirmed` : `\n• Tarif Est.: À confirmer`;
            } else {
                msg += isEn ? `\n• Est. Price: €${currentPrice}` : `\n• Tarif Est.: €${currentPrice}`;
            }
        }
        
        msg += isEn ? `\n\nPlease let me know availability.` : `\n\nMerci de me confirmer la disponibilité.`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
    };

    const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!startCity) {
            alert(isEn ? "Please select a starting city first." : "Veuillez d'abord choisir une ville de départ.");
            e.preventDefault();
            return;
        }
        if (hireType === 'daily') {
            e.preventDefault();
            setActiveModalType('whatsapp');
            setProgressiveStep('route-selection');
            setRouteLocationType(null);
            setTravelPlan('');
            setSuccessMessage('');
            setErrorMessage('');
        }
    };

    const handleEmailClick = () => {
        if (!startCity) {
            alert(isEn ? "Please select a starting city first." : "Veuillez d'abord choisir une ville de départ.");
            return;
        }
        setActiveModalType('email');
        if (hireType === 'daily') {
            setProgressiveStep('route-selection');
            setRouteLocationType(null);
            setTravelPlan('');
        } else {
            setProgressiveStep('contact-details');
        }
        setSuccessMessage('');
        setErrorMessage('');
        setCustName('');
        setCustEmail('');
        setCustPhone('');
    };

    const renderModalContent = () => {
        const isWhatsApp = activeModalType === 'whatsapp';

        if (progressiveStep === 'route-selection') {
            return (
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--secondary)',
                        marginBottom: '12px',
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.2
                    }}>
                        {isEn ? "Tell us your travel plan" : "Planifiez votre itinéraire"}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
                        {isEn 
                            ? "Will you stay in the same area or visit multiple cities?" 
                            : "Allez-vous rester dans la même zone ou visiter plusieurs villes ?"}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        <div 
                            onClick={() => setRouteLocationType('same')}
                            style={{
                                border: routeLocationType === 'same' ? '2.5px solid var(--primary)' : '1.5px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                backgroundColor: routeLocationType === 'same' ? 'rgba(220, 131, 78, 0.03)' : '#fff',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: routeLocationType === 'same' ? '5px solid var(--primary)' : '1.5px solid #cbd5e1',
                                backgroundColor: '#fff',
                                flexShrink: 0,
                                boxSizing: 'border-box'
                            }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)' }}>
                                    {isEn ? "Yes, same city & nearby areas" : "Oui, même ville & environs"}
                                </span>
                                <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                                    {isEn ? "Chauffeur services within starting city" : "Service de chauffeur dans la ville de départ"}
                                </span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setRouteLocationType('multi')}
                            style={{
                                border: routeLocationType === 'multi' ? '2.5px solid var(--primary)' : '1.5px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '14px 16px',
                                cursor: 'pointer',
                                backgroundColor: routeLocationType === 'multi' ? 'rgba(220, 131, 78, 0.03)' : '#fff',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: routeLocationType === 'multi' ? '5px solid var(--primary)' : '1.5px solid #cbd5e1',
                                backgroundColor: '#fff',
                                flexShrink: 0,
                                boxSizing: 'border-box'
                            }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)' }}>
                                    {isEn ? "No, I'll visit multiple cities" : "Non, je visiterai plusieurs villes"}
                                </span>
                                <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                                    {isEn ? "Road trips & custom multi-city itineraries" : "Road trips & itinéraires multi-villes sur mesure"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (!routeLocationType) {
                                alert(isEn ? "Please select an option to continue." : "Veuillez sélectionner une option pour continuer.");
                                return;
                            }
                            if (routeLocationType === 'multi') {
                                setProgressiveStep('travel-plan');
                            } else {
                                if (isWhatsApp) {
                                    setProgressiveStep('success');
                                    const url = getWhatsAppUrlFor('daily', 'same', '');
                                    setTimeout(() => {
                                        window.open(url, '_blank');
                                        setActiveModalType(null);
                                    }, 2000);
                                } else {
                                    setProgressiveStep('contact-details');
                                }
                            }
                        }}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            width: '100%',
                            padding: '14px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background-color 0.2s',
                            fontFamily: 'inherit'
                        }}
                    >
                        {isEn ? "Continue" : "Continuer"}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            );
        }

        if (progressiveStep === 'travel-plan') {
            return (
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--secondary)',
                        marginBottom: '12px',
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.2
                    }}>
                        {isEn ? "Tell us your travel plan" : "Itinéraire du voyage"}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
                        {isEn 
                            ? "Where are you planning to go?" 
                            : "Où prévoyez-vous d'aller ?"}
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                        <textarea
                            required
                            value={travelPlan}
                            onChange={(e) => setTravelPlan(e.target.value)}
                            placeholder={isEn ? "e.g. Marrakech → Atlas Mountains → Essaouira → Casablanca" : "ex: Marrakech → Atlas → Essaouira → Casablanca"}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '10px',
                                border: '1.5px solid #cbd5e1',
                                fontSize: '14px',
                                outline: 'none',
                                color: '#222',
                                backgroundColor: '#fff',
                                resize: 'vertical',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit',
                                lineHeight: 1.5
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (!travelPlan.trim()) {
                                alert(isEn ? "Please describe your travel plan to continue." : "Veuillez décrire votre itinéraire pour continuer.");
                                return;
                            }
                            if (isWhatsApp) {
                                setProgressiveStep('success');
                                const url = getWhatsAppUrlFor('daily', 'multi', travelPlan);
                                setTimeout(() => {
                                    window.open(url, '_blank');
                                    setActiveModalType(null);
                                }, 2000);
                            } else {
                                setProgressiveStep('contact-details');
                            }
                        }}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: '#fff',
                            width: '100%',
                            padding: '14px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background-color 0.2s',
                            fontFamily: 'inherit'
                        }}
                    >
                        {isWhatsApp ? (isEn ? "Continue →" : "Continuer →") : (isEn ? "Continue" : "Continuer")}
                        {!isWhatsApp && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        )}
                    </button>
                </div>
            );
        }

        if (progressiveStep === 'contact-details') {
            const handleEmailFormSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSuccessMessage('');
                setErrorMessage('');

                let emailMsg = '';
                if (hireType === 'hourly') {
                    emailMsg = isEn
                        ? `Requesting Private Driver (Hourly Hire):\n• Start City: ${startCity}\n• Travel Date: ${travelDate}\n• Hours: ${duration}\n• Vehicle Tier: ${vehicleName}\n• Est. Price: €${currentPrice}`
                        : `Demande de Chauffeur Privé (Location Horaire):\n• Ville de départ: ${startCity}\n• Date du voyage: ${travelDate}\n• Heures: ${duration}\n• Véhicule: ${vehicleName}\n• Tarif Est.: €${currentPrice}`;
                } else {
                    emailMsg = isEn
                        ? `Requesting Private Driver (Daily Hire):\n• Start City: ${startCity}\n• Travel Date: ${travelDate}\n• Days: ${duration}\n• Vehicle Tier: ${vehicleName}\n• Travel Type: ${routeLocationType === 'same' ? 'Same city & nearby areas' : 'Multiple cities'}`
                        : `Demande de Chauffeur Privé (Location Journalière):\n• Ville de départ: ${startCity}\n• Date du voyage: ${travelDate}\n• Jours: ${duration}\n• Véhicule: ${vehicleName}\n• Type de voyage: ${routeLocationType === 'same' ? 'Même ville & environs' : 'Plusieurs villes'}`;
                    
                    if (routeLocationType === 'multi' && travelPlan) {
                        emailMsg += isEn ? `\n• Travel Plan: ${travelPlan}\n• Est. Price: To be confirmed` : `\n• Itinéraire: ${travelPlan}\n• Tarif Est.: À confirmer`;
                    } else {
                        emailMsg += isEn ? `\n• Est. Price: €${currentPrice}` : `\n• Tarif Est.: €${currentPrice}`;
                    }
                }

                try {
                    const res = await fetch('/api/send-booking', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: custName,
                            email: custEmail,
                            phone: custPhone,
                            message: emailMsg,
                            routeName: isEn ? "Private Driver Booking" : "Réservation Chauffeur Privé"
                        })
                    });

                    const data = await res.json();
                    if (res.ok && data.success) {
                        setSuccessMessage(isEn ? "Request sent! We will text reply as soon as possible." : "Demande envoyée ! Nous vous répondrons par SMS/e-mail dès que possible.");
                        setCustName('');
                        setCustEmail('');
                        setCustPhone('');
                        setProgressiveStep('success');
                        setTimeout(() => {
                            setActiveModalType(null);
                            setSuccessMessage('');
                        }, 3500);
                    } else {
                        setErrorMessage(data.error || (isEn ? "Something went wrong. Please try again." : "Une erreur est survenue. Veuillez réessayer."));
                    }
                } catch (err) {
                    setErrorMessage(isEn ? "Network error. Please try again." : "Erreur réseau. Veuillez réessayer.");
                } finally {
                    setIsSubmitting(false);
                }
            };

            return (
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--secondary)',
                        marginBottom: '10px',
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.1
                    }}>
                        {isEn ? "Request to Book" : "Demande de Réservation"}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
                        {isEn 
                            ? "Almost there! Fill out your details below and our team will confirm your chauffeur service shortly." 
                            : "Presque terminé ! Remplissez vos coordonnées et notre équipe confirmera votre chauffeur sous peu."}
                    </p>

                    <form onSubmit={handleEmailFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {errorMessage && (
                            <div style={{
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#991b1b',
                                padding: '12px',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: 500
                            }}>
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '8px', letterSpacing: '0.5px' }}>
                                {isEn ? "Full Name *" : "Nom complet *"}
                            </label>
                            <input
                                type="text"
                                required
                                value={custName}
                                onChange={(e) => setCustName(e.target.value)}
                                placeholder={isEn ? "e.g. John Doe" : "ex: Jean Dupont"}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    backgroundColor: '#f8fafc',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '8px', letterSpacing: '0.5px' }}>
                                {isEn ? "Email Address *" : "Adresse e-mail *"}
                            </label>
                            <input
                                type="email"
                                required
                                value={custEmail}
                                onChange={(e) => setCustEmail(e.target.value)}
                                placeholder={isEn ? "your@email.com" : "votre@email.com"}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    backgroundColor: '#f8fafc',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '8px', letterSpacing: '0.5px' }}>
                                {isEn ? "Phone Number (Optional)" : "Téléphone (Optionnel)"}
                            </label>
                            <input
                                type="tel"
                                value={custPhone}
                                onChange={(e) => setCustPhone(e.target.value)}
                                placeholder={isEn ? "+1 234 567 890" : "+33 6 12 34 56 78"}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    backgroundColor: '#f8fafc',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: '#fff',
                                padding: '14px',
                                borderRadius: '10px',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                border: 'none',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                transition: 'background-color 0.2s',
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                fontFamily: 'inherit'
                            }}
                        >
                            {isSubmitting 
                                ? (isEn ? "Sending..." : "Envoi...") 
                                : (isEn ? "Confirm Request" : "Confirmer la demande")}
                            {!isSubmitting && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            );
        }

        if (progressiveStep === 'success') {
            return (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                    <h3 style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: 'var(--secondary)',
                        marginBottom: '12px',
                        fontFamily: "'Cormorant Garamond', serif"
                    }}>
                        {isEn ? "Under Review" : "En cours d'examen"}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0px' }}>
                        {isWhatsApp ? (
                            isEn 
                                ? "Redirecting you to WhatsApp... We will text reply as soon as possible." 
                                : "Redirection vers WhatsApp... Nous vous répondrons dès que possible."
                        ) : (
                            successMessage || (isEn 
                                ? "We have received your booking details. We will review and text reply as soon as possible."
                                : "Nous avons bien reçu votre demande. Nous l'examinerons et vous répondrons dès que possible.")
                        )}
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
            <style>{`
                .booking-date-duration-row {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 10px;
                }
                @media (max-width: 500px) {
                    .booking-date-duration-row {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                }
                .booking-select-input {
                    width: 100%;
                    height: 46px;
                    box-sizing: border-box;
                    min-width: 0;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23717171' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 5 3 3 3-3'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    background-size: 14px;
                    padding: 0 36px 0 12px !important;
                }
                .booking-date-input {
                    width: 100%;
                    height: 46px;
                    box-sizing: border-box;
                    min-width: 0;
                    padding: 0 12px !important;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    line-height: 43px;
                }
            `}</style>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                width: '100%',
                padding: '24px',
                boxSizing: 'border-box'
            }}>
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
                        {isEn ? "Free Reservation — No credit card required. Pay on arrival." : "Réservation gratuite — Sans carte bancaire. Payez à l'arrivée."}
                    </span>
                </div>

                {/* Form selectors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Hire Type Selector */}
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', marginBottom: '6px' }}>
                            {isEn ? "Hire Type" : "Type de location"}
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            backgroundColor: '#f8fafc',
                            padding: '4px',
                            borderRadius: '10px',
                            border: '1.5px solid #cbd5e1'
                        }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setHireType('hourly');
                                    setDuration(4);
                                }}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    backgroundColor: hireType === 'hourly' ? '#fff' : 'transparent',
                                    color: hireType === 'hourly' ? 'var(--secondary)' : '#64748b',
                                    boxShadow: hireType === 'hourly' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {isEn ? "Hourly" : "Horaire"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setHireType('daily');
                                    setDuration(1);
                                }}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    backgroundColor: hireType === 'daily' ? '#fff' : 'transparent',
                                    color: hireType === 'daily' ? 'var(--secondary)' : '#64748b',
                                    boxShadow: hireType === 'daily' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {isEn ? "Daily" : "Journalier"}
                            </button>
                        </div>
                    </div>

                    {/* Start City */}
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', marginBottom: '6px' }}>
                            {isEn ? "Starting City" : "Ville de départ"}
                        </label>
                        <select 
                            value={startCity}
                            onChange={(e) => {
                                const city = e.target.value;
                                setStartCity(city);
                                if (city) {
                                    localStorage.setItem('mdina_tours_private_driver_start_city', city);
                                } else {
                                    localStorage.removeItem('mdina_tours_private_driver_start_city');
                                }
                            }}
                            className="booking-select-input"
                            style={{
                                borderRadius: '10px',
                                border: '1.5px solid #cbd5e1',
                                fontSize: '14px',
                                outline: 'none',
                                color: startCity ? '#222' : '#717171',
                                backgroundColor: '#fff',
                                fontWeight: 600
                            }}
                        >
                            <option value="" disabled hidden>{isEn ? "choose city" : "choisir la ville"}</option>
                            <option value="Agadir">Agadir</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Chefchaouen">Chefchaouen</option>
                            <option value="Dakhla">Dakhla</option>
                            <option value="Essaouira">Essaouira</option>
                            <option value="Fes">Fes / Fès</option>
                            <option value="Ifrane">Ifrane</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Meknes">Meknes</option>
                            <option value="Merzouga">Merzouga</option>
                            <option value="Ouarzazate">Ouarzazate</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Tangier">Tangier / Tanger</option>
                            <option value="Tetouan">Tetouan</option>
                            <option value="Other">{isEn ? "Other / Custom" : "Autre / Sur mesure"}</option>
                        </select>
                    </div>

                    {/* Date and Duration Row */}
                    <div className="booking-date-duration-row">
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', marginBottom: '6px' }}>
                                {isEn ? "Start Date" : "Date de début"}
                            </label>
                            <input 
                                type="date"
                                value={travelDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setTravelDate(e.target.value)}
                                className="booking-date-input"
                                style={{
                                    borderRadius: '10px',
                                    border: '1.5px solid #cbd5e1',
                                    fontSize: '14px',
                                    outline: 'none',
                                    color: '#222',
                                    fontWeight: 600,
                                    backgroundColor: '#fff'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', marginBottom: '6px' }}>
                                {hireType === 'hourly' ? (isEn ? "Hours" : "Heures") : (isEn ? "Duration" : "Durée")}
                            </label>
                            <select 
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                className="booking-select-input"
                                style={{
                                    borderRadius: '10px',
                                    border: '1.5px solid #cbd5e1',
                                    fontSize: '14px',
                                    outline: 'none',
                                    color: '#222',
                                    backgroundColor: '#fff',
                                    fontWeight: 600
                                }}
                            >
                                {hireType === 'hourly' ? (
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hour => (
                                        <option key={hour} value={hour}>
                                            {hour} {hour === 1 ? (isEn ? "Hour" : "Heure") : (isEn ? "Hours" : "Heures")}
                                        </option>
                                    ))
                                ) : (
                                    Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>
                                            {day} {day === 1 ? (isEn ? "Day" : "Jour") : (isEn ? "Days" : "Jours")}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Animated expandable content container */}
                <div style={{
                    maxHeight: startCity ? '2000px' : '0px',
                    opacity: startCity ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: startCity ? 'auto' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginTop: startCity ? '16px' : '0px'
                }}>
                    {/* Price Display */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 600, color: '#717171' }}>
                                {isEn ? "From" : "Dès"}
                            </span>
                            <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--accent)', lineHeight: '1.2' }}>
                                €{currentPrice}
                            </span>
                            <span style={{ fontSize: '14px', color: '#717171', fontWeight: 500 }}>
                                {hireType === 'hourly' 
                                    ? (isEn ? `for ${duration} Hour(s)` : `pour ${duration} Heure(s)`)
                                    : (isEn ? `for ${duration} Day(s)` : `pour ${duration} Jour(s)`)}
                            </span>
                        </div>
                        <div style={{ color: '#717171', fontSize: '13px', marginTop: '4px' }}>
                            {hireType === 'hourly'
                                ? (isEn ? "Includes vehicle, professional driver, fuel & insurance." : "Comprend véhicule, chauffeur professionnel, carburant & assurance.")
                                : (isEn ? "Includes vehicle, driver dispo, tolls, fuel & driver boarding." : "Comprend véhicule, disposition chauffeur, péages, carburant & hébergement chauffeur.")}
                        </div>
                    </div>

                    {/* Vehicle Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#717171', marginBottom: '6px' }}>
                            {isEn ? "Vehicle Comfort Tier" : "Type de Véhicule"}
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {VEHICLES.map((v, index) => {
                                const isSelected = selectedVehicleIdx === index;
                                const name = isEn ? v.nameEn : v.nameFr;
                                const rate = hireType === 'hourly' ? v.pricePerHour : (is8DaysPackage && duration === 8 ? v.price8Days : v.pricePerDay);
                                const capacity = isEn ? v.capacityEn : v.capacityFr;

                                return (
                                    <div 
                                        key={index}
                                        onClick={() => setSelectedVehicleIdx(index)}
                                        style={{
                                            border: isSelected ? '2px solid var(--primary)' : '1px solid #cbd5e1',
                                            borderRadius: '10px',
                                            padding: '6px 10px',
                                            cursor: 'pointer',
                                            backgroundColor: isSelected ? 'rgba(220, 131, 78, 0.03)' : '#fff',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '8px',
                                                backgroundColor: isSelected ? 'rgba(220, 131, 78, 0.1)' : '#f8fafc',
                                                color: isSelected ? 'var(--primary)' : '#64748b',
                                                flexShrink: 0
                                            }}>
                                                {getVehicleIcon(index)}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--secondary)' }}>
                                                    {name}
                                                </div>
                                                <div style={{ fontSize: '10.5px', color: '#777', marginTop: '1px' }}>
                                                    {capacity}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>
                                                {isEn ? "From " : "Dès "}€{rate}
                                            </div>
                                            <div style={{ fontSize: '9.5px', color: '#777' }}>
                                                {hireType === 'hourly' ? (isEn ? "/ hr" : "/ h") : (isEn ? "/ day" : "/ jour")}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a 
                            href={hireType === 'hourly' ? getWhatsAppUrlFor('hourly', null, '') : '#'}
                            onClick={handleWhatsAppClick}
                            target={hireType === 'hourly' ? "_blank" : undefined}
                            rel={hireType === 'hourly' ? "noopener noreferrer" : undefined}
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
                                transition: 'background-color 0.2s, transform 0.2s'
                            }}
                        >
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.927-3.561 7.928-7.928a7.89 7.89 0 0 0-2.325-5.695M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-4.934c-.198-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.448.099-.133.197-.513.646-.629.775-.115.13-.232.146-.43.047-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.09-.088.198-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.448-1.078-.613-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                            </svg>
                            {isEn ? "Book via WhatsApp" : "Réserver via WhatsApp"}
                        </a>

                        <button
                            type="button"
                            onClick={handleEmailClick}
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
                                boxSizing: 'border-box',
                                fontFamily: 'inherit'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            {isEn ? "Request Booking by Email" : "Réserver par Email"}
                        </button>
                    </div>

                    {/* Perks Box (Viator / Airbnb Style) */}
                    {!startCity && (
                        <div style={{
                            backgroundColor: '#FAF8F5',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            border: '1px solid #e2e8f0',
                            marginTop: '20px'
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
                                    <span style={{ textDecoration: 'underline', fontWeight: 700 }}>
                                        {isEn ? "No prepayment needed" : "Aucun prépaiement"}
                                    </span>
                                    <>
                                        {" "}
                                        {isEn 
                                            ? "— Pay cash or card to your driver. Free cancellation or changes anytime before departure." 
                                            : "— Payez en espèces ou par carte au chauffeur. Annulation ou modification gratuite à tout moment avant le départ."}
                                    </>
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
                                    <span style={{ textDecoration: 'underline', fontWeight: 700 }}>
                                        {isEn ? "Reserve Now and Pay Later" : "Réservez maintenant et payez plus tard"}
                                    </span>
                                    <>
                                        {" "}
                                        – {isEn ? "Secure your spot while staying flexible" : "Garantissez votre place tout en restant flexible"}
                                    </>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Book Ahead Info Card */}
            {!startCity && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    backgroundColor: '#fff',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                    width: '100%',
                    padding: '16px',
                    boxSizing: 'border-box'
                }}>
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
                            {isEn ? "Highly Popular Service!" : "Service Très Demandé !"}
                        </span>
                        <span style={{ fontSize: '13px', color: '#666', fontWeight: 500, lineHeight: '1.4' }}>
                            {isEn ? "Secure your private driver early. Standard reservation lead time is 2-4 weeks." : "Réservez votre chauffeur privé à l'avance. Délai moyen constaté de 2 à 4 semaines."}
                        </span>
                    </div>
                </div>
            )}

            {/* Progressive Modal */}
            {activeModalType !== null && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(6px)',
                    padding: '20px'
                }} onClick={() => setActiveModalType(null)}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '460px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                        overflow: 'hidden',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: '32px' }}>
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setActiveModalType(null)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {renderModalContent()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

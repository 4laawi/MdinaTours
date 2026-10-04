"use client";

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

export type ServiceType = 'hourly' | 'full-day' | 'multi-day';
export type VehicleType = 'comfort' | 'vito';

interface PrivateDriverBookingWidgetProps {
    language: Language;
    defaultCity?: string;
    defaultDays?: number;
    is8DaysPackage?: boolean;
}

const MOROCCO_CITIES = [
    { value: "Casablanca", en: "Casablanca", fr: "Casablanca", es: "Casablanca" },
    { value: "Marrakech", en: "Marrakech", fr: "Marrakech", es: "Marrakech" },
    { value: "Rabat", en: "Rabat", fr: "Rabat", es: "Rabat" },
    { value: "Tangier", en: "Tangier", fr: "Tanger", es: "Tánger" },
    { value: "Fes", en: "Fes", fr: "Fès", es: "Fez" },
    { value: "Agadir", en: "Agadir", fr: "Agadir", es: "Agadir" },
    { value: "Chefchaouen", en: "Chefchaouen", fr: "Chefchaouen", es: "Chefchaouen" },
    { value: "Essaouira", en: "Essaouira", fr: "Essaouira", es: "Esauira" },
    { value: "Ouarzazate", en: "Ouarzazate", fr: "Ouarzazate", es: "Uarzazat" },
    { value: "Merzouga", en: "Merzouga / Desert", fr: "Merzouga / Désert", es: "Merzouga / Desierto" },
    { value: "Meknes", en: "Meknes", fr: "Meknès", es: "Mequinez" },
    { value: "Salé", en: "Salé", fr: "Salé", es: "Salé" },
    { value: "Tetouan", en: "Tetouan", fr: "Tétouan", es: "Tetuán" },
    { value: "Other", en: "Other / Custom", fr: "Autre / Sur mesure", es: "Otra ciudad / A medida" }
];

export default function PrivateDriverBookingWidget({
    language,
    defaultCity = "",
    defaultDays = 1,
    is8DaysPackage = false
}: PrivateDriverBookingWidgetProps) {
    const isEn = language === 'en';
    const isEs = language === 'es';

    const isCityKnown = Boolean(defaultCity && defaultCity.toLowerCase() !== "morocco");

    // Service Tab State
    const [serviceType, setServiceType] = useState<ServiceType>(
        is8DaysPackage ? 'multi-day' : 'hourly'
    );
    const [startCity, setStartCity] = useState(defaultCity && defaultCity.toLowerCase() !== "morocco" ? defaultCity : "Casablanca");
    
    // Progressive Disclosure State (Stage 1 vs Stage 2)
    const [showVehicles, setShowVehicles] = useState(false);

    // Vehicle Selection: 'comfort' (€25/h) or 'vito' (€35/h)
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('comfort');

    // Dates
    const [travelDate, setTravelDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });

    const [endDate, setEndDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + (is8DaysPackage ? 8 : (defaultDays > 1 ? defaultDays : 5)));
        return d.toISOString().split('T')[0];
    });

    const [hours, setHours] = useState(4);
    const [passengers, setPassengers] = useState(2);
    const [routePlan, setRoutePlan] = useState("");
    const [itinerary, setItinerary] = useState("");

    // Email Modal State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custNotes, setCustNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const storedCity = localStorage.getItem('mdina_tours_private_driver_start_city');
        if (storedCity && !isCityKnown) {
            setStartCity(storedCity);
        }
    }, [isCityKnown]);

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

    // Pricing rates (EUR)
    const hourlyRate = selectedVehicle === 'vito' ? 35 : 25;
    const estimatedTotal = hourlyRate * hours;

    // Formatting date helper
    const formatDateFriendly = (dateStr: string) => {
        if (!dateStr) return '';
        try {
            const dateObj = new Date(dateStr + 'T00:00:00');
            const locale = isEn ? 'en-US' : (isEs ? 'es-ES' : 'fr-FR');
            return dateObj.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const formatDateShort = (dateStr: string) => {
        if (!dateStr) return '';
        try {
            const dateObj = new Date(dateStr + 'T00:00:00');
            const locale = isEn ? 'en-US' : (isEs ? 'es-ES' : 'fr-FR');
            return dateObj.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
        } catch {
            return dateStr;
        }
    };

    // Dictionary
    const t = {
        tabHourly: isEn ? "Hourly" : (isEs ? "Por Horas" : "À l'Heure"),
        tabFullDay: isEn ? "Full Day" : (isEs ? "Día Completo" : "Journée"),
        tabMultiDay: isEn ? "Multi-Day" : (isEs ? "Varios Días" : "Multi-Jours"),
        fromPrefix: isEn ? "From" : (isEs ? "Desde" : "À partir de"),
        perHour: isEn ? "/ hour" : (isEs ? "/ hora" : "/ heure"),
        customQuoteHeader: isEn ? "Custom Quote" : (isEs ? "Presupuesto a Medida" : "Devis sur Mesure"),
        customQuoteSub: isEn ? "Based on your itinerary" : (isEs ? "Según su itinerario" : "Selon votre itinéraire"),
        estimatedTotalLabel: isEn ? "Estimated total" : (isEs ? "Total estimado" : "Total estimé"),
        cityLabel: isEn ? "City" : (isEs ? "Ciudad" : "Ville"),
        dateLabel: isEn ? "Date" : (isEs ? "Fecha" : "Date"),
        startDateLabel: isEn ? "Start Date" : (isEs ? "Fecha Inicio" : "Date Début"),
        endDateLabel: isEn ? "End Date" : (isEs ? "Fecha Fin" : "Date Fin"),
        durationLabel: isEn ? "Duration" : (isEs ? "Duración" : "Durée"),
        passengersLabel: isEn ? "Passengers" : (isEs ? "Pasajeros" : "Passagers"),
        chooseRide: isEn ? "Choose your ride" : (isEs ? "Elija su vehículo" : "Choisissez votre véhicule"),
        comfortTitle: isEn ? "Comfort" : (isEs ? "Confort" : "Confort"),
        comfortDesc: isEn ? "Sedan or compact SUV" : (isEs ? "Sedán o SUV confortable" : "Berline ou SUV confortable"),
        vitoTitle: "Mercedes Vito",
        vitoDesc: isEn ? "Spacious premium van · Extra luggage & space" : (isEs ? "Van espaciosa premium · Espacio y confort" : "Van haut de gamme spacieux · Grand confort"),
        popularBadge: isEn ? "Popular" : (isEs ? "Popular" : "Populaire"),
        seeAvailableVehicles: isEn ? "See available vehicles" : (isEs ? "Ver vehículos disponibles" : "Voir les véhicules disponibles"),
        ctaReserveWhatsApp: isEn ? "Reserve on WhatsApp" : (isEs ? "Reservar por WhatsApp" : "Réserver sur WhatsApp"),
        ctaFullDay: isEn ? "Request a Quote" : (isEs ? "Solicitar Presupuesto" : "Demander un Devis"),
        ctaMultiDay: isEn ? "Send My Itinerary" : (isEs ? "Enviar mi Itinerario" : "Envoyer mon Itinéraire"),
        subCtaReassurance: isEn ? "No card required · Pay on the day" : (isEs ? "Sin tarjeta · Pague el día del viaje" : "Sans carte bancaire · Paiement sur place"),
        subCtaMultiDay: isEn ? "Continue on WhatsApp · Fast response" : (isEs ? "Continuar en WhatsApp · Respuesta rápida" : "Continuer sur WhatsApp · Réponse rapide"),
        reassurance1: isEn ? "Free cancellation up to 24 hours before pickup" : (isEs ? "Cancelación gratuita hasta 24 horas antes del viaje" : "Annulation gratuite jusqu'à 24h avant la prise en charge"),
        reassurance2: isEn ? "Pay on the day — cash or card" : (isEs ? "Pague el día del viaje — efectivo o tarjeta" : "Paiement le jour même — espèces ou carte"),
        secondaryEmailLink: isEn ? "Prefer email? Send inquiry →" : (isEs ? "¿Prefiere por email? Enviar consulta →" : "Vous préférez par e-mail ? Demander par e-mail →"),
        hourUnit: isEn ? "hours" : (isEs ? "horas" : "heures"),
        optionalPlacesLabel: isEn ? "Optional itinerary / places" : (isEs ? "Itinerario / lugares (Opcional)" : "Itinéraire / arrêts (Optionnel)"),
        optionalPlacesPlaceholder: isEn ? "e.g. City tour, Ourika Valley, restaurant stops" : (isEs ? "ej: Visita de la ciudad, Ourika, paradas..." : "ex : Visite de ville, Vallée de l'Ourika, arrêts..."),
        itineraryLabel: isEn ? "Itinerary / cities" : (isEs ? "Itinerario / ciudades" : "Itinéraire / villes"),
        itineraryPlaceholder: isEn ? "e.g. Casablanca → Chefchaouen → Fes → Merzouga → Marrakech" : (isEs ? "ej: Casablanca → Chefchaouen → Fez → Merzouga → Marrakech" : "ex : Casablanca → Chefchaouen → Fès → Merzouga → Marrakech"),
        modalTitle: isEn ? "Request Private Chauffeur" : (isEs ? "Solicitar Conductor Privado" : "Demande de Chauffeur Privé"),
        modalSubtitle: isEn ? "Enter your contact details and we'll reply promptly." : (isEs ? "Introduzca sus datos y le responderemos enseguida." : "Entrez vos coordonnées et nous vous répondrons rapidement."),
        nameLabel: isEn ? "Full Name *" : (isEs ? "Nombre Completo *" : "Nom Complet *"),
        emailLabel: isEn ? "Email Address *" : (isEs ? "Correo Electrónico *" : "Adresse E-mail *"),
        phoneLabel: isEn ? "Phone / WhatsApp" : (isEs ? "Teléfono / WhatsApp" : "Téléphone / WhatsApp"),
        notesLabel: isEn ? "Additional Notes" : (isEs ? "Notas Adicionales" : "Notes Additionnelles"),
        sendBtn: isEn ? "Submit Request" : (isEs ? "Enviar Solicitud" : "Envoyer la Demande"),
        sendingBtn: isEn ? "Submitting..." : (isEs ? "Enviando..." : "Envoi..."),
        modalSuccessTitle: isEn ? "Request Received!" : (isEs ? "¡Solicitud Recibida!" : "Demande Reçue !"),
        modalSuccessMsg: isEn ? "Thank you! We will get in touch with your quote shortly." : (isEs ? "¡Gracias! Nos pondremos en contacto muy pronto." : "Merci ! Nous vous contacterons très vite avec votre devis."),
        alertCity: isEn ? "Please select a starting city." : (isEs ? "Por favor elija una ciudad de salida." : "Veuillez choisir une ville de départ."),
        capacityWarningComfort: isEn
            ? "Comfort vehicles fit up to 4 guests. For 5–7 guests, please select Mercedes Vito."
            : (isEs ? "Vehículo Confort admite hasta 4 personas. Para 5–7 personas, elija Mercedes Vito." : "Le véhicule Confort accueille jusqu'à 4 passagers. Pour 5 à 7 passagers, choisissez le Mercedes Vito."),
        capacityWarningMinibus: isEn
            ? "For groups of 8+ guests, executive minibus transport is available. Contact us on WhatsApp."
            : (isEs ? "Para grupos de más de 7 personas, disponemos de minibús. Contáctenos por WhatsApp." : "Pour les groupes de plus de 7 passagers, des minibus sont disponibles. Contactez-nous sur WhatsApp.")
    };

    const vehicleNameFormatted = selectedVehicle === 'vito' ? 'Mercedes Vito' : 'Comfort';

    // WhatsApp Message Generator
    const getWhatsAppUrl = () => {
        const phoneNumber = "212724114775";
        let message = "";

        const friendlyDate = formatDateFriendly(travelDate);
        const friendlyEndDate = formatDateFriendly(endDate);
        const cityName = startCity || "Casablanca";

        if (serviceType === 'hourly') {
            if (isEs) {
                message = `Hola, me gustaría reservar un conductor privado en ${cityName}.\n\nFecha: ${friendlyDate}\nDuración: ${hours} ${hours === 1 ? 'hora' : 'horas'}\nPasajeros: ${passengers}\nVehículo: ${vehicleNameFormatted}\nPrecio estimado: ${estimatedTotal}€\n\nPor favor confirmen disponibilidad.`;
            } else if (!isEn) {
                message = `Bonjour, je souhaite réserver un chauffeur privé à ${cityName}.\n\nDate : ${friendlyDate}\nDurée : ${hours} ${hours === 1 ? 'heure' : 'heures'}\nPassagers : ${passengers}\nVéhicule : ${vehicleNameFormatted}\nPrix estimé : ${estimatedTotal}€\n\nMerci de me confirmer la disponibilité.`;
            } else {
                message = `Hi, I'd like to reserve a private driver in ${cityName}.\n\nDate: ${friendlyDate}\nDuration: ${hours} ${hours === 1 ? 'hour' : 'hours'}\nGuests: ${passengers}\nVehicle: ${vehicleNameFormatted}\nEstimated price: €${estimatedTotal}\n\nPlease confirm availability.`;
            }
        } else if (serviceType === 'full-day') {
            if (isEs) {
                message = `Hola, me gustaría reservar un conductor privado de día completo en ${cityName}.\n\nFecha: ${friendlyDate}\nDuración: Día completo\nPasajeros: ${passengers}\nVehículo: ${vehicleNameFormatted}${routePlan ? `\nItinerario previsto: ${routePlan}` : ''}\n\nPor favor confirmen disponibilidad y presupuesto.`;
            } else if (!isEn) {
                message = `Bonjour, je souhaite réserver un chauffeur privé pour la journée à ${cityName}.\n\nDate : ${friendlyDate}\nDurée : Journée complète\nPassagers : ${passengers}\nVéhicule : ${vehicleNameFormatted}${routePlan ? `\nItinéraire prévu : ${routePlan}` : ''}\n\nMerci de me confirmer la disponibilité et le tarif.`;
            } else {
                message = `Hi, I'd like to reserve a full-day private driver in ${cityName}.\n\nDate: ${friendlyDate}\nDuration: Full Day\nGuests: ${passengers}\nVehicle: ${vehicleNameFormatted}${routePlan ? `\nPlanned itinerary: ${routePlan}` : ''}\n\nPlease confirm availability and quote.`;
            }
        } else {
            // Multi-Day / Itinerary
            if (isEs) {
                message = `Hola, me gustaría reservar un conductor privado para un itinerario en Marruecos.\n\nCiudad de salida: ${cityName}\nFechas: ${friendlyDate} – ${friendlyEndDate}\nPasajeros: ${passengers}${itinerary ? `\nItinerario: ${itinerary}` : ''}\n\nPor favor confirmen disponibilidad y presupuesto.`;
            } else if (!isEn) {
                message = `Bonjour, je souhaite réserver un chauffeur privé pour un circuit au Maroc.\n\nVille de départ : ${cityName}\nDates : ${friendlyDate} au ${friendlyEndDate}\nPassagers : ${passengers}${itinerary ? `\nItinéraire : ${itinerary}` : ''}\n\nMerci de me confirmer la disponibilité et le devis.`;
            } else {
                message = `Hi, I'd like to reserve a private driver for a Morocco itinerary.\n\nStarting city: ${cityName}\nDates: ${friendlyDate} – ${friendlyEndDate}\nGuests: ${passengers}${itinerary ? `\nItinerary: ${itinerary}` : ''}\n\nPlease confirm availability and quote.`;
            }
        }

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    const handlePrimaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!startCity) {
            e.preventDefault();
            alert(t.alertCity);
            return;
        }
    };

    const handleEmailModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        const serviceTitle = serviceType === 'hourly' 
            ? `Private Driver (Hourly - ${vehicleNameFormatted})` 
            : (serviceType === 'full-day' ? `Private Driver (Full Day - ${vehicleNameFormatted})` : "Private Driver (Multi-Day Itinerary)");

        const customMessage = `Service: ${serviceTitle}\nVehicle: ${serviceType !== 'multi-day' ? vehicleNameFormatted : 'Custom Itinerary'}\nCity: ${startCity}\nDates: ${serviceType === 'multi-day' ? `${travelDate} to ${endDate}` : travelDate}\nDuration: ${serviceType === 'hourly' ? `${hours} Hours` : (serviceType === 'full-day' ? '1 Day' : 'Multi-Day')}\nPassengers: ${passengers}\n${serviceType === 'full-day' && routePlan ? `Planned Places: ${routePlan}\n` : ''}${serviceType === 'multi-day' && itinerary ? `Itinerary: ${itinerary}\n` : ''}${custNotes ? `Client Notes: ${custNotes}` : ''}`;

        try {
            const res = await fetch('/api/send-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingType: 'private-driver',
                    language: language,
                    name: custName,
                    email: custEmail,
                    phone: custPhone,
                    service: serviceTitle,
                    startCity: startCity,
                    travelDate: travelDate,
                    duration: serviceType === 'hourly' ? `${hours} Hours` : (serviceType === 'full-day' ? '1 Day' : 'Multi-Day'),
                    travelers: passengers,
                    vehicleCategory: serviceType !== 'multi-day' ? vehicleNameFormatted : undefined,
                    travelPlan: serviceType === 'multi-day' ? itinerary : (serviceType === 'full-day' ? routePlan : undefined),
                    estimatedPrice: serviceType === 'hourly' ? `€${estimatedTotal}` : 'Custom Quote',
                    message: customMessage,
                    routeName: "Private Driver Booking Request"
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    setIsEmailModalOpen(false);
                    setSubmitSuccess(false);
                    setCustName('');
                    setCustEmail('');
                    setCustPhone('');
                    setCustNotes('');
                }, 3000);
            } else {
                setSubmitError(data.error || "Submission failed. Please try again.");
            }
        } catch {
            setSubmitError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Capacity warning checks
    const showComfortWarning = (serviceType === 'hourly' || serviceType === 'full-day') && selectedVehicle === 'comfort' && passengers > 4 && passengers <= 7;
    const showMinibusWarning = (serviceType === 'hourly' || serviceType === 'full-day') && passengers >= 8;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
            <style>{`
                .competitor-card-wrapper {
                    background-color: #FFFFFF;
                    border-radius: 14px;
                    border: 1px solid #E2E8F0;
                    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.04);
                    width: 100%;
                    padding: 20px 22px;
                    box-sizing: border-box;
                    font-family: inherit;
                }
                .service-pill-tab {
                    flex: 1;
                    padding: 7px 4px;
                    border-radius: 6px;
                    border: none;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    font-family: inherit;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .clean-form-grid {
                    border: 1px solid #E2E8F0;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: #FAFAFA;
                }
                .clean-grid-row-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    border-bottom: 1px solid #E2E8F0;
                }
                .clean-grid-row-2:last-child {
                    border-bottom: none;
                }
                .clean-grid-row-1 {
                    display: grid;
                    grid-template-columns: 1fr;
                    border-bottom: 1px solid #E2E8F0;
                }
                .clean-grid-row-1:last-child {
                    border-bottom: none;
                }
                .clean-grid-cell {
                    padding: 8px 12px;
                    box-sizing: border-box;
                    background-color: #FFFFFF;
                    position: relative;
                }
                .clean-grid-cell:first-child:not(:only-child) {
                    border-right: 1px solid #E2E8F0;
                }
                .clean-grid-cell label {
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #64748B;
                    margin-bottom: 2px;
                }
                .clean-grid-cell select,
                .clean-grid-cell input {
                    width: 100%;
                    height: 28px;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #0F172A;
                    font-size: 13.5px;
                    font-weight: 600;
                    padding: 0;
                    margin: 0;
                    font-family: inherit;
                    box-sizing: border-box;
                }
                .clean-grid-cell select {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    cursor: pointer;
                    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 4 3 3 3-3'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 2px center;
                    background-size: 10px;
                    padding-right: 16px;
                }
                .vehicle-card-btn {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid #E2E8F0;
                    background-color: #FFFFFF;
                    cursor: pointer;
                    text-align: left;
                    transition: border-color 0.15s ease, background-color 0.15s ease, transform 0.1s ease;
                    box-sizing: border-box;
                    font-family: inherit;
                    outline: none;
                }
                .vehicle-card-btn:hover:not(:disabled) {
                    border-color: #CBD5E1;
                }
                .vehicle-card-btn:focus-visible {
                    outline: 2px solid #00805A;
                    outline-offset: 1px;
                }
                .vehicle-card-selected {
                    border-color: #00805A !important;
                    background-color: #F8FAF9 !important;
                }
                .vehicle-reveal-wrapper {
                    animation: vehicleFadeIn 0.22s ease-out;
                }
                @keyframes vehicleFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .dominant-primary-btn {
                    background-color: #00805A;
                    color: #FFFFFF;
                    padding: 13px 18px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 14.5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.15s ease, transform 0.12s ease;
                    font-family: inherit;
                    width: 100%;
                    box-sizing: border-box;
                }
                .dominant-primary-btn:hover {
                    background-color: #006D4D;
                    transform: translateY(-1px);
                }
                .dominant-primary-btn:active {
                    transform: scale(0.99);
                }
                @media (max-width: 768px) {
                    .competitor-card-wrapper {
                        padding: 14px 12px;
                        border-radius: 12px;
                    }
                    .service-pill-tab {
                        font-size: 11.5px;
                        padding: 6px 2px;
                    }
                    .clean-grid-cell {
                        padding: 6px 10px;
                    }
                    .clean-grid-cell select,
                    .clean-grid-cell input {
                        font-size: 13px;
                        height: 26px;
                    }
                    .dominant-primary-btn {
                        padding: 12px 14px;
                        font-size: 14px;
                    }
                }
            `}</style>

            <div className="competitor-card-wrapper">
                {/* Header Price / Mode Line */}
                <div style={{ marginBottom: '14px' }}>
                    {serviceType === 'hourly' ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '15px', color: '#64748B', fontWeight: 600, marginRight: '1px' }}>
                                {t.fromPrefix}
                            </span>
                            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
                                {isEn || isEs ? '€25' : '25€'}
                            </span>
                            <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                                {t.perHour}
                            </span>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                                    {t.customQuoteHeader}
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                                    {t.customQuoteSub}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Service Segment Tabs */}
                <div style={{
                    display: 'flex',
                    backgroundColor: '#F1F5F9',
                    padding: '3px',
                    borderRadius: '8px',
                    marginBottom: '14px',
                    gap: '2px'
                }}>
                    <button
                        type="button"
                        className="service-pill-tab"
                        onClick={() => {
                            setServiceType('hourly');
                        }}
                        style={{
                            backgroundColor: serviceType === 'hourly' ? '#FFFFFF' : 'transparent',
                            color: serviceType === 'hourly' ? '#0F172A' : '#64748B',
                            boxShadow: serviceType === 'hourly' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        {t.tabHourly}
                    </button>
                    <button
                        type="button"
                        className="service-pill-tab"
                        onClick={() => {
                            setServiceType('full-day');
                        }}
                        style={{
                            backgroundColor: serviceType === 'full-day' ? '#FFFFFF' : 'transparent',
                            color: serviceType === 'full-day' ? '#0F172A' : '#64748B',
                            boxShadow: serviceType === 'full-day' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        {t.tabFullDay}
                    </button>
                    <button
                        type="button"
                        className="service-pill-tab"
                        onClick={() => {
                            setServiceType('multi-day');
                        }}
                        style={{
                            backgroundColor: serviceType === 'multi-day' ? '#FFFFFF' : 'transparent',
                            color: serviceType === 'multi-day' ? '#0F172A' : '#64748B',
                            boxShadow: serviceType === 'multi-day' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        {t.tabMultiDay}
                    </button>
                </div>

                {/* Clean Grouped Inputs Box */}
                <div className="clean-form-grid" style={{ marginBottom: '12px' }}>
                    
                    {/* HOURLY FORM */}
                    {serviceType === 'hourly' && (
                        <>
                            {isCityKnown ? (
                                <>
                                    <div className="clean-grid-row-2">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-date">{t.dateLabel}</label>
                                            <input
                                                id="hourly-date"
                                                type="date"
                                                value={travelDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-passengers">{t.passengersLabel}</label>
                                            <select
                                                id="hourly-passengers"
                                                value={passengers}
                                                onChange={(e) => {
                                                    const p = parseInt(e.target.value);
                                                    setPassengers(p);
                                                    if (p > 4 && selectedVehicle === 'comfort') {
                                                        setSelectedVehicle('vito');
                                                    }
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                    <option key={p} value={p}>
                                                        {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="clean-grid-row-1">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-duration">{t.durationLabel}</label>
                                            <select
                                                id="hourly-duration"
                                                value={hours}
                                                onChange={(e) => setHours(parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((h) => (
                                                    <option key={h} value={h}>
                                                        {h} {t.hourUnit}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="clean-grid-row-2">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-city">{t.cityLabel}</label>
                                            <select
                                                id="hourly-city"
                                                value={startCity}
                                                onChange={(e) => {
                                                    setStartCity(e.target.value);
                                                    localStorage.setItem('mdina_tours_private_driver_start_city', e.target.value);
                                                }}
                                            >
                                                {MOROCCO_CITIES.map((c) => (
                                                    <option key={c.value} value={c.value}>
                                                        {isEn ? c.en : (isEs ? c.es : c.fr)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-date">{t.dateLabel}</label>
                                            <input
                                                id="hourly-date"
                                                type="date"
                                                value={travelDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="clean-grid-row-2">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-duration">{t.durationLabel}</label>
                                            <select
                                                id="hourly-duration"
                                                value={hours}
                                                onChange={(e) => setHours(parseInt(e.target.value))}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((h) => (
                                                    <option key={h} value={h}>
                                                        {h} {t.hourUnit}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="clean-grid-cell">
                                            <label htmlFor="hourly-passengers">{t.passengersLabel}</label>
                                            <select
                                                id="hourly-passengers"
                                                value={passengers}
                                                onChange={(e) => {
                                                    const p = parseInt(e.target.value);
                                                    setPassengers(p);
                                                    if (p > 4 && selectedVehicle === 'comfort') {
                                                        setSelectedVehicle('vito');
                                                    }
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                    <option key={p} value={p}>
                                                        {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* FULL DAY FORM */}
                    {serviceType === 'full-day' && (
                        <>
                            {isCityKnown ? (
                                <>
                                    <div className="clean-grid-row-2">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="fullday-date">{t.dateLabel}</label>
                                            <input
                                                id="fullday-date"
                                                type="date"
                                                value={travelDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="clean-grid-cell">
                                            <label htmlFor="fullday-passengers">{t.passengersLabel}</label>
                                            <select
                                                id="fullday-passengers"
                                                value={passengers}
                                                onChange={(e) => {
                                                    const p = parseInt(e.target.value);
                                                    setPassengers(p);
                                                    if (p > 4 && selectedVehicle === 'comfort') {
                                                        setSelectedVehicle('vito');
                                                    }
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                    <option key={p} value={p}>
                                                        {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="clean-grid-row-2">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="fullday-city">{t.cityLabel}</label>
                                            <select
                                                id="fullday-city"
                                                value={startCity}
                                                onChange={(e) => {
                                                    setStartCity(e.target.value);
                                                    localStorage.setItem('mdina_tours_private_driver_start_city', e.target.value);
                                                }}
                                            >
                                                {MOROCCO_CITIES.map((c) => (
                                                    <option key={c.value} value={c.value}>
                                                        {isEn ? c.en : (isEs ? c.es : c.fr)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="clean-grid-cell">
                                            <label htmlFor="fullday-date">{t.dateLabel}</label>
                                            <input
                                                id="fullday-date"
                                                type="date"
                                                value={travelDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="clean-grid-row-1">
                                        <div className="clean-grid-cell">
                                            <label htmlFor="fullday-passengers">{t.passengersLabel}</label>
                                            <select
                                                id="fullday-passengers"
                                                value={passengers}
                                                onChange={(e) => {
                                                    const p = parseInt(e.target.value);
                                                    setPassengers(p);
                                                    if (p > 4 && selectedVehicle === 'comfort') {
                                                        setSelectedVehicle('vito');
                                                    }
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                    <option key={p} value={p}>
                                                        {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div style={{ padding: '8px 12px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
                                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '2px' }}>
                                    {t.optionalPlacesLabel}
                                </label>
                                <input
                                    type="text"
                                    value={routePlan}
                                    onChange={(e) => setRoutePlan(e.target.value)}
                                    placeholder={t.optionalPlacesPlaceholder}
                                    style={{
                                        width: '100%',
                                        height: '28px',
                                        border: 'none',
                                        outline: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#0F172A',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        padding: 0
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* MULTI-DAY FORM */}
                    {serviceType === 'multi-day' && (
                        <>
                            <div className="clean-grid-row-2">
                                <div className="clean-grid-cell">
                                    <label htmlFor="multiday-start">{t.startDateLabel}</label>
                                    <input
                                        id="multiday-start"
                                        type="date"
                                        value={travelDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            const newStart = e.target.value;
                                            setTravelDate(newStart);
                                            if (endDate < newStart) {
                                                const d = new Date(newStart);
                                                d.setDate(d.getDate() + 3);
                                                setEndDate(d.toISOString().split('T')[0]);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="clean-grid-cell">
                                    <label htmlFor="multiday-end">{t.endDateLabel}</label>
                                    <input
                                        id="multiday-end"
                                        type="date"
                                        value={endDate}
                                        min={travelDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            {isCityKnown ? (
                                <div className="clean-grid-row-1">
                                    <div className="clean-grid-cell">
                                        <label htmlFor="multiday-passengers">{t.passengersLabel}</label>
                                        <select
                                            id="multiday-passengers"
                                            value={passengers}
                                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                <option key={p} value={p}>
                                                    {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div className="clean-grid-row-2">
                                    <div className="clean-grid-cell">
                                        <label htmlFor="multiday-city">{t.cityLabel}</label>
                                        <select
                                            id="multiday-city"
                                            value={startCity}
                                            onChange={(e) => {
                                                setStartCity(e.target.value);
                                                localStorage.setItem('mdina_tours_private_driver_start_city', e.target.value);
                                            }}
                                        >
                                            {MOROCCO_CITIES.map((c) => (
                                                <option key={c.value} value={c.value}>
                                                    {isEn ? c.en : (isEs ? c.es : c.fr)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="clean-grid-cell">
                                        <label htmlFor="multiday-passengers">{t.passengersLabel}</label>
                                        <select
                                            id="multiday-passengers"
                                            value={passengers}
                                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((p) => (
                                                <option key={p} value={p}>
                                                    {p} {p === 1 ? (isEn ? "Guest" : (isEs ? "Viajero" : "Passager")) : (isEn ? "Guests" : (isEs ? "Viajeros" : "Passagers"))}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                            <div style={{ padding: '8px 12px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
                                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '2px' }}>
                                    {t.itineraryLabel}
                                </label>
                                <textarea
                                    value={itinerary}
                                    onChange={(e) => setItinerary(e.target.value)}
                                    placeholder={t.itineraryPlaceholder}
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        outline: 'none',
                                        backgroundColor: 'transparent',
                                        color: '#0F172A',
                                        fontSize: '12.5px',
                                        fontWeight: 500,
                                        padding: 0,
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        lineHeight: 1.4
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Capacity Advisory Banner */}
                {showComfortWarning && (
                    <div style={{
                        padding: '6px 10px',
                        backgroundColor: '#FEF9C3',
                        border: '1px solid #FDE047',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#854D0E',
                        marginBottom: '10px',
                        lineHeight: 1.35
                    }}>
                        ℹ️ {t.capacityWarningComfort}
                    </div>
                )}

                {showMinibusWarning && (
                    <div style={{
                        padding: '6px 10px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#1E40AF',
                        marginBottom: '10px',
                        lineHeight: 1.35
                    }}>
                        ℹ️ {t.capacityWarningMinibus}
                    </div>
                )}

                {/* STAGE 2: VEHICLE SELECTION (Revealed after clicking 'See available vehicles' for Hourly / Full-Day) */}
                {showVehicles && (serviceType === 'hourly' || serviceType === 'full-day') && (
                    <div className="vehicle-reveal-wrapper" style={{ marginTop: '14px', marginBottom: '14px' }}>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: '#64748B',
                            marginBottom: '8px'
                        }}>
                            {t.chooseRide}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* Vehicle Option 1: Comfort */}
                            <button
                                type="button"
                                role="radio"
                                aria-checked={selectedVehicle === 'comfort'}
                                onClick={() => {
                                    if (passengers > 4) {
                                        alert(t.capacityWarningComfort);
                                        return;
                                    }
                                    setSelectedVehicle('comfort');
                                }}
                                disabled={passengers > 4}
                                className={`vehicle-card-btn ${selectedVehicle === 'comfort' ? 'vehicle-card-selected' : ''}`}
                                style={{
                                    opacity: passengers > 4 ? 0.6 : 1,
                                    cursor: passengers > 4 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                                        {t.comfortTitle}
                                    </span>
                                    {serviceType === 'hourly' && (
                                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                                            {isEn || isEs ? '€25/h' : '25€/h'}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '2px' }}>
                                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                                        {t.comfortDesc}
                                    </span>
                                </div>
                            </button>

                            {/* Vehicle Option 2: Mercedes Vito */}
                            <button
                                type="button"
                                role="radio"
                                aria-checked={selectedVehicle === 'vito'}
                                onClick={() => setSelectedVehicle('vito')}
                                className={`vehicle-card-btn ${selectedVehicle === 'vito' ? 'vehicle-card-selected' : ''}`}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                                            {t.vitoTitle}
                                        </span>
                                        <span style={{
                                            backgroundColor: '#FEF3C7',
                                            color: '#92400E',
                                            fontSize: '10.5px',
                                            fontWeight: 700,
                                            padding: '1px 7px',
                                            borderRadius: '10px',
                                            letterSpacing: '0.01em',
                                            lineHeight: 1.3
                                        }}>
                                            {t.popularBadge}
                                        </span>
                                    </div>
                                    {serviceType === 'hourly' && (
                                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                                            {isEn || isEs ? '€35/h' : '35€/h'}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '2px' }}>
                                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                                        {t.vitoDesc}
                                    </span>
                                </div>
                            </button>
                        </div>

                        {/* Estimated Total Section (Hourly Only) */}
                        {serviceType === 'hourly' && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                marginTop: '14px',
                                padding: '0 2px'
                            }}>
                                <div>
                                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                                        {t.estimatedTotalLabel}:
                                    </span>
                                    <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 500, marginTop: '1px' }}>
                                        {hours} {hours === 1 ? (isEn ? 'hr' : 'h') : (isEn ? 'hrs' : 'h')} × {isEn || isEs ? `€${hourlyRate}/h` : `${hourlyRate}€/h`}
                                    </div>
                                </div>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                                    {isEn || isEs ? `€${estimatedTotal}` : `${estimatedTotal}€`}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Primary CTA Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: showVehicles ? '0' : '6px' }}>
                    {serviceType === 'multi-day' ? (
                        <a
                            href={getWhatsAppUrl()}
                            onClick={handlePrimaryClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dominant-primary-btn"
                        >
                            <span>{t.ctaMultiDay}</span>
                        </a>
                    ) : !showVehicles ? (
                        <button
                            type="button"
                            onClick={() => setShowVehicles(true)}
                            className="dominant-primary-btn"
                        >
                            <span>{t.seeAvailableVehicles}</span>
                        </button>
                    ) : (
                        <a
                            href={getWhatsAppUrl()}
                            onClick={handlePrimaryClick}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dominant-primary-btn"
                        >
                            <span>
                                {serviceType === 'hourly' ? t.ctaReserveWhatsApp : t.ctaFullDay}
                            </span>
                        </a>
                    )}

                    <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                        {serviceType === 'multi-day' ? t.subCtaMultiDay : t.subCtaReassurance}
                    </div>
                </div>

                {/* Reassurance Box */}
                <div style={{
                    backgroundColor: '#F2F9F5',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    marginTop: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    border: '1px solid #D6EFE1'
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00805A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ fontSize: '12px', color: '#0F172A', fontWeight: 600, lineHeight: 1.35 }}>
                            {t.reassurance1}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00805A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ fontSize: '12px', color: '#0F172A', fontWeight: 600, lineHeight: 1.35 }}>
                            {t.reassurance2}
                        </span>
                    </div>
                </div>

                {/* Secondary Subtle Email Link */}
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <button
                        type="button"
                        onClick={() => setIsEmailModalOpen(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748B',
                            fontSize: '12px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            padding: 0
                        }}
                    >
                        {t.secondaryEmailLink}
                    </button>
                </div>
            </div>

            {/* Email Modal Dialog */}
            {isEmailModalOpen && (
                <div
                    style={{
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
                        backdropFilter: 'blur(4px)',
                        padding: '16px'
                    }}
                    onClick={() => setIsEmailModalOpen(false)}
                >
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '14px',
                            border: '1px solid #E2E8F0',
                            width: '100%',
                            maxWidth: '460px',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                            padding: '24px',
                            position: 'relative',
                            boxSizing: 'border-box'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setIsEmailModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#64748B',
                                padding: '4px'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {submitSuccess ? (
                            <div style={{ textAlign: 'center', padding: '16px 0' }}>
                                <div style={{ fontSize: '36px', marginBottom: '10px' }}>✓</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                                    {t.modalSuccessTitle}
                                </h3>
                                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                                    {t.modalSuccessMsg}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                                    {t.modalTitle}
                                </h3>
                                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                                    {t.modalSubtitle}
                                </p>

                                {/* Trip Summary Pill */}
                                <div style={{
                                    backgroundColor: '#F8FAFC',
                                    borderRadius: '8px',
                                    border: '1px solid #E2E8F0',
                                    padding: '10px 12px',
                                    fontSize: '12px',
                                    color: '#334155',
                                    marginBottom: '16px',
                                    lineHeight: '1.4'
                                }}>
                                    <strong>{isEn ? "Trip:" : (isEs ? "Viaje:" : "Trajet :")}</strong> {startCity} • {serviceType === 'multi-day' ? `${formatDateShort(travelDate)} → ${formatDateShort(endDate)}` : formatDateFriendly(travelDate)} • {serviceType !== 'multi-day' ? vehicleNameFormatted : 'Multi-Day'} ({passengers} {passengers === 1 ? 'Guest' : 'Guests'})
                                </div>

                                {submitError && (
                                    <div style={{
                                        backgroundColor: '#FEF2F2',
                                        color: '#991B1B',
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        fontSize: '12.5px',
                                        marginBottom: '12px'
                                    }}>
                                        {submitError}
                                    </div>
                                )}

                                <form onSubmit={handleEmailModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                                            {t.nameLabel}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={custName}
                                            onChange={(e) => setCustName(e.target.value)}
                                            placeholder={isEn ? "e.g. John Doe" : "ex: Jean Dupont"}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #CBD5E1',
                                                padding: '0 12px',
                                                fontSize: '13.5px',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                                            {t.emailLabel}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={custEmail}
                                            onChange={(e) => setCustEmail(e.target.value)}
                                            placeholder="name@email.com"
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #CBD5E1',
                                                padding: '0 12px',
                                                fontSize: '13.5px',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                                            {t.phoneLabel}
                                        </label>
                                        <input
                                            type="tel"
                                            value={custPhone}
                                            onChange={(e) => setCustPhone(e.target.value)}
                                            placeholder="+1 555 123 4567"
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #CBD5E1',
                                                padding: '0 12px',
                                                fontSize: '13.5px',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '4px' }}>
                                            {t.notesLabel}
                                        </label>
                                        <textarea
                                            value={custNotes}
                                            onChange={(e) => setCustNotes(e.target.value)}
                                            placeholder={isEn ? "Specific stops, flight details, or child seats..." : "Arrêts spécifiques, bagages..."}
                                            rows={2}
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                border: '1px solid #CBD5E1',
                                                padding: '8px 12px',
                                                fontSize: '13px',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                fontFamily: 'inherit',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="dominant-primary-btn"
                                        style={{ marginTop: '6px' }}
                                    >
                                        {isSubmitting ? t.sendingBtn : t.sendBtn}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


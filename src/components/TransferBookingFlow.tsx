"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { TransferData, LocalizedTransferData } from '@/lib/transfersData';
import TransferHeroGallery from "./transfers/TransferHeroGallery";
import TransferMetaSection from "./transfers/TransferMetaSection";
import TransferWebRatings from "./transfers/TransferWebRatings";
import TransferVehicleTiers from "./transfers/TransferVehicleTiers";
import TransferWhatsIncluded from "./transfers/TransferWhatsIncluded";
import TransferReviews from "./transfers/TransferReviews";
import TransferMeetingInfo from "./transfers/TransferMeetingInfo";
import TransferDestinationInfo from "./transfers/TransferDestinationInfo";
import TransferBookingWidget from "./transfers/TransferBookingWidget";
import TransferFAQ from "./transfers/TransferFAQ";
import faqStyles from '@/components/FAQ.module.css';
import PrivateDriverWhyChooseUs from '@/components/PrivateDriverWhyChooseUs';
import VideoPlayer from '@/components/VideoPlayer';
import TransferFleet from "./transfers/TransferFleet";
import TransferOtherRoutes from "./transfers/TransferOtherRoutes";

interface TransferBookingFlowProps {
    trans: TransferData;
    language: 'en' | 'fr';
}

const tLocal = {
    en: {
        lowestPrice: "Lowest Price Guarantee",
        badgeExcellence: "Badge of Excellence",
        recommended: "Recommended by 98% of travelers",
        reviews: "reviews",
        share: "Share",
        wishlist: "Add to Wishlist",
        pickupOffered: "Pickup offered",
        mobileTicket: "Mobile ticket",
        duration: "approx.",
        languages: "Offered in: English, French, Arabic",
        selectOptions: "Select Options",
        travelers: "Travelers",
        travelDate: "Travel Date",
        updateSearch: "Check Availability",
        reserveWhatsApp: "Book via WhatsApp",
        bookAhead: "Book ahead! This route is highly popular.",
        freeCancel: "Free cancellation up to 24 hours in advance",
        reserveNowPayLater: "Reserve Now & Pay Later",
        timeSlot: "Select departure time:",
        pickupLocation: "Pickup Points",
        pickupDetails: "We pick you up directly from your arrivals terminal, hotel lobby, or riad access point.",
        dropoffLocation: "Drop-off Point",
        openMaps: "Open in Google Maps",
                whatsIncluded: "What's Covered",
        whatsNotIncluded: "Not Included",
        overview: "Overview",
        travelTips: "Travel Tips for this Route",
        fixedPricing: "Pricing Tiers",
        sedanComfort: "Sedan Comfort (1-3 PAX)",
        minivanComfort: "Spacious Minivan (4-5 PAX)",
        largeMinivan: "Group Minivan (6-7 PAX)",
        minibus: "Executive Minibus (8-16 PAX)",
        perGroup: "per group",
        flexibleSched: "Flexible Schedule",
        from: "From",
        selectTime: "Select time",
        popularTimes: "Popular Times",
        customTime: "Custom Time",
        timeLabel: "Time",
        selectPickupTime: "Pickup Time",
        aboutRoute: "About this Route",
        vehicleCapacity: "Vehicle Capacity & Comfort",
        aboutDest: "About the Destination",
        popularDropoffs: "Popular Drop-off Locations",
        details: "Details",
        home: "Home",
        transfers: "Transfers",
        whatsappMessage: "Hello Mdina Tours,\nI would like to book a private transfer: \"%title%\".\n\n• Route: %pickup% ⇄ %dropoff%\n• Date: %date%\n• Time: %time%\n• Travelers: %travelers% (%tier%)\n• Price: €%price%\n\nPlease let me know availability.",
    },
    fr: {
        lowestPrice: "Meilleur prix garanti",
        badgeExcellence: "Badge d'Excellence",
        recommended: "Recommandé par 98% des voyageurs",
        reviews: "avis",
        share: "Partager",
        wishlist: "Ajouter aux favoris",
        pickupOffered: "Prise en charge incluse",
        mobileTicket: "Ticket mobile",
        duration: "environ",
        languages: "Proposé en : Français, Anglais, Arabe",
        selectOptions: "Sélectionner les Options",
        travelers: "Voyageurs",
        travelDate: "Date du voyage",
        updateSearch: "Vérifier la disponibilité",
        reserveWhatsApp: "Réserver via WhatsApp",
        bookAhead: "Réservez à l'avance ! Ce trajet est très demandé.",
        freeCancel: "Annulation gratuite jusqu'à 24h à l'avance",
        reserveNowPayLater: "Réserver maintenant & Payer plus tard",
        timeSlot: "Sélectionnez l'heure de départ :",
        pickupLocation: "Points de prise en charge",
        pickupDetails: "Accueil personnalisé dans le hall des arrivées, à la réception de votre hôtel ou au point d'accès du riad.",
        dropoffLocation: "Point de dépose",
        openMaps: "Ouvrir dans Google Maps",
        whatsIncluded: "Ce qui est couvert",
        whatsNotIncluded: "Non inclus",
        overview: "Aperçu",
        travelTips: "Conseils de voyage",
        fixedPricing: "Grille tarifaire",
        sedanComfort: "Berline Confort (1-3 PAX)",
        minivanComfort: "Monospace Spacieux (4-5 PAX)",
        largeMinivan: "Minivan de Groupe (6-7 PAX)",
        minibus: "Minibus Exécutif (8-16 PAX)",
        perGroup: "par groupe",
        flexibleSched: "Horaire flexible",
        from: "À partir de",
        selectTime: "Choisir l'heure",
        popularTimes: "Heures populaires",
        customTime: "Heure personnalisée",
        timeLabel: "Heure",
        selectPickupTime: "Heure de départ",
        aboutRoute: "À propos du trajet",
        vehicleCapacity: "Capacités et Confort des Véhicules",
        aboutDest: "À propos de la destination",
        popularDropoffs: "Lieux de dépose fréquents",
        details: "Détails",
        home: "Accueil",
        transfers: "Transferts",
        whatsappMessage: "Bonjour Mdina Tours,\nJe souhaite réserver un transfert privé : \"%title%\".\n\n• Trajet : %pickup% ⇄ %dropoff%\n• Date : %date%\n• Heure : %time%\n• Voyageurs : %travelers% (%tier%)\n• Tarif : €%price%\n\nMerci de me confirmer la disponibilité.",
    }
};

const getGalleryImages = (slug: string, transImage: string) => {
    const images: string[] = [];
    const normalizedSlug = slug.toLowerCase();
    
    const isAirport = normalizedSlug.includes('airport') || normalizedSlug.includes('aeroport');
    
    // Determine cities involved
    const hasCasablanca = normalizedSlug.includes('casablanca');
    const hasFes = normalizedSlug.includes('fes');
    const hasMarrakech = normalizedSlug.includes('marrakech');
    const hasAsilah = normalizedSlug.includes('asilah');
    const hasMerzouga = normalizedSlug.includes('merzouga') || normalizedSlug.includes('sahara');
    const hasRabat = normalizedSlug.includes('rabat');
    const hasTangier = normalizedSlug.includes('tangier') || normalizedSlug.includes('tanger');
    const hasAgadir = normalizedSlug.includes('agadir');
    const hasEssaouira = normalizedSlug.includes('essaouira');

    // 1. First image position: Absolute most relevant image for the starting point / route
    if (isAirport) {
        if (hasCasablanca) {
            images.push('/img2/Airport_Casablanca_Mohammed.webp');
        } else if (hasRabat) {
            images.push('/img2/rabat-airport.webp');
        } else if (hasTangier) {
            images.push('/img2/tangier_hero.webp'); // Avoid AVIF build issue
        } else if (hasFes) {
            images.push('/img2/fes-airport.jpeg');
        } else if (hasAgadir) {
            images.push('/img2/agadir-airport.webp');
        } else if (hasMarrakech) {
            images.push('/b-roll/3-Mercedes-vito-airoport.jpg');
        }
    } else {
        // If city-to-city, prioritize landmarks (prioritizing Essaouira first to ensure it displays correctly)
        if (hasEssaouira) {
            images.push('/img2/Essaouira-maroc.jpg');
        } else if (hasTangier) {
            images.push('/img2/tangier_hero.webp');
        } else if (hasRabat) {
            images.push('/img2/rabat-hassan-tour.jpg');
        } else if (hasCasablanca) {
            images.push('/img2/casablanca_MOSQUE.webp');
        } else if (hasFes) {
            images.push('/img2/fes_gate.jpg');
        } else if (hasMarrakech) {
            images.push('/hero-marrakech.webp'); // Avoid Tourists-in-marrakech.avif issue
        } else {
            images.push(transImage);
        }
    }

    // 2. Second image position: Destination landmark or secondary route image
    if (hasCasablanca && !images.includes('/img2/casablanca_MOSQUE.webp')) {
        images.push('/img2/casablanca_MOSQUE.webp');
    }
    if (hasFes && !images.includes('/img2/fes_gate.jpg')) {
        images.push('/img2/fes_gate.jpg');
    }
    if (hasMarrakech && !hasEssaouira) { // Do not push Marrakech landmark for Essaouira route
        if (isAirport) {
            if (!images.includes('/img2/aeroport-marrakech.webp')) {
                images.push('/img2/aeroport-marrakech.webp');
            }
        } else {
            if (!images.includes('/hero-marrakech.webp')) {
                images.push('/hero-marrakech.webp');
            }
        }
    }
    if (hasAsilah && !images.includes('/img2/Asilah-Morocco.jpg')) {
        images.push('/img2/Asilah-Morocco.jpg');
    }
    if (hasMerzouga && !images.includes('/b-roll/activity-sahara-camel-riding-broll.webp')) {
        images.push('/b-roll/activity-sahara-camel-riding-broll.webp');
    }
    if (hasAgadir && !images.includes('/img2/agadir-marina.jpg')) {
        images.push('/img2/agadir-marina.jpg');
    }
    if (hasRabat && !images.includes('/img2/rabat-hassan-tour.jpg') && !images.includes('/hero-landscape-1.webp')) {
        images.push('/hero-landscape-1.webp');
    }
    if (hasTangier && !images.includes('/img2/tangier_hero.webp') && !images.includes('/img2/tangier-mdina.jpg')) {
        images.push('/img2/tangier-mdina.jpg');
    }

    // Ensure transImage is in the list
    if (!images.includes(transImage)) {
        images.push(transImage);
    }

    // 3. Third image position: Private Van (Vito) Image
    if (isAirport) {
        images.push('/img2/vito-aeroport.jpg');
    } else {
        images.push('/img2/private-van-at-hotel.webp');
    }

    // 4. Fourth image position: Professional Chauffeur
    if (isAirport) {
        images.push('/img2/vito-chaufeeur-privé.jpg');
    } else {
        images.push('/b-roll/private-transfer-chauffaur-vito.jpg');
    }

    // 5. Fifth image position: Happy Travelers / Family
    images.push('/img2/happy-traverlers-group.webp');

    // 6. Extra supporting images (avoiding duplicate Vitos)
    if (hasFes && !isAirport) {
        images.push('/img2/fes_3.webp');
    }
    if (hasAsilah && !isAirport) {
        images.push('/img2/Asilah_water.webp');
    }
    if (hasMarrakech) {
        images.push('/img2/Marrakech_atlas.jpg');
    }
    if (hasRabat) {
        images.push('/img2/rabat_monemont.jpg');
    }
    if (isAirport) {
        images.push('/b-roll/vito-airoport-parking.jpg');
    } else {
        images.push('/img2/vito.jpg');
    }
    images.push('/b-roll/moroccan-family-urban.jpg');

    // Return unique elements, capped at 6 images for clean layout
    return Array.from(new Set(images)).slice(0, 6);
};

export default function TransferBookingFlow({ trans, language }: TransferBookingFlowProps) {
    const isEn = language === 'en';
    const local: LocalizedTransferData = trans[language];
    const transText = tLocal[language];

    // Build photo gallery array dynamically using trans.image + relevant assets
    const galleryImages = getGalleryImages(trans.slug, trans.image);


    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [travelers, setTravelers] = useState(2);
    const [travelDate, setTravelDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [pickupTime, setPickupTime] = useState("10:00");

    // Searched/committed states to lock options and pricing
    const [searchedTravelers, setSearchedTravelers] = useState(2);
    const [searchedTravelDate, setSearchedTravelDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [searchedPickupTime, setSearchedPickupTime] = useState("10:00");

    // Booking request modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [custName, setCustName] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custMessage, setCustMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Availability search states
    const [searchState, setSearchState] = useState<'initial' | 'searching' | 'searched'>('initial');
    const [showBookingCTAs, setShowBookingCTAs] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);

    const hasPendingChanges = searchState === 'searched' && (
        travelers !== searchedTravelers ||
        travelDate !== searchedTravelDate ||
        pickupTime !== searchedPickupTime
    );

    const handleSearchClick = () => {
        setSearchState('searching');
        setTimeout(() => {
            setSearchedTravelers(travelers);
            setSearchedTravelDate(travelDate);
            setSearchedPickupTime(pickupTime);
            setSearchState('searched');
            setShowBookingCTAs(true);
        }, 1200);
    };

    // Scroll to options when search completes
    useEffect(() => {
        if (searchState === 'searched' && optionsRef.current) {
            optionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [searchState]);

    // Custom calendar and travelers popover states
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTravelersOpen, setIsTravelersOpen] = useState(false);
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const d = new Date();
        return d.getMonth();
    });
    const [calendarYear, setCalendarYear] = useState(() => {
        const d = new Date();
        return d.getFullYear();
    });

    // Calendar math helpers
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay(); // 0 = Sunday
    };

    const handlePrevMonth = () => {
        setCalendarMonth(prev => {
            if (prev === 0) {
                setCalendarYear(y => y - 1);
                return 11;
            }
            return prev - 1;
        });
    };

    const handleNextMonth = () => {
        setCalendarMonth(prev => {
            if (prev === 11) {
                setCalendarYear(y => y + 1);
                return 0;
            }
            return prev + 1;
        });
    };

    const handleDateSelect = (year: number, month: number, day: number) => {
        const yyyy = year.toString();
        const mm = (month + 1).toString().padStart(2, '0');
        const dd = day.toString().padStart(2, '0');
        setTravelDate(`${yyyy}-${mm}-${dd}`);
        setIsCalendarOpen(false);
    };

    const formatReadableDate = (dateStr: string, lang: 'en' | 'fr') => {
        try {
            const parts = dateStr.split('-');
            const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
            return dateObj.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
        } catch (e) {
            return dateStr;
        }
    };

    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesFr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const weekdayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdayNamesFr = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    // Update calendar month/year view when the calendar is opened
    useEffect(() => {
        if (isCalendarOpen && travelDate) {
            const parts = travelDate.split('-');
            if (parts.length === 3) {
                setCalendarMonth(parseInt(parts[1], 10) - 1);
                setCalendarYear(parseInt(parts[0], 10));
            }
        }
    }, [isCalendarOpen, travelDate]);

    const renderMonth = (year: number, month: number, showNav: boolean) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        const monthName = language === 'fr' ? monthNamesFr[month] : monthNamesEn[month];
        const weekdays = language === 'fr' ? weekdayNamesFr : weekdayNamesEn;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return (
            <div style={{ flex: 1 }} className="calendar-month-item">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    position: 'relative',
                    height: '28px'
                }}>
                    {showNav ? (
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevMonth();
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s',
                                color: '#222',
                                width: '28px',
                                height: '28px'
                            }}
                            className="calendar-nav-btn"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="m15 18-6-6 6-6"/>
                            </svg>
                        </button>
                    ) : (
                        <div style={{ width: '28px', height: '28px' }} />
                    )}

                    <span style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#222',
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        {monthName} {year}
                    </span>

                    {!showNav ? (
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNextMonth();
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s',
                                color: '#222',
                                width: '28px',
                                height: '28px'
                            }}
                            className="calendar-nav-btn"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                        </button>
                    ) : (
                        <div style={{ width: '28px', height: '28px' }} />
                    )}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    marginBottom: '8px'
                }}>
                    {weekdays.map((wd, index) => (
                        <span key={index} style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#717171',
                            textTransform: 'uppercase'
                        }}>
                            {wd}
                        </span>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    rowGap: '4px',
                    textAlign: 'center'
                }}>
                    {days.map((day, index) => {
                        if (day === null) {
                            return <div key={`empty-${index}`} />;
                        }

                        const cellDate = new Date(year, month, day);
                        const isPast = cellDate < today;
                        
                        const isSelected = travelDate === `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                        return (
                            <div 
                                key={`day-${day}`}
                                onClick={() => {
                                    if (!isPast) {
                                        handleDateSelect(year, month, day);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '38px',
                                    width: '38px',
                                    margin: '0 auto',
                                    borderRadius: '50%',
                                    fontSize: '13px',
                                    fontWeight: isSelected ? 700 : 500,
                                    cursor: isPast ? 'not-allowed' : 'pointer',
                                    color: isSelected ? '#fff' : isPast ? '#d1d5db' : '#222',
                                    backgroundColor: isSelected ? '#00af87' : 'transparent',
                                    transition: 'background-color 0.15s, color 0.15s'
                                }}
                                className={!isPast && !isSelected ? "calendar-day-hover" : ""}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const handleOpenModal = () => {
        const vehicle = getTierLabel(selectedTier);
        const msg = isEn 
            ? `Route: ${local.pickup} ⇄ ${local.dropoff}\nVehicle: ${vehicle}\nTravel Date: ${travelDate}\nNumber of Travelers: ${travelers}\nPickup Time: ${pickupTime}`
            : `Trajet: ${local.pickup} ⇄ ${local.dropoff}\nVéhicule: ${vehicle}\nDate du voyage: ${travelDate}\nNombre de voyageurs: ${travelers}\nHeure de départ: ${pickupTime}`;
        setCustMessage(msg);
        setIsModalOpen(true);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const res = await fetch('/api/send-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: custName,
                    email: custEmail,
                    phone: custPhone,
                    message: custMessage,
                    routeName: local.title
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setSuccessMessage(isEn ? "Request sent! We'll confirm your booking within 2 hours." : "Demande envoyée ! Nous confirmerons votre réservation dans les 2 heures.");
                setCustName('');
                setCustEmail('');
                setCustPhone('');
                
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccessMessage('');
                }, 2500);
            } else {
                setErrorMessage(data.error || (isEn ? "Something went wrong. Please try again." : "Une erreur est survenue. Veuillez réessayer."));
            }
        } catch (err) {
            setErrorMessage(isEn ? "Network error. Please try again." : "Erreur réseau. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const [selectedTier, setSelectedTier] = useState<number>(3); // Default to 3 passengers tier (Sedan)
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const timePickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
                setIsTimePickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Sync searchedTravelers selection to selected vehicle tier
    useEffect(() => {
        const passengerTiers = [3, 5, 7];
        // Find the smallest tier capacity that fits the searched number of travelers
        const matchedTier = passengerTiers.find(tier => searchedTravelers <= tier) || passengerTiers[passengerTiers.length - 1];
        if (matchedTier) {
            setSelectedTier(matchedTier);
        }
    }, [searchedTravelers, trans.prices]);

    const getTierLabel = (tierLimit: number) => {
        if (isEn) {
            if (tierLimit <= 3) return "Max 3 passengers vehicle";
            if (tierLimit <= 5) return "Max 5 passengers van";
            return "Max 8 passengers van";
        } else {
            if (tierLimit <= 3) return "Véhicule Max 3 passagers";
            if (tierLimit <= 5) return "Van Max 5 passagers";
            return "Van Max 8 passagers";
        }
    };

    const getTierVehicleInfo = (tierLimit: number) => {
        if (isEn) {
            if (tierLimit <= 3) return "Max 3 passengers vehicle • Pickup included";
            if (tierLimit <= 5) return "Max 5 passengers van • Pickup included";
            return "Max 8 passengers van • Pickup included";
        } else {
            if (tierLimit <= 3) return "Véhicule Max 3 passagers • Prise en charge incluse";
            if (tierLimit <= 5) return "Van Max 5 passagers • Prise en charge incluse";
            return "Van Max 8 passagers • Prise en charge incluse";
        }
    };

    const getUrgencyDetails = () => {
        try {
            const departureDateTime = new Date(`${searchedTravelDate}T${searchedPickupTime}:00`);
            const now = new Date();
            
            const cutoffTime = new Date(departureDateTime.getTime() - 12 * 60 * 60 * 1000);
            const timeLeftMs = cutoffTime.getTime() - now.getTime();
            
            let urgencyText = "";
            let isUrgent = false;
            let isClosed = false;
            const hoursLeft = timeLeftMs > 0 ? Math.floor(timeLeftMs / (1000 * 60 * 60)) : 0;
            const isPlentyOfTime = timeLeftMs > 0 && hoursLeft >= 24;
            
            if (timeLeftMs > 0) {
                isUrgent = true;
                
                if (hoursLeft >= 24) {
                    urgencyText = isEn
                        ? `Book ahead! This route is highly popular. Secure your spot soon.`
                        : `Réservez à l'avance ! Ce trajet est très demandé. Garantissez votre place bientôt.`;
                } else if (hoursLeft < 5) {
                    const displayHours = hoursLeft === 0 ? "<1" : hoursLeft;
                    urgencyText = isEn
                        ? `${displayHours}h left to book. The tour operator will stop accepting bookings for your date soon.`
                        : `${displayHours}h restantes pour réserver. L'opérateur arrêtera bientôt d'accepter les réservations pour votre date.`;
                } else {
                    urgencyText = isEn
                        ? `${hoursLeft} hours left to book. The tour operator will stop accepting bookings for your date soon.`
                        : `${hoursLeft} heures restantes pour réserver. L'opérateur arrêtera bientôt d'accepter les réservations pour votre date.`;
                }
            } else {
                isClosed = true;
                urgencyText = isEn
                    ? "Last-minute booking: Online booking window is closed. Please book directly via WhatsApp for quick confirmation."
                    : "Réservation de dernière minute : Les réservations en ligne sont fermées. Veuillez réserver par WhatsApp pour confirmation rapide.";
            }
            
            const cancellationCutoff = new Date(departureDateTime.getTime() - 24 * 60 * 60 * 1000);
            const isNonRefundable = now.getTime() > cancellationCutoff.getTime();
            
            let cancellationText = "";
            if (isNonRefundable) {
                cancellationText = isEn
                    ? "Non-refundable - The free cancellation window has closed for this date."
                    : "Non remboursable - La période d'annulation gratuite est dépassée pour cette date.";
            } else {
                cancellationText = isEn
                    ? "Free cancellation up to 24 hours in advance. Reserve Now & Pay Later."
                    : "Annulation gratuite jusqu'à 24h à l'avance. Réservez maintenant & payez plus tard.";
            }
            
            return {
                urgencyText,
                isUrgent,
                isClosed,
                isPlentyOfTime,
                isNonRefundable,
                cancellationText
            };
        } catch (e) {
            return {
                urgencyText: isEn 
                    ? "Book ahead! This route is highly popular." 
                    : "Réservez à l'avance ! Ce trajet est très demandé.",
                isUrgent: false,
                isClosed: false,
                isPlentyOfTime: true,
                isNonRefundable: false,
                cancellationText: isEn
                    ? "Free cancellation up to 24 hours in advance."
                    : "Annulation gratuite jusqu'à 24h à l'avance."
            };
        }
    };

    const getCancellationDeadline = () => {
        try {
            const departureDateTime = new Date(`${searchedTravelDate}T${searchedPickupTime}:00`);
            const deadline = new Date(departureDateTime.getTime() - 24 * 60 * 60 * 1000);
            
            // Format time: e.g. 7:00 AM
            let hours = deadline.getHours();
            const minutes = deadline.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const timeStr = `${hours}:${minutes} ${ampm}`;
            
            // Format date: e.g. Jun 17
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            const dateStr = deadline.toLocaleDateString(isEn ? 'en-US' : 'fr-FR', options);
            
            return {
                timeStr,
                dateStr
            };
        } catch (e) {
            return null;
        }
    };

    const getWhatsAppUrlForTier = (tierLimit: number) => {
        const price = trans.prices[tierLimit] || trans.prices[3];
        const tierLabel = getTierLabel(tierLimit);
        
        let msg = transText.whatsappMessage;
        msg = msg.replace("%title%", local.title);
        msg = msg.replace("%pickup%", local.pickup);
        msg = msg.replace("%dropoff%", local.dropoff);
        msg = msg.replace("%date%", searchedTravelDate);
        msg = msg.replace("%time%", searchedPickupTime);
        msg = msg.replace("%travelers%", searchedTravelers.toString());
        msg = msg.replace("%tier%", tierLabel);
        msg = msg.replace("%price%", price.toString());

        return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: local.seoTitle,
                text: local.tagline,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert(isEn ? "Link copied to clipboard!" : "Lien copié dans le presse-papiers !");
        }
    };

    const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

    const currentPrice = trans.prices[selectedTier] || trans.prices[3];
    const urgency = getUrgencyDetails() || { isNonRefundable: false, urgencyText: '' };
    const isPast = (() => {
        try {
            const selectedDateTime = new Date(`${searchedTravelDate}T${searchedPickupTime}:00`);
            return selectedDateTime < new Date();
        } catch {
            return false;
        }
    })();
    const propsObj = { isEn, local, transText, galleryImages, activeImageIndex, setActiveImageIndex, travelers, setTravelers, travelDate, setTravelDate, pickupTime, setPickupTime, isModalOpen, setIsModalOpen, custName, setCustName, custEmail, setCustEmail, custPhone, setCustPhone, custMessage, setCustMessage, isSubmitting, setIsSubmitting, successMessage, setSuccessMessage, errorMessage, setErrorMessage, searchState, setSearchState, showBookingCTAs, setShowBookingCTAs, optionsRef, handleSearchClick, isCalendarOpen, setIsCalendarOpen, isTravelersOpen, setIsTravelersOpen, calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, getDaysInMonth, getFirstDayOfMonth, handlePrevMonth, handleNextMonth, handleDateSelect, formatReadableDate, monthNamesEn, monthNamesFr, weekdayNamesEn, weekdayNamesFr, renderMonth, handleOpenModal, handleSubmit, selectedTier, setSelectedTier, isTimePickerOpen, setIsTimePickerOpen, timePickerRef, getTierLabel, getTierVehicleInfo, getUrgencyDetails, getCancellationDeadline, getWhatsAppUrlForTier, handleShare, timeSlots, currentPrice, urgency, isPast, trans, language, searchedTravelers, searchedTravelDate, searchedPickupTime, hasPendingChanges };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--accent)', fontFamily: "'Inter', sans-serif", width: '100%', maxWidth: '100%', overflowX: 'hidden', paddingBottom: '80px' }} className="transfer-page-wrapper">
            
            {/* Top Breadcrumb & Title */}
            <div className="breadcrumbs-title-container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 20px 20px' }}>
                <nav className="breadcrumb-nav" style={{ display: 'flex', gap: '6px', fontSize: '0.65rem', color: '#666', marginBottom: '8px' }}>
                    <Link href={isEn ? "/en" : "/fr"} style={{ color: '#666', transition: 'color 0.2s' }}>{transText.home}</Link>
                    <span style={{ color: '#ccc' }}>›</span>
                    <Link href={isEn ? "/en/transfers" : "/fr/transfers"} style={{ color: '#666', transition: 'color 0.2s' }}>{transText.transfers}</Link>
                    <span style={{ color: '#ccc' }}>›</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{local.title}</span>
                </nav>

                <h1 style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    margin: '0 0 10px 0',
                    lineHeight: '1.2',
                    fontFamily: "var(--font-poppins), sans-serif",
                }}>
                    {local.title}
                </h1>

                {/* Ratings */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '1.1rem' }}>
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 500, textDecoration: 'underline' }}>
                        {trans.slug === "casablanca-airport-transfer" ? "120" : "35"} {transText.reviews}
                    </span>
                </div>

                {/* Excellence Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ backgroundColor: '#fef3c7', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#d97706', fontSize: '0.8rem' }}>🏆</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>
                        {transText.badgeExcellence}
                    </span>
                </div>

                {/* Reserve Now & Lowest Price Row */}
                <div className="guarantees-row" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', fontSize: '0.75rem', marginBottom: '20px', width: '100%', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '6px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                        <span style={{ fontWeight: 500 }}>{transText.reserveNowPayLater}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '6px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#64748b', fontWeight: 'bold' }}>🏷️</span>
                        <span style={{ fontWeight: 500 }}>{transText.lowestPrice}</span>
                    </div>
                </div>
            </div>

            {/* Main Visual and Booking Section */}
            <section id="booking" className="main-booking-section" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 20px 40px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }} className="grid-responsive-layout">
                    
                    {/* Left Column: Gallery, details and itinerary options */}
                    <div className="transfers-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                        <TransferHeroGallery {...propsObj} />
                        
                        <div className="mobile-booking-widget" style={{ marginTop: '20px' }}>
                            <TransferBookingWidget {...propsObj} />
                        </div>

                        <TransferMetaSection {...propsObj} />
                        <TransferMeetingInfo {...propsObj} />
                        
                        {/* Interactive Tiers (Selection Flow) remains here in Left Column */}
                        <TransferVehicleTiers {...propsObj} />
                    </div>

                    {/* Right Column: Sticky Booking Selector Box */}
                    <div style={{ 
                        position: 'sticky', 
                        top: '100px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px',
                        maxWidth: '480px',
                        width: '100%',
                        height: 'fit-content',
                        zIndex: 10
                    }} className="booking-widget-sticky-wrapper">
                        <div className="desktop-booking-widget">
                            <TransferBookingWidget {...propsObj} />
                        </div>
                    </div>

                </div>
                
                <div style={{ marginTop: '40px' }}>
                    <TransferWebRatings {...propsObj} />
                </div>
            </section>

            {/* Why Choose Us Section */}
            <PrivateDriverWhyChooseUs lang={language} />

            {/* Video Experience Section */}
            <section style={{ padding: '80px 20px', backgroundColor: '#fff', borderTop: 'none' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ 
                        fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginBottom: '30px',
                        fontFamily: 'var(--font-poppins), sans-serif'
                    }}>
                        {isEn ? "What riding with us feels like" : "L'expérience à bord avec nous"}
                    </h2>
                    
                    <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                        <VideoPlayer 
                            src="/img/mercedes-benz-vito-mdinatours.mp4#t=0,54" 
                            style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                        />
                    </div>

                    <p style={{ 
                        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', 
                        fontWeight: 500, 
                        color: '#555',
                        margin: '15px 0 0 0',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontStyle: 'italic'
                    }}>
                        {isEn ? "Every transfer. Every time. No surprises." : "Chaque transfert. À chaque fois. Sans surprise."}
                    </p>
                </div>
            </section>

            {/* Testimonials (Marquee Reviews) Section */}
            <TransferReviews language={language} />

            {/* Dynamic Fleet Slider Section */}
            <TransferFleet prices={trans.prices} lang={language} local={local} />

            {/* Whats Included / What's Covered Section */}
            <TransferWhatsIncluded language={language} local={local} />

            {/* Other Top Transfer Routes Section */}
            <TransferOtherRoutes language={language} />

            {/* FAQ Accordion Section */}
            <section className={faqStyles.faqSection} id="faq">
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <TransferFAQ faqs={local.faqs} slug={trans.slug} isEn={isEn} />
                </div>
            </section>

            {/* About Destination Section */}
            {local.aboutDestination && (
                <section style={{ 
                    padding: '100px 20px', 
                    backgroundColor: '#ffffff', 
                    borderTop: '1px solid rgba(0,0,0,0.05)' 
                }} id="about-destination">
                    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>
                        <TransferDestinationInfo {...propsObj} />
                    </div>
                </section>
            )}
            


            {/* Send Booking Request Modal */}
            {isModalOpen && (
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
                }} onClick={() => setIsModalOpen(false)}>
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
                            <button
                                onClick={() => setIsModalOpen(false)}
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

                            <h3 style={{
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                color: 'var(--secondary)',
                                marginBottom: '10px',
                                fontFamily: "'Cormorant Garamond', serif",
                                lineHeight: 1.1
                            }}>
                                {isEn ? "Request to Book" : "Demande de Réservation"}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '28px', lineHeight: 1.6 }}>
                                {isEn 
                                    ? "Almost there! Fill out your details below and our team will confirm your transfer shortly." 
                                    : "Presque terminé ! Remplissez vos coordonnées et notre équipe confirmera votre transfert sous peu."}
                            </p>

                            {successMessage ? (
                                <div style={{
                                    backgroundColor: '#ecfdf5',
                                    border: '1px solid #a7f3d0',
                                    color: '#065f46',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    margin: '20px 0'
                                }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</div>
                                    {successMessage}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                                transition: 'border-color 0.2s',
                                                backgroundColor: '#f8fafc'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
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
                                                transition: 'border-color 0.2s',
                                                backgroundColor: '#f8fafc'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
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
                                                transition: 'border-color 0.2s',
                                                backgroundColor: '#f8fafc'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>

                                    {/* We omit the textarea here but keep custMessage in state. It will be sent via handleSubmit */}

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
                                            transition: 'transform 0.2s, background-color 0.2s',
                                            marginTop: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {isSubmitting 
                                            ? (isEn ? "Sending..." : "Envoi...") 
                                            : (isEn ? "Confirm Booking Request" : "Confirmer la demande")}
                                        {!isSubmitting && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        )}
                                    </button>
                                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '-10px' }}>
                                        {isEn ? "No payment required now." : "Aucun paiement requis pour le moment."}
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

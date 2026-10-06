"use client";

import React, { useState } from 'react';
import styles from './ChauffeurDestinations.module.css';
import { Language } from '@/lib/translations';
import { ArrowRight, CheckCircle, MapPin } from '@phosphor-icons/react';

interface CityOption {
    name: string;
    labelEn: string;
    labelFr: string;
    labelEs: string;
    descEn: string;
    descFr: string;
    descEs: string;
}

const CITIES: CityOption[] = [
    {
        name: 'Casablanca',
        labelEn: 'Casablanca',
        labelFr: 'Casablanca',
        labelEs: 'Casablanca',
        descEn: 'Economic capital & CMN Airport pickups',
        descFr: 'Capitale économique & transferts aéroport CMN',
        descEs: 'Capital económica y recogidas en el aeropuerto CMN'
    },
    {
        name: 'Marrakech',
        labelEn: 'Marrakech',
        labelFr: 'Marrakech',
        labelEs: 'Marrakech',
        descEn: 'The Red City & Atlas Mountain gateways',
        descFr: 'La ville rouge & excursions vers l\'Atlas',
        descEs: 'La Ciudad Roja y puerta de entrada al Alto Atlas'
    },
    {
        name: 'Rabat',
        labelEn: 'Rabat / Salé',
        labelFr: 'Rabat / Salé',
        labelEs: 'Rabat / Salé',
        descEn: 'Imperial capital, coastal stays & corporate trips',
        descFr: 'Capitale impériale, séjours côtiers & voyages d\'affaires',
        descEs: 'Capital imperial, estancias costeras y viajes corporativos'
    },
    {
        name: 'Tangier',
        labelEn: 'Tangier',
        labelFr: 'Tanger',
        labelEs: 'Tánger',
        descEn: 'Northern gateway & Mediterranean ports',
        descFr: 'Porte du Nord & transferts maritimes',
        descEs: 'Puerta norte de Marruecos y puertos del Mediterráneo'
    },
    {
        name: 'Fes',
        labelEn: 'Fes / Fès',
        labelFr: 'Fès',
        labelEs: 'Fez',
        descEn: 'Cultural heart & ancient medieval Medina tours',
        descFr: 'Cœur culturel & visites de la médina médiévale',
        descEs: 'Corazón cultural y visitas a la milenaria medina'
    },
    {
        name: 'Other',
        labelEn: 'Agadir / Other',
        labelFr: 'Agadir / Autre',
        labelEs: 'Agadir / Otra ciudad',
        descEn: 'Custom starts from Agadir, Essaouira, or anywhere',
        descFr: 'Départs sur mesure depuis Agadir, Essaouira ou autre',
        descEs: 'Salidas a medida desde Agadir, Essaouira o cualquier punto'
    }
];

interface ChauffeurDestinationsProps {
    lang?: Language;
    pageType: 'morocco' | 'casablanca' | 'marrakech' | '8-days' | 'fes' | 'tangier' | 'agadir' | 'rabat' | 'chefchaouen';
    upperBgColor?: string;
}

export default function ChauffeurDestinations({ lang = 'en', pageType, upperBgColor = '#fcf9f6' }: ChauffeurDestinationsProps) {
    const isEn = lang === 'en';
    const isEs = lang === 'es';
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const getCopy = () => {
        switch (pageType) {
            case 'casablanca':
                return {
                    subtitle: isEn ? "Casablanca Premier Chauffeurs" : isEs ? "Chóferes de Prestigio en Casablanca" : "Chauffeur de Prestige à Casablanca",
                    title: isEn ? "Begin Your Casablanca Journey" : isEs ? "Comience su Viaje desde Casablanca" : "Commencez Votre Trajet Depuis Casablanca",
                    desc: isEn 
                        ? "Starting your trip in Casablanca? Select your departure point below. We will instantly pre-fill your private transfer or dispo chauffeur widget to get you on the road smoothly."
                        : isEs
                        ? "¿Comienza su viaje en Casablanca? Seleccione su punto de salida a continuación para actualizar el formulario y reservar su chófer privado."
                        : "Vous commencez votre voyage à Casablanca ? Sélectionnez votre point de départ ci-dessous. Nous pré-remplirons instantanément votre widget de réservation pour un départ en toute sérénité."
                };
            case 'marrakech':
                return {
                    subtitle: isEn ? "Marrakech Chauffeur Service" : isEs ? "Servicio de Chófer en Marrakech" : "Service Chauffeur Marrakech",
                    title: isEn ? "Explore from Marrakech" : isEs ? "Explore desde Marrakech" : "Explorez Depuis Marrakech",
                    desc: isEn 
                        ? "Ready to explore Marrakech or depart to other imperial cities? Select Marrakech as your starting city below to update the booking form and secure your premium private vehicle."
                        : isEs
                        ? "¿Listo para explorar Marrakech o viajar hacia otras ciudades imperiales? Seleccione Marrakech a continuación para configurar su vehículo privado."
                        : "Prêt à explorer Marrakech ou à partir vers d'autres villes ? Sélectionnez Marrakech comme ville de départ ci-dessous pour mettre à jour le formulaire et réserver votre véhicule premium."
                };
            case 'fes':
                return {
                    subtitle: isEn ? "Fes Chauffeur Service" : isEs ? "Servicio de Chófer en Fez" : "Service Chauffeur Fès",
                    title: isEn ? "Explore Fes & Cultural Landmarks" : isEs ? "Descubra Fez y Lugares Históricos" : "Explorez Fès & ses Lieux Culturels",
                    desc: isEn 
                        ? "Starting in the spiritual heart of Morocco? Select Fes as your starting point below to configure your custom tour, Medina excursion, or intercity travel."
                        : isEs
                        ? "¿Inicia su ruta en el corazón espiritual de Marruecos? Seleccione Fez para configurar su excursión a medida o viaje interurbano."
                        : "Vous partez du cœur spirituel du Maroc ? Sélectionnez Fès comme ville de départ ci-dessous pour configurer votre circuit sur mesure, visite de la médina ou voyage interurbain."
                };
            case 'tangier':
                return {
                    subtitle: isEn ? "Tangier Chauffeur Service" : isEs ? "Servicio de Chófer en Tánger" : "Service Chauffeur Tanger",
                    title: isEn ? "Discover Northern Morocco from Tangier" : isEs ? "Descubra el Norte de Marruecos desde Tánger" : "Découvrez le Nord du Maroc Depuis Tanger",
                    desc: isEn 
                        ? "Arriving by ferry or at Tangier Airport? Select Tangier as your starting city below to set up your dispo driver and explore the northern coastline, Rif Mountains, or historic sites."
                        : isEs
                        ? "¿Llega en ferry o al aeropuerto de Tánger? Seleccione Tánger para reservar su conductor privado y recorrer la costa norte y el Rif."
                        : "Arrivée en ferry ou à l'aéroport de Tanger ? Sélectionnez Tanger comme ville de départ ci-dessous pour réserver votre chauffeur dispo et explorer la côte nord, le Rif ou les sites historiques."
                };
            case 'agadir':
                return {
                    subtitle: isEn ? "Agadir Chauffeur Service" : isEs ? "Servicio de Chófer en Agadir" : "Service Chauffeur Agadir",
                    title: isEn ? "Explore Agadir & Coastline" : isEs ? "Explore Agadir y la Costa Sur" : "Explorez Agadir & la Côte",
                    desc: isEn 
                        ? "Starting your beach holiday or southern exploration in Agadir? Select Agadir below to plan your trip to Paradise Valley, Taghazout, or transfer to Marrakech."
                        : isEs
                        ? "¿Comienza sus vacaciones en Agadir? Seleccione Agadir para planificar su excursión a Paradise Valley, Taghazout o traslado a Marrakech."
                        : "Vous commencez vos vacances ou votre exploration du Sud à Agadir ? Sélectionnez Agadir ci-dessous pour planifier votre excursion à Paradise Valley, Taghazout ou vers Marrakech."
                };
            case 'rabat':
                return {
                    subtitle: isEn ? "Rabat Chauffeur Service" : isEs ? "Servicio de Chófer en Rabat" : "Service Chauffeur Rabat",
                    title: isEn ? "Explore the Capital City Rabat" : isEs ? "Explore la Capital Rabat" : "Explorez la Capitale Rabat",
                    desc: isEn 
                        ? "Starting your business or leisure trip in Rabat? Select Rabat below to coordinate your corporate dispo chauffeur, airport transfers, or custom tours."
                        : isEs
                        ? "¿Inicia su viaje en Rabat? Seleccione Rabat para reservar su chófer a disposición, traslados o visitas a medida."
                        : "Vous démarrez votre voyage d'affaires ou d'agrément à Rabat ? Sélectionnez Rabat ci-dessous pour coordonner votre chauffeur à disposition, vos transferts ou circuits."
                };
            case 'chefchaouen':
                return {
                    subtitle: isEn ? "Chefchaouen Chauffeur Service" : isEs ? "Servicio de Chófer en Chefchaouen" : "Service Chauffeur Chefchaouen",
                    title: isEn ? "Begin in the Blue City Chefchaouen" : isEs ? "Comience en la Ciudad Azul de Chefchaouen" : "Démarrez dans la Ville Bleue de Chefchaouen",
                    desc: isEn 
                        ? "Planning to explore the Rif region or start your trip from Chefchaouen? Select Chefchaouen below to configure your private driver package and itinerary."
                        : isEs
                        ? "¿Desea explorar la región del Rif o partir desde Chefchaouen? Seleccione Chefchaouen para configurar su itinerario."
                        : "Vous prévoyez d'explorer la région du Rif ou de démarrer votre voyage à Chefchaouen ? Sélectionnez Chefchaouen ci-dessous pour configurer votre formule avec chauffeur."
                };
            case '8-days':
                return {
                    subtitle: isEn ? "Custom 8-Day Morocco Tour" : isEs ? "Circuito a Medida de 8 Días" : "Circuit sur Mesure 8 Jours",
                    title: isEn ? "Start Your 8-Day Experience" : isEs ? "Comience su Aventura de 8 Días" : "Démarrez Votre Circuit de 8 Jours",
                    desc: isEn
                        ? "Select your starting city below to map out your private 8-day tour of Morocco. Your driver and premium vehicle will be dedicated to you from day one."
                        : isEs
                        ? "Seleccione su ciudad de salida a continuación para planificar su circuito privado de 8 días por Marruecos. Su conductor y vehículo estarán dedicados exclusivamente a su grupo."
                        : "Sélectionnez votre ville de départ ci-dessous pour planifier votre circuit privé de 8 jours. Votre chauffeur et votre véhicule premium vous seront dédiés dès le premier jour."
                };
            case 'morocco':
            default:
                return {
                    subtitle: isEn ? "Choose Your Starting Point" : isEs ? "Elija su Punto de Salida" : "Choisissez Votre Point de Départ",
                    title: isEn ? "Start Your Morocco Journey" : isEs ? "Comience su Viaje por Marruecos" : "Commencez Votre Voyage au Maroc",
                    desc: isEn 
                        ? "Where does your Moroccan adventure begin? Select your starting city below to pre-fill your booking request. Your private driver will be waiting at your hotel, airport terminal, or custom pickup point."
                        : isEs
                        ? "¿Dónde comienza su aventura marroquí? Seleccione su ciudad de salida para actualizar la reserva. Su chófer le esperará en su hotel o aeropuerto."
                        : "Où commence votre aventure marocaine ? Sélectionnez votre ville de départ ci-dessous pour pré-remplir votre demande de réservation. Votre chauffeur privé vous attendra à votre hôtel, à l'aéroport ou au lieu de votre choix."
                };
        }
    };

    const copy = getCopy();
    const titleText = copy.title;

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName);

        // Dispatch custom event to notify booking widget
        const event = new CustomEvent('set-starting-city', { detail: cityName });
        window.dispatchEvent(event);

        // Smooth scroll to booking widget
        const bookingEl = document.getElementById('booking');
        if (bookingEl) {
            bookingEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.destinationsSection}>
            {/* Top Wave Divider */}
            <div className={styles.waveDividerTop}>
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"
                        fill={upperBgColor}
                    ></path>
                </svg>
            </div>

            <div className={styles.content}>
                <div className={styles.subtitle}>{copy.subtitle}</div>
                <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: titleText.replace('\n', '<br />') }}></h2>
                <p className={styles.description} dangerouslySetInnerHTML={{ __html: copy.desc.replace('\n', '<br />') }}></p>
                
                <div className={styles.grid}>
                    {CITIES.map((city) => {
                        const isSelected = selectedCity === city.name;
                        const label = isEn ? city.labelEn : (isEs ? city.labelEs : city.labelFr);
                        const desc = isEn ? city.descEn : (isEs ? city.descEs : city.descFr);

                        const actionLabel = pageType === '8-days'
                            ? (isEn ? `Plan 8 Days from ${city.name}` : isEs ? `Planificar 8 Días desde ${label}` : `Planifier 8 Jours depuis ${label}`)
                            : (isEn ? `Select ${city.name} as origin` : isEs ? `Seleccionar ${label} como origen` : `Choisir ${label} comme départ`);

                        return (
                            <div 
                                key={city.name} 
                                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                                onClick={() => handleCitySelect(city.name)}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>
                                            <MapPin size={22} weight="fill" className={styles.pinIcon} />
                                            <span>{label}</span>
                                        </h3>
                                        {isSelected && (
                                            <span className={styles.badgeSelected}>
                                                <CheckCircle size={14} weight="fill" />
                                                {isEn ? "Selected" : isEs ? "Seleccionado" : "Sélectionné"}
                                            </span>
                                        )}
                                    </div>
                                    <p className={styles.cardDesc}>
                                        {desc}
                                    </p>
                                </div>

                                <div className={styles.cardAction}>
                                    <span className={styles.actionText}>{actionLabel}</span>
                                    <ArrowRight size={16} weight="bold" className={styles.arrow} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Wave Divider */}
            <div className={styles.waveDivider}>
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,120 Q600,0 1200,120 L1200,120 L0,120 Z"
                        fill="#fcf9f6"
                    ></path>
                </svg>
            </div>
        </section>
    );
}


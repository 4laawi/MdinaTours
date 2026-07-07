"use client";

import React from 'react';
import styles from './ChauffeurDestinations.module.css';

interface CityOption {
    name: string;
    labelEn: string;
    labelFr: string;
    descEn: string;
    descFr: string;
}

const CITIES: CityOption[] = [
    {
        name: 'Casablanca',
        labelEn: 'Casablanca',
        labelFr: 'Casablanca',
        descEn: 'Economic capital & CMN Airport pickups',
        descFr: 'Capitale économique & transferts aéroport CMN'
    },
    {
        name: 'Marrakech',
        labelEn: 'Marrakech',
        labelFr: 'Marrakech',
        descEn: 'The Red City & Atlas Mountain gateways',
        descFr: 'La ville rouge & excursions vers l\'Atlas'
    },
    {
        name: 'Rabat',
        labelEn: 'Rabat',
        labelFr: 'Rabat',
        descEn: 'Imperial capital, coastal stays & corporate trips',
        descFr: 'Capitale impériale, séjours côtiers & voyages d\'affaires'
    },
    {
        name: 'Tangier',
        labelEn: 'Tangier',
        labelFr: 'Tanger',
        descEn: 'Northern gateway & Mediterranean ports',
        descFr: 'Porte du Nord & transferts maritimes'
    },
    {
        name: 'Fes',
        labelEn: 'Fes / Fès',
        labelFr: 'Fès',
        descEn: 'Cultural heart & ancient medieval Medina tours',
        descFr: 'Cœur culturel & visites de la médina médiévale'
    },
    {
        name: 'Other',
        labelEn: 'Agadir / Other',
        labelFr: 'Agadir / Autre',
        descEn: 'Custom starts from Agadir, Essaouira, or anywhere',
        descFr: 'Départs sur mesure depuis Agadir, Essaouira ou autre'
    }
];

interface ChauffeurDestinationsProps {
    lang: 'en' | 'fr';
    pageType: 'morocco' | 'casablanca' | 'marrakech' | '8-days';
    upperBgColor?: string;
}

export default function ChauffeurDestinations({ lang = 'en', pageType, upperBgColor = '#f3efea' }: ChauffeurDestinationsProps) {
    const isEn = lang === 'en';

    const getCopy = () => {
        switch (pageType) {
            case 'casablanca':
                return {
                    subtitle: isEn ? "Casablanca Premier Chauffeurs" : "Chauffeur de Prestige à Casablanca",
                    title: isEn ? "Begin Your Casablanca Journey" : "Commencez Votre Trajet Depuis Casablanca",
                    desc: isEn 
                        ? "Starting your trip in Casablanca? Select your departure point below. We will instantly pre-fill your private transfer or dispo chauffeur widget to get you on the road smoothly."
                        : "Vous commencez votre voyage à Casablanca ? Sélectionnez votre point de départ ci-dessous. Nous pré-remplirons instantanément votre widget de réservation pour un départ en toute sérénité."
                };
            case 'marrakech':
                return {
                    subtitle: isEn ? "Marrakech Chauffeur Service" : "Service Chauffeur Marrakech",
                    title: isEn ? "Explore from Marrakech" : "Explorez Depuis Marrakech",
                    desc: isEn 
                        ? "Ready to explore Marrakech or depart to other imperial cities? Select Marrakech as your starting city below to update the booking form and secure your premium private vehicle."
                        : "Prêt à explorer Marrakech ou à partir vers d'autres villes ? Sélectionnez Marrakech comme ville de départ ci-dessous pour mettre à jour le formulaire et réserver votre véhicule premium."
                };
            case '8-days':
                return {
                    subtitle: isEn ? "Custom 8-Day Morocco Tour" : "Circuit sur Mesure 8 Jours",
                    title: isEn ? "Start Your 8-Day Experience" : "Démarrez Votre Circuit de 8 Jours",
                    desc: isEn
                        ? "Select your starting city below to map out your private 8-day tour of Morocco. Your driver and premium vehicle will be dedicated to you from day one."
                        : "Sélectionnez votre ville de départ ci-dessous pour planifier votre circuit privé de 8 jours. Votre chauffeur et votre véhicule premium vous seront dédiés dès le premier jour."
                };
            case 'morocco':
            default:
                return {
                    subtitle: isEn ? "Choose Your Starting Point" : "Choisissez Votre Point de Départ",
                    title: isEn ? "Start Your Morocco Journey" : "Commencez Votre Voyage au Maroc",
                    desc: isEn 
                        ? "Where does your Moroccan adventure begin? Select your starting city below to pre-fill your booking request. Your private driver will be waiting at your hotel, airport terminal, or custom pickup point."
                        : "Où commence votre aventure marocaine ? Sélectionnez votre ville de départ ci-dessous pour pré-remplir votre demande de réservation. Votre chauffeur privé vous attendra à votre hôtel, à l'aéroport ou au lieu de votre choix."
                };
        }
    };

    const copy = getCopy();
    const titleText = copy.title;

    const handleCitySelect = (cityName: string) => {
        // Dispatch custom event to notify booking widget
        const event = new CustomEvent('set-starting-city', { detail: cityName });
        window.dispatchEvent(event);
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
                    {CITIES.map((city) => (
                        <div 
                            key={city.name} 
                            className={styles.card}
                            onClick={() => handleCitySelect(city.name)}
                        >
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>
                                    <span>📍</span> {isEn ? city.labelEn : city.labelFr}
                                </h3>
                                <p className={styles.cardDesc}>
                                    {isEn ? city.descEn : city.descFr}
                                </p>
                            </div>
                            <div className={styles.cardAction}>
                                <span>{isEn ? "Select Location" : "Choisir ce départ"}</span>
                                <span className={styles.arrow}>→</span>
                            </div>
                        </div>
                    ))}
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

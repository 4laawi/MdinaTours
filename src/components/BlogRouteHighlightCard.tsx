import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language } from '@/lib/translations';
import styles from './BlogRouteHighlightCard.module.css';

export interface BlogRouteHighlightCardProps {
    language: Language;
    title: string;
    subtitle?: string;
    routeDetails?: {
        origin: string;
        destination: string;
        distance?: string;
        duration?: string;
        priceFrom?: number;
    };
    transferLink: string;
    transferLinkText?: string;
    whatsAppUrl: string;
    perks?: string[];
    badgeText?: string;
    imageUrl?: string;
}

export default function BlogRouteHighlightCard({
    language,
    title,
    subtitle,
    routeDetails,
    transferLink,
    transferLinkText,
    whatsAppUrl,
    perks,
    badgeText,
    imageUrl
}: BlogRouteHighlightCardProps) {
    const isEn = language === 'en';

    const defaultBadge = isEn 
        ? "Official Mdina Tours Service • Direct Door-to-Door"
        : "Service Officiel Mdina Tours • Liaisons Directes Porte-à-Porte";

    const defaultPerks = isEn ? [
        "Door-to-door pickup directly at your Hotel, Riad, or Airport terminal",
        "Modern air-conditioned Mercedes Vito minivans and executive sedans",
        "Professional English & French speaking drivers with extensive highway experience",
        "Flexible photo stops along the route (Atlas Mountains, cedar forests, panoramic valleys)",
        "Zero upfront payment required – pay directly upon arrival"
    ] : [
        "Prise en charge porte-à-porte devant votre Riad, Hôtel ou terminal d'Aéroport",
        "Véhicules récents et climatisés : minivans Mercedes Vito et berlines grand confort",
        "Chauffeurs professionnels bilingues (français & anglais) expérimentés",
        "Arrêts photos et pauses libres à votre rythme le long de l'itinéraire",
        "Aucun prépaiement obligatoire – paiement sécurisé directement à destination"
    ];

    const displayPerks = perks && perks.length > 0 ? perks : defaultPerks;
    const defaultBtnText = isEn ? "View Rates & Book Transfer Online" : "Voir les Tarifs & Réserver le Transfert en Ligne";

    return (
        <aside aria-label="Route Transfer Service" className={styles.highlightCard}>
            <div className={styles.topBadgeRow}>
                <span className={styles.badge}>
                    <span className={styles.badgePulse}></span>
                    {badgeText || defaultBadge}
                </span>
                {routeDetails?.priceFrom && (
                    <span className={styles.pricePill}>
                        <span className={styles.priceLabel}>{isEn ? "From" : "Dès"}</span>
                        <strong className={styles.priceAmount}>€{routeDetails.priceFrom}</strong>
                        <span className={styles.pricePerVehicle}>{isEn ? "/ vehicle" : "/ véhicule"}</span>
                    </span>
                )}
            </div>

            <div className={styles.headerArea}>
                <div className={styles.headerText}>
                    <h3 className={styles.title}>{title}</h3>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                {imageUrl && (
                    <div className={styles.thumbnailWrapper}>
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="120px"
                            className={styles.thumbnailImage}
                        />
                    </div>
                )}
            </div>

            {routeDetails && (
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.statIcon}>📍</span>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>{isEn ? "Route" : "Itinéraire"}</span>
                            <strong className={styles.statValue}>
                                {routeDetails.origin} ⇄ {routeDetails.destination}
                            </strong>
                        </div>
                    </div>
                    {routeDetails.distance && (
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>🛣️</span>
                            <div className={styles.statContent}>
                                <span className={styles.statLabel}>{isEn ? "Distance" : "Distance"}</span>
                                <strong className={styles.statValue}>{routeDetails.distance}</strong>
                            </div>
                        </div>
                    )}
                    {routeDetails.duration && (
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>⏱️</span>
                            <div className={styles.statContent}>
                                <span className={styles.statLabel}>{isEn ? "Estimated Duration" : "Durée Estimée"}</span>
                                <strong className={styles.statValue}>{routeDetails.duration}</strong>
                            </div>
                        </div>
                    )}
                    <div className={styles.statItem}>
                        <span className={styles.statIcon}>🚐</span>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>{isEn ? "Fleet" : "Véhicule"}</span>
                            <strong className={styles.statValue}>Mercedes Vito / Van</strong>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.perksList}>
                {displayPerks.map((perk, idx) => (
                    <div key={idx} className={styles.perkItem}>
                        <span className={styles.perkCheck}>✓</span>
                        <span className={styles.perkText}>{perk}</span>
                    </div>
                ))}
            </div>

            <div className={styles.actionsRow}>
                <Link href={transferLink} className={styles.primaryCta}>
                    <span>{transferLinkText || defaultBtnText}</span>
                    <span className={styles.arrowIcon}>→</span>
                </Link>
                <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappCta}
                >
                    <svg
                        className={styles.whatsappIcon}
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>{isEn ? "Book via WhatsApp" : "Réserver via WhatsApp"}</span>
                </a>
            </div>

            <div className={styles.footerTrust}>
                <span className={styles.trustItem}>🛡️ {isEn ? "No upfront deposit required" : "Paiement direct au chauffeur"}</span>
                <span className={styles.trustDot}>•</span>
                <span className={styles.trustItem}>⭐ {isEn ? "4.9/5 rated service" : "Note 4.9/5 satisfaction"}</span>
                <span className={styles.trustDot}>•</span>
                <span className={styles.trustItem}>⚡ {isEn ? "Instant booking confirmation" : "Confirmation rapide garantie"}</span>
            </div>
        </aside>
    );
}

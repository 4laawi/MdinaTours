import React from 'react';
import Link from 'next/link';
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
    badgeText
}: BlogRouteHighlightCardProps) {
    const isEn = language === 'en';

    const defaultBadge = isEn 
        ? "Private Transfer Service • Mdina Tours"
        : "Service de Transfert Privé • Mdina Tours";

    const defaultPerks = isEn ? [
        "Door-to-door pickup directly at your Hotel, Riad, or Airport terminal",
        "Air-conditioned Mercedes Vito minivans and comfortable executive sedans",
        "Professional bilingual drivers with flexible photo stops on route",
        "No upfront deposit – pay directly upon arrival"
    ] : [
        "Prise en charge porte-à-porte devant votre Riad, Hôtel ou terminal d'Aéroport",
        "Minivans Mercedes Vito et berlines grand confort récents et climatisés",
        "Chauffeurs bilingues professionnels et arrêts photos libres sur le trajet",
        "Paiement direct à destination sans acompte préalable"
    ];

    const displayPerks = perks && perks.length > 0 ? perks : defaultPerks;
    const defaultBtnText = isEn ? "View Rates & Book Online →" : "Voir les tarifs et réserver →";

    return (
        <aside aria-label="Route Transfer Service" className={styles.cardContainer}>
            <div className={styles.kickerRow}>
                <span className={styles.kicker}>{badgeText || defaultBadge}</span>
                {routeDetails?.priceFrom && (
                    <span className={styles.priceTag}>
                        <span className={styles.pricePrefix}>{isEn ? "From" : "Dès"}</span>
                        <strong className={styles.priceValue}>€{routeDetails.priceFrom}</strong>
                        <span className={styles.priceUnit}>{isEn ? "/ vehicle" : "/ véhicule"}</span>
                    </span>
                )}
            </div>

            <div className={styles.headerBlock}>
                <h3 className={styles.cardTitle}>{title}</h3>
                {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
            </div>

            {routeDetails && (
                <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{isEn ? "Route" : "Itinéraire"}</span>
                        <span className={styles.metaValue}>{routeDetails.origin} ⇄ {routeDetails.destination}</span>
                    </div>
                    {routeDetails.distance && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>{isEn ? "Distance" : "Distance"}</span>
                            <span className={styles.metaValue}>{routeDetails.distance}</span>
                        </div>
                    )}
                    {routeDetails.duration && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>{isEn ? "Duration" : "Durée"}</span>
                            <span className={styles.metaValue}>{routeDetails.duration}</span>
                        </div>
                    )}
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>{isEn ? "Vehicle" : "Véhicule"}</span>
                        <span className={styles.metaValue}>Mercedes Vito / Van</span>
                    </div>
                </div>
            )}

            <ul className={styles.perksList}>
                {displayPerks.map((perk, idx) => (
                    <li key={idx} className={styles.perkItem}>
                        <span className={styles.perkBullet}>•</span>
                        <span className={styles.perkText}>{perk}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.actionsRow}>
                <Link href={transferLink} className={styles.primaryBtn}>
                    {transferLinkText || defaultBtnText}
                </Link>
                <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                >
                    <svg
                        className={styles.btnIcon}
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>{isEn ? "WhatsApp Inquiry" : "Réservation WhatsApp"}</span>
                </a>
            </div>
        </aside>
    );
}

import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import styles from './ChefchaouenTrainNotice.module.css';

export interface ChefchaouenTrainNoticeProps {
    language: Language;
    originCity?: string;
    transferLink: string;
    price?: number;
    whatsAppUrl: string;
}

export default function ChefchaouenTrainNotice({
    language,
    originCity,
    transferLink,
    price,
    whatsAppUrl
}: ChefchaouenTrainNoticeProps) {
    const isEn = language === 'en';
    const city = originCity || (isEn ? "your departure city" : "votre ville de départ");

    return (
        <aside aria-label="Important Travel Alert" className={styles.alertContainer}>
            <div className={styles.alertHeader}>
                <span className={styles.badge}>
                    <span>⚠️</span>
                    <span>{isEn ? "Traveler Notice: No Direct Train Service" : "Avis Voyageurs : Aucun Train Direct"}</span>
                </span>
            </div>

            <h3 className={styles.alertTitle}>
                {isEn 
                    ? `There is No Train to Chefchaouen (ONCF Railway Ends Hours Away)`
                    : `Il n'y a aucun train pour Chefchaouen (L'ONCF s'arrête bien avant)`}
            </h3>

            <p className={styles.alertText}>
                {isEn ? (
                    <>
                        Searching for train tickets from <strong>{city} to Chefchaouen</strong>? Please note that <strong>Chefchaouen has no railway station</strong> due to the steep Rif mountain geography. The nearest ONCF train tracks terminate hours away at Tangier or Souk El Arbaa.
                    </>
                ) : (
                    <>
                        Vous cherchez un billet de train de <strong>{city} à Chefchaouen</strong> ? Sachez que <strong>la ville de Chefchaouen ne dispose d'aucune gare ferroviaire</strong> en raison du relief montagneux du Rif. Les lignes de l'ONCF s'arrêtent à Tanger ou Souk El Arbaa.
                    </>
                )}
            </p>

            <p className={styles.alertText}>
                {isEn ? (
                    <>
                        <strong>The Hassle-Free Alternative:</strong> Instead of spending 5+ hours on crowded public buses and multiple taxi connections, book a direct door-to-door <Link href={`/${language}/private-driver`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>private driver in Morocco</Link> with Mdina Tours.
                    </>
                ) : (
                    <>
                        <strong>L'Alternative Confortable :</strong> Pour éviter plus de 5 heures de trajet en bus bondé et les changements de taxis, réservez un <Link href={`/${language}/private-driver`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>chauffeur privé au Maroc</Link> avec Mdina Tours.
                    </>
                )}
            </p>

            <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                    <span className={styles.bulletIcon}>✓</span>
                    <span>{isEn ? "Direct pickup at your hotel or Riad door" : "Prise en charge directe devant votre Riad ou hôtel"}</span>
                </li>
                <li className={styles.bulletItem}>
                    <span className={styles.bulletIcon}>✓</span>
                    <span>{isEn ? "Saves 2 to 3 hours vs public transit" : "Gain de 2 à 3 heures sur les transports publics"}</span>
                </li>
                <li className={styles.bulletItem}>
                    <span className={styles.bulletIcon}>✓</span>
                    <span>{isEn ? "Air-conditioned modern Mercedes minivans" : "Vans Mercedes et berlines récentes et climatisées"}</span>
                </li>
                <li className={styles.bulletItem}>
                    <span className={styles.bulletIcon}>✓</span>
                    <span>{isEn ? "Free scenic photo stops in the Rif Mountains" : "Arrêts photos libres dans le massif du Rif"}</span>
                </li>
                <li className={styles.bulletItem}>
                    <span className={styles.bulletIcon}>✓</span>
                    <span>{isEn ? "Zero prepayment: pay your driver on arrival" : "Zéro acompte : paiement direct au chauffeur à l'arrivée"}</span>
                </li>
            </ul>

            <div className={styles.actionsRow}>
                <Link href={transferLink} className={styles.primaryBtn}>
                    <span>
                        {isEn 
                            ? (price ? `Book Direct Transfer (From €${price}) →` : `Book Direct Transfer Online →`)
                            : (price ? `Réserver le Transfert Direct (Dès ${price}€) →` : `Réserver le Transfert Direct en Ligne →`)}
                    </span>
                </Link>

                <a 
                    href={whatsAppUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.whatsAppBtn}
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>{isEn ? "Inquire on WhatsApp" : "Réserver par WhatsApp"}</span>
                </a>

                <Link href={`/${language}/private-driver`} className={styles.secondaryLink}>
                    {isEn ? "View all private driver options →" : "Voir nos services de chauffeur privé →"}
                </Link>
            </div>
        </aside>
    );
}

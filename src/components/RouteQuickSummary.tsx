import React from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { Language } from '@/lib/translations';
import styles from './RouteQuickSummary.module.css';

export interface RouteQuickSummaryProps {
    language: Language;
    origin: string;
    destination: string;
    distance?: string;
    carDuration?: string;
    carPrice?: number;
    hasTrain?: boolean;
    trainDuration?: string;
    busDuration?: string;
    busPriceMAD?: number | string;
    busPriceEUR?: number | string;
    transferUrl?: string;
    trainAnchor?: string;
    busAnchor?: string;
}

export default function RouteQuickSummary({
    language,
    origin,
    destination,
    distance = "250 km",
    carDuration = "4h 00m",
    carPrice = 249,
    hasTrain = false,
    trainDuration,
    busDuration = "About 5h 10m",
    busPriceMAD = "160",
    busPriceEUR = "15",
    transferUrl,
    trainAnchor = "#train-reality",
    busAnchor = "#bus-guide"
}: RouteQuickSummaryProps) {
    const isEn = language === 'en';

    return (
        <section className={styles.section} aria-label={isEn ? "Travel options summary" : "Résumé des options de transport"}>
            <div className={styles.container}>
                <h2 className={styles.hd}>
                    {isEn 
                        ? `2 ways to get from ${origin} to ${destination} by bus or car`
                        : `2 façons de se rendre de ${origin} à ${destination} : en bus ou en voiture`}
                </h2>
                <p className={styles.leadDistance}>
                    {isEn ? `${distance} by road.` : `${distance} par la route.`}
                </p>

                <div className={styles.cards}>
                    {/* 1. Private Transfer */}
                    <div className={`${styles.card} ${styles.rec}`}>
                        <span className={styles.tag}>{isEn ? "FASTEST" : "LE PLUS RAPIDE"}</span>
                        <h3 className={styles.ttl}>{isEn ? "Private transfer" : "Transfert privé"}</h3>
                        <div className={styles.meta}>
                            {carDuration} · {isEn ? "door to door" : "porte à porte"}
                        </div>
                        <div className={styles.price}>€{carPrice}</div>
                        <div className={styles.sub}>
                            {isEn 
                                ? `per vehicle · about €${Math.round(carPrice / 6)} each for 6`
                                : `par véhicule · environ ${Math.round(carPrice / 6)}€/pers. pour 6`}
                        </div>
                        <div className={styles.det}>
                            {isEn 
                                ? "Pickup from your hotel or riad in a modern air-conditioned Mercedes Vito. Stop for photos and coffee in the Rif."
                                : "Prise en charge à votre hôtel ou riad en Mercedes Vito climatisé. Arrêts photos et pauses café libres dans le Rif."}
                        </div>
                        {transferUrl ? (
                            <Link href={transferUrl} className={`${styles.btn} ${styles.btnFill}`}>
                                {isEn ? "Book private transfer" : "Réserver ce transfert"}
                            </Link>
                        ) : (
                            <a href="#private-transfer" className={`${styles.btn} ${styles.btnFill}`}>
                                {isEn ? "View private transfer" : "Détails du transfert"}
                            </a>
                        )}
                    </div>

                    {/* 2. Highway Bus */}
                    <div className={styles.card}>
                        <span className={`${styles.tag} ${styles.tagMute}`}>
                            {isEn ? "CHEAPEST" : "LE MOINS CHER"}
                        </span>
                        <h3 className={styles.ttl}>{isEn ? "Highway bus (CTM)" : "Autocar (CTM)"}</h3>
                        <div className={styles.meta}>
                            {busDuration} · {isEn ? "direct" : "direct"}
                        </div>
                        <div className={styles.price}>MAD {busPriceMAD}</div>
                        <div className={styles.sub}>
                            {isEn ? `about €${busPriceEUR} per person` : `environ ${busPriceEUR}€ par personne`}
                        </div>
                        <div className={styles.det}>
                            {isEn 
                                ? "Departs from Rabat Kamra station, no bus change. Air-conditioned national coach."
                                : "Départ depuis la gare routière Rabat Kamra, sans correspondance. Autocar climatisé avec soute."}
                        </div>
                        <a href={busAnchor} className={`${styles.btn} ${styles.btnLine}`}>
                            {isEn ? "View bus guide" : "Consulter le guide bus"}
                        </a>
                    </div>
                </div>

                {/* Train Info Note */}
                <p className={styles.trainNote}>
                    <Info className={styles.infoIcon} size={18} strokeWidth={2} aria-hidden="true" />
                    <span>
                        {isEn 
                            ? "No direct train. Chefchaouen has no railway station, and the nearest one is in Tangier, 2.5h away. "
                            : "Aucun train direct. Chefchaouen ne dispose d'aucune gare et la plus proche se trouve à Tanger (2h30). "}
                        <a href={trainAnchor} className={styles.trainLink}>
                            {isEn ? "Why there's no train →" : "Pourquoi il n'y a pas de train →"}
                        </a>
                    </span>
                </p>
            </div>
        </section>
    );
}

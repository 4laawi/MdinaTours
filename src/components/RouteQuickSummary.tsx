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
    const isChefchaouen = origin.toLowerCase().includes('chefchaouen') || destination.toLowerCase().includes('chefchaouen');

    const whatsAppText = isEn
        ? `Hello Mdina Tours, I am planning a trip from ${origin} to ${destination} and would like to book a private transfer (€${carPrice}). Please check availability.`
        : `Bonjour Mdina Tours, je souhaite réserver un transfert privé de ${origin} à ${destination} (${carPrice}€). Pourriez-vous me confirmer la disponibilité ?`;

    const whatsAppUrl = `https://wa.me/212724114775?text=${encodeURIComponent(whatsAppText)}`;

    return (
        <section className={styles.section} aria-label={isEn ? "Travel options summary" : "Résumé des options de transport"}>
            <div className={styles.container}>
                <h2 className={styles.hd}>
                    {isEn
                        ? `${hasTrain ? '3' : '2'} ways to get from ${origin} to ${destination}${hasTrain ? ' by train, bus or car' : ' by bus or car'}`
                        : `${hasTrain ? '3' : '2'} façons de se rendre de ${origin} à ${destination} : ${hasTrain ? 'en train, bus ou voiture' : 'en bus ou en voiture'}`}
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
                                ? (isChefchaouen
                                    ? `Pickup from your hotel or riad in ${origin} in a modern air-conditioned vehicle. Stop for photos and coffee in the Rif.`
                                    : `Pickup from your hotel, riad or airport in ${origin} in a modern air-conditioned vehicle. Door-to-door comfort with flexible departure.`)
                                : (isChefchaouen
                                    ? `Prise en charge à votre hôtel ou riad à ${origin} en Mercedes Vito climatisé. Arrêts photos et pauses café libres dans le Rif.`
                                    : `Prise en charge à votre hôtel, riad ou aéroport à ${origin} en véhicule climatisé. Confort porte-à-porte et horaire libre.`)}
                        </div>
                        <div className={styles.ctaGroup}>
                            <a
                                href={whatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.btn} ${styles.btnWhatsApp}`}
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.927-3.561 7.928-7.928a7.89 7.89 0 0 0-2.325-5.695M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.618-4.934c-.198-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.448.099-.133.197-.513.646-.629.775-.115.13-.232.146-.43.047-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.09-.088.198-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.448-1.078-.613-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                                <span>{isEn ? "Book via WhatsApp (1-Tap)" : "Réserver via WhatsApp (1-Clic)"}</span>
                            </a>
                            {transferUrl ? (
                                <Link href={transferUrl} className={`${styles.btn} ${styles.btnLine}`}>
                                    {isEn ? "View Route & Pricing" : "Voir Détails & Tarifs"}
                                </Link>
                            ) : (
                                <a href="#private-transfer" className={`${styles.btn} ${styles.btnLine}`}>
                                    {isEn ? "View Route Details" : "Détails du transfert"}
                                </a>
                            )}
                        </div>
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
                                ? `Direct intercity coach from ${origin}. Air-conditioned national coach with luggage storage.`
                                : `Autocar interurbain direct depuis ${origin}. Véhicule climatisé avec soute à bagages.`}
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
                        {hasTrain ? (
                            <>
                                {isEn
                                    ? `Direct ONCF train connects ${origin} and ${destination} (~${trainDuration || "station-to-station"}). `
                                    : `Ligne de train ONCF directe disponible entre ${origin} et ${destination} (~${trainDuration || "gare à gare"}). `}
                                <a href={trainAnchor} className={styles.trainLink}>
                                    {isEn ? "Compare train vs transfer →" : "Voir comparatif train vs transfert →"}
                                </a>
                            </>
                        ) : isChefchaouen ? (
                            <>
                                {isEn
                                    ? "No direct train. Chefchaouen has no railway station, and the nearest one is in Tangier, 2.5h away. "
                                    : "Aucun train direct. Chefchaouen ne dispose d'aucune gare et la plus proche se trouve à Tanger (2h30). "}
                                <a href={trainAnchor} className={styles.trainLink}>
                                    {isEn ? "Why there's no train →" : "Pourquoi il n'y a pas de train →"}
                                </a>
                            </>
                        ) : (
                            <>
                                {isEn
                                    ? `No direct railway line exists between ${origin} and ${destination}. Road transport is required. `
                                    : `Aucune ligne ferroviaire directe ne relie ${origin} et ${destination}. Trajet routier requis. `}
                                <a href="#comparison" className={styles.trainLink}>
                                    {isEn ? "See route details →" : "Détails du trajet →"}
                                </a>
                            </>
                        )}
                    </span>
                </p>
            </div>
        </section>
    );
}

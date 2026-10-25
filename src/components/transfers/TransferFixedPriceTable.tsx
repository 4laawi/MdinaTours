"use client";

import React from 'react';
import { FixedPriceTableData } from '@/lib/transfersData';
import { Icon } from '@iconify/react';
import styles from './TransferFixedPriceTable.module.css';

interface TransferFixedPriceTableProps {
    data: FixedPriceTableData;
    isEn: boolean;
    isEs: boolean;
}

export default function TransferFixedPriceTable({ data, isEn, isEs }: TransferFixedPriceTableProps) {
    const isFr = !isEn && !isEs;

    const labels = {
        badge: data.badge || (isEn ? "Guaranteed Fixed Fares" : isEs ? "Tarifas Fijas Garantizadas" : "Tarifs Forfaitaires Garantis"),
        destination: isEn ? "Destination & Area" : isEs ? "Destino y Zona" : "Destination & Zone",
        distance: isEn ? "Distance" : isEs ? "Distancia" : "Distance",
        duration: isEn ? "Est. Travel Time" : isEs ? "Tiempo Aprox." : "Durée Est.",
        sedan: isEn ? "Executive Sedan (1–3 pax)" : isEs ? "Berlina (1–3 pax)" : "Berline (1–3 pax)",
        van: isEn ? "Luxury Van (up to 7 pax)" : isEs ? "Furgoneta (hasta 7 pax)" : "Van VIP (jusqu'à 7 pax)",
        popularBadge: isEn ? "Popular" : isEs ? "Popular" : "Demandé",
        bookNow: isEn ? "Book This Fare" : isEs ? "Reservar Tarifa" : "Réserver ce tarif",
        notePrefix: isEn ? "Transparent Guarantee: " : isEs ? "Garantía Transparente: " : "Garantie Transparente : "
    };

    const handleScrollToBooking = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className={styles.section} id="fixed-fares" aria-label={data.heading}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>{labels.badge}</span>
                    <h2 className={styles.title}>{data.heading}</h2>
                    <p className={styles.subheading}>{data.subheading}</p>
                </div>

                {/* Desktop & Tablet Table */}
                <div className={styles.tableCard}>
                    <table className={styles.priceTable}>
                        <caption className={styles.visuallyHidden}>{data.heading}</caption>
                        <thead>
                            <tr>
                                <th scope="col" className={styles.thDestination}>{labels.destination}</th>
                                <th scope="col" className={styles.thMeta}>{labels.distance}</th>
                                <th scope="col" className={styles.thMeta}>{labels.duration}</th>
                                <th scope="col" className={styles.thPriceSedan}>{labels.sedan}</th>
                                <th scope="col" className={styles.thPriceVan}>{labels.van}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.rows.map((row, idx) => (
                                <tr key={idx} className={`${styles.trRow} ${row.popular ? styles.trPopular : ''}`}>
                                    <td className={styles.tdDestination}>
                                        <div className={styles.destCell}>
                                            <Icon icon="solar:map-point-bold" width="18" height="18" className={styles.destIcon} />
                                            <div>
                                                <span className={styles.destName}>{row.destination}</span>
                                                {row.popular && (
                                                    <span className={styles.popularTag}>{labels.popularBadge}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.tdMeta}>
                                        <span className={styles.metaVal}>{row.distance}</span>
                                    </td>
                                    <td className={styles.tdMeta}>
                                        <span className={styles.metaVal}>{row.duration}</span>
                                    </td>
                                    <td className={styles.tdPriceSedan}>
                                        <span className={styles.priceTag}>{row.sedanPrice}</span>
                                    </td>
                                    <td className={styles.tdPriceVan}>
                                        <span className={styles.priceTagVan}>{row.vanPrice}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards (below 768px) */}
                <div className={styles.mobileCardsList}>
                    {data.rows.map((row, idx) => (
                        <div key={idx} className={`${styles.mCard} ${row.popular ? styles.mCardPopular : ''}`}>
                            <div className={styles.mCardHeader}>
                                <div className={styles.mCardHeaderLeft}>
                                    <Icon icon="solar:map-point-bold" width="18" height="18" className={styles.destIcon} />
                                    <h3 className={styles.mDestTitle}>{row.destination}</h3>
                                </div>
                                {row.popular && (
                                    <span className={styles.popularTag}>{labels.popularBadge}</span>
                                )}
                            </div>

                            <div className={styles.mMetasRow}>
                                <span className={styles.mMetaItem}>
                                    <Icon icon="solar:route-linear" width="14" height="14" />
                                    {row.distance}
                                </span>
                                <span className={styles.mMetaDivider}>•</span>
                                <span className={styles.mMetaItem}>
                                    <Icon icon="solar:clock-circle-linear" width="14" height="14" />
                                    {row.duration}
                                </span>
                            </div>

                            <div className={styles.mPricesGrid}>
                                <div className={styles.mPriceBlock}>
                                    <span className={styles.mPriceType}>{labels.sedan}</span>
                                    <span className={styles.mPriceNumber}>{row.sedanPrice}</span>
                                </div>
                                <div className={styles.mPriceBlock}>
                                    <span className={styles.mPriceType}>{labels.van}</span>
                                    <span className={styles.mPriceNumberVan}>{row.vanPrice}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={styles.mBookBtn}
                                onClick={handleScrollToBooking}
                            >
                                <span>{labels.bookNow}</span>
                                <Icon icon="solar:arrow-right-up-linear" width="16" height="16" />
                            </button>
                        </div>
                    ))}
                </div>

                {data.note && (
                    <div className={styles.noteFooter}>
                        <Icon icon="solar:verified-check-bold" width="20" height="20" className={styles.noteIcon} />
                        <p className={styles.noteText}>
                            <strong>{labels.notePrefix}</strong>
                            {data.note}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

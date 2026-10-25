"use client";

import React from 'react';
import { TaxiComparisonData } from '@/lib/transfersData';
import { Icon } from '@iconify/react';
import styles from './TransferTaxiComparison.module.css';

interface TransferTaxiComparisonProps {
    data: TaxiComparisonData;
    isEn: boolean;
    isEs: boolean;
}

export default function TransferTaxiComparison({ data, isEn, isEs }: TransferTaxiComparisonProps) {
    const isFr = !isEn && !isEs;

    const labels = {
        badge: data.badge || (isEn ? "Taxi Comparison" : isEs ? "Comparativa de Taxis" : "Comparatif Taxi"),
        privateHeader: isEn ? "Mdina Tours Private Transfer" : isEs ? "Traslado Privado Mdina Tours" : "Transfert Privé Mdina Tours",
        privateSub: isEn ? "Guaranteed Pre-Booked" : isEs ? "Garantizado y Reservado" : "Garanti & Réservé",
        streetHeader: isEn ? "Official Street Grand Taxi" : isEs ? "Taxi Local de Parada" : "Grand Taxi de Station",
        streetSub: isEn ? "Haggling upon arrival" : isEs ? "Negociación al llegar" : "Négociation à l'arrivée",
        featureLabel: isEn ? "Key Service Feature" : isEs ? "Característica" : "Critère de Service"
    };

    return (
        <section className={styles.section} id="taxi-comparison" aria-label={data.heading}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>{labels.badge}</span>
                    <h2 className={styles.title}>{data.heading}</h2>
                    <p className={styles.subheading}>{data.subheading}</p>
                </div>

                {/* Desktop & Tablet Comparison Table */}
                <div className={styles.tableCard}>
                    <table className={styles.comparisonTable}>
                        <caption className={styles.visuallyHidden}>{data.heading}</caption>
                        <thead>
                            <tr>
                                <th scope="col" className={styles.thFeature}>{labels.featureLabel}</th>
                                <th scope="col" className={`${styles.thCol} ${styles.thHighlight}`}>
                                    <div className={styles.thContent}>
                                        <div className={styles.thBadgeCheck}>
                                            <Icon icon="solar:check-circle-bold" width="18" height="18" />
                                            <span>{labels.privateSub}</span>
                                        </div>
                                        <span className={styles.thBrandTitle}>{labels.privateHeader}</span>
                                    </div>
                                </th>
                                <th scope="col" className={styles.thCol}>
                                    <div className={styles.thContent}>
                                        <div className={styles.thBadgeNeutral}>
                                            <Icon icon="solar:danger-triangle-linear" width="16" height="16" />
                                            <span>{labels.streetSub}</span>
                                        </div>
                                        <span className={styles.thNeutralTitle}>{labels.streetHeader}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.points.map((pt, idx) => (
                                <tr key={idx} className={styles.trRow}>
                                    <td className={styles.tdFeature}>
                                        <strong>{pt.feature}</strong>
                                    </td>
                                    <td className={`${styles.tdCol} ${styles.tdHighlight}`}>
                                        <div className={styles.tdCellInner}>
                                            <Icon icon="solar:check-read-bold" width="18" height="18" className={styles.checkIcon} />
                                            <span>{pt.privateTransfer}</span>
                                        </div>
                                    </td>
                                    <td className={styles.tdCol}>
                                        <div className={styles.tdCellInner}>
                                            <Icon icon="solar:close-circle-linear" width="18" height="18" className={styles.crossIcon} />
                                            <span className={styles.streetTaxiText}>{pt.streetTaxi}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards View */}
                <div className={styles.mobileCards}>
                    {data.points.map((pt, idx) => (
                        <div key={idx} className={styles.mCard}>
                            <h3 className={styles.mFeatureTitle}>{pt.feature}</h3>
                            <div className={styles.mBlockHighlight}>
                                <div className={styles.mBadgePrivate}>
                                    <Icon icon="solar:check-circle-bold" width="16" height="16" />
                                    <span>{labels.privateHeader}</span>
                                </div>
                                <p className={styles.mText}>{pt.privateTransfer}</p>
                            </div>
                            <div className={styles.mBlockNeutral}>
                                <div className={styles.mBadgeStreet}>
                                    <Icon icon="solar:danger-triangle-linear" width="16" height="16" />
                                    <span>{labels.streetHeader}</span>
                                </div>
                                <p className={styles.mTextMuted}>{pt.streetTaxi}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {data.summary && (
                    <div className={styles.summaryBox}>
                        <Icon icon="solar:shield-check-bold" width="22" height="22" className={styles.summaryIcon} />
                        <p className={styles.summaryText}>{data.summary}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

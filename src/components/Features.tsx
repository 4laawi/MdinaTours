"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Features.module.css';

const Features: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        {
            title: t('best_prices'),
            description: t('best_prices_desc'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 32 32" width="32">
                    <g className={styles.fillSecondary}>
                        <path d="m8 8.65h7.35v1.35h-7.35z" />
                        <path d="m16.2 11.15-1.8-1.8 1.8-1.8.95.9-.9.9.9.85z" />
                        <path d="m12.2 12.45-3.15-3.1 3.15-3.15.95.95-2.2 2.2 2.2 2.2z" />
                        <path d="m8 13.35h1.35v1.35h-1.35z" />
                        <path d="m10.65 13.35h1.35v1.35h-1.35z" />
                        <path d="m13.35 13.35h1.35v1.35h-1.35z" />
                        <path d="m16 13.35h1.35v1.35h-1.35z" />
                        <path d="m19.35 32h-13.35c-1.15 0-2-.85-2-2v-14c0-.8.35-1.55.95-2-.55-.45-.95-1.2-.95-2v-6c0-1.15.85-2 2-2h13.35c1.15 0 2 .85 2 2v6c0 .8-.35 1.55-.95 2 .55.45.95 1.2.95 2v14c0 1.15-.9 2-2 2zm-12.7-17.35c-.75 0-1.35.6-1.35 1.35v14c0 .4.25.65.65.65h13.35c.4 0 .65-.25.65-.65v-14c0-.75-.6-1.35-1.35-1.35v-1.35c.75 0 1.35-.6 1.35-1.35v-5.95c0-.4-.25-.65-.65-.65h-13.3c-.4 0-.65.25-.65.65v6c0 .75.6 1.35 1.35 1.35z" />
                    </g>
                    <path d="m6.65 16h12v13.35h-12z" className={styles.fillPrimary} />
                    <path d="m16 17.35h1.35v10.65h-1.35z" className={styles.fillAccent} />
                    <path d="m13.35 17.35h1.35v10.65h-1.35z" className={styles.fillAccent} />
                    <path d="m10.65 17.35h1.35v10.65h-1.35z" className={styles.fillAccent} />
                    <path d="m8 17.35h1.35v10.65h-1.35z" className={styles.fillAccent} />
                    <path d="m26 28h-3.35v-1.35h3.35c.4 0 .65-.25.65-.65v-14c0-.75-.6-1.35-1.35-1.35v-1.35c.75 0 1.35-.6 1.35-1.35v-5.95c0-.4-.25-.65-.65-.65h-13.35c-.4 0-.65.25-.65.65v.65h-1.35v-.65c0-1.15.85-2 2-2h13.35c1.15 0 2 .85 2 2v6c0 .8-.35 1.55-.95 2 .55.45.95 1.2.95 2v14c0 1.15-.85 2-2 2z" className={styles.fillAccent} />
                    <path d="m22.65 9.35h1.35v1.35h-1.35z" className={styles.fillAccent} />
                </svg>
            ),
            shape: "h1_shape-5.png"
        },
        {
            title: t('no_prepayment'),
            description: t('no_prepayment_desc'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 32 32" width="32">
                    <path d="m2.8 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m6.95 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m11.15 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m15.3 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m19.5 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m23.65 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m27.85 2.75h1.4v2.8h-1.4z" className={styles.fillAccent} />
                    <path d="m19.5 29.2h-19.5v-20.9h32v8.35h-1.4v-6.95h-29.2v18.1h18.1z" className={styles.fillAccent} />
                    <path d="m0 4.15h32v5.55h-32z" fill="#d0d9f3" />
                    <g className={styles.fillSecondary}>
                        <path d="m15.3 12.5h1.4v1.4h-1.4z" />
                        <path d="m12.5 12.5h1.4v1.4h-1.4z" />
                        <path d="m18.1 12.5h1.4v1.4h-1.4z" />
                        <path d="m20.85 12.5h1.4v1.4h-1.4z" />
                        <path d="m23.65 12.5h1.4v1.4h-1.4z" />
                        <path d="m26.45 12.5h1.4v1.4h-1.4z" />
                        <path d="m4.15 15.25h1.4v1.4h-1.4z" />
                        <path d="m6.95 15.25h1.4v1.4h-1.4z" />
                        <path d="m9.75 15.25h1.4v1.4h-1.4z" />
                        <path d="m12.5 15.25h1.4v1.4h-1.4z" />
                        <path d="m15.3 15.25h1.4v1.4h-1.4z" />
                        <path d="m18.1 15.25h1.4v1.4h-1.4z" />
                        <path d="m20.85 15.25h1.4v1.4h-1.4z" />
                        <path d="m23.65 15.25h1.4v1.4h-1.4z" />
                        <path d="m26.45 15.25h1.4v1.4h-1.4z" />
                        <path d="m4.15 18.05h1.4v1.4h-1.4z" />
                        <path d="m6.95 18.05h1.4v1.4h-1.4z" />
                        <path d="m9.75 18.05h1.4v1.4h-1.4z" />
                        <path d="m12.5 18.05h1.4v1.4h-1.4z" />
                        <path d="m15.3 18.05h1.4v1.4h-1.4z" />
                        <path d="m18.1 18.05h1.4v1.4h-1.4z" />
                        <path d="m4.15 20.85h1.4v1.4h-1.4z" />
                        <path d="m6.95 20.85h1.4v1.4h-1.4z" />
                        <path d="m9.75 20.85h1.4v1.4h-1.4z" />
                        <path d="m12.5 20.85h1.4v1.4h-1.4z" />
                        <path d="m15.3 20.85h1.4v1.4h-1.4z" />
                        <path d="m18.1 20.85h1.4v1.4h-1.4z" />
                        <path d="m4.15 23.6h1.4v1.4h-1.4z" />
                        <path d="m6.95 23.6h1.4v1.4h-1.4z" />
                        <path d="m9.75 23.6h1.4v1.4h-1.4z" />
                        <path d="m12.5 23.6h1.4v1.4h-1.4z" />
                        <path d="m15.3 23.6h1.4v1.4h-1.4z" />
                    </g>
                    <path d="m32 23.6c0 3.065-2.485 5.55-5.55 5.55s-5.55-2.485-5.55-5.55 2.485-5.55 5.55-5.55 5.55 2.485 5.55 5.55z" className={styles.fillPrimary} />
                    <path d="m25.75 26-1.9-1.9 1-.95.9.9 2.3-2.3.95.95z" fill="#fff" />
                    <path d="m0 8.3h32v1.4h-32z" className={styles.fillAccent} />
                    <path d="m2.8 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m6.95 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m11.15 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m15.3 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m19.5 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m23.65 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                    <path d="m27.85 4.15h1.4v1.4h-1.4z" className={styles.fillAccent} />
                </svg>
            ),
            shape: "h1_shape-7.png"
        },
        {
            title: t('satisfied_travelers'),
            description: t('satisfied_travelers_desc'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 32 32" width="32">
                    <g className={styles.fillSecondary}>
                        <path d="m15.3 27.3h1.35v1.35h-1.35z" />
                        <path d="m15.3 24.6h1.35v1.35h-1.35z" />
                        <path d="m15.95 32-7.3-4-7.1 3.95h-1.55v-1.5l3.4-16.3 3-1.45.5 1.2-2.3 1.2-3.2 15.35 7.25-3.9 7.3 4 7.35-4 7.25 3.9-3.2-15.35-2.35-1.2.55-1.2 3 1.45 3.4 16.45v1.35h-1.55l-7.1-3.95z" />
                    </g>
                    <path d="m15.95 0c-4.8 0-8.65 3.85-8.65 8.65 0 1.35.35 2.55.85 3.75 2 4.9 7.8 10.9 7.8 10.9s5.8-6 7.8-10.9c.45-1.15.85-2.4.85-3.75 0-4.8-3.85-8.65-8.65-8.65zm0 12.65c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" className={styles.fillPrimary} />
                    <path d="m15.95 13.95c-2.95 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3 2.35 5.3-5.3 5.3zm0-9.3c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="#bb5d24" />
                    <path d="m15.3 8h1.35v1.35h-1.35z" className={styles.fillAccent} />
                </svg>
            ),
            shape: "h1_shape-6.png"
        },
        {
            title: t('friendly_service'),
            description: t('friendly_service_desc'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 0 32 32" width="32">
                    <g className={styles.fillSecondary}>
                        <path d="m18.679 27.994h-1.352v-25.39c0-.351-.15-.651-.401-.952-.551-.551-1.402-.551-1.853 0-.25.25-.401.601-.401.952v25.39h-1.352v-25.39c0-.751.25-1.402.801-1.853 1.002-1.002 2.754-1.002 3.806 0 .551.551.801 1.202.801 1.853v25.39h-.05z" />
                        <path d="m23.387 31.349h-1.352v-2.003c0-.2-.05-.351-.2-.451-.15-.15-.25-.2-.451-.2h-10.717c-.2 0-.351.05-.451.2-.15.15-.2.25-.2.451v2.003h-1.352v-2.003c0-.551.2-1.052.601-1.402s.851-.601 1.402-.601h10.667c.551 0 1.052.2 1.402.601s.601.851.601 1.402z" />
                        <path d="m0 30.648h19.38v1.352h-19.38z" />
                        <path d="m20.682 30.648h11.368v1.352h-11.368z" />
                    </g>
                    <path d="m4.006 9.315h14.673v8.013h-14.673l-4.006-4.006z" fill="#b1bee4" />
                    <path d="m28.044 3.956h-14.673v8.013h14.673l4.006-4.006z" className={styles.fillPrimary} />
                    <path d="m20.031 7.311h1.352v1.352h-1.352z" fill="#fff" />
                    <path d="m22.685 7.311h1.352v1.352h-1.352z" fill="#fff" />
                    <path d="m25.39 7.311h1.352v1.352h-1.352z" fill="#fff" />
                    <path d="m13.371 9.315h5.358v2.654h-5.358z" fill="#9f672c" />
                    <path d="m17.377 3.956h1.352v8.013h-1.352z" fill="#6b3317" />
                    <path d="m13.371 3.956h1.352v8.013h-1.352z" fill="#6b3317" />
                    <path d="m13.371 9.315h1.352v8.013h-1.352z" fill="#354a86" />
                    <path d="m17.377 9.315h1.352v8.013h-1.352z" fill="#354a86" />
                    <path d="m17.377 9.315h1.352v2.654h-1.352z" className={styles.fillAccent} />
                    <path d="m13.371 9.315h1.352v2.654h-1.352z" className={styles.fillAccent} />
                </svg>
            ),
            shape: "h1_shape-8.png"
        }
    ];

    return (
        <div className={styles.featuresWrapper}>
            <div className={styles.container}>
                <div className={styles.featuresHeader}>
                    <div className="section-subtitle">{t('features_subtitle')}</div>
                    <h2 className="section-title">{t('features_title')}</h2>
                </div>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                            <div className={styles.iconContainer}>
                                <div className={styles.iconWrapper}>
                                    {feature.icon}
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{feature.title}</h3>
                                <p className={styles.description}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;

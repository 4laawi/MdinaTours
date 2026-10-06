import React from 'react';
import Image from 'next/image';
import { translations, Language } from '@/lib/translations';
import styles from './HowItWorks.module.css';

interface HowItWorksProps {
    lang?: Language;
}

export default function HowItWorks({ lang = 'en' }: HowItWorksProps) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const steps = [
        {
            num: t('how_step_1_num'),
            title: t('how_step_1_title'),
            desc: t('how_step_1_desc'),
            image: '/FIGURES/Figure01.webp'
        },
        {
            num: t('how_step_2_num'),
            title: t('how_step_2_title'),
            desc: t('how_step_2_desc'),
            image: '/FIGURES/FIGURE02.webp'
        },
        {
            num: t('how_step_3_num'),
            title: t('how_step_3_title'),
            desc: t('how_step_3_desc'),
            image: '/FIGURES/FIGURE03.webp'
        },
        {
            num: t('how_step_4_num'),
            title: t('how_step_4_title'),
            desc: t('how_step_4_desc'),
            image: '/FIGURES/FIGURE04.webp'
        }
    ];

    return (
        <section className={styles.wrapper} id="how-it-works">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.subtitle}>{t('how_it_works_subtitle')}</div>
                    <h2 className={styles.title}>{t('how_it_works_title')}</h2>
                    <p className={styles.desc}>{t('how_it_works_desc')}</p>
                </div>

                <div className={styles.grid}>
                    {steps.map((step, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={180}
                                    height={180}
                                    className={styles.figureImage}
                                    priority={idx < 2}
                                />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.titleRow}>
                                    <span className={styles.stepBadge}>{step.num}</span>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                </div>
                                <p className={styles.cardText}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


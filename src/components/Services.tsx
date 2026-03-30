"use client";

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Services.module.css';

export default function Services() {
    const { t } = useLanguage();

    const services = [
        { id: 1, title: t('service_tours'), image: '/service_tours.png', icon: '🛣️' },
        { id: 2, title: t('service_excursions'), image: '/service_excursions.png', icon: '🚢' },
        { id: 3, title: t('service_activities'), image: '/service_activities.png', icon: '🏛️' },
        { id: 4, title: t('service_chauffeurs'), image: '/service_other.png', icon: '🚐' },
        { id: 5, title: t('service_other'), image: '/hero-sahara.webp', icon: '🌐' }
    ];

    const handleCardClick = (id: number) => {
        let targetId = '';
        if (id === 1 || id === 2) targetId = 'tours';
        if (id === 3) targetId = 'activities';
        if (id === 4) targetId = 'hero';
        
        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={styles.servicesSection}>
            <div className="container">
                <div className={styles.servicesIntro}>
                    <div className="section-subtitle">{t('our_services_subtitle')}</div>
                    <h2 className="section-title">{t('our_services_title')}</h2>
                </div>
                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <div 
                            key={service.id} 
                            className={styles.serviceCard}
                            onClick={() => handleCardClick(service.id)}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className={styles.serviceImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

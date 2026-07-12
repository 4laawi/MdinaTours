import Image from 'next/image';
import { translations, Language } from '@/lib/translations';
import styles from './Services.module.css';

export default function Services({ lang = 'en' }: { lang?: Language }) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const services = [
        { id: 1, title: lang === 'en' ? "Private Driver Morocco" : "Chauffeur Privé Maroc", image: '/service_other.png', icon: '🚐', href: `/${lang}/private-driver` },
        { id: 2, title: lang === 'en' ? "City-to-City Transfers" : "Transferts de Ville à Ville", image: '/b-roll/3-Mercedes-vito-airoport.jpg', icon: '🚗', href: `/${lang}/transfers` },
        { id: 3, title: lang === 'en' ? "Custom Guided Tours" : "Circuits sur Mesure", image: '/Traditional-low.webp', icon: '🛣️', href: `/${lang}/tours` },
        { id: 4, title: lang === 'en' ? "Day Trips" : "Excursions", image: '/camel_riding.png', icon: '🐪', href: `/${lang}#activities` },
        { id: 5, title: lang === 'en' ? "B2B Partnerships" : "Partenariats B2B", image: '/b-roll/b2b.jpg', icon: '🤝', href: `/${lang}/partners` }
    ];

    return (
        <section className={styles.servicesSection}>
            <div className="container">
                <div className={styles.servicesIntro}>
                    <div className="section-subtitle">{t('our_services_subtitle')}</div>
                    <h2 className="section-title">{t('our_services_title')}</h2>
                </div>
                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <a 
                            key={service.id} 
                            className={styles.serviceCard}
                            href={service.href}
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
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

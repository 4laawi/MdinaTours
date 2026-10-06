import Image from 'next/image';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';
import styles from './Services.module.css';

export default function Services({ lang = 'en' }: { lang?: Language }) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const getPath = (path: string) => (lang === 'en' && path === '/' ? '/' : `/${lang}${path === '/' ? '' : path}`);

    const services = [
        {
            id: 'airport',
            tag: isEn ? "Arrival & Departure" : (isEs ? "Llegadas y Salidas" : "Arrivées & Départs"),
            title: t('service_airport_title'),
            desc: t('service_airport_desc'),
            image: '/img2/Airport_Casablanca_Mohammed.webp',
            href: getPath('/transfers')
        },
        {
            id: 'intercity',
            tag: isEn ? "City to City" : (isEs ? "Ciudad a Ciudad" : "Ville à Ville"),
            title: t('service_intercity_title'),
            desc: t('service_intercity_desc'),
            image: '/b-roll/3-Mercedes-vito-airoport.jpg',
            href: getPath('/transfers')
        },
        {
            id: 'driver',
            tag: isEn ? "Hourly & Daily" : (isEs ? "Por Horas y Día" : "À la Journée"),
            title: t('service_driver_title'),
            desc: t('service_driver_desc'),
            image: '/veto.webp',
            href: getPath('/private-driver-morocco')
        },
        {
            id: 'multiday',
            tag: isEn ? "Custom Itineraries" : (isEs ? "Rutas a Medida" : "Circuits Multi-Jours"),
            title: t('service_multiday_title'),
            desc: t('service_multiday_desc'),
            image: '/img/Morocco-trip-tour-hero01.webp',
            href: getPath('/car-with-driver-morocco-8-days')
        }
    ];

    return (
        <section className={styles.servicesSection} id="transport-services">
            <div className="container">
                <div className={styles.servicesIntro}>
                    <div className={styles.subtitle}>{t('our_services_subtitle')}</div>
                    <h2 className="section-title">{t('our_services_title')}</h2>
                    <p className={styles.description}>
                        {isEn 
                            ? "Dedicated private drivers, punctual airport transfers, and flexible multi-day transportation across Morocco."
                            : isEs 
                            ? "Conductores privados dedicados, traslados de aeropuerto puntuales y transporte de varios días por todo Marruecos."
                            : "Chauffeurs privés dédiés, transferts aéroports ponctuels et transport multi-jours sur mesure à travers le Maroc."}
                    </p>
                </div>
                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <Link 
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
                                    sizes="(max-width: 768px) 270px, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className={styles.cardBody}>
                                <span className={styles.serviceTag}>{service.tag}</span>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.desc}</p>
                                <div className={styles.ctaRow}>
                                    <span>{t('service_btn')}</span>
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

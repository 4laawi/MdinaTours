"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/airportTransfersData';
import { Route, CarFront, Compass } from 'lucide-react';
import { Icon } from '@iconify/react';
import styles from './TransferServicesSection.module.css';

interface TransferServicesSectionProps {
    lang: Locale;
}

export default function TransferServicesSection({ lang }: TransferServicesSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const cardsRef = useRef<HTMLDivElement>(null);

    const getPath = (path: string) => `/${lang}${path}`;

    const text = {
        eyebrow: isAr 
            ? 'خدمات النقل في المغرب' 
            : isFr 
            ? 'AU-DELÀ DE L\'AÉROPORT' 
            : isEs 
            ? 'MÁS ALLÁ DEL AEROPUERTO' 
            : 'BEYOND AIRPORT TRANSFERS',
        title: isAr 
            ? 'خدمات النقل والتوصيل في المغرب' 
            : isFr 
            ? 'Nos Services de Transfert au Maroc' 
            : isEs 
            ? 'Nuestros Servicios de Traslados en Marruecos' 
            : 'Our Morocco Transfer Services',
        subtitle: isAr 
            ? 'إلى جانب خدمات توصيل المطارات، نوفر شبكة نقل متكاملة وسائقين محترفين لتلبية جميع احتياجات سفرك عبر مختلف مدن المغرب بأعلى درجات الراحة والأمان.' 
            : isFr 
            ? 'Au-delà des transferts aéroportuaires, profitez d\'un réseau complet de transport privé et de circuits sur mesure avec chauffeurs professionnels partout au Maroc.' 
            : isEs 
            ? 'Más allá de los traslados de aeropuerto, ofrecemos transporte privado de alta gama y excursiones a medida con chóferes profesionales en todo Marruecos.' 
            : 'Beyond airport pickups, enjoy our complete network of intercity private transfers, dedicated chauffeurs at disposal, and tailor-made Morocco tours.',

        // Card 1: City-to-City Transfers -> /transfers
        card1Title: isAr 
            ? 'النقل الخاص بين مدن المغرب' 
            : isFr 
            ? 'Transferts Ville-à-Ville au Maroc' 
            : isEs 
            ? 'Traslados Ciudad a Ciudad en Marruecos' 
            : 'City-To-City Transfers Across Morocco',
        card1Desc: isAr 
            ? 'تنقل مباشر ومريح بين المدن المغربية الكبرى مثل الدار البيضاء، مراكش، فاس، طنجة، الرباط وشفشاون بأسعار ثابتة.' 
            : isFr 
            ? 'Liaisons directes et confortables entre les grandes villes marocaines : Casablanca, Marrakech, Fès, Tanger, Rabat et Chefchaouen.' 
            : isEs 
            ? 'Conexiones directas y confortables entre las principales ciudades de Marruecos: Casablanca, Marrakech, Fez, Tánger, Rabat y Chauen.' 
            : 'Direct, comfortable private transfers connecting Casablanca, Marrakech, Fes, Tangier, Rabat, and Chefchaouen with upfront pricing.',
        card1Bullets: [
            isAr ? 'أسعار ثابتة شاملة لرسوم الطرق السريعة والأمتعة' : isFr ? 'Tarifs fixes tout compris avec péages et bagages inclus' : isEs ? 'Tarifas fijas todo incluido con peajes y equipaje' : 'Fixed all-inclusive fares with highway tolls & luggage included',
            isAr ? 'استقبال من الباب إلى الباب من أي فندق أو رياض' : isFr ? 'Prise en charge porte-à-porte depuis tout hôtel ou riad' : isEs ? 'Recogida puerta a puerta en cualquier hotel o riad' : 'Door-to-door pickup from any hotel, riad, or address',
            isAr ? 'سيارات وفانات مكيفة ومريحة للمسافات الطويلة' : isFr ? 'Véhicules spacieux et climatisés pour longs trajets' : isEs ? 'Vehículos espaciosos y climatizados para largas distancias' : 'Spacious air-conditioned vehicles for long journeys'
        ],
        card1Cta: isAr ? 'استكشاف النقل بين المدن' : isFr ? 'Découvrir les transferts intervilles' : isEs ? 'Ver traslados entre ciudades' : 'Explore City-To-City Transfers',

        // Card 2: Private Chauffeur & Driver at Disposal -> /private-driver-morocco
        card2Title: isAr 
            ? 'سائق خاص وسيارة تحت الطلب' 
            : isFr 
            ? 'Chauffeur Privé & Mise à Disposition' 
            : isEs 
            ? 'Chófer Privado a Disposición' 
            : 'Private Chauffeur & Driver at Disposal',
        card2Desc: isAr 
            ? 'خدمة سائق خاص مخصص بالساعة أو باليوم الكامل لاجتماعات الأعمال، الجولات الحرة والتنقلات الحصرية بكل راحة ومرونة.' 
            : isFr 
            ? 'Location de véhicule avec chauffeur dédié à l\'heure ou à la journée pour vos rendez-vous d\'affaires, shopping et visites libres.' 
            : isEs 
            ? 'Servicio exclusivo de chófer privado por horas o por día completo para reuniones de negocios, eventos y visitas a su propio ritmo.' 
            : 'Hire a dedicated professional chauffeur by the hour or full day for executive business meetings, VIP events, and flexible city travel.',
        card2Bullets: [
            isAr ? 'حجز مرن بنظام الساعات، اليوم الكامل أو أيام متعددة' : isFr ? 'Formules flexibles à l\'heure, journée ou multi-jours' : isEs ? 'Disponibilidad flexible por horas, día completo o varios días' : 'Flexible hourly, full-day, and multi-day hire options',
            isAr ? 'سائقون محترفون ولبقون يتحدثون عدة لغات' : isFr ? 'Chauffeurs bilingues, discrets, courtois et ponctuels' : isEs ? 'Chóferes bilingües, discretos, formales y puntuales' : 'Discreet, multilingual, and punctual executive chauffeurs',
            isAr ? 'أسطول فخم من سيارات مرسيدس وسيارات الدفع الرباعي' : isFr ? 'Flotte premium Mercedes-Benz et SUV haut de gamme' : isEs ? 'Flota de alta gama Mercedes-Benz y SUVs de lujo' : 'Premium Mercedes-Benz vans and luxury executive sedans'
        ],
        card2Cta: isAr ? 'حجز سائق خاص في المغرب' : isFr ? 'Réserver un chauffeur privé' : isEs ? 'Contratar chófer privado' : 'Hire a Private Chauffeur',

        // Card 3: Custom Morocco Tours & Desert Trips -> /tours
        card3Title: isAr 
            ? 'جولات سياحية ورحلات صحراوية' 
            : isFr 
            ? 'Circuits & Excursions au Maroc' 
            : isEs 
            ? 'Circuitos y Excursiones en Marruecos' 
            : 'Morocco Tours & Sahara Desert Trips',
        card3Desc: isAr 
            ? 'رحلات سياحية خاصة وبرامج مخصصة إلى صحراء مرزوكة، أكافاي، جبال الأطلس والمدن العتيقة انطلاقاً من مراكش والدار البيضاء وفاس.' 
            : isFr 
            ? 'Circuits privés sur mesure et expéditions vers le Sahara (Merzouga, Agafay), les montagnes de l\'Atlas et les villes impériales.' 
            : isEs 
            ? 'Rutas privadas a medida y excursiones al desierto del Sahara (Merzouga, Agafay), la cordillera del Atlas y las ciudades imperiales.' 
            : 'Custom private multi-day itineraries and desert expeditions departing from Marrakech, Casablanca, and Fes to Merzouga and the Atlas Mountains.',
        card3Bullets: [
            isAr ? 'رحلات صحراوية متكاملة مع إقامة في مخيمات فاخرة' : isFr ? 'Voyages dans le désert avec nuitées en bivouac de luxe' : isEs ? 'Expediciones al desierto con noches en jaimas de lujo' : 'Tailored Sahara desert tours with luxury camp glamping',
            isAr ? 'رحلات يومية إلى شفشاون، الصويرة ووادي أوريكا' : isFr ? 'Excursions d\'une journée à Chefchaouen, Essaouira et Ourika' : isEs ? 'Excursiones de un día a Chauen, Esauira y el Valle de Ourika' : 'Scenic day trips to Chefchaouen, Essaouira, and Ourika Valley',
            isAr ? 'مركبة خاصة مكيفة وسائق خبير طوال مدة الرحلة' : isFr ? 'Véhicule privatif tout confort avec chauffeur expérimenté' : isEs ? 'Vehículo privado climatizado con chófer experto dedicado' : 'Private air-conditioned vehicle with dedicated expert driver'
        ],
        card3Cta: isAr ? 'اكتشاف الجولات السياحية' : isFr ? 'Découvrir nos circuits au Maroc' : isEs ? 'Explorar circuitos y tours' : 'Discover Morocco Tours'
    };

    return (
        <section className={styles.section} id="morocco-services" dir={isAr ? 'rtl' : 'ltr'}>
            <div className={styles.container}>
                {/* Section Header matching site design system */}
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                {/* 3 Cards Grid with BG-8.svg Background */}
                <div 
                    className={styles.cardsGrid}
                    ref={cardsRef}
                    onScroll={(e) => {
                        const el = e.currentTarget;
                        if (el.scrollWidth > el.clientWidth) {
                            const step = el.scrollWidth / 3;
                            const idx = Math.round(el.scrollLeft / step);
                            setActiveCardIndex(Math.max(0, Math.min(2, idx)));
                        }
                    }}
                >
                    {/* Card 1: City-To-City Transfers Across Morocco */}
                    <div className={styles.cardShell}>
                        <div className={styles.cardCore}>
                            {/* Floating Icon: Lucide Route icon */}
                            <div className={styles.floatingIcon}>
                                <Route size={58} strokeWidth={2.2} />
                            </div>

                            <h3 className={styles.cardTitle}>
                                {text.card1Title}
                            </h3>

                            <p className={styles.cardDesc}>
                                {text.card1Desc}
                            </p>

                            <ul className={styles.bulletList}>
                                {text.card1Bullets.map((bullet, idx) => (
                                    <li key={idx} className={styles.bulletItem}>
                                        <span className={styles.bulletArrow}>
                                            <Icon icon={isAr ? "solar:arrow-left-down-linear" : "solar:arrow-right-down-linear"} width="15" height="15" />
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.cardActionWrapper}>
                                <Link 
                                    href={getPath('/transfers')} 
                                    prefetch={false}
                                    className={styles.ctaLink}
                                    aria-label={text.card1Cta}
                                >
                                    <span>{text.card1Cta}</span>
                                    <span className={styles.ctaArrow}>
                                        {isAr ? '←' : '→'}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Private Chauffeur & Driver at Disposal */}
                    <div className={styles.cardShell}>
                        <div className={styles.cardCore}>
                            {/* Floating Icon: Lucide CarFront icon */}
                            <div className={styles.floatingIcon}>
                                <CarFront size={58} strokeWidth={2.2} />
                            </div>

                            <h3 className={styles.cardTitle}>
                                {text.card2Title}
                            </h3>

                            <p className={styles.cardDesc}>
                                {text.card2Desc}
                            </p>

                            <ul className={styles.bulletList}>
                                {text.card2Bullets.map((bullet, idx) => (
                                    <li key={idx} className={styles.bulletItem}>
                                        <span className={styles.bulletArrow}>
                                            <Icon icon={isAr ? "solar:arrow-left-down-linear" : "solar:arrow-right-down-linear"} width="15" height="15" />
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.cardActionWrapper}>
                                <Link 
                                    href={getPath('/private-driver-morocco')} 
                                    prefetch={false}
                                    className={styles.ctaLink}
                                    aria-label={text.card2Cta}
                                >
                                    <span>{text.card2Cta}</span>
                                    <span className={styles.ctaArrow}>
                                        {isAr ? '←' : '→'}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Morocco Tours & Sahara Desert Trips */}
                    <div className={styles.cardShell}>
                        <div className={styles.cardCore}>
                            {/* Floating Icon: Lucide Compass icon */}
                            <div className={styles.floatingIcon}>
                                <Compass size={58} strokeWidth={2.2} />
                            </div>

                            <h3 className={styles.cardTitle}>
                                {text.card3Title}
                            </h3>

                            <p className={styles.cardDesc}>
                                {text.card3Desc}
                            </p>

                            <ul className={styles.bulletList}>
                                {text.card3Bullets.map((bullet, idx) => (
                                    <li key={idx} className={styles.bulletItem}>
                                        <span className={styles.bulletArrow}>
                                            <Icon icon={isAr ? "solar:arrow-left-down-linear" : "solar:arrow-right-down-linear"} width="15" height="15" />
                                        </span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.cardActionWrapper}>
                                <Link 
                                    href={getPath('/tours')} 
                                    prefetch={false}
                                    className={styles.ctaLink}
                                    aria-label={text.card3Cta}
                                >
                                    <span>{text.card3Cta}</span>
                                    <span className={styles.ctaArrow}>
                                        {isAr ? '←' : '→'}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Carousel Dots */}
                <div className={styles.mobileCarouselDots} aria-hidden="true">
                    {[0, 1, 2].map((idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`${styles.mobileCarouselDot} ${activeCardIndex === idx ? styles.mobileCarouselDotActive : ''}`}
                            onClick={() => {
                                if (cardsRef.current) {
                                    const card = cardsRef.current.children[idx] as HTMLElement;
                                    if (card) {
                                        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                        setActiveCardIndex(idx);
                                    }
                                }
                            }}
                            aria-label={`Go to service ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


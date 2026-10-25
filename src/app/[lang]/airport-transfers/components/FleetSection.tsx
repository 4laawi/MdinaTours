"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from './FleetSection.module.css';

interface FleetSectionProps {
    lang: Locale;
}

interface TransferVehicle {
    id: string;
    name: string;
    category: {
        en: string;
        fr: string;
        es: string;
        ar: string;
    };
    capacityPax: string;
    paxNum: number;
    capacityBags: string;
    fromPrice: number;
    image: string;
    isVito?: boolean;
    tierBg: string;
    tierColor: string;
    highlight?: {
        en: string;
        fr: string;
        es: string;
        ar: string;
    };
    description: {
        en: string;
        fr: string;
        es: string;
        ar: string;
    };
    features: {
        en: string[];
        fr: string[];
        es: string[];
        ar: string[];
    };
}

const VEHICLES: TransferVehicle[] = [
    {
        id: 'skoda-superb',
        name: 'Skoda Superb',
        category: {
            en: 'Executive Sedan',
            fr: 'Berline Exécutive',
            es: 'Berlina Premium',
            ar: 'سيارة صالون تنفيذية'
        },
        capacityPax: '1–3',
        paxNum: 3,
        capacityBags: '3',
        fromPrice: 35,
        image: '/cars/flotte-superb.webp',
        tierBg: '#f3e8ff',
        tierColor: '#6b21a8',
        description: {
            en: 'A quiet, refined sedan with acoustic insulation and generous legroom. Ideal for solo business travelers and couples.',
            fr: 'Une berline silencieuse et raffinée avec vitrage acoustique et grand espace. Idéale pour voyageurs d\'affaires et couples.',
            es: 'Una berlina silenciosa y confortable con excelente espacio para las piernas. Perfecta para parejas y viajes de negocios.',
            ar: 'سيارة صالون هادئة وفاخرة مع عزل صوتي متطور ومساحة واسعة للأرجل، مثالية للأزواج ورجال الأعمال.'
        },
        features: {
            en: ['Flight delay tracking & meet & greet', '60 mins free airport waiting time', 'Chilled bottled water & A/C', 'Luggage assistance to vehicle'],
            fr: ['Suivi de vol en direct & accueil personnalisé', '60 min d\'attente offerte à l\'aéroport', 'Bouteilles d\'eau fraîches & climatisation', 'Assistance bagages jusqu\'au véhicule'],
            es: ['Seguimiento de vuelo y bienvenida en terminal', '60 min de espera gratuita en aeropuerto', 'Agua mineral fría y climatizador', 'Ayuda con el equipaje hasta el coche'],
            ar: ['تتبع مواعيد الرحلات والاستقبال بلافتة الاسم', '60 دقيقة انتظار مجاني في المطار', 'مياه معدنية مبردة وتكييف هوائي', 'مساعدة كاملة في نقل الأمتعة']
        }
    },
    {
        id: 'skoda-kodiaq',
        name: 'Skoda Kodiaq',
        category: {
            en: 'Comfort Family SUV',
            fr: 'SUV Grand Confort',
            es: 'SUV Familiar Confort',
            ar: 'سيارة دفع رباعي عائلية'
        },
        capacityPax: '1–4',
        paxNum: 4,
        capacityBags: '4',
        fromPrice: 40,
        image: '/cars/flotte-skoda-kodiaq.webp',
        tierBg: '#e0f2fe',
        tierColor: '#0369a1',
        description: {
            en: 'Elevated ride height with an expansive trunk, offering high road stability and panoramic comfort for small families.',
            fr: 'SUV surélevé avec un grand coffre, offrant une excellente stabilité et un grand confort pour les familles avec valises.',
            es: 'SUV espacioso con gran estabilidad en carretera y maletero amplio, perfecto para familias con equipaje o carritos.',
            ar: 'سيارة دفع رباعي مرتفعة بمساحة تخزين رحبة وثبات عالي، تناسب العائلات الصغيرة مع حقائب السفر وعربات الأطفال.'
        },
        features: {
            en: ['Extra-large trunk for heavy luggage', 'Flight tracking & arrivals meet & greet', 'Complimentary child & booster seats', 'Smooth all-road suspension'],
            fr: ['Grand coffre pour valises lourdes', 'Suivi du vol et accueil avec pancarte', 'Sièges enfant/bébé offerts sur demande', 'Suspension douce et confortable'],
            es: ['Maletero amplio para maletas grandes', 'Seguimiento de vuelo y bienvenida', 'Sillas infantiles gratis previa petición', 'Suspensión confortable para todo camino'],
            ar: ['صندوق أمتعة كبير للحقائب الثقيلة', 'تتبع دقيق للرحلات واستقبال فوري', 'مقاعد أطفال ورضع مجانية عند الطلب', 'نظام تعليق مريح وقيادة سلسة']
        }
    },
    {
        id: 'fiat-scudo',
        name: 'Fiat Scudo',
        category: {
            en: 'VIP Van',
            fr: 'Van VIP Spacieux',
            es: 'Van Espaciosa',
            ar: 'فان سياحي واسع'
        },
        capacityPax: '1–6',
        paxNum: 6,
        capacityBags: '5',
        fromPrice: 42,
        image: '/cars/flotte-fiat-scudo.webp',
        tierBg: '#ecfdf5',
        tierColor: '#065f46',
        description: {
            en: 'Modern, highly versatile transporter with wide sliding doors. Excellent value for families, golf bags, and medium-sized groups.',
            fr: 'Monospace moderne et très polyvalent avec portes coulissantes. Excellent pour les familles, sacs de golf et groupes.',
            es: 'Furgoneta moderna y versátil con puertas correderas amplias. Excelente relación calidad-precio para familias y grupos.',
            ar: 'فان حديث ومرن بأبواب منزلقة عريضة، يقدم أفضل قيمة للعائلات ومجموعات الأصدقاء مع حقائب متعددة.'
        },
        features: {
            en: ['Dual sliding doors for easy boarding', 'Flight tracking & meet & greet', 'Ample luggage space for 5 large bags', 'Rear passenger air vents'],
            fr: ['Portes coulissantes pour accès facile', 'Suivi de vol & accueil dans le terminal', 'Espace pour 5 grandes valises', 'Aérateurs de climatisation à l\'arrière'],
            es: ['Puertas correderas de fácil acceso', 'Seguimiento de vuelo y bienvenida', 'Espacio para 5 maletas grandes', 'Salidas de aire acondicionado traseras'],
            ar: ['أبواب منزلقة ثنائية لسهولة الصعود', 'تتبع الرحلات والاستقبال داخل المطار', 'مساحة تتسع لـ 5 حقائب كبيرة', 'فتحات تكييف هوائي للركاب بالخلف']
        }
    },
    {
        id: 'mercedes-vito',
        name: 'Mercedes-Benz Vito',
        category: {
            en: 'VIP Minivan',
            fr: 'Minivan VIP Prestige',
            es: 'Minivan VIP de Lujo',
            ar: 'ميني فان مرسيدس VIP'
        },
        capacityPax: '1–7',
        paxNum: 7,
        capacityBags: '6',
        fromPrice: 45,
        image: '/cars/flotte-vito.webp',
        isVito: true,
        tierBg: '#fff7ed',
        tierColor: '#c2410c',
        highlight: {
            en: 'Most Popular',
            fr: 'Plus Demandé',
            es: 'Más Popular',
            ar: 'الأكثر طلباً'
        },
        description: {
            en: 'The gold standard for Moroccan airport transfers. Premium leather cabin, privacy glass, and massive trunk space for multiple suitcases.',
            fr: 'La référence absolue des transferts aéroport au Maroc. Salon cuir grand confort, vitres teintées et immense coffre.',
            es: 'El estándar de referencia para traslados en Marruecos. Tapicería de cuero, cristales de privacidad y amplio maletero.',
            ar: 'الخيار الأول والأكثر طلباً لتوصيل المطارات في المغرب. مقاعد جلدية فاخرة، زجاج معتم للخصوصية، ومساحة هائلة للحقائب.'
        },
        features: {
            en: ['VIP leather seating with privacy glass', 'Flight tracking & name sign at arrivals', 'High-speed Wi-Fi & chilled water', 'Accommodates surfboards & golf bags'],
            fr: ['Sièges cuir de prestige & vitres teintées', 'Suivi de vol & accueil avec pancarte', 'Wi-Fi haut débit & bouteilles d\'eau', 'Espace pour planches de surf et golf'],
            es: ['Asientos de cuero de lujo y cristales oscuros', 'Seguimiento de vuelo y cartel en llegadas', 'Wi-Fi de alta velocidad y agua fría', 'Espacio para tablas de surf y bolsas de golf'],
            ar: ['مقاعد جلدية مريحة مع زجاج معتم', 'تتبع مواعيد الرحلات والاستقبال بالاسم', 'إنترنت واي فاي سريع ومياه معدنية مبردة', 'مساحة تتسع لمعدات الجولف وألواح التزلج']
        }
    },
    {
        id: 'mercedes-sprinter',
        name: 'Mercedes-Benz Sprinter',
        category: {
            en: 'VIP Minibus',
            fr: 'Minibus VIP Prestige',
            es: 'Minibús Gran Grupo',
            ar: 'حافلة صغيرة تنفيذية'
        },
        capacityPax: '8–16',
        paxNum: 16,
        capacityBags: '14',
        fromPrice: 85,
        image: '/cars/flotte-sprinter.webp',
        tierBg: '#fee2e2',
        tierColor: '#991b1b',
        description: {
            en: 'Walk-in standing cabin with individual reclining seats. Built for tour groups, corporate delegates, and large multi-generational families.',
            fr: 'Cabine spacieuse avec hauteur sous plafond et sièges inclinables. Conçu pour grands groupes, séminaires et familles.',
            es: 'Minibús de gran capacidad con techo alto y asientos reclinables individuales. Ideal para grupos grandes, eventos y empresas.',
            ar: 'مقصورة فاخرة بسقف مرتفع تسمح بالوقوف، مع مقاعد مستقلة مريحة، مخصصة للمجموعات السياحية والوفود الرسمية.'
        },
        features: {
            en: ['High-roof walk-in standing cabin', 'Individual reclining seats with USB ports', 'Massive separate rear luggage hold', 'Public address microphone system'],
            fr: ['Cabine haute permettant de se tenir debout', 'Sièges inclinables avec prises USB', 'Immense soute à bagages séparée', 'Microphone et sonorisation intégrés'],
            es: ['Techo alto para caminar con comodidad', 'Asientos individuales reclinables con USB', 'Maletero trasero independiente gigante', 'Sistema de sonido y micrófono para guía'],
            ar: ['سقف مرتفع لسهولة التحرك والوقوف', 'مقاعد فردية قابلة للإمالة مع منافذ USB', 'مستودع أمتعة خلفي مستقل وفائق الاتساع', 'نظام صوتي وميكروفون متكامل']
        }
    }
];

export default function FleetSection({ lang }: FleetSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';
    const isEn = !isAr && !isFr && !isEs;

    // Homepage exact eyebrow and title, tailored subtitle for airport transfers
    const text = {
        eyebrow: isAr ? 'أسطولنا المعتمد' : isFr ? 'NOTRE FLOTTE' : isEs ? 'NUESTRA FLOTA' : 'OUR FLEET',
        title: isAr ? 'أسطول سياراتنا لتوصيل المطارات مع سائق خاص' : isFr ? 'Notre Flotte de Chauffeurs & Navettes Aéroport au Maroc' : isEs ? 'Nuestra Flota de Chófer Privado y Traslados en Marruecos' : 'Our Morocco Airport Transfer & Chauffeur Fleet',
        subtitle: isAr
            ? 'مركبات مريحة ومكيفة بالكامل ومجهزة لاستقبال المسافرين ونقل الأمتعة العائلية بسلاسة وأمان.'
            : isFr
            ? 'Des véhicules climatisés et impeccables pour vos arrivées d\'aéroport, bagages familiaux et transferts directs.'
            : isEs
            ? 'Vehículos confortables y climatizados para llegadas al aeropuerto, equipaje familiar y traslados directos en Marruecos.'
            : 'Comfortable, air-conditioned vehicles for airport arrivals, family luggage, and direct hotel transfers across Morocco.',
        passengers: isAr ? 'ركاب' : isFr ? 'passagers' : isEs ? 'pasajeros' : 'passengers',
        bags: isAr ? 'حقائب' : isFr ? 'valises' : isEs ? 'maletas' : 'bags',
        ac: 'A/C',
        from: isAr ? 'ابتداءً من' : isFr ? 'À partir de' : isEs ? 'Desde' : 'From',
        bookVehicle: isAr ? 'اختيار هذه السيارة' : isFr ? 'Choisir ce véhicule' : isEs ? 'Elegir este vehículo' : 'Book this vehicle',
        checkAvailability: isAr ? 'التحقق من التوفر والحجز' : isFr ? 'Vérifier la disponibilité & réserver' : isEs ? 'Consultar disponibilidad y reservar' : 'Check availability & book',
        helperText: isAr
            ? 'هل تأخرت رحلتك؟ جميع التوصيلات تشمل 60 دقيقة انتظار مجاني وتتبع الرحلات في الوقت الفعلي.'
            : isFr
            ? 'Vol retardé ? Tous les transferts incluent 60 min d\'attente offerte et le suivi de vol en direct.'
            : isEs
            ? '¿Vuelo retrasado? Todos los traslados incluyen 60 min de espera gratuita y seguimiento de vuelo en tiempo real.'
            : 'Flight delayed? All transfers include 60 min free waiting time & real-time flight tracking.',
        disclaimer: isAr
            ? 'يتم تعقيم ونظافة جميع المركبات قبل كل رحلة. نوفر مقاعد أطفال ورضع مجاناً عند الطلب.'
            : isFr
            ? 'Véhicules contrôlés et nettoyés avant chaque trajet. Sièges bébé et rehausseurs disponibles gratuitement sur demande.'
            : isEs
            ? 'Vehículos desinfectados y revisados antes de cada traslado. Sillas de bebé disponibles gratis bajo petición.'
            : 'Vehicles are sanitized and inspected before every transfer. Free infant car seats & booster seats available upon request.',
        prevAria: isAr ? 'المركبات السابقة' : isFr ? 'Véhicules précédents' : isEs ? 'Vehículos anteriores' : 'Previous vehicles',
        nextAria: isAr ? 'المركبات التالية' : isFr ? 'Véhicules suivants' : isEs ? 'Vehículos siguientes' : 'Next vehicles'
    };

    // Center on Mercedes Vito initially (index 3)
    const initialIndex = VEHICLES.findIndex(v => v.isVito) !== -1 ? VEHICLES.findIndex(v => v.isVito) : 1;
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial positioning to center card on mount & resize
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const applyPosition = () => {
            if (!scrollContainerRef.current) return;
            const grid = scrollContainerRef.current;
            const cardElement = grid.children[initialIndex] as HTMLElement;
            if (cardElement) {
                const containerWidth = grid.clientWidth;
                const cardWidth = cardElement.clientWidth;
                const targetLeft = cardElement.offsetLeft - (containerWidth - cardWidth) / 2;
                grid.scrollLeft = targetLeft;
            }
        };

        applyPosition();
        const raf1 = requestAnimationFrame(applyPosition);
        const raf2 = requestAnimationFrame(() => requestAnimationFrame(applyPosition));
        const timer = setTimeout(applyPosition, 300);

        const handleResize = () => {
            if (!scrollContainerRef.current) return;
            const grid = scrollContainerRef.current;
            const currentCard = grid.children[activeIndex] as HTMLElement;
            if (currentCard) {
                const containerWidth = grid.clientWidth;
                const cardWidth = currentCard.clientWidth;
                const targetLeft = currentCard.offsetLeft - (containerWidth - cardWidth) / 2;
                grid.scrollLeft = targetLeft;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [initialIndex]);

    // Intersection observer for active card detection
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const observerOptions = {
            root: container,
            rootMargin: '0px -35% 0px -35%',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isProgrammaticScrollRef.current) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cardIndex = Array.from(container.children).indexOf(entry.target);
                    if (cardIndex !== -1) {
                        setActiveIndex(cardIndex);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        Array.from(container.children).forEach(child => observer.observe(child));

        return () => observer.disconnect();
    }, []);

    const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardElement = container.children[index] as HTMLElement;
        if (cardElement) {
            const containerWidth = container.clientWidth;
            const cardWidth = cardElement.clientWidth;
            const targetLeft = cardElement.offsetLeft - (containerWidth - cardWidth) / 2;

            isProgrammaticScrollRef.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isProgrammaticScrollRef.current = false;
            }, 600);

            container.scrollTo({
                left: targetLeft,
                behavior
            });
            setActiveIndex(index);
        }
    };

    const scrollPrev = () => {
        if (activeIndex > 0) scrollToIndex(activeIndex - 1);
    };

    const scrollNext = () => {
        if (activeIndex < VEHICLES.length - 1) scrollToIndex(activeIndex + 1);
    };

    const handleSelectVehicle = (vName: string, paxCount: number) => {
        const event = new CustomEvent('prefill-transfer-route', {
            detail: {
                pickup: 'Casablanca Airport',
                dropoff: 'Rabat',
                passengers: paxCount
            }
        });
        window.dispatchEvent(event);

        const widget = document.getElementById('hero-booking-widget');
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const activeVehicle = VEHICLES[activeIndex] || VEHICLES[initialIndex];

    return (
        <section className={styles.fleetSection} id="fleet">
            <div className={styles.container}>
                {/* Header matching homepage aesthetic */}
                <div className={styles.fleetHeader}>
                    <span className={styles.eyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.title}>{text.title}</h2>
                    <p className={styles.subtitle}>{text.subtitle}</p>
                </div>

                {/* Fleet Carousel */}
                <div className={styles.carouselWrapper} dir="ltr">
                    {/* Previous Button */}
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={activeIndex === 0}
                        className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
                        aria-label={text.prevAria}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* Scrollable Cards Grid */}
                    <div className={styles.fleetGrid} ref={scrollContainerRef}>
                        {VEHICLES.map((car, idx) => {
                            const isSelected = activeIndex === idx;
                            const categoryLabel = car.category[lang] || car.category.en;
                            const highlightLabel = car.highlight ? (car.highlight[lang] || car.highlight.en) : null;
                            const descLabel = car.description[lang] || car.description.en;
                            const featuresList = car.features[lang] || car.features.en;

                            return (
                                <div
                                    key={car.id}
                                    className={`${styles.fleetCard} ${car.isVito ? styles.vitoCard : ''} ${isSelected ? styles.activeCard : ''}`}
                                    onClick={() => scrollToIndex(idx)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            scrollToIndex(idx);
                                        }
                                    }}
                                    dir={isAr ? 'rtl' : 'ltr'}
                                >
                                    {/* Image Area */}
                                    <div className={styles.fleetImgArea}>
                                        <Image
                                            src={car.image}
                                            alt={`${car.name} - ${categoryLabel}`}
                                            width={360}
                                            height={210}
                                            loading="lazy"
                                            sizes="(max-width: 768px) 290px, 350px"
                                            className={styles.fleetImg}
                                        />
                                        {highlightLabel && (
                                            <span className={`${styles.fleetPill} ${styles.fleetPillRight}`}>
                                                {highlightLabel}
                                            </span>
                                        )}
                                    </div>

                                    {/* Card Body */}
                                    <div className={styles.fleetBody}>
                                        <h3 className={styles.fleetName}>{car.name}</h3>
                                        <div className={styles.fleetSubtitle}>{categoryLabel}</div>

                                        {/* Specs Row */}
                                        <div className={styles.fleetSpecs}>
                                            <div className={styles.fleetSpecPill}>
                                                <Icon icon="solar:users-group-rounded-bold" width="14" height="14" />
                                                <strong>{car.capacityPax} {text.passengers}</strong>
                                            </div>
                                            <div className={styles.fleetSpecPill}>
                                                <Icon icon="solar:suitcase-tag-bold" width="14" height="14" />
                                                <strong>{car.capacityBags} {text.bags}</strong>
                                            </div>
                                            <div className={styles.fleetSpecPill}>
                                                <Icon icon="solar:wind-bold" width="14" height="14" />
                                                <strong>{text.ac}</strong>
                                            </div>
                                        </div>

                                        {/* Transfer Description */}
                                        <p className={styles.fleetDesc}>{descLabel}</p>

                                        {/* Checklist */}
                                        <div className={styles.fleetFeatures}>
                                            {featuresList.map((feat, fIdx) => (
                                                <div key={fIdx} className={styles.fleetFeatureItem}>
                                                    <Icon
                                                        icon="solar:check-circle-bold"
                                                        width="14"
                                                        height="14"
                                                        className={styles.fleetFeatureCheck}
                                                    />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={activeIndex === VEHICLES.length - 1}
                        className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
                        aria-label={text.nextAria}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className={styles.carouselDots}>
                    {VEHICLES.map((v, idx) => (
                        <button
                            key={v.id}
                            type="button"
                            onClick={() => scrollToIndex(idx)}
                            className={`${styles.carouselDot} ${activeIndex === idx ? styles.activeDot : ''}`}
                            aria-label={isEn ? `Go to vehicle ${idx + 1}` : `Vehículo ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Bottom Universal CTA & Helpful Transfer Tip */}
                <div className={styles.bottomSection}>
                    <div>
                        <button
                            type="button"
                            onClick={() => handleSelectVehicle(activeVehicle.name, activeVehicle.paxNum)}
                            className={styles.sharedCtaBtn}
                        >
                            <span>{text.checkAvailability} — {activeVehicle.name}</span>
                            <Icon
                                icon={isAr ? "solar:arrow-left-linear" : "solar:arrow-right-linear"}
                                width="17"
                                height="17"
                            />
                        </button>
                    </div>

                    <div className={styles.helperBadge}>
                        <span className={styles.helperIcon}>💡</span>
                        <span>{text.helperText}</span>
                    </div>

                    <p className={styles.disclaimer}>
                        {text.disclaimer}
                    </p>
                </div>
            </div>
        </section>
    );
}

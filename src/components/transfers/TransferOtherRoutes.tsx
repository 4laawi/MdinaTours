"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Language } from '@/lib/translations';
import { trackLeadConversion } from '@/lib/tracking';
import { transfersData, LocalizedTransferData } from '@/lib/transfersData';
import { isSpanishSupported } from '@/lib/seo';
import styles from './TransferOtherRoutes.module.css';

interface TransferOtherRoutesProps {
    language: Language;
    currentSlug?: string;
}

function formatRouteTitle(slug: string, local: LocalizedTransferData, language: Language): string {
    if (slug.includes('-to-')) {
        const parts = slug.replace('-transfer', '').split('-to-');
        const from = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        const to = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
        return `${from} ⇄ ${to}`;
    }
    if (slug.includes('-airport-transfer')) {
        const city = slug.replace('-airport-transfer', '');
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        if (language === 'es') return `Aeropuerto de ${cityName}`;
        if (language === 'fr') return `Aéroport de ${cityName}`;
        return `${cityName} Airport Transfer`;
    }
    if (slug.includes('-port-transfer')) {
        const city = slug.replace('-port-transfer', '');
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        if (language === 'es') return `Puerto de ${cityName}`;
        if (language === 'fr') return `Port de ${cityName}`;
        return `${cityName} Port Transfer`;
    }
    return local.title.split(' - ')[0].split(' & ')[0];
}

export default function TransferOtherRoutes({ language, currentSlug }: TransferOtherRoutesProps) {
    const isEn = language === 'en';
    const isEs = language === 'es';
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const hasInitialScrolledRef = useRef(false);
    const hasRevealScrolledRef = useRef(false);
    const isProgrammaticScrollRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const routes = useMemo(() => {
        // Filter transfers based on Spanish support if on /es
        const eligibleTransfers = transfersData.filter(t => {
            if (currentSlug && t.slug === currentSlug) return false;
            if (language === 'es') {
                return Boolean(t.es) && isSpanishSupported(`/transfers/${t.slug}`);
            }
            return true;
        });

        const KNOWN_CITIES = ['casablanca', 'marrakech', 'rabat', 'tangier', 'fes', 'chefchaouen', 'agadir', 'essaouira', 'merzouga', 'sale'];
        const matchedCurrentCities = currentSlug
            ? KNOWN_CITIES.filter(city => currentSlug.toLowerCase().includes(city))
            : [];

        const isRelated = (slug: string) => {
            if (matchedCurrentCities.length === 0) return false;
            const lowerSlug = slug.toLowerCase();
            return matchedCurrentCities.some(city => lowerSlug.includes(city));
        };

        const related = eligibleTransfers.filter(t => isRelated(t.slug));
        const nonRelated = eligibleTransfers.filter(t => !isRelated(t.slug));

        // Prioritize matching city corridors, fill up to 8 cards with remaining transfers
        const selected = [...related, ...nonRelated].slice(0, 8);

        return selected.map(t => {
            const local = (language === 'es' && t.es) ? t.es : (language === 'fr' ? t.fr : t.en);
            const basePrice = t.prices[3] || t.prices[1] || Object.values(t.prices)[0];
            return {
                title: formatRouteTitle(t.slug, local, language),
                desc: local.tagline,
                price: `€${basePrice}`,
                image: t.image,
                slug: t.slug,
            };
        });
    }, [language, currentSlug]);

    // Observe section visibility so autoplay and reveal scroll only run when user is looking at this section
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Observe scroll position to update active dot indicator when user scrolls manually
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isProgrammaticScrollRef.current) return;
            const scrollLeft = container.scrollLeft;
            const children = Array.from(container.children) as HTMLElement[];
            if (children.length === 0) return;

            let closestIndex = 0;
            let minDistance = Infinity;

            children.forEach((child, idx) => {
                const distance = Math.abs(child.offsetLeft - scrollLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = idx;
                }
            });

            setActiveIndex(closestIndex);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [routes]);

    const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardElement = container.children[index] as HTMLElement;
        if (cardElement) {
            const targetLeft = cardElement.offsetLeft;
            
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

    // Mark initial mount without forced layout reflow
    useEffect(() => {
        if (hasInitialScrolledRef.current || routes.length === 0) return;
        hasInitialScrolledRef.current = true;
    }, [routes.length]);

    // On scroll reveal: automatically scroll +1 index once the section is revealed into view
    useEffect(() => {
        if (!isInView || hasRevealScrolledRef.current || isHovered || routes.length <= 1) return;

        hasRevealScrolledRef.current = true;
        const revealTimer = setTimeout(() => {
            scrollToIndex(1, 'smooth');
        }, 700);

        return () => clearTimeout(revealTimer);
    }, [isInView, isHovered, routes.length]);

    // Autoplay timer: triggers once every 5 seconds only when in viewport, pauses when hovered
    useEffect(() => {
        if (routes.length <= 1 || isHovered || !isInView) return;
        if (!hasRevealScrolledRef.current) return;

        const timer = setTimeout(() => {
            const nextIndex = activeIndex < routes.length - 1 ? activeIndex + 1 : 0;
            scrollToIndex(nextIndex);
        }, 5000);

        return () => clearTimeout(timer);
    }, [activeIndex, isHovered, isInView, routes.length]);

    const scrollPrev = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    };

    const scrollNext = () => {
        if (activeIndex < routes.length - 1) {
            scrollToIndex(activeIndex + 1);
        } else {
            scrollToIndex(0); // Loop back to the start
        }
    };

    const canScrollLeft = activeIndex > 0;
    const canScrollRight = activeIndex < routes.length - 1;
    const getPath = (slug: string) => `/${language}/transfers/${slug}`;

    return (
        <section 
            ref={sectionRef}
            className={styles.routesSection}
            id="popular-routes"
        >

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
            >
                {/* Header */}
                <div className={styles.routesHeader}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {isEn ? "Explore Other Routes" : isEs ? "Explorar Otras Rutas" : "Explorer d'Autres Trajets"}
                    </span>
                    <h2 style={{ 
                        fontSize: '2.1rem', 
                        fontWeight: 700, 
                        color: 'var(--secondary)', 
                        marginTop: '8px',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        textWrap: 'balance'
                    }}>
                        {isEn ? "Popular Private Transfer Routes" : isEs ? "Rutas de Traslado Privado Populares" : "Trajets de Transfert Privé Populaires"}
                    </h2>
                    <p style={{ color: '#666', marginTop: '10px', fontSize: '1.02rem' }}>
                        {isEn 
                            ? "Fixed-rate intercity routes with meet & greet and 24/7 support."
                            : isEs
                            ? "Rutas interurbanas con tarifa fija garantizada, asistencia y bienvenida 24/7."
                            : "Trajets intervilles à tarif fixe avec accueil personnalisé et assistance 24/7."}
                    </p>
                </div>

                {/* Carousel Container */}
                <div style={{ position: 'relative' }}>
                    {/* Previous Button */}
                    <button 
                        onClick={scrollPrev} 
                        disabled={!canScrollLeft}
                        className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
                        aria-label={isEn ? "Previous routes" : isEs ? "Rutas anteriores" : "Trajets précédents"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className={styles.routesCarouselGrid} ref={scrollContainerRef}>
                        {routes.map((route, idx) => (
                            <div key={idx} className={styles.routeCard}>
                                <Link href={getPath(route.slug)} prefetch={false} className="private-driver-route-img-link" style={{ display: 'block', position: 'relative' }}>
                                    <div className={styles.routeImgContainer}>
                                        <Image 
                                            src={route.image} 
                                            alt={route.title} 
                                            className={styles.routeImg}
                                            fill
                                            sizes="(max-width: 680px) 320px, (max-width: 1024px) 50vw, 380px"
                                            loading="lazy"
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '15px',
                                            right: '15px',
                                            backgroundColor: 'var(--secondary)',
                                            color: '#fff',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            zIndex: 2
                                        }}>
                                            {isEn ? "From" : isEs ? "Desde" : "Dès"} {route.price}
                                        </div>
                                    </div>
                                </Link>
                                
                                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
                                        <Link href={getPath(route.slug)} prefetch={false} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {route.title}
                                        </Link>
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
                                        {route.desc}
                                    </p>
                                    <Link 
                                        href={getPath(route.slug)}
                                        prefetch={false}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: 'var(--primary)',
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {isEn ? "View Route" : isEs ? "Ver Ruta" : "Voir le trajet"}
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={scrollNext} 
                        disabled={!canScrollRight}
                        className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
                        aria-label={isEn ? "Next routes" : isEs ? "Rutas siguientes" : "Trajets suivants"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className={styles.carouselDots}>
                    {routes.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            className={`${styles.carouselDot} ${activeIndex === idx ? styles.active : ''}`}
                            aria-label={isEn ? `Go to route ${idx + 1}` : isEs ? `Ir a ruta ${idx + 1}` : `Aller au trajet ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Subtle Cross-Sell Note */}
                <div style={{
                    marginTop: '36px',
                    textAlign: 'center',
                    padding: '16px 24px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid rgba(220, 131, 78, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}>
                    <span style={{ fontSize: '0.92rem', color: '#475569', fontWeight: 500 }}>
                        {isEn 
                            ? "Traveling elsewhere in Morocco? We can quote your remaining transfers together."
                            : isEs 
                            ? "¿Viaja a otros destinos en Marruecos? Podemos presupuestar todos sus traslados conjuntamente."
                            : "Vous voyagez ailleurs au Maroc ? Nous pouvons chiffrer l'ensemble de vos transferts ensemble."}
                    </span>
                    <a
                        href={`https://wa.me/212724114775?text=${encodeURIComponent(
                            isEn
                                ? "Hello Mdina Tours, I would like a custom quote for multiple transfer routes across Morocco."
                                : isEs
                                ? "Hola Mdina Tours, me gustaría solicitar presupuesto conjunto para varios traslados en Marruecos."
                                : "Bonjour Mdina Tours, je souhaite un devis combiné pour plusieurs transferts au Maroc."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackLeadConversion('catalog_footer_whatsapp')}
                        style={{
                            color: 'var(--primary)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none'
                        }}
                    >
                        <span>{isEn ? "Quote Multi-Route Plan →" : isEs ? "Solicitar Multi-Ruta →" : "Devis Multi-Trajets →"}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

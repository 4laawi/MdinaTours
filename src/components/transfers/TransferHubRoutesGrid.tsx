import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock, ShieldCheck, Car, Compass } from 'lucide-react';
import { Language } from '@/lib/translations';
import { transfersData } from '@/lib/transfersData';
import { toursData } from '@/lib/toursData';
import { isSpanishSupported } from '@/lib/seo';

interface TransferHubRoutesGridProps {
    language: Language;
    activeCity?: string;
    showTours?: boolean;
}

interface HubGroup {
    cityKey: string;
    cityName: { en: string; fr: string; es: string };
    tagline: { en: string; fr: string; es: string };
    slugs: string[];
}

const HUB_GROUPS: HubGroup[] = [
    {
        cityKey: 'casablanca',
        cityName: { en: 'Casablanca Hub', fr: 'Pôle Casablanca', es: 'Hub Casablanca' },
        tagline: {
            en: 'CMN Airport pickups and high-speed highway connections to imperial cities.',
            fr: 'Navettes aéroport CMN et liaisons autoroutières directes vers les villes impériales.',
            es: 'Traslados desde el aeropuerto CMN y conexiones por autopista a las ciudades imperiales.'
        },
        slugs: [
            'casablanca-airport-transfer',
            'casablanca-to-marrakech-transfer',
            'casablanca-to-fes-transfer',
            'rabat-to-casablanca-transfer',
        ]
    },
    {
        cityKey: 'marrakech',
        cityName: { en: 'Marrakech Hub', fr: 'Pôle Marrakech', es: 'Hub Marrakech' },
        tagline: {
            en: 'RAK Airport meet & greet and direct transfers across the High Atlas & coast.',
            fr: 'Accueil RAK Menara et liaisons directes vers l\'Atlas, la côte et le désert.',
            es: 'Servicio de bienvenida en RAK Menara y traslados directos al Atlas y la costa.'
        },
        slugs: [
            'marrakech-airport-transfer',
            'casablanca-to-marrakech-transfer',
            'marrakech-to-essaouira-transfer',
            'marrakech-to-agadir-transfer',
            'rabat-to-marrakech-transfer',
        ]
    },
    {
        cityKey: 'tangier',
        cityName: { en: 'Tangier & Northern Hub', fr: 'Pôle Tanger & Nord', es: 'Hub Tánger y Norte' },
        tagline: {
            en: 'Port shuttles, TNG Airport arrivals, and scenic mountain transfers to the Blue Pearl.',
            fr: 'Navettes portuaires, arrivées TNG et liaisons panoramiques vers la Perle Bleue.',
            es: 'Traslados desde el puerto y aeropuerto TNG hacia Chefchaouen y la costa norte.'
        },
        slugs: [
            'tangier-airport-transfer',
            'tangier-port-transfer',
            'tangier-to-chefchaouen-transfer',
            'tangier-to-rabat-transfer',
            'tangier-to-casablanca-transfer',
        ]
    },
    {
        cityKey: 'rabat',
        cityName: { en: 'Rabat Capital Hub', fr: 'Pôle Rabat Capitale', es: 'Hub Rabat Capital' },
        tagline: {
            en: 'RBA Airport VIP transfers and express tollway links to all administrative centers.',
            fr: 'Navettes VIP aéroport RBA et connexions express vers tous les centres majeurs.',
            es: 'Traslados VIP desde el aeropuerto RBA y rutas directas a las principales metrópolis.'
        },
        slugs: [
            'rabat-airport-transfer',
            'rabat-to-casablanca-transfer',
            'rabat-to-marrakech-transfer',
            'rabat-to-fes-transfer',
            'rabat-to-chefchaouen-transfer',
        ]
    },
    {
        cityKey: 'fes',
        cityName: { en: 'Fes & Sahara Gateway Hub', fr: 'Pôle Fès & Porte du Sahara', es: 'Hub Fez y Puerta del Sahara' },
        tagline: {
            en: 'FEZ Airport meet & greet, Rif Mountain routes, and long-distance desert expeditions.',
            fr: 'Accueil aéroport FEZ, traversées du Rif et expéditions longue distance vers Merzouga.',
            es: 'Recogidas en el aeropuerto FEZ, rutas por el Rif y traslados hacia el desierto de Merzouga.'
        },
        slugs: [
            'fes-airport-transfer',
            'fes-to-chefchaouen-transfer',
            'fes-to-merzouga-transfer',
            'casablanca-to-fes-transfer',
            'rabat-to-fes-transfer',
        ]
    },
    {
        cityKey: 'agadir',
        cityName: { en: 'Agadir & Atlantic Hub', fr: 'Pôle Agadir & Côte Atlantique', es: 'Hub Agadir y Costa Atlántica' },
        tagline: {
            en: 'AGA Airport private shuttles and express southern highway transfers to Marrakech.',
            fr: 'Navettes privées aéroport AGA et trajets rapides par autoroute vers Marrakech.',
            es: 'Shuttles privados desde el aeropuerto AGA y conexión directa por autopista con Marrakech.'
        },
        slugs: [
            'agadir-airport-transfer',
            'marrakech-to-agadir-transfer',
        ]
    }
];

export default function TransferHubRoutesGrid({ language, activeCity, showTours = true }: TransferHubRoutesGridProps) {
    const isEn = language === 'en';
    const isEs = language === 'es';

    const getPath = (routeSlug: string) => `/${language}/transfers/${routeSlug}`;
    const getTourPath = (tourSlug: string) => `/${language}/tours/${tourSlug}`;

    // Filter hubs if a specific active city is provided, or display all hubs
    const filteredHubs = activeCity
        ? HUB_GROUPS.filter(h => h.cityKey.toLowerCase() === activeCity.toLowerCase())
        : HUB_GROUPS;

    // Filter tours based on Spanish approval if on /es
    const displayedTours = isEs
        ? toursData.filter(t => isSpanishSupported(`/tours/${t.slug}`))
        : toursData;

    return (
        <section
            id="morocco-intercity-network"
            style={{
                padding: '80px 20px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid rgba(0,0,0,0.06)'
            }}
            aria-label={isEn ? "Morocco Intercity Transfer Network" : isEs ? "Red de Traslados Interurbanos en Marruecos" : "Réseau de Transferts Intervilles au Maroc"}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(220, 131, 78, 0.08)',
                        color: 'var(--primary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                    }}>
                        <Car size={15} aria-hidden="true" />
                        <span>{isEn ? "Crawlable Route Directory" : isEs ? "Directorio Oficial de Rutas" : "Réseau Officiel de Trajets"}</span>
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                        margin: '0 0 12px 0',
                        fontFamily: 'var(--font-poppins), sans-serif'
                    }}>
                        {isEn
                            ? "Complete Morocco Private Transfer & City-to-City Network"
                            : isEs
                                ? "Red Completa de Traslados Privados y Viajes Entre Ciudades"
                                : "Réseau Complet de Transferts Privés & Liaisons Intervilles"}
                    </h2>

                    <p style={{
                        color: '#64748b',
                        fontSize: '1.02rem',
                        maxWidth: '750px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        {isEn
                            ? "Explore our 100% fixed-rate intercity routes, airport shuttles, and private chauffeur connections across all Moroccan travel hubs."
                            : isEs
                                ? "Descubra todas nuestras rutas interurbanas con tarifa fija garantizada, transfers al aeropuerto y vehículos privados entre las principales ciudades de Marruecos."
                                : "Découvrez toutes nos liaisons intervilles à prix ferme garanti, navettes aéroport et chauffeurs privés reliant les grands pôles touristiques et économiques du Maroc."}
                    </p>
                </div>

                {/* Hub Groups Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '24px',
                    marginBottom: showTours ? '60px' : '0px'
                }}>
                    {filteredHubs.map(hub => {
                        const hubTitle = hub.cityName[language] || hub.cityName.en;
                        const hubTagline = hub.tagline[language] || hub.tagline.en;

                        return (
                            <div
                                key={hub.cityKey}
                                style={{
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <MapPin size={18} style={{ color: 'var(--primary)' }} aria-hidden="true" />
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'var(--secondary)',
                                            margin: 0,
                                            fontFamily: 'var(--font-poppins), sans-serif'
                                        }}>
                                            {hubTitle}
                                        </h3>
                                    </div>

                                    <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                                        {hubTagline}
                                    </p>

                                    {/* Route Links for this Hub */}
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {hub.slugs.map(slug => {
                                            const trans = transfersData.find(t => t.slug === slug);
                                            if (!trans) return null;
                                            if (isEs && !isSpanishSupported(`/transfers/${slug}`)) return null;

                                            const local = trans[language] || trans.en;
                                            const minPrice = trans.prices[3] || trans.prices[4] || Object.values(trans.prices)[0];

                                            return (
                                                <li key={slug} style={{
                                                    backgroundColor: '#ffffff',
                                                    border: '1px solid #eef2f6',
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '12px'
                                                }}>
                                                    <div style={{ minWidth: 0, flex: 1 }}>
                                                        <Link
                                                            href={getPath(trans.slug)}
                                                            prefetch={false}
                                                            style={{
                                                                color: 'var(--secondary)',
                                                                fontWeight: 600,
                                                                fontSize: '0.92rem',
                                                                textDecoration: 'none',
                                                                display: 'block',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            {local.pickup} ⇄ {local.dropoff}
                                                        </Link>

                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', fontSize: '0.78rem', color: '#94a3b8' }}>
                                                            {local.distance && <span>{local.distance}</span>}
                                                            {local.duration && <span>• {local.duration}</span>}
                                                        </div>
                                                    </div>

                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                            €{minPrice}
                                                        </span>
                                                        <Link
                                                            href={getPath(trans.slug)}
                                                            prefetch={false}
                                                            aria-label={`View ${local.pickup} to ${local.dropoff} transfer`}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-end',
                                                                color: 'var(--secondary)',
                                                                marginTop: '2px'
                                                            }}
                                                        >
                                                            <ArrowRight size={14} aria-hidden="true" />
                                                        </Link>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Guided Tours Interlinking Row */}
                {showTours && displayedTours.length > 0 && (
                    <div style={{
                        backgroundColor: '#f1f5f9',
                        borderRadius: '20px',
                        padding: '35px 25px',
                        border: '1px solid #cbd5e1'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '22px' }}>
                            <div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                                    <Compass size={16} aria-hidden="true" />
                                    <span>{isEn ? "Private Guided Day Excursions" : isEs ? "Excursiones y Tours Privados" : "Excursions & Circuits Privés"}</span>
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)', margin: '4px 0 0 0', fontFamily: 'var(--font-poppins), sans-serif' }}>
                                    {isEn ? "Complete Your Trip with Licensed Driver-Guides" : isEs ? "Complete su Viaje con Excursiones Guiadas Privadas" : "Complétez Votre Séjour avec nos Circuits Guidés"}
                                </h3>
                            </div>
                            <Link
                                href={`/${language}/tours`}
                                prefetch={false}
                                style={{
                                    backgroundColor: 'var(--secondary)',
                                    color: '#ffffff',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    fontSize: '0.88rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span>{isEn ? "View All 8 Tours →" : isEs ? "Ver Todas las Excursiones →" : "Voir tous les Circuits →"}</span>
                            </Link>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '14px'
                        }}>
                            {displayedTours.map(tour => {
                                const local = tour[language] || tour.en;
                                return (
                                    <Link
                                        key={tour.slug}
                                        href={getTourPath(tour.slug)}
                                        prefetch={false}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '12px',
                                            padding: '14px 16px',
                                            border: '1px solid #e2e8f0',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '10px',
                                            transition: 'border-color 0.2s, transform 0.2s'
                                        }}
                                    >
                                        <div style={{ minWidth: 0 }}>
                                            <span style={{
                                                display: 'block',
                                                fontSize: '0.92rem',
                                                fontWeight: 600,
                                                color: 'var(--secondary)',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {local.title}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                {local.duration} • {local.priceText || 'VIP Private Tour'}
                                            </span>
                                        </div>
                                        <ArrowRight size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden="true" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

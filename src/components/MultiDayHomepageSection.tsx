"use client";

import React from 'react';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';
import { Users, Heart, Compass, MapTrifold, WhatsappLogo, ArrowRight, CheckCircle } from '@phosphor-icons/react';

interface MultiDayHomepageSectionProps {
    lang: Language;
}

export default function MultiDayHomepageSection({ lang }: MultiDayHomepageSectionProps) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const getPath = (path: string) => (lang === 'en' && path === '/' ? '/' : `/${lang}${path === '/' ? '' : path}`);

    const tags = [
        { icon: <Heart size={18} color="var(--primary)" weight="bold" />, label: t('multiday_tag_couples') },
        { icon: <Users size={18} color="var(--primary)" weight="bold" />, label: t('multiday_tag_families') },
        { icon: <Compass size={18} color="var(--primary)" weight="bold" />, label: t('multiday_tag_groups') },
        { icon: <MapTrifold size={18} color="var(--primary)" weight="bold" />, label: t('multiday_tag_itineraries') }
    ];

    const routeCities = ["Casablanca", "Rabat", "Chefchaouen", "Fes", "Merzouga", "Marrakech"];

    const waMessage = encodeURIComponent(
        isEn
            ? "Hello Mdina Tours, I would like to request a quote for a multi-day private transportation plan in Morocco."
            : isEs
            ? "Hola Mdina Tours, me gustaría solicitar presupuesto para transporte privado de varios días en Marruecos."
            : "Bonjour Mdina Tours, je souhaite obtenir un devis pour un transport privé sur plusieurs jours au Maroc."
    );

    return (
        <section style={{
            padding: '90px 20px',
            backgroundColor: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            borderTop: 'none'
        }} id="multiday-transportation">
            <div className="container" style={{ maxWidth: '1150px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto' }}>
                    <div style={{
                        color: 'var(--primary)',
                        fontFamily: "'Great Vibes', cursive, var(--font-poppins)",
                        fontSize: '2rem',
                        marginBottom: '6px'
                    }}>
                        {t('multiday_section_subtitle')}
                    </div>
                    <h2 className="section-title" style={{ fontSize: '2.4rem', color: 'var(--accent)', marginBottom: '14px' }}>
                        {t('multiday_section_title')}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                        {t('multiday_section_desc')}
                    </p>
                </div>

                {/* Target Travelers Badges */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '35px'
                }}>
                    {tags.map((tag, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: 'var(--bg-color)',
                                border: '1px solid rgba(0,0,0,0.06)',
                                borderRadius: '100px',
                                padding: '8px 18px',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: 'var(--accent)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                            }}
                        >
                            {tag.icon}
                            <span>{tag.label}</span>
                        </div>
                    ))}
                </div>

                {/* Route Flow Card */}
                <div style={{
                    backgroundColor: 'var(--bg-color)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    padding: '36px 30px',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '24px',
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        paddingBottom: '16px'
                    }}>
                        <div>
                            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--primary)' }}>
                                {t('multiday_route_label')}
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', margin: '4px 0 0 0' }}>
                                {isEn ? "Flexible Multi-City Route Example" : isEs ? "Ejemplo de Ruta Multi-Ciudad Flexible" : "Exemple d'Itinéraire Multi-Villes"}
                            </h3>
                        </div>
                        <span style={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#15803d',
                            backgroundColor: '#f0fdf4',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            border: '1px solid #bbf7d0'
                        }}>
                            {isEn ? "100% Customizable Schedule" : isEs ? "Horarios 100% Personalizables" : "Horaires 100% Personnalisables"}
                        </span>
                    </div>

                    {/* Step pills */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '26px',
                        padding: '10px 0'
                    }}>
                        {routeCities.map((city, index) => (
                            <React.Fragment key={city}>
                                <div style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    padding: '10px 18px',
                                    fontWeight: 700,
                                    fontSize: '0.92rem',
                                    color: 'var(--accent)',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                                }}>
                                    {city}
                                </div>
                                {index < routeCities.length - 1 && (
                                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>➔</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* What to Send Us Checklist */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '14px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        padding: '18px 20px',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            fontSize: '0.86rem',
                            fontWeight: 700,
                            color: 'var(--secondary)',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <span>📋</span>
                            <span>{t('multiday_send_intro')}</span>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '10px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                                <CheckCircle size={16} color="#10b981" weight="fill" style={{ flexShrink: 0 }} />
                                <span>{t('multiday_check_1')}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                                <CheckCircle size={16} color="#10b981" weight="fill" style={{ flexShrink: 0 }} />
                                <span>{t('multiday_check_2')}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                                <CheckCircle size={16} color="#10b981" weight="fill" style={{ flexShrink: 0 }} />
                                <span>{t('multiday_check_3')}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                                <CheckCircle size={16} color="#10b981" weight="fill" style={{ flexShrink: 0 }} />
                                <span>{t('multiday_check_4')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Clarification Notice */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderLeft: '4px solid var(--primary)',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0',
                        fontSize: '0.88rem',
                        color: '#64748b',
                        lineHeight: '1.6',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                    }}>
                        <CheckCircle size={22} color="var(--primary)" weight="fill" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{t('multiday_note')}</span>
                    </div>
                </div>

                {/* CTAs */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <a
                        href={`https://wa.me/212724114775?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#25D366',
                            color: '#ffffff',
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)'
                        }}
                    >
                        <WhatsappLogo size={20} weight="fill" />
                        <span>{t('send_itinerary_btn')}</span>
                    </a>

                    <Link
                        href={getPath('/car-with-driver-morocco-8-days')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#ffffff',
                            color: 'var(--secondary)',
                            border: '1.5px solid var(--secondary)',
                            padding: '13px 26px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <span>{t('multiday_cta_example')}</span>
                        <ArrowRight size={18} weight="bold" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';
import { Clock, CalendarCheck, NavigationArrow, ShieldCheck, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';

interface PrivateDriverHomepageSectionProps {
    lang: Language;
}

export default function PrivateDriverHomepageSection({ lang }: PrivateDriverHomepageSectionProps) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const getPath = (path: string) => (lang === 'en' && path === '/' ? '/' : `/${lang}${path === '/' ? '' : path}`);

    const features = [
        {
            icon: <Clock size={28} color="var(--primary)" weight="duotone" />,
            title: t('driver_hourly_title'),
            desc: t('driver_hourly_desc')
        },
        {
            icon: <CalendarCheck size={28} color="var(--primary)" weight="duotone" />,
            title: t('driver_fullday_title'),
            desc: t('driver_fullday_desc')
        },
        {
            icon: <NavigationArrow size={28} color="var(--primary)" weight="duotone" />,
            title: t('driver_intercity_title'),
            desc: t('driver_intercity_desc')
        },
        {
            icon: <ShieldCheck size={28} color="var(--primary)" weight="duotone" />,
            title: t('driver_multiday_title'),
            desc: t('driver_multiday_desc')
        }
    ];

    const waMessage = encodeURIComponent(
        isEn
            ? "Hello Mdina Tours, I would like to inquire about hiring a private driver for my Morocco itinerary."
            : isEs
            ? "Hola Mdina Tours, deseo solicitar información para contratar un conductor privado en Marruecos."
            : "Bonjour Mdina Tours, je souhaite avoir des informations pour réserver un chauffeur privé pour mon séjour au Maroc."
    );

    return (
        <section style={{
            padding: '90px 20px',
            backgroundColor: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }} id="private-driver-section">
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 45px auto' }}>
                    <div style={{
                        color: 'var(--primary)',
                        fontFamily: "'Great Vibes', cursive, var(--font-poppins)",
                        fontSize: '2rem',
                        marginBottom: '6px'
                    }}>
                        {t('driver_section_subtitle')}
                    </div>
                    <h2 className="section-title" style={{ fontSize: '2.4rem', color: 'var(--accent)', marginBottom: '14px' }}>
                        {t('driver_section_title')}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                        {t('driver_section_desc')}
                    </p>
                </div>

                {/* 4 Feature Pillars Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                    marginBottom: '45px'
                }}>
                    {features.map((feat, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid rgba(0,0,0,0.06)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                padding: '28px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '12px',
                                backgroundColor: 'var(--bg-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '18px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                            }}>
                                {feat.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: 'var(--accent)',
                                marginBottom: '8px'
                            }}>
                                {feat.title}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: '#64748b',
                                lineHeight: '1.55',
                                margin: 0
                            }}>
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <Link
                        href={getPath('/private-driver-morocco')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'var(--secondary)',
                            color: '#ffffff',
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 4px 14px rgba(32, 47, 89, 0.2)'
                        }}
                    >
                        <span>{t('explore_driver_btn')}</span>
                        <ArrowRight size={18} weight="bold" />
                    </Link>

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
                </div>
            </div>
        </section>
    );
}

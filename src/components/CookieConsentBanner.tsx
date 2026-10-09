"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieConsentBanner.module.css';

export default function CookieConsentBanner({ lang = 'en' }: { lang?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [preferences, setPreferences] = useState({ analytics: false, ads: false });

    const t = {
        title: lang === 'es' ? 'Cookies' : lang === 'fr' ? 'Cookies' : 'Cookies',
        body: lang === 'es' 
            ? 'Utilizamos cookies para garantizar el buen funcionamiento del sitio, analizar el tráfico y personalizar la publicidad.' 
            : lang === 'fr' 
            ? 'Nous utilisons des cookies pour assurer le bon fonctionnement du site, analyser la fréquentation et personnaliser la publicité.'
            : 'We use cookies to ensure site functionality, analyze traffic, and personalize advertising.',
        modalTitle: lang === 'es' 
            ? 'Personalizar preferencias de cookies' 
            : lang === 'fr' 
            ? 'Personnaliser vos préférences' 
            : 'Customize your cookie preferences',
        modalDesc: lang === 'es'
            ? 'Seleccione qué cookies desea permitir. Las cookies esenciales siempre están habilitadas.'
            : lang === 'fr'
            ? 'Choisissez les cookies que vous souhaitez autoriser. Les cookies indispensables restent toujours activés.'
            : 'Choose which cookies you want to allow. Essential cookies are always required.',
        acceptAll: lang === 'es' ? 'Aceptar todas' : lang === 'fr' ? 'Tout accepter' : 'Accept all',
        rejectAll: lang === 'es' ? 'Rechazar' : lang === 'fr' ? 'Refuser' : 'Reject',
        customize: lang === 'es' ? 'Personalizar' : lang === 'fr' ? 'Personnaliser' : 'Customize',
        save: lang === 'es' ? 'Guardar' : lang === 'fr' ? 'Enregistrer' : 'Save preferences',
        cancel: lang === 'es' ? 'Cancelar' : lang === 'fr' ? 'Annuler' : 'Cancel',
        essential: lang === 'es' ? 'Necesarias' : lang === 'fr' ? 'Nécessaires' : 'Necessary',
        essentialDesc: lang === 'es' ? 'Requeridas para el funcionamiento técnico de la web.' : lang === 'fr' ? 'Indispensables au fonctionnement technique du site.' : 'Required for the website to function properly.',
        analytics: lang === 'es' ? 'Rendimiento y Analítica' : lang === 'fr' ? 'Performance et Analytique' : 'Performance & Analytics',
        analyticsDesc: lang === 'es' ? 'Permiten entender cómo interactúan los usuarios con el sitio.' : lang === 'fr' ? 'Permettent de mesurer l\'audience et d\'améliorer le service.' : 'Help us understand how visitors interact with the site.',
        ads: lang === 'es' ? 'Publicidad' : lang === 'fr' ? 'Publicité' : 'Advertising',
        adsDesc: lang === 'es' ? 'Utilizadas para mostrar anuncios y ofertas relevantes.' : lang === 'fr' ? 'Servent à diffuser des annonces pertinentes.' : 'Used to deliver relevant ads and measure campaigns.',
        privacyLink: lang === 'es' ? 'Política de Privacidad' : lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy',
    };

    useEffect(() => {
        const stored = localStorage.getItem('cookieConsent');
        if (!stored) {
            const timer = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(timer);
        } else {
            const handleOpen = () => {
                const currentPrefs = JSON.parse(localStorage.getItem('cookieConsent') || '{"analytics":false,"ads":false}');
                setPreferences(currentPrefs);
                setShowCustomModal(true);
            };
            window.addEventListener('openCookieBanner', handleOpen);
            return () => window.removeEventListener('openCookieBanner', handleOpen);
        }
    }, []);

    const handleAcceptAll = () => {
        saveConsent({ analytics: true, ads: true });
    };

    const handleRejectAll = () => {
        saveConsent({ analytics: false, ads: false });
    };

    const handleSaveCustom = () => {
        saveConsent(preferences);
    };

    const saveConsent = (consents: { analytics: boolean; ads: boolean }) => {
        localStorage.setItem('cookieConsent', JSON.stringify(consents));
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': consents.analytics ? 'granted' : 'denied',
                'ad_storage': consents.ads ? 'granted' : 'denied',
                'ad_user_data': consents.ads ? 'granted' : 'denied',
                'ad_personalization': consents.ads ? 'granted' : 'denied',
            });
        }
        
        setIsVisible(false);
        setShowCustomModal(false);
    };

    return (
        <>
            {/* 1. Silktide Style Compact Prompt */}
            {isVisible && !showCustomModal && (
                <div className={styles.promptWrapper}>
                    <div className={styles.promptCard} role="region" aria-label="Cookie consent">
                        <div className={styles.promptHeader}>
                            <h3 className={styles.promptTitle}>{t.title}</h3>
                        </div>
                        <p className={styles.promptBody}>
                            {t.body}{' '}
                            <Link href={`/${lang === 'en' ? '' : lang + '/'}privacy`} className={styles.privacyLink}>
                                {t.privacyLink}
                            </Link>
                        </p>
                        <div className={styles.promptActions}>
                            <button 
                                type="button"
                                onClick={() => setShowCustomModal(true)}
                                className={styles.btnText}
                            >
                                {t.customize}
                            </button>
                            <div className={styles.btnGroup}>
                                <button 
                                    type="button"
                                    onClick={handleRejectAll}
                                    className={styles.btnSecondary}
                                >
                                    {t.rejectAll}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleAcceptAll}
                                    className={styles.btnPrimary}
                                >
                                    {t.acceptAll}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Silktide Style Preferences Modal */}
            {showCustomModal && (
                <div 
                    className={styles.modalBackdrop}
                    onClick={() => {
                        if (localStorage.getItem('cookieConsent')) {
                            setShowCustomModal(false);
                        }
                    }}
                >
                    <div 
                        className={styles.modalCard}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cookie-modal-title"
                    >
                        <div className={styles.modalHeader}>
                            <h3 id="cookie-modal-title" className={styles.modalTitle}>{t.modalTitle}</h3>
                            {localStorage.getItem('cookieConsent') && (
                                <button 
                                    type="button"
                                    onClick={() => setShowCustomModal(false)}
                                    className={styles.modalCloseBtn}
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        <div className={styles.modalBody}>
                            <p className={styles.modalDescription}>{t.modalDesc}</p>

                            <div className={styles.categoryList}>
                                <div className={styles.categoryRow}>
                                    <div className={styles.categoryInfo}>
                                        <div className={styles.categoryName}>{t.essential}</div>
                                        <div className={styles.categoryDesc}>{t.essentialDesc}</div>
                                    </div>
                                    <div className={`${styles.toggle} ${styles.toggleActive} ${styles.toggleDisabled}`} title="Always active">
                                        <div className={styles.toggleThumb} />
                                    </div>
                                </div>

                                <div className={styles.categoryRow}>
                                    <div className={styles.categoryInfo}>
                                        <div className={styles.categoryName}>{t.analytics}</div>
                                        <div className={styles.categoryDesc}>{t.analyticsDesc}</div>
                                    </div>
                                    <div 
                                        className={`${styles.toggle} ${preferences.analytics ? styles.toggleActive : ''}`}
                                        onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                        role="switch"
                                        aria-checked={preferences.analytics}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === ' ' || e.key === 'Enter') {
                                                e.preventDefault();
                                                setPreferences(prev => ({ ...prev, analytics: !prev.analytics }));
                                            }
                                        }}
                                    >
                                        <div className={styles.toggleThumb} />
                                    </div>
                                </div>

                                <div className={styles.categoryRow}>
                                    <div className={styles.categoryInfo}>
                                        <div className={styles.categoryName}>{t.ads}</div>
                                        <div className={styles.categoryDesc}>{t.adsDesc}</div>
                                    </div>
                                    <div 
                                        className={`${styles.toggle} ${preferences.ads ? styles.toggleActive : ''}`}
                                        onClick={() => setPreferences(prev => ({ ...prev, ads: !prev.ads }))}
                                        role="switch"
                                        aria-checked={preferences.ads}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === ' ' || e.key === 'Enter') {
                                                e.preventDefault();
                                                setPreferences(prev => ({ ...prev, ads: !prev.ads }));
                                            }
                                        }}
                                    >
                                        <div className={styles.toggleThumb} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button 
                                type="button"
                                onClick={() => setShowCustomModal(false)}
                                className={styles.btnSecondary}
                            >
                                {t.cancel}
                            </button>
                            <button 
                                type="button"
                                onClick={handleSaveCustom}
                                className={styles.btnPrimary}
                            >
                                {t.save}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

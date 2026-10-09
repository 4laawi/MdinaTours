"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export default function CookieConsentBanner({ lang = 'en' }: { lang?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [preferences, setPreferences] = useState({ analytics: false, ads: false });

    const t = {
        title: lang === 'es' ? 'Tu Privacidad' : lang === 'fr' ? 'Votre Confidentialité' : 'Your Privacy',
        body: lang === 'es' 
            ? 'Utilizamos cookies para garantizar el buen funcionamiento del sitio, personalizar anuncios (Google Ads) y analizar nuestro tráfico. Por favor, selecciona tus preferencias.' 
            : lang === 'fr' 
            ? 'Nous utilisons des cookies pour assurer le bon fonctionnement du site, personnaliser les publicités (Google Ads) et analyser notre trafic. Veuillez sélectionner vos préférences.'
            : 'We use cookies to ensure the proper functioning of the site, personalize advertising (Google Ads), and analyze our traffic. Please select your preferences.',
        acceptAll: lang === 'es' ? 'Aceptar Todas' : lang === 'fr' ? 'Tout Accepter' : 'Accept All',
        rejectAll: lang === 'es' ? 'Rechazar Opcionales' : lang === 'fr' ? 'Refuser Optionnels' : 'Reject Non-Essential',
        customize: lang === 'es' ? 'Personalizar' : lang === 'fr' ? 'Personnaliser' : 'Customize',
        save: lang === 'es' ? 'Guardar Preferencias' : lang === 'fr' ? 'Enregistrer' : 'Save Preferences',
        essential: lang === 'es' ? 'Esenciales' : lang === 'fr' ? 'Essentiels' : 'Essential',
        essentialDesc: lang === 'es' ? 'Necesarias para que el sitio funcione.' : lang === 'fr' ? 'Nécessaires au fonctionnement.' : 'Required for the site to function.',
        analytics: lang === 'es' ? 'Analíticas' : lang === 'fr' ? 'Analytiques' : 'Analytics',
        analyticsDesc: lang === 'es' ? 'Para entender cómo usas el sitio.' : lang === 'fr' ? 'Pour comprendre votre utilisation.' : 'To understand how you use the site.',
        ads: lang === 'es' ? 'Publicidad' : lang === 'fr' ? 'Publicité' : 'Advertising',
        adsDesc: lang === 'es' ? 'Para mostrarte anuncios relevantes para ti.' : lang === 'fr' ? 'Pour montrer des annonces pertinentes.' : 'To show you relevant ads.',
        privacyLink: lang === 'es' ? 'Política de Privacidad' : lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy',
        back: lang === 'es' ? 'Volver' : lang === 'fr' ? 'Retour' : 'Back',
    };

    useEffect(() => {
        const stored = localStorage.getItem('cookieConsent');
        if (!stored) {
            // Slight delay before showing so it feels less aggressive
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            const handleOpen = () => {
                const currentPrefs = JSON.parse(localStorage.getItem('cookieConsent') || '{"analytics":false,"ads":false}');
                setPreferences(currentPrefs);
                setShowCustom(true);
                setIsVisible(true);
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
        setTimeout(() => setShowCustom(false), 300); // reset state after animation
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 lg:p-8 flex justify-center pointer-events-none"
                >
                    <div className="bg-white pointer-events-auto border border-[#EAEAEA] shadow-[0_2px_40px_rgba(0,0,0,0.06)] rounded-xl w-full max-w-4xl flex flex-col overflow-hidden font-sans">
                        
                        {!showCustom ? (
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="flex-1 space-y-3">
                                    <h3 className="text-lg font-semibold text-[#111111] tracking-tight">{t.title}</h3>
                                    <p className="text-sm text-[#787774] leading-relaxed max-w-2xl">
                                        {t.body} <Link href={`/${lang === 'en' ? '' : lang + '/'}privacy`} className="underline decoration-[#EAEAEA] underline-offset-4 hover:text-[#111111] transition-colors">{t.privacyLink}</Link>.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                                    <button 
                                        onClick={() => setShowCustom(true)}
                                        className="px-5 py-2.5 text-sm font-medium text-[#111111] bg-transparent border border-[#EAEAEA] rounded-md hover:bg-[#F7F6F3] transition-colors active:scale-[0.98]"
                                    >
                                        {t.customize}
                                    </button>
                                    <button 
                                        onClick={handleRejectAll}
                                        className="px-5 py-2.5 text-sm font-medium text-[#111111] bg-transparent border border-[#EAEAEA] rounded-md hover:bg-[#F7F6F3] transition-colors active:scale-[0.98]"
                                    >
                                        {t.rejectAll}
                                    </button>
                                    <button 
                                        onClick={handleAcceptAll}
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-[#111111] rounded-md hover:bg-[#333333] transition-colors active:scale-[0.98]"
                                    >
                                        {t.acceptAll}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 md:p-8 flex flex-col gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-[#111111] tracking-tight">{t.customize}</h3>
                                    <p className="text-sm text-[#787774] leading-relaxed">{t.body}</p>
                                </div>
                                
                                <div className="space-y-4 border-y border-[#EAEAEA] py-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-[#111111]">{t.essential}</div>
                                            <div className="text-xs text-[#787774] mt-1">{t.essentialDesc}</div>
                                        </div>
                                        <div className="relative inline-block w-10 shrink-0 align-middle select-none">
                                            <input type="checkbox" checked disabled className="absolute block w-5 h-5 rounded-full bg-white border-[5px] border-[#111111] appearance-none cursor-not-allowed right-0" />
                                            <label className="block overflow-hidden h-5 rounded-full bg-[#111111] cursor-not-allowed"></label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-[#111111]">{t.analytics}</div>
                                            <div className="text-xs text-[#787774] mt-1">{t.analyticsDesc}</div>
                                        </div>
                                        <div 
                                            className="relative inline-block w-10 shrink-0 align-middle select-none cursor-pointer"
                                            onClick={() => setPreferences(prev => ({...prev, analytics: !prev.analytics}))}
                                        >
                                            <div className={`absolute top-0 w-5 h-5 rounded-full bg-white transition-all duration-200 ease-in-out z-10 shadow-sm ${preferences.analytics ? 'right-0 border-[5px] border-[#111111]' : 'left-0 border border-[#EAEAEA]'}`} />
                                            <div className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ease-in-out ${preferences.analytics ? 'bg-[#111111]' : 'bg-[#EAEAEA]'}`}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-medium text-[#111111]">{t.ads}</div>
                                            <div className="text-xs text-[#787774] mt-1">{t.adsDesc}</div>
                                        </div>
                                        <div 
                                            className="relative inline-block w-10 shrink-0 align-middle select-none cursor-pointer"
                                            onClick={() => setPreferences(prev => ({...prev, ads: !prev.ads}))}
                                        >
                                            <div className={`absolute top-0 w-5 h-5 rounded-full bg-white transition-all duration-200 ease-in-out z-10 shadow-sm ${preferences.ads ? 'right-0 border-[5px] border-[#111111]' : 'left-0 border border-[#EAEAEA]'}`} />
                                            <div className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ease-in-out ${preferences.ads ? 'bg-[#111111]' : 'bg-[#EAEAEA]'}`}></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3">
                                    <button 
                                        onClick={() => setShowCustom(false)}
                                        className="px-5 py-2.5 text-sm font-medium text-[#111111] bg-transparent hover:underline transition-all"
                                    >
                                        {t.back}
                                    </button>
                                    <button 
                                        onClick={handleSaveCustom}
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-[#111111] rounded-md hover:bg-[#333333] transition-colors active:scale-[0.98]"
                                    >
                                        {t.save}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { Language } from '@/lib/translations';

export default function CookieConsentRevokeLink({ 
    lang = 'en',
    className
}: { 
    lang?: Language,
    className?: string
}) {
    const text = lang === 'es' ? 'Preferencias de Cookies' : lang === 'fr' ? 'Préférences de Cookies' : 'Cookie Preferences';
    
    return (
        <button 
            onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event('openCookieBanner'));
            }}
            className={className}
        >
            {text}
        </button>
    );
}

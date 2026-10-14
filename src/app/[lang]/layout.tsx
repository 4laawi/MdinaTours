import { getAlternates } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';
import { Outfit, Cormorant_Garamond, Inter, Great_Vibes } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import ReactDOM from 'react-dom';
import Script from 'next/script';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

const outfit = Outfit({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

const cormorant = Cormorant_Garamond({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cormorant',
    preload: false,
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const greatVibes = Great_Vibes({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-great-vibes',
    preload: false,
});

import { Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    
    let title = 'Mdina Tours | Premium Morocco Chauffeur & Private Tours';
    let description = 'Mdina Tours provides executive private driver services, intercity airport transfers, and tailor-made Morocco tours across Rabat, Casablanca, Marrakech, and Tangier.';
    let ogLocale = 'en_US';

    if (lang === 'fr') {
        title = 'Mdina Tours | Chauffeur Privé & Circuits d\'Exception au Maroc';
        description = 'Mdina Tours propose des services de chauffeur privé haut de gamme, des navettes aéroport et des circuits sur mesure à Rabat, Casablanca, Marrakech et Tanger.';
        ogLocale = 'fr_FR';
    } else if (lang === 'es') {
        title = 'Mdina Tours | Chófer Privado y Rutas a Medida en Marruecos';
        description = 'Servicios de conductor privado, traslados desde el aeropuerto y rutas personalizadas en Marruecos (Casablanca, Marrakech, Rabat, Tánger y Fez).';
        ogLocale = 'es_ES';
    }

    const url = lang === 'en' ? 'https://mdinatours.com/' : `https://mdinatours.com/${lang}`;

    return {
        title,
        description,
        alternates: getAlternates(lang),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/img/Morocco-trip-tour-hero01.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Mdina Tours Morocco',
                },
            ],
            locale: ogLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/img/Morocco-trip-tour-hero01.webp'],
        },
    };
}

import { Suspense } from 'react';
import CampaignTracker from '@/components/CampaignTracker';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    let agencyDescription = "Mdina Tours provides licensed private drivers, VIP chauffeur services, airport transfers, and bespoke private tours across Morocco.";
    if (lang === 'fr') {
        agencyDescription = "Mdina Tours propose des services de chauffeur privé haut de gamme, des transferts aéroport et des circuits privés sur mesure au Maroc.";
    } else if (lang === 'es') {
        agencyDescription = "Mdina Tours ofrece servicios de chófer privado VIP, traslados de aeropuerto y tours privados a medida en Marruecos con conductores profesionales.";
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Mdina Tours",
        "image": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "logo": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp",
        "description": agencyDescription,
        "url": lang === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${lang}`,
        "telephone": "+212724114775",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rabat",
            "addressRegion": "Rabat-Salé-Kénitra",
            "addressCountry": "MA"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "184",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <html lang={lang} className={`${outfit.variable} ${cormorant.variable} ${inter.variable} ${greatVibes.variable}`}>
            <body>
                <LanguageProvider initialLanguage={lang as Language}>
                    <Suspense fallback={null}>
                        <CampaignTracker />
                    </Suspense>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                    {children}
                    <CookieConsentBanner lang={lang} />
                </LanguageProvider>
                <Script
                    id="ga-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            
                            // Initialize Consent Mode V2
                            if (!localStorage.getItem('cookieConsent')) {
                                gtag('consent', 'default', {
                                    'ad_storage': 'denied',
                                    'analytics_storage': 'denied',
                                    'ad_user_data': 'denied',
                                    'ad_personalization': 'denied',
                                    'wait_for_update': 500
                                });
                            } else {
                                try {
                                    const consent = JSON.parse(localStorage.getItem('cookieConsent'));
                                    gtag('consent', 'default', {
                                        'ad_storage': consent.ads ? 'granted' : 'denied',
                                        'analytics_storage': consent.analytics ? 'granted' : 'denied',
                                        'ad_user_data': consent.ads ? 'granted' : 'denied',
                                        'ad_personalization': consent.ads ? 'granted' : 'denied',
                                    });
                                } catch(e) {
                                    gtag('consent', 'default', {
                                        'ad_storage': 'denied',
                                        'analytics_storage': 'denied',
                                        'ad_user_data': 'denied',
                                        'ad_personalization': 'denied'
                                    });
                                }
                            }

                            gtag('js', new Date());
                            gtag('config', 'G-58G6F3HW5G', {
                                page_path: window.location.pathname,
                            });
                            gtag('config', 'AW-862828202');

                            // Load GTM script on first user interaction or idle to maximize TBT/Core Web Vitals
                            function loadGTM() {
                                if (window.__gtmLoaded) return;
                                window.__gtmLoaded = true;
                                var s = document.createElement('script');
                                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-58G6F3HW5G';
                                s.async = true;
                                document.head.appendChild(s);
                            }
                            var gtmEvents = ['pointerdown', 'touchstart', 'scroll', 'keydown'];
                            function triggerGTM() {
                                loadGTM();
                                gtmEvents.forEach(function(ev) { window.removeEventListener(ev, triggerGTM); });
                            }
                            gtmEvents.forEach(function(ev) { window.addEventListener(ev, triggerGTM, { passive: true, once: true }); });
                            if ('requestIdleCallback' in window) {
                                requestIdleCallback(function() { setTimeout(loadGTM, 3500); });
                            } else {
                                setTimeout(loadGTM, 3500);
                            }
                        `,
                    }}
                />
            </body>
        </html>
    );
}

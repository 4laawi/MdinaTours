// Campaign and lead tracking for Google Ads and Analytics

export function initCampaignTracking(): void {
    if (typeof window === 'undefined') return;
    try {
        const params = new URLSearchParams(window.location.search);
        const keys = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        keys.forEach(key => {
            const val = params.get(key);
            if (val) {
                sessionStorage.setItem(`mdina_${key}`, val);
                try { localStorage.setItem(`mdina_${key}`, val); } catch {}
            }
        });
    } catch {
        // Safe fallback for environments with restricted storage
    }
}

export function trackLeadConversion(source: string, details?: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;

    try {
        const gclid = sessionStorage.getItem('mdina_gclid') || localStorage.getItem('mdina_gclid') || '';
        const utmCampaign = sessionStorage.getItem('mdina_utm_campaign') || localStorage.getItem('mdina_utm_campaign') || '';
        const utmSource = sessionStorage.getItem('mdina_utm_source') || localStorage.getItem('mdina_utm_source') || '';

        // 1. Google Tag Manager dataLayer event
        const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
        if (Array.isArray(dataLayer)) {
            dataLayer.push({
                event: 'whatsapp_lead',
                lead_source: source,
                gclid,
                utm_source: utmSource,
                utm_campaign: utmCampaign,
                ...details
            });
        }

        // 2. Google Analytics 4 / Google Ads gtag event
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                send_to: 'AW-862828202/iVgWCJ3Ct5UdEKrttpsD',
                event_category: 'engagement',
                event_label: source,
                value: details?.price || 0,
                currency: 'EUR',
                transport: 'beacon',
                gclid,
                ...details
            });
        }
    } catch {
        // Fail silently so user flow is never disrupted
    }
}

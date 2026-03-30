"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SEOMetadata() {
    const { language, t } = useLanguage();

    useEffect(() => {
        // Update document title and language attribute
        document.title = t('seo_title') || 'ZahriTours – Best Morocco Tours & Trips';
        document.documentElement.lang = language;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', t('seo_desc') || 'ZahriTours is a top Morocco travel agency offering desert tours, city trips, and tailor-made adventures.');
        }
    }, [language, t]);

    return null;
}

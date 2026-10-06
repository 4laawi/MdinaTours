export const APPROVED_ES_PATHS = new Set([
    '',
    '/',
    '/private-driver-morocco',
    '/airport-transfers',
    '/transfers',
    '/tours',
    // Phase 1 Transfers
    '/transfers/casablanca-airport-transfer',
    '/transfers/marrakech-airport-transfer',
    '/transfers/rabat-airport-transfer',
    '/transfers/rabat-to-casablanca-transfer',
    '/transfers/casablanca-to-marrakech-transfer',
    // Phase 2 Transfers
    '/transfers/tangier-port-transfer',
    '/transfers/tangier-to-chefchaouen-transfer',
    '/transfers/tangier-airport-transfer',
    '/transfers/marrakech-to-essaouira-transfer',
    '/transfers/fes-to-chefchaouen-transfer',
    '/transfers/fes-airport-transfer',
    // Phase 1 Tours
    '/tours/chefchaouen-day-trip',
    // Phase 2 Tours
    '/tours/marrakech-day-trip',
    '/tours/atlas-mountains-tour',
    '/tours/agafay-desert-experience',
    '/tours/merzouga-desert-tour',
    // Static Pages
    '/contact',
    '/faq',
    '/about',
    '/car-with-driver-morocco-8-days',
]);

export const APPROVED_PHASE1_ES_PATHS = APPROVED_ES_PATHS;

export function isSpanishSupported(pathWithoutLang: string = ''): boolean {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    return APPROVED_ES_PATHS.has(cleanPath);
}

export function getAlternates(lang: string, pathWithoutLang: string = '') {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    const baseUrl = 'https://mdinatours.com';
    const isHome = cleanPath === '' || cleanPath === '/';

    const languages: Record<string, string> = {
        'en': isHome ? `${baseUrl}/` : `${baseUrl}/en${cleanPath}`,
        'fr': isHome ? `${baseUrl}/fr` : `${baseUrl}/fr${cleanPath}`,
        'x-default': isHome ? `${baseUrl}/` : `${baseUrl}/en${cleanPath}`,
    };

    if (isSpanishSupported(cleanPath)) {
        languages['es'] = isHome ? `${baseUrl}/es` : `${baseUrl}/es${cleanPath}`;
    }

    const canonical = isHome
        ? (lang === 'en' ? `${baseUrl}/` : `${baseUrl}/${lang}`)
        : `${baseUrl}/${lang}${cleanPath}`;

    return {
        canonical,
        languages,
    };
}

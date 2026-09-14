export const APPROVED_PHASE1_ES_PATHS = new Set([
    '',
    '/',
    '/private-driver-morocco',
    '/airport-transfers',
    '/transfers/casablanca-airport-transfer',
    '/transfers/marrakech-airport-transfer',
    '/transfers/rabat-airport-transfer',
    '/transfers/rabat-to-casablanca-transfer',
    '/transfers/casablanca-to-marrakech-transfer',
    '/tours/chefchaouen-day-trip',
    '/contact',
    '/faq',
    '/about',
]);

export function isSpanishSupported(pathWithoutLang: string = ''): boolean {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    return APPROVED_PHASE1_ES_PATHS.has(cleanPath);
}

export function getAlternates(lang: string, pathWithoutLang: string = '') {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    const baseUrl = 'https://mdinatours.com';

    const languages: Record<string, string> = {
        'en': `${baseUrl}/en${cleanPath}`,
        'fr': `${baseUrl}/fr${cleanPath}`,
        'x-default': `${baseUrl}/en${cleanPath}`,
    };

    if (isSpanishSupported(cleanPath)) {
        languages['es'] = `${baseUrl}/es${cleanPath}`;
    }

    return {
        canonical: `${baseUrl}/${lang}${cleanPath}`,
        languages,
    };
}

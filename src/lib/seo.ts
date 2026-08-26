export function getAlternates(lang: string, pathWithoutLang: string = '') {
    const cleanPath = pathWithoutLang 
        ? (pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`) 
        : '';
    const baseUrl = 'https://mdinatours.com';

    return {
        canonical: `${baseUrl}/${lang}${cleanPath}`,
        languages: {
            'en': `${baseUrl}/en${cleanPath}`,
            'fr': `${baseUrl}/fr${cleanPath}`,
            'x-default': `${baseUrl}/en${cleanPath}`,
        },
    };
}

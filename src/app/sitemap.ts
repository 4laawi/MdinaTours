import { MetadataRoute } from 'next';
import { transfersData } from '@/lib/transfersData';
import { programmaticSlugs } from '@/lib/programmaticSeo';
import { toursData } from '@/lib/toursData';
import { isSpanishSupported } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mdinatours.com';

    const staticRoutes = [
        '',
        '/contact',
        '/blog',
        '/partners',
        '/about',
        '/tours',
        '/transfers',
        '/private-driver',
        '/private-driver-marrakech',
        '/private-driver-casablanca',
        '/private-driver-fes',
        '/private-driver-tangier',
        '/private-driver-agadir',
        '/private-driver-rabat',
        '/private-driver-sale',
        '/private-driver-chefchaouen',
        '/private-driver-morocco',
        '/chauffeur-dispo-morocco',
        '/car-with-driver-morocco-8-days',
        '/airport-transfers',
        '/faq'
    ];

    const blogSlugs = [
        'rabat-travel-guide',
        'sahara-desert-tour-plan',
        'moroccan-architecture-guide',
        'moroccan-food-traditions',
        'chefchaouen-blue-pearl-tips',
        'private-driver-morocco-guide'
    ];

    // Combine static and programmatic blog slugs
    const allBlogSlugs = Array.from(new Set([...blogSlugs, ...programmaticSlugs]));

    // Dynamic transfer slugs from transfersData
    const allTransferSlugs = transfersData.map(t => t.slug);

    // Dynamic tour slugs from toursData
    const allTourSlugs = toursData.map(t => t.slug);

    const routesMap: MetadataRoute.Sitemap = [];

    const getLanguagesMap = (path: string) => {
        const languages: Record<string, string> = {
            en: `${baseUrl}/en${path}`,
            fr: `${baseUrl}/fr${path}`,
            'x-default': `${baseUrl}/en${path}`,
        };
        if (isSpanishSupported(path)) {
            languages.es = `${baseUrl}/es${path}`;
        }
        return languages;
    };

    const addRoute = (
        routePath: string,
        changeFrequency: 'weekly' | 'monthly',
        priority: number
    ) => {
        const isEsSupported = isSpanishSupported(routePath);
        const supportedLocales = isEsSupported ? ['en', 'fr', 'es'] : ['en', 'fr'];
        const languages = getLanguagesMap(routePath);

        supportedLocales.forEach((locale) => {
            routesMap.push({
                url: `${baseUrl}/${locale}${routePath}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
                alternates: { languages }
            });
        });
    };

    // Add static routes
    staticRoutes.forEach((route) => {
        addRoute(route, route === '/blog' ? 'weekly' : 'monthly', route === '' ? 1 : 0.8);
    });

    // Add blog posts
    allBlogSlugs.forEach((slug) => {
        addRoute(`/blog/${slug}`, 'weekly', 0.8);
    });

    // Add tours
    allTourSlugs.forEach((slug) => {
        addRoute(`/tours/${slug}`, 'weekly', 0.7);
    });

    // Add transfers
    allTransferSlugs.forEach((slug) => {
        addRoute(`/transfers/${slug}`, 'weekly', 0.7);
    });

    return routesMap;
}

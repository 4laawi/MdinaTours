import { MetadataRoute } from 'next';
import { transfersData } from '@/lib/transfersData';
import { programmaticSlugs } from '@/lib/programmaticSeo';
import { toursData } from '@/lib/toursData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mdinatours.com';
    const locales = ['en', 'fr'];

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

    locales.forEach((locale) => {
        // Add static routes
        staticRoutes.forEach((route) => {
            routesMap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${route}`,
                        fr: `${baseUrl}/fr${route}`,
                    }
                }
            });
        });

        // Add blog posts
        allBlogSlugs.forEach((slug) => {
            routesMap.push({
                url: `${baseUrl}/${locale}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/blog/${slug}`,
                        fr: `${baseUrl}/fr/blog/${slug}`,
                    }
                }
            });
        });

        // Add tours
        allTourSlugs.forEach((slug) => {
            routesMap.push({
                url: `${baseUrl}/${locale}/tours/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/tours/${slug}`,
                        fr: `${baseUrl}/fr/tours/${slug}`,
                    }
                }
            });
        });

        // Add transfers
        allTransferSlugs.forEach((slug) => {
            routesMap.push({
                url: `${baseUrl}/${locale}/transfers/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en/transfers/${slug}`,
                        fr: `${baseUrl}/fr/transfers/${slug}`,
                    }
                }
            });
        });
    });

    return routesMap;
}

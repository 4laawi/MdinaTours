import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zahritours.com';
    const locales = ['en', 'fr'];

    const staticRoutes = ['', '/contact', '/blog'];

    const blogSlugs = [
        'tangier-city-stories',
        'sahara-desert-magic',
        'marrakech-architecture-guide',
        'moroccan-cuisine-soul',
        'chefchaouen-blue-pearl',
        'private-driver-morocco'
    ];

    const routesMap: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        // Add static routes
        staticRoutes.forEach((route) => {
            routesMap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
                priority: route === '' ? 1 : 0.8,
            });
        });

        // Add blog posts
        blogSlugs.forEach((slug) => {
            routesMap.push({
                url: `${baseUrl}/${locale}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        });
    });

    return routesMap;
}

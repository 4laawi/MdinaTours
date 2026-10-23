import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: [
                    'Googlebot',
                    'Bingbot',
                    'GPTBot',
                    'ChatGPT-User',
                    'PerplexityBot',
                    'ClaudeBot',
                    'anthropic-ai',
                    'Google-Extended',
                ],
                allow: '/',
                disallow: '/api/',
            },
        ],
        sitemap: 'https://mdinatours.com/sitemap.xml',
    };
}

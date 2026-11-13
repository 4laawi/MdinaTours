import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const host = request.headers.get('host') || '';

    // Handle www to non-www redirect directly with 1 hop
    if (host.startsWith('www.mdinatours.com')) {
        const canonicalUrl = new URL(request.url);
        canonicalUrl.host = 'mdinatours.com';
        canonicalUrl.port = '';
        canonicalUrl.protocol = 'https:';

        if (pathname === '/en' || pathname === '/en/' || pathname === '/') {
            canonicalUrl.pathname = '/';
            return NextResponse.redirect(canonicalUrl, 308);
        }

        // Consolidate transfer URLs in www redirect to avoid multi-hop
        const transferMatch = pathname.match(/^\/(?:(en|fr|es)\/)?transfers\/([a-zA-Z0-9_-]+)$/);
        if (transferMatch) {
            const langPrefix = transferMatch[1] || defaultLocale;
            const slug = transferMatch[2];
            const targetSlug = slug.endsWith('-transfer') ? slug : `${slug}-transfer`;
            canonicalUrl.pathname = `/${langPrefix}/transfers/${targetSlug}`;
            return NextResponse.redirect(canonicalUrl, 301);
        }

        const missingLocale = locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
        );
        if (missingLocale) {
            canonicalUrl.pathname = `/${defaultLocale}${pathname}`;
            return NextResponse.redirect(canonicalUrl, 308);
        }

        return NextResponse.redirect(canonicalUrl, 308);
    }

    // Old English homepage /en or /en/ -> permanently redirect directly to /
    if (pathname === '/en' || pathname === '/en/') {
        return NextResponse.redirect(new URL('/', request.url), 308);
    }

    // Consolidate duplicate /private-driver directly to /en/private-driver-morocco
    if (pathname === '/private-driver' || pathname === '/private-driver/') {
        return NextResponse.redirect(new URL('/en/private-driver-morocco', request.url), 308);
    }

    // 301 permanent redirect for transfer URLs missing -transfer suffix (Google Search Console duplicate consolidation)
    const transferMatch = pathname.match(/^\/(?:(en|fr|es)\/)?transfers\/([a-zA-Z0-9_-]+)$/);
    if (transferMatch) {
        const langPrefix = transferMatch[1] || defaultLocale;
        const slug = transferMatch[2];
        if (!slug.endsWith('-transfer')) {
            return NextResponse.redirect(
                new URL(`/${langPrefix}/transfers/${slug}-transfer`, request.url),
                301
            );
        }
    }

    // Root homepage / -> directly render English homepage via internal rewrite
    if (pathname === '/') {
        return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
    }

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url),
            308
        );
    }
}

export const config = {
    // Skip all internal paths (_next, api, static files, etc.)
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.avif$|.*\\.svg$|.*\\.gif$|.*\\.ico$|.*\\.lottie$|.*\\.json$|.*\\.mp4$|.*\\.webm$).*)'],
};

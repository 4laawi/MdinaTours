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
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.lottie$|.*\\.json$|.*\\.mp4$).*)'],
};

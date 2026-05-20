import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // Here you can also detect the browser's language preference
        // and redirect to the corresponding locale instead of always 'en'
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url)
        );
    }
}

export const config = {
    // Skip all internal paths (_next, api, static files, etc.)
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)'],
};

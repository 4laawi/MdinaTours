import { transfersData } from '../src/lib/transfersData';
import { toursData } from '../src/lib/toursData';
import { programmaticSlugs } from '../src/lib/programmaticSeo';

const BASE_URL = 'http://localhost:3000';

async function fetchHtml(url: string): Promise<string | null> {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Page returned ${res.status}: ${url}`);
            return null;
        }
        return await res.text();
    } catch (e) {
        console.error(`Error fetching page ${url}:`, e);
        return null;
    }
}

async function checkImage(imgUrl: string): Promise<number> {
    try {
        const fullUrl = imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}${imgUrl}`;
        const res = await fetch(fullUrl, { method: 'HEAD' });
        return res.status;
    } catch (e) {
        return 0;
    }
}

async function main() {
    console.log('Building route list to check...');

    const pagesToCheck: string[] = [
        '/',
        '/en',
        '/fr',
        '/es',
        '/en/airport-transfers',
        '/fr/airport-transfers',
        '/en/transfers',
        '/fr/transfers',
        '/en/tours',
        '/fr/tours',
        '/en/blog',
        '/fr/blog',
        '/en/about',
        '/en/contact',
        '/en/partners',
        '/en/faq',
        '/en/private-driver',
        '/en/private-driver-morocco',
        '/en/private-driver-casablanca',
        '/en/private-driver-marrakech',
        '/en/private-driver-rabat',
        '/en/private-driver-tangier',
        '/en/private-driver-fes',
        '/en/private-driver-agadir',
        '/en/private-driver-chefchaouen',
        '/en/private-driver-sale',
        '/en/chauffeur-dispo-morocco',
        '/en/car-with-driver-morocco-8-days'
    ];

    // Add transfer routes
    for (const t of transfersData.slice(0, 10)) {
        pagesToCheck.push(`/en/transfers/${t.slug}`);
    }

    // Add tours routes
    for (const t of toursData.slice(0, 10)) {
        pagesToCheck.push(`/en/tours/${t.slug}`);
    }

    // Add sample blog routes
    for (const s of programmaticSlugs.slice(0, 10)) {
        pagesToCheck.push(`/en/blog/${s}`);
    }
    pagesToCheck.push('/en/blog/rabat-travel-guide');
    pagesToCheck.push('/en/blog/sahara-desert-tour-plan');

    console.log(`Checking ${pagesToCheck.length} key pages across the site...`);

    const imageCache = new Map<string, number>();
    const brokenImagesFound: { page: string; image: string; status: number }[] = [];

    for (const pagePath of pagesToCheck) {
        process.stdout.write(`Scanning ${pagePath}... `);
        const html = await fetchHtml(`${BASE_URL}${pagePath}`);
        if (!html) continue;

        // Extract all img src
        const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
        const foundImages = new Set<string>();

        let match;
        while ((match = imgSrcRegex.exec(html)) !== null) {
            let src = match[1];
            // Decode Next.js image optimizer URLs: /_next/image?url=%2F...
            if (src.startsWith('/_next/image')) {
                const urlParam = new URL(src, BASE_URL).searchParams.get('url');
                if (urlParam) {
                    src = urlParam;
                }
            }
            if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
                foundImages.add(src);
            }
        }

        // Also check videos poster
        const posterRegex = /poster=["']([^"']+)["']/gi;
        while ((match = posterRegex.exec(html)) !== null) {
            let src = match[1];
            if (src && !src.startsWith('data:')) {
                foundImages.add(src);
            }
        }

        let brokenOnPage = 0;
        for (const img of foundImages) {
            let status = imageCache.get(img);
            if (status === undefined) {
                status = await checkImage(img);
                imageCache.set(img, status);
            }

            if (status === 404 || status === 500 || status === 0) {
                brokenImagesFound.push({ page: pagePath, image: img, status });
                brokenOnPage++;
            }
        }

        console.log(`checked ${foundImages.size} images (${brokenOnPage} broken)`);
    }

    console.log('\n========================================');
    console.log('CRAWL SUMMARY');
    console.log(`Unique images checked: ${imageCache.size}`);
    console.log(`Broken/missing image instances: ${brokenImagesFound.length}`);
    console.log('========================================\n');

    if (brokenImagesFound.length > 0) {
        console.table(brokenImagesFound);
    } else {
        console.log('✅ All tested pages have 100% valid images!');
    }
}

main().catch(console.error);

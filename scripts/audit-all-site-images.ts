import fs from 'fs';
import path from 'path';

// Load app data
import { programmaticSlugs, getProgrammaticPost } from '../src/lib/programmaticSeo';
import { toursData } from '../src/lib/toursData';
import { transfersData } from '../src/lib/transfersData';

const publicDir = path.join(process.cwd(), 'public');

interface MissingReport {
    category: string;
    item: string;
    imagePath: string;
    details?: string;
}

const missingReports: MissingReport[] = [];

function checkFileExists(imgSrc: string | null | undefined, category: string, item: string, details?: string) {
    if (!imgSrc) {
        missingReports.push({ category, item, imagePath: String(imgSrc), details: 'Image path is empty or undefined' });
        return;
    }

    // Skip external URLs
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
        return;
    }

    // Clean query string or hash
    const cleanPath = imgSrc.split('?')[0].split('#')[0];
    const decodedPath = decodeURIComponent(cleanPath);

    const fullPathRaw = path.join(publicDir, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);
    const fullPathDecoded = path.join(publicDir, decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath);

    if (!fs.existsSync(fullPathRaw) && !fs.existsSync(fullPathDecoded)) {
        missingReports.push({ category, item, imagePath: imgSrc, details });
    }
}

console.log('=== 1. Checking Programmatic SEO Posts ===');
for (const lang of ['en', 'fr'] as const) {
    for (const slug of programmaticSlugs) {
        const post = getProgrammaticPost(slug, lang);
        if (!post) {
            console.warn(`Post not found for slug: ${slug} (${lang})`);
            continue;
        }

        checkFileExists(post.image, 'Programmatic Post Hero', `${slug} (${lang})`);

        if (post.sections) {
            for (const section of post.sections) {
                if (section.content) {
                    const imgMatches = section.content.match(/src=["']([^"']+)["']/g) || [];
                    for (const m of imgMatches) {
                        const src = m.replace(/src=["']/, '').replace(/["']$/, '');
                        checkFileExists(src, 'Programmatic Post Section Content', `${slug} (${lang}) -> section ${section.id}`);
                    }
                }
            }
        }
    }
}

console.log('=== 2. Checking Tours Data ===');
for (const tour of toursData) {
    checkFileExists(tour.image, 'Tour Main Image', tour.slug);
    if ((tour as any).gallery && Array.isArray((tour as any).gallery)) {
        for (const gImg of (tour as any).gallery) {
            checkFileExists(gImg, 'Tour Gallery Image', tour.slug);
        }
    }
}

console.log('=== 3. Checking Transfers Data (Intercity) ===');
for (const transfer of transfersData) {
    checkFileExists(transfer.image, 'Intercity Transfer Image', transfer.slug);
    for (const lang of ['en', 'fr', 'es'] as const) {
        const local = (transfer as any)[lang];
        if (local && local.sightseeingStops) {
            for (const stop of local.sightseeingStops) {
                checkFileExists(stop.image, `Sightseeing Stop (${lang})`, `${transfer.slug} -> ${stop.name}`);
            }
        }
    }
}

console.log('=== 4. Checking Airport Transfers Data & Fleet ===');
import { FLEET_VEHICLES, POPULAR_ROUTES } from '../src/lib/airportTransfersData';
for (const vehicle of FLEET_VEHICLES) {
    checkFileExists(vehicle.image, 'Fleet Vehicle Image', vehicle.name);
}

console.log('=== 5. Checking TransferBookingFlow Gallery Logic for ALL routes ===');
// Test the getGalleryImages function against ALL transfers
// We can extract getGalleryImages logic or test every slug
const allSlugsAndImages = [
    ...transfersData.map(t => ({ slug: t.slug, image: t.image })),
    ...POPULAR_ROUTES.map(r => ({ slug: r.slug, image: '/img2/Airport_Casablanca_Mohammed.webp' }))
];

const transferFlowContent = fs.readFileSync(path.join(process.cwd(), 'src/components/TransferBookingFlow.tsx'), 'utf8');
const tbfMatches = transferFlowContent.match(/['"`](\/(?:img|img2|img3|a-mdiinatours|b-roll|cars|FIGURES)[^'"`]+)['"`]/g) || [];
for (const m of tbfMatches) {
    const p = m.slice(1, -1);
    checkFileExists(p, 'TransferBookingFlow Hardcoded Image', 'TransferBookingFlow.tsx');
}

console.log('=== 6. Checking All Source Files for Image Tags & Next/Image ===');
function walkDir(dir: string): string[] {
    let files: string[] = [];
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            files = files.concat(walkDir(full));
        } else if (/\.(tsx|ts|jsx|js|css)$/.test(f)) {
            files.push(full);
        }
    }
    return files;
}

const allSrc = walkDir(path.join(process.cwd(), 'src'));
for (const file of allSrc) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(process.cwd(), file);
    
    // Look for src="..." or src='...' or src={"..."}
    const srcRegex = /src\s*=\s*(?:["']([^"']+)["']|\{\s*["']([^"']+)["']\s*\})/g;
    let match;
    while ((match = srcRegex.exec(content)) !== null) {
        const srcVal = match[1] || match[2];
        if (srcVal && srcVal.startsWith('/') && !srcVal.includes('${')) {
            // Check if it's an image extension or in an image directory
            if (/\.(webp|jpg|jpeg|png|svg|avif|gif)$/i.test(srcVal) || /^\/(img|img2|img3|a-mdiinatours|b-roll|cars|FIGURES)/.test(srcVal)) {
                checkFileExists(srcVal, 'Source Component src attribute', rel);
            }
        }
    }

    // Look for CSS url(...)
    const urlRegex = /url\(\s*["']?(\/[^"')]+)["']?\s*\)/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(content)) !== null) {
        const urlVal = urlMatch[1];
        if (urlVal && urlVal.startsWith('/') && !urlVal.includes('${')) {
            checkFileExists(urlVal, 'CSS background url()', rel);
        }
    }
}

console.log('\n========================================');
console.log('AUDIT SUMMARY:');
console.log(`Total missing image instances found: ${missingReports.length}`);
console.log('========================================\n');

if (missingReports.length > 0) {
    console.table(missingReports);
} else {
    console.log('✅ ALL checked images across the website exist on disk!');
}

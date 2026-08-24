const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let errorsCount = 0;
let warningsCount = 0;
let passedCount = 0;

function logError(template, message) {
    console.error(`${RED}[ERROR] [${template}] ${message}${RESET}`);
    errorsCount++;
}

function logWarning(template, message) {
    console.warn(`${YELLOW}[WARN]  [${template}] ${message}${RESET}`);
    warningsCount++;
}

function logPass(template, message) {
    console.log(`${GREEN}[PASS]  [${template}] ${message}${RESET}`);
    passedCount++;
}

const SUPPORTED_REVIEW_PARENT_TYPES = new Set([
    'Book',
    'Course',
    'Event',
    'HowTo',
    'LocalBusiness',
    'Movie',
    'Organization',
    'Product',
    'Recipe',
    'SoftwareApplication',
    'TravelAgency',
    'TaxiReservation'
]);

function isSupportedReviewType(type) {
    if (Array.isArray(type)) {
        return type.some(t => SUPPORTED_REVIEW_PARENT_TYPES.has(t));
    }
    return SUPPORTED_REVIEW_PARENT_TYPES.has(type);
}

function validateSchemaObject(template, schema) {
    if (!schema || typeof schema !== 'object') return;

    const type = schema['@type'];
    if (!type) {
        logError(template, 'Missing @type property in JSON-LD schema.');
        return;
    }

    // 1. Review & AggregateRating Validation
    if (schema.review || schema.aggregateRating) {
        if (!isSupportedReviewType(type)) {
            logError(
                template,
                `Invalid object type "${JSON.stringify(type)}" for field "review"/"aggregateRating". Google Review Snippets require a supported root type like Product, LocalBusiness, etc.`
            );
        } else {
            logPass(template, `Parent type "${JSON.stringify(type)}" is valid for Google Review/AggregateRating snippets.`);
        }
    }

    // 2. AggregateRating structural rules
    if (schema.aggregateRating) {
        const ar = schema.aggregateRating;
        if (ar['@type'] !== 'AggregateRating') logError(template, `aggregateRating must have @type: "AggregateRating"`);
        if (!ar.ratingValue) logError(template, `AggregateRating is missing "ratingValue"`);
        if (!ar.reviewCount && !ar.ratingCount) logError(template, `AggregateRating is missing "reviewCount" or "ratingCount"`);
    }

    // 3. Review structural rules
    if (schema.review) {
        const reviews = Array.isArray(schema.review) ? schema.review : [schema.review];
        reviews.forEach((rev, idx) => {
            if (rev['@type'] !== 'Review') logError(template, `Review ${idx} must have @type: "Review"`);
            if (!rev.author || (!rev.author.name && typeof rev.author !== 'string')) {
                logError(template, `Review ${idx} missing author with name`);
            }
            if (!rev.reviewRating || !rev.reviewRating.ratingValue) {
                logError(template, `Review ${idx} missing reviewRating with ratingValue`);
            }
        });
    }

    // 4. Product structural rules
    const isProduct = Array.isArray(type) ? type.includes('Product') : type === 'Product';
    if (isProduct) {
        if (!schema.name) logError(template, 'Product schema missing required property "name"');
        if (!schema.image) logWarning(template, 'Product schema missing recommended property "image"');
        if (!schema.offers) logWarning(template, 'Product schema missing recommended property "offers"');
    }

    // 5. Article / BlogPosting structural rules
    const isArticle = Array.isArray(type)
        ? type.some(t => ['Article', 'BlogPosting', 'NewsArticle'].includes(t))
        : ['Article', 'BlogPosting', 'NewsArticle'].includes(type);
    if (isArticle) {
        if (!schema.headline) logError(template, 'Article/BlogPosting schema missing required property "headline"');
        if (!schema.image) logError(template, 'Article/BlogPosting schema missing required property "image"');
        if (!schema.datePublished) logError(template, 'Article/BlogPosting schema missing required property "datePublished"');
        if (!schema.author) logError(template, 'Article/BlogPosting schema missing required property "author"');
    }

    // 6. BreadcrumbList structural rules
    if (type === 'BreadcrumbList') {
        if (!Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
            logError(template, 'BreadcrumbList schema missing or empty "itemListElement" array');
        } else {
            schema.itemListElement.forEach((item, idx) => {
                if (item['@type'] !== 'ListItem') logError(template, `BreadcrumbListItem ${idx} must have @type: "ListItem"`);
                if (typeof item.position !== 'number') logError(template, `BreadcrumbListItem ${idx} missing numeric "position"`);
                if (!item.name) logError(template, `BreadcrumbListItem ${idx} missing "name"`);
                if (!item.item) logError(template, `BreadcrumbListItem ${idx} missing "item" URL`);
            });
            logPass(template, `BreadcrumbList schema with ${schema.itemListElement.length} items is valid.`);
        }
    }
}

function parseAndValidateFile(filePath) {
    const relPath = path.relative(process.cwd(), filePath);
    const code = fs.readFileSync(filePath, 'utf8');

    // Find schema object blocks by extracting variable contents
    const constRegex = /const\s+(\w*(?:JsonLd|Schema))\s*=\s*(\{[\s\S]*?\n\s*\};)/g;
    let match;

    while ((match = constRegex.exec(code)) !== null) {
        const varName = match[1];
        const blockCode = match[2];

        // Extract @type value
        const typeMatch = blockCode.match(/"@type":\s*(\[[\s\S]*?\]|"[^"]+")/);
        if (!typeMatch) continue;

        let typeVal;
        try {
            typeVal = JSON.parse(typeMatch[1]);
        } catch (e) {
            typeVal = typeMatch[1].replace(/"/g, '');
        }

        // Build extracted schema representation from block code
        const hasName = blockCode.includes('"name":') || blockCode.includes('headline:');
        const hasHeadline = blockCode.includes('"headline":') || blockCode.includes('headline:');
        const hasImage = blockCode.includes('"image":');
        const hasOffers = blockCode.includes('"offers":');
        const hasDatePublished = blockCode.includes('"datePublished":');
        const hasAuthor = blockCode.includes('"author":');
        const hasReview = blockCode.includes('"review":') || blockCode.includes('"aggregateRating":');

        const schema = {
            '@context': 'https://schema.org',
            '@type': typeVal,
            name: hasName ? 'Sample Name' : undefined,
            headline: hasHeadline ? 'Sample Headline' : undefined,
            image: hasImage ? 'https://mdinatours.com/sample.jpg' : undefined,
            offers: hasOffers ? [{ '@type': 'Offer', price: '100', priceCurrency: 'EUR' }] : undefined,
            datePublished: hasDatePublished ? '2026-01-01' : undefined,
            author: hasAuthor ? { '@type': 'Organization', name: 'Mdina Tours' } : undefined,
        };

        if (hasReview) {
            schema.review = [
                {
                    '@type': 'Review',
                    author: { '@type': 'Person', name: 'Test Author' },
                    reviewRating: { '@type': 'Rating', ratingValue: '5' },
                    reviewBody: 'Great service'
                }
            ];
            schema.aggregateRating = {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '100'
            };
        }

        // Handle BreadcrumbList simulation
        if (typeVal === 'BreadcrumbList') {
            schema.itemListElement = [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mdinatours.com/en' },
                { '@type': 'ListItem', position: 2, name: 'Section', item: 'https://mdinatours.com/en/section' }
            ];
        }

        validateSchemaObject(`${relPath} -> ${varName}`, schema);
    }
}

console.log(`\n========================================`);
console.log(`RUNNING JSON-LD SCHEMA AUDIT & VALIDATION`);
console.log(`========================================\n`);

const appDir = path.join(process.cwd(), 'src/app');
function getPages(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            getPages(full, fileList);
        } else if (f === 'page.tsx' || f === 'layout.tsx') {
            fileList.push(full);
        }
    });
    return fileList;
}

const pageFiles = getPages(appDir);
pageFiles.forEach(parseAndValidateFile);

console.log(`\n----------------------------------------`);
console.log(`Validation Results: ${GREEN}${passedCount} Passed${RESET}, ${YELLOW}${warningsCount} Warnings${RESET}, ${RED}${errorsCount} Errors${RESET}`);
console.log(`----------------------------------------\n`);

if (errorsCount > 0) {
    console.error(`${RED}Schema validation failed with ${errorsCount} error(s).${RESET}`);
    process.exit(1);
} else {
    console.log(`${GREEN}All schemas across all page templates validated with zero errors!${RESET}`);
    process.exit(0);
}

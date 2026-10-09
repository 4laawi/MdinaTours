import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import BlogRouteHighlightCard from '@/components/BlogRouteHighlightCard';
import styles from './BlogPost.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';
import { notFound } from 'next/navigation';
import { transfersData } from '@/lib/transfersData';
import { getProgrammaticPost, programmaticSlugs, getRouteInfo, getAirportInfo } from '@/lib/programmaticSeo';

export async function generateStaticParams() {
    const paths: { lang: string; slug: string }[] = [];
    const locales = ['en', 'fr'];
    const standardSlugs = [
        'rabat-travel-guide',
        'sahara-desert-tour-plan',
        'moroccan-architecture-guide',
        'moroccan-food-traditions',
        'chefchaouen-blue-pearl-tips',
        'private-driver-morocco-guide'
    ];
    locales.forEach(lang => {
        standardSlugs.forEach(slug => {
            paths.push({ lang, slug });
        });
        programmaticSlugs.forEach(slug => {
            paths.push({ lang, slug });
        });
    });
    return paths;
}

const standardPostSections = {
    1: { // rabat-travel-guide
        en: [
            { title: "Rabat: The Imperial Capital", id: "introduction" },
            { title: "Hassan Tower & Mausoleum of Mohammed V", id: "hassan-tower" },
            { title: "Chellah: Storks and Roman Ruins", id: "chellah" }
        ],
        fr: [
            { title: "Rabat : La Capitale Impériale", id: "introduction" },
            { title: "La Tour Hassan & Le Mausolée Mohammed V", id: "tour-hassan" },
            { title: "Le Chellah : Cigognes et Ruines Romaines", id: "chellah" }
        ]
    },
    2: { // sahara-desert-tour-plan
        en: [
            { title: "Erg Chebbi Dunes in Merzouga", id: "erg-chebbi" },
            { title: "Kasbah Ait Benhaddou & Todra Gorge", id: "kasbah-ait-benhaddou" },
            { title: "A Night under Sahara Stars", id: "night-sahara" }
        ],
        fr: [
            { title: "Les Dunes de l'Erg Chebbi à Merzouga", id: "erg-chebbi" },
            { title: "La Kasbah d'Aït Benhaddou & Les Gorges du Todra", id: "kasbah" },
            { title: "Une Nuit sous les Étoiles du Sahara", id: "nuit-sahara" }
        ]
    },
    3: { // moroccan-architecture-guide
        en: [
            { title: "The Inward Beauty of Moroccan Riads", id: "riads" },
            { title: "Zellige Tiles and Hand-Carved Plaster", id: "zellige-tiles" },
            { title: "Famous Architectural Masterpieces", id: "architecture-monuments" }
        ],
        fr: [
            { title: "La Beauté Intérieure des Riads Marocains", id: "riads" },
            { title: "Le Zellige et le Plâtre Sculpté à la Main", id: "zellige" },
            { title: "Chef-d'œuvres Architecturaux à Visiter", id: "chefs-d-oeuvre" }
        ]
    },
    4: { // moroccan-food-traditions
        en: [
            { title: "The Art of Slow-Cooked Tagines", id: "tagines" },
            { title: "Friday Couscous and Pastilla", id: "couscous-pastilla" },
            { title: "The Moroccan Mint Tea Ritual", id: "mint-tea" }
        ],
        fr: [
            { title: "L'Art du Tajine Mijoté", id: "tajines" },
            { title: "Le Couscous du Vendredi et la Pastilla", id: "couscous" },
            { title: "Le Rituel du Thé à la Menthe Marocain", id: "the-menthe" }
        ]
    },
    5: { // chefchaouen-blue-pearl-tips
        en: [
            { title: "Walking the Painted Alleys of Chefchaouen", id: "blue-alleys" },
            { title: "The Kasbah and Sunset at the Spanish Mosque", id: "sunset-mosque" },
            { title: "Planning Your Trip to the Blue Pearl", id: "trip-planning" }
        ],
        fr: [
            { title: "Flânerie dans les Ruelles Bleues de Chefchaouen", id: "ruelles-bleues" },
            { title: "La Kasbah et le Coucher de Soleil à la Mosquée Espagnole", id: "coucher-soleil" },
            { title: "Planifier votre Voyage vers la Perle Bleue", id: "planifier" }
        ]
    },
    6: { // private-driver-morocco-guide
        en: [
            { title: "Why Traveling by Road is Best in Morocco", id: "road-travel" },
            { title: "The Comfort and Peace of a Private Driver", id: "driver-comfort" },
            { title: "Discovering Morocco's Best Kept Secrets", id: "hidden-gems" }
        ],
        fr: [
            { title: "Pourquoi le Voyage par la Route est Idéal au Maroc", id: "route-maroc" },
            { title: "Le Confort et la Sérénité d'un Chauffeur Privé", id: "confort-chauffeur" },
            { title: "Découvrir les Secrets les Mieux Gardés du Maroc", id: "secrets-maroc" }
        ]
    }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    if (lang === 'es') {
        return { title: 'Not Found - Mdina Tours' };
    }
    const language = (lang as Language) || 'en';
    
    // Check programmatic first
    const progPost = getProgrammaticPost(slug, language);
    let title = '';
    let description = '';
    let image = '/Tangier-Morocco-Photo.webp'; // fallback

    if (progPost) {
        title = progPost.seoTitle;
        description = progPost.seoDesc;
        image = progPost.image;
    } else {
        const t = (key: string) => {
            const langSection = translations[language] || translations['en'];
            return langSection[key] || key;
        };

        const blogPosts = [
            { id: 1, slug: 'rabat-travel-guide', image: "/img2/rabat-hassan-tour.jpg" },
            { id: 2, slug: 'sahara-desert-tour-plan', image: "/b-roll/activity-sahara-camel-riding-broll.webp" },
            { id: 3, slug: 'moroccan-architecture-guide', image: "/img2/fes_gate.jpg" },
            { id: 4, slug: 'moroccan-food-traditions', image: "/Traditional.webp" },
            { id: 5, slug: 'chefchaouen-blue-pearl-tips', image: "/hero-chefchaouen.webp" },
            { id: 6, slug: 'private-driver-morocco-guide', image: "/img2/private-vito-vans-3.webp" }
        ];

        const post = blogPosts.find(p => p.slug === slug);
        if (!post) {
            return { title: 'Post Not Found - Mdina Tours' };
        }

        title = `${t(`blog_post_${post.id}_title`)} – Mdina Tours`;
        description = t(`blog_post_${post.id}_excerpt`);
        image = post.image;
    }

    const url = `https://mdinatours.com/${lang}/blog/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': `https://mdinatours.com/en/blog/${slug}`,
                'fr': `https://mdinatours.com/fr/blog/${slug}`,
                'x-default': `https://mdinatours.com/en/blog/${slug}`,
            }
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: `https://mdinatours.com${image}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`https://mdinatours.com${image}`],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    if (lang === 'es') {
        notFound();
    }
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const progPost = getProgrammaticPost(slug, language);
    
    let title = '';
    let category = '';
    let image = '';
    let date = '';
    let content = '';
    let tocList: { id: string; text: string }[] = [];
    let structuredSections: { id: string; title: string; content: string }[] = [];
    
    const blogPosts = [
        { id: 1, slug: 'rabat-travel-guide', image: "/img2/rabat-hassan-tour.jpg", date: "March 15, 2026" },
        { id: 2, slug: 'sahara-desert-tour-plan', image: "/b-roll/activity-sahara-camel-riding-broll.webp", date: "March 10, 2026" },
        { id: 3, slug: 'moroccan-architecture-guide', image: "/img2/fes_gate.jpg", date: "March 5, 2026" },
        { id: 4, slug: 'moroccan-food-traditions', image: "/Traditional.webp", date: "February 28, 2026" },
        { id: 5, slug: 'chefchaouen-blue-pearl-tips', image: "/hero-chefchaouen.webp", date: "February 20, 2026" },
        { id: 6, slug: 'private-driver-morocco-guide', image: "/img2/private-vito-vans-3.webp", date: "February 15, 2026" }
    ];

    if (progPost) {
        title = progPost.title;
        category = progPost.category;
        image = progPost.image;
        date = progPost.date;
    } else {
        const postData = blogPosts.find(p => p.slug === slug);
        if (!postData) notFound();
        
        title = t(`blog_post_${postData.id}_title`);
        content = t(`blog_post_${postData.id}_content`);
        category = t(`blog_post_${postData.id}_category`);
        image = postData.image;
        date = postData.date;

        if (title === `blog_post_${postData.id}_title`) {
            notFound();
        }

        const sectionsMetadata = standardPostSections[postData.id as keyof typeof standardPostSections]?.[language as 'en' | 'fr'] || [];
        const paragraphs = content.split('\n\n');
        
        structuredSections = paragraphs.map((p, idx) => {
            const meta = sectionsMetadata[idx] || { title: `Section ${idx + 1}`, id: `section-${idx + 1}` };
            return {
                id: meta.id,
                title: meta.title,
                content: p
            };
        });

        tocList = structuredSections.map(s => ({ id: s.id, text: s.title }));
    }

    const allGalleryImages = [
        { src: "/b-roll/Tourists-in-marrakech.avif", tag: "Marrakech", alt: "Exploring Marrakech", keywords: ["marrakech", "morocco-trip-tour-hero08", "morocco-trip-tour-hero09"] },
        { src: "/img/marrakech-tour.webp", tag: "Marrakech", alt: "Marrakech streets", keywords: ["marrakech", "tour"] },
        { src: "/img/marrakech.jpg", tag: "Marrakech", alt: "Marrakech Medina", keywords: ["marrakech"] },
        { src: "/img/marrakech.webp", tag: "Marrakech", alt: "Marrakech highlights", keywords: ["marrakech"] },
        { src: "/img2/aeroport-marrakech.webp", tag: "Marrakech Airport", alt: "Marrakech Airport Terminal", keywords: ["marrakech", "airport", "transfer"] },
        { src: "/img2/Marrakech_atlas.jpg", tag: "Marrakech Atlas", alt: "Atlas mountains from Marrakech", keywords: ["marrakech", "atlas", "mountains"] },
        { src: "/b-roll/activity-sahara-camel-riding-broll.webp", tag: "Sahara Desert", alt: "Camel trekking", keywords: ["sahara", "merzouga", "desert", "camel", "riding"] },
        { src: "/Sahara.webp", tag: "Sahara Desert", alt: "Sahara Dunes", keywords: ["sahara", "merzouga", "desert"] },
        { src: "/hero-sahara.webp", tag: "Sahara Dunes", alt: "Erg Chebbi sand dunes", keywords: ["sahara", "merzouga", "desert"] },
        { src: "/hero-chefchaouen.webp", tag: "Chefchaouen", alt: "Chefchaouen blue streets", keywords: ["chefchaouen", "blue-pearl"] },
        { src: "/img2/rabat-hassan-tour.jpg", tag: "Rabat Capital", alt: "Hassan Tower Rabat", keywords: ["rabat", "hassan"] },
        { src: "/img2/rabat_monemont.jpg", tag: "Rabat", alt: "Mausoleum of Mohammed V", keywords: ["rabat"] },
        { src: "/img2/rabat-airport.webp", tag: "Rabat Airport", alt: "Rabat Airport Terminal", keywords: ["rabat", "airport", "transfer"] },
        { src: "/img2/casablanca_MOSQUE.webp", tag: "Casablanca", alt: "Hassan II Mosque Casablanca", keywords: ["casablanca", "mosque"] },
        { src: "/img2/Airport_Casablanca_Mohammed.webp", tag: "Casablanca Airport", alt: "Mohammed V Airport Casablanca", keywords: ["casablanca", "airport", "transfer"] },
        { src: "/img2/fes_gate.jpg", tag: "Fes Palace", alt: "Royal Palace Fes Golden Gate", keywords: ["fes", "gate", "architecture"] },
        { src: "/img2/fes_3.webp", tag: "Fes Medina", alt: "Fes historic medina view", keywords: ["fes"] },
        { src: "/img2/fes-airport.jpeg", tag: "Fes Airport", alt: "Fes Airport Terminal", keywords: ["fes", "airport", "transfer"] },
        { src: "/img2/tangier_hero.webp", tag: "Tangier Harbor", alt: "Tangier view", keywords: ["tangier"] },
        { src: "/img2/tangier-mdina.jpg", tag: "Tangier Medina", alt: "Tangier old town streets", keywords: ["tangier", "medina"] },
        { src: "/img2/tangier-airport.avif", tag: "Tangier Airport", alt: "Tangier Airport Terminal", keywords: ["tangier", "airport", "transfer"] },
        { src: "/img2/Asilah-Morocco.jpg", tag: "Asilah Medina", alt: "Asilah white houses", keywords: ["asilah", "tangier-to-rabat", "tangier-to-casablanca"] },
        { src: "/img2/Asilah_water.webp", tag: "Asilah Coast", alt: "Asilah ocean walls", keywords: ["asilah"] },
        { src: "/img/Essaouira.webp", tag: "Essaouira Port", alt: "Essaouira coast", keywords: ["essaouira"] },
        { src: "/img2/Essaouira-maroc.jpg", tag: "Essaouira Medina", alt: "Walled town of Essaouira", keywords: ["essaouira"] },
        { src: "/a-mdiinatours/selman-marrakech-mdinatours.webp", tag: "Agadir Marina", alt: "Agadir port view", keywords: ["agadir"] },
        { src: "/img2/agadir-airport.webp", tag: "Agadir Airport", alt: "Agadir Airport Terminal", keywords: ["agadir", "airport", "transfer"] },
        { src: "/img/Ait Benhaddou.jpg", tag: "Aït Benhaddou", alt: "Ait Benhaddou Kasbah", keywords: ["ait-benhaddou", "ouarzazate"] },
        { src: "/img/ouzoud waterfalls.jpg", tag: "Ouzoud Waterfalls", alt: "Ouzoud Waterfalls", keywords: ["ouzoud", "waterfalls"] },
        { src: "/img/agafay.jpg", tag: "Agafay Desert", alt: "Stony Agafay desert", keywords: ["agafay", "desert"] },
        { src: "/b-roll/vito-airoport-parking.jpg", tag: "Our Fleet", alt: "Mercedes Vito transfers", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/b-roll/3-Mercedes-vito-airoport.jpg", tag: "Shuttle Service", alt: "Mercedes Vito Airport shuttle", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/b-roll/chauffaur.jpg", tag: "Chauffeur Service", alt: "Professional Chauffeur", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/premium-chauffeur.jpg", tag: "Premium Chauffeur", alt: "Premium Private Driver", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/private-van-at-hotel.webp", tag: "Hotel Pickups", alt: "Mercedes Vito hotel transfer", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/private-vito-vans-3.webp", tag: "Our Minivans", alt: "Mercedes Vito tourist transport", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/vito-aeroport.jpg", tag: "Airport Transfer", alt: "Mercedes Vito airport pickup", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur", "airport"] },
        { src: "/img3/mdinatours-drivers-cars.webp", tag: "Private Chauffeur", alt: "Private driver service", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/vito.jpg", tag: "Mercedes Vito", alt: "Mercedes Vito details", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/b-roll/private-transfer-chauffaur-vito.jpg", tag: "Chauffeur", alt: "Airport pickup Mercedes Vito", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
        { src: "/img2/happy-traverlers-group.webp", tag: "Happy Travelers", alt: "Groups traveling in Morocco", keywords: ["driver", "group", "itinerary", "tour"] },
        { src: "/b-roll/moroccan-family-urban.jpg", tag: "Local Life", alt: "Moroccan local experiences", keywords: ["culture", "architecture", "food", "traditions"] },
        { src: "/img/Morocco-trip-tour-hero01.webp", tag: "Tour Morocco", alt: "Beautiful Moroccan scenery", keywords: ["itinerary", "tour", "architecture", "landscape"] },
        { src: "/img/Morocco-trip-tour-hero02.webp", tag: "Travel Morocco", alt: "Tour guide group", keywords: ["itinerary", "tour", "architecture", "landscape"] },
        { src: "/img/Morocco-trip-tour-hero03.webp", tag: "Explore Morocco", alt: "Morocco trip scenery", keywords: ["itinerary", "tour", "architecture", "landscape"] },
        { src: "/img/Morocco-trip-tour-hero05.webp", tag: "Scenic Morocco", alt: "Mountain paths", keywords: ["itinerary", "tour", "architecture", "landscape"] }
    ];

    const normalizedSlug = slug.toLowerCase();
    let relatedGalleryImages = allGalleryImages.filter(img => 
        img.keywords.some(keyword => normalizedSlug.includes(keyword))
    );

    if (relatedGalleryImages.length < 3) {
        relatedGalleryImages = [
            allGalleryImages[0],
            allGalleryImages[6],
            allGalleryImages[34],
            allGalleryImages[31],
            allGalleryImages[13],
            allGalleryImages[37]
        ];
    }

    relatedGalleryImages = relatedGalleryImages.slice(0, 6);

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    // Targeted Route & Service Resolver
    const routeInfo = getRouteInfo(slug);
    const airportInfo = getAirportInfo(slug);

    let targetedTransferSlug: string | null = null;
    let targetedTransferTitle: string = '';
    let targetedTransferSubtitle: string = '';
    let targetedTransferPrice: number | undefined;
    let routeStats: { origin: string; destination: string; distance?: string; duration?: string; priceFrom?: number } | undefined;

    if (routeInfo) {
        targetedTransferSlug = routeInfo.transferSlug;
        const originName = routeInfo.c1[isEn ? 'en' : 'fr'];
        const destName = routeInfo.c2[isEn ? 'en' : 'fr'];
        targetedTransferTitle = isEn 
            ? `Private Transfer: ${originName} to ${destName}` 
            : `Transfert Privé : ${originName} ⇄ ${destName}`;
        targetedTransferSubtitle = isEn
            ? `Direct door-to-door transportation in an air-conditioned Mercedes Vito minivan or executive sedan.`
            : `Liaison directe porte-à-porte en van Mercedes Vito ou berline climatisée avec chauffeur bilingue.`;
        targetedTransferPrice = routeInfo.route.privatePrice;
        routeStats = {
            origin: originName,
            destination: destName,
            distance: routeInfo.route.distance,
            duration: routeInfo.route.duration,
            priceFrom: routeInfo.route.privatePrice
        };
    } else if (airportInfo) {
        targetedTransferSlug = airportInfo.transferSlug;
        const cityName = airportInfo.city[isEn ? 'en' : 'fr'];
        targetedTransferTitle = isEn 
            ? `${cityName} Airport Private Transfer` 
            : `Navette Privée Aéroport de ${cityName}`;
        targetedTransferSubtitle = isEn
            ? `Meet & greet in arrivals hall with nameboard, live flight tracking, and fixed rates to your hotel or riad.`
            : `Accueil personnalisé avec pancarte à la sortie du terminal, suivi de vol et tarif fixe vers votre riad ou hôtel.`;
        const tData = transfersData.find(t => t.slug === targetedTransferSlug);
        targetedTransferPrice = tData ? Object.values(tData.prices)[0] : undefined;
    } else if (slug === 'sahara-desert-tour-plan') {
        targetedTransferSlug = 'fes-to-merzouga-transfer';
        targetedTransferTitle = isEn ? 'Fes ⇄ Merzouga Sahara Transfer' : 'Transfert Fès ⇄ Merzouga Sahara';
        targetedTransferSubtitle = isEn ? 'Comfortable 4x4 or Mercedes minivan crossing the Middle Atlas to the Erg Chebbi dunes.' : 'Véhicule 4x4 ou van Mercedes confortable traversant le Moyen Atlas vers les dunes de l\'Erg Chebbi.';
        targetedTransferPrice = 370;
    } else if (slug === 'chefchaouen-blue-pearl-tips') {
        targetedTransferSlug = 'tangier-to-chefchaouen-transfer';
        targetedTransferTitle = isEn ? 'Tangier ⇄ Chefchaouen Transfer' : 'Transfert Tanger ⇄ Chefchaouen';
        targetedTransferSubtitle = isEn ? 'Direct private transfer from Tangier port, airport, or hotel to Chefchaouen.' : 'Transfert privé direct depuis le port, l\'aéroport ou votre hôtel de Tanger vers Chefchaouen.';
        targetedTransferPrice = 140;
    } else if (slug === 'rabat-travel-guide') {
        targetedTransferSlug = 'rabat-airport-transfer';
        targetedTransferTitle = isEn ? 'Rabat Airport & City Transfer' : 'Navette Aéroport & Chauffeur Rabat';
        targetedTransferSubtitle = isEn ? 'Professional private chauffeur for airport pickups and city transfers in Rabat.' : 'Chauffeur privé professionnel pour vos arrivées d\'aéroport et déplacements à Rabat.';
        targetedTransferPrice = 35;
    }

    const primaryTransferUrl = targetedTransferSlug ? getPath(`/transfers/${targetedTransferSlug}`) : getPath('/transfers');

    // WhatsApp Booking Link Builder with route awareness
    const getWhatsAppUrl = (type: string, link: string) => {
        const serviceName = targetedTransferTitle || title;
        const msg = isEn
            ? `Hello Mdina Tours,\nI read your article: "${title}".\nI would like to book a private transfer/driver (${serviceName}).\n\nPlease let me know availability and pricing.`
            : `Bonjour Mdina Tours,\nJ'ai lu votre article : "${title}".\nJe souhaite réserver un transfert privé avec chauffeur (${serviceName}).\n\nMerci de me confirmer la disponibilité et le tarif.`;
        return `https://wa.me/212724114775?text=${encodeURIComponent(msg)}`;
    };

    const popularTransfers = [
        {
            title: isEn ? "Fes ⇄ Merzouga" : "Fès ⇄ Merzouga",
            slug: "fes-to-merzouga-transfer",
            price: 370
        },
        {
            title: isEn ? "Casablanca ⇄ Marrakech" : "Casablanca ⇄ Marrakech",
            slug: "casablanca-to-marrakech-transfer",
            price: 220
        },
        {
            title: isEn ? "Marrakech ⇄ Essaouira" : "Marrakech ⇄ Essaouira",
            slug: "marrakech-to-essaouira-transfer",
            price: 140
        },
        {
            title: isEn ? "Tangier ⇄ Chefchaouen" : "Tanger ⇄ Chefchaouen",
            slug: "tangier-to-chefchaouen-transfer",
            price: 140
        },
        {
            title: isEn ? "Casablanca Airport Transfer" : "Transfert Aéroport Casablanca",
            slug: "casablanca-airport-transfer",
            price: 45
        }
    ];

    // FAQ Schema
    const faqSchema = progPost && progPost.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": progPost.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a.replace(/<[^>]*>/g, '') // strip HTML for schema
            }
        }))
    } : null;

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : "Accueil",
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isEn ? "Blog" : "Blog",
                "item": `https://mdinatours.com/${language}/blog`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": `https://mdinatours.com/${language}/blog/${slug}`
            }
        ]
    };

    // Article / BlogPosting Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": progPost ? progPost.seoDesc : title,
        "image": `https://mdinatours.com${image}`,
        "datePublished": "2026-03-15",
        "dateModified": "2026-03-15",
        "author": {
            "@type": "Organization",
            "name": "Mdina Tours",
            "url": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "Mdina Tours",
            "logo": {
                "@type": "ImageObject",
                "url": "https://mdinatours.com/img/Morocco-trip-tour-hero01.webp"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://mdinatours.com/${language}/blog/${slug}`
        }
    };

    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <main className={styles.main}>
                <section className={styles.postHero}>
                    <div className={styles.heroBackground}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            priority
                            className={styles.heroImage}
                            sizes="100vw"
                        />
                        <div className={styles.overlay}></div>
                    </div>

                    <div className={styles.heroContent}>
                        <div className={styles.container}>
                            <nav className={styles.breadcrumbs}>
                                <Link href={getPath('/')}>{t('home')}</Link>
                                <span className={styles.separator}>/</span>
                                <Link href={getPath('/blog')}>{t('blog')}</Link>
                                <span className={styles.separator}>/</span>
                                <span className={styles.current}>{category}</span>
                            </nav>

                            <h1 className={styles.title}>{title}</h1>
                            <div className={styles.meta}>
                                <span className={styles.date}>{date}</span>
                                <span className={styles.dot}>•</span>
                                <span className={styles.author}>By Mdina Tours</span>
                                <span className={styles.dot}>•</span>
                                <span className={styles.tag}>{category}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <article className={styles.postContentSection}>
                    <div className={styles.container}>
                        <div className={styles.postLayout}>
                            <div className={styles.textContent}>
                                {/* Render Programmatic Post Contents */}
                                {progPost ? (
                                    <>
                                        {/* Table of Contents */}
                                        <div className={styles.toc}>
                                            <h3>{isEn ? "Table of Contents" : "Table des matières"}</h3>
                                            <ul className={styles.tocList}>
                                                {progPost.tableOfContents.map(item => (
                                                    <li key={item.id}>
                                                        <a href={`#${item.id}`}>{item.text}</a>
                                                    </li>
                                                ))}
                                                {progPost.faqs.length > 0 && (
                                                    <li>
                                                        <a href="#faqs">{isEn ? "Frequently Asked Questions" : "Questions Fréquentes"}</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Featured In-Article Route & Transfer Highlight Card */}
                                        <BlogRouteHighlightCard
                                            language={language}
                                            title={targetedTransferTitle || (isEn ? "Private Chauffeur & Transfers in Morocco" : "Chauffeur Privé & Transferts au Maroc")}
                                            subtitle={targetedTransferSubtitle || (isEn ? "Transparent fixed rates, modern Mercedes fleet, professional drivers, and direct hotel pickup." : "Tarifs fixes garantis, flotte Mercedes récente, chauffeurs professionnels et prise en charge à votre Riad.")}
                                            routeDetails={routeStats}
                                            transferLink={primaryTransferUrl}
                                            transferLinkText={isEn 
                                                ? (targetedTransferSlug ? `View Rates & Book This Transfer Online` : `Explore Morocco Private Transfers`)
                                                : (targetedTransferSlug ? `Voir les Tarifs & Réserver ce Transfert en Ligne` : `Découvrir nos Transferts au Maroc`)}
                                            whatsAppUrl={getWhatsAppUrl('transfer', primaryTransferUrl)}
                                            imageUrl={image}
                                            badgeText={targetedTransferSlug ? (isEn ? "Direct Route Transfer • Mdina Tours" : "Transfert Direct Garanti • Mdina Tours") : undefined}
                                        />

                                        {/* Sections */}
                                        {progPost.sections.map(section => (
                                            <section key={section.id} id={section.id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                                
                                                {/* Text Content */}
                                                <div 
                                                    className={styles.sectionContent}
                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                />

                                                {/* Optional Comparison Table */}
                                                {section.table && (
                                                    <div className={styles.comparisonTableWrapper}>
                                                        <table className={styles.comparisonTable}>
                                                            <thead>
                                                                <tr>
                                                                    {section.table.headers.map((h, i) => (
                                                                        <th key={i}>{h}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {section.table.rows.map((row, i) => (
                                                                    <tr key={i}>
                                                                        {row.map((cell, j) => (
                                                                            <td key={j}>{cell}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}

                                                {/* Optional List */}
                                                {section.list && (
                                                    <ul className={styles.bulletList}>
                                                        {section.list.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Optional Call to Action Block */}
                                                {section.isCallToAction && (
                                                    <div className={styles.ctaBlock}>
                                                        <span className={styles.ctaBadge}>
                                                            {isEn ? "Mdina Tours • Private Transfer" : "Mdina Tours • Transfert Privé"}
                                                        </span>
                                                        <h3 className={styles.ctaTitle}>{section.title}</h3>
                                                        <div 
                                                            dangerouslySetInnerHTML={{ __html: section.content }} 
                                                            className={styles.ctaTextContainer} 
                                                        />
                                                        <div className={styles.ctaActionsRow}>
                                                            <Link 
                                                                href={getPath(section.ctaLink || primaryTransferUrl)}
                                                                className={styles.ctaPrimaryButton}
                                                            >
                                                                <span>{section.ctaText || (isEn ? "Book Transfer Online →" : "Réserver le Transfert en Ligne →")}</span>
                                                            </Link>
                                                            <a 
                                                                href={getWhatsAppUrl(section.ctaType || 'transfer', section.ctaLink || primaryTransferUrl)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={styles.ctaWhatsAppButton}
                                                            >
                                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                <span>{isEn ? "WhatsApp Inquiry" : "Réservation WhatsApp"}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </section>
                                        ))}

                                        {/* FAQs */}
                                        {progPost.faqs.length > 0 && (
                                            <section id="faqs" className={styles.faqSection} style={{ scrollMarginTop: '100px' }}>
                                                <h2>{isEn ? "Frequently Asked Questions" : "Questions Fréquentes"}</h2>
                                                <div className={styles.faqContainer}>
                                                    {progPost.faqs.map((faq, i) => (
                                                        <div key={i} className={styles.faqItem}>
                                                            <div className={styles.faqQuestion}>
                                                                <span>{faq.q}</span>
                                                            </div>
                                                            <div className={styles.faqAnswer}>
                                                                <p>{faq.a}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </>
                                ) : (
                                    /* Render Standard Blog Post Paragraphs with TOC, Highlight Card, and Sections */
                                    <>
                                        {/* Table of Contents */}
                                        <div className={styles.toc}>
                                            <h3>{isEn ? "Table of Contents" : "Table des matières"}</h3>
                                            <ul className={styles.tocList}>
                                                {tocList.map(item => (
                                                    <li key={item.id}>
                                                        <a href={`#${item.id}`}>{item.text}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Featured In-Article Route & Transfer Highlight Card */}
                                        <BlogRouteHighlightCard
                                            language={language}
                                            title={targetedTransferTitle || (isEn ? "Private Chauffeur & Transfers in Morocco" : "Chauffeur Privé & Transferts au Maroc")}
                                            subtitle={targetedTransferSubtitle || (isEn ? "Transparent fixed rates, modern Mercedes fleet, professional drivers, and direct hotel pickup." : "Tarifs fixes garantis, flotte Mercedes récente, chauffeurs professionnels et prise en charge à votre Riad.")}
                                            routeDetails={routeStats}
                                            transferLink={primaryTransferUrl}
                                            transferLinkText={isEn 
                                                ? (targetedTransferSlug ? `View Rates & Book This Transfer Online` : `Explore Morocco Private Transfers`)
                                                : (targetedTransferSlug ? `Voir les Tarifs & Réserver ce Transfert en Ligne` : `Découvrir nos Transferts au Maroc`)}
                                            whatsAppUrl={getWhatsAppUrl('transfer', primaryTransferUrl)}
                                            imageUrl={image}
                                            badgeText={targetedTransferSlug ? (isEn ? "Direct Route Transfer • Mdina Tours" : "Transfert Direct Garanti • Mdina Tours") : undefined}
                                        />

                                        {/* Sections */}
                                        {structuredSections.map(section => (
                                            <section key={section.id} id={section.id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                                <div className={styles.sectionContent}>
                                                    <p className={styles.paragraph}>{section.content}</p>
                                                </div>
                                            </section>
                                        ))}

                                        <div className={styles.ctaBlock}>
                                            <span className={styles.ctaBadge}>
                                                {isEn ? "Mdina Tours • Private Transport" : "Mdina Tours • Transport Privé"}
                                            </span>
                                            <h3 className={styles.ctaTitle}>
                                                {targetedTransferTitle || (isEn ? "Book Your Private Driver or Transfer in Morocco" : "Réservez Votre Chauffeur Privé ou Transfert au Maroc")}
                                            </h3>
                                            <div className={styles.ctaTextContainer}>
                                                <p>
                                                    {isEn
                                                        ? "Explore Morocco comfortably with our professional private drivers and direct transfer services. Modern air-conditioned Mercedes fleet, fixed transparent rates, and pay upon completion."
                                                        : "Voyagez à travers le Maroc en toute sérénité avec nos chauffeurs privés professionnels et nos liaisons directes. Flotte Mercedes climatisée, prix fixes transparents et paiement sur place."}
                                                </p>
                                            </div>
                                            <div className={styles.ctaActionsRow}>
                                                <Link 
                                                    href={primaryTransferUrl}
                                                    className={styles.ctaPrimaryButton}
                                                >
                                                    <span>{isEn ? "Book Transfer Online →" : "Réserver le Transfert en Ligne →"}</span>
                                                </Link>
                                                <a 
                                                    href={getWhatsAppUrl('driver', primaryTransferUrl)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.ctaWhatsAppButton}
                                                >
                                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    <span>{isEn ? "WhatsApp Inquiry" : "Réservation WhatsApp"}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Contextual Visual Journey Gallery */}
                                <section className={styles.journeyGallery}>
                                    <h3 className={styles.journeyTitle}>
                                        {isEn ? "Visual Journey" : "Voyage Visuel"}
                                    </h3>
                                    <p className={styles.journeySubtitle}>
                                        {isEn 
                                            ? "Explore real photos of the destinations, services, and routes from this article." 
                                            : "Explorez les photos réelles des destinations, des services et des itinéraires de cet article."}
                                    </p>
                                    <div className={styles.journeyGrid}>
                                        {relatedGalleryImages.map((img, idx) => (
                                            <div key={idx} className={styles.journeyItem}>
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    className={styles.journeyImage}
                                                />
                                                <div className={styles.journeyOverlay}>
                                                    <span className={styles.journeyTag}>{img.tag}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className={styles.postFooter}>
                                    <div className={styles.shareSection}>
                                        <h4>{isEn ? 'Share this story' : 'Partager cet article'}</h4>
                                        <div className={styles.shareLinks}>
                                            <a href={`https://wa.me/?text=${encodeURIComponent(title + ' - https://mdinatours.com/' + language + '/blog/' + slug)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>WhatsApp</a>
                                            <button className={styles.shareBtn}>Facebook</button>
                                        </div>
                                    </div>

                                    <div className={styles.navigation}>
                                        <Link href={getPath('/blog')} className={styles.backLink}>
                                            ← {isEn ? 'Back to Blog' : 'Retour au Blog'}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <aside className={styles.sidebar}>
                                {/* Featured Route Transfer Card */}
                                <div className={styles.sidebarTransferWidget}>
                                    <span className={styles.sidebarTransferBadge}>
                                        {targetedTransferSlug ? (isEn ? "Direct Transfer" : "Transfert Direct") : (isEn ? "Private Chauffeur" : "Chauffeur Privé")}
                                    </span>
                                    <h3 className={styles.sidebarTransferTitle}>
                                        {targetedTransferTitle || (isEn ? "Private Chauffeur Morocco" : "Chauffeur Privé au Maroc")}
                                    </h3>
                                    <div className={styles.sidebarTransferPrice}>
                                        <span className={styles.sidebarTransferPriceAmount}>
                                            {targetedTransferPrice ? `€${targetedTransferPrice}` : (isEn ? "From €25/h" : "Dès 25€/h")}
                                        </span>
                                        <span className={styles.sidebarTransferPriceSub}>
                                            {targetedTransferPrice ? (isEn ? "/ vehicle" : "/ véhicule") : (isEn ? "/ hourly rate" : "/ tarif horaire")}
                                        </span>
                                    </div>
                                    <ul className={styles.sidebarTransferPerks}>
                                        <li className={styles.sidebarTransferPerk}>
                                            <span className={styles.sidebarTransferPerkBullet}>•</span>
                                            <span>{isEn ? "Door-to-door hotel & riad pickup" : "Prise en charge à votre Riad"}</span>
                                        </li>
                                        <li className={styles.sidebarTransferPerk}>
                                            <span className={styles.sidebarTransferPerkBullet}>•</span>
                                            <span>{isEn ? "Modern air-conditioned Mercedes fleet" : "Minivan Mercedes climatisé"}</span>
                                        </li>
                                        <li className={styles.sidebarTransferPerk}>
                                            <span className={styles.sidebarTransferPerkBullet}>•</span>
                                            <span>{isEn ? "Zero deposit • Pay upon completion" : "Paiement direct à destination"}</span>
                                        </li>
                                    </ul>
                                    <Link href={primaryTransferUrl} className={styles.sidebarPrimaryBtn}>
                                        {isEn ? "Book This Service Online →" : "Réserver ce Trajet en Ligne →"}
                                    </Link>
                                    <a 
                                        href={getWhatsAppUrl('transfer', primaryTransferUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.sidebarWhatsAppBtn}
                                    >
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.123.553 4.116 1.521 5.854l-1.619 5.918 6.069-1.592c1.683.916 3.607 1.438 5.65 1.438 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span>{isEn ? "WhatsApp Inquiry" : "Réservation via WhatsApp"}</span>
                                    </a>
                                </div>

                                {/* Popular Morocco Route Transfers */}
                                <div className={styles.sidebarWidget}>
                                    <h3>{isEn ? 'Popular Transfers' : 'Transferts Populaires'}</h3>
                                    <ul className={styles.sidebarRoutesList}>
                                        {popularTransfers.map((p, idx) => (
                                            <li key={idx} className={styles.sidebarRouteItem}>
                                                <Link href={getPath(`/transfers/${p.slug}`)} className={styles.sidebarRouteLink}>
                                                    <span>{p.title}</span>
                                                    <span className={styles.sidebarRoutePrice}>€{p.price}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={getPath('/transfers')} className={styles.sidebarAllTransfersLink}>
                                        <span>{isEn ? 'View all 18+ routes' : 'Voir les 18+ trajets'}</span>
                                        <span>→</span>
                                    </Link>
                                </div>

                                {/* Our Services */}
                                <div className={styles.sidebarWidget}>
                                    <h3>{isEn ? 'Our Services' : 'Nos Services'}</h3>
                                    <ul className={styles.widgetList}>
                                        <li><Link href={getPath('/transfers')}>{isEn ? 'Intercity Transfers' : 'Transferts Intervilles'}</Link></li>
                                        <li><Link href={getPath('/airport-transfers')}>{isEn ? 'Airport Transfers' : 'Navettes Aéroport'}</Link></li>
                                        <li><Link href={getPath('/private-driver')}>{isEn ? 'Private Chauffeurs' : 'Chauffeurs Privés'}</Link></li>
                                        <li><Link href={getPath('/chauffeur-dispo-morocco')}>{isEn ? 'Daily Driver at Disposal' : 'Mise à Disposition Journée'}</Link></li>
                                        <li><Link href={getPath('/tours')}>{isEn ? 'Custom Guided Tours' : 'Circuits sur Mesure'}</Link></li>
                                        <li><Link href={getPath('/contact')}>{isEn ? 'Custom Itinerary Quote' : 'Devis Sur Mesure'}</Link></li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </article>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

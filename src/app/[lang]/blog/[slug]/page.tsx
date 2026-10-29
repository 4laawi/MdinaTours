import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import BlogRouteHighlightCard from '@/components/BlogRouteHighlightCard';
import ChefchaouenTrainNotice from '@/components/ChefchaouenTrainNotice';
import RouteQuickSummary from '@/components/RouteQuickSummary';
import styles from './BlogPost.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Car, Plane, Compass, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';
import { notFound } from 'next/navigation';
import { transfersData } from '@/lib/transfersData';
import { getProgrammaticPost, programmaticSlugs, getRouteInfo, getAirportInfo } from '@/lib/programmaticSeo';

export const revalidate = 86400;

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
    
    const toIsoDate = (d?: string) => {
        if (!d) return "2026-03-15";
        const parsed = Date.parse(d);
        if (!isNaN(parsed)) {
            return new Date(parsed).toISOString().split('T')[0];
        }
        const parts = d.trim().split(/\s+/);
        if (parts.length === 2) {
            const months: Record<string, string> = {
                january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
                july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
            };
            const m = months[parts[0].toLowerCase()];
            if (m) return `${parts[1]}-${m}-01`;
        }
        return "2026-03-15";
    };

    // Check programmatic first
    const progPost = getProgrammaticPost(slug, language);
    let title = '';
    let description = '';
    let image = '/Tangier-Morocco-Photo.webp'; // fallback
    let rawDate: string | undefined;

    if (progPost) {
        title = progPost.seoTitle;
        description = progPost.seoDesc;
        image = progPost.image;
        rawDate = progPost.date;
    } else {
        const t = (key: string) => {
            const langSection = translations[language] || translations['en'];
            return langSection[key] || key;
        };

        const blogPosts = [
            { id: 1, slug: 'rabat-travel-guide', image: "/img2/rabat-hassan-tour.jpg", date: "March 15, 2026" },
            { id: 2, slug: 'sahara-desert-tour-plan', image: "/b-roll/activity-sahara-camel-riding-broll.webp", date: "March 10, 2026" },
            { id: 3, slug: 'moroccan-architecture-guide', image: "/img2/fes_gate.jpg", date: "March 5, 2026" },
            { id: 4, slug: 'moroccan-food-traditions', image: "/Traditional.webp", date: "February 28, 2026" },
            { id: 5, slug: 'chefchaouen-blue-pearl-tips', image: "/hero-chefchaouen.webp", date: "February 20, 2026" },
            { id: 6, slug: 'private-driver-morocco-guide', image: "/img2/private-vito-vans-3.webp", date: "February 15, 2026" }
        ];

        const post = blogPosts.find(p => p.slug === slug);
        if (!post) {
            return { title: 'Post Not Found - Mdina Tours' };
        }

        title = `${t(`blog_post_${post.id}_title`)} – Mdina Tours`;
        description = t(`blog_post_${post.id}_excerpt`);
        image = post.image;
        rawDate = post.date;
    }

    const isoDate = toIsoDate(rawDate);
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
            publishedTime: isoDate,
            modifiedTime: isoDate,
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
        { src: "/a-mdiinatours/fes-airport-transfer.webp", tag: "Fes Airport", alt: "Fes Airport Terminal", keywords: ["fes", "airport", "transfer"] },
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

    const isChefchaouenRoute = slug.includes('chefchaouen');

    // Resolve primary focus city for commercial interlinking
    const getFocusCity = (currentSlug: string) => {
        const lower = currentSlug.toLowerCase();
        if (routeInfo) {
            return {
                name: routeInfo.c1[isEn ? 'en' : 'fr'],
                slug: routeInfo.originSlug
            };
        }
        if (airportInfo) {
            return {
                name: airportInfo.city[isEn ? 'en' : 'fr'],
                slug: airportInfo.cityKey
            };
        }
        if (lower.includes('marrakech')) return { name: 'Marrakech', slug: 'marrakech' };
        if (lower.includes('casablanca')) return { name: 'Casablanca', slug: 'casablanca' };
        if (lower.includes('fes')) return { name: isEn ? 'Fes' : 'Fès', slug: 'fes' };
        if (lower.includes('tangier')) return { name: isEn ? 'Tangier' : 'Tanger', slug: 'tangier' };
        if (lower.includes('rabat')) return { name: 'Rabat', slug: 'rabat' };
        if (lower.includes('chefchaouen')) return { name: 'Chefchaouen', slug: 'chefchaouen' };
        if (lower.includes('agadir')) return { name: 'Agadir', slug: 'agadir' };
        if (lower.includes('sahara') || lower.includes('merzouga')) return { name: isEn ? 'Sahara & Merzouga' : 'Sahara & Merzouga', slug: 'sahara' };
        return { name: isEn ? 'Morocco' : 'Maroc', slug: 'morocco' };
    };

    const focusCity = getFocusCity(slug);

    const getRelatedCommercialLinks = (citySlug: string) => {
        switch (citySlug) {
            case 'marrakech':
                return [
                    {
                        title: isEn ? 'Private Driver Marrakech' : 'Chauffeur Privé Marrakech',
                        desc: isEn ? 'Dedicated bilingual chauffeur with Mercedes fleet for city tours, dinners, and day trips.' : 'Chauffeur bilingue dédié avec flotte Mercedes pour visites et soirées.',
                        href: getPath('/private-driver-marrakech'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Marrakech Airport Transfer' : 'Transfert Aéroport Marrakech RAK',
                        desc: isEn ? 'Direct terminal meet & greet with flat fixed rates to your medina riad or hotel.' : 'Accueil en terminal avec tarif fixe vers votre riad ou hôtel.',
                        href: getPath('/transfers/marrakech-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Marrakech Day Trip & Medina Tour' : 'Excursion Privée Marrakech',
                        desc: isEn ? 'Explore Bahia Palace, Majorelle Gardens, and vibrant souks with certified local guides.' : 'Découvrez le Palais Bahia et le Jardin Majorelle avec guide officiel.',
                        href: getPath('/tours/marrakech-day-trip'),
                        icon: 'compass'
                    }
                ];
            case 'casablanca':
                return [
                    {
                        title: isEn ? 'Private Driver Casablanca' : 'Chauffeur Privé Casablanca',
                        desc: isEn ? 'Executive transport for business meetings, Hassan II Mosque visits, and Corniche dining.' : 'Transport exécutif pour vos rendez-vous, la Mosquée Hassan II et la Corniche.',
                        href: getPath('/private-driver-casablanca'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Casablanca Airport Transfer (CMN)' : 'Transfert Aéroport Casablanca CMN',
                        desc: isEn ? 'Seamless highway express transit from Mohammed V Airport directly to your hotel.' : 'Liaison directe par autoroute de l\'aéroport Mohammed V à votre hôtel.',
                        href: getPath('/transfers/casablanca-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Casablanca City Tour' : 'Visite Guidée de Casablanca',
                        desc: isEn ? 'Discover architectural landmarks, Art Deco boulevards, and the Habous quarter.' : 'Explorez le patrimoine Art Déco et le quartier des Habous avec guide privé.',
                        href: getPath('/tours/casablanca-city-tour'),
                        icon: 'compass'
                    }
                ];
            case 'fes':
                return [
                    {
                        title: isEn ? 'Private Driver Fes' : 'Chauffeur Privé Fès',
                        desc: isEn ? 'Comfortable private transport for navigating the imperial city and regional excursions.' : 'Transport privé tout confort pour vos déplacements et excursions régionales.',
                        href: getPath('/private-driver-fes'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Fes Airport Transfer (FEZ)' : 'Transfert Aéroport Fès-Saïss',
                        desc: isEn ? 'Flat-rate private transfer connecting Fes-Saïss Airport to your medina riad.' : 'Navette à tarif fixe reliant l\'aéroport de Fès-Saïss à votre riad.',
                        href: getPath('/transfers/fes-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Fes Medina Guided Tour' : 'Visite Guidée Médina de Fès',
                        desc: isEn ? 'Official guided exploration of Al-Qarawiyyin, tanneries, and artisan workshops.' : 'Visite officielle de la médina, des tanneries et des ateliers d\'artisans.',
                        href: getPath('/tours/fes-guided-tour'),
                        icon: 'compass'
                    }
                ];
            case 'tangier':
                return [
                    {
                        title: isEn ? 'Private Driver Tangier' : 'Chauffeur Privé Tanger',
                        desc: isEn ? 'Reliable coastal and intercity driver for Cap Spartel, medina, and business trips.' : 'Chauffeur privé pour vos trajets vers le Cap Spartel, la médina ou vos affaires.',
                        href: getPath('/private-driver-tangier'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Tangier Airport & Port Transfer' : 'Transfert Aéroport & Port Tanger',
                        desc: isEn ? 'Punctual private pickup from Tangier Port or Ibn Battouta Airport to your stay.' : 'Prise en charge au Port de Tanger ou à l\'aéroport Ibn Battouta.',
                        href: getPath('/transfers/tangier-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Tangier to Chefchaouen Transfer' : 'Transfert Tanger ⇄ Chefchaouen',
                        desc: isEn ? 'Scenic mountain ride connecting the northern coast to the Blue Pearl.' : 'Trajet panoramique reliant la côte nord à la Perle Bleue.',
                        href: getPath('/transfers/tangier-to-chefchaouen-transfer'),
                        icon: 'compass'
                    }
                ];
            case 'rabat':
                return [
                    {
                        title: isEn ? 'Private Driver Rabat' : 'Chauffeur Privé Rabat',
                        desc: isEn ? 'Professional chauffeur service for embassy visits, administrative meetings, and touring.' : 'Service de chauffeur professionnel pour ambassades et visites officielles.',
                        href: getPath('/private-driver-rabat'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Rabat Airport Transfer (RBA)' : 'Transfert Aéroport Rabat-Salé',
                        desc: isEn ? 'Direct meet & greet transfer between Rabat-Salé Airport and downtown hotels.' : 'Accueil direct à l\'aéroport de Rabat-Salé vers votre hôtel ou riad.',
                        href: getPath('/transfers/rabat-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Rabat Imperial City Tour' : 'Visite Guidée Rabat Impériale',
                        desc: isEn ? 'Private guided tour of the Kasbah of the Udayas, Hassan Tower, and Chellah.' : 'Visite privée de la Kasbah des Oudayas, de la Tour Hassan et du Chellah.',
                        href: getPath('/tours/rabat-city-tour'),
                        icon: 'compass'
                    }
                ];
            case 'chefchaouen':
                return [
                    {
                        title: isEn ? 'Private Driver Chefchaouen' : 'Chauffeur Privé Chefchaouen',
                        desc: isEn ? 'Stress-free mountain transportation through the Rif region with experienced drivers.' : 'Transport serein à travers le Rif avec nos chauffeurs expérimentés.',
                        href: getPath('/private-driver-chefchaouen'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Fes to Chefchaouen Transfer' : 'Transfert Fès ⇄ Chefchaouen',
                        desc: isEn ? 'Direct door-to-door private transfer between Fes medina and Chefchaouen.' : 'Liaison directe porte-à-porte entre la médina de Fès et Chefchaouen.',
                        href: getPath('/transfers/fes-to-chefchaouen-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Chefchaouen Day Trip' : 'Excursion Privée Chefchaouen',
                        desc: isEn ? 'Full-day private guided trip exploring the blue-washed streets and viewpoints.' : 'Journée complète avec chauffeur pour explorer la ville bleue et ses panoramas.',
                        href: getPath('/tours/chefchaouen-day-trip'),
                        icon: 'compass'
                    }
                ];
            case 'agadir':
                return [
                    {
                        title: isEn ? 'Private Driver Agadir' : 'Chauffeur Privé Agadir',
                        desc: isEn ? 'Private vehicle and driver for Taghazout, Paradise Valley, and Atlantic coastal exploration.' : 'Véhicule avec chauffeur pour Taghazout, la Vallée du Paradis et la côte.',
                        href: getPath('/private-driver-agadir'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Agadir Airport Transfer (AGA)' : 'Transfert Aéroport Agadir Al Massira',
                        desc: isEn ? 'Fast, hassle-free private transfers to beachfront resorts and surf lodges.' : 'Navette rapide et confortable vers les complexes hôteliers et surf camps.',
                        href: getPath('/transfers/agadir-airport-transfer'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Marrakech to Agadir Transfer' : 'Transfert Marrakech ⇄ Agadir',
                        desc: isEn ? 'Express highway connection between Marrakech and the coastal resort of Agadir.' : 'Liaison autoroutière express entre Marrakech et la côte d\'Agadir.',
                        href: getPath('/transfers/marrakech-to-agadir-transfer'),
                        icon: 'compass'
                    }
                ];
            default:
                return [
                    {
                        title: isEn ? 'Private Driver Across Morocco' : 'Chauffeur Privé Partout au Maroc',
                        desc: isEn ? 'Certified English and French-speaking drivers with modern Mercedes-Benz vehicles.' : 'Chauffeurs professionnels bilingues avec véhicules Mercedes récents.',
                        href: getPath('/private-driver-morocco'),
                        icon: 'car'
                    },
                    {
                        title: isEn ? 'Morocco Airport Transfers' : 'Transferts Aéroport au Maroc',
                        desc: isEn ? 'Fixed-rate airport meet & greet across Casablanca, Marrakech, Rabat, and Fes.' : 'Navettes aéroport à prix fixe à Casablanca, Marrakech, Rabat et Fès.',
                        href: getPath('/airport-transfers'),
                        icon: 'plane'
                    },
                    {
                        title: isEn ? 'Multi-Day Guided Tours' : 'Circuits Guidés & Excursions',
                        desc: isEn ? 'Tailor-made private journeys through imperial cities, coastal gems, and the Sahara.' : 'Voyages privés sur mesure à travers les villes impériales et le désert.',
                        href: getPath('/tours'),
                        icon: 'compass'
                    }
                ];
        }
    };

    const relatedCommercialLinks = getRelatedCommercialLinks(focusCity.slug);
    let chefchaouenOrigin: string | undefined = undefined;
    if (routeInfo?.c1) {
        chefchaouenOrigin = routeInfo.c1[isEn ? 'en' : 'fr'];
    } else if (slug.includes('rabat')) {
        chefchaouenOrigin = 'Rabat';
    } else if (slug.includes('fes')) {
        chefchaouenOrigin = isEn ? 'Fes' : 'Fès';
    } else if (slug.includes('tangier')) {
        chefchaouenOrigin = isEn ? 'Tangier' : 'Tanger';
    } else if (slug.includes('casablanca')) {
        chefchaouenOrigin = 'Casablanca';
    }

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

    // Helper to format ISO date
    const toIsoDate = (d?: string) => {
        if (!d) return "2026-03-15";
        const parsed = Date.parse(d);
        if (!isNaN(parsed)) {
            return new Date(parsed).toISOString().split('T')[0];
        }
        const parts = d.trim().split(/\s+/);
        if (parts.length === 2) {
            const months: Record<string, string> = {
                january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
                july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
            };
            const m = months[parts[0].toLowerCase()];
            if (m) return `${parts[1]}-${m}-01`;
        }
        return "2026-03-15";
    };

    const isoPublishedDate = toIsoDate(date);

    // Article / BlogPosting Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": progPost ? progPost.seoDesc : title,
        "image": `https://mdinatours.com${image}`,
        "datePublished": isoPublishedDate,
        "dateModified": isoPublishedDate,
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

    const renderComparisonTable = (table: { headers: string[]; rows: string[][] }) => (
        <>
            <div className={styles.tableScrollHint}>
                <span>↔ {isEn ? "Scroll table horizontally" : "Faites défiler le tableau"}</span>
            </div>
            <div className={styles.comparisonTableWrapper}>
                <table className={styles.comparisonTable}>
                    <thead>
                        <tr>
                            {table.headers.map((h, i) => (
                                <th key={i}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.map((row, i) => {
                            const isUnavailable = row.some(c => 
                                c.toLowerCase().includes('not available') || 
                                c.toLowerCase().includes('non disponible') || 
                                c.toLowerCase().includes('no direct train') || 
                                c.toLowerCase().includes('aucune ligne') ||
                                c.toLowerCase().includes('n/a — no railway') ||
                                c.toLowerCase().includes('n/a — pas de voie')
                            );
                            return (
                                <tr key={i} className={isUnavailable ? styles.unavailableRow : ''}>
                                    {row.map((cell, j) => {
                                        if (isUnavailable && j === 0) {
                                            return (
                                                <td key={j}>
                                                    <div className={styles.optionWithBadge}>
                                                        <span>{cell.replace(/\s*\((?:Not Available|Non disponible)\)/i, '')}</span>
                                                        <span className={styles.unavailableBadge}>
                                                            {isEn ? "Not available" : "Non disponible"}
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        if (isUnavailable && j === 2) {
                                            return (
                                                <td key={j}>
                                                    <span className={styles.unavailablePrice}>{cell}</span>
                                                </td>
                                            );
                                        }
                                        return <td key={j}>{cell}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );

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
                                        {/* First Section: Heading and Route Overview (Immediate Value to Readers) */}
                                        {progPost.sections.length > 0 && (
                                            <section id={progPost.sections[0].id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.firstSectionTitle}>{progPost.sections[0].title}</h2>
                                                <div 
                                                    className={styles.sectionContent}
                                                    dangerouslySetInnerHTML={{ __html: progPost.sections[0].content }}
                                                />
                                                {progPost.sections[0].table && renderComparisonTable(progPost.sections[0].table)}
                                                {progPost.sections[0].list && (
                                                    <ul className={styles.bulletList}>
                                                        {progPost.sections[0].list.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </section>
                                        )}

                                        {/* Rome2Rio-Inspired Visual Route Quick Summary (Answer-First) */}
                                        {routeInfo && (
                                            <RouteQuickSummary
                                                language={language}
                                                origin={routeInfo.c1[isEn ? 'en' : 'fr']}
                                                destination={routeInfo.c2[isEn ? 'en' : 'fr']}
                                                distance={routeInfo.route.distance}
                                                carDuration={routeInfo.route.duration}
                                                carPrice={routeInfo.route.privatePrice}
                                                hasTrain={routeInfo.route.train}
                                                trainDuration={routeInfo.route.trainDuration}
                                                busDuration={slug.includes("chefchaouen") ? "5h 10m" : "5h 30m"}
                                                busPriceMAD={slug.includes("chefchaouen") ? 160 : 150}
                                                busPriceEUR={slug.includes("chefchaouen") ? 15 : 14}
                                                transferUrl={primaryTransferUrl}
                                            />
                                        )}

                                        {/* Fallback Notice for other Chefchaouen articles without routeInfo */}
                                        {!routeInfo && isChefchaouenRoute && (
                                            <ChefchaouenTrainNotice
                                                language={language}
                                                originCity={chefchaouenOrigin}
                                            />
                                        )}

                                        {/* Compact Quick-Navigation Jump Bar */}
                                        <div className={styles.toc}>
                                            <div className={styles.tocHeader}>
                                                <span className={styles.tocTitle}>{isEn ? "In this guide:" : "Dans ce guide :"}</span>
                                            </div>
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

                                        {/* Remaining Sections */}
                                        {progPost.sections.slice(1).map(section => (
                                            <section key={section.id} id={section.id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                                
                                                {/* Text Content */}
                                                <div 
                                                    className={styles.sectionContent}
                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                />

                                                {/* Optional Comparison Table */}
                                                {section.table && renderComparisonTable(section.table)}

                                                {/* Optional List */}
                                                {section.list && (
                                                    <ul className={styles.bulletList}>
                                                        {section.list.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </section>
                                        ))}

                                        {/* FAQs with Collapsible Accordions */}
                                        {progPost.faqs.length > 0 && (
                                            <section id="faqs" className={styles.faqSection} style={{ scrollMarginTop: '100px' }}>
                                                <h2>{isEn ? "Frequently Asked Questions" : "Questions Fréquentes"}</h2>
                                                <div className={styles.faqContainer}>
                                                    {progPost.faqs.map((faq, i) => (
                                                        <details key={i} className={styles.faqDetails} open={i === 0}>
                                                            <summary className={styles.faqSummary}>
                                                                <span>{faq.q}</span>
                                                                <ChevronDown className={styles.faqChevron} size={18} aria-hidden="true" />
                                                            </summary>
                                                            <div className={styles.faqAnswer}>
                                                                <p>{faq.a}</p>
                                                            </div>
                                                        </details>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Single Featured In-Article Route & Transfer Booking Card (Editorial Bottom Placement) */}
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
                                    </>
                                ) : (
                                    /* Render Standard Blog Post Paragraphs */
                                    <>
                                        {/* First Heading and Opening Paragraph */}
                                        {structuredSections.length > 0 && (
                                            <section id={structuredSections[0].id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.firstSectionTitle}>{structuredSections[0].title}</h2>
                                                <div className={styles.sectionContent}>
                                                    <p className={styles.paragraph}>{structuredSections[0].content}</p>
                                                </div>
                                            </section>
                                        )}

                                        {/* Compact Quick-Navigation Jump Bar */}
                                        <div className={styles.toc}>
                                            <div className={styles.tocHeader}>
                                                <span className={styles.tocTitle}>{isEn ? "In this guide:" : "Dans ce guide :"}</span>
                                            </div>
                                            <ul className={styles.tocList}>
                                                {tocList.map(item => (
                                                    <li key={item.id}>
                                                        <a href={`#${item.id}`}>{item.text}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Remaining Sections */}
                                        {structuredSections.slice(1).map(section => (
                                            <section key={section.id} id={section.id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                                <div className={styles.sectionContent}>
                                                    <p className={styles.paragraph}>{section.content}</p>
                                                </div>
                                            </section>
                                        ))}

                                        {/* Single Featured In-Article Route & Transfer Booking Card (Editorial Bottom Placement) */}
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
                                    </>
                                )}

                                {/* Contextual Commercial Services Linking Box */}
                                <section className={styles.relatedServicesSection}>
                                    <div className={styles.relatedServicesHeader}>
                                        <div className={styles.relatedServicesEyebrow}>
                                            {isEn ? "Travel Services & Chauffeurs" : "Services & Chauffeurs"}
                                        </div>
                                        <h3 className={styles.relatedServicesTitle}>
                                            {isEn 
                                                ? `Private Travel Services in ${focusCity.name}` 
                                                : `Services de Transport Privé à ${focusCity.name}`}
                                        </h3>
                                        <p className={styles.relatedServicesSubtitle}>
                                            {isEn
                                                ? `Pre-book fixed-rate transfers, airport greetings, and private day tours with professional chauffeurs.`
                                                : `Réservez vos transferts à tarif garanti, navettes aéroport et excursions avec chauffeur privé.`}
                                        </p>
                                    </div>
                                    <div className={styles.relatedServicesGrid}>
                                        {relatedCommercialLinks.map((service, idx) => (
                                            <Link key={idx} href={service.href} className={styles.relatedServiceCard}>
                                                <div className={styles.relatedServiceCardTop}>
                                                    <div className={styles.relatedServiceIconWrapper}>
                                                        {service.icon === 'car' && <Car size={18} strokeWidth={2} />}
                                                        {service.icon === 'plane' && <Plane size={18} strokeWidth={2} />}
                                                        {service.icon === 'compass' && <Compass size={18} strokeWidth={2} />}
                                                    </div>
                                                    <ArrowRight size={16} strokeWidth={2.5} className={styles.relatedServiceArrow} />
                                                </div>
                                                <h4 className={styles.relatedServiceCardTitle}>{service.title}</h4>
                                                <p className={styles.relatedServiceCardDesc}>{service.desc}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </section>

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
                                        <p className={styles.shareTitle}>{isEn ? 'Share this story' : 'Partager cet article'}</p>
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
                                    {targetedTransferPrice && (
                                        <div className={styles.sidebarGroupValueHelper}>
                                            {isEn
                                                ? `Up to 7 guests (~€${Math.round(targetedTransferPrice / 6)}/person for 6)`
                                                : `Jusqu'à 7 pers. (~${Math.round(targetedTransferPrice / 6)}€/pers. pour 6)`}
                                        </div>
                                    )}
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
                                        <li><Link href={getPath('/private-driver-morocco')}>{isEn ? 'Private Chauffeurs' : 'Chauffeurs Privés'}</Link></li>
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

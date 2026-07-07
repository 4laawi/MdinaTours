import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import styles from './BlogPost.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';
import { notFound } from 'next/navigation';
import { getProgrammaticPost, programmaticSlugs } from '@/lib/programmaticSeo';

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

        const sectionsMetadata = standardPostSections[postData.id as keyof typeof standardPostSections]?.[language] || [];
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
        { src: "/img2/agadir-marina.jpg", tag: "Agadir Marina", alt: "Agadir port view", keywords: ["agadir"] },
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
        { src: "/img2/vito-chaufeeur-privé.jpg", tag: "Private Chauffeur", alt: "Private driver service", keywords: ["driver", "transfer", "transport", "vito", "fleet", "luxury", "chauffeur"] },
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

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // WhatsApp Booking Link Builder
    const getWhatsAppUrl = (type: string, link: string) => {
        const msg = `Hello Mdina Tours,\nI read your article: "${title}".\nI am interested in booking a private ${type} for this route.\n\nPlease let me know availability.`;
        return `https://wa.me/212766816992?text=${encodeURIComponent(msg)}`;
    };

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
                "item": `https://mdinatours.com/${language}`
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

    return (
        <>
            <Header />
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
                                                        <h3>{section.title}</h3>
                                                        <div 
                                                            dangerouslySetInnerHTML={{ __html: section.content }} 
                                                            className={styles.ctaTextContainer} 
                                                        />
                                                        {section.ctaType === 'internal' ? (
                                                            <Link 
                                                                href={`/${lang}${section.ctaLink}`}
                                                                className={styles.ctaButton}
                                                            >
                                                                {section.ctaText || (isEn ? "View Details" : "Voir les détails")}
                                                            </Link>
                                                        ) : (
                                                            <a 
                                                                href={getWhatsAppUrl(section.ctaType || 'general', section.ctaLink || '/')}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={styles.ctaButton}
                                                            >
                                                                {isEn ? "Book via WhatsApp" : "Réserver via WhatsApp"}
                                                            </a>
                                                        )}
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
                                    /* Render Standard Blog Post Paragraphs with TOC and Sections */
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

                                        {/* Sections */}
                                        {structuredSections.map(section => (
                                            <section key={section.id} id={section.id} style={{ scrollMarginTop: '100px' }}>
                                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                                <div className={styles.sectionContent}>
                                                    <p className={styles.paragraph}>{section.content}</p>
                                                </div>
                                            </section>
                                        ))}
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
                                <div className={styles.sidebarWidget}>
                                    <h3>{isEn ? 'Plan Your Trip' : 'Planifiez Votre Voyage'}</h3>
                                    <p>{isEn ? 'Ready to experience the magic of Morocco first-hand? Let us be your driver.' : 'Prêt à vivre la magie du Maroc ? Laissez-nous vous guider.'}</p>
                                    <Link href={getPath('/contact')} className={styles.contactBtn}>
                                        Contact Mdina Tours
                                    </Link>
                                </div>

                                <div className={styles.sidebarWidget}>
                                    <h3>{isEn ? 'Our Services' : 'Nos Services'}</h3>
                                    <ul className={styles.widgetList}>
                                        <li><Link href={getPath('/private-driver')}>{isEn ? 'Private Chauffeurs' : 'Chauffeurs Privés'}</Link></li>
                                        <li><Link href={getPath('/tours')}>{isEn ? 'Custom Guided Tours' : 'Circuits sur Mesure'}</Link></li>
                                        <li><Link href={getPath('/blog/sahara-desert-tour-plan')}>{isEn ? 'Desert Adventures' : 'Expéditions Désert'}</Link></li>
                                        <li><Link href={getPath('/blog')}>{isEn ? 'City Excursions' : 'Excursions de Villes'}</Link></li>
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

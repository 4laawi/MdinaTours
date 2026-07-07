import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import styles from './Blog.module.css';
import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';
import { getProgrammaticPost, programmaticSlugs } from '@/lib/programmaticSeo';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Morocco Travel Blog & Guides | Mdina Tours' : 'Blog Voyage Maroc & Conseils | Mdina Tours';
    const description = isEn
        ? 'Read our latest travel guides about Morocco. Discover Rabat secrets, Sahara desert planning tips, and traditional cuisine insights.'
        : 'Lisez nos derniers guides de voyage sur le Maroc. Conseils pour visiter Rabat, le désert du Sahara et comprendre les traditions culinaires.';
    const url = `https://mdinatours.com/${lang}/blog`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en/blog',
                'fr': 'https://mdinatours.com/fr/blog',
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-marrakech.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Mdina Tours Blog',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-marrakech.webp'],
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    const blogPosts = [
        {
            id: 1,
            slug: 'rabat-travel-guide',
            title: t('blog_post_1_title'),
            excerpt: t('blog_post_1_excerpt'),
            image: "/img2/rabat-hassan-tour.jpg",
            date: "March 15, 2026",
            category: t('blog_post_1_category')
        },
        {
            id: 2,
            slug: 'sahara-desert-tour-plan',
            title: t('blog_post_2_title'),
            excerpt: t('blog_post_2_excerpt'),
            image: "/b-roll/activity-sahara-camel-riding-broll.webp",
            date: "March 10, 2026",
            category: t('blog_post_2_category')
        },
        {
            id: 3,
            slug: 'moroccan-architecture-guide',
            title: t('blog_post_3_title'),
            excerpt: t('blog_post_3_excerpt'),
            image: "/img2/fes_gate.jpg",
            date: "March 5, 2026",
            category: t('blog_post_3_category')
        },
        {
            id: 4,
            slug: 'moroccan-food-traditions',
            title: t('blog_post_4_title'),
            excerpt: t('blog_post_4_excerpt'),
            image: "/Traditional.webp",
            date: "February 28, 2026",
            category: t('blog_post_4_category')
        },
        {
            id: 5,
            slug: 'chefchaouen-blue-pearl-tips',
            title: t('blog_post_5_title'),
            excerpt: t('blog_post_5_excerpt'),
            image: "/hero-chefchaouen.webp",
            date: "February 20, 2026",
            category: t('blog_post_5_category')
        },
        {
            id: 6,
            slug: 'private-driver-morocco-guide',
            title: t('blog_post_6_title'),
            excerpt: t('blog_post_6_excerpt'),
            image: "/img2/private-vito-vans-3.webp",
            date: "February 15, 2026",
            category: t('blog_post_6_category')
        }
    ];

    // Load and append programmatic posts (avoiding any duplicate slugs like rabat-travel-guide)
    const programmaticPostsMapped = programmaticSlugs
        .filter(slug => !blogPosts.some(bp => bp.slug === slug))
        .map((slug, index) => {
            const prog = getProgrammaticPost(slug, language);
            if (!prog) return null;
            return {
                id: 100 + index,
                slug: prog.slug,
                title: prog.title,
                excerpt: prog.excerpt,
                image: prog.image,
                date: prog.date,
                category: prog.category
            };
        })
        .filter((post): post is NonNullable<typeof post> => post !== null);

    const allBlogPosts = [...blogPosts, ...programmaticPostsMapped];

    const galleryImages = [
        { src: "/b-roll/Tourists-in-marrakech.avif", alt: "Tourists exploring Marrakech medina", tag: "Marrakech" },
        { src: "/b-roll/activity-sahara-camel-riding-broll.webp", alt: "Camel trekking at sunset in Sahara", tag: "Sahara" },
        { src: "/b-roll/moroccan-family-urban.jpg", alt: "Moroccan local urban life", tag: "Culture" },
        { src: "/b-roll/vito-airoport-parking.jpg", alt: "Private Mercedes Vito airport transfer", tag: "Transport" },
        { src: "/b-roll/3-Mercedes-vito-airoport.jpg", alt: "Mercedes Vito Airport shuttle fleet", tag: "Fleet" },
        { src: "/img/Ait Benhaddou.jpg", alt: "UNESCO Kasbah Ait Benhaddou", tag: "Heritage" },
        { src: "/img/Essaouira.webp", alt: "Seaside views of historic Essaouira port", tag: "Essaouira" },
        { src: "/img/agafay.jpg", alt: "Stony Agafay desert sunset camp", tag: "Agafay" },
        { src: "/img/marrakech-tour.webp", alt: "Historic Marrakech tour streets", tag: "Marrakech" },
        { src: "/img/ouzoud waterfalls.jpg", alt: "Lush green Ouzoud Waterfalls", tag: "Nature" },
        { src: "/img2/Airport_Casablanca_Mohammed.webp", alt: "Casablanca Mohammed V Airport transfer", tag: "Airport" },
        { src: "/img2/Asilah-Morocco.jpg", alt: "Whitewashed streets of Asilah medina", tag: "Asilah" },
        { src: "/img2/Asilah_water.webp", alt: "Coast walls of ocean-side Asilah", tag: "Asilah" },
        { src: "/img2/Marrakech_atlas.jpg", alt: "Panoramic view of Atlas mountains from Marrakech", tag: "Atlas" },
        { src: "/img2/agadir-marina.jpg", alt: "Modern Agadir Marina and yachts", tag: "Agadir" },
        { src: "/img2/casablanca_MOSQUE.webp", alt: "Stunning Hassan II Mosque Casablanca", tag: "Casablanca" },
        { src: "/img2/fes_gate.jpg", alt: "Golden gates of Fes Royal Palace", tag: "Fes" },
        { src: "/img2/rabat-hassan-tour.jpg", alt: "Iconic Hassan Tower in Rabat capital", tag: "Rabat" },
        { src: "/img2/tangier_hero.webp", alt: "Aerial harbor view of Tangier", tag: "Tangier" },
        { src: "/img2/premium-chauffeur.jpg", alt: "Professional private chauffeur in Morocco", tag: "Chauffeur" }
    ];

    const isEn = language === 'en';
    const breadcrumbJsonLd = {
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
                "name": t('blog'),
                "item": `https://mdinatours.com/${language}/blog`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main>
                <PageBanner 
                    title={t('blog_banner_title')}
                    bgImage="/img/Morocco-trip-tour-hero02.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel={t('blog')}
                />

                <section className={styles.blogContent}>
                    <div className={styles.container}>
                        <div className={styles.blogGrid}>
                            {allBlogPosts.map(post => (
                                <article key={post.id} className={styles.blogCard}>
                                    <div className={styles.cardImageContainer}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className={styles.cardImage}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className={styles.categoryBadge}>{post.category}</div>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <span className={styles.postDate}>{post.date}</span>
                                        <h2 className={styles.postTitle}>{post.title}</h2>
                                        <p className={styles.excerpt}>{post.excerpt}</p>
                                        <Link href={getPath(`/blog/${post.slug}`)} className={styles.readMore}>
                                            {t('blog_read_more')} <span>→</span>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.gallerySection}>
                    <div className={styles.container}>
                        <div className={styles.galleryHeader}>
                            <h2 className={styles.galleryTitle}>
                                {isEn ? "Morocco in Photos" : "Le Maroc en Photos"}
                            </h2>
                            <p className={styles.gallerySubtitle}>
                                {isEn 
                                    ? "A visual journey through the locations we serve, our fleet, and local experiences."
                                    : "Un voyage visuel à travers nos destinations, notre flotte et les expériences locales."}
                            </p>
                        </div>
                        <div className={styles.galleryGrid}>
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className={styles.galleryItem}>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        className={styles.galleryImage}
                                    />
                                    <div className={styles.galleryOverlay}>
                                        <span className={styles.galleryTag}>{img.tag}</span>
                                        <p className={styles.galleryText}>{img.alt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

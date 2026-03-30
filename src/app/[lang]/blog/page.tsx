import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import styles from './Blog.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn ? 'Blog – ZahriTours | Morocco Travel News, Guides & Promo' : 'Blog – ZahriTours | Actualités Voyage au Maroc, Guides & Promos';
    const description = isEn
        ? 'Read our latest travel articles about Morocco. Discover hidden gems, desert adventures, and cultural guides for your next trip.'
        : 'Lisez nos derniers articles de voyage sur le Maroc. Découvrez les joyaux cachés, les aventures dans le désert et les guides culturels pour votre prochain voyage.';
    const url = `https://zahritours.com/${lang}/blog`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'ZahriTours',
            images: [
                {
                    url: 'https://zahritours.com/hero-marrakech.webp',
                    width: 1200,
                    height: 630,
                    alt: 'ZahriTours Blog',
                },
            ],
            locale: lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://zahritours.com/hero-marrakech.webp'],
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

    const blogPosts = [
        {
            id: 1,
            slug: 'tangier-city-stories',
            title: t('blog_post_1_title'),
            excerpt: t('blog_post_1_excerpt'),
            image: "/Tangier-Morocco-Photo.webp",
            date: "March 15, 2026",
            category: t('blog_post_1_category')
        },
        {
            id: 2,
            slug: 'sahara-desert-magic',
            title: t('blog_post_2_title'),
            excerpt: t('blog_post_2_excerpt'),
            image: "/hero-sahara.webp",
            date: "March 10, 2026",
            category: t('blog_post_2_category')
        },
        {
            id: 3,
            slug: 'marrakech-architecture-guide',
            title: t('blog_post_3_title'),
            excerpt: t('blog_post_3_excerpt'),
            image: "/hero-marrakech.webp",
            date: "March 5, 2026",
            category: t('blog_post_3_category')
        },
        {
            id: 4,
            slug: 'moroccan-cuisine-soul',
            title: t('blog_post_4_title'),
            excerpt: t('blog_post_4_excerpt'),
            image: "/Traditional.webp",
            date: "February 28, 2026",
            category: t('blog_post_4_category')
        },
        {
            id: 5,
            slug: 'chefchaouen-blue-pearl',
            title: t('blog_post_5_title'),
            excerpt: t('blog_post_5_excerpt'),
            image: "/hero-chefchaouen.webp",
            date: "February 20, 2026",
            category: t('blog_post_5_category')
        },
        {
            id: 6,
            slug: 'private-driver-morocco',
            title: t('blog_post_6_title'),
            excerpt: t('blog_post_6_excerpt'),
            image: "/hero-landscape-1.webp",
            date: "February 15, 2026",
            category: t('blog_post_6_category')
        }
    ];

    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    return (
        <>
            <Header />
            <main>
                {/* Blog semi-hero banner */}
                <section
                    className={styles.blogBanner}
                    style={{ backgroundImage: `url('/hero-marrakech.webp')` }}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.container}>
                        <div className={styles.column} style={{ maxWidth: '100%', flex: '1 1 auto' }}>
                            <div className={styles.contentWrapper}>
                                <div className={styles.breadcrumbWrapper}>
                                    <ul className={styles.breadcrumbList}>
                                        <li className={styles.breadcrumbItem}>
                                            <Link href={getPath('/')} className={styles.breadcrumbLink}>{t('home')}</Link>
                                        </li>
                                        <li className={styles.breadcrumbItem}>
                                            <span className={styles.breadcrumbIcon}>
                                                <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
                                                </svg>
                                            </span>
                                            <span>{t('blog')}</span>
                                        </li>
                                    </ul>
                                </div>
                                <h1 className={styles.title}>{t('blog_banner_title')}</h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog content section */}
                <section className={styles.blogContent}>
                    <div className={styles.container}>
                        <div className={styles.blogGrid}>
                            {blogPosts.map(post => (
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
                                        <h3 className={styles.postTitle}>{post.title}</h3>
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
            </main>
            <Footer />
            <FloatingElements />
        </>
    );
}

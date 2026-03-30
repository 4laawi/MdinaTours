import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import styles from './BlogPost.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const language = (lang as Language) || 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const blogPosts = [
        { id: 1, slug: 'tangier-city-stories' },
        { id: 2, slug: 'sahara-desert-magic' },
        { id: 3, slug: 'marrakech-architecture-guide' },
        { id: 4, slug: 'moroccan-cuisine-soul' },
        { id: 5, slug: 'chefchaouen-blue-pearl' },
        { id: 6, slug: 'private-driver-morocco' }
    ];

    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
        return { title: 'Post Not Found - ZahriTours' };
    }

    const title = t(`blog_post_${post.id}_title`);
    const excerpt = t(`blog_post_${post.id}_excerpt`);

    return {
        title: `${title} – ZahriTours`,
        description: excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const language = (lang as Language) || 'en';
    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const blogPosts = [
        { id: 1, slug: 'tangier-city-stories', image: "/Tangier-Morocco-Photo.webp", date: "March 15, 2026" },
        { id: 2, slug: 'sahara-desert-magic', image: "/hero-sahara.webp", date: "March 10, 2026" },
        { id: 3, slug: 'marrakech-architecture-guide', image: "/hero-marrakech.webp", date: "March 5, 2026" },
        { id: 4, slug: 'moroccan-cuisine-soul', image: "/Traditional.webp", date: "February 28, 2026" },
        { id: 5, slug: 'chefchaouen-blue-pearl', image: "/hero-chefchaouen.webp", date: "February 20, 2026" },
        { id: 6, slug: 'private-driver-morocco', image: "/hero-landscape-1.webp", date: "February 15, 2026" }
    ];

    const postData = blogPosts.find(p => p.slug === slug);

    if (!postData) {
        notFound();
    }

    const title = t(`blog_post_${postData.id}_title`);
    const content = t(`blog_post_${postData.id}_content`);
    const category = t(`blog_post_${postData.id}_category`);

    if (title === `blog_post_${postData.id}_title`) {
        notFound();
    }

    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // Split content by paragraphs
    const paragraphs = content.split('\n\n');

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero section for individual post */}
                <section className={styles.postHero}>
                    <div className={styles.heroBackground}>
                        <Image
                            src={postData.image}
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
                                <span className={styles.date}>{postData.date}</span>
                                <span className={styles.dot}>•</span>
                                <span className={styles.author}>By ZahriTours</span>
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
                                {paragraphs.map((p, idx) => (
                                    <p key={idx} className={styles.paragraph}>{p}</p>
                                ))}

                                <div className={styles.postFooter}>
                                    <div className={styles.shareSection}>
                                        <h4>Share this story</h4>
                                        <div className={styles.shareLinks}>
                                            <button className={styles.shareBtn}>WhatsApp</button>
                                            <button className={styles.shareBtn}>Facebook</button>
                                            <button className={styles.shareBtn}>Copy Link</button>
                                        </div>
                                    </div>

                                    <div className={styles.navigation}>
                                        <Link href={getPath('/blog')} className={styles.backLink}>
                                            ← Back to Blog
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <aside className={styles.sidebar}>
                                <div className={styles.sidebarWidget}>
                                    <h3>Plan Your Trip</h3>
                                    <p>Ready to experience the magic of Morocco first-hand? Let us be your guide.</p>
                                    <Link href={getPath('/contact')} className={styles.contactBtn}>
                                        Contact ZahriTours
                                    </Link>
                                </div>

                                <div className={styles.sidebarWidget}>
                                    <h3>Our Services</h3>
                                    <ul className={styles.widgetList}>
                                        <li>Private Chauffeurs</li>
                                        <li>Custom Guided Tours</li>
                                        <li>Desert Adventures</li>
                                        <li>City Excursions</li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
            <FloatingElements />
        </>
    );
}

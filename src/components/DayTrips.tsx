import Image from 'next/image';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';
import styles from './TourGrid.module.css';

export default function DayTrips({ lang = 'en' }: { lang?: Language }) {
    const t = (key: string) => {
        const langSection = translations[lang] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${lang}${path === '/' ? '' : path}`;

    const dayTrips = [
        {
            id: 1,
            title: t('activity_1_title'),
            description: t('activity_1_desc'),
            image: '/camel_riding.png',
            duration: '2-3 Hours',
            rating: 5.0,
            reviews: 148,
            price: '31',
            badge: 'Most Popular'
        },
        {
            id: 2,
            title: t('activity_2_title'),
            description: t('activity_2_desc'),
            image: '/quad_biking.png',
            duration: '2 Hours',
            rating: 4.9,
            reviews: 96,
            price: '56',
            badge: 'Top Choice'
        },
        {
            id: 3,
            title: t('activity_3_title'),
            description: t('activity_3_desc'),
            image: '/medina.jpg',
            duration: '2-4 Hours',
            rating: 5.0,
            reviews: 84,
            price: '37',
            badge: 'Cultural Heritage'
        }
    ];

    return (
        <section id="activities" className={styles.tourGridSection} style={{
            backgroundColor: '#ffffff',
            paddingTop: '120px',
            paddingBottom: '120px'
        }}>
            <div className="container">
                <div className={styles.intro}>
                    <div className={styles.subtitle}>{t('daytrips_subtitle')}</div>
                    <h2 className="section-title" style={{ fontSize: '2.8rem' }}>{t('daytrips_title')}</h2>
                    <p className={styles.description}>
                        {t('daytrips_desc')}
                    </p>
                </div>

                <div className={styles.grid}>
                    {dayTrips.map(trip => (
                        <div key={trip.id} className={styles.card} style={{ border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={trip.image}
                                    alt={trip.title}
                                    fill
                                    className={styles.tourImage}
                                    style={{ transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '50%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                                    zIndex: 1
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    color: 'var(--accent)',
                                    padding: '6px 14px',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    zIndex: 2,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {trip.badge}
                                </div>
                            </div>

                            <div className={styles.content} style={{ padding: '32px' }}>
                                <div className={styles.infoBar}>
                                    <span className={styles.duration} style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                        <svg className={styles.svgIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {trip.duration}
                                    </span>
                                    <div className={styles.ratingStars}>
                                        <span className={styles.star}>★</span>
                                        <span className={styles.ratingValue}>{trip.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <h3 className={styles.title} style={{ marginBottom: '15px', color: '#1a1a1a' }}>{trip.title}</h3>
                                <p className={styles.tourDescription} style={{ fontSize: '1rem', color: '#666', marginBottom: '10px', height: 'auto', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {trip.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '80px' }}>
                    <div style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <p style={{ color: '#666', fontStyle: 'italic', fontSize: '1.1rem' }}>
                            {t('still_questions_desc')}
                        </p>
                        <Link href={getPath('/contact')} className={styles.bookBtn} style={{
                            padding: '18px 48px',
                            fontSize: '1.1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: '#1a1a1a', // Sleek black button
                            color: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                            transition: 'all 0.4s ease'
                        }}>
                            {t('all_activities_btn')}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import Link from 'next/link';
import styles from './PageBanner.module.css';

interface PageBannerProps {
    title: string;
    subtitle?: string;
    bgImage: string;
    homeLabel?: string;
    homeLink?: string;
    currentLabel: string;
}

export default function PageBanner({
    title,
    subtitle,
    bgImage,
    homeLabel = 'Home',
    homeLink = '/',
    currentLabel,
}: PageBannerProps) {
    return (
        <section
            className={styles.banner}
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.breadcrumbWrapper}>
                            <ul className={styles.breadcrumbList}>
                                <li className={styles.breadcrumbItem}>
                                    <Link href={homeLink} className={styles.breadcrumbLink}>{homeLabel}</Link>
                                </li>
                                <li className={styles.breadcrumbItem}>
                                    <span className={styles.breadcrumbIcon}>
                                        <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
                                        </svg>
                                    </span>
                                    <span>{currentLabel}</span>
                                </li>
                            </ul>
                        </div>
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}

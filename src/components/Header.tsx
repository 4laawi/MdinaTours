"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { language, t } = useLanguage();
    const isEn = language === 'en';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to get localized path
    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    const isActive = (path: string) => {
        const localizedPath = getPath(path);
        if (path === '/' && (pathname === `/${language}` || pathname === `/${language}/`)) return true;
        if (path !== '/' && pathname.startsWith(localizedPath)) return true;
        return false;
    };

    const handleLanguageSwitch = (newLang: 'en' | 'fr') => {
        if (newLang === language) return;

        // Replace the language segment in the current pathname
        const segments = pathname.split('/');
        segments[1] = newLang; // segments[0] is empty string
        const newPath = segments.join('/');
        router.push(newPath);
    };

    // Close menu when pathname changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll and toggle global class when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('mobile-menu-open');
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={`${styles.header} ${isMenuOpen ? styles.headerActive : ''}`}>
            <div className={`container ${styles.navInner}`}>
                <Link href={getPath('/')} className={styles.logo}>
                    <Image
                        src="/ZahriTours-Logo.png"
                        alt="ZahriTours Logo"
                        width={300}
                        height={100}
                        className={styles.logoImage}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.navPill}>
                    <Link
                        href={getPath('/')}
                        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                    >
                        {t('home')}
                    </Link>
                    <Link
                        href={getPath('/blog')}
                        className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}
                    >
                        {t('blog')}
                    </Link>
                    <Link
                        href={getPath('/partners')}
                        className={`${styles.navLink} ${isActive('/partners') ? styles.active : ''}`}
                    >
                        {t('partners')}
                    </Link>
                    <Link
                        href={getPath('/contact')}
                        className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
                    >
                        {t('contact')}
                    </Link>
                </nav>

                <div className={styles.rightAction}>
                    <Link href={getPath('/contact')} className={styles.contactBtn}>
                        {t('contact_us')} <span className={styles.arrow}>→</span>
                    </Link>
                </div>

                <div className={styles.mobileToggle}>
                    <button
                        className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ''}`}>
                <div className={styles.mobileMenuContent}>
                    <nav className={styles.mobileNav}>
                        <Link
                            href={getPath('/')}
                            className={`${styles.mobileNavLink} ${isActive('/') ? styles.mobileActive : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href={getPath('/blog')}
                            className={`${styles.mobileNavLink} ${isActive('/blog') ? styles.mobileActive : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('blog')}
                        </Link>
                        <Link
                            href={getPath('/partners')}
                            className={`${styles.mobileNavLink} ${isActive('/partners') ? styles.mobileActive : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('partners')}
                        </Link>
                        <Link
                            href={getPath('/contact')}
                            className={styles.mobileContactBtn}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('contact_us')}
                        </Link>
                    </nav>

                    <div className={styles.mobileLangSwitcher}>
                        <button
                            onClick={() => handleLanguageSwitch('en')}
                            className={`${styles.langText} ${isEn ? styles.activeLang : ''}`}
                        >
                            EN
                        </button>
                        <span className={styles.langSeparator}>/</span>
                        <button
                            onClick={() => handleLanguageSwitch('fr')}
                            className={`${styles.langText} ${!isEn ? styles.activeLang : ''}`}
                        >
                            FR
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.langBtnContainer}>
                <button
                    onClick={() => handleLanguageSwitch('en')}
                    className={`${styles.langText} ${isEn ? styles.activeLang : ''}`}
                    aria-label="English"
                >
                    EN
                </button>
                <span className={styles.langSeparator}>/</span>
                <button
                    onClick={() => handleLanguageSwitch('fr')}
                    className={`${styles.langText} ${!isEn ? styles.activeLang : ''}`}
                    aria-label="Français"
                >
                    FR
                </button>
            </div>
        </header>
    );
}

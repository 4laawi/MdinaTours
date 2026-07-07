"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    lightBg?: boolean;
}

export default function Header({ lightBg = false }: HeaderProps) {
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

    // Navigation configuration
    const navItems = [
        { path: '/', label: t('home') },
        { path: '/tours', label: isEn ? 'Tours' : 'Circuits' },
        { path: '/transfers', label: isEn ? 'Transfers' : 'Transferts' },
        { path: '/private-driver', label: isEn ? 'Private Driver' : 'Chauffeur Privé' },
        { path: '/faq', label: 'FAQ' },
        { path: '/blog', label: t('blog') },
        { path: '/about', label: isEn ? 'About Us' : 'À Propos' },
    ];

    return (
        <header className={`${styles.header} ${isMenuOpen ? styles.headerActive : ''} ${lightBg ? styles.lightBg : ''}`}>
            <div className={`container ${styles.navInner}`}>
                <Link href={getPath('/')} className={styles.logo} aria-label="Mdina Tours Homepage">
                    <svg viewBox="0 0 280 80" width="180" height="50" className={styles.logoSvg}>
                        <g transform="translate(10, 15)">
                            <path d="M25 5 C15 5 10 15 10 25 L10 45 L40 45 L40 25 C40 15 35 5 25 5 Z" fill="none" stroke="#dc834e" strokeWidth="2.5" />
                            <path d="M25 10 C18 10 15 18 15 25 L15 40 L35 40 L35 25 C35 18 32 10 25 10 Z" fill="#dc834e" opacity="0.15" />
                            <polygon points="25,20 28,26 34,26 29,30 31,36 25,32 19,36 21,30 16,26 22,26" fill="#dc834e" />
                        </g>
                        <text x="65" y="38" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="bold" fill="#202f59" letterSpacing="1">Mdina</text>
                        <text x="65" y="58" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="600" fill="#dc834e" letterSpacing="4.5">TOURS</text>
                    </svg>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.navPill}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={getPath(item.path)}
                            className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
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
                        aria-label="Toggle navigation menu"
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
                        {navItems.map((item) => (
                            <Link
                                key={`mobile-${item.path}`}
                                href={getPath(item.path)}
                                className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.mobileActive : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
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
                    aria-label="Switch to English"
                >
                    EN
                </button>
                <span className={styles.langSeparator}>/</span>
                <button
                    onClick={() => handleLanguageSwitch('fr')}
                    className={`${styles.langText} ${!isEn ? styles.activeLang : ''}`}
                    aria-label="Passer au Français"
                >
                    FR
                </button>
            </div>
        </header>
    );
}

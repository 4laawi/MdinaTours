"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { isSpanishSupported } from '@/lib/seo';
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
    const isEs = language === 'es';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to get localized path
    const getPath = (path: string) => {
        if (language === 'es' && path === '/private-driver') {
            return '/es/private-driver-morocco';
        }
        if (language === 'en' && path === '/') {
            return '/';
        }
        return `/${language}${path === '/' ? '' : path}`;
    };

    const isActive = (path: string) => {
        const localizedPath = getPath(path);
        if (path === '/') {
            if (language === 'en') {
                return pathname === '/' || pathname === '/en' || pathname === '/en/';
            }
            return pathname === `/${language}` || pathname === `/${language}/`;
        }
        if (path !== '/' && pathname.startsWith(localizedPath)) return true;
        return false;
    };

    const handleLanguageSwitch = (newLang: Language) => {
        if (newLang === language) return;

        const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/en/' || pathname === '/fr' || pathname === '/fr/' || pathname === '/es' || pathname === '/es/';
        if (isHomePage) {
            if (newLang === 'en') {
                router.push('/');
            } else {
                router.push(`/${newLang}`);
            }
            return;
        }

        // Replace the language segment in the current pathname
        const segments = pathname.split('/');
        const pathWithoutLang = '/' + segments.slice(2).join('/');
        const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;

        if (newLang === 'es' && !isSpanishSupported(cleanPath)) {
            router.push('/es');
            return;
        }

        if (newLang === 'en') {
            router.push(`/en${cleanPath}`);
        } else {
            router.push(`/${newLang}${cleanPath}`);
        }
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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.classList.remove('mobile-menu-open');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

    // Primary mobile navigation items
    const primaryNavItems = [
        { path: '/', label: t('home') },
        { path: '/tours', label: isEn ? 'Tours' : (isEs ? 'Excursiones' : 'Circuits') },
        { path: '/transfers', label: isEn ? 'Transfers' : (isEs ? 'Traslados' : 'Transferts') },
        { path: '/private-driver-morocco', label: isEn ? 'Private Driver' : (isEs ? 'Chófer Privado' : 'Chauffeur Privé') },
    ];

    const moreNavItems = [
        { path: '/about', label: isEn ? 'About Us' : (isEs ? 'Sobre Nosotros' : 'À Propos') },
        { path: '/faq', label: 'FAQ' },
        ...(language === 'es' ? [] : [{ path: '/blog', label: t('blog') }]),
    ];

    const isMoreActive = moreNavItems.some((item) => isActive(item.path));

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
                        <text x="65" y="38" fontFamily="'Cormorant Garamond', serif" fontSize="26" fontWeight="bold" fill="#202f59" className={styles.logoTextMain} letterSpacing="1">Mdina</text>
                        <text x="65" y="58" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="600" fill="#dc834e" letterSpacing="4.5">TOURS</text>
                    </svg>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.navPill}>
                    {primaryNavItems.map((item) => (
                        <Link
                            key={item.path}
                            href={getPath(item.path)}
                            className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href={getPath('/contact')}
                        className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
                    >
                        {t('contact_us')}
                    </Link>

                    {/* More Dropdown */}
                    <div
                        className={styles.dropdownContainer}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button
                            className={`${styles.navLink} ${styles.dropdownTrigger} ${isMoreActive ? styles.active : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-expanded={isDropdownOpen}
                        >
                            {isEn ? 'More' : (isEs ? 'Más' : 'Plus')}
                            <span className={`${styles.dropdownChevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}>▾</span>
                        </button>
                        {isDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {moreNavItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={getPath(item.path)}
                                        className={`${styles.dropdownItem} ${isActive(item.path) ? styles.dropdownItemActive : ''}`}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                <div className={styles.rightAction}>
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
                            className={`${styles.langText} ${language === 'fr' ? styles.activeLang : ''}`}
                            aria-label="Passer au Français"
                        >
                            FR
                        </button>
                        <span className={styles.langSeparator}>/</span>
                        <button
                            onClick={() => handleLanguageSwitch('es')}
                            className={`${styles.langText} ${isEs ? styles.activeLang : ''}`}
                            aria-label="Cambiar a Español"
                        >
                            ES
                        </button>
                    </div>
                </div>

                <div className={styles.mobileToggle}>
                    <button
                        className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation"
            >
                <div className={styles.mobileMenuContent}>
                    {/* Top Language Switcher: Visible, accessible, safe from phone bottom buttons */}
                    <div className={styles.mobileLangSwitcher} role="group" aria-label="Select Language">
                        <button
                            onClick={() => handleLanguageSwitch('en')}
                            className={`${styles.mobileLangBtn} ${isEn ? styles.mobileActiveLang : ''}`}
                            aria-label="Switch to English"
                            aria-pressed={isEn}
                        >
                            EN
                        </button>
                        <span className={styles.mobileLangSeparator}>/</span>
                        <button
                            onClick={() => handleLanguageSwitch('fr')}
                            className={`${styles.mobileLangBtn} ${language === 'fr' ? styles.mobileActiveLang : ''}`}
                            aria-label="Passer au Français"
                            aria-pressed={language === 'fr'}
                        >
                            FR
                        </button>
                        <span className={styles.mobileLangSeparator}>/</span>
                        <button
                            onClick={() => handleLanguageSwitch('es')}
                            className={`${styles.mobileLangBtn} ${isEs ? styles.mobileActiveLang : ''}`}
                            aria-label="Cambiar a Español"
                            aria-pressed={isEs}
                        >
                            ES
                        </button>
                    </div>

                    {/* Centered Navigation Links with exact design & feel */}
                    <nav className={styles.mobileNav} aria-label="Mobile Navigation Links">
                        {primaryNavItems.map((item) => (
                            <Link
                                key={`mobile-${item.path}`}
                                href={getPath(item.path)}
                                className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.mobileActive : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                                aria-current={isActive(item.path) ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Grouped Secondary Links: Clean expandable MORE group */}
                        <div className={styles.mobileMoreGroup}>
                            <button
                                type="button"
                                className={`${styles.mobileNavLink} ${styles.mobileMoreTrigger} ${isMoreActive ? styles.mobileActive : ''}`}
                                onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
                                aria-expanded={isMobileMoreOpen}
                            >
                                <span>{isEn ? 'MORE' : (isEs ? 'MÁS' : 'PLUS')}</span>
                                <span className={`${styles.mobileMoreChevron} ${isMobileMoreOpen ? styles.moreChevronOpen : ''}`}>
                                    ▾
                                </span>
                            </button>

                            {isMobileMoreOpen && (
                                <div className={styles.mobileMoreSubmenu}>
                                    {moreNavItems.map((item) => (
                                        <Link
                                            key={`mobile-more-${item.path}`}
                                            href={getPath(item.path)}
                                            className={`${styles.mobileSubLink} ${isActive(item.path) ? styles.mobileSubActive : ''}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* White Contact Us Pill Button */}
                        <Link
                            href={getPath('/contact')}
                            className={styles.mobileContactBtn}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('contact_us')}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

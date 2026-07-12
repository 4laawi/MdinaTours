import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import DayTrips from '@/components/DayTrips';
import Destinations from '@/components/Destinations';
import MdinaToursSection from '@/components/MdinaToursSection';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Language } from '@/lib/translations';
import PrivateDriverFleet from '@/components/PrivateDriverFleet';
import WhatTravelersSay from '@/components/WhatTravelersSay';

// Client components with state/interactive elements
const TourGrid = dynamic(() => import('@/components/TourGrid'));
const FloatingElements = dynamic(() => import('@/components/FloatingElements'));

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';

    const title = isEn 
        ? 'Mdina Tours | Private Morocco Tours & Premium Transfers' 
        : 'Mdina Tours | Circuits Privés & Transferts Premium au Maroc';
    const description = isEn
        ? 'Book luxury private driver services, intercity transfers, and expert-guided Morocco tours from Rabat, Casablanca, Marrakech, and Tangier. Pay cash on arrival.'
        : 'Réservez votre chauffeur privé, transferts interurbains et circuits sur mesure au Maroc. Véhicules confortables, chauffeurs bilingues, paiement sur place.';
    const url = `https://mdinatours.com/${lang}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://mdinatours.com/en',
                'fr': 'https://mdinatours.com/fr',
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
                    alt: 'Mdina Tours Morocco Private Tours',
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

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';

    const vehicles = [
        {
            name: isEn ? "Skoda Superb" : "Skoda Superb",
            spec: isEn ? "Premium Sedan" : "Berline Premium",
            capacity: "1-3 PAX",
            luggage: "3 Bags",
            suitability: isEn ? "A quiet, highly comfortable sedan perfect for executive transfers, couples, or business meetings." : "Une berline silencieuse et très confortable, idéale pour les voyages d'affaires ou les couples.",
            price: "€20",
            image: "/cars/flotte-superb.webp"
        },
        {
            name: isEn ? "Skoda Kodiaq" : "Skoda Kodiaq",
            spec: isEn ? "Comfort SUV" : "SUV Grand Confort",
            capacity: "1-5 PAX",
            luggage: "4 Bags",
            suitability: isEn ? "A premium mid-size SUV offering high ground clearance, excellent stability for mountain roads, and spacious comfort." : "Un SUV familial haut de gamme offrant une excellente garde au sol, une stabilité parfaite pour l'Atlas.",
            price: "€22",
            image: "/cars/flotte-skoda-kodiaq.webp"
        },
        {
            name: isEn ? "Fiat Scudo" : "Fiat Scudo",
            spec: isEn ? "VIP Van" : "Van VIP",
            capacity: "1-6 PAX",
            luggage: "5 Bags",
            suitability: isEn ? "A modern, highly versatile people mover. Offers excellent value for family trips and group excursions." : "Un monospace moderne et très polyvalent. Excellent rapport qualité-prix pour les voyages en famille.",
            price: "€25",
            image: "/cars/flotte-fiat-scudo.webp"
        },
        {
            name: isEn ? "Mercedes Vito" : "Mercedes Vito",
            spec: isEn ? "VIP Minivan" : "Minivan VIP",
            capacity: "1-7 PAX",
            luggage: "6 Bags",
            suitability: isEn ? "The absolute gold standard for tourist travel in Morocco. Features individual air-con vents and spacious luggage room." : "La référence absolue pour le voyage au Maroc. Aérateurs individuels et immense coffre à bagages.",
            price: "€28",
            image: "/cars/flotte-vito.webp"
        },
        {
            name: isEn ? "Mercedes Sprinter" : "Mercedes Sprinter",
            spec: isEn ? "VIP Minibus" : "Minibus Prestige",
            capacity: "8-16 PAX",
            luggage: "12 Bags",
            suitability: isEn ? "A custom-configured executive minibus designed for large tour groups, corporate delegates, or multi-family excursions." : "Un minibus de prestige configuré sur mesure, conçu pour les délégations professionnelles et les grands groupes.",
            price: "€35",
            image: "/cars/flotte-sprinter.webp"
        }
    ];

    const faqList = [
        {
            q: isEn ? "How do I book a transfer or tour with Mdina Tours?" : "Comment réserver un transfert ou un circuit ?",
            a: isEn ? "You can book directly using our website forms or click to contact us instantly on WhatsApp. We send booking confirmations in minutes."
                    : "Vous pouvez réserver directement via nos formulaires ou en nous contactant par WhatsApp. Nous vous confirmons la réservation en quelques minutes."
        },
        {
            q: isEn ? "Are all tours and transfers private?" : "Les trajets sont-ils partagés ou privés ?",
            a: isEn ? "Yes, all our services are 100% private. Your vehicle, driver, and guides are dedicated exclusively to your group."
                    : "Tous nos services sont 100% privés. Le véhicule et le chauffeur sont entièrement dédiés à votre groupe."
        },
        {
            q: isEn ? "Do we need to pay anything upfront?" : "Doit-on payer à l'avance ?",
            a: isEn ? "No. We believe in building trust. You do not need to prepay; you pay your driver in cash (Euros or Dirhams) upon arrival or completion."
                    : "Non. Nous croyons en une relation de confiance. Vous réglez directement le chauffeur en espèces (Euros ou Dirhams) à la fin de votre trajet."
        },
        {
            q: isEn ? "What languages do your drivers speak?" : "Quelles langues parlent vos chauffeurs ?",
            a: isEn ? "Our drivers are multilingual and speak English, French, and Spanish fluently to ensure a comfortable journey."
                    : "Nos chauffeurs professionnels parlent couramment français, anglais et espagnol pour faciliter votre voyage."
        },
        {
            q: isEn ? "Can we customize the routes or add stops?" : "Peut-on faire des arrêts pendant le trajet ?",
            a: isEn ? "Absolutely. As a custom travel agency, we encourage customization. Let your driver know if you want to stop for coffee, photos, or points of interest."
                    : "Bien sûr. Nos transferts privés offrent une flexibilité totale. N'hésitez pas à demander à votre chauffeur des pauses photos ou café."
        },
        {
            q: isEn ? "Is child safety seating provided?" : "Les sièges enfants sont-ils fournis ?",
            a: isEn ? "Yes. We provide child car seats and infant seats free of charge. Please mention this requirement in the booking form notes."
                    : "Oui. Nous mettons gratuitement à votre disposition des sièges auto et rehausseurs. Veuillez simplement l'indiquer dans votre demande."
        }
    ];

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isEn ? "Home" : "Accueil",
                "item": `https://mdinatours.com/${language}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main>
                <Hero />
                <Services lang={language} />
                <TourGrid />
                <FAQ lang={language} />
                <DayTrips lang={language} />
                <PrivateDriverFleet vehicles={vehicles} lang={language} showBottomDivider={true} />
                <WhatTravelersSay lang={language} />
                <Destinations lang={language} />
                <MdinaToursSection lang={language} />
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}


import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const title = isEn 
        ? 'About Mdina Tours | Private Transfers, Drivers & Custom Trips in Morocco' 
        : isEs
        ? 'Acerca de Mdina Tours | Chófer Privado y Viajes a Medida en Marruecos'
        : 'À Propos de Mdina Tours | Transferts Privés et Chauffeur au Maroc';
    
    const description = isEn
        ? 'Mdina Tours is a Morocco-based private transfer and custom trip service run from Rabat. Vetted English-speaking drivers in comfortable Mercedes vehicles with zero upfront deposit.'
        : isEs
        ? 'Mdina Tours es un servicio de traslados privados y viajes a medida en Marruecos desde Rabat. Conductores profesionales, vehículos Mercedes y pago al final del día sin depósito previo.'
        : 'Mdina Tours est un service de transferts privés et circuits sur mesure au Maroc depuis Rabat. Chauffeurs professionnels, véhicules Mercedes confortables et paiement en fin de journée sans acompte.';

    const url = `https://mdinatours.com/${lang}/about`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/about'),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-landscape-2.webp',
                    width: 1200,
                    height: 630,
                    alt: 'About Mdina Tours Morocco',
                },
            ],
            locale: lang === 'es' ? 'es_ES' : lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-landscape-2.webp'],
        },
    };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const isEs = language === 'es';

    const getPath = (path: string) => (language === 'en' && path === '/' ? '/' : `/${language}${path === '/' ? '' : path}`);

    // Multilingual Content Mapping
    const content = {
        badge: isEn ? 'ABOUT MDINA TOURS' : isEs ? 'ACERCA DE MDINA TOURS' : 'À PROPOS DE MDINA TOURS',
        heroSubtitle: isEn 
            ? 'Private transfers, drivers, and custom trips across Morocco, built by someone who has worked inside the industry.'
            : isEs
            ? 'Traslados privados, conductores y rutas a medida por Marruecos, creados por profesionales del sector.'
            : 'Transferts privés, chauffeurs et circuits sur mesure à travers le Maroc, créés par un passionné du terrain.',
        
        introP1: isEn
            ? "Mdina Tours is a Morocco-based private transfer and custom trip service, run from Rabat. We help visitors from Europe and North America get around Morocco comfortably, whether it's an airport pickup or a multi-day journey from Casablanca to the Sahara."
            : isEs
            ? "Mdina Tours es un servicio de traslados privados y viajes a medida en Marruecos, gestionado desde Rabat. Ayudamos a viajeros de Europa y América a recorrer Marruecos con total confort, desde una recogida en el aeropuerto hasta una ruta de varios días de Casablanca al Sahara."
            : "Mdina Tours est un service de transport privé et de circuits sur mesure basé au Maroc, géré depuis Rabat. Nous aidons les voyageurs d'Europe et d'Amérique du Nord à explorer le Maroc dans un confort absolu, qu'il s'agisse d'un accueil à l'aéroport ou d'un voyage de plusieurs jours de Casablanca jusqu'au Sahara.",
        
        introP2: isEn
            ? "Every trip is handled by a professional, English-speaking driver in a comfortable, air-conditioned Mercedes, and we only work with drivers, guides, and riad hosts we've personally vetted. You deal with one team from your first message to your drop-off, and we're on WhatsApp throughout your trip if you need anything."
            : isEs
            ? "Cada trayecto es atendido por un conductor profesional en cómodos vehículos Mercedes con aire acondicionado. Trabajamos exclusivamente con conductores, guías y riads rigurosamente verificados. Cuenta con un único equipo de contacto desde el primer mensaje hasta el final de su viaje, con soporte continuo por WhatsApp."
            : "Chaque trajet est assuré par un chauffeur professionnel dans un véhicule Mercedes climatisé et spacieux. Nous travaillons exclusivement avec des chauffeurs, guides et riads soigneusement sélectionnés. Vous échangez avec une seule équipe de votre premier message jusqu'à votre destination finale, avec une assistance continue sur WhatsApp.",
        
        payCardTitle: isEn ? "Pay After Each Day — Zero Upfront Deposit" : isEs ? "Pague al Final de Cada Día — Sin Depósito Previo" : "Paiement en Fin de Journée — Aucun Acompte Exigé",
        payCardText: isEn
            ? "You don't pay upfront. You pay at the end of each day's journey, once you're already on the road with your driver."
            : isEs
            ? "No paga nada por adelantado. Paga al final de cada jornada de viaje, una vez en ruta y disfrutando del servicio con su conductor."
            : "Vous ne payez rien à l'avance. Vous réglez à la fin de chaque journée de voyage, une fois sur la route et satisfait du service de votre chauffeur.",

        storyEyebrow: isEn ? "FOUNDER'S NOTE" : isEs ? "NUESTRA HISTORIA" : "NOTRE HISTOIRE",
        storyTitle: isEn ? "Our Story" : isEs ? "Nuestra Historia" : "Notre Histoire",
        storyP1: isEn
            ? "I'm Ali, born in Laâyoune and now based in Rabat. Before Mdina Tours, I worked with a friend at a tourist transport agency in Morocco. I saw how much work went into every booking and how clumsy the system behind it was: messages lost, plans changing, and travelers left unsure what was happening. That frustrated me, and I realized the problem was simple: they needed a proper website and a better way to do things."
            : isEs
            ? "Soy Ali, nacido en El Aaiún y afincado en Rabat. Antes de fundar Mdina Tours, trabajé con un amigo en una agencia de transporte turístico en Marruecos. Viví de cerca la dedicación que requiere cada reserva y los fallos de los métodos tradicionales: mensajes perdidos, cambios imprevistos y viajeros con incertidumbre. Comprendí que la solución era evidente: hacía falta una plataforma digital clara y eficaz."
            : "Je m'appelle Ali, né à Laâyoune et aujourd'hui basé à Rabat. Avant de créer Mdina Tours, je travaillais avec un ami dans une agence de transport touristique au Maroc. J'ai constaté la complexité de chaque réservation et le manque de fluidité des systèmes existants : messages égarés, plannings modifiés à la hâte et voyageurs laissés dans l'incertitude. Cela m'a motivé à changer les choses : il fallait une plateforme claire, moderne et transparente.",
        
        storyP2: isEn
            ? "So I built one myself. I'm a computer science student, and that website became Mdina Tours: a simple, reliable way for anyone to book a private driver, a guide, or a tour in Morocco without the stress."
            : isEs
            ? "Como estudiante de informática, decidí construirla yo mismo. Así nació Mdina Tours: una forma sencilla, segura y transparente de reservar un conductor privado, un guía o una excursión por Marruecos sin preocupaciones."
            : "Étant étudiant en informatique, j'ai développé moi-même cette plateforme. C'est ainsi qu'est né Mdina Tours : une solution simple, fiable et sereine pour réserver un chauffeur privé, un guide ou un circuit au Maroc sans aucun stress.",
        
        whatWeDoEyebrow: isEn ? "CORE SERVICES" : isEs ? "QUÉ HACEMOS" : "CE QUE NOUS FAISONS",
        whatWeDoTitle: isEn ? "What We Do" : isEs ? "Qué Hacemos" : "Ce Que Nous Faisons",
        whatWeDoIntro: isEn
            ? "Mdina Tours arranges private transport and travel across Morocco for visitors from Europe and North America:"
            : isEs
            ? "Mdina Tours organiza servicios de transporte privado y experiencias en Marruecos para viajeros internacionales:"
            : "Mdina Tours organise le transport privé et les voyages sur mesure à travers le Maroc :",
        
        services: [
            {
                title: isEn ? "Airport Transfers" : isEs ? "Traslados al Aeropuerto" : "Transferts Aéroport",
                desc: isEn 
                    ? "Airport transfers to and from Casablanca, Marrakech, Rabat, Fès, and other major cities."
                    : isEs
                    ? "Traslados al aeropuerto desde y hacia Casablanca, Marrakech, Rabat, Fez y principales ciudades."
                    : "Transferts aéroport au départ et à destination de Casablanca, Marrakech, Rabat, Fès et grandes villes.",
                icon: "✈️",
                link: isEs ? getPath('/airport-transfers') : getPath('/transfers')
            },
            {
                title: isEn ? "Private Driver Service" : isEs ? "Conductor Privado por Días" : "Service Chauffeur Privé",
                desc: isEn
                    ? "Private driver service for multi-day trips, including long routes like Fès to Merzouga and the Sahara."
                    : isEs
                    ? "Servicio de conductor privado para rutas de varios días, incluidas travesías como Fez a Merzouga y el Sahara."
                    : "Chauffeur privé dédié pour vos circuits de plusieurs jours, y compris Fès vers Merzouga et le Sahara.",
                icon: "🚘",
                link: isEs ? getPath('/private-driver-morocco') : getPath('/private-driver')
            },
            {
                title: isEn ? "Local Guides & Riads" : isEs ? "Guías Locales y Riads" : "Guides Locaux & Riads",
                desc: isEn
                    ? "Local official guides and boutique riad stays, arranged through our network of trusted partners across Morocco's main regions."
                    : isEs
                    ? "Guías oficiales locales y estancias en riads con encanto a través de nuestra red de socios de confianza en Marruecos."
                    : "Guides officiels locaux et réservations de riads de charme via notre réseau de partenaires vérifiés au Maroc.",
                icon: "🏛️",
                link: isEs ? getPath('/') : getPath('/tours')
            }
        ],
        teamOneNote: isEn
            ? "You get one team to talk to, from your first WhatsApp message to your final drop-off."
            : isEs
            ? "Cuenta con un solo equipo de confianza, desde su primer mensaje por WhatsApp hasta su destino final."
            : "Vous disposez d'une équipe unique à votre écoute, du premier message WhatsApp jusqu'au terme de votre voyage.",

        diffEyebrow: isEn ? "THE MDINA TOURS ADVANTAGE" : isEs ? "NUESTRA DIFERENCIA" : "NOTRE DIFFÉRENCE",
        diffTitle: isEn ? "How We're Different" : isEs ? "Por Qué Somos Diferentes" : "Ce Qui Fait Notre Différence",
        diffs: [
            {
                tag: isEn ? "TRUST FIRST" : isEs ? "CONFIANZA TOTAL" : "CONFIANCE TOTALE",
                title: isEn ? "You pay after the service, not before" : isEs ? "Pague tras el servicio, no antes" : "Paiement après le service, pas avant",
                text: isEn 
                    ? "There's no deposit and no commitment. You pay at the end of each day's journey, once you've met your driver and seen the service for yourself. We think trust should be earned, not demanded up front."
                    : isEs
                    ? "Sin depósitos ni compromisos obligatorios. Paga al final de cada jornada tras conocer a su conductor y comprobar la calidad del servicio. Creemos que la confianza se gana, no se exige."
                    : "Aucun acompte ni engagement préalable. Vous payez à la fin de chaque journée après avoir rencontré votre chauffeur et validé la qualité de service. La confiance se mérite."
            },
            {
                tag: isEn ? "ZERO WAITING" : isEs ? "CERO ESPERAS" : "ZÉRO ATTENTE",
                title: isEn ? "You never wait for us" : isEs ? "Nunca tendrá que esperar" : "Vous ne nous attendez jamais",
                text: isEn
                    ? "Your driver is always at the pickup point before you arrive. Airport, hotel, or train station, our drivers wait for you, not the other way around."
                    : isEs
                    ? "Su conductor siempre está en el punto de encuentro antes de su llegada. En el aeropuerto, hotel o estación de tren, nuestros conductores le esperan a usted, nunca al revés."
                    : "Votre chauffeur est toujours au point de rendez-vous avant votre arrivée. À l'aéroport, à l'hôtel ou à la gare, notre chauffeur vous attend, jamais l'inverse."
            },
            {
                tag: isEn ? "SAFETY & VETTING" : isEs ? "SEGURIDAD Y TRANQUILIDAD" : "SÉCURITÉ & SÉRÉNITÉ",
                title: isEn ? "Drivers you can feel safe with" : isEs ? "Conductores en los que puede confiar" : "Des chauffeurs de confiance",
                text: isEn
                    ? "We work only with professional, courteous, well-presented drivers whom we know and trust. For families, solo travelers, and first-time visitors to Morocco, that peace of mind matters most."
                    : isEs
                    ? "Trabajamos únicamente con conductores profesionales, corteses y de total confianza. Para familias, parejas o viajeros independientes, su tranquilidad es nuestra máxima prioridad."
                    : "Nous travaillons exclusivement avec des chauffeurs professionnels, courtois et certifiés. Pour les familles, couples ou voyageurs solos, cette tranquillité d'esprit est essentielle."
            },
            {
                tag: isEn ? "LIVE SUPPORT" : isEs ? "ATENCIÓN EN DIRECTO" : "ASSISTANCE DIRECTE",
                title: isEn ? "Real people, real support" : isEs ? "Atención humana en todo momento" : "Une équipe humaine à vos côtés",
                text: isEn
                    ? "We're on WhatsApp throughout your trip. If your flight is delayed or your plans change, you message us and we sort it out."
                    : isEs
                    ? "Estamos disponibles por WhatsApp durante todo su viaje. Si su vuelo se retrasa o cambian sus planes, nos escribe y lo solucionamos al instante."
                    : "Nous sommes joignables sur WhatsApp pendant toute la durée de votre voyage. En cas de vol retardé ou de changement de plan, nous nous adaptons immédiatement."
            }
        ],

        whyTitle: isEn ? "Why Travelers Choose Mdina Tours" : isEs ? "¿Por Qué Elegir Mdina Tours?" : "Pourquoi Choisir Mdina Tours ?",
        whyItems: [
            isEn ? "Competitive local rates, with no middlemen stacking fees on top" : isEs ? "Tarifas locales directas y competitivas, sin intermediarios que inflen el precio" : "Tarifs locaux compétitifs, sans intermédiaire superflu",
            isEn ? "Clear pricing agreed before your trip" : isEs ? "Precios transparentes y acordados antes de viajar" : "Tarification claire convenue avant votre voyage",
            isEn ? "Comfortable Mercedes vehicles for private transfers and long journeys" : isEs ? "Cómodos vehículos Mercedes para traslados y largas distancias" : "Véhicules Mercedes confortables pour transferts et longs trajets",
            isEn ? "English-speaking drivers" : isEs ? "Conductores con idiomas (inglés, español, francés)" : "Chauffeurs parlant anglais et français",
            isEn ? "Service across major Moroccan cities and regions, from the Atlantic coast to the Sahara" : isEs ? "Servicio en las principales ciudades y regiones de Marruecos, de la costa al desierto" : "Service à travers tout le Maroc, de la côte atlantique jusqu'au Sahara"
        ],

        faqTitle: isEn ? "Frequently Asked Questions" : isEs ? "Preguntas Frecuentes" : "Foire Aux Questions",
        faqs: [
            {
                q: isEn ? "Do I need to pay a deposit to book?" : isEs ? "¿Tengo que pagar un depósito para reservar?" : "Dois-je payer un acompte pour réserver ?",
                a: isEn 
                    ? "No. You pay at the end of each day of travel, once you've been picked up and are enjoying the service."
                    : isEs
                    ? "No. Paga al final de cada día de viaje, una vez que ha sido recogido y está disfrutando del servicio."
                    : "Non. Vous payez à la fin de chaque journée de voyage, une fois pris en charge et pleinement satisfait du service."
            },
            {
                q: isEn ? "What if my flight is delayed?" : isEs ? "¿Qué pasa si mi vuelo se retrasa?" : "Que se passe-t-il si mon vol a du retard ?",
                a: isEn
                    ? "Message us on WhatsApp. Your driver adapts to your arrival time, and you won't be charged extra for waiting at the airport."
                    : isEs
                    ? "Escríbanos por WhatsApp. Su conductor se adapta a su hora real de llegada sin coste adicional por espera en el aeropuerto."
                    : "Écrivez-nous sur WhatsApp. Votre chauffeur s'adapte à votre heure d'arrivée réelle, sans frais supplémentaires pour l'attente à l'aéroport."
            },
            {
                q: isEn ? "Can you plan a custom multi-day trip?" : isEs ? "¿Pueden organizar un viaje personalizado de varios días?" : "Pouvez-vous organiser un circuit sur mesure de plusieurs jours ?",
                a: isEn
                    ? "Yes. Tell us your dates and cities, and we'll put together a private driver itinerary with guides and accommodation if you'd like."
                    : isEs
                    ? "Sí. Indíquenos sus fechas y ciudades de interés, y organizaremos un itinerario con conductor privado, guías locales y alojamiento si lo desea."
                    : "Oui. Indiquez-nous vos dates et les villes souhaitées, et nous concevrons un itinéraire avec chauffeur privé, guides et hébergements selon vos envies."
            },
            {
                q: isEn ? "Are your drivers licensed professionals?" : isEs ? "¿Los conductores son profesionales autorizados?" : "Vos chauffeurs sont-ils des professionnels agréés ?",
                a: isEn
                    ? "Yes. We work with professional drivers who are experienced, trustworthy, and committed to your comfort and safety."
                    : isEs
                    ? "Sí. Trabajamos exclusivamente con conductores profesionales autorizados, experimentados y comprometidos con su confort y seguridad."
                    : "Oui. Nous collaborons uniquement avec des chauffeurs professionnels agréés, expérimentés, de confiance et dévoués à votre confort et sécurité."
            }
        ],

        ctaTitle: isEn ? "Ready to Explore Morocco with Total Peace of Mind?" : isEs ? "¿Listo para Viajar por Marruecos con Total Tranquilidad?" : "Prêt à Explorer le Maroc en Toute Sérénité ?",
        ctaText: isEn
            ? "Talk directly to Ali and our booking team on WhatsApp to plan your private transfer, chauffeur itinerary, or desert trip."
            : isEs
            ? "Hable directamente con Ali y nuestro equipo por WhatsApp para planificar su traslado privado o ruta por Marruecos."
            : "Échangez directement avec Ali et notre équipe sur WhatsApp pour organiser votre transfert privé ou circuit au Maroc.",
        ctaBtn: isEn ? "Chat on WhatsApp (+212 724-114775)" : isEs ? "Escribir por WhatsApp (+212 724-114775)" : "Écrire sur WhatsApp (+212 724-114775)",
        homeLabel: isEn ? "Home" : isEs ? "Inicio" : "Accueil",
        aboutLabel: isEn ? "About Us" : isEs ? "Acerca de Nosotros" : "À Propos"
    };

    // Rich Schema.org Structured Data
    const aboutPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": content.badge,
        "description": content.heroSubtitle,
        "url": `https://mdinatours.com/${language}/about`,
        "mainEntity": {
            "@type": "TravelAgency",
            "name": "Mdina Tours",
            "url": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`,
            "telephone": "+212724114775",
            "founder": {
                "@type": "Person",
                "name": "Ali",
                "jobTitle": "Founder & Technical Director",
                "homeLocation": "Rabat, Morocco",
                "birthPlace": "Laâyoune, Morocco"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rabat",
                "addressCountry": "MA"
            },
            "areaServed": "Morocco",
            "priceRange": "$$"
        }
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
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
                "name": content.homeLabel,
                "item": language === 'en' ? "https://mdinatours.com/" : `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": content.aboutLabel,
                "item": `https://mdinatours.com/${language}/about`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color, #FDFBF7)', minHeight: '100vh', color: '#1B2B4A' }}>
                <PageBanner 
                    title={isEn ? 'About Mdina Tours' : isEs ? 'Acerca de Mdina Tours' : 'À Propos de Mdina Tours'}
                    bgImage="/img/Morocco-trip-tour-hero03.webp"
                    homeLabel={content.homeLabel}
                    homeLink={getPath('/')}
                    currentLabel={content.aboutLabel}
                />

                <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '60px 20px 100px 20px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
                    
                    {/* 1. HERO LEAD & VALUE PROPOSITION */}
                    <section style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '44px 36px',
                        border: '1px solid rgba(27, 43, 74, 0.08)',
                        boxShadow: '0 10px 35px rgba(27, 43, 74, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                                backgroundColor: 'rgba(220, 131, 78, 0.12)',
                                color: 'var(--primary, #DC834E)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                display: 'inline-block'
                            }}>
                                {content.badge}
                            </span>
                        </div>

                        <h1 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                            lineHeight: 1.2,
                            color: 'var(--secondary, #1B2B4A)',
                            fontWeight: 700,
                            margin: 0
                        }}>
                            {content.heroSubtitle}
                        </h1>

                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#4A5568', margin: 0 }}>
                            {content.introP1}
                        </p>

                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#4A5568', margin: 0 }}>
                            {content.introP2}
                        </p>

                        {/* Pay-At-End Callout */}
                        <div style={{
                            marginTop: '12px',
                            background: 'linear-gradient(135deg, rgba(220, 131, 78, 0.08) 0%, rgba(27, 43, 74, 0.04) 100%)',
                            border: '1px solid rgba(220, 131, 78, 0.3)',
                            borderRadius: '16px',
                            padding: '24px 28px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: 'var(--primary, #DC834E)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                fontSize: '1.2rem',
                                fontWeight: 700
                            }}>
                                ✓
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary, #1B2B4A)' }}>
                                    {content.payCardTitle}
                                </h3>
                                <p style={{ margin: 0, fontSize: '1rem', color: '#4A5568', lineHeight: 1.6 }}>
                                    {content.payCardText}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2. FOUNDER'S STORY (ALI) */}
                    <section style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '44px 36px',
                        border: '1px solid rgba(27, 43, 74, 0.08)',
                        boxShadow: '0 10px 35px rgba(27, 43, 74, 0.04)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                                <span style={{
                                    color: 'var(--primary, #DC834E)',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase'
                                }}>
                                    {content.storyEyebrow}
                                </span>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: '#718096',
                                    backgroundColor: '#F7FAFC',
                                    padding: '4px 12px',
                                    borderRadius: '50px',
                                    border: '1px solid #E2E8F0'
                                }}>
                                    📍 Laâyoune ➔ Rabat
                                </span>
                            </div>

                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                color: 'var(--secondary, #1B2B4A)',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                {content.storyTitle}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.05rem', lineHeight: 1.8, color: '#4A5568' }}>
                                <p style={{ margin: 0 }}>
                                    {content.storyP1}
                                </p>
                                <p style={{ margin: 0 }}>
                                    {content.storyP2}
                                </p>
                            </div>

                            {/* Founder Signature Badge */}
                            <div style={{
                                marginTop: '12px',
                                paddingTop: '20px',
                                borderTop: '1px solid rgba(0,0,0,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--secondary, #1B2B4A)',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    letterSpacing: '1px'
                                }}>
                                    A
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--secondary, #1B2B4A)', fontSize: '1rem' }}>Ali</div>
                                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>Founder & Technical Lead, Mdina Tours</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. WHAT WE DO */}
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div>
                            <span style={{
                                color: 'var(--primary, #DC834E)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '8px'
                            }}>
                                {content.whatWeDoEyebrow}
                            </span>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                color: 'var(--secondary, #1B2B4A)',
                                fontWeight: 700,
                                margin: '0 0 12px 0'
                            }}>
                                {content.whatWeDoTitle}
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: '#4A5568', margin: 0 }}>
                                {content.whatWeDoIntro}
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '24px'
                        }}>
                            {content.services.map((srv, idx) => (
                                <Link 
                                    key={idx} 
                                    href={srv.link} 
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        background: '#ffffff',
                                        borderRadius: '20px',
                                        padding: '32px 28px',
                                        border: '1px solid rgba(27, 43, 74, 0.08)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                                    }}
                                    className="about-service-card"
                                >
                                    <div style={{ fontSize: '2rem' }}>{srv.icon}</div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--secondary, #1B2B4A)',
                                        margin: 0
                                    }}>
                                        {srv.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, margin: 0, flex: 1 }}>
                                        {srv.desc}
                                    </p>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: 'var(--primary, #DC834E)',
                                        marginTop: '4px'
                                    }}>
                                        <span>{isEn ? 'Explore options' : isEs ? 'Ver opciones' : 'Découvrir'}</span>
                                        <span>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div style={{
                            backgroundColor: '#F8FAFC',
                            border: '1px dashed #CBD5E1',
                            borderRadius: '16px',
                            padding: '20px 24px',
                            textAlign: 'center',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            color: 'var(--secondary, #1B2B4A)'
                        }}>
                            💬 {content.teamOneNote}
                        </div>
                    </section>

                    {/* 4. HOW WE'RE DIFFERENT */}
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div>
                            <span style={{
                                color: 'var(--primary, #DC834E)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '8px'
                            }}>
                                {content.diffEyebrow}
                            </span>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                color: 'var(--secondary, #1B2B4A)',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                {content.diffTitle}
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {content.diffs.map((diff, idx) => (
                                <div key={idx} style={{
                                    background: '#ffffff',
                                    borderRadius: '20px',
                                    padding: '32px 28px',
                                    border: '1px solid rgba(27, 43, 74, 0.08)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        color: 'var(--primary, #DC834E)',
                                        backgroundColor: 'rgba(220, 131, 78, 0.1)',
                                        padding: '4px 10px',
                                        borderRadius: '50px',
                                        alignSelf: 'flex-start'
                                    }}>
                                        {diff.tag}
                                    </span>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        color: 'var(--secondary, #1B2B4A)',
                                        margin: 0,
                                        lineHeight: 1.3
                                    }}>
                                        {diff.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#64748B',
                                        lineHeight: 1.6,
                                        margin: 0
                                    }}>
                                        {diff.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. WHY TRAVELERS CHOOSE MDINA TOURS */}
                    <section style={{
                        background: 'linear-gradient(135deg, #1B2B4A 0%, #152238 100%)',
                        borderRadius: '24px',
                        padding: '44px 36px',
                        color: '#ffffff',
                        boxShadow: '0 15px 40px rgba(27, 43, 74, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '28px'
                    }}>
                        <div>
                            <span style={{
                                color: 'var(--primary, #DC834E)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '8px'
                            }}>
                                {isEn ? 'THE MDINA STANDARD' : isEs ? 'EL ESTÁNDAR MDINA' : 'LE STANDARD MDINA'}
                            </span>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                color: '#ffffff',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                {content.whyTitle}
                            </h2>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '18px'
                        }}>
                            {content.whyItems.map((point, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '14px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '14px',
                                    padding: '16px 20px',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                    <div style={{
                                        color: '#38A169',
                                        backgroundColor: 'rgba(56, 161, 105, 0.15)',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        flexShrink: 0,
                                        marginTop: '2px'
                                    }}>
                                        ✓
                                    </div>
                                    <span style={{ fontSize: '0.98rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                                        {point}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. FREQUENTLY ASKED QUESTIONS */}
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        <div>
                            <span style={{
                                color: 'var(--primary, #DC834E)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '8px'
                            }}>
                                FAQ
                            </span>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                                color: 'var(--secondary, #1B2B4A)',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                {content.faqTitle}
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {content.faqs.map((item, idx) => (
                                <details key={idx} style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(27, 43, 74, 0.08)',
                                    padding: '22px 26px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.01)',
                                    cursor: 'pointer'
                                }}>
                                    <summary style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'var(--secondary, #1B2B4A)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        listStyle: 'none'
                                    }}>
                                        <span>{item.q}</span>
                                        <span style={{ color: 'var(--primary, #DC834E)', fontSize: '1.2rem', marginLeft: '12px' }}>▾</span>
                                    </summary>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#64748B',
                                        lineHeight: 1.7,
                                        marginTop: '14px',
                                        marginBottom: 0,
                                        cursor: 'default'
                                    }}>
                                        {item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* 7. DIRECT WHATSAPP / BOOKING CTA */}
                    <section style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '24px',
                        padding: '48px 36px',
                        border: '1px solid rgba(220, 131, 78, 0.25)',
                        boxShadow: '0 15px 40px rgba(220, 131, 78, 0.08)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                            color: 'var(--secondary, #1B2B4A)',
                            fontWeight: 700,
                            margin: 0,
                            maxWidth: '700px'
                        }}>
                            {content.ctaTitle}
                        </h2>
                        <p style={{
                            fontSize: '1.05rem',
                            color: '#64748B',
                            maxWidth: '620px',
                            margin: 0,
                            lineHeight: 1.6
                        }}>
                            {content.ctaText}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                            <a
                                href="https://wa.me/212724114775"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: '#25D366',
                                    color: '#ffffff',
                                    padding: '14px 28px',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}
                            >
                                <span>💬</span>
                                <span>{content.ctaBtn}</span>
                            </a>
                            <Link
                                href={isEs ? getPath('/airport-transfers') : getPath('/transfers')}
                                style={{
                                    backgroundColor: 'var(--secondary, #1B2B4A)',
                                    color: '#ffffff',
                                    padding: '14px 28px',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <span>{isEn ? 'View Transfers & Pricing' : isEs ? 'Ver Traslados y Precios' : 'Voir les Transferts et Tarifs'}</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </section>

                </div>
            </main>
            <Footer lang={language} />
            <FloatingElements />
        </>
    );
}

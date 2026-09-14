import { getAlternates } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import FloatingElements from '@/components/FloatingElements';
import Link from 'next/link';
import { Metadata } from 'next';
import { translations, Language } from '@/lib/translations';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isEn = lang === 'en';
    const isEs = lang === 'es';

    const title = isEn 
        ? 'Frequently Asked Questions | Mdina Tours' 
        : isEs
        ? 'Preguntas Frecuentes | Mdina Tours'
        : 'Foire Aux Questions | Mdina Tours';
    const description = isEn
        ? 'Find answers to common questions about booking private driver transfers, custom desert tours, child seat availability, and cash payments in Morocco.'
        : isEs
        ? 'Respuestas a preguntas frecuentes sobre la reserva de traslados con chófer privado, excursiones en Marruecos, sillas infantiles y métodos de pago.'
        : 'Retrouvez les réponses à vos questions sur la réservation de chauffeurs privés, circuits dans le désert, et paiements sur place au Maroc.';
    const url = `https://mdinatours.com/${lang}/faq`;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/faq'),
        openGraph: {
            title,
            description,
            url,
            siteName: 'Mdina Tours',
            images: [
                {
                    url: 'https://mdinatours.com/hero-landscape-3.webp',
                    width: 1200,
                    height: 630,
                    alt: 'FAQ Mdina Tours',
                },
            ],
            locale: lang === 'es' ? 'es_ES' : lang === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://mdinatours.com/hero-landscape-3.webp'],
        },
    };
}

export default async function FAQListingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language = (lang as Language) || 'en';
    const isEn = language === 'en';
    const isEs = language === 'es';

    const t = (key: string) => {
        const langSection = translations[language] || translations['en'];
        return langSection[key] || key;
    };

    const getPath = (path: string) => `/${language}${path === '/' ? '' : path}`;

    // Detailed structured FAQs grouped by categories
    const categories = [
        {
            title: isEn ? "Booking & Payment" : isEs ? "Reservas y Pago" : "Réservation & Paiement",
            items: [
                {
                    q: isEn ? "How do I book a service with Mdina Tours?" : isEs ? "¿Cómo reservo con Mdina Tours?" : "Comment réserver avec Mdina Tours ?",
                    a: isEn ? "You can book directly using our website forms or message our booking team on WhatsApp for an instant response. We will confirm your details, vehicle type, and pickup timings, and send a booking receipt."
                            : isEs ? "Puede reservar directamente a través de nuestra web o enviar un mensaje a nuestro equipo por WhatsApp para una respuesta rápida. Confirmaremos sus datos, tipo de vehículo y hora de recogida."
                            : "Vous pouvez réserver par nos formulaires ou en écrivant à notre équipe sur WhatsApp. Nous confirmons vos détails, le type de véhicule, l'heure de prise en charge et vous envoyons une confirmation."
                },
                {
                    q: isEn ? "Do I need to pay in advance?" : isEs ? "¿Tengo que pagar por adelantado?" : "Dois-je payer à l'avance ?",
                    a: isEn ? "No prepayments are required. We believe in building trust with travelers. You pay your driver directly in cash (Euros, US Dollars, or Moroccan Dirhams) at the end of your transfer or tour."
                            : isEs ? "No se requiere pago por adelantado. Confiamos en nuestros viajeros. Paga directamente a su chófer en efectivo (euros, dólares o dirhams marroquíes) al finalizar el servicio."
                            : "Aucun prépaiement n'est requis. Nous faisons confiance à nos voyageurs. Vous réglez directement le chauffeur en espèces (Euros, Dollars ou Dirhams) à la fin de la prestation."
                },
                {
                    q: isEn ? "What is your cancellation policy?" : isEs ? "¿Cuál es la política de cancelación?" : "Quelle est votre politique d'annulation ?",
                    a: isEn ? "Because we do not charge prepayment, cancellation is free. However, we kindly ask that you notify us at least 24 hours in advance if your plans change, so we can alert our drivers."
                            : isEs ? "Al no exigir prepago, la cancelación es gratuita. Le rogamos que nos avise con al menos 24 horas de antelación si sus planes cambian para avisar a su conductor."
                            : "N'exigeant pas de prépaiement, l'annulation est gratuite. Nous vous demandons simplement de nous prévenir au moins 24 heures à l'avance si vos projets changent."
                },
                {
                    q: isEn ? "Can I book a last-minute transfer?" : isEs ? "¿Puedo reservar un traslado de última hora?" : "Puis-je réserver un transfert de dernière minute ?",
                    a: isEn ? "Yes, we accept bookings with as little as a few hours notice. For same-day bookings, contact us directly on WhatsApp for the fastest confirmation."
                            : isEs ? "Sí, aceptamos reservas con pocas horas de antelación. Para reservas en el mismo día, contáctenos directamente por WhatsApp para una confirmación inmediata."
                            : "Oui, nous acceptons les réservations avec seulement quelques heures de préavis. Pour les réservations le jour même, contactez-nous directement sur WhatsApp pour obtenir la confirmation la plus rapide."
                },
                {
                    q: isEn ? "Will I receive a booking confirmation?" : isEs ? "¿Recibiré una confirmación de reserva?" : "Vais-je recevoir une confirmation de réservation ?",
                    a: isEn ? "Yes. Once your booking is submitted, we send a confirmation by WhatsApp and email with your driver details, vehicle type, pickup time, and contact number."
                            : isEs ? "Sí. Tras solicitar su reserva, le enviamos la confirmación por WhatsApp y correo electrónico con los datos de su conductor, vehículo, hora de recogida y teléfono."
                            : "Oui. Une fois votre réservation soumise, nous envoyons une confirmation par WhatsApp et par e-mail avec les coordonnées de votre chauffeur, le type de véhicule, l'heure de prise en charge et le numéro de contact."
                },
                {
                    q: isEn ? "What currencies do you accept?" : isEs ? "¿Qué monedas aceptan?" : "Quelles devises acceptez-vous ?",
                    a: isEn ? "We accept Euros, US Dollars, and Moroccan Dirhams paid directly to your driver in cash at the end of the service."
                            : isEs ? "Aceptamos euros, dólares estadounidenses y dirhams marroquíes, pagados directamente en efectivo a su conductor al finalizar el traslado."
                            : "Nous acceptons les euros, les dollars américains et les dirhams marocains, à payer directement à votre chauffeur en espèces à la fin de la prestation."
                }
            ]
        },
        {
            title: isEn ? "Airport Transfers" : isEs ? "Traslados al Aeropuerto" : "Transferts Aéroport",
            items: [
                {
                    q: isEn ? "What if my flight is delayed?" : isEs ? "¿Qué ocurre si mi vuelo se retrasa?" : "Que se passe-t-il si mon vol a du retard ?",
                    a: isEn ? "We monitor all flights in real-time using your flight number. Your chauffeur will automatically adjust the pickup time based on your actual arrival, with no extra waiting fee."
                            : isEs ? "Monitoreamos todos los vuelos en tiempo real con su número de vuelo. Su chófer adaptará la recogida a su hora real de aterrizaje sin coste adicional por espera."
                            : "Nous suivons les vols en temps réel via votre numéro de vol. Votre chauffeur s'adaptera automatiquement à votre heure d'atterrissage effective, sans surcoût d'attente."
                },
                {
                    q: isEn ? "Do you offer meet & greet at the airport?" : isEs ? "¿Ofrecen recibimiento personalizado en el aeropuerto?" : "Proposez-vous un accueil personnalisé à l'aéroport ?",
                    a: isEn ? "Yes. Your chauffeur will be waiting in the arrivals hall holding a sign with your name, ready to assist with luggage and escort you to the vehicle."
                            : isEs ? "Sí. Su chófer le esperará en el hall de llegadas con un cartel con su nombre, listo para ayudarle con las maletas y acompañarle al vehículo."
                            : "Oui. Votre chauffeur vous attendra dans le hall des arrivées avec un panneau à votre nom, prêt à vous aider avec vos bagages et à vous accompagner jusqu'au véhicule."
                },
                {
                    q: isEn ? "Which airports do you cover?" : isEs ? "¿Qué aeropuertos cubren en Marruecos?" : "Quels aéroports desservez-vous ?",
                    a: isEn ? "We serve all major Moroccan airports with our premium Morocco Transfers including Marrakech Menara (RAK), Casablanca Mohammed V (CMN), Agadir Al Massira (AGA), Fes Saïss (FEZ), and Rabat-Salé (RBA)."
                            : isEs ? "Cubrimos los principales aeropuertos de Marruecos, incluidos Casablanca Mohammed V (CMN), Marrakech Menara (RAK), Rabat-Salé (RBA), Fez Saïss (FEZ) y Tánger Ibn Battouta (TNG)."
                            : "Nous desservons tous les principaux aéroports marocains, y compris Marrakech Menara (RAK), Casablanca Mohammed V (CMN), Agadir Al Massira (AGA), Fès Saïss (FEZ) et Rabat-Salé (RBA) avec nos services de transferts au Maroc."
                },
                {
                    q: isEn ? "How do I find my driver at the airport?" : isEs ? "¿Cómo encuentro a mi conductor en el aeropuerto?" : "Comment trouver mon chauffeur à l'aéroport ?",
                    a: isEn ? "After landing, your driver will contact you via WhatsApp. You will also have their number in your booking confirmation so you can reach them directly."
                            : isEs ? "Al aterrizar, su conductor se comunicará con usted por WhatsApp. También dispondrá de su número de teléfono en la confirmación de reserva."
                            : "Après l'atterrissage, votre chauffeur vous contactera via WhatsApp. Vous aurez également son numéro dans votre confirmation de réservation pour pouvoir le joindre directement."
                },
                {
                    q: isEn ? "Is the price fixed or metered?" : isEs ? "¿El precio es fijo o con taxímetro?" : "Le tarif est-il fixe ou au compteur ?",
                    a: isEn ? "All prices are fixed and agreed before your trip. There are no meters, no surprises, and no extra charges for traffic or waiting within the standard grace period."
                            : isEs ? "Todos los precios son fijos y acordados previamente. Sin taxímetros, sin sorpresas ni costes adicionales por tráfico."
                            : "Tous les tarifs sont fixes et convenus avant votre voyage. Il n'y a pas de compteur, pas de surprise et pas de frais supplémentaires pour le trafic ou l'attente pendant la période de grâce standard."
                }
            ]
        },
        {
            title: isEn ? "Tours & Excursions" : isEs ? "Excursiones y Circuitos" : "Circuits & Excursions",
            items: [
                {
                    q: isEn ? "Are the tours and transfers private or shared?" : isEs ? "¿Las excursiones y traslados son privados o compartidos?" : "Les circuits et transferts sont-ils privés ou partagés ?",
                    a: isEn ? "All services are 100% private. You will not share the vehicle with other travelers. Your dedicated private driver and any local guides are reserved exclusively for your party."
                            : isEs ? "Todos nuestros servicios son 100% privados. No compartirá el vehículo con desconocidos. Su chófer privado está dedicado exclusivamente a su grupo."
                            : "Tous nos services sont 100% privés. Vous ne partagerez pas le véhicule avec d'autres clients. Votre chauffeur privé dédié et les guides locaux sont exclusivement réservés à votre groupe."
                },
                {
                    q: isEn ? "Can I customize my tour itinerary?" : isEs ? "¿Puedo personalizar el itinerario de mi excursión?" : "Puis-je personnaliser mon itinéraire de circuit ?",
                    a: isEn ? "Absolutely. All of our Morocco Tours are fully private and flexible. Tell us your interests, pace, and must-see stops and we will tailor the day around you with a dedicated private driver."
                            : isEs ? "Por supuesto. Nuestras excursiones son flexibles y a medida. Indíquenos sus intereses y adaptaremos el día y el ritmo a sus preferencias."
                            : "Absolument. Tous nos circuits au Maroc sont entièrement privés et flexibles. Faites-nous part de vos intérêts, de votre rythme et des arrêts incontournables, et nous adapterons la journée selon vos souhaits avec un chauffeur privé dédié."
                },
                {
                    q: isEn ? "Do you offer day trips from Marrakech, Casablanca, or Agadir?" : isEs ? "¿Ofrecen excursiones de un día desde Casablanca, Rabat o Marrakech?" : "Proposez-vous des excursions d'une journée au départ de Marrakech, Casablanca ou Agadir ?",
                    a: isEn ? "Yes. We run private day trips from all major cities as part of our Morocco Tours, including popular routes like Marrakech to Ouarzazate, Casablanca to Chefchaouen, and Agadir to Essaouira."
                            : isEs ? "Sí. Organizamos excursiones privadas de un día, como la excursión a Chefchaouen desde Casablanca o Rabat, o viajes a Essaouira desde Marrakech."
                            : "Oui. Nous organisons des excursions privées d'une journée au départ de toutes les grandes villes dans le cadre de nos circuits au Maroc, y compris des itinéraires populaires comme Marrakech à Ouarzazate, Casablanca à Chefchaouen et Agadir à Essaouira."
                },
                {
                    q: isEn ? "Are local guides included in tours?" : isEs ? "¿Están incluidos los guías locales en las excursiones?" : "Les guides locaux sont-ils inclus dans les circuits ?",
                    a: isEn ? "Some tours include a licensed local guide at key sites. This will be specified in your tour details. You can also request a guide as an add-on for any itinerary."
                            : isEs ? "Algunas excursiones incluyen guía oficial en puntos clave. También puede solicitar un guía local oficial como suplemento para cualquier itinerario."
                            : "Certains circuits incluent un guide local agréé sur les sites clés. Cela sera précisé dans les détails de votre circuit. Vous pouvez également demander un guide en option pour n'importe quel itinéraire."
                },
                {
                    q: isEn ? "How long are the tours?" : isEs ? "¿Cuánto duran las excursiones?" : "Quelle est la durée des circuits ?",
                    a: isEn ? "Tour duration varies by destination, typically between 8 and 12 hours for a full-day excursion. We can adjust timing to fit your schedule."
                            : isEs ? "La duración varía según el destino, habitualmente entre 8 y 12 horas para excursiones de día completo, adaptándonos a sus horarios."
                            : "La durée des circuits varie selon la destination, généralement entre 8 et 12 heures pour une excursion d'une journée complète. Nous pouvons ajuster les horaires pour les adapter à votre programme."
                }
            ]
        },
        {
            title: isEn ? "Vehicles & Comfort" : isEs ? "Vehículos y Confort" : "Véhicules & Confort",
            items: [
                {
                    q: isEn ? "Are child car seats provided?" : isEs ? "¿Proporcionan sillas infantiles para el coche?" : "Les sièges auto pour enfants sont-ils fournis ?",
                    a: isEn ? "Yes. We offer clean, standard baby and child seats free of charge. Please request one in the booking notes and specify your child's age/weight."
                            : isEs ? "Sí. Ofrecemos sillas de bebé y elevadores homologados de forma gratuita. Indíquelo al reservar especificando la edad o el peso del niño."
                            : "Oui. Nous mettons gratuitement à votre disposition des sièges auto et rehausseurs propres. Indiquez-le dans vos notes en précisant l'âge/poids de l'enfant."
                },
                {
                    q: isEn ? "What vehicles do you use?" : isEs ? "¿Qué vehículos utilizan?" : "Quels véhicules utilisez-vous ?",
                    a: isEn ? "Our fleet includes the Comfort SUV (Skoda Kodiaq), VIP Minivan (Mercedes Vito), and VIP Minibus for larger groups. All vehicles are air-conditioned, clean, and regularly maintained."
                            : isEs ? "Nuestra flota incluye berlinas confortables, monovolúmenes VIP (Mercedes Vito) y minibuses ejecutivos para grupos. Todos disponen de aire acondicionado y mantenimiento riguroso."
                            : "Notre flotte comprend le SUV Confort (Skoda Kodiaq), le Minivan VIP (Mercedes Vito) et le Minibus VIP pour les groupes plus importants. Tous nos véhicules sont climatisés, propres et régulièrement entretenus."
                },
                {
                    q: isEn ? "How many passengers can each vehicle accommodate?" : isEs ? "¿Cuántos pasajeros caben en cada vehículo?" : "Combien de passagers chaque véhicule peut-il accueillir ?",
                    a: isEn ? "The Comfort SUV fits up to 4 passengers, the VIP Minivan up to 7, and the VIP Minibus up to 16. Contact us for groups larger than 16."
                            : isEs ? "Las berlinas admiten hasta 3-4 pasajeros, el monovolumen VIP hasta 7 y el minibús hasta 16 personas. Para grupos mayores, consúltenos."
                            : "Le SUV Confort peut accueillir jusqu'à 4 passagers, le Minivan VIP jusqu'à 7 passagers et le Minibus VIP jusqu'à 16 passagers. Contactez-nous pour les groupes de plus de 16 personnes."
                },
                {
                    q: isEn ? "Is there Wi-Fi or water in the vehicle?" : isEs ? "¿Hay agua o Wi-Fi en el vehículo?" : "Y a-t-il du Wi-Fi ou de l'eau dans le véhicule ?",
                    a: isEn ? "Bottled water is provided on all transfers. Wi-Fi availability depends on the vehicle — confirm at booking if this is important to you."
                            : isEs ? "Ofrecemos agua embotellada de cortesía en todos los traslados. La disponibilidad de Wi-Fi depende del vehículo; confírmelo al reservar si lo precisa."
                            : "De l'eau en bouteille est fournie sur tous les transferts. La disponibilité du Wi-Fi dépend du véhicule – veuillez le confirmer lors de la réservation si cela est important pour vous."
                }
            ]
        },
        {
            title: isEn ? "Practical Information" : isEs ? "Información Práctica" : "Informations Pratiques",
            items: [
                {
                    q: isEn ? "Do your drivers speak English or French?" : isEs ? "¿Los conductores hablan español, inglés o francés?" : "Vos chauffeurs parlent-ils anglais ou français ?",
                    a: isEn ? "Yes. All our private driver chauffeurs and guides speak English and French. Arabic and Spanish are also available on request."
                            : isEs ? "Sí. Nuestros chóferes y guías hablan español, inglés, francés y árabe para facilitarle la mejor comunicación durante el viaje."
                            : "Oui. Tous nos chauffeurs privés et guides parlent anglais et français. L'arabe et l'espagnol sont également disponibles sur demande."
                },
                {
                    q: isEn ? "How much luggage can I bring?" : isEs ? "¿Cuánto equipaje puedo llevar?" : "Quelle quantité de bagages puis-je emporter ?",
                    a: isEn ? "Standard luggage allowance fits the vehicle capacity. For oversized bags, surfboards, or sports equipment, let us know when booking so we assign the right vehicle."
                            : isEs ? "La capacidad de equipaje estándar corresponde al tamaño del vehículo. Para equipaje voluminoso o material deportivo, avísenos con antelación."
                            : "La franchise de bagages standard correspond à la capacité du véhicule. Pour les bagages hors format, planches de surf ou équipements de sport, informez-nous lors de la réservation afin que nous puissions attribuer le véhicule adapté."
                },
                {
                    q: isEn ? "Do you operate year-round?" : isEs ? "¿Operan todo el año?" : "Opérez-vous toute l'année ?",
                    a: isEn ? "Yes, we operate 365 days a year including public holidays and Ramadan."
                            : isEs ? "Sí, operamos los 365 días del año, incluyendo festivos y el periodo de Ramadán."
                            : "Oui, nous opérons 365 jours par an, y compris les jours fériés et pendant le Ramadan."
                },
                {
                    q: isEn ? "Is Mdina Tours suitable for solo travelers?" : isEs ? "¿Mdina Tours es adecuado para viajeros que viajan solos?" : "Mdina Tours est-il adapté aux voyageurs en solo ?",
                    a: isEn ? "Yes. Whether you are traveling alone, as a couple, or as a large group, all services are private and priced per vehicle, not per person."
                            : isEs ? "Sí. Ya viaje solo, en pareja o en grupo, todos los traslados son 100% privados y el precio se calcula por vehículo."
                            : "Oui. Que vous voyagiez seul, en couple ou en grand groupe, tous nos services sont privés et tarifés par véhicule, et non par personne."
                }
            ]
        }
    ];

    const allFaqs = categories.flatMap(cat => cat.items);

    const renderAnswer = (text: string) => {
        const regex = /(Morocco Transfers?|Morocco Tours?|WhatsApp|private drivers?|transferts? au Maroc|circuits? au Maroc|chauffeurs? privés?)/gi;
        const parts = text.split(regex);
        return parts.map((part, i) => {
            const lowerPart = part.toLowerCase();
            if (lowerPart.startsWith('morocco transfer') || lowerPart.startsWith('transfert')) {
                return (
                    <Link key={i} href={isEs ? getPath('/airport-transfers') : getPath('/transfers')} style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 500 }}>
                        {part}
                    </Link>
                );
            }
            if (lowerPart.startsWith('morocco tour') || lowerPart.startsWith('circuit')) {
                return (
                    <Link key={i} href={isEs ? getPath('/') : getPath('/tours')} style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 500 }}>
                        {part}
                    </Link>
                );
            }
            if (lowerPart === 'whatsapp') {
                return (
                    <a key={i} href="https://wa.me/212724114775" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 500 }}>
                        {part}
                    </a>
                );
            }
            if (lowerPart.startsWith('private driver') || lowerPart.startsWith('chauffeur')) {
                return (
                    <Link key={i} href={isEs ? getPath('/private-driver-morocco') : getPath('/private-driver')} style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 500 }}>
                        {part}
                    </Link>
                );
            }
            return part;
        });
    };

    // FAQPage JSON-LD
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(item => ({
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
                "name": isEn ? "Home" : isEs ? "Inicio" : "Accueil",
                "item": `https://mdinatours.com/${language}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQ",
                "item": `https://mdinatours.com/${language}/faq`
            }
        ]
    };

    return (
        <>
            <Header />
            <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
                <PageBanner 
                    title={isEn ? 'Frequently Asked Questions' : isEs ? 'Preguntas Frecuentes' : 'Foire Aux Questions'}
                    bgImage="/img/Morocco-trip-tour-hero05.webp"
                    homeLabel={t('home')}
                    homeLink={getPath('/')}
                    currentLabel="FAQ"
                />

                {/* FAQ Accordion List */}
                <section style={{ padding: '80px 20px' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {categories.map((category, catIdx) => (
                            <div key={catIdx} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <h2 style={{
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary)',
                                    borderBottom: '2px solid rgba(220, 131, 78, 0.15)',
                                    paddingBottom: '10px',
                                    marginBottom: '10px'
                                }}>
                                    {category.title}
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {category.items.map((item, idx) => (
                                        <details key={idx} style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            padding: '20px 25px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                                            cursor: 'pointer'
                                        }} className="faq-details">
                                            <summary style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                color: 'var(--secondary)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                listStyle: 'none'
                                            }} className="faq-summary">
                                                <span>{item.q}</span>
                                                <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }} className="faq-icon">▾</span>
                                            </summary>
                                            <p style={{
                                                fontSize: '1rem',
                                                color: '#666',
                                                lineHeight: 1.6,
                                                marginTop: '15px',
                                                cursor: 'default'
                                            }}>
                                                {renderAnswer(item.a)}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer lang={language} />
            <FloatingElements />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
        </>
    );
}

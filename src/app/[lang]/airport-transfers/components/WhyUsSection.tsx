"use client";

import Image from 'next/image';
import { Locale } from '@/lib/airportTransfersData';
import styles from './WhyUsSection.module.css';

interface WhyUsSectionProps {
    lang: Locale;
}

export default function WhyUsSection({ lang }: WhyUsSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        title: isAr
            ? 'لماذا تختار مدينة تورز لتنقلاتك من وإلى مطارات المغرب'
            : isFr
            ? 'Pourquoi choisir Mdina Tours pour votre transfert aéroport'
            : isEs
            ? 'Por qué elegir Mdina Tours para su traslado de aeropuerto'
            : 'Why choose Mdina Tours for your airport transfer',
        items: [
            {
                id: 'flight',
                title: isAr
                    ? 'تتبع مجاني للرحلات'
                    : isFr
                    ? 'Suivi de vol offert'
                    : isEs
                    ? 'Seguimiento de vuelo sin cargo'
                    : 'Free flight tracking',
                desc: isAr
                    ? 'تأخر موعد الهبوط؟ يتكيف سائقك تلقائياً دون أي تكلفة إضافية.'
                    : isFr
                    ? "Atterrissage retardé ? Votre chauffeur s'adapte sans surcoût."
                    : isEs
                    ? '¿Llegada con retraso? Su chófer se ajusta sin coste extra.'
                    : 'Late landing? Your driver adjusts at no extra cost.'
            },
            {
                id: 'meet',
                title: isAr
                    ? 'استقبال بالاسم في صالة الوصول'
                    : isFr
                    ? 'Accueil nominatif en arrivées'
                    : isEs
                    ? 'Bienvenida en llegadas'
                    : 'Meet & greet in arrivals',
                desc: isAr
                    ? 'تجاوز طوابير التاكسي. ينتظرك سائقك في الداخل حاملاً لافتة باسمك.'
                    : isFr
                    ? "Évitez la file des taxis. Votre chauffeur vous attend à l'intérieur avec une pancarte à votre nom."
                    : isEs
                    ? 'Evite colas de taxis. Su chófer le espera dentro con un cartel con su nombre.'
                    : 'Skip the taxi queue. Your driver waits inside with your name on a sign.'
            },
            {
                id: 'pay',
                title: isAr
                    ? 'الدفع عند الوصول'
                    : isFr
                    ? "Paiement à l'arrivée"
                    : isEs
                    ? 'Pago a la llegada'
                    : 'Pay on arrival',
                desc: isAr
                    ? 'بدون أي تسبيق. ادفع لسائقك نقداً أو بالبطاقة باليورو أو الدولار أو الدرهم.'
                    : isFr
                    ? 'Sans acompte. Réglez votre chauffeur en espèces ou par carte, en EUR, USD ou MAD.'
                    : isEs
                    ? 'Sin depósito previo. Pague a su chófer en efectivo o tarjeta, en EUR, USD o MAD.'
                    : 'No deposit. Pay your driver in cash or card, in EUR, USD or MAD.'
            },
            {
                id: 'vetted',
                title: isAr
                    ? 'سائقون معتمدون ومحترفون'
                    : isFr
                    ? 'Chauffeurs certifiés et agréés'
                    : isEs
                    ? 'Chóferes certificados y verificados'
                    : 'Licensed, vetted chauffeurs',
                desc: isAr
                    ? 'سائقون موثوقون ومفحوصون يتحدثون الإنجليزية، الفرنسية، الإسبانية والعربية.'
                    : isFr
                    ? 'Chauffeurs qualifiés et vérifiés parlant anglais, français, espagnol et arabe.'
                    : isEs
                    ? 'Conductores profesionales verificados que hablan inglés, francés, español y árabe.'
                    : 'Background-checked drivers who speak English, French, Spanish and Arabic.'
            }
        ]
    };

    return (
        <section className={styles.section} id="why-us">
            <div className={styles.wrap}>
                <div className={styles.contentCol}>
                    <h2 className={styles.hd}>{text.title}</h2>
                    <ul className={styles.list}>
                        <li className={styles.it}>
                            <span className={styles.ico} aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A8541F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                                </svg>
                            </span>
                            <div className={styles.itemText}>
                                <h3>{text.items[0].title}</h3>
                                <p>{text.items[0].desc}</p>
                            </div>
                        </li>

                        <li className={styles.it}>
                            <span className={styles.ico} aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A8541F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                                </svg>
                            </span>
                            <div className={styles.itemText}>
                                <h3>{text.items[1].title}</h3>
                                <p>{text.items[1].desc}</p>
                            </div>
                        </li>

                        <li className={styles.it}>
                            <span className={styles.ico} aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A8541F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                                </svg>
                            </span>
                            <div className={styles.itemText}>
                                <h3>{text.items[2].title}</h3>
                                <p>{text.items[2].desc}</p>
                            </div>
                        </li>

                        <li className={styles.it}>
                            <span className={styles.ico} aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A8541F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </span>
                            <div className={styles.itemText}>
                                <h3>{text.items[3].title}</h3>
                                <p>{text.items[3].desc}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <Image
                    src="/a-mdiinatours/selfie-joyeux-voiture-famille.webp"
                    alt={
                        isAr
                            ? "عائلة سعيدة في سيارة توصيل خاصة مع مدينة تورز"
                            : isFr
                            ? "Famille heureuse profitant d'un transfert privé avec Mdina Tours"
                            : isEs
                            ? "Familia feliz disfrutando de un traslado privado con Mdina Tours"
                            : "Happy family enjoying a private transfer with Mdina Tours"
                    }
                    width={560}
                    height={520}
                    className={styles.ph}
                    priority={false}
                />
            </div>
        </section>
    );
}

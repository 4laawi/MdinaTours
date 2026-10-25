"use client";

import Image from 'next/image';
import { Locale } from '@/lib/airportTransfersData';
import { Icon } from '@iconify/react';
import styles from '../AirportTransfers.module.css';

interface WhyUsSectionProps {
    lang: Locale;
}

export default function WhyUsSection({ lang }: WhyUsSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        eyebrow: isAr ? 'راحة بال مطلقة' : isFr ? 'TRANQUILLITÉ ABSOLUE' : isEs ? 'MÁXIMA TRANQUILIDAD' : 'PEACE OF MIND',
        title: isAr ? 'لماذا تختار مدينة تورز لتنقلاتك من وإلى مطارات المغرب' : isFr ? 'Pourquoi choisir Mdina Tours pour votre transfert aéroport' : isEs ? 'Por qué elegir Mdina Tours para su traslado de aeropuerto' : 'Why Choose Mdina Tours for Your Airport Transfer',
        subtitle: isAr 
            ? 'من لحظة هبوط طائرتك وحتى عتبة فندقك أو رياضك، نضمن لك وصولاً مريحاً وخالياً من أي قلق.'
            : isFr 
            ? 'De l\'atterrissage jusqu\'au seuil de votre riad, nous éliminons tout stress lié à votre transport.'
            : isEs 
            ? 'Desde el aterrizaje hasta la puerta de su riad u hotel, eliminamos cualquier incertidumbre con total transparencia.'
            : 'From touchdown to your hotel or riad doorstep, we remove all airport stress with absolute clarity and calm.',
        driverBadge: isAr ? 'سائقون محترفون ومعتمدون 100%' : isFr ? 'Chauffeurs professionnels agréés 100%' : isEs ? 'Chóferes profesionales 100% certificados' : '100% Vetted Licensed Local Drivers'
    };

    const pillars = [
        {
            icon: 'solar:radar-2-bold',
            title: isAr ? 'تتبع مجاني لتأخير الرحلات' : isFr ? 'Suivi en direct des retards de vol' : isEs ? 'Seguimiento de retrasos sin cargo' : 'Free flight delay monitoring',
            desc: isAr 
                ? 'نتابع رقم رحلتك مباشرة. إذا تأخرت طائرتك، يتكيف موعد سائقك تلقائياً دون أي تكلفة إضافية.' 
                : isFr 
                ? 'Nous suivons votre vol en temps réel. En cas de retard ou d\'avance, votre chauffeur s\'adapte sans aucun supplément.' 
                : isEs 
                ? 'Rastreamos su vuelo en tiempo real. Si se retrasa, su chófer le espera sin recargo alguno por tiempo.' 
                : 'We track your flight number in real time. Late landing? Your driver adjusts automatically with zero extra fees.'
        },
        {
            icon: 'solar:user-id-bold',
            title: isAr ? 'استقبال شخصي بالاسم داخل المطار' : isFr ? 'Accueil personnalisé avec pancarte' : isEs ? 'Recepción con cartel personalizado' : 'Terminal meet & greet at arrivals',
            desc: isAr 
                ? 'لا داعي للبحث عن سيارات الأجرة. ينتظرك سائقك داخل صالة الوصول حاملاً لافتة باسمك وجاهزاً للمساعدة في حقائبك.' 
                : isFr 
                ? 'Évitez les files d\'attente. Votre chauffeur vous attend dans le hall des arrivées avec une pancarte à votre nom.' 
                : isEs 
                ? 'Olvídese de hacer colas. Su chófer le recibe en la terminal con un cartel nominativo y le asiste con las maletas.' 
                : 'Skip the taxi queues. Your chauffeur waits inside the arrivals hall holding a sign with your name, ready to take your luggage.'
        },
        {
            icon: 'solar:wallet-money-bold',
            title: isAr ? 'الدفع عند الوصول · بدون تسبيق مالي' : isFr ? 'Paiement à l\'arrivée · Sans acompte' : isEs ? 'Pago a la llegada · Sin depósito previo' : 'Pay on arrival · Zero deposit required',
            desc: isAr 
                ? 'احجز بثقة تامة. ادفع لسائقك بعد انتهاء الرحلة نقداً أو بالبطاقة البنكية باليورو، الدولار أو الدرهم المغربي.' 
                : isFr 
                ? 'Réservez l\'esprit tranquille sans avance bancaire. Réglez à destination en espèces ou par carte (EUR, USD ou MAD).' 
                : isEs 
                ? 'Reserve con total tranquilidad. Abone el viaje al finalizar en efectivo o con tarjeta (EUR, USD o MAD).' 
                : 'Book with complete confidence. Pay your driver upon arrival via cash or card in EUR, USD, or Moroccan Dirhams.'
        },
        {
            icon: 'solar:shield-check-bold',
            title: isAr ? 'سائقون متعددو اللغات ومعتمدون' : isFr ? 'Chauffeurs professionnels multilingues' : isEs ? 'Conductores profesionales multilingües' : 'Multilingual licensed chauffeurs',
            desc: isAr 
                ? 'سائقون ذوو خبرة وأخلاق عالية يتحدثون الإنجليزية، الفرنسية، الإسبانية والعربية بطلاقة لتواصل سلس ومريح.' 
                : isFr 
                ? 'Chauffeurs courtois et qualifiés parlant couramment l\'anglais, le français, l\'espagnol et l\'arabe.' 
                : isEs 
                ? 'Chóferes experimentados que dominan español, inglés, francés y árabe para una comunicación perfecta.' 
                : 'Friendly, background-checked professional drivers fluent in English, French, Spanish, and Arabic.',
            hasBadges: true
        }
    ];

    return (
        <section className={styles.sectionLight} id="why-us">
            <div className={styles.container}>
                <div className={styles.sectionHeaderLeft}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                <div className={styles.whyUsBlock}>
                    {/* Left: 4 Concrete Pillars with Short Sentences */}
                    <div className={styles.whyUsList}>
                        {pillars.map((item, idx) => (
                            <div key={idx} className={styles.whyUsItem}>
                                <div className={styles.whyUsIconWrap} aria-hidden="true">
                                    <Icon icon={item.icon} width="22" height="22" />
                                </div>
                                <div>
                                    <h3 className={styles.whyUsItemTitle}>{item.title}</h3>
                                    <p className={styles.whyUsItemText}>{item.desc}</p>
                                    {item.hasBadges && (
                                        <div className={styles.driverLanguageBadges}>
                                            <span className={styles.driverLangBadge}>
                                                <Icon icon="circle-flags:gb" width="14" height="14" />
                                                English
                                            </span>
                                            <span className={styles.driverLangBadge}>
                                                <Icon icon="circle-flags:fr" width="14" height="14" />
                                                Français
                                            </span>
                                            <span className={styles.driverLangBadge}>
                                                <Icon icon="circle-flags:es" width="14" height="14" />
                                                Español
                                            </span>
                                            <span className={styles.driverLangBadge}>
                                                <Icon icon="circle-flags:ma" width="14" height="14" />
                                                العربية (Darija)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Real Photograph of Driver beside text */}
                    <div className={styles.whyUsMediaShell}>
                        <div className={styles.whyUsMediaCore}>
                            <Image
                                src="/b-roll/chauffaur.jpg"
                                alt="Professional Mdina Tours airport transfer chauffeur"
                                fill
                                sizes="(max-width: 768px) 100vw, 480px"
                                className={styles.whyUsImg}
                                loading="lazy"
                            />
                            <div className={styles.whyUsFloatBadge}>
                                <span className={styles.badgePulseDot} />
                                <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>{text.driverBadge}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

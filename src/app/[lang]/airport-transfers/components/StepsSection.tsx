"use client";

import { Locale } from '@/lib/airportTransfersData';
import styles from '../AirportTransfers.module.css';

interface StepsSectionProps {
    lang: Locale;
}

export default function StepsSection({ lang }: StepsSectionProps) {
    const isAr = lang === 'ar';
    const isFr = lang === 'fr';
    const isEs = lang === 'es';

    const text = {
        eyebrow: isAr ? 'سهولة الحجز' : isFr ? 'PROCESSUS ULTRA SIMPLE' : isEs ? 'PROCESO SENCILLO' : 'EFFORTLESS BOOKING',
        title: isAr ? 'كيف تعمل خدمة الاستقبال في مطارات المغرب بـ 3 خطوات' : isFr ? 'Votre accueil aéroport au Maroc en 3 étapes simples' : isEs ? 'Cómo funciona su traslado de aeropuerto en 3 sencillos pasos' : 'How Our Morocco Airport Pickup Works in 3 Steps',
        subtitle: isAr 
            ? 'تستغرق عملية ترتيب خدمة التوصيل أقل من دقيقة واحدة مع تأكيد مباشر على الواتساب.'
            : isFr 
            ? 'La réservation de votre chauffeur privé prend moins de 60 secondes avec confirmation immédiate.'
            : isEs 
            ? 'Organizar su chófer privado le llevará menos de 60 segundos con confirmación directa.'
            : 'Arranging your private Morocco airport chauffeur takes less than 60 seconds with instant WhatsApp confirmation.'
    };

    const steps = [
        {
            num: '01',
            title: isAr ? 'اختر مسارك وسيارتك' : isFr ? 'Choisissez votre trajet & véhicule' : isEs ? 'Elija ruta y categoría de vehículo' : 'Choose route & preferred vehicle',
            desc: isAr 
                ? 'حدد مطار الوصول ووجهتك في الفندق أو الرياض واطلع على السعر الثابت الفوري.' 
                : isFr 
                ? 'Sélectionnez votre aéroport d\'arrivée et votre hôtel ou riad pour obtenir votre tarif fixe instantané.' 
                : isEs 
                ? 'Indique su aeropuerto de llegada y su hotel o riad para ver su precio cerrado al instante.' 
                : 'Select your arrival airport and hotel or riad destination to view your instant fixed price.'
        },
        {
            num: '02',
            title: isAr ? 'تأكيد فوري عبر الواتساب أو الإيميل' : isFr ? 'Confirmation instantanée WhatsApp ou Email' : isEs ? 'Confirmación rápida por WhatsApp o Email' : 'Instant WhatsApp or email confirmation',
            desc: isAr 
                ? 'استلم تفاصيل حجزك الكاملة ورقم التواصل المباشر مع سائقك دون الحاجة لدفع أي تسبيق.' 
                : isFr 
                ? 'Recevez vos détails de réservation et le contact direct de votre chauffeur sans aucun acompte bancaire.' 
                : isEs 
                ? 'Reciba los detalles y el teléfono directo de su conductor sin ningún cobro por adelantado.' 
                : 'Receive complete trip details and your driver’s direct contact with zero advance deposit required.'
        },
        {
            num: '03',
            title: isAr ? 'التقِ بسائقك داخل صالة الوصول' : isFr ? 'Retrouvez votre chauffeur avec votre nom' : isEs ? 'Encuentro en llegadas con su nombre' : 'Meet your driver with your name sign',
            desc: isAr 
                ? 'ينتظرك سائقك بعد مخرج الجمارك حاملاً لافتة باسمك، ويساعدك في حمل حقائبك والدفع بأمان عند الوصول.' 
                : isFr 
                ? 'Votre chauffeur vous attend dès la sortie des douanes avec pancarte nominative. Règlement sécurisé à l\'arrivée.' 
                : isEs 
                ? 'Su chófer le espera tras la aduana con cartel a su nombre. Abone su traslado cómodamente al llegar.' 
                : 'Your chauffeur greets you inside arrivals past customs with your name board, assists with luggage, and you pay safely at your destination.'
        }
    ];

    return (
        <section className={styles.sectionAlt} id="how-it-works">
            <div className={styles.container}>
                <div className={styles.sectionHeaderCenter}>
                    <span className={styles.sectionEyebrow}>{text.eyebrow}</span>
                    <h2 className={styles.sectionTitle}>{text.title}</h2>
                    <p className={styles.sectionSubtitle}>{text.subtitle}</p>
                </div>

                <div className={styles.stepsGrid}>
                    {steps.map((st) => (
                        <div key={st.num} className={styles.stepCardShell}>
                            <div className={styles.stepCardCore}>
                                <div className={styles.stepLargeNumeral}>{st.num}</div>
                                <h3 className={styles.stepTitle}>{st.title}</h3>
                                <p className={styles.stepDesc}>{st.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

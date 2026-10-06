import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import styles from './TailoredTransportGallery.module.css';

interface TailoredTransportGalleryProps {
  lang?: Language;
}

export default function TailoredTransportGallery({ lang = 'en' }: TailoredTransportGalleryProps) {
  const isEn = lang === 'en';
  const isEs = lang === 'es';

  const getPath = (path: string) => (lang === 'en' && path === '/' ? '/' : `/${lang}${path === '/' ? '' : path}`);

  const items = [
    {
      id: 'airport',
      title: isEn ? "Airport Transfers" : (isEs ? "Traslados de Aeropuerto" : "Transferts Aéroport"),
      desc: isEn 
        ? "Personalized terminal meet & greet with live flight tracking, baggage assistance, and direct vehicle departure."
        : isEs
        ? "Recepción personalizada en terminal con seguimiento de vuelos en directo, ayuda con equipaje y salida directa."
        : "Accueil personnalisé en sortie de terminal avec suivi de vol en direct, aide aux bagages et départ immédiat.",
      image: "/img2/aeroport-marrakech.webp",
      href: getPath('/transfers')
    },
    {
      id: 'eight-days-tour',
      title: isEn ? "8-Day Morocco Tour" : (isEs ? "Circuito 8 Días en Marruecos" : "Circuit 8 Jours au Maroc"),
      desc: isEn
        ? "Complete 8-day private car & chauffeur circuit exploring imperial cities, Atlas Mountain passes, Sahara dunes & Chefchaouen."
        : isEs
        ? "Circuito privado de 8 días en vehículo con chófer por ciudades imperiales, el Atlas, las dunas del Sahara y Chefchaouen."
        : "Circuit privé de 8 jours avec véhicule et chauffeur dédié reliant villes impériales, Haut Atlas, dunes du Sahara et Chefchaouen.",
      image: "/img/Morocco-trip-tour-hero01.webp",
      href: getPath('/car-with-driver-morocco-8-days')
    },
    {
      id: 'hourly',
      title: isEn ? "Hourly & Daily Chauffeur" : (isEs ? "Chófer por Horas y Días" : "Chauffeur à la Journée"),
      desc: isEn
        ? "Total schedule flexibility with a dedicated vehicle and driver at your disposal for business meetings, dinners, or city outings."
        : isEs
        ? "Total libertad de horarios con un vehículo y conductor privado a su disposición para reuniones, cenas o visitas."
        : "Flexibilité totale avec un véhicule et chauffeur privé à votre disposition pour réunions, dîners ou déplacements urbains.",
      image: "/a-mdiinatours/chauffeur-costume-mercedes-noires.webp",
      href: getPath('/private-driver-morocco')
    },
    {
      id: 'intercity',
      title: isEn ? "Intercity Long Distance" : (isEs ? "Traslados Interurbanos" : "Trajets Intervilles"),
      desc: isEn
        ? "Comfortable, fixed-rate private travel between Morocco's imperial cities, coastal destinations, and mountain routes."
        : isEs
        ? "Viajes privados cómodos a tarifa fija entre ciudades imperiales, costa atlántica y rutas del Atlas."
        : "Déplacements privés et confortables à tarif fixe entre villes impériales, côte atlantique et routes de l'Atlas.",
      image: "/a-mdiinatours/private-driver-vito-morocco.webp",
      href: getPath('/transfers')
    },
    {
      id: 'multiday',
      title: isEn ? "Multi-Day Custom Circuits" : (isEs ? "Circuitos de Varios Días" : "Circuits Multi-Jours"),
      desc: isEn
        ? "Tailor-made itineraries across Morocco spanning imperial cities, the High Atlas, and the Sahara desert with your dedicated driver."
        : isEs
        ? "Itinerarios personalizados de varios días por ciudades imperiales, el Atlas y el desierto con su propio conductor."
        : "Itinéraires personnalisés sur plusieurs jours à travers le Maroc, le Haut Atlas et le désert avec votre chauffeur dédié.",
      image: "/FIGURES/Mdina Tours Happy Tourists in Morocco (1).webp",
      href: getPath('/private-driver-morocco')
    },
    {
      id: 'daytrips',
      title: isEn ? "Private Day Trips" : (isEs ? "Excursiones de un Día" : "Excursions Privées"),
      desc: isEn
        ? "Flexible private day tours to Essaouira, Agafay, Ourika Valley, Chefchaouen, or Ouzoud Waterfalls at your own pace."
        : isEs
        ? "Excursiones privadas de un día a Essaouira, Agafay, Ourika, Chefchaouen o Cascadas de Ouzoud a su propio ritmo."
        : "Excursions d'une journée à Essaouira, Agafay, vallée de l'Ourika, Chefchaouen ou cascades d'Ouzoud à votre rythme.",
      image: "/a-mdiinatours/fourgon-mercedes-entree-marocaine.webp",
      href: getPath('/tours')
    }
  ];

  return (
    <section className={styles.gallerySection} aria-label={isEn ? "Tailored Transport Solutions" : (isEs ? "Transporte a Medida" : "Transport Sur Mesure")}>
      <div className={styles.ambientGlow} />
      
      <div className={styles.innerContainer}>
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>
            {isEn ? "Bespoke Mobility Spectrum" : (isEs ? "Gama de Servicios" : "Gamme de Services")}
          </span>
          <h2 className={styles.title}>
            {isEn ? "Tailored Transport" : (isEs ? "Transporte a Medida" : "Transport Sur Mesure")}
          </h2>
          <p className={styles.subtitle}>
            {isEn 
              ? "From airport arrivals to multi-day Sahara expeditions, every service is private, punctual, and adapted to your itinerary."
              : isEs
              ? "Desde llegadas de aeropuerto hasta expediciones al Sáhara, cada servicio es privado, puntual y adaptado a su plan."
              : "Des arrivées aéroport aux expéditions dans le désert, chaque trajet est 100% privé, ponctuel et adapté à vos souhaits."}
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={item.id} href={item.href} className={styles.galleryCard}>
              <div className={styles.imageFrame}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImage}
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  <span>{item.title}</span>
                </h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import styles from './PrivateChauffeurManifesto.module.css';

interface PrivateChauffeurManifestoProps {
  lang?: Language;
}

export default function PrivateChauffeurManifesto({ lang = 'en' }: PrivateChauffeurManifestoProps) {
  const isEn = lang === 'en';
  const isEs = lang === 'es';

  const getPath = (path: string) => (lang === 'en' && path === '/' ? '/' : `/${lang}${path === '/' ? '' : path}`);

  return (
    <section className={styles.manifestoSection} aria-label={isEn ? "Private Chauffeur Philosophy" : (isEs ? "Filosofía de Chófer Privado" : "Philosophie Chauffeur Privé")}>
      <div className={styles.innerContainer}>
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>
            {isEn ? "Executive Mobility & Custom Travel" : (isEs ? "Movilidad Ejecutiva y Viajes a Medida" : "Mobilité d'Excellence & Voyages Sur Mesure")}
          </span>
          <h2 className={styles.title}>
            {isEn ? "Private Chauffeur Morocco" : (isEs ? "Chófer Privado en Marruecos" : "Chauffeur Privé au Maroc")}
          </h2>
          <div className={styles.dividerLine} />
        </div>

        <div className={styles.proseGrid}>
          <p className={styles.proseColumn}>
            {isEn ? (
              <>
                Our private chauffeurs, carefully selected for their road mastery and impeccable courtesy, deliver a bespoke service combining punctuality, discretion, and effortless comfort. Whether for seamless <Link href={getPath('/transfers')} className={styles.linkInline}>airport arrivals</Link>, panoramic imperial city connections, or high-level business summits, each journey is calibrated exclusively around your personal pace.
              </>
            ) : isEs ? (
              <>
                Nuestros chóferes privados, rigurosamente seleccionados por su dominio de las rutas y su cortesía impecable, ofrecen un servicio exclusivo combinando puntualidad, discreción y confort absoluto. Ya sea para <Link href={getPath('/transfers')} className={styles.linkInline}>traslados de aeropuerto</Link>, conexiones entre ciudades imperiales o cumbres de negocios, cada trayecto se adapta a su propio ritmo.
              </>
            ) : (
              <>
                Nos chauffeurs privés, rigoureusement sélectionnés pour leur maîtrise routière et leur courtoisie exemplaire, vous offrent un service haut de gamme alliant ponctualité, discrétion et confort sur mesure. Qu&apos;il s&apos;agisse de <Link href={getPath('/transfers')} className={styles.linkInline}>transferts aéroportuaires</Link>, de liaisons entre villes impériales ou de rendez-vous d&apos;affaires, chaque trajet s&apos;adapte fidèlement à votre rythme.
              </>
            )}
          </p>

          <p className={styles.proseColumn}>
            {isEn ? (
              <>
                With a fleet of pristine executive vehicles—including <Link href={getPath('/private-driver-morocco')} className={styles.linkInline}>Mercedes Vito minivans, luxury sedans, and executive Sprinters</Link>—we provide tailored solutions for independent travelers, families, corporate delegates, and VIP guests across Marrakech, Casablanca, Rabat, Tangier, and the Sahara.
              </>
            ) : isEs ? (
              <>
                Con una flota de vehículos de primera categoría—incluyendo <Link href={getPath('/private-driver-morocco')} className={styles.linkInline}>minivans Mercedes Vito, berlinas de confort y minibuses ejecutivos</Link>—brindamos soluciones a medida para viajeros independientes, familias, delegaciones corporativas y clientes VIP en Marrakech, Casablanca, Rabat, Tánger y el Sáhara.
              </>
            ) : (
              <>
                Avec une flotte de véhicules récents et entretenus avec rigueur—notamment nos <Link href={getPath('/private-driver-morocco')} className={styles.linkInline}>minivans Mercedes Vito, berlines de confort et minibus exécutifs</Link>—nous concevons des solutions sur mesure pour voyageurs exigeants, familles, délégations d&apos;entreprises et hôtes de prestige à travers tout le Maroc.
              </>
            )}
          </p>
        </div>

        <div className={styles.ctaWrapper}>
          <Link href={getPath('/private-driver-morocco')} className={styles.ctaLink}>
            <span>
              {isEn
                ? "Explore Private Driver Morocco"
                : isEs
                ? "Explorar Conductor Privado en Marruecos"
                : "Découvrir Chauffeur Privé Maroc"}
            </span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

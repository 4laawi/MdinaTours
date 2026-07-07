"use client";

import { useState } from 'react';
import { TourData } from '@/lib/toursData';
import { useLanguage } from '@/context/LanguageContext';
import TourBookingModal from './TourBookingModal';

interface TourBookingWidgetProps {
    tour: TourData;
}

export default function TourBookingWidget({ tour }: TourBookingWidgetProps) {
    const { language, t } = useLanguage();
    const isEn = language === 'en';
    const local = tour[language];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={{
            backgroundColor: '#202f59',
            borderRadius: '16px',
            padding: '35px',
            color: '#fff',
            position: 'sticky',
            top: '120px',
            boxShadow: '0 20px 40px rgba(32,47,89,0.15)'
        }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                {isEn ? 'Private & Custom' : 'Privé & Sur Mesure'}
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 300, color: '#fff', margin: '0 0 15px 0', fontFamily: "'Cormorant Garamond', serif" }}>
                {isEn ? 'Request Private Booking' : 'Demande d\'Excursion'}
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>€{tour.price}</span>
                <span style={{ color: '#ccc', fontSize: '0.95rem' }}>/ {isEn ? 'starting price' : 'tarif de départ'}</span>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', padding: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: '#aaa' }}>{isEn ? 'Duration' : 'Durée'}:</span>
                    <span style={{ fontWeight: 600 }}>{local.duration}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: '#aaa' }}>{isEn ? 'Availability' : 'Disponibilité'}:</span>
                    <span style={{ fontWeight: 600, color: '#2ecc71' }}>{isEn ? 'Daily departures' : 'Tous les jours'}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ color: '#aaa' }}>{isEn ? 'Base Location' : 'Départ de'}:</span>
                    <span style={{ fontWeight: 600 }}>Rabat / Casablanca</span>
                </li>
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        backgroundColor: '#2ecc71',
                        color: '#fff',
                        padding: '15px 25px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '1rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'background-color 0.2s',
                        width: '100%'
                    }}
                >
                    {t('book_tour_btn')}
                </button>
            </div>

            <TourBookingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                selectedTour={tour} 
            />
        </div>
    );
}

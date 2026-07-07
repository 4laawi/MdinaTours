"use client";

import React from 'react';

interface PrivateDriverMetaSectionProps {
    language: 'en' | 'fr';
}

export default function PrivateDriverMetaSection({ language }: PrivateDriverMetaSectionProps) {
    const isEn = language === 'en';

    return (
        <div className="transfer-meta-section" style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            color: 'var(--text)',
            marginTop: '20px',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <h2 style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                fontWeight: 600,
                color: 'var(--secondary)',
                margin: 0,
                lineHeight: 1.15
            }}>
                {isEn ? "Ultimate Travel Freedom" : "Liberté de Voyage Absolue"}
            </h2>
            <p style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '0.9375rem',
                color: 'var(--text)',
                margin: 0,
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                <span>{isEn ? 'Takes you wherever you want' : 'Vous emmène où vous voulez'}</span>
                <span style={{ color: 'var(--border)' }}>•</span>
                <span>{isEn ? 'Fully customizable' : 'Entièrement personnalisable'}</span>
                <span style={{ color: 'var(--border)' }}>•</span>
                <span>
                    {isEn 
                        ? `From €80 per day for up to 3 people` 
                        : `À partir de €80 par jour jusqu'à 3 personnes`
                    }
                </span>
            </p>
            
            {/* Pill Badges Container */}
            <div className="d_f-bm4 gap-fy9" style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div className="pos-eew grid-r4m grid-3iw column-c78 ai_-lol fw_-nsn lh_-wnj ta_-35a bdr-kmn --borderColor_currentColor-g9h --backgroundColor_transparent-zpp --height_24px-xps --padding_0_8px-9mv --fontSize_12px-pcv --gap_4px-f84 icon-xs7" style={{
                    border: '1px solid var(--secondary)',
                    borderRadius: '666px',
                    padding: '0 10px',
                    height: '28px',
                    fontSize: '12px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--secondary)',
                    backgroundColor: 'transparent'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w_1em h_1em va_text-top fill_none hz-icon" style={{ width: '13px', height: '13px', display: 'block', verticalAlign: 'middle' }}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {isEn ? 'No time limits' : 'Sans limite de temps'}
                </div>
                <div className="pos-eew grid-r4m grid-3iw column-c78 ai_-lol fw_-nsn lh_-wnj ta_-35a bdr-kmn --borderColor_currentColor-g9h --backgroundColor_transparent-zpp --height_24px-xps --padding_0_8px-9mv --fontSize_12px-pcv --gap_4px-f84 icon-xs7" style={{
                    border: '1px solid var(--secondary)',
                    borderRadius: '666px',
                    padding: '0 10px',
                    height: '28px',
                    fontSize: '12px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--secondary)',
                    backgroundColor: 'transparent'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w_1em h_1em va_text-top fill_none hz-icon" style={{ width: '13px', height: '13px', display: 'block', verticalAlign: 'middle' }}>
                        <circle cx="5" cy="18" r="2.5" fill="currentColor" />
                        <circle cx="19" cy="6" r="2.5" fill="currentColor" />
                        <path d="M7.5 18h3.5a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4h2.5" />
                    </svg>
                    {isEn ? 'Takes you wherever you want' : 'Vous emmène où vous voulez'}
                </div>
                <div className="pos-eew grid-r4m grid-3iw column-c78 ai_-lol fw_-nsn lh_-wnj ta_-35a bdr-kmn --borderColor_currentColor-g9h --backgroundColor_transparent-zpp --height_24px-xps --padding_0_8px-9mv --fontSize_12px-pcv --gap_4px-f84 icon-xs7" style={{
                    border: '1px solid var(--secondary)',
                    borderRadius: '666px',
                    padding: '0 10px',
                    height: '28px',
                    fontSize: '12px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--secondary)',
                    backgroundColor: 'transparent'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w_1em h_1em va_text-top fill_none hz-icon" style={{ width: '13px', height: '13px', display: 'block', verticalAlign: 'middle' }}>
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
                    </svg>
                    {isEn ? 'Private driver' : 'Chauffeur privé'}
                </div>
            </div>
        </div>
    );
}

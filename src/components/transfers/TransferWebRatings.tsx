import React from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TransferWebRatings(props: any) {
  const { isEn } = props;

  return (
    <div className="web-ratings-card">
        <div className="web-ratings-flex">
            <div className="web-ratings-info">
                <p className="web-ratings-title">
                    {isEn ? "Rated across the web" : "Reconnu sur le web"}
                </p>
                <p className="web-ratings-subtitle">
                    {isEn ? "Independent traveler feedback" : "Avis de voyageurs indépendants"}
                </p>
            </div>
            <div className="web-ratings-badges">
                {/* TripAdvisor Badge */}
                <a 
                    href="https://www.tripadvisor.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="web-rating-badge-link"
                >
                    <div className="web-rating-badge-header">
                        <div className="web-rating-badge-brand">
                            <Image 
                                src="/img2/TripAdvisor_Logo.svg" 
                                alt="Tripadvisor" 
                                width={113} 
                                height={24} 
                                className="web-rating-logo-img" 
                            />
                        </div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="web-rating-arrow-icon" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                    <div className="web-rating-badge-stars-row">
                        <div className="tripadvisor-dots" aria-label="5 out of 5 stars">
                            <div className="tripadvisor-dot" />
                            <div className="tripadvisor-dot" />
                            <div className="tripadvisor-dot" />
                            <div className="tripadvisor-dot" />
                            <div className="tripadvisor-dot" />
                        </div>
                        <span className="web-rating-value">4.9</span>
                        <span className="web-rating-count">
                            5,281 {isEn ? "reviews" : "avis"}
                        </span>
                    </div>
                </a>

                {/* Trustpilot Badge */}
                <a 
                    href="https://www.trustpilot.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="web-rating-badge-link"
                >
                    <div className="web-rating-badge-header">
                        <div className="web-rating-badge-brand">
                            <Image 
                                src="/img2/trustpilot-logo.webp" 
                                alt="Trustpilot" 
                                width={98} 
                                height={24} 
                                className="web-rating-logo-img" 
                            />
                        </div>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="web-rating-arrow-icon" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                    <div className="web-rating-badge-stars-row">
                        {/* Trustpilot 5 Star Box Graphic */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 96" style={{ display: 'block', height: '18px', width: '96px' }} aria-label="5 out of 5 stars">
                            <g>
                                <path d="M0 0h96v96H0zm104 0h96v96h-96zm104 0h96v96h-96zm104 0h96v96h-96zm104 0h96v96h-96z" fill="#00b67a" />
                                <path d="M48 64.7 62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z" fill="#fff" />
                            </g>
                        </svg>
                        <span className="web-rating-value">4.6</span>
                        <span className="web-rating-count">
                            1,069 {isEn ? "reviews" : "avis"}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
  );
}

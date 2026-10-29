import React from 'react';
import Image from 'next/image';
import { MapPin, Plane, Train, Hotel, Building2, Lightbulb } from 'lucide-react';
import { LocalizedTransferData } from '@/lib/transfersData';

interface TransferDestinationInfoProps {
  local: LocalizedTransferData;
  isEn?: boolean;
  transText?: Record<string, string>;
}

export default function TransferDestinationInfo({ local, isEn = true, transText }: TransferDestinationInfoProps) {
  const aboutDestLabel = transText?.aboutDest || (isEn ? "About the Destination" : "À propos de la destination");
  const popularDropoffsLabel = transText?.popularDropoffs || (isEn ? "Popular Drop-off Locations" : "Lieux de dépose fréquents");
  const travelTipsLabel = transText?.travelTips || (isEn ? "Travel Tips for this Route" : "Conseils de voyage");

  return (
    <>
      {/* About the Destination Section */}
      {local.aboutDestination && (
          <div style={{ padding: '0px' }} className="about-destination-section">
              <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: 'var(--secondary)', 
                  marginBottom: '16px', 
                  fontFamily: "var(--font-poppins), sans-serif", 
                  letterSpacing: '0.3px', 
                  minHeight: '1.2em' 
              }}>
                  {aboutDestLabel}: {local.aboutDestination.title}
              </h2>
              <p style={{ 
                  fontSize: '1.02rem', 
                  fontWeight: 400, 
                  color: '#555', 
                  lineHeight: 1.8, 
                  marginBottom: '24px',
                  fontFamily: "'Inter', sans-serif"
              }}>
                  {local.aboutDestination.content}
              </p>
              
              {local.popularDropOffs && local.popularDropOffs.length > 0 && (
                   <div style={{ marginTop: '20px' }}>
                       <h4 style={{ 
                           fontSize: '0.95rem', 
                           fontWeight: 700, 
                           color: 'var(--secondary)', 
                           marginBottom: '14px',
                           fontFamily: "'Inter', sans-serif",
                           letterSpacing: '0.2px'
                       }}>
                           {popularDropoffsLabel}
                       </h4>
                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="dropoffs-tags-container">
                           {local.popularDropOffs.map((loc: string, idx: number) => {
                               const lowerLoc = loc.toLowerCase();
                               let IconComponent = MapPin;
                               if (lowerLoc.includes("airport") || lowerLoc.includes("aéroport")) IconComponent = Plane;
                               else if (lowerLoc.includes("station") || lowerLoc.includes("gare")) IconComponent = Train;
                               else if (lowerLoc.includes("hotel") || lowerLoc.includes("riad")) IconComponent = Hotel;
                               else if (lowerLoc.includes("center") || lowerLoc.includes("centre")) IconComponent = Building2;

                               return (
                                   <div key={idx} style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: '8px',
                                       padding: '8px 14px',
                                       borderRadius: '20px',
                                       backgroundColor: '#ffffff',
                                       border: '1px solid #eef2f6',
                                       fontSize: '0.85rem',
                                       color: 'var(--accent)',
                                       fontWeight: 500,
                                       boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                                       fontFamily: "'Inter', sans-serif"
                                   }} className="dropoff-tag">
                                       <IconComponent size={14} className="text-amber-600" aria-hidden="true" />
                                       <span>{loc}</span>
                                   </div>
                               );
                           })}
                       </div>
                   </div>
              )}
          </div>
      )}

      {/* Travel Tips */}
      {local.travelTips && local.travelTips.length > 0 && (
          <div style={{ padding: '0px' }} className="travel-tips-section">
              <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: 'var(--secondary)', 
                  marginBottom: '20px', 
                  fontFamily: "var(--font-poppins), sans-serif", 
                  letterSpacing: '0.3px', 
                  minHeight: '1.2em' 
              }}>
                  {travelTipsLabel}
              </h2>
              <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '20px' 
              }} className="tips-grid">
                  {local.travelTips.map((tip: { title?: string; content?: string }, idx: number) => (
                      <div key={idx} style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                      }} className="tip-card-item">
                          <h4 style={{ 
                              margin: 0, 
                              fontSize: '1.02rem', 
                              color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', 
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontFamily: "var(--font-poppins), sans-serif"
                          }}>
                              <Lightbulb size={16} aria-hidden="true" />
                              <span>{tip.title}</span>
                          </h4>
                          <p style={{ 
                              margin: 0, 
                              fontSize: '0.88rem', 
                              color: 'var(--text)', 
                              lineHeight: 1.6,
                              fontWeight: 400,
                              fontFamily: "var(--font-poppins), sans-serif"
                          }}>
                              {tip.content}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </>
  );
}

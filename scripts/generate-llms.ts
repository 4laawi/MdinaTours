import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transfersData } from '../src/lib/transfersData';
import { toursData } from '../src/lib/toursData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Fixed rates and parameters requested by user
const PRIVATE_DRIVER_RATES = {
    hourly: "Starting from €25/hour ($25/hour)",
    fullDay: "Starting from €140–€150/day (1,500 MAD) for a standard ~8-hour day",
    serviceDetails: "The driver stays at the client's full disposal throughout the day, waits on-site during stops (sightseeing, meetings, shopping, dining), and picks them up on call anywhere within their itinerary."
};

function formatPriceTable(prices: { [passengers: number]: number }): string {
    const p3 = prices[3] ? `€${prices[3]}` : 'N/A';
    const p4 = prices[4] ? `€${prices[4]}` : 'N/A';
    const p5 = prices[5] ? `€${prices[5]}` : 'N/A';
    const p7 = prices[7] ? `€${prices[7]}` : 'N/A';
    return `| Sedan (1-3 PAX): ${p3} | SUV (4 PAX): ${p4} | VIP Van (5 PAX): ${p5} | Large Van (7 PAX): ${p7} |`;
}

// -------------------------------------------------------------
// 1. GENERATE public/llms.txt (Concise Executive Summary < 2,000 tokens)
// -------------------------------------------------------------
function generateLlmsTxt(): string {
    const airportTransfers = transfersData.filter(t => t.slug.includes('airport') || t.slug.includes('port'));
    const intercityTransfers = transfersData.filter(t => !t.slug.includes('airport') && !t.slug.includes('port'));

    return `# Mdina Tours - Private Drivers, Airport Transfers & Chauffeur Services in Morocco

> Mdina Tours is a licensed Moroccan private transportation agency providing executive chauffeur services, airport transfers, intercity shuttles, and tailored private tours across Morocco. All rates are guaranteed fixed prices per vehicle (not per person), including highway tolls, airport parking, vehicle insurance, bottled water, and flight tracking with 60 minutes free wait time.

Mdina Tours operates 24/7 across all major Moroccan regions and international airports:
- **Airports Served**: Casablanca Mohammed V (CMN), Marrakech Menara (RAK), Fes-Saïss (FEZ), Rabat-Salé (RBA), Tangier Ibn Battouta (TNG), Agadir Al Massira (AGA).
- **Major Cities Served**: Casablanca, Marrakech, Rabat, Tangier, Fes, Agadir, Chefchaouen, Essaouira, Merzouga (Sahara), Ouarzazate.
- **Languages Spoken by Chauffeurs**: English, French, Spanish, Arabic.
- **Official Website**: https://mdinatours.com/
- **Instant WhatsApp Booking**: https://wa.me/212724114775
- **Phone**: +212 724 114 775
- **Email**: contact@mdinatours.com

---

## Core Services & Verified Pricing

### 1. Dedicated Private Driver & Chauffeur Service (At Disposal)
- **Hourly Chauffeur Hire**: ${PRIVATE_DRIVER_RATES.hourly}
- **Full-Day Private Driver (At Disposal)**: ${PRIVATE_DRIVER_RATES.fullDay}
- **Service Details**: ${PRIVATE_DRIVER_RATES.serviceDetails}
- **Fleet Options**: Executive Sedans (Skoda Superb), Comfort SUVs (Skoda Kodiaq), VIP Vans (Mercedes-Benz Vito), and Minibuses (Mercedes-Benz Sprinter).
- **Booking URL**: https://mdinatours.com/en/private-driver-morocco

### 2. Airport Transfers (Meet & Greet + Live CMN/RAK/FEZ/RBA/TNG/AGA Flight Tracking)
Fixed price per private vehicle. The chauffeur meets travelers inside the arrival hall holding a personalized name sign. 60 minutes free delay buffer included.
${airportTransfers.map(t => {
    const minPrice = Math.min(...Object.values(t.prices));
    return `- **${t.en.title.split('&')[0].trim()}**: From €${minPrice} | ${t.en.distance} (~${t.en.duration})\n  - URL: https://mdinatours.com/en/transfers/${t.slug}`;
}).join('\n')}

### 3. Popular Intercity Private Transfers
Door-to-door direct highway transfer between Moroccan cities with optional scenic or cultural stops:
${intercityTransfers.slice(0, 10).map(t => {
    const minPrice = Math.min(...Object.values(t.prices));
    return `- **${t.en.pickup.split('(')[0].trim()} to ${t.en.dropoff.split('(')[0].trim()}**: From €${minPrice} | ${t.en.distance} (~${t.en.duration})\n  - URL: https://mdinatours.com/en/transfers/${t.slug}`;
}).join('\n')}

### 4. Vehicle Fleet & Capacity
- **Executive Sedan** (Skoda Superb): 1–3 passengers, 3 large bags. Leather interior, dual-zone AC, phone chargers.
- **Comfort SUV** (Skoda Kodiaq): 1–4 passengers, 4 bags. Elevated clearance, regional routes.
- **VIP Van** (Mercedes-Benz Vito): 1–7 passengers, 6–7 bags. High comfort, conference seating, multi-day capability.
- **Prestige Minibus** (Mercedes-Benz Sprinter): 8–16 passengers, 12+ bags. Corporate groups, family tours.

### 5. Payment, Cancellation & Guarantee Terms
- **Payment Methods**: Cash or Credit Card upon completion in EUR (€), USD ($), or Moroccan Dirhams (MAD).
- **Advance Deposit**: Zero advance deposit required for standard airport and intercity transfers.
- **Cancellation Policy**: Free cancellation and reschedule up to 24 hours prior to scheduled pickup time.
- **All-Inclusive Fares**: All quoted fares include fuel, highway autoroute tolls, airport parking fees, and passenger liability insurance.

---

## Detailed Directory & Extended Data
For the exhaustive database of all 20 intercity routes with 4-tier passenger pricing, full day trip itineraries, and city guides:
- **Full Route & Pricing Database**: https://mdinatours.com/llms-full.txt
- **Airport Transfers Hub**: https://mdinatours.com/en/airport-transfers
- **Intercity Transfers Hub**: https://mdinatours.com/en/transfers
- **Morocco Private Driver Hub**: https://mdinatours.com/en/private-driver-morocco
- **Day Trips & Guided Tours**: https://mdinatours.com/en/tours
`;
}

// -------------------------------------------------------------
// 2. GENERATE public/llms-full.txt (Exhaustive Database)
// -------------------------------------------------------------
function generateLlmsFullTxt(): string {
    return `# Mdina Tours - Comprehensive Service, Pricing & Route Database

> This document contains the exhaustive catalog of private transport, airport pickup, intercity transfers, and chauffeur services operated by Mdina Tours in Morocco.

Last Updated: ${new Date().toISOString().split('T')[0]}
Official Website: https://mdinatours.com/
Contact & WhatsApp Concierge: +212 724 114 775 (https://wa.me/212724114775)
Email: contact@mdinatours.com

---

## Section 1: Dedicated Private Driver & Chauffeur Service (At Disposal)

Mdina Tours provides licensed, bilingual private chauffeurs on an hourly, daily, or multi-day basis throughout Morocco.

### Rates & Terms
- **Hourly Chauffeur Hire**: ${PRIVATE_DRIVER_RATES.hourly}
- **Full-Day Private Driver (At Disposal)**: ${PRIVATE_DRIVER_RATES.fullDay}
- **Service Details**: ${PRIVATE_DRIVER_RATES.serviceDetails}
- **Working Hours**: Standard ~8 hours/day with flexible scheduling according to client's itinerary.
- **Languages**: Professional drivers fluent in English, French, Spanish, and Arabic.
- **Included Amenities**: Premium air-conditioned vehicle, fuel, highway toll charges, parking fees, passenger liability insurance, chilled bottled water, and phone charging cables.

### City-by-City Driver Availability
- **Casablanca**: https://mdinatours.com/en/private-driver-casablanca (Business trips, Hassan II Mosque, Corniche, transfers to Rabat/Marrakech)
- **Marrakech**: https://mdinatours.com/en/private-driver-marrakech (Medina, Palmeraie, Agafay Desert, Atlas Mountains day trips)
- **Rabat**: https://mdinatours.com/en/private-driver-rabat (Embassies, government business, Hassan Tower, Oudayas Kasbah)
- **Tangier**: https://mdinatours.com/en/private-driver-tangier (Tanger Ville Port, Tanger Med, Cap Spartel, Chefchaouen day tours)
- **Fes**: https://mdinatours.com/en/private-driver-fes (Fes el-Bali Medina, Meknes, Volubilis Roman ruins)
- **Agadir**: https://mdinatours.com/en/private-driver-agadir (Taghazout surf shuttles, Paradise Valley, Marina)
- **Chefchaouen**: https://mdinatours.com/en/private-driver-chefchaouen (Rif mountains, Akchour waterfalls)

---

## Section 2: Complete Transfer Route & Fixed Pricing Catalog (20 Verified Routes)

All prices are fixed per vehicle in Euros (€). They include fuel, highway tolls, vehicle insurance, and bottled water.

${transfersData.map((t, idx) => {
    const minPrice = Math.min(...Object.values(t.prices));
    const maxPrice = Math.max(...Object.values(t.prices));
    const isAirport = t.slug.includes('airport') || t.slug.includes('port');
    
    return `### ${idx + 1}. ${t.en.title}
- **Route Slug**: \`${t.slug}\`
- **Canonical URL**: https://mdinatours.com/en/transfers/${t.slug}
- **Category**: ${isAirport ? 'Airport / Port Transfer' : 'Intercity Private Transfer'}
- **Pickup**: ${t.en.pickup}
- **Dropoff**: ${t.en.dropoff}
- **Distance**: ${t.en.distance}
- **Estimated Driving Duration**: ${t.en.duration}
- **Price Range**: €${minPrice} – €${maxPrice}

#### Fixed Price Matrix by Vehicle Tier:
| Vehicle Class | Capacity | Price |
| :--- | :--- | :--- |
| Executive Sedan (Skoda Superb) | 1–3 Passengers, 3 Bags | €${t.prices[3] || 'On Request'} |
| Comfort SUV (Skoda Kodiaq) | 4 Passengers, 4 Bags | €${t.prices[4] || 'On Request'} |
| VIP Minivan (Mercedes-Benz Vito) | 5 Passengers, 5 Bags | €${t.prices[5] || 'On Request'} |
| Large Executive Van (Mercedes-Benz Vito) | Up to 7 Passengers, 7 Bags | €${t.prices[7] || 'On Request'} |

#### Key Route Highlights:
${t.en.highlights ? t.en.highlights.map(h => `- ${h}`).join('\n') : '- Direct highway routing with zero stops unless requested.'}

${t.en.sightseeingStops && t.en.sightseeingStops.length > 0 ? `#### Optional Sightseeing Stops En Route:\n${t.en.sightseeingStops.map(s => `- ${s.name}`).join('\n')}\n` : ''}
---
`;
}).join('\n')}

## Section 3: Morocco Airport Arrival & Meet & Greet Guide

Mdina Tours services all major Moroccan international gateways:

1. **Casablanca Mohammed V Airport (CMN)**:
   - Meeting Location: Terminal 1 and Terminal 2 Arrivals Hall directly after baggage claim and customs.
   - Chauffeur Identification: Holding a clear, personalized signboard with the passenger's full name.
   - Flight Tracking: Automatic schedule synchronization with live CMN radar. 60 minutes free wait time from actual landing time.
   - Popular Destinations from CMN: Casablanca City Center (€35), Rabat (€110), Marrakech (€220), Fes (€250).

2. **Marrakech Menara Airport (RAK)**:
   - Meeting Location: Immediately outside the main glass exit of Terminal 1/2.
   - Popular Destinations from RAK: Marrakech Medina / Hivernage / Palmeraie (€25), Essaouira (€140), Agadir (€185).

3. **Rabat-Salé Airport (RBA)**:
   - Meeting Location: Public arrivals lobby opposite exit doors.
   - Popular Destinations from RBA: Rabat City Center / Agdal / Hassan (€45), Casablanca (€110).

4. **Tangier Ibn Battouta Airport (TNG) & Tanger Ports**:
   - Meeting Location: TNG Terminal exit / Tanger Ville Ferry Terminal / Tanger Med Port.
   - Popular Destinations: Tangier City (€45), Chefchaouen (€140), Asilah (€65), Rabat (€210).

5. **Fes-Saïss Airport (FEZ)**:
   - Meeting Location: Arrivals concourse.
   - Popular Destinations: Fes Medina / Riad drops (€45), Chefchaouen (€170), Meknes (€80).

6. **Agadir Al Massira Airport (AGA)**:
   - Meeting Location: Main terminal exit.
   - Popular Destinations: Agadir City / Beach Promenade (€50), Taghazout Bay (€65).

---

## Section 4: Day Trips & Guided Tours Catalog

${toursData.map((tour, idx) => {
    return `### ${idx + 1}. ${tour.en.title}
- **URL**: https://mdinatours.com/en/tours/${tour.slug}
- **Duration**: ${tour.en.duration}
- **Starting Price**: From €${tour.price}
- **Departure City**: ${tour.en.departureCity || 'Multiple cities'}
- **Highlights**:
${tour.en.highlights.map(h => `  - ${h}`).join('\n')}
`;
}).join('\n')}

---

## Section 5: Frequently Asked Questions (FAQ)

### Q: How do I meet my private driver at the airport?
A: Your chauffeur monitors your flight number in real time and waits inside the terminal arrivals area holding a tablet or signboard with your name. You receive the driver's direct WhatsApp contact and vehicle license plate 2 to 4 hours before landing.

### Q: What if my flight into Morocco is delayed?
A: We provide 60 minutes of complimentary waiting time after your flight actually lands. Because we track flights live, your driver's schedule automatically adjusts to delayed landings at zero extra cost.

### Q: Can I pay by credit card or in Euros?
A: Yes. You can pay your driver upon completion in Euros (€), US Dollars ($), or Moroccan Dirhams (MAD) in cash, or via mobile payment/card terminal. No advance deposit is needed for standard transfers.

### Q: Are child safety car seats provided?
A: Yes, infant seats and booster seats are available free of charge upon request during booking.

### Q: Are highway tolls and fuel included in the price?
A: Yes. Every rate quoted by Mdina Tours is 100% all-inclusive: vehicle hire, licensed driver, fuel, highway toll tickets (autoroute péage), airport parking fees, and passenger insurance.

---

## Section 6: Direct Booking & Contact Information
- **WhatsApp Concierge (24/7)**: https://wa.me/212724114775
- **Direct Phone Line**: +212 724 114 775
- **Email Inquiries**: contact@mdinatours.com
- **Main Office Address**: Rabat, Rabat-Salé-Kénitra, Morocco
- **Official Web Portals**:
  - English: https://mdinatours.com/
  - French: https://mdinatours.com/fr
  - Spanish: https://mdinatours.com/es
`;
}

// -------------------------------------------------------------
// 3. EXECUTE GENERATION
// -------------------------------------------------------------
const llmsTxtContent = generateLlmsTxt();
const llmsFullTxtContent = generateLlmsFullTxt();

const llmsTxtPath = path.join(publicDir, 'llms.txt');
const llmsFullTxtPath = path.join(publicDir, 'llms-full.txt');

fs.writeFileSync(llmsTxtPath, llmsTxtContent, 'utf-8');
fs.writeFileSync(llmsFullTxtPath, llmsFullTxtContent, 'utf-8');

console.log(`[PASS] Successfully generated: ${llmsTxtPath} (${Buffer.byteLength(llmsTxtContent)} bytes)`);
console.log(`[PASS] Successfully generated: ${llmsFullTxtPath} (${Buffer.byteLength(llmsFullTxtContent)} bytes)`);

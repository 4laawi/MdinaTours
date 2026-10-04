export const LOCATIONS = [
    // Airports
    "Rabat Airport",
    "Rabat-Salé Airport",
    "Casablanca Airport",
    "Tangier Airport",
    "Marrakech Airport",
    "Fes Airport",
    "Agadir Airport",
    // Major Cities & Destinations
    "Rabat",
    "Salé",
    "Casablanca",
    "Tangier",
    "Marrakech",
    "Fes",
    "Chefchaouen",
    "Essaouira",
    "Agadir",
    "Taghazout",
    "Merzouga",
    "Ouarzazate",
    "Asilah",
    "Tetouan"
] as const;

export type LocationName = typeof LOCATIONS[number] | string;

export type Prices = { [passengers: number]: number };

export const normalizeLocation = (loc: string): string => {
    if (!loc) return "";
    let cleaned = loc.trim();
    // Remove "City Center" or " City Center"
    cleaned = cleaned.replace(/\s*City Center\s*/gi, "");
    // Map common aliases
    if (cleaned.toLowerCase().includes("casablanca mohammed v") || cleaned.toLowerCase() === "cmn airport") return "Casablanca Airport";
    if (cleaned.toLowerCase().includes("rabat-salé") || cleaned.toLowerCase().includes("salé airport") || cleaned.toLowerCase().includes("sale airport") || cleaned.toLowerCase() === "rba airport") return "Rabat Airport";
    if (cleaned.toLowerCase().includes("tangier ibn battouta") || cleaned.toLowerCase() === "tng airport") return "Tangier Airport";
    if (cleaned.toLowerCase().includes("marrakech menara") || cleaned.toLowerCase() === "rak airport") return "Marrakech Airport";
    if (cleaned.toLowerCase().includes("fes-saïss") || cleaned.toLowerCase() === "fez airport") return "Fes Airport";
    if (cleaned.toLowerCase().includes("agadir al massira") || cleaned.toLowerCase() === "aga airport") return "Agadir Airport";
    if (cleaned.toLowerCase() === "salé" || cleaned.toLowerCase() === "sale" || cleaned.toLowerCase() === "salé city" || cleaned.toLowerCase() === "sale city") return "Rabat";
    return cleaned;
};

export const buildRouteKey = (l1: string, l2: string): string => {
    const n1 = normalizeLocation(l1);
    const n2 = normalizeLocation(l2);
    return [n1, n2].sort().join('-');
};

const routePrices: Record<string, Prices> = {};

const setPricing = (loc1: string, loc2: string, prices: Prices) => {
    routePrices[buildRouteKey(loc1, loc2)] = prices;
};

// ----------------------------------------------------
// Configure Fixed Pricing Catalog
// ----------------------------------------------------

// Local Airport Transfers
setPricing("Rabat Airport", "Rabat", { 3: 45, 4: 55, 5: 70, 7: 95 });
setPricing("Rabat Airport", "Salé", { 3: 45, 4: 55, 5: 70, 7: 95 });
setPricing("Casablanca Airport", "Casablanca", { 3: 50, 4: 60, 5: 75, 7: 100 });
setPricing("Tangier Airport", "Tangier", { 3: 45, 4: 55, 5: 65, 7: 90 });
setPricing("Tangier", "Tangier Port", { 3: 45, 4: 55, 5: 65, 7: 90 });
setPricing("Marrakech Airport", "Marrakech", { 3: 45, 4: 55, 5: 65, 7: 90 });
setPricing("Fes Airport", "Fes", { 3: 45, 4: 55, 5: 65, 7: 90 });
setPricing("Agadir Airport", "Agadir", { 3: 50, 4: 60, 5: 75, 7: 100 });
setPricing("Agadir Airport", "Taghazout", { 3: 65, 4: 75, 5: 90, 7: 120 });

// Intercity & Regional Transfers
setPricing("Rabat", "Casablanca", { 3: 110, 4: 130, 5: 155, 7: 195 });
setPricing("Rabat", "Casablanca Airport", { 3: 120, 4: 140, 5: 165, 7: 210 });
setPricing("Rabat Airport", "Casablanca", { 3: 120, 4: 140, 5: 165, 7: 210 });
setPricing("Tangier", "Rabat", { 3: 210, 4: 245, 5: 280, 7: 390 });
setPricing("Tangier Airport", "Rabat", { 3: 210, 4: 245, 5: 280, 7: 390 });
setPricing("Marrakech", "Essaouira", { 3: 140, 4: 165, 5: 195, 7: 260 });
setPricing("Fes", "Chefchaouen", { 3: 170, 4: 195, 5: 230, 7: 310 });
setPricing("Casablanca", "Marrakech", { 3: 220, 4: 250, 5: 290, 7: 390 });
setPricing("Casablanca Airport", "Marrakech", { 3: 220, 4: 250, 5: 290, 7: 390 });
setPricing("Rabat", "Chefchaouen", { 3: 249, 4: 289, 5: 329, 7: 429 });
setPricing("Casablanca", "Fes", { 3: 250, 4: 290, 5: 335, 7: 445 });
setPricing("Tangier", "Casablanca", { 3: 280, 4: 320, 5: 365, 7: 490 });
setPricing("Tangier", "Chefchaouen", { 3: 140, 4: 165, 5: 195, 7: 260 });
setPricing("Tangier Airport", "Chefchaouen", { 3: 140, 4: 165, 5: 195, 7: 260 });
setPricing("Rabat", "Marrakech", { 3: 245, 4: 275, 5: 315, 7: 425 });
setPricing("Rabat", "Fes", { 3: 165, 4: 190, 5: 220, 7: 295 });
setPricing("Marrakech", "Agadir", { 3: 185, 4: 215, 5: 250, 7: 345 });
setPricing("Fes", "Merzouga", { 3: 370, 4: 425, 5: 495, 7: 640 });
setPricing("Tangier", "Asilah", { 3: 65, 4: 75, 5: 90, 7: 120 });
setPricing("Tangier", "Tetouan", { 3: 85, 4: 100, 5: 115, 7: 150 });
setPricing("Marrakech", "Ouarzazate", { 3: 220, 4: 250, 5: 290, 7: 390 });
setPricing("Agadir", "Taghazout", { 3: 45, 4: 55, 5: 65, 7: 90 });

/**
 * Retrieves the price for a given route and passenger count.
 * Includes robust fallback calculation so no unlisted route returns €0 or NaN.
 */
export function getRoutePrice(pickup: string, dropoff: string, passengers: number): number | null {
    if (!pickup || !dropoff) return null;
    const nPickup = normalizeLocation(pickup);
    const nDropoff = normalizeLocation(dropoff);

    if (nPickup === nDropoff && nPickup !== "") {
        return null; // Same pickup and dropoff
    }

    const key = buildRouteKey(nPickup, nDropoff);
    const matchedRoute = routePrices[key];

    if (matchedRoute) {
        // Find exact or closest passenger capacity tier
        const tiers = [3, 4, 5, 7];
        const tier = tiers.find(t => passengers <= t) || 7;
        if (matchedRoute[tier] !== undefined) {
            return matchedRoute[tier];
        }
        if (matchedRoute[passengers] !== undefined) {
            return matchedRoute[passengers];
        }
    }

    // ----------------------------------------------------
    // Sane Fallback Pricing Engine
    // Calculates fair estimate pricing based on route characteristics
    // ----------------------------------------------------
    const isAirportTransfer = nPickup.toLowerCase().includes('airport') || nDropoff.toLowerCase().includes('airport');
    
    // Check if it's an airport transfer to its host city
    const airportCityMatch = isAirportTransfer && (
        (nPickup.includes("Rabat") && nDropoff.includes("Rabat")) ||
        (nPickup.includes("Casablanca") && nDropoff.includes("Casablanca")) ||
        (nPickup.includes("Tangier") && nDropoff.includes("Tangier")) ||
        (nPickup.includes("Marrakech") && nDropoff.includes("Marrakech")) ||
        (nPickup.includes("Fes") && nDropoff.includes("Fes")) ||
        (nPickup.includes("Agadir") && nDropoff.includes("Agadir"))
    );

    let baseSedanPrice = 150; // Default intercity base price
    if (airportCityMatch) {
        baseSedanPrice = 45; // Local airport transfer base
    } else if (isAirportTransfer) {
        baseSedanPrice = 130; // Intercity airport transfer base
    }

    // Scale price by passenger group size
    const passengerMultipliers: { [key: number]: number } = {
        1: baseSedanPrice * 0.9,
        2: baseSedanPrice * 0.95,
        3: baseSedanPrice,
        4: baseSedanPrice * 1.15,
        5: baseSedanPrice * 1.35,
        6: baseSedanPrice * 1.5,
        7: baseSedanPrice * 1.65,
        8: baseSedanPrice * 1.8,
    };

    const rawPrice = passengerMultipliers[passengers] || baseSedanPrice * 1.5;
    // Round cleanly to nearest multiple of 5
    const roundedPrice = Math.round(rawPrice / 5) * 5;
    
    return Math.max(30, roundedPrice);
}

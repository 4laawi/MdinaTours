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
setPricing("Rabat Airport", "Rabat", { 3: 36, 4: 42, 5: 54, 7: 72 });
setPricing("Casablanca Airport", "Casablanca", { 3: 48, 4: 54, 5: 66, 7: 84 });
setPricing("Tangier Airport", "Tangier", { 3: 30, 4: 36, 5: 42, 7: 60 });
setPricing("Marrakech Airport", "Marrakech", { 3: 24, 4: 30, 5: 36, 7: 54 });
setPricing("Fes Airport", "Fes", { 3: 30, 4: 36, 5: 42, 7: 60 });
setPricing("Agadir Airport", "Agadir", { 3: 36, 4: 42, 5: 54, 7: 72 });
setPricing("Agadir Airport", "Taghazout", { 3: 48, 4: 54, 5: 66, 7: 84 });

// Intercity & Regional Transfers
setPricing("Rabat", "Casablanca", { 3: 96, 4: 108, 5: 132, 7: 168 });
setPricing("Rabat", "Casablanca Airport", { 3: 102, 4: 120, 5: 144, 7: 180 });
setPricing("Rabat Airport", "Casablanca", { 3: 102, 4: 120, 5: 144, 7: 180 });
setPricing("Tangier", "Rabat", { 3: 180, 4: 210, 5: 240, 7: 336 });
setPricing("Tangier Airport", "Rabat", { 3: 192, 4: 216, 5: 252, 7: 348 });
setPricing("Marrakech", "Essaouira", { 3: 108, 4: 132, 5: 156, 7: 216 });
setPricing("Fes", "Chefchaouen", { 3: 144, 4: 168, 5: 192, 7: 264 });
setPricing("Casablanca", "Marrakech", { 3: 192, 4: 216, 5: 252, 7: 336 });
setPricing("Casablanca Airport", "Marrakech", { 3: 192, 4: 216, 5: 252, 7: 336 });
setPricing("Rabat", "Chefchaouen", { 3: 168, 4: 192, 5: 216, 7: 300 });
setPricing("Casablanca", "Fes", { 3: 216, 4: 252, 5: 288, 7: 384 });
setPricing("Tangier", "Casablanca", { 3: 240, 4: 276, 5: 312, 7: 420 });
setPricing("Tangier", "Chefchaouen", { 3: 108, 4: 132, 5: 156, 7: 216 });
setPricing("Rabat", "Marrakech", { 3: 204, 4: 228, 5: 264, 7: 360 });
setPricing("Rabat", "Fes", { 3: 132, 4: 156, 5: 180, 7: 240 });
setPricing("Marrakech", "Agadir", { 3: 156, 4: 180, 5: 210, 7: 288 });
setPricing("Fes", "Merzouga", { 3: 312, 4: 360, 5: 420, 7: 540 });
setPricing("Tangier", "Asilah", { 3: 48, 4: 60, 5: 72, 7: 96 });
setPricing("Tangier", "Tetouan", { 3: 72, 4: 84, 5: 96, 7: 132 });
setPricing("Marrakech", "Ouarzazate", { 3: 180, 4: 210, 5: 240, 7: 320 });
setPricing("Agadir", "Taghazout", { 3: 36, 4: 42, 5: 54, 7: 72 });

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

    let baseSedanPrice = 144; // Default intercity base price
    if (airportCityMatch) {
        baseSedanPrice = 36; // Local airport transfer base
    } else if (isAirportTransfer) {
        baseSedanPrice = 120; // Intercity airport transfer base
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
    // Round cleanly to nearest multiple of 6 (e.g. 36, 42, 48, 144, 180, etc.)
    const roundedPrice = Math.round(rawPrice / 6) * 6;
    
    return Math.max(24, roundedPrice);
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderMdinaEmail, getEmailTranslations, EmailField, EmailSection } from '@/lib/emailTemplate';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            bookingType,
            language = 'en',
            name, 
            email, 
            phone, 
            service,
            startCity,
            route,
            travelDate,
            pickupTime,
            duration,
            travelers,
            vehicleCategory,
            travelType,
            travelPlan,
            estimatedPrice,
            message, 
            routeName,
            details
        } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields (name, email)' },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not defined in the environment variables.');
            return NextResponse.json(
                { error: 'Mail server configuration error' },
                { status: 500 }
            );
        }

        const cleanLang = String(language || 'en').toLowerCase().slice(0, 2);
        const t = getEmailTranslations(cleanLang);

        // Detect booking type if not explicitly supplied
        let determinedType = bookingType;
        if (!determinedType) {
            const combinedString = `${routeName || ''} ${message || ''}`.toLowerCase();
            if (combinedString.includes('private driver') || combinedString.includes('chauffeur')) {
                determinedType = 'private-driver';
            } else if (combinedString.includes('transfer') || combinedString.includes('trajet') || combinedString.includes('traslado')) {
                determinedType = 'transfer';
            } else if (combinedString.includes('tour') || combinedString.includes('excursion')) {
                determinedType = 'tour';
            } else {
                determinedType = 'general';
            }
        }

        // Determine title
        let title = t.requestTitles.generalBooking;
        let sectionTitle = t.tripDetails;

        if (determinedType === 'private-driver') {
            title = t.requestTitles.privateDriver;
            sectionTitle = t.tripDetails;
        } else if (determinedType === 'transfer') {
            title = t.requestTitles.transfer;
            sectionTitle = t.transferDetails;
        } else if (determinedType === 'tour') {
            title = t.requestTitles.tour;
            sectionTitle = t.tripDetails;
        } else if (determinedType === 'quote') {
            title = t.requestTitles.quote;
            sectionTitle = t.tripDetails;
        }

        // Merge flat properties and nested details object
        const mergedService = service || details?.service || (determinedType === 'private-driver' ? (details?.hireType === 'daily' ? 'Private Driver — Daily Hire' : 'Private Driver — Hourly Hire') : (routeName && !routeName.toLowerCase().includes('booking') ? routeName : undefined));
        const mergedStartCity = startCity || details?.startCity;
        const mergedRoute = route || details?.route || (routeName && !routeName.toLowerCase().includes('booking') && determinedType === 'transfer' ? routeName : undefined);
        const mergedTravelDate = travelDate || details?.travelDate;
        const mergedPickupTime = pickupTime || details?.pickupTime;
        const mergedDuration = duration || details?.duration;
        const mergedTravelers = travelers || details?.travelers;
        const mergedVehicle = vehicleCategory || details?.vehicleCategory || details?.vehicleTier;
        const mergedTravelType = travelType || details?.travelType;
        const mergedTravelPlan = travelPlan || details?.travelPlan;
        const mergedPrice = estimatedPrice || details?.estimatedPrice || details?.price;

        // Build Trip / Transfer Fields
        const tripFields: EmailField[] = [];

        if (mergedService) {
            tripFields.push({ label: t.labels.service, value: mergedService });
        }
        if (mergedRoute) {
            tripFields.push({ label: t.labels.route, value: mergedRoute });
        }
        if (mergedStartCity) {
            tripFields.push({ label: t.labels.startCity, value: mergedStartCity });
        }
        if (mergedTravelDate) {
            tripFields.push({ label: t.labels.travelDate, value: mergedTravelDate });
        }
        if (mergedPickupTime) {
            tripFields.push({ label: t.labels.pickupTime, value: mergedPickupTime });
        }
        if (mergedDuration) {
            tripFields.push({ label: t.labels.duration, value: mergedDuration });
        }
        if (mergedTravelers) {
            tripFields.push({ label: t.labels.travelers, value: String(mergedTravelers) });
        }
        if (mergedVehicle) {
            tripFields.push({ label: t.labels.vehicleCategory, value: mergedVehicle });
        }
        if (mergedTravelType) {
            tripFields.push({ label: t.labels.travelType, value: mergedTravelType });
        }
        if (mergedPrice) {
            tripFields.push({ label: t.labels.estimatedPrice, value: mergedPrice });
        }

        // If no explicit structured fields were provided, parse bullet points from message if possible
        let customerCustomMessage = '';
        if (tripFields.length === 0 && message) {
            const lines = message.split('\n');
            const unparsedLines: string[] = [];
            for (const rawLine of lines) {
                const line = rawLine.trim();
                if (!line) continue;
                
                // Match lines like "• Start City: Marrakech" or "Route: Casablanca -> Rabat"
                const cleaned = line.replace(/^[•\-\*]\s*/, '');
                const colonIdx = cleaned.indexOf(':');
                if (colonIdx > 0 && colonIdx < 30) {
                    const label = cleaned.slice(0, colonIdx).trim();
                    const val = cleaned.slice(colonIdx + 1).trim();
                    if (label && val) {
                        tripFields.push({ label, value: val });
                        continue;
                    }
                }
                unparsedLines.push(rawLine);
            }
            customerCustomMessage = unparsedLines.join('\n').trim();
        } else if (message) {
            // Check if message is identical to generated bullet points or contains custom notes
            if (!message.startsWith('Requesting Private Driver') && 
                !message.startsWith('Demande de Chauffeur') && 
                !message.startsWith('Route:') && 
                !message.startsWith('Trajet:')) {
                customerCustomMessage = message.trim();
            }
        }

        const sections: EmailSection[] = [];

        if (tripFields.length > 0 || mergedTravelPlan) {
            sections.push({
                title: sectionTitle,
                fields: tripFields.length > 0 ? tripFields : undefined,
                calloutText: mergedTravelPlan ? `${t.labels.travelPlan}: ${mergedTravelPlan}` : undefined,
            });
        }

        const emailData = renderMdinaEmail({
            language: cleanLang,
            title,
            customerDetailsTitle: t.yourDetails,
            customerDetails: [
                { label: t.name, value: name },
                { label: t.email, value: email, type: 'email' },
                ...(phone ? [{ label: t.phone, value: phone, type: 'tel' as const }] : []),
            ],
            sections: sections.length > 0 ? sections : undefined,
            message: customerCustomMessage ? {
                title: t.yourMessage,
                text: customerCustomMessage,
            } : undefined,
        });

        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: 'Mdina Tours <booking@mdinatours.com>',
            to: 'booking@mdinatours.com',
            replyTo: email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('Server Handler Error:', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}

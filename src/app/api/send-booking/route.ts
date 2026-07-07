import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message, routeName } = body;

        // Basic validation
        if (!name || !email || !message || !routeName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
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

        const resend = new Resend(apiKey);

        // Professional HTML Email Template
        const htmlContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);">
                <div style="background-color: #202f59; color: #ffffff; padding: 24px; text-align: center;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">New Booking Request</h2>
                    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Route: ${routeName}</p>
                </div>
                <div style="padding: 30px;">
                    <p style="margin-top: 0; font-size: 16px; color: #4a5568;">You have received a new private transfer booking request from the Mdina Tours website.</p>
                    
                    <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: #202f59; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Customer Information</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; width: 120px; color: #4a5568; border-bottom: 1px solid #edf2f7;">Name:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #f25c05; text-decoration: none; font-weight: 500;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Phone:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${phone || 'Not provided'}</td>
                        </tr>
                    </table>
                    
                    <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: #202f59; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Booking & Transfer Details</h3>
                    <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f25c05; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; color: #2d3748; margin-top: 10px;">${message}</div>
                </div>
                <div style="background-color: #f7fafc; padding: 20px; text-align: center; font-size: 13px; color: #718096; border-top: 1px solid #edf2f7;">
                    This email was sent automatically from the Mdina Tours Website Booking System.
                </div>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: 'Mdina Tours Booking <onboarding@resend.dev>', // Resend requires verified domain or onboarding address for testing
            to: 'Contact@MdinaTours.com',
            replyTo: email,
            subject: `New Booking Request – ${routeName}`,
            html: htmlContent,
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

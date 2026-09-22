'use server';

import { Resend } from 'resend';
import { renderMdinaEmail, getEmailTranslations } from '@/lib/emailTemplate';

export async function sendEmail(formData: FormData) {
    const name = (formData.get('name') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const message = (formData.get('message') as string || '').trim();
    const lang = (formData.get('language') as string || 'en').toLowerCase();

    if (!name || !email || !message) {
        return { error: 'Please fill in all required fields.' };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not defined in environment variables.');
        return { error: 'Mail service is not configured properly.' };
    }

    const t = getEmailTranslations(lang);

    const emailData = renderMdinaEmail({
        language: lang,
        title: t.requestTitles.contact,
        customerDetails: [
            { label: t.name, value: name },
            { label: t.email, value: email, type: 'email' },
            ...(phone ? [{ label: t.phone, value: phone, type: 'tel' as const }] : []),
        ],
        message: {
            title: t.yourMessage,
            text: message,
        },
    });

    const resend = new Resend(apiKey);

    try {
        const { error } = await resend.emails.send({
            from: 'Mdina Tours <booking@mdinatours.com>',
            to: 'booking@mdinatours.com',
            replyTo: email,
            subject: emailData.subject,
            html: emailData.html,
            text: emailData.text,
        });

        if (error) {
            console.error('Resend error:', error);
            return { error: 'Failed to send message: ' + error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error('Email action error:', err);
        return { error: err?.message || 'Something went wrong. Please try again.' };
    }
}




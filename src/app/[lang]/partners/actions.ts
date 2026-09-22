'use server';

import { Resend } from 'resend';
import { renderMdinaEmail, getEmailTranslations, EmailSection } from '@/lib/emailTemplate';

export async function submitPartnerForm(formData: FormData) {
    const companyName = (formData.get('companyName') as string || '').trim();
    const location = (formData.get('location') as string || '').trim();
    const businessType = (formData.get('businessType') as string || '').trim();
    const contactName = (formData.get('contactName') as string || '').trim();
    const whatsapp = (formData.get('whatsapp') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const website = (formData.get('website') as string || '').trim();
    const monthlyVolume = (formData.get('monthlyVolume') as string || '').trim();
    const services = formData.getAll('services') as string[];
    const licenseFile = formData.get('license') as File | null;
    const lang = (formData.get('language') as string || 'en').toLowerCase();

    if (!companyName || !contactName || !email || !whatsapp) {
        return { error: 'Please fill in all required fields.' };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not defined in environment variables.');
        return { error: 'Mail service is not configured properly.' };
    }

    const t = getEmailTranslations(lang);
    const servicesString = services.length > 0 ? services.join(', ') : t.notProvided;

    const attachments: { filename: string; content: Buffer }[] = [];
    let attachmentCalloutText = '';

    if (licenseFile && licenseFile.size > 0) {
        if (licenseFile.size > 5 * 1024 * 1024) {
            return { error: 'The uploaded file exceeds the 5MB size limit.' };
        }
        
        const buffer = Buffer.from(await licenseFile.arrayBuffer());
        attachments.push({
            filename: licenseFile.name,
            content: buffer,
        });

        attachmentCalloutText = `${t.labels.attachment}: ${licenseFile.name} (${(licenseFile.size / 1024 / 1024).toFixed(2)} MB)`;
    }

    const sections: EmailSection[] = [
        {
            title: t.companyDetails,
            fields: [
                { label: t.labels.companyName, value: companyName },
                { label: t.labels.businessType, value: businessType },
                { label: t.labels.location, value: location },
                ...(website ? [{ label: t.labels.website, value: website }] : []),
                ...(monthlyVolume ? [{ label: t.labels.monthlyVolume, value: monthlyVolume }] : []),
                { label: t.labels.servicesInterested, value: servicesString },
            ],
            calloutText: attachmentCalloutText || undefined,
        },
    ];

    const emailData = renderMdinaEmail({
        language: lang,
        title: `${t.requestTitles.partner} – ${companyName}`,
        customerDetailsTitle: t.yourDetails,
        customerDetails: [
            { label: t.labels.contactPerson, value: contactName },
            { label: t.email, value: email, type: 'email' },
            { label: t.labels.whatsapp, value: whatsapp, type: 'tel' },
        ],
        sections,
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
            attachments: attachments.length > 0 ? attachments : undefined,
        });

        if (error) {
            console.error('Resend error:', error);
            return { error: 'Failed to send registration application: ' + error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error('Email action error:', err);
        return { error: err?.message || 'Something went wrong. Please check your details and try again.' };
    }
}


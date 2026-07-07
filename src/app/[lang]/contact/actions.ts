'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    try {
        const { error } = await resend.emails.send({
            from: "contact@sitepro.ma",
            to: "booking@mdinatours.com",
            subject: `New Message from ${name} (Mdina Tours)`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br />')}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return { error: 'Failed to send message.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Email action error:', err);
        return { error: 'Something went wrong.' };
    }
}

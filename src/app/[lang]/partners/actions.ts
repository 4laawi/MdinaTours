'use server';

import { Resend } from 'resend';

export async function submitPartnerForm(formData: FormData) {
    const companyName = formData.get('companyName') as string;
    const location = formData.get('location') as string;
    const businessType = formData.get('businessType') as string;
    const contactName = formData.get('contactName') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const email = formData.get('email') as string;
    const website = formData.get('website') as string;
    const monthlyVolume = formData.get('monthlyVolume') as string;
    const services = formData.getAll('services') as string[];
    const licenseFile = formData.get('license') as File | null;

    if (!companyName || !contactName || !email || !whatsapp) {
        return { error: 'Please fill in all required fields.' };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not defined in environment variables.');
        return { error: 'Mail service is not configured properly.' };
    }

    const resend = new Resend(apiKey);

    try {
        const servicesString = services.length > 0 ? services.join(', ') : 'None specified';
        
        let htmlContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #202f59; color: #ffffff; padding: 24px; text-align: center;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 700;">New B2B Partner Registration</h2>
                    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">${companyName} (${businessType})</p>
                </div>
                <div style="padding: 30px;">
                    <p style="margin-top: 0; font-size: 16px; color: #4a5568;">A new company has applied to join the Mdina Tours B2B Partner Program.</p>
                    
                    <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: #202f59; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Company Details</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; width: 160px; color: #4a5568; border-bottom: 1px solid #edf2f7;">Company Name:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${companyName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Business Type:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${businessType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Location:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${location}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Website:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${website || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Estimated Volume:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${monthlyVolume || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Services Interested In:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${servicesString}</td>
                        </tr>
                    </table>
                    
                    <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: #202f59; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Contact Person Details</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; width: 160px; color: #4a5568; border-bottom: 1px solid #edf2f7;">Contact Name:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${contactName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">WhatsApp Number:</td>
                            <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${whatsapp}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email Address:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #f25c05; text-decoration: none; font-weight: 500;">${email}</a></td>
                        </tr>
                    </table>
        `;

        const attachments: { filename: string; content: Buffer }[] = [];
        
        if (licenseFile && licenseFile.size > 0) {
            if (licenseFile.size > 5 * 1024 * 1024) {
                return { error: 'The uploaded file exceeds the 5MB size limit.' };
            }
            
            const buffer = Buffer.from(await licenseFile.arrayBuffer());
            attachments.push({
                filename: licenseFile.name,
                content: buffer,
            });
            
            htmlContent += `
                    <div style="background-color: #f7fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f25c05; margin-top: 15px;">
                        <strong>Attachment:</strong> Business license/document attached (${licenseFile.name}, ${(licenseFile.size / 1024 / 1024).toFixed(2)} MB).
                    </div>
            `;
        }

        htmlContent += `
                </div>
                <div style="background-color: #f7fafc; padding: 20px; text-align: center; font-size: 13px; color: #718096; border-top: 1px solid #edf2f7;">
                    Sent automatically from the Mdina Tours B2B Partner Portal.<br/>
                    Reply directly to this email to contact ${contactName} (${email}).
                </div>
            </div>
        `;

        const { error } = await resend.emails.send({
            from: 'Mdina Tours <booking@mdinatours.com>',
            to: 'booking@mdinatours.com',
            replyTo: email,
            subject: `B2B Partner Application: ${companyName} (${businessType})`,
            html: htmlContent,
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

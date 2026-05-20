'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    try {
        const servicesString = services.length > 0 ? services.join(', ') : 'None specified';
        
        let htmlContent = `
            <h2>New B2B Partner Registration Request</h2>
            <p>A new company has applied to join the ZahriTours B2B Partner Program.</p>
            <hr />
            <h3>Company Details</h3>
            <p><strong>Company Name:</strong> ${companyName}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
            <p><strong>Location (Country & City):</strong> ${location}</p>
            <p><strong>Website:</strong> ${website || 'Not provided'}</p>
            <p><strong>Estimated Monthly Volume:</strong> ${monthlyVolume}</p>
            <p><strong>Services Interested In:</strong> ${servicesString}</p>
            
            <h3>Contact Details</h3>
            <p><strong>Contact Person Name & Title:</strong> ${contactName}</p>
            <p><strong>WhatsApp Number:</strong> ${whatsapp}</p>
            <p><strong>Professional Email:</strong> ${email}</p>
        `;

        const attachments: any[] = [];
        
        if (licenseFile && licenseFile.size > 0) {
            // Check file size (max 5MB)
            if (licenseFile.size > 5 * 1024 * 1024) {
                return { error: 'The uploaded file exceeds the 5MB size limit.' };
            }
            
            const buffer = Buffer.from(await licenseFile.arrayBuffer());
            attachments.push({
                filename: licenseFile.name,
                content: buffer,
            });
            
            htmlContent += `
                <hr />
                <p><strong>Attachment:</strong> A business license / registration document is attached (${licenseFile.name}, size: ${(licenseFile.size / 1024 / 1024).toFixed(2)} MB).</p>
            `;
        } else {
            htmlContent += `
                <hr />
                <p><strong>Attachment:</strong> No business license document was uploaded.</p>
            `;
        }

        const { error } = await resend.emails.send({
            from: "contact@sitepro.ma",
            to: "booking@tiqalgs.com",
            subject: `B2B Partner Application: ${companyName} (${businessType})`,
            html: htmlContent,
            attachments: attachments.length > 0 ? attachments : undefined,
        });

        if (error) {
            console.error('Resend error:', error);
            return { error: 'Failed to send registration application. Please try again.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Email action error:', err);
        return { error: 'Something went wrong. Please check your details and try again.' };
    }
}

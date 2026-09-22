'use server';

import { Resend } from 'resend';

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

interface EmailLabels {
    subjectTitle: string;
    headerTitle: string;
    yourDetails: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    notProvided: string;
    yourMessage: string;
    tagline: string;
}

const labelsByLang: Record<string, EmailLabels> = {
    en: {
        subjectTitle: 'Your Request to Mdina Tours',
        headerTitle: 'Your Request to Mdina Tours',
        yourDetails: 'Your details',
        nameLabel: 'Name',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        notProvided: 'Not provided',
        yourMessage: 'Your message',
        tagline: 'Private Transfers & Tours in Morocco',
    },
    fr: {
        subjectTitle: 'Votre demande à Mdina Tours',
        headerTitle: 'Votre demande à Mdina Tours',
        yourDetails: 'Vos coordonnées',
        nameLabel: 'Nom',
        emailLabel: 'Email',
        phoneLabel: 'Téléphone',
        notProvided: 'Non renseigné',
        yourMessage: 'Votre message',
        tagline: 'Transferts Privés & Circuits au Maroc',
    },
    es: {
        subjectTitle: 'Su solicitud a Mdina Tours',
        headerTitle: 'Su solicitud a Mdina Tours',
        yourDetails: 'Sus datos',
        nameLabel: 'Nombre',
        emailLabel: 'Correo electrónico',
        phoneLabel: 'Teléfono',
        notProvided: 'No proporcionado',
        yourMessage: 'Su mensaje',
        tagline: 'Traslados Privados y Tours en Marruecos',
    },
};

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

    const labels = labelsByLang[lang] || labelsByLang.en;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const resend = new Resend(apiKey);

    const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${labels.headerTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 28px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; width: 100%;">
          
          <!-- Brand Wordmark & Title Header -->
          <tr>
            <td style="padding-bottom: 18px; border-bottom: 1px solid #e2e8f0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #1B2E4B; text-transform: uppercase;">MDINA TOURS</div>
                    <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 600; color: #1B2E4B; line-height: 1.3;">${labels.headerTitle}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Your Details Section -->
          <tr>
            <td style="padding-top: 22px; padding-bottom: 18px;">
              <div style="font-size: 14px; font-weight: 600; color: #1B2E4B; margin-bottom: 12px;">${labels.yourDetails}</div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="width: 110px; padding: 5px 0; color: #64748b; vertical-align: top;">${labels.nameLabel}:</td>
                  <td style="padding: 5px 0; color: #0f172a; font-weight: 500;">${safeName}</td>
                </tr>
                <tr>
                  <td style="width: 110px; padding: 5px 0; color: #64748b; vertical-align: top;">${labels.emailLabel}:</td>
                  <td style="padding: 5px 0;">
                    <a href="mailto:${safeEmail}" style="color: #f25c05; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="width: 110px; padding: 5px 0; color: #64748b; vertical-align: top;">${labels.phoneLabel}:</td>
                  <td style="padding: 5px 0;">
                    <a href="tel:${safePhone.replace(/[\s()-]/g, '')}" style="color: #0f172a; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Thin Divider -->
          <tr>
            <td>
              <div style="height: 1px; background-color: #e2e8f0; width: 100%;"></div>
            </td>
          </tr>

          <!-- Your Message Section -->
          <tr>
            <td style="padding-top: 20px; padding-bottom: 24px;">
              <div style="font-size: 14px; font-weight: 600; color: #1B2E4B; margin-bottom: 12px;">${labels.yourMessage}</div>
              <div style="background-color: #f8fafc; border-left: 3px solid #f25c05; padding: 16px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; word-break: break-word;">${safeMessage}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid #e2e8f0; padding-top: 18px; padding-bottom: 10px;">
              <div style="font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <span style="font-weight: 500; color: #64748b;">Mdina Tours</span> · ${labels.tagline}<br/>
                <a href="https://mdinatours.com" style="color: #94a3b8; text-decoration: none;">mdinatours.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const plainText = `
MDINA TOURS
${labels.headerTitle}

${labels.yourDetails}
${labels.nameLabel}: ${name}
${labels.emailLabel}: ${email}
${phone ? `${labels.phoneLabel}: ${phone}` : ''}

${labels.yourMessage}
${message}

--
Mdina Tours · ${labels.tagline}
https://mdinatours.com
    `.trim();

    try {
        const { error } = await resend.emails.send({
            from: 'Mdina Tours <booking@mdinatours.com>',
            to: 'booking@mdinatours.com',
            replyTo: email,
            subject: `${labels.subjectTitle} – ${name}`,
            html: htmlContent,
            text: plainText,
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



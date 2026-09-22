/**
 * Shared, client-safe email template design system for Mdina Tours.
 * 
 * Every customer-originated form email uses this unified visual shell
 * and client-facing wording so that it naturally reads as a refined summary
 * of the client's request when quoted beneath a team reply.
 */

export type EmailLanguage = 'en' | 'fr' | 'es';

export interface EmailField {
    label: string;
    value: string;
    type?: 'text' | 'email' | 'tel';
}

export interface EmailSection {
    title: string;
    fields?: EmailField[];
    calloutText?: string;
}

export interface MdinaEmailOptions {
    language?: string;
    title: string;
    customerDetailsTitle?: string;
    customerDetails: EmailField[];
    sections?: EmailSection[];
    message?: {
        title?: string;
        text: string;
    };
    footerTagline?: string;
}

export interface RenderedEmail {
    subject: string;
    html: string;
    text: string;
}

export function escapeHtml(str: string): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export const EMAIL_TRANSLATIONS: Record<EmailLanguage, {
    wordmark: string;
    yourDetails: string;
    name: string;
    email: string;
    phone: string;
    notProvided: string;
    yourMessage: string;
    tripDetails: string;
    transferDetails: string;
    companyDetails: string;
    contactDetails: string;
    tagline: string;
    requestTitles: {
        contact: string;
        privateDriver: string;
        transfer: string;
        tour: string;
        quote: string;
        generalBooking: string;
        partner: string;
    };
    labels: {
        service: string;
        startCity: string;
        travelDate: string;
        duration: string;
        hours: string;
        days: string;
        vehicleCategory: string;
        travelType: string;
        travelPlan: string;
        estimatedPrice: string;
        pickupLocation: string;
        dropoffLocation: string;
        pickupTime: string;
        travelers: string;
        route: string;
        specialRequirements: string;
        companyName: string;
        businessType: string;
        location: string;
        website: string;
        monthlyVolume: string;
        servicesInterested: string;
        contactPerson: string;
        whatsapp: string;
        attachment: string;
    };
}> = {
    en: {
        wordmark: 'MDINA TOURS',
        yourDetails: 'Your details',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        notProvided: 'Not provided',
        yourMessage: 'Your message',
        tripDetails: 'Trip details',
        transferDetails: 'Transfer details',
        companyDetails: 'Company details',
        contactDetails: 'Contact details',
        tagline: 'Private Transfers & Tours in Morocco',
        requestTitles: {
            contact: 'Your Request to Mdina Tours',
            privateDriver: 'Your Private Driver Request',
            transfer: 'Your Transfer Request',
            tour: 'Your Tour Request',
            quote: 'Your Quote Request',
            generalBooking: 'Your Booking Request',
            partner: 'Your Partner Application',
        },
        labels: {
            service: 'Service',
            startCity: 'Starting city',
            travelDate: 'Travel date',
            duration: 'Duration',
            hours: 'Hour(s)',
            days: 'Day(s)',
            vehicleCategory: 'Vehicle category',
            travelType: 'Travel type',
            travelPlan: 'Travel plan',
            estimatedPrice: 'Estimated price',
            pickupLocation: 'Pickup location',
            dropoffLocation: 'Drop-off location',
            pickupTime: 'Pickup time',
            travelers: 'Travelers',
            route: 'Route',
            specialRequirements: 'Special requirements',
            companyName: 'Company name',
            businessType: 'Business type',
            location: 'Location',
            website: 'Website',
            monthlyVolume: 'Estimated monthly volume',
            servicesInterested: 'Services interested in',
            contactPerson: 'Contact person',
            whatsapp: 'WhatsApp number',
            attachment: 'Attachment',
        },
    },
    fr: {
        wordmark: 'MDINA TOURS',
        yourDetails: 'Vos coordonnées',
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        notProvided: 'Non renseigné',
        yourMessage: 'Votre message',
        tripDetails: 'Détails du voyage',
        transferDetails: 'Détails du transfert',
        companyDetails: "Détails de l'entreprise",
        contactDetails: 'Coordonnées de contact',
        tagline: 'Transferts Privés & Circuits au Maroc',
        requestTitles: {
            contact: 'Votre demande à Mdina Tours',
            privateDriver: 'Votre demande de chauffeur privé',
            transfer: 'Votre demande de transfert',
            tour: 'Votre demande d’excursion',
            quote: 'Votre demande de devis',
            generalBooking: 'Votre demande de réservation',
            partner: 'Votre candidature partenaire',
        },
        labels: {
            service: 'Service',
            startCity: 'Ville de départ',
            travelDate: 'Date du voyage',
            duration: 'Durée',
            hours: 'Heure(s)',
            days: 'Jour(s)',
            vehicleCategory: 'Catégorie de véhicule',
            travelType: 'Type de voyage',
            travelPlan: 'Itinéraire',
            estimatedPrice: 'Tarif estimé',
            pickupLocation: 'Lieu de prise en charge',
            dropoffLocation: 'Lieu de dépose',
            pickupTime: 'Heure de départ',
            travelers: 'Voyageurs',
            route: 'Trajet',
            specialRequirements: 'Besoins particuliers',
            companyName: "Nom de l'entreprise",
            businessType: "Type d'activité",
            location: 'Emplacement',
            website: 'Site web',
            monthlyVolume: 'Volume mensuel estimé',
            servicesInterested: 'Services souhaités',
            contactPerson: 'Personne de contact',
            whatsapp: 'Numéro WhatsApp',
            attachment: 'Pièce jointe',
        },
    },
    es: {
        wordmark: 'MDINA TOURS',
        yourDetails: 'Sus datos',
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        notProvided: 'No proporcionado',
        yourMessage: 'Su mensaje',
        tripDetails: 'Detalles del viaje',
        transferDetails: 'Detalles del traslado',
        companyDetails: 'Datos de la empresa',
        contactDetails: 'Datos de contacto',
        tagline: 'Traslados Privados y Tours en Marruecos',
        requestTitles: {
            contact: 'Su solicitud a Mdina Tours',
            privateDriver: 'Su solicitud de chófer privado',
            transfer: 'Su solicitud de traslado',
            tour: 'Su solicitud de tour',
            quote: 'Su solicitud de presupuesto',
            generalBooking: 'Su solicitud de reserva',
            partner: 'Su solicitud de colaborador',
        },
        labels: {
            service: 'Servicio',
            startCity: 'Ciudad de inicio',
            travelDate: 'Fecha del viaje',
            duration: 'Duración',
            hours: 'Hora(s)',
            days: 'Día(s)',
            vehicleCategory: 'Categoría del vehículo',
            travelType: 'Tipo de viaje',
            travelPlan: 'Itinerario',
            estimatedPrice: 'Precio estimado',
            pickupLocation: 'Lugar de recogida',
            dropoffLocation: 'Lugar de destino',
            pickupTime: 'Hora de recogida',
            travelers: 'Viajeros',
            route: 'Ruta',
            specialRequirements: 'Requisitos especiales',
            companyName: 'Nombre de la empresa',
            businessType: 'Tipo de negocio',
            location: 'Ubicación',
            website: 'Sitio web',
            monthlyVolume: 'Volumen mensual estimado',
            servicesInterested: 'Servicios de interés',
            contactPerson: 'Persona de contacto',
            whatsapp: 'Número de WhatsApp',
            attachment: 'Archivo adjunto',
        },
    },
};

export function getEmailTranslations(lang?: string) {
    const cleanLang = (lang || 'en').toLowerCase().slice(0, 2) as EmailLanguage;
    return EMAIL_TRANSLATIONS[cleanLang] || EMAIL_TRANSLATIONS.en;
}

function renderFieldRow(field: EmailField): string {
    const safeLabel = escapeHtml(field.label);
    const rawVal = field.value || '';
    const safeVal = escapeHtml(rawVal);

    let valHtml = `<span style="color: #0f172a; font-weight: 500;">${safeVal}</span>`;

    if (field.type === 'email' && rawVal) {
        valHtml = `<a href="mailto:${safeVal}" style="color: #f25c05; text-decoration: none; font-weight: 500;">${safeVal}</a>`;
    } else if (field.type === 'tel' && rawVal) {
        const cleanTel = rawVal.replace(/[\s()-]/g, '');
        valHtml = `<a href="tel:${cleanTel}" style="color: #0f172a; text-decoration: none; font-weight: 500;">${safeVal}</a>`;
    }

    return `
        <tr>
            <td style="width: 130px; padding: 5px 0; color: #64748b; vertical-align: top;">${safeLabel}:</td>
            <td style="padding: 5px 0;">${valHtml}</td>
        </tr>
    `;
}

export function renderMdinaEmail(options: MdinaEmailOptions): RenderedEmail {
    const t = getEmailTranslations(options.language);
    const tagline = options.footerTagline || t.tagline;
    const customerDetailsHeading = options.customerDetailsTitle || t.yourDetails;
    const safeTitle = escapeHtml(options.title);

    // Build HTML customer details
    const customerFieldsHtml = options.customerDetails
        .map(renderFieldRow)
        .join('');

    // Build HTML additional sections
    let sectionsHtml = '';
    if (options.sections && options.sections.length > 0) {
        for (const section of options.sections) {
            let sectionBody = '';
            if (section.fields && section.fields.length > 0) {
                const rows = section.fields.map(renderFieldRow).join('');
                sectionBody += `
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6; margin-bottom: 6px;">
                        ${rows}
                    </table>
                `;
            }
            if (section.calloutText) {
                const safeCallout = escapeHtml(section.calloutText).replace(/\n/g, '<br />');
                sectionBody += `
                    <div style="background-color: #f8fafc; border-left: 3px solid #f25c05; padding: 14px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; word-break: break-word; margin-top: 8px;">
                        ${safeCallout}
                    </div>
                `;
            }

            sectionsHtml += `
                <tr>
                    <td>
                        <div style="height: 1px; background-color: #e2e8f0; width: 100%;"></div>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 20px; padding-bottom: 18px;">
                        <div style="font-size: 14px; font-weight: 600; color: #1B2E4B; margin-bottom: 12px;">${escapeHtml(section.title)}</div>
                        ${sectionBody}
                    </td>
                </tr>
            `;
        }
    }

    // Build HTML message block
    let messageHtml = '';
    if (options.message && options.message.text.trim()) {
        const msgTitle = options.message.title || t.yourMessage;
        const safeMsg = escapeHtml(options.message.text.trim()).replace(/\n/g, '<br />');
        messageHtml = `
            <tr>
                <td>
                    <div style="height: 1px; background-color: #e2e8f0; width: 100%;"></div>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 20px; padding-bottom: 24px;">
                    <div style="font-size: 14px; font-weight: 600; color: #1B2E4B; margin-bottom: 12px;">${escapeHtml(msgTitle)}</div>
                    <div style="background-color: #f8fafc; border-left: 3px solid #f25c05; padding: 16px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; word-break: break-word;">${safeMsg}</div>
                </td>
            </tr>
        `;
    }

    const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${safeTitle}</title>
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
                    <div style="font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #1B2E4B; text-transform: uppercase;">${t.wordmark}</div>
                    <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 600; color: #1B2E4B; line-height: 1.3;">${safeTitle}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Details Section -->
          <tr>
            <td style="padding-top: 22px; padding-bottom: 18px;">
              <div style="font-size: 14px; font-weight: 600; color: #1B2E4B; margin-bottom: 12px;">${escapeHtml(customerDetailsHeading)}</div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6;">
                ${customerFieldsHtml}
              </table>
            </td>
          </tr>

          ${sectionsHtml}

          ${messageHtml}

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid #e2e8f0; padding-top: 18px; padding-bottom: 10px;">
              <div style="font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <span style="font-weight: 500; color: #64748b;">Mdina Tours</span> · ${escapeHtml(tagline)}<br/>
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

    // Plain text generation
    const textLines: string[] = [];
    textLines.push(t.wordmark);
    textLines.push(options.title);
    textLines.push('');
    textLines.push(customerDetailsHeading);
    for (const f of options.customerDetails) {
        textLines.push(`${f.label}: ${f.value || t.notProvided}`);
    }

    if (options.sections && options.sections.length > 0) {
        for (const s of options.sections) {
            textLines.push('');
            textLines.push(s.title);
            if (s.fields) {
                for (const f of s.fields) {
                    textLines.push(`${f.label}: ${f.value || t.notProvided}`);
                }
            }
            if (s.calloutText) {
                textLines.push(s.calloutText);
            }
        }
    }

    if (options.message && options.message.text.trim()) {
        textLines.push('');
        textLines.push(options.message.title || t.yourMessage);
        textLines.push(options.message.text.trim());
    }

    textLines.push('');
    textLines.push('--');
    textLines.push(`Mdina Tours · ${tagline}`);
    textLines.push('https://mdinatours.com');

    const text = textLines.join('\n');

    // Generate subject line based on primary customer name
    const customerNameField = options.customerDetails.find(f => f.label.toLowerCase() === t.name.toLowerCase() || f.label.toLowerCase().includes('name') || f.label.toLowerCase().includes('nom') || f.label.toLowerCase().includes('nombre'));
    const customerName = customerNameField ? customerNameField.value : '';
    const subject = customerName ? `${options.title} – ${customerName}` : options.title;

    return { subject, html, text };
}

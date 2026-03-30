'use client';

import React, { useState } from 'react';
import { sendEmail } from './actions';
import styles from './Contact.module.css';
import { useLanguage } from '@/context/LanguageContext';

const ContactForm: React.FC = () => {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageStatus, setMessageStatus] = useState<{ type: 'success' | 'error' | null, text: string | null }>({
        type: null,
        text: null,
    });

    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessageStatus({ type: null, text: null });

        const formData = new FormData(event.currentTarget);
        const result = await sendEmail(formData);

        setIsSubmitting(false);

        if (result.success) {
            setMessageStatus({
                type: 'success',
                text: t('contact_form_success'),
            });
            formRef.current?.reset();
        } else {
            setMessageStatus({
                type: 'error',
                text: result.error || t('contact_form_error'),
            });
        }
    };

    return (
        <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name">{t('contact_form_full_name')}</label>
                <input type="text" name="name" id="name" placeholder={t('contact_form_name_placeholder')} required />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">{t('contact_form_email')}</label>
                <input type="email" name="email" id="email" placeholder={t('contact_form_email_placeholder')} required />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="phone">{t('contact_form_phone')}</label>
                <input type="tel" name="phone" id="phone" placeholder={t('contact_form_phone_placeholder')} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="message">{t('contact_form_message')}</label>
                <textarea name="message" id="message" rows={5} placeholder={t('contact_form_message_placeholder')} required></textarea>
            </div>

            {messageStatus.text && (
                <div className={`${styles.statusMessage} ${styles[messageStatus.type || '']}`}>
                    {messageStatus.text}
                </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? t('contact_form_sending') : (
                    <>
                        {t('contact_form_send_btn')} <span>→</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default ContactForm;

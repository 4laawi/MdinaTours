'use client';

import React, { useState, useRef } from 'react';
import { submitPartnerForm } from './actions';
import styles from './Partners.module.css';
import { useLanguage } from '@/context/LanguageContext';

const PartnersForm: React.FC = () => {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [messageStatus, setMessageStatus] = useState<{ type: 'success' | 'error' | null, text: string | null }>({
        type: null,
        text: null,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileError(null);
        setFileName(null);

        if (!file) return;

        // Max 5MB
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setFileError(t('partners_form_license_error_size') || 'File size must be under 5MB.');
            event.target.value = ''; // Reset input
            return;
        }

        // Check file type (PDF or image)
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setFileError(t('partners_form_license_error_type') || 'Only PDF or image files (JPEG/PNG/WEBP) are allowed.');
            event.target.value = ''; // Reset input
            return;
        }

        setFileName(file.name);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validate that at least one service checkbox is selected
        const checkboxes = document.querySelectorAll('input[name="services"]:checked');
        if (checkboxes.length === 0) {
            setMessageStatus({
                type: 'error',
                text: t('partners_form_services_error') || 'Please select at least one service of interest.',
            });
            return;
        }

        setIsSubmitting(true);
        setMessageStatus({ type: null, text: null });

        const formData = new FormData(event.currentTarget);
        const result = await submitPartnerForm(formData);

        setIsSubmitting(false);

        if (result.success) {
            setMessageStatus({
                type: 'success',
                text: t('partners_form_success'),
            });
            setFileName(null);
            formRef.current?.reset();
        } else {
            setMessageStatus({
                type: 'error',
                text: result.error || 'Failed to submit registration. Please try again.',
            });
        }
    };

    return (
        <form ref={formRef} className={styles.partnersForm} onSubmit={handleSubmit}>
            <div className={styles.formIconWrapper}>
                <svg viewBox="0 0 80 80" fill="none" className={styles.formIconSvg} aria-hidden="true">
                    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" />
                    <path d="M40 15v10M40 55v10M15 40h10M55 40h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M40 30l6 10-6 10-6-10 6-10z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
                    <circle cx="40" cy="40" r="5" fill="currentColor" />
                </svg>
            </div>
            <h3 className={styles.formTitle}>{t('partners_form_title')}</h3>
            <p className={styles.formDesc}>{t('partners_form_desc')}</p>

            <div className={styles.formGrid}>
                {/* Company Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="companyName">{t('partners_form_company')} *</label>
                    <input 
                        type="text" 
                        name="companyName" 
                        id="companyName" 
                        placeholder={t('partners_form_company_placeholder')} 
                        required 
                    />
                </div>

                {/* Country + City */}
                <div className={styles.formGroup}>
                    <label htmlFor="location">{t('partners_form_location')} *</label>
                    <input 
                        type="text" 
                        name="location" 
                        id="location" 
                        placeholder={t('partners_form_location_placeholder')} 
                        required 
                    />
                </div>

                {/* Business Type Dropdown */}
                <div className={styles.formGroup}>
                    <label htmlFor="businessType">{t('partners_form_business_type')} *</label>
                    <div className={styles.selectWrapper}>
                        <select name="businessType" id="businessType" required defaultValue="">
                            <option value="" disabled hidden>{t('partners_form_business_type_placeholder')}</option>
                            <option value="Travel Agency">{t('partners_form_business_type_agency')}</option>
                            <option value="Hotel">{t('partners_form_business_type_hotel')}</option>
                            <option value="Incoming Operator">{t('partners_form_business_type_operator')}</option>
                            <option value="Other">{t('partners_form_business_type_other')}</option>
                        </select>
                    </div>
                </div>

                {/* Website (Optional) */}
                <div className={styles.formGroup}>
                    <label htmlFor="website">{t('partners_form_website')}</label>
                    <input 
                        type="text" 
                        name="website" 
                        id="website" 
                        placeholder={t('partners_form_website_placeholder')} 
                    />
                </div>

                {/* Contact Person Name & Title */}
                <div className={styles.formGroup}>
                    <label htmlFor="contactName">{t('partners_form_contact_name')} *</label>
                    <input 
                        type="text" 
                        name="contactName" 
                        id="contactName" 
                        placeholder={t('partners_form_contact_name_placeholder')} 
                        required 
                    />
                </div>

                {/* WhatsApp Number */}
                <div className={styles.formGroup}>
                    <label htmlFor="whatsapp">{t('partners_form_whatsapp')} *</label>
                    <input 
                        type="tel" 
                        name="whatsapp" 
                        id="whatsapp" 
                        placeholder={t('partners_form_whatsapp_placeholder')} 
                        required 
                    />
                </div>

                {/* Professional Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">{t('partners_form_email')} *</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder={t('partners_form_email_placeholder')} 
                        required 
                    />
                </div>

                {/* Monthly Volume Dropdown */}
                <div className={styles.formGroup}>
                    <label htmlFor="monthlyVolume">{t('partners_form_volume')} *</label>
                    <div className={styles.selectWrapper}>
                        <select name="monthlyVolume" id="monthlyVolume" required defaultValue="">
                            <option value="" disabled hidden>{t('partners_form_volume_placeholder')}</option>
                            <option value="Less than 10">{t('partners_form_volume_less')}</option>
                            <option value="10 to 50">{t('partners_form_volume_medium')}</option>
                            <option value="More than 50">{t('partners_form_volume_more')}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Interested In Checkboxes */}
            <div className={styles.formGroupFull}>
                <label className={styles.checkboxesLabel}>{t('partners_form_services')} *</label>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxItem}>
                        <input type="checkbox" name="services" value="Transfers" />
                        <span className={styles.checkmark}></span>
                        <span>{t('partners_form_services_transfers')}</span>
                    </label>
                    <label className={styles.checkboxItem}>
                        <input type="checkbox" name="services" value="Tours" />
                        <span className={styles.checkmark}></span>
                        <span>{t('partners_form_services_tours')}</span>
                    </label>
                    <label className={styles.checkboxItem}>
                        <input type="checkbox" name="services" value="Both" />
                        <span className={styles.checkmark}></span>
                        <span>{t('partners_form_services_both')}</span>
                    </label>
                </div>
            </div>

            {/* Business License File Upload */}
            <div className={styles.formGroupFull}>
                <label htmlFor="license" className={styles.fileLabel}>{t('partners_form_license')} *</label>
                <div className={styles.fileInputContainer}>
                    <input 
                        type="file" 
                        name="license" 
                        id="license" 
                        accept=".pdf, image/jpeg, image/png, image/webp" 
                        className={styles.fileInput} 
                        onChange={handleFileChange} 
                        required 
                    />
                    <div className={styles.fileDummy}>
                        <svg viewBox="0 0 24 24" fill="none" className={styles.uploadIcon}>
                            <path d="M12 16V8M12 8L9 11M12 8L15 11M4 16V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.fileDummyText}>
                            {fileName ? fileName : t('partners_form_license_placeholder')}
                        </span>
                    </div>
                </div>
                {fileError && <span className={styles.errorText}>{fileError}</span>}
            </div>

            {messageStatus.text && (
                <div className={`${styles.statusMessage} ${styles[messageStatus.type || '']}`}>
                    {messageStatus.text}
                </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? t('partners_form_submitting') : (
                    <>
                        {t('partners_form_submit_btn')} <span className={styles.submitArrow}>→</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default PartnersForm;

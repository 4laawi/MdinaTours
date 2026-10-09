import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Mdina Tours',
    description: 'Privacy Policy and Cookie tracking information for Mdina Tours.',
};

export default async function PrivacyPolicy({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    
    const isEs = lang === 'es';
    const isFr = lang === 'fr';

    const content = {
        title: isEs ? 'Política de Privacidad' : isFr ? 'Politique de Confidentialité' : 'Privacy Policy',
        lastUpdated: isEs ? 'Última actualización: Octubre 2026' : isFr ? 'Dernière mise à jour : Octobre 2026' : 'Last Updated: October 2026',
    };

    return (
        <main className="min-h-[100dvh] bg-[#F7F6F3] py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-16">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#787774] mb-4">
                        Legal Information
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-[#111111] mb-6 font-[family-name:var(--font-outfit)] font-semibold">
                        {content.title}
                    </h1>
                    <p className="text-base text-[#787774]">
                        {content.lastUpdated}
                    </p>
                </header>

                <div className="prose prose-lg prose-headings:font-[family-name:var(--font-outfit)] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#111111] prose-p:text-[#787774] prose-p:leading-relaxed prose-a:text-[#111111] prose-a:underline prose-a:underline-offset-4 prose-li:text-[#787774] max-w-none">
                    
                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>1. Introduction & Scope</h2>
                        <p>
                            Welcome to Mdina Tours. We are a Moroccan-based premium private transfer and tour agency serving an international clientele, particularly from the European Union (Spain, France, UK, etc.). 
                        </p>
                        <p>
                            We respect your privacy and are committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR) and Moroccan Data Protection laws (Law 09-08). This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, use our services, or interact with our digital advertising.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>2. The Data We Collect</h2>
                        <p>We may collect and process the following data about you:</p>
                        <ul>
                            <li><strong>Identity & Contact Data:</strong> Name, email address, phone number, and WhatsApp number provided during booking or inquiry.</li>
                            <li><strong>Booking & Travel Data:</strong> Pick-up locations, drop-off locations, flight details, dates of travel, and any special requirements.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and platform.</li>
                            <li><strong>Usage & Tracking Data:</strong> Information about how you use our website, facilitated by cookies and similar tracking technologies.</li>
                        </ul>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>3. Use of Google Ads & Consent Mode V2</h2>
                        <p>
                            To promote our tailor-made tours and transfer services, we use <strong>Google Ads</strong> and related analytics services. We have implemented <strong>Google Consent Mode V2</strong> to ensure full compliance with the EU User Consent Policy.
                        </p>
                        <ul>
                            <li><strong>Default State:</strong> When you arrive at our site, all non-essential tracking (including ad_storage, analytics_storage, ad_user_data, and ad_personalization) is strictly denied by default.</li>
                            <li><strong>Consent Mechanism:</strong> We only activate Google Ads tracking and Google Analytics if you explicitly click "Accept All" or manually opt-in via our Cookie Consent Banner.</li>
                            <li><strong>Data Sharing:</strong> If you consent, data such as your IP address, browser information, and interactions with our site may be shared with Google for the purpose of personalized advertising, remarketing, and conversion tracking.</li>
                        </ul>
                        <p>
                            You can revoke or modify your consent at any time by clicking the "Cookie Preferences" link located in the footer of our website.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>4. Third-Party Tracking & Cookies</h2>
                        <p>
                            Besides Google, we may use other third-party services (such as Meta Pixel) to deliver relevant advertisements to you across the internet. These third parties use cookies to serve ads based on your past visits to our website. 
                        </p>
                        <p>
                            No third-party tracking is initiated without your explicit, prior consent. We do not sell your personal data to any third parties.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>5. Data Retention</h2>
                        <p>
                            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Booking data is typically retained for a period of up to 5 years for tax and legal compliance.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>6. Your Legal Rights (Data Deletion & Access)</h2>
                        <p>
                            Under the GDPR, you have the right to:
                        </p>
                        <ul>
                            <li><strong>Request access</strong> to your personal data.</li>
                            <li><strong>Request correction</strong> of any incomplete or inaccurate data we hold about you.</li>
                            <li><strong>Request erasure</strong> (deletion) of your personal data.</li>
                            <li><strong>Object to processing</strong> of your personal data for direct marketing purposes.</li>
                            <li><strong>Withdraw consent</strong> at any time where we are relying on consent to process your personal data.</li>
                        </ul>
                        <p>
                            To exercise any of these rights, or to request the complete deletion of your booking and contact data from our systems, please email us directly at <strong>booking@mdinatours.com</strong>. We will respond to all legitimate requests within 30 days.
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}

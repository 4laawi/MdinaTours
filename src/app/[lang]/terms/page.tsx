import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Mdina Tours',
    description: 'Terms of Service and Booking Conditions for Mdina Tours.',
};

export default async function TermsOfService({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    
    const isEs = lang === 'es';
    const isFr = lang === 'fr';

    const content = {
        title: isEs ? 'Términos de Servicio' : isFr ? 'Conditions Générales de Vente' : 'Terms of Service',
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
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Mdina Tours. These Terms of Service govern your use of our website and the services we provide, including private transfers, guided tours, and tailored travel experiences in Morocco. By booking a service with us, you agree to these terms.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>2. Booking and Reservations</h2>
                        <p>
                            All bookings are subject to availability. A booking is only confirmed once you receive a confirmation email or WhatsApp message from our team. We reserve the right to decline any booking request.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>3. Pricing and Payments</h2>
                        <p>
                            Prices are quoted in Euros (€) or Moroccan Dirhams (MAD) unless otherwise stated. We accept various payment methods, including Cash on Arrival, Bank Transfers, and major Credit Cards (Visa, Mastercard). 
                        </p>
                        <p>
                            For certain multi-day tours, a deposit may be required to secure the reservation, with the balance due before or upon arrival.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>4. Cancellations and Modifications</h2>
                        <p>
                            We understand that travel plans can change. Cancellations made within our specified cancellation period (usually 48 hours for day trips and transfers, 14 days for multi-day tours) may be eligible for a full or partial refund. Cancellations made outside of this window may be subject to a cancellation fee.
                        </p>
                        <p>
                            To modify a booking, please contact us as soon as possible. We will do our best to accommodate your request, but modifications are subject to availability and may incur additional charges.
                        </p>
                    </section>

                    <section className="mb-12 border-b border-[#EAEAEA] pb-12">
                        <h2>5. Service Execution and Liability</h2>
                        <p>
                            Mdina Tours strives to provide punctual and high-quality services. However, we cannot be held liable for delays or itinerary changes caused by circumstances beyond our control, such as severe weather, road closures, strikes, or other force majeure events.
                        </p>
                        <p>
                            We partner with licensed and professional drivers. Passengers are expected to comply with local laws and the driver's instructions for a safe journey.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>6. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service or your booking, please contact us at:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> booking@mdinatours.com</li>
                            <li><strong>Phone/WhatsApp:</strong> +212 724-114775</li>
                            <li><strong>Address:</strong> Avenue Mohammed V, Rabat, Morocco 10000</li>
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}

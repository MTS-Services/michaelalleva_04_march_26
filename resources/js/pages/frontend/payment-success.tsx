import FrontendLayout from '@/layouts/frontend-layout';
import { Check, CheckCircle2, Info } from 'lucide-react';

interface PaymentSuccessProps {
    destination?: string;
    departureDate?: string;
    travelers?: number;
    packageName?: string;
}

export default function PaymentSuccess({
    destination = 'Egypt',
    departureDate = 'Monday, March 16, 2026',
    travelers = 1,
    packageName = '5 Night',
}: PaymentSuccessProps) {
    return (
        <FrontendLayout>
            <div className='mt-24 md:mt-28 lg:mt-32'></div>
            <section className="flex items-start justify-center px-4 py-15 md:px-6 lg:px-8">
                <div className="container max-w-7xl p-6 bg-card space-y-6" style={{ borderRadius: '24px' }}>
                    {/* Success card */}
                    <div className="rounded-2xl bg-background border border-primary p-6">
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                                <Check className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl lg:text-2xl">
                                    Payment Successful!
                                </h1>
                                <p>
                                    Your booking has been confirmed
                                </p>
                            </div>
                        </div>

                        {/* Booking details table */}
                        <div className="overflow-hidden rounded-xl bg-card p-6">
                            <DetailRow label="Destination:" value={destination} />
                            <DetailRow label="Departure:" value={departureDate} />
                            <DetailRow label="Travelers:" value={String(travelers)} />
                            <DetailRow label="Package:" value={packageName} last />
                        </div>
                    </div>

                    {/* Booking Status – Pending Waiver */}
                    <div className="flex items-start gap-3 rounded-2xl border border-[#FFCC00] bg-yellow-50 p-6 dark:border-yellow-900/40 dark:bg-yellow-900/10">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white">
                            <Info className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className='space-y-4'>
                            <h4 className="text-lg md:text-xl lg:text-2xl">
                                Booking Status
                            </h4>
                            <p>
                                Your booking is currently in{' '}
                                <a href="#" className="underline">
                                    Pending Waiver
                                </a>{' '}
                                status. Once you submit this waiver, our team will review and approve
                                it. you will receive a confirmation{' '}
                                <strong>email</strong> when your booking
                                status is updated to{' '}
                                <a href="#" className="underline">
                                    approved
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}

function DetailRow({
    label,
    value,
    last,
}: {
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between`}
        >
            <span className="text-muted-foreground/80">{label}</span>
            <span className="">{value}</span>
        </div>
    );
}
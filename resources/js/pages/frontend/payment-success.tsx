import FrontendLayout from '@/layouts/frontend-layout';
import { CheckCircle2 } from 'lucide-react';

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
            <div className="flex min-h-[70vh] items-start justify-center px-4 py-16">
                <div className="w-full max-w-2xl space-y-5">
                    {/* Success card */}
                    <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-sm">
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                                <CheckCircle2 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="font-oswald text-2xl font-semibold text-foreground">
                                    Payment Successful!
                                </h1>
                                <p className="font-libre-franklin text-sm text-muted-foreground">
                                    Your booking has been confirmed
                                </p>
                            </div>
                        </div>

                        {/* Booking details table */}
                        <div className="overflow-hidden rounded-xl border border-border bg-card">
                            <DetailRow label="Destination:" value={destination} />
                            <DetailRow label="Departure:" value={departureDate} />
                            <DetailRow label="Travelers:" value={String(travelers)} />
                            <DetailRow label="Package:" value={packageName} last />
                        </div>
                    </div>

                    {/* Booking Status – Pending Waiver */}
                    <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900/40 dark:bg-yellow-900/10">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white">
                            <span className="text-xs font-bold">!</span>
                        </div>
                        <div>
                            <p className="font-oswald mb-2 text-base font-semibold text-foreground">
                                Booking Status
                            </p>
                            <p className="font-libre-franklin text-sm text-muted-foreground">
                                Your booking is currently in{' '}
                                <a href="#" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-2">
                                    Pending Waiver
                                </a>{' '}
                                status. Once you submit this waiver, our team will review and approve
                                it. you will receive a confirmation{' '}
                                <strong className="text-foreground">email</strong> when your booking
                                status is updated to{' '}
                                <a href="#" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-2">
                                    approved
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
            className={`flex items-center justify-between px-5 py-4 ${
                last ? '' : 'border-b border-border'
            }`}
        >
            <span className="font-libre-franklin text-sm text-muted-foreground">{label}</span>
            <span className="font-libre-franklin text-sm text-foreground">{value}</span>
        </div>
    );
}
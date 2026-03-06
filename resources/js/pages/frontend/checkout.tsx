
import { BookingProgress } from '@/components/booking-progress';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { ArrowRight, Lock } from 'lucide-react';
import { useState } from 'react';

interface CheckoutProps {
    destination?: string;
    packageName?: string;
    travelers?: number;
    departureDate?: string;
    packagePrice?: number;
    taxesFees?: number;
}

export default function Checkout({
    destination = 'Egypt',
    packageName = '5 Nights',
    travelers = 1,
    departureDate = 'Monday, March 16, 2026',
    packagePrice = 7000,
    taxesFees = 0,
}: CheckoutProps) {
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit'>('paypal');
    const [agreed, setAgreed] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const subtotal = packagePrice * travelers;
    const total = subtotal + taxesFees + 560; // fixed service fee shown as $7,560

    const handleSubmit = () => {
        if (!agreed) return;
        setSubmitting(true);
        // wire to Inertia form post in real usage
        setTimeout(() => setSubmitting(false), 2000);
    };

    return (
        <FrontendLayout>
            <BookingProgress currentStep={3} />

            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_280px]">
                    {/* Left column */}
                    <div className="space-y-5">
                        {/* Booking Summary */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="font-oswald mb-5 text-base font-semibold text-foreground">
                                Booking Summary
                            </h2>
                            <div className="space-y-3 font-libre-franklin text-sm">
                                <SummaryRow label="Destination:" value={destination} />
                                <SummaryRow label="Package:" value={packageName} />
                                <SummaryRow label="Travelers:" value={String(travelers)} />
                                <SummaryRow label="Departure Date:" value={departureDate} />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="font-oswald mb-4 text-base font-semibold text-foreground">
                                Payment Method
                            </h2>
                            <div className="space-y-3">
                                {/* PayPal option */}
                                <label
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all',
                                        paymentMethod === 'paypal'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border bg-card hover:border-primary/40',
                                    )}
                                >
                                    <div className="relative flex h-5 w-5 items-center justify-center">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            className="peer sr-only"
                                        />
                                        <div className="h-5 w-5 rounded-full border-2 border-muted transition peer-checked:border-primary" />
                                        {paymentMethod === 'paypal' && (
                                            <div className="absolute h-2.5 w-2.5 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-libre-franklin font-medium text-foreground">
                                            PayPal
                                        </p>
                                        <p className="font-libre-franklin text-xs text-muted-foreground">
                                            Pay securely with PayPal
                                        </p>
                                    </div>
                                </label>

                                {/* Credit Card option */}
                                <label
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all',
                                        paymentMethod === 'credit'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border bg-card hover:border-primary/40',
                                    )}
                                >
                                    <div className="relative flex h-5 w-5 items-center justify-center">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit"
                                            checked={paymentMethod === 'credit'}
                                            onChange={() => setPaymentMethod('credit')}
                                            className="peer sr-only"
                                        />
                                        <div className="h-5 w-5 rounded-full border-2 border-muted transition peer-checked:border-primary" />
                                        {paymentMethod === 'credit' && (
                                            <div className="absolute h-2.5 w-2.5 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-libre-franklin font-medium text-foreground">
                                            Credit Card
                                        </p>
                                        <p className="font-libre-franklin text-xs text-muted-foreground">
                                            Pay with Stripe
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Terms of Service */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="font-oswald mb-4 text-base font-semibold text-foreground">
                                Terms of Service
                            </h2>

                            <div className="space-y-4 font-libre-franklin text-sm text-foreground">
                                <div>
                                    <p className="mb-1 font-semibold">Non-Refundable Policy</p>
                                    <p className="text-muted-foreground">
                                        All bookings are{' '}
                                        <strong className="text-foreground">non-refundable</strong>{' '}
                                        once payment is processed. By proceeding with this booking,
                                        you acknowledge and agree that:
                                    </p>
                                    <ul className="mt-2 space-y-1 text-muted-foreground">
                                        {[
                                            'No refunds will be issued for cancellations, changes, or no-shows',
                                            'Refunds are only available if the provider cancels the trip',
                                            'Travel insurance is strongly recommended',
                                            'You are responsible for obtaining necessary travel documents',
                                            'You must comply with all health and safety requirements',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="mb-1 font-semibold">Payment Terms</p>
                                    <ul className="space-y-1 text-muted-foreground">
                                        {[
                                            'Full payment is required at time of booking',
                                            'All prices are in USD',
                                            'Taxes and fees are included in the total price',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="mb-1 font-semibold">Waiver Requirement</p>
                                    <p className="text-muted-foreground">
                                        After payment, you will be required to sign a digital waiver
                                        for injury and property damage. Your booking will remain in
                                        &ldquo;Pending&rdquo; status until the waiver is completed
                                        and approved.
                                    </p>
                                </div>

                                {/* Agreement checkbox */}
                                <label className="flex cursor-pointer items-start gap-3 pt-1">
                                    <div className="relative mt-0.5 flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div
                                            className={cn(
                                                'flex h-5 w-5 items-center justify-center rounded border-2 transition-all',
                                                agreed
                                                    ? 'border-primary bg-primary'
                                                    : 'border-border bg-card',
                                            )}
                                        >
                                            {agreed && (
                                                <svg
                                                    className="h-3 w-3 text-primary-foreground"
                                                    fill="none"
                                                    viewBox="0 0 12 12"
                                                >
                                                    <path
                                                        d="M2 6l3 3 5-5"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        I have read and agree to the Terms of Service, including the
                                        non-refundable policy. I understand that I must complete a
                                        waiver after payment.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right column: order summary */}
                    <div className="lg:sticky lg:top-6 h-fit space-y-3">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h2 className="font-oswald mb-4 text-base font-semibold text-foreground">
                                Order Summary
                            </h2>
                            <div className="space-y-3 font-libre-franklin text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Package Price</span>
                                    <span className="text-foreground">
                                        ${packagePrice.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Travelers</span>
                                    <span className="text-foreground">x {travelers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground">
                                        ${subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t border-border pt-2" />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taxes &amp; Fees</span>
                                    <span className="text-foreground">
                                        ${taxesFees.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t border-border pt-2" />
                                <div className="flex items-baseline justify-between">
                                    <span className="font-oswald font-semibold text-foreground">
                                        Total
                                    </span>
                                    <span className="font-oswald text-xl font-bold text-primary">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!agreed || submitting}
                                className={cn(
                                    'font-libre-franklin mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition',
                                    agreed && !submitting
                                        ? 'bg-primary hover:bg-primary/90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                )}
                            >
                                {submitting ? 'Processing…' : 'Complete Booking'}
                                {!submitting && <ArrowRight className="h-4 w-4" />}
                            </button>

                            <div className="mt-3 flex items-center justify-center gap-1.5 text-muted-foreground">
                                <Lock className="h-3.5 w-3.5" />
                                <span className="font-libre-franklin text-xs">
                                    Your payment is secure and encrypted
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground">{value}</span>
        </div>
    );
}
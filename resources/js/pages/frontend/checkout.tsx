
import { BookingProgress } from '@/components/booking-progress';
import { Checkbox } from '@/components/ui/checkbox';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { paymentFailure, paymentSuccess } from '@/routes';
import { router } from '@inertiajs/react';
import { ArrowRight, Circle, Lock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
        const successUrl = paymentSuccess.url({ bookingUid: '1234567890' });
        const failureUrl = paymentFailure.url({ bookingUid: '1234567890' });

        // Randomly redirect to success or failure url
        const random = Math.random();
        const redirectTo = random < 0.5 ? successUrl : failureUrl;
        router.visit(redirectTo, {
            onSuccess: () => {
                toast.success('Payment successful');
            },
            onError: () => {
                toast.error('Payment failed');
            },
        });
    };

    return (
        <FrontendLayout>
            <div className='mt-34 sm:mt-36 lg:mt-40 xl:mt-44'></div>
            <BookingProgress currentStep={3} />

            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    {/* Left column */}
                    <div className="space-y-5">
                        {/* Booking Summary */}
                        <div className="rounded-2xl bg-card p-6 space-y-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl">
                                Booking Summary
                            </h2>
                            <div className="space-y-4 text-base md:text-lg lg:text-xl">
                                <SummaryRow label="Destination:" value={destination} />
                                <SummaryRow label="Package:" value={packageName} />
                                <SummaryRow label="Travelers:" value={String(travelers)} />
                                <SummaryRow label="Departure Date:" value={departureDate} />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-2xl bg-card p-6 space-y-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl">
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                {/* PayPal option */}
                                <label
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all bg-background',
                                        paymentMethod === 'paypal' ? 'border-primary' : 'border-transparent'
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
                                        <h4 className="text-base md:text-lg lg:text-xl">
                                            PayPal
                                        </h4>
                                        <p className="text-sm md:text-base">
                                            Pay securely with PayPal
                                        </p>
                                    </div>
                                </label>

                                {/* Credit Card option */}
                                <label
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all bg-background',
                                        paymentMethod === 'credit' ? 'border-primary' : 'border-transparent'
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
                                        <h4 className="text-base md:text-lg lg:text-xl">
                                            Credit Card
                                        </h4>
                                        <p className="text-sm md:text-base">
                                            Pay with Stripe
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Terms of Service */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl">
                                Terms of Service
                            </h2>

                            <div className="space-y-4">
                                <div className='space-y-2'>
                                    <h6 className="text-base">Non-Refundable Policy</h6>
                                    <p>
                                        All bookings are{' '}
                                        <strong>non-refundable</strong>{' '}
                                        once payment is processed. By proceeding with this booking,
                                        you acknowledge and agree that:
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {[
                                            'No refunds will be issued for cancellations, changes, or no-shows',
                                            'Refunds are only available if the provider cancels the trip',
                                            'Travel insurance is strongly recommended',
                                            'You are responsible for obtaining necessary travel documents',
                                            'You must comply with all health and safety requirements',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <Circle className="size-1 fill-muted-foreground mt-1" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='space-y-2'>
                                    <h6>Payment Terms</h6>
                                    <ul className="space-y-1 ">
                                        {[
                                            'Full payment is required at time of booking',
                                            'All prices are in USD',
                                            'Taxes and fees are included in the total price',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <Circle className="size-1 fill-muted-foreground mt-1" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className='space-y-2'>
                                    <h6>Waiver Requirement</h6>
                                    <p >
                                        After payment, you will be required to sign a digital waiver
                                        for injury and property damage. Your booking will remain in
                                        &ldquo;Pending&rdquo; status until the waiver is completed
                                        and approved.
                                    </p>
                                </div>

                                {/* Agreement checkbox */}
                                <label className="flex cursor-pointer items-start gap-3 pt-1">
                                    <div className="relative mt-0.5 shrink-0">
                                        {/* <input
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="peer sr-only"
                                        /> */}
                                        <Checkbox
                                            checked={agreed}
                                            onCheckedChange={(checked) => setAgreed(checked as boolean)}
                                            className='size-5 data-[state=checked]:bg-primary border-primary!'
                                        />
                                        {/* <div
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
                                        </div> */}
                                    </div>
                                    <span className="text-sm ">
                                        I have read and agree to the Terms of Service, including the
                                        non-refundable policy. I understand that I must complete a
                                        waiver after payment.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right column: order summary */}
                    <div className="lg:sticky lg:top-30 h-fit space-y-3">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Package Price</span>
                                    <span className="text-foreground">
                                        ${packagePrice.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Travelers</span>
                                    <span className="text-foreground">x {travelers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-foreground">
                                        ${subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-foreground" />
                                <div className="flex justify-between">
                                    <span>Taxes & Fees</span>
                                    <span className="text-foreground">
                                        ${taxesFees.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-foreground" />
                                <div className="flex items-baseline justify-between">
                                    <span className="text-lg md:text-xl lg:text-2xl">
                                        Total
                                    </span>
                                    <span className="text-lg md:text-xl lg:text-2xl text-primary">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!agreed || submitting}
                                className={cn(
                                    'mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition',
                                    agreed && !submitting
                                        ? 'bg-primary hover:bg-primary/90'
                                        : 'cursor-not-allowed bg-muted ',
                                )}
                            >
                                {submitting ? 'Processing…' : 'Complete Booking'}
                                {!submitting && <ArrowRight className="h-4 w-4" />}
                            </button>

                            <div className="mt-3 flex items-center justify-center gap-1.5 ">
                                <Lock className="h-3.5 w-3.5" />
                                <span className="text-xs">
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
            <span >{label}</span>
            <span className="text-foreground">{value}</span>
        </div>
    );
}
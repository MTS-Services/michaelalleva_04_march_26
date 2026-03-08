import { Button } from '@/components/ui/button';
import FrontendLayout from '@/layouts/frontend-layout';
import { CheckCircle2, Circle, X } from 'lucide-react';

interface PaymentFailureProps {
    destination?: string;
    departureDate?: string;
    travelers?: number;
    packageName?: string;
}

export default function PaymentFailure({
    destination = 'Egypt',
    departureDate = 'Monday, March 16, 2026',
    travelers = 1,
    packageName = '5 Night',
}: PaymentFailureProps) {
    return (
        <FrontendLayout>
            <div className='mt-24 md:mt-28 lg:mt-32'></div>
            <section className='flex items-start justify-center px-4 py-15 md:px-6 lg:px-8'>
                <div className='container mx-auto max-w-7xl p-6 bg-card mb-15' style={{ borderRadius: '24px' }}>
                    <div className='bg-background p-6 rounded-2xl border '>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                                <X className="h-5 w-5 text-destructive" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl lg:text-2xl">
                                    Payment Failed!
                                </h1>
                                <p className="">
                                    Sorry! Your payment could not be completed.
                                </p>
                            </div>
                        </div>

                        {/* Booking details table */}
                        <div className="overflow-hidden rounded-xl bg-card p-6 space-y-5">
                            <div className='space-y-3'>
                                <h3 className='text-lg md:text-xl lg:text-2xl'>Possible reasons</h3>
                                <ul>
                                    {[
                                        'Insufficient balance in your account',
                                        'Incorrect card or payment details',
                                        'Payment was cancelled during the process',
                                        'Network or bank server issue',
                                        'Card/transaction limit exceeded'
                                    ].map((reason) => (
                                        <li key={reason} className='flex items-center gap-2'>
                                            <Circle className="size-1 fill-muted-foreground" />
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='space-y-3'>
                                <h3 className='text-lg md:text-xl lg:text-2xl'>What You Can Do</h3>
                                <ul>
                                    {[
                                        'Please check your payment details and try again',
                                        'Use another payment method (Card / Mobile Banking / Wallet)',
                                        'Make sure your internet connection is stable',
                                        'Contact your bank if the issue continues'
                                    ].map((action) => (
                                        <li key={action} className='flex items-center gap-2'>
                                            <Circle className="size-1 fill-muted-foreground" />{action}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='flex gap-3 mt-3 flex-col md:flex-row'>
                            <Button className='bg-foreground hover:bg-foreground/90 cursor-pointer w-full md:w-auto'>
                                Back To Checkout
                            </Button>
                            <Button className='cursor-pointer w-full md:w-auto'>
                                Retry Payment
                            </Button>
                        </div>
                    </div>

                </div>
            </section>
        </FrontendLayout >
    );
}

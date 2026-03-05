import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Mail, PhoneCall } from 'lucide-react';

const defaultPhoneHref = 'tel:+1234567890';
const defaultEmailHref = 'mailto:hello@example.com';

interface GetInTouchProps {
    phoneHref?: string;
    emailHref?: string;
}

export default function GetInTouch({ phoneHref = defaultPhoneHref, emailHref = defaultEmailHref }: GetInTouchProps) {
    return (
        <section className="bg-muted py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-foreground text-xl sm:text-2xl md:text-[40px]">
                        Get in touch
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
                        Have a destination in mind or just a feeling you want to chase? Tell us a bit about your next
                        adventure and we&apos;ll start designing a journey that&apos;s completely one-of-one.
                    </p>
                    <div className="flex items-center gap-6">
                        <Button asChild className="mt-2 cursor-pointer">
                            <a href={emailHref}>
                                <Mail className="w-4 h-4" />
                                Email Us
                            </a>
                        </Button>
                        <Button asChild className="mt-2 cursor-pointer" variant="outline">
                            <a href={defaultPhoneHref}>
                                <PhoneCall className="w-4 h-4" />
                                Call Us
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
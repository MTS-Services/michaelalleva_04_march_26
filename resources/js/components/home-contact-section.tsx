import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';

export interface HomeContactSectionProps {
    usaHeading?: string;
    usaContent?: string;
    usaImageSrc?: string;
    contactHeading?: string;
    contactContent?: string;
    emailHref?: string;
    phoneHref?: string;
}

const defaultUsaHeading = 'USA Clients Only';
const defaultUsaContent =
    'Our services are exclusively available to residents of the United States. All bookings require US-based phone verification and payment methods.';
const defaultContactHeading = 'Get in Touch';
const defaultContactContent =
    'Have questions about your journey? Our travel experts are here to help you plan the perfect adventure.';
const defaultEmailHref = 'mailto:hello@example.com';
const defaultPhoneHref = 'tel:+1234567890';

export function HomeContactSection({
    usaHeading = defaultUsaHeading,
    usaContent = defaultUsaContent,
    usaImageSrc,
    contactHeading = defaultContactHeading,
    contactContent = defaultContactContent,
    emailHref = defaultEmailHref,
    phoneHref = defaultPhoneHref,
}: HomeContactSectionProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
                <article className="flex flex-col items-center justify-center rounded-2xl bg-muted p-10 text-center">
                    {usaImageSrc ? (
                        <div className="mb-6 size-[120px] overflow-hidden rounded-full">
                            <img
                                src={usaImageSrc}
                                alt=""
                                className="size-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-muted-foreground/10 mb-6 flex size-[120px] items-center justify-center rounded-full" />
                    )}
                    <h2 className="font-oswald text-foreground mb-2 text-4xl font-bold">
                        {usaHeading}
                    </h2>
                    <p className="font-libre-franklin text-foreground max-w-md text-xl leading-relaxed">
                        {usaContent}
                    </p>
                </article>
                <article className="flex flex-col justify-center rounded-2xl bg-muted p-10">
                    <h2 className="font-oswald text-foreground mb-2 text-4xl font-bold">
                        {contactHeading}
                    </h2>
                    <p className="font-libre-franklin text-foreground mb-10 text-xl leading-relaxed">
                        {contactContent}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Button asChild>
                            <a href={emailHref} className="gap-2">
                                <Mail className="size-4" />
                                Email Us
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={phoneHref} className="gap-2">
                                <Phone className="size-4" />
                                Call Us
                            </a>
                        </Button>
                    </div>
                </article>
            </div>
        </section>
    );
}

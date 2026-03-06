import { Mail, MapPin, Clock, PhoneCall } from 'lucide-react';
import { useRef, useState } from 'react';

import { Banner } from '@/components/banner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FrontendLayout from '@/layouts/frontend-layout';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { destination } from '@/routes';

const defaultEmailHref = 'mailto:info@wanderlusttravels.com';
const defaultPhoneHref = 'tel:+1-800-123-4567';

const BannerConfig = {
    title: 'A One-of-One Travel Experience.',
    tagline:
        "We don’t just book trips; we curate experiences that surprise even the most seasoned travelers.",
    badgeLabel: 'Our Story',
    ctaLabel: 'Explore Destinations',
    ctaHref: destination().url,
    imageSrc: '/images/airplane.jpg',
    imageAlt: 'Travel destination hero'
}

export default function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [interestedDestination, setInterestedDestination] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const isSubmitting = useRef(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isSubmitting.current = true;
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
            setSubmitted(true); // Added for UX feedback
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting.current = false;
        }
    };



    return (
        <FrontendLayout>
            <Banner title={BannerConfig.title} tagline={BannerConfig.tagline} badgeLabel={BannerConfig.badgeLabel} ctaLabel={BannerConfig.ctaLabel} ctaHref={BannerConfig.ctaHref} imageSrc={BannerConfig.imageSrc} imageAlt={BannerConfig.imageAlt} darkMode={true} />

            {/* Responsive padding: py-10 on mobile, py-15 on desktop */}
            <div className="mx-auto max-w-7xl px-4 py-10 md:py-15 md:px-6 lg:px-8">
                {/* Responsive gap: gap-8 on mobile, gap-12 on desktop */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">

                    {/* Left Column: Contact Information */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl md:text-2xl font-semibold mb-3">
                            We'd Love to Hear From You
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                            Whether you have questions about our packages, need help choosing a destination, or want to learn more about our booking process — we're here for you.
                        </p>

                        <div className="space-y-6 mt-8">
                            {/* Contact Item Wrapper */}
                            {[
                                { href: defaultEmailHref, icon: Mail, label: 'Email', value: 'info@wanderlusttravels.com' },
                                { href: defaultPhoneHref, icon: PhoneCall, label: 'Phone (Mon-Fri, 9am-6pm EST)', value: '+1 (800) 123-4567' },
                            ].map((item, idx) => (
                                <a key={idx} href={item.href} className="flex items-center gap-4 group">
                                    <span className="inline-flex shrink-0 rounded-xl items-center justify-center p-3 md:p-4 bg-muted/30 text-secondary-foreground group-hover:bg-muted/50 transition-colors">
                                        <item.icon className="size-5 md:size-6" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                        <h4 className="text-md md:text-xl font-medium truncate">{item.value}</h4>
                                    </div>
                                </a>
                            ))}

                            <div className="flex items-center gap-4">
                                <span className="inline-flex shrink-0 rounded-xl items-center justify-center p-3 md:p-4 bg-muted/30 text-secondary-foreground">
                                    <MapPin className="size-5 md:size-6" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Office (New York, NY 10118, USA)</p>
                                    <h4 className="text-md md:text-xl font-medium">350 Fifth Avenue, Suite 4100</h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="inline-flex shrink-0 rounded-xl items-center justify-center p-3 md:p-4 bg-muted/30 text-secondary-foreground">
                                    <Clock className="size-5 md:size-6" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Business hours</p>
                                    <h4 className="text-md md:text-xl font-medium">Mon - Fri: 9:00 AM - 6:00 PM</h4>
                                    <p className="text-xs text-muted-foreground">Saturday: 10:00 AM - 3:00 PM (EST)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="rounded-2xl bg-muted/30 p-6">
                        <h2 className="text-xl md:text-2xl font-semibold mb-2">
                            Send Us a Message
                        </h2>

                        <p className="text-sm md:text-base text-muted-foreground mb-8">
                            We typically respond within 24 hours on business days.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <FieldSet className="w-full">
                                <FieldGroup className="gap-4">
                                    <Field className='gap-4'>
                                        <FieldLabel htmlFor="name">Full name</FieldLabel>
                                        <Input id="name" name="fullName" type="text" placeholder="Your Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                    </Field>

                                    <Field className='gap-4'>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input id="email" name="email" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </Field>

                                    <Field className='gap-4'>
                                        <FieldLabel htmlFor="destination">Interested Destination</FieldLabel>
                                        <Select value={interestedDestination} onValueChange={setInterestedDestination}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a destination" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="egypt">Egypt</SelectItem>
                                                <SelectItem value="costa-rica">Costa Rica</SelectItem>
                                                <SelectItem value="norway">Norway</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    <Field className='gap-4'>
                                        <FieldLabel htmlFor="subject">Subject</FieldLabel>
                                        <Input id="subject" name="subject" type="text" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                                    </Field>

                                    <Field className='gap-4'>
                                        <FieldLabel htmlFor="message">Message</FieldLabel>
                                        <Textarea id="message" name="message" placeholder="Enter your message here..." value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <Button type="submit" className="w-full md:w-auto px-8" disabled={isSubmitting.current}>
                                {isSubmitting.current ? 'Sending...' : 'Send'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
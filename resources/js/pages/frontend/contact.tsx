import { ContactBanner } from '@/components/contact-banner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FrontendLayout from '@/layouts/frontend-layout';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

const defaultEmailHref = 'mailto:hello@example.com';
const defaultPhoneHref = 'tel:+1234567890';
const officeAddress = '123 Travel Street, Suite 100, Your City, ST 12345';
const businessHours = 'Monday – Friday: 9:00 AM – 6:00 PM ET';

export default function Contact() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [interestedDestination, setInterestedDestination] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFullName('');
        setEmail('');
        setInterestedDestination('');
        setSubject('');
        setMessage('');
    };

    return (
        <FrontendLayout>
            <ContactBanner />

            <div className="mx-auto max-w-7xl px-4 py-15 md:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="font-oswald text-foreground mb-6 text-3xl font-bold">
                            We'd Love to Hear From You
                        </h2>
                        <div className="font-libre-franklin text-foreground space-y-6">
                            <p className="text-lg leading-relaxed">
                                Reach out with any questions about destinations,
                                packages, or booking. We typically respond within
                                24 hours.
                            </p>
                            <div className="flex flex-col gap-4">
                                <a
                                    href={defaultEmailHref}
                                    className="flex items-center gap-3 text-lg hover:opacity-80"
                                >
                                    <Mail className="size-5 shrink-0" />
                                    <span>hello@example.com</span>
                                </a>
                                <a
                                    href={defaultPhoneHref}
                                    className="flex items-center gap-3 text-lg hover:opacity-80"
                                >
                                    <Phone className="size-5 shrink-0" />
                                    <span>+1 (234) 567-890</span>
                                </a>
                                <div className="flex items-start gap-3 text-lg">
                                    <MapPin className="size-5 mt-0.5 shrink-0" />
                                    <span>{officeAddress}</span>
                                </div>
                                <div className="flex items-center gap-3 text-lg">
                                    <Clock className="size-5 shrink-0" />
                                    <span>{businessHours}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-muted p-8">
                        <h2 className="font-oswald text-foreground mb-6 text-2xl font-bold">
                            Send Us a Message
                        </h2>
                        {submitted ? (
                            <p className="font-libre-franklin text-foreground text-lg">
                                Thank you for your message. We'll be in touch soon.
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="full_name">Full name</Label>
                                    <Input
                                        id="full_name"
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                        className="mt-1"
                                        autoComplete="name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="mt-1"
                                        autoComplete="email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="interested_destination">
                                        Interested destination
                                    </Label>
                                    <Input
                                        id="interested_destination"
                                        value={interestedDestination}
                                        onChange={(e) =>
                                            setInterestedDestination(
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        placeholder="e.g. Egypt, Costa Rica"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                <Button type="submit">Send Message</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}


import { BookingProgress } from '@/components/booking-progress';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import FrontendLayout from '@/layouts/frontend-layout';
import { cn } from '@/lib/utils';
import { checkout } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Shield, User, UserRound } from 'lucide-react';
import { useState } from 'react';

interface GuestInfoProps {
    travelers?: number;
    destinationSlug?: string;
    packageSlug?: string;
    prevStep?: string;
}

interface GuestAge {
    age: string;
}

export default function GuestInfo({
    travelers = 1,
    destinationSlug,
    packageSlug,
    prevStep = '#',
}: GuestInfoProps) {
    const [guests, setGuests] = useState<GuestAge[]>(
        Array.from({ length: travelers }, () => ({ age: '' })),
    );
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneSent, setPhoneSent] = useState(false);
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    console.log("prevStep", prevStep);

    const setGuestAge = (idx: number, val: string) => {
        setGuests((prev) => prev.map((g, i) => (i === idx ? { age: val } : g)));
    };

    const canContinue =
        guests.every((g) => g.age.trim() !== '') &&
        phone.trim() !== '' &&
        phoneCode.trim() !== '' &&
        email.trim() !== '' &&
        emailCode.trim() !== '';

    return (
        <FrontendLayout>
            <div className='mt-34 sm:mt-36 lg:mt-40 xl:mt-44'></div>

            <BookingProgress currentStep={2} />

            <div className="container max-w-7xl mx-auto py-15 px-4 md:px-6 lg:px-8 space-y-15">
                {/* Main form card */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <h1 className="font-oswald text-3xl font-semibold text-foreground">
                            Guest Information
                        </h1>
                        <p className="font-libre-franklin mt-2 text-sm text-muted-foreground">
                            Please provide the age of each traveler
                        </p>
                    </div>

                    <form>
                        <FieldSet>
                            <FieldGroup className="space-y-6">
                                {/* Guest ages */}
                                {guests.map((guest, idx) => (
                                    <Field key={idx}>
                                        <FieldLabel className="font-libre-franklin mb-2 block text-sm font-medium text-foreground">
                                            Guest {idx + 1} Age
                                        </FieldLabel>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                                                <UserRound className="h-5 w-5 text-primary" />
                                            </div>
                                            <Input
                                                type="number"
                                                value={guest.age}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuestAge(idx, e.target.value)}
                                                placeholder="18+"
                                                className="flex-1"
                                            />
                                        </div>
                                    </Field>
                                ))}

                                {/* Phone verification */}
                                <Field>
                                    <FieldLabel className="font-libre-franklin mb-2 block text-sm font-medium text-foreground">
                                        US Phone Number
                                    </FieldLabel>
                                    <div className="flex gap-2">
                                        <Input
                                            type="tel"
                                            value={phone}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                            placeholder="+12812166971"
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={() => setPhoneSent(true)}
                                            className="shrink-0"
                                        >
                                            {phoneSent ? 'Resend' : 'Send Code'}
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            type="number"
                                            value={phoneCode}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneCode(e.target.value)}
                                            placeholder="123456"
                                            className="w-full"
                                        />
                                    </div>
                                </Field>
                                {/* Email verification */}
                                <Field>
                                    <FieldLabel className="font-libre-franklin mb-2 block text-sm font-medium text-foreground">
                                        Email Address
                                    </FieldLabel>
                                    <div className="flex gap-2">
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            placeholder="Shakib.1.Maktech@Gmail.Com"
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={() => setEmailSent(true)}
                                            className="shrink-0"
                                        >
                                            {emailSent ? 'Resend' : 'Send Code'}
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            type="number"
                                            value={emailCode}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailCode(e.target.value)}
                                            placeholder="123456"
                                            className="w-full"
                                        />
                                    </div>
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        {/* Navigation */}
                        <div className="mt-8 flex gap-3 flex-wrap">
                            <Link href={prevStep} className='flex-1'>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full cursor-pointer"
                                    disabled={!canContinue}
                                >
                                    Back
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={canContinue ? checkout({ bookingUid: '1234567890' }).url : '#'} className={cn('flex-1', !canContinue && 'cursor-not-allowed')} disabled={!canContinue}>
                                <Button type="button" variant="default" disabled={!canContinue} className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    Continue To Checkout Details
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </form>


                </div>

                {/* Verification Required info box */}
                <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/50 text-primary">
                        <Shield className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="font-oswald font-semibold text-foreground">
                            Verification Required
                        </p>
                        <p className="font-libre-franklin mt-1 text-sm text-muted-foreground">
                            For security purposes, we require dual verification via SMS and email.
                            This ensures your booking is protected and confirms you are a US
                            resident.
                        </p>
                    </div>
                </div>
            </div>
        </FrontendLayout >
    );
}
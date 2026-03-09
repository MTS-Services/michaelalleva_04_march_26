import { PageHeader } from '@/components/dashboard/page-header';
import UserLayout from '@/layouts/user-layout';
import { Check, Clock, Download, Headphones, Info } from 'lucide-react';

interface GuestInfo {
    totalGuests: number;
    guestAge: string;
    email: string;
    phone: string;
}

interface PackageIncludes {
    items: string[];
}

interface PaymentDetails {
    totalGuests: number;
    guestAge: string;
    email: string;
    phone: string;
}

interface BookingStatusStep {
    label: string;
    description: string;
    done: boolean;
}

interface TripDetailsPageProps {
    userName?: string;
    guestInfo?: GuestInfo;
    packageIncludes?: PackageIncludes;
    paymentDetails?: PaymentDetails;
    bookingStatus?: BookingStatusStep[];
    supportEmail?: string;
    supportPhone?: string;
}

const DEMO_STATUS: BookingStatusStep[] = [
    { label: 'Payment Received', description: 'Thursday, May 1, 2025', done: true },
    { label: 'Confirmation Pending', description: 'As soon as we will confirm it', done: false },
];

const DEMO_GUEST: GuestInfo = { totalGuests: 1, guestAge: '29 years old', email: 'sarah.johnson@email.com', phone: '+1 (555) 123-4567' };
const DEMO_PKG: PackageIncludes = {
    items: [
        'Grand Egypt Expedition', 'Coptic Cairo Tour',
        'Siwa Oasis Adventure', 'Exclusive Experiences',
        'White Desert Camping',
    ],
};
const DEMO_PAY: PaymentDetails = { totalGuests: 1, guestAge: '29 years old', email: 'sarah.johnson@email.com', phone: '+1 (555) 123-4567' };

export default function TripDetails({
    userName = 'Sarah Johnson',
    guestInfo = DEMO_GUEST,
    packageIncludes = DEMO_PKG,
    paymentDetails = DEMO_PAY,
    bookingStatus = DEMO_STATUS,
}: TripDetailsPageProps) {
    return (
        <UserLayout userName={userName}>
            <div className="space-y-6">
                <PageHeader
                    title={`Welcome back, ${userName}!`}
                    subtitle="Manage your bookings and track your travel adventures"
                />

                <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                    {/* Left column */}
                    <div className="space-y-5">
                        {/* Guest Information */}
                        <SectionCard title="Guest information">
                            <InfoRow label="Total Guests" value={String(guestInfo.totalGuests)} />
                            <InfoRow label="Guests" value={guestInfo.guestAge} />
                            <InfoRow label="Email" value={guestInfo.email} />
                            <InfoRow label="Phone" value={guestInfo.phone} />
                        </SectionCard>

                        {/* Package Includes */}
                        <SectionCard title="Package Includes">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {packageIncludes.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                                        <span className="font-libre-franklin text-sm text-foreground">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        {/* Payment Details */}
                        <SectionCard title="Payment Details">
                            <InfoRow label="Total Guests" value={String(paymentDetails.totalGuests)} />
                            <InfoRow label="Guests" value={paymentDetails.guestAge} />
                            <InfoRow label="Email" value={paymentDetails.email} />
                            <InfoRow label="Phone" value={paymentDetails.phone} />
                        </SectionCard>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        {/* Booking Status */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="font-oswald mb-4 font-semibold text-foreground">
                                Booking status
                            </h3>
                            <div className="space-y-4">
                                {bookingStatus.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${step.done ? 'bg-primary' : 'border-2 border-muted bg-background'}`}>
                                            {step.done ? (
                                                <Check className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                                            ) : (
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-libre-franklin text-sm font-semibold text-foreground">
                                                {step.label}
                                            </p>
                                            <p className="font-libre-franklin text-xs text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="font-oswald mb-3 font-semibold text-foreground">
                                Quick actions
                            </h3>
                            <div className="space-y-2">
                                <button className="font-libre-franklin flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                                    <Download className="h-4 w-4" />
                                    Download Invoice
                                </button>
                                <button className="font-libre-franklin flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
                                    <Headphones className="h-4 w-4" />
                                    Contact Support
                                </button>
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/40 dark:bg-yellow-900/10">
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
                                <Info className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="font-libre-franklin mb-1.5 text-sm font-semibold text-foreground">
                                    Important Information
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        'All bookings are non-refundable',
                                        'Waiver must be completed 7 days before departure',
                                        'Valid passport required for international travel',
                                        'Travel insurance recommended',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                            <span className="font-libre-franklin text-xs text-muted-foreground">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-oswald mb-4 font-semibold text-foreground">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-libre-franklin text-sm text-muted-foreground">{label}</span>
            <span className="font-libre-franklin text-sm text-foreground">{value}</span>
        </div>
    );
}
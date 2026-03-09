import { StatusBadge } from '@/components/dashboard/status-badge';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';

export interface BookingDetail {
    id: string;
    status: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    bookingDate: string;
    destination: string;
    travelDate: string;
    packageName: string;
    numberOfGuests: number;
    guestAges: { label: string; age: string }[];
}

interface BookingDetailModalProps {
    booking: BookingDetail;
    onClose: () => void;
}

export function BookingDetailModal({ booking, onClose }: BookingDetailModalProps) {
    const [message, setMessage] = useState('');

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-5">
                    <h2 className="font-oswald text-xl font-semibold text-foreground">
                        Booking Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
                    >
                        <X className="h-4 w-4 text-foreground" />
                    </button>
                </div>

                <div className="divide-y divide-border px-6">
                    {/* Booking ID + Status */}
                    <div className="grid grid-cols-2 gap-4 py-5">
                        <div>
                            <p className="font-libre-franklin text-xs text-muted-foreground">
                                Booking ID
                            </p>
                            <p className="font-libre-franklin mt-1 font-semibold text-foreground">
                                {booking.id}
                            </p>
                        </div>
                        <div>
                            <p className="font-libre-franklin text-xs text-muted-foreground">
                                Status
                            </p>
                            <div className="mt-1">
                                <StatusBadge status={booking.status} />
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="py-5">
                        <h3 className="font-oswald mb-3 font-semibold text-foreground">
                            Customer Information
                        </h3>
                        <div className="space-y-2.5">
                            <DetailRow label="Name" value={booking.customerName} />
                            <DetailRow label="Email" value={booking.customerEmail} />
                            <DetailRow label="Phone" value={booking.customerPhone} />
                            <DetailRow label="Booking date" value={booking.bookingDate} />
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className="py-5">
                        <h3 className="font-oswald mb-3 font-semibold text-foreground">
                            Trip Details
                        </h3>
                        <div className="space-y-2.5">
                            <DetailRow label="Destination" value={booking.destination} />
                            <DetailRow label="Travel date" value={booking.travelDate} />
                            <DetailRow label="Package" value={booking.packageName} />
                            <DetailRow
                                label="Number of guests"
                                value={String(booking.numberOfGuests)}
                            />
                        </div>
                    </div>

                    {/* Guest ages */}
                    {booking.guestAges.length > 0 && (
                        <div className="py-5">
                            <h3 className="font-oswald mb-3 font-semibold text-foreground">
                                Guest ages
                            </h3>
                            <div className="space-y-2.5">
                                {booking.guestAges.map((g) => (
                                    <DetailRow key={g.label} label={g.label} value={g.age} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message */}
                    <div className="py-5">
                        <h3 className="font-oswald mb-3 font-semibold text-foreground">
                            Message
                        </h3>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message template"
                            rows={4}
                            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 px-6 pb-6">
                    <button className="font-libre-franklin rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                        Send Confirmation Email
                    </button>
                    <button className="font-libre-franklin rounded-xl border border-primary px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/5">
                        Mark As Complete
                    </button>
                    <button className="font-libre-franklin rounded-xl border border-destructive px-5 py-2.5 text-sm font-medium text-destructive transition hover:bg-destructive/5">
                        Process Refund
                    </button>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-libre-franklin text-sm text-muted-foreground">{label}</span>
            <span className="font-libre-franklin text-sm text-foreground">{value}</span>
        </div>
    );
}
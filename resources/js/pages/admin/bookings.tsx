import { DataTable2nd } from '@/components/ui/data-table-2nd';
import {
    BookingDetailModal,
    type BookingDetail,
} from '@/components/dashboard/booking-detail-modal';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import AdminLayout from '@/layouts/admin-layout';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// ── Demo data ─────────────────────────────────────────────────────────────────

const DEMO_BOOKINGS: BookingDetail[] = [
    { id: 'BK-2024-003', status: 'Confirmed', customerName: 'Marvin McKinney', customerEmail: 'marvin@email.com', customerPhone: '+1 (555) 000-0001', bookingDate: '04-03-2026', destination: 'Egypt', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '21 years' }] },
    { id: 'BK-2024-003', status: 'Paid', customerName: 'Robert Fox', customerEmail: 'robert@email.com', customerPhone: '+1 (555) 000-0002', bookingDate: '04-03-2026', destination: 'Norway', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '35 years' }] },
    { id: 'BK-2024-003', status: 'Completed', customerName: 'Darlene Robertson', customerEmail: 'darlene@email.com', customerPhone: '+1 (555) 000-0003', bookingDate: '04-03-2026', destination: 'Costa Rica', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '28 years' }] },
    { id: 'BK-2024-003', status: 'Paid', customerName: 'Jane Cooper', customerEmail: 'jane@email.com', customerPhone: '+1 (555) 000-0004', bookingDate: '04-03-2026', destination: 'Egypt', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '30 years' }] },
    { id: 'BK-2024-003', status: 'Confirmed', customerName: 'Brooklyn Simmons', customerEmail: 'brooklyn@email.com', customerPhone: '+1 (555) 000-0005', bookingDate: '04-03-2026', destination: 'Egypt', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '25 years' }] },
    { id: 'BK-2024-003', status: 'Paid', customerName: 'Albert Flores', customerEmail: 'albert@email.com', customerPhone: '+1 (555) 000-0006', bookingDate: '04-03-2026', destination: 'Egypt', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '22 years' }] },
    { id: 'BK-2024-003', status: 'Confirmed', customerName: 'Savannah Nguyen', customerEmail: 'savannah@email.com', customerPhone: '+1 (555) 000-0007', bookingDate: '04-03-2026', destination: 'Norway', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '33 years' }] },
    { id: 'BK-2024-003', status: 'Paid', customerName: 'Devon Lane', customerEmail: 'devon@email.com', customerPhone: '+1 (555) 000-0008', bookingDate: '04-03-2026', destination: 'Norway', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '27 years' }] },
    { id: 'BK-2024-003', status: 'Confirmed', customerName: 'Dianne Russell', customerEmail: 'dianne@email.com', customerPhone: '+1 (555) 000-0009', bookingDate: '04-03-2026', destination: 'Norway', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '41 years' }] },
    { id: 'BK-2024-003', status: 'Paid', customerName: 'Theresa Webb', customerEmail: 'theresa@email.com', customerPhone: '+1 (555) 000-0010', bookingDate: '04-03-2026', destination: 'Costa Rica', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '31 years' }] },
    { id: 'BK-2024-003', status: 'Completed', customerName: 'Ralph Edwards', customerEmail: 'ralph@email.com', customerPhone: '+1 (555) 000-0011', bookingDate: '04-03-2026', destination: 'Costa Rica', travelDate: '04-03-2026', packageName: '5 Night', numberOfGuests: 1, guestAges: [{ label: 'Guest-1', age: '38 years' }] },
];

// ── Column definitions ────────────────────────────────────────────────────────

function buildColumns(
    onViewDetails: (row: BookingDetail) => void,
): ColumnDef<BookingDetail>[] {
    return [
        {
            accessorKey: 'id',
            header: 'Booking ID',
            size: 130,
            cell: ({ row }) => (
                <span className="font-libre-franklin whitespace-nowrap text-sm text-muted-foreground">
                    {row.getValue('id')}
                </span>
            ),
        },
        {
            accessorKey: 'customerName',
            header: 'Customer',
            size: 170,
            cell: ({ row }) => (
                <span className="font-libre-franklin whitespace-nowrap text-sm font-medium text-foreground">
                    {row.getValue('customerName')}
                </span>
            ),
        },
        {
            accessorKey: 'destination',
            header: 'Destination',
            size: 120,
            cell: ({ row }) => (
                <span className="font-libre-franklin whitespace-nowrap text-sm text-foreground">
                    {row.getValue('destination')}
                </span>
            ),
        },
        {
            accessorKey: 'travelDate',
            header: 'Travel Date',
            size: 120,
            cell: ({ row }) => (
                <span className="font-libre-franklin whitespace-nowrap text-sm text-muted-foreground">
                    {row.getValue('travelDate')}
                </span>
            ),
        },
        {
            accessorKey: 'packageName',
            header: 'Package',
            size: 100,
            cell: ({ row }) => (
                <span className="font-libre-franklin whitespace-nowrap text-sm text-foreground">
                    {row.getValue('packageName')}
                </span>
            ),
        },
        {
            accessorKey: 'numberOfGuests',
            header: 'Guests',
            size: 70,
            cell: ({ row }) => (
                <span className="font-libre-franklin text-sm text-foreground">
                    {row.getValue('numberOfGuests')}
                </span>
            ),
        },
        {
            id: 'amount',
            header: 'Amount',
            size: 90,
            cell: () => (
                <span className="font-libre-franklin whitespace-nowrap text-sm text-foreground">
                    $7,000
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 120,
            cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 130,
            cell: ({ row }) => (
                <Button
                    size="sm"
                    onClick={() => onViewDetails(row.original)}
                >
                    View Details
                </Button>
            ),
        },
    ];
}

// ── Page ─────────────────────────────────────────────────────────────────────

interface AdminBookingsProps {
    bookings?: BookingDetail[];
}

export default function AdminBookings({ bookings = DEMO_BOOKINGS }: AdminBookingsProps) {
    const [selected, setSelected] = useState<BookingDetail | null>(null);
    const columns = buildColumns(setSelected);

    return (
        <AdminLayout activeSlug="admin-bookings">
            <div className="space-y-6">
                <PageHeader
                    title="Booking management"
                    subtitle="Manage all customer bookings and reservations"
                />

                <DataTable2nd
                    columns={columns}
                    data={bookings}
                    searchPlaceholder="Search by customer name…"
                    searchColumn="customerName"
                    pageSize={11}
                />
            </div>

            {selected && (
                <BookingDetailModal booking={selected} onClose={() => setSelected(null)} />
            )}
        </AdminLayout>
    );
}
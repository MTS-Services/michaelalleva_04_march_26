import { PageHeader } from '@/components/dashboard/page-header';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';
import { PenLine } from 'lucide-react';

interface ContentItem {
    key: string;
    title: string;
    body: string;
    editHref: string;
}

interface ContentIndexPageProps {
    items?: ContentItem[];
}

const DEMO_ITEMS: ContentItem[] = [
    {
        key: 'tos',
        title: 'Terms of service',
        body: 'Lorem ipsum dolor sit amet consectetur. Sit enim semper arcu tristique vitae tincidunt sodales metus. Ultrices at vitae ac nisi lectus id blandit. Quisque morbi nulla venenatis vitae auctor. Cursus pulvinar malesuada a luctus viverra vel nibh purus leo. Feugiat pellentesque vulputate lectus hendrerit rutrum a donec varius tortor. In adipiscing enim sed blandit enim praesent mi eget aliquet. Penatibus vel proin condimentum bibendum lorem velit. Ut gravida dignissim erat lacus sollicitudin. Egestas eu a volutpat at tincidunt. Elementum cursus donec ut iaculis feugiat tincidunt id massa porta. Non duis a dignissim praesent.',
        editHref: '/admin/content/tos/edit',
    },
    {
        key: 'privacy',
        title: 'Privacy policy',
        body: 'Refund\n80% of the fees will be refunded if the booking is canceled more than Twenty-One (21) days before the beginning of the experience/tour.\n50% of the fees will be refunded if the booking is canceled within Fourteen (14) to Twenty-One (21) days before the beginning of the experience/tour.\n30% of the tour fee will be refunded if the booking is canceled within Seven (7) to Fourteen (14) days before the beginning of the experience/tour.\nRefund will not be provided if the tour is cancelled less than Seven (7) days before the beginning of the experience/tour.\nConvenience fees and insurance fees are non-refundable and will be deducted from the paid amount.\nAll refunds will be processed within five (5) working days.',
        editHref: '/admin/content/privacy/edit',
    },
];

export default function ContentIndex({ items = DEMO_ITEMS }: ContentIndexPageProps) {
    return (
        <AdminLayout activeSlug="admin-content">
            <div className="space-y-6">
                <PageHeader
                    title="Page & Content Management"
                    subtitle="Manage Pages and Contents."
                />

                <div className="grid gap-5 md:grid-cols-2">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="font-oswald font-semibold text-foreground">
                                    {item.title}
                                </h2>
                                <Link
                                    href={item.editHref}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:border-primary hover:text-primary"
                                >
                                    <PenLine className="h-4 w-4" />
                                </Link>
                            </div>
                            <p className="font-libre-franklin mb-3 text-xs font-medium text-muted-foreground">
                                Details
                            </p>
                            <div className="flex-1 rounded-xl bg-background p-4">
                                <p className="font-libre-franklin whitespace-pre-line text-sm text-muted-foreground">
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
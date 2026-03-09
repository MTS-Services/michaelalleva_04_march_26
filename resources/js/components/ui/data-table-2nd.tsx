import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTable2ndProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /** Shows a search input above the table when provided */
    searchPlaceholder?: string;
    /** The accessorKey of the column to apply the filter on */
    searchColumn?: string;
    /** Number of rows per page (default 10) */
    pageSize?: number;
}

export function DataTable2nd<TData, TValue>({
    columns,
    data,
    searchPlaceholder,
    searchColumn,
    pageSize = 10,
}: DataTable2ndProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters, columnVisibility },
        initialState: { pagination: { pageSize } },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    const totalRows = table.getFilteredRowModel().rows.length;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
        .reduce<(number | '…')[]>((acc, p, idx, arr) => {
            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('…');
            acc.push(p);
            return acc;
        }, []);

    return (
        <div className="w-full space-y-3">
            {/* Optional search bar */}
            {searchPlaceholder && searchColumn && (
                <div className="relative max-w-xs">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={
                            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
                        }
                        onChange={(e) =>
                            table.getColumn(searchColumn)?.setFilterValue(e.target.value)
                        }
                        className="w-full rounded-xl border border-muted bg-card py-2 pl-9 pr-4 font-libre-franklin text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            )}

            {/*
             * Table wrapper:
             *   • NO border on this div — Figma design has zero outer table border
             *   • overflow-hidden keeps the rounded corners clipping the table edges
             *   • The inner-grid borders come entirely from TableHead / TableCell
             */}
            <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="hover:bg-transparent"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className={cn(
                                                header.column.getCanSort() &&
                                                'cursor-pointer select-none',
                                            )}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    {header.column.getIsSorted() === 'asc'
                                                        ? ' ↑'
                                                        : header.column.getIsSorted() === 'desc'
                                                            ? ' ↓'
                                                            : null}
                                                </span>
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="py-14 text-center font-libre-franklin text-sm text-muted-foreground"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                    <p className="font-libre-franklin text-xs text-muted-foreground">
                        Showing page{' '}
                        <span className="font-medium text-foreground">{currentPage}</span> of{' '}
                        <span className="font-medium text-foreground">{totalPages}</span>
                        {' · '}
                        <span className="font-medium text-foreground">{totalRows}</span> total rows
                    </p>

                    <div className="flex items-center gap-1.5">
                        <PaginationBtn onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} title="First page">
                            <ChevronsLeft className="h-3.5 w-3.5" />
                        </PaginationBtn>
                        <PaginationBtn onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} title="Previous page">
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </PaginationBtn>

                        {pageNumbers.map((p, i) =>
                            p === '…' ? (
                                <span key={`ellipsis-${i}`} className="flex h-8 w-6 items-center justify-center font-libre-franklin text-xs text-muted-foreground">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => table.setPageIndex((p as number) - 1)}
                                    className={cn(
                                        'flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 font-libre-franklin text-xs transition',
                                        currentPage === p
                                            ? 'border-primary bg-primary font-semibold text-primary-foreground'
                                            : 'border-muted bg-card hover:border-primary hover:text-primary',
                                    )}
                                >
                                    {p}
                                </button>
                            ),
                        )}

                        <PaginationBtn onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} title="Next page">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </PaginationBtn>
                        <PaginationBtn onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} title="Last page">
                            <ChevronsRight className="h-3.5 w-3.5" />
                        </PaginationBtn>
                    </div>
                </div>
            )}
        </div>
    );
}

function PaginationBtn({
    children, onClick, disabled, title,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    title?: string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-muted bg-card text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
        >
            {children}
        </button>
    );
}
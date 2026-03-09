import * as React from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
 * shadcn/ui Table primitives — INNER BORDERS ONLY (matches Figma design)
 *
 * Border strategy:
 *   • Every cell gets border-r + border-b  →  column and row dividers
 *   • last child in each row  →  border-r-0  (no right outer edge)
 *   • last <tr> in <tbody>    →  border-b-0  (no bottom outer edge)
 *   • No border on <thead tr> top  (no top outer edge)
 *   • No border on outer wrapper div  (no table outline)
 *
 * Result: a pure inner-grid look with zero outer border on any side.
 * ───────────────────────────────────────────────────────────────────────── */

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        // border-separate + border-spacing-0 lets each cell control its own
        // borders independently — cleaner than border-collapse for inner-only grids.
        className={cn('w-full caption-bottom border-separate border-spacing-0 text-sm', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    // Strip the bottom border from every cell in the LAST row
    className={cn('[&>tr:last-child>td]:border-b-0 [&>tr:last-child>th]:border-b-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-muted/50 font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors hover:bg-muted/20 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

/**
 * TableHead — header cell
 *   border-r : vertical divider between columns
 *   border-b : line below header row (separates header from data)
 *   last:border-r-0 : no right border on the final column (no outer right edge)
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      // Inner borders only — right + bottom dividers, none on outer edges
      'border-r border-b border-muted last:border-r-0',
      'bg-muted/40 px-4 py-3.5',
      'font-oswald text-sm font-semibold text-foreground',
      'text-left align-middle whitespace-nowrap',
      '[&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/**
 * TableCell — data cell
 *   border-r : vertical column divider
 *   border-b : horizontal row divider
 *   last:border-r-0 : no right border on the final column
 *   (last-row bottom border removed via TableBody selector above)
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'border-r border-b border-muted last:border-r-0',
      'px-4 py-3.5',
      'font-libre-franklin text-sm text-foreground',
      'align-middle',
      '[&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
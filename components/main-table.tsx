'use client';

import { DataTableViewOptions } from '@/components/data-table/column-components/column-toggle';
import { DataTablePagination } from '@/components/data-table/pagination';
import { MoveTableIndicator } from '@/components/data-table/table-filter/line';
import { DataTableFilter } from '@/components/data-table/table-filter/table-filter';
import { Button } from '@nextui-org/react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings2 } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnResizeMode,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, FileX, Filter, Trash2 } from 'lucide-react';

import * as React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>('onChange');
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [currentAccordion, setCurrentAccordion] = React.useState<string>('');

  const generateCustomButton = (type: string, label: string, icon: any) => (
    <Button
      variant='bordered'
      onClick={() => setCurrentAccordion(currentAccordion == type ? '' : type)}
      className={`flex cursor-pointer items-center space-x-2 transition-all hover:-translate-y-[1px]`}
    >
      {icon}
      {label}
      <ChevronDown
        className={`duration-200" h-4 w-4 shrink-0 transition-transform ${currentAccordion == type ? 'rotate-180' : ''}`}
      />
    </Button>
  );
  const generateViewOptions = (
    type: string,
    elementInside: React.ReactNode
  ) => (
    <AnimatePresence initial={false}>
      {currentAccordion == type && (
        <motion.section
          key='content'
          initial='collapsed'
          animate='open'
          exit='collapsed'
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{
            duration: 0.3,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
        >
          <div className='w-full px-4 py-4'>{elementInside}</div>
        </motion.section>
      )}
    </AnimatePresence>
  );
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='relative mx-2 mb-2 mt-4 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className='max-w-sm text-center md:text-left'
        />
        <div className='flex w-full items-center justify-center gap-2'>
          <AnimatePresence initial={false}>
            {(table.getIsSomePageRowsSelected() ||
              table.getIsAllPageRowsSelected()) && (
              <motion.section
                key='content'
                initial='collapsed'
                animate='open'
                exit='collapsed'
                variants={{
                  open: { opacity: 1, width: 'auto' },
                  collapsed: { opacity: 0, width: 0 },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <Button
                  className={`flex cursor-pointer items-center space-x-2 transition-all hover:-translate-y-[1px]`}
                  variant='bordered'
                >
                  {table.getIsAllPageRowsSelected() ? (
                    <FileX className='mr-2 h-4 w-4' />
                  ) : (
                    <Trash2 className='mr-2 h-4 w-4' />
                  )}
                  {table.getIsAllPageRowsSelected()
                    ? 'Delete All'
                    : 'Delete Selected'}
                </Button>
              </motion.section>
            )}
          </AnimatePresence>
          {generateCustomButton(
            'column',
            'Columns',
            <Settings2 className='mr-2 h-4 w-4' />
          )}
          {generateCustomButton(
            'filter',
            'Filter',
            <Filter className='mr-2 h-4 w-4' />
          )}
        </div>
      </div>
      {generateViewOptions('column', <DataTableViewOptions table={table} />)}
      {generateViewOptions('filter', <DataTableFilter table={table} />)}
      {/* <div className=''>
        <Table
          style={{
            width: table.getCenterTotalSize(),
          }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='relative'
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                          style: {
                            transform:
                              columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection ===
                                    'rtl'
                                      ? -1
                                      : 1) *
                                    (table.getState().columnSizingInfo
                                      .deltaOffset ?? 0)
                                  }px)`
                                : '',
                          },
                        }}
                        className={`focus:bordered-none absolute right-0 top-0 flex h-full cursor-col-resize touch-none select-none items-center justify-center`}
                      >
                        <MoveTableIndicator />
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.{' '}
        </div>
        <div className='ml-4 space-x-2'>
          <DataTablePagination table={table} />
        </div>
      </div> */}
    </div>
  );
}

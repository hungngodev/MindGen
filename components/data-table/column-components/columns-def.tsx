'use client';

import { DataTableColumnHeader } from '@/components/data-table/column-components/column-header';
import { Button } from '@nextui-org/react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { CheckboxIndicator, CustomCheckbox } from '../check-box';
// This type is used to define the shape of our data.

export type TableDataFormat = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<TableDataFormat>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <CustomCheckbox
        id={'select-all'}
        isChecked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        setIsChecked={(value) => table.toggleAllPageRowsSelected(!!value)}
      >
        <CheckboxIndicator />
      </CustomCheckbox>
    ),
    cell: ({ row }) => (
      <CustomCheckbox
        id={row.id}
        isChecked={row.getIsSelected()}
        setIsChecked={(value) => row.toggleSelected(!!value)}
      >
        <CheckboxIndicator />
      </CustomCheckbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title='Actions' showDivider>
              <DropdownItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownItem>
              <DropdownItem>View customer</DropdownItem>
              <DropdownItem>View payment details</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

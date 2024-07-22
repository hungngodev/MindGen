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

export type TableDataFormat = {
  status: string;
  email: string;
  inputToken: string;
  outputToken: string;
  amount: string;
  model: string;
  createdAt: string;
  timeTaken: string;
  id: string;
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
    accessorKey: 'inputToken',
    header: () => <div>Input Token</div>,
    cell: ({ row }) => {
      const amount = row.getValue('inputToken') as string;

      return <div className='font-medium'>{amount || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'outputToken',
    header: () => <div>Output Token</div>,
    cell: ({ row }) => {
      const amount = row.getValue('outputToken') as string;

      return <div className='font-medium'>{amount || 'N/A'} </div>;
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue('amount') as string;

      // Format the amount as a dollar amount
      const formatted = amount
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(parseFloat(amount))
        : 'N/A';

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'model',
    header: () => <div>Model</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('model'));
      return <div className='font-medium'>{amount ? amount : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div>Created At</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return <div className='font-medium'>{createdAt}</div>;
    },
  },
  {
    accessorKey: 'timeTaken',
    header: () => <div>Time Taken</div>,
    cell: ({ row }) => {
      const timeTaken = row.getValue('timeTaken') as string;
      return (
        <div className='font-medium'>{timeTaken ? `${timeTaken}s` : 'N/A'}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div>Actions</div>,
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

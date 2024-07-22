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
  inputToken: number;
  outputToken: number;
  cost: number;
  model: string;
  createdAt: Date;
  timeTaken: number;
  id: string;
};

export const typeMapping = {
  status: 'text',
  email: 'text',
  inputToken: 'number',
  outputToken: 'number',
  cost: 'number',
  model: 'text',
  createdAt: 'date',
  timeTaken: 'number',
  id: 'text',
} as const;

export const operatorsMapping = {
  text: ['is', 'is not', 'contains', 'does not contain'],
  number: ['equal', 'not equal', 'greater than', 'less than'],
  date: ['is', 'is not', 'after', 'before'],
} as const;

export const notAllowManyInputs = [
  'greater than',
  'less than',
  'after',
  'before',
];

export const columns: ColumnDef<TableDataFormat>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='w-[3vw]'>
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
      </div>
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
    header: () => <div className='w-[6vw]'>Status</div>,
    cell: ({ row }) => (
      <div className='w-[6vw] capitalize'>{row.getValue('status')}</div>
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
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10vw]'
        column={column}
        title='Input Token'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('inputToken') as string;

      return <div className='w-full font-medium'>{amount || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'outputToken',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[11vw]'
        column={column}
        title='Output Token'
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('outputToken') as string;

      return <div className='font-medium'>{amount || 'N/A'} </div>;
    },
  },
  {
    accessorKey: 'cost',
    header: ({ column }) => (
      <DataTableColumnHeader className='w-[8vw]' column={column} title='Cost' />
    ),
    cell: ({ row }) => {
      const cost = row.getValue('cost') as string;

      // Format the cost as a dollar cost
      const formatted = cost
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          })
            .format(parseFloat(cost) * 100)
            .replace('$', '') + '¢'
        : 'N/A';

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'timeTaken',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10vw]'
        column={column}
        title='Time Taken'
      />
    ),
    cell: ({ row }) => {
      const timeTaken = row.getValue('timeTaken') as string;
      return (
        <div className='font-medium'>{timeTaken ? `${timeTaken}s` : 'N/A'}</div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10vw]'
        column={column}
        title='Created At'
      />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return <div className='w-[10vw] font-medium'>{createdAt}</div>;
    },
  },
  {
    accessorKey: 'model',
    header: () => <div className='w-[5vw]'>Model</div>,
    cell: ({ row }) => {
      const model = row.getValue('model') as string;
      return <div className='font-medium'>{model ? model : 'N/A'}</div>;
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
                Copy Log ID
              </DropdownItem>
              <DropdownItem>View user</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];

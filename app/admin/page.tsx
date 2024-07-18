'use client';
import {
  TableDataFormat,
  columns,
} from '@/components/data-table/column-components/columns-def';
import { DataTable } from '@/components/main-table';

function getData(): TableDataFormat[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

export default function Dashboard() {
  const data: TableDataFormat[] = [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com',
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com',
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com',
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com',
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com',
    },
  ];

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex h-full w-4/5 items-center justify-center'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

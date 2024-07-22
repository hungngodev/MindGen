'use client';
import {
  TableDataFormat,
  columns,
} from '@/components/data-table/column-components/columns-def';
import { DataTable } from '@/components/main-table';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

const tableQuery = {
  queryKey: ['table'],
  queryFn: async () => {
    const response = await fetch('/api/admin/statistics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  },
};
export default function Dashboard() {
  const { data: tableData, status: tableStatus } = useQuery(tableQuery);
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex h-full w-full items-center justify-center p-5'>
        {tableStatus === 'pending' ? (
          <Skeleton className='h-[50vh] w-full' />
        ) : (
          <DataTable
            columns={columns}
            data={tableData.tableData}
            endPoints={{
              filter: '/api/admin/statistics',
            }}
          />
        )}
      </div>
    </div>
  );
}

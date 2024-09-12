'use client';
import { columns } from '@/components/data-table/column-components/columns-def';
import { DataTable } from '@/components/main-table';
import { Skeleton } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const tableQuery = (query: string) => ({
  queryKey: ['table', query],
  queryFn: async () => {
    const response = await fetch(
      '/api/admin/statistics?' +
        new URLSearchParams({
          filter: query != '' ? query : JSON.stringify([]),
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();
    return json;
  },
});

export default function Dashboard() {
  const [filter, setFilter] = React.useState<string>('');
  const { data: tableData, status: tableStatus } = useQuery(tableQuery(filter));

  const filterFunction = async (data: any) => {
    const filterJson = JSON.stringify(data);
    setFilter(filterJson);
  };

  const deleteFunction = async (data: any) => {
    const idMap = data.map((item: any) => item.original.id);
    fetch('/api/admin/statistics', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToDelete: idMap }),
    });
  };

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
            submitFunction={filterFunction}
            deleteFunction={deleteFunction}
          />
        )}
      </div>
    </div>
  );
}

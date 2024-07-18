'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Select, SelectItem } from '@nextui-org/react';

const ExcalidrawWrapper = dynamic(
  async () => (await import('@/components/excalidraw')).default,
  {
    ssr: false,
  }
);

const mindMapsQuery = {
  queryKey: ['mindmaps'],
  queryFn: async () => {
    const response = await fetch('/api/mindmap/saved');
    const json = await response.json();
    return json;
  },
};
function page() {
  const { data, status } = useQuery(mindMapsQuery);
  const [selected, setSelected] = useState<string>('');

  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  const listFiles: {
    id: string;
    elements: string;
  }[] = data.history;

  const listNames = data.history.map((e: { id: string }) => e.id);

  console.log(selected);
  return (
    <div className='grid h-full w-full grid-cols-3 gap-4'>
      <div className='col-span-3'>
        <Select
          placeholder='Select your files'
          showScrollIndicators
          size='lg'
          selectedKeys={[selected]}
          onChange={(e) => setSelected(e.target.value)}
        >
          {listNames.map((name: string, index: number) => (
            <SelectItem key={index} value={name}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {/* {listFiles.map((file: { id: string }) => (
        <div
          key={file.id}
          className='rounded-lg bg-white p-4 shadow-md'
          onClick={() => setSelected(file.id)}
        >
          {file.id}
        </div>
      ))} */}
      <div className='col-span-3'>
        <ExcalidrawWrapper
          elements={listFiles.find((e) => e.id === selected)?.elements}
          currentFile={listFiles.find((e) => e.id === selected)?.id}
          topRightUI='save'
        />
      </div>
    </div>
  );
}

export default page;

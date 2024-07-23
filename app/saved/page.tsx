'use client';
import CreateForm from '@/components/create-input';
import { Select, SelectItem, Skeleton } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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
  const [excalidrawMounted, setExcalidrawMounted] = useState<boolean>(false);

  const listFiles: {
    id: string;
    elements: string;
  }[] = status === 'success' ? data.history : [];
  const listNames = listFiles.map((e: { id: string }) => e.id);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 px-[5vw] py-[5vh]'>
      <Skeleton isLoaded={status === 'success'} className='h-full w-full'>
        <CreateForm />

        <Select
          value={[selected]}
          onChange={(e) => setSelected(e.target.value)}
          placeholder={listNames.length ? 'Select a file' : 'No files saved'}
          isDisabled={!listNames.length}
        >
          {listNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </Select>
        <Skeleton isLoaded={excalidrawMounted} className='h-[80vh] w-full'>
          <ExcalidrawWrapper
            elements={listFiles.find((e) => e.id === selected)?.elements}
            currentFile={listFiles.find((e) => e.id === selected)?.id}
            topRightUI='create'
            setMounted={setExcalidrawMounted}
          />
        </Skeleton>
      </Skeleton>
    </div>
  );
}

export default page;

import { Button, Input } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { FolderPen } from 'lucide-react';
import { useState } from 'react';

function createForm() {
  const [newFile, setNewFile] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const queryClient = useQueryClient();
  return (
    <Input
      autoFocus
      endContent={
        <Button
          isIconOnly
          aria-label='save'
          variant='flat'
          onClick={async () => {
            const response = await fetch('/api/mindmap/saved', {
              method: 'POST',
              body: JSON.stringify({
                elements: JSON.stringify([]),
                newFile: true,
                fileName: newFile,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const json = await response.json();
            if (response.status !== 200) {
              setErrorMessage(json.message);
              return;
            }
            queryClient.invalidateQueries({
              queryKey: ['mindmaps'],
            });
          }}
        >
          <FolderPen className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
        </Button>
      }
      placeholder='Create a new file'
      value={newFile}
      isInvalid={errorMessage !== ''}
      onChange={(e) => setNewFile(e.target.value)}
      variant='bordered'
      errorMessage={errorMessage}
    />
  );
}

export default createForm;

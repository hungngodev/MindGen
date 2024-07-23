'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { FolderPen, Save } from 'lucide-react';
import { useState } from 'react';

const mindMapsQuery = {
  queryKey: ['mindmaps'],
  queryFn: async () => {
    const response = await fetch('/api/mindmap/saved');
    const json = await response.json();
    return json;
  },
};

interface SaveFormProps {
  handleSave: (isNew: boolean, name: string) => void;
}

function SaveForm({ handleSave }: SaveFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileName, setFileName] = useState('');
  const [newFile, setNewFile] = useState<string>('');
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const { data, status } = useQuery(mindMapsQuery);
  const listNames =
    status === 'success' ? data.history.map((e: { id: string }) => e.id) : [];
  return (
    <>
      <Button isIconOnly aria-label='save' onClick={onOpen}>
        <Save />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
        size='xl'
        className='h-[40vh]'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Save to your files
              </ModalHeader>
              <ModalBody>
                <div className='flex w-full'>
                  <Input
                    autoFocus
                    endContent={
                      <FolderPen className='pointer-events-none flex-shrink-0 text-2xl text-default-400' />
                    }
                    placeholder='Create a new file'
                    value={newFile}
                    onChange={(e) => setNewFile(e.target.value)}
                    onFocusChange={(focused) => {
                      setDisabledSelect(focused);
                    }}
                    validate={(value: string) => {
                      if (listNames.includes(value))
                        return 'This file already exists';
                    }}
                    variant='bordered'
                    isInvalid={inputValid}
                    errorMessage='This file is required'
                  />
                  <Button
                    color='primary'
                    onPress={() => {
                      if (newFile === '') {
                        setInputValid(true);
                        setTimeout(() => {
                          setInputValid(false);
                        }, 2000);
                        return;
                      }
                      handleSave(true, newFile);
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </div>

                <div className='w-full text-center text-large'>OR</div>
                {listNames.length > 0 ? (
                  <div className='flex w-full'>
                    <Select
                      onClick={() => setDisabledSelect(false)}
                      placeholder='Or select your files'
                      listboxProps={{
                        className: 'h-[15vh] border-5 border-gray-200',
                      }}
                      showScrollIndicators
                      onChange={(e) => setFileName(e.target.value)}
                      selectedKeys={[fileName]}
                      isDisabled={disabledSelect}
                    >
                      {listNames.map((name: string) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button
                      color='primary'
                      onPress={() => {
                        handleSave(false, fileName);
                        onClose();
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <p>You do not have any files</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SaveForm;

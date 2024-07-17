'use client';
import { parsePlanUML } from '@/utils/diagram-parser';
import {
  convertToExcalidrawElements,
  Excalidraw,
} from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';
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
import { FolderPen, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const mindMapsQuery = {
  queryKey: ['mindmaps'],
  queryFn: async () => {
    const response = await fetch('/api/mindmap/saved');
    const json = await response.json();
    return json;
  },
};
interface ExcalidrawWrapperProps {
  mindmapData: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({
  mindmapData,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const { theme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileName, setFileName] = useState('');
  const [newFile, setNewFile] = useState<string>('');
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const { data, status } = useQuery(mindMapsQuery);
  const listNames =
    status === 'success' ? data.history.map((e: { id: string }) => e.id) : [];

  useEffect(() => {
    const savedElements = localStorage.getItem('excalidrawElements');
    if (savedElements) {
      excalidrawAPI?.updateScene({
        elements: JSON.parse(savedElements),
      });
      console.log('loading excalidraw');
    }
    return () => {
      console.log('saving excalidraw');
      const currentElements = excalidrawAPI?.getSceneElements();
      console.log(currentElements);
      localStorage.setItem(
        'excalidrawElements',
        JSON.stringify(currentElements)
      );
    };
  }, []);

  const init = async () => {
    if (mindmapData === '') return;
    try {
      const { elements } = await parseMermaidToExcalidraw(
        parsePlanUML(mindmapData),
        {
          themeVariables: {
            fontSize: '16',
          },
        }
      );
      excalidrawAPI?.updateScene({
        elements: convertToExcalidrawElements(elements),
      });
      console.log('setting excalidraw');
      // Render elements and files on Excalidraw
    } catch (e) {
      console.error(e);
      // Parse error, displaying error message to users
    }
  };
  useEffect(() => {
    init();
  }, [mindmapData, excalidrawAPI]);

  const handleSave = async (newFile: boolean, fileName: string) => {
    const appState = excalidrawAPI?.getAppState();
    const elements = excalidrawAPI?.getSceneElements();
    if (!elements || !appState) return;
    const saveElements = JSON.stringify(elements);
    const response = await fetch('/api/mindmap/saved', {
      method: 'POST',
      body: JSON.stringify({
        elements: saveElements,
        newFile: newFile,
        fileName: fileName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log(json);
  };
  return (
    <div className='my-excalidraw h-[80vh] w-full rounded-large'>
      <Excalidraw
        theme={theme === 'dark' ? 'dark' : 'light'}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => {
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
                              {listNames.map((name: string, index: number) => (
                                <SelectItem key={index} value={name}>
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
                          <p>You don't have any files</p>
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
        }}
      />
    </div>
  );
};
export default ExcalidrawWrapper;

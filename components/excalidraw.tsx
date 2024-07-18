'use client';
import { parsePlanUML } from '@/utils/diagram-parser';
import {
  convertToExcalidrawElements,
  Excalidraw,
} from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';
import { Button } from '@nextui-org/react';
import { Save, Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SaveForm from './save-form';
import { useQueryClient } from '@tanstack/react-query';
import { set } from 'mongoose';
import { t } from '@excalidraw/excalidraw/types/i18n';

interface ExcalidrawWrapperProps {
  mindmapData?: string;
  topRightUI?: string;
  currentFile?: string;
  elements?: string;
  setMounted?: (mounted: boolean) => void;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({
  mindmapData,
  topRightUI,
  currentFile,
  elements,
  setMounted,
}) => {
  useEffect(() => {
    if (setMounted) setMounted(true);
  }, []);

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [prevFile, setPrevFile] = useState<string>(currentFile || '');
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const init = async () => {
    if (mindmapData === '' || !mindmapData) return;
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
      if (topRightUI === 'create') {
        return;
      }
      const elements = localStorage.getItem('elements');
      if (elements) {
        excalidrawAPI?.updateScene({
          elements: JSON.parse(elements),
        });
      }
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
    excalidrawAPI?.setToast(
      response.ok
        ? {
            message: 'Saved successfully',
            closable: true,
            duration: 2000,
          }
        : {
            message: 'Failed to save',
            closable: true,
            duration: 2000,
          }
    );
    queryClient.invalidateQueries({
      queryKey: ['mindmaps'],
    });
  };

  const handleDelete = async (fileName: string) => {
    const response = await fetch('/api/mindmap/saved', {
      method: 'DELETE',
      body: JSON.stringify({
        fileName: fileName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    excalidrawAPI?.setToast(
      response.ok
        ? {
            message: 'Deleted successfully',
            closable: true,
            duration: 2000,
          }
        : {
            message: 'Failed to delete',
            closable: true,
            duration: 2000,
          }
    );
    if (response.ok) {
      excalidrawAPI?.resetScene();
    }
    queryClient.invalidateQueries({
      queryKey: ['mindmaps'],
    });
  };

  useEffect(() => {
    if (elements && excalidrawAPI) {
      console.log('setting elements');
      if (topRightUI === 'create' && currentFile !== prevFile) {
        handleSave(false, prevFile || 'newFile');
      }
      excalidrawAPI.updateScene({
        elements: JSON.parse(elements),
      });
      setPrevFile(currentFile || '');
    }
  }, [elements, excalidrawAPI]);

  function rememberData() {
    console.log('saving data');
    if (topRightUI === 'create') {
      handleSave(false, currentFile || 'newFile');
    } else {
      localStorage.setItem(
        'elements',
        JSON.stringify(excalidrawAPI?.getSceneElements())
      );
    }
  }
  window.addEventListener('beforeunload', rememberData);

  return (
    <div className='my-excalidraw h-[80vh] w-full border-2 border-black dark:border-white'>
      <Excalidraw
        theme={theme === 'dark' ? 'dark' : 'light'}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={{
          elements: JSON.parse(elements || '[]') || [],
        }}
        renderTopRightUI={() => {
          return topRightUI !== 'create' ? (
            <SaveForm handleSave={handleSave} />
          ) : (
            <>
              <Button
                isIconOnly
                aria-label='save'
                onClick={() => {
                  handleSave(false, currentFile || 'newFile');
                }}
              >
                <Save />
              </Button>
              <Button
                isIconOnly
                aria-label='save'
                onClick={() => {
                  handleDelete(currentFile || 'newFile');
                }}
              >
                <Trash />
              </Button>
            </>
          );
        }}
      />
    </div>
  );
};
export default ExcalidrawWrapper;

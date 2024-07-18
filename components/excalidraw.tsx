'use client';
import { parsePlanUML } from '@/utils/diagram-parser';
import {
  convertToExcalidrawElements,
  Excalidraw,
} from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SaveForm from './save-form';
import { Button } from '@nextui-org/react';
import { Save } from 'lucide-react';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

interface ExcalidrawWrapperProps {
  mindmapData?: string;
  topRightUI?: string;
  currentFile?: string;
  elements?: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({
  mindmapData,
  topRightUI,
  currentFile,
  elements,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const { theme } = useTheme();

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
  };
  console.log('currentFile', currentFile);
  return (
    <div className='my-excalidraw h-[80vh] w-full rounded-large'>
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
            <Button
              isIconOnly
              aria-label='save'
              onClick={() => {
                handleSave(false, currentFile || 'newFile');
              }}
            >
              <Save />
            </Button>
          );
        }}
      />
    </div>
  );
};
export default ExcalidrawWrapper;

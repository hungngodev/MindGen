'use client';
import {
  convertToExcalidrawElements,
  Excalidraw,
} from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';
import { useEffect, useState } from 'react';
import { parsePlanUML } from '@/utils/diagram-parser';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { Save } from 'lucide-react';

interface ExcalidrawWrapperProps {
  mindmapData: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({
  mindmapData,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const { theme } = useTheme();
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
  }, []);
  useEffect(() => {
    init();
  }, [mindmapData, excalidrawAPI]);

  return (
    <div className='my-excalidraw h-[80vh] w-full rounded-large'>
      <Excalidraw
        theme={theme === 'dark' ? 'dark' : 'light'}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => {
          return (
            <Button
              isIconOnly
              aria-label='save'
              onClick={async () => {
                const appState = excalidrawAPI?.getAppState();
                const elements = excalidrawAPI?.getSceneElements();
                if (!elements || !appState) return;
                const saveElements = JSON.stringify(elements);
                const response = await fetch('/mindmap/saved', {
                  method: 'POST',
                  body: JSON.stringify({ elements: saveElements }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                console.log(response);
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

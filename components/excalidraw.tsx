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
      />
    </div>
  );
};
export default ExcalidrawWrapper;

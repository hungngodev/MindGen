'use client';
import { Excalidraw } from '@excalidraw/excalidraw';

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div className='h-[80vh] w-[80vw]'>
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;

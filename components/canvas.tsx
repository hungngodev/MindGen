import { Image, Layer, Stage } from 'react-konva';

function Canvas({ image }: { image: HTMLImageElement | null }) {
  return (
    <Stage width={window.innerWidth} height={10000}>
      <Layer>{image && <Image image={image} />}</Layer>
    </Stage>
  );
}

export default Canvas;

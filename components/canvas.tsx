import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Arrow } from 'react-konva';
import { parsePlanUml } from '@/utils/uml';

interface MindMapNode {
  name: string;
  children: MindMapNode[];
  x?: number;
  y?: number;
}

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const [nodes, setNodes] = useState<MindMapNode[]>([data]);
  useEffect(() => {
    setNodes([data]);
    console.log(data);
  }, [data]);

  const handleDragMove = (e: any, node: MindMapNode) => {
    node.x = e.target.x();
    node.y = e.target.y();
    setNodes([...nodes]);
  };

  const renderNodes = (
    node: MindMapNode,
    x: number,
    y: number
  ): JSX.Element[] => {
    node.x = x;
    node.y = y;
    const elements = [
      <React.Fragment key={node.name}>
        <Rect
          x={x}
          y={y}
          width={150}
          height={50}
          fill='lightblue'
          draggable
          onDragMove={(e) => handleDragMove(e, node)}
        />
        <Text
          x={x}
          y={y}
          width={150}
          height={50}
          align='center'
          verticalAlign='middle'
          text={node.name}
        />
      </React.Fragment>,
    ];

    node.children.forEach((child, index) => {
      const childX = x + 200;
      const childY = y + index * 100;
      elements.push(...renderNodes(child, childX, childY));
      elements.push(
        <Arrow
          key={`${node.name}-${child.name}`}
          points={[x + 150, y + 25, childX, childY + 25]}
          stroke='black'
          fill='black'
        />
      );
    });

    return elements;
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{nodes.map((node) => renderNodes(node, 50, 50))}</Layer>
    </Stage>
  );
};

export default MindMap;

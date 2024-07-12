interface MindMapNode {
  name: string;
  children: MindMapNode[];
}

export const parsePlanUML = (text: string): MindMapNode => {
  const lines = text
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('@'));
  const root: MindMapNode = { name: 'root', children: [] };
  const stack: { node: MindMapNode; level: number }[] = [
    { node: root, level: 0 },
  ];

  lines.forEach((line) => {
    const level = (line.match(/^\*+/) || [''])[0].length;
    const name = line.replace(/^\*+ /, '').trim();
    const node: MindMapNode = { name, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, level });
  });

  return root.children[0];
};

interface MindMapNode {
  name: string;
  id: string;
  children: MindMapNode[];
}

export const parsePlanUML = (text: string): string => {
  const lines = text
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('@'));
  const root: MindMapNode = { name: 'root', children: [], id: 'root' };
  const stack: { node: MindMapNode; level: number }[] = [
    { node: root, level: 0 },
  ];
  let id = 0;
  lines.forEach((line) => {
    const level = (line.match(/^\*+/) || [''])[0].length;
    const name = line.replace(/^\*+ /, '').trim();
    const node: MindMapNode = { name, children: [], id: 'node' + id++ };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, level });
  });
  const firstRoot = root.children[0];
  const mermaidCode = nodeToMermaid(firstRoot);

  return `flowchart LR\n${mermaidCode}`;
};

function nodeToMermaid(node: MindMapNode, parent?: MindMapNode): string {
  let mermaid = '';
  const nameWrapper = (name: string) => {
    return `"` + '`' + name + '`' + `"`;
  };
  if (parent) {
    mermaid += `    ${parent.id}[${nameWrapper(
      parent.name
    )}] ===> ${node.id}[${nameWrapper(node.name)}]\n`;
  }
  if (node.children) {
    node.children.forEach((child) => {
      mermaid += nodeToMermaid(child, node);
    });
  }
  return mermaid;
}

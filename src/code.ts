import { AbsoluteElement } from "./models";
let absoluteElements: AbsoluteElement[] = [];

function isAbsolutePositioned(node: SceneNode, parent: BaseNode | null): boolean {
  if (!parent) return false;
  if ('layoutMode' in parent && parent.layoutMode !== 'NONE') {
    return 'layoutPositioning' in node && node.layoutPositioning === 'ABSOLUTE';
  }
  if ('layoutMode' in parent && parent.layoutMode === 'NONE') {
    return true;
  }
  
  return true;
}

function traverseNodes(node: SceneNode, parent: BaseNode | null, parentName: string): void {
  if (!node.visible) return;
  if (node.type === 'INSTANCE') return;

  if (isAbsolutePositioned(node, parent)) {
    absoluteElements.push({
      id: node.id,
      name: node.name,
      type: node.type,
      x: (node as any).absoluteBoundingBox?.x ?? 0,
      y: (node as any).absoluteBoundingBox?.y ?? 0,
      parentName: parentName || 'Unknown',
    });
  }

  if ('children' in node && (node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'COMPONENT')) {
    for (const child of node.children) {
      traverseNodes(child, node, node.name);
    }
  }
}

function main() {
  if (figma.currentPage.selection.length !== 1) {
    figma.ui.postMessage({
      type: 'error',
      message: 'Please select exactly one node (frame, component, or group).',
    });
    return;
  }

  const selectedNode = figma.currentPage.selection[0];
  absoluteElements = [];

  traverseNodes(selectedNode, null, selectedNode.name);

  figma.ui.postMessage({
    type: 'result',
    count: absoluteElements.length,
    elements: absoluteElements,
  });
}

// Show UI
figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = async (msg: { type: string; id?: string }) => {
  if (msg.type === 'run') {
    main();
  } else if (msg.type === 'select') {
    const node = await figma.getNodeByIdAsync(msg.id!);
    if (node && 'visible' in node) {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    }
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
import { Element } from './element';
import { PATCH_TYPES} from './patchTypes';

// 节点索引
let __index = 0;

function domDiff(oldVDom, newVDom, index = 0) {
  const patches = {};

  vNodeWalk(patches, oldVDom, newVDom, index);

  __index = 0;

  return patches;
}

function vNodeWalk(patches = {}, oldNode, newNode, index) {
  const patch = [];

  const isOldNodeElement = oldNode instanceof Element,
        isNewNodeElement = newNode instanceof Element,
        isOldNodeNull = oldNode == null,
        isNewNodeNull = newNode == null;

  if (oldNode && isNewNodeNull) {
    patch.push({
      type: PATCH_TYPES.REMOVE,
      index,
    })
  }

  else if (isOldNodeNull && newNode) {
    patch.push(
      isNewNodeElement
        ? {
          type: PATCH_TYPES.ADD_NODE,
          node: newNode,
        }
        : {
          type: PATCH_TYPES.ADD_TEXT,
          text: newNode
        }
    )
  }

  else if (!isOldNodeElement && !isNewNodeElement && !isNewNodeNull && !isOldNodeNull) {
    oldNode !== newNode
      && patch.push({
        type: PATCH_TYPES.TEXT,
        text: newNode,
      })
  }

  else if (isOldNodeElement && isNewNodeElement) {

    if (oldNode.type !== newNode.type) {
      patch.push({
        type: PATCH_TYPES.REPLACE,
        tag: newNode.type,
        node: newNode,
      })
    }

    const attrs = diffAttrs(oldNode.attrs, newNode.attrs);

    Object.keys(attrs).length
      && patch.push({ type: PATCH_TYPES.ATTR, attrs });
  }

  else if (isOldNodeElement && !isNewNodeElement) {
    patch.push({
      type: PATCH_TYPES.TO_TEXT,
      text: newNode,
    })
  }

  else if (!isOldNodeElement && isNewNodeElement) {
    patch.push({
      type: PATCH_TYPES.TO_NODE,
      node: newNode,
    })
  }

  childrenWalk(patches, oldNode, newNode);

  patch.length && (patches[index] = patch);
}

function childrenWalk(patches, oldNode, newNode) {
  const newChildren = newNode ? (newNode.children || []) : [],
        oldChildren = oldNode ? (oldNode.children || []) : [];

  newChildren.length > oldChildren.length
    ? newChildren.forEach((c, idx) => vNodeWalk(patches, oldChildren[idx] || null, c, ++__index))
    : oldChildren.forEach((c, idx) => vNodeWalk(patches, c, newChildren[idx] || null, ++__index));
}

function diffAttrs(oldAttr = {}, newAttr = {}) {
  const attrs = {};

  for (const key in oldAttr) {
    if (Object.hasOwnProperty.call(oldAttr, key)) {

      if (oldAttr[key] !== newAttr[key]) {
        attrs[key] = newAttr[key];
      }
    }
  }

  for (const key in newAttr) {
    if (Object.hasOwnProperty.call(newAttr, key)) {

      if (newAttr[key] !== oldAttr[key]) {
        attrs[key] = newAttr[key];
      }
    }
  }

  return attrs;
}

export {
  domDiff,
}

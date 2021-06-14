import { render, setAttrs } from './createElement';
import { PATCH_TYPES } from './patchTypes';

let rnIndex = 0;

export function doPatches(rNode, patches = {}) {
  rNode && rNodeWalk(rNode, patches);

  return rNode;
}

function rNodeWalk(rNode, patches) {
  const patch = patches[rnIndex++],
        children = rNode.children;

  Array.from(children).forEach(c => rNodeWalk(c, patches));

  patch && patchAction(rNode, patch);
}

function patchAction(rNode, patch) {
  let newNode = null;

  patch.forEach(p => {

    switch (p.type) {
      case PATCH_TYPES.ATTR:
        setAttrs(rNode, p.attrs);
        break;

      case PATCH_TYPES.REMOVE:
        rNode.remove();
        break;

      case PATCH_TYPES.REPLACE:
        newNode = render(p.node);

        rNode.parentNode.replaceChild(newNode, rNode);
        break;

      case PATCH_TYPES.TEXT:
        rNode.textContent = p.text;
        break;

      case PATCH_TYPES.TO_TEXT:
        newNode = document.createTextNode(p.text);
        rNode.parentNode.replaceChild(newNode, rNode);
        break;

      case PATCH_TYPES.TO_NODE:
        newNode = render(p.node);

        rNode.parentNode.replaceChild(newNode, rNode);
        break;

      case PATCH_TYPES.ADD_NODE:
        newNode = render(p.node);

        rNode.parentNode.appendChild(newNode);
        break;

      case PATCH_TYPES.ADD_TEXT:
        newNode = document.createTextNode(p.text);
        rNode.parentNode.appendChild(newNode);
        break;

      default:
    }
  })
}

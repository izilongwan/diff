import { Element } from './element'

function createElement(type, attrs, children) {
  return new Element({ type, attrs, children});
}


function render(vDom) {
  if (!(vDom instanceof Element)) {
    return document.createTextNode(vDom);
  }

  const { type, attrs = {}, children = [] } = vDom,
        el = document.createElement(type);

  setAttrs(el, attrs);


  const frag = document.createDocumentFragment();

  children.map(child => frag.appendChild(render(child)));

  el.appendChild(frag);

  return el;
}

function setAttrs(el, attrs = {}) {
  for (const key in attrs) {
    setAttr(el, key, attrs[key]);
  }
}

function renderDom(el, root) {
  root.appendChild(el);
}

function setAttr(el, key, value) {
  switch (key) {
    case 'value':
      const tagName = el.tagName.toLowerCase();

      if (tagName == 'input' || tagName == 'select' || tagName == 'textarea') {
        el.value = value;
      }
      return;

    case 'style':
      el.style.cssText = value;
      break;

    default:
      el.setAttribute(key, value);
      break;
  }
}

export {
  createElement,
  setAttrs,
  render,
  renderDom,
}

import { createElement, render, renderDom, domDiff, doPatches } from './js'

const oldVDom = createElement(
  'ul',
  {
    style: 'width: 100px; height: 100px; border: 1px dashed #ddd;',
    class: 'list'
  },
  [
    'UL',
    createElement(
      'a',
      {
        href: 'http://jd.com',
        target: '_blank'
      },
    ),
    999
  ]
)

const newVDom = createElement(
  'div',
  {
    style: 'width: 100px; height: 100px; border: 1px dashed #ddd;',
    class: 'list-wrap',
    id: 0
  },
  [
    'DIV',
    createElement(
      'a',
      {
        href: 'http://jd.com',
        target: 'self',
        'data-type': 'link'
      },
      [
        'JD'
      ]
    ),
    createElement(
      'span',
      {},
      [
        'SPAN',
        createElement('sub', {}, ['SUB']),
        createElement('sup', {}, ['SUP']),
      ]
    ),
    88,
    createElement('li', {}, ['LI'])
  ]
)

const rDom = render(oldVDom);

renderDom(
  rDom,
  document.querySelector('#app')
)

// patches = {
//   0: [
//     {
//       type: ATTR,
//       attr: {
//         class: 'new-list'
//       }
//     }
//   ],
//   1: [
//     {
//       type: REPLACE,
//       node: newNode
//     }
//   ],
//   ...
// }

setTimeout(() => {
  const patches = domDiff(oldVDom, newVDom);

  doPatches(rDom, patches);
  console.log(rDom, patches, oldVDom, newVDom);
}, 2000);

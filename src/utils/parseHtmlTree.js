import React from 'react';
import BigQuote from '../BigQuote';

const parseHtmlTree = (data) => {
  if (!data) return null;
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].node === 'element') {
      if (data[i].attr) {
        // replace class attribute with className
        if (data[i].attr.class) {
          data[i].attr.className = data[i].attr.class;
          delete data[i].attr.class;
        }
        // prepend PUBLIC_URL to image sources
        if (data[i].tag === 'img' && data[i].attr.src) {
          data[i].attr.src = process.env.PUBLIC_URL + '../' + data[i].attr.src;
        }
      }
      const children = parseHtmlTree(data[i].child);
      const props = Object.assign({}, data[i].attr, { key: i });

      if (data[i].tag === 'blockquote') {
        result.push(React.createElement(BigQuote, props, children));
      } else {
        result.push(React.createElement(data[i].tag, props, children));
      }
    } else if (data[i].node === 'text') {
      result.push(data[i].text);
    }
  }
  if (result.length === 0) {
    return null;
  }
  if (result.length === 1) {
    return result[0];
  }
  return result;
}

export default parseHtmlTree;

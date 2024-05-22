import { DOM_TYPES } from "./h";
import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";

export function mountDOM(vdom, parentEl, index) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl, index); // --1--
      break;
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl, index); // --2--
      break;
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl, index); // --3--
      break;
    }

    default: {
      throw new Error(`Can't mount DOM of type: ${vdom.type}`);
    }
  }
}

function insert(el, parentEl, index) {
  // If index is null or undefined, simply append.
  // Note the usage of `==` instead of `===`.
  if (index == null) {
    parentEl.append(el);
    return;
  }

  if (index < 0) {
    throw new Error(`Index must be a positive integer, got ${index}`);
  }

  const children = parentEl.childNodes;

  if (index >= children.length) {
    parentEl.append(el);
  } else {
    parentEl.insertBefore(el, children[index]);
  }
}

// TODO: implement createTextNode()
function createTextNode(vdom, parentEl, index) {
  const { value } = vdom;

  const textNode = document.createTextNode(value); //--1--
  vdom.el = textNode; //--2--

  insert(textNode, parentEl, index);
}

// TODO: implement createElementNode()
function createElementNode(vdom, parentEl, index) {
  const { tag, props, children } = vdom;

  const element = document.createElement(tag); //--1--
  addProps(element, props, vdom); //--2--
  vdom.el = element;

  children.forEach((child) => mountDOM(child, element));
  insert(element, parentEl, index);
}

function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props; //--3--

  vdom.listeners = addEventListeners(events, el); //--4--
  setAttributes(el, attrs); //--5--
}

// TODO: implement createFragmentNode()
function createFragmentNode(vdom, parentEl, index) {
  const { children } = vdom;

  vdom.el = parentEl;

  children.forEach((child, i) =>
    mountDOM(child, parentEl, index ? index + i : null)
  );
}

export function extractChildren(vdom) {
  if (vdom.children == null) {
    return [];
  }

  const children = [];

  for (const child of vdom.children) {
    if (child.type === DOM_TYPES.FRAGMENT) {
      children.push(...extractChildren(child, children));
    } else {
      children.push(child);
    }
  }
  return children;
}

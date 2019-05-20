import {isDescendent} from "./util"

const draggableDefaults = {
  callback: () => {},
  classActive: "isDragging",
  classHovered: "isHovered",
  dataTransferEffect: "move",
}

function draggableElement (element, options) {
  const {callback, dataTransferEffect, classActive, classHovered, store} = {
    ...draggableDefaults,
    ...options,
  }

  if (!store || typeof store !== "object") {
    throw new Error(`Draggable requires an object "store": [${typeof store}] given.`)
  }

  function drop (e) {
    const target = findDraggable(e.target)

    callback(store.activeElement, target)
    e.stopPropagation()
    element.ondragexit(e)

    return false
  }

  function end (e) {
    const target = findDraggable(e.target)

    store.activeElement = null
    element.ondragexit(e)
    target.classList.remove(classActive)
  }

  function hover (e) {
    const target = findDraggable(e.target)

    // TODO: make these CSS classes config values
    target.classList.remove("drop-sibling", "drop-child")
    target.classList.add(`drop-${dropPosition(e, target)}`)

    e.dataTransfer.dropEffect = dataTransferEffect
    e.preventDefault()

    return false
  }

  function start (e) {
    const target = findDraggable(e.target)

    store.activeElement = target
    target.classList.add(classActive)

    e.dataTransfer.effectAllowed = dataTransferEffect
    e.dataTransfer.setData("text/html", "")
  }

  function toggle (action) {

    return function (e) {
      const target = findDraggable(e.target)
      const allow =
        target.draggable &&
        target && target.classList &&
        store.activeElement &&
        store.activeElement !== target &&
        !isDescendent(store.activeElement, target)

      if (allow) {
        target.classList[action](classHovered)
      }

      // TODO: make these CSS classes config values
      target.classList.remove("drop-sibling", "drop-child")
    }
  }

  element.draggable = true
  element.ondragstart = start
  element.ondragenter = toggle("add")
  element.ondragover = hover
  element.ondragexit = toggle("remove")
  element.ondrop = drop
  element.ondragend = end

  return element
}

function draggable (options) {
  if (!options.selector || typeof options.selector !== "string") {
    throw new Error(`Draggable requires a string "selector": [${typeof selector}] given.`)
  }

  if (options.callback && typeof options.callback !== "function") {
    throw new Error(`Draggable "callbacks" must be a function: [${typeof callback}] given.`)
  }

  const store = {}

  Array
    .from(document.querySelectorAll(options.selector))
    .forEach((li) => draggableElement(li, {...options, store}))
}

function dropPosition (e, target) {
  let temp = target
  let offset = 0

  while (temp.parentNode) {
    offset = temp.offsetTop ? temp.offsetTop : offset
    temp = temp.parentNode
  }

  const midpoint = offset + target.offsetTop + ~~(target.offsetHeight / 2)

  return e.y < midpoint
    ? "sibling"
    : "child"
}

function findDraggable (node) {
  let temp = node

  while (!temp.draggable && temp.parentNode) {
    temp = temp.parentNode
  }

  return temp
}

export default draggable
export {draggableElement}

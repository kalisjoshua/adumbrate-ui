import modifierKeys from "./modifierKeys"

const classes = [
  "before",
  "after",
  "child",
]

const draggableDefaults = {
  callback: () => {},
  classActive: "isDragging",
  dataTransferEffect: "move",
}

const removeClasses = (list) =>
  list.remove.apply(list, classes.map((x) => `drop-${x}`))

function draggableElement (element, options) {
  const {callback, dataTransferEffect, classActive, store} = {
    ...draggableDefaults,
    ...options,
  }

  if (!store || typeof store !== "object") {
    throw new Error(`Draggable requires an object "store": [${typeof store}] given.`)
  }

  function drop (e) {
    const target = findDraggable(e.target)
    const position = target
      .getAttribute("class")
      .match(/drop-([^\s]+)/)[1]

    callback(store.activeElement, target, position)
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

    removeClasses(target.classList)
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

  element.draggable = true
  element.ondragstart = start
  element.ondragover = hover
  element.ondragenter = element.ondragexit = (e) =>
    removeClasses(findDraggable(e.target).classList)
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

  return modifierKeys(e) ? classes[2] : e.y > midpoint ? classes[1] : classes[0]
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

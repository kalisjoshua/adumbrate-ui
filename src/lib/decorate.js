function decorate (node, parent, notify = notifyFn.bind(null, node)) {
  Object.defineProperties(node, {
    add: {
      // add or move an item in/to the collection
      value: (obj, position) => {
        const subject = position === "child" ? node : (parent || node)
        const target = obj.remove ? extract(obj.remove()) : obj

        const index = !position
          ? subject.tree.length
          : subject.tree.indexOf(node) + +(position === "after")

        subject.tree = [
          ...subject.tree.slice(0, index),
          decorate(target, subject, notify),
          ...subject.tree.slice(index),
        ]

        notify("add", target)
      }
    },
    aggregate: {
      // calculate/sum up the tree the estimations
      get: () =>
        (node.estimation || 0) +
          node.tree.reduce((a, n) => a + (n.aggregate || 0), 0)
    },
    estimate: {
      enumerable: true,
      get: () => node.estimation,
      // set an estimation for a given item and notify when it heppens
      set: (num) => {
        node.estimation = +num
        notify("estimate", num)
      }
    },
    listen: {
      // register a listener function; thesee will be fired after events
      value: (fn) => {
        node.root.listeners.push(fn)
      }
    },
    parent: {
      value: parent,
    },
    root: {
      // recurse up the tree to the root node
      get: () => parent
        ? parent.root
        : node
    },
  })

  node.id = node.id || Math.random().toString(36).slice(-6)
  node.tree = node.tree || []

  if (parent) {
    Object.defineProperty(node, "remove", {
      // remove itself from the collection
      value: () => {
        parent.tree = parent.tree
          .filter(({id}) => node.id !== id)

        notify("remove")

        return node
      }
    })
  } else {
    Object.defineProperty(node, "listeners", {
      value: []
    })
  }

  // recurse/walk through the tree(s)
  if (node.tree) {
    node.tree.forEach((child) => decorate(child, node, notify))
  }

  return node
}

function extract (obj) {
  const props = Object.keys(obj).join()
  // eslint-disable-next-line no-new-func
  const exec = new Function("obj", `const {${props}} = obj; return {${props}}`)

  const result = exec(obj)

  if (result.tree && result.tree.length) {
    result.tree = result.tree.map(extract)
  }

  return result
}

function notifyFn (context, event, arg) {
  context.root.listeners
    .forEach((fn) => fn({arg, context, event}))
}

export default decorate
export {extract}

function decorate (node, parent, notify = notifyFn.bind(null, node)) {
  Object.defineProperties(node, {
    add: {
      // add a new item to the collection
      value: (obj) => {
        node.tree.push({...obj, tree: []})
        decorate(node.tree.slice(-1)[0], node, notify)
        notify("add", obj)
      }
    },
    aggregate: {
      // calculate/sum up the tree the estimations
      enumerable: true,
      get: () =>
        (node.estimation || 0) +
          node.tree.reduce((a, n) => a + (n.aggregate || 0), 0)
    },
    estimate: {
      // set an estimation for a given item
      value: (num) => {
        node.estimation = num
        notify("estimate", num)
      }
    },
    id: {
      // set a random identifier used to filter the item out of the collection
      value: Math.random().toString(36).slice(-6)
    },
    listen: {
      // register a listener function for notification about events
      value: (fn) => {
        node.root.listeners.push(fn)
      }
    },
    root: {
      // recurse up the tree to the root node
      get: () => parent
        ? parent.root
        : node
    },
  })

  node.tree = node.tree || []

  if (parent) {
    Object.defineProperty(node, "remove", {
      // remove itself from the collection
      value: () => {
        parent.tree = parent.tree
          .filter(({id}) => node.id !== id)
        notify("remove")
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

function notifyFn (context, event, arg) {
  context.root.listeners
    .forEach((fn) => fn({arg, context, event}))
}

export default decorate

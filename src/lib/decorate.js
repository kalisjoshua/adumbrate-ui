function decorate (node, parent, notify = notifyFn.bind(null, node)) {
  Object.defineProperties(node, {
    add: {
      // add a new item to the collection
      value: (obj, sibling) => {
        const p = (sibling ? parent : node)

        p.tree.push(decorate(extract(obj), p, notify))
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
        node.estimation = +num
        notify("estimate", num)
      }
    },
    id: {
      // set a random identifier used to filter the item out of the collection
      value: Math.random().toString(36).slice(-6)
    },
    listen: {
      // register a listener function; thesee will be fired after events
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
  /*eslint-disable no-new-func */
  const exec = new Function("obj", `const {${props}} = obj; return {${props}}`)
  /*eslint-enable no-new-func */

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

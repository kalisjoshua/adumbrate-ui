import decorate, {extract} from "./decorate"

const defaultData = {tree: []}
const key = "adumbrate"
const testData = {
  tree: [
    {
      title: "Step 1 - Steal the underpants",
      tree: [
        {
          title: "Feature 1 - A user story",
          tree: [
            {title: "Task 1"},
            {title: "Task 2"},
            {title: "Task 3"},
          ]
        },
        {
          title: "Feature 2 - A technical implementation"
        }
      ]
    },
    {
      title: "Step 2 - ... ummm"
    },
    {
      title: "Step 3 - PROFIT!"
    }
  ]
}

let store
let index

function buildIndex (obj) {
  index = {}

  const walk = ({tree}) => tree
    .forEach((node) => {
      index[node.id] = node

      if (node.tree) walk(node)
    })

  walk(obj)

  return obj
}

function lookup (id) {

  return index[id]
}

function read () {

  return store || update(JSON.parse(localStorage.getItem(key)))
}

function update (data) {
  store = decorate(buildIndex(extract(data || defaultData)))
  localStorage.setItem(key, JSON.stringify(store))

  return read()
}

read()

export default ({lookup, read, update})
export {testData}

import decorate from "./decorate"

const defaultData = {tree: []}
const key = "adumbrate"
const metaKey = `${key}-meta`
const store = JSON.parse(localStorage.getItem(metaKey)) || {}
const testData = decorate({
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
})

function meta (id, obj) {
  if (obj) {
    store[id] = obj
    localStorage.setItem(metaKey, JSON.stringify(store))
  } else {

    return store[id]
  }
}

function read () {
  let store = localStorage.getItem(key)

  return store
    ? JSON.parse(store)
    : update()
}

function update (data) {
  localStorage.setItem(key, JSON.stringify(data || defaultData))

  return read()
}

export default {meta, read, update}
export {testData}

// setInterval(() => {
//   localStorage.setItem(key, JSON.stringify(tree))
// }, 10000)

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

export default {read, update}
export {testData}

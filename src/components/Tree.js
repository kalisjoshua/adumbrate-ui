import {h, Component} from "preact"

import "./Tree.css"

const icon = (__html, title, fn) => (
  <span
    class={`worktree--icon__${title.toLowerCase().replace(/\s+/g, "-")}`}
    dangerouslySetInnerHTML={{__html}}
    onClick={fn}
    title={title}
  />
)

function add(self, index, sibling) {
  const title = prompt("Title")

  if (title) {
    if (sibling) {
      self.state.tree.splice(index + 1, 0, {title})
      self.setState({tree: self.state.tree})
    } else {
      const target = self.state.tree[index]

      target.children = target.children || []
      
      target.children.push({title})
      
      self.setState({}) // force re-render
    }
  }
}

function estimate(self, index) {
  const e = prompt("Estimate")
  
  if (e) {
    const target = self.state.tree[index]

    target.e = e
    
    // console.log(target)
    rollup(self, e)
    self.setState({})
  }
}

function remove(self, index) {
  let siblings = self.state.tree

  siblings = [
    ...siblings.slice(0, index),
    ...siblings.slice(index + 1)
  ]

  if (siblings.length) {
    self.setState({tree: siblings})
  } else if (!self.state.parent) {
    self.setState({tree: []})
  } else {
    const parentSiblings = self.state.parent.state.parent.state.tree

    delete parentSiblings[self.state.index].children

    self.state.parent.setState({tree: parentSiblings})
  }
}

function rollup(element) {
  const sum = (ar) => ar
    .reduce((a, b) => a + +(b.e || 0), 0)

  let node = element

  while (node) {
    if (!node.state.tree) {
      // console.log(sum(node.state.tree), node.state)
      console.log(sum(node.state.node.children))
    }

    node = node.state.parent
  }
  // throw new Error("Not Implemented Yet!")
}

class WorkitemElement extends Component {
  constructor({node, parent}) {
    super()

    this.setState({node, parent})
  }
  
  render({i, isEmpty, node, parent}) {
    return (
      <li class="worktree--branch">
        <div class="worktree--branch__title">
          {icon("+", "Add Sibling", () => add(parent, i, true))}
          {!isEmpty && icon("&raquo;", "Add Child", () => add(parent, i))}
          <strong>{node.title}</strong>
          {!isEmpty && icon(`${node.e || "?"}`, "Estimate", () => estimate(parent, i))}
          {!isEmpty && icon("&times;", "Remove Child", () => remove(parent, i))}
        </div>
        {node.children && <WorkitemTree index={i} parent={this} tree={node.children} />}
      </li>
    )
  }
}

class WorkitemTree extends Component {
  constructor({index, parent, tree = []}) {
    super()
    
    tree.forEach((parent, parentIndex) => {
      (parent.children || [])
        .forEach((child, childIndex) => {
          child.parent = this
          child.parentNode = parent
        })
    
      // parent.element = this
    })

    this.setState({index, parent, tree})
  }
  
  render() {
    const isEmpty = !this.state.tree || !this.state.tree.length

    return (
      <ul class="worktree">
        {(isEmpty ? [{}] : this.state.tree)
          .map((node, i) => (
            <WorkitemElement isEmpty={isEmpty} i={i} node={node} parent={this}/>
          ))}
      </ul>
      )
  }
}

export default WorkitemTree

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

function rollup(node, est) {
  console.log(est, node)
  // throw new Error("Not Implemented Yet!")
}

class Workitem extends Component {
  constructor({index, parent, tree = []}) {
    super()

    this.setState({index, parent, tree})
  }
  
  add(index, sibling) {
    const title = prompt("Title")

    if (title) {
      if (sibling) {
        this.state.tree.splice(index + 1, 0, {title})
        this.setState({tree: this.state.tree})
      } else {
        const target = this.state.tree[index]

        target.children = target.children || []
        
        target.children.push({title})
        
        this.setState({}) // force re-render
      }
    }
  }
  
  estimate(index) {
    const e = prompt("Estimate")
    
    if (e) {
      const target = this.state.tree[index]

      target.e = e
      
      console.log(target)
      // rollup(this.state.parent, e)
      this.setState({})
    }
  }
  
  remove(index) {
    let siblings = this.state.tree
    
    siblings = [
      ...siblings.slice(0, index),
      ...siblings.slice(index + 1)
    ]

    if (siblings.length) {
      this.setState({tree: siblings})
    } else if (!this.state.parent) {
      this.setState({tree: []})
    } else {
      const parentSiblings = this.state.parent.state.tree

      delete parentSiblings[this.state.index].children

      this.state.parent.setState({tree: parentSiblings})
    }
  }
  
  render() {
    const isEmpty = !this.state.tree || !this.state.tree.length

    return (
      <ul class="worktree">
        {(isEmpty ? [{}] : this.state.tree).map((node, i) => (
          <li class="worktree--branch">
            <div class="worktree--branch__title">
              {icon("+", "Add Sibling", () => this.add(i, true))}
              {!isEmpty && icon("&raquo;", "Add Child", () => this.add(i))}
              <strong>{node.title}</strong>
              {!isEmpty && icon(`${node.e || "?"}`, "Estimate", () => this.estimate(i))}
              {!isEmpty && icon("&times;", "Remove Child", () => this.remove(i))}
            </div>
            {node.children && <Workitem index={i} parent={this} tree={node.children} />}
          </li>
        ))}
      </ul>
      )
  }
}

export default Workitem

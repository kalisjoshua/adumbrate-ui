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

class Workitem extends Component {
  constructor({tree = []}) {
    super()

    this.setState({tree})
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
      
      this.setState({})
    }
  }
  
  remove(index) {
    this.setState({tree: [
      ...this.state.tree.slice(0, index),
      ...this.state.tree.slice(index + 1)
    ]})
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
            {node.children && <Workitem tree={node.children} />}
          </li>
        ))}
      </ul>
      )
  }
}

export default Workitem

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

class Parent extends Component {
  state = {
    siblings: []
  }
  
  constructor({siblings}) {
    super()
    
    this.state.siblings = siblings || []
  }

  remove(index) {
    this.setState({siblings: [
      ...this.state.siblings.slice(0, index),
      ...this.state.siblings.slice(index + 1)
    ]})
  }

  render(props, state) {

    return (
      <ul class="worktree">
        {(state.siblings.length ? state.siblings : [{}])
          .map((n, i) => <Child parent={this} {...n} index={i} />)}
      </ul>
    )
  }
}

class Child extends Component {
  constructor({children, parent, title}) {
    super()

    this.state.children = children || []
    this.state.parent = parent
    this.state.title = title
  }

  add(sibling) {
    const title = prompt('Title')

    if (title) {
      const add = (parent, collection, item) =>
        parent.setState({[collection]: [...parent.state[collection], {title}]})

      sibling
        ? add(this.state.parent, 'siblings')
        : add(this, 'children')

      this.state.parent.forceUpdate()
    }
  }

  remove(index) {
    this.state.parent.remove(index)
  }

  render(props) {
    const {index, title} = props

    return (
      <li class="worktree--branch">
        <div class="worktree--branch__title">
          {icon("+", "Add Sibling", () => this.add(true))}
          {title && icon("&raquo;", "Add Child", () =>  this.add())}
          <strong contentEditable>{title}</strong>
          {/* Estimate */}
          {title && icon("&times;", "Remove Child", () =>  this.remove(index))}
        </div>
        {!!this.state.children.length && <Parent siblings={this.state.children} />}
      </li>
    )
  }
}

export default Parent

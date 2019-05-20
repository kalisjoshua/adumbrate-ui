import {h} from "preact"

import Icon from "./Icon"
import "./Icons.css"
import "./Tree.css"

const add = (node) => {
  const title = prompt("Title")

  title && node.add({title})
}

const confirm = () =>
  window.confirm("Are you sure you want to delete this part of the breakdown?")

const toggle = (el, hasChildren) =>
  hasChildren && el.classList.toggle("collapse-closed")

const toggleReset = (el) =>
  el && el.classList.remove("collapse-closed")

function Leaf ({register, node, drag}) {
  let el

  register(node)

  return (
    <li ref={(ref) => el = ref}>
      <div className="tree--title" {...drag} data-id={node.id}>
        <Icon.Add onClick={add.bind(null, node)} />
        <span className="tree--label" onClick={() => toggle(el, !!node.tree.length)} ref={() => toggleReset(el)}>
          {node.title}
        </span>
        <Icon.Remove onClick={() => {confirm() && node.remove()}} />
      </div>
      <Tree data={node} drag={drag} register={register} />
    </li>
  )
}

function Tree ({data, drag, register}) {

  return !data.tree.length
    ? null
    : (
      <ol className="tree">
        {data.tree.map((node) => (<Leaf {...{drag, node, register}} />))}
      </ol>
    )
}

export default Tree

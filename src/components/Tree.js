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

const toggle = (el) =>
  !!el.parentNode.querySelector(".tree") && el.parentNode.classList.toggle("collapse-closed")

// const toggleReset = (el) =>
//   el && el.classList.remove("collapse-closed")

function Leaf ({register, node, drag}) {
  register(node)

  return (
    <li>
      <Title {...{drag, node}} />
      <Tree data={node} drag={drag} register={register} />
    </li>
  )
}

function Title ({drag, node}) {
  let el

  return (
    <div className="tree--title" {...drag} data-id={node.id} ref={(e) => el = e}>
      <span className="tree--label">{node.title}</span>
      <Icon.Estimate onClick={() => node.estimate(prompt("?"))} value={node.aggregate || "_"} />
      <Icon.Add onClick={add.bind(null, node)} />
      <Icon.Collapse onClick={() => toggle(el)} />
      <Icon.Remove onClick={() => confirm() && node.remove()} />
    </div>
  )
}

function Tree ({data, drag, register}) {

  return (data.tree && data.tree.length)
    ? (
      <ol className="tree">
        {data.tree.map((node) => (<Leaf {...{drag, node, register}} />))}
      </ol>
    )
    : null
}

export default Tree

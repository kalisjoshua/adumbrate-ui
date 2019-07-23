import {h} from "preact"

import Estimate from "./Estimate"
import Icon from "./Icons"

const challenge = "Are you sure you want to delete this part of the breakdown?"

function add (node, event) {
  const title = prompt("Title")

  event.stopPropagation()

  title && node.add({title}, "child")
}

function remove (node, event) {
  event.stopPropagation()

  window.confirm(challenge) && node.remove()
}

function Title ({drag, isSelected, node, onClick, toggle}) {
  const cssClass = [
    "tree--title",
    isSelected(node) ? "selected" : ""
  ].join(" ")

  return (
    <div className={cssClass} {...drag} data-id={node.id} onClick={onClick}>
      <span className="tree--label">{node.title} <small>({node.id})</small></span>
      <Estimate node={node} />
      <Icon.Add onClick={(e) => add(node, e)} />
      <Icon.Remove onClick={(e) => remove(node, e)} />
    </div>
  )
}

export default Title

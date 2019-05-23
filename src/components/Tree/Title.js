import {h} from "preact"

import Estimate from "./Estimate"
import Icon from "./Icons"

const add = (node, event) => {
  const title = prompt("Title")

  event.stopPropagation()

  title && node.add({title})
}

const confirm = () =>
  window.confirm("Are you sure you want to delete this part of the breakdown?")

const remove = (node, event) => {
  event.stopPropagation()

  confirm() && node.remove()
}

function Title ({drag, node, onClick, toggle}) {

  return (
    <div className="tree--title" {...drag} data-id={node.id} onClick={onClick}>
      <span className="tree--label">{node.title} <small>({node.id})</small></span>
      <Estimate node={node} />
      <Icon.Add onClick={(e) => add(node, e)} />
      <Icon.Remove onClick={(e) => remove(node, e)} />
    </div>
  )
}

export default Title

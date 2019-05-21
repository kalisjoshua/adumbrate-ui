import {h} from "preact"

import Estimate from "./Estimate"
import Icon from "./Icons"

const add = (node) => {
  const title = prompt("Title")

  title && node.add({title})
}

const confirm = () =>
  window.confirm("Are you sure you want to delete this part of the breakdown?")

function Title ({drag, node, toggle}) {

  return (
    <div className="tree--title" {...drag} data-id={node.id}>
      <span className="tree--label">{node.title}</span>
      <Estimate node={node} />
      <Icon.Add onClick={add.bind(null, node)} />
      <Icon.Remove onClick={() => confirm() && node.remove()} />
    </div>
  )
}

export default Title

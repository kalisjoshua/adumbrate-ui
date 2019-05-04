import {h} from "preact"

import Icon from "./Icon"
import "./Tree.css"

const item = (node) => (
  <li>
    <div className="tree--title">
      <Icon.Add onClick={() => node.add({title: prompt("Title")})} />
      <span className="tree--label">{node.title}</span>
      <Icon.Remove onClick={() => node.remove()} />
    </div>
    <Tree data={node} />
  </li>
)

function Tree ({data}) {

  return data.tree && (
    <ol className="tree">{data.tree.map(item)}</ol>
  )
}

export default Tree

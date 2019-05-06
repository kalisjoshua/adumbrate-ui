import {h} from "preact"

import Icon from "./Icon"
import "./Tree.css"

const add = (node) => {
  const title = prompt("Title")

  title && node.add({title})
}

const confirm = () =>
  window.confirm("Are you sure you want to delete this part of the breakdown?")

function Tree ({data}) {

  return data.tree && (
    <ol className="tree">
      {data.tree
        .map((node) => (
          <li>
            <div className="tree--title">
              <Icon.Drag onClick={() => {}} />
              <Icon.Collapse onClick={() => {}} />
              <Icon.Add onClick={add.bind(null, node)} />
              <span className="tree--label">{node.title}</span>
              <Icon.Remove onClick={() => {confirm() && node.remove()}} />
            </div>
            <Tree data={node} />
          </li>
        ))}
    </ol>
  )
}

export default Tree

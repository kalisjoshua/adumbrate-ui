import {h} from "preact"

import "./index.css"

import Leaf from "./Leaf"

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

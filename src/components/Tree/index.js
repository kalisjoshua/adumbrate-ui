import {h} from "preact"

import "./index.css"

import Leaf from "./Leaf"

function Tree ({data, drag, register, select}) {

  return (data.tree && data.tree.length)
    ? (
      <ol className="tree">
        {data.tree.map((node) => (
          <Leaf {...{drag, node, register, select}} />
        ))}
      </ol>
    )
    : null
}

export default Tree

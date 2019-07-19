import {h} from "preact"

import "./index.css"

import Title from "./Title"

function Tree ({data, drag, register, select}) {

  return !(data.tree && data.tree.length)
    ? null
    : (
      <ol className="tree">
        {data.tree
          .map((node) => {
            register(node)

            return (
              <li>
                <Title {...{drag, node, onClick() {select(node)}}} />
                <Tree {...{drag, register, select}} data={node} />
              </li>
            )
          })}
      </ol>
    )
}

export default Tree

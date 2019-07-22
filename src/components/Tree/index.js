import {h} from "preact"

import "./index.css"

import Title from "./Title"

function Tree ({data, drag, select, selected}) {

  return !(data.tree && data.tree.length)
    ? null
    : (
      <ol className="tree">
        {data.tree
          .map((node) => {
            const isSelected = selected.id === node.id

            return (
              <li>
                <Title {...{drag, isSelected, node, onClick() {select(node)}}} />
                <Tree {...{drag, select, selected}} data={node} />
              </li>
            )
          })}
      </ol>
    )
}

export default Tree

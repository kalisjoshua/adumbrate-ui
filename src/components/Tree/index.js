import {h} from "preact"

import "./index.css"

import Title from "./Title"

function Tree ({data, drag, isSelected, select}) {

  return !(data.tree && data.tree.length)
    ? null
    : (
      <ol className="tree">
        {data.tree
          .map((node) => (
            <li>
              <Title {...{drag, isSelected, node, onClick() {select(node)}}} />
              <Tree {...{drag, isSelected, select}} data={node} />
            </li>
          ))}
      </ol>
    )
}

export default Tree

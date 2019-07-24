import {h} from "preact"

import "./index.css"

import Title from "./Title"

function Tree ({data: {tree}, drag, isSelected, select}) {

  return !(tree && tree.length)
    ? null
    : (
      <ol className="tree">
        {tree.map((node) => (
          <li>
            <Title {...{drag, isSelected, node, onClick() {select(node)}}} />
            <Tree {...{drag, isSelected, select}} data={node} />
          </li>
        ))}
      </ol>
    )
}

export default Tree

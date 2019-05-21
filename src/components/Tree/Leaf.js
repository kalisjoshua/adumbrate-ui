import {h} from "preact"

import Title from "./Title"
import Tree from "./"

function Leaf ({register, node, drag}) {
  register(node)

  return (
    <li>
      <Title {...{drag, node}} />
      <Tree data={node} drag={drag} register={register} />
    </li>
  )
}

export default Leaf

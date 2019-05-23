import {h} from "preact"

import Title from "./Title"
import Tree from "./"

function Leaf ({drag, node, register, select}) {
  register(node)

  return (
    <li>
      <Title onClick={() => select(node)} {...{drag, node}} />
      <Tree data={node} drag={drag} register={register} select={select} />
    </li>
  )
}

export default Leaf

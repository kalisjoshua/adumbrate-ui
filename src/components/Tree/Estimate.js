import {h} from "preact"

const cssRoot = "tree--estimate"

function Estimate ({node}) {
  const onClick = () => {
    if (node.parent.id !== node.root.id) {
      node.estimate = prompt("?")
    } else {
      alert("Can not add an estimate to a top-level item.")
    }
  }

  const className = node.estimate
    ? `${cssRoot}__estimate`
    : node.aggregate
      ? `${cssRoot}__aggregate`
      : `${cssRoot}`

  const html = {
    dangerouslySetInnerHTML: {
      __html: node.estimate
        ? node.estimate
        : node.aggregate
          ? `<small>ag</small> ${node.aggregate}`
          : ""
    }
  }

  const title = node.aggregate || node.estimate
    ? ""
    : "Add an Estimate for this item."

  return (
    <span className={className} onClick={onClick} {...html} title={title} />
  )
}

export default Estimate

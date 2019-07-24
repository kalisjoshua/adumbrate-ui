import {h} from "preact"

const cssRoot = "tree--estimate"

function Estimate ({node}) {
  const attrs = {
    className: node.estimate
      ? `${cssRoot}__estimate`
      : node.aggregate
        ? `${cssRoot}__aggregate`
        : `${cssRoot}`,

    dangerouslySetInnerHTML: {
      __html: node.estimate
        ? node.estimate
        : node.aggregate
          ? `<small>ag</small> ${node.aggregate}`
          : ""
    },

    onClick (e) {
      e.stopPropagation()

      if (node.parent.id !== node.root.id) {
        node.estimate = prompt("?")
      } else {
        alert("Can not add an estimate to a top-level item.")
      }
    },

    title: node.aggregate || node.estimate
      ? "Edit the Estimate for this item"
      : "Add an Estimate for this item.",
  }

  return (
    <span {...attrs} />
  )
}

export default Estimate

import {h} from "preact"

const Icon = ({label, onClick, title, type}) => (
  <span
    className={`tree--icon__${type}`}
    onClick={onClick}
    title={title}>{label}</span>
)

Icon.Add = ({onClick}) => (
  <Icon label="+" onClick={onClick} title="Add Item" type="add" />
)

Icon.Collapse = ({onClick}) => (
  <Icon label="-" onClick={onClick} title="Collapse Children" type="collapse" />
)

Icon.Drag = ({onClick}) => (
  <Icon label="::" onClick={onClick} title="Drag Item" type="drag" />
)

Icon.Remove = ({onClick}) => (
  <Icon label="&times;" onClick={onClick} title="Remove Item" type="remove" />
)

export default Icon

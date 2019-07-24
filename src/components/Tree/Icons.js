import {h} from "preact"

import "./Icons.css"

const Icon = ({label, onClick, title, type}) => (
  <span {...{
    className: `tree--icon__${type}`,
    onClick,
    title,
  }}>{label}</span>
)

Icon.Add = ({onClick}) => (
  <Icon label="+" onClick={onClick} title="Add Item" type="add" />
)

Icon.Collapse = ({onClick}) => (
  <Icon label="..." onClick={onClick} title="Collapse Children" type="collapse" />
)

Icon.Estimate = ({onClick, value}) => (
  <Icon label={value} onClick={onClick} title="Estimate Item" type="estimate" />
)

Icon.Remove = ({onClick}) => (
  <Icon label="&times;" onClick={onClick} title="Remove Item" type="remove" />
)

export default Icon

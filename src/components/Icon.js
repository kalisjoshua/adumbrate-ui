import {h} from "preact"

const Icon = ({label, onClick, title, type}) => (
  <span
    className={`tree--icon__${type}`}
    onClick={onClick}
    title={title}>{label}</span>
)

Icon.Add = ({onClick}) => (
  <Icon label="+" onClick={onClick} title="Add item" type="add" />
)

Icon.Remove = ({onClick}) => (
  <Icon label="&times;" onClick={onClick} title="Remove item" type="remove" />
)

export default Icon

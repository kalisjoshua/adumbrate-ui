import {h} from "preact";

import "./Details.css"

import debounce from "../lib/debounce"

const attrs = (item, id, noValue) => ({
  "data-id": item.id,
  id,
  key: `${item.id}-${id}`,
  name: id,
  [noValue ? (void 0) : "value"]: item[id],
})
const eventArgs = ({target: {dataset, name, value}}) => ([dataset.id, name, value])

function Details ({item, update}) {
  const changeFn = debounce((event) => update(...eventArgs(event)))
  const isRoot = item.parent.id === item.root.id

  return (
    <aside className="planning--details">
      <h2 className="text-right">Details</h2>

      <div className="formField">
        <label for="id">ID</label>
        <input disabled {...attrs(item, "id")} />
      </div>

      {(isRoot) && (
        <div className="formField">
          <label for="repo">Repository</label>
          <input {...attrs(item, "repo")} onKeyup={changeFn} />
        </div>
      )}

      <div className="formField">
        <label for="title">Title</label>
        <input {...attrs(item, "title")} onKeyup={changeFn} />
      </div>

      <div className="formField">
        <label for="estimate">Estimate</label>
        <input disabled={isRoot} {...attrs(item, "estimate")} min="0" max="50" onChange={changeFn} onKeyup={changeFn} type="number" />
      </div>

      <div className="formField">
        <label for="description">Description</label>
        <textarea {...attrs(item, "description", true)} onKeyup={changeFn}>{item.description || ""}</textarea>
      </div>
    </aside>
  )
}

export default Details

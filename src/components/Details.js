import {h, fragment} from "preact";

import "./Details.css"

import debounce from "../lib/debounce"

function Details ({item, update}) {
  if (!item) return

  const isRoot = item.parent.id === item.root.id

  const changeFn = debounce(({target}) => update(target))

  return (
    <fragment>
      <h2 className="text-right">Details</h2>

      <div className="formField">
        <label for="id">ID</label>
        <input disabled="true" id="id" data-id={item.id} key={`${item.id}-id`} name="id" value={item.id} />
      </div>

      {(isRoot) && (
        <div className="formField">
          <label for="repo">Repository</label>
          <input id="repo" data-id={item.repo} key={`${item.id}-repo`} name="repo" onKeyup={changeFn} value={item.repo} />
        </div>
      )}

      <div className="formField">
        <label for="title">Title</label>
        <input id="title" data-id={item.id} key={`${item.id}-title`} name="title" onKeyup={changeFn} value={item.title} />
      </div>

      <div className="formField">
        <label for="estimate">Estimate</label>
        <input disabled={isRoot} id="estimate" data-id={item.id} key={`${item.id}-estimate`} min="0" max="50" name="estimate" onChange={changeFn} type="number" value={item.estimate} />
      </div>

      <div className="formField">
        <label for="description">Description</label>
        <textarea id="description" data-id={item.id} key={`${item.id}-description`} name="description" onKeyup={changeFn}>{item.description || ""}</textarea>
      </div>
    </fragment>
  )
}

export default Details

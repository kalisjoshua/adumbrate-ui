import {h, Component} from "preact";

import "./App.css";
import Tree from "./Tree"
import Info from "./Info"

import decorate from "../lib/decorate"
import data from "../lib/data"
import {draggableElement} from "../lib/draggable"
import {isDescendent} from "../lib/util"

// TODO:
//    - edit screen
//        + title and description
//        + labels/tags
//        + additional properties
//    - display/enter estimates

function keyUp (context, inputEl, {which}) {
  which === 13 && context.add(inputEl)
}

class component extends Component {
  constructor (props) {
    super(props)

    this.dragProps = draggableElement(Object.create(null, {}), {
      callback: this.dropHandler.bind(this),
      store: {},
    })

    this.inputEl = null

    this.registry = {}

    this.state.data = decorate(data)
    this.state.data.listen(({context, event}) => {
      this.setState({data: context})
    })
  }

  add (input) {
    if (input.value) {
      this.state.data.add({title: input.value})
    }

    input.value = ""
  }

  dropHandler (source, target, pos) {
    // Check for dragging a parent onto a child to prevent
    // infinite looping, worm holes, and tearing the space time continuum!
    if (isDescendent(source.parentNode, target.parentNode)) {
      alert("Will not rip space time!")
    } else {
      const src = this.registry[source.dataset.id]
      const tgt = this.registry[target.dataset.id]

      tgt.add(src.remove(), pos === "sibling")
    }
  }

  render () {
    let inputEl

    return (
      <section className="App">
        <header className="App-header">
          <div className="conatiner">
            <h1 className="App-title">Adumbrate</h1>
          </div>
        </header>
        <main>
          <div className="conatiner">
            <div className="addEpic">
              <input onKeyup={(e) => keyUp(this, inputEl, e)} ref={(ref) => inputEl = ref} />
              <button onClick={() => this.add(inputEl)}>Add Item</button>
            </div>
            {!data.tree.length
              ? (<Info />)
              : (<Tree
                  data={data}
                  drag={this.dragProps}
                  register={(node) => this.registry[node.id] = node}
                  />)}
          </div>
        </main>
      </section>
    )
  }
}

export default component;

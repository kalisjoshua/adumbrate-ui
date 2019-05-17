import {h, Component} from "preact";

import "./App.css";
import Tree from "./Tree"

import decorate from "../lib/decorate"
import data from "../lib/data"
import {draggableElement} from "../lib/draggable"
import {isDescendent} from "../lib/util"

class component extends Component {
  constructor (props) {
    super(props)

    this.dragProps = draggableElement(Object.create(null, {}), {
      callback: this.dropHandler.bind(this),
      store: {},
    })

    this.registry = {}

    this.state.data = decorate(data)
    this.state.data.listen(({context, event}) => {
      this.setState({data: context})
    })
  }

  dropHandler (source, target, pos) {
    // Check for dragging a parent onto a child to prevent
    // infinite looping, worm holes, and tearing the space time continuum!
    if (isDescendent(source, target)) {
      alert("Will not rip space time!")
    } else {
      const src = this.registry[source.dataset.id]
      const tgt = this.registry[target.dataset.id]

      tgt.add(src.remove(), pos === "sibling")
    }
  }

  register (node) {
    this.registry[node.id] = node
  }

  render () {

    return (
      <section className="App">
        <header className="App-header">
          <div className="conatiner">
            <h1 className="App-title">Adumbrate</h1>
          </div>
        </header>
        <main>
          <div className="conatiner">
            {/*<p className="App-intro">Easily break down and estimate work.</p>*/}
            <Tree
              data={this.state.data}
              drag={this.dragProps}
              register={this.register.bind(this)}
              />
          </div>
        </main>
      </section>
    )
  }
}

export default component;

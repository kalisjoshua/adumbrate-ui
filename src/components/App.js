import {h, Component} from "preact";

import "./App.css";
import Tree from "./Tree"
import Info from "./Info"

import decorate from "../lib/decorate"
import dataLib, {testData} from "../lib/data"
import {draggableElement} from "../lib/draggable"
import {isDescendent} from "../lib/util"

// TODO:
//    - fix bug with moving collapsed elements
//    - edit screen
//        + title and description
//        + labels/tags
//        + additional properties
//    - prevent adding an estimate to a parent node with aggregate
//    - display estimate separate from aggregate
//    - add/edit (admin) general schema for items

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

    this.state.data = decorate(dataLib.read())
    this.state.data.listen(({context, event}) => {
      dataLib.update(context)
      this.setState({data: context})
    })

    this.testData = () => {
      this.initializeData(dataLib.update(testData))
    }
    this.emptyData = () => {
      this.initializeData(dataLib.update())
    }
  }

  add (input) {
    if (input.value) {
      this.state.data.add({title: input.value})
    }

    input.value = ""
  }

  dropHandler (source, target) {
    // Check for dragging a parent onto a child to prevent
    // infinite looping, worm holes, and tearing the space time continuum!
    if (isDescendent(source.parentNode, target.parentNode) || source.parentNode === target.parentNode) {
      alert("Will not rip space time!")
      target.classList.remove("isHovered")
    } else {
      const src = this.registry[source.dataset.id]
      const tgt = this.registry[target.dataset.id]
      const [pos] = target
        .getAttribute("class")
        .match(/drop-([^\s]+)/)
        .slice(1)

      tgt.add(src.remove(), pos === "sibling")
    }
  }

  initializeData (data) {
    this.setState({data: decorate(data)}, () => {
      this.state.data.listen(({context, event}) => {
        dataLib.update(context)
        this.setState({data: context})
      })
    })
  }

  render () {
    let inputEl

    return (
      <section className="App">
        <header className="App-header">
          <div className="container">
            <h1 className="App-title">Adumbrate</h1>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="addEpic">
              <input onKeyup={(e) => keyUp(this, inputEl, e)} ref={(ref) => inputEl = ref} />
              <button onClick={() => this.add(inputEl)}>Add Item</button>
            </div>
            {!this.state.data.tree.length
              ? (<Info />)
              : (<Tree
                  data={this.state.data}
                  drag={this.dragProps}
                  register={(node) => this.registry[node.id] = node} />)}
          </div>
        </main>

        <footer>
          <div className="container">
            <ul className="dataLinks">
              <li><span className="link-like" onClick={this.testData}>Load testing data</span></li>
              <li><span className="link-like" onClick={this.emptyData}>Empty localStorage</span></li>
            </ul>
          </div>
        </footer>
      </section>
    )
  }
}

export default component;

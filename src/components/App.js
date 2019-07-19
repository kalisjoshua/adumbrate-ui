import {h, Component} from "preact";

import "./App.css";
import Info from "./Info"
import Item from "./Item"
import Tree from "./Tree"

import decorate from "../lib/decorate"
import dataLib, {testData} from "../lib/data"
import {draggableElement} from "../lib/draggable"
import isDescendent from "../lib/isDescendent"

// TODO:
//    - integrate persistence of some kind; e.g. firebase
//    - add/edit (admin) general schema for items

function AddItem ({fn}) {
  const attrs = {
    className: "addItem",
    onKeyup({target, which}) {
      if (which === 13) {
        fn(target.value)
        target.value = ""
        setTimeout(() => {document.querySelector(`.${attrs.className}`).focus()}, 1)
      }
    },
    placeholder: "Add Item",
  }

  return (
    <input {...attrs} />
  )
}

class component extends Component {
  constructor (props) {
    super(props)

    this.dragProps = draggableElement(Object.create(null, {}), {
      callback: this.dropHandler.bind(this),
      store: {},
    })

    this.listener = this.listener.bind(this)

    this.registry = {}

    this.state.data = decorate(dataLib.read())
    this.state.data.listen(this.listener)

    this.testData = () => {
      this.initializeData(dataLib.update(testData))
    }
    this.emptyData = () => {
      this.initializeData(dataLib.update())
    }
  }

  dropHandler (source, target, position) {
    // Check for dragging a parent onto a child to prevent:
    //   - infinite looping,
    //   - worm holes, and
    //   - tearing of the space time continuum!
    if (isDescendent(source.parentNode, target.parentNode) || source.parentNode === target.parentNode) {
      alert("Will not rip space time!")
      target.classList.remove("isHovered")
    } else {
      this.registry[target.dataset.id]
        .add(this.registry[source.dataset.id], position)
    }
  }

  initializeData (data) {
    this.setState({data: decorate(data)}, () => {
      this.state.data.listen(this.listener)
    })
  }

  itemSelect (node) {
    const selector = "selected"

    const currentElement = document.querySelector(`.${selector}`)
    const nextElement = document.querySelector(`[data-id="${node.id}"]`)

    if (currentElement === nextElement) {
      currentElement.classList.toggle(selector)
    } else {
      currentElement && currentElement.classList.remove(selector)
      nextElement.classList.add(selector)
    }

    this.setState({
      selected: (this.state.selected || {}).id === node.id
        ? null
        : node
    })
  }

  itemUpdate ({dataset: {id}, name, value}) {
    this.registry[id][name] = value
    this.setState(this.state.data)
  }

  listener ({context, event}) {
    dataLib.update(context)
    this.setState({data: context})
  }

  render () {
    const item = this.registry[(this.state.selected || {}).id]

    const columns = this.state.selected
      ? "app-columns__two"
      : "app-columns__one"

    return (
      <section className="App">
        <header className="App-header">
          <div className="container">
            <h1 className="App-title">Adumbrate</h1>
          </div>
        </header>

        <main className="container">
          <div className={columns}>
            <div className="app--main">
              {!this.state.data.tree.length
                ? (<Info />)
                : (<Tree
                    data={this.state.data}
                    drag={this.dragProps}
                    register={(node) => this.registry[node.id] = node}
                    select={(e) => this.itemSelect(e)} />)}

              <AddItem fn={(title) => {this.state.data.add({title})}} />
            </div>

            <div className="app--info">
              <Item item={item} update={this.itemUpdate.bind(this)} />
            </div>
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

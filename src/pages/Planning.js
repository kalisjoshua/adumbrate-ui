import {h, Component} from "preact";

import "./Planning.css";
import Details from "../components/Details"
import Layout from "../components/Layout"
import Tree from "../components/Tree"

import decorate from "../lib/decorate"
import dataLib, {testData} from "../lib/data"
import {draggableElement} from "../lib/draggable"
import isRelated from "../lib/isRelated"

// TODO:
//    - integrate persistence of some kind; e.g. firebase
//    - add/edit (admin) general schema for items; additional fields to show in Details section
//    - persist selected between page refresh using window.location.hash
//    - collapse hierarchies; keep in mind displaying persisted selected items

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

class Planning extends Component {
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
    if (isRelated(source.parentNode, target.parentNode)) {
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
      <Layout className="app-container-fluid">
        <div className={columns}>
          <div className="planning--tree">
            {!this.state.data.tree.length
              ? null
              : (<Tree
                  data={this.state.data}
                  drag={this.dragProps}
                  register={(node) => this.registry[node.id] = node}
                  select={(e) => this.itemSelect(e)} />)}

            <AddItem fn={(title) => {this.state.data.add({title})}} />
          </div>

          <div className="planning--details">
            <Details item={item} update={this.itemUpdate.bind(this)} />
          </div>
        </div>

        <div className="planning-footer">
          <div className="container">
            <ul className="dataLinks">
              <li><span className="link-like" onClick={this.testData}>Load testing data</span></li>
              <li><span className="link-like" onClick={this.emptyData}>Empty localStorage</span></li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Planning;

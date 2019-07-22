import {h, Component} from "preact";

import "./Planning.css";
import Details from "../components/Details"
import Layout from "../components/Layout"
import Tree from "../components/Tree"

import dataLib, {testData} from "../lib/data"
import {draggableElement} from "../lib/draggable"
import isRelated from "../lib/isRelated"

// TODO:
//    - integrate persistence of some kind; e.g. firebase
//    - add/edit (admin) general schema for items; additional fields to show in Details section
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

    this.state.data = dataLib.read()
    this.state.data.listen(this.listener)

    if (window.location.hash) {
      const id = window.location.hash.slice(1)

      this.registry[id] = this.state.selected = dataLib.lookup(id)
    }
  }

  dropHandler (source, target, position) {
    // Check for dragging a parent onto itself or a child
    if (source.parentNode === target.parentNode) {
      // do nothing!
    } else if (isRelated(source.parentNode, target.parentNode)) {
      alert("Attempting to tear spacetime is not going to be tollerated!")
    } else {
      this.registry[target.dataset.id]
        .add(this.registry[source.dataset.id], position)
    }
  }

  itemSelect (node) {
    const {hash} = window.location

    window.location.hash = (!hash || hash !== `#${node.id}`)
      ? `${node.id}`
      : ''

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

  loadData (data) {
    this.setState({data: dataLib.update(data)}, () => {
      this.state.data.listen(this.listener)
    })
  }

  render () {
    const columns = `app-columns__${this.state.selected ? "two" : "one"}`
    const item = this.registry[(this.state.selected || {}).id]

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
                  select={(e) => this.itemSelect(e)}
                  selected={this.state.selected || {}} />)}

            <AddItem fn={(title) => {this.state.data.add({title})}} />
          </div>

          <div className="planning--details">
            <Details item={item} update={this.itemUpdate.bind(this)} />
          </div>
        </div>

        <div className="planning-footer">
          <div className="container">
            <ul className="dataLinks">
              <li><span className="link-like" onClick={() => this.loadData(testData)}>Load testing data</span></li>
              <li><span className="link-like" onClick={() => this.loadData({})}>Empty localStorage</span></li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Planning;

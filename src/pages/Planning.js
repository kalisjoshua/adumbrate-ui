import {h, Component} from "preact";

import "./Planning.css";
import Details from "../components/Details"
import Layout from "../components/Layout"
import Tree from "../components/Tree"

import dataLib, {testData} from "../lib/data"
import {draggableElement} from "../lib/draggable"
import isRelated from "../lib/isRelated"

// TODO:
//    - integrate persistence of some kind; e.g. firebase, OR GitHub Projects :D
//    - add/edit (admin) general schema for items; additional fields to show in Details section
//    - collapse hierarchies; keep in mind displaying persisted selected items

class Planning extends Component {
  constructor (props) {
    super(props)

    this.dragProps = draggableElement(Object.create(null, {}), {
      callback: this.dropHandler.bind(this),
      store: {},
    })

    this.addItem = this.addItem.bind(this)
    this.listener = this.listener.bind(this)

    this.state.data = dataLib.read()
    this.state.data.listen(this.listener)

    if (window.location.hash) {
      this.state.selected = dataLib.lookup(window.location.hash.slice(1))
    }
  }

  addItem ({target, which}) {
    if (which === 13) {
      this.state.data.add({title: target.value})
      target.value = ""
    }
  }

  dropHandler (source, target, position) {
    // Check for dragging a parent onto itself or a child
    if (source.parentNode === target.parentNode) {
      // do nothing!
    } else if (isRelated(source.parentNode, target.parentNode)) {
      alert("Attempting to tear spacetime is not going to be tollerated!")
    } else {
      dataLib.lookup(target.dataset.id)
        .add(dataLib.lookup(source.dataset.id), position)
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
    dataLib.lookup(id)[name] = value
    this.setState(this.state.data)
  }

  listener ({context, event}) {
    const data = dataLib.update(context)

    const selectedId = this.selectedId()
    const isOrphaned = !dataLib.lookup(selectedId)
    const isViewing = window.location.hash.slice(1) === selectedId

    const selected = isViewing && isOrphaned
      ? null
      : this.state.selected

    this.setState({data, selected}, (...args) => {
      // this.state.data is a new instance of the tree so this.listener needs to
      // be re-registered in order for things to continue working
      this.state.data.listen(this.listener)
    })
  }

  loadData (data) {
    this.setState({data: dataLib.update(data)}, () => {
      this.state.data.listen(this.listener)
    })
  }

  selectedId () {

    return (this.state.selected || {}).id
  }

  render () {
    const selectedItem = dataLib.lookup(this.selectedId())

    return (
      <Layout className="app-container-fluid">
        <div className={`app-columns__${selectedItem ? "two" : "one"}`}>
          <div className="planning--tree">
            {!this.state.data.tree.length
              ? null
              : (<Tree
                  data={this.state.data}
                  drag={this.dragProps}
                  isSelected={({id}) => id === (selectedItem || {}).id}
                  select={(e) => this.itemSelect(e)} />)}

            <input className="addItem" onKeyup={this.addItem} placeholder="Add Item" />
          </div>

          <div className="planning--details">
            <Details item={selectedItem} update={this.itemUpdate.bind(this)} />
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

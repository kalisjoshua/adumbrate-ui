import {h, Component} from "preact";

import "./App.css";
import Tree from "./Tree"

import decorate from "../lib/decorate"
import data from "../lib/data"

class component extends Component {
  constructor (props) {
    super(props)
    this.state.data = decorate(data)
    this.state.data.listen(({context, event}) => {
      this.setState({data: context})
    })
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
            <Tree data={this.state.data} />
          </div>
        </main>
      </section>
    )
  }
}

export default component;

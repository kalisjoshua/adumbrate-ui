import { h } from 'preact';

import './App.css';
import Tree from "./Tree"

function component() {

  return (
    <section className="App">
      <header className="App-header">
        <div class="conatiner">
          <h1 className="App-title">Adumbrate</h1>
        </div>
      </header>
      <main>
        <div class="conatiner">
          {/*<p className="App-intro">Easily break down and estimate work.</p>*/}
          <Tree />
        </div>
      </main>
    </section>
  )
}

export default component;

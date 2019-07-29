import {h, render} from "preact"

import "./index.css"

import About from "./pages/About"
import Planning from "./pages/Planning"

import registerServiceWorker from "./registerServiceWorker"

let root

const routing = {
  "/about": About,
  "/planning": Planning,
}

const Page = routing[window.location.pathname] || routing["/about"]

function init() {
  root = render(<Page />, document.body, root)
}

init()
registerServiceWorker()

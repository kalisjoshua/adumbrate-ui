import {h, render} from "preact"

import "./index.css"

import About from "./pages/About"
import Planning from "./pages/Planning"

import registerServiceWorker from "./registerServiceWorker"

const routing = {
  "/about": About,
  "/planning": Planning,
}

const Page = routing[window.location.pathname] || routing["/about"]

render(<Page />, document.getElementById("root"))
registerServiceWorker()

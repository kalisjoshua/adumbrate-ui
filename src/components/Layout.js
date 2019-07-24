import {h} from "preact";

import "./Layout.css"

function Layout ({children, className}) {
  className = className || "app-container-content"

  return (
    <section>
      <header className="app-header">
        <div className={className}>
          <ul className="app-menu">
            <li><a href="/about">About</a></li>
            <li><a href="/planning">Planning</a></li>
            <li><strong title="A tool for planning work.">Adumbrate</strong></li>
          </ul>
        </div>
      </header>

      <main className={`app-main ${className}`}>
        {children}
      </main>
    </section>
  )
}

export default Layout

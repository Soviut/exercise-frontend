import React from 'react'

import HomePage from './pages'

export default () => {
  return (
    <div>
      <header>
        <nav>
          <a href="/">
            Vice
          </a>
        </nav>
      </header>

      <main className="container mx-auto">
        <HomePage />
      </main>
    </div>
  )
}

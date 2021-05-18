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

      <div className="container mx-auto">
        <HomePage />
      </div>
    </div>
  )
}

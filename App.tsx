import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import GalleryPage from './pages/gallery'

export default () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            {/* TODO: put branding and nav here */}
          </nav>
        </header>

        <main className="container mx-auto">
          <Switch>
            <Route exact path="/">
              <Redirect to="/gallery" />
            </Route>

            <Route path="/gallery/:id?">
              <GalleryPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

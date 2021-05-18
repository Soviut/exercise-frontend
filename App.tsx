import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import ShowsPage from './pages/shows'

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <header>
          <nav>{/* TODO: put branding and nav here */}</nav>
        </header>

        <main className="container mx-auto">
          <Switch>
            <Route exact path="/">
              <Redirect to="/gallery" />
            </Route>

            <Route path="/gallery/:id?">
              <ShowsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

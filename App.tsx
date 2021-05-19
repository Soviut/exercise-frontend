import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ShowsPage from './pages/shows'

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/">
              <ShowsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

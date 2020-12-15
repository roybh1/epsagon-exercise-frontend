import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Main from './components/Main'
export default props => (
    <Router>
      <Switch>
        <Route exact path='/' component={ Main } />
      </Switch>
    </Router>
  )
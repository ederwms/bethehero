import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/public/Logon'
import Register from './pages/public/Register'
import Profile from './pages/private/Profile'
import NewIncident from './pages/private/NewIncident'

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Logon } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ Profile } />
        <Route path="/incidents/new" component={ NewIncident } />
      </Switch>
    </BrowserRouter>
  )
}
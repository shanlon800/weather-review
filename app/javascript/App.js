import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import CitiesIndexContainer from './containers/CitiesIndexContainer'

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={CitiesIndexContainer} />
      </Router>
    </div>
  )
}

export default App;

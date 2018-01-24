import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import CitiesIndexContainer from './containers/CitiesIndexContainer'
import CityShowContainer from './containers/CityShowContainer'

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={CitiesIndexContainer} />
        <Route path='/cities' component={CitiesIndexContainer} />
        <Route path='/cities/:id' component={CityShowContainer} />
      </Router>
    </div>
  )
}

export default App;

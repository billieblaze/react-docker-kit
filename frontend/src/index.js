import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


render(
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>,
  document.getElementById('root')
)

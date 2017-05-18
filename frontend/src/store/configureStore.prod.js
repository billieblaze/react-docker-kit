import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import startSocket, {socketMiddleware} from '../middleware/socket'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api, socketMiddleware)
)

export default configureStore

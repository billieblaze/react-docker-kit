import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'


// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})


// my reducers
import {CONNECT_MESSAGE, DISCONNECT_MESSAGE, INCOMING_MESSAGE} from '../actions'


  function messages(state=[], action) {
    const messages = state.map(message => Object.assign({}, message));

    switch(action.type) {
      //case CONNECT_MESSAGE:

      case INCOMING_MESSAGE:
        messages.push(action.message);
        break;
    }

    return messages;
  }

  function currentMessage(currentMessage="", action) {
    switch(action.type) {
      case CONNECT_MESSAGE:
        return action.message;
      case INCOMING_MESSAGE:
        return action.message;
      default:
        return currentMessage;
    }
  }



const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  routing,
  messages,
  currentMessage
})

export default rootReducer

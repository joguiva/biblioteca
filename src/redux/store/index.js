import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import login from '../ducks/login'
import members from '../ducks/members'
import memberDetails from '../ducks/memberDetails'
import books from '../ducks/books'
import bookDetails from '../ducks/bookDetails'

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const rootReducer = combineReducers({
  login,
  members,
  memberDetails,
  books,
  bookDetails
})

export default createStore(rootReducer, {}, enhancer)

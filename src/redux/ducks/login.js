import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
export const LOGIN_BEGIN = 'login/LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE'
export const CLOSE_SESSION = 'login/CLOSE_SESSION'

// InitialState
const initialState = {
  loggedUser: null,
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loggedUser: null,
        error: null,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedUser: action.loggedUser,
        loading: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loggedUser: null,
        loading: false,
        error: action.error
      }
    case CLOSE_SESSION:
      return {
        ...state,
        loggedUser: null
      }
    default:
      return state
  }
}

// Action Creators
export const closeSession = () => ({
  type: CLOSE_SESSION
})

export const loginBegin = () => ({
  type: LOGIN_BEGIN
})

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  loggedUser: user
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error
})

// Thunks
export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(loginBegin())

    const response = await axios.get(makeUrl(`users?username=${username}&password=${password}`))
    if (response.data.length === 0) {
      throw new Error('Incorrect username or password')
    }

    const loggedUser = response.data[0]
    loggedUser.loggedAt = new Date()
    dispatch(loginSuccess(loggedUser))
    return true
  } catch (error) {
    dispatch(loginFailure(error))
    return false
  }
}

export const logout = () => (dispatch, getState) => {
  dispatch(closeSession())
}

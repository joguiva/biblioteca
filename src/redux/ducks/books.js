import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const FETCH_BOOKS_BEGIN = 'books/FETCH_BOOKS_BEGIN'
const FETCH_BOOKS_SUCCESS = 'books/FETCH_BOOKS_SUCCESS'
const FETCH_BOOKS_FAILURE = 'books/FETCH_BOOKS_FAILURE'

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      }
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN
})

export const fetchBooksSuccess = (list) => ({
  type: FETCH_BOOKS_SUCCESS,
  list
})

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  error
})

// Thunks
export const fetchBooks = () => async (dispatch, getState) => {
  try {
    dispatch(fetchBooksBegin())

    const response = await axios.get(makeUrl('books'))
    dispatch(fetchBooksSuccess(response.data))
  } catch (error) {
    fetchBooksFailure(error)
  }
}

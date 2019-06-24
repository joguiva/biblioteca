import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const FETCH_BOOK_DETAILS_BEGIN = 'details/FETCH_BOOK_DETAILS_BEGIN'
const FETCH_BOOK_DETAILS_SUCCESS = 'details/FETCH_BOOK_DETAILS_SUCCESS'
const FETCH_BOOK_DETAILS_FAILURE = 'details/FETCH_BOOK_DETAILS_FAILURE'

// Initial State
const initialState = {
  book: null,
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOK_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.book
      }
    case FETCH_BOOK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        book: null,
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const fetchBookDetailsBegin = () => ({
  type: FETCH_BOOK_DETAILS_BEGIN
})

export const fetchBookDetailsSuccess = (book) => ({
  type: FETCH_BOOK_DETAILS_SUCCESS,
  book
})

export const fetchBookDetailsFailure = (error) => ({
  type: FETCH_BOOK_DETAILS_FAILURE,
  error
})

// Thunks
export const fetchBookDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchBookDetailsBegin())

    const response = await axios.get(makeUrl(`books/${id}`))
    const book = response.data

    dispatch(fetchBookDetailsSuccess(book))
  } catch (error) {
    fetchBookDetailsFailure(error)
  }
}

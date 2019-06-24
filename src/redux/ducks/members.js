import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const FETCH_MEMBERS_BEGIN = 'members/FETCH_MEMBERS_BEGIN'
const FETCH_MEMBERS_SUCCESS = 'members/FETCH_MEMBERS_SUCCESS'
const FETCH_MEMBERS_FAILURE = 'members/FETCH_MEMBERS_FAILURE'

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_MEMBERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      }
    case FETCH_MEMBERS_FAILURE:
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
export const fetchMembersBegin = () => ({
  type: FETCH_MEMBERS_BEGIN
})

export const fetchMembersSuccess = (list) => ({
  type: FETCH_MEMBERS_SUCCESS,
  list
})

export const fetchMembersFailure = (error) => ({
  type: FETCH_MEMBERS_FAILURE,
  error
})

// Thunks
export const fetchMembers = () => async (dispatch, getState) => {
  try {
    dispatch(fetchMembersBegin())

    const response = await axios.get(makeUrl('members'))
    dispatch(fetchMembersSuccess(response.data))
  } catch (error) {
    fetchMembersFailure(error)
  }
}

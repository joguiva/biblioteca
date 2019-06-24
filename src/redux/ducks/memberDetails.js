import axios from 'axios'
import { makeUrl } from '../../services'

// Action Types
const FETCH_MEMBER_DETAILS_BEGIN = 'details/FETCH_MEMBER_DETAILS_BEGIN'
const FETCH_MEMBER_DETAILS_SUCCESS = 'details/FETCH_MEMBER_DETAILS_SUCCESS'
const FETCH_MEMBER_DETAILS_FAILURE = 'details/FETCH_MEMBER_DETAILS_FAILURE'

// Initial State
const initialState = {
  member: null,
  loading: false,
  error: null
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_MEMBER_DETAILS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_MEMBER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        member: action.member
      }
    case FETCH_MEMBER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        member: null,
        error: action.error
      }
    default:
      return state
  }
}

// Action Creators
export const fetchMemberDetailsBegin = () => ({
  type: FETCH_MEMBER_DETAILS_BEGIN
})

export const fetchMemberDetailsSuccess = (member) => ({
  type: FETCH_MEMBER_DETAILS_SUCCESS,
  member
})

export const fetchMemberDetailsFailure = (error) => ({
  type: FETCH_MEMBER_DETAILS_FAILURE,
  error
})

// Thunks
export const fetchMemberDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchMemberDetailsBegin())
    
    const response = await axios.get(makeUrl(`members/${id}`))
    const member = response.data

    dispatch(fetchMemberDetailsSuccess(member))
  } catch (error) {
    fetchMemberDetailsFailure(error)
  }
}

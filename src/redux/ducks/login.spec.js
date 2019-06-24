import { login, LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './login'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureMockStore([thunk])

describe('Login', () => {
  describe('Async Action Creators', () => {
    beforeEach(() => {
      moxios.install()
    })

    afterEach(() => {
      moxios.uninstall()
    })

    it('Should emit LOGIN_SUCCESS action', async () => {
      const user = {
        username: 'admin',
        password: 'admin'
      }

      const expectedActions = [{
        type: LOGIN_BEGIN
      }, {
        type: LOGIN_SUCCESS,
        loggedUser: user
      }]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [ user ]
        })
      })

      const store = mockStore()
      const loggedIn = await store.dispatch(login('admin', 'admin'))
      expect(loggedIn).toBe(true)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('Should emit LOGIN_FAILURE action', async () => {
      const expectedActions = [{
        type: LOGIN_BEGIN
      }, {
        type: LOGIN_FAILURE,
        error: new Error('Incorrect username or password')
      }]

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: []
        })
      })

      const store = mockStore()
      const loggedIn = await store.dispatch(login('admin', '123'))
      expect(loggedIn).toBe(false)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

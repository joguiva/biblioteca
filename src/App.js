import React from 'react'
import PropTypes from 'prop-types'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import './App.css'
import { connect } from 'react-redux'

// Import Components
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import BorrowsComponent from './components/Borrows'
import MembersList from './components/MembersList'
import MemberDetails from './components/MemberDetails'
import BooksList from './components/BooksList'
import BookDetails from './components/BookDetails'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    success: '#62fe4b',
    main: '#00ca00',
    dark: '#009800'
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedUser: null,
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    const { hasLogged } = this.props
    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <Route path='/' exact component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/members' component={MembersList} />
          <Route path='/member/:id' component={MemberDetails} />
          <Route path='/books' component={BooksList} />
          <Route path='/book/:id' component={BookDetails} />

          {
            hasLogged
              ? <Redirect push to='/' />
              : <Redirect push to='/login' />
          }
        </MuiThemeProvider>
      </HashRouter>
    )
  }
}

App.propTypes = {
  loggedUser: PropTypes.object
}

const mapStateToProps = state => ({
  hasLogged: state.login.loggedUser
})

export default connect(mapStateToProps)(App)

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppStyles from '../../jss/AppStyles'
import { Grid, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fetchMembers } from '../../redux/ducks/members'
import MemberItem from './MemberItem'

const styles = theme => ({
  ...AppStyles(theme)
})

class MemberList extends React.Component {
  componentDidMount () {
    this.props.fetchMembers()
    this.props.fetchBooks()
  }

  render () {
    const { members, loadingM, classes } = this.props
    const list = members.map(p =>
      <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
        <MemberItem id={p.id} name={p.name} surname={p.surname} create={p.create} hist={p.historical} actual={p.actual} />
      </Grid>
    )
    return (
      <Grid container spacing={16} className={classes.container}>
        {!loadingM ? list : <CircularProgress className={classes.loading} />}
      </Grid>
    )
  }
}

MemberList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  members: state.members.list,
  loadingM: state.members.loading
})

const mapDispatchToProps = {
  fetchMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MemberList))

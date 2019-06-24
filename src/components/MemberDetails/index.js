import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import AppStyles from '../../jss/AppStyles'
import { Paper, Typography, CircularProgress, Grid, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fetchMemberDetails } from '../../redux/ducks/memberDetails'

const styles = theme => ({
  ...AppStyles(theme)
})

class MemberDetails extends React.Component {
  componentDidMount () {
    this.props.fetchMemberDetails(this.props.match.params.id)
  }

  render () {
    const { member, loading, classes } = this.props

    const body = member
      ? <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant='h4'>{member.surname}, {member.name}</Typography>
          <Divider />
          <Typography variant='h5' color='textSecondary'>Datos</Typography>
          <Typography variant='body1'>
            <strong>Miembro desde:</strong> {member.create}
          </Typography>
          <Typography variant='body1'>
            <strong>Total de Libros consultados:</strong> {member.historical}
          </Typography>
          <Typography variant='body1'>
            <strong>Libros prestados:</strong>
          </Typography>
        </Grid>
      </Paper>
      : <Typography variant='body1' color='error'>
        No se pudo cargar la información solicitada
      </Typography>

    return (
      <div className={classes.container}>
        {
          loading
            ? <CircularProgress />
            : body
        }
      </div>
    )
  }
}

MemberDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  member: state.memberDetails.member,
  loading: state.memberDetails.loading,
  error: state.memberDetails.error
})

const mapDispatchToProps = {
  fetchMemberDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(MemberDetails)))

import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  title: {
    flexGrow: 1
  }
})

const MemberItem = ({ id, name, surname }) => (
  <Typography component={Link} to={`/member/${id}`} variant='body1'>
    {surname}, {name}
  </Typography>
)

MemberItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(MemberItem)

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AppStyles from '../../jss/AppStyles'

const styles = theme => ({
  ...AppStyles(theme),
  card: {
    minWidth: '275',
    marginBottom: '20'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: '14'
  },
  pos: {
    marginBottom: '12'
  }
})

const Dashboard = ({ classes }) => (

  <div>
    <Card className={classes.name}>
      <CardContent component={Link} to='/members'>
        <Typography variant='h5' component='h2' >
          ASOCIADOS
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          Consulta de asociados
        </Typography>
      </CardContent>
    </Card>
    <Card className={classes.name}>
      <CardContent component={Link} to='/books'>
        <Typography variant='h5' component='h2' >
          LIBROS
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          Consulta de libros
        </Typography>
      </CardContent>
    </Card>
  </div>
)

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import AppStyles from '../../jss/AppStyles'
import { Paper, Typography, CircularProgress, Grid, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fetchBookDetails } from '../../redux/ducks/bookDetails'

const styles = theme => ({
  ...AppStyles(theme)
})

class BookDetails extends React.Component {
  componentDidMount () {
    this.props.fetchBookDetails(this.props.match.params.id)
    console.log(this.props.match)
  }

  render () {
    const { book, loading, classes } = this.props

    const body = book
      ? <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img src={book.img} alt={book.title} className={classes.image} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h4'>{book.title}</Typography>
            <Divider />
            <Typography variant='h5' color='textSecondary'>Datos</Typography>
            <Typography variant='body1'>
              <strong>Autor:</strong> {book.author}
            </Typography>
            <Typography variant='body1'>
              <strong>Año de publicación:</strong> {book.year}
            </Typography>
            <Typography variant='body1'>
              <strong>Cantidad disponibles:</strong> {book.quantity}
            </Typography>
            <Typography variant='body1'>
              <strong>Ubicación:</strong> {book.location}
            </Typography>
            <Typography variant='body1'>
              <strong>Sinopsis:</strong> {book.synopsis}
            </Typography>
          </Grid>
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

BookDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  book: state.bookDetails.book,
  loading: state.bookDetails.loading,
  error: state.bookDetails.error
})

const mapDispatchToProps = {
  fetchBookDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BookDetails)))

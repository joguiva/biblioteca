import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppStyles from '../../jss/AppStyles'
import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fetchBooks } from '../../redux/ducks/books'
import { Link } from 'react-router-dom'
// import BookItem from './BookItem'

const styles = theme => ({
  ...AppStyles(theme)
})

class BooksList extends React.Component {
  componentDidMount () {
    this.props.fetchBooks()
  }

  render () {
    const { books, loading, classes } = this.props
    const list = books.map(p =>
      <TableRow key={p.title}>
        <TableCell component='th' scope='row'>
          <Typography component={Link} to={`/book/${p.id}`}>{p.title}</Typography>
        </TableCell>
        <TableCell>{p.author}</TableCell>
        <TableCell>{p.editorial}</TableCell>
        <TableCell>{p.year}</TableCell>
      </TableRow>
    )
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Libro</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Editorial</TableCell>
              <TableCell>Año</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? list : <CircularProgress className={classes.loading} />}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

BooksList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  books: state.books.list,
  loading: state.books.loading
})

const mapDispatchToProps = {
  fetchBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooksList))

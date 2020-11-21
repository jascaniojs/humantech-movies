import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { parse, format } from 'date-fns';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    '&:focus': {
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      color: theme.palette.warning.light,
    },
    '&$active': {
      color: theme.palette.warning.main,
      // && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
    },
  },
  active: { color: theme.palette.warning.main },
}))(TableSortLabel);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, orderBy) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    if (orderBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const CustomTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, headers = [] } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  console.log(headers);
  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.right ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              classes={{
                active: classes.active,
              }}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell align='right' colSpan={3}>
          {' '}
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

CustomTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const MoviesIcons = ({ row, handleLock, editMovie, deleteMovie }) => (
  <StyledTableCell align='right'>
    <IconButton
      disabled={row.lock}
      onClick={() => editMovie(row)}
      aria-label='edit'
    >
      <EditIcon />
    </IconButton>
    <IconButton disabled={row.lock} aria-label='menu'>
      <MenuIcon />
    </IconButton>
    <IconButton onClick={() => handleLock(!row.lock, row.id)} aria-label='lock'>
      {row.lock ? <LockIcon /> : <LockOpenIcon />}
    </IconButton>
    <IconButton
      disabled={row.lock}
      onClick={() => deleteMovie(row.id)}
      aria-label='delete'
    >
      <DeleteIcon />
    </IconButton>
  </StyledTableCell>
);

const MoviesBody = ({
  order,
  orderBy,
  rows,
  handleLock,
  editMovie,
  deleteMovie,
}) => {
  return (
    <>
      {stableSort(rows, getComparator(order, orderBy), orderBy).map(
        (row, index) => {
          return (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.fecha}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.estado ? 'Activo' : 'Desactivado'}
              </StyledTableCell>
              <MoviesIcons
                row={row}
                handleLock={handleLock}
                editMovie={editMovie}
                deleteMovie={deleteMovie}
              />
            </StyledTableRow>
          );
        }
      )}
    </>
  );
};

const TurnsIcons = ({ row, handleLock, editTurn, deleteTurn }) => (
  <StyledTableCell align='right'>
    <IconButton
      disabled={row.lock}
      onClick={() => editTurn(row)}
      aria-label='edit'
    >
      <EditIcon />
    </IconButton>
    <IconButton onClick={() => handleLock(!row.lock, row.id)} aria-label='lock'>
      {row.lock ? <LockIcon /> : <LockOpenIcon />}
    </IconButton>
    <IconButton
      disabled={row.lock}
      onClick={() => deleteTurn(row.id)}
      aria-label='delete'
    >
      <DeleteIcon />
    </IconButton>
  </StyledTableCell>
);

const TurnsBody = ({
  order,
  orderBy,
  rows,
  handleLock,
  editTurn,
  deleteTurn,
}) => {
  return (
    <>
      {stableSort(rows, getComparator(order, orderBy), orderBy).map(
        (row, index) => {
          const hora = format(
            parse(row.hora, 'HH:mm:ss.SSS', new Date()),
            'HH:mm',
            new Date()
          );
          return (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell component='th'>{hora}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.estado ? 'Activo' : 'Desactivado'}
              </StyledTableCell>
              <TurnsIcons
                row={row}
                handleLock={handleLock}
                editTurn={editTurn}
                deleteTurn={deleteTurn}
              />
            </StyledTableRow>
          );
        }
      )}
    </>
  );
};

const CustomTable = (props) => {
  const classes = useStyles();
  const {
    data,
    editMovie,
    handleLockM,
    handleLockT,
    headers,
    movies,
    editTurn,
    deleteMovie,
    deleteTurn,
  } = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  console.log(data);

  return (
    <TableContainer style={{ marginTop: 32 }} component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <CustomTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headers={headers}
        />
        <TableBody>
          {movies ? (
            <MoviesBody
              rows={data}
              order={order}
              orderBy={orderBy}
              handleLock={handleLockM}
              editMovie={editMovie}
              deleteMovie={deleteMovie}
            />
          ) : (
            <TurnsBody
              rows={data}
              order={order}
              orderBy={orderBy}
              handleLock={handleLockT}
              editTurn={editTurn}
              deleteTurn={deleteTurn}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
/*
   <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align='right'>F. Publicación</StyledTableCell>
            <StyledTableCell align='right'>Estado</StyledTableCell>
            <StyledTableCell align='right' colSpan={3}>
              {' '}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        */

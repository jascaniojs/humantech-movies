import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../components/Table';
import MovieDialog from '../components/MovieDialog';
import { getMovies, createMovie, deleteMovie, editMovie } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
  },
}));

const Peliculas = (props) => {
  const classes = useStyles();
  const { peliculas = [] } = props;
  const [openDialog, setDialog] = React.useState(false);
  const [pelicula, setPelicula] = React.useState();

  useEffect(() => {
    const { getMovies } = props;
    if (peliculas.length === 0) {
      getMovies();
    }
  }, [peliculas]);

  const handleClose = () => {
    setPelicula({});

    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleCreate = (pelicula, id) => {
    const { createMovie, editMovie } = props;
    if (id) {
      return editMovie({ id, pelicula }).then(setDialog(false));
    }
    createMovie(pelicula).then(setDialog(false));
  };

  const handleLock = (lock, id) => {
    const { editMovie } = props;

    editMovie({ id, pelicula: { lock } }).then(setDialog(false));
  };
  const handleEdit = (pelicula) => {
    console.log(pelicula);
    setPelicula(pelicula);
    setDialog(true);
  };

  const handleDelete = (id) => {
    const { deleteMovie } = props;

    deleteMovie(id);
  };

  const headCells = [
    { id: 'id', disablePadding: false, label: 'Id', right: false },
    {
      id: 'nombre',
      disablePadding: true,
      label: 'Nombre',
      right: false,
    },
    {
      id: 'fecha',
      disablePadding: false,
      label: 'Fecha de Publicacion',
      right: true,
    },
    { id: 'estado', disablePadding: false, label: 'Estado', right: true },
  ];
  return (
    <>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='center'
      >
        <Typography variant='h2'>Películas</Typography>
        <Button onClick={handleClickOpen} variant='contained' color='primary'>
          Nueva Pelicula
        </Button>
      </Grid>
      <CustomTable
        headers={headCells}
        data={peliculas}
        editMovie={handleEdit}
        deleteMovie={handleDelete}
        handleLock={handleLock}
        movies
      />
      {openDialog && (
        <MovieDialog
          open={openDialog}
          pelicula={pelicula}
          handleClose={handleClose}
          saveMovie={handleCreate}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getMovies,
  createMovie,
  deleteMovie,
  editMovie,
};
export default connect(mapStateToProps, mapDispatchToProps)(Peliculas);

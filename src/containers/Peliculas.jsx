import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../components/Table';
import MovieDialog from '../components/MovieDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
  },
}));

const Peliculas = () => {
  const classes = useStyles();

  const [openDialog, setDialog] = React.useState(false);
  const [pelicula, setPelicula] = React.useState();

  const handleClose = () => {
    setPelicula({});

    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleEdit = (pelicula) => {
    console.log(pelicula);
    setPelicula(pelicula);
    setDialog(true);
  };

  const rows = [
    { id: 1, nombre: 'Frozen yoghurt', fecha: '10/06/2016', estado: true },
    { id: 2, nombre: 'Ice cream sandwich', fecha: '10/06/2016', estado: true },
    { id: 3, nombre: 'Eclair', fecha: '10/06/2016', estado: true },
    { id: 4, nombre: 'Cupcake', fecha: '10/06/2016', estado: true },
    { id: 5, nombre: 'Gingerbread', fecha: '10/06/2016', estado: true },
  ];
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
        data={rows}
        editMovie={handleEdit}
        movies
      />
      {openDialog && (
        <MovieDialog
          open={openDialog}
          pelicula={pelicula}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Peliculas;

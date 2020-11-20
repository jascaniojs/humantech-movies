import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { parse, format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const MovieDialog = (props) => {
  const { open, handleClose, pelicula = {}, saveMovie } = props;
  const classes = useStyles();

  const [estado, setEstado] = React.useState(false);
  const [fecha, setFecha] = React.useState(new Date());
  const [nombre, setNombre] = React.useState('');
  useEffect(() => {
    if (Object.keys(pelicula).length > 0) {
      setNombre(pelicula.nombre);
      setEstado(pelicula.estado);
      setFecha(new Date(pelicula.fecha));
    }
  }, [pelicula]);
  const handleDateChange = (date) => {
    setFecha(date);
  };
  const handleChange = (event) => {
    setEstado(event.target.value);
  };
  const handleName = (event) => {
    setNombre(event.target.value);
  };

  const handleSave = () => {
    console.log('1');
    const date = format(fecha, 'yyyy-MM-dd', new Date());
    const locked = false;
    if (pelicula.id) {
      return saveMovie(
        {
          nombre,
          fecha: date,
          estado,
          locked,
        },
        pelicula.id
      );
    }

    saveMovie({ nombre, fecha: date, estado, locked });
  };

  const validate = () => {
    console.log(nombre);
    if (
      typeof fecha !== 'undefined' &&
      typeof estado !== 'undefined' &&
      nombre.length > 0
    ) {
      return true;
    }
    return false;
  };

  const complete = validate();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-movie'
      >
        <DialogTitle id='form-dialog-title'>
          {pelicula.id ? 'Editar Pelicula' : 'Nueva Pelicula'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {pelicula.id
              ? 'Actualice los datos de la pelicula'
              : 'Por favor complete todos los datos para crear una nueva pelicula.'}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl variant='outlined' className={classes.formControl}>
              <TextField
                margin='dense'
                id='nombrePelicula'
                label='Nombre de Pelicula'
                fullWidth
                value={nombre}
                variant='outlined'
                onChange={handleName}
              />
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <DatePicker
                disableToolbar
                variant='inline'
                inputVariant='outlined'
                format='MM/dd/yyyy'
                margin='normal'
                id='fecha'
                label='Fecha de Publicación'
                value={fecha}
                onChange={handleDateChange}
              />
            </FormControl>

            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Estado
              </InputLabel>

              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={estado}
                onChange={handleChange}
                fullWidth
                label='Estado'
              >
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </MuiPickersUtilsProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancelar
          </Button>
          <Button
            onClick={() => handleSave()}
            disabled={!complete}
            color='primary'
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieDialog;

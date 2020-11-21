import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { parse, format } from 'date-fns';

import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../components/Table';
import { getTurns, createTurn, editTurn } from '../actions';

const TurnoForm = ({
  classes,
  turno,
  handleClose,
  complete,
  handleDateChange,
  hora,
  estado,
  handleChange,
  saveTurn,
}) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl variant='outlined' className={classes.formControl}>
          <TimePicker
            autoOk
            disableToolbar
            variant='inline'
            inputVariant='outlined'
            format='HH:mm'
            margin='normal'
            id='hora'
            label='Horario de Turno'
            value={hora}
            onChange={handleDateChange}
          />
        </FormControl>
        <FormControl variant='outlined' className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={estado}
                onChange={handleChange}
                name='checkedB'
                color='primary'
              />
            }
            label={estado ? 'Activo' : 'Inactivo'}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
      <Button onClick={() => handleClose()} color='secondary'>
        Cancelar
      </Button>
      <Button onClick={() => saveTurn()} disabled={!complete} color='primary'>
        Guardar
      </Button>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const Turnos = (props) => {
  const classes = useStyles();
  const { turnos = [], requestedT } = props;

  const [showForm, setShowForm] = React.useState(false);
  const [turno, setTurno] = React.useState({});
  const [estado, setEstado] = React.useState(false);
  const [hora, setHora] = React.useState(new Date());

  useEffect(() => {
    const { getTurns } = props;

    if (Object.keys(turno).length > 0) {
      setHora(
        format(
          parse(turno.hora, 'HH:mm:ss.SSS', new Date()),
          'HH:mm',
          new Date()
        )
      );
      setEstado(turno.estado);
    }
    if (turnos.length === 0 && !requestedT) {
      getTurns();
    }
    console.log(hora);
  }, [turno, turnos]);

  const handleClose = () => {
    setTurno({});
    setShowForm(false);
  };

  const handleClickOpen = () => {
    setShowForm(true);
  };

  const handleDateChange = (date) => {
    setHora(date);
  };
  const handleChange = (event) => {
    setEstado(!estado);
  };

  const handleCreate = (id) => {
    const { createTurn, editTurn } = props;
    if (id) {
      return editTurn({ id, turno }).then(setShowForm(false));
    }
    const time = format(hora, 'HH:mm:ss.SSS', new Date());
    const turn = { hora: time, estado, locked: false };

    createTurn(turn).then(setShowForm(false));
  };

  const handleLock = (lock, id) => {
    const { editTurn } = props;

    editTurn({ id, turn: { lock } }).then(setDialog(false));
  };

  const handleEdit = (pelicula) => {
    console.log(pelicula);
    setTurno(pelicula);
    setShowForm(true);
  };

  const rows = [
    { id: 2, hora: '13:30', estado: true },
    { id: 1, hora: '15:40', estado: false },
    { id: 3, hora: '17:40', estado: true },
    { id: 4, hora: '13:30', estado: false },
    { id: 5, hora: '13:30', estado: true },
  ];
  const headCells = [
    { id: 'id', disablePadding: false, label: 'Id', right: false },
    {
      id: 'turno',
      disablePadding: false,
      label: 'Turno',
      right: false,
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
        <Typography variant='h2'>Turnos</Typography>
        <Button onClick={handleClickOpen} variant='contained' color='primary'>
          Nuevo Turno
        </Button>
      </Grid>
      {!showForm ? (
        <CustomTable
          headers={headCells}
          data={turnos}
          editTurn={handleEdit}
          turnos
        />
      ) : (
        <TurnoForm
          classes={classes}
          turno={turno}
          hora={hora}
          estado={estado}
          handleClose={handleClose}
          complete
          handleDateChange={handleDateChange}
          handleChange={handleChange}
          saveTurn={handleCreate}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getTurns,
  createTurn,
  editTurn,
};
export default connect(mapStateToProps, mapDispatchToProps)(Turnos);

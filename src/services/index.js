import httpClient from '../helpers/fetch-helper';

const api = 'https://humantech-movies-api.herokuapp.com';
//OPERACIONES CON PELICULAS
const getMovies = () => {
  return httpClient.get(`${api}/peliculas`);
};

const createMovies = (payload) => {
  return httpClient.post(`${api}/peliculas`, payload);
};
const editMovies = (id, payload) => {
  return httpClient.put(`${api}/peliculas/${id}`, payload);
};

const removeMovies = (id) => {
  return httpClient.remove(`${api}/peliculas/${id}`);
};
//OPERACIONES CON TURNOS
const getTurns = () => {
  return httpClient.get(`${api}/turnos`);
};

const createTurns = (payload) => {
  return httpClient.post(`${api}/turnos`, payload);
};
const editTurns = (id, payload) => {
  return httpClient.put(`${api}/turnos/${id}`, payload);
};

const removeTurns = (id) => {
  return httpClient.remove(`${api}/turnos/${id}`);
};

const mainService = {
  getMovies,
  editMovies,
  removeMovies,
  createMovies,
  getTurns,
  createTurns,
  editTurns,
  removeTurns,
};

export default mainService;

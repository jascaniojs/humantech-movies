export const getMovies = (payload) => ({
  type: 'READ_MOVIES',
  payload,
});
export const createMovie = (payload) => ({
  type: 'CREATE_MOVIES',
  payload,
});
export const editMovie = (payload) => ({
  type: 'EDIT_MOVIES',
  payload,
});
export const deleteMovie = (payload) => ({
  type: 'DELETE_MOVIES',
  payload,
});

export const getTurns = (payload) => ({
  type: 'READ_TURNS',
  payload,
});
export const createTurn = (payload) => ({
  type: 'CREATE_TURNS',
  payload,
});
export const editTurn = (payload) => ({
  type: 'EDIT_TURNS',
  payload,
});
export const deleteTurns = (payload) => ({
  type: 'DELETE_TURNS',
  payload,
});

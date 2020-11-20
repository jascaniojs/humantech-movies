import mainServices from '../services';

export const getMovies = () => (dispatch) => {
  dispatch({
    type: 'READ_MOVIES_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.getMovies().then((res) => {
        dispatch({
          type: 'READ_MOVIES_SUCCEDED',
          res,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'READ_MOVIES_FAILED' });
      reject(err);
    }
  );
};
export const createMovie = (payload) => (dispatch) => {
  dispatch({
    type: 'CREATE_MOVIES_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.createMovies(payload).then((res) => {
        dispatch({
          type: 'CREATE_MOVIES_SUCCEDED',
          payload,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'READ_MOVIES_FAILED' });
      reject(err);
    }
  );
};
export const editMovie = (payload) => (dispatch) => {
  dispatch({
    type: 'EDIT_MOVIES_REQUEST',
    payload,
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.editMovies(payload.id, payload.pelicula).then((res) => {
        dispatch({
          type: 'EDIT_MOVIES_SUCCEDED',
          payload,
          res,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'EDIT_MOVIES_FAILED' });
      reject(err);
    }
  );
};
export const deleteMovie = (payload) => (dispatch) => {
  dispatch({
    type: 'DELETE_MOVIES_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.removeMovies(payload).then((res) => {
        dispatch({
          type: 'DELETE_MOVIES_SUCCEDED',
          payload,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'DELETE_MOVIES_FAILED' });
      reject(err);
    }
  );
};

export const getTurns = (payload) => (dispatch) => {
  dispatch({
    type: 'READ_TURNS_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.getTurns().then((res) => {
        dispatch({
          type: 'READ_TURNS_SUCCEDED',
          res,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'READ_TURNS_FAILED' });
      reject(err);
    }
  );
};
export const createTurn = (payload) => (dispatch) => {
  dispatch({
    type: 'CREATE_TURNS_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.createTurns(payload).then((res) => {
        dispatch({
          type: 'CREATE_TURNS_SUCCEDED',
          payload,
          res,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'CREATE_TURNS_FAILED' });
      reject(err);
    }
  );
};
export const editTurn = (payload) => (dispatch) => {
  dispatch({
    type: 'EDIT_TURNS_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.editTurn(payload).then((res) => {
        dispatch({
          type: 'EDIT_TURNS_SUCCEDED',
          payload,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'EDIT_TURNS_FAILED' });
      reject(err);
    }
  );
};
export const deleteTurns = (payload) => (dispatch) => {
  dispatch({
    type: 'DELETE_TURNS_REQUEST',
  });
  return new Promise(
    (resolve, reject) => {
      mainServices.removeTurn(payload).then((res) => {
        dispatch({
          type: 'DELETE_TURNS_SUCCEDED',
          payload,
        });
        resolve(res);
      });
    },
    (err) => {
      dispatch({ type: 'DELETE_TURNS_FAILED' });
      reject(err);
    }
  );
};

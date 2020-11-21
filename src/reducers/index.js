const reducer = (state, action) => {
  switch (action.type) {
    case 'READ_MOVIES_SUCCEDED':
      return {
        ...state,
        peliculas: action.res,
        requestedP: true,
      };
    case 'CREATE_MOVIES_SUCCEDED':
      return {
        ...state,
        peliculas: [
          ...state.peliculas,
          { id: action.res.id, ...action.payload },
        ],
      };
    case 'EDIT_MOVIES_SUCCEDED':
      return {
        ...state,
        peliculas: state.peliculas.map((pelicula) => {
          if (action.payload.id === pelicula.id) {
            return {
              ...pelicula,
              ...action.payload.pelicula,
            };
          }

          return pelicula;
        }),
      };
    case 'DELETE_MOVIES_SUCCEDED':
      return {
        ...state,
        peliculas: state.peliculas.filter((item) => item.id !== action.payload),
      };
    case 'READ_TURNS_SUCCEDED':
      return {
        ...state,
        turnos: action.res,
        requestedT: true,
      };
    case 'CREATE_TURNS_SUCCEDED':
      return {
        ...state,
        turnos: [...state.turnos, { id: action.res.id, ...action.payload }],
      };
    case 'EDIT_TURNS_SUCCEDED':
      return {
        ...state,
        turnos: state.turnos.map((turno) => {
          if (action.payload.id === turno.id) {
            return {
              ...turno,
              ...action.payload.turno,
            };
          }

          return turno;
        }),
      };
    case 'DELETE_TURNS_SUCCEDED':
      return {
        ...state,
        turnos: state.turnos.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;

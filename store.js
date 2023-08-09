import { createStore } from 'redux';

// Define la acción para almacenar el userId
export const setUserId = (userId) => ({
  type: 'SET_USER_ID',
  payload: userId,
});

// Define el estado inicial y el reducer
const initialState = {
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

// Crea el almacenamiento de Redux
const store = createStore(reducer);

export default store;

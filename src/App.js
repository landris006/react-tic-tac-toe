import React, { useReducer } from 'react';
import Settings from './Settings';
import Game from './Game';
import reducer, { initialState } from './reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!state.inProgress) {
    return <Settings dispatch={dispatch} />;
  }

  return <Game dispatch={dispatch} {...state} />;
};

export default App;

import React, { useReducer } from 'react';
import './App.css';
import Start from './Start';
import Game from './Game';
import reducer from './reducer';

const initialState = {
  inProgress: false,

  matrix: null,
  circleStarts: null,
  toWin: null,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!state.inProgress) {
    return <Start dispatch state={state} />;
  }

  return <Game dispatch />;
};

export default App;

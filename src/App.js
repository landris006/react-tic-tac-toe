import React, { useEffect, useReducer } from 'react';
import './App.css';
import Settings from './Settings';
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

  useEffect(() => console.log('rerender'));

  if (!state.inProgress) {
    return <Settings dispatch={dispatch} />;
  }

  return <Game dispatch={dispatch} {...state} />;
};

export default App;

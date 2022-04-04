import React, { useEffect, useReducer } from 'react';
import './App.css';
import Settings from './Settings';
import Game from './Game';
import reducer from './reducer';

const initialState = {
  inProgress: false,

  matrix: [],
  circleTurn: false,
  toWin: 1,
  winner: '',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (!state.inProgress) {
    return <Settings dispatch={dispatch} />;
  }

  return <Game dispatch={dispatch} {...state} />;
};

export default App;

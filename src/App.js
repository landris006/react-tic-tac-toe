import React, { useState } from 'react';
import './App.css';
import Start from './Start';

const App = () => {
  const [gameInProgress, setGameInProgress] = useState(false);

  if (!gameInProgress) {
    return <Start />;
  }

  return <div>App</div>;
};

export default App;

import React, { useEffect, useState } from 'react';
import './Settings.css';

const Start = ({ dispatch }) => {
  const [size, setSize] = useState(3);
  const [toWin, setToWin] = useState(3);
  const [circleStarts, setCircleStarts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: 'start', payload: { size, toWin, circleStarts } });
  };

  useEffect(() => {
    if (toWin <= size) {
      return;
    }

    setToWin(size);
  }, [size, toWin]);

  return (
    <form onSubmit={handleSubmit} className="start-form">
      <h1>Options</h1>
      <div className="field-container">
        <label htmlFor="size">Size:</label>
        <div>
          <input
            type="range"
            name="size"
            max="8"
            min="3"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <span>{size}</span>
        </div>
        <label htmlFor="toWin">Win at:</label>
        <div>
          <input
            type="range"
            name="toWin"
            max="8"
            min="3"
            id="toWin"
            value={toWin}
            onChange={(e) => setToWin(e.target.value)}
          />
          <span>{toWin}</span>
        </div>
        <label>Who starts?</label>
        <div className="radio-button-container">
          <div>
            <input
              type="radio"
              name="whoStarts"
              id="x"
              checked={!circleStarts}
              onChange={(e) => setCircleStarts(!e.target.checked)}
            />
            <label htmlFor="x">x</label>
          </div>
          <div>
            <input
              type="radio"
              name="whoStarts"
              id="o"
              checked={circleStarts}
              onChange={(e) => setCircleStarts(e.target.checked)}
            />
            <label htmlFor="o">o</label>
          </div>
        </div>
      </div>
      <button>Start Game</button>
    </form>
  );
};

export default Start;

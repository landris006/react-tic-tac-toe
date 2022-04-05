import React, { useEffect } from 'react';
import './Game.css';
import Modal from './Modal';

const Game = ({
  dispatch,
  matrix,
  circleTurn,
  size,
  winner,
  winningFields,
}) => {
  return (
    <>
      {winner && (
        <Modal
          winner={winner}
          dispatch={dispatch}
          winnerCount={winningFields.length}
        />
      )}
      <h1 className="game-title">turn: {circleTurn ? 'O' : 'X'}</h1>
      <div
        className="game-container"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {matrix.map((row, rowIndex) => {
          return row.map((field, colIndex) => {
            const status = matrix[rowIndex][colIndex];

            const isWinnerField = winningFields?.find(
              (field) =>
                JSON.stringify(field) === JSON.stringify([rowIndex, colIndex])
            );
            const delay =
              Math.max(
                rowIndex - winningFields?.[0]?.[0],
                colIndex - winningFields?.[0]?.[1]
              ) * 0.3;

            const extraClassName =
              status === 0 && !winner
                ? `unclaimed-${circleTurn ? 'circle' : 'cross'}`
                : status === 1
                ? 'cross'
                : status === -1
                ? 'circle'
                : '';

            return (
              <div
                key={rowIndex * row.length + colIndex}
                className={`field ${extraClassName} ${
                  isWinnerField && 'winner'
                }`}
                style={{
                  width: `${36 / size}vw`,
                  height: `${36 / size}vw`,
                  transitionDelay: `${winner && isWinnerField && delay + 's'}`,
                }}
                onClick={() =>
                  dispatch({
                    type: 'CAPTURE',
                    payload: { rowIndex, colIndex },
                  })
                }
              ></div>
            );
          });
        })}
      </div>
    </>
  );
};

export default Game;

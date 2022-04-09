import React from 'react';
import './Modal.css';

const Modal = ({ winner, dispatch, winnerCount }) => {
  const delay = (winnerCount * 0.5).toString() + 's';

  return (
    <>
      <div className="blur" style={{ animationDelay: delay }}></div>
      <div className="modal" style={{ animationDelay: delay }}>
        <h2>{winner === 'Draw!' ? winner : winner + ' wins!'}</h2>
        <div>
          <button className="btn" onClick={() => dispatch({ type: 'RESTART' })}>
            restart
          </button>
          <button
            className="btn"
            onClick={() => dispatch({ type: 'SETTINGS' })}
          >
            settings
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;

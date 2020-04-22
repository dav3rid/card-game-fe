import React from 'react';
import images from '../../images';

const PlayerHand = ({ cards = [] }) => {
  return (
    <div className="player-hand">
      {cards.map(card => {
        return (
          <img
            src={images[card]}
            alt={card}
            key={card}
            // onClick={() => playCard(value, isPower)}
          />
        );
      })}
      <br />
      Player Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default PlayerHand;

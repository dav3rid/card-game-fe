import React from 'react';
import Card from '../Card';

const PlayerPenultimateHand = ({ cards = [] }) => {
  return (
    <div className="player-penultimate-hand">
      {cards.map(card => {
        return <Card card={card} key={card} />;
      })}
      <br />
      Player Penultimate Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default PlayerPenultimateHand;

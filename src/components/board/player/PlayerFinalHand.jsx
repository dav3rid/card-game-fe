import React from 'react';
import Card from '../Card';

const PlayerFinalHand = ({ cards = [] }) => {
  return (
    <div className="player-final-hand">
      {cards.map(card => {
        return <Card key={card} />;
      })}
      <br />
      Player Final Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default PlayerFinalHand;

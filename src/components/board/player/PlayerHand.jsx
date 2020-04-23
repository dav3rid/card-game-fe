import React from 'react';
import Card from '../Card';

const PlayerHand = ({ cards = [] }) => {
  return (
    <div className="player-hand">
      {cards.map(card => {
        return <Card card={card} key={card} />;
      })}
      <br />
      Player Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default PlayerHand;

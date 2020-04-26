import React from 'react';
import Card from '../Card';

const PlayerHand = ({ cards = [] }) => {
  console.log(cards);
  return (
    <div className="player-hand">
      {cards.map(card => {
        return (
          <Card
            card={card}
            // handleClick={}
            key={card}
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

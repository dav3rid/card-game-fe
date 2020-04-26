import React from 'react';
import Card from '../Card';

const PlayerHand = ({ cards = [], handleClick }) => {
  return (
    <div className="player-hand">
      {cards.map((card, index) => {
        return (
          <Card
            card={card}
            index={index}
            isPlayable={true}
            handleClick={handleClick}
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

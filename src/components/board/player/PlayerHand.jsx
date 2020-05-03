import React from 'react';
import Card from '../Card';

const PlayerHand = ({ cards = [], handleClick, endTurn }) => {
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
      <button onClick={endTurn}>End Turn</button>
    </div>
  );
};

export default PlayerHand;

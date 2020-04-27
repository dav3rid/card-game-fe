import React from 'react';
import Card from '../Card';

const EnemyHand = ({ cards = [] }) => {
  return (
    <div className="enemy-hand">
      {cards.map(card => {
        return <Card key={card} />;
      })}
      <br />
      Enemy Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default EnemyHand;

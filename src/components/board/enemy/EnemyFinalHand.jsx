import React from 'react';
import Card from '../Card';

const EnemyFinalHand = ({ cards = [] }) => {
  return (
    <div className="enemy-final-hand">
      {cards.map(card => {
        return <Card key={card} />;
      })}
      <br />
      Enemy Final Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default EnemyFinalHand;

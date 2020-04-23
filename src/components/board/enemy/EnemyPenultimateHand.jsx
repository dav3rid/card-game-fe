import React from 'react';
import Card from '../Card';

const EnemyPenultimateHand = ({ cards = [] }) => {
  return (
    <div className="enemy-penultimate-hand">
      {cards.map(card => {
        return <Card card={card} key={card} />;
      })}
      <br />
      Enemy Penultimate Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default EnemyPenultimateHand;

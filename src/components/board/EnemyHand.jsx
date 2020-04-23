import React from 'react';
import images from '../../images';

const EnemyHand = ({ cards = [] }) => {
  return (
    <div className="enemy-hand">
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
      Enemy Hand
      {/* {isPlayerTurn && <h4>Your turn!</h4>} */}
    </div>
  );
};

export default EnemyHand;

import React from 'react';
import EnemyHand from './EnemyHand';

const EnemyCards = ({ cards: { hand, penultimateHand, finalHand } }) => {
  return <EnemyHand cards={hand} />;
};

export default EnemyCards;

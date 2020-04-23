import React from 'react';
import PlayerHand from './player/PlayerHand';
import EnemyHand from './enemy/EnemyHand';

const Cards = ({ role, cards: { hand, penultimateHand, finalHand } }) => {
  if (role === 'player') {
    return <PlayerHand cards={hand} />;
  } else {
    return <EnemyHand cards={hand} />;
  }
};

export default Cards;

import React from 'react';
import PlayerHand from './PlayerHand';

const PlayerCards = ({ cards: { hand, penultimateHand, finalHand } }) => {
  return <PlayerHand cards={hand} />;
};

export default PlayerCards;

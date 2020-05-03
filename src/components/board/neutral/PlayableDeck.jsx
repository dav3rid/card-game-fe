import React from 'react';
import Card from '../Card';

const PlayableDeck = ({ cards = [] }) => {
  return (
    <div className="playable-deck">
      {cards.length > 0 && <Card card={cards[cards.length - 1]} />}
      <br />
      Playable Deck
    </div>
  );
};

export default PlayableDeck;

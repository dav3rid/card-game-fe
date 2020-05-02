import React from 'react';
import Card from '../Card';

const PlayableDeck = ({ cards = [] }) => {
  return (
    <div className="playable-deck">
      {cards.map(card => {
        return <Card key={card} card={card} />;
      })}
      <br />
      Playable Deck
    </div>
  );
};

export default PlayableDeck;

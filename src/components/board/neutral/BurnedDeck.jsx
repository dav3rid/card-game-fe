import React from 'react';
import Card from '../Card';

const BurnedDeck = ({ cards = [] }) => {
  return (
    <div className="burned-deck">
      {cards.length > 0 && <Card card={cards[cards.length - 1]} />}
      <br />
      Burned Deck
    </div>
  );
};

export default BurnedDeck;

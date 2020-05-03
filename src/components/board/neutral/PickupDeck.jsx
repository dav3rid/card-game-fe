import React from 'react';
import Card from '../Card';

const PickupDeck = ({ cards = [], pickUpCard }) => {
  return (
    <div className="pickup-deck">
      <Card handleClick={pickUpCard} isPlayable={true} />
      <br />
      Pickup Deck
    </div>
  );
};

export default PickupDeck;

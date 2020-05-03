import React from 'react';
import Card from '../Card';

const PickupDeck = ({
  user_id,
  current_turn_id,
  game_state,
  playerRole,
  cardPlayedThisTurn,
  cards = [],
  updateGameState,
}) => {
  const isPlayable =
    user_id === current_turn_id &&
    cardPlayedThisTurn &&
    game_state[playerRole].hand.length < 3;

  const pickUpCard = () => {
    const newCard = game_state.neutral.pickupDeck.splice(-1, 1)[0];
    game_state[playerRole].hand.push(newCard);
    updateGameState(game_state);
  };
  return (
    <div className="pickup-deck">
      {cards.length > 0 && (
        <Card isPlayable={isPlayable} handleClick={isPlayable && pickUpCard} />
      )}
      <br />
      Pickup Deck
    </div>
  );
};

export default PickupDeck;

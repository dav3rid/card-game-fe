import React from 'react';
import Card from '../Card';
import * as game from '../../../game';

const PlayableDeck = ({
  user_id,
  current_turn_id,
  game_state,
  playerRole,
  cardPlayedThisTurn,
  cards = [],
  updateGameState,
  endTurn,
}) => {
  const isPlayable = // can pick up top card
    user_id === current_turn_id &&
    game_state[playerRole].hand.every(card => {
      return !game.isPlayable(
        card,
        game_state.topCardValue,
        cardPlayedThisTurn
      );
    });
  const pickUpCards = () => {
    game_state[playerRole].hand.push(...cards);
    game_state.neutral.playableCards = [];
    updateGameState(game_state, endTurn);
  };
  return (
    <div className="playable-deck">
      {cards.length > 0 && (
        <Card
          card={cards[cards.length - 1]}
          isPlayable={isPlayable}
          handleClick={isPlayable && pickUpCards}
        />
      )}
      <br />
      Playable Deck
    </div>
  );
};

export default PlayableDeck;

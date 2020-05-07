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
  setCardPlayedThisTurn,
  endTurn,
}) => {
  const pickUpCards = () => {
    console.log('picking up cards');
    game_state[playerRole].hand.push(...cards);
    game_state.neutral.playableDeck = [];
    game_state.topCardValue = 0;
    updateGameState(game_state, endTurn);
  };
  const burnCards = () => {
    game_state.neutral.burnedDeck.push(...cards);
    game_state.neutral.playableDeck = [];
    game_state.topCardValue = 0;
    updateGameState(game_state, () => setCardPlayedThisTurn(false));
  };
  const isBurnable =
    game_state.topCardValue === 10 ||
    (game_state.neutral.playableCards &&
      game_state.neutral.playableCards.slice(-4).every(card => {
        return (
          game.getCardValue(card) ===
          game.getCardValue(...game_state.neutral.playableCards.slice(-1))
        );
      }));
  // potential OR here - burn deck on 4 consecutive cards

  const isPlayable = // can pick up top card
    user_id === current_turn_id &&
    game_state[playerRole].hand.every(card => {
      return !game.isPlayable(
        card,
        game_state.topCardValue,
        cardPlayedThisTurn
      );
    });
  return (
    <div className="playable-deck">
      {cards.length > 0 && (
        <Card
          card={cards[cards.length - 1]}
          isPlayable={isPlayable}
          handleClick={isBurnable ? burnCards : isPlayable && pickUpCards}
        />
      )}
      <br />
      Playable Deck
      <br />
      Cards: {cards.length}
    </div>
  );
};

export default PlayableDeck;

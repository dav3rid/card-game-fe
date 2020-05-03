import React from 'react';
import Card from '../Card';
import * as game from '../../../game';

const PlayerHand = ({
  user_id,
  host_id,
  opponent_id,
  current_turn_id,
  game_state,
  playerRole,
  enemyChosen,
  cardPlayedThisTurn,
  hand = [],
  updateGameState,
  updateCurrentTurnId,
  emitMessage,
  setCardPlayedThisTurn,
  endTurn,
}) => {
  const handlePlayerChosen = () => {
    if (enemyChosen) {
      const firstTurnPlayerId = game.getFirstTurnId(
        host_id,
        opponent_id,
        game_state.host.hand,
        game_state.opponent.hand
      );
      updateCurrentTurnId(firstTurnPlayerId);
    } else emitMessage('chosen penultimate');
  };
  const pushToPenultimateHand = (card, indexInHand) => {
    if (hand.length > 3) {
      game_state[playerRole].hand.splice(indexInHand, 1);
      game_state[playerRole].penultimateHand.push(card);
      updateGameState(game_state, () => {
        if (game_state[playerRole].penultimateHand.length === 3)
          handlePlayerChosen();
      });
    }
  };
  const playCard = (card, indexInHand) => {
    const cardValue = game.getCardValue(card);

    game_state[playerRole].hand.splice(indexInHand, 1);
    game_state.neutral.playableDeck.push(card);
    if (cardValue !== 3) game_state.topCardValue = cardValue;
    updateGameState(game_state, setCardPlayedThisTurn);
  };

  const getHandleClick = () => {
    if (!current_turn_id) return pushToPenultimateHand;
    else if (user_id === current_turn_id) {
      if (hand.length >= 3 || game_state.neutral.pickupDeck.length === 0) {
        return playCard;
      }
    }
  };

  const handleClick = getHandleClick();

  return (
    <div className="player-hand">
      {hand.map((card, index) => {
        const isPlayable =
          !current_turn_id ||
          game.isPlayable(card, game_state.topCardValue, cardPlayedThisTurn);
        return (
          <Card
            card={card}
            index={index}
            isPlayable={isPlayable}
            handleClick={isPlayable && handleClick}
            key={card}
          />
        );
      })}
      <br />
      Player Hand
      {user_id === current_turn_id && (
        <button onClick={endTurn}>End Turn</button>
      )}
    </div>
  );
};

export default PlayerHand;

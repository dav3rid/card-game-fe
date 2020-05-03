import React, { Component } from 'react';
import socket from '../api/socket';
import * as api from '../api';
import * as game from '../game';

import EnemyHand from './board/enemy/EnemyHand';
import EnemyPenultimateHand from './board/enemy/EnemyPenultimateHand';
import EnemyFinalHand from './board/enemy/EnemyFinalHand';

import PickupDeck from './board/neutral/PickupDeck';
import PlayableDeck from './board/neutral/PlayableDeck';

import PlayerHand from './board/player/PlayerHand';
import PlayerPenultimateHand from './board/player/PlayerPenultimateHand';
import PlayerFinalHand from './board/player/PlayerFinalHand';

class Game extends Component {
  state = {
    host_id: null,
    opponent_id: null,
    current_turn_id: null,
    game_state: {
      host: {},
      opponent: {},
      neutral: {},
      topCardValue: 0,
    },
    enemyChosen: false,
    cardPlayedThisTurn: false,
  };

  componentDidMount() {
    const { user_id, game_id } = this.props;
    socket.on('update game state', ({ playerId }) => {
      if (playerId === user_id) this.getUpdatedGame();
    });
    socket.on('enemy chosen penultimate', ({ playerId }) => {
      if (playerId === user_id) this.setState({ enemyChosen: true });
    });
    api
      .getGameById(game_id)
      .then(({ host_id, opponent_id, current_turn_id, game_state }) => {
        const playerRole = user_id === host_id ? 'host' : 'opponent';
        const enemyRole = user_id === host_id ? 'opponent' : 'host';
        this.setState({
          host_id,
          opponent_id,
          current_turn_id,
          game_state,
          playerRole,
          enemyRole,
        });
      });
  }

  render() {
    const { game_id, user_id } = this.props;
    const { playerRole, enemyRole, current_turn_id, game_state } = this.state;
    return (
      <div className="board">
        <EnemyHand cards={enemyRole && game_state[enemyRole].hand} />
        <EnemyPenultimateHand
          cards={enemyRole && game_state[enemyRole].penultimateHand}
        />
        <EnemyFinalHand cards={enemyRole && game_state[enemyRole].finalHand} />
        <div className="burned-deck">BURNED DECK</div>
        {/* <div className="pickup-deck">PICKUP DECK</div> */}
        <PickupDeck
          user_id={user_id}
          {...this.state}
          cards={game_state.neutral.pickupDeck}
          updateGameState={this.updateGameState}
          // cards={game_state.neutral.pickupDeck}
          // pickUpCard={
          //   playerRole &&
          //   game_state[playerRole].hand.length < 3 &&
          //   this.pickUpCard
          // }
        />
        <PlayableDeck
          user_id={user_id}
          {...this.state}
          cards={game_state.neutral.playableDeck}
          updateGameState={this.updateGameState}
          endTurn={this.endTurn}
        />
        <div className="feed">feed</div>
        <PlayerHand
          user_id={user_id}
          {...this.state}
          hand={playerRole && game_state[playerRole].hand}
          updateGameState={this.updateGameState}
          updateCurrentTurnId={this.updateCurrentTurnId}
          emitMessage={this.emitMessage}
          setCardPlayedThisTurn={this.setCardPlayedThisTurn}
          endTurn={this.endTurn}
        />
        <PlayerPenultimateHand
          cards={playerRole && game_state[playerRole].penultimateHand}
        />
        <PlayerFinalHand
          cards={playerRole && game_state[playerRole].finalHand}
        />
      </div>
    );
  }

  emitMessage = msg => {
    const { enemyRole } = this.state;
    socket.emit(msg, {
      targetUserId: this.state[`${enemyRole}_id`],
    });
  };

  updateGameState = (newGameState, cb) => {
    const { game_id } = this.props;
    api.updateGameState(game_id, newGameState).then(game_state => {
      this.emitMessage('update game state');
      this.setState({ game_state }, cb);
    });
  };

  updateCurrentTurnId = newTurnId => {
    const { game_id } = this.props;
    api.setTurnId(game_id, newTurnId).then(current_turn_id => {
      this.emitMessage('update game state');
      this.setState({ current_turn_id, cardPlayedThisTurn: false });
    });
  };

  getUpdatedGame = () => {
    const { game_id } = this.props;
    api.getGameById(game_id).then(({ game_state, current_turn_id }) => {
      this.setState({ game_state, current_turn_id });
    });
  };

  setCardPlayedThisTurn = () => {
    this.setState({ cardPlayedThisTurn: true });
  };

  // playCard = (card, indexInHand) => {
  //   console.log('Playing Card');
  //   const { game_id } = this.props;
  //   const {
  //     playerRole,
  //     enemyRole,
  //     game_state,
  //     cardPlayedThisTurn,
  //   } = this.state;

  //   const cardValue = game.getCardValue(card);
  //   if (
  //     (cardPlayedThisTurn && cardValue === game_state.topCardValue) ||
  //     (!cardPlayedThisTurn && game.isPlayable(card, game_state.topCardValue))
  //   ) {
  //     game_state[playerRole].hand.splice(indexInHand, 1);
  //     game_state.neutral.playableDeck.push(card);
  //     game_state.topCardValue = cardValue;

  //     api.updateGameState(game_id, game_state).then(game_state => {
  //       socket.emit('update game state', {
  //         targetUserId: this.state[`${enemyRole}_id`],
  //       });
  //       this.setState({ game_state, cardPlayedThisTurn: true });
  //     });
  //   } else {
  //     console.log('invalid card');
  //   }
  // };

  // pickUpCard = () => {
  //   const { game_id } = this.props;
  //   const { playerRole, enemyRole, game_state } = this.state;

  //   const newCard = game_state.neutral.pickupDeck.splice(-1, 1)[0];
  //   game_state[playerRole].hand.push(newCard);

  //   api.updateGameState(game_id, game_state).then(game_state => {
  //     socket.emit('update game state', {
  //       targetUserId: this.state[`${enemyRole}_id`],
  //     });
  //     this.setState({ game_state });
  //   });
  // };

  // pushToPenultimateHand = (card, indexInHand) => {
  //   const { game_id } = this.props;
  //   const { playerRole, enemyRole, game_state } = this.state;
  //   if (game_state[playerRole].hand.length > 3) {
  //     game_state[playerRole].hand.splice(indexInHand, 1);
  //     game_state[playerRole].penultimateHand.push(card);
  //     api.updateGameState(game_id, game_state).then(game_state => {
  //       socket.emit('update game state', {
  //         targetUserId: this.state[`${enemyRole}_id`],
  //       });
  //       this.setState({ game_state });
  //       if (game_state[playerRole].penultimateHand.length === 3) {
  //         this.handlePlayerChosen();
  //       }
  //     });
  //   }
  // };

  // handlePlayerChosen = () => {
  //   const { game_id } = this.props;
  //   const {
  //     host_id,
  //     opponent_id,
  //     enemyRole,
  //     enemyChosen,
  //     game_state: { host, opponent },
  //   } = this.state;
  //   if (enemyChosen) {
  //     console.log('ready to start!!!');
  //     const firstTurnPlayerId = game.getFirstTurnId(
  //       host_id,
  //       opponent_id,
  //       host.hand,
  //       opponent.hand
  //     );
  //     api.setTurnId(game_id, firstTurnPlayerId).then(current_turn_id => {
  //       socket.emit('update game state', {
  //         targetUserId: this.state[`${enemyRole}_id`],
  //       });
  //       this.setState({ current_turn_id });
  //     });
  //   } else {
  //     socket.emit('chosen penultimate', {
  //       targetUserId: this.state[`${enemyRole}_id`],
  //     });
  //   }
  // };

  endTurn = () => {
    const { host_id, opponent_id, current_turn_id } = this.state;
    const newTurnId = current_turn_id === host_id ? opponent_id : host_id;
    this.updateCurrentTurnId(newTurnId);
  };
}

export default Game;

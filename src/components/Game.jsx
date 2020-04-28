import React, { Component } from 'react';
import socket from '../api/socket';
import * as api from '../api';
import * as game from '../game';

import EnemyHand from './board/enemy/EnemyHand';
import EnemyPenultimateHand from './board/enemy/EnemyPenultimateHand';
import EnemyFinalHand from './board/enemy/EnemyFinalHand';
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
    },
    enemyChosen: false,
  };

  componentDidMount() {
    const { user_id, game_id } = this.props;
    socket.on('update game state', ({ playerId }) => {
      if (playerId === user_id) this.updateGame();
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
        <div className="pickup-deck">PICKUP DECK</div>
        <div className="playable-deck">PLAYABLE DECK</div>
        <div className="feed">feed</div>
        <PlayerHand
          cards={playerRole && game_state[playerRole].hand}
          handleClick={
            !current_turn_id
              ? this.pushToPenultimateHand
              : user_id === current_turn_id
              ? () => console.log('your turn')
              : () => console.log('enemy turn')
          }
          // pushToPlayableDeck
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

  updateGame = () => {
    const { game_id } = this.props;
    api.getGameById(game_id).then(({ game_state, current_turn_id }) => {
      this.setState({ game_state, current_turn_id });
    });
  };

  pushToPenultimateHand = (card, indexInHand) => {
    const { game_id } = this.props;
    const { playerRole, enemyRole, game_state } = this.state;
    if (game_state[playerRole].hand.length > 3) {
      game_state[playerRole].hand.splice(indexInHand, 1);
      game_state[playerRole].penultimateHand.push(card);
      api.updateGameState(game_id, game_state).then(game_state => {
        socket.emit('update game state', {
          targetUserId: this.state[`${enemyRole}_id`],
        });
        this.setState({ game_state });
        if (game_state[playerRole].penultimateHand.length === 3) {
          this.handlePlayerChosen();
        }
      });
    }
  };

  handlePlayerChosen = () => {
    const { game_id } = this.props;
    const {
      host_id,
      opponent_id,
      enemyRole,
      enemyChosen,
      game_state: { host, opponent },
    } = this.state;
    if (enemyChosen) {
      console.log('ready to start!!!');
      const firstTurnPlayerId = game.getFirstTurnId(
        host_id,
        opponent_id,
        host.hand,
        opponent.hand
      );
      api.setFirstTurnId(game_id, firstTurnPlayerId).then(current_turn_id => {
        socket.emit('update game state', {
          targetUserId: this.state[`${enemyRole}_id`],
        });
        this.setState({ current_turn_id });
      });
    } else {
      socket.emit('chosen penultimate', {
        targetUserId: this.state[`${enemyRole}_id`],
      });
    }
  };
}

export default Game;

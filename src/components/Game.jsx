import React, { Component } from 'react';
import socket from '../api/socket';
import * as api from '../api';

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
  };

  componentDidMount() {
    const { user_id, game_id } = this.props;
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
        <PlayerHand cards={playerRole && game_state[playerRole].hand} />
        <PlayerPenultimateHand
          cards={playerRole && game_state[playerRole].penultimateHand}
        />
        <PlayerFinalHand
          cards={playerRole && game_state[playerRole].finalHand}
        />
      </div>
    );
  }

  updateGameState = () => {
    // patch game first!!!!
  };
}

export default Game;

import React, { Component } from 'react';
import * as api from '../api';
import Section from './board/Section';

class Game extends Component {
  state = {
    host_id: null,
    opponent_id: null,
    current_turn_id: null,
    game_state: {},
    playerRole: null,
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
    const { game_id } = this.props;
    const { playerRole, enemyRole, game_state } = this.state;
    return (
      <div className="board">
        <Section role="enemy" cards={game_state[enemyRole] || {}} />
        {/* <Cards role="neutral" cards={game_state[enemyRole] || {}} /> */}
        <div className="burned-deck">BURNED DECK</div>
        <div className="pickup-deck">PICKUP DECK</div>
        <div className="playable-deck">PLAYABLE DECK</div>
        <div className="feed">feed</div>
        <Section role="player" cards={game_state[playerRole] || {}} />
      </div>
    );
  }
}

export default Game;

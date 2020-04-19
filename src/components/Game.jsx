import React, { Component } from 'react';
import * as api from '../api';

class Game extends Component {
  state = {
    host_id: null,
    opponent_id: null,
    current_turn_id: null,
    gameState: {},
  };

  componentDidMount() {
    const { game_id, user_id } = this.props;
    api.getGameById(game_id).then(game => {
      console.log(game);
      if (user_id === game.host_id) {
      }
    });
  }

  render() {
    const { game_id } = this.props;
    console.log('In Game render', game_id);
    return <div></div>;
  }
}

export default Game;

import React, { Component } from 'react';
import * as api from '../api';
import * as game from '../game';
import Error from './Error';

class HostGame extends Component {
  state = {
    title: '',
    err: null,
    waitingForOpponent: false,
  };

  render() {
    const { title, err } = this.state;
    return (
      <div>
        <label>
          Enter game title:{' '}
          <input
            type="text"
            id="title-input"
            onChange={this.handleChange}
            value={title}
          />
        </label>
        <button onClick={this.handleSubmit}>Host game</button>
        <button onClick={this.handleDelete}>Delete current game</button>
        {err && <Error msg={err} />}
      </div>
    );
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  handleSubmit = event => {
    const { title } = this.state;
    const { user_id, navigate, socket } = this.props;
    const game_state = game.getNewGameState();
    api
      .hostGame({ title, host_id: user_id, game_state })
      .then(game_id => {
        console.log(`hosting game_id: ${game_id}`);
        socket.on('join game', () => {
          console.log('opponentJoined');
          navigate(`/games/${game_id}`);
        });
      })
      .catch(() => {
        this.setState({ err: 'This host already has an active session.' });
      });
  };

  handleDelete = () => {
    const { user_id } = this.props;
    api.deleteGame(user_id);
  };
}

export default HostGame;

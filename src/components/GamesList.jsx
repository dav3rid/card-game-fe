import React, { Component } from 'react';
import * as api from '../api';

class GamesList extends Component {
  state = { games: [] };

  componentDidMount() {
    api.getAvailableGames().then(games => {
      this.setState({ games });
    });
  }

  render() {
    const { games } = this.state;
    console.log('in games list render');
    console.log(games);
    return (
      <div>
        {games.map(game => {
          console.log(game);
          return (
            <div key={game.game_id}>
              {game.title}
              <button
                onClick={() => {
                  this.handleJoin(game.game_id);
                }}
              >
                Join Game
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  handleJoin = game_id => {
    const { socket, startGame, navigate } = this.props;
    socket.emit('join game', { game_id });
    navigate(`/games/${game_id}`);
  };
}

export default GamesList;

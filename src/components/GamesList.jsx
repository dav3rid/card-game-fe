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
          return <div key={game.game_id}>{game.title}</div>;
        })}
      </div>
    );
  }
}

export default GamesList;

import React, { Component } from 'react';
import * as api from '../api';

class GamesList extends Component {
  state = { games: [] };

  componentDidMount() {
    api.getGames().then(games => {
      this.setState({ games });
    });
  }

  render() {
    const { games } = this.state;
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

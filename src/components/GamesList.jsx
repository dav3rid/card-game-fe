import React, { Component } from 'react';
import * as api from '../api';
import GameCard from './GameCard';

class GamesList extends Component {
  state = { games: [] };

  componentDidMount() {
    api.getAvailableGames().then(games => {
      this.setState({ games });
    });
  }

  render() {
    const { games } = this.state;
    const { user_id, navigate } = this.props;
    console.log('in games list render');
    // console.log(games);
    return (
      <div>
        {games.map(game => {
          return (
            <GameCard
              game={game}
              user_id={user_id}
              navigate={navigate}
              key={game.game_id}
            />
          );
        })}
      </div>
    );
  }
}

export default GamesList;

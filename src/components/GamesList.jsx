import React, { Component } from 'react';
import * as api from '../api';

class GamesList extends Component {
  state = { games: [] };

  componentDidMount() {
    api.getGames();
  }

  render() {
    return <div></div>;
  }
}

export default GamesList;

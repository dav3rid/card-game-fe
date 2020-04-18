import React, { Component } from 'react';

class Game extends Component {
  render() {
    const { game_id } = this.props;
    console.log('In Game render', game_id);
    return <div></div>;
  }
}

export default Game;

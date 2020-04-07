import React, { Component } from 'react';

class JoinGame extends Component {
  componentDidMount() {
    const { name, socket } = this.props;
    socket.on('looking for game', (gameState) => {
      console.log(gameState);
    });
  }
  render() {
    return <div>uyghy</div>;
  }
}

export default JoinGame;

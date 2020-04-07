import React, { Component } from 'react';

class JoinGame extends Component {
  componentDidMount() {
    const { name, socket, readyToStart } = this.props;
    socket.on('looking for game', gameState => {
      gameState.playerTwoName = name;
      socket.emit('player joined', gameState);
    });
    socket.on('ready to start', gameState => {
      readyToStart(socket, gameState);
    });
  }
  render() {
    return <div>Joining Game</div>;
  }
}

export default JoinGame;

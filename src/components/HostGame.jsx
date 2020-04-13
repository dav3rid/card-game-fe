import React, { Component } from 'react';

class HostGame extends Component {
  componentDidMount() {
    const { name, socket, readyToStart } = this.props;
    socket.emit('hosting game', name);
    socket.on('opponent joining', gameState => {
      socket.emit('ready to play', gameState);
    });
    socket.on('ready to start', gameState => {
      readyToStart(socket, gameState);
    });
  }

  render() {
    return <div>Hosting Game</div>;
  }
}

export default HostGame;

import React, { Component } from 'react';

class NewGame extends Component {
  componentDidMount() {
    const { name, socket, readyToStart } = this.props;
    console.log(socket);
    socket.emit('new game', name);
    socket.on('new game', gameState => {
      socket.emit('looking for game', gameState);
    });
    socket.on('ready to start', gameState => {
      readyToStart(socket, gameState);
    });
  }

  render() {
    return <div>Hosting Game</div>;
  }
}

export default NewGame;

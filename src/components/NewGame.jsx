import React, { Component } from 'react';

class NewGame extends Component {
  state = {};

  componentDidMount() {
    const { name, socket } = this.props;
    console.log(socket);
    socket.emit('new game', name);
    socket.on('new game', (gameState) => {
      socket.emit('looking for game', gameState);
    });
  }

  render() {
    return <div>huhguwhigquohil</div>;
  }
}

export default NewGame;

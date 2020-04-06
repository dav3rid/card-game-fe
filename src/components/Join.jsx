import React from 'react';
import NameInput from './NameInput';
import io from 'socket.io-client';

class Join extends React.Component {
  render() {
    return <NameInput updateDetails={this.updateDetails} />;
  }
  updateDetails = (name) => {
    const { handleNameAndSocket } = this.props;
    const opponentSocket = io('localhost:9090');
    opponentSocket.on('move', (a, b, c) => {
      console.log(a, b, c);
    });
    opponentSocket.emit('opponent joining', name);
    handleNameAndSocket('opponent', { name, socket: opponentSocket });
  };
}

export default Join;

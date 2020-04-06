import React from 'react';
import NameInput from './NameInput';
import io from 'socket.io-client';

class Host extends React.Component {
  render() {
    return <NameInput updateDetails={this.updateDetails} />;
  }
  updateDetails = (name) => {
    const { handleNameAndSocket } = this.props;
    const hostSocket = io('localhost:9090');
    hostSocket.emit('new game', { msg: 'hello' });
    hostSocket.on('haa', (a, b, c) => {
      console.log(a, b, c);
    });
    handleNameAndSocket('host', { name, socket: hostSocket });
  };
}

export default Host;

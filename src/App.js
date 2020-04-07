import React from 'react';
import { Router, Link } from '@reach/router';
import io from 'socket.io-client';
import * as ioHandlers from './io';
import './App.css';
import NewGame from './components/NewGame';
import JoinGame from './components/JoinGame';
import NameInput from './components/NameInput';

class App extends React.Component {
  state = {
    name: '',
    socket: {},
  };

  componentDidMount() {
    const socket = io('localhost:9090');
    socket.on('welcome', (msg) => {
      console.log(msg);
    });
    this.setState({ socket });
  }

  render() {
    const { name, socket } = this.state;
    return (
      <div className="App">
        {name ? (
          <>
            {`Welcome ${name} | `}
            <Link to="/">HOME</Link>
            {'  |  '}
            <Link to="/new-game">NEW GAME</Link>
            {'  |  '}
            <Link to="/join-game">JOIN GAME</Link>
            <br />
          </>
        ) : (
          <NameInput updateName={this.updateName} />
        )}

        <Router>
          <NewGame path="new-game" name={name} socket={socket} />
          <JoinGame path="join-game" name={name} socket={socket} />
        </Router>
      </div>
    );
  }

  updateName = (name) => {
    this.setState({ name });
  };
}

export default App;

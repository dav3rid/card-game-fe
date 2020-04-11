import React from 'react';
import { Router, Link } from '@reach/router';
import io from 'socket.io-client';
import './App.css';
import HostGame from './components/HostGame';
import JoinGame from './components/JoinGame';
import NameInput from './components/NameInput';
import Game from './components/Game';
import Nav from './components/Nav';
import GamesList from './components/GamesList';

class App extends React.Component {
  state = {
    name: '',
    socket: {},
    gameState: {},
    readyToStart: false,
  };

  componentDidMount() {
    const socket = io('localhost:9090');
    socket.on('welcome', msg => {
      console.log(msg);
    });
    this.setState({ socket });
  }

  render() {
    const { name, socket, gameState, readyToStart } = this.state;
    return (
      <div className="App">
        {readyToStart && <Game socket={socket} gameState={gameState} />}
        {!readyToStart && (
          <>
            <Nav name={name} />
            {!name && <NameInput updateName={this.updateName} />}
            <Router>
              {/* <HostGame
                path="host-game"
                name={name}
                socket={socket}
                readyToStart={this.readyToStart}
              /> */}
              <GamesList path="/games" />
              {/* <JoinGame
                path="join-game"
                name={name}
                socket={socket}
                readyToStart={this.readyToStart}
              /> */}
            </Router>
          </>
        )}
      </div>
    );
  }

  updateName = name => {
    this.setState({ name });
  };

  readyToStart = (socket, gameState) => {
    this.setState({ socket, gameState, readyToStart: true });
  };
}

export default App;

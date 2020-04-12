import React from 'react';
import { Router, Link } from '@reach/router';
import io from 'socket.io-client';
import './App.css';
import HostGame from './components/HostGame';
import JoinGame from './components/JoinGame';
import SignIn from './components/SignIn';
import Game from './components/Game';
import Nav from './components/Nav';
import GamesList from './components/GamesList';

class App extends React.Component {
  state = {
    user: {
      user_id: null,
      name: '',
    },
    socket: {},
    gameState: {},
    readyToStart: false,
  };

  componentDidMount() {
    const socket = io('https://shed-card-game.herokuapp.com/api');
    this.setState({ socket });
  }

  render() {
    const {
      user: { user_id, name },
      socket,
      gameState,
      readyToStart,
    } = this.state;
    return (
      <div className="App">
        {readyToStart && <Game socket={socket} gameState={gameState} />}
        {!readyToStart && (
          <>
            <Nav name={name} />
            {!user_id && <SignIn updateUser={this.updateUser} />}
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

  updateUser = user => {
    this.setState({ user });
  };

  readyToStart = (socket, gameState) => {
    this.setState({ socket, gameState, readyToStart: true });
  };
}

export default App;

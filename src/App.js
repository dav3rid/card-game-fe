import React from 'react';
import { Router, Link } from '@reach/router';
import io from 'socket.io-client';
import './App.css';
import NewGame from './components/NewGame';
import JoinGame from './components/JoinGame';
import NameInput from './components/NameInput';
import Game from './components/Game';

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
            {name && (
              <>
                {`Welcome ${name} | `}
                <Link to="/">HOME</Link>
                {'  |  '}
                <Link to="/new-game">NEW GAME</Link>
                {'  |  '}
                <Link to="/join-game">JOIN GAME</Link>
                <br />
              </>
            )}
            {!name && <NameInput updateName={this.updateName} />}
            <Router>
              <NewGame
                path="new-game"
                name={name}
                socket={socket}
                readyToStart={this.readyToStart}
              />
              <JoinGame
                path="join-game"
                name={name}
                socket={socket}
                readyToStart={this.readyToStart}
              />
            </Router>{' '}
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

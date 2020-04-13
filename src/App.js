import React from 'react';
import { Router, Link } from '@reach/router';
import io from 'socket.io-client';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import GamesList from './components/GamesList';
import HostGame from './components/HostGame';
import JoinGame from './components/JoinGame';
import Game from './components/Game';

class App extends React.Component {
  state = {
    user: {
      user_id: null,
      name: '',
    },
    socket: {},
    readyToStart: false,
  };

  componentDidMount() {
    const socket = io('https://card-game-be.herokuapp.com/api');
    this.setState({ socket });
  }

  render() {
    const {
      user: { user_id, name },
      socket,
      readyToStart,
    } = this.state;
    return (
      <div className="App">
        {!user_id && <Login updateUser={this.updateUser} />}
        <Nav name={name} updateUser={this.updateUser} />
        {readyToStart && <Game socket={socket} />}
        <Router>
          <GamesList path="/games" />
        </Router>
      </div>
    );
  }

  updateUser = (
    user = {
      user_id: null,
      name: '',
    }
  ) => {
    this.setState({ user });
  };

  readyToStart = (socket, gameState) => {
    this.setState({ socket, gameState, readyToStart: true });
  };
}

export default App;

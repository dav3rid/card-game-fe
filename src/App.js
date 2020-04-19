import React from 'react';
import { Router } from '@reach/router';
import io from 'socket.io-client';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import GamesList from './components/GamesList';
import HostGame from './components/HostGame';
// import JoinGame from './components/JoinGame';
import Game from './components/Game';

class App extends React.Component {
  // STRICT MODE OFF IN INDEX.JS - DOUBLE LIFECYCLES
  state = {
    user: {
      user_id: null,
      name: '',
    },
    socket: {},
  };

  componentDidMount() {
    console.log('App mount');
    const socket = io('https://card-game-be.herokuapp.com');
    socket.on('welcome', ({ msg }) => {
      console.log(msg);
    });
    this.setState({ socket });
  }

  render() {
    console.log('App render');
    const {
      user: { user_id, name },
      socket,
    } = this.state;
    return (
      <div className="App">
        {!user_id ? (
          <Login updateUser={this.updateUser} />
        ) : (
          <>
            <Nav name={name} signOut={this.updateUser} />
            <Router>
              <GamesList path="/games" user_id={user_id} socket={socket} />
              <HostGame path="/host-game" user_id={user_id} socket={socket} />
              <Game path="/games/:game_id" user_id={user_id} socket={socket} />
            </Router>
          </>
        )}
        {/* {activeGameID && <Game socket={socket} activeGameID={activeGameID} />} */}
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
}

export default App;

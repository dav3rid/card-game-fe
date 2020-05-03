import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import GamesList from './components/GamesList';
import HostGame from './components/HostGame';
import Game from './components/Game';

class App extends React.Component {
  // STRICT MODE OFF IN INDEX.JS - DOUBLE LIFECYCLES
  state = {
    user: {
      user_id: null,
      name: '',
    },
  };

  render() {
    const {
      user: { user_id, name },
    } = this.state;
    return (
      <div className="App">
        {!user_id ? (
          <Login updateUser={this.updateUser} />
        ) : (
          <>
            <Nav name={name} signOut={this.updateUser} />
            <Router>
              <GamesList path="/games" user_id={user_id} />
              <HostGame path="/host-game" user_id={user_id} />
              <Game path="/games/:game_id" user_id={user_id} user_name={name} />
            </Router>
          </>
        )}
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

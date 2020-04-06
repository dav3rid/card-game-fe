import React from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Choose from './components/Choose';
import Host from './components/Host';
import Join from './components/Join';
import Game from './components/Game';

class App extends React.Component {
  state = {
    playerCount: 0,
    playerName: '',
    host: {
      name: '',
      socket: {},
    },
    opponent: {
      name: '',
      socket: {},
    },
  };

  componentDidMount() {
    this.reset();
  }

  render() {
    console.log(this.state);
    const { playerCount, playerName, host, opponent } = this.state;
    if (playerCount === 2) return <Game />;
    return (
      <div className="App">
        <Link to="/">HOME</Link>
        <Router>
          <Choose path="/" reset={this.reset} />
          <Host path="/host" handleNameAndSocket={this.handleNameAndSocket} />
          <Join path="/join" handleNameAndSocket={this.handleNameAndSocket} />
        </Router>
      </div>
    );
  }

  reset = () => {
    this.setState({
      playerCount: 0,
      playerName: '',
      host: {
        name: '',
        socket: {},
      },
      opponent: {
        name: '',
        socket: {},
      },
    });
  };

  handleNameAndSocket = (client, details) => {
    this.setState((currentState) => {
      return {
        playerCount: currentState.playerCount + 1,
        [client]: details,
        playerName: details.name,
      };
    });
  };
}

export default App;

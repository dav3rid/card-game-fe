import React from 'react';
import socketIOClient from 'socket.io-client';
import { Router, Link } from '@reach/router';
import './App.css';
import Host from './components/Host';
import Join from './components/Join';

class App extends React.Component {
  // state = {
  //   isPlayerOne: null,
  //   playerOneName: '',
  //   playerTwoName: '',
  // };

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Router>
          <Host path="/host" />
          <Join path="/join" />
        </Router>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Choose from './components/Choose';
import Host from './components/Host';
import Join from './components/Join';

const App = () => {
  return (
    <div className="App">
      <Link to="/">HOME</Link>
      <Router>
        <Choose path="/" />
        <Host path="/host" />
        <Join path="/join" />
      </Router>
    </div>
  );
};

export default App;

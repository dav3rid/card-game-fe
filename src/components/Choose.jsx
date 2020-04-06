import React from 'react';
import { Link } from '@reach/router';

const Choose = ({ reset }) => {
  return (
    <div className="choose">
      <Link to="/host">Host Game</Link>
      <Link to="/join">Join Game</Link>
      <button onClick={reset}>RESET SETUP</button>
    </div>
  );
};

export default Choose;

import React from 'react';
import { Link } from '@reach/router';

const Choose = () => {
  return (
    <div className="choose">
      <Link to="/host">Host Game</Link>
      <Link to="/join">Join Game</Link>
    </div>
  );
};

export default Choose;

import React from 'react';
import { Link } from '@reach/router';

const Nav = ({ name }) => {
  return (
    <div>
      {name && (
        <>
          {`Welcome ${name} | `}
          <Link to="/">HOME</Link>
          {'  |  '}
          <Link to="/host-game">HOST GAME</Link>
          {'  |  '}
          <Link to="/games">ALL GAMES</Link>
          <br />
        </>
      )}
    </div>
  );
};

export default Nav;

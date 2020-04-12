import React from 'react';
import { Link } from '@reach/router';

const Nav = ({ name, updateUser }) => {
  return (
    <div>
      {name && (
        <>
          {`Welcome ${name} | `}
          <Link to="/">HOME</Link>
          {'  |  '}
          <Link to="/host-game">HOST GAME</Link>
          {'  |  '}
          <Link to="/games">ALL AVAILABLE GAMES</Link>
          {'  |  '}
          <button
            onClick={() => {
              updateUser();
            }}
          >
            SIGN OUT
          </button>
          <br />
        </>
      )}
    </div>
  );
};

export default Nav;

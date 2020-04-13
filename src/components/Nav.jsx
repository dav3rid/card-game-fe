import React from 'react';
import { Link } from '@reach/router';

const Nav = ({ name, signOut }) => {
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
          <button onClick={() => signOut()}>SIGN OUT</button>
          <br />
        </>
      )}
    </div>
  );
};

export default Nav;

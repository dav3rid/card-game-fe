import React from 'react';
import socket from '../api/socket';
import * as api from '../api';

const GameCard = ({ game, user_id, navigate }) => {
  const handleJoin = () => {
    const { game_id } = game;
    api.joinGame(game_id, user_id).then(() => {
      socket.emit('join game', { game_id });
      navigate(`/games/${game_id}`);
    });
  };
  return (
    <div key={game.game_id}>
      {game.title}
      <button onClick={handleJoin}>Join Game</button>
    </div>
  );
};

export default GameCard;

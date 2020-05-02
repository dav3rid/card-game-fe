const axios = require('axios');

const request = axios.create({
  baseURL: 'https://card-game-be.herokuapp.com/api',
});

// USERS

exports.getUserByName = name => {
  return request.get(`/users/${name}`).then(({ data: { user } }) => {
    return user;
  });
};

exports.postUser = name => {
  return request.post('/users', { name }).then(({ data }) => {
    return data;
  });
};

// GAMES
// GET
exports.getGameById = game_id => {
  return request.get(`/games/${game_id}`).then(({ data: { game } }) => {
    return game;
  });
};

exports.getAvailableGames = () => {
  return request.get('/games?available=true').then(({ data: { games } }) => {
    return games;
  });
};

// POST
exports.hostGame = gameInfo => {
  return request.post('/games', gameInfo).then(
    ({
      data: {
        game: { game_id },
      },
    }) => {
      return game_id;
    }
  );
};

// PATCH
exports.joinGame = (game_id, opponent_id) => {
  return request.patch(`/games/${game_id}`, { opponent_id }).then(
    ({
      data: {
        game: { host_id },
      },
    }) => {
      return host_id;
    }
  );
};

// To make move - update game state and current turn id
exports.updateGameState = (game_id, game_state, current_turn_id) => {
  return request
    .patch(`/games/${game_id}`, { game_state, current_turn_id })
    .then(({ data: { game } }) => {
      return game;
    });
};

exports.setFirstTurnId = (game_id, current_turn_id) => {
  return request.patch(`/games/${game_id}`, { current_turn_id }).then(
    ({
      data: {
        game: { current_turn_id },
      },
    }) => {
      return current_turn_id;
    }
  );
};

// DELETE
exports.deleteGame = host_id => {
  return request.delete(`/games?host_id=${host_id}`);
};

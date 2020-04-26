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

exports.patchGame = (game_id, game_state) => {
  return request.patch(`/games/${game_id}`, { game_state }).then(
    ({
      data: {
        game: { game_state },
      },
    }) => {
      return game_state;
    }
  );
};

exports.deleteGame = host_id => {
  return request.delete(`/games?host_id=${host_id}`);
};

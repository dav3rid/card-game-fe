const axios = require('axios');

const request = axios.create({
  baseURL: 'https://shed-card-game.herokuapp.com/api',
});

// USERS

exports.getUserByName = name => {
  return request.get(`/users/${name}`).then(({ data: { user } }) => {
    return user;
  });
};

// GAMES
exports.getGames = () => {
  return request.get('/games?available=true').then(({ data: { games } }) => {
    return games;
  });
};

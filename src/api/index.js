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
exports.getAvailableGames = () => {
  console.log('making api call');
  return request.get('/games?available=true').then(({ data: { games } }) => {
    return games;
  });
};

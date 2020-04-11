const axios = require('axios');

const request = axios.create({
  baseURL: 'https://shed-card-game.herokuapp.com/api',
});

exports.getGames = () => {
  return request
    .get('/games')
    .then(({ data }) => {
      console.log(data);
    })
    .catch(console.log);
};

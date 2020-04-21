import io from 'socket.io-client';

const socket = io('https://card-game-be.herokuapp.com');

export default socket;

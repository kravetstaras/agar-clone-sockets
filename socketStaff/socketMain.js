const io = require('../server').io;
const app = require('../server').app;
initGame();

const Orb = require('./classes/Orb');
const orbs = [];

io.on('connect', socket => {
  socket.emit('init', {
    orbs,
  });
});

function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

const socket = io.connect('http://localhost:9000');
socket.on('init', initData => {
  orbs = initData.orbs;
});

socket.on('tick', playersArray => {
  console.log(players);
  players = playersArray;
});
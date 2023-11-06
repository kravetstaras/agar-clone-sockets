let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
let player = {};

let canvas = document.querySelector('#the-canvas');
let context = canvas.getContext('2d');
canvas.width = wWidth;
canvas.height = wHeight;

const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

window.addEventListener('load', () => {
  loginModal.show();
});

document.querySelector('.name-form').addEventListener('submit', e => {
  e.preventDefault();
  player.name = document.querySelector('#name-input').value;
  loginModal.hide();
  spawnModal.show();
  console.log(player);
});

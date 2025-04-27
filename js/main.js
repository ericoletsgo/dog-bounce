import { setupCanvas } from './canvas.js';
import { Dog }         from './dog.js';
import { randomBetween } from './utils.js';
import { GRAVITY, RESTITUTION, NUM_DOGS, DOG_RADIUS } from './config.js';

let dogs = [];
let ctx, canvas, width, height;

function createDogs() {
  dogs = [];
  for (let i = 0; i < NUM_DOGS; i++) {
    const x = randomBetween(DOG_RADIUS, width - DOG_RADIUS);
    const y = randomBetween(DOG_RADIUS, height / 2);
    const vx = randomBetween(-2, 2);
    const vy = randomBetween(-2, 2);
    dogs.push(new Dog(x, y, vx, vy, DOG_RADIUS));
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, width, height);
  dogs.forEach(dog => {
    dog.update(width, height, GRAVITY, RESTITUTION);
    dog.draw(ctx);
  });
  requestAnimationFrame(gameLoop);
}

function init() {
  ({ canvas, ctx, width, height } = setupCanvas({
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    attachNode: '#canvas-container'
  }));

  createDogs();
  requestAnimationFrame(gameLoop);
}

init();
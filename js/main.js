import { setupCanvas } from './canvas.js';
import { Dog }         from './dog.js';
import { randomBetween } from './utils.js';
import * as cfg        from './config.js';

// globals
let dogs = [];
let canvas, ctx;

// initialize canvas, dogs
function init() {
  // 1. call setupCanvas
  // 2. create Dog instances
  // 3. attach handlers
  // 4. requestAnimationFrame(gameLoop)
}

function createDogs() {
  dogs = [];
  for (let i = 0; i < cfg.NUM_DOGS; i++) {
    //randomize x,y,vx,vy
    dogs.push(new Dog(/* … */));
  }
}

function handleMouseDown(e) {}
function handleMouseMove(e) { }
function handleMouseUp(e)   {}

function gameLoop(timestamp) {
  // TODO:
  // - clear canvas
  // - dogs.forEach
  // - rq next frame
}

init();

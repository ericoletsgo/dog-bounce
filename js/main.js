import { setupCanvas } from './canvas.js';
import { Dog }         from './dog.js';
import { randomBetween } from './utils.js';
import { GRAVITY, RESTITUTION, NUM_DOGS, DOG_RADIUS, DRAG_THROW_MULTIPLIER, DOG_IMAGE_SOURCES } from './config.js';

let dogs = [], draggedDog = null;
let dragOffsetX = 0, dragOffsetY = 0;
let lastMouseX = 0, lastMouseY = 0;
let throwVx = 0, throwVy = 0;

const { canvas, ctx, width, height } = setupCanvas({
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.9,
  attachNode: '#canvas-container'
});

function createDogs() {
  dogs = [];
  for (let i = 0; i < NUM_DOGS; i++) {
    const x = randomBetween(DOG_RADIUS, width - DOG_RADIUS);
    const y = randomBetween(DOG_RADIUS, height / 2);
    const vx = randomBetween(-2, 2);
    const vy = randomBetween(-2, 2);
    const imgIndex = Math.floor(randomBetween(0, DOG_IMAGE_SOURCES.length));
    dogs.push(new Dog(x, y, vx, vy, DOG_RADIUS, imgIndex));
  }
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  const x = (e.clientX - rect.left) * (canvas.width/rect.width) / scale;
  const y = (e.clientY - rect.top) * (canvas.height/rect.height) / scale;
  return { x, y };
}

function handleMouseDown(e) {
  const pos = getMousePos(e);
  lastMouseX = pos.x;
  lastMouseY = pos.y;
  throwVx = throwVy = 0;
  for (let i = dogs.length - 1; i >= 0; i--) {
    if (dogs[i].isPointInside(pos.x, pos.y)) {
      draggedDog = dogs[i];
      dragOffsetX = pos.x - draggedDog.x;
      dragOffsetY = pos.y - draggedDog.y;
      draggedDog.startDrag();
      dogs.push(dogs.splice(i,1)[0]);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup',   handleMouseUp);
      break;
    }
  }
}

function handleMouseMove(e) {
  if (!draggedDog) return;
  const pos = getMousePos(e);
  throwVx = (pos.x - lastMouseX) * DRAG_THROW_MULTIPLIER;
  throwVy = (pos.y - lastMouseY) * DRAG_THROW_MULTIPLIER;
  lastMouseX = pos.x;
  lastMouseY = pos.y;
  draggedDog.setPosition(pos.x - dragOffsetX, pos.y - dragOffsetY);
  }

function handleMouseUp() {
  if (!draggedDog) return;
  draggedDog.stopDrag(throwVx, throwVy);
  draggedDog = null;
  canvas.removeEventListener('mousemove', handleMouseMove);
  canvas.removeEventListener('mouseup',   handleMouseUp);
}

function gameLoop() {
  ctx.clearRect(0,0,width,height);
  dogs.forEach(d => { d.update(width,height, GRAVITY, RESTITUTION); d.draw(ctx); });
  requestAnimationFrame(gameLoop);
}

createDogs();
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
requestAnimationFrame(gameLoop);
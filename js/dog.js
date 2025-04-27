import { distance } from './utils.js';
import { USE_IMAGES, DOG_IMAGE_SRC } from './config.js';

export class Dog {
  constructor(x, y, vx, vy, radius) {
    //store position, velocity, radius
  }

  update(canvasW, canvasH, gravity, restitution) {
    //apply gravity
    // move
    // check bounds & bounce
  }

  draw(ctx) {
    // draw image
    // else draw a circle for test?
  }

  isPointInside(px, py) {
    //true if (px,py) inside dog
  }

  startDrag() {
  }

  stopDrag(vx, vy) {
  }

  setPosition(x, y) {}
}

import { distance } from './utils.js';
import { USE_IMAGES } from './config.js';

export class Dog {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
  }

  update(canvasW, canvasH, gravity, restitution) {
    // gravity
    this.vy += gravity;
    // move
    this.x += this.vx;
    this.y += this.vy;

    // bounce off walls
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -restitution;
    }
    if (this.x + this.radius > canvasW) {
      this.x = canvasW - this.radius;
      this.vx *= -restitution;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -restitution;
    }
    if (this.y + this.radius > canvasH) {
      this.y = canvasH - this.radius;
      this.vy *= -restitution;
      this.vx *= 0.98; // friction on floor
    }
  }

  draw(ctx) {
    // fallback circle only
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isPointInside(px, py) {
    return distance(this.x, this.y, px, py) <= this.radius;
  }
}
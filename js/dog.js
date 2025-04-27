import { distance } from './utils.js';

export class Dog {
  constructor(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.isDragging = false;
  }

  startDrag() {
    this.isDragging = true;
  }

  stopDrag(throwVx, throwVy) {
    this.isDragging = false;
    this.vx = throwVx;
    this.vy = throwVy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update(canvasW, canvasH, gravity, restitution) {
    if (this.isDragging) return;
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    // bounce
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
      this.vx *= 0.98;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isPointInside(px, py) {
    return distance(this.x, this.y, px, py) <= this.radius;
  }
}
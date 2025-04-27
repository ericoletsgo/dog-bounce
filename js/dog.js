import { distance } from './utils.js';
import { USE_IMAGES, DOG_IMAGE_SOURCES, DOG_RADIUS } from './config.js';

const dogImages = DOG_IMAGE_SOURCES.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});
let imagesLoadedCount = 0;
let imageLoadErrors = new Array(DOG_IMAGE_SOURCES.length).fill(false);

dogImages.forEach((img, idx) => {
  img.onload = () => { imagesLoadedCount++; };
  img.onerror = () => { imageLoadErrors[idx] = true; };
});

export class Dog {
  constructor(x, y, vx, vy, radius, imgIndex) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.isDragging = false;
    this.width = radius * 2;
    this.height = radius * 2;
    this.imgIndex = imgIndex;
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
    if (USE_IMAGES) {
      const img = dogImages[this.imgIndex];
      const error = imageLoadErrors[this.imgIndex];
      if (!error && imagesLoadedCount > this.imgIndex) {
        ctx.drawImage(
          img,
          this.x - this.radius,
          this.y - this.radius,
          this.width,
          this.height
        );
        return;
      }
    }

    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  isPointInside(px, py) {
    return distance(this.x, this.y, px, py) <= this.radius;
  }
}
export function setupCanvas({ width, height, attachNode }) {
  const container = document.querySelector(attachNode);
  if (!container) throw new Error(`Container '${attachNode}' not found.`);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // handle retina / HiDPI
  const scale = window.devicePixelRatio || 1;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  ctx.scale(scale, scale);

  container.appendChild(canvas);
  return { canvas, ctx, width, height };
}
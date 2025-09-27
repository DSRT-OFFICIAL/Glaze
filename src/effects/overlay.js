// ==================== overlay.js ====================

/**
 * Membuat overlay warna pada canvas
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} width - Lebar canvas
 * @param {number} height - Tinggi canvas
 * @param {string} color - Warna overlay (HEX, RGB, HSL)
 * @param {number} opacity - Opasitas overlay (0–1)
 */
export function drawOverlay(ctx, width, height, color = "#000000", opacity = 0.5) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/**
 * Membuat overlay linear gradient
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} x0 - Posisi X awal gradient
 * @param {number} y0 - Posisi Y awal gradient
 * @param {number} x1 - Posisi X akhir gradient
 * @param {number} y1 - Posisi Y akhir gradient
 * @param {Array} stops - Array warna & posisi: [{color: "#fff", pos: 0}, ...]
 */
export function drawLinearOverlay(ctx, x0, y0, x1, y1, stops = [{ color: "#000", pos: 0 }, { color: "#000", pos: 1 }]) {
  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  stops.forEach(stop => grad.addColorStop(stop.pos, stop.color));
  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

/**
 * Membuat overlay radial gradient
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} x0 - X pusat awal
 * @param {number} y0 - Y pusat awal
 * @param {number} r0 - Radius awal
 * @param {number} x1 - X pusat akhir
 * @param {number} y1 - Y pusat akhir
 * @param {number} r1 - Radius akhir
 * @param {Array} stops - Array warna & posisi: [{color: "#fff", pos: 0}, ...]
 */
export function drawRadialOverlay(ctx, x0, y0, r0, x1, y1, r1, stops = [{ color: "#000", pos: 0 }, { color: "#000", pos: 1 }]) {
  const grad = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  stops.forEach(stop => grad.addColorStop(stop.pos, stop.color));
  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

/**
 * Overlay dengan mode blend tertentu
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {string} color - Warna overlay
 * @param {string} blendMode - Mode blend (multiply, screen, overlay, darken, lighten)
 * @param {number} opacity - Opasitas overlay
 */
export function drawBlendOverlay(ctx, color = "#000000", blendMode = "overlay", opacity = 0.5) {
  ctx.save();
  ctx.globalCompositeOperation = blendMode;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

// ==================== glow.js ====================

/**
 * Membuat efek glow di sekitar warna atau objek
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} x - Posisi X tengah glow
 * @param {number} y - Posisi Y tengah glow
 * @param {number} radius - Radius glow
 * @param {string} color - Warna glow (HEX, RGB, HSL)
 * @param {number} intensity - Kekuatan glow (0–1)
 */
export function drawGlow(ctx, x, y, radius, color = "#FFFFFF", intensity = 0.5) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * intensity * 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

/**
 * Membuat glow berbentuk persegi panjang
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} x - Posisi X kiri atas
 * @param {number} y - Posisi Y kiri atas
 * @param {number} width - Lebar persegi panjang
 * @param {number} height - Tinggi persegi panjang
 * @param {string} color - Warna glow
 * @param {number} intensity - Kekuatan glow (0–1)
 */
export function drawRectGlow(ctx, x, y, width, height, color = "#FFFFFF", intensity = 0.5) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = Math.max(width, height) * intensity * 0.5;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  ctx.restore();
}

/**
 * Membuat glow berbentuk path/kustom
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {Path2D} path - Path untuk glow
 * @param {string} color - Warna glow
 * @param {number} intensity - Kekuatan glow (0–1)
 */
export function drawPathGlow(ctx, path, color = "#FFFFFF", intensity = 0.5) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 20 * intensity;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = color;
  ctx.fill(path);

  ctx.restore();
}

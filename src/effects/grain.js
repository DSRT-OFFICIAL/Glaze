// ==================== grain.js ====================

/**
 * Membuat tekstur grain (butiran) untuk efek visual
 * @param {number} width - Lebar canvas/area
 * @param {number} height - Tinggi canvas/area
 * @param {number} intensity - Intensitas grain (0–1)
 * @returns {ImageData} - Data grain untuk overlay
 */
export function generateGrain(width, height, intensity = 0.1) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const clampedIntensity = Math.min(Math.max(intensity, 0), 1);

  for (let i = 0; i < data.length; i += 4) {
    const val = Math.floor((Math.random() - 0.5) * 255 * clampedIntensity + 128);
    data[i] = val;      // R
    data[i + 1] = val;  // G
    data[i + 2] = val;  // B
    data[i + 3] = 255;  // A
  }

  ctx.putImageData(imageData, 0, 0);
  return imageData;
}

/**
 * Menerapkan grain ke canvas context
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {ImageData} grainData - Data grain dari generateGrain
 * @param {number} alpha - Opacity overlay grain (0–1)
 */
export function applyGrain(ctx, grainData, alpha = 0.1) {
  const width = grainData.width;
  const height = grainData.height;

  ctx.save();
  ctx.globalAlpha = Math.min(Math.max(alpha, 0), 1);
  ctx.putImageData(grainData, 0, 0);
  ctx.restore();
}

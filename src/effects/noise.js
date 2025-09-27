// ==================== noise.js ====================

/**
 * Menambahkan noise acak ke warna atau canvas
 * @param {number} amount - Intensitas noise (0–1)
 * @param {string} [color='#000'] - Warna noise
 * @returns {string} - Warna noise dalam format rgba
 */
export function generateNoiseColor(amount = 0.1, color = "#000000") {
  const alpha = Math.min(Math.max(amount, 0), 1);
  return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
    color.slice(3, 5),
    16
  )}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;
}

/**
 * Mengaplikasikan noise ke canvas context
 * @param {CanvasRenderingContext2D} ctx - Context canvas
 * @param {number} width - Lebar canvas
 * @param {number} height - Tinggi canvas
 * @param {number} amount - Intensitas noise (0–1)
 */
export function applyNoiseToCanvas(ctx, width, height, amount = 0.1) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const rand = (Math.random() - 0.5) * 255 * amount;
    data[i] = clamp(data[i] + rand, 0, 255); // R
    data[i + 1] = clamp(data[i + 1] + rand, 0, 255); // G
    data[i + 2] = clamp(data[i + 2] + rand, 0, 255); // B
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Membatasi nilai min/max
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

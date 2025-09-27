// ==================== dominant.js ====================

import { hexToRgb, rgbToHex } from "../conversion/index.js";

/**
 * Flatten image data (ImageData.data) menjadi array RGB
 * @param {Uint8ClampedArray} data
 * @returns {Array} [[r,g,b], ...]
 */
function flattenImageData(data) {
  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    pixels.push([data[i], data[i + 1], data[i + 2]]);
  }
  return pixels;
}

/**
 * Euclidean distance between two RGB colors
 */
function distance(c1, c2) {
  return Math.sqrt(
    Math.pow(c1[0] - c2[0], 2) +
    Math.pow(c1[1] - c2[1], 2) +
    Math.pow(c1[2] - c2[2], 2)
  );
}

/**
 * K-means clustering untuk menemukan warna dominan
 * @param {Array} pixels - array [r,g,b]
 * @param {number} k - jumlah cluster
 * @param {number} maxIter
 * @returns {Array} cluster centers
 */
function kMeans(pixels, k = 3, maxIter = 10) {
  // pilih k warna acak sebagai centroid awal
  let centroids = [];
  const shuffled = pixels.sort(() => 0.5 - Math.random());
  centroids = shuffled.slice(0, k);

  for (let iter = 0; iter < maxIter; iter++) {
    const clusters = Array.from({ length: k }, () => []);

    // assign pixels ke centroid terdekat
    for (const px of pixels) {
      let minDist = Infinity;
      let idx = 0;
      centroids.forEach((c, i) => {
        const d = distance(px, c);
        if (d < minDist) {
          minDist = d;
          idx = i;
        }
      });
      clusters[idx].push(px);
    }

    // update centroid
    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return [0, 0, 0];
      const sum = cluster.reduce(
        (acc, val) => [acc[0] + val[0], acc[1] + val[1], acc[2] + val[2]],
        [0, 0, 0]
      );
      return sum.map(v => Math.round(v / cluster.length));
    });
  }

  return centroids;
}

/**
 * Ambil warna dominan dari ImageData
 * @param {ImageData} imageData
 * @param {number} k
 * @returns {Array} hex colors
 */
export function getDominantColors(imageData, k = 3) {
  const pixels = flattenImageData(imageData.data);
  const centroids = kMeans(pixels, k);
  return centroids.map(c => rgbToHex(c[0], c[1], c[2]));
}

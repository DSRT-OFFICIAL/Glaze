// ==================== temperature.js ====================

// Fungsi untuk menentukan "temperature" dari warna dalam HSL
// Output: "warm", "neutral", "cool"

import { hexToHsl } from "../conversion/index.js";

export function getColorTemperature(hex) {
  const { h } = hexToHsl(hex);

  if (h >= 0 && h <= 90) {
    return "warm"; // merah, oranye, kuning
  } else if (h > 90 && h <= 150) {
    return "neutral"; // hijau muda, lime
  } else if (h > 150 && h <= 270) {
    return "cool"; // biru, cyan, teal, ungu
  } else {
    return "warm"; // 270–360 dianggap merahung
  }
}

// Alternatif fungsi untuk array warna
export function getPaletteTemperature(hexArray) {
  const tempCount = { warm: 0, neutral: 0, cool: 0 };

  hexArray.forEach(hex => {
    const temp = getColorTemperature(hex);
    tempCount[temp]++;
  });

  // Mengembalikan temperature dominan
  return Object.keys(tempCount).reduce((a, b) =>
    tempCount[a] > tempCount[b] ? a : b
  );
}

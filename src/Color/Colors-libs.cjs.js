// 🎨 Semua warna umum lengkap
const colors = { /* sama persis dengan versi ESM di atas */ };

// 🔧 Utilitas
function adjustColor(hex, percent) {
  let num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return "#" + (b | (g << 8) | (r << 16)).toString(16).padStart(6, "0");
}

function lighten(hex, percent = 20) {
  return adjustColor(hex, percent);
}
function darken(hex, percent = 20) {
  return adjustColor(hex, -percent);
}
function withOpacity(hex, opacity = 1) {
  let alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return hex + alpha;
}

module.exports = { colors, lighten, darken, withOpacity };

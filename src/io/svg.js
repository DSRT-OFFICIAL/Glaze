// ==================== svg.js ====================

// Buat <rect> SVG untuk setiap warna dalam palet
export function paletteToSvg(palette, options = {}) {
  const {
    width = 50,
    height = 50,
    spacing = 5,
    direction = "horizontal", // "horizontal" atau "vertical"
  } = options;

  const colors = Object.values(palette).flatMap(val =>
    typeof val === "object" ? Object.values(val) : val
  );

  const totalWidth =
    direction === "horizontal"
      ? colors.length * width + (colors.length - 1) * spacing
      : width;
  const totalHeight =
    direction === "vertical"
      ? colors.length * height + (colors.length - 1) * spacing
      : height;

  let svgRects = colors
    .map((color, i) => {
      const x = direction === "horizontal" ? i * (width + spacing) : 0;
      const y = direction === "vertical" ? i * (height + spacing) : 0;
      return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}">
${svgRects}
</svg>`;
}

// Export SVG ke file (browser)
export function saveSvgFile(svgContent, filename = "palette.svg") {
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Parse warna dari SVG sederhana (hanya <rect> fill)
export function importSvgColors(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const rects = doc.querySelectorAll("rect");
  return Array.from(rects).map(rect => rect.getAttribute("fill"));
}

// Contoh generate SVG dari palet dan langsung download
export function downloadPaletteAsSvg(palette, options = {}, filename = "palette.svg") {
  const svg = paletteToSvg(palette, options);
  saveSvgFile(svg, filename);
}

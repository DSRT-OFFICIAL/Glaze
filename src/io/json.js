// ==================== json.js ====================

// Export warna atau palet ke JSON string
export function exportToJson(data, spacing = 2) {
  if (!data) throw new Error("No data to export");
  return JSON.stringify(data, null, spacing);
}

// Import warna atau palet dari JSON string
export function importFromJson(jsonString) {
  if (typeof jsonString !== "string") throw new Error("Invalid JSON string");

  try {
    const data = JSON.parse(jsonString);
    return data;
  } catch (err) {
    throw new Error("Failed to parse JSON: " + err.message);
  }
}

// Load JSON dari file (browser)
export function loadJsonFile(file, callback) {
  if (!(file instanceof File)) throw new Error("Invalid file object");

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      callback(null, data);
    } catch (err) {
      callback(err, null);
    }
  };
  reader.onerror = function(err) {
    callback(err, null);
  };
  reader.readAsText(file);
}

// Save JSON sebagai file (browser)
export function saveJsonFile(data, filename = "data.json") {
  const jsonStr = exportToJson(data);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

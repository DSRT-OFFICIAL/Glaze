# Glaze 🎨

Library warna siap pakai untuk semua proyek (ESM & CJS).

[![CI](https://github.com/DSRT-OFFICIAL/Glaze/actions/workflows/publish.yml/badge.svg)](https://github.com/DSRT-OFFICIAL/Glaze/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@glaze-artweb/glaze.svg)](https://www.npmjs.com/package/@glaze-artweb/glaze)
[![codecov](https://codecov.io/gh/DSRT-OFFICIAL/Glaze/branch/main/graph/badge.svg?token=YOUR_CODECOV_TOKEN)](https://codecov.io/gh/DSRT-OFFICIAL/Glaze)

---

## ✨ Instalasi
```bash
npm install @glaze-artweb/glaze

📦 Pemakaian

ESM

import colors from "@glaze-artweb/glaze";

console.log(colors.red500); // #EF4444

CJS

const colors = require("@glaze-artweb/glaze/cjs");

console.log(colors.blue600); // #2563EB


---

🚀 Scripts

npm test → jalanin unit test

npm run release:patch → naik versi patch & push tag

npm run release:minor → naik versi minor

npm run release:major → naik versi major



---

✅ CI/CD

GitHub Actions → build & test otomatis

npm → publish otomatis saat ada tag

Codecov → laporan coverage

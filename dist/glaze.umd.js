(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
  typeof define === "function" && define.amd ? define(factory) :
  (global = global || self, global.Glaze = factory());
}(this, function () {
  'use strict';

  // Core
  var Color = /* import or copy Color class code here */;
  var Palette = /* import or copy Palette class code here */;
  var Utils = /* import or copy Utils code here */;

  // Conversion, Manipulation, Accessibility, Gradients, Palettes, Random, Effects, Analysis, IO
  // Copy semua fungsi dan object ke sini sama seperti di CJS/ESM

  return {
    Color,
    Palette,
    Utils,
    // Semua export lainnya
  };
}));

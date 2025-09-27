"use strict";

// Core
const { Color } = require("./core/Color");
const { Palette } = require("./core/Palette");
const Utils = require("./core/Utils");

// Conversion
const rgb = require("./conversion/rgb");
const hsl = require("./conversion/hsl");
const cmyk = require("./conversion/cmyk");
const lab = require("./conversion/lab");
const xyz = require("./conversion/xyz");
const hsv = require("./conversion/hsv");

// Manipulation
const lighten = require("./manipulation/lighten");
const darken = require("./manipulation/darken");
const saturate = require("./manipulation/saturate");
const desaturate = require("./manipulation/desaturate");
const blend = require("./manipulation/blend");
const mix = require("./manipulation/mix");
const invert = require("./manipulation/invert");

// Accessibility
const contrast = require("./accessibility/contrast");
const readability = require("./accessibility/readability");
const blindFriendly = require("./accessibility/blindFriendly");

// Gradients
const linear = require("./gradients/linear");
const radial = require("./gradients/radial");
const conic = require("./gradients/conic");

// Palettes
const GlazeBasicColors = require("./palettes/GlazeBasicColors");
const GlazeExtendedColors = require("./palettes/GlazeExtendedColors");
const GlazeVariantsColors = require("./palettes/GlazeVariantsColors");

// Random
const randomColor = require("./random/randomColor");
const randomPalette = require("./random/randomPalette");
const randomGradient = require("./random/randomGradient");

// Effects
const noise = require("./effects/noise");
const grain = require("./effects/grain");
const glow = require("./effects/glow");
const overlay = require("./effects/overlay");

// Analysis
const temperature = require("./analysis/temperature");
const harmony = require("./analysis/harmony");
const dominant = require("./analysis/dominant");
const contrastMap = require("./analysis/contrastMap");

// IO
const hexIO = require("./io/hex");
const cssIO = require("./io/css");
const jsonIO = require("./io/json");
const svgIO = require("./io/svg");

module.exports = {
  Color,
  Palette,
  Utils,
  rgb,
  hsl,
  cmyk,
  lab,
  xyz,
  hsv,
  lighten,
  darken,
  saturate,
  desaturate,
  blend,
  mix,
  invert,
  contrast,
  readability,
  blindFriendly,
  linear,
  radial,
  conic,
  GlazeBasicColors,
  GlazeExtendedColors,
  GlazeVariantsColors,
  randomColor,
  randomPalette,
  randomGradient,
  noise,
  grain,
  glow,
  overlay,
  temperature,
  harmony,
  dominant,
  contrastMap,
  hexIO,
  cssIO,
  jsonIO,
  svgIO,
};

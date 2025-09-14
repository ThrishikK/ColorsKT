import { tintsContainerFun } from "../components/tints.js";
import { shadesContainerFun } from "../components/shades.js";
import { updatingLocalStorage } from "./storage.js";
import { canvasGradientFun } from "../components/canvasGradient.js";

export function extraction(colorCode) {
  // console.log(colorCode);
  colorCode = colorCode.replace("rgb(", "").replace(")", "").split(",");
  let r = parseInt(colorCode[0]);
  let g = parseInt(colorCode[1]);
  let b = parseInt(colorCode[2]);

  return { r, g, b };
}

// RANDOM COLOR GENERATION
export function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const colorGenerated = `rgb(${r},${g},${b})`;
  return colorGenerated;
}

export function generatePallete() {
  const storedObject = JSON.parse(localStorage.getItem("colorPalette"));
  const { initialPallette, lockedArray } = storedObject;

  let generatedColorsList = [];
  for (let i = 0; i < 5; i++) {
    lockedArray[i]
      ? generatedColorsList.push(initialPallette[i])
      : generatedColorsList.push(generateRandomColor());
  }
  tintsContainerFun(generatedColorsList);
  shadesContainerFun(generatedColorsList);
  updatingLocalStorage(generatedColorsList);
  canvasGradientFun(generatedColorsList);
  return generatedColorsList;
}

export function hexToRgb(hex) {
  hex = hex.trim();
  if (hex[0] === "#") hex = hex.slice(1);
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16); // convert to hex
    return hex.length === 1 ? "0" + hex : hex; // pad single digit
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

// TINTS AND SHADES GENERATION

export function tintsGenerator(givenPallette) {
  const results = [];

  givenPallette.forEach((element) => {
    const { r, g, b } = extraction(element);
    const foreachColor = [];
    let steps = 5;
    // helper: convert to hex
    const toHex = (n) => n.toString(16).padStart(2, "0");
    const rgbToHex = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    // base color
    foreachColor.push(`rgb(${r},${g},${b})`);

    // generate tints (towards white)
    for (let i = 2; i <= steps; i++) {
      const factor = i / (steps + 1);
      const rt = Math.round(r + (255 - r) * factor);
      const gt = Math.round(g + (255 - g) * factor);
      const bt = Math.round(b + (255 - b) * factor);
      foreachColor.push(`rgb(${rt},${gt},${bt})`);
    }
    results.push(foreachColor);
  });
  return results;
}

export function shadesGenerator(givenPallette) {
  const results = [];

  givenPallette.forEach((element) => {
    const { r, g, b } = extraction(element);
    const foreachColor = [];
    let steps = 5;
    // helper: convert to hex
    const toHex = (n) => n.toString(16).padStart(2, "0");
    const rgbToHex = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    // base color
    foreachColor.push(`rgb(${r},${g},${b})`);

    // generate tints (towards white)
    for (let i = 2; i <= steps; i++) {
      const factor = 1 - i / (steps + 1);
      const rs = Math.round(r * factor);
      const gs = Math.round(g * factor);
      const bs = Math.round(b * factor);
      foreachColor.push(`rgb(${rs},${gs},${bs})`);
    }
    results.push(foreachColor);
  });
  return results;
}

export function hexToRgbHsl(hex) {
  const resultCodes = [];
  resultCodes.push(hex);
  // Remove '#' if present
  hex = hex.replace(/^#/, "");

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h, s, l;
  l = (max + min) / 2;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  resultCodes.push(`rgb(${r}, ${g}, ${b})`);
  resultCodes.push(`hsl(${h}, ${s}%, ${l}%)`);

  return resultCodes;
}

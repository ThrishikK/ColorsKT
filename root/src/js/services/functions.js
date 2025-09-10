function hexToRgb(hex) {
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

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16); // convert to hex
    return hex.length === 1 ? "0" + hex : hex; // pad single digit
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

// Example
console.log(rgbToHex(255, 99, 71)); // "#ff6347"

export function extraction(colorCode) {
  colorCode = colorCode.replace("rgb(", "").replace(")", "").split(",");
  let r = parseInt(colorCode[0]);
  let g = parseInt(colorCode[1]);
  let b = parseInt(colorCode[2]);

  return { r, g, b };
}

export function addPalletteFunction(palletteInnerContainer, colorsList) {
  colorsList.map((value) => {
    // COLOR BOX OUTER
    const palletteColorBoxOuter = document.createElement("div");
    palletteColorBoxOuter.classList.add("flex-column", "color-box-container");
    // COLOR BOX INNER
    const palletteColorBox = document.createElement("div");
    palletteColorBox.classList.add("color-box");
    palletteColorBox.dataset.boxColor = value;
    palletteColorBox.style.backgroundColor = value;
    palletteColorBoxOuter.appendChild(palletteColorBox);
    // COLOR CODE
    const palletteCode = document.createElement("p");
    let { r, g, b } = extraction(value);
    palletteCode.textContent = rgbToHex(r, g, b);
    palletteColorBoxOuter.append(palletteCode);

    palletteInnerContainer.appendChild(palletteColorBoxOuter);
  });
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
  let generatedColorsList = [];
  for (let i = 0; i < 5; i++) {
    generatedColorsList.push(generateRandomColor());
  }
  return generatedColorsList;
}

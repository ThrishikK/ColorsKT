export function addPalletteFunction(palletteInnerContainer, colorsList) {
  colorsList.map((value) => {
    const palletteColorBox = document.createElement("div");
    palletteColorBox.classList.add("color-box");
    palletteColorBox.dataset.boxColor = value;
    palletteColorBox.style.backgroundColor = value;

    palletteInnerContainer.appendChild(palletteColorBox);
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
  colorsList = [];
  for (let i = 0; i < 5; i++) {
    colorsList.push(generateRandomColor());
  }
}

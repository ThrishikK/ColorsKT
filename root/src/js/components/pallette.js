let colorsList = ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"];

// ELEMENTS
const palletteOuterContainer = document.getElementById(
  "palletteOuterContainer"
);
const palletteInnerContainer = document.getElementById(
  "palletteInnerContainer"
);

function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const colorGenerated = `rgb(${r},${g},${b})`;
  console.log(colorGenerated);
  return colorGenerated;
}

function generatePallete() {
  colorsList = [];
  for (let i = 0; i < 5; i++) {
    colorsList.push(generateRandomColor());
  }
}

function addGenerateButton() {
  const palletteGeneratorButton = document.createElement("button");
  palletteGeneratorButton.textContent = "Generate New";
  palletteOuterContainer.appendChild(palletteGeneratorButton);
  // ADDING EVENT LISTENERT TO BUTTON
  palletteGeneratorButton.addEventListener("click", () => {
    generatePallete();
    palletteInnerContainer.innerHTML = "";
    addPallette(colorsList);
  });
}

function addPallette(colorsList) {
  colorsList.map((value) => {
    const palletteColorBox = document.createElement("div");
    palletteColorBox.classList.add("color-box");
    palletteColorBox.style.backgroundColor = value;

    palletteInnerContainer.appendChild(palletteColorBox);
  });
  palletteOuterContainer.appendChild(palletteInnerContainer);
}

export function palletteContainerFun() {
  // ADDING PALLETTE
  addPallette(colorsList);
  //  ADDING  BUTTON
  addGenerateButton();
}

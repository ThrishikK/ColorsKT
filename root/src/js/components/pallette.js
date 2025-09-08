import initialPallette, { savePalette } from "../services/storage.js";
import { generatePallete, addPalletteFunction } from "../services/functions.js";
import modalListenkeys from "./modal.js";
// ELEMENTS
const palletteOuterContainer = document.getElementById(
  "palletteOuterContainer"
);
const palletteInnerContainer = document.getElementById(
  "palletteInnerContainer"
);
const palletteButtonsContainer = document.getElementById(
  "palletteButtonsContainer"
);

// FILE CODE
let colorsList = initialPallette;

function addGenerateButton() {
  const palletteGeneratorButton = document.createElement("button");
  palletteGeneratorButton.textContent = "Generate New";
  palletteGeneratorButton.classList.add("pallette-btn");
  palletteButtonsContainer.appendChild(palletteGeneratorButton);
  // ADDING EVENT LISTENERT TO BUTTON
  palletteGeneratorButton.addEventListener("click", () => {
    generatePallete();
    palletteInnerContainer.innerHTML = "";
    addPalletteFunction(palletteInnerContainer, colorsList);
  });
}

function addSavePalletteButton() {
  const palletteSaveButton = document.createElement("button");
  palletteSaveButton.textContent = "Save Pallette";
  palletteSaveButton.classList.add("pallette-btn", "save-helper");
  palletteButtonsContainer.appendChild(palletteSaveButton);
  // ADDING EVENT LISTENERT TO BUTTON
  palletteSaveButton.addEventListener("click", () => {
    savePalette(colorsList);
  });
}

// ADDING 2 BUTTONS
function addPalletteButtons() {
  addSavePalletteButton();
  addGenerateButton();
}

export function palletteContainerFun() {
  palletteOuterContainer.appendChild(palletteInnerContainer);

  // ADDING PALLETTE
  addPalletteFunction(palletteInnerContainer, colorsList);
  // ADDING EVENT LISTENER
  modalListenkeys.canvasEventListener(palletteInnerContainer);

  //  ADDING  BUTTONS
  addPalletteButtons();
}

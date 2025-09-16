import initialPallette, { savePalette } from "../services/storage.js";
import { generatePallete } from "../services/colorsRelated.js";
import { addPalletteFunction } from "../services/functions.js";
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
let colorsList = "";
// FUNCTION TO ERASE AND RE-GENERATE PALLETTE
function erasingPalletteDOM() {
  colorsList = generatePallete();
  console.log(JSON.parse(localStorage.getItem("colorPalette")));
  palletteInnerContainer.innerHTML = "";
  addPalletteFunction(palletteInnerContainer, colorsList, true);
}

function addGenerateButton() {
  const palletteGeneratorButton = document.createElement("button");
  palletteGeneratorButton.textContent = "Generate New";
  palletteGeneratorButton.classList.add("pallette-btn");
  palletteButtonsContainer.appendChild(palletteGeneratorButton);
  // ADDING EVENT LISTENERT TO BUTTON
  palletteGeneratorButton.addEventListener("click", erasingPalletteDOM);
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

export function palletteContainerFun(colorsList) {
  palletteInnerContainer.innerHTML = "";
  palletteButtonsContainer.innerHTML = "";
  // APPENDING INNER CONTAINER
  palletteOuterContainer.appendChild(palletteInnerContainer);

  // ADDING PALLETTE
  addPalletteFunction(palletteInnerContainer, colorsList, true);
  // ADDING EVENT LISTENER
  modalListenkeys.canvasEventListener(palletteInnerContainer, true);

  //  ADDING  BUTTONS
  addPalletteButtons();
}

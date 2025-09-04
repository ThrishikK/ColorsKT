import { savePalette, getPalette } from "../services/storage.js";
import modalListenkeys, { closeModal } from "./modal.js";

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

const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// FILE CODE
let colorsList = getPalette();

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
  savePalette(colorsList);
}

function addGenerateButton() {
  const palletteGeneratorButton = document.createElement("button");
  palletteGeneratorButton.textContent = "Generate New";
  palletteGeneratorButton.classList.add("pallette-btn");
  palletteButtonsContainer.appendChild(palletteGeneratorButton);
  // ADDING EVENT LISTENERT TO BUTTON
  palletteGeneratorButton.addEventListener("click", () => {
    generatePallete();
    palletteInnerContainer.innerHTML = "";
    addPallette(colorsList);
  });
}

function addSavePalletteButton() {
  const palletteSaveButton = document.createElement("button");
  palletteSaveButton.textContent = "Save Pallette";
  palletteSaveButton.classList.add("pallette-btn", "save-helper");
  palletteButtonsContainer.appendChild(palletteSaveButton);
}

function addPalletteButtons() {
  addSavePalletteButton();
  addGenerateButton();
}

function addPallette(colorsList) {
  colorsList.map((value) => {
    const palletteColorBox = document.createElement("div");
    palletteColorBox.classList.add("color-box");
    palletteColorBox.dataset.boxColor = value;
    palletteColorBox.style.backgroundColor = value;

    palletteInnerContainer.appendChild(palletteColorBox);
  });
}

// EVENT LISTENERS FROM MODAL.JS
modalListenkeys.canvasEventListener();
modalListenkeys.overlayEventListener();

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

export function palletteContainerFun() {
  palletteOuterContainer.appendChild(palletteInnerContainer);

  // ADDING PALLETTE
  addPallette(colorsList);
  //  ADDING  BUTTONS
  addPalletteButtons();
}

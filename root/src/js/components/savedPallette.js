import { getPalette } from "../services/storage.js";
import { addPalletteFunction } from "../services/functions.js";
import modalListenkeys from "./modal.js";

// ELEMENTS
const palletteSavedOuterContainer = document.getElementById(
  "savedOuterContainer"
);
const innerPalletteContainer = document.createElement("div");

let index = 0;
let savedPallettes;

function settingIndex(index) {
  if (index > savedPallettes.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = savedPallettes.length - 1;
  }
  return index;
}

function addingSavedPallette(index) {
  innerPalletteContainer.innerHTML = "";
  const presentPallette = savedPallettes[index];
  innerPalletteContainer.classList.add(
    "flex-row",
    "saved-pallettes",
    "pallette-inner-container"
  );
  innerPalletteContainer.dataset.savedIndex = index;
  // CALLING EVENT LISTENER
  modalListenkeys.canvasEventListener(innerPalletteContainer); // A=CALLING ADD PALLETTE FUNCTION
  addPalletteFunction(innerPalletteContainer, presentPallette);
}

function addCarouselButton(value, move) {
  const buttonEl = document.createElement("button");
  buttonEl.innerHTML = value;
  buttonEl.classList.add(move);
  palletteSavedOuterContainer.appendChild(buttonEl);
  // ADDING EVENTLISTENER
  buttonEl.addEventListener("click", function () {
    if (move === "prev") index--;
    if (move === "next") index++;
    index = settingIndex(index);
    console.log(move, index);
    // CALLING PALLETTE AGAIN WHEN FUNCTION CALLED
    addingSavedPallette(index);
  });
}

function paintingSavedDOM() {
  let object = getPalette();
  savedPallettes = object.savedPallettes;
  if (savedPallettes) {
    palletteSavedOuterContainer.appendChild(innerPalletteContainer);
    // ADDING LEFT BUTTON
    addCarouselButton("&#10094;", "prev");
    // ADDING PALLETTE AND EVENT LISTENERS
    addingSavedPallette(index);
    // ADDING RIGHT BUTTON
    addCarouselButton("&#10095;", "next");
  }
}

export function savedPallettesContainerFun() {
  paintingSavedDOM();
}

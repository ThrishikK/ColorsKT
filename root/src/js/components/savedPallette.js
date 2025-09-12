import { getPalette } from "../services/storage.js";
import {
  addingSectionPallette,
  addCarouselButton,
} from "../services/functions.js";

// ELEMENTS
const palletteSavedOuterContainer = document.getElementById(
  "savedOuterContainer"
);
const innerPalletteContainer = document.createElement("div");

let index = 0;
let savedPallettes;

function paintingSavedDOM() {
  let object = getPalette();
  savedPallettes = object.savedPallettes;
  if (savedPallettes) {
    palletteSavedOuterContainer.appendChild(innerPalletteContainer);
    // ADDING LEFT BUTTON
    addCarouselButton(
      palletteSavedOuterContainer,
      innerPalletteContainer,
      index,
      savedPallettes,
      savedPallettes.length - 1,
      "&#10094;",
      "prev"
    ); // ADDING PALLETTE AND EVENT LISTENERS
    addingSectionPallette(innerPalletteContainer, index, savedPallettes);
    // ADDING RIGHT BUTTON
    addCarouselButton(
      palletteSavedOuterContainer,
      innerPalletteContainer,
      index,
      savedPallettes,
      savedPallettes.length - 1,
      "&#10095;",
      "next"
    );
  }
}

export function savedPallettesContainerFun() {
  paintingSavedDOM();
}

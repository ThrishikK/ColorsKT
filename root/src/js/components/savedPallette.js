import { getPalette } from "../services/storage.js";
import { addPalletteFunction } from "../services/functions.js";
import modalListenkeys from "./modal.js";

// ELEMENTS
const palletteSavedOuterContainer = document.getElementById(
  "savedOuterContainer"
);

const { savedPallettes } = getPalette();
console.log(savedPallettes);

export function savedPallettesContainerFun() {
  if (savedPallettes) {
    savedPallettes.forEach((palette, index) => {
      const innerPalletteContainer = document.createElement("div");
      innerPalletteContainer.classList.add(
        "flex-row",
        "saved-pallettes",
        "pallette-inner-container"
        // `pallette-saved-${index}`
      );
      innerPalletteContainer.dataset.savedIndex = index;
      palletteSavedOuterContainer.appendChild(innerPalletteContainer);
      // CALLING EVENT LISTENER
      modalListenkeys.canvasEventListener(innerPalletteContainer);

      // A=CALLING ADD PALLETTE FUNCTION
      addPalletteFunction(innerPalletteContainer, palette);
    });
  }
}

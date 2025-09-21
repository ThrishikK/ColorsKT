import { addPalletteFunction } from "../services/functions.js";
import { savePalette } from "../services/storage.js";
import { customCanvasFun } from "./canvasCustom.js";
import modalListenkeys from "./modal.js";

const customPalletteOuterContainer = document.getElementById(
  "customPalletteOuterContainer"
);

const customPalletteInnerContainer = document.getElementById(
  "customPalletteInnerContainer"
);

const magniferSaveBtn = document.getElementById("magniferSaveBtn");

// EVENT LISTENER
magniferSaveBtn.addEventListener("click", () => {
  let colorsList = JSON.parse(
    localStorage.getItem("colorPalette")
  ).customColorsList;
  console.log(colorsList);
  savePalette(colorsList);
});

let initialCustomPalette = [
  "rgb(255,255,255)",
  "rgb(255,255,255)",
  "rgb(255,255,255)",
  "rgb(255,255,255)",
  "rgb(255,255,255)",
];

export function customPalletteFun() {
  let { customColorsList } = JSON.parse(localStorage.getItem("colorPalette"));
  customColorsList = customColorsList || initialCustomPalette;

  customPalletteInnerContainer.innerHTML = "";
  customCanvasFun();
  customPalletteOuterContainer.appendChild(customPalletteInnerContainer);
  customPalletteInnerContainer.classList.add(
    "flex-row",
    "saved-pallettes",
    "pallette-inner-container"
  );
  modalListenkeys.canvasEventListener(customPalletteInnerContainer);
  addPalletteFunction(customPalletteInnerContainer, customColorsList);
}

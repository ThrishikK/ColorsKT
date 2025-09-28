import initialPallette, { settingLocalStorageFun } from "./services/storage.js";

import { canvasThemeFun } from "./components/canvasTheme.js";
import { palletteContainerFun } from "./components/pallette.js";
import { savedPallettesContainerFun } from "./components/savedPallette.js";

import modalListenkeys, { closeModal } from "./components/modal.js";
import { tintsContainerFun } from "./components/tints.js";
import { shadesContainerFun } from "./components/shades.js";
import { canvasGradientFun } from "./components/canvasGradient.js";
import { colorCodeListener } from "./utils/evenListeners.js";
import { navbarListener } from "./utils/navbar.js";
import { customPalletteFun } from "./components/customPallete.js";
import { mosaicContainerFun } from "./components/canvasMosaic.js";

const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// EVENT LISTENERS FROM MODAL.JS
modalListenkeys.overlayEventListener();

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//CHECKING IF INITTAL PALLETTE IS IN STORAGE
// let initialColors =
//   JSON.parse(localStorage.getItem("colorPalette"))?.initialPallette ||
//   initialPallette;
// CALLING FUNCTIONS
settingLocalStorageFun();
// NAVBAR
navbarListener();
canvasThemeFun();
// EVENT LISTENERS TESTING
colorCodeListener();

// RENDERING PALLETTES BELOW
palletteContainerFun(initialPallette);
savedPallettesContainerFun();
customPalletteFun();
tintsContainerFun(initialPallette);
shadesContainerFun(initialPallette);
canvasGradientFun(initialPallette);
mosaicContainerFun(initialPallette);

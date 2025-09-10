// PREVIOUS;
import { canvasThemeFun } from "./components/canvasTheme.js";
import { palletteContainerFun } from "./components/pallette.js";
import { savedPallettesContainerFun } from "./components/savedPallette.js";

import modalListenkeys, { closeModal } from "./components/modal.js";

const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// EVENT LISTENERS FROM MODAL.JS
modalListenkeys.overlayEventListener();

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// CALLING FUNCTIONS
canvasThemeFun();
palletteContainerFun();
savedPallettesContainerFun();

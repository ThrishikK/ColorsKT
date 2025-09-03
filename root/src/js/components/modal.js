"use strict";
import { drawBars } from "./canvas.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

let selectedBox = "";

function extraction(colorCode) {
  colorCode = colorCode.replace("rgb(", "").replace(")", "").split(",");
  let r = parseInt(colorCode[0]);
  let g = parseInt(colorCode[1]);
  let b = parseInt(colorCode[2]);

  return { r, g, b };
}

function openModal(val) {
  let colorCode = val;
  let { r, g, b } = extraction(colorCode);

  // CALLING CANVAS
  drawBars(r, g, b);

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

export function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function canvasEventListener() {
  palletteInnerContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-box")) {
      selectedBox = e.target.dataset.boxColor;
      openModal(selectedBox);
    }
  });
}

function overlayEventListener() {
  document.addEventListener("keydown", function (e) {
    console.log(e.key);

    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

export default { canvasEventListener, overlayEventListener };

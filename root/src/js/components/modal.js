"use strict";
import { drawBars } from "./canvasBar.js";
import { drawRgbPie } from "./canvasPie.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const canvasBtnsContainer = document.querySelector(".canvas-btns-container");

let selectedBox = "";
let selectedChart = "bar";
let other = "pie";

function extraction(colorCode) {
  colorCode = colorCode.replace("rgb(", "").replace(")", "").split(",");
  let r = parseInt(colorCode[0]);
  let g = parseInt(colorCode[1]);
  let b = parseInt(colorCode[2]);

  return { r, g, b };
}

function addingHiddenClasses(type, other) {
  // console.log(type, other);
  const selectecdCanvas = document.getElementById(`${type}Graph`);
  const nonSelectecdCanvas = document.getElementById(`${other}Graph`);
  // console.log(selectecdCanvas);
  // console.log(nonSelectecdCanvas);

  const activeBtn = document.querySelector(`.canvas-btn-${type}`);
  const passiveBtn = document.querySelector(`.canvas-btn-${other}`);

  selectecdCanvas.classList.remove("hidden");
  nonSelectecdCanvas.classList.add("hidden");

  // Button classes switching
  activeBtn.classList.add("active-btn");
  activeBtn.classList.remove("passive-btn");
  passiveBtn.classList.add("passive-btn");
  passiveBtn.classList.remove("active-btn");
}

function openModal(val, type) {
  // console.log(type);
  let colorCode = val;
  let { r, g, b } = extraction(colorCode);

  if (type === "bar") {
    other = "pie";
    addingHiddenClasses(type, other);
    drawBars(r, g, b);
  } else {
    other = "bar";
    addingHiddenClasses(type, other);
    drawRgbPie(r, g, b);
  }
  // CALLING CANVAS
  //  1 BAR GRAPH

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

canvasBtnsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("canvas-btn")) {
    selectedChart = e.target.dataset.canvasType;
    openModal(selectedBox, selectedChart);
  }
});

export function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function canvasEventListener(palletteInnerContainer) {
  palletteInnerContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-box")) {
      selectedBox = e.target.dataset.boxColor;
      openModal(selectedBox, selectedChart);
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

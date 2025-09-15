"use strict";
import { drawBars } from "./canvasBar.js";
import { drawRgbPie } from "./canvasPie.js";
import { extraction } from "../services/colorsRelated.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const canvasBtnsContainer = document.querySelector(".canvas-btns-container");

let selectedBox = "";
let selectedChart = "bar";
let selectecdCanvas = "";
let selectedBtn = "";

function addingHiddenClasses(type) {
  const allCanvases = document.querySelectorAll(".canvas-color-graph");
  console.log(allCanvases);
  const canvasBtns = document.querySelectorAll(".canvas-color-btn");
  console.log(canvasBtns);

  allCanvases.forEach((eachCanvas) => {
    eachCanvas.classList.add("hidden");
  });

  canvasBtns.forEach((eachBtn) => {
    eachBtn.classList.add("passive-btn");
  });

  selectecdCanvas = document.getElementById(`${type}Graph`);
  selectecdCanvas.classList.remove("hidden");
  selectedBtn = document.querySelector(`.canvas-btn-${type}`);
  selectedBtn.classList.remove("passive-btn");
  selectedBtn.classList.add("active-btn");
  // const nonSelectecdCanvas = document.getElementById(`${other}Graph`);

  // const activeBtn = document.querySelector(`.canvas-btn-${type}`);
  // const passiveBtn = document.querySelector(`.canvas-btn-${other}`);

  // nonSelectecdCanvas.classList.add("hidden");

  // activeBtn.classList.remove("passive-btn");
  // passiveBtn.classList.add("passive-btn");
  // passiveBtn.classList.remove("active-btn");
}

function openModal(val, type) {
  console.log(type);
  let colorCode = val;
  let { r, g, b } = extraction(colorCode);

  if (type === "bar") {
    addingHiddenClasses(type);
    drawBars(r, g, b);
  } else {
    addingHiddenClasses(type);
    drawRgbPie(r, g, b);
  }
  // CALLING CANVAS
  //  1 BAR GRAPH

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

canvasBtnsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("canvas-color-btn")) {
    selectedChart = e.target.dataset.canvasType;
    openModal(selectedBox, selectedChart);
  }
});

export function closeModal() {
  selectecdCanvas.classList.add("hidden");
  selectedBtn.classList.add("passive-btn");

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

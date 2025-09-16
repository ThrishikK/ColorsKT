"use strict";
import { drawBars } from "./canvasBar.js";
import { drawRgbPie } from "./canvasPie.js";
import { extraction } from "../services/colorsRelated.js";
import { drawPicker } from "./colorPicker.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const canvasBtnsContainer = document.querySelector(".canvas-btns-container");

let selectedBox = "";
let selectedChart = "bar";
let selectecdCanvas = "";
let selectedBtn = "";
let pickerDomFlag = false;
let swatchFlagForPicker = false;
// CANVAS PICKER BUTTON DOM
const canvasPickerBtn = document.createElement("button");
canvasPickerBtn.textContent = "Picker";
canvasPickerBtn.classList.add("canvas-color-btn", "canvas-btn-picker");
canvasPickerBtn.dataset.canvasType = "picker";
canvasPickerBtn.id = "canvasPickerBtnId";

// AFTER PICKER BUTTON ADDED ,ADDING SWATCH AND SELECT BUTTONS
const colorPickerContainer = document.createElement("div");
colorPickerContainer.classList.add("picker-container");
colorPickerContainer.id = "colorPickerContainerId";

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

  if (type === "picker") {
  }
}

function openModal(val, type) {
  console.log(type);
  let colorCode = val;
  let { r, g, b } = extraction(colorCode);

  if (type === "bar") {
    addingHiddenClasses(type);
    drawBars(r, g, b);
  } else if (type === "pie") {
    addingHiddenClasses(type);
    drawRgbPie(r, g, b);
  } else {
    addingHiddenClasses(type);
    drawPicker();
  }
  // CALLING CANVAS
  //  1 BAR GRAPH

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function updatingModalDom() {
  if (swatchFlagForPicker) {
    modal.appendChild(colorPickerContainer);
  } else {
    const colorPickerContainerId = document.getElementById(
      "colorPickerContainerId"
    );
    console.log(colorPickerContainerId);
    if (colorPickerContainerId) {
      modal.removeChild(colorPickerContainer);
    }
  }
}

canvasBtnsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("canvas-color-btn")) {
    if (e.target.classList.contains("canvas-btn-picker")) {
      swatchFlagForPicker = true;
    } else {
      swatchFlagForPicker = false;
    }
    updatingModalDom();
    //
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

function addingPickerBtn() {
  if (pickerDomFlag) {
    canvasBtnsContainer.appendChild(canvasPickerBtn);
    // modal.appendChild(colorPickerContainer);
  } else {
    const canvasPickerBtnId = document.getElementById("colorPickerContainerId");
    if (canvasPickerBtnId) {
      canvasBtnsContainer.removeChild(canvasPickerBtn);
    }
    // modal.removeChild(colorPickerContainer);
  }
}

function canvasEventListener(palletteInnerContainer, isFromGenerate = false) {
  palletteInnerContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-box")) {
      if (e.target.dataset.fromGenerate) {
        pickerDomFlag = true;
      } else {
        pickerDomFlag = false;
      }
      addingPickerBtn();
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

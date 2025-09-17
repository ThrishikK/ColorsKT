"use strict";
import { drawBars } from "./canvasBar.js";
import { drawRgbPie } from "./canvasPie.js";
import { extraction, reRender } from "../services/colorsRelated.js";
import { drawPicker, colorPickerEvenListener } from "./colorPicker.js";
import { palletteContainerFun } from "./pallette.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const canvasBtnsContainer = document.querySelector(".canvas-btns-container");

let selectedBox = "";
let selectedChart = "bar";
let selectecdCanvas = "";
let selectedBtn = "";
let pickerDomFlag = false;
let swatchFlagForPicker = false;
let selectedColorIndex = null;
let selectedColorBox = "";
// CANVAS PICKER BUTTON DOM
const canvasPickerBtn = document.createElement("button");
canvasPickerBtn.textContent = "Picker";
canvasPickerBtn.classList.add("canvas-color-btn", "canvas-btn-picker");
canvasPickerBtn.dataset.canvasType = "picker";
canvasPickerBtn.id = "canvasPickerBtnId";

// AFTER PICKER BUTTON ADDED ,ADDING SWATCH AND SELECT BUTTONS
const colorPickerContainer = document.createElement("div");
colorPickerContainer.classList.add(
  "picker-container",
  "flex-row",
  "c-center-r-sp-between"
);
colorPickerContainer.id = "colorPickerContainerId";

const pickerSwatchEl = document.createElement("div");
pickerSwatchEl.classList.add("color-preview");
colorPickerContainer.appendChild(pickerSwatchEl);

const swatchText = document.createElement("p");
swatchText.textContent = "rgb(53, 166, 255)";
colorPickerContainer.appendChild(swatchText);

const selectBtn = document.createElement("button");
selectBtn.textContent = "Select";
selectBtn.classList.add("canvas-color-btn", "canvas-select-btn");
colorPickerContainer.appendChild(selectBtn);

function addingHiddenClasses(type) {
  console.log(type);
  const allCanvases = document.querySelectorAll(".canvas-color-graph");
  // console.log(allCanvases);
  const canvasBtns = document.querySelectorAll(".canvas-color-btn");
  // console.log(canvasBtns);

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

function removingColorPickerContainer() {
  const colorPickerContainerId = document.getElementById(
    "colorPickerContainerId"
  );
  console.log(colorPickerContainerId);
  if (colorPickerContainerId) {
    modal.removeChild(colorPickerContainer);
  }
}

function updatingModalDom() {
  if (swatchFlagForPicker) {
    modal.appendChild(colorPickerContainer);
  } else {
    removingColorPickerContainer();
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
  // CONSIDEER BELOW 4 LINES ARE REACT STATE UPDATING
  selectedChart = "bar";
  pickerDomFlag = false;
  swatchFlagForPicker = false;
  removingColorPickerContainer();

  // ADDING HIDDEN CLASSES
  selectecdCanvas.classList.add("hidden");
  selectedBtn.classList.add("passive-btn");

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

selectBtn.addEventListener("click", function () {
  console.log(swatchText.textContent);
  const storageObject = JSON.parse(localStorage.getItem("colorPalette"));
  console.log(selectedColorIndex);
  storageObject.initialPallette[selectedColorIndex] = swatchText.textContent;

  // UPDATING LOCAL STORAGE AND RE-RENDERING PALLETTE 👆
  palletteContainerFun(storageObject.initialPallette);
  reRender(storageObject.initialPallette);
  closeModal();
});

function addingPickerBtn() {
  console.log(pickerDomFlag);
  if (pickerDomFlag) {
    canvasBtnsContainer.appendChild(canvasPickerBtn);
    colorPickerEvenListener(swatchText, pickerSwatchEl);
    // modal.appendChild(colorPickerContainer);
  } else {
    const canvasPickerBtnId = document.getElementById("canvasPickerBtnId");
    console.log(canvasPickerBtnId);
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
        selectedColorIndex = e.target.dataset.generateIndex;
        // console.log(selectedColorIndex);
        selectedColorBox = e.target;
        console.log(selectedColorBox);
        pickerDomFlag = true;
      } else {
        pickerDomFlag = false;
      }
      addingPickerBtn();
      selectedBox = e.target.dataset.boxColor;
      console.log(selectedChart);
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

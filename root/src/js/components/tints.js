import {
  addingSectionPallette,
  addCarouselButton,
} from "../services/functions.js";
import { tintsGenerator } from "../services/colorsRelated.js";

// ELEMENTS
const tintsOuterContainer = document.getElementById("tintsOuterContainer");
const tintsInnerContainer = document.createElement("div");

let index = 0;

function paintingTintsDOM(initialPallette) {
  let tints = tintsGenerator(initialPallette);
  tintsOuterContainer.appendChild(tintsInnerContainer);
  // ADDING LEFT BUTTON
  addCarouselButton(
    tintsOuterContainer,
    tintsInnerContainer,
    index,
    tints,
    tints.length - 1,
    "&#10094;",
    "prev"
  ); // ADDING PALLETTE AND EVENT LISTENERS
  addingSectionPallette(tintsInnerContainer, index, tints);
  // ADDING RIGHT BUTTON
  addCarouselButton(
    tintsOuterContainer,
    tintsInnerContainer,
    index,
    tints,
    tints.length - 1,
    "&#10095;",
    "next"
  );
}

export function tintsContainerFun(initialPallette) {
  paintingTintsDOM(initialPallette);
}

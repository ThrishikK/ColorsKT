import {
  addingSectionPallette,
  addCarouselButton,
} from "../services/functions.js";
import { shadesGenerator } from "../services/colorsRelated.js";

// ELEMENTS
const shadesOuterContainer = document.getElementById("shadesOuterContainer");
const shadesInnerContainer = document.createElement("div");

let index = 0;

function paintingShadesDOM(initialPallette) {
  let shades = shadesGenerator(initialPallette);
  shadesOuterContainer.appendChild(shadesInnerContainer);
  // ADDING LEFT BUTTON
  addCarouselButton(
    shadesOuterContainer,
    shadesInnerContainer,
    index,
    shades,
    shades.length - 1,
    "&#10094;",
    "prev"
  ); // ADDING PALLETTE AND EVENT LISTENERS
  addingSectionPallette(shadesInnerContainer, index, shades);
  // ADDING RIGHT BUTTON
  addCarouselButton(
    shadesOuterContainer,
    shadesInnerContainer,
    index,
    shades,
    shades.length - 1,
    "&#10095;",
    "next"
  );
}

export function shadesContainerFun(initialPallette) {
  paintingShadesDOM(initialPallette);
}

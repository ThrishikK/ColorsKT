import initialPallette, { savePalette } from "../services/storage.js";

const tintsAndShadesOuterContainer = document.getElementById(
  "tintsAndShadesOuterContainer"
);

const tintsOuterContainer = document.createElement("div");

const shadesOuterContainer = document.createElement("div");

export function tintsAndShadesContainerFun() {
  tintsAndShadesOuterContainer.appendChild(tintsOuterContainer);
  tintsAndShadesOuterContainer.appendChild(shadesOuterContainer);
}

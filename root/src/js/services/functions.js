import modalListenkeys from "../components/modal.js";
import { extraction, rgbToHex } from "./colorsRelated.js";
import { updatingLocalStorage } from "./storage.js";
import { palletteContainerFun } from "../components/pallette.js";

// let colorsList = [];

// 😀😁😂🤣😃😄😅😆
// function handleLockClick(e) {
//   if (e.target.classList.contains("lock-icon")) {
//     const lockIconIndex = e.target.dataset.lockIconIndex;

//     updatingLocalStorage(colorsList, lockIconIndex);
//     console.log("Calling Palette Function");
//     palletteContainerFun();
//   }
// }

// function lockIconEventListener(container) {
//   container.addEventListener("click", handleLockClick);
// }
// 😀😁😂🤣😃😄😅😆

// keep a reference outside so it survives across calls
let lockHandlerRef = null;

function lockIconEventListener(container, colorsList) {
  // If handler already exists, remove it first
  if (lockHandlerRef) {
    container.removeEventListener("click", lockHandlerRef);
  }

  // Create new handler with latest colorsList
  lockHandlerRef = function (e) {
    if (e.target.classList.contains("lock-icon")) {
      const lockIconIndex = e.target.dataset.lockIconIndex;

      updatingLocalStorage(colorsList, lockIconIndex);
      console.log("Calling Palette Function");
      palletteContainerFun(colorsList);
    }
  };

  // Add the new one
  container.addEventListener("click", lockHandlerRef);
}

export function addPalletteFunction(
  palletteInnerContainer,
  colorsList,
  lockIcon = false
) {
  const storedObject = JSON.parse(localStorage.getItem("colorPalette"));
  const { lockedArray } = storedObject;
  // console.log(colorsList);
  colorsList.map((value, i) => {
    // console.log(i);
    // COLOR BOX OUTER
    const palletteColorBoxOuter = document.createElement("div");
    palletteColorBoxOuter.classList.add("flex-column", "color-box-container");
    // COLOR BOX INNER
    const palletteColorBox = document.createElement("div");
    palletteColorBox.classList.add("color-box");
    palletteColorBox.dataset.boxColor = value;
    palletteColorBox.style.backgroundColor = value;
    palletteColorBoxOuter.appendChild(palletteColorBox);
    // ADDING LOCK
    if (lockIcon) {
      palletteColorBox.classList.add("flex-column");
      palletteColorBox.dataset.fromGenerate = true;
      //LOCK ICON ADDED TO palletteColorBox
      const buttonEl = document.createElement("button");

      buttonEl.innerHTML = lockedArray[i] ? "&#128274;" : "&#128275;";
      buttonEl.classList.add("lock-icon");
      lockedArray[i] ? buttonEl.classList.add("color-locked") : null;
      buttonEl.dataset.lockIconIndex = i;
      palletteColorBox.appendChild(buttonEl);
    }

    // COLOR CODE
    const palletteCode = document.createElement("p");
    palletteCode.classList.add("color-code-p-element");
    let { r, g, b } = extraction(value);
    let rgbToHexResult = rgbToHex(r, g, b);
    palletteCode.textContent = rgbToHexResult;
    palletteCode.dataset.colorCodeIndex = 0;
    palletteCode.dataset.hexCode = rgbToHexResult;

    palletteColorBoxOuter.append(palletteCode);

    palletteInnerContainer.appendChild(palletteColorBoxOuter);
  });
  // ADDING LOCK ICON EVENT LISTENER
  if (lockIcon) {
    lockIconEventListener(palletteInnerContainer, colorsList);
  }
}

function settingIndex(index, boundary) {
  if (index > boundary) {
    index = 0;
  } else if (index < 0) {
    index = boundary;
  }
  return index;
}

export function addingSectionPallette(
  innerPalletteContainer,
  index,
  pallettesList
) {
  innerPalletteContainer.innerHTML = "";
  const presentPallette = pallettesList[index];
  // console.log(pallettesList);
  innerPalletteContainer.classList.add(
    "flex-row",
    "saved-pallettes",
    "pallette-inner-container"
  );
  innerPalletteContainer.dataset.savedIndex = index;
  // CALLING EVENT LISTENER
  modalListenkeys.canvasEventListener(innerPalletteContainer, false); // A=CALLING ADD PALLETTE FUNCTION
  addPalletteFunction(innerPalletteContainer, presentPallette);
}

export function addCarouselButton(
  sectionOuterContainer,
  sectionInnerContainer,
  sectionIndex,
  pallettesList,
  boundary,
  value,
  move
) {
  // ADDING CAROUSEL BUTTONS
  // let boundary = pallettesList.length - 1;
  const buttonEl = document.createElement("button");
  buttonEl.innerHTML = value;
  buttonEl.classList.add(move);
  sectionOuterContainer.appendChild(buttonEl);
  // ADDING EVENTLISTENER
  buttonEl.addEventListener("click", function () {
    if (move === "prev") sectionIndex--;
    if (move === "next") sectionIndex++;
    sectionIndex = settingIndex(sectionIndex, boundary);
    console.log(move, sectionIndex);
    // CALLING PALLETTE AGAIN WHEN FUNCTION CALLED
    addingSectionPallette(sectionInnerContainer, sectionIndex, pallettesList);
  });
}

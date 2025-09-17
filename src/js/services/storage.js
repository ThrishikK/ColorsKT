import { savedPallettesContainerFun } from "../components/savedPallette.js";

let initialPallette = [
  "rgb(3, 4, 94)",
  "rgb(0, 119, 182)",
  "rgb(0, 180, 216)",
  "rgb(144, 224, 239)",
  "rgb(202, 240, 248)",
];

let storedData;
let storageObject;

// Try to load from localStorage
export function settingLocalStorageFun() {
  storedData = JSON.parse(localStorage.getItem("colorPalette"));

  storageObject = storedData || {
    initialPallette,
    savedPallettes: [],
    theme: "dark",
    lockedArray: [false, false, false, false, false],
  };
  // console.log(storageObject);

  localStorage.setItem("colorPalette", JSON.stringify(storageObject));
}

export function updatingLocalStorage(pallette, index = null) {
  storedData = JSON.parse(localStorage.getItem("colorPalette"));
  storedData.lockedArray[index] = !storedData.lockedArray[index];
  storedData.initialPallette = pallette;
  console.log(storedData);
  localStorage.setItem("colorPalette", JSON.stringify(storedData));
}

export default initialPallette;

export function savePalette(palette) {
  console.log(storageObject);
  storageObject.savedPallettes.push(palette);
  localStorage.setItem("colorPalette", JSON.stringify(storageObject));
  console.log(storageObject);
  savedPallettesContainerFun();
}

export function getPalette() {
  const palette = localStorage.getItem("colorPalette");
  return palette ? JSON.parse(palette) : null;
}

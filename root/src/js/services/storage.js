let initialPallette = [
  "rgb(3, 4, 94)",
  "rgb(0, 119, 182)",
  "rgb(0, 180, 216)",
  "rgb(144, 224, 239)",
  "rgb(202, 240, 248)",
];

// Try to load from localStorage
let storedData = JSON.parse(localStorage.getItem("colorPalette"));

let storageObject = storedData || {
  initialPallette,
  savedPallettes: [],
};

export default initialPallette;

export function savePalette(palette) {
  storageObject.savedPallettes.push(palette);
  localStorage.setItem("colorPalette", JSON.stringify(storageObject));
  console.log(storageObject);
}

export function getPalette() {
  const palette = localStorage.getItem("colorPalette");
  return palette ? JSON.parse(palette) : null;
}

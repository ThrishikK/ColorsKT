let colorsList = ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"];

export function savePalette(palette) {
  localStorage.setItem("colorPalette", JSON.stringify(palette));
}

export function getPalette() {
  const palette = localStorage.getItem("colorPalette");
  return palette ? JSON.parse(palette) : colorsList;
}

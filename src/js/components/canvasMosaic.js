// import initialPallette from "../services/storage";

const mosaicCanvas = document.getElementById("mosaicCanvas");
const ctx = mosaicCanvas.getContext("2d");

const mosaicDownloadBtn = document.getElementById("mosaicDownloadBtn");

// Set mosaicCanvas size
mosaicCanvas.width = 400;
mosaicCanvas.height = 400;

// Example 5 hex codes (replace these with your own)
// const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"];

// Size of each "tile" in the mosaic
const tileSize = 10;

// Function to draw mosaic
function drawMosaic(initialPallette) {
  for (let y = 0; y < mosaicCanvas.height; y += tileSize) {
    for (let x = 0; x < mosaicCanvas.width; x += tileSize) {
      // Pick a random color from the palette
      const color =
        initialPallette[Math.floor(Math.random() * initialPallette.length)];
      ctx.fillStyle = color;
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

mosaicDownloadBtn.addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "Mosaic.png"; // file name
  link.href = mosaicCanvas.toDataURL("image/png"); // convert to base64 PNG
  link.click();
});

// Draw once when page loads

export function mosaicContainerFun(initialPallette) {
  drawMosaic(initialPallette);
}

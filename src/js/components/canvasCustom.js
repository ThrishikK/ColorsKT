import { customPalletteFun } from "./customPallete.js";

const customCanvas = document.getElementById("customCanvas");
const ctx = customCanvas.getContext("2d");

const magnifierCanvas = document.getElementById("magnifier");
const magnifierCtx = magnifierCanvas.getContext("2d");

const preview = document.getElementById("preview");
const magnifySelectBtn = document.querySelector(".magnify-select-btn");

const customPalletteInnerContainer = document.getElementById(
  "customPalletteInnerContainer"
);

let mouseRgb = "";
let selectedRgb = "rgb(255,255,255)";

let customIndex = 0;

// 🎨 Fill main canvas with random pattern
function drawcustomCanvas() {
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.5, "blue");
  gradient.addColorStop(1, "green");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // add random circles
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 400, Math.random() * 400, 15, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 50%)`;
    ctx.fill();
  }
}

// Convert RGB → HEX
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// 🧐 Magnifier logic
customCanvas.addEventListener("mousemove", (e) => {
  const rect = customCanvas.getBoundingClientRect();
  // console.log(rect);
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  // console.log(x, y);
  // zoom in area around cursor
  const zoomSize = 20;
  const scale = 5;
  // console.log(x - zoomSize / 2, y - zoomSize / 2);

  const imageData = ctx.getImageData(
    x - zoomSize / 2,
    y - zoomSize / 2,
    zoomSize,
    zoomSize
  );
  magnifierCtx.clearRect(0, 0, magnifierCanvas.width, magnifierCanvas.height);
  magnifierCtx.imageSmoothingEnabled = false; // keep pixelated
  magnifierCtx.putImageData(imageData, 0, 0);
  magnifierCtx.drawImage(
    magnifierCanvas,
    0,
    0,
    zoomSize,
    zoomSize,
    0,
    0,
    100,
    100
  );

  // current pixel color
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
  mouseRgb = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  preview.style.background = hex;
});
// COLOR CLICKED
customCanvas.addEventListener("click", (e) => {
  selectedRgb = mouseRgb;
  // console.log(selectedRgb);
});

magnifySelectBtn.addEventListener("click", function () {
  console.log(selectedRgb, customIndex);
  //

  let storageObject = JSON.parse(localStorage.getItem("colorPalette"));
  // console.log(storageObject);
  storageObject.customColorsList[customIndex] = selectedRgb;
  localStorage.setItem("colorPalette", JSON.stringify(storageObject));
  console.log(storageObject);
  customPalletteFun();
  customIndex++;
  if (customIndex == 5) customIndex = 0;
});

export function customCanvasFun() {
  drawcustomCanvas();
}

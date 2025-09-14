// import initialPallette from "../services/storage.js";
const gradientsInnerContainer = document.getElementById(
  "gradientsInnerContainer"
);
const linearGradientCanvas = document.getElementById("linearGradientCanvas");
const radialGradientCanvas = document.getElementById("radialGradientCanvas");

const ctxLinear = linearGradientCanvas.getContext("2d");
const ctxGradient = radialGradientCanvas.getContext("2d");

linearGradientCanvas.width = 300;
linearGradientCanvas.height = 300;

radialGradientCanvas.width = 300;
radialGradientCanvas.height = 300;

function paintLinearGradient(initialPallette) {
  const linearGradient = ctxLinear.createLinearGradient(
    0,
    0,
    linearGradientCanvas.width,
    linearGradientCanvas.height
  );
  linearGradient.addColorStop(0, initialPallette[0]);
  linearGradient.addColorStop(0.25, initialPallette[1]);
  linearGradient.addColorStop(0.5, initialPallette[2]);
  linearGradient.addColorStop(0.75, initialPallette[3]);
  linearGradient.addColorStop(1, initialPallette[4]);
  //
  ctxLinear.fillStyle = linearGradient;
  ctxLinear.fillRect(
    0,
    0,
    linearGradientCanvas.width,
    linearGradientCanvas.height
  );
}

function paintRadialGradient(initialPallette) {
  const radialGradient = ctxGradient.createRadialGradient(
    radialGradientCanvas.width / 2,
    radialGradientCanvas.height / 2,
    0,
    radialGradientCanvas.width / 2,
    radialGradientCanvas.height / 2,
    radialGradientCanvas.width / 2
  );
  radialGradient.addColorStop(0, initialPallette[0]);
  radialGradient.addColorStop(0.25, initialPallette[1]);
  radialGradient.addColorStop(0.5, initialPallette[2]);
  radialGradient.addColorStop(0.75, initialPallette[3]);
  radialGradient.addColorStop(1, initialPallette[4]);

  ctxGradient.fillStyle = radialGradient;
  ctxGradient.fillRect(
    0,
    0,
    radialGradientCanvas.width,
    radialGradientCanvas.height
  );
}

function handleResizing(initialPallette) {
  const width = window.innerWidth;
  if (width > 900) {
    linearGradientCanvas.width = 400;
    linearGradientCanvas.height = 400;

    radialGradientCanvas.width = 400;
    radialGradientCanvas.height = 400;
  } else {
    linearGradientCanvas.width = 300;
    linearGradientCanvas.height = 300;

    radialGradientCanvas.width = 300;
    radialGradientCanvas.height = 300;
  }
  paintGradients(initialPallette);
}

function paintGradients(initialPallette) {
  paintLinearGradient(initialPallette);
  paintRadialGradient(initialPallette);
}

window.addEventListener("resize", function () {
  const localData = JSON.parse(localStorage.getItem("colorPalette"));
  handleResizing(localData.initialPallette);
});

// GRADIENT DOWNLOAD EVENTLISTENER START 👶
gradientsInnerContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("gradient-download-btn")) {
    const selectedCanvasText = e.target.dataset.gradientType;
    const selectedCanvasId = document.getElementById(selectedCanvasText);
    console.log(selectedCanvasId);
    // DOWNLOADING
    const link = document.createElement("a");
    link.download = "gradient.png"; // file name
    link.href = selectedCanvasId.toDataURL("image/png"); // convert to base64 PNG
    link.click();
  }
});

export function canvasGradientFun(initialPallette) {
  paintGradients(initialPallette);
}

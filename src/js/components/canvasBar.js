const canvas = document.getElementById("barGraph");

const ctx = canvas.getContext("2d");
canvas.height = 350;
canvas.width = 350;

let BAR_WIDTH = 30;
let INTERVAL = 100;
let BAR_X = 85;
let COLOR_TEXT_SWATCH_X = null;
let COLOR_SWATCH_X = null;

function writeText(text, size, color, x, y) {
  ctx.font = `${size}px Times New Roman`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawSwatch(r, g, b) {
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(COLOR_SWATCH_X, 10, 50, 25);
  // writing text
  writeText("Color  -", 15, "black", COLOR_TEXT_SWATCH_X, 28);
  console.log(COLOR_TEXT_SWATCH_X);
}

function drawAxis() {
  ctx.strokeStyle = "#160b0bff";
  ctx.beginPath();

  for (let i = 0; i <= 255; i += 51) {
    ctx.moveTo(50, 45 + i);
    ctx.lineTo(canvas.width, 45 + i);
    // console.log(45 + i);
    writeText(255 - i, 15, "black", 20, 50 + i);
  }
  ctx.stroke();
}

function drawColorBars(r, g, b) {
  const values = [
    {
      x: INTERVAL * 0 + BAR_X,
      y: 300 - r,
      width: BAR_WIDTH,
      height: r,
      color: "red",
      label: "R",
    },
    {
      x: INTERVAL * 1 + BAR_X,
      y: 300 - g,
      width: BAR_WIDTH,
      height: g,
      color: "green",
      label: "G",
    },
    {
      x: INTERVAL * 2 + BAR_X,
      y: 300 - b,
      width: BAR_WIDTH,
      height: b,
      color: "blue",
      label: "B",
    },
  ];

  values.forEach((record) => {
    // console.log(record);
    ctx.fillStyle = record.color;
    ctx.fillRect(record.x, record.y, record.width, record.height);
    writeText(
      `${record.label} - ${record.height}`,
      12,
      record.color,
      record.x,
      315
    );
  });
}

function drawCanvasBars(r, g, b) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // drawswatch
  drawSwatch(r, g, b);
  // draw axis
  drawAxis();
  // color bars
  drawColorBars(r, g, b);
}

function renderBars(r, g, b) {
  function checkDevice() {
    if (window.innerWidth < 400) {
      INTERVAL = 75;
      canvas.width = 300;
      COLOR_TEXT_SWATCH_X = (canvas.width - 88) / 2;
      COLOR_SWATCH_X = COLOR_TEXT_SWATCH_X + 50;
    } else {
      INTERVAL = 100;
      canvas.width = 350;
      COLOR_TEXT_SWATCH_X = (canvas.width - 88) / 2;
      COLOR_SWATCH_X = COLOR_TEXT_SWATCH_X + 50;
    }
    drawCanvasBars(r, g, b);
  }

  // Run once on load
  checkDevice();

  // Also listen for future resizes
  window.addEventListener("resize", checkDevice);
}

export function drawBars(r = 125, g = 75, b = 256) {
  renderBars(r, g, b);
}

// // -----PREVIOUS 👇👇🙌👇🙌👇

// const canvas = document.getElementById("barGraph");

// const ctx = canvas.getContext("2d");
// canvas.height = 350;
// canvas.width = 350;

// function writeText(text, size, color, x, y) {
//   ctx.font = `${size}px Times New Roman`;
//   ctx.fillStyle = color;
//   ctx.fillText(text, x, y);
// }

// function drawSwatch(r, g, b) {
//   ctx.fillStyle = `rgb(${r},${g},${b})`;
//   ctx.fillRect(175, 10, 50, 25);
//   writeText("Color  -", 15, "black", 120, 28);
// }

// function drawAxis() {
//   ctx.strokeStyle = "#160b0bff";
//   ctx.beginPath();

//   for (let i = 0; i <= 255; i += 51) {
//     ctx.moveTo(50, 45 + i);
//     ctx.lineTo(350, 45 + i);
//     writeText(255 - i, 15, "black", 20, 50 + i);
//   }
//   ctx.stroke();
// }

// function drawColorBars(r, g, b) {
//   const values = [
//     { x: 85, y: 300 - r, width: 30, height: r, color: "red", label: "R" },
//     { x: 185, y: 300 - g, width: 30, height: g, color: "green", label: "G" },
//     { x: 285, y: 300 - b, width: 30, height: b, color: "blue", label: "B" },
//   ];

//   values.forEach((record) => {
//     ctx.fillStyle = record.color;
//     ctx.fillRect(record.x, record.y, record.width, record.height);
//     writeText(
//       `${record.label} - ${record.height}`,
//       12,
//       record.color,
//       record.x,
//       315
//     );
//   });
// }

// export function drawBars(r = 125, g = 75, b = 256) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "#fff";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   drawSwatch(r, g, b);
//   drawAxis();
//   drawColorBars(r, g, b);
// }

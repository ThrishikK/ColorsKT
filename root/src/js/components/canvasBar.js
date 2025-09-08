const canvas = document.getElementById("barGraph");

const ctx = canvas.getContext("2d");
canvas.height = 350;
canvas.width = 350;

function writeText(text, size, color, x, y) {
  ctx.font = `${size}px Times New Roman`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawSwatch(r, g, b) {
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(175, 10, 50, 25);
  // writing text
  writeText("Color  -", 15, "black", 120, 28);
}

function drawAxis() {
  ctx.strokeStyle = "#160b0bff";
  ctx.beginPath();

  for (let i = 0; i <= 255; i += 51) {
    ctx.moveTo(50, 45 + i);
    ctx.lineTo(350, 45 + i);
    // console.log(45 + i);
    writeText(255 - i, 15, "black", 20, 50 + i);
  }
  ctx.stroke();
}

function drawColorBars(r, g, b) {
  const values = [
    { x: 85, y: 300 - r, width: 30, height: r, color: "red", label: "R" },
    { x: 185, y: 300 - g, width: 30, height: g, color: "green", label: "G" },
    { x: 285, y: 300 - b, width: 30, height: b, color: "blue", label: "B" },
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

function hexToRgb(hex) {
  hex = hex.trim();
  if (hex[0] === "#") hex = hex.slice(1);
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function drawBars(r = 125, g = 75, b = 256) {
  // console.log(r, g, b);
  // clear
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

// drawBars(125, 75, 256);

// function update() {
//   const rgb = hexToRgb(input.value);
//   drawBars(rgb.r, rgb.g, rgb.b);
// }

const canvas = document.getElementById("pieGraph");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

export function drawRgbPie(r = 120, g = 200, b = 50) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const total = r + g + b;
  const values = [
    { value: r, color: "red", label: `R:${r}` },
    { value: g, color: "green", label: `G:${g}` },
    { value: b, color: "blue", label: `B:${b}` },
  ];

  let startAngle = 0;

  values.forEach((part) => {
    const sliceAngle = (part.value / total) * 2 * Math.PI;

    // draw slice
    ctx.beginPath();
    ctx.moveTo(150, 150); // center of canvas
    ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
    ctx.closePath();

    ctx.fillStyle = part.color;
    ctx.fill();

    // add label
    const midAngle = startAngle + sliceAngle / 2;
    const labelX = 150 + Math.cos(midAngle) * 120;
    const labelY = 150 + Math.sin(midAngle) * 120;

    ctx.fillStyle = "#000";
    ctx.font = "12px Times New Roman";
    ctx.textAlign = "center";
    ctx.fillText(part.label, labelX, labelY);

    startAngle += sliceAngle;
  });

  // border circle
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, 2 * Math.PI);
  ctx.strokeStyle = "#333";
  ctx.stroke();
}

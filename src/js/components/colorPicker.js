const canvas = document.getElementById("pickerGraph");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

export function drawPicker() {
  // Draw base hue gradient (left to right)
  const gradientH = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradientH.addColorStop(0, "red");
  gradientH.addColorStop(0.16, "yellow");
  gradientH.addColorStop(0.33, "lime");
  gradientH.addColorStop(0.5, "cyan");
  gradientH.addColorStop(0.66, "blue");
  gradientH.addColorStop(0.83, "magenta");
  gradientH.addColorStop(1, "red");
  ctx.fillStyle = gradientH;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Overlay vertical black-white gradient
  const gradientV = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradientV.addColorStop(0, "rgba(255,255,255,1)");
  gradientV.addColorStop(0.5, "rgba(255,255,255,0)");
  gradientV.addColorStop(0.5, "rgba(0,0,0,0)");
  gradientV.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = gradientV;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

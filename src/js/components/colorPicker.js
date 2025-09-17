const canvas = document.getElementById("pickerGraph");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

export function rgbToHex(r, g, b) {
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

export function pickColor(e) {
  console.log(e);
  const x = e.offsetX;
  const y = e.offsetY;
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
  return rgb;
  // preview.style.background = rgb;
  // colorValue.textContent = `${rgb} | ${hex}`;
}

// Handle click and drag
export function colorPickerEvenListener(swatchText, pickerSwatchEl) {
  let selectedColor;
  canvas.addEventListener("click", (e) => {
    selectedColor = pickColor(e);
    swatchText.textContent = selectedColor;
    pickerSwatchEl.style.backgroundColor = selectedColor;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (e.buttons > 0) {
      selectedColor = pickColor(e);
      pickerSwatchEl.style.backgroundColor = selectedColor;
      swatchText.textContent = selectedColor;
    }
  });
}

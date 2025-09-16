const canvasTheme = document.getElementById("themeCanvas");
const ctx = canvasTheme.getContext("2d");
const body = document.body;

function drawSun() {
  ctx.clearRect(0, 0, canvasTheme.width, canvasTheme.height);

  // Sun body
  ctx.beginPath();
  ctx.arc(25, 25, 12, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(10, 28, 65)";
  ctx.fill();

  // Rays
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const x1 = 25 + Math.cos(angle) * 18;
    const y1 = 25 + Math.sin(angle) * 18;
    const x2 = 25 + Math.cos(angle) * 25;
    const y2 = 25 + Math.sin(angle) * 25;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgb(10, 28, 65)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawMoon() {
  ctx.clearRect(0, 0, canvasTheme.width, canvasTheme.height);

  // Moon crescent
  ctx.beginPath();
  ctx.arc(25, 25, 12, 0, Math.PI * 2, false);
  ctx.fillStyle = "yellow";
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(30, 20, 12, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

// Apply theme
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    drawMoon();
  } else {
    body.classList.remove("dark");
    drawSun();
  }
  storedObject.theme = theme;
  console.log(JSON.parse(localStorage.getItem("colorPalette")));
  localStorage.setItem("colorPalette", JSON.stringify(storedObject));
}

const storedObject = JSON.parse(localStorage.getItem("colorPalette")) || {};

// console.log(storedObject);
// Load saved theme
const savedTheme = storedObject?.theme || "light";
// console.log(savedTheme);

export function canvasThemeFun() {
  applyTheme(savedTheme);

  // Toggle on click
  canvasTheme.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
  });
}

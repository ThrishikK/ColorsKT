import { hexToRgbHsl } from "../services/colorsRelated.js";

// COLOR CODES EVENTLISTENER START 👶
function indexSetting(current) {
  current++;
  if (current > 2) {
    return 0;
  }
  return current;
}

export function colorCodeListener() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-code-p-element")) {
      // console.log(e.target.dataset);
      const resultCodes = hexToRgbHsl(e.target.dataset.hexCode);
      // console.log(resultCodes);
      let currentIndex = parseInt(e.target.dataset.colorCodeIndex);
      currentIndex = indexSetting(currentIndex);
      e.target.dataset.colorCodeIndex = currentIndex;
      // console.log(e.target.dataset.colorCodeIndex);
      e.target.textContent = resultCodes[currentIndex];
    }
  });
}
// COLOR CODES EVENTLISTENER END 👶

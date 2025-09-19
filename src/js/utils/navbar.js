const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function smoothScrollListener() {
  navLinks.addEventListener("click", function (e) {
    if (e.target.classList.contains("anchor-element")) {
      e.preventDefault();
      const selectedId = e.target.getAttribute("href");
      document
        .querySelector(selectedId)
        .scrollIntoView({ behaviour: "smooth" });
    }
  });
}

smoothScrollListener();

export function navbarListener() {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

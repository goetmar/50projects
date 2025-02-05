const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActive = 1;

next.addEventListener("click", () => {
  if (currentActive <= circles.length) {
    currentActive++;
    circles[currentActive - 1].classList.add("active");
    update();
  }
});
prev.addEventListener("click", () => {
  if (currentActive > 1) {
    currentActive--;
    circles[currentActive].classList.remove("active");
    update();
  }
});

function update() {
  if (currentActive === 1) {
    prev.disabled = true;
  } else if (currentActive === circles.length) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
  progress.style.width =
    ((currentActive - 1) / (circles.length - 1)) * 100 + "%";
}

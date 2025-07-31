const loadText = document.querySelector(".count");

const start = 1;
const count = parseInt(loadText.innerText, 10) || 50;

const baseDelay = 30;
const slowDuration = 1500;
const exponentBase = 1.2;

const brightnessStart = 1.5;
const brightnessEnd = 1.0;
const brightnessRange = brightnessStart - brightnessEnd;

// Precompute exponential delays, increasing toward the end
const delays = (() => {
  const weights = Array.from({ length: count - start }, (_, i) =>
    Math.pow(exponentBase, i)
  );
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  return weights.map((w) => (w / totalWeight) * slowDuration);
})();

// Initial state
const digitCount = count.toString().length;
loadText.style.width = `${digitCount}ch`;
loadText.style.filter = `brightness(${brightnessStart})`;

let progress = start;
function updateCount() {
  // Update counter
  loadText.innerText = progress;

  // Linear brightness fade
  const percent = progress / count;
  const brightness = brightnessStart - brightnessRange * percent;
  loadText.style.filter = `brightness(${brightness})`;

  // Schedule next step with exponential delay
  if (progress < count) {
    const delay = baseDelay + delays[progress - start];
    setTimeout(updateCount, delay);
  }
  progress++;
}

const items = document.querySelectorAll("ul li a");

const startColor = [153, 165, 255]; // rgb(153, 165, 255)
const endColor = [255, 179, 216]; // rgb(255, 179, 216)

const steps = items.length - 1;

items.forEach((item, index) => {
  const mix = index / steps;

  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * mix);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * mix);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * mix);

  item.style.color = `rgb(${r}, ${g}, ${b})`;
});

const scrollBtn = document.getElementById("scroll-top-btn");

window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("visible", window.scrollY > 300);
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

updateCount();

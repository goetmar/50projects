const background = document.querySelector(".bg");
const loadText = document.querySelector(".loading-text");

let progress = 0;

let int = setInterval(loading, 30);

function loading() {
  progress++;

  if (progress >= 100) {
    clearInterval(int);
    loadText.style.display = "none";
  }

  loadText.innerText = `${progress}%`;
  loadText.style.opacity = 1 - progress / 100;
  background.style.filter = `blur(${100 - progress}px)`;
}

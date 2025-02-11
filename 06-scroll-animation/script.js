const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", toggleBoxes);

toggleBoxes();

function toggleBoxes() {
  const triggerHeight = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerHeight) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}

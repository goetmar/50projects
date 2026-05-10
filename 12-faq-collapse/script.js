buttons = document.querySelectorAll(".faq-toggle");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.parentElement;
    faq.classList.toggle("active");
  });
});

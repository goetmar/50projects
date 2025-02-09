const search = document.querySelector(".search");
const button = document.querySelector(".btn");
const input = document.querySelector(".input");

button.addEventListener("click", () => {
  search.classList.toggle("active") && input.focus();
});

// Another slightly different solution:
//
// button.addEventListener("click", () => {
//   search.classList.add("active");
//   input.focus();
// });
//
// input.addEventListener("blur", () => {
//   search.classList.remove("active");
// });

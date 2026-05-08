window.addEventListener("keydown", (e) => {
  document.getElementById("insert").innerHTML = `
    <div class="key">
      ${e.key === " " ? "Space" : e.key}
      <small>event.key</small>
    </div>
    <div class="key">
      ${e.code}
      <small>event.code</small>
    </div>
  `;
});

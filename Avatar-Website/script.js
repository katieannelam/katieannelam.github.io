this.document.addEventListener("keydown", enterKey);

function enterKey(i) {
  if (i.keyCode === 13) {
    document.location.href = "homepage.html";
  }
}
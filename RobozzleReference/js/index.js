document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("start-button");

  startButton.addEventListener("click", function () {
    sessionStorage.setItem("ftzzle", 2);
    window.location.href = "./level1.html";
  });
});

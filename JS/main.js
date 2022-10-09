const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 400) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

window.addEventListener("scroll", function () {
  var header = document.querySelector(".navbar");
  header.classList.toggle("sticky", window.scrollY > 0);
});